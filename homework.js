export function homeworkIso(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function localDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return homeworkIso(date) === iso ? date : null;
}

// A chosen Sunday stays selected; other dates belong to the Sunday after them.
export function homeworkSunday(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = localDate(iso);
  if (!date) return null;
  date.setDate(date.getDate() + ((7 - date.getDay()) % 7));
  return homeworkIso(date);
}

export function nextHomeworkSunday(from = new Date()) {
  const date = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate() + 1,
  );
  return homeworkSunday(homeworkIso(date));
}

export function shiftHomeworkWeek(iso, days) {
  const date = localDate(iso);
  date.setDate(date.getDate() + days);
  return homeworkIso(date);
}

export function homeworkKey(name) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
}

export function readHomeworkLocal(storage) {
  try {
    const value = JSON.parse(storage?.getItem("tamkeen-homework") || "{}");
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch {
    return {};
  }
}

export function storeHomeworkDraft(storage, week, name, body) {
  try {
    const store = readHomeworkLocal(storage);
    const entries = store[week];
    store[week] =
      entries && typeof entries === "object" && !Array.isArray(entries)
        ? entries
        : {};
    store[week][homeworkKey(name)] = body ? { name, body } : null;
    storage.setItem("tamkeen-homework", JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

export function clearHomeworkDraft(storage, week, name) {
  try {
    const store = readHomeworkLocal(storage);
    if (store[week]) delete store[week][homeworkKey(name)];
    storage?.setItem("tamkeen-homework", JSON.stringify(store));
  } catch {
    /* A confirmed server save still succeeds when device storage is blocked. */
  }
}
