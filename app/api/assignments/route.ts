import {NextResponse} from 'next/server';
import {isTeacher,sameOrigin} from '../../server';
import {studentFrom} from '../../accounts';
import {HomeworkError,homeworkBody,sundayWeek,listAssignments,saveAssignment,removeAssignment} from '../../assignments';
import {allowedPublicOrigin,publicCors,publicPreflight} from '../../public-cors';
const reply=(req:Request,body:any,status=200)=>publicCors(req,NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}}),'GET');
export function OPTIONS(req:Request){return publicPreflight(req,'GET');}
export async function GET(req:Request){
 const teacher=(!req.headers.get('origin')||sameOrigin(req))&&await isTeacher();
 if(!allowedPublicOrigin(req)&&!teacher)return reply(req,{error:'Invalid origin'},403);
 try{const week=sundayWeek(new URL(req.url).searchParams.get('week'));if(!week)throw new HomeworkError('Choose a Sunday.');const student=teacher?null:await studentFrom(req);return reply(req,await listAssignments(week,teacher,student?.id||null));}catch(e){return reply(req,{error:e instanceof HomeworkError?e.message:'Could not load teacher homework. Please try again.'},e instanceof HomeworkError?e.status:503);}
}
async function write(req:Request,action:string){
 if(!sameOrigin(req)||!await isTeacher())return reply(req,{error:'Teacher access required.'},403);
 try{const body=await homeworkBody(req);if(!body||typeof body!=='object')throw new HomeworkError('Add homework details.');const result=action==='remove'?await removeAssignment(body.id,body.revision):await saveAssignment(body,action==='edit'?body.id:undefined,body.revision);return reply(req,{ok:true,...result});}catch(e){return reply(req,{error:e instanceof HomeworkError?e.message:'Could not save teacher homework. Your draft is still here.'},e instanceof HomeworkError?e.status:503);}
}
export function POST(req:Request){return write(req,'create');}
export function PATCH(req:Request){return write(req,'edit');}
export function DELETE(req:Request){return write(req,'remove');}
