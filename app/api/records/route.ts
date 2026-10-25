import {NextResponse} from 'next/server';
import {db,isTeacher,sameOrigin} from '../../server';
export async function PUT(req:Request){if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required'},{status:403});try{const r=(await req.json() as any);if(typeof r.id!=='string'||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||!Number.isInteger(r.regular)||r.regular<0||r.regular>13||!Number.isInteger(r.bonus)||r.bonus<0||r.bonus>1)throw Error();await db().prepare('INSERT INTO records (id,name,regular,bonus,max) VALUES (?,?,?,?,13) ON CONFLICT(id) DO UPDATE SET name=excluded.name,regular=excluded.regular,bonus=excluded.bonus').bind(r.id,r.name.trim(),r.regular,r.bonus).run();return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Use a score from 0–13 and a bonus from 0–1.'},{status:400})}}
export async function POST(req:Request){
 if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required'},{status:403});
 try{
  const {records}:any=await req.json();
  if(!Array.isArray(records)||records.length<1||records.length>500)throw Error();
  const ids=new Set();
  for(const r of records){
   if(typeof r.id!=='string'||!r.id||ids.has(r.id)||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||!Number.isInteger(r.regular)||r.regular<0||r.regular>13||!Number.isInteger(r.bonus)||r.bonus<0||r.bonus>1)throw Error();
   ids.add(r.id);
  }
  await db().batch(records.map(r=>db().prepare('INSERT INTO records (id,name,regular,bonus,max) VALUES (?,?,?,?,13) ON CONFLICT(id) DO UPDATE SET name=excluded.name,regular=excluded.regular,bonus=excluded.bonus').bind(r.id,r.name.trim(),r.regular,r.bonus)));
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Check each grade: regular points must be 0–13 and bonus points 0–1. No grades were saved.'},{status:400})}
}
