import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadReciters,loadRecitation,tajweedParts,DEFAULT_RECITER} from '../quran.js';
const catalogue=JSON.parse(readFileSync(new URL('./fixtures/reciters.json',import.meta.url)));
test('reciter catalogue excludes every Alafasy variant, deduplicates recordings, and audio stays bound to the selected reciter',async()=>{
 const old=globalThis.fetch;let calls=0,badHost=false,wrongReciter=false;
 try{
  globalThis.fetch=async url=>{calls++;if(url.includes('/edition?'))return Response.json(catalogue);const number=Number(url.match(/surah\/(\d+)/)[1]),edition=url.split('/').at(-1);return Response.json({code:200,data:{number,numberOfAyahs:2,edition:{identifier:edition},ayahs:[1,2].map(i=>({numberInSurah:i,audio:(badHost?'https://cdn.islamic.network.evil.example':'https://cdn.islamic.network')+'/quran/audio/128/'+(wrongReciter?'ar.alafasy':edition)+'/'+i+'.mp3'}))}});};
  const choices=await loadReciters();assert.equal(choices.length,17);assert.ok(choices.every(r=>!r.identifier.includes('alafasy')));assert.equal(choices.filter(r=>r.identifier.replace(/-\d+$/,'')==='ar.husary').length,1);
  await assert.rejects(loadRecitation(1,'ar.alafasy'),/Choose a reciter/);await assert.rejects(loadRecitation(1,'ar.alafasy-2'),/Choose a reciter/);await assert.rejects(loadRecitation(1,'../../evil'),/Choose a reciter/);
  const minshawi=await loadRecitation(67,DEFAULT_RECITER,undefined,30);assert.equal(minshawi.ayahs[0].audio,'https://everyayah.com/data/Minshawy_Murattal_128kbps/067001.mp3');assert.equal(minshawi.ayahs[29].audio,'https://everyayah.com/data/Minshawy_Murattal_128kbps/067030.mp3');await assert.rejects(loadRecitation(1,DEFAULT_RECITER,undefined,0),/valid ayah/);
  const c=await loadRecitation(67,'ar.husary',undefined,2);assert.equal(c.ayahs.length,2);const cachedCalls=calls;await loadRecitation(67,'ar.husary',undefined,2);assert.equal(calls,cachedCalls);
  const other=await loadRecitation(67,'ar.abdulsamad',undefined,2);assert.match(other.ayahs[0].audio,/ar\.abdulsamad/);assert.equal(calls,cachedCalls+1);
  badHost=true;await assert.rejects(loadRecitation(68,'ar.husary',undefined,2),/could not be loaded/);badHost=false;wrongReciter=true;await assert.rejects(loadRecitation(68,'ar.husary',undefined,2),/could not be loaded/);wrongReciter=false;
  await assert.rejects(loadRecitation(68,'ar.husary',undefined,3),/could not be loaded/);await loadRecitation(68,'ar.husary',undefined,2);await assert.rejects(loadRecitation(0,'ar.husary'),/Choose a surah/);
 }finally{globalThis.fetch=old;}
});
test('Tajweed runs preserve glyphs and marks across nested and untyped source annotations without interpreting HTML',()=>{
 const sample='وَلَا تَعْتَد[o[ُوٓ[s[اْ]‌ۚ] وَ[h:1[ٱ]فْتَرَ[ٮٰ]هُ';
 const runs=tajweedParts(sample);assert.equal(runs.map(run=>run.text).join(''),'وَلَا تَعْتَدُوٓاْ‌ۚ وَٱفْتَرَٮٰهُ');assert.equal(runs.find(run=>run.text==='اْ').rule,'s');assert.equal(runs.find(run=>run.text==='‌ۚ').rule,'o');assert.equal(runs.find(run=>run.text==='ٮٰ').rule,null);
 assert.deepEqual(tajweedParts('<img src=x onerror=alert(1)>'),[{text:'<img src=x onerror=alert(1)>',rule:null}]);
 for(const bad of ['[z[ن]','[h[ن',']ن','[h:bad[ن]'])assert.throws(()=>tajweedParts(bad),/Invalid/);
});
