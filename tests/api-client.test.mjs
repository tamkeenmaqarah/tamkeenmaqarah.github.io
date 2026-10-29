import test from 'node:test';
import assert from 'node:assert/strict';
import {requestJSON} from '../api-client.js';
test('authenticated homework/study requests keep tokens server-bound and do not retry rejected writes',async()=>{
 const previous={fetch:globalThis.fetch,storage:globalThis.localStorage};let calls=0;
 try{globalThis.localStorage={getItem:()=> 'b'.repeat(64)};globalThis.fetch=async(url,options)=>{calls++;assert.equal(options.credentials,'omit');assert.equal(options.headers.Authorization,'Bearer '+'b'.repeat(64));assert.ok(!options.body.includes('Bearer'));return Response.json({error:'Connect your account.'},{status:401});};await assert.rejects(requestJSON('/api/assignments/progress',{method:'POST',body:{id:'task',completed:true}}),error=>error.status===401);assert.equal(calls,1);assert.equal(localStorage.getItem('tamkeen-token'),'b'.repeat(64));
 globalThis.fetch=async()=>{throw TypeError('offline')};await assert.rejects(requestJSON('/api/learning',{method:'POST',body:{}}),/Your work is still here/);
 globalThis.fetch=async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));await assert.rejects(requestJSON('/api/learning',{timeout:5}),/too long/);
 }finally{globalThis.fetch=previous.fetch;if(previous.storage===undefined)delete globalThis.localStorage;else globalThis.localStorage=previous.storage;}
});
