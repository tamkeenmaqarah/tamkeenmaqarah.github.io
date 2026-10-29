const API = "https://api.alquran.cloud/v1";
const EDITION = "quran-tajweed";
const cache = new Map();
export const minshawi = {identifier:'everyayah.minshawi-murattal',name:'محمد صديق المنشاوي — مرتّل',englishName:'Muhammad Siddiq Al-Minshawi — Murattal'};
const reciterIds = new Set([minshawi.identifier]);
export const DEFAULT_RECITER = minshawi.identifier;

export const TAJWEED_RULES = {
 h:['Hamzat al-wasl','همزة الوصل','#716653'],s:['Silent letters','الحروف غير المنطوقة','#716653'],l:['Solar lam','اللام الشمسية','#716653'],
 n:['Natural madd','المد الطبيعي','#2553b8'],p:['Permissible madd','المد الجائز','#4030b5'],m:['Necessary madd','المد اللازم','#000e9a'],o:['Obligatory madd','المد الواجب','#2144a1'],
 q:['Qalqalah','القلقلة','#b00016'],c:['Ikhfa shafawi','الإخفاء الشفوي','#a00085'],f:['Ikhfa','الإخفاء','#810091'],w:['Idgham shafawi','الإدغام الشفوي','#247014'],i:['Iqlab','الإقلاب','#006078'],
 a:['Idgham with ghunnah','الإدغام بغنة','#006b50'],u:['Idgham without ghunnah','الإدغام بغير غنة','#246d00'],d:['Idgham mutajanisayn','إدغام المتجانسين','#716653'],b:['Idgham mutaqaribayn','إدغام المتقاربين','#716653'],g:['Ghunnah','الغنة','#985000']
};

// Nested source annotations become text runs, never HTML or added joining characters.
export function tajweedParts(text) {
 const parts=[],stack=[];let end=0;
 const append=value=>{if(/[\[\]]/u.test(value))throw Error('Invalid Tajweed annotations.');if(value)parts.push({text:value,rule:stack.at(-1)||null});};
 for(const match of text.matchAll(/\[([a-z])(?::\d+)?\[|\[|\]/gu)){
  append(text.slice(end,match.index));
  if(match[1]){if(!TAJWEED_RULES[match[1]]||stack.length>=8)throw Error('Invalid Tajweed annotations.');stack.push(match[1]);}
  else if(match[0]==='['){if(stack.length>=8)throw Error('Invalid Tajweed annotations.');stack.push(null);}
  else {if(!stack.length)throw Error('Invalid Tajweed annotations.');stack.pop();}
  end=match.index+match[0].length;
 }
 append(text.slice(end));if(stack.length)throw Error('Invalid Tajweed annotations.');return parts;
}

async function request(path, signal) {
  if (cache.has(path)) return cache.get(path);
  let json;
  try {
    const response = await fetch(API + path, { signal, credentials: "omit" });
    if (!response.ok) throw Error();
    json = await response.json();
    if (json.code !== 200 || !json.data) throw Error();
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw Error("Qur’an is unavailable right now. Please try again.");
  }
  return json.data;
}

export async function loadSurahs(signal) {
  const path = "/surah";
  const data = await request(path, signal);
  if (
    !Array.isArray(data) ||
    data.length !== 114 ||
    data.some(
      (surah, index) =>
        !surah ||
        surah.number !== index + 1 ||
        typeof surah.name !== "string" ||
        typeof surah.englishName !== "string" ||
        !Number.isInteger(surah.numberOfAyahs) ||
        surah.numberOfAyahs < 1 ||
        surah.numberOfAyahs > 286,
    )
  )
    throw Error("The surah list could not be loaded. Please try again.");
  cache.set(path, data);
  return data;
}

export async function loadSurah(number, signal) {
  if (!Number.isInteger(number) || number < 1 || number > 114)
    throw Error("Choose a surah.");
  const path = `/surah/${number}/${EDITION}`;
  const data = await request(path, signal);
  if (
    data.number !== number ||
    data.edition?.identifier !== EDITION ||
    !Number.isInteger(data.numberOfAyahs) ||
    data.numberOfAyahs < 1 ||
    data.numberOfAyahs > 286 ||
    !Array.isArray(data.ayahs) ||
    data.ayahs.length !== data.numberOfAyahs ||
    data.ayahs.some(
      (ayah, index) =>
        !ayah ||
        ayah.numberInSurah !== index + 1 ||
        typeof ayah.text !== "string" ||
        !ayah.text.trim(),
    )
  )
    throw Error("The ayahs could not be loaded completely. Please try again.");
  try { for(const ayah of data.ayahs) tajweedParts(ayah.text); }
  catch { throw Error("The ayahs could not be loaded completely. Please try again."); }
  cache.set(path, data);
  return data;
}

export function validAyahRange(from, to, count) {
  return (
    Number.isInteger(from) &&
    Number.isInteger(to) &&
    from >= 1 &&
    to >= from &&
    to <= count
  );
}

export function quranReference(surah, from, to, language) {
  return `${language === "ar" ? surah.name : surah.englishName} (${surah.number}:${from}-${to})`;
}

export function quranReferences(body) {
  const found = new Map();
  for (const match of body.matchAll(/\((\d{1,3}):(\d{1,3})[-–—](\d{1,3})\)/g)) {
    const [surah, from, to] = match.slice(1).map(Number);
    if (surah >= 1 && surah <= 114 && validAyahRange(from, to, 286))
      found.set(`${surah}:${from}-${to}`, { surah, from, to });
  }
  return [...found.values()];
}

export async function loadReciters(signal){
 const path='/edition?format=audio&language=ar&type=versebyverse',data=await request(path,signal);
 if(!Array.isArray(data)||!data.length||data.length>500)throw Error('Reciters could not be loaded. Please try again.');
 const choices=new Map([[minshawi.identifier,minshawi]]);
 for(const item of data){
  if(item?.format!=='audio'||item.language!=='ar'||item.type!=='versebyverse'||typeof item.identifier!=='string'||!/^ar\.[a-z0-9-]{1,60}$/.test(item.identifier)||typeof item.name!=='string'||!item.name.trim()||typeof item.englishName!=='string'||!item.englishName.trim())throw Error('Reciters could not be loaded. Please try again.');
  if(/^ar\.alafasy(?:-\d+)?$/.test(item.identifier))continue;
  const key=item.identifier.replace(/-\d+$/,'');if(!choices.has(key))choices.set(key,{identifier:item.identifier,name:item.name,englishName:item.englishName});
 }
 if(!choices.size)throw Error('Reciters could not be loaded. Please try again.');
 const list=[...choices.values()].sort((a,b)=>a.englishName.localeCompare(b.englishName));for(const item of list)reciterIds.add(item.identifier);cache.set(path,data);return list;
}

export async function loadRecitation(number,reciter,signal,expectedCount){
 if(!Number.isInteger(number)||number<1||number>114)throw Error('Choose a surah.');
 if(!reciterIds.has(reciter))throw Error('Choose a reciter.');
 if(reciter===minshawi.identifier){
  if(!Number.isInteger(expectedCount)||expectedCount<1||expectedCount>286)throw Error('Choose a valid ayah range.');
  return {number,numberOfAyahs:expectedCount,edition:{identifier:reciter},ayahs:Array.from({length:expectedCount},(_,index)=>({numberInSurah:index+1,audio:`https://everyayah.com/data/Minshawy_Murattal_128kbps/${String(number).padStart(3,'0')}${String(index+1).padStart(3,'0')}.mp3`}))};
 }
 const path=`/surah/${number}/${reciter}`,data=await request(path,signal);
 if(data.number!==number||data.edition?.identifier!==reciter||!Number.isInteger(data.numberOfAyahs)||data.numberOfAyahs<1||data.numberOfAyahs>286||!Array.isArray(data.ayahs)||data.ayahs.length!==data.numberOfAyahs||(Number.isInteger(expectedCount)&&data.numberOfAyahs!==expectedCount)||data.ayahs.some((ayah,index)=>{try{const url=new URL(ayah.audio);return ayah.numberInSurah!==index+1||url.protocol!=='https:'||url.hostname!=='cdn.islamic.network'||url.port||url.username||url.password||!/^\/quran\/audio\/\d+\/[^/]+\/\d+\.mp3$/.test(url.pathname)||url.pathname.split('/')[4]!==reciter||url.search||url.hash;}catch{return true;}}))throw Error('Recitation audio could not be loaded. You can still read and practise.');
 cache.set(path,data);return data;
}
