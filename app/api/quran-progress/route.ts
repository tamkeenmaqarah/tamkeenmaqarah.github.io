import {NextResponse} from 'next/server';
import {isTeacher,sameOrigin} from '../../server';
import {HomeworkError} from '../../assignments';
import {quranProgress} from '../../quran-progress';
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(req:Request){
 if((req.headers.get('origin')&&!sameOrigin(req))||!await isTeacher())return reply({error:'Teacher access required.'},403);
 try{const params=new URL(req.url).searchParams;return reply(await quranProgress(params.get('week'),params.get('studentId')));}catch(error){return reply({error:error instanceof HomeworkError?error.message:'Could not load Qur’an progress. Please try again.'},error instanceof HomeworkError?error.status:503);}
}
