import {db} from './server';
import type {Community,LeaderboardBoard} from './ui';

// Public projections are deliberately separate from teacher records and answer keys.
export async function getCommunity():Promise<Community>{
 const [paper,quizzes,scores,moments]=await Promise.all([
  db().prepare('SELECT id,name,regular,bonus,max FROM records ORDER BY regular+bonus DESC').all(),
  db().prepare('SELECT id,title FROM quizzes WHERE published=1 OR EXISTS (SELECT 1 FROM submissions WHERE quiz_id=quizzes.id) ORDER BY created_at DESC').all(),
  db().prepare('SELECT id,quiz_id,name,score,max FROM submissions ORDER BY created_at DESC LIMIT 1000').all(),
  db().prepare('SELECT id,name,question,chosen,correct,caption FROM moments ORDER BY created_at DESC LIMIT 30').all()
 ]);
 const boards:LeaderboardBoard[]=(quizzes.results||[]).map((q:any)=>({id:q.id,title:q.title,kind:'online',rows:(scores.results||[]).filter((s:any)=>s.quiz_id===q.id).map((s:any)=>({id:s.id,name:s.name,score:s.score,max:s.max}))}));
 if(paper.results?.length)boards.push({id:'paper-original',title:'Sunday 25 October · Original etiquette quiz',kind:'paper',rows:paper.results.map((r:any)=>({id:r.id,name:r.name,score:r.regular+r.bonus,max:r.max,bonus:r.bonus}))});
 return {boards,moments:(moments.results||[]).map((m:any)=>({id:m.id,name:m.name,question:m.question,chosen:m.chosen,correct:m.correct,caption:m.caption}))};
}
