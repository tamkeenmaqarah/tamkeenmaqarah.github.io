const API = 'https://apis.quran.foundation/content/api/v4';
const TOKEN_URL = 'https://oauth2.quran.foundation/oauth2/token';
const unavailable = () => new Error('Qur’an is unavailable right now. Please try again.');

export function createQuranClient(clientId, clientSecret) {
  let token, expires = 0, pending;
  const cache = new Map();
  async function accessToken() {
    if (token && Date.now() < expires) return token;
    if (!pending) pending = (async () => {
      const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret), 'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&scope=content',
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw unavailable();
      const data = await response.json();
      if (typeof data.access_token !== 'string' || !data.access_token || !Number.isFinite(data.expires_in) || data.expires_in <= 0) throw unavailable();
      token = data.access_token;
      expires = Date.now() + Math.max(0, data.expires_in - 60) * 1000;
      return token;
    })().finally(() => { pending = undefined; });
    return pending;
  }
  async function request(path) {
    const saved = cache.get(path);
    if (saved && saved.expires > Date.now()) return saved.data;
    for (let attempt = 0; attempt < 2; attempt++) {
      const usedToken = await accessToken();
      const response = await fetch(API + path, {
        headers: {'x-auth-token': usedToken, 'x-client-id': clientId},
        signal: AbortSignal.timeout(10000),
      });
      if (response.status === 401 && attempt === 0) {
        if (token === usedToken) { token = undefined; expires = 0; }
        continue;
      }
      if (!response.ok) throw unavailable();
      return response.json();
    }
    throw unavailable();
  }
  function remember(path, data) {
    cache.set(path, {data, expires: Date.now() + 3600000});
    return data;
  }
  async function chapters() {
    const path = '/chapters?language=en';
    const data = await request(path);
    // Store only complete, ordered data; never guess missing ayahs or alter Quran text.
    if (!Array.isArray(data.chapters) || data.chapters.length !== 114 || data.chapters.some((c, i) => c.id !== i + 1 || typeof c.name_arabic !== 'string' || !c.name_arabic || typeof c.name_simple !== 'string' || !c.name_simple || !Number.isInteger(c.verses_count) || c.verses_count < 1 || c.verses_count > 286)) throw unavailable();
    remember(path, data);
    return data.chapters.map(c => ({number: c.id, name: c.name_arabic, englishName: c.name_simple, numberOfAyahs: c.verses_count}));
  }
  return {
    chapters,
    async chapter(number) {
      if (!Number.isInteger(number) || number < 1 || number > 114) throw Error('Choose a surah.');
      const metadata = (await chapters())[number - 1];
      const path = '/quran/verses/uthmani?chapter_number=' + number;
      const data = await request(path);
      if (!Array.isArray(data.verses) || data.verses.length !== metadata.numberOfAyahs || data.verses.some((v, i) => v.verse_key !== number + ':' + (i + 1) || typeof v.text_uthmani !== 'string' || !v.text_uthmani.trim())) throw unavailable();
      remember(path, data);
      return {...metadata, edition: {identifier: 'quran-foundation-uthmani'}, ayahs: data.verses.map((v, i) => ({numberInSurah: i + 1, text: v.text_uthmani}))};
    },
  };
}
