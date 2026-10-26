import {NextResponse} from 'next/server';
import {studentFrom} from '../../../accounts';
import {profileFor,saveProfile} from '../../../profiles';
import {validProfileChange} from '../../../../lib/profile-photo.mjs';
import {allowedPublicOrigin,publicCors,publicPreflight} from '../../../public-cors';
export function OPTIONS(req: Request) { const response=publicPreflight(req,'POST');response.headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');return response; }
async function handle(req: Request, save: boolean) {
 const respond = (body: unknown, status = 200) => publicCors(req, NextResponse.json(body, {status,headers:{'Cache-Control':'no-store'}}), save ? 'POST' : 'GET');
 if (!allowedPublicOrigin(req)) return respond({error:'Invalid origin'},403);
 try {
  const student = await studentFrom(req);
  if (!student) return respond({error:'Sign in again to update your profile.'},401);
  let profile;
  if (save) {
   const reader = req.body?.getReader();
   const decoder = new TextDecoder();
   let raw = '', bytes = 0;
   if (reader) try {
    while (true) {
     const chunk = await reader.read();
     if (chunk.done) break;
     bytes += chunk.value.byteLength;
     if (bytes > 120100) {await reader.cancel();return respond({error:'Choose a smaller photo.'},413);}
     raw += decoder.decode(chunk.value,{stream:true});
    }
    raw += decoder.decode();
   } finally {reader.releaseLock();}
   let body;
   try {body=JSON.parse(raw);} catch {return respond({error:'Choose a JPEG photo.'},400);}
   if (!validProfileChange(body)) return respond({error:'Choose a JPEG photo.'},400);
   const current = await profileFor(student.id);
   if (body.source === 'google' && !current?.googlePicture) return respond({error:'Connect Google to use its profile photo.'},400);
   profile = await saveProfile(student.id,body.source,body.photo || null);
  } else profile = await profileFor(student.id);
  return respond({profile:{...profile,google:!!student.google,hasPassword:student.hasPassword!==false}});
 } catch {return respond({error:'Could not load or save your profile. Please try again.'},503);}
}
export function GET(req: Request) {return handle(req,false);}
export function POST(req: Request) {return handle(req,true);}
