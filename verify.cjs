const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('legacy/app.js','utf8');
const prefix=src.slice(0,src.indexOf('let state='));
const context={};vm.createContext(context);vm.runInContext(prefix+';this.data=initial;this.check=validate;',context);
const d=JSON.parse(JSON.stringify(context.data));
assert.deepEqual(d.quizzes[0].results.map(r=>r.answers.reduce((a,b)=>a+b,0)+r.bonus),[11,10,8,8,5,4]);
assert.equal((d.quizzes[0].results.reduce((n,r)=>n+r.answers.reduce((a,b)=>a+b,0)+r.bonus,0)/6/13*100).toFixed(1),'59.0');
context.check(d);
for(const corrupt of [x=>x.quizzes[0].results[0].bonus=2,x=>x.quizzes[0].results[0].answers[0]=5,x=>x.students.push(x.students[0]),x=>x.quizzes[0].results[0].studentId='missing',x=>x.quizzes[0].results.push(x.quizzes[0].results[0]),x=>{x.quizzes[0].results[0].answers=null;x.quizzes[0].results[0].score=-1}]){const next=JSON.parse(JSON.stringify(d));corrupt(next);assert.throws(()=>context.check(next))}
console.log('Verified historical totals, average, valid backup and 6 invalid import cases.');
