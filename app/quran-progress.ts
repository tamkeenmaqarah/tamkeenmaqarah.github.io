import {db} from './server';
import {HomeworkError,sundayWeek} from './assignments';
import surahs from '../public/assets/quran-surahs.json';
export function quranCoverage(rows:any[]){
 const ayahs=new Set<string>(),chapters=new Set<number>();
 for(const row of rows){const meta=surahs.find(s=>s.number===row.surah);if(row.teacherStatus!=='reviewed'||!meta||!Number.isInteger(row.from)||!Number.isInteger(row.to)||row.from<1||row.to<row.from||row.to>meta.numberOfAyahs)continue;for(let n=row.from;n<=row.to;n++)ayahs.add(row.surah+':'+n);chapters.add(row.surah);}
 return {ayahs:ayahs.size,surahs:chapters.size};
}
export async function quranProgress(week:unknown,studentId?:string|null){
 const cutoff=sundayWeek(week);if(!cutoff)throw new HomeworkError('Choose a Sunday.');
 if(studentId){
  if(studentId.length>100)throw new HomeworkError('Choose an active student.');
  const student=await db().prepare('SELECT id,name FROM students WHERE id=? AND archived_at IS NULL').bind(studentId).first();if(!student)throw new HomeworkError('This student is no longer active.',404);
  const result:any=await db().prepare("SELECT a.id,a.revision,a.title,a.week,a.objective,a.surah,a.ayah_from 'from',a.ayah_to 'to',a.student_id IS NULL groupWork,COALESCE(p.status,'pending') status,COALESCE(p.version,'') version,COALESCE(p.feedback,'') feedback,COALESCE(p.note,'') note,COALESCE(p.teacher_status,'') teacherStatus,p.teacher_reviewed_at teacherReviewedAt FROM assignments a LEFT JOIN assignment_progress p ON p.assignment_id=a.id AND p.student_id=? WHERE a.kind='quran' AND a.withdrawn_at IS NULL AND a.week<=? AND (a.student_id IS NULL OR a.student_id=?) ORDER BY COALESCE(p.teacher_reviewed_at,a.week) DESC,a.created_at DESC,a.id").bind(studentId,cutoff,studentId).all();
  const passages=(result.results||[]).map((row:any)=>({...row,groupWork:!!row.groupWork,surahName:surahs.find(s=>s.number===row.surah)?.name||'',surahEnglishName:surahs.find(s=>s.number===row.surah)?.englishName||''}));return {student,passages,coverage:quranCoverage(passages)};
 }
 const result:any=await db().prepare("SELECT s.id,s.name,COUNT(a.id) assigned,COALESCE(SUM(CASE WHEN p.status='ready' THEN 1 ELSE 0 END),0) ready,COALESCE(SUM(CASE WHEN p.status IN ('help','repeat') OR p.teacher_status='repeat' THEN 1 ELSE 0 END),0) needsHelp,COALESCE(SUM(CASE WHEN p.teacher_status='reviewed' THEN 1 ELSE 0 END),0) checked,MAX(p.teacher_reviewed_at) lastChecked FROM students s LEFT JOIN assignments a ON a.kind='quran' AND a.withdrawn_at IS NULL AND a.week<=? AND (a.student_id IS NULL OR a.student_id=s.id) LEFT JOIN assignment_progress p ON p.assignment_id=a.id AND p.student_id=s.id WHERE s.archived_at IS NULL GROUP BY s.id ORDER BY s.name COLLATE NOCASE").bind(cutoff).all();return {students:result.results||[]};
}
