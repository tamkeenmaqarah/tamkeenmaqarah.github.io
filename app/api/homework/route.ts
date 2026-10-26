import {NextResponse} from 'next/server';
import {db,isTeacher} from '../../server';
import {allowedPublicOrigin,publicCors} from '../../public-cors';
const NAME=/^[\p{L}][\p{L}\s'.-]*$/u;
const SEED=[
 {name:'Yaseen',body:'Surah al-Jinn, the entire second page.'},
 {name:'Hassonah',body:'Surah Nuh, the first half of the page, ayahs 1–10.'},
 {name:'Ayman',body:'Surah al-Muzzamil, memorize through ayah 10.'},
];
function cors(req:Request,response:Response){
 const result=publicCors(req,response,'POST');
 result.headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');
 result.headers.set('Cache-Control','no-store');
 return result;
}
export function OPTIONS(req:Request){
 return cors(req,new Response(null,{status:allowedPublicOrigin(req)?204:403}));
}
async function ensure(){
 const existed:any=await db().prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='homework'").first();
 await db().prepare('CREATE TABLE IF NOT EXISTS homework (id text PRIMARY KEY, week text NOT NULL, name text NOT NULL, body text NOT NULL, updated_at text NOT NULL)').run();
 if(existed)return;
 const now='2026-10-25T15:18:00.000Z';
 for(const row of SEED){
  const id='2026-11-01:'+row.name.toLocaleLowerCase('en');
  await db().prepare('INSERT OR IGNORE INTO homework (id,week,name,body,updated_at) VALUES (?,?,?,?,?)').bind(id,'2026-11-01',row.name,row.body,now).run();
 }
}
function cleanName(value:unknown){
 if(typeof value!=='string')return '';
 const name=value.trim().replace(/\s+/g,' ');
 if(name.length<2||name.length>40||!NAME.test(name))return '';
 return name;
}
function cleanWeek(value:unknown){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return '';
 const [year,month,day]=value.split('-').map(Number);
 const date=new Date(year,month-1,day);
 if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return '';
 return value;
}
export async function GET(req:Request){
 const respond=(body:any,init?:ResponseInit)=>cors(req,NextResponse.json(body,init));
 if(!allowedPublicOrigin(req)&&!await isTeacher())return respond({error:'Invalid origin'},{status:403});
 try{
  await ensure();
  const week=cleanWeek(new URL(req.url).searchParams.get('week'));
  if(!week)return respond({error:'Choose a Sunday.'},{status:400});
  const rows:any=await db().prepare('SELECT name, body FROM homework WHERE week=? ORDER BY name COLLATE NOCASE').bind(week).all();
  return respond({week,entries:rows.results||[]});
 }catch{
  return respond({error:'Could not load homework. Please try again.'},{status:500});
 }
}
export async function POST(req:Request){
 const respond=(body:any,init?:ResponseInit)=>cors(req,NextResponse.json(body,init));
 if(!allowedPublicOrigin(req))return respond({error:'Invalid origin'},{status:403});
 try{
  if(Number(req.headers.get('content-length'))>8000)return respond({error:'That homework is too long.'},{status:413});
  await ensure();
  const body:any=await req.json();
  const week=cleanWeek(body.week);
  const name=cleanName(body.name);
  const text=typeof body.body==='string'?body.body.trim().replace(/\s+/g,' '):'';
  if(!week)return respond({error:'Choose a Sunday.'},{status:400});
  if(!name)return respond({error:'Use the name the tent knows.'},{status:400});
  if(text.length>500)return respond({error:'That homework is too long.'},{status:400});
  const id=week+':'+name.toLocaleLowerCase('en');
  if(!text){
   await db().prepare('DELETE FROM homework WHERE id=?').bind(id).run();
   return respond({ok:true});
  }
  await db().prepare('INSERT INTO homework (id,week,name,body,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, body=excluded.body, updated_at=excluded.updated_at').bind(id,week,name,text,new Date().toISOString()).run();
  return respond({ok:true});
 }catch{
  return respond({error:'Could not save homework. Please try again.'},{status:500});
 }
}
