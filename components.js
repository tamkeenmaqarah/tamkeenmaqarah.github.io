import {TeacherAssignments} from './assignments.js?v=2';
import {nextHomeworkSunday} from './homework.js?v=1';
import {NotesCards,MissCoach} from './study-tools.js?v=2';
import {
  y,
  M,
  We,
  te,
  w,
  ie,
  oe,
  ce,
  ue,
  E,
  fe,
  pe,
  k,
  he,
  _e,
  ye,
  xe,
  Se,
  we,
  Ee,
  Oe,
  Ae,
  Me,
  Ne,
  Fe,
  Le,
  ze,
  Ve,
} from "./runtime.js";
import {
  t as translate,
  getLanguage,
  setLanguage,
  subscribeLanguage,
} from "./i18n.js?v=20";
import {photoUrl} from "./profile.js?v=1";
const Ge = (e) => (e.score / e.max) * 100,
  Ke = (e) =>
    e
      .split(/\s+/)
      .map((e) => e[0])
      .slice(0, 2)
      .join(``);
function qe(e) {
  let t = [...e].sort((e, t) => Ge(t) - Ge(e) || e.name.localeCompare(t.name));
  return t.map((e) => ({
    ...e,
    rank: 1 + t.filter((t) => Ge(t) > Ge(e)).length,
  }));
}
function Trophy() {
  let mark = (0, y.useRef)(null);
  (0, y.useEffect)(() => {
    let node = mark.current;
    if (!node || typeof IntersectionObserver !== `function`) return;
    let watch = new IntersectionObserver(([entry]) => {
      node.classList.toggle(`is-quiet`, !entry.isIntersecting);
    });
    watch.observe(node);
    return () => watch.disconnect();
  }, []);
  return (0, M.jsxs)(`svg`, {
    ref: mark,
    className: `podium-trophy`,
    viewBox: `0 0 48 62`,
    width: `36`,
    height: `46`,
    "aria-hidden": true,
    children: [
      (0, M.jsx)(`path`, {
        className: `trophy-flame`,
        d: `M24 3.4c2.4 3.4 4.6 5 4.6 7.8a4.6 4.6 0 0 1-9.2 0c0-2.8 2.2-4.4 4.6-7.8z`,
      }),
      (0, M.jsx)(`path`, {
        className: `trophy-flame-core`,
        d: `M24 8c1.2 1.7 2.2 2.5 2.2 4a2.2 2.2 0 0 1-4.4 0c0-1.5 1-2.3 2.2-4z`,
      }),
      (0, M.jsx)(`path`, {
        className: `trophy-cup`,
        d: `M14.5 22h19l-1.4 9.2c-.8 5-4.6 8.6-8.1 9.2-3.5-.6-7.3-4.2-8.1-9.2L14.5 22z`,
      }),
      (0, M.jsx)(`path`, { className: `trophy-rim`, d: `M13.2 20.6h21.6` }),
      (0, M.jsx)(`path`, {
        className: `trophy-handle`,
        d: `M14.5 24.5H10a4.8 4.8 0 0 0 0 8.4h4.2`,
      }),
      (0, M.jsx)(`path`, {
        className: `trophy-handle`,
        d: `M33.5 24.5H38a4.8 4.8 0 0 1 0 8.4h-4.2`,
      }),
      (0, M.jsx)(`path`, { className: `trophy-stem`, d: `M24 40.6v8` }),
      (0, M.jsx)(`path`, { className: `trophy-base`, d: `M16 50.2h16` }),
    ],
  });
}
function Je({ rows: e, picked, onPick }) {
  let t = Array.from(new Set(e.map((e) => e.rank)))
    .slice(0, 3)
    .map((t) => ({ rank: t, students: e.filter((e) => e.rank === t) }));
  return (0, M.jsx)(`div`, {
    className: `podium`,
    "aria-label": translate(`Highest scoring students`),
    children: (t.length > 1 ? [t[1], t[0], t[2]].filter(Boolean) : t).map((e) => {
      let names = e.students.map((e) => e.name).join(` & `);
      let first = t.indexOf(e) === 0;
      return (0, M.jsxs)(
        `button`,
        {
          type: `button`,
          className:
            `podium-place tier-` +
            (t.indexOf(e) + 1) +
            (picked === e.rank ? ` is-picked` : ``),
          "aria-pressed": picked === e.rank,
          onClick: () => onPick?.(e.rank),
          children: [
            first && (0, M.jsx)(Trophy, {}),
            (0, M.jsx)(`div`, {
              className: `podium-avatar`,
              children: (0, M.jsx)(`span`, {
                children: Ke(e.students[0].name),
              }),
            }),
            (0, M.jsx)(`b`, { className: `podium-name`, children: names }),
            (0, M.jsxs)(`div`, {
              className: `podium-points`,
              children: [
                e.students[0].score,
                (0, M.jsxs)(`small`, { children: [`/`, e.students[0].max] }),
              ],
            }),
            (0, M.jsx)(`div`, { className: `podium-block`, children: e.rank }),
          ],
        },
        e.rank,
      );
    }),
  });
}
function Ye({ moment: e }) {
  return (0, M.jsxs)(`article`, {
    className: `moment-card`,
    children: [
      (0, M.jsx)(`p`, {
        className: `moment-question`,
        dir: `auto`,
        children: e.question,
      }),
      (0, M.jsxs)(`p`, {
        className: `moment-answer`,
        children: [
          (0, M.jsx)(`bdi`, { children: e.name }),
          translate(` answered `),
          (0, M.jsxs)(`strong`, {
            dir: `auto`,
            children: [`“`, e.chosen, `”`],
          }),
        ],
      }),
      (0, M.jsxs)(`p`, {
        className: `moment-correct`,
        children: [
          (0, M.jsx)(ce, { size: 16 }),
          translate(` Correct answer: `),
          (0, M.jsx)(`b`, { dir: `auto`, children: e.correct }),
        ],
      }),
      (0, M.jsx)(`p`, {
        className: `moment-caption`,
        dir: `auto`,
        children: e.caption,
      }),
    ],
  });
}
var Xe = `https://tamkeen-maqraah-learning.modest-mink-0683.chatgpt.site`;
const HALAQAS = [
  {
    id: `latest`,
    title: `Latest uploads`,
    list: `UULUKG-xZKRTI8YI2nmOAi7g`,
  },
  { id: `tuesday`, title: `Tuesday halaqa · The Arab Spring`, list: `PLJHIkqUYcGAA` },
  { id: `_32iuirRwJI`, title: `TAMKEEN Halaqa 10 24 2026` },
  { id: `hwHEpimlzao`, title: `TAMKEEN Halaqa 10 17 2026` },
  {
    id: `VF0cdNeOWK4`,
    title: `Discussion on Music · Khatera 10/3/2026`,
  },
];
function Halaqas({tuesday=false}) {
  let [pick, setPick] = (0, y.useState)(()=>tuesday?HALAQAS.find(item=>item.list==='PLJHIkqUYcGAA').id:HALAQAS[0].id);
  const [playing, setPlaying] = y.useState(false);
  let chosen = HALAQAS.find((item) => item.id === pick) || HALAQAS[0];
  let src = chosen.list
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=` + chosen.list
    : `https://www.youtube-nocookie.com/embed/` + chosen.id;
  return el(
    "section",
    { className: "halaqas", "aria-labelledby": "halaqas-heading" },
    el(
      "div",
      { className: "section-heading" },
      el("h2", { id: "halaqas-heading" }, translate("Tamkeen halaqas")),
      el(
        "a",
        {
          className: "text-button",
          href: "https://www.youtube.com/@TamkeenYouth",
          target: "_blank",
          rel: "noreferrer",
        },
        translate("Tamkeen Youth"),
        el(w, { size: 15 }),
      ),
    ),
    el(
      "p",
      { className: "halaqas-note" },
      translate(
        "Saturday halaqas and the Tuesday lesson series.",
      ),
    ),
    el("div", {className: "halaqa-media"},
    el("div", {className: "halaqa-viewer"},
      el("div", {className: "halaqa-player"},
        playing ? el("iframe", {
          src: src + (chosen.list ? "&" : "?") + "autoplay=1",
          title: translate(chosen.title),
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: true,
          referrerPolicy: "strict-origin-when-cross-origin",
        }) : el("button", {className: "halaqa-preview", type: "button", onClick: () => setPlaying(true), "aria-label": translate("Play halaqa") + ": " + translate(chosen.title)},
          el("svg", {width: 52, height: 52, viewBox: "0 0 52 52", fill: "none", "aria-hidden": true},
            el("circle", {cx: 26, cy: 26, r: 24, stroke: "currentColor", strokeWidth: 1.5}),
            el("path", {d: "m22 17 13 9-13 9z", fill: "currentColor"})),
          el("span", null, translate(chosen.title)),
          el("span", {className: "halaqa-play-label"}, translate("Play halaqa")))),
      el("a", {className: "text-button halaqa-external", href: chosen.list ? "https://www.youtube.com/playlist?list=" + chosen.list : "https://www.youtube.com/watch?v=" + chosen.id, target: "_blank", rel: "noopener noreferrer"}, translate("Watch on YouTube"), el(w, {size: 15}))),
    el(
      "div",
      { className: "halaqa-picks" },
      HALAQAS.map((item) =>
        el(
          "button",
          {
            key: item.id,
            type: "button",
            className: item.id === pick ? "is-playing" : "",
            "aria-pressed": item.id === pick,
            onClick: () => {setPick(item.id); setPlaying(true);},
          },
          item.list
            ? el(
                "svg",
                {
                  className: "halaqa-mark",
                  viewBox: "0 0 92 52",
                  "aria-hidden": true,
                },
                el("rect", { width: "92", height: "52", rx: "4" }),
                el("path", { d: "M40 18v16l14-8z" }),
              )
            : el("img", {
                src: "https://i.ytimg.com/vi/" + item.id + "/hqdefault.jpg",
                alt: "",
              }),
          el("span", null, translate(item.title)),
        ),
      ),
    )),

  );
}
function StudyPage({name,revisit,onPractice,onClearRevisit,onNavigate}) {
 const initial=new URLSearchParams(location.search).get('tool');
 const [tab,setTab]=y.useState(['notes','practice','tuesday'].includes(initial)?initial:'lessons');
 function select(value){setTab(value);history.replaceState(null,'','/?view=study'+(value==='lessons'?'':'&tool='+value));}
 return el('section',{className:'study-page'},el('header',{className:'page-heading'},el('div',null,el('h1',null,translate('Halaqas & study')),el('p',null,translate('Watch the lesson, work through your notes, and revisit missed questions.')))),
  el('nav',{className:'study-section-nav','aria-label':translate('Study sections')},[['lessons','Watch halaqas'],['notes','My notes & AI'],['practice','Missed questions']].map(([id,label])=>el('button',{type:'button',key:id,'aria-pressed':tab===id||(id==='lessons'&&tab==='tuesday'),onClick:()=>select(id)},translate(label),id==='practice'&&revisit?.misses?.length?el('span',{className:'study-count'},revisit.misses.length):null))),
  (tab==='lessons'||tab==='tuesday')&&el(Halaqas,{key:tab,tuesday:tab==='tuesday'}),
  tab==='notes'&&el(NotesCards,{owner:name}),
  tab==='practice'&&(revisit?.misses?.length?el(PrivatePractice,{revisit,onPractice,onClearRevisit}):el('section',{className:'study-empty'},el('h2',null,translate('Your missed questions will be here')),el('p',null,translate('After a quiz, review the teacher’s explanation, ask for a simpler explanation, or practise your missed questions.')),el('button',{className:'primary',onClick:()=>onNavigate('quizzes')},translate('Find a quiz')))));
}
function Ze({name,data,recent,revisit,onPractice,onClearRevisit,onNavigate,onStart}) {
 const quiz=data.quizzes.find(quiz=>quiz.published),board=data.community.boards.find(board=>board.rows.length),moment=data.community.moments[0],week=nextHomeworkSunday();
 let quizAction='Start quiz';try{const draft=JSON.parse(localStorage.getItem('tamkeen-draft')||'null'),done=JSON.parse(localStorage.getItem('tamkeen-done')||'null');if(quiz&&draft?.quizId===quiz.id&&Array.isArray(draft.answers)&&draft.answers.length===quiz.questions.length&&(draft.step>=0||draft.answers.some(answer=>answer!==-1)))quizAction='Resume quiz';else if(quiz&&done?.quizId===quiz.id)quizAction='View result';}catch{}
 const date=new Intl.DateTimeFormat(getLanguage()==='ar'?'ar':'en',{weekday:'long',month:'long',day:'numeric'}).format(new Date(week+'T12:00:00'));
 return el('div',{className:'community-home week-home'},
  el('section',{className:'week-intro','aria-labelledby':'gathering-title'},el('div',null,el('h1',{id:'gathering-title'},translate('Your week')),el('p',{className:'week-gathering'},date,' · ',translate('After Fajr')),el('div',{className:'week-quick-actions'},el('button',{className:'secondary',onClick:()=>onNavigate('quran')},translate('Read Qur’an')),el('button',{className:'text-button',onClick:()=>onNavigate('account')},translate('Your account')))),el('div',{className:'week-hearth'},el(Lantern,{className:'week-lantern'}),el(Heater,{className:'hero-heater'}),el(Cushion,{kind:'backrest',className:'week-cushion'}))),
  el('div',{className:'home-week-grid'},el(TeacherAssignments,{week,name,compact:true,onHomework:()=>onNavigate('homework')}),
   el('section',{className:'weekly-quiz','aria-labelledby':'weekly-quiz-title'},el('div',{className:'weekly-quiz-copy'},el('h2',{id:'weekly-quiz-title'},translate('Weekly quiz')),el('h3',{dir:'auto'},quiz?quiz.title:translate('No quiz is open right now.')),quiz&&el('p',null,translate('{count} questions · No time limit',{count:quiz.questions.length})),recent&&el('p',{className:'latest-score'},translate('Your latest result: '),el('b',null,recent.score,'/',recent.max))),
    el('div',{className:'week-quiz-actions'},el('button',{className:'primary',onClick:()=>quiz?onStart(quiz):onNavigate('quizzes')},translate(quiz?quizAction:'All quizzes'),el(w,{size:17})),quiz&&el('button',{className:'text-button',onClick:()=>onNavigate('quizzes')},translate('All quizzes'))))),
  el('section',{className:'home-study-launch','aria-labelledby':'home-study-title'},el('header',null,el('h2',{id:'home-study-title'},translate('Halaqas & study')),el('span',{className:'help'},translate('Lessons, notes and practice'))),
   el('div',{className:'study-launch-actions'},[['tuesday','Watch Tuesday halaqa','The Arab Spring',ie],['notes','Study my notes','Revision cards & answers from your notes',E],['practice','Practise missed questions',revisit?.misses?.length?translate('{count} to revisit',{count:revisit.misses.length}):'Review after your next quiz',Oe]].map(([id,title,detail,Icon])=>el('button',{type:'button',key:id,onClick:()=>onNavigate(id)},el(Icon,{size:23}),el('span',null,el('strong',null,translate(title)),el('small',null,translate(detail))),el(w,{size:18}))))),
    el(
      "div",
      { className: "home-community-grid" },
      el(
        "section",
        { className: "home-standings", "aria-labelledby": "standings-heading" },
        el(
          "div",
          { className: "section-heading" },
          el("h2", { id: "standings-heading" }, translate("Leaderboard")),
          el(
            "button",
            {
              className: "text-button",
              onClick: () => onNavigate("leaderboard"),
            },
            translate("View all"),
            el(w, { size: 15 }),
          ),
        ),
        board
          ? el(
              y.Fragment,
              null,
              el(
                "p",
                { className: "home-section-description", dir: "auto" },
                board.title,
              ),
              el(Qe, { rows: qe(board.rows).slice(0, 6) }),
            )
          : el(
              "p",
              { className: "community-empty" },
              translate("No results yet."),
            ),
      ),
      el(
        "section",
        { className: "home-moments", "aria-labelledby": "moments-heading" },
        el(
          "div",
          { className: "section-heading" },
          el("h2", { id: "moments-heading" }, translate("Funny answers")),
          el(
            "button",
            { className: "text-button", onClick: () => onNavigate("moments") },
            translate("View all"),
            el(w, { size: 15 }),
          ),
        ),
        moment
          ? el(Ye, { moment })
          : el(
              "p",
              { className: "community-empty" },
              translate("No funny answers yet."),
            ),
      ),
    ),
 );
}

function Qe({ rows, picked }) {
  let signature = rows.map((row) => row.id + ":" + row.score).join("|");
  let [drawn, setDrawn] = (0, y.useState)(false);
  (0, y.useEffect)(() => {
    setDrawn(false);
    let frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [signature]);
  return el(
    "table",
    { className: "standings-table", "aria-label": translate("Quiz rankings") },
    el(
      "thead",
      null,
      el(
        "tr",
        null,
        ...["Rank", "Student", "Score", "Percentage"].map((label) =>
          el("th", { scope: "col", key: label }, translate(label)),
        ),
      ),
    ),
    el(
      "tbody",
      null,
      rows.map((row) =>
        el(
          "tr",
          {
            key: row.id,
            className:
              "standing-row" +
              (row.rank === 1 ? " is-champion" : "") +
              (picked === row.rank ? " is-picked" : ""),
            "data-rank": row.rank,
          },
          el("td", { className: "standing-rank" }, row.rank),
          el("td", { className: "standing-name" }, el("bdi", null, row.name)),
          el(
            "td",
            { className: "standing-score" },
            el("bdi", null, row.score, el("small", null, "/", row.max)),
            row.bonus
              ? el(
                  "span",
                  { className: "standing-bonus" },
                  translate("+{count} bonus", { count: row.bonus }),
                )
              : null,
          ),
          el(
            "td",
            { className: "standing-percent" },
            el("bdi", null, Ge(row).toFixed(1), "%"),
            el(
              "span",
              { className: "score-meter", "aria-hidden": true },
              el("span", {
                style: {
                  transform:
                    "scaleX(" +
                    (drawn
                      ? Math.max(0, Math.min(1, Ge(row) / 100))
                      : 0) +
                    ")",
                },
              }),
            ),
          ),
        ),
      ),
    ),
  );
}

function $e({ community: e, onNavigate: t }) {
  let [n, r] = (0, y.useState)(
      () => e.boards.find((e) => e.rows.length)?.id || e.boards[0]?.id || ``,
    ),
    i = e.boards.find((e) => e.id === n) || e.boards[0],
    a = qe(i?.rows || []),
    [picked, setPicked] = (0, y.useState)(0);
  return (0, M.jsxs)(`section`, {
    children: [
      (0, M.jsxs)(`div`, {
        className: `page-heading`,
        children: [
          (0, M.jsxs)(`div`, {
            children: [
              (0, M.jsx)(`h1`, { children: translate(`Leaderboard`) }),
              (0, M.jsx)(`p`, {
                children: translate(`Equal scores share a rank.`),
              }),
            ],
          }),
          (0, M.jsxs)(`button`, {
            className: `secondary`,
            onClick: () => t(`quizzes`),
            children: [(0, M.jsx)(ie, { size: 17 }), translate(`Find a quiz`)],
          }),
        ],
      }),
      e.boards.length > 1 &&
        (0, M.jsxs)(`fieldset`, {
          className: `quiz-choices`,
          children: [
            (0, M.jsx)(`legend`, { children: translate(`Choose a quiz`) }),
            e.boards.map((e) =>
              (0, M.jsxs)(
                `label`,
                {
                  className: i?.id === e.id ? `chosen` : ``,
                  children: [
                    (0, M.jsx)(`input`, {
                      type: `radio`,
                      name: `public-leaderboard`,
                      checked: i?.id === e.id,
                      onChange: () => {
                        r(e.id);
                        setPicked(0);
                      },
                    }),
                    (0, M.jsxs)(`span`, {
                      children: [
                        (0, M.jsx)(`b`, { dir: `auto`, children: e.title }),
                        (0, M.jsxs)(`small`, {
                          children: [
                            e.kind === `paper`
                              ? translate(`Paper quiz`)
                              : translate(`Online quiz`),
                            ` · `,
                            e.rows.length,
                            ` `,
                            e.kind === `paper`
                              ? translate(`students`)
                              : translate(`attempts`),
                          ],
                        }),
                      ],
                    }),
                    (0, M.jsx)(`span`, {
                      className: `choice-check`,
                      children: i?.id === e.id && (0, M.jsx)(ce, { size: 15 }),
                    }),
                  ],
                },
                e.id,
              ),
            ),
          ],
        }),
      i && (0, M.jsx)(`h2`, { dir: `auto`, children: i.title }),
      a.length
        ? (0, M.jsxs)(M.Fragment, {
            children: [
              (0, M.jsx)(`div`, {
                className: `leaderboard-summary`,
                children: (0, M.jsxs)(`span`, {
                  children: [
                    a.length,
                    ` `,
                    i.kind === `paper`
                      ? translate(`students`)
                      : translate(`attempts`),
                    translate(` · Average `),
                    (a.reduce((e, t) => e + Ge(t), 0) / a.length).toFixed(1),
                    `%`,
                  ],
                }),
              }),
              (0, M.jsx)(`section`, {
                className: `leaderboard-podium`,
                children: (0, M.jsx)(Je, {
                  rows: a,
                  picked: picked,
                  onPick: (rank) => {
                    setPicked(rank);
                    requestAnimationFrame(() => {
                      document
                        .querySelector(`.standing-row.is-picked`)
                        ?.scrollIntoView({ block: `nearest` });
                    });
                  },
                }),
              }),
              (0, M.jsx)(Qe, { rows: a, picked: picked }),
              (0, M.jsx)(`p`, {
                className: `help`,
                children:
                  i.kind === `paper`
                    ? translate(
                        `Bonus points are included in the score. The maximum regular score stays 13.`,
                      )
                    : translate(
                        `Every submitted attempt is listed. Names are entered by students.`,
                      ),
              }),
            ],
          })
        : (0, M.jsxs)(`div`, {
            className: `empty-state`,
            children: [
              (0, M.jsx)(ze, { size: 30 }),
              (0, M.jsx)(`h2`, {
                children: translate(`The standings start here`),
              }),
              (0, M.jsx)(`p`, {
                children: translate(
                  `Scores will appear once a quiz has been graded. You can still check for an open quiz.`,
                ),
              }),
              (0, M.jsxs)(`button`, {
                className: `primary`,
                onClick: () => t(`quizzes`),
                children: [
                  translate(`Browse quizzes`),
                  (0, M.jsx)(w, { size: 17 }),
                ],
              }),
            ],
          }),
    ],
  });
}
function et({ community: e, onNavigate: t }) {
  return (0, M.jsxs)(`section`, {
    children: [
      (0, M.jsx)(`div`, {
        className: `page-heading`,
        children: (0, M.jsxs)(`div`, {
          children: [
            (0, M.jsx)(`h1`, { children: translate(`Funny answers`) }),
            (0, M.jsx)(`p`, {
              children: translate(`Teacher-approved answers.`),
            }),
          ],
        }),
      }),
      e.moments.length
        ? (0, M.jsx)(`div`, {
            className: `public-moments`,
            children: e.moments.map((e) => (0, M.jsx)(Ye, { moment: e }, e.id)),
          })
        : (0, M.jsxs)(`div`, {
            className: `empty-state`,
            children: [
              (0, M.jsx)(he, { size: 30 }),
              (0, M.jsx)(`h2`, {
                children: translate(`Every group has its moments`),
              }),
              (0, M.jsx)(`p`, {
                children: translate(
                  `No funny answers have been shared yet. Come back after the next quiz.`,
                ),
              }),
              (0, M.jsxs)(`button`, {
                className: `secondary`,
                onClick: () => t(`home`),
                children: [translate(`Back home`), (0, M.jsx)(w, { size: 17 })],
              }),
            ],
          }),
    ],
  });
}
const el = y.createElement;
function Lantern({ className = "" }) {
  const [bright, setBright] = y.useState(false);
  return el(
    "button",
    {
      className: "lantern " + className + (bright ? " is-bright" : ""),
      type: "button",
      "aria-label": translate(bright ? "Dim lantern" : "Brighten lantern"),
      "aria-pressed": bright,
      onClick: () => setBright(!bright),
    },
    el("span", { className: "lantern-halo", "aria-hidden": true }),
    el("span", { className: "lantern-boost", "aria-hidden": true }),
    el(
      "svg",
      {
        className: "lantern-body",
        viewBox: "0 0 80 170",
        fill: "none",
        "aria-hidden": true,
      },
      el("path", { d: "M40 0v39", stroke: "#745031", strokeWidth: 1.5 }),
      el("path", {
        d: "M33 45a7 7 0 1 1 14 0",
        stroke: "#745031",
        strokeWidth: 2,
      }),
      el("path", {
        d: "m40 45-18 15h36L40 45Z",
        fill: "#936434",
        stroke: "#553a25",
        strokeWidth: 1.5,
      }),
      el("path", {
        d: "m26 63-6 48 20 13 20-13-6-48H26Z",
        fill: "#5b3a25",
        stroke: "#4b3222",
        strokeWidth: 2,
      }),
      el("path", {
        className: "lantern-glass",
        d: "m29 67-5 42 13 9V67H29Zm14 0v51l13-9-5-42h-8Z",
        fill: "#ffb651",
      }),
      el("path", {
        d: "m29 68 8 4v37l-11-3 3-38Zm14 4 8-4 4 38-12 3V72Z",
        fill: "#ffda9a",
        opacity: 0.5,
      }),
      el("path", {
        d: "M40 65v57M24 109h32M26 64h28",
        stroke: "#704825",
        strokeWidth: 2,
      }),
      el("path", {
        d: "M27 123h26l5 7H22l5-7Zm-5 8h36v4H22v-4Z",
        fill: "#80552e",
        stroke: "#513923",
        strokeWidth: 1.5,
      }),
      el("path", {
        d: "M33 139h14m-7-3v8",
        stroke: "#91683b",
        strokeWidth: 1.5,
      }),
      el("path", {
        d: "M31 57h18M26 126h28",
        stroke: "#d1aa68",
        strokeWidth: 1.5,
      }),
    ),
  );
}
function useAmbientMotion() {
  const ref = y.useRef(null);
  y.useEffect(() => {
    const node = ref.current;
    let inView = true;
    const sync = () =>
      node.style.setProperty(
        "--lantern-play-state",
        inView && !document.hidden ? "running" : "paused",
      );
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return ref;
}
function Heater({ className = "" }) {
  const ref=useAmbientMotion();
  const [warm,setWarm]=y.useState(false);
  return el("button",{ref,type:"button",className:"majlis-heater "+className+(warm?" is-warm":""),"aria-pressed":warm,"aria-label":translate(warm?"Lower heater warmth":"Increase heater warmth"),title:translate(warm?"Lower heater warmth":"Increase heater warmth"),onClick:()=>setWarm(!warm)},
    el("span",{className:"heater-spill","aria-hidden":true}),
    el("span",{className:"heater-halo","aria-hidden":true}),
    el("img",{src:"./assets/majlis-heater.svg",className:"heater-shell",alt:"",width:112,height:144,draggable:false}),
    el("span",{className:"heater-coils","aria-hidden":true}),
    el("span",{className:"heater-light","aria-hidden":true}));
}
function MotionNav({children,className,...props}) {
  const ref=y.useRef(null),indicator=y.useRef(null);
  const place=()=>{const node=ref.current,selected=node?.querySelector("button.selected"),line=indicator.current;if(!selected||!line){if(line)line.style.opacity="0";return;}line.style.opacity="1";line.style.transform=`translate(${selected.offsetLeft}px,${selected.offsetTop+selected.offsetHeight-2}px) scaleX(${selected.offsetWidth})`;};
  y.useLayoutEffect(place);
  y.useEffect(()=>{const node=ref.current;const observer=new ResizeObserver(()=>{node.dataset.pointer="false";place();});observer.observe(node);node.querySelectorAll("button").forEach(button=>observer.observe(button));return ()=>observer.disconnect();},[]);
  return el("nav",{...props,ref,className:className+" motion-nav",onPointerDown:()=>{ref.current.dataset.pointer="true";},onKeyDown:()=>{ref.current.dataset.pointer="false";}},children,el("span",{ref:indicator,className:"nav-motion-indicator","aria-hidden":true}));
}
function Cushion({ kind, className = "" }) {
  const ref = useAmbientMotion();
  return el(
    "div",
    {
      ref,
      className: `cushion cushion-${kind} ${className}`,
      "aria-hidden": true,
    },
    el("span", { className: "cushion-art" }),
  );
}
function HangingLanterns({ compact = false }) {
  const ref = useAmbientMotion();
  return el(
    "div",
    {
      ref,
      className: compact
        ? "hanging-lanterns header-lanterns"
        : "hanging-lanterns hero-lanterns",
    },
    el(Lantern, { className: "lantern-start" }),
    !compact && el(Lantern, { className: "lantern-end" }),
  );
}
function MotionToggle() {
  const [paused, setPaused] = y.useState(()=>document.documentElement.dataset.motion === "off");
  return el(
    "button",
    {
      className: "motion-toggle",
      type: "button",
      "aria-label": translate(
        paused ? "Enable animations" : "Pause animations",
      ),
      "aria-pressed": paused,
      onClick: () => {
        document.documentElement.dataset.motion = paused ? "on" : "off";
        setPaused(!paused);
      },
    },
    el(
      "svg",
      {
        width: 15,
        height: 15,
        viewBox: "0 0 20 20",
        fill: "none",
        "aria-hidden": true,
      },
      paused
        ? el("path", {
            d: "m7 4 9 6-9 6V4Z",
            stroke: "currentColor",
            strokeWidth: 1.5,
            strokeLinejoin: "round",
          })
        : el(
            y.Fragment,
            null,
            el("path", {
              d: "M6 4v12M13 4v12",
              stroke: "currentColor",
              strokeWidth: 2.5,
              strokeLinecap: "round",
            }),
          ),
    ),
  );
}

function LanguageSwitcher() {
  const isArabic = getLanguage() === "ar";
  return el(
    "button",
    {
      className: "language-switch",
      type: "button",
      lang: isArabic ? "en" : "ar",
      "aria-label": translate(
        isArabic ? "Change language to English" : "Change language to Arabic",
      ),
      onClick: () => setLanguage(isArabic ? "en" : "ar"),
    },
    el(
      "svg",
      {
        width: 17,
        height: 17,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.6,
        "aria-hidden": true,
      },
      el("circle", { cx: 12, cy: 12, r: 9 }),
      el("path", { d: "M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18" }),
    ),
    isArabic ? "English" : "العربية",
  );
}
function Avatar({name = "", photo, large = false}) {
 const ref=useAmbientMotion();
 const [failed,setFailed]=y.useState(false);
 y.useEffect(()=>setFailed(false),[photo]);
 const src=photoUrl(photo);
 const letters=name.trim().split(/\s+/).slice(0,2).map(word=>Array.from(word)[0]||"").join("");
 return el("span",{ref,className:"avatar"+(large?" avatar-large":""),"aria-hidden":true},
   src&&!failed?el("img",{src,alt:"",referrerPolicy:"no-referrer",onError:()=>setFailed(true)}):el("span",{className:"avatar-initials"},letters||"—"));
}

function AccountMenu({ name, photo, children }) {
  const ref = y.useRef(null);
  y.useEffect(() => {
    const dismiss = (event) => {
      const menu = ref.current;
      if (!menu?.open) return;
      if (event.type === "keydown") {
        if (event.key !== "Escape") return;
        menu.open = false;
        menu.querySelector("summary").focus();
      } else if (!menu.contains(event.target)) menu.open = false;
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, []);
  return el("details", {className: "account-menu", ref},
    el("summary", {"aria-label": translate("Account") + (name ? ": " + name : "")},
      el(Avatar, {name,photo}),
      el("span", null, name || translate("Account")),
      el("svg", {className: "account-chevron", width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true}, el("path", {d: "m6 9 6 6 6-6"}))),
    el("div", {className: "account-popover", onClick: (event) => { if (event.target.closest("button")) ref.current.open = false; }}, children));
}

function Brand({ onClick }) {
  return el(
    "a",
    { className: "brand", href: "/", onClick },
    el(
      "span",
      { className: "brand-arabic", lang: "ar", dir: "rtl" },
      "أصحاب الخيمة",
    ),
    el(
      "span",
      { className: "brand-latin", lang: "en", dir: "ltr" },
      "ASHAB AL KHAIMAH",
      el("small", null, "INSIDE TAMKEEN"),
    ),
  );
}
function GatheringFooter() {
  return el(
    "footer",
    { className: "app-footer" },
    el("div",{className:"footer-hearth"},el(Cushion,{kind:"floor",className:"footer-cushion"}),el(Heater,{className:"footer-heater"})),
    el(
      "span",
      { lang: "ar", dir: "rtl", className: "footer-arabic" },
      "أصحاب الخيمة",
    ),
    el("span", null, translate("Sunday"), " · ", translate("After Fajr")),
  );
}

function PrivatePractice({ revisit, onPractice, onClearRevisit }) {
  return el(
    "section",
    { className: "revisit", "aria-labelledby": "revisit-heading" },
    el(
      "div",
      { className: "section-heading" },
      el("h2", { id: "revisit-heading" }, translate("What you missed")),
      el(
        "button",
        { className: "text-button", onClick: onClearRevisit },
        translate("Remove from this phone"),
      ),
    ),
    el(
      "p",
      { className: "help" },
      translate("Saved on this device. Practice does not change your score."),
    ),
    el("p", { className: "practice-title", dir: "auto" }, revisit.title),
    el(
      "button",
      { className: "primary", onClick: onPractice },
      translate("Try these again"),
      el(w, { size: 17 }),
    ),
    ...revisit.misses.map((question, index) =>
      el(
        "article",
        { className: "answer-review", key: index },
        el(
          "div",
          null,
          el("h3", { dir: "auto" }, question.prompt),
          el(
            "p",
            null,
            translate("Correct answer: "),
            el("bdi", null, question.options[question.correct]),
          ),
          question.explanation &&
            el("p", { dir: "auto" }, question.explanation),
          el(MissCoach,{quizId:revisit.quizId,question}),
        ),
      ),
    ),

  );
}
export {
  Ze,
  StudyPage,
  Qe,
  $e,
  et,
  Je,
  Ye,
  Ge,
  qe,
  Brand,
  AccountMenu,
  Avatar,
  LanguageSwitcher,
  MotionToggle,
  HangingLanterns,
  Cushion,
  Heater,
  MotionNav,
  GatheringFooter,
};
