import {ReviewPlanner} from './study-tools.js?v=2';
import { y } from "./runtime.js";
import { t, getLanguage } from "./i18n.js?v=20";
import {
  loadSurahs,
  loadSurah,
  validAyahRange,
  quranReference,
} from "./quran.js?v=2";
const el = y.createElement;

export function QuranReader({ initialSelection, onAdd }) {
  const initial = initialSelection || { surah: 1, from: 1, to: 7 };
  const [surahs, setSurahs] = y.useState([]);
  const [surah, setSurah] = y.useState(initial.surah);
  const [from, setFrom] = y.useState(String(initial.from));
  const [to, setTo] = y.useState(String(initial.to));
  const [selection, setSelection] = y.useState(initial);
  const [data, setData] = y.useState(null);
  const [error, setError] = y.useState("");
  const [retry, setRetry] = y.useState(0);
  const [practice,setPractice]=y.useState(false);
  const [loading, setLoading] = y.useState(true);

  y.useEffect(() => {
    setLoading(true);
    setError("");
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    loadSurahs(controller.signal)
      .then((list) => {
        if (active) setSurahs(list);
      })
      .catch(() => {
        if (active) {
          setError("The surah list could not be loaded. Please try again.");
          setLoading(false);
        }
      })
      .finally(() => clearTimeout(timer));
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [retry]);

  y.useEffect(() => {
    if (!surahs.length) return;
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    setLoading(true);
    setError("");
    setData(null);
    const meta = surahs.find((item) => item.number === selection.surah);
    if (
      !meta ||
      !validAyahRange(selection.from, selection.to, meta.numberOfAyahs)
    ) {
      setError("Choose a valid ayah range.");
      setLoading(false);
      clearTimeout(timer);
      return;
    }
    loadSurah(selection.surah, controller.signal)
      .then((chapter) => {
        if (chapter.numberOfAyahs !== meta.numberOfAyahs)
          throw Error(
            "The ayahs could not be loaded completely. Please try again.",
          );
        if (active) setData(chapter);
      })
      .catch((err) => {
        if (active)
          setError(
            err.name === "AbortError"
              ? "Qur’an is unavailable right now. Please try again."
              : err.message,
          );
      })
      .finally(() => {
        clearTimeout(timer);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [surahs, selection, retry]);

  function read(event) {
    event.preventDefault();
    const count = surahs.find((item) => item.number === surah)?.numberOfAyahs;
    if (!validAyahRange(Number(from), Number(to), count)) {
      setError("Choose a valid ayah range.");
      return;
    }
    setData(null);
    setSelection({ surah, from: Number(from), to: Number(to) });
  }
  const meta = surahs.find((item) => item.number === surah);
  const loaded = surahs.find((item) => item.number === selection.surah);
  return el(
    "section",
    { className: "quran-reader", "aria-label": t("Qur’an reader") },
    el(
      "form",
      { className: "quran-controls", onSubmit: read },
      el(
        "label",
        null,
        t("Surah"),
        el(
          "select",
          {
            value: surah,
            disabled: !surahs.length,
            "aria-label": t("Surah"),
            onChange: (event) => {
              const number = Number(event.target.value);
              setSurah(number);
              setFrom("1");
              setTo(
                String(
                  Math.min(
                    10,
                    surahs.find((item) => item.number === number).numberOfAyahs,
                  ),
                ),
              );
            },
          },
          ...surahs.map((item) =>
            el(
              "option",
              { key: item.number, value: item.number },
              `${item.number}. ${getLanguage() === "ar" ? item.name : item.englishName}`,
            ),
          ),
        ),
      ),
      el(
        "label",
        null,
        t("From ayah"),
        el("input", {
          type: "number",
          min: 1,
          max: meta?.numberOfAyahs,
          value: from,
          required: true,
          disabled: !surahs.length,
          "aria-label": t("From ayah"),
          onChange: (event) => setFrom(event.target.value),
        }),
      ),
      el(
        "label",
        null,
        t("To ayah"),
        el("input", {
          type: "number",
          min: 1,
          max: meta?.numberOfAyahs,
          value: to,
          required: true,
          disabled: !surahs.length,
          "aria-label": t("To ayah"),
          onChange: (event) => setTo(event.target.value),
        }),
      ),
      el(
        "button",
        { className: "primary", disabled: !surahs.length },
        t("Read ayahs"),
      ),
    ),
    !onAdd&&data?.number===selection.surah&&el('aside',{className:'reader-practice'},el('div',null,el('h2',null,t('Practise this passage')),el('p',{className:'help'},t('Build a timed review plan for the ayahs you are reading.'))),el('button',{className:'secondary',type:'button','aria-expanded':practice,'aria-controls':'reader-review-plan',onClick:()=>setPractice(value=>!value)},t(practice?'Close plan':'Plan with AI')),practice&&el('div',{id:'reader-review-plan'},el(ReviewPlanner,{assignment:'Review '+quranReference(loaded,selection.from,selection.to,getLanguage()),context:'reader|'+selection.surah+':'+selection.from+'-'+selection.to}))),
    error &&
      el(
        "div",
        { className: "quran-error", role: "alert" },
        el("p", null, t(error)),
        error !== "Choose a valid ayah range." &&
          el(
            "button",
            {
              className: "secondary",
              type: "button",
              onClick: () => setRetry((value) => value + 1),
            },
            t("Try again"),
          ),
      ),
    loading &&
      el("p", { className: "help", role: "status" }, t("Loading Qur’an…")),
    data?.number === selection.surah &&
      el(
        "div",
        { className: "quran-reading", translate: "no" },
        el(
          "header",
          { className: "quran-reading-heading" },
          el("h2", { lang: "ar", dir: "rtl" }, data.name),
          el(
            "p",
            null,
            t("Ayahs {from}–{to}", { from: selection.from, to: selection.to }),
          ),
        ),
        el(
          "ol",
          { className: "quran-verses", dir: "rtl", start: selection.from },
          ...data.ayahs.slice(selection.from - 1, selection.to).map((ayah) =>
            el(
              "li",
              { key: ayah.numberInSurah },
              el("p", { lang: "ar", dir: "rtl" }, ayah.text),
              el(
                "span",
                {
                  className: "quran-ayah-number",
                  "aria-label": t("Ayah {number}", {
                    number: ayah.numberInSurah,
                  }),
                },
                new Intl.NumberFormat("ar").format(ayah.numberInSurah),
              ),
            ),
          ),
        ),
        onAdd &&
          el(
            "button",
            {
              className: "primary quran-add",
              type: "button",
              disabled:
                surah !== selection.surah ||
                Number(from) !== selection.from ||
                Number(to) !== selection.to,
              onClick: () =>
                onAdd(
                  quranReference(
                    loaded,
                    selection.from,
                    selection.to,
                    getLanguage(),
                  ),
                ),
            },
            t("Add to homework"),
          ),
      ),
    el(
      "p",
      { className: "quran-source" },
      el(
        "a",
        {
          href: "https://alquran.cloud/api",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        t("Qur’an text: Al Quran Cloud · Uthmani edition"),
      ),
    ),
  );
}
