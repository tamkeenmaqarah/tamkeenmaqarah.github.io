import { env } from 'cloudflare:workers';
import {cookies} from 'next/headers';
export async function isTeacher(){const key=(env as any).TEACHER_KEY;const c=(await cookies()).get('tamkeen-teacher')?.value;if(!key||!c||c.length!==key.length)return false;let d=0;for(let i=0;i<c.length;i++)d|=c.charCodeAt(i)^key.charCodeAt(i);return d===0}
export function db(){if(!env.DB)throw Error('Database unavailable');return env.DB}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
export function validQuiz(q:any){return q&&typeof q.title==='string'&&q.title.trim().length>0&&q.title.length<=150&&typeof q.description==='string'&&q.description.length<=2000&&Array.isArray(q.questions)&&q.questions.length>=1&&q.questions.length<=50&&q.questions.every((x:any)=>typeof x.prompt==='string'&&x.prompt.trim()&&x.prompt.length<=2000&&Array.isArray(x.options)&&x.options.length===4&&x.options.every((o:any)=>typeof o==='string'&&o.trim()&&o.length<=500)&&Number.isInteger(x.correct)&&x.correct>=0&&x.correct<4&&typeof x.explanation==='string'&&x.explanation.length<=2000)}
