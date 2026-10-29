import {db} from './server';
import surahs from '../public/assets/quran-surahs.json';
export class HomeworkError extends Error{constructor(message:string,public status=400){super(message)}}
export function sundayWeek(value:unknown){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
 const date=new Date(value+'T12:00:00Z');return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===value&&date.getUTCDay()===0?value:null;
}
export async function homeworkBody(req:Request){
 const reader=req.body?.getReader();if(!reader)throw new HomeworkError('Add homework details.');const decoder=new TextDecoder();let text='',size=0;
 try{while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>8000){await reader.cancel();throw new HomeworkError('That request is too large.',413);}text+=decoder.decode(part.value,{stream:true});}text+=decoder.decode();}finally{reader.releaseLock();}
 try{return JSON.parse(text)}catch{throw new HomeworkError('The request could not be read. Please try again.');}
}
export function lessonUrl(value:unknown){
 if(typeof value!=='string'||value.length>500)return null;
 try{const url=new URL(value);if(url.protocol!=='https:'||url.username||url.password||url.port)return null;const host=url.hostname;
 if(host==='youtu.be'&&/^\/[\w-]{11}$/.test(url.pathname))return url.href;
 if(!['youtube.com','www.youtube.com','m.youtube.com'].includes(host))return null;
 if(url.pathname==='/watch'&&/^[\w-]{11}$/.test(url.searchParams.get('v')||''))return url.href;
 if(url.pathname==='/playlist'&&/^[\w-]{8,100}$/.test(url.searchParams.get('list')||''))return url.href;
 }catch{}return null;
}
const validId=(value:unknown)=>typeof value==='string'&&value.length>0&&value.length<=100;
export async function assignmentInput(body:any){
 const week=sundayWeek(body?.week),title=typeof body?.title==='string'?body.title.trim():'',text=typeof body?.body==='string'?body.body.trim():'',kind=body?.kind||'other';
 if(!week)throw new HomeworkError('Choose a Sunday.');
 if(!title||title.length>100||text.length>1000||!['quran','halaqa','quiz','other'].includes(kind)||(kind==='other'&&!text))throw new HomeworkError('Add a title and instructions of up to 1,000 characters.');
 const studentId=body.studentId==null?null:body.studentId;
 if(studentId!==null&&(!validId(studentId)||!await db().prepare('SELECT id FROM students WHERE id=? AND archived_at IS NULL').bind(studentId).first()))throw new HomeworkError('Choose an active student from the account list.');
 let surah:number|null=null,from:number|null=null,to:number|null=null,url:string|null=null,quizId:string|null=null;
 const objective=body.objective==='memorize'?'memorize':'review';
 if(kind==='quran'){
  surah=body.surah;from=body.from;to=body.to;const meta=surahs.find(row=>row.number===surah);
  if(!meta||!Number.isInteger(from)||!Number.isInteger(to)||from!<1||to!<from!||to!>meta.numberOfAyahs)throw new HomeworkError('Choose a surah and a valid ayah range.');
 }
 if(kind==='halaqa'){url=lessonUrl(body.lessonUrl);if(!url)throw new HomeworkError('Paste a YouTube video or playlist link.');}
 if(kind==='quiz'||(kind==='halaqa'&&body.quizId)){
  if(!validId(body.quizId)||!await db().prepare('SELECT id FROM quizzes WHERE id=? AND published=1').bind(body.quizId).first())throw new HomeworkError('Choose a published quiz.');quizId=body.quizId;
 }
 return {week,title,body:text,studentId,kind,objective,surah,from,to,lessonUrl:url,quizId};
}
function decorate(row:any){const meta=surahs.find(item=>item.number===row.surah);return {...row,surahName:meta?.name||null,surahEnglishName:meta?.englishName||null};}
export async function listAssignments(week:string,teacher:boolean,studentId:string|null){
 if(teacher){
  const [rows,marks,students,quizzes]:any[]=await Promise.all([
   db().prepare('SELECT a.*,s.name student_name FROM assignments a LEFT JOIN students s ON s.id=a.student_id WHERE a.week=? ORDER BY a.created_at,a.id').bind(week).all(),
   db().prepare('SELECT p.*,s.name,s.archived_at FROM assignment_progress p JOIN students s ON s.id=p.student_id JOIN assignments a ON a.id=p.assignment_id WHERE a.week=? ORDER BY s.name COLLATE NOCASE').bind(week).all(),
   db().prepare('SELECT id,name FROM students WHERE archived_at IS NULL ORDER BY name COLLATE NOCASE').all(),
   db().prepare('SELECT id,title FROM quizzes WHERE published=1 ORDER BY created_at DESC').all()
  ]);
  const enriched=(rows.results||[]).map((row:any)=>{const progress=(marks.results||[]).filter((mark:any)=>mark.assignment_id===row.id).map((mark:any)=>({studentId:mark.student_id,name:mark.name,status:mark.status,note:mark.note,feedback:mark.feedback,version:mark.version,updatedAt:mark.completed_at,reviewedAt:mark.reviewed_at,archived:!!mark.archived_at}));return decorate({...row,progress,prepared:progress.filter((p:any)=>['ready','reviewed'].includes(p.status)).map((p:any)=>({name:p.name,completedAt:p.updatedAt}))});});
  return {assignments:enriched.filter((row:any)=>!row.withdrawn_at),removed:enriched.filter((row:any)=>row.withdrawn_at),students:students.results||[],quizzes:quizzes.results||[]};
 }
 const [rows,results]:any[]=await Promise.all([
  db().prepare('SELECT a.id,a.week,a.title,a.body,a.kind,a.objective,a.surah,a.ayah_from,a.ayah_to,a.lesson_url,a.quiz_id,a.revision,a.updated_at,a.student_id IS NOT NULL individual,p.status,p.note,p.feedback,p.version,p.reviewed_at,EXISTS(SELECT 1 FROM quizzes q WHERE q.id=a.quiz_id AND q.published=1) quiz_available FROM assignments a LEFT JOIN assignment_progress p ON p.assignment_id=a.id AND p.student_id=? WHERE a.week=? AND a.withdrawn_at IS NULL AND (a.student_id IS NULL OR a.student_id=?) ORDER BY a.created_at,a.id').bind(studentId,week,studentId).all(),
  studentId?db().prepare('SELECT quiz_id,score,max FROM submissions WHERE student_id=? ORDER BY created_at DESC').bind(studentId).all():Promise.resolve({results:[]})
 ]);
 return {assignments:(rows.results||[]).map((row:any)=>{const result=(results.results||[]).find((item:any)=>item.quiz_id===row.quiz_id);return decorate({...row,individual:!!row.individual,status:row.status||'pending',note:row.note||'',feedback:row.feedback||'',version:row.version||'',completed:['ready','reviewed'].includes(row.status),quizAvailable:!!row.quiz_available,quizCompleted:!!result,quizScore:result?.score??null,quizMax:result?.max??null});}),authenticated:!!studentId};
}
export async function saveAssignment(input:any,id?:unknown,revision?:unknown){
 const v=await assignmentInput(input),now=new Date().toISOString(),next=crypto.randomUUID();
 const values=[v.week,v.title,v.body,v.studentId,v.kind,v.objective,v.surah,v.from,v.to,v.lessonUrl,v.quizId];
 if(id===undefined){
  if(input.requestId!==undefined&&(typeof input.requestId!=='string'||!/^[a-f0-9-]{36}$/i.test(input.requestId)))throw new HomeworkError('Reopen the homework form before assigning.');
  const fresh=input.requestId||crypto.randomUUID();
  await db().prepare('INSERT INTO assignments(week,title,body,student_id,kind,objective,surah,ayah_from,ayah_to,lesson_url,quiz_id,id,revision,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(...values,fresh,next,now,now).run();
  const stored:any=await db().prepare('SELECT * FROM assignments WHERE id=?').bind(fresh).first();
  if(!stored||stored.withdrawn_at||JSON.stringify([stored.week,stored.title,stored.body,stored.student_id,stored.kind,stored.objective,stored.surah,stored.ayah_from,stored.ayah_to,stored.lesson_url,stored.quiz_id])!==JSON.stringify(values))throw new HomeworkError('This assignment already changed. Reload homework before creating another copy.',409);
  return {id:fresh,reset:false};
 }
 if(!validId(id)||!validId(revision))throw new HomeworkError('Choose homework to edit.');
 const old:any=await db().prepare('SELECT * FROM assignments WHERE id=? AND revision=? AND withdrawn_at IS NULL').bind(id,revision).first();
 if(!old)throw new HomeworkError('This homework changed. Keep a copy of your draft, then cancel and reload.',409);
 const reset=JSON.stringify([old.week,old.body,old.student_id,old.kind,old.objective,old.surah,old.ayah_from,old.ayah_to,old.lesson_url,old.quiz_id])!==JSON.stringify([v.week,v.body,v.studentId,v.kind,v.objective,v.surah,v.from,v.to,v.lessonUrl,v.quizId]);
 const statements=[db().prepare('UPDATE assignments SET week=?,title=?,body=?,student_id=?,kind=?,objective=?,surah=?,ayah_from=?,ayah_to=?,lesson_url=?,quiz_id=?,revision=?,updated_at=? WHERE id=? AND revision=? AND withdrawn_at IS NULL').bind(...values,next,now,id,revision)];
 if(reset)statements.push(db().prepare('DELETE FROM assignment_progress WHERE assignment_id=? AND EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=?)').bind(id,id,next));
 const results:any=await db().batch(statements);if(!results[0]?.meta?.changes)throw new HomeworkError('This homework changed. Keep a copy of your draft, then cancel and reload.',409);
 return {id,reset};
}
export async function removeAssignment(id:unknown,revision:unknown){
 if(!validId(id)||!validId(revision))throw new HomeworkError('Choose homework to remove.');const next=crypto.randomUUID();
 const result=await db().prepare('UPDATE assignments SET withdrawn_at=?,revision=? WHERE id=? AND revision=? AND withdrawn_at IS NULL').bind(new Date().toISOString(),next,id,revision).run();
 if(!result.meta?.changes)throw new HomeworkError('This homework changed. Reload it before removing it.',409);return {id,revision:next};
}
export async function restoreAssignment(id:unknown,revision:unknown){
 if(!validId(id)||!validId(revision))throw new HomeworkError('Choose homework to restore.');
 const result=await db().prepare('UPDATE assignments SET withdrawn_at=NULL,revision=? WHERE id=? AND revision=? AND withdrawn_at IS NOT NULL AND (student_id IS NULL OR EXISTS(SELECT 1 FROM students s WHERE s.id=student_id AND s.archived_at IS NULL))').bind(crypto.randomUUID(),id,revision).run();
 if(!result.meta?.changes)throw new HomeworkError('This homework changed, or its student is archived. Reload it before restoring.',409);
}
async function available(id:string,studentId:string,revision:string){
 const row:any=await db().prepare('SELECT a.id FROM assignments a JOIN students s ON s.id=? AND s.archived_at IS NULL WHERE a.id=? AND a.withdrawn_at IS NULL AND (a.student_id IS NULL OR a.student_id=?) AND a.revision=?').bind(studentId,id,studentId,revision).first();
 if(!row)throw new HomeworkError('This homework changed or is no longer available. Reload homework.',409);
}
export async function markPrepared(studentId:string,body:any){
 if(!validId(body?.id)||!validId(body.revision))throw new HomeworkError('Choose homework to update.');
 const status=body.status??(typeof body.completed==='boolean'?(body.completed?'ready':'pending'):'');
 if(!['pending','ready','help'].includes(status)||typeof (body.note??'')!=='string'||(body.note||'').length>300)throw new HomeworkError('Choose ready, need help, or not ready.');
 await available(body.id,studentId,body.revision);
 const current:any=await db().prepare('SELECT version FROM assignment_progress WHERE assignment_id=? AND student_id=?').bind(body.id,studentId).first();
 const expected=body.version===undefined?(current?.version||''):body.version;if(typeof expected!=='string'||expected.length>100)throw new HomeworkError('Reload homework before updating it.');
 const result=await db().prepare('INSERT INTO assignment_progress(assignment_id,student_id,completed_at,status,note,version) SELECT ?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=? AND withdrawn_at IS NULL AND (student_id IS NULL OR student_id=?)) AND EXISTS(SELECT 1 FROM students WHERE id=? AND archived_at IS NULL) AND (?=\'\' OR EXISTS(SELECT 1 FROM assignment_progress WHERE assignment_id=? AND student_id=? AND version=?)) ON CONFLICT(assignment_id,student_id) DO UPDATE SET completed_at=excluded.completed_at,status=excluded.status,note=excluded.note,version=excluded.version,reviewed_at=NULL WHERE assignment_progress.version=?').bind(body.id,studentId,new Date().toISOString(),status,(body.note||'').trim(),crypto.randomUUID(),body.id,body.revision,studentId,studentId,expected,body.id,studentId,expected,expected).run();
 if(!result.meta?.changes)throw new HomeworkError('This homework was updated elsewhere. Reload it before saving.',409);
}
export async function reviewAssignment(body:any){
 if(!validId(body?.id)||!validId(body.studentId)||!validId(body.revision)||!['reviewed','repeat'].includes(body.status)||typeof body.feedback!=='string'||body.feedback.length>500||typeof body.version!=='string'||body.version.length>100)throw new HomeworkError('Choose a student and a review result.');
 if(body.status==='repeat'&&!body.feedback.trim())throw new HomeworkError('Add a short instruction for what to practise again.');
 await available(body.id,body.studentId,body.revision);
 const result=await db().prepare('INSERT INTO assignment_progress(assignment_id,student_id,completed_at,status,feedback,version,reviewed_at,teacher_status,teacher_reviewed_at) SELECT ?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM assignments a JOIN students s ON s.id=? AND s.archived_at IS NULL WHERE a.id=? AND a.revision=? AND a.withdrawn_at IS NULL AND (a.student_id IS NULL OR a.student_id=?)) AND (?=\'\' OR EXISTS(SELECT 1 FROM assignment_progress WHERE assignment_id=? AND student_id=? AND version=?)) ON CONFLICT(assignment_id,student_id) DO UPDATE SET status=excluded.status,feedback=excluded.feedback,version=excluded.version,reviewed_at=excluded.reviewed_at,teacher_status=excluded.teacher_status,teacher_reviewed_at=excluded.teacher_reviewed_at WHERE assignment_progress.version=?').bind(body.id,body.studentId,new Date().toISOString(),body.status,body.feedback.trim(),crypto.randomUUID(),new Date().toISOString(),body.status,new Date().toISOString(),body.studentId,body.id,body.revision,body.studentId,body.version,body.id,body.studentId,body.version,body.version).run();
 if(!result.meta?.changes)throw new HomeworkError('This student’s progress changed. Reload before reviewing.',409);
}
