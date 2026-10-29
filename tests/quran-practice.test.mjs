import test from 'node:test';
import assert from 'node:assert/strict';
import {startPractice,ratePractice,assignedPassages} from '../quran.js';
test('recall keeps the exact selected range and repeats only flagged ayahs until self-checked',()=>{
 let s=startPractice(3,5,30);assert.deepEqual(s.cards,[3,4,5]);s=ratePractice(s,false);s=ratePractice(s,true);s=ratePractice(s,false);assert.deepEqual(s.cards,[3,5]);assert.equal(s.round,2);assert.equal(s.remembered,1);s=ratePractice(s,true);s=ratePractice(s,false);assert.deepEqual(s.cards,[5]);assert.equal(s.round,3);s=ratePractice(s,true);assert.equal(s.done,true);assert.equal(s.remembered,3);assert.equal(s.total,3);assert.equal(ratePractice(s,true),s);
 const one=ratePractice(startPractice(7,7,7),false);assert.equal(one.done,false);assert.deepEqual(one.cards,[7]);assert.equal(one.round,2);
 for(const range of [[0,3,30],[5,3,30],[1,31,30],[1.5,3,30]])assert.throws(()=>startPractice(...range),/valid ayah/);
});
test('only typed, bounded Quran homework becomes an assigned highlight; notes and malformed ranges do not',()=>{
 const base={id:'own',revision:'r',title:'Review',status:'pending',kind:'quran',surah:67,ayah_from:3,ayah_to:5};
 assert.deepEqual(assignedPassages([base,null,{...base,kind:'other',body:'Read 67:3–5'},{...base,surah:115},{...base,ayah_from:0},{...base,ayah_to:2}]),[{id:'own',revision:'r',title:'Review',status:'pending',surah:67,from:3,to:5}]);
});
