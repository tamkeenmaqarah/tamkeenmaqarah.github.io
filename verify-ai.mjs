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
  exports: ai, crypto, AbortSignal, Uint32Array,
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
const checks = () => ({checks: questions.map((_, index) => ({index, valid: true, reason: 'Supported'}))});
queue = [draft(), checks()];
const result = await ai.draftQuiz(request);
assert.equal(calls.length, 2);
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

const unsupported = draft(); unsupported.questions[0].evidence = 'An invented excerpt not present in the supplied notes.';
assert.throws(() => ai.validateDraft(unsupported, source, 5), /traced to your notes/);
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
assert.throws(() => ai.validateDraft(rewritten, libyaNotes, 5), /traced to your notes/);
const duplicate = draft(); duplicate.questions[1].prompt = duplicate.questions[0].prompt;
assert.throws(() => ai.validateDraft(duplicate, source, 5), /repeated a question/);
const repeatedOption = draft(); repeatedOption.questions[0].options[1] = repeatedOption.questions[0].options[0];
assert.throws(() => ai.validateDraft(repeatedOption, source, 5), /duplicate answer choices/);
queue = [draft(), {checks: [checks().checks[0], ...checks().checks.slice(0,4)]}];
await assert.rejects(ai.draftQuiz(request), /quality check/);
const rejected = checks(); rejected.checks[2].valid = false;
queue = [draft(), rejected];
await assert.rejects(ai.draftQuiz(request), /quality check/);

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
quota = false;
await assert.rejects(ai.draftQuiz(request), /daily AI limit/);
console.log('PASS: structured requests, source evidence, independent quality rejection, answer shuffling, real-answer highlights, name minimization and daily quota. Provider calls were mocked; live Gemini quality is untested.');
