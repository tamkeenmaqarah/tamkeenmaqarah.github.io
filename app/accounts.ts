import {db} from './server';
import {missesFrom} from './revisit';
import {cleanName,digest,nameProblem,passwordProblem,recoveryKey,recoveryProblem,sameHash} from './door';
import {googleIdentity} from './google';

export {digest,sameHash};
export function bearer(req:Request){
 const header=req.headers.get('authorization')||'';
 const token=header.startsWith('Bearer ')?header.slice(7).trim():'';
 return /^[a-f0-9]{64}$/.test(token)?token:null;
}
export async function accountsReady(){
 try{await db().prepare('SELECT id FROM students LIMIT 1').first();return true}catch{return false}
}
export async function studentFrom(req:Request){
 const token=bearer(req);
 if(!token)return null;
 const tokenHash=await digest(token);
 try{
  const row:any=await db().prepare('SELECT s.id,s.name,s.google_sub,s.has_password FROM sessions n JOIN students s ON s.id=n.student_id WHERE n.token_hash=?').bind(tokenHash).first();
  return row?{id:row.id as string,name:row.name as string,google:Boolean(row.google_sub),hasPassword:row.has_password!==0}:null;
 }catch{
  const row:any=await db().prepare('SELECT s.id,s.name FROM sessions n JOIN students s ON s.id=n.student_id WHERE n.token_hash=?').bind(tokenHash).first();
  return row?{id:row.id as string,name:row.name as string}:null;
 }
}
export type StoredReview={quizId:string;title:string;name:string;score:number;max:number;misses:{prompt:string;options:string[];correct:number;explanation:string}[]};
export function reviewFrom(value:string|null|undefined):StoredReview|null{
 if(!value)return null;
 try{const parsed=JSON.parse(value);if(!parsed?.misses?.length)return null;return parsed}catch{return null}
}
export function validReview(body:any):StoredReview|null{
 if(!body||typeof body.quizId!=='string'||typeof body.title!=='string'||typeof body.score!=='number'||typeof body.max!=='number'||body.title.length>150)return null;
 if(!Array.isArray(body.misses)||body.misses.length>30)return null;
 const misses=body.misses.map((m:any)=>{
  if(!m||typeof m.prompt!=='string'||m.prompt.length>500||typeof m.explanation!=='string'||m.explanation.length>1000||!Array.isArray(m.options)||m.options.length!==4||!m.options.every((o:any)=>typeof o==='string'&&o.length<=300)||!Number.isInteger(m.correct)||m.correct<0||m.correct>3)return null;
  return {prompt:m.prompt,options:m.options,correct:m.correct,explanation:m.explanation};
 });
 if(misses.some((m:any)=>!m))return null;
 return {quizId:body.quizId,title:body.title,name:'',score:body.score,max:body.max,misses};
}
export async function latestMisses(studentId:string){
 const saved:any=await db().prepare('SELECT name,review FROM students WHERE id=?').bind(studentId).first();
 if(!saved)return null;
 if(saved.review!==null&&saved.review!==undefined){const parsed=reviewFrom(saved.review);return parsed?{...parsed,name:saved.name}:null}
 const row:any=await db().prepare('SELECT s.score,s.max,s.answers,q.id quiz_id,q.title,q.questions FROM submissions s JOIN quizzes q ON q.id=s.quiz_id WHERE s.student_id=? ORDER BY s.created_at DESC LIMIT 1').bind(studentId).first();
 if(!row)return null;
 let answers:number[]=[],questions:{prompt:string;options:string[];correct:number;explanation?:string}[]=[];
 try{answers=JSON.parse(row.answers);questions=JSON.parse(row.questions)}catch{return null}
 const review=questions.map((q,i)=>({correct:q.options[q.correct],explanation:q.explanation||'',right:q.correct===answers[i]}));
 const misses=missesFrom(questions,review);
 if(!misses.length)return null;
 return {quizId:row.quiz_id as string,title:row.title as string,name:saved.name as string,score:row.score as number,max:row.max as number,misses};
}
export async function saveReview(studentId:string,review:StoredReview|null){
 await db().prepare('UPDATE students SET review=? WHERE id=?').bind(review?JSON.stringify({...review,name:''}):'',studentId).run();
}
async function openSessionFor(id:string,name:string){
 const token=await digest(crypto.randomUUID()+crypto.randomUUID());
 await db().prepare('INSERT INTO sessions (token_hash,student_id,created_at) VALUES (?,?,?)').bind(await digest(token),id,new Date().toISOString()).run();
 return {token,student:{id,name}};
}
export async function registerStudent(name:string,password:string,recovery:string){
 const clean=cleanName(name);
 const problem=nameProblem(clean)||passwordProblem(password)||recoveryProblem(recovery,password);
 if(problem)throw Error(problem);
 const existing:any=await db().prepare('SELECT id FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();
 if(existing)throw Error('That name is already in the tent. Sign in instead.');
 const id=crypto.randomUUID();
 await db().prepare('INSERT INTO students (id,name,password_hash,recovery_hash,created_at) VALUES (?,?,?,?,?)').bind(id,clean,await digest(password),await digest(recoveryKey(recovery)),new Date().toISOString()).run();
 return openSessionFor(id,clean);
}
export async function resetPassword(name:string,recovery:string,password:string){
 const clean=cleanName(name);
 const problem=passwordProblem(password)||recoveryProblem(recovery);
 if(problem)throw Error(problem);
 const row:any=await db().prepare('SELECT id,name,recovery_hash FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();
 if(!row?.recovery_hash||!sameHash(row.recovery_hash,await digest(recoveryKey(recovery))))return null;
 await db().prepare('UPDATE students SET password_hash=? WHERE id=?').bind(await digest(password),row.id).run();
 await db().prepare('DELETE FROM sessions WHERE student_id=?').bind(row.id).run();
 return openSessionFor(row.id,row.name);
}
export async function changePassword(studentId:string,current:string,password:string){
 const problem=passwordProblem(password);
 if(problem)throw Error(problem);
 let row:any;
 try{row=await db().prepare('SELECT password_hash,has_password FROM students WHERE id=?').bind(studentId).first()}catch{row=await db().prepare('SELECT password_hash FROM students WHERE id=?').bind(studentId).first()}
 if(!row)return null;
 const unset=row.has_password===0;
 if(!unset&&!sameHash(row.password_hash,await digest(current)))return null;
 const next=await digest(password);
 try{await db().prepare('UPDATE students SET password_hash=?,has_password=1 WHERE id=?').bind(next,studentId).run()}catch{await db().prepare('UPDATE students SET password_hash=? WHERE id=?').bind(next,studentId).run()}
 await db().prepare('DELETE FROM sessions WHERE student_id=?').bind(studentId).run();
 const student:any=await db().prepare('SELECT name FROM students WHERE id=?').bind(studentId).first();
 return openSessionFor(studentId,student.name);
}
export async function openSession(name:string,password:string){
 const clean=cleanName(name);
 if(passwordProblem(password))return null;
 let row:any;
 try{row=await db().prepare('SELECT id,name,password_hash,has_password FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();if(row?.has_password===0)return null}catch{row=await db().prepare('SELECT id,name,password_hash FROM students WHERE name=? COLLATE NOCASE').bind(clean).first()}
 if(!row||!sameHash(row.password_hash,await digest(password)))return null;
 return openSessionFor(row.id,row.name);
}
export async function signInWithGoogle(credential:string,name:string|undefined,clientId:string,linkedStudentId?:string,identify:typeof googleIdentity=googleIdentity){
 let identity:{sub:string;picture?:string|null}|null;
 try{identity=await identify(credential,clientId)}catch{identity=null}
 if(!identity)throw Error('Google could not confirm this sign-in.');
 const sub=identity.sub;
 const syncPicture=async(id:string)=>{if(identity.picture!==undefined)await db().prepare('UPDATE students SET google_picture=? WHERE id=?').bind(identity.picture,id).run()};
 try{
  if(linkedStudentId){
   const owner:any=await db().prepare('SELECT id FROM students WHERE google_sub=?').bind(sub).first();
   if(owner&&owner.id!==linkedStudentId)throw Error('That Google account is already used by another name.');
   await db().prepare('UPDATE students SET google_sub=? WHERE id=?').bind(sub,linkedStudentId).run();
   const student:any=await db().prepare('SELECT id,name,has_password FROM students WHERE id=?').bind(linkedStudentId).first();
   await syncPicture(student.id);
   const session=await openSessionFor(student.id,student.name);
   return {...session,hasPassword:student.has_password!==0};
  }
  const existing:any=await db().prepare('SELECT id,name,has_password FROM students WHERE google_sub=?').bind(sub).first();
  if(existing){await syncPicture(existing.id);const session=await openSessionFor(existing.id,existing.name);return {...session,hasPassword:existing.has_password!==0}}
  if(!name?.trim())return {needsName:true as const};
  const clean=cleanName(name);
  const problem=nameProblem(clean);
  if(problem)throw Error(problem);
  const byName:any=await db().prepare('SELECT id FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();
  if(byName)throw Error('That name is already in the tent. Sign in with the password, then connect Google.');
  const id=crypto.randomUUID();
  await db().prepare('INSERT INTO students (id,name,password_hash,google_sub,has_password,created_at) VALUES (?,?,?,?,?,?)').bind(id,clean,await digest(crypto.randomUUID()),sub,0,new Date().toISOString()).run();
  await syncPicture(id);
  const session=await openSessionFor(id,clean);
  return {...session,hasPassword:false};
 }catch(e:any){const message=e?.message||'';if(/no such column/i.test(message))throw Error('Google sign-in is not available on this server yet.');if(/google_sub/i.test(message))throw Error('That Google account is already used by another name.');if(/unique|constraint/i.test(message))throw Error('That name is already in the tent. Sign in with the password, then connect Google.');throw e}
}
