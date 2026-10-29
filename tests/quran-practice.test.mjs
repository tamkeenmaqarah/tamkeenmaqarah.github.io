import test from 'node:test';
import assert from 'node:assert/strict';
import {startPractice,ratePractice,assignedPassages} from '../quran.js';
test('Practise again retries the current ayah immediately; only Remembered it advances',()=>{
 let s=startPractice(3,5,30);assert.deepEqual(s.cards,[3,4,5]);s=ratePractice(s,false);assert.equal(s.cards[s.position],3);assert.equal(s.remembered,0);assert.equal(s.attempt,2);s=ratePractice(s,false);assert.equal(s.cards[s.position],3);assert.equal(s.attempt,3);s=ratePractice(s,true);assert.equal(s.cards[s.position],4);assert.equal(s.attempt,1);assert.equal(s.remembered,1);s=ratePractice(s,true);s=ratePractice(s,false);assert.equal(s.cards[s.position],5);assert.equal(s.done,false);s=ratePractice(s,true);assert.equal(s.done,true);assert.equal(s.remembered,3);assert.equal(ratePractice(s,true),s);
 const one=ratePractice(startPractice(7,7,7),false);assert.equal(one.done,false);assert.equal(one.cards[one.position],7);assert.equal(ratePractice(one,true).done,true);
 for(const range of [[0,3,30],[5,3,30],[1,31,30],[1.5,3,30]])assert.throws(()=>startPractice(...range),/valid ayah/);
});
test('only typed, bounded Quran homework becomes an assigned highlight; notes and malformed ranges do not',()=>{
 const base={id:'own',revision:'r',title:'Review',status:'pending',kind:'quran',surah:67,ayah_from:3,ayah_to:5};
 assert.deepEqual(assignedPassages([base,null,{...base,kind:'other',body:'Read 67:3–5'},{...base,surah:115},{...base,ayah_from:0},{...base,ayah_to:2}]),[{id:'own',revision:'r',title:'Review',status:'pending',surah:67,from:3,to:5}]);
});
