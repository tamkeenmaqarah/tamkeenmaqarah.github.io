import {sameOrigin} from './server';
const PAGES_ORIGINS=['https://yasinnaseri.github.io','https://tamkeenmaqarah.github.io'];
export const allowedPublicOrigin=(req:Request)=>sameOrigin(req)||PAGES_ORIGINS.includes(req.headers.get('origin')||'');
export function publicCors(req:Request,response:Response,method:'GET'|'POST'|'DELETE'){
 response.headers.set('Vary','Origin');
 if(PAGES_ORIGINS.includes(req.headers.get('origin')||'')){
  response.headers.set('Access-Control-Allow-Origin',req.headers.get('origin')!);
  response.headers.set('Access-Control-Allow-Methods',method+', OPTIONS');
  response.headers.set('Access-Control-Allow-Headers','Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age','600');
 }
 return response;
}
export function publicPreflight(req:Request,method:'GET'|'POST'|'DELETE'){
 return publicCors(req,new Response(null,{status:allowedPublicOrigin(req)?204:403}),method);
}
