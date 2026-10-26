import {drop,readJson,tentKeys,writeJson} from './revisit';

export type DoorProfile={name:string;passwordHash:string;recoveryHash?:string};
type Store=Pick<Storage,'getItem'|'setItem'|'removeItem'>|null;

export async function digest(value:string){
 const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
 return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export function sameHash(stored:string,given:string){let diff=stored.length===given.length?0:1;for(let i=0;i<Math.min(stored.length,given.length);i++)diff|=stored.charCodeAt(i)^given.charCodeAt(i);return diff===0}
export function cleanName(value:string){return value.trim().replace(/\s+/g,' ')}
export function nameProblem(name:string){
 const clean=cleanName(name);
 if(clean.length<2)return 'Use the name the tent knows.';
 if(clean.length>40)return 'That name is too long.';
 if(!/^[\p{L}][\p{L}\s'.-]*$/u.test(clean))return 'Use letters in your name.';
 return null;
}
export function passwordProblem(password:string){
 if(password.length<6)return 'Use at least 6 characters.';
 if(password.length>72)return 'That password is too long.';
 return null;
}
export function recoveryKey(word:string){return word.trim().toLocaleLowerCase('en')}
export function recoveryProblem(word:string,password?:string){
 const clean=word.trim();
 if(clean.length<4)return 'Use at least 4 characters for the recovery word.';
 if(clean.length>40)return 'That recovery word is too long.';
 if(password&&recoveryKey(clean)===password.trim().toLocaleLowerCase('en'))return 'Use a recovery word that is not the password.';
 return null;
}
export function readDoor(storage:Store){return readJson<DoorProfile>(storage,tentKeys.door)}
export function writeDoor(storage:Store,profile:DoorProfile){writeJson(storage,tentKeys.door,profile)}
export function isRemembered(storage:Store){return storage?.getItem(tentKeys.remembered)==='1'}
export function rememberPerson(storage:Store){storage?.setItem(tentKeys.remembered,'1')}
export function forgetPerson(storage:Store){storage?.removeItem(tentKeys.remembered);drop(storage,tentKeys.token)}
