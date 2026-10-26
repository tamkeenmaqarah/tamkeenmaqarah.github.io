import {db} from './server';
import {missesFrom} from './revisit';

const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export async function digest(value:string){
 const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
 return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export function makeCode(){
 const bytes=crypto.getRandomValues(new Uint8Array(8));
 return [...bytes].map(b=>alphabet[b%alphabet.length]).join('');
}
export function sameHash(stored:string,given:string){let diff=stored.length===given.length?0:1;for(let i=0;i<Math.min(stored.length,given.length);i++)diff|=stored.charCodeAt(i)^given.charCodeAt(i);return diff===0}
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
 const row:any=await db().prepare('SELECT s.id,s.name FROM sessions n JOIN students s ON s.id=n.student_id WHERE n.token_hash=?').bind(await digest(token)).first();
 return row?{id:row.id as string,name:row.name as string}:null;
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
export async function issueCode(name:string){
 const clean=name.trim().replace(/\s+/g,' ');
 if(!clean||clean.length>100)throw Error('Enter the student’s name.');
 const code=makeCode(),hash=await digest(code),now=new Date().toISOString();
 const existing:any=await db().prepare('SELECT id,name FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();
 if(existing){await db().prepare('UPDATE students SET code_hash=? WHERE id=?').bind(hash,existing.id).run();await db().prepare('DELETE FROM sessions WHERE student_id=?').bind(existing.id).run();return {id:existing.id as string,name:existing.name as string,code}}
 const id=crypto.randomUUID();
 await db().prepare('INSERT INTO students (id,name,code_hash,created_at) VALUES (?,?,?,?)').bind(id,clean,hash,now).run();
 return {id,name:clean,code};
}
export async function openSession(name:string,code:string){
 const clean=name.trim().replace(/\s+/g,' ');
 const row:any=await db().prepare('SELECT id,name,code_hash FROM students WHERE name=? COLLATE NOCASE').bind(clean).first();
 const given=await digest(code.trim().toUpperCase());
 if(!row||!sameHash(row.code_hash,given))return null;
 const token=await digest(crypto.randomUUID()+crypto.randomUUID());
 await db().prepare('INSERT INTO sessions (token_hash,student_id,created_at) VALUES (?,?,?)').bind(await digest(token),row.id,new Date().toISOString()).run();
 return {token,student:{id:row.id as string,name:row.name as string}};
}
