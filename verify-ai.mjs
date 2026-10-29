// Provider-isolated checks. No API key or network calls are used.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const compile = path => ts.transpileModule(fs.readFileSync(path, 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
}).outputText;
const serverExports = {};
vm.runInNewContext(compile('app/server.ts'), {
  exports: serverExports,
  require: name => name === 'cloudflare:workers' ? {env: {}} : {},
});
let queue = [], calls = [], quota = true, submitted = true;
const questions = Array.from({length: 5}, (_, i) => ({
  prompt: `Which taught action fits situation ${i + 1}?`,
  options: ['Supported action', 'Plausible alternative', 'Another alternative', 'Near miss'],
  correct: 0, explanation: 'The supplied notes support the first action.',
  evidence: 'The class explained the supported action in detail.',
}));
const source = 'The class explained the supported action in detail. This lesson also gives enough context to compare the alternatives and explain each scenario.';
const database = {prepare(sql) { return {bind() { return this; },
  async first() {
    if(sql.startsWith('INSERT INTO ai_usage')) return quota ? {requests: 1} : null;
    if(sql.startsWith('SELECT questions')) return {questions: JSON.stringify(questions)};
    throw Error('Unexpected query');
  },
  async all() { return {results: submitted ? [{id: 'attempt', name: 'Private learner name', answers: JSON.stringify([1,0,0,0,0])}] : []}; },
}; }};
const ai = {};
vm.runInNewContext(compile('app/ai.ts'), {
  exports: ai, crypto, AbortSignal, Uint32Array, TextDecoder, Request,
  require: name => name === 'cloudflare:workers'
    ? {env: {GEMINI_API_KEY: 'mock-key-never-transmitted'}}
    : {db: () => database, validQuiz: serverExports.validQuiz},
  fetch: async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    const value = queue.shift();
    assert.ok(value, 'Unexpected provider call');
    return {ok: true, json: async () => ({candidates: [{content: {parts: [{text: JSON.stringify(value)}]}}]})};
  },
});
const clone = value => JSON.parse(JSON.stringify(value));
const draft = () => ({title: 'Lesson', description: '', questions: clone(questions)});
const request = {title: 'Teacher title', source, count: 5, session: 'tuesday'};
queue = [draft()];
const result = await ai.draftQuiz(request);
assert.equal(calls.length, 1);
assert.equal(result.reviewRequired, true);
assert.equal(result.draft.title, request.title);
assert.match(result.draft.description, /Optional Tuesday/);
result.draft.questions.forEach(q => {
  assert.equal(q.options[q.correct], 'Supported action');
  assert.ok(source.includes(q.evidence));
});
assert.equal(calls[0].body.generationConfig.responseFormat.text.mimeType, 'APPLICATION_JSON');
assert.ok(calls[0].url.endsWith('/gemini-3.5-flash-lite:generateContent'));
assert.ok(!('temperature' in calls[0].body.generationConfig));

const unsupported = draft(); unsupported.questions.forEach(q => { q.evidence = 'An invented excerpt not present in the supplied notes.'; });
const rough = ai.validateDraft(unsupported, source, 5);
assert.equal(rough.questions.length, 5);
assert.equal(rough.questions[0].evidence, 'An invented excerpt not present in the supplied notes.');
const libyaNotes = [
  'The color green is worn in Paradise (*Jannah*) according to Surah Al-Kahf and Surah Al-Insan.',
  'Over **1,200 prisoners** were executed within a few hours.',
  'He was Gaddafi\u2019s top army commander in Chad who was disowned by Gaddafi after being captured.',
  'On **October 20, 2011**, Gaddafi was captured hiding inside a concrete drainage pipe outside Sirte.',
  'Sanctions ran from 1992 to 1999 &amp; isolated the country.',
].join('\n');
const libya = draft();
[
  'The color green is worn in Paradise (Jannah) according to Surah Al-Kahf and Surah Al-Insan.',
  'Over 1,200 prisoners were killed within a few hours.',
  "He was Gaddafi's top army commander in Chad who was disowned by Gaddafi after being captured.",
  'On October 20, 2011, Gaddafi was captured hiding inside a concrete drainage pipe outside Sirte.',
  'Sanctions ran from 1992 to 1999 & isolated the country.',
].forEach((evidence, index) => { libya.questions[index].evidence = evidence; });
const libyaDraft = ai.validateDraft(libya, libyaNotes, 5);
assert.match(libyaDraft.questions[1].evidence, /1,200 prisoners/);
assert.match(libyaDraft.questions[1].evidence, /executed/);
assert.doesNotMatch(libyaDraft.questions[1].evidence, /killed/);
const rewritten = draft();
rewritten.questions[0].evidence = 'Thousands of inmates died after the negotiations collapsed at the prison in Tripoli.';
const keptRough = ai.validateDraft(rewritten, source, 5);
assert.equal(keptRough.questions.length, 5);
assert.match(keptRough.questions[0].evidence, /Tripoli/);
const duplicate = draft(); duplicate.questions[1].prompt = duplicate.questions[0].prompt;
assert.throws(() => ai.validateDraft(duplicate, source, 5), /repeated a question/);
const repeatedOption = draft(); repeatedOption.questions[0].options[1] = repeatedOption.questions[0].options[0];
assert.throws(() => ai.validateDraft(repeatedOption, source, 5), /duplicate answer choices/);
calls = []; queue = [draft()];
const imperfect = await ai.draftQuiz(request);
assert.equal(calls.length, 1);
assert.equal(imperfect.draft.questions.length, 5);

calls = []; queue = [{candidateId: 'c0', caption: 'That alternative took the scenic route through the lesson.'}];
const moment = await ai.highlight({quizId: 'quiz'});
assert.equal(moment.suggestion.name, 'Private learner name');
assert.equal(moment.suggestion.chosen, questions[0].options[1]);
assert.equal(moment.suggestion.correct, questions[0].options[0]);
assert.ok(!JSON.stringify(calls).includes('Private learner name'));
assert.equal(moment.reviewRequired, true);
queue = [{candidateId: 'invented', caption: 'A completely invented candidate must be rejected.'}];
await assert.rejects(ai.highlight({quizId: 'quiz'}), /real answer/);
submitted = false;
await assert.rejects(ai.highlight({quizId: 'quiz'}), /no incorrect submitted answers/);
assert.equal(ai.acceptStudyLine('The notes support the first action.', source), 'The notes support the first action.');
assert.equal(ai.acceptStudyLine('See https://example.com/x for why this is right.', source), null);
assert.equal(ai.acceptStudyLine('The Prophet said the first action is correct today.', source), null);
calls = [];
queue = [{line: 'The notes support the first action, so that is the marked answer.'}];
const simple = await ai.explainMiss({prompt: questions[0].prompt, options: questions[0].options, correct: 0, chosen: questions[0].options[1], explanation: questions[0].explanation});
assert.equal(simple.line, 'The notes support the first action, so that is the marked answer.');
assert.match(calls[0].body.systemInstruction.parts[0].text, /ONLY the supplied/);
assert.ok(!JSON.stringify(calls[0].body).includes('Private learner'));
queue = [{line: 'The Prophet said the first action is the marked one here.'}];
await assert.rejects(ai.explainMiss({prompt: questions[0].prompt, options: questions[0].options, correct: 0, chosen: questions[0].options[1], explanation: questions[0].explanation}), /lesson note/);
await assert.rejects(ai.checkQuestion({...questions[0], explanation: 'Too short.'}), /explanation/);
assert.equal(calls.length, 2);
queue = [{ok: false, note: 'The explanation never says why the other three options are wrong.'}];
const checked = await ai.checkQuestion(questions[0]);
assert.equal(checked.ok, false);
assert.match(checked.note, /other three/);
assert.throws(()=>ai.validateLearning({kind:'plan',assignment:'Review',minutes:0,challenge:'',language:'en'}),/daily practice/);
assert.throws(()=>ai.validateLearning({kind:'cards',source:'too short',language:'ar'}),/100/);
assert.throws(()=>ai.validateLearning({kind:'cards',source,language:'xx'}),/English or Arabic/);
const cardNotes='Listen without interrupting the speaker. Review the lesson notes before attempting the questions. Ask the teacher when a point remains unclear.';
const cards=[{question:'How should you listen?',answer:'Listen without interrupting the speaker.'},{question:'What should happen before the questions?',answer:'Review the lesson notes before attempting the questions.'},{question:'What should you do if a point remains unclear?',answer:'Ask the teacher when a point remains unclear.'}];
assert.equal(ai.validateCards({cards},cardNotes).cards.length,3);
assert.throws(()=>ai.validateCards({cards:[...cards.slice(0,2),{...cards[2],answer:'An invented answer that was never taught.'}]},cardNotes),/matched/);
assert.throws(()=>ai.validateCards({cards:[cards[0],cards[0],cards[2]]},cardNotes),/matched/);
queue=[{cards}];calls=[];
const cardResult=await ai.learning({kind:'cards',source:cardNotes,language:'ar'},'a'.repeat(64));
assert.equal(cardResult.cards[0].answer,cards[0].answer);assert.equal(JSON.parse(calls[0].body.contents[0].parts[0].text).language,'Arabic');assert.ok(!JSON.stringify(calls[0]).includes('a'.repeat(64)));
queue=[{tips:['Recite the assigned passage from memory and notice where you hesitate.','Compare those transitions with the original text before continuing.','Repeat the difficult links slowly, then join the passage together.']}];
const plan=await ai.learning({kind:'plan',assignment:'Al-Mulk (67:1–10).',minutes:10,challenge:'I mix up transitions.',language:'en'},'b'.repeat(64));
assert.equal(plan.steps.reduce((sum,step)=>sum+step.minutes,0),10);assert.deepEqual(Array.from(plan.steps,step=>step.phase),['recall','check','repeat']);
queue=[{tips:['Add verses 25–30 to the assignment.','Compare the current passage carefully against the original.','Repeat the difficult transitions slowly until they feel familiar.']}];
await assert.rejects(ai.learning({kind:'plan',assignment:'Al-Mulk (67:1–10).',minutes:10,challenge:'',language:'en'},'b'.repeat(64)),/unchanged/);
await assert.rejects(ai.readAIInput(new Request('https://test/api',{method:'POST',body:'x'.repeat(8001)}),8000),error=>error.status===413);
const vowelNotes='اسْتَمِعْ إلى المتحدّث دون مقاطعة. راجِعْ الملاحظات قبل الإجابة. اسْأَلْ المعلّم عمّا لم يتّضح لك.';
const vowelCards=[{question:'كيف تستمع إلى المتحدّث؟',answer:'اسْتَمِعْ إلى المتحدّث دون مقاطعة.'},{question:'ماذا تراجع قبل الإجابة؟',answer:'راجِعْ الملاحظات قبل الإجابة.'},{question:'ماذا تفعل إن لم تتّضح نقطة؟',answer:'اسْأَلْ المعلّم عمّا لم يتّضح لك.'}];
assert.equal(ai.validateCards({cards:vowelCards},vowelNotes).cards[0].answer,vowelCards[0].answer);assert.throws(()=>ai.validateCards({cards:vowelCards.map(card=>({...card,answer:card.answer.replace(/[\u064B-\u065F]/g,'')}))},vowelNotes),/matched/);
assert.throws(()=>ai.validateLearning({kind:'ask',source:cardNotes,question:'Short',language:'en'}),/8–240/);
assert.deepEqual(JSON.parse(JSON.stringify(ai.validateNoteAnswer({found:false,answer:''},cardNotes))),{found:false,answer:''});
assert.throws(()=>ai.validateNoteAnswer({found:true,answer:'This was not in the lesson notes.'},cardNotes),/matched/);
assert.throws(()=>ai.validateNoteAnswer({found:false,answer:'Invented outside information.'},cardNotes),/matched/);
queue=[{found:true,answer:cards[2].answer}];calls=[];
const found=await ai.learning({kind:'ask',source:cardNotes,question:'What should I do if a point is unclear?',language:'en'},'c'.repeat(64));
assert.equal(found.answer,cards[2].answer);assert.match(calls[0].body.systemInstruction.parts[0].text,/ONLY these notes/);assert.ok(!JSON.stringify(calls[0]).includes('c'.repeat(64)));
queue=[{found:false,answer:''}];
const absent=await ai.learning({kind:'ask',source:cardNotes,question:'What day does the next lesson begin?',language:'ar'},'c'.repeat(64));assert.equal(absent.found,false);
quota = false;
await assert.rejects(ai.explainMiss({prompt: questions[0].prompt, options: questions[0].options, correct: 0, chosen: questions[0].options[1], explanation: questions[0].explanation}), /limit for today/);
await assert.rejects(ai.draftQuiz(request), /daily AI limit/);
await assert.rejects(ai.learning({kind:'cards',source:cardNotes,language:'en'},'a'.repeat(64)),/daily limit/);
console.log('PASS: structured requests, source evidence, raw-transcript drafts, answer shuffling, real-answer highlights, name minimization, grounded study lines, question checks, and daily quota. Provider calls were mocked; live Gemini quality is untested.');
