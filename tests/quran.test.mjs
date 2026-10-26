import test from "node:test";
import assert from "node:assert/strict";
import {
  loadSurah,
  loadSurahs,
  validAyahRange,
  quranReference,
  quranReferences,
} from "../quran.js";

test("validates ranges and makes explicit references without changing Arabic names", () => {
  assert.equal(validAyahRange(1, 30, 30), true);
  for (const args of [
    [0, 3, 30],
    [4, 2, 30],
    [1, 31, 30],
    [1.5, 3, 30],
  ])
    assert.equal(validAyahRange(...args), false);
  assert.equal(
    quranReference(
      { number: 67, name: "سُورَةُ المُلۡكِ", englishName: "Al-Mulk" },
      1,
      10,
      "ar",
    ),
    "سُورَةُ المُلۡكِ (67:1-10)",
  );
});

test("preserves exact API text, caches validated data, and rejects incomplete or mismatched chapters", async () => {
  const text = "نصّ اختبارٍ للتشكيل ۝";
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return {
      ok: true,
      json: async () => ({
        code: 200,
        data: {
          number: 112,
          numberOfAyahs: 1,
          edition: { identifier: "quran-uthmani" },
          ayahs: [{ numberInSurah: 1, text }],
        },
      }),
    };
  };
  const result = await loadSurah(112);
  assert.equal(result.ayahs[0].text, text);
  await loadSurah(112);
  assert.equal(calls, 1);
  await assert.rejects(loadSurah(113), /completely/);
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      code: 200,
      data: {
        number: 114,
        numberOfAyahs: 2,
        edition: { identifier: "quran-uthmani" },
        ayahs: [{ numberInSurah: 1, text }],
      },
    }),
  });
  await assert.rejects(loadSurah(114), /completely/);
  await assert.rejects(loadSurah(0), /Choose a surah/);
});

test("errors remain retryable and an incomplete surah index is rejected", async () => {
  globalThis.fetch = async () => ({ ok: false });
  await assert.rejects(loadSurahs(), /unavailable/);
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ code: 200, data: [] }),
  });
  await assert.rejects(loadSurahs(), /surah list/);
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      code: 200,
      data: Array.from({ length: 114 }, (_, i) => ({
        number: i + 1,
        name: `سورة ${i + 1}`,
        englishName: `Surah ${i + 1}`,
        numberOfAyahs: 1,
      })),
    }),
  });
  assert.equal((await loadSurahs()).length, 114);
});

test("only explicit valid references become reading links, without guessing old free-text assignments", () => {
  assert.deepEqual(
    quranReferences("Al-Mulk (67:1-10). Notes (67:1-10) and (71:1-5)."),
    [
      { surah: 67, from: 1, to: 10 },
      { surah: 71, from: 1, to: 5 },
    ],
  );
  assert.deepEqual(
    quranReferences(
      "Surah Nuh, first half of the page. (115:1-3) (2:5-1) (0:1-1)",
    ),
    [],
  );
});
