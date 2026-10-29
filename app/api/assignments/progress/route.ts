import {NextResponse} from 'next/server';
import {studentFrom} from '../../../accounts';
import {HomeworkError,homeworkBody,markPrepared} from '../../../assignments';
import {allowedPublicOrigin,publicCors,publicPreflight} from '../../../public-cors';
export function OPTIONS(req:Request){return publicPreflight(req,'POST');}
export async function POST(req:Request){
 const reply=(body:any,status=200)=>publicCors(req,NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}}),'POST');
 if(!allowedPublicOrigin(req))return reply({error:'Invalid origin'},403);
 try{const student=await studentFrom(req);if(!student)throw new HomeworkError('Connect your account to mark preparation and see individual homework.',401);await markPrepared(student.id,await homeworkBody(req));return reply({ok:true});}catch(e){return reply({error:e instanceof HomeworkError?e.message:'Could not update preparation. Please try again.'},e instanceof HomeworkError?e.status:503);}
}
