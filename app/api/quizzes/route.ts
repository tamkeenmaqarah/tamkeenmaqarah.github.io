import {NextResponse} from 'next/server';
import {db,isTeacher,sameOrigin,validQuiz} from '../../server';
export async function POST(req:Request){if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required'},{status:403});try{if(Number(req.headers.get('content-length'))>200000)return NextResponse.json({error:'Quiz is too large'},{status:413});const q=(await req.json() as any);if(!validQuiz(q))return NextResponse.json({error:'Add a title and 1–50 questions, each with four answers and a correct answer.'},{status:400});const id=crypto.randomUUID();await db().prepare('INSERT INTO quizzes (id,title,description,questions,published,created_at) VALUES (?,?,?,?,?,?)').bind(id,q.title.trim(),q.description,JSON.stringify(q.questions),q.published?1:0,new Date().toISOString()).run();return NextResponse.json({id})}catch{return NextResponse.json({error:'Could not save quiz.'},{status:500})}}
export async function PATCH(req:Request){
 if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required'},{status:403});
 try{
  const q:any=await req.json();
  if(typeof q.id!=='string')throw Error();
  const current:any=await db().prepare('SELECT id,published FROM quizzes WHERE id=?').bind(q.id).first();
  if(!current)return NextResponse.json({error:'This quiz no longer exists.'},{status:404});
  if(q.questions!==undefined){
   if(!validQuiz(q))return NextResponse.json({error:'Complete the title and every question, including all four answers and the correct answer.'},{status:400});
   const count:any=await db().prepare('SELECT COUNT(*) as n FROM submissions WHERE quiz_id=?').bind(q.id).first();
   if(current.published||count.n>0)return NextResponse.json({error:'Published quizzes and quizzes with results cannot be edited. Make a copy to keep existing results.'},{status:409});
   await db().prepare('UPDATE quizzes SET title=?,description=?,questions=?,published=? WHERE id=?').bind(q.title.trim(),q.description,JSON.stringify(q.questions),q.published?1:0,q.id).run();
  }else{
   if(typeof q.published!=='boolean')throw Error();
   await db().prepare('UPDATE quizzes SET published=? WHERE id=?').bind(q.published?1:0,q.id).run();
  }
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Could not update this quiz. Please try again.'},{status:400})}
}
