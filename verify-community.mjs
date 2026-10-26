import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
const require=createRequire(import.meta.url),cache={};
function load(file,mocks={}){
 if(cache[file])return cache[file];
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{
  exports,Request,Response,URL,
  require:name=>mocks[name]??(name==='./ui'?load('app/ui.tsx'):require(name))
 });
 return cache[file]=exports;
}
const ui=load('app/ui.tsx'),components=load('app/community.tsx');
const rows=[{id:'a',name:'Yaseen',score:11,max:13},{id:'b',name:'Adam',score:8,max:13},{id:'c',name:'Hamza',score:8,max:13}];
const moment={id:'m',name:'Hassuna',question:'Which tree?',chosen:'ar-Ruman',correct:'al-Arak',caption:'A fruit-tree plot twist.'};
const community={boards:[{id:'paper-original',title:'Original etiquette quiz',kind:'paper',rows}],moments:[moment]};
const data={teacher:false,aiConfigured:false,quizzes:[],records:[],submissions:[],moments:[],community};
const home=renderToStaticMarkup(createElement(components.CommunityHome,{data,recent:null,onNavigate:()=>{},onStart:()=>{},onCreate:()=>{}}));
for(const text of ['خيمة ياسين','Sunday morning','Between quizzes','Yaseen','Hassuna','See leaderboard'])assert.ok(home.includes(text),text+' remains visible without quizzes');
assert.ok(!home.includes('What you missed'));
assert.ok(!home.includes('Create quiz'));
const leaderboard=renderToStaticMarkup(createElement(components.CommunityLeaderboard,{community,onNavigate:()=>{}}));
assert.ok(leaderboard.includes('Original etiquette quiz')&&leaderboard.includes('Hamza'));
assert.equal(ui.rankRows(rows)[1].rank,ui.rankRows(rows)[2].rank);
const cors=load('app/public-cors.ts',{'./server':{sameOrigin:r=>r.headers.get('origin')===new URL(r.url).origin}});
const pageReq=new Request('https://backend.example/api/data',{headers:{Origin:'https://yasinnaseri.github.io'}});
assert.ok(cors.allowedPublicOrigin(pageReq));
const response=cors.publicPreflight(pageReq,'POST');
assert.equal(response.status,204);assert.equal(response.headers.get('Access-Control-Allow-Origin'),'https://yasinnaseri.github.io');assert.equal(response.headers.get('Access-Control-Allow-Credentials'),null);
const other=new Request('https://backend.example/api/data',{headers:{Origin:'https://other.example'}});
assert.equal(cors.publicPreflight(other,'POST').status,403);assert.equal(cors.publicCors(other,new Response(), 'GET').headers.get('Access-Control-Allow-Origin'),null);
console.log('PASS: populated home without quizzes, real scores/highlights, shared ranks, public teacher-control isolation, exact GitHub Pages CORS allowlist.');
