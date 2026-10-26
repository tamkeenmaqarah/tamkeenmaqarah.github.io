'use client';
import {useState,type FormEvent} from 'react';
import {ArrowRight} from 'lucide-react';
import {nameProblem,passwordProblem,cleanName} from './door';

type Mode='create'|'back'|'enter';
export function Door({savedName,busy,error,onCreate,onEnter,onTeacher,onSomeoneElse}:{savedName:string;busy:boolean;error:string;onCreate:(name:string,password:string)=>Promise<void>;onEnter:(name:string,password:string)=>Promise<void>;onTeacher:()=>void;onSomeoneElse:()=>void}){
 const [mode,setMode]=useState<Mode>(savedName?'back':'create');
 const [who,setWho]=useState(savedName);
 const [password,setPassword]=useState('');
 const [confirm,setConfirm]=useState('');
 const [localError,setLocalError]=useState('');
 const shown=localError||error;
 async function submit(e:FormEvent){
  e.preventDefault();
  setLocalError('');
  const name=mode==='back'?savedName:who;
  const problem=nameProblem(name)||passwordProblem(password);
  if(problem){setLocalError(problem);return}
  if(mode==='create'&&password!==confirm){setLocalError('Those passwords do not match.');return}
  if(mode==='create')await onCreate(cleanName(name),password);
  else await onEnter(cleanName(name),password);
 }
 return <div className="door"><div className="door-sheet"><h1 lang="ar" dir="rtl">خيمة ياسين</h1>{mode==='back'?<p>This phone kept your name. Enter the password to come back in.</p>:<p>Set your name once. This phone remembers you, and next time you come straight in.</p>}<form onSubmit={submit}>{mode!=='back'&&<label htmlFor="door-name">Your name<input id="door-name" autoComplete="name" autoFocus maxLength={40} value={who} onChange={e=>setWho(e.target.value)} required/></label>}{mode==='back'&&<p className="door-name">{savedName}</p>}<label htmlFor="door-password">Password<input id="door-password" type="password" autoComplete={mode==='create'?'new-password':'current-password'} autoFocus={mode==='back'} maxLength={72} value={password} onChange={e=>setPassword(e.target.value)} required/><small>{mode==='create'?'At least 6 characters. You only type it again if you sign out.':'The password you chose for this name.'}</small></label>{mode==='create'&&<label htmlFor="door-confirm">Confirm password<input id="door-confirm" type="password" autoComplete="new-password" maxLength={72} value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label>}{shown&&<p className="door-error" role="alert">{shown}</p>}<button className="primary" disabled={busy}>{busy?'Saving…':'Come in'}<ArrowRight size={17}/></button></form><div className="door-switch">{mode==='create'?<button className="text-button" type="button" onClick={()=>{setMode('enter');setLocalError('')}}>I already have a name</button>:mode==='back'?<button className="text-button" type="button" onClick={()=>{onSomeoneElse();setMode('create');setWho('');setPassword('');setConfirm('');setLocalError('')}}>This is someone else</button>:<button className="text-button" type="button" onClick={()=>{setMode('create');setLocalError('')}}>New name</button>}<button className="text-button" type="button" onClick={onTeacher}>Teacher sign in</button></div></div></div>;
}
