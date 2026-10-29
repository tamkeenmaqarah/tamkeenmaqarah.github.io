import {y} from './runtime.js';
import {t,getLanguage,subscribeLanguage} from './i18n.js?v=20';
import {requestJSON} from './api-client.js?v=1';
const el=y.createElement;
const studyCache=new Map();
export function ReferenceText({text}){return text.split(/(\(\d{1,3}:\d{1,3}[-–—]\d{1,3}\)|https:\/\/[^\s]+)/g).map((part,index)=>index%2?el('bdi',{dir:'ltr',className:part.startsWith('(')?'quran-inline-ref':undefined,key:index},part):part);}
export function validStudyResult(kind,result,input){
 if(kind==='explain')return typeof result?.line==='string'&&result.line.length>=12&&result.line.length<=220;
 if(kind==='ask')return typeof result?.found==='boolean'&&(result.found?typeof result.answer==='string'&&result.answer.length>=12&&result.answer.length<=700&&input.source.includes(result.answer):result.answer==='');
 if(kind==='cards')return Array.isArray(result?.cards)&&result.cards.length===3&&result.cards.every(card=>typeof card.question==='string'&&card.question.length>=8&&card.question.length<=220&&typeof card.answer==='string'&&card.answer.length>=12&&card.answer.length<=500&&input.source.includes(card.answer));
 return Array.isArray(result?.steps)&&result.steps.length===3&&result.steps.every((step,index)=>step.phase===['recall','check','repeat'][index]&&Number.isInteger(step.minutes)&&step.minutes>0&&typeof step.tip==='string'&&step.tip.length<=180)&&result.steps.reduce((sum,step)=>sum+step.minutes,0)===input.minutes;
}
function useStudy(context){
 const [state,setState]=y.useState({}),controller=y.useRef(null);
 y.useLayoutEffect(()=>()=>controller.current?.abort(),[context]);
 const current=state.context===context?state:{result:studyCache.get(context)};
 async function run(kind,input){
  controller.current?.abort();const next=new AbortController();controller.current=next;setState({context,busy:true});
  try{const result=await requestJSON(kind==='explain'?'/api/study':'/api/learning',{method:'POST',body:{...input,...(kind==='explain'?{}:{kind}),language:getLanguage()},signal:next.signal,timeout:60000});if(!validStudyResult(kind,result,input))throw Error('The study response was incomplete. Please try again.');if(!next.signal.aborted){if(studyCache.size>=40)studyCache.delete(studyCache.keys().next().value);studyCache.set(context,result);setState({context,result});}}
  catch(error){if(!next.signal.aborted)setState({context,error:error.message});}
 }
 return {...current,run};
}
function StudyStatus({state}){return el(y.Fragment,null,state.busy&&el('p',{className:'help',role:'status'},t('Preparing your study aid…')),state.error&&el('p',{className:'study-error',role:'alert'},t(state.error)));}
function StudyShell({title,children}){return el('section',{className:'study-tool'},el('header',{className:'study-tool-header'},el('svg',{className:'study-book',width:22,height:22,viewBox:'0 0 24 24',fill:'none','aria-hidden':true},el('path',{d:'M12 6v14M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z',stroke:'currentColor',strokeWidth:1.4,strokeLinejoin:'round'})),el('h3',null,t(title)),el('small',null,t('AI · Gemini'))),el('div',{className:'study-tool-body'},children));}
export function ReviewPlanner({assignment,context=''}){
 const language=y.useSyncExternalStore(subscribeLanguage,getLanguage,getLanguage),[minutes,setMinutes]=y.useState(10),[challenge,setChallenge]=y.useState('');
 const study=useStudy(JSON.stringify([context,assignment,minutes,challenge,language]));
 return el(StudyShell,{title:'Plan my review'},el('p',{className:'help'},t('A personal practice plan. Your homework stays unchanged.')),
  el('form',{onSubmit:event=>{event.preventDefault();study.run('plan',{assignment,minutes,challenge});}},
   el('label',null,t('Practice time'),el('select',{value:minutes,onChange:event=>setMinutes(Number(event.target.value))},[5,10,15,20,30].map(value=>el('option',{key:value,value},t('{minutes} minutes',{minutes:value}))))),
   el('label',null,t('What needs more practice?'),el('input',{value:challenge,maxLength:200,dir:'auto',onChange:event=>setChallenge(event.target.value),placeholder:t('For example: remembering the transitions')})),
   el('p',{className:'help study-disclosure'},t('Creating a plan sends this homework and your practice note to Gemini.')),
   el('button',{className:'secondary',type:'submit',disabled:study.busy||!assignment?.trim()},t(study.busy?'Preparing…':'Create review plan'))),
  el(StudyStatus,{state:study}),study.result&&el('div',{className:'review-plan'},el('h3',null,t('A {minutes}-minute review',{minutes})),el('ol',null,study.result.steps.map(step=>el('li',{key:step.phase},el('div',null,el('strong',null,t({recall:'Recall',check:'Check',repeat:'Repeat'}[step.phase])),el('span',null,t('{minutes} min',{minutes:step.minutes}))),el('p',{dir:'auto'},step.tip)))),el('p',{className:'help'},t('Gemini suggestion. Check it against your assigned work.'))));
}
function readNotes(owner){try{const value=sessionStorage.getItem('tamkeen-study-notes:'+owner)||'';return value.length<=6000?value:'';}catch{return '';}}
export function NotesCards({owner=''}){
 const language=y.useSyncExternalStore(subscribeLanguage,getLanguage,getLanguage),[source,setSource]=y.useState(()=>readNotes(owner)),[question,setQuestion]=y.useState('');
 const study=useStudy(JSON.stringify(['cards',source,language])),answer=useStudy(JSON.stringify(['ask',source,question,language]));
 return el(StudyShell,{title:'Study your halaqa notes'},
  el('p',{className:'help'},t('Paste your lesson notes, then make revision cards or ask a question. Answers stay grounded in your notes.')),
  el('div',{className:'notes-workspace'},el('div',{className:'notes-source'},
   el('label',null,t('Your halaqa notes'),el('textarea',{value:source,dir:'auto',rows:9,maxLength:6000,onChange:event=>{const value=event.target.value;setSource(value);try{sessionStorage.setItem('tamkeen-study-notes:'+owner,value);}catch{}},placeholder:t('Include at least three points from the lesson.')})),
   el('div',{className:'notes-source-footer'},el('p',{className:'help'},el('bdi',{dir:'ltr'},new Intl.NumberFormat(language).format(source.length)+' / '+new Intl.NumberFormat(language).format(6000)),' ',t('characters')),source&&el('button',{className:'text-button',type:'button',onClick:()=>{setSource('');try{sessionStorage.removeItem('tamkeen-study-notes:'+owner);}catch{}}},t('Clear notes')))),
  el('div',{className:'notes-actions'},
   el('form',{onSubmit:event=>{event.preventDefault();study.run('cards',{source});}},el('h4',null,t('Test what you remember')),el('p',{className:'help'},t('Three questions, with answers quoted from your notes.')),el('button',{className:'primary',type:'submit',disabled:study.busy||source.trim().length<100},t(study.busy?'Preparing…':'Create revision cards')),el(StudyStatus,{state:study})),
   el('form',{onSubmit:event=>{event.preventDefault();answer.run('ask',{source,question});}},el('label',null,t('Ask about your notes'),el('input',{value:question,dir:'auto',required:true,minLength:8,maxLength:240,'aria-describedby':'notes-question-help',onChange:event=>setQuestion(event.target.value),placeholder:t('What does the lesson say about…?')})),el('small',{className:'help question-help',id:'notes-question-help'},t('Use 8–240 characters for your question.')),el('button',{className:'secondary',type:'submit',disabled:answer.busy||source.trim().length<100||question.trim().length<8},t(answer.busy?'Finding an answer…':'Find in my notes')),el(StudyStatus,{state:answer})))),
  el('p',{className:'help study-disclosure'},t('Add at least 100 characters. Creating cards or finding an answer sends your notes and question to Gemini.')),
  answer.result&&el('div',{className:'notes-answer',role:'status'},el('h4',null,t(answer.result.found?'From your notes':'No answer in these notes')),el('p',{dir:'auto'},answer.result.found?el(ReferenceText,{text:answer.result.answer}):t('Try a different question, add the relevant lesson notes, or ask your teacher.'))),
  study.result&&el('div',{className:'revision-cards'},el('h4',null,t('Your revision cards')),el('p',{className:'help'},t('Think of your answer, then open each card to check.')),study.result.cards.map((card,index)=>el('details',{className:'revision-card',key:index},el('summary',{dir:'auto'},card.question,el('span',{className:'revision-answer-label answer-open-label'},t('Check answer')),el('span',{className:'revision-answer-label answer-close-label'},t('Hide answer'))),el('div',null,el('small',null,t('From your notes')),el('blockquote',{dir:'auto'},el(ReferenceText,{text:card.answer})))))));
}
export function MissCoach({quizId,question,chosen}){
 const language=y.useSyncExternalStore(subscribeLanguage,getLanguage,getLanguage),study=useStudy(JSON.stringify([quizId,question,chosen,language]));
 if(typeof question.explanation!=='string'||!question.explanation.trim())return null;
 return el('div',{className:'miss-coach'},el('h4',null,t('Understand this answer')),!study.result&&el('button',{className:'secondary',type:'button',disabled:study.busy,onClick:()=>study.run('explain',{quizId,prompt:question.prompt,...(chosen?{chosen}:{})})},t(study.busy?'Saying it simply…':'Explain this note')),el(StudyStatus,{state:study}),study.result&&el('p',{className:'study-line',dir:'auto'},study.result.line),el('p',{className:'help'},t('Gemini uses the quiz and teacher’s note. No change to your score.')));
}
