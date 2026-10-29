const API = "https://api.alquran.cloud/v1";
const EDITION = "quran-uthmani";
const cache = new Map();

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

export async function loadRecitation(number,signal,expectedCount){
 if(!Number.isInteger(number)||number<1||number>114)throw Error('Choose a surah.');
 const path=`/surah/${number}/ar.alafasy`,data=await request(path,signal);
 if(data.number!==number||data.edition?.identifier!=='ar.alafasy'||!Number.isInteger(data.numberOfAyahs)||data.numberOfAyahs<1||data.numberOfAyahs>286||!Array.isArray(data.ayahs)||data.ayahs.length!==data.numberOfAyahs||(Number.isInteger(expectedCount)&&data.numberOfAyahs!==expectedCount)||data.ayahs.some((ayah,index)=>{try{const url=new URL(ayah.audio);return ayah.numberInSurah!==index+1||url.protocol!=='https:'||url.hostname!=='cdn.islamic.network'||url.username||url.password||!url.pathname.startsWith('/quran/audio/');}catch{return true;}}))throw Error('Recitation audio could not be loaded. You can still read and practise.');
 cache.set(path,data);return data;
}
