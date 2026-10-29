import { y } from "./runtime.js";
import { t, getLanguage } from "./i18n.js?v=21";
import {
  loadSurahs,
  loadSurah,
  loadRecitation,
  validAyahRange,
  quranReference,
} from "./quran.js?v=3";
const el = y.createElement;

export function QuranReader({ initialSelection, onAdd, practice=false, locked=false, onPractised }) {
  const initial = initialSelection || { surah: 1, from: 1, to: 7 };
  const [surahs, setSurahs] = y.useState([]);
  const [surah, setSurah] = y.useState(initial.surah);
  const [from, setFrom] = y.useState(String(initial.from));
  const [to, setTo] = y.useState(String(initial.to));
  const [selection, setSelection] = y.useState(initial);
  const [data, setData] = y.useState(null);
  const [error, setError] = y.useState("");
  const [retry, setRetry] = y.useState(0);
  const [recall,setRecall]=y.useState(practice),[step,setStep]=y.useState(0),[revealed,setRevealed]=y.useState(false),[finished,setFinished]=y.useState(false),[audio,setAudio]=y.useState(''),[audioError,setAudioError]=y.useState(''),[audioBusy,setAudioBusy]=y.useState(false);
  const audioRequest=y.useRef(null);
  y.useEffect(()=>{setAudio('');setAudioError('');setAudioBusy(false);setRevealed(false);const old=audioRequest.current;audioRequest.current=null;old?.abort();return()=>{const old=audioRequest.current;audioRequest.current=null;old?.abort();};},[selection,step,recall]);
  y.useEffect(()=>{setStep(0);setFinished(false);},[selection]);
  function moveAyah(delta){const old=audioRequest.current;audioRequest.current=null;old?.abort();setAudio('');setAudioBusy(false);setRevealed(false);setStep(value=>value+delta);}
  async function listen(){audioRequest.current?.abort();const controller=new AbortController();audioRequest.current=controller;const timer=setTimeout(()=>controller.abort(),15000);setAudioBusy(true);setAudioError('');try{const chapter=await loadRecitation(selection.surah,controller.signal,data.numberOfAyahs);if(!controller.signal.aborted)setAudio(chapter.ayahs[selection.from-1+step].audio);}catch{if(!controller.signal.aborted)setAudioError('Recitation audio could not be loaded. You can still read and practise.');}finally{clearTimeout(timer);if(!controller.signal.aborted)setAudioBusy(false);else if(audioRequest.current===controller){setAudioBusy(false);setAudioError('Recitation audio could not be loaded. You can still read and practise.');}}}

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
    !locked&&el(
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
    !onAdd&&data?.number===selection.surah&&el('div',{className:'reader-mode'},el('button',{className:recall?'secondary':'primary',type:'button','aria-pressed':!recall,onClick:()=>setRecall(false)},t('Read passage')),el('button',{className:recall?'primary':'secondary',type:'button','aria-pressed':recall,onClick:()=>setRecall(true)},t('Practise from memory'))),
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
    data?.number === selection.surah && (recall?el('section',{className:'memorisation-practice'},
      el('header',null,el('h2',{lang:'ar',dir:'rtl'},data.name),el('p',null,t('Ayah {current} of {total}',{current:step+1,total:selection.to-selection.from+1}))),
      el('p',{className:'recall-instruction'},t('Recite ayah {number} from memory, then reveal it to check.',{number:selection.from+step})),
      revealed?el('p',{className:'recall-ayah',lang:'ar',dir:'rtl',translate:'no'},data.ayahs[selection.from-1+step]?.text):el('button',{className:'reveal-ayah',type:'button',onClick:()=>setRevealed(true)},t('Reveal ayah')),
      el('div',{className:'recall-audio'},el('button',{className:'text-button',type:'button',disabled:audioBusy,onClick:listen},t(audioBusy?'Loading recitation…':'Listen to this ayah')),audio&&el('audio',{key:audio,controls:true,preload:'none',autoPlay:true,src:audio,'aria-label':t('Ayah recitation'),onError:()=>{setAudio('');setAudioError('Recitation audio could not be loaded. You can still read and practise.');}}),audioError&&el('p',{className:'quran-error',role:'status'},t(audioError))),
      el('div',{className:'recall-controls'},el('button',{className:'secondary',type:'button',disabled:step===0,onClick:()=>moveAyah(-1)},t('Previous ayah')),step<selection.to-selection.from?el('button',{className:'primary',type:'button',onClick:()=>moveAyah(1)},t('Next ayah')):el('button',{className:'primary',type:'button',onClick:()=>{setFinished(true);onPractised?.();}},t('Finish practice'))),
      finished&&el('p',{role:'status'},t('Practice finished. Your teacher will check your recitation in person.'))
    ):el(
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
      )),
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
