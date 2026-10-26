export type Miss={prompt:string;options:string[];correct:number;explanation:string};
export type Revisit={quizId:string;title:string;name:string;score:number;max:number;misses:Miss[]};
export type SavedResult={quizId:string;attemptId:string;name:string;title:string;score:number;max:number;review:{prompt:string;correct:string;explanation:string;right:boolean}[]};
export type Draft={quizId:string;attemptId:string;name:string;answers:number[];step:number};

const KEYS={revisit:'tamkeen-revisit',draft:'tamkeen-draft',done:'tamkeen-done',name:'tamkeen-name',token:'tamkeen-token'};

export function spellName(typed:string,known:string[]){
 const clean=typed.trim().replace(/\s+/g,' ');
 return known.find(n=>n.trim().toLowerCase()===clean.toLowerCase())||clean;
}

export function missesFrom(questions:{prompt:string;options:string[];explanation?:string}[],review:{correct:string;explanation?:string;right:boolean}[]):Miss[]{
 return review.flatMap((item,i)=>{
  if(item.right)return [];
  const q=questions[i];
  if(!q)return [];
  const correct=q.options.indexOf(item.correct);
  if(correct<0)return [];
  return [{prompt:q.prompt,options:[...q.options],correct,explanation:item.explanation||q.explanation||''}];
 });
}

export function gradePractice(misses:Miss[],answers:number[]){
 const review=misses.map((m,i)=>({prompt:m.prompt,correct:m.options[m.correct],explanation:m.explanation,right:answers[i]===m.correct}));
 return {score:review.filter(r=>r.right).length,max:misses.length,review,misses:misses.filter((_,i)=>!review[i].right)};
}

export function readJson<T>(storage:Pick<Storage,'getItem'>|null,key:string):T|null{
 if(!storage)return null;
 try{const raw=storage.getItem(key);return raw?JSON.parse(raw) as T:null}catch{return null}
}

export function writeJson(storage:Pick<Storage,'setItem'>|null,key:string,value:unknown){storage?.setItem(key,JSON.stringify(value))}
export function drop(storage:Pick<Storage,'removeItem'>|null,key:string){storage?.removeItem(key)}
export const tentKeys=KEYS;
