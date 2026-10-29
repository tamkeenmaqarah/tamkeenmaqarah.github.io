'use client';
import {useEffect,useSyncExternalStore} from 'react';
import {House,BookOpen,ClipboardList,CalendarDays,Trophy,Smile,LogOut,ArrowUpRight,Plus,ArrowRight,ArrowLeft,Globe,Sparkles,Users} from 'lucide-react';
import {TeacherHomeworkPanel} from './teacher-homework';
import type {Data,Quiz} from './ui';
import {t,getLanguage,setLanguage,subscribeLanguage} from './i18n.js';
export function useTeacherLanguage(){const language=useSyncExternalStore(subscribeLanguage,getLanguage,()=> 'en');useEffect(()=>{try{setLanguage(localStorage.getItem('tamkeen-language')==='ar'?'ar':'en');}catch{}},[]);return language;}
export function TeacherLanguage(){const language=useTeacherLanguage();return <button className="teacher-language" type="button" onClick={()=>setLanguage(language==='ar'?'en':'ar')} aria-label={language==='ar'?'Switch to English':'Change language to Arabic'}><Globe size={17}/>{language==='ar'?'English':'العربية'}</button>;}
const nav=[['home','Overview',House],['homework','Homework',CalendarDays],['quizzes','Quizzes',BookOpen],['ai','AI tools',Sparkles],['students','Students',Users],['grades','Grades',ClipboardList],['leaderboard','Leaderboard',Trophy],['moments','Funny answers',Smile]] as const;
export function TeacherNavigation({tab,active,onNavigate,onSignOut}:{tab:string;active:boolean;onNavigate:(tab:string)=>void;onSignOut:()=>void}){
 useTeacherLanguage();
 return <header className='teacher-sidebar'>
  <div className="teacher-sidebar-brand"><a href="/?view=home" onClick={event=>{event.preventDefault();onNavigate('home');}}><span lang="ar" dir="rtl">أصحاب الخيمة</span><small>{t('Teacher dashboard')}</small></a></div>
  <nav id="teacher-navigation" aria-label={t('Teacher navigation')}>{nav.map(([id,label,Icon])=><button key={id} aria-current={!active&&(tab===id||(id==='quizzes'&&tab==='manage'))?'page':undefined} className={!active&&(tab===id||(id==='quizzes'&&tab==='manage'))?'selected':''} onClick={()=>onNavigate(id)}><Icon size={19}/><span>{t(label)}</span></button>)}</nav>
  <div className="teacher-sidebar-bottom"><a href="https://tamkeenmaqarah.github.io/" target="_blank" rel="noopener noreferrer">{t('Student website')}<ArrowUpRight size={17}/></a><TeacherLanguage/><button className="text-button" onClick={onSignOut}><LogOut size={17}/>{t('Sign out')}</button></div>
 </header>;
}
export function TeacherEntryHeader(){useTeacherLanguage();return <header className="teacher-entry-header"><a href="https://tamkeenmaqarah.github.io/" className="teacher-entry-brand" lang="ar" dir="rtl">أصحاب الخيمة</a><div><TeacherLanguage/><a href="https://tamkeenmaqarah.github.io/">{t('Student website')}<ArrowUpRight size={16}/></a></div></header>;}
export function TeacherOverview({data,onNavigate,onCreate,onManage}:{data:Data;onNavigate:(tab:string)=>void;onCreate:()=>void;onManage:(quiz:Quiz)=>void}){
 useTeacherLanguage();const published=data.quizzes.filter(quiz=>quiz.published).length;
 return <section className="teacher-overview"><div className="page-heading"><div><h1>{t('Overview')}</h1><p>{t('Quizzes, grades and Sunday preparation.')}</p></div><button className="primary" onClick={onCreate}><Plus size={18}/>{t('Create a quiz')}</button></div>
  <dl className="teacher-totals"><div><dt>{t('Published quizzes')}</dt><dd>{published}</dd></div><div><dt>{t('Drafts')}</dt><dd>{data.quizzes.length-published}</dd></div><div><dt>{t('Recent submissions')}</dt><dd>{data.submissions.length}</dd></div></dl>
  <div className="teacher-work-links"><button onClick={()=>onNavigate('grades')}><ClipboardList size={22}/><span>{t('Record Sunday grades')}</span><ArrowRight size={19}/></button><button onClick={()=>onNavigate('homework')}><CalendarDays size={22}/><span>{t('Assign & review homework')}</span><ArrowRight size={19}/></button><button onClick={()=>onNavigate('ai')}><BookOpen size={22}/><span>{t('Create an AI draft')}</span><ArrowRight size={19}/></button></div>
  <section className="teacher-recent"><div className="section-heading"><h2>{t('Recent quizzes')}</h2><button className="text-button" onClick={()=>onNavigate('quizzes')}>{t('All quizzes')}<ArrowRight size={16}/></button></div>
  {data.quizzes.length?<div className="teacher-quiz-list">{data.quizzes.slice(0,5).map(quiz=><div className="teacher-quiz-row" key={quiz.id}><div><h3 dir="auto">{quiz.title}</h3><p>{quiz.questions.length} {t('questions')} · <span className={'teacher-status '+(quiz.published?'published':'')}>{t(quiz.published?'Published':'Draft')}</span></p></div><button className="secondary" onClick={()=>onManage(quiz)}>{t('Manage')}<ArrowRight size={16}/></button></div>)}</div>:<div className="teacher-empty"><BookOpen size={26}/><p>{t('No quizzes yet. Create the first quiz for the group.')}</p><button className="secondary" onClick={onCreate}>{t('Create a quiz')}</button></div>}
  </section>

 </section>;
}
export function TeacherHomework({onDirtyChange}:{onDirtyChange:(value:boolean)=>void}){const language=useTeacherLanguage();return <TeacherHomeworkPanel language={language} onDirtyChange={onDirtyChange}/>;}
