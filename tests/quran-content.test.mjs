import test from 'node:test';
import assert from 'node:assert/strict';
import {createQuranClient} from '../lib/quran-content.mjs';

const chapters = Array.from({length: 114}, (_, i) => ({id: i + 1, name_arabic: 'سورة', name_simple: 'Surah', verses_count: 1}));
const text = 'نصّ اختبارٍ للتشكيل';
const json = (body, status = 200) => Response.json(body, {status});
const realFetch = globalThis.fetch;
test.afterEach(() => {globalThis.fetch = realFetch;});

test('uses production client credentials server-side, shares tokens and caches only validated content', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push(url);
    if (url.includes('/oauth2/token')) {
      assert.equal(url, 'https://oauth2.quran.foundation/oauth2/token');
      assert.equal(options.headers.Authorization, 'Basic ' + btoa('client:secret'));
      assert.equal(options.body, 'grant_type=client_credentials&scope=content');
      return json({access_token: 'server-token', expires_in: 3600});
    }
    assert.equal(options.headers['x-client-id'], 'client');
    assert.equal(options.headers['x-auth-token'], 'server-token');
    assert.ok(url.startsWith('https://apis.quran.foundation/content/api/v4/'));
    return json(url.includes('/chapters?') ? {chapters} : {verses: [{verse_key: '67:1', text_uthmani: text}]});
  };
  const client = createQuranClient('client', 'secret');
  await Promise.all([client.chapters(), client.chapters()]);
  const chapter = await client.chapter(67);
  assert.equal(chapter.ayahs[0].text, text);
  assert.equal(chapter.edition.identifier, 'quran-foundation-uthmani');
  assert.equal(JSON.stringify(chapter).includes('server-token'), false);
  await client.chapter(67);
  assert.equal(calls.filter(url => url.includes('/oauth2/token')).length, 1);
  assert.equal(calls.filter(url => url.includes('/quran/verses/uthmani?chapter_number=67')).length, 1);
  await assert.rejects(client.chapter(0), /Choose/);
  await assert.rejects(client.chapter(115), /Choose/);
});

test('renews an expired token and retries an unauthorized content request only once', async () => {
  let tokens = 0, requests = 0;
  globalThis.fetch = async url => url.includes('/oauth2/token')
    ? (tokens++, json({access_token: 'token' + tokens, expires_in: 3600}))
    : (++requests === 1 ? json({}, 401) : json({chapters}));
  await createQuranClient('client', 'secret').chapters();
  assert.equal(tokens, 2);
  assert.equal(requests, 2);
  tokens = requests = 0;
  globalThis.fetch = async url => url.includes('/oauth2/token')
    ? (tokens++, json({access_token: 'token', expires_in: 3600}))
    : (requests++, json({message: 'private upstream detail'}, 401));
  await assert.rejects(createQuranClient('client', 'secret').chapters(), /unavailable/);
  assert.equal(tokens, 2);
  assert.equal(requests, 2);
});

test('refreshes short-lived tokens and does not retry forbidden or rate-limited content', async () => {
  let tokens = 0, requests = 0;
  globalThis.fetch = async url => url.includes('/oauth2/token')
    ? (tokens++, json({access_token: 'token', expires_in: 30}))
    : (requests++, json(url.includes('/chapters?') ? {chapters} : {verses: [{verse_key: '1:1', text_uthmani: text}]}));
  await createQuranClient('client', 'secret').chapter(1);
  assert.equal(tokens, 2);
  for (const status of [403, 429, 500]) {
    requests = 0;
    globalThis.fetch = async url => url.includes('/oauth2/token')
      ? json({access_token: 'token', expires_in: 3600})
      : (requests++, json({}, status));
    await assert.rejects(createQuranClient('client', 'secret').chapters(), /unavailable/);
    assert.equal(requests, 1);
  }
});

test('rejects incomplete or mismatched verses and never caches a failed response', async () => {
  let verses = [], calls = 0;
  globalThis.fetch = async url => url.includes('/oauth2/token')
    ? json({access_token: 'token', expires_in: 3600})
    : url.includes('/chapters?') ? json({chapters}) : (calls++, json({verses}));
  const client = createQuranClient('client', 'secret');
  await assert.rejects(client.chapter(1), /unavailable/);
  verses = [{verse_key: '2:1', text_uthmani: text}];
  await assert.rejects(client.chapter(1), /unavailable/);
  verses = [{verse_key: '1:1', text_uthmani: ''}];
  await assert.rejects(client.chapter(1), /unavailable/);
  verses = [{verse_key: '1:1', text_uthmani: text}];
  assert.equal((await client.chapter(1)).ayahs[0].text, text);
  assert.equal(calls, 4);
});

test('rejects incomplete chapter lists and failed or malformed authentication', async () => {
  globalThis.fetch = async url => url.includes('/oauth2/token')
    ? json({access_token: 'token', expires_in: 3600}) : json({chapters: chapters.slice(0, 2)});
  await assert.rejects(createQuranClient('client', 'secret').chapters(), /unavailable/);
  for (const response of [json({}, 401), json({access_token: 'token'}), json({access_token: '', expires_in: 3600})]) {
    globalThis.fetch = async () => response;
    await assert.rejects(createQuranClient('client', 'secret').chapters(), /unavailable/);
  }
});
