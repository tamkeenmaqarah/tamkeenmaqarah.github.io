import {env} from 'cloudflare:workers';
import {NextResponse} from 'next/server';
import {db,isTeacher,sameOrigin} from '../../server';
import {configured} from '../../ai';
import {getCommunity} from '../../community-data';
import {accountsReady,latestMisses,studentFrom} from '../../accounts';
import {activeGoogleClientId} from '../../google';
import {profileFor} from '../../profiles';
import {publicCors,publicPreflight} from '../../public-cors';
export const dynamic='force-dynamic';
export function OPTIONS(req:Request){return publicPreflight(req,'GET')}
async function signedIn(req:Request){
 try{
  if(!await accountsReady())return {accounts:false,account:null,accountMisses:null};
  const account=await studentFrom(req);
  const misses=account?await latestMisses(account.id):null;
  const profile=account?await profileFor(account.id):null;
  return {accounts:true,account:account?{...account,photo:profile?.photo||null}:null,accountMisses:misses?{...misses,name:account!.name}:null};
 }catch{return {accounts:false,account:null,accountMisses:null}}
}
export async function GET(req:Request){const respond=(body:any,init?:ResponseInit)=>publicCors(req,NextResponse.json(body,init),'GET');try{const teacher=(!req.headers.get('origin')||sameOrigin(req))&&await isTeacher(),url=new URL(req.url),id=url.searchParams.get('quiz');let query=teacher?'SELECT * FROM quizzes ORDER BY created_at DESC':'SELECT * FROM quizzes WHERE published=1 ORDER BY created_at DESC';const data=await db().prepare(query).all();const quizzes=(data.results||[]).map((q:any)=>({...q,questions:JSON.parse(q.questions).map((x:any)=>teacher?x:{prompt:x.prompt,options:x.options})}));let submissions:any[]=[];let records:any[]=[];if(teacher){submissions=(await db().prepare('SELECT id,quiz_id,name,answers,score,max,created_at FROM submissions ORDER BY created_at DESC LIMIT 1000').all()).results||[];records=(await db().prepare('SELECT * FROM records ORDER BY regular+bonus DESC').all()).results||[]}const moments=teacher?(await db().prepare('SELECT * FROM moments ORDER BY created_at DESC LIMIT 30').all()).results||[]:[];const account=await signedIn(req);const googleId=activeGoogleClientId((env as any).GOOGLE_CLIENT_ID);return respond({teacher,publicSiteUrl:(env as any).PUBLIC_SITE_URL||'https://tamkeenmaqarah.github.io/',aiConfigured:teacher&&configured(),...(googleId?{googleClientId:googleId}:{}),community:await getCommunity(),moments,quizzes:id?quizzes.filter((q:any)=>q.id===id):quizzes,submissions,records,...account},{headers:{'Cache-Control':'no-store'}})}catch{return respond({error:'Could not load quizzes. Please try again.'},{status:503})}}
