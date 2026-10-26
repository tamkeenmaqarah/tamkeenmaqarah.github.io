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
} from "./i18n.js";
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
function Je({ rows: e }) {
  let t = Array.from(new Set(e.map((e) => e.rank)))
    .slice(0, 3)
    .map((t) => ({ rank: t, students: e.filter((e) => e.rank === t) }));
  return (0, M.jsx)(`div`, {
    className: `podium`,
    "aria-label": translate(`Highest scoring students`),
    children: (t.length > 1 ? [t[1], t[0], t[2]].filter(Boolean) : t).map((e) =>
      (0, M.jsxs)(
        `div`,
        {
          className: `podium-place tier-` + (t.indexOf(e) + 1),
          children: [
            (0, M.jsxs)(`div`, {
              className: `podium-avatar`,
              children: [
                t.indexOf(e) === 0 && (0, M.jsx)(ze, { size: 17 }),
                (0, M.jsx)(`span`, { children: Ke(e.students[0].name) }),
              ],
            }),
            (0, M.jsx)(`b`, {
              className: `podium-name`,
              children: e.students.map((e) => e.name).join(` & `),
            }),
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
      ),
    ),
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
function Ze({
  data,
  recent,
  revisit,
  onPractice,
  onClearRevisit,
  onNavigate,
  onStart,
}) {
  const quiz = data.quizzes.find((quiz) => quiz.published);
  const board = data.community.boards.find((board) => board.rows.length);
  const moment = data.community.moments[0];
  return el(
    "div",
    { className: "community-home" },
    el(
      "section",
      { className: "majlis-intro", "aria-labelledby": "gathering-title" },
      el(
        "div",
        { className: "majlis-title" },
        el(
          "h1",
          { id: "gathering-title", lang: "ar", dir: "rtl" },
          "أصحاب الخيمة",
        ),
        el(
          "p",
          { className: "majlis-name", lang: "en", dir: "ltr" },
          "Ashab Al Khaimah",
        ),
        el(
          "p",
          { className: "majlis-time" },
          translate("Sunday"),
          el("span", { "aria-hidden": true }, " / "),
          translate("After Fajr"),
        ),
        el(
          "p",
          { className: "majlis-purpose" },
          translate("Qur’an review · Saturday & Tuesday halaqas"),
        ),
      ),
      el(HangingLanterns),
      el(Cushion, { kind: "square", className: "hero-cushion-start" }),
      el(Cushion, { kind: "backrest", className: "hero-cushion-end" }),
      el("div", { className: "sadu-border", "aria-hidden": true }),
    ),
    el(
      "section",
      { className: "weekly-quiz", "aria-labelledby": "weekly-quiz-title" },
      el(
        "div",
        { className: "weekly-quiz-copy" },
        el(
          "h2",
          { id: "weekly-quiz-title", dir: "auto" },
          quiz ? quiz.title : translate("Weekly quiz"),
        ),
        el(
          "p",
          null,
          quiz
            ? translate("{count} questions · No time limit", {
                count: quiz.questions.length,
              })
            : translate("No quiz is open right now."),
        ),
      ),
      el(
        "button",
        {
          className: "primary",
          onClick: () => (quiz ? onStart(quiz) : onNavigate("quizzes")),
        },
        translate(quiz ? "Start quiz" : "All quizzes"),
        el(w, { size: 17 }),
      ),
    ),
    revisit?.misses?.length > 0 &&
      el(PrivatePractice, { revisit, onPractice, onClearRevisit }),
    recent &&
      el(
        "p",
        { className: "latest-score" },
        translate("Your latest result: "),
        el("b", null, recent.score, "/", recent.max),
      ),
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

function Qe({ rows }) {
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
              row.rank === 1 ? "standing-row is-champion" : "standing-row",
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
    a = qe(i?.rows || []);
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
                      onChange: () => r(e.id),
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
              null,
              (0, M.jsx)(Qe, { rows: a }),
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
  const [paused, setPaused] = y.useState(false);
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
    el(Cushion, { kind: "floor", className: "footer-cushion" }),
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
        ),
      ),
    ),
    el(
      "button",
      { className: "primary", onClick: onPractice },
      translate("Try these again"),
      el(w, { size: 17 }),
    ),
  );
}
export {
  Ze,
  Qe,
  $e,
  et,
  Je,
  Ye,
  Ge,
  qe,
  Brand,
  LanguageSwitcher,
  MotionToggle,
  HangingLanterns,
  Cushion,
  GatheringFooter,
};
