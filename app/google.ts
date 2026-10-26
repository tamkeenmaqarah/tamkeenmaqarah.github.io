export function googlePicture(value: unknown): string | null {
 if (typeof value !== 'string' || value.length > 1000) return null;
 try {const url=new URL(value); return url.protocol==='https:' && !url.username && !url.password && !url.port && (url.hostname==='googleusercontent.com'||url.hostname.endsWith('.googleusercontent.com')) ? url.href : null;} catch {return null;}
}
export const PUBLIC_GOOGLE_CLIENT_ID='883985581593-3sa5cjscjk0mhfdeiho8pi857qqqr2v3.apps.googleusercontent.com';
export function activeGoogleClientId(value:unknown){return googleClientId(value)||googleClientId(PUBLIC_GOOGLE_CLIENT_ID)}
export function googleClientId(value:unknown){
 if(typeof value!=='string')return '';
 const id=value.trim();
 if(id.length>200||!/^[0-9]{6,30}-[A-Za-z0-9_-]{8,80}\.apps\.googleusercontent\.com$/.test(id))return '';
 return id;
}
function bytes(part:string){
 const pad=part.length%4===0?'':'='.repeat(4-(part.length%4));
 const raw=atob(part.replace(/-/g,'+').replace(/_/g,'/')+pad);
 return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
export async function googleIdentity(token:string,clientId:string,fetchImpl:typeof fetch=fetch){
 const parts=token.split('.');
 if(parts.length!==3||!googleClientId(clientId))return null;
 let header:any,payload:any;
 try{header=JSON.parse(new TextDecoder().decode(bytes(parts[0])));payload=JSON.parse(new TextDecoder().decode(bytes(parts[1])))}catch{return null}
 if(header.alg!=='RS256'||typeof header.kid!=='string')return null;
 if(payload.iss!=='accounts.google.com'&&payload.iss!=='https://accounts.google.com')return null;
 const aud=Array.isArray(payload.aud)?payload.aud:[payload.aud];
 if(!aud.includes(clientId))return null;
 if(typeof payload.exp!=='number'||payload.exp*1000<Date.now()-60_000)return null;
 if(typeof payload.sub!=='string'||payload.sub.length<6||payload.sub.length>255)return null;
 let certs:Response;
 try{certs=await fetchImpl('https://www.googleapis.com/oauth2/v3/certs',{headers:{accept:'application/json'}})}catch{return null}
 if(!certs.ok)return null;
 const body:any=await certs.json();
 const jwk=(body.keys||[]).find((key:any)=>key.kid===header.kid&&key.kty==='RSA'&&key.n&&key.e);
 if(!jwk)return null;
 const key=await crypto.subtle.importKey('jwk',{kty:'RSA',n:jwk.n,e:jwk.e,alg:'RS256',ext:true},{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 const signed=new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
 const ok=await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,bytes(parts[2]),signed);
 return ok?{sub:payload.sub,picture:googlePicture(payload.picture)}:null;
}
