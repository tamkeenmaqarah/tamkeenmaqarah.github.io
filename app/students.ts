import {db} from './server';
import {HomeworkError} from './assignments';
const queries={
 submissions:'SELECT COUNT(*) n FROM submissions WHERE student_id=? OR (student_id IS NULL AND name=? COLLATE NOCASE)',
 notes:'SELECT COUNT(*) n FROM homework WHERE name=? COLLATE NOCASE',
 grades:'SELECT COUNT(*) n FROM records WHERE name=? COLLATE NOCASE',
 moments:'SELECT COUNT(*) n FROM moments WHERE name=? COLLATE NOCASE',
 assignments:'SELECT COUNT(*) n FROM assignments WHERE student_id=?',
 progress:'SELECT COUNT(*) n FROM assignment_progress WHERE student_id=? OR assignment_id IN(SELECT id FROM assignments WHERE student_id=?)',
 sessions:'SELECT COUNT(*) n FROM sessions WHERE student_id=?'
};
type Counts=Record<keyof typeof queries,number>;
function bindings(key:string,row:any){return key==='submissions'?[row.id,row.name]:['notes','grades','moments'].includes(key)?[row.name]:key==='progress'?[row.id,row.id]:[row.id];}
async function student(id:unknown){if(typeof id!=='string'||!id||id.length>100)throw new HomeworkError('Choose a student.');const row:any=await db().prepare('SELECT id,name,created_at,archived_at,management_revision revision FROM students WHERE id=?').bind(id).first();if(!row)throw new HomeworkError('This student no longer exists. Reload the student list.',404);return row;}
export async function listStudents(){const rows:any=await db().prepare('SELECT id,name,created_at,archived_at,management_revision revision FROM students ORDER BY name COLLATE NOCASE').all();return {students:rows.results||[]};}
export async function studentDetails(id:unknown){const row=await student(id);const counts={} as Counts;for(const [key,query]of Object.entries(queries)){const result:any=await db().prepare(query).bind(...bindings(key,row)).first();counts[key as keyof Counts]=Number(result.n);}return {student:row,counts};}
export async function setStudentArchive(body:any){
 const row=await student(body?.id);if(typeof body.revision!=='string'||body.revision!==row.revision)throw new HomeworkError('This student changed. Reload before continuing.',409);
 if(!['archive','restore'].includes(body.action)||Boolean(row.archived_at)!==(body.action==='restore'))throw new HomeworkError('Reload the student list before continuing.',409);
 const next=crypto.randomUUID(),archived=body.action==='archive'?new Date().toISOString():null;
 const statements=[db().prepare('UPDATE students SET archived_at=?,management_revision=? WHERE id=? AND management_revision=?').bind(archived,next,row.id,row.revision)];
 if(archived)statements.push(db().prepare('DELETE FROM sessions WHERE student_id=? AND EXISTS(SELECT 1 FROM students WHERE id=? AND management_revision=?)').bind(row.id,row.id,next));
 const results:any=await db().batch(statements);if(!results[0]?.meta?.changes)throw new HomeworkError('This student changed. Reload before continuing.',409);
}
export async function deleteStudent(body:any){
 const row=await student(body?.id);if(!row.archived_at)throw new HomeworkError('Archive this student before permanently deleting the account.');
 if(body.confirmName!==row.name||typeof body.revision!=='string'||body.revision!==row.revision)throw new HomeworkError('Type the student’s exact name and reload their removal preview.',409);
 const counts=body.counts;if(!counts||Object.keys(queries).some(key=>!Number.isInteger(counts[key])||counts[key]<0))throw new HomeworkError('Reload the removal preview before deleting.',409);
 // The first statement guards the entire batch against a stale preview; a fresh nonce gates every deletion.
 const nonce=crypto.randomUUID(),guards=Object.entries(queries).map(([,query])=>'('+query.replace('SELECT COUNT(*) n','SELECT COUNT(*)')+')=?').join(' AND '),args:any[]=[nonce,row.id,row.revision,row.archived_at];
 for(const key of Object.keys(queries)){args.push(...bindings(key,row),counts[key]);}
 const gate='EXISTS(SELECT 1 FROM students WHERE id=? AND management_revision=?)';
 const statements=[db().prepare('UPDATE students SET management_revision=? WHERE id=? AND management_revision=? AND archived_at=? AND '+guards).bind(...args),
  db().prepare('DELETE FROM sessions WHERE student_id=? AND '+gate).bind(row.id,row.id,nonce),
  db().prepare('DELETE FROM assignment_progress WHERE (student_id=? OR assignment_id IN(SELECT id FROM assignments WHERE student_id=?)) AND '+gate).bind(row.id,row.id,row.id,nonce),
  db().prepare('DELETE FROM assignments WHERE student_id=? AND '+gate).bind(row.id,row.id,nonce),
  db().prepare('DELETE FROM submissions WHERE (student_id=? OR (student_id IS NULL AND name=? COLLATE NOCASE)) AND '+gate).bind(row.id,row.name,row.id,nonce),
  db().prepare('DELETE FROM homework WHERE name=? COLLATE NOCASE AND '+gate).bind(row.name,row.id,nonce),
  db().prepare('DELETE FROM records WHERE name=? COLLATE NOCASE AND '+gate).bind(row.name,row.id,nonce),
  db().prepare('DELETE FROM moments WHERE name=? COLLATE NOCASE AND '+gate).bind(row.name,row.id,nonce),
  db().prepare('DELETE FROM students WHERE id=? AND management_revision=?').bind(row.id,nonce)];
 const results:any=await db().batch(statements);if(!results[0]?.meta?.changes||!results.at(-1)?.meta?.changes)throw new HomeworkError('The student’s records changed. Reload the removal preview before deleting.',409);
}
