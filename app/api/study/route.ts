import {NextResponse} from 'next/server';
import {db} from '../../server';
import {AIError,configured,explainMiss} from '../../ai';
import {allowedPublicOrigin,publicCors,publicPreflight} from '../../public-cors';
export function OPTIONS(req:Request){return publicPreflight(req,'POST')}
export async function POST(req:Request){
 const respond=(body:any,init?:ResponseInit)=>publicCors(req,NextResponse.json(body,init),'POST');
 if(!allowedPublicOrigin(req))return respond({error:'Invalid origin'},{status:403});
 try{
  if(!configured())throw new AIError('Gemini is not connected yet.',503);
  if(Number(req.headers.get('content-length'))>8000)throw new AIError('That question is too large.',413);
  const body:any=await req.json();
  const {quizId,prompt,chosen}=body;
  if(typeof quizId!=='string'||quizId.length>150||typeof prompt!=='string'||!prompt.trim()||prompt.length>2000)throw new AIError('Choose a question from the quiz.');
  const row:any=await db().prepare('SELECT questions FROM quizzes WHERE id=? AND published=1').bind(quizId).first();
  if(!row)throw new AIError('This quiz is not available.',404);
  let questions:any[];
  try{questions=JSON.parse(row.questions)}catch{throw new AIError('This quiz is not available.',404)}
  const question=Array.isArray(questions)?questions.find((item:any)=>item?.prompt===prompt):null;
  if(!question||!Array.isArray(question.options)||!Number.isInteger(question.correct))throw new AIError('This question is not on the quiz.',404);
  let picked:string|null=null;
  if(chosen!=null){
   if(typeof chosen!=='string'||!question.options.includes(chosen))throw new AIError('Choose one of the answers from the question.');
   if(chosen===question.options[question.correct])throw new AIError('That answer is already marked correct.');
   picked=chosen;
  }
  return respond(await explainMiss({prompt:question.prompt,options:question.options,correct:question.correct,chosen:picked,explanation:typeof question.explanation==='string'?question.explanation:''}));
 }catch(e){
  if(e instanceof AIError)return respond({error:e.message},{status:e.status});
  return respond({error:'Could not explain this question. The lesson note is still above.'},{status:500});
 }
}
