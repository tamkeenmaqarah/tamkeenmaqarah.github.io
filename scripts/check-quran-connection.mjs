import assert from 'node:assert/strict';
import {createQuranClient} from '../lib/quran-content.mjs';

assert.ok(process.env.QURAN_CLIENT_ID && process.env.QURAN_CLIENT_SECRET, 'Both Quran Foundation credentials are required.');
const upstreamFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const response = await upstreamFetch(url, options);
  console.log(`Quran Foundation ${new URL(url).pathname}: HTTP ${response.status}`);
  if (new URL(url).pathname === '/oauth2/token' && response.status === 401) {
    const prelive = await upstreamFetch('https://prelive-oauth2.quran.foundation/oauth2/token', options);
    console.log(`Pre-live credential check: HTTP ${prelive.status}`);
    if (prelive.ok) console.log('These credentials work in pre-live only. Production credentials are required for the full Quran.');
    await prelive.body?.cancel();
  }
  return response;
};
const client = createQuranClient(process.env.QURAN_CLIENT_ID, process.env.QURAN_CLIENT_SECRET);
assert.equal((await client.chapters()).length, 114);
assert.equal((await client.chapter(67)).ayahs.length, 30);
console.log('Production connection verified: 114 surahs and all 30 ayahs of Al-Mulk.');
