import {Check,Trophy,Smile} from 'lucide-react';
export type Question={prompt:string;options:string[];correct:number;explanation:string;evidence?:string};
export type Quiz={id:string;title:string;description:string;questions:Question[];published:number};
export type Moment={id:string;name:string;question:string;chosen:string;correct:string;caption:string};
export type RecordGrade={id:string;name:string;regular:number;bonus:number;max:number};
export type Submission={id:string;quiz_id:string;name:string;answers:string;score:number;max:number;created_at:string};
export type Data={publicSiteUrl?:string;teacher:boolean;aiConfigured:boolean;quizzes:Quiz[];submissions:Submission[];records:RecordGrade[];moments:Moment[];community:Community;accounts?:boolean;account?:{id:string;name:string}|null;accountMisses?:{quizId:string;title:string;name:string;score:number;max:number;misses:{prompt:string;options:string[];correct:number;explanation:string}[]}|null};
export type Ranked={id:string;name:string;score:number;max:number;bonus?:number;rank:number};
export type LeaderboardBoard={id:string;title:string;kind:'paper'|'online';rows:Omit<Ranked,'rank'>[]};
export type Community={boards:LeaderboardBoard[];moments:Moment[]};
export const percentage=(s:{score:number;max:number})=>s.score/s.max*100;
export const initials=(n:string)=>n.split(/\s+/).map(x=>x[0]).slice(0,2).join('');
export function rankRows(rows:Omit<Ranked,'rank'>[]):Ranked[]{const sorted=[...rows].sort((a,b)=>percentage(b)-percentage(a)||a.name.localeCompare(b.name));return sorted.map(s=>({...s,rank:1+sorted.filter(x=>percentage(x)>percentage(s)).length}))}
export function Podium({rows}:{rows:Ranked[]}){
 const tiers=Array.from(new Set(rows.map(x=>x.rank))).slice(0,3).map(rank=>({rank,students:rows.filter(x=>x.rank===rank)}));
 const ordered=tiers.length>1?[tiers[1],tiers[0],tiers[2]].filter(Boolean):tiers;
 return <div className="podium" aria-label="Highest scoring students">{ordered.map(t=><div className={'podium-place tier-'+(tiers.indexOf(t)+1)} key={t.rank}><div className="podium-avatar">{tiers.indexOf(t)===0&&<Trophy size={17}/>}<span>{initials(t.students[0].name)}</span></div><b className="podium-name">{t.students.map(x=>x.name).join(' & ')}</b><div className="podium-points">{t.students[0].score}<small>/{t.students[0].max}</small></div><div className="podium-block">{t.rank}</div></div>)}</div>
}
export function MomentCard({moment}:{moment:Moment}){return <article className="moment-card"><div className="moment-heading"><Smile size={21}/><h3>Funniest mix-up</h3></div><p className="moment-question">{moment.question}</p><p className="moment-answer"><b>{moment.name}</b> answered <strong dir="auto">“{moment.chosen}”</strong></p><p className="moment-correct"><Check size={16}/> Correct answer: <b dir="auto">{moment.correct}</b></p><p className="moment-caption">{moment.caption}</p></article>}
