import {NextResponse} from 'next/server';
import {isTeacher,sameOrigin} from '../../../server';
import {HomeworkError,homeworkBody,reviewAssignment} from '../../../assignments';
export async function POST(req:Request){
 if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required.'},{status:403});
 try{await reviewAssignment(await homeworkBody(req));return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:e instanceof HomeworkError?e.message:'Could not save this review. Please try again.'},{status:e instanceof HomeworkError?e.status:503});}
}
