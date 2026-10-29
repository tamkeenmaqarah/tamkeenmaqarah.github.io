import {y} from './runtime.js';
import {t} from './i18n.js?v=24';
import {Avatar} from './components.js?v=24';
import {preparePhoto,profileRequest} from './profile.js?v=1';
const el=y.createElement;
export function AccountPage({name,profile,error,onRetry,onSaved,onPassword,onSignOut,googleSignIn,googleError,googleBusy,onDirtyChange}) {
 const [draft,setDraft]=y.useState(null),[busy,setBusy]=y.useState(false),[message,setMessage]=y.useState(''),[failure,setFailure]=y.useState('');
 const file=y.useRef(null);
 y.useEffect(()=>{setDraft(profile?{source:profile.photoSource,photo:profile.photoSource==='upload'?profile.photo:null}:null);},[profile]);
 const working=busy||googleBusy;
 const dirty=draft&&profile&&(draft.source!==profile.photoSource||(draft.source==='upload'&&draft.photo!==profile.photo));
 y.useEffect(()=>{onDirtyChange(!!dirty);return ()=>onDirtyChange(false);},[!!dirty,onDirtyChange]);
 const photo=draft?.source==='upload'?draft.photo:draft?.source==='google'?profile?.googlePicture:null;
 async function choose(event) {
  const chosen=event.target.files?.[0];event.target.value='';if(!chosen)return;
  setBusy(true);setFailure('');setMessage('Preparing photo…');
  try {setDraft({source:'upload',photo:await preparePhoto(chosen)});setMessage('Photo ready to save.');}
  catch(error){setFailure(error.message);setMessage('');}finally{setBusy(false);}
 }
 async function save(event) {
  event.preventDefault();if(!dirty||busy)return;
  setBusy(true);setFailure('');setMessage('');
  try {const next=await profileRequest('POST',draft);onSaved(next);setMessage('Profile photo saved.');}
  catch(error){setFailure(error.name==='TimeoutError'?'Could not load or save your profile. Please try again.':error.message);}finally{setBusy(false);}
 }
 const change=(source)=>{setDraft({source,photo:null});setFailure('');setMessage('Photo ready to save.');};
 return el('section',{className:'account-page','aria-labelledby':'account-title'},
  el('header',{className:'page-heading'},el('div',null,el('h1',{id:'account-title'},t('Your account')))),
  el('nav',{className:'account-jumps','aria-label':t('Account settings')},el('a',{href:'#profile-photo'},t('Profile photo')),el('a',{href:'#sign-in-settings'},t('Sign-in settings'))),
  el('div',{className:'account-layout'},
   el('section',{className:'profile-identity'},el(Avatar,{name,photo:profile?photo:null,large:true}),el('h2',null,el('bdi',null,name)),profile&&el('p',null,t(profile.google?'Connected with Google':'Name and password'))),
   el('div',{className:'profile-settings'},
    el('h2',{id:'profile-photo'},t('Profile photo')),
    !profile?el('div',{className:'profile-status',role:'status'},el('p',null,t(error||'Loading your profile…')),error&&el('div',{className:'profile-actions'},el('button',{className:'secondary',type:'button',onClick:onRetry},t('Try again')),el('button',{className:'text-button',type:'button',onClick:onSignOut},t('Sign in again'))),error==='Sign in again to update your profile.'&&el('section',{className:'profile-google'},el('h2',null,t('Connect Google')),googleSignIn,googleBusy&&el('p',{role:'status'},t('Checking with Google…')),googleError&&el('p',{className:'profile-error',role:'alert'},t(googleError)))):
    el(y.Fragment,null,
     el('p',{className:'help'},t('Choose a photo. It will be cropped to a square.')),
     el('form',{onSubmit:save},
      el('input',{ref:file,type:'file',accept:'image/jpeg,image/png,image/webp',className:'profile-file','aria-label':t('Choose photo'),onChange:choose,disabled:working}),
      el('div',{className:'profile-actions'},
       el('button',{className:'secondary',type:'button',disabled:working,onClick:()=>file.current.click()},t('Choose photo')),
       profile.googlePicture&&el('button',{className:'secondary',type:'button',disabled:working||draft?.source==='google',onClick:()=>change('google')},t('Use Google photo')),
       el('button',{className:'text-button',type:'button',disabled:working||draft?.source==='none',onClick:()=>change('none')},t('Use initials'))),
      el('p',{className:'help profile-file-help'},t('JPG, PNG or WebP · up to 8 MB')),
      el('div',{'aria-live':'polite'},message&&el('p',{className:'profile-message',role:'status'},t(message))),
      failure&&el('p',{className:'profile-error',role:'alert'},t(failure)),
      el('div',{className:'profile-save'},el('button',{className:'primary',disabled:working||!dirty,type:'submit'},t(busy?'Saving…':'Save photo')),dirty&&el('button',{className:'text-button',disabled:working,type:'button',onClick:()=>{setDraft({source:profile.photoSource,photo:profile.photoSource==='upload'?profile.photo:null});setFailure('');setMessage('');}},t('Cancel')))),
     el('section',{className:'profile-google'},el('h2',null,t(profile.google?'Google photo':'Connect Google')),el('p',{className:'help'},t(profile.google?'Sign in with Google again to refresh its profile photo.':'Connect Google to use its profile photo.')),dirty?el('p',{className:'help'},t('Save or cancel your photo before connecting Google.')):googleSignIn,googleBusy&&el('p',{role:'status'},t('Checking with Google…')),googleError&&el('p',{className:'profile-error',role:'alert'},t(googleError))),
     el('section',{className:'profile-security'},el('h2',{id:'sign-in-settings'},t('Sign-in settings')),el('div',{className:'profile-actions'},profile.hasPassword!==false&&el('button',{className:'secondary',type:'button',onClick:onPassword},t('Change password')),el('button',{className:'text-button',type:'button',onClick:onSignOut},t('Sign out'))))))));
}
