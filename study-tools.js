import {y} from './runtime.js';
import {t,getLanguage,subscribeLanguage} from './i18n.js?v=24';
import {requestJSON} from './api-client.js?v=1';
const el=y.createElement;
const studyCache=new Map();
export function ReferenceText({text}){return text.split(/(\(\d{1,3}:\d{1,3}[-–—]\d{1,3}\)|https:\/\/[^\s]+)/g).map((part,index)=>index%2?el('bdi',{dir:'ltr',className:part.startsWith('(')?'quran-inline-ref':undefined,key:index},part):part);}
export function validStudyResult(kind,result){return kind==='explain'&&typeof result?.line==='string'&&result.line.length>=12&&result.line.length<=220;}
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
export function MissCoach({quizId,question,chosen}){
 const language=y.useSyncExternalStore(subscribeLanguage,getLanguage,getLanguage),study=useStudy(JSON.stringify([quizId,question,chosen,language]));
 if(typeof question.explanation!=='string'||!question.explanation.trim())return null;
 return el('div',{className:'miss-coach'},el('h4',null,t('Understand this answer')),!study.result&&el('button',{className:'secondary',type:'button',disabled:study.busy,onClick:()=>study.run('explain',{quizId,prompt:question.prompt,...(chosen?{chosen}:{})})},t(study.busy?'Saying it simply…':'Explain this note')),el(StudyStatus,{state:study}),study.result&&el('p',{className:'study-line',dir:'auto'},study.result.line),el('p',{className:'help'},t('Gemini uses the quiz and teacher’s note. No change to your score.')));
}
