import assert from 'node:assert/strict';
import {createQuranClient} from '../lib/quran-content.mjs';

assert.ok(process.env.QURAN_CLIENT_ID && process.env.QURAN_CLIENT_SECRET, 'Both Quran Foundation credentials are required.');
const upstreamFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const response = await upstreamFetch(url, options);
  console.log(`Quran Foundation ${new URL(url).pathname}: HTTP ${response.status}`);
  return response;
};
const client = createQuranClient(process.env.QURAN_CLIENT_ID, process.env.QURAN_CLIENT_SECRET);
assert.equal((await client.chapters()).length, 114);
assert.equal((await client.chapter(67)).ayahs.length, 30);
console.log('Production connection verified: 114 surahs and all 30 ayahs of Al-Mulk.');
