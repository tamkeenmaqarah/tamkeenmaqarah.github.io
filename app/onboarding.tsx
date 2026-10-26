'use client';
import {useState,type FormEvent} from 'react';
import {ArrowRight} from 'lucide-react';
import {nameProblem,passwordProblem,recoveryProblem,cleanName} from './door';

type Mode='create'|'back'|'enter'|'forgot';
export function Door({savedName,busy,error,onCreate,onEnter,onReset,onTeacher,onSomeoneElse}:{savedName:string;busy:boolean;error:string;onCreate:(name:string,password:string,recovery:string)=>Promise<void>;onEnter:(name:string,password:string)=>Promise<void>;onReset:(name:string,recovery:string,password:string)=>Promise<void>;onTeacher:()=>void;onSomeoneElse:()=>void}){
 const [mode,setMode]=useState<Mode>(savedName?'back':'create');
 const [who,setWho]=useState(savedName);
 const [password,setPassword]=useState('');
 const [confirm,setConfirm]=useState('');
 const [recovery,setRecovery]=useState('');
 const [localError,setLocalError]=useState('');
 const shown=localError||error;
 function clear(next:Mode){setMode(next);setPassword('');setConfirm('');setRecovery('');setLocalError('')}
 async function submit(e:FormEvent){
  e.preventDefault();
  setLocalError('');
  const name=mode==='back'||(mode==='forgot'&&savedName)?savedName:who;
  if(mode!=='forgot'){
   const problem=nameProblem(name)||passwordProblem(password);
   if(problem){setLocalError(problem);return}
   if(mode==='create'){const recoveryIssue=recoveryProblem(recovery,password);if(recoveryIssue){setLocalError(recoveryIssue);return}if(password!==confirm){setLocalError('Those passwords do not match.');return}await onCreate(cleanName(name),password,recovery.trim());return}
   await onEnter(cleanName(name),password);
   return;
  }
  const problem=nameProblem(name)||recoveryProblem(recovery)||passwordProblem(password);
  if(problem){setLocalError(problem);return}
  if(password!==confirm){setLocalError('Those passwords do not match.');return}
  await onReset(cleanName(name),recovery.trim(),password);
 }
 const intro=mode==='forgot'?'Enter the recovery word from when you set your name, then choose a new password.':mode==='back'?'This phone kept your name. Enter the password to come back in.':'Set your name once. This phone remembers you, and next time you come straight in.';
 return <div className="door"><div className="door-sheet"><h1 lang="ar" dir="rtl">خيمة ياسين</h1><p>{intro}</p><form onSubmit={submit}>{(mode==='create'||mode==='enter'||(mode==='forgot'&&!savedName))&&<label htmlFor="door-name">Your name<input id="door-name" autoComplete="name" autoFocus maxLength={40} value={who} onChange={e=>setWho(e.target.value)} required/></label>}{(mode==='back'||(mode==='forgot'&&savedName))&&<p className="door-name">{savedName}</p>}{mode==='forgot'?<label htmlFor="door-recovery">Recovery word<input id="door-recovery" autoComplete="off" autoFocus={Boolean(savedName)} maxLength={40} value={recovery} onChange={e=>setRecovery(e.target.value)} required/><small>Capital letters do not matter.</small></label>:<label htmlFor="door-password">Password<input id="door-password" type="password" autoComplete={mode==='create'?'new-password':'current-password'} autoFocus={mode==='back'} maxLength={72} value={password} onChange={e=>setPassword(e.target.value)} required/><small>{mode==='create'?'At least 6 characters. You only type it again if you sign out.':'The password you chose for this name.'}</small></label>}{mode==='create'&&<label htmlFor="door-confirm">Confirm password<input id="door-confirm" type="password" autoComplete="new-password" maxLength={72} value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label>}{mode==='create'&&<label htmlFor="door-recovery">Recovery word<input id="door-recovery" autoComplete="off" maxLength={40} value={recovery} onChange={e=>setRecovery(e.target.value)} required/><small>If you forget the password, this word makes a new one. Do not reuse the password.</small></label>}{mode==='forgot'&&<><label htmlFor="door-password">New password<input id="door-password" type="password" autoComplete="new-password" maxLength={72} value={password} onChange={e=>setPassword(e.target.value)} required/><small>At least 6 characters.</small></label><label htmlFor="door-confirm">Confirm new password<input id="door-confirm" type="password" autoComplete="new-password" maxLength={72} value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label></>}{shown&&<p className="door-error" role="alert">{shown}</p>}<button className="primary" disabled={busy}>{busy?'Saving…':mode==='forgot'?'Save new password':'Come in'}<ArrowRight size={17}/></button></form><div className="door-switch">{mode==='forgot'?<button className="text-button" type="button" onClick={()=>clear(savedName?'back':'enter')}>Back</button>:mode==='create'?<button className="text-button" type="button" onClick={()=>clear('enter')}>I already have a name</button>:mode==='back'?<button className="text-button" type="button" onClick={()=>{onSomeoneElse();clear('create');setWho('')}}>This is someone else</button>:<button className="text-button" type="button" onClick={()=>clear('create')}>New name</button>}{(mode==='back'||mode==='enter')&&<button className="text-button" type="button" onClick={()=>clear('forgot')}>Forgot password</button>}<button className="text-button" type="button" onClick={onTeacher}>Teacher sign in</button></div></div></div>;
}
export function ChangePassword({busy,error,onSave,onBack}:{busy:boolean;error:string;onSave:(current:string,password:string)=>Promise<void>;onBack:()=>void}){
 const [current,setCurrent]=useState('');
 const [password,setPassword]=useState('');
 const [confirm,setConfirm]=useState('');
 const [localError,setLocalError]=useState('');
 const shown=localError||error;
 async function submit(e:FormEvent){
  e.preventDefault();
  setLocalError('');
  const problem=passwordProblem(current)||passwordProblem(password);
  if(problem){setLocalError(problem);return}
  if(password!==confirm){setLocalError('Those passwords do not match.');return}
  if(password===current){setLocalError('Choose a password that is different from the current one.');return}
  await onSave(current,password);
 }
 return <div className="door"><div className="door-sheet"><h1>Change password</h1><p>The next time you sign in, use the new password.</p><form onSubmit={submit}><label htmlFor="current-password">Current password<input id="current-password" type="password" autoComplete="current-password" autoFocus maxLength={72} value={current} onChange={e=>setCurrent(e.target.value)} required/></label><label htmlFor="new-password">New password<input id="new-password" type="password" autoComplete="new-password" maxLength={72} value={password} onChange={e=>setPassword(e.target.value)} required/><small>At least 6 characters.</small></label><label htmlFor="confirm-password">Confirm new password<input id="confirm-password" type="password" autoComplete="new-password" maxLength={72} value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label>{shown&&<p className="door-error" role="alert">{shown}</p>}<button className="primary" disabled={busy}>{busy?'Saving…':'Save password'}<ArrowRight size={17}/></button></form><div className="door-switch"><button className="text-button" type="button" onClick={onBack}>Back to the tent</button></div></div></div>;
}
