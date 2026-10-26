import test from "node:test";
import assert from "node:assert/strict";
import {
  homeworkSunday,
  nextHomeworkSunday,
  shiftHomeworkWeek,
  readHomeworkLocal,
  storeHomeworkDraft,
  clearHomeworkDraft,
} from "../homework.js";

test("defaults to a strictly future Sunday in local time, including Sunday and year boundaries", () => {
  assert.equal(nextHomeworkSunday(new Date(2026, 9, 25, 23, 59)), "2026-11-01");
  assert.equal(nextHomeworkSunday(new Date(2026, 9, 24, 12)), "2026-10-25");
  assert.equal(nextHomeworkSunday(new Date(2026, 11, 31, 12)), "2027-01-03");
  assert.equal(nextHomeworkSunday(new Date(2026, 2, 7, 12)), "2026-03-08");
});
test("calendar dates select their Sunday and arrows move exactly one week", () => {
  assert.equal(homeworkSunday("2026-11-01"), "2026-11-01");
  assert.equal(homeworkSunday("2026-10-29"), "2026-11-01");
  assert.equal(homeworkSunday("2026-02-30"), null);
  assert.equal(homeworkSunday(""), null);
  assert.equal(shiftHomeworkWeek("2026-11-01", -7), "2026-10-25");
  assert.equal(shiftHomeworkWeek("2026-12-27", 7), "2027-01-03");
});
test("pending edits and deletion survive reload independently by name and Sunday, and clear only after confirmation", () => {
  const values = new Map();
  const storage = {
    getItem: (k) => values.get(k),
    setItem: (k, v) => values.set(k, v),
  };
  assert.equal(
    storeHomeworkDraft(storage, "2026-11-01", " Ahmed ", "Surah Nuh"),
    true,
  );
  storeHomeworkDraft(storage, "2026-11-08", "Ahmed", "Surah al-Jinn");
  storeHomeworkDraft(storage, "2026-11-01", "Hamza", "Surah al-Mulk");
  assert.equal(
    readHomeworkLocal(storage)["2026-11-01"].ahmed.body,
    "Surah Nuh",
  );
  clearHomeworkDraft(storage, "2026-11-01", "AHMED");
  assert.equal(readHomeworkLocal(storage)["2026-11-01"].ahmed, undefined);
  assert.equal(
    readHomeworkLocal(storage)["2026-11-08"].ahmed.body,
    "Surah al-Jinn",
  );
  storeHomeworkDraft(storage, "2026-11-01", "Hamza", "");
  assert.equal(readHomeworkLocal(storage)["2026-11-01"].hamza, null);
});
test("malformed or blocked device storage does not break shared homework", () => {
  for (const value of ["null", "[]", '"bad"', "{"])
    assert.deepEqual(readHomeworkLocal({ getItem: () => value }), {});
  assert.equal(
    storeHomeworkDraft(
      {
        getItem: () => null,
        setItem: () => {
          throw Error("blocked");
        },
      },
      "2026-11-01",
      "Ahmed",
      "Nuh",
    ),
    false,
  );
  assert.doesNotThrow(() => clearHomeworkDraft(null, "2026-11-01", "Ahmed"));
});
