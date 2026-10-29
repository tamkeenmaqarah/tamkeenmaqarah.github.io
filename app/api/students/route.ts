import {NextResponse} from 'next/server';
import {isTeacher,sameOrigin} from '../../server';
import {HomeworkError,homeworkBody} from '../../assignments';
import {listStudents,studentDetails,setStudentArchive,deleteStudent} from '../../students';
const reply=(body:any,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(req:Request){if((req.headers.get('origin')&&!sameOrigin(req))||!await isTeacher())return reply({error:'Teacher access required.'},403);try{const id=new URL(req.url).searchParams.get('id');return reply(id?await studentDetails(id):await listStudents());}catch(e){return reply({error:e instanceof HomeworkError?e.message:'Could not load students. Please try again.'},e instanceof HomeworkError?e.status:503);}}
async function write(req:Request,remove=false){if(!sameOrigin(req)||!await isTeacher())return reply({error:'Teacher access required.'},403);try{const body=await homeworkBody(req);if(remove)await deleteStudent(body);else await setStudentArchive(body);return reply({ok:true});}catch(e){return reply({error:e instanceof HomeworkError?e.message:'Could not update this student. Please try again.'},e instanceof HomeworkError?e.status:503);}}
export function PATCH(req:Request){return write(req);}
export function DELETE(req:Request){return write(req,true);}
