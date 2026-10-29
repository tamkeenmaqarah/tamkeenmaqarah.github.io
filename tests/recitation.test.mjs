import test from 'node:test';
import assert from 'node:assert/strict';
import {loadRecitation} from '../quran.js';
test('recitation validates edition, complete range and trusted audio URLs, caches success, and leaves failures retryable',async()=>{
 const old=globalThis.fetch;let calls=0,bad=false;
 try{globalThis.fetch=async url=>{calls++;const number=Number(url.match(/surah\/(\d+)/)[1]);return Response.json({code:200,data:{number,numberOfAyahs:2,edition:{identifier:'ar.alafasy'},ayahs:[1,2].map(i=>({numberInSurah:i,audio:(bad?'https://cdn.islamic.network.evil.example':'https://cdn.islamic.network')+'/quran/audio/128/ar.alafasy/'+i+'.mp3'}))}})};
 const chapter=await loadRecitation(67,undefined,2);assert.equal(chapter.ayahs.length,2);await loadRecitation(67,undefined,2);assert.equal(calls,1);
 bad=true;await assert.rejects(loadRecitation(68,undefined,2),/could not be loaded/);bad=false;await assert.rejects(loadRecitation(68,undefined,3),/could not be loaded/);await loadRecitation(68,undefined,2);assert.equal(calls,4);await assert.rejects(loadRecitation(0),/Choose a surah/);
 }finally{globalThis.fetch=old;}
});
