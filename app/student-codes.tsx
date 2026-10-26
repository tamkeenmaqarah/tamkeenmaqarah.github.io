'use client';
import {useEffect,useState} from 'react';
type Made={name:string;code:string};
export function StudentCodes({api,names}:{api:(url:string,method?:string,body?:any)=>Promise<any>;names:string[]}){
 const [rows,setRows]=useState<{id:string;name:string}[]>([]);
 const [fresh,setFresh]=useState<Made[]>([]);
 const [who,setWho]=useState('');
 const [note,setNote]=useState('');
 const [problem,setProblem]=useState('');
 useEffect(()=>{let live=true;api('/api/students').then(r=>{if(live)setRows(r)}).catch((e:any)=>{if(live)setProblem(e.message)});return()=>{live=false}},[]);
 async function make(body:any){setProblem('');setNote('');try{const made=await api('/api/students','POST',body);const codes:Made[]=made.codes||[{name:made.name,code:made.code}];setFresh(codes);setRows(await api('/api/students'));setWho('');setNote(codes.length?'Show each code once. It will not be shown again.':'Every graded student already has a code.')}catch(e:any){setProblem(e.message)}}
 return <section className="student-codes"><div className="section-heading"><h2>Student codes</h2></div><p className="help">A code lets that student keep missed questions on another phone. Guests can still take a quiz without one.</p>{problem&&<p className="help">{problem}</p>}{fresh.map(c=><p className="info-note" key={c.name}><span><b>{c.name}</b> · <span className="code-slip">{c.code}</span></span></p>)}{note&&<p className="help">{note}</p>}<form onSubmit={e=>{e.preventDefault();make({name:who})}}><label htmlFor="code-name">Student name<input id="code-name" maxLength={100} value={who} onChange={e=>setWho(e.target.value)} placeholder="Name on the leaderboard"/></label><div className="attempt-actions"><button className="primary" type="submit" disabled={!who.trim()}>Make a code</button>{names.length>0&&<button className="secondary" type="button" onClick={()=>make({fromRecords:true})}>Codes for graded students</button>}</div></form>{rows.length>0&&<ul className="code-roster">{rows.map(r=><li key={r.id}><b>{r.name}</b><button className="text-button" type="button" onClick={()=>make({name:r.name})}>New code</button></li>)}</ul>}</section>;
}
