import {NextResponse} from 'next/server';
import {AIError,configured,learning,readAIInput} from '../../ai';
import {studentFrom} from '../../accounts';
import {digest} from '../../door';
import {allowedPublicOrigin,publicCors,publicPreflight} from '../../public-cors';
export function OPTIONS(req:Request){return publicPreflight(req,'POST');}
export async function POST(req:Request){
 const respond=(body:any,status=200)=>publicCors(req,NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}}),'POST');
 if(!allowedPublicOrigin(req))return respond({error:'Invalid origin'},403);
 try{
  if(!configured())throw new AIError('Gemini is not connected yet.',503);
  const body=await readAIInput(req,32000);
  const student=await studentFrom(req);
  const subject=await digest(student?'student:'+student.id:'network:'+(req.headers.get('CF-Connecting-IP')||'local'));
  return respond(await learning(body,subject));
 }catch(e){if(e instanceof AIError)return respond({error:e.message},e.status);return respond({error:'The study tool is unavailable. Your work is unchanged. Please try again.'},503);}
}
