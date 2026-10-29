import {db} from './server';
export class HomeworkError extends Error{constructor(message:string,public status=400){super(message)}}
export function sundayWeek(value:unknown){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
 const date=new Date(value+'T12:00:00Z');return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===value&&date.getUTCDay()===0?value:null;
}
export async function homeworkBody(req:Request){
 const reader=req.body?.getReader();if(!reader)throw new HomeworkError('Add homework details.');const decoder=new TextDecoder();let text='',size=0;
 try{while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>8000){await reader.cancel();throw new HomeworkError('That homework request is too large.',413);}text+=decoder.decode(part.value,{stream:true});}text+=decoder.decode();}finally{reader.releaseLock();}
 try{return JSON.parse(text)}catch{throw new HomeworkError('The homework request could not be read. Please try again.');}
}
export async function assignmentInput(body:any){
 const week=sundayWeek(body?.week),title=typeof body?.title==='string'?body.title.trim():'',text=typeof body?.body==='string'?body.body.trim():'';
 if(!week)throw new HomeworkError('Choose a Sunday.');
 if(!title||title.length>100||!text||text.length>1000)throw new HomeworkError('Add a title and instructions of up to 1,000 characters.');
 const studentId=body.studentId==null?null:body.studentId;
 if(studentId!==null&&(typeof studentId!=='string'||studentId.length>100||!await db().prepare('SELECT id FROM students WHERE id=?').bind(studentId).first()))throw new HomeworkError('Choose a student from the account list.');
 return {week,title,body:text,studentId};
}
export async function listAssignments(week:string,teacher:boolean,studentId:string|null){
 if(teacher){
  const rows:any=await db().prepare('SELECT a.*,s.name student_name FROM assignments a LEFT JOIN students s ON s.id=a.student_id WHERE a.week=? ORDER BY a.created_at,a.id').bind(week).all();
  const marks:any=await db().prepare('SELECT p.assignment_id,s.name,p.completed_at FROM assignment_progress p JOIN students s ON s.id=p.student_id JOIN assignments a ON a.id=p.assignment_id WHERE a.week=? ORDER BY s.name COLLATE NOCASE').bind(week).all();
  const students:any=await db().prepare('SELECT id,name FROM students ORDER BY name COLLATE NOCASE').all();
  return {assignments:(rows.results||[]).map((row:any)=>({...row,prepared:(marks.results||[]).filter((mark:any)=>mark.assignment_id===row.id).map(({name,completed_at}:any)=>({name,completedAt:completed_at}))})),students:students.results||[]};
 }
 const rows:any=await db().prepare('SELECT a.id,a.week,a.title,a.body,a.revision,a.updated_at,a.student_id IS NOT NULL individual,p.completed_at FROM assignments a LEFT JOIN assignment_progress p ON p.assignment_id=a.id AND p.student_id=? WHERE a.week=? AND (a.student_id IS NULL OR a.student_id=?) ORDER BY a.created_at,a.id').bind(studentId,week,studentId).all();
 return {assignments:(rows.results||[]).map(({completed_at,individual,...row}:any)=>({...row,individual:!!individual,completed:!!completed_at})),authenticated:!!studentId};
}
export async function saveAssignment(input:any,id?:unknown,revision?:unknown){
 const value=await assignmentInput(input),now=new Date().toISOString(),next=crypto.randomUUID();
 if(id===undefined){const fresh=crypto.randomUUID();await db().prepare('INSERT INTO assignments(id,week,title,body,student_id,revision,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)').bind(fresh,value.week,value.title,value.body,value.studentId,next,now,now).run();return {id:fresh};}
 if(typeof id!=='string'||id.length>100||typeof revision!=='string'||revision.length>100)throw new HomeworkError('Choose homework to edit.');
 const results:any=await db().batch([
  db().prepare('UPDATE assignments SET week=?,title=?,body=?,student_id=?,revision=?,updated_at=? WHERE id=? AND revision=?').bind(value.week,value.title,value.body,value.studentId,next,now,id,revision),
  db().prepare('DELETE FROM assignment_progress WHERE assignment_id=? AND EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=?)').bind(id,id,next),
 ]);
 if(!results[0]?.meta?.changes)throw new HomeworkError('This homework changed. Keep a copy of your draft, then cancel and reload.',409);
 return {id};
}
export async function removeAssignment(id:unknown,revision:unknown){
 if(typeof id!=='string'||id.length>100||typeof revision!=='string'||revision.length>100)throw new HomeworkError('Choose homework to remove.');
 const results:any=await db().batch([
  db().prepare('DELETE FROM assignment_progress WHERE assignment_id=? AND EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=?)').bind(id,id,revision),
  db().prepare('DELETE FROM assignments WHERE id=? AND revision=?').bind(id,revision),
 ]);
 if(!results[1]?.meta?.changes)throw new HomeworkError('This homework changed. Reload it before removing it.',409);
}
export async function markPrepared(studentId:string,body:any){
 if(typeof body?.id!=='string'||body.id.length>100||typeof body.revision!=='string'||body.revision.length>100||typeof body.completed!=='boolean')throw new HomeworkError('Choose homework to update.');
 const assignment:any=await db().prepare('SELECT student_id,revision FROM assignments WHERE id=?').bind(body.id).first();
 if(!assignment||(assignment.student_id&&assignment.student_id!==studentId))throw new HomeworkError('This homework is not available.',404);
 if(assignment.revision!==body.revision)throw new HomeworkError('This homework changed. Reload it before marking prepared.',409);
 const result:any=body.completed?await db().prepare('INSERT INTO assignment_progress(assignment_id,student_id,completed_at) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=? AND (student_id IS NULL OR student_id=?)) ON CONFLICT(assignment_id,student_id) DO UPDATE SET completed_at=excluded.completed_at').bind(body.id,studentId,new Date().toISOString(),body.id,body.revision,studentId).run():await db().prepare('DELETE FROM assignment_progress WHERE assignment_id=? AND student_id=? AND EXISTS(SELECT 1 FROM assignments WHERE id=? AND revision=?)').bind(body.id,studentId,body.id,body.revision).run();
 if(body.completed&&!result.meta?.changes)throw new HomeworkError('This homework changed. Reload it before marking prepared.',409);
}
