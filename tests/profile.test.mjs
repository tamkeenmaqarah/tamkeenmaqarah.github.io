import test from 'node:test';
import assert from 'node:assert/strict';
import {photoUrl,preparePhoto,profileRequest} from '../profile.js';
test('allows only bounded JPEG data or Google image hosts',()=>{
 assert.equal(photoUrl('https://lh3.googleusercontent.com/a/picture'),'https://lh3.googleusercontent.com/a/picture');
 for(const input of ['javascript:alert(1)','data:image/svg+xml;base64,PHN2Zz4=','https://googleusercontent.com.evil.example/a','https://user:pass@lh3.googleusercontent.com/a','https://lh3.googleusercontent.com/'+'a'.repeat(1100)])assert.equal(photoUrl(input),'');
 assert.equal(photoUrl('data:image/jpeg;base64,eA=='),'data:image/jpeg;base64,eA==');
});
test('rejects unsupported or oversized files before decoding',async()=>{
 await assert.rejects(preparePhoto({type:'image/svg+xml',size:10}),/JPG, PNG/);
 await assert.rejects(preparePhoto({type:'image/jpeg',size:9*1024*1024}),/under 8 MB/);
});
test('requires an authenticated session and sends private profile requests with no cookies',async()=>{
 const oldFetch=globalThis.fetch,oldStorage=globalThis.localStorage;
 try{
  globalThis.localStorage={getItem:()=>null};await assert.rejects(profileRequest(),/Sign in again/);
  globalThis.localStorage={getItem:()=> 'a'.repeat(64)};
  globalThis.fetch=async(url,options)=>{assert.equal(url.endsWith('/api/account/profile'),true);assert.equal(options.headers.Authorization,'Bearer '+'a'.repeat(64));assert.equal(options.credentials,'omit');return Response.json({profile:{name:'Ahmed',photo:null,photoSource:'none'}});};
  assert.equal((await profileRequest()).name,'Ahmed');
  globalThis.fetch=async()=>Response.json({error:'Sign in again to update your profile.'},{status:401});await assert.rejects(profileRequest(),/Sign in again/);
  globalThis.fetch=async()=>{throw TypeError('network failed')};await assert.rejects(profileRequest(),/Please try again/);
 }finally{globalThis.fetch=oldFetch;if(oldStorage===undefined)delete globalThis.localStorage;else globalThis.localStorage=oldStorage;}
});
