import {TeacherAssignments} from './assignments.js?v=2';
import {ReviewPlanner,MissCoach,ReferenceText} from './study-tools.js?v=2';
import {
  y,
  M as N,
  We as Ue,
  te,
  w,
  ie,
  oe,
  ce,
  ue,
  E,
  fe,
  pe as me,
  k as O,
  he as ge,
  _e,
  ye,
  xe as be,
  Se,
  we,
  Ee,
  Oe,
  Ae,
  Me as je,
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
import {
  Ze as Xe,
  $e as Qe,
  et as $e,
  Je as qe,
  Ye as Je,
  Ge as We,
  qe as Ke,
  Qe as Ze,
  Brand,
  AccountMenu,
  LanguageSwitcher,
  MotionToggle,
  HangingLanterns,
  Cushion,
  Heater,
  MotionNav,
  GatheringFooter,
  StudyPage,
} from "./components.js?v=20";
import {
  nextHomeworkSunday,
  homeworkSunday,
  shiftHomeworkWeek,
  homeworkKey,
  readHomeworkLocal,
  storeHomeworkDraft,
  clearHomeworkDraft,
} from "./homework.js?v=1";
import {QuranReader} from "./quran-reader.js?v=7";
import {quranReferences} from "./quran.js?v=2";
import {AccountPage} from "./account.js?v=3";
import {profileRequest} from "./profile.js?v=1";
const el = y.createElement;
function ProfileIcon({size=17}){return el('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5,'aria-hidden':true},el('circle',{cx:12,cy:8,r:3.5}),el('path',{d:'M5 21v-2a7 7 0 0 1 14 0v2',strokeLinecap:'round'}));}
const Ye = "https://tamkeen-maqraah-teacher.ibrahiimmuhamud.workers.dev";
var et = {
  revisit: `tamkeen-revisit`,
  draft: `tamkeen-draft`,
  done: `tamkeen-done`,
  name: `tamkeen-name`,
  token: `tamkeen-token`,
  door: `tamkeen-door`,
  remembered: `tamkeen-remembered`,
};
function tt(e, t) {
  let n = e.trim().replace(/\s+/g, ` `);
  return t.find((e) => e.trim().toLowerCase() === n.toLowerCase()) || n;
}
function nt(e, t) {
  return t.flatMap((t, n) => {
    if (t.right) return [];
    let r = e[n];
    if (!r) return [];
    let i = r.options.indexOf(t.correct);
    return i < 0
      ? []
      : [
          {
            prompt: r.prompt,
            options: [...r.options],
            correct: i,
            explanation: t.explanation || r.explanation || ``,
          },
        ];
  });
}
function rt(e, t) {
  let n = e.map((e, n) => ({
    prompt: e.prompt,
    correct: e.options[e.correct],
    explanation: e.explanation,
    right: t[n] === e.correct,
  }));
  return {
    score: n.filter((e) => e.right).length,
    max: e.length,
    review: n,
    misses: e.filter((e, t) => !n[t].right),
  };
}
function it(e, t) {
  if (!e) return null;
  try {
    let n = e.getItem(t);
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function at(e, t, n) {
  e?.setItem(t, JSON.stringify(n));
}
function ot(e, t) {
  e?.removeItem(t);
}
var P = et;
async function st(e) {
  let t = await crypto.subtle.digest(`SHA-256`, new TextEncoder().encode(e));
  return [...new Uint8Array(t)]
    .map((e) => e.toString(16).padStart(2, `0`))
    .join(``);
}
function ct(e, t) {
  let n = e.length === t.length ? 0 : 1;
  for (let r = 0; r < Math.min(e.length, t.length); r++)
    n |= e.charCodeAt(r) ^ t.charCodeAt(r);
  return n === 0;
}
function lt(e) {
  return e.trim().replace(/\s+/g, ` `);
}
function ut(e) {
  let t = lt(e);
  return t.length < 2
    ? translate(`Use the name the tent knows.`)
    : t.length > 40
      ? translate(`That name is too long.`)
      : /^[\p{L}][\p{L}\s'.-]*$/u.test(t)
        ? null
        : translate(`Use letters in your name.`);
}
function dt(e) {
  return e.length < 6
    ? translate(`Use at least 6 characters.`)
    : e.length > 72
      ? translate(`That password is too long.`)
      : null;
}
function ft(e) {
  return e.trim().toLocaleLowerCase(`en`);
}
function pt(e, t) {
  let n = e.trim();
  return n.length < 4
    ? translate(`Use at least 4 characters for the recovery word.`)
    : n.length > 40
      ? translate(`That recovery word is too long.`)
      : t && ft(n) === t.trim().toLocaleLowerCase(`en`)
        ? translate(`Use a recovery word that is not the password.`)
        : null;
}
function mt(e) {
  return it(e, P.door);
}
function ht(e, t) {
  at(e, P.door, t);
}
function gt(e) {
  return e?.getItem(P.remembered) === `1`;
}
function _t(e) {
  e?.setItem(P.remembered, `1`);
}
function vt(e) {
  (e?.removeItem(P.remembered), ot(e, P.token));
}
const GOOGLE_CLIENT_ID = `883985581593-3sa5cjscjk0mhfdeiho8pi857qqqr2v3.apps.googleusercontent.com`;
function googleClaims(credential) {
  try {
    let part = String(credential || ``).split(`.`)[1];
    if (!part) return null;
    part += `=`.repeat((4 - (part.length % 4)) % 4);
    let json = JSON.parse(atob(part.replace(/-/g, `+`).replace(/_/g, `/`)));
    if (
      json.iss !== `accounts.google.com` &&
      json.iss !== `https://accounts.google.com`
    )
      return null;
    if (json.aud !== GOOGLE_CLIENT_ID) return null;
    if (typeof json.exp !== `number` || json.exp * 1000 < Date.now() - 60000)
      return null;
    if (typeof json.sub !== `string` || json.sub.length < 6 || json.sub.length > 255)
      return null;
    return { sub: json.sub };
  } catch {
    return null;
  }
}
function GoogleSignIn({ onCredential: onCredential }) {
  let [googleStatus, setGoogleStatus] = y.useState("Loading Google sign-in…"),
    host = (0, y.useRef)(null),
    onRef = (0, y.useRef)(onCredential);
  onRef.current = onCredential;
  return (
    (0, y.useEffect)(() => {
      let node = host.current;
      if (!node) return;
      const failed = () => setGoogleStatus("Google sign-in could not load. Reload to try again.");
      const deadline = setTimeout(failed, 8000);
      let cancelled = !1,
        last = 0,
        timer = 0,
        script = document.querySelector(`script[data-tamkeen-gsi]`),
        widthFor = () =>
          Math.max(200, Math.min(400, Math.floor(node.clientWidth) || 280)),
        draw = () => {
          let gis = window.google?.accounts?.id;
          if (cancelled || !node || !gis) return;
          clearTimeout(deadline);
          setGoogleStatus("");
          let width = widthFor();
          if (
            Math.abs(width - last) < 8 &&
            node.querySelector(`iframe, [role=button]`)
          )
            return;
          ((last = width), node.replaceChildren());
          gis.initialize({
            client_id: GOOGLE_CLIENT_ID,
            auto_select: !1,
            callback: (resp) => {
              resp?.credential && onRef.current(resp.credential);
            },
          });
          gis.renderButton(node, {
            type: `standard`,
            theme: `outline`,
            size: `large`,
            text: `continue_with`,
            shape: `rectangular`,
            width,
            logo_alignment: `left`,
          });
        },
        onResize = () => {
          (clearTimeout(timer), (timer = setTimeout(draw, 180)));
        };
      script ||
        ((script = document.createElement(`script`)),
        (script.src = `https://accounts.google.com/gsi/client`),
        (script.async = !0),
        (script.dataset.tamkeenGsi = `1`),
        document.head.appendChild(script));
      script.addEventListener(`load`, draw);
      script.addEventListener(`error`, failed);
      window.google?.accounts?.id && requestAnimationFrame(draw);
      window.addEventListener(`resize`, onResize);
      return () => {
        ((cancelled = !0),
          clearTimeout(timer),
          clearTimeout(deadline),
          script.removeEventListener(`error`, failed),
          script.removeEventListener(`load`, draw),
          window.removeEventListener(`resize`, onResize));
      };
    }, []),
    el("div", {className: "google-sign-in"},
      el("div", {className: "google-button", ref: host}),
      googleStatus && el("p", {className: "google-sign-in-status", role: "status"}, translate(googleStatus)))
  );
}
function yt({
  savedName: e,
  busy: t,
  error: n,
  onCreate: r,
  onEnter: i,
  onReset: a,
  onTeacher: o,
  onSomeoneElse: s,
  onGoogle: onGoogle,
  onGoogleName: onGoogleName,
  onCancelGoogle: onCancelGoogle,
  onClearError: onClearError,
  askTentName: askTentName,
  googleBusy: googleBusy,
  savedGoogle: savedGoogle,
  hasPassword: hasPassword,
}) {
  let [c, l] = (0, y.useState)(e ? `back` : `create`),
    [u, d] = (0, y.useState)(e),
    [f, p] = (0, y.useState)(``),
    [m, h] = (0, y.useState)(``),
    [g, _] = (0, y.useState)(``),
    [v, b] = (0, y.useState)(``),
    googleNote = /Google|غوغل/.test(n || ``) ? n : ``,
    x = googleNote ? v : v || n,
    googleOnly = c === `back` && savedGoogle && !hasPassword;
  function ee(e) {
    (l(e), p(``), h(``), _(``), b(``), onClearError?.());
  }
  async function S(t) {
    (t.preventDefault(), b(``));
    if (askTentName) {
      let e = ut(u);
      if (e) {
        b(e);
        return;
      }
      await onGoogleName(lt(u));
      return;
    }
    let n = c === `back` || (c === `forgot` && e) ? e : u;
    if (c !== `forgot`) {
      let e = ut(n) || dt(f);
      if (e) {
        b(e);
        return;
      }
      if (c === `create`) {
        let e = pt(g, f);
        if (e) {
          b(e);
          return;
        }
        if (f !== m) {
          b(translate(`Those passwords do not match.`));
          return;
        }
        await r(lt(n), f, g.trim());
        return;
      }
      await i(lt(n), f);
      return;
    }
    let o = ut(n) || pt(g) || dt(f);
    if (o) {
      b(o);
      return;
    }
    if (f !== m) {
      b(translate(`Those passwords do not match.`));
      return;
    }
    await a(lt(n), g.trim(), f);
  }
  return (0, N.jsx)(`div`, {
    className: `door`,
    children: (0, N.jsxs)(`div`, {
      className: `door-sheet`,
      children: [
        el(
          "div",
          { className: "door-tools" },
          el(LanguageSwitcher),
          el(MotionToggle),
        ),
        el(HangingLanterns),
        el(Cushion, { kind: "armrest", className: "door-cushion" }),
        (0, N.jsx)(`h1`, { lang: `ar`, dir: `rtl`, children: `أصحاب الخيمة` }),
        (0, N.jsx)(`p`, {
          children: askTentName
            ? translate(
                `Google confirmed you. What name does the tent use?`,
              )
            : c === `forgot`
              ? translate(
                  `Enter the recovery word from when you set your name, then choose a new password.`,
                )
              : googleOnly
                ? translate(
                    `This phone kept your name. Come in with Google.`,
                  )
                : c === `back`
                  ? translate(
                      `This phone kept your name. Enter the password to come back in.`,
                    )
                : c === `enter`
                  ? translate(
                      `Enter the name and password you already chose.`,
                    )
                  : translate(
                      `Set your name once. This phone remembers you, and next time you come straight in.`,
                    ),
        }),
        !askTentName &&
          c !== `forgot` &&
          (0, N.jsxs)(`div`, {
            className: `door-google`,
            children: [
              (0, N.jsx)(GoogleSignIn, { onCredential: onGoogle }),
              (googleBusy || googleNote) &&
                (0, N.jsx)(`p`, {
                  className: `door-note`,
                  role: googleNote ? `alert` : `status`,
                  children: googleBusy
                    ? translate(`Checking with Google…`)
                    : translate(googleNote),
                }),
              !googleOnly &&
                (0, N.jsx)(`p`, {
                  className: `door-or`,
                  children: translate(`or`),
                }),
            ],
          }),
        googleOnly
          ? (0, N.jsx)(`p`, { className: `door-name`, children: e })
          : (0, N.jsxs)(`form`, {
          onSubmit: S,
          children: [
            (askTentName ||
              c === `create` ||
              c === `enter` ||
              (c === `forgot` && !e)) &&
              (0, N.jsxs)(`label`, {
                htmlFor: `door-name`,
                children: [
                  translate(`Your name`),
                  (0, N.jsx)(`input`, {
                    id: `door-name`,
                    autoComplete: `name`,
                    autoFocus: askTentName || c === `enter`,
                    maxLength: 40,
                    value: u,
                    onChange: (e) => d(e.target.value),
                    required: !0,
                  }),
                ],
              }),
            !askTentName &&
              (c === `back` || (c === `forgot` && e)) &&
              (0, N.jsx)(`p`, { className: `door-name`, children: e }),
            askTentName
              ? (0, N.jsx)(`small`, {
                  className: `door-caption`,
                  children: translate(
                    `Use the name already on the leaderboard. This is not the Google email.`,
                  ),
                })
              : c === `forgot`
              ? (0, N.jsxs)(`label`, {
                  htmlFor: `door-recovery`,
                  children: [
                    translate(`Recovery word`),
                    (0, N.jsx)(`input`, {
                      id: `door-recovery`,
                      autoComplete: `off`,
                      autoFocus: !!e,
                      maxLength: 40,
                      value: g,
                      onChange: (e) => _(e.target.value),
                      required: !0,
                    }),
                    (0, N.jsx)(`small`, {
                      children: translate(`Capital letters do not matter.`),
                    }),
                  ],
                })
              : (0, N.jsxs)(`label`, {
                  htmlFor: `door-password`,
                  children: [
                    translate(`Password`),
                    (0, N.jsx)(`input`, {
                      id: `door-password`,
                      type: `password`,
                      autoComplete:
                        c === `create` ? `new-password` : `current-password`,
                      autoFocus: c === `back`,
                      maxLength: 72,
                      value: f,
                      onChange: (e) => p(e.target.value),
                      required: !0,
                    }),
                    (0, N.jsx)(`small`, {
                      children:
                        c === `create`
                          ? translate(
                              `At least 6 characters. You only type it again if you sign out.`,
                            )
                          : translate(`The password you chose for this name.`),
                    }),
                  ],
                }),
            !askTentName && c === `create` &&
              (0, N.jsxs)(`label`, {
                htmlFor: `door-confirm`,
                children: [
                  translate(`Confirm password`),
                  (0, N.jsx)(`input`, {
                    id: `door-confirm`,
                    type: `password`,
                    autoComplete: `new-password`,
                    maxLength: 72,
                    value: m,
                    onChange: (e) => h(e.target.value),
                    required: !0,
                  }),
                ],
              }),
            !askTentName && c === `create` &&
              (0, N.jsxs)(`label`, {
                htmlFor: `door-recovery`,
                children: [
                  translate(`Recovery word`),
                  (0, N.jsx)(`input`, {
                    id: `door-recovery`,
                    autoComplete: `off`,
                    maxLength: 40,
                    value: g,
                    onChange: (e) => _(e.target.value),
                    required: !0,
                  }),
                  (0, N.jsx)(`small`, {
                    children: translate(
                      `If you forget the password, this word makes a new one. Do not reuse the password.`,
                    ),
                  }),
                ],
              }),
            c === `forgot` &&
              (0, N.jsxs)(N.Fragment, {
                children: [
                  (0, N.jsxs)(`label`, {
                    htmlFor: `door-password`,
                    children: [
                      translate(`New password`),
                      (0, N.jsx)(`input`, {
                        id: `door-password`,
                        type: `password`,
                        autoComplete: `new-password`,
                        maxLength: 72,
                        value: f,
                        onChange: (e) => p(e.target.value),
                        required: !0,
                      }),
                      (0, N.jsx)(`small`, {
                        children: translate(`At least 6 characters.`),
                      }),
                    ],
                  }),
                  (0, N.jsxs)(`label`, {
                    htmlFor: `door-confirm`,
                    children: [
                      translate(`Confirm new password`),
                      (0, N.jsx)(`input`, {
                        id: `door-confirm`,
                        type: `password`,
                        autoComplete: `new-password`,
                        maxLength: 72,
                        value: m,
                        onChange: (e) => h(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                ],
              }),
            x &&
              (0, N.jsx)(`p`, {
                className: `door-error`,
                role: `alert`,
                children: translate(x),
              }),
            (0, N.jsxs)(`button`, {
              className: `primary`,
              disabled: t || googleBusy,
              children: [
                t
                  ? translate(`Saving…`)
                  : c === `forgot`
                    ? translate(`Save new password`)
                    : translate(`Come in`),
                (0, N.jsx)(w, { size: 17 }),
              ],
            }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `door-switch`,
          children: [
            askTentName
              ? (0, N.jsx)(`button`, {
                  className: `text-button`,
                  type: `button`,
                  onClick: onCancelGoogle,
                  children: translate(`Back`),
                })
              : c === `forgot`
              ? (0, N.jsx)(`button`, {
                  className: `text-button`,
                  type: `button`,
                  onClick: () => ee(e ? `back` : `enter`),
                  children: translate(`Back`),
                })
              : c === `create`
                ? (0, N.jsx)(`button`, {
                    className: `text-button`,
                    type: `button`,
                    onClick: () => ee(`enter`),
                    children: translate(`I already have a name`),
                  })
                : c === `back`
                  ? (0, N.jsx)(`button`, {
                      className: `text-button`,
                      type: `button`,
                      onClick: () => {
                        (s(), ee(`create`), d(``));
                      },
                      children: translate(`This is someone else`),
                    })
                  : (0, N.jsx)(`button`, {
                      className: `text-button`,
                      type: `button`,
                      onClick: () => ee(`create`),
                      children: translate(`New name`),
                    }),
            !askTentName &&
              (c === `enter` || (c === `back` && !googleOnly)) &&
              (0, N.jsx)(`button`, {
                className: `text-button`,
                type: `button`,
                onClick: () => ee(`forgot`),
                children: translate(`Forgot password`),
              }),
            (0, N.jsx)(`button`, {
              className: `text-button`,
              type: `button`,
              onClick: o,
              children: translate(`Teacher sign in`),
            }),
          ],
        }),
        el(Heater,{className:"door-heater"}),
      ],
    }),
  });
}
function bt({ busy: e, error: t, onSave: n, onBack: r }) {
  let [i, a] = (0, y.useState)(``),
    [o, s] = (0, y.useState)(``),
    [c, l] = (0, y.useState)(``),
    [u, d] = (0, y.useState)(``),
    f = u || t;
  async function p(e) {
    (e.preventDefault(), d(``));
    let t = dt(i) || dt(o);
    if (t) {
      d(t);
      return;
    }
    if (o !== c) {
      d(translate(`Those passwords do not match.`));
      return;
    }
    if (o === i) {
      d(translate(`Choose a password that is different from the current one.`));
      return;
    }
    await n(i, o);
  }
  return (0, N.jsx)(`div`, {
    className: `door`,
    children: (0, N.jsxs)(`div`, {
      className: `door-sheet`,
      children: [
        el(
          "div",
          { className: "door-tools" },
          el(LanguageSwitcher),
          el(MotionToggle),
        ),
        el(HangingLanterns),
        el(Cushion, { kind: "armrest", className: "door-cushion" }),
        (0, N.jsx)(`h1`, { children: translate(`Change password`) }),
        (0, N.jsx)(`p`, {
          children: translate(
            `The next time you sign in, use the new password.`,
          ),
        }),
        (0, N.jsxs)(`form`, {
          onSubmit: p,
          children: [
            (0, N.jsxs)(`label`, {
              htmlFor: `current-password`,
              children: [
                translate(`Current password`),
                (0, N.jsx)(`input`, {
                  id: `current-password`,
                  type: `password`,
                  autoComplete: `current-password`,
                  autoFocus: !0,
                  maxLength: 72,
                  value: i,
                  onChange: (e) => a(e.target.value),
                  required: !0,
                }),
              ],
            }),
            (0, N.jsxs)(`label`, {
              htmlFor: `new-password`,
              children: [
                translate(`New password`),
                (0, N.jsx)(`input`, {
                  id: `new-password`,
                  type: `password`,
                  autoComplete: `new-password`,
                  maxLength: 72,
                  value: o,
                  onChange: (e) => s(e.target.value),
                  required: !0,
                }),
                (0, N.jsx)(`small`, {
                  children: translate(`At least 6 characters.`),
                }),
              ],
            }),
            (0, N.jsxs)(`label`, {
              htmlFor: `confirm-password`,
              children: [
                translate(`Confirm new password`),
                (0, N.jsx)(`input`, {
                  id: `confirm-password`,
                  type: `password`,
                  autoComplete: `new-password`,
                  maxLength: 72,
                  value: c,
                  onChange: (e) => l(e.target.value),
                  required: !0,
                }),
              ],
            }),
            f &&
              (0, N.jsx)(`p`, {
                className: `door-error`,
                role: `alert`,
                children: translate(f),
              }),
            (0, N.jsxs)(`button`, {
              className: `primary`,
              disabled: e,
              children: [
                e ? translate(`Saving…`) : translate(`Save password`),
                (0, N.jsx)(w, { size: 17 }),
              ],
            }),
          ],
        }),
        (0, N.jsx)(`div`, {
          className: `door-switch`,
          children: (0, N.jsx)(`button`, {
            className: `text-button`,
            type: `button`,
            onClick: r,
            children: translate(`Back to the tent`),
          }),
        }),
        el(Heater,{className:"door-heater"}),
      ],
    }),
  });
}
var xt = `paper-original`,
  St = () => ({
    prompt: ``,
    options: [``, ``, ``, ``],
    correct: -1,
    explanation: ``,
  }),
  Ct = () => ({ name: ``, question: ``, chosen: ``, correct: ``, caption: `` }),
  wt = (e) =>
    e.prompt.trim() &&
    e.options.every((e) => e.trim()) &&
    e.correct >= 0 &&
    e.correct < 4;
function HomeworkIcon({ size = 17 }) {
  return (0, N.jsx)(`svg`, {
    width: size,
    height: size,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
    "aria-hidden": `true`,
    children: [
      (0, N.jsx)(`path`, { d: `M4 19.5A2.5 2.5 0 0 1 6.5 17H20` }, `cover`),
      (0, N.jsx)(
        `path`,
        { d: `M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z` },
        `page`,
      ),
    ],
  });
}
function formatHomeworkWeek(iso) {
  let [year, month, day] = iso.split(`-`).map(Number);
  return new Intl.DateTimeFormat(getLanguage() === `ar` ? `ar` : `en`, {
    weekday: `long`,
    month: `long`,
    day: `numeric`,
    year: `numeric`,
  }).format(new Date(year, month - 1, day));
}
function Tt() {
  y.useSyncExternalStore(subscribeLanguage, getLanguage, getLanguage);
  let [e, t] = (0, y.useState)(null),
    [n, r] = (0, y.useState)(`home`),
    [i, a] = (0, y.useState)(``),
    [o, s] = (0, y.useState)(``),
    [c, l] = (0, y.useState)(!1),
    [u, d] = (0, y.useState)(null),
    [f, p] = (0, y.useState)(!1),
    [m, h] = (0, y.useState)(!1),
    [g, _] = (0, y.useState)(-1),
    [v, b] = (0, y.useState)(``),
    [x, ee] = (0, y.useState)([]),
    [S, C] = (0, y.useState)(null),
    [ne, re] = (0, y.useState)(null),
    [ae, oe] = (0, y.useState)(``),
    [se, le] = (0, y.useState)(null),
    T = () => {
      try {
        return localStorage;
      } catch {
        return null;
      }
    },
    [de, pe] = (0, y.useState)(!1),
    [D, he] = (0, y.useState)(null),
    [k, ve] = (0, y.useState)(0),
    [A, xe] = (0, y.useState)(0),
    [Ce, Te] = (0, y.useState)(``),
    [De, ke] = (0, y.useState)(``),
    [j, Me] = (0, y.useState)([St()]),
    [Pe, Ie] = (0, y.useState)(xt),
    [Re, Be] = (0, y.useState)([]),
    [M, He] = (0, y.useState)(!1),
    [Ue, Ze] = (0, y.useState)(``),
    [et, Tt] = (0, y.useState)(`loading`),
    [Et, Dt] = (0, y.useState)(``),
    [Ot, kt] = (0, y.useState)(``),
    [At, jt] = (0, y.useState)(!1),
    [Mt, Nt] = (0, y.useState)(``),
    [Pt, Ft] = (0, y.useState)(``),
    [It, Lt] = (0, y.useState)(`all`),
    [Rt, zt] = (0, y.useState)(!1),
    [Bt, Vt] = (0, y.useState)(Ct()),
    [F, Ht] = (0, y.useState)(null),
    [Ut, Wt] = (0, y.useState)(``),
    [Gt, Kt] = (0, y.useState)(``),
    [qt, Jt] = (0, y.useState)(`saturday`),
    [Yt, Xt] = (0, y.useState)(10),
    [Zt, Qt] = (0, y.useState)(``),
    [$t, en] = (0, y.useState)(!1),
    [tn, nn] = (0, y.useState)(!1),
    [googleTicket, setGoogleTicket] = (0, y.useState)(``),
    [googleBusy, setGoogleBusy] = (0, y.useState)(!1),
    [homeworkWeek, setHomeworkWeek] = (0, y.useState)(nextHomeworkSunday),
    [homeworkEntries, setHomeworkEntries] = (0, y.useState)([]),
    [homeworkDraft, setHomeworkDraft] = (0, y.useState)(``),
    [homeworkLive, setHomeworkLive] = (0, y.useState)(!1),
    [homeworkBusy, setHomeworkBusy] = (0, y.useState)(!1),
    [homeworkReady, setHomeworkReady] = (0, y.useState)(!1),
    [homeworkPending, setHomeworkPending] = (0, y.useState)(!1),
    [homeworkQuranOpen, setHomeworkQuranOpen] = y.useState(false),
    [quranSelection, setQuranSelection] = y.useState(null),
    [profile,setProfile] = y.useState(null),
    [profileError,setProfileError] = y.useState(''),
    [profileVersion,setProfileVersion] = y.useState(0),
    [profileDirty,setProfileDirty] = y.useState(false);
  y.useEffect(()=>{
    setProfile(null);setProfileError('');
    if(et!=='in'||!v)return;
    const controller=new AbortController();
    profileRequest('GET',undefined,controller.signal).then(value=>{if(!controller.signal.aborted)setProfile(value);}).catch(error=>{if(!controller.signal.aborted)setProfileError(error.message||'Could not load or save your profile. Please try again.');});
    return ()=>controller.abort();
  },[et,v,profileVersion]);
  y.useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"});},[n]);
  const homeworkContext = y.useRef();
  homeworkContext.current = `${n}/${homeworkWeek}/${v}`;
  async function I(e, t = `GET`, n) {
    let r = T(),
      i = r?.getItem(P.token) || ``,
      a = /^[a-f0-9]{64}$/.test(i),
      o = (r) =>
        fetch(Ye + e, {
          method: t,
          credentials: `omit`,
          headers: {
            "Content-Type": `application/json`,
            ...(r && a ? { Authorization: `Bearer ` + i } : {}),
          },
          ...(n ? { body: JSON.stringify(n) } : {}),
        }),
      s;
    try {
      s = await o(a);
    } catch (e) {
      if (!a) throw e;
      (r?.removeItem(P.token), (s = await o(!1)));
    }
    let c = await s.json();
    if (!s.ok)
      throw Error(
        c.error || translate(`Something went wrong. Please try again.`),
      );
    return c;
  }
  async function rn() {
    let e = await I(`/api/data`),
      n = T();
    n?.getItem(P.token) && e.accounts && !e.account && n.removeItem(P.token);
    let r = mt(n);
    if (r && gt(n)) {
      let t = tt(r.name, [
        ...new Set(
          (e.community?.boards || []).flatMap((e) => e.rows.map((e) => e.name)),
        ),
      ]);
      t !== r.name &&
        (ht(n, { ...r, name: t }), n?.setItem(P.name, t), b(t), Dt(t));
    }
    return (
      e.account &&
        (n?.setItem(P.name, e.account.name),
        b(e.account.name),
        e.accountMisses?.misses?.length
          ? (le(e.accountMisses), at(n, P.revisit, e.accountMisses))
          : (le(null), ot(n, P.revisit))),
      t(e),
      e
    );
  }
  ((0, y.useEffect)(() => {
    (async () => {
      try {
        let e = new URLSearchParams(location.search),
          t = new URLSearchParams(location.hash.slice(1)).get(`teacher`),
          n = T(),
          i = mt(n),
          o = !!(i && gt(n)),
          s = !!(
            t ||
            [`teacher`, `login`, `grades`, `ai`, `manage`].includes(
              e.get(`view`) || ``,
            )
          );
        if (
          (o && i
            ? (b(i.name), Dt(i.name), Tt(`in`))
            : s
              ? Tt(`in`)
              : (i && Dt(i.name), Tt(`door`)),
          s)
        ) {
          location.replace(Ye + `/` + location.search + location.hash);
          return;
        }
        t &&
          (history.replaceState(null, ``, location.pathname + location.search),
          await I(`/api/teacher`, `POST`, { key: t }));
        let c = await rn(),
          l = e.get(`view`);
        l === `results` || l === `leaderboard`
          ? r(`leaderboard`)
          : l === `home` ||
              l === `quizzes` ||
              l === `moments` ||
              l === `homework` || l === `quran` || l === `account` || l === `study`
            ? r(l)
            : l === `grades` || l === `ai`
              ? r(c.teacher ? l : `login`)
              : (l === `teacher` || l === `login`) &&
                r(c.teacher ? `quizzes` : `login`);
        if (l === 'quran') {
          const reference = quranReferences(`(${e.get('surah')}:${e.get('from') || 1}-${e.get('to') || 1})`)[0];
          if (reference) setQuranSelection(reference);
        }
        let u = e.get(`quizId`);
        u && Ie(u);
        let d = e.get(`quiz`);
        if (d) {
          let e = c.quizzes.find((e) => e.id === d);
          e && e.published
            ? un(e, !1)
            : (r(`quizzes`),
              a(
                translate(
                  `This quiz is not available. It may have been closed. Choose another quiz below.`,
                ),
              ));
        }
      } catch (e) {
        (a(e.message), gt(T()) || Tt(`door`));
      }
    })();
  }, []),
    (0, y.useEffect)(() => {
      e && !M && Be(e.records.map((e) => ({ ...e })));
    }, [e, M]),
    (0, y.useEffect)(() => {
      let e = it(T(), P.revisit);
      e?.misses?.length && le(e);
    }, []),
    (0, y.useEffect)(() => {
      let e = T();
      !e ||
        !u ||
        f ||
        m ||
        (v.trim() && e.setItem(P.name, v.trim()),
        !(S || (g < 0 && x.every((e) => e === -1))) &&
          at(e, P.draft, {
            quizId: u.id,
            attemptId: ae,
            name: v,
            answers: x,
            step: g,
          }));
    }, [u, f, m, S, ae, v, x, g]),
    (0, y.useEffect)(() => {
      u &&
        g >= 0 &&
        !S &&
        document.getElementById(`question-focus`)?.focus({ preventScroll: !0 });
    }, [g, u, S]),
    (0, y.useEffect)(() => {
      if (n !== `homework`) return;
      let stop = !1;
      setHomeworkReady(!1);
      setHomeworkEntries([]);
      setHomeworkDraft(``);
      setHomeworkPending(!1);
      (async () => {
        let pack = await loadHomeworkWeek(homeworkWeek);
        if (stop) return;
        setHomeworkLive(pack.live);
        setHomeworkEntries(pack.entries);
        let mine = pack.entries.find(
          (item) => homeworkKey(item.name) === homeworkKey(v),
        );
        const local = readHomeworkLocal(T())[homeworkWeek];
        const key = homeworkKey(v);
        const pending =
          local &&
          Object.hasOwn(local, key) &&
          (local[key] === null || typeof local[key]?.body === "string") &&
          (local[key]?.body || "") !== (mine?.body || "");
        setHomeworkPending(!!pending);
        setHomeworkDraft(pending ? local[key]?.body || `` : mine?.body || ``);
        setHomeworkReady(!0);
      })();
      return () => {
        stop = !0;
      };
    }, [n, homeworkWeek, v]));
  const homeworkDirty=n==='homework'&&homeworkReady&&homeworkDraft.trim().replace(/\s+/g,' ')!==(homeworkEntries.find(item=>homeworkKey(item.name)===homeworkKey(v))?.body||'').trim().replace(/\s+/g,' ');
  let an =
      de &&
      !!(
        Ce.trim() ||
        De.trim() ||
        j.some((e) => e.prompt.trim() || e.options.some((e) => e.trim()))
      ),
    on = !!(u && !S && x.some((e) => e !== -1));
  (0, y.useEffect)(() => {
    let e = (e) => {
      (an || on || M || profileDirty || homeworkDirty) && (e.preventDefault(), (e.returnValue = ``));
    };
    return (
      window.addEventListener(`beforeunload`, e),
      () => window.removeEventListener(`beforeunload`, e)
    );
  }, [an, on, M, profileDirty, homeworkDirty]);
  async function sn(e) {
    (l(!0), a(``), s(``));
    try {
      await e();
    } catch (e) {
      (a(e.message), window.scrollTo({ top: 0, behavior: `smooth` }));
    } finally {
      l(!1);
    }
  }
  function cn() {
    return profileDirty
      ? confirm(translate("Leave without saving your profile photo?"))
      : homeworkDirty
      ? confirm(translate("Leave without saving your practice note?"))
      : M
      ? confirm(translate(`Leave without saving the grade changes?`))
      : on
        ? confirm(
            translate(`Leave this quiz? Your answers have not been submitted.`),
          )
        : an
          ? confirm(
              translate(`Leave the quiz editor? Unsaved changes will be lost.`),
            )
          : !0;
  }
  function ln(e) {
    const studyTool=['notes','practice','tuesday'].includes(e)?e:'';
    if(studyTool)e='study';
    if(e!==n)setHomeworkReady(false);
    (d(null),
      h(!1),
      C(null),
      pe(!1),
      He(!1),
      r(e),
      a(``),
      s(``),
      Nt(``),
      history.replaceState(null, ``, `/` + (e === `home` ? `` : `?view=` + e + (studyTool?'&tool='+studyTool:''))),
      window.scrollTo(0, 0));
  }
  function L(e) {
    if (cn()) {
      if (e === `login`) {
        location.assign(Ye + `/?view=teacher`);
        return;
      }
      if(e==='study'&&n==='study'&&!u){window.scrollTo({top:0,left:0,behavior:'instant'});return;}
      ln(e);
    }
  }
  function un(e, t = !1) {
    let n = T(),
      r = t ? null : it(n, P.draft),
      i = t ? null : it(n, P.done),
      o =
        r?.quizId === e.id &&
        r.answers.length === e.questions.length &&
        (r.step >= 0 || r.answers.some((e) => e !== -1))
          ? r
          : null,
      c = i?.quizId === e.id ? i : null,
      l = !!(n && gt(n) && !t);
    (d(e),
      p(t),
      h(!1),
      b(
        l
          ? mt(n)?.name || n?.getItem(P.name) || ``
          : o?.name || c?.name || n?.getItem(P.name) || ``,
      ),
      ee(o ? o.answers : Array(e.questions.length).fill(-1)),
      oe(o?.attemptId || c?.attemptId || crypto.randomUUID()),
      _(o ? Math.min(o.step, e.questions.length - 1) : -1),
      C(c && !o ? { score: c.score, max: c.max, review: c.review } : null),
      a(``),
      s(``),
      Nt(``),
      history.replaceState(
        null,
        ``,
        `/` + (t ? `?view=quizzes` : `?quiz=` + encodeURIComponent(e.id)),
      ),
      window.scrollTo(0, 0));
  }
  function dn() {
    let e = T();
    (ot(e, P.draft),
      ot(e, P.done),
      u &&
        (h(!1),
        C(null),
        _(-1),
        ee(Array(u.questions.length).fill(-1)),
        oe(crypto.randomUUID())));
  }
  function fn(e, t, n) {
    let r = T(),
      i = (n.review || []).map((e) => ({
        prompt: e.prompt,
        correct: e.correct,
        explanation: e.explanation || ``,
        right: e.right,
      }));
    (at(r, P.done, {
      quizId: e.id,
      attemptId: ae,
      name: t,
      title: e.title,
      score: n.score,
      max: n.max,
      review: i,
    }),
      ot(r, P.draft));
    let a = nt(e.questions, i),
      o = a.length
        ? {
            quizId: e.id,
            title: e.title,
            name: t,
            score: n.score,
            max: n.max,
            misses: a,
          }
        : null;
    return (le(o), o ? at(r, P.revisit, o) : ot(r, P.revisit), i);
  }
  function pn() {
    se &&
      (d({
        id: se.quizId,
        title: se.title,
        description: ``,
        published: 1,
        questions: se.misses.map((e) => ({
          prompt: e.prompt,
          options: [...e.options],
          correct: e.correct,
          explanation: e.explanation,
        })),
      }),
      h(!0),
      p(!1),
      _(0),
      b(se.name),
      ee(Array(se.misses.length).fill(-1)),
      oe(`practice`),
      C(null),
      a(``),
      s(``),
      r(`home`),
      history.replaceState(null, ``, `/`),
      window.scrollTo(0, 0));
  }
  function mn() {
    (ot(T(), P.revisit), le(null));
  }
  function hn(e, t = !1, n = !1) {
    cn() &&
      (Te(e ? (t ? e.title : e.title + translate(` — copy`)) : ``),
      ke(e?.description || ``),
      Me(
        e
          ? e.questions.map((e) => ({ ...e, options: [...e.options] }))
          : [St()],
      ),
      he(t && e ? e.id : null),
      en(!!e?.questions.some((e) => e.evidence)),
      nn(!1),
      xe(0),
      ve(n ? 2 : 0),
      pe(!0),
      r(`quizzes`),
      d(null),
      a(``),
      s(``),
      window.scrollTo(0, 0));
  }
  function gn(e, t) {
    Me((n) => n.map((n, r) => (r === e ? { ...n, ...t } : n)));
  }
  async function _n(t) {
    if (t && $t && !tn) {
      a(
        translate(
          `Confirm you have reviewed the AI questions and correct answers before publishing.`,
        ),
      );
      return;
    }
    await sn(async () => {
      let n = {
          title: Ce,
          description: De,
          questions: j,
          published: t,
          ...(D ? { id: D } : {}),
        },
        r = await I(`/api/quizzes`, D ? `PATCH` : `POST`, n);
      (await rn(),
        ln(`quizzes`),
        s(
          t
            ? translate(`Quiz published. Copy the student link to share it.`)
            : translate(
                `Draft saved. You can continue editing it from Quizzes.`,
              ),
        ),
        t &&
          Nt(
            (e?.publicSiteUrl || location.origin + `/`) +
              `?quiz=` +
              encodeURIComponent(D || r.id),
          ));
    });
  }
  async function vn(e) {
    Nt(e);
    try {
      (await navigator.clipboard.writeText(e),
        s(translate(`Copied. Paste it into WhatsApp or your group chat.`)));
    } catch {
      s(translate(`Copy the text in the box below.`));
    }
  }
  function yn(e) {
    cn() && (Ie(e.id), ln(`grades`));
  }
  function bn(t) {
    let n = e?.submissions.filter((e) => e.quiz_id === t.id).length || 0,
      r = n
        ? translate(" This also removes {count} saved {type}.", {
            count: n,
            type: n === 1 ? translate("submission") : translate("submissions"),
          })
        : ``;
    confirm(
      translate("Delete “{title}”? This cannot be undone.{detail}", {
        title: t.title,
        detail: r,
      }),
    ) &&
      sn(async () => {
        (await I(`/api/quizzes`, `DELETE`, { id: t.id }),
          F?.id === t.id && Ht(null),
          Pe === t.id && Ie(xt),
          await rn(),
          ln(`quizzes`),
          s(translate(`Quiz deleted.`)));
      });
  }
  function xn(e, t, n, r, i, google, googleSub) {
    (ht(e, {
      name: t,
      passwordHash: n,
      ...(r ? { recoveryHash: r } : {}),
      ...(google ? { google: !0 } : {}),
      ...(googleSub ? { googleSub: googleSub } : {}),
    }),
      i ? e?.setItem(P.token, i) : e?.removeItem(P.token),
      e?.setItem(P.name, t),
      _t(e),
      b(t),
      Dt(t),
      jt(!1),
      Tt(`in`));
  }
  async function Sn(t, n, r, i = ``) {
    (l(!0), kt(``));
    try {
      let a = tt(lt(n), [
          ...new Set(
            (e?.community.boards || []).flatMap((e) =>
              e.rows.map((e) => e.name),
            ),
          ),
        ]),
        o = T(),
        s = mt(o),
        c = !!(
          s && s.name.toLocaleLowerCase(`en`) === a.toLocaleLowerCase(`en`)
        );
      if (t === `reset`) {
        let e = ut(a) || pt(i) || dt(r);
        if (e) throw Error(e);
        if (c && s && !s.recoveryHash)
          throw Error(
            translate(
              `This name was saved without a recovery word. Choose This is someone else and set it up again.`,
            ),
          );
        let t = await st(ft(i)),
          n = !!(c && s?.recoveryHash && ct(s.recoveryHash, t)),
          l = null;
        try {
          l = await I(`/api/account/reset`, `POST`, {
            name: a,
            recovery: i,
            password: r,
          });
        } catch (e) {
          if (!n)
            throw Error(
              (c && s?.recoveryHash) || /does not match/.test(e?.message || ``)
                ? translate(`That recovery word does not match.`)
                : translate(
                    `Could not save the new password. Please try again.`,
                  ),
            );
        }
        if (!l && !n)
          throw Error(translate(`That recovery word does not match.`));
        xn(
          o,
          l?.student?.name || s?.name || a,
          await st(r),
          s?.recoveryHash || t,
          l?.token,
        );
        return;
      }
      let l = ut(a) || dt(r) || (t === `create` ? pt(i, r) : null);
      if (l) throw Error(l);
      let u = await st(r);
      if (t === `enter`) {
        let e = !!(c && s && ct(s.passwordHash, u)),
          t = null;
        try {
          t = await I(`/api/account/login`, `POST`, { name: a, password: r });
        } catch (t) {
          if (!e)
            throw Error(
              /do not match/.test(t?.message || ``) || s
                ? translate(`That name and password do not match.`)
                : translate(`This phone has not saved that name yet.`),
            );
        }
        if (!t && !e)
          throw Error(translate(`That name and password do not match.`));
        xn(o, t?.student?.name || s?.name || a, u, s?.recoveryHash, t?.token);
      } else {
        let e = null;
        try {
          e = await I(`/api/account/register`, `POST`, {
            name: a,
            password: r,
            recovery: i,
          });
        } catch (e) {
          if (/already/.test(e?.message || ``)) throw e;
        }
        xn(o, e?.student?.name || a, u, await st(ft(i)), e?.token);
      }
    } catch (e) {
      kt(e.message || translate(`Could not save this name. Please try again.`));
    } finally {
      l(!1);
    }
  }
  async function finishGoogle(credential, tentName, linkExisting = false) {
    (setGoogleBusy(!0), kt(``));
    try {
      At || linkExisting || T()?.removeItem(P.token);
      let names = [
          ...new Set(
            (e?.community.boards || []).flatMap((board) =>
              board.rows.map((row) => row.name),
            ),
          ),
        ],
        store = T(),
        existing = mt(store),
        who = googleClaims(credential),
        saved = existing?.name ? tt(lt(existing.name), names) : ``,
        clean = tentName ? tt(lt(tentName), names) : ``,
        admit = (name, token) => {
          let same = !!(
            existing &&
            existing.name.toLocaleLowerCase(`en`) ===
              name.toLocaleLowerCase(`en`)
          );
          (xn(
            store,
            name,
            same ? existing.passwordHash || `` : ``,
            same ? existing.recoveryHash : void 0,
            token || ``,
            !0,
            who?.sub,
          ),
            setGoogleTicket(``));
        };
      if (tentName) {
        let problem = ut(clean);
        if (problem) throw Error(problem);
        if (
          saved &&
          saved.toLocaleLowerCase(`en`) !== clean.toLocaleLowerCase(`en`)
        )
          throw Error(
            `This phone already uses another name. Choose This is someone else before adding a new one.`,
          );
      }
      if (who && existing?.googleSub && existing.googleSub !== who.sub)
        throw Error(
          `This Google account is not the one saved on this phone. Choose This is someone else if you are a different student.`,
        );
      if (!clean && saved) clean = saved;
      let server;
      try {
        server = await I(`/api/account/google`, `POST`, {
          credential,
          ...(clean ? { name: clean } : {}),
        });
      } catch (err) {
        if (linkExisting) throw err;
        let message = err?.message || ``;
        if (/already in the tent|already used by another name/i.test(message))
          throw Error(
            `That name is already in the tent. Come in with the password for that name.`,
          );
        if (
          !who ||
          !/not available|not connected|not found|failed to fetch|load failed|network|unexpected token/i.test(
            message,
          )
        )
          throw err;
        if (!clean) {
          setGoogleTicket(credential);
          return;
        }
        admit(clean, ``);
        return;
      }
      if (server.needsName) {
        if (!tentName && saved) {
          await finishGoogle(credential, saved);
          return;
        }
        setGoogleTicket(credential);
        return;
      }
      admit(server.student.name, server.token);
      setProfileVersion(value=>value+1);
    } catch (err) {
      let message = err?.message || ``;
      kt(
        /not available|not connected|not found|failed to fetch|load failed|network|unexpected token/i.test(
          message,
        )
          ? `Google could not confirm this sign-in. Come in with your name and password.`
          : message || `Could not sign in with Google. Please try again.`,
      );
    } finally {
      setGoogleBusy(!1);
    }
  }
  async function Cn(e, t) {
    (l(!0), kt(``));
    try {
      let n = T(),
        r = mt(n),
        i = !!(r && ct(r.passwordHash, await st(e))),
        a = null,
        o = n?.getItem(P.token) || ``;
      if (/^[a-f0-9]{64}$/.test(o))
        try {
          a = await I(`/api/account/password`, `POST`, {
            current: e,
            password: t,
          });
        } catch (e) {
          if (!i)
            throw Error(
              /does not match/.test(e?.message || ``)
                ? translate(`That password does not match.`)
                : translate(
                    `Could not save the new password. Please try again.`,
                  ),
            );
        }
      if (!a && !i) throw Error(translate(`That password does not match.`));
      (ht(n, {
        name: r?.name || v,
        passwordHash: await st(t),
        ...(r?.recoveryHash ? { recoveryHash: r.recoveryHash } : {}),
        ...(r?.google ? { google: !0 } : {}),
        ...(r?.googleSub ? { googleSub: r.googleSub } : {}),
      }),
        a?.token && n?.setItem(P.token, a.token),
        jt(!1),
        s(translate(`Password saved. Use it the next time you sign in.`)));
    } catch (e) {
      kt(
        e.message ||
          translate(`Could not save the new password. Please try again.`),
      );
    } finally {
      l(!1);
    }
  }
  function wn() {
    let e = T();
    (e?.getItem(P.token) && I(`/api/account`, `DELETE`).catch(() => {}),
      vt(e),
      d(null),
      h(!1),
      C(null),
      a(``),
      s(``),
      jt(!1),
      Tt(`door`));
  }
  async function Tn() {
    await sn(async () => {
      let t = u,
        n;
      if (m) {
        let e = rt(
          t.questions.map((e) => ({
            prompt: e.prompt,
            options: e.options,
            correct: e.correct,
            explanation: e.explanation || ``,
          })),
          x,
        );
        n = { score: e.score, max: e.max, practice: !0, review: e.review };
        let r = e.misses.length && se ? { ...se, misses: e.misses } : null;
        if (
          (le(r),
          r ? at(T(), P.revisit, r) : ot(T(), P.revisit),
          T()?.getItem(P.token))
        )
          try {
            await I(`/api/account`, `POST`, {
              quizId: se?.quizId || t.id,
              title: se?.title || t.title,
              score: n.score,
              max: n.max,
              misses: r?.misses || [],
            });
          } catch {}
      } else if (f)
        n = {
          score: t.questions.filter((e, t) => e.correct === x[t]).length,
          max: t.questions.length,
          preview: !0,
          review: t.questions.map((e, t) => ({
            prompt: e.prompt,
            correct: e.options[e.correct],
            explanation: e.explanation,
            right: e.correct === x[t],
          })),
        };
      else {
        let r = tt(v, [
          ...new Set(
            (e?.community.boards || []).flatMap((e) =>
              e.rows.map((e) => e.name),
            ),
          ),
        ]);
        (b(r),
          (n = await I(`/api/submit`, `POST`, {
            quizId: t.id,
            name: r,
            answers: x,
            attemptId: ae,
          })),
          n.review?.length && (n = { ...n, review: fn(t, r, n) }),
          await rn(),
          re({ ...n, title: t.title, name: r }));
      }
      (C(n), window.scrollTo(0, 0));
    });
  }
  let En = e?.quizzes || [],
    Dn = En.filter((e) => e.published),
    On = En.filter((e) => !e.published),
    kn = En.filter(
      (e) =>
        (It === `all` || (It === `published` ? e.published : !e.published)) &&
        e.title.toLowerCase().includes(Pt.toLowerCase()),
    ),
    An = En.find((e) => e.id === Pe),
    jn = Ke(
      Pe === xt
        ? (e?.records || []).map((e) => ({ ...e, score: e.regular + e.bonus }))
        : (e?.submissions || []).filter((e) => e.quiz_id === Pe),
    ),
    Mn = jn.length
      ? (jn.reduce((e, t) => e + We(t), 0) / jn.length).toFixed(1)
      : `0`,
    Nn = !!(Ce.trim() && j.length && j.every(wt)),
    Pn = (e?.teacher ? e.submissions : []).flatMap((e) => {
      let t = En.find((t) => t.id === e.quiz_id),
        n = [];
      try {
        n = JSON.parse(e.answers || `[]`);
      } catch {}
      return t
        ? t.questions.flatMap((t, r) =>
            n[r] !== void 0 && n[r] !== t.correct
              ? [
                  {
                    name: e.name,
                    question: t.prompt,
                    chosen: t.options[n[r]],
                    correct: t.options[t.correct],
                    caption: ``,
                  },
                ]
              : [],
          )
        : [];
    });
  function Fn(e, t, n, r = !0) {
    return (0, N.jsxs)(`fieldset`, {
      className: `quiz-choices`,
      children: [
        (0, N.jsx)(`legend`, { children: translate(`Choose a quiz`) }),
        [
          ...(r
            ? [
                {
                  id: xt,
                  title: translate(`Original etiquette quiz`),
                  detail: translate(`Paper quiz · 13 points + bonus`),
                },
              ]
            : []),
          ...En.map((e) => ({
            id: e.id,
            title: e.title,
            detail:
              e.questions.length +
              translate(` questions · `) +
              (e.published
                ? translate(`Published`)
                : translate(`Draft or closed`)),
          })),
        ].map((r) =>
          (0, N.jsxs)(
            `label`,
            {
              className: t === r.id ? `chosen` : ``,
              children: [
                (0, N.jsx)(`input`, {
                  type: `radio`,
                  name: e,
                  value: r.id,
                  checked: t === r.id,
                  onChange: () => n(r.id),
                }),
                (0, N.jsxs)(`span`, {
                  children: [
                    (0, N.jsx)(`b`, { children: r.title }),
                    (0, N.jsx)(`small`, { children: r.detail }),
                  ],
                }),
                (0, N.jsx)(`span`, {
                  className: `choice-check`,
                  children: t === r.id && (0, N.jsx)(ce, { size: 15 }),
                }),
              ],
            },
            r.id,
          ),
        ),
      ],
    });
  }
  function In(e) {
    return Fn(e, Pe, (e) => {
      cn() && (Ie(e), He(!1));
    });
  }
  async function Ln() {
    await sn(async () => {
      let e = await I(`/api/ai`, `POST`, {
        kind: `quiz`,
        title: Ut,
        source: Gt,
        session: qt,
        count: Yt,
      });
      (Te(e.draft.title),
        ke(e.draft.description),
        Me(e.draft.questions),
        he(null),
        xe(0),
        ve(1),
        en(!0),
        nn(!1),
        pe(!0),
        r(`quizzes`),
        s(
          translate(
            `AI draft generated. Review the questions, correct answers and source excerpts before publishing.`,
          ),
        ),
        window.scrollTo(0, 0));
    });
  }
  async function Rn() {
    await sn(async () => {
      (Vt(
        (await I(`/api/ai`, `POST`, { kind: `highlight`, quizId: Zt }))
          .suggestion,
      ),
        zt(!0),
        s(
          translate(
            `AI suggestion ready. Review the answer and caption, then publish it for the group.`,
          ),
        ),
        setTimeout(
          () =>
            document
              .getElementById(`moment-editor`)
              ?.scrollIntoView({ behavior: `smooth`, block: `start` }),
          0,
        ));
    });
  }
  async function loadHomeworkWeek(week) {
    try {
      let res = await fetch(
        Ye + `/api/homework?week=` + encodeURIComponent(week),
        { headers: { Accept: `application/json` } },
      );
      if (res.ok) {
        let data = await res.json();
        return {
          live: !0,
          entries: Array.isArray(data.entries)
            ? data.entries.filter(
                (item) =>
                  typeof item?.name === "string" &&
                  typeof item.body === "string" &&
                  item.body,
              )
            : [],
        };
      }
    } catch {}
    let shared = {};
    try {
      let file = await fetch(`./homework.json`, { cache: `no-store` });
      if (file.ok) shared = await file.json();
    } catch {}
    let local = readHomeworkLocal(T()),
      byName = new Map();
    for (let item of shared[week] || [])
      typeof item?.name === "string" &&
        typeof item.body === "string" &&
        item.body &&
        byName.set(homeworkKey(item.name), item);
    for (let [key, item] of Object.entries(local[week] || {}))
      typeof item?.name === "string" &&
      typeof item.body === "string" &&
      item.body
        ? byName.set(key, { name: item.name, body: item.body, localOnly: true })
        : byName.delete(key);
    return {
      live: !1,
      entries: [...byName.values()].sort((a, b) =>
        a.name.localeCompare(b.name, getLanguage() === `ar` ? `ar` : `en`),
      ),
    };
  }
  function changeHomeworkWeek(week) {
    if (homeworkBusy || week === homeworkWeek) return;
    const saved = homeworkEntries.find(
      (item) => homeworkKey(item.name) === homeworkKey(v),
    );
    const body = homeworkDraft.trim().replace(/\s+/g, " ");
    if (homeworkReady && v.trim() && body !== (saved?.body || ""))
      storeHomeworkDraft(T(), homeworkWeek, lt(v), body);
    setHomeworkReady(false);
    setHomeworkWeek(week);
    a("");
    s("");
  }
  async function saveHomework() {
    if (homeworkBusy || !homeworkReady) return;
    const name = lt(v),
      problem = ut(name),
      body = homeworkDraft.trim().replace(/\s+/g, " "),
      week = homeworkWeek,
      context = homeworkContext.current;
    if (problem) {
      a(problem);
      return;
    }
    if (body.length > 500) {
      a("That homework is too long.");
      return;
    }
    setHomeworkBusy(true);
    a("");
    s("");
    // Keep the edit for retry before making a shared write.
    const kept = storeHomeworkDraft(T(), week, name, body);
    try {
      if (homeworkLive) {
        await I("/api/homework", "POST", { week, name, body });
        clearHomeworkDraft(T(), week, name);
      } else if (!kept) {
        throw Error(
          "This phone could not save homework. Try again when you are online.",
        );
      }
      if (homeworkContext.current !== context) return;
      setHomeworkEntries((entries) => {
        const others = entries.filter(
          (item) => homeworkKey(item.name) !== homeworkKey(name),
        );
        return body
          ? [{ name, body, localOnly: !homeworkLive }, ...others]
          : others;
      });
      setHomeworkDraft(body);
      setHomeworkPending(!homeworkLive);
      s(
        homeworkLive
          ? body
            ? "Practice note shared."
            : "Practice note removed."
          : "Saved on this phone.",
      );
    } catch (err) {
      if (homeworkContext.current === context) {
        setHomeworkPending(kept);
        a(
          err instanceof Error && err.message
            ? err.message
            : "Could not save homework. Please try again.",
        );
      }
    } finally {
      setHomeworkBusy(false);
    }
  }
  function openQuran(reference) {
    if (!cn()) return;
    setQuranSelection(reference);
    ln('quran');
    history.replaceState(null, '', `/?view=quran&surah=${reference.surah}&from=${reference.from}&to=${reference.to}`);
  }
  function addQuranHomework(reference) {
    if (!homeworkReady || homeworkBusy) return;
    const next = [homeworkDraft.trim(), reference].filter(Boolean).join('\n');
    if (next.length > 500) { a('That homework is too long.'); return; }
    setHomeworkDraft(next);
    setHomeworkQuranOpen(false);
    document.getElementById('homework-body')?.focus();
  }
  let zn = m
      ? S?.score === S?.max
        ? translate(`Those answers are clear now`)
        : translate(`Still worth another look`)
      : f
        ? translate(`Preview complete`)
        : S?.score === S?.max
          ? translate(`All answers correct!`)
          : translate(`Quiz complete`),
    Bn = m
      ? translate(
          `This practice stays on your phone. The leaderboard was not changed.`,
        )
      : f
        ? translate(`This was a preview. No grade was saved.`)
        : translate("{name}, your result has been saved.", { name: v }),
    Vn = m ? translate(`Back home`) : translate(`Back to quizzes`),
    Hn = m ? `home` : `quizzes`,
    Un = [
      [`home`, translate(`Home`), ye],
      [`homework`, translate(`Homework`), HomeworkIcon],
      [`study`, translate(`Halaqas & study`), ie],
      [`quizzes`, translate(`Quizzes`), E],
      [`quran`, translate('Qur’an'), ie],
      ...(e?.teacher ? [[`grades`, translate(`Grades`), E]] : []),
      [`leaderboard`, translate(`Leaderboard`), ze],
      [`moments`, translate(`Funny answers`), ge],
      ...(!e?.teacher ? [[`account`,translate(`Account`),ProfileIcon]] : []),
    ];
  return At
    ? (0, N.jsx)(bt, {
        busy: c,
        error: Ot,
        onSave: Cn,
        onBack: () => {
          (jt(!1), kt(``));
        },
      })
    : et === `door`
      ? (0, N.jsx)(yt, {
          savedName: Et,
          busy: c,
          error: Ot,
          onCreate: (e, t, n) => Sn(`create`, e, t, n),
          onEnter: (e, t) => Sn(`enter`, e, t),
          onReset: (e, t, n) => Sn(`reset`, e, n, t),
          onTeacher: () => {
            (Tt(`in`), L(`login`));
          },
          onSomeoneElse: () => {
            (ot(T(), P.door), Dt(``), b(``), kt(``), setGoogleTicket(``));
          },
          onGoogle: (credential) => finishGoogle(credential),
          onGoogleName: (name) => finishGoogle(googleTicket, name),
          onCancelGoogle: () => {
            (setGoogleTicket(``), kt(``));
          },
          onClearError: () => kt(``),
          askTentName: !!googleTicket,
          googleBusy: googleBusy,
          savedGoogle: !!mt(T())?.google,
          hasPassword: !!mt(T())?.passwordHash,
        })
      : (0, N.jsxs)(`div`, {
          className: `site`,
          children: [
            el("span",{className:"room-heat","aria-hidden":true}),
            (0, N.jsx)(`a`, {
              href: `#main`,
              className: `skip-link`,
              children: translate(`Skip to content`),
            }),
            (0, N.jsxs)(`header`, {
              className: `app-header`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `header-inner`,
                  children: [
                    el(Brand, {
                      onClick: (event) => {
                        event.preventDefault();
                        L("home");
                      },
                    }),
                    el(HangingLanterns, { compact: true }),
                    (0, N.jsxs)(`div`, {
                      className: `header-actions`,
                      children: [
                        el(LanguageSwitcher),
                        el(MotionToggle),
                        el(AccountMenu, {name: v || (e?.teacher ? translate("Teacher") : ""),photo:profile?.name===v?profile.photo:e?.account?.name===v?e.account.photo:null},
                        v && !e?.teacher && el("button",{className:"text-button",onClick:()=>L("account")},translate("Your account")),
                        et === `in` && v && !e?.teacher
                          ? (0, N.jsxs)(`div`, {
                              className: `teacher-account`,
                              children: [
                                (0, N.jsx)(`span`, { children: v }),
                                (0, N.jsx)(`button`, {
                                  className: `text-button`,
                                  onClick: () => {
                                    (kt(``), jt(!0));
                                  },
                                  "aria-label": translate("Change password"),
                                  title: translate("Change password"),
                                  children: [
                                    el(be, {
                                      size: 15,
                                      className: "password-icon",
                                    }),
                                    el(
                                      "span",
                                      { className: "password-label" },
                                      translate("Password"),
                                    ),
                                  ],
                                }),
                                (0, N.jsxs)(`button`, {
                                  className: `text-button`,
                                  onClick: wn,
                                  children: [
                                    (0, N.jsx)(Se, { size: 15 }),
                                    translate(`Sign out`),
                                  ],
                                }),
                              ],
                            })
                          : null,
                        e?.teacher
                          ? (0, N.jsxs)(`div`, {
                              className: `teacher-account`,
                              children: [
                                (0, N.jsx)(`span`, {
                                  children: translate(`Teacher`),
                                }),
                                (0, N.jsxs)(`button`, {
                                  className: `text-button`,
                                  onClick: () => {
                                    cn() &&
                                      sn(async () => {
                                        (await I(`/api/teacher`, `DELETE`),
                                          await rn(),
                                          ln(`home`),
                                          s(translate(`Signed out.`)));
                                      });
                                  },
                                  children: [
                                    (0, N.jsx)(Se, { size: 15 }),
                                    translate(`Sign out`),
                                  ],
                                }),
                              ],
                            })
                          : (0, N.jsxs)(`button`, {
                              className: `teacher-signin`,
                              onClick: () => L(`login`),
                              children: [
                                (0, N.jsx)(be, { size: 15 }),
                                translate(`Teacher sign in`),
                              ],
                            }),
                        ),
                      ],
                    }),
                  ],
                }),
                e &&
                  (0, N.jsx)(MotionNav, {
                    className:
                      `main-nav ` + (e.teacher ? `teacher-nav` : `student-nav`),
                    "aria-label": translate(`Main navigation`),
                    children: Un.map(([e, t, r]) => {
                      let i = r;
                      return (0, N.jsxs)(
                        `button`,
                        {
                          "aria-current":
                            !u &&
                            (n === e ||
                              (e === `quizzes` && [`ai`, `manage`].includes(n)))
                              ? `page`
                              : void 0,
                          className:
                            !u &&
                            (n === e ||
                              (e === `quizzes` && [`ai`, `manage`].includes(n)))
                              ? `selected`
                              : ``,
                          onClick: () => L(e),
                          children: [
                            (0, N.jsx)(i, { size: 17 }),
                            (0, N.jsx)(`span`, { children: t }),
                          ],
                        },
                        e,
                      );
                    }),
                  }),
              ],
            }),
            (0, N.jsxs)(`main`, {
              id: `main`,
              tabIndex: -1,
              children: [
                i &&
                  (0, N.jsxs)(`div`, {
                    className: `alert error`,
                    role: `alert`,
                    children: [
                      (0, N.jsx)(_e, { size: 19 }),
                      (0, N.jsx)(`span`, { children: translate(i) }),
                      !e &&
                        (0, N.jsx)(`button`, {
                          onClick: () =>
                            sn(async () => {
                              await rn();
                            }),
                          children: translate(`Try again`),
                        }),
                    ],
                  }),
                o &&
                  (0, N.jsxs)(`div`, {
                    className: `alert success`,
                    role: `status`,
                    children: [
                      (0, N.jsx)(ue, { size: 19 }),
                      (0, N.jsx)(`span`, { children: translate(o) }),
                      (0, N.jsx)(`button`, {
                        className: `icon-button`,
                        "aria-label": translate(`Dismiss message`),
                        onClick: () => s(``),
                        children: (0, N.jsx)(Ve, { size: 18 }),
                      }),
                    ],
                  }),
                !e &&
                  !i &&
                  (0, N.jsxs)(`div`, {
                    className: `loading`,
                    role: `status`,
                    children: [
                      translate(`Loading the tent…`),
                      (0, N.jsx)(`div`, {}),
                      (0, N.jsx)(`div`, {}),
                    ],
                  }),
                e && u
                  ? (0, N.jsxs)(`section`, {
                      className: `attempt`,
                      children: [
                        el(Cushion, {
                          kind: "armrest",
                          className: "attempt-cushion",
                        }),
                        (0, N.jsxs)(`button`, {
                          className: `text-button back`,
                          onClick: () => L(`quizzes`),
                          children: [
                            (0, N.jsx)(te, { size: 17 }),
                            translate(`Back to quizzes`),
                          ],
                        }),
                        (0, N.jsx)(`h1`, { dir: `auto`, children: u.title }),
                        f &&
                          (0, N.jsxs)(`p`, {
                            className: `info-note`,
                            children: [
                              (0, N.jsx)(O, { size: 16 }),
                              translate(
                                `Teacher preview. No student result will be saved.`,
                              ),
                            ],
                          }),
                        m &&
                          (0, N.jsxs)(`p`, {
                            className: `info-note`,
                            children: [
                              (0, N.jsx)(Oe, { size: 16 }),
                              translate(
                                `These are the questions you missed. This practice is not graded.`,
                              ),
                            ],
                          }),
                        S
                          ? (0, N.jsxs)(N.Fragment, {
                              children: [
                                (0, N.jsxs)(`section`, {
                                  className: `result`,
                                  children: [
                                    !m &&
                                      (0, N.jsx)(`div`, {
                                        className: `confetti`,
                                        "aria-hidden": `true`,
                                        children: Array.from(
                                          { length: 30 },
                                          (e, t) =>
                                            (0, N.jsx)(
                                              `i`,
                                              {
                                                style: {
                                                  "--n": t,
                                                  "--x": ((t * 47) % 101) + `%`,
                                                  "--turn":
                                                    ((t * 67) % 360) + `deg`,
                                                  "--delay":
                                                    (t % 6) * 0.035 + `s`,
                                                },
                                              },
                                              t,
                                            ),
                                        ),
                                      }),
                                    (0, N.jsx)(`div`, {
                                      className: `result-medal`,
                                      children: (0, N.jsx)(ze, { size: 29 }),
                                    }),
                                    (0, N.jsx)(`h2`, { children: zn }),
                                    (0, N.jsx)(`p`, { children: Bn }),
                                    (0, N.jsxs)(`div`, {
                                      className: `result-score`,
                                      children: [
                                        S.score,
                                        (0, N.jsxs)(`span`, {
                                          children: [`/`, S.max],
                                        }),
                                      ],
                                    }),
                                    (0, N.jsxs)(`span`, {
                                      children: [
                                        ((S.score / S.max) * 100).toFixed(1),
                                        `%`,
                                      ],
                                    }),
                                    (0, N.jsxs)(`div`, {
                                      className: `attempt-actions`,
                                      children: [
                                        !m &&
                                          !f &&
                                          (0, N.jsx)(`button`, {
                                            className: `secondary`,
                                            onClick: dn,
                                            children:
                                              translate(`Take it again`),
                                          }),
                                        (0, N.jsxs)(`button`, {
                                          className: `primary`,
                                          onClick: () => L(Hn),
                                          children: [
                                            Vn,
                                            (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, N.jsx)(`h2`, {
                                  className: `section-title`,
                                  children: translate(`Your answers`),
                                }),
                                S.alreadySubmitted &&
                                  !(S.review || []).length &&
                                  (0, N.jsx)(`p`, {
                                    className: `help`,
                                    children: translate(
                                      `This attempt was already saved.`,
                                    ),
                                  }),
                                (S.review || []).map((e, t) =>
                                  (0, N.jsxs)(
                                    `article`,
                                    {
                                      className: `answer-review`,
                                      children: [
                                        (0, N.jsx)(`span`, {
                                          className: e.right
                                            ? `review-mark correct`
                                            : `review-mark incorrect`,
                                          children: e.right
                                            ? (0, N.jsx)(ce, { size: 19 })
                                            : (0, N.jsx)(Oe, { size: 18 }),
                                        }),
                                        (0, N.jsxs)(`div`, {
                                          children: [
                                            (0, N.jsxs)(`span`, {
                                              className: `help`,
                                              children: [
                                                translate(`Question `),
                                                t + 1,
                                                ` · `,
                                                e.right
                                                  ? translate(`Correct`)
                                                  : translate(`Incorrect`),
                                              ],
                                            }),
                                            (0, N.jsx)(`h3`, {
                                              dir: `auto`,
                                              children: e.prompt,
                                            }),
                                            (0, N.jsxs)(`p`, {
                                              children: [
                                                translate(`Correct answer: `),
                                                (0, N.jsx)(`b`, {
                                                  dir: `auto`,
                                                  children: e.correct,
                                                }),
                                              ],
                                            }),
                                            e.explanation &&
                                              (0, N.jsx)(`p`, {
                                                children: e.explanation,
                                              }),
                                            !f&&!m&&!e.right&&el(MissCoach,{quizId:u.id,question:e,chosen:u.questions[t]?.options?.[x[t]]}),
                                          ],
                                        }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                              ],
                            })
                          : g === -1
                            ? (0, N.jsxs)(`form`, {
                                className: `start-form`,
                                onSubmit: (e) => {
                                  (e.preventDefault(), _(0));
                                },
                                children: [
                                  u.description &&
                                    (0, N.jsx)(`p`, {
                                      children: u.description,
                                    }),
                                  (0, N.jsxs)(`p`, {
                                    className: `quiz-facts`,
                                    children: [
                                      (0, N.jsxs)(`span`, {
                                        children: [
                                          (0, N.jsx)(E, { size: 16 }),
                                          u.questions.length,
                                          translate(` questions`),
                                        ],
                                      }),
                                      (0, N.jsxs)(`span`, {
                                        children: [
                                          (0, N.jsx)(fe, { size: 16 }),
                                          translate(`No time limit`),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, N.jsxs)(`label`, {
                                    htmlFor: `student-name`,
                                    children: [
                                      translate(`Your name`),
                                      (0, N.jsx)(`input`, {
                                        id: `student-name`,
                                        autoComplete: `name`,
                                        maxLength: 100,
                                        value: v,
                                        placeholder:
                                          translate(`Enter your name`),
                                        onChange: (e) => b(e.target.value),
                                        readOnly: gt(T()),
                                        required: !0,
                                      }),
                                    ],
                                  }),
                                  (0, N.jsx)(`small`, {
                                    children: gt(T())
                                      ? translate(
                                          `This phone remembers this name.`,
                                        )
                                      : translate(
                                          `Use the name your teacher knows. Your name and score will appear on the group leaderboard.`,
                                        ),
                                  }),
                                  (0, N.jsxs)(`button`, {
                                    className: `primary`,
                                    disabled: !v.trim(),
                                    children: [
                                      translate(`Start quiz`),
                                      (0, N.jsx)(w, { size: 17 }),
                                    ],
                                  }),
                                ],
                              })
                            : (0, N.jsxs)(N.Fragment, {
                                children: [
                                  (0, N.jsxs)(`div`, {
                                    className: `question-progress`,
                                    children: [
                                      (0, N.jsxs)(`span`, {
                                        children: [
                                          translate(`Question `),
                                          g + 1,
                                          translate(` of `),
                                          u.questions.length,
                                        ],
                                      }),
                                      (0, N.jsxs)(`span`, {
                                        children: [
                                          x.filter((e) => e !== -1).length,
                                          translate(` answered`),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, N.jsx)(`div`, {
                                    className: `progress-track`,
                                    children: u.questions.map((e, t) =>
                                      (0, N.jsx)(
                                        `span`,
                                        {
                                          className:
                                            t === g
                                              ? `current`
                                              : x[t] === -1
                                                ? ``
                                                : `done`,
                                        },
                                        t,
                                      ),
                                    ),
                                  }),
                                  (0, N.jsxs)(
                                    `fieldset`,
                                    {
                                      className: `question`,
                                      children: [
                                        (0, N.jsx)(`legend`, {
                                          id: `question-focus`,
                                          tabIndex: -1,
                                          dir: `auto`,
                                          children: u.questions[g].prompt,
                                        }),
                                        u.questions[g].options.map((e, t) =>
                                          (0, N.jsxs)(
                                            `label`,
                                            {
                                              className:
                                                `answer-option ` +
                                                (x[g] === t ? `picked` : ``),
                                              children: [
                                                (0, N.jsx)(`input`, {
                                                  type: `radio`,
                                                  name: `answer-` + g,
                                                  checked: x[g] === t,
                                                  onChange: () =>
                                                    ee((e) =>
                                                      e.map((e, n) =>
                                                        n === g ? t : e,
                                                      ),
                                                    ),
                                                }),
                                                (0, N.jsx)(`span`, {
                                                  className: `option-letter`,
                                                  children: (getLanguage() ===
                                                  "ar"
                                                    ? ["أ", "ب", "ج", "د"]
                                                    : ["A", "B", "C", "D"])[t],
                                                }),
                                                (0, N.jsx)(`span`, {
                                                  className: `option-text`,
                                                  dir: `auto`,
                                                  children: e,
                                                }),
                                                (0, N.jsx)(`span`, {
                                                  className: `option-check`,
                                                  children:
                                                    x[g] === t &&
                                                    (0, N.jsx)(ce, {
                                                      size: 17,
                                                    }),
                                                }),
                                              ],
                                            },
                                            t,
                                          ),
                                        ),
                                      ],
                                    },
                                    g,
                                  ),
                                  (0, N.jsxs)(`div`, {
                                    className: `attempt-actions`,
                                    children: [
                                      (0, N.jsxs)(`button`, {
                                        className: `secondary`,
                                        onClick: () =>
                                          m && g === 0
                                            ? L(`home`)
                                            : _((e) => e - 1),
                                        children: [
                                          (0, N.jsx)(te, { size: 17 }),
                                          m && g === 0
                                            ? translate(`Home`)
                                            : g === 0
                                              ? translate(`Back`)
                                              : translate(`Previous`),
                                        ],
                                      }),
                                      g < u.questions.length - 1
                                        ? (0, N.jsxs)(`button`, {
                                            className: `primary`,
                                            disabled: x[g] === -1,
                                            onClick: () => {
                                              (_((e) => e + 1),
                                                window.scrollTo(0, 0));
                                            },
                                            children: [
                                              translate(`Next`),
                                              (0, N.jsx)(w, { size: 17 }),
                                            ],
                                          })
                                        : (0, N.jsxs)(`button`, {
                                            className: `primary`,
                                            disabled:
                                              c || x.some((e) => e === -1),
                                            onClick: Tn,
                                            children: [
                                              c
                                                ? translate(`Saving result…`)
                                                : translate(`Submit quiz`),
                                              (0, N.jsx)(ce, { size: 17 }),
                                            ],
                                          }),
                                    ],
                                  }),
                                  (0, N.jsxs)(`p`, {
                                    className: `help question-help`,
                                    children: [
                                      translate(
                                        `You can change answers before submitting. `,
                                      ),
                                      !f &&
                                        !m &&
                                        (0, N.jsx)(`button`, {
                                          className: `text-button`,
                                          type: `button`,
                                          onClick: dn,
                                          children: translate(`Start over`),
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                      ],
                    })
                  : e && n === 'account' && !de
                    ? el(AccountPage,{key:v,name:v,profile:profile?.name===v?profile:null,error:profileError,onRetry:()=>setProfileVersion(value=>value+1),onSaved:setProfile,onDirtyChange:setProfileDirty,onPassword:()=>{if(cn()){kt('');jt(true);}},onSignOut:()=>{if(cn())wn();},googleSignIn:el(GoogleSignIn,{onCredential:credential=>finishGoogle(credential,v,true)}),googleError:Ot,googleBusy})
                  : e && n === 'quran' && !de
                    ? el('section',{className:'quran-page'},el('h1',null,translate('Qur’an')),el(QuranReader,{initialSelection:quranSelection}))
                  : e && n === 'study' && !de
                    ? el(StudyPage,{key:v,name:v,revisit:se,onPractice:pn,onClearRevisit:mn,onNavigate:L})
                  : e && n === `homework` && !de
                    ? (0, N.jsxs)(`section`, {
                        className: `homework`,
                        children: [
                          (0, N.jsx)(`h1`, { children: translate(`Homework`) }),
                          (0, N.jsx)(`p`, {
                            className: `homework-intro`,
                            children: translate(
                              `See your teacher’s assignments and prepare for Sunday.`,
                            ),
                          }),
                          (0, N.jsxs)(`div`, {
                            className: `homework-week`,
                            children: [
                              (0, N.jsx)(`button`, {
                                type: `button`,
                                className: `secondary`,
                                disabled: homeworkBusy,
                                onClick: () =>
                                  changeHomeworkWeek(
                                    shiftHomeworkWeek(homeworkWeek, -7),
                                  ),
                                children: translate(`Previous Sunday`),
                              }),
                              el(
                                "div",
                                { className: "homework-date" },
                                el(
                                  "h2",
                                  null,
                                  formatHomeworkWeek(homeworkWeek),
                                ),
                                el(
                                  "label",
                                  null,
                                  translate("Choose a date"),
                                  el("input", {
                                    type: "date",
                                    "aria-label": translate("Choose a date"),
                                    value: homeworkWeek,
                                    disabled: homeworkBusy,
                                    onChange: (event) => {
                                      const week = homeworkSunday(
                                        event.target.value,
                                      );
                                      if (week) changeHomeworkWeek(week);
                                    },
                                  }),
                                ),
                              ),
                              (0, N.jsx)(`button`, {
                                type: `button`,
                                className: `secondary`,
                                disabled: homeworkBusy,
                                onClick: () =>
                                  changeHomeworkWeek(
                                    shiftHomeworkWeek(homeworkWeek, 7),
                                  ),
                                children: translate(`Next Sunday`),
                              }),
                            ],
                          }),
                          el(
                            "p",
                            { className: "help homework-date-help" },
                            translate(
                              "Dates are grouped by Sunday. A different day selects the following Sunday.",
                            ),
                          ),
                          !homeworkReady &&
                            el(
                              "p",
                              { role: "status", className: "help" },
                              translate("Loading homework…"),
                            ),
                          el('nav',{className:'homework-jumps','aria-label':translate('Homework sections')},[['assigned-work-title','Teacher assignments'],['practice-note-title','Your practice note'],['group-notes-title','Group practice notes']].map(([id,label])=>el('a',{key:id,href:'#'+id},translate(label)))),
                          el(TeacherAssignments,{week:homeworkWeek,name:v,onRead:openQuran,onAccount:()=>L('account')}),
                          el('h2',{className:'practice-note-title',id:'practice-note-title'},translate('Your practice note')),
                          el('p',{className:'help'},translate('Add your own preparation note. The group can read it.')),
                          el('div',{className:'quran-homework-picker'},
                            el('button',{className:'secondary',type:'button',disabled:!homeworkReady || homeworkBusy,'aria-expanded':homeworkQuranOpen,'aria-controls':'homework-quran-picker',onClick:()=>setHomeworkQuranOpen(value=>!value)},translate('Choose ayahs from the Qur’an')),
                            homeworkQuranOpen && el('div',{id:'homework-quran-picker'},el(QuranReader,{onAdd:addQuranHomework}))),
                          v.trim()
                            ? (0, N.jsxs)(`form`, {
                                className: `homework-editor`,
                                onSubmit: (e) => {
                                  e.preventDefault();
                                  saveHomework();
                                },
                                children: [
                                  (0, N.jsxs)(`label`, {
                                    htmlFor: `homework-body`,
                                    children: [
                                      translate(`Your practice note`),
                                      (0, N.jsx)(`textarea`, {
                                        id: `homework-body`,
                                        "aria-label": translate("Your practice note"),
                                        dir: `auto`,
                                        maxLength: 500,
                                        disabled:
                                          !homeworkReady || homeworkBusy,
                                        value: homeworkDraft,
                                        placeholder: translate(`Surah and ayahs`),
                                        onChange: (e) =>
                                          setHomeworkDraft(e.target.value),
                                      }),
                                    ],
                                  }),
                                  (0, N.jsx)(`button`, {
                                    className: `primary`,
                                    disabled:
                                      homeworkBusy ||
                                      !homeworkReady ||
                                      (!homeworkDraft.trim() &&
                                        !homeworkEntries.some(
                                          (item) =>
                                            homeworkKey(item.name) ===
                                            homeworkKey(v),
                                        )),
                                    children: homeworkBusy
                                      ? translate(`Saving…`)
                                      : homeworkDraft.trim() ||
                                          !homeworkEntries.some(
                                            (item) =>
                                              homeworkKey(item.name) ===
                                              homeworkKey(v),
                                          )
                                        ? translate(`Save practice note`)
                                        : translate(`Remove my note`),
                                  }),
                                  homeworkReady &&
                                    homeworkPending &&
                                    homeworkLive &&
                                    el(
                                      "p",
                                      { className: "help", role: "status" },
                                      translate(
                                        "You have a note saved on this phone. Save it to share it with the group.",
                                      ),
                                    ),
                                  homeworkReady &&
                                    !homeworkLive &&
                                    (0, N.jsx)(`p`, {
                                      className: `help`,
                                      children: translate(
                                        `The shared list updates when the teacher site can store it. Until then, a change stays on this phone.`,
                                      ),
                                    }),
                                ],
                              })
                            : (0, N.jsx)(`p`, {
                                className: `help`,
                                children: translate(
                                  `Come in with your name to add your homework.`,
                                ),
                              }),
                          homeworkDraft.trim()&&el(ReviewPlanner,{assignment:homeworkDraft,context:homeworkWeek+'|'+v}),
                          el('h2',{className:'group-notes-title',id:'group-notes-title'},translate('Group practice notes')),
                          (0, N.jsx)(`ul`, {
                            className: `homework-list`,
                            children: homeworkEntries.map((item) =>
                              (0, N.jsxs)(
                                `li`,
                                {
                                  className:
                                    homeworkKey(item.name) === homeworkKey(v)
                                      ? "is-own-homework"
                                      : "",
                                  children: [
                                    el(
                                      "strong",
                                      null,
                                      el("bdi", null, item.name),
                                      homeworkKey(item.name) ===
                                        homeworkKey(v) &&
                                        el(
                                          "small",
                                          { className: "homework-own-label" },
                                          translate("Your shared note"),
                                        ),
                                      item.localOnly &&
                                        el(
                                          "small",
                                          { className: "homework-own-label" },
                                          translate("Saved on this phone."),
                                        ),
                                    ),
                                    el('div',{className:'homework-entry-body'},
                                      el('p',{dir:'auto'},el(ReferenceText,{text:item.body})),
                                      ...quranReferences(item.body).map(ref=>el('button',{key:`${ref.surah}:${ref.from}-${ref.to}`,className:'text-button homework-read',type:'button',onClick:()=>openQuran(ref)},translate('Read ayahs'),el('bdi',{dir:'ltr'},`${ref.surah}:${ref.from}–${ref.to}`)))),
                                  ],
                                },
                                homeworkKey(item.name),
                              ),
                            ),
                          }),
                          homeworkReady &&
                            !homeworkEntries.length &&
                            (0, N.jsx)(`p`, {
                              className: `help`,
                              children: translate(
                                `No homework has been saved for this Sunday yet.`,
                              ),
                            }),
                        ],
                      })
                    : e && n === `home` && !de
                    ? (0, N.jsx)(Xe, {
                        data: e,
                        recent: ne,
                        name:v,
                        revisit: se,
                        onPractice: pn,
                        onClearRevisit: mn,
                        onNavigate: L,
                        onStart: un,
                        onCreate: () => hn(),
                      })
                    : e && !e.teacher && n === `leaderboard`
                      ? (0, N.jsx)(Qe, {
                          community: e.community,
                          onNavigate: L,
                        })
                      : e && !e.teacher && n === `moments`
                        ? (0, N.jsx)($e, {
                            community: e.community,
                            onNavigate: L,
                          })
                        : e && de
                          ? (0, N.jsxs)(`section`, {
                              className: `builder`,
                              children: [
                                (0, N.jsxs)(`button`, {
                                  className: `text-button back`,
                                  onClick: () => L(`quizzes`),
                                  children: [
                                    (0, N.jsx)(te, { size: 17 }),
                                    translate(`Back to quizzes`),
                                  ],
                                }),
                                (0, N.jsxs)(`div`, {
                                  className: `page-heading`,
                                  children: [
                                    (0, N.jsx)(`h1`, {
                                      children: D
                                        ? translate(`Edit quiz`)
                                        : translate(`Create a quiz`),
                                    }),
                                    (0, N.jsx)(`span`, {
                                      className: `help`,
                                      children: translate(
                                        `Changes are not saved yet`,
                                      ),
                                    }),
                                  ],
                                }),
                                (0, N.jsx)(`ol`, {
                                  className: `builder-steps`,
                                  "aria-label":
                                    translate(`Quiz creation steps`),
                                  children: [
                                    translate(`Details`),
                                    translate(`Questions`),
                                    translate(`Publish`),
                                  ].map((e, t) =>
                                    (0, N.jsxs)(
                                      `li`,
                                      {
                                        className:
                                          t === k
                                            ? `current`
                                            : t < k
                                              ? `complete`
                                              : ``,
                                        "aria-current":
                                          t === k ? `step` : void 0,
                                        children: [
                                          (0, N.jsx)(`span`, {
                                            children:
                                              t < k
                                                ? (0, N.jsx)(ce, { size: 15 })
                                                : t + 1,
                                          }),
                                          e,
                                        ],
                                      },
                                      e,
                                    ),
                                  ),
                                }),
                                (0, N.jsxs)(`form`, {
                                  onSubmit: (e) => {
                                    if ((e.preventDefault(), k === 0)) ve(1);
                                    else if (k === 1) {
                                      if (!j.every(wt)) {
                                        (xe(j.findIndex((e) => !wt(e))),
                                          a(
                                            translate(
                                              `Complete every question and select its correct answer before continuing.`,
                                            ),
                                          ));
                                        return;
                                      }
                                      ve(2);
                                    } else _n(!0);
                                    window.scrollTo(0, 0);
                                  },
                                  children: [
                                    k === 0
                                      ? (0, N.jsxs)(`div`, {
                                          className: `builder-panel`,
                                          children: [
                                            (0, N.jsx)(`h2`, {
                                              children:
                                                translate(`Quiz details`),
                                            }),
                                            (0, N.jsxs)(`label`, {
                                              htmlFor: `quiz-title`,
                                              children: [
                                                translate(`Quiz title`),
                                                (0, N.jsx)(`input`, {
                                                  id: `quiz-title`,
                                                  autoFocus: !0,
                                                  maxLength: 150,
                                                  value: Ce,
                                                  onChange: (e) =>
                                                    Te(e.target.value),
                                                  placeholder: translate(
                                                    `For example: Everyday Etiquette — Week 2`,
                                                  ),
                                                  required: !0,
                                                }),
                                              ],
                                            }),
                                            (0, N.jsxs)(`label`, {
                                              children: [
                                                translate(
                                                  `Student instructions `,
                                                ),
                                                (0, N.jsx)(`span`, {
                                                  className: `optional`,
                                                  children:
                                                    translate(`Optional`),
                                                }),
                                                (0, N.jsx)(`textarea`, {
                                                  maxLength: 2e3,
                                                  value: De,
                                                  onChange: (e) =>
                                                    ke(e.target.value),
                                                  placeholder: translate(
                                                    `Anything students should know before starting`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        })
                                      : k === 1
                                        ? (0, N.jsxs)(`div`, {
                                            className: `builder-panel`,
                                            children: [
                                              (0, N.jsxs)(`div`, {
                                                className: `question-editor-heading`,
                                                children: [
                                                  (0, N.jsxs)(`h2`, {
                                                    children: [
                                                      translate(`Question `),
                                                      A + 1,
                                                    ],
                                                  }),
                                                  j.length > 1 &&
                                                    (0, N.jsxs)(`button`, {
                                                      className: `text-button danger`,
                                                      type: `button`,
                                                      onClick: () => {
                                                        (Me((e) =>
                                                          e.filter(
                                                            (e, t) => t !== A,
                                                          ),
                                                        ),
                                                          xe((e) =>
                                                            Math.max(0, e - 1),
                                                          ));
                                                      },
                                                      children: [
                                                        (0, N.jsx)(Le, {
                                                          size: 16,
                                                        }),
                                                        translate(
                                                          `Remove question`,
                                                        ),
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              j.length > 1 &&
                                                (0, N.jsx)(`div`, {
                                                  className: `question-picker`,
                                                  "aria-label":
                                                    translate(
                                                      `Select a question`,
                                                    ),
                                                  children: j.map((e, t) =>
                                                    (0, N.jsxs)(
                                                      `button`,
                                                      {
                                                        type: `button`,
                                                        className:
                                                          t === A
                                                            ? `selected`
                                                            : ``,
                                                        "aria-current":
                                                          t === A
                                                            ? `true`
                                                            : void 0,
                                                        onClick: () => xe(t),
                                                        children: [
                                                          t + 1,
                                                          wt(e) &&
                                                            (0, N.jsx)(ce, {
                                                              size: 12,
                                                            }),
                                                        ],
                                                      },
                                                      t,
                                                    ),
                                                  ),
                                                }),
                                              (0, N.jsxs)(`label`, {
                                                htmlFor: `question-text`,
                                                children: [
                                                  translate(`Question`),
                                                  (0, N.jsx)(`textarea`, {
                                                    id: `question-text`,
                                                    dir: `auto`,
                                                    value: j[A].prompt,
                                                    maxLength: 2e3,
                                                    onChange: (e) =>
                                                      gn(A, {
                                                        prompt: e.target.value,
                                                      }),
                                                    placeholder:
                                                      translate(
                                                        `Write your question`,
                                                      ),
                                                    required: !0,
                                                  }),
                                                ],
                                              }),
                                              (0, N.jsxs)(`fieldset`, {
                                                className: `builder-options`,
                                                children: [
                                                  (0, N.jsx)(`legend`, {
                                                    children:
                                                      translate(
                                                        `Answer choices`,
                                                      ),
                                                  }),
                                                  (0, N.jsx)(`p`, {
                                                    className: `help`,
                                                    children: translate(
                                                      `Enter four options and select the correct answer.`,
                                                    ),
                                                  }),
                                                  j[A].options.map((e, t) =>
                                                    (0, N.jsxs)(
                                                      `div`,
                                                      {
                                                        className:
                                                          j[A].correct === t
                                                            ? `is-correct`
                                                            : ``,
                                                        children: [
                                                          (0, N.jsxs)(`label`, {
                                                            className: `correct-selector`,
                                                            children: [
                                                              (0, N.jsx)(
                                                                `input`,
                                                                {
                                                                  type: `radio`,
                                                                  name:
                                                                    `correct-` +
                                                                    A,
                                                                  checked:
                                                                    j[A]
                                                                      .correct ===
                                                                    t,
                                                                  onChange:
                                                                    () =>
                                                                      gn(A, {
                                                                        correct:
                                                                          t,
                                                                      }),
                                                                  required: !0,
                                                                  "aria-label":
                                                                    translate(
                                                                      `Option `,
                                                                    ) +
                                                                    (getLanguage() ===
                                                                    "ar"
                                                                      ? [
                                                                          "أ",
                                                                          "ب",
                                                                          "ج",
                                                                          "د",
                                                                        ]
                                                                      : [
                                                                          "A",
                                                                          "B",
                                                                          "C",
                                                                          "D",
                                                                        ])[t] +
                                                                    translate(
                                                                      ` is correct`,
                                                                    ),
                                                                },
                                                              ),
                                                              (0, N.jsx)(
                                                                `span`,
                                                                {
                                                                  children:
                                                                    (getLanguage() ===
                                                                    "ar"
                                                                      ? [
                                                                          "أ",
                                                                          "ب",
                                                                          "ج",
                                                                          "د",
                                                                        ]
                                                                      : [
                                                                          "A",
                                                                          "B",
                                                                          "C",
                                                                          "D",
                                                                        ])[t],
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, N.jsx)(`input`, {
                                                            "aria-label":
                                                              translate(
                                                                `Answer `,
                                                              ) +
                                                              (getLanguage() ===
                                                              "ar"
                                                                ? [
                                                                    "أ",
                                                                    "ب",
                                                                    "ج",
                                                                    "د",
                                                                  ]
                                                                : [
                                                                    "A",
                                                                    "B",
                                                                    "C",
                                                                    "D",
                                                                  ])[t],
                                                            dir: `auto`,
                                                            value: e,
                                                            maxLength: 500,
                                                            required: !0,
                                                            placeholder:
                                                              translate(
                                                                `Answer `,
                                                              ) +
                                                              (getLanguage() ===
                                                              "ar"
                                                                ? [
                                                                    "أ",
                                                                    "ب",
                                                                    "ج",
                                                                    "د",
                                                                  ]
                                                                : [
                                                                    "A",
                                                                    "B",
                                                                    "C",
                                                                    "D",
                                                                  ])[t],
                                                            onChange: (e) =>
                                                              gn(A, {
                                                                options: j[
                                                                  A
                                                                ].options.map(
                                                                  (n, r) =>
                                                                    r === t
                                                                      ? e.target
                                                                          .value
                                                                      : n,
                                                                ),
                                                              }),
                                                          }),
                                                          j[A].correct === t &&
                                                            (0, N.jsxs)(
                                                              `span`,
                                                              {
                                                                className: `correct-label`,
                                                                children: [
                                                                  (0, N.jsx)(
                                                                    ce,
                                                                    {
                                                                      size: 14,
                                                                    },
                                                                  ),
                                                                  translate(
                                                                    `Correct`,
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                        ],
                                                      },
                                                      t,
                                                    ),
                                                  ),
                                                ],
                                              }),
                                              (0, N.jsxs)(`label`, {
                                                children: [
                                                  translate(
                                                    `Answer explanation `,
                                                  ),
                                                  (0, N.jsx)(`span`, {
                                                    className: `optional`,
                                                    children:
                                                      translate(`Optional`),
                                                  }),
                                                  (0, N.jsx)(`textarea`, {
                                                    dir: `auto`,
                                                    value: j[A].explanation,
                                                    maxLength: 2e3,
                                                    onChange: (e) =>
                                                      gn(A, {
                                                        explanation:
                                                          e.target.value,
                                                      }),
                                                    placeholder: translate(
                                                      `Shown after the quiz is submitted`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              j[A].evidence &&
                                                (0, N.jsxs)(`blockquote`, {
                                                  className: `source-evidence`,
                                                  children: [
                                                    (0, N.jsx)(`b`, {
                                                      children: translate(
                                                        `From your lesson notes`,
                                                      ),
                                                    }),
                                                    (0, N.jsx)(`p`, {
                                                      children: j[A].evidence,
                                                    }),
                                                  ],
                                                }),
                                              (0, N.jsxs)(`button`, {
                                                type: `button`,
                                                className: `secondary add-question`,
                                                disabled:
                                                  j.length >= 50 || !wt(j[A]),
                                                onClick: () => {
                                                  (xe(j.length),
                                                    Me((e) => [...e, St()]));
                                                },
                                                children: [
                                                  (0, N.jsx)(Ee, { size: 17 }),
                                                  translate(
                                                    `Add another question`,
                                                  ),
                                                ],
                                              }),
                                            ],
                                          })
                                        : (0, N.jsxs)(`div`, {
                                            className: `builder-panel review-quiz`,
                                            children: [
                                              (0, N.jsx)(`h2`, {
                                                children:
                                                  translate(`Review your quiz`),
                                              }),
                                              (0, N.jsxs)(`div`, {
                                                className: `quiz-review-title`,
                                                children: [
                                                  (0, N.jsx)(ie, { size: 24 }),
                                                  (0, N.jsxs)(`div`, {
                                                    children: [
                                                      (0, N.jsx)(`h3`, {
                                                        children: Ce,
                                                      }),
                                                      (0, N.jsxs)(`p`, {
                                                        children: [
                                                          j.length,
                                                          translate(
                                                            ` questions · `,
                                                          ),
                                                          j.length,
                                                          translate(` points`),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              De &&
                                                (0, N.jsx)(`p`, {
                                                  children: De,
                                                }),
                                              (0, N.jsx)(`p`, {
                                                children: translate(
                                                  `Publishing makes this quiz available to anyone with its student link.`,
                                                ),
                                              }),
                                              (0, N.jsx)(`h3`, {
                                                children: translate(
                                                  `Questions and correct answers`,
                                                ),
                                              }),
                                              j.map((e, t) =>
                                                (0, N.jsxs)(
                                                  `div`,
                                                  {
                                                    className: `review-question`,
                                                    children: [
                                                      (0, N.jsxs)(`b`, {
                                                        children: [
                                                          t + 1,
                                                          `. `,
                                                          e.prompt,
                                                        ],
                                                      }),
                                                      (0, N.jsxs)(`p`, {
                                                        dir: `auto`,
                                                        children: [
                                                          (0, N.jsx)(ce, {
                                                            size: 15,
                                                          }),
                                                          e.options[e.correct],
                                                        ],
                                                      }),
                                                      (0, N.jsxs)(`button`, {
                                                        type: `button`,
                                                        className: `text-button`,
                                                        onClick: () => {
                                                          (xe(t), ve(1));
                                                        },
                                                        children: [
                                                          translate(
                                                            `Edit question `,
                                                          ),
                                                          t + 1,
                                                        ],
                                                      }),
                                                    ],
                                                  },
                                                  t,
                                                ),
                                              ),
                                              $t &&
                                                (0, N.jsxs)(`label`, {
                                                  className: `review-approval`,
                                                  children: [
                                                    (0, N.jsx)(`input`, {
                                                      type: `checkbox`,
                                                      checked: tn,
                                                      onChange: (e) =>
                                                        nn(e.target.checked),
                                                      required: !0,
                                                    }),
                                                    translate(
                                                      `I have reviewed the AI questions and correct answers.`,
                                                    ),
                                                  ],
                                                }),
                                            ],
                                          }),
                                    (0, N.jsxs)(`div`, {
                                      className: `builder-footer`,
                                      children: [
                                        (0, N.jsxs)(`div`, {
                                          children: [
                                            k > 0 &&
                                              (0, N.jsxs)(`button`, {
                                                type: `button`,
                                                className: `secondary`,
                                                onClick: () => ve((e) => e - 1),
                                                children: [
                                                  (0, N.jsx)(te, { size: 17 }),
                                                  translate(`Back`),
                                                ],
                                              }),
                                            (0, N.jsxs)(`button`, {
                                              type: `button`,
                                              className: `text-button`,
                                              disabled: c || !Nn,
                                              onClick: () => _n(!1),
                                              children: [
                                                (0, N.jsx)(Ae, { size: 16 }),
                                                translate(`Save draft`),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, N.jsxs)(`button`, {
                                          className: `primary`,
                                          disabled: c,
                                          children: [
                                            c
                                              ? translate(`Saving…`)
                                              : k === 0
                                                ? translate(
                                                    `Next: add questions`,
                                                  )
                                                : k === 1
                                                  ? translate(
                                                      `Next: review quiz`,
                                                    )
                                                  : translate(`Publish quiz`),
                                            k === 2
                                              ? (0, N.jsx)(Ne, { size: 17 })
                                              : (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    !Nn &&
                                      (0, N.jsx)(`p`, {
                                        className: `help draft-help`,
                                        children: translate(
                                          `A draft needs a title and at least one complete question to save.`,
                                        ),
                                      }),
                                  ],
                                }),
                              ],
                            })
                          : e && e.teacher && n === `ai`
                            ? (0, N.jsxs)(`section`, {
                                className: `ai-drafter`,
                                children: [
                                  (0, N.jsxs)(`button`, {
                                    className: `text-button back`,
                                    onClick: () => L(`quizzes`),
                                    children: [
                                      (0, N.jsx)(te, { size: 17 }),
                                      translate(`Back to quizzes`),
                                    ],
                                  }),
                                  (0, N.jsx)(`h1`, {
                                    children: translate(`Draft a quiz with AI`),
                                  }),
                                  (0, N.jsx)(`p`, {
                                    children: translate(
                                      `Paste a transcript or detailed teaching notes. AI will draft challenging questions with plausible answer choices for you to review.`,
                                    ),
                                  }),
                                  !e.aiConfigured &&
                                    (0, N.jsxs)(`div`, {
                                      className: `ai-setup`,
                                      children: [
                                        (0, N.jsx)(be, { size: 20 }),
                                        (0, N.jsxs)(`div`, {
                                          children: [
                                            (0, N.jsx)(`h2`, {
                                              children: translate(
                                                `Connect Gemini to use AI`,
                                              ),
                                            }),
                                            (0, N.jsx)(`p`, {
                                              children: translate(
                                                `The integration is ready, but no server API key is connected. Manual quizzes and automatic grading already work.`,
                                              ),
                                            }),
                                            (0, N.jsxs)(`p`, {
                                              children: [
                                                translate(`Set `),
                                                (0, N.jsx)(`code`, {
                                                  children: `GEMINI_API_KEY`,
                                                }),
                                                translate(
                                                  ` as a secret in this site’s server settings, then redeploy. Keep the key out of student links and public code.`,
                                                ),
                                              ],
                                            }),
                                            (0, N.jsxs)(`a`, {
                                              href: `https://aistudio.google.com/apikey`,
                                              target: `_blank`,
                                              rel: `noreferrer`,
                                              children: [
                                                translate(
                                                  `Open Google AI Studio`,
                                                ),
                                                (0, N.jsx)(w, { size: 15 }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  (0, N.jsxs)(`form`, {
                                    onSubmit: (e) => {
                                      (e.preventDefault(), Ln());
                                    },
                                    children: [
                                      (0, N.jsxs)(`label`, {
                                        children: [
                                          translate(`Lesson title`),
                                          (0, N.jsx)(`input`, {
                                            value: Ut,
                                            maxLength: 150,
                                            onChange: (e) => Wt(e.target.value),
                                            placeholder: translate(
                                              `For example: Etiquette of eating`,
                                            ),
                                            required: !0,
                                          }),
                                        ],
                                      }),
                                      (0, N.jsxs)(`fieldset`, {
                                        className: `choice-group`,
                                        children: [
                                          (0, N.jsx)(`legend`, {
                                            children: translate(`Halaqah`),
                                          }),
                                          (0, N.jsx)(`div`, {
                                            children: [
                                              {
                                                id: `saturday`,
                                                label: translate(`Saturday`),
                                                detail:
                                                  translate(`Core lesson`),
                                              },
                                              {
                                                id: `tuesday`,
                                                label: translate(`Tuesday`),
                                                detail:
                                                  translate(
                                                    `Optional practice`,
                                                  ),
                                              },
                                            ].map((e) =>
                                              (0, N.jsxs)(
                                                `label`,
                                                {
                                                  className:
                                                    qt === e.id
                                                      ? `selected`
                                                      : ``,
                                                  children: [
                                                    (0, N.jsx)(`input`, {
                                                      type: `radio`,
                                                      name: `session`,
                                                      checked: qt === e.id,
                                                      onChange: () => Jt(e.id),
                                                    }),
                                                    (0, N.jsx)(`b`, {
                                                      children: e.label,
                                                    }),
                                                    (0, N.jsx)(`small`, {
                                                      children: e.detail,
                                                    }),
                                                  ],
                                                },
                                                e.id,
                                              ),
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, N.jsxs)(`label`, {
                                        children: [
                                          translate(
                                            `Transcript or detailed teaching notes`,
                                          ),
                                          (0, N.jsx)(`textarea`, {
                                            rows: 10,
                                            minLength: 100,
                                            maxLength: 3e4,
                                            value: Gt,
                                            onChange: (e) => Kt(e.target.value),
                                            placeholder: translate(
                                              `Paste what was taught, including the key facts and explanations. For topic-only input, add your intended teaching points.`,
                                            ),
                                            required: !0,
                                          }),
                                        ],
                                      }),
                                      (0, N.jsx)(`p`, {
                                        className: `help`,
                                        children: translate(
                                          `100–30,000 characters. Each correct answer must be supported by an excerpt from these notes. Your notes are sent to Gemini when you generate.`,
                                        ),
                                      }),
                                      (0, N.jsxs)(`fieldset`, {
                                        className: `choice-group`,
                                        children: [
                                          (0, N.jsx)(`legend`, {
                                            children:
                                              translate(`Number of questions`),
                                          }),
                                          (0, N.jsx)(`div`, {
                                            children: [5, 10, 15].map((e) =>
                                              (0, N.jsxs)(
                                                `label`,
                                                {
                                                  className:
                                                    Yt === e ? `selected` : ``,
                                                  children: [
                                                    (0, N.jsx)(`input`, {
                                                      type: `radio`,
                                                      name: `count`,
                                                      checked: Yt === e,
                                                      onChange: () => Xt(e),
                                                    }),
                                                    (0, N.jsx)(`b`, {
                                                      children: e,
                                                    }),
                                                  ],
                                                },
                                                e,
                                              ),
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, N.jsxs)(`p`, {
                                        className: `info-note`,
                                        children: [
                                          (0, N.jsx)(ue, { size: 17 }),
                                          translate(
                                            `AI drafts are checked for evidence and ambiguity. You review the answers before publishing.`,
                                          ),
                                        ],
                                      }),
                                      (0, N.jsxs)(`button`, {
                                        className: `primary`,
                                        disabled: c || !e.aiConfigured,
                                        children: [
                                          c
                                            ? translate(
                                                `Drafting and checking questions…`,
                                              )
                                            : translate(`Generate quiz draft`),
                                          (0, N.jsx)(Fe, { size: 17 }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : e && e.teacher && n === `manage` && F
                              ? (0, N.jsxs)(`section`, {
                                  className: `quiz-settings`,
                                  children: [
                                    (0, N.jsxs)(`button`, {
                                      className: `text-button back`,
                                      onClick: () => L(`quizzes`),
                                      children: [
                                        (0, N.jsx)(te, { size: 17 }),
                                        translate(`Back to quizzes`),
                                      ],
                                    }),
                                    (0, N.jsx)(`h1`, { children: F.title }),
                                    (0, N.jsxs)(`p`, {
                                      className: `help`,
                                      children: [
                                        F.questions.length,
                                        translate(` questions · `),
                                        F.published
                                          ? translate(`Published`)
                                          : translate(`Not published`),
                                      ],
                                    }),
                                    F.published &&
                                      (0, N.jsxs)(`button`, {
                                        className: `primary`,
                                        onClick: () =>
                                          vn(
                                            (e?.publicSiteUrl ||
                                              location.origin + `/`) +
                                              `?quiz=` +
                                              encodeURIComponent(F.id),
                                          ),
                                        children: [
                                          (0, N.jsx)(me, { size: 16 }),
                                          translate(`Copy student link`),
                                        ],
                                      }),
                                    (0, N.jsxs)(`div`, {
                                      className: `manage-action-list`,
                                      children: [
                                        (0, N.jsxs)(`button`, {
                                          onClick: () => un(F, !0),
                                          children: [
                                            (0, N.jsx)(O, { size: 21 }),
                                            (0, N.jsxs)(`span`, {
                                              children: [
                                                (0, N.jsx)(`b`, {
                                                  children:
                                                    translate(`Preview quiz`),
                                                }),
                                                (0, N.jsx)(`small`, {
                                                  children: translate(
                                                    `Try the quiz without saving a grade.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                        (0, N.jsxs)(`button`, {
                                          onClick: () => yn(F),
                                          children: [
                                            (0, N.jsx)(E, { size: 21 }),
                                            (0, N.jsxs)(`span`, {
                                              children: [
                                                (0, N.jsx)(`b`, {
                                                  children:
                                                    translate(`View results`),
                                                }),
                                                (0, N.jsx)(`small`, {
                                                  children: translate(
                                                    `See automatically graded submissions.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                        (0, N.jsxs)(`button`, {
                                          onClick: () => hn(F),
                                          children: [
                                            (0, N.jsx)(me, { size: 21 }),
                                            (0, N.jsxs)(`span`, {
                                              children: [
                                                (0, N.jsx)(`b`, {
                                                  children:
                                                    translate(`Make a copy`),
                                                }),
                                                (0, N.jsx)(`small`, {
                                                  children: translate(
                                                    `Create a new version and keep existing results.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                        F.published &&
                                          (0, N.jsxs)(`button`, {
                                            disabled: c,
                                            onClick: () =>
                                              sn(async () => {
                                                (await I(
                                                  `/api/quizzes`,
                                                  `PATCH`,
                                                  { id: F.id, published: !1 },
                                                ),
                                                  await rn(),
                                                  ln(`quizzes`),
                                                  s(
                                                    translate(
                                                      `Quiz closed. Existing results are kept.`,
                                                    ),
                                                  ));
                                              }),
                                            children: [
                                              (0, N.jsx)(Ve, { size: 21 }),
                                              (0, N.jsxs)(`span`, {
                                                children: [
                                                  (0, N.jsx)(`b`, {
                                                    children:
                                                      translate(`Close quiz`),
                                                  }),
                                                  (0, N.jsx)(`small`, {
                                                    children: translate(
                                                      `Stop accepting new submissions.`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              (0, N.jsx)(w, { size: 17 }),
                                            ],
                                          }),
                                        (0, N.jsxs)(`button`, {
                                          className: `danger`,
                                          disabled: c,
                                          onClick: () => bn(F),
                                          children: [
                                            (0, N.jsx)(Le, { size: 21 }),
                                            (0, N.jsxs)(`span`, {
                                              children: [
                                                (0, N.jsx)(`b`, {
                                                  children:
                                                    translate(`Delete quiz`),
                                                }),
                                                (0, N.jsx)(`small`, {
                                                  children: translate(
                                                    `Remove this quiz and its saved submissions.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, N.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                })
                              : e && n === `quizzes`
                                ? (0, N.jsxs)(N.Fragment, {
                                    children: [
                                      (0, N.jsxs)(`div`, {
                                        className: `page-heading`,
                                        children: [
                                          (0, N.jsxs)(`div`, {
                                            children: [
                                              (0, N.jsx)(`h1`, {
                                                children: e.teacher
                                                  ? translate(`Quizzes`)
                                                  : translate(`Take a quiz`),
                                              }),
                                              (0, N.jsx)(`p`, {
                                                children: e.teacher
                                                  ? translate(
                                                      `Create a quiz, publish it, then share the student link.`,
                                                    )
                                                  : translate(
                                                      `Choose a quiz below. This phone already has your name.`,
                                                    ),
                                              }),
                                            ],
                                          }),
                                          e.teacher &&
                                            (0, N.jsxs)(`div`, {
                                              className: `heading-actions`,
                                              children: [
                                                (0, N.jsxs)(`button`, {
                                                  className: `secondary`,
                                                  onClick: () => L(`ai`),
                                                  children: [
                                                    (0, N.jsx)(Fe, {
                                                      size: 17,
                                                    }),
                                                    translate(`Draft with AI`),
                                                  ],
                                                }),
                                                (0, N.jsxs)(`button`, {
                                                  className: `primary`,
                                                  onClick: () => hn(),
                                                  children: [
                                                    (0, N.jsx)(Ee, {
                                                      size: 18,
                                                    }),
                                                    translate(`Create quiz`),
                                                  ],
                                                }),
                                              ],
                                            }),
                                        ],
                                      }),
                                      e.teacher
                                        ? (0, N.jsxs)(N.Fragment, {
                                            children: [
                                              (0, N.jsxs)(`div`, {
                                                className: `quiz-tools`,
                                                children: [
                                                  (0, N.jsx)(`div`, {
                                                    className: `filter-tabs`,
                                                    "aria-label":
                                                      translate(
                                                        `Filter quizzes`,
                                                      ),
                                                    children: [
                                                      {
                                                        id: `all`,
                                                        label: translate(`All`),
                                                        n: En.length,
                                                      },
                                                      {
                                                        id: `published`,
                                                        label:
                                                          translate(
                                                            `Published`,
                                                          ),
                                                        n: Dn.length,
                                                      },
                                                      {
                                                        id: `draft`,
                                                        label:
                                                          translate(
                                                            `Drafts & closed`,
                                                          ),
                                                        n: On.length,
                                                      },
                                                    ].map((e) =>
                                                      (0, N.jsxs)(
                                                        `button`,
                                                        {
                                                          className:
                                                            It === e.id
                                                              ? `selected`
                                                              : ``,
                                                          "aria-pressed":
                                                            It === e.id,
                                                          onClick: () =>
                                                            Lt(e.id),
                                                          children: [
                                                            e.label,
                                                            (0, N.jsx)(`span`, {
                                                              children: e.n,
                                                            }),
                                                          ],
                                                        },
                                                        e.id,
                                                      ),
                                                    ),
                                                  }),
                                                  En.length > 3 &&
                                                    (0, N.jsxs)(`label`, {
                                                      className: `search-field`,
                                                      children: [
                                                        (0, N.jsx)(je, {
                                                          size: 17,
                                                        }),
                                                        (0, N.jsx)(`span`, {
                                                          className: `sr-only`,
                                                          children:
                                                            translate(
                                                              `Search quizzes`,
                                                            ),
                                                        }),
                                                        (0, N.jsx)(`input`, {
                                                          placeholder:
                                                            translate(
                                                              `Search quizzes`,
                                                            ),
                                                          value: Pt,
                                                          onChange: (e) =>
                                                            Ft(e.target.value),
                                                        }),
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              (0, N.jsxs)(`div`, {
                                                className: `quiz-management`,
                                                children: [
                                                  kn.map((t) => {
                                                    let n =
                                                        e.submissions.filter(
                                                          (e) =>
                                                            e.quiz_id === t.id,
                                                        ).length,
                                                      r = !t.published && n > 0;
                                                    return (0, N.jsxs)(
                                                      `article`,
                                                      {
                                                        className: `manage-quiz`,
                                                        children: [
                                                          (0, N.jsxs)(`div`, {
                                                            className: `manage-quiz-copy`,
                                                            children: [
                                                              (0, N.jsx)(
                                                                `span`,
                                                                {
                                                                  className:
                                                                    `status ` +
                                                                    (t.published
                                                                      ? `published`
                                                                      : r
                                                                        ? `closed`
                                                                        : `draft`),
                                                                  children:
                                                                    t.published
                                                                      ? translate(
                                                                          `Published`,
                                                                        )
                                                                      : r
                                                                        ? translate(
                                                                            `Closed`,
                                                                          )
                                                                        : translate(
                                                                            `Draft`,
                                                                          ),
                                                                },
                                                              ),
                                                              (0, N.jsx)(`h2`, {
                                                                children:
                                                                  t.title,
                                                              }),
                                                              (0, N.jsxs)(`p`, {
                                                                children: [
                                                                  t.questions
                                                                    .length,
                                                                  translate(
                                                                    ` questions · `,
                                                                  ),
                                                                  n,
                                                                  ` `,
                                                                  n === 1
                                                                    ? translate(
                                                                        `submission`,
                                                                      )
                                                                    : translate(
                                                                        `submissions`,
                                                                      ),
                                                                ],
                                                              }),
                                                            ],
                                                          }),
                                                          (0, N.jsxs)(`div`, {
                                                            className: `quiz-actions`,
                                                            children: [
                                                              t.published
                                                                ? (0, N.jsxs)(
                                                                    N.Fragment,
                                                                    {
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          N.jsxs)(
                                                                            `button`,
                                                                            {
                                                                              className: `primary`,
                                                                              onClick:
                                                                                () =>
                                                                                  vn(
                                                                                    (e?.publicSiteUrl ||
                                                                                      location.origin +
                                                                                        `/`) +
                                                                                      `?quiz=` +
                                                                                      encodeURIComponent(
                                                                                        t.id,
                                                                                      ),
                                                                                  ),
                                                                              children:
                                                                                [
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                    me,
                                                                                    {
                                                                                      size: 16,
                                                                                    },
                                                                                  ),
                                                                                  translate(
                                                                                    `Copy student link`,
                                                                                  ),
                                                                                ],
                                                                            },
                                                                          ),
                                                                          (0,
                                                                          N.jsx)(
                                                                            `button`,
                                                                            {
                                                                              className: `secondary`,
                                                                              onClick:
                                                                                () =>
                                                                                  yn(
                                                                                    t,
                                                                                  ),
                                                                              children:
                                                                                translate(
                                                                                  `View results`,
                                                                                ),
                                                                            },
                                                                          ),
                                                                        ],
                                                                    },
                                                                  )
                                                                : (0, N.jsxs)(
                                                                    N.Fragment,
                                                                    {
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          N.jsx)(
                                                                            `button`,
                                                                            {
                                                                              className: `primary`,
                                                                              onClick:
                                                                                () =>
                                                                                  r
                                                                                    ? hn(
                                                                                        t,
                                                                                      )
                                                                                    : hn(
                                                                                        t,
                                                                                        !0,
                                                                                      ),
                                                                              children:
                                                                                r
                                                                                  ? translate(
                                                                                      `Make a copy`,
                                                                                    )
                                                                                  : translate(
                                                                                      `Edit quiz`,
                                                                                    ),
                                                                            },
                                                                          ),
                                                                          (0,
                                                                          N.jsx)(
                                                                            `button`,
                                                                            {
                                                                              className: `secondary`,
                                                                              disabled:
                                                                                c,
                                                                              onClick:
                                                                                () =>
                                                                                  r
                                                                                    ? sn(
                                                                                        async () => {
                                                                                          (await I(
                                                                                            `/api/quizzes`,
                                                                                            `PATCH`,
                                                                                            {
                                                                                              id: t.id,
                                                                                              published:
                                                                                                !0,
                                                                                            },
                                                                                          ),
                                                                                            await rn(),
                                                                                            s(
                                                                                              translate(
                                                                                                `Quiz reopened. Copy its student link to share it.`,
                                                                                              ),
                                                                                            ),
                                                                                            Nt(
                                                                                              (e?.publicSiteUrl ||
                                                                                                location.origin +
                                                                                                  `/`) +
                                                                                                `?quiz=` +
                                                                                                encodeURIComponent(
                                                                                                  t.id,
                                                                                                ),
                                                                                            ));
                                                                                        },
                                                                                      )
                                                                                    : hn(
                                                                                        t,
                                                                                        !0,
                                                                                        !0,
                                                                                      ),
                                                                              children:
                                                                                r
                                                                                  ? translate(
                                                                                      `Reopen`,
                                                                                    )
                                                                                  : translate(
                                                                                      `Review & publish`,
                                                                                    ),
                                                                            },
                                                                          ),
                                                                        ],
                                                                    },
                                                                  ),
                                                              (0, N.jsxs)(
                                                                `button`,
                                                                {
                                                                  className: `text-button`,
                                                                  onClick:
                                                                    () => {
                                                                      (Ht(t),
                                                                        ln(
                                                                          `manage`,
                                                                        ));
                                                                    },
                                                                  children: [
                                                                    translate(
                                                                      `Manage quiz`,
                                                                    ),
                                                                    (0, N.jsx)(
                                                                      w,
                                                                      {
                                                                        size: 14,
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                              (0, N.jsxs)(
                                                                `button`,
                                                                {
                                                                  className: `text-button danger`,
                                                                  disabled: c,
                                                                  onClick: () =>
                                                                    bn(t),
                                                                  children: [
                                                                    (0, N.jsx)(
                                                                      Le,
                                                                      {
                                                                        size: 14,
                                                                      },
                                                                    ),
                                                                    translate(
                                                                      `Delete`,
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      t.id,
                                                    );
                                                  }),
                                                  !kn.length &&
                                                    (0, N.jsxs)(`div`, {
                                                      className: `empty-state`,
                                                      children: [
                                                        (0, N.jsx)(`h2`, {
                                                          children: En.length
                                                            ? translate(
                                                                `No quizzes match this filter`,
                                                              )
                                                            : translate(
                                                                `Create your first quiz`,
                                                              ),
                                                        }),
                                                        (0, N.jsx)(`p`, {
                                                          children: En.length
                                                            ? translate(
                                                                `Choose another filter to see your quizzes.`,
                                                              )
                                                            : translate(
                                                                `Add questions, choose the correct answers, then publish.`,
                                                              ),
                                                        }),
                                                        !En.length &&
                                                          (0, N.jsxs)(
                                                            `button`,
                                                            {
                                                              className: `primary`,
                                                              onClick: () =>
                                                                hn(),
                                                              children: [
                                                                (0, N.jsx)(Ee, {
                                                                  size: 17,
                                                                }),
                                                                translate(
                                                                  `Create quiz`,
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              !En.length &&
                                                !e.records.length &&
                                                (0, N.jsx)(`button`, {
                                                  className: `text-button`,
                                                  disabled: c,
                                                  onClick: () =>
                                                    sn(async () => {
                                                      (await I(
                                                        `/api/setup`,
                                                        `POST`,
                                                        {},
                                                      ),
                                                        await rn(),
                                                        s(
                                                          translate(
                                                            `Original quiz grades and practice draft loaded.`,
                                                          ),
                                                        ));
                                                    }),
                                                  children: translate(
                                                    `Load the group’s original quiz and grades`,
                                                  ),
                                                }),
                                              (0, N.jsxs)(`p`, {
                                                className: `help library-help`,
                                                children: [
                                                  (0, N.jsx)(be, { size: 14 }),
                                                  translate(
                                                    `You’re viewing teacher controls. Student links open the quiz directly. Home, leaderboards and published funny answers are public.`,
                                                  ),
                                                ],
                                              }),
                                            ],
                                          })
                                        : (0, N.jsxs)(N.Fragment, {
                                            children: [
                                              (0, N.jsx)(`div`, {
                                                className: `student-quizzes`,
                                                children: Dn.map((e) =>
                                                  (0, N.jsxs)(
                                                    `article`,
                                                    {
                                                      className: `student-quiz`,
                                                      children: [
                                                        (0, N.jsxs)(`div`, {
                                                          children: [
                                                            (0, N.jsx)(`h2`, {
                                                              children: e.title,
                                                            }),
                                                            e.description &&
                                                              (0, N.jsx)(`p`, {
                                                                children:
                                                                  e.description,
                                                              }),
                                                            (0, N.jsxs)(
                                                              `span`,
                                                              {
                                                                className: `help`,
                                                                children: [
                                                                  e.questions
                                                                    .length,
                                                                  translate(
                                                                    ` questions · no time limit`,
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                          ],
                                                        }),
                                                        (0, N.jsxs)(`button`, {
                                                          className: `primary`,
                                                          onClick: () => un(e),
                                                          children: [
                                                            translate(
                                                              `Start quiz`,
                                                            ),
                                                            (0, N.jsx)(w, {
                                                              size: 17,
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    e.id,
                                                  ),
                                                ),
                                              }),
                                              !Dn.length &&
                                                (0, N.jsxs)(`div`, {
                                                  className: `empty-state`,
                                                  children: [
                                                    (0, N.jsx)(ie, {
                                                      size: 30,
                                                    }),
                                                    (0, N.jsx)(`h2`, {
                                                      children: translate(
                                                        `No quizzes are available yet`,
                                                      ),
                                                    }),
                                                    (0, N.jsx)(`p`, {
                                                      children: translate(
                                                        `Your teacher will share the next quiz here.`,
                                                      ),
                                                    }),
                                                    (0, N.jsxs)(`button`, {
                                                      className: `primary`,
                                                      onClick: () => L(`home`),
                                                      children: [
                                                        translate(`Back home`),
                                                        (0, N.jsx)(w, {
                                                          size: 17,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ne &&
                                                (0, N.jsxs)(`div`, {
                                                  className: `recent-result`,
                                                  children: [
                                                    (0, N.jsx)(ue, {
                                                      size: 22,
                                                    }),
                                                    (0, N.jsxs)(`div`, {
                                                      children: [
                                                        (0, N.jsxs)(`b`, {
                                                          children: [
                                                            translate(
                                                              `Your latest result: `,
                                                            ),
                                                            ne.score,
                                                            `/`,
                                                            ne.max,
                                                          ],
                                                        }),
                                                        (0, N.jsxs)(`p`, {
                                                          children: [
                                                            ne.title,
                                                            ` · `,
                                                            ne.name,
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                            ],
                                          }),
                                    ],
                                  })
                                : e && e.teacher && n === `grades`
                                  ? (0, N.jsxs)(N.Fragment, {
                                      children: [
                                        (0, N.jsx)(`div`, {
                                          className: `page-heading`,
                                          children: (0, N.jsxs)(`div`, {
                                            children: [
                                              (0, N.jsx)(`h1`, {
                                                children: translate(`Grades`),
                                              }),
                                              (0, N.jsx)(`p`, {
                                                children: translate(
                                                  `Select a quiz to enter paper grades or view online submissions.`,
                                                ),
                                              }),
                                            ],
                                          }),
                                        }),
                                        In(`grade-quiz`),
                                        Pe === xt
                                          ? (0, N.jsxs)(`form`, {
                                              onSubmit: (e) => {
                                                (e.preventDefault(),
                                                  sn(async () => {
                                                    (await I(
                                                      `/api/records`,
                                                      `POST`,
                                                      {
                                                        records: Re.map(
                                                          (e) => ({
                                                            ...e,
                                                            regular: Number(
                                                              e.regular,
                                                            ),
                                                            bonus: Number(
                                                              e.bonus,
                                                            ),
                                                          }),
                                                        ),
                                                      },
                                                    ),
                                                      await rn(),
                                                      He(!1),
                                                      s(
                                                        translate(
                                                          `All grades saved. The leaderboard is updated.`,
                                                        ),
                                                      ));
                                                  }));
                                              },
                                              children: [
                                                (0, N.jsxs)(`div`, {
                                                  className: `grade-instructions`,
                                                  children: [
                                                    (0, N.jsxs)(`p`, {
                                                      children: [
                                                        (0, N.jsx)(`b`, {
                                                          children: translate(
                                                            `Original etiquette quiz`,
                                                          ),
                                                        }),
                                                        translate(
                                                          ` · 13 regular points + 1 optional bonus.`,
                                                        ),
                                                      ],
                                                    }),
                                                    (0, N.jsxs)(`p`, {
                                                      children: [
                                                        translate(
                                                          `Change a score below, then select `,
                                                        ),
                                                        (0, N.jsx)(`b`, {
                                                          children:
                                                            translate(
                                                              `Save all grades`,
                                                            ),
                                                        }),
                                                        `.`,
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, N.jsxs)(`div`, {
                                                  className: `grade-list`,
                                                  children: [
                                                    (0, N.jsxs)(`div`, {
                                                      className: `grade-list-heading`,
                                                      "aria-hidden": `true`,
                                                      children: [
                                                        (0, N.jsx)(`span`, {
                                                          children:
                                                            translate(
                                                              `Student`,
                                                            ),
                                                        }),
                                                        (0, N.jsx)(`span`, {
                                                          children:
                                                            translate(
                                                              `Regular /13`,
                                                            ),
                                                        }),
                                                        (0, N.jsx)(`span`, {
                                                          children:
                                                            translate(
                                                              `Bonus /1`,
                                                            ),
                                                        }),
                                                        (0, N.jsx)(`span`, {
                                                          children:
                                                            translate(`Total`),
                                                        }),
                                                      ],
                                                    }),
                                                    Re.map((e, t) =>
                                                      (0, N.jsxs)(
                                                        `div`,
                                                        {
                                                          className: `grade-row`,
                                                          children: [
                                                            (0, N.jsx)(`b`, {
                                                              className: `grade-name`,
                                                              children: e.name,
                                                            }),
                                                            (0, N.jsxs)(
                                                              `label`,
                                                              {
                                                                children: [
                                                                  (0, N.jsx)(
                                                                    `span`,
                                                                    {
                                                                      children:
                                                                        translate(
                                                                          `Regular /13`,
                                                                        ),
                                                                    },
                                                                  ),
                                                                  (0, N.jsx)(
                                                                    `input`,
                                                                    {
                                                                      "aria-label":
                                                                        translate(
                                                                          `Regular grade for `,
                                                                        ) +
                                                                        e.name,
                                                                      type: `number`,
                                                                      inputMode: `numeric`,
                                                                      min: 0,
                                                                      max: 13,
                                                                      step: 1,
                                                                      required:
                                                                        !0,
                                                                      value:
                                                                        e.regular,
                                                                      onChange:
                                                                        (e) => {
                                                                          (Be(
                                                                            (
                                                                              n,
                                                                            ) =>
                                                                              n.map(
                                                                                (
                                                                                  n,
                                                                                  r,
                                                                                ) =>
                                                                                  r ===
                                                                                  t
                                                                                    ? {
                                                                                        ...n,
                                                                                        regular:
                                                                                          e
                                                                                            .target
                                                                                            .value,
                                                                                      }
                                                                                    : n,
                                                                              ),
                                                                          ),
                                                                            He(
                                                                              !0,
                                                                            ));
                                                                        },
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                            (0, N.jsxs)(
                                                              `label`,
                                                              {
                                                                children: [
                                                                  (0, N.jsx)(
                                                                    `span`,
                                                                    {
                                                                      children:
                                                                        translate(
                                                                          `Bonus /1`,
                                                                        ),
                                                                    },
                                                                  ),
                                                                  (0, N.jsx)(
                                                                    `input`,
                                                                    {
                                                                      "aria-label":
                                                                        translate(
                                                                          `Bonus grade for `,
                                                                        ) +
                                                                        e.name,
                                                                      type: `number`,
                                                                      inputMode: `numeric`,
                                                                      min: 0,
                                                                      max: 1,
                                                                      step: 1,
                                                                      required:
                                                                        !0,
                                                                      value:
                                                                        e.bonus,
                                                                      onChange:
                                                                        (e) => {
                                                                          (Be(
                                                                            (
                                                                              n,
                                                                            ) =>
                                                                              n.map(
                                                                                (
                                                                                  n,
                                                                                  r,
                                                                                ) =>
                                                                                  r ===
                                                                                  t
                                                                                    ? {
                                                                                        ...n,
                                                                                        bonus:
                                                                                          e
                                                                                            .target
                                                                                            .value,
                                                                                      }
                                                                                    : n,
                                                                              ),
                                                                          ),
                                                                            He(
                                                                              !0,
                                                                            ));
                                                                        },
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                            (0, N.jsxs)(
                                                              `strong`,
                                                              {
                                                                className: `grade-total`,
                                                                children: [
                                                                  (0, N.jsx)(
                                                                    `span`,
                                                                    {
                                                                      children:
                                                                        translate(
                                                                          `Total`,
                                                                        ),
                                                                    },
                                                                  ),
                                                                  Number(
                                                                    e.regular,
                                                                  ) +
                                                                    Number(
                                                                      e.bonus,
                                                                    ),
                                                                  (0, N.jsx)(
                                                                    `small`,
                                                                    {
                                                                      children: `/13`,
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                          ],
                                                        },
                                                        e.id,
                                                      ),
                                                    ),
                                                  ],
                                                }),
                                                !Re.length &&
                                                  (0, N.jsxs)(`div`, {
                                                    className: `empty-state`,
                                                    children: [
                                                      (0, N.jsx)(`h2`, {
                                                        children:
                                                          translate(
                                                            `No paper grades yet`,
                                                          ),
                                                      }),
                                                      (0, N.jsx)(`p`, {
                                                        children: translate(
                                                          `Load the original quiz from Quizzes to start.`,
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                (0, N.jsxs)(`div`, {
                                                  className: `grade-savebar`,
                                                  children: [
                                                    (0, N.jsx)(`span`, {
                                                      children: M
                                                        ? translate(
                                                            `You have unsaved changes.`,
                                                          )
                                                        : translate(
                                                            `Grades are up to date.`,
                                                          ),
                                                    }),
                                                    (0, N.jsxs)(`button`, {
                                                      className: `primary`,
                                                      disabled:
                                                        c || !M || !Re.length,
                                                      children: [
                                                        c
                                                          ? translate(`Saving…`)
                                                          : translate(
                                                              `Save all grades`,
                                                            ),
                                                        (0, N.jsx)(ce, {
                                                          size: 17,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            })
                                          : (0, N.jsxs)(N.Fragment, {
                                              children: [
                                                (0, N.jsxs)(`p`, {
                                                  className: `info-note`,
                                                  children: [
                                                    (0, N.jsx)(ue, {
                                                      size: 17,
                                                    }),
                                                    translate(
                                                      `Online submissions are graded automatically. No entry is needed.`,
                                                    ),
                                                  ],
                                                }),
                                                jn.length
                                                  ? (0, N.jsxs)(N.Fragment, {
                                                      children: [
                                                        (0, N.jsxs)(`div`, {
                                                          className: `simple-results`,
                                                          children: [
                                                            (0, N.jsxs)(`div`, {
                                                              className: `results-column-headings`,
                                                              children: [
                                                                (0, N.jsx)(
                                                                  `span`,
                                                                  {
                                                                    children:
                                                                      translate(
                                                                        `Student`,
                                                                      ),
                                                                  },
                                                                ),
                                                                (0, N.jsx)(
                                                                  `span`,
                                                                  {
                                                                    children:
                                                                      translate(
                                                                        `Score`,
                                                                      ),
                                                                  },
                                                                ),
                                                                (0, N.jsx)(
                                                                  `span`,
                                                                  {
                                                                    children:
                                                                      translate(
                                                                        `Result`,
                                                                      ),
                                                                  },
                                                                ),
                                                              ],
                                                            }),
                                                            e.submissions
                                                              .filter(
                                                                (e) =>
                                                                  e.quiz_id ===
                                                                  Pe,
                                                              )
                                                              .map((e) =>
                                                                (0, N.jsxs)(
                                                                  `div`,
                                                                  {
                                                                    className: `submission-row`,
                                                                    children: [
                                                                      (0,
                                                                      N.jsxs)(
                                                                        `div`,
                                                                        {
                                                                          children:
                                                                            [
                                                                              (0,
                                                                              N.jsx)(
                                                                                `b`,
                                                                                {
                                                                                  children:
                                                                                    e.name,
                                                                                },
                                                                              ),
                                                                              (0,
                                                                              N.jsx)(
                                                                                `small`,
                                                                                {
                                                                                  children:
                                                                                    new Date(
                                                                                      e.created_at,
                                                                                    ).toLocaleString(),
                                                                                },
                                                                              ),
                                                                            ],
                                                                        },
                                                                      ),
                                                                      (0,
                                                                      N.jsxs)(
                                                                        `span`,
                                                                        {
                                                                          children:
                                                                            [
                                                                              e.score,
                                                                              `/`,
                                                                              e.max,
                                                                            ],
                                                                        },
                                                                      ),
                                                                      (0,
                                                                      N.jsxs)(
                                                                        `b`,
                                                                        {
                                                                          children:
                                                                            [
                                                                              We(
                                                                                e,
                                                                              ).toFixed(
                                                                                1,
                                                                              ),
                                                                              `%`,
                                                                            ],
                                                                        },
                                                                      ),
                                                                    ],
                                                                  },
                                                                  e.id,
                                                                ),
                                                              ),
                                                          ],
                                                        }),
                                                        (0, N.jsxs)(`button`, {
                                                          className: `secondary section-action`,
                                                          onClick: () =>
                                                            L(`leaderboard`),
                                                          children: [
                                                            translate(
                                                              `View leaderboard`,
                                                            ),
                                                            (0, N.jsx)(ze, {
                                                              size: 17,
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    })
                                                  : (0, N.jsxs)(`div`, {
                                                      className: `empty-state`,
                                                      children: [
                                                        (0, N.jsx)(`h2`, {
                                                          children:
                                                            translate(
                                                              `No submissions yet`,
                                                            ),
                                                        }),
                                                        (0, N.jsx)(`p`, {
                                                          children: translate(
                                                            `Share this quiz’s student link. Results appear here after students submit.`,
                                                          ),
                                                        }),
                                                        An?.published &&
                                                          (0, N.jsxs)(
                                                            `button`,
                                                            {
                                                              className: `primary`,
                                                              onClick: () =>
                                                                vn(
                                                                  (e?.publicSiteUrl ||
                                                                    location.origin +
                                                                      `/`) +
                                                                    `?quiz=` +
                                                                    encodeURIComponent(
                                                                      An.id,
                                                                    ),
                                                                ),
                                                              children: [
                                                                (0, N.jsx)(me, {
                                                                  size: 16,
                                                                }),
                                                                translate(
                                                                  `Copy student link`,
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                      ],
                                                    }),
                                              ],
                                            }),
                                      ],
                                    })
                                  : e && e.teacher && n === `leaderboard`
                                    ? (0, N.jsxs)(N.Fragment, {
                                        children: [
                                          (0, N.jsxs)(`div`, {
                                            className: `page-heading`,
                                            children: [
                                              (0, N.jsxs)(`div`, {
                                                children: [
                                                  (0, N.jsx)(`h1`, {
                                                    children:
                                                      translate(`Leaderboard`),
                                                  }),
                                                  (0, N.jsx)(`p`, {
                                                    children: translate(
                                                      `Rankings for the selected quiz. Equal scores share a rank.`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              (0, N.jsxs)(`button`, {
                                                className: `secondary`,
                                                onClick: () => L(`grades`),
                                                children: [
                                                  (0, N.jsx)(we, { size: 16 }),
                                                  translate(`Enter grades`),
                                                ],
                                              }),
                                            ],
                                          }),
                                          In(`leaderboard-quiz`),
                                          jn.length
                                            ? (0, N.jsxs)(N.Fragment, {
                                                children: [
                                                  (0, N.jsxs)(`div`, {
                                                    className: `leaderboard-summary`,
                                                    children: [
                                                      (0, N.jsxs)(`span`, {
                                                        children: [
                                                          jn.length,
                                                          ` `,
                                                          Pe === xt
                                                            ? translate(
                                                                `students`,
                                                              )
                                                            : translate(
                                                                `attempts`,
                                                              ),
                                                          translate(
                                                            ` · Average `,
                                                          ),
                                                          Mn,
                                                          `%`,
                                                        ],
                                                      }),
                                                      (0, N.jsxs)(`button`, {
                                                        className: `text-button`,
                                                        onClick: () =>
                                                          vn(
                                                            `Assalamu alaikum everyone,

*أصحاب الخيمة — ` +
                                                              (An?.title ||
                                                                translate(
                                                                  `Original Etiquette Quiz`,
                                                                )) +
                                                              `*

` +
                                                              jn.map(
                                                                (e) =>
                                                                  `${e.rank}. ${e.name} — ${e.score}/${e.max} (${We(e).toFixed(1)}%)`,
                                                              ).join(`
`) +
                                                              `

Jazakum Allahu khayran.`,
                                                          ),
                                                        children: [
                                                          (0, N.jsx)(me, {
                                                            size: 15,
                                                          }),
                                                          translate(
                                                            `Copy results`,
                                                          ),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  (0, N.jsx)(`section`, {
                                                    className: `leaderboard-podium`,
                                                    children: (0, N.jsx)(qe, {
                                                      rows: jn,
                                                    }),
                                                  }),
                                                  (0, N.jsxs)(`div`, {
                                                    className: `ranking-list`,
                                                    "aria-label":
                                                      translate(
                                                        `Quiz rankings`,
                                                      ),
                                                    children: [
                                                      (0, N.jsxs)(`div`, {
                                                        className: `ranking-header`,
                                                        children: [
                                                          (0, N.jsx)(`span`, {
                                                            children:
                                                              translate(`Rank`),
                                                          }),
                                                          (0, N.jsx)(`span`, {
                                                            children:
                                                              translate(
                                                                `Student`,
                                                              ),
                                                          }),
                                                          (0, N.jsx)(`span`, {
                                                            children:
                                                              translate(
                                                                `Score`,
                                                              ),
                                                          }),
                                                          (0, N.jsx)(`span`, {
                                                            children:
                                                              translate(
                                                                `Percentage`,
                                                              ),
                                                          }),
                                                        ],
                                                      }),
                                                      jn.map((e) =>
                                                        (0, N.jsxs)(
                                                          `div`,
                                                          {
                                                            className:
                                                              `ranking-row` +
                                                              (e.rank === 1
                                                                ? ` is-champion`
                                                                : ``),
                                                            children: [
                                                              (0, N.jsx)(
                                                                `span`,
                                                                {
                                                                  className:
                                                                    `rank rank-` +
                                                                    e.rank,
                                                                  children:
                                                                    e.rank,
                                                                },
                                                              ),
                                                              (0, N.jsxs)(
                                                                `span`,
                                                                {
                                                                  className: `ranking-student`,
                                                                  children: [
                                                                    (0, N.jsx)(
                                                                      `span`,
                                                                      {
                                                                        className:
                                                                          `avatar color-` +
                                                                          e.rank,
                                                                        children:
                                                                          Ge(
                                                                            e.name,
                                                                          ),
                                                                      },
                                                                    ),
                                                                    (0, N.jsx)(
                                                                      `b`,
                                                                      {
                                                                        children:
                                                                          e.name,
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                              (0, N.jsxs)(
                                                                `strong`,
                                                                {
                                                                  className: `ranking-score`,
                                                                  children: [
                                                                    e.score,
                                                                    (0, N.jsxs)(
                                                                      `small`,
                                                                      {
                                                                        children:
                                                                          [
                                                                            `/`,
                                                                            e.max,
                                                                          ],
                                                                      },
                                                                    ),
                                                                    e.bonus
                                                                      ? (0,
                                                                        N.jsxs)(
                                                                          `span`,
                                                                          {
                                                                            children:
                                                                              [
                                                                                `+`,
                                                                                e.bonus,
                                                                                translate(
                                                                                  ` bonus included`,
                                                                                ),
                                                                              ],
                                                                          },
                                                                        )
                                                                      : null,
                                                                  ],
                                                                },
                                                              ),
                                                              (0, N.jsxs)(
                                                                `span`,
                                                                {
                                                                  className: `ranking-percent`,
                                                                  children: [
                                                                    We(
                                                                      e,
                                                                    ).toFixed(
                                                                      1,
                                                                    ),
                                                                    `%`,
                                                                  ],
                                                                },
                                                              ),
                                                            ],
                                                          },
                                                          e.id,
                                                        ),
                                                      ),
                                                    ],
                                                  }),
                                                  (0, N.jsx)(`p`, {
                                                    className: `help`,
                                                    children:
                                                      Pe === xt
                                                        ? translate(
                                                            `Bonus points are included in the score. The maximum regular score stays 13.`,
                                                          )
                                                        : translate(
                                                            `Every submitted attempt is listed. Names are entered by students.`,
                                                          ),
                                                  }),
                                                ],
                                              })
                                            : (0, N.jsxs)(`div`, {
                                                className: `empty-state`,
                                                children: [
                                                  (0, N.jsx)(ze, { size: 30 }),
                                                  (0, N.jsx)(`h2`, {
                                                    children: translate(
                                                      `No results for this quiz yet`,
                                                    ),
                                                  }),
                                                  (0, N.jsx)(`p`, {
                                                    children: translate(
                                                      `Once grades are recorded, the rankings will appear here.`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                        ],
                                      })
                                    : e && e.teacher && n === `moments`
                                      ? (0, N.jsxs)(N.Fragment, {
                                          children: [
                                            (0, N.jsxs)(`div`, {
                                              className: `page-heading`,
                                              children: [
                                                (0, N.jsxs)(`div`, {
                                                  children: [
                                                    (0, N.jsx)(`h1`, {
                                                      children:
                                                        translate(
                                                          `Funny answers`,
                                                        ),
                                                    }),
                                                    (0, N.jsx)(`p`, {
                                                      children: translate(
                                                        `Review a mix-up and publish it for everyone to enjoy.`,
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, N.jsxs)(`button`, {
                                                  className: `primary`,
                                                  onClick: () => {
                                                    (Vt(Ct()), zt(!0));
                                                  },
                                                  children: [
                                                    (0, N.jsx)(Ee, {
                                                      size: 17,
                                                    }),
                                                    translate(
                                                      `Add funny answer`,
                                                    ),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, N.jsxs)(`p`, {
                                              className: `privacy-help`,
                                              children: [
                                                (0, N.jsx)(be, { size: 14 }),
                                                translate(
                                                  `Published funny answers are visible to everyone. Only teachers can add or remove them.`,
                                                ),
                                              ],
                                            }),
                                            (0, N.jsxs)(`section`, {
                                              className: `ai-highlight`,
                                              children: [
                                                (0, N.jsxs)(`div`, {
                                                  className: `section-heading`,
                                                  children: [
                                                    (0, N.jsx)(`h2`, {
                                                      children: translate(
                                                        `Let AI find a funny answer`,
                                                      ),
                                                    }),
                                                    (0, N.jsx)(`span`, {
                                                      className: `help`,
                                                      children: translate(
                                                        `Teacher review required`,
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, N.jsx)(`p`, {
                                                  children: translate(
                                                    `AI chooses from real incorrect submissions and suggests a playful caption. Students’ names are added locally and are not sent to Gemini.`,
                                                  ),
                                                }),
                                                Fn(
                                                  `highlight-quiz`,
                                                  Zt,
                                                  Qt,
                                                  !1,
                                                ),
                                                !e.aiConfigured &&
                                                  (0, N.jsxs)(`p`, {
                                                    className: `help`,
                                                    children: [
                                                      translate(
                                                        `Connect Gemini from `,
                                                      ),
                                                      (0, N.jsx)(`button`, {
                                                        className: `inline-action`,
                                                        onClick: () => L(`ai`),
                                                        children:
                                                          translate(
                                                            `Draft with AI`,
                                                          ),
                                                      }),
                                                      translate(
                                                        ` before generating suggestions.`,
                                                      ),
                                                    ],
                                                  }),
                                                (0, N.jsxs)(`button`, {
                                                  className: `secondary`,
                                                  disabled:
                                                    c || !e.aiConfigured || !Zt,
                                                  onClick: Rn,
                                                  children: [
                                                    (0, N.jsx)(Fe, {
                                                      size: 17,
                                                    }),
                                                    c
                                                      ? translate(
                                                          `Finding a mix-up…`,
                                                        )
                                                      : translate(
                                                          `Suggest funniest answer`,
                                                        ),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            Rt &&
                                              (0, N.jsxs)(`form`, {
                                                id: `moment-editor`,
                                                className: `moment-editor`,
                                                onSubmit: (e) => {
                                                  (e.preventDefault(),
                                                    sn(async () => {
                                                      (await I(
                                                        `/api/moments`,
                                                        Bt.id
                                                          ? `PATCH`
                                                          : `POST`,
                                                        Bt,
                                                      ),
                                                        await rn(),
                                                        zt(!1),
                                                        s(
                                                          translate(
                                                            `Funny answer published for the group.`,
                                                          ),
                                                        ));
                                                    }));
                                                },
                                                children: [
                                                  (0, N.jsxs)(`div`, {
                                                    className: `section-heading`,
                                                    children: [
                                                      (0, N.jsx)(`h2`, {
                                                        children: Bt.id
                                                          ? translate(
                                                              `Edit funny answer`,
                                                            )
                                                          : translate(
                                                              `Add a funny answer`,
                                                            ),
                                                      }),
                                                      (0, N.jsx)(`button`, {
                                                        type: `button`,
                                                        className: `icon-button`,
                                                        onClick: () => zt(!1),
                                                        "aria-label": translate(
                                                          `Close funny answer editor`,
                                                        ),
                                                        children: (0, N.jsx)(
                                                          Ve,
                                                          { size: 20 },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                  Pn.length > 0 &&
                                                    (0, N.jsxs)(`fieldset`, {
                                                      className: `wrong-answer-choices`,
                                                      children: [
                                                        (0, N.jsx)(`legend`, {
                                                          children: translate(
                                                            `Use a submitted answer, or enter one below`,
                                                          ),
                                                        }),
                                                        Pn.slice(0, 12).map(
                                                          (e, t) =>
                                                            (0, N.jsxs)(
                                                              `button`,
                                                              {
                                                                type: `button`,
                                                                onClick: () =>
                                                                  Vt(e),
                                                                children: [
                                                                  (0, N.jsx)(
                                                                    `b`,
                                                                    {
                                                                      children:
                                                                        e.name,
                                                                    },
                                                                  ),
                                                                  (0, N.jsx)(
                                                                    `span`,
                                                                    {
                                                                      children:
                                                                        e.chosen,
                                                                    },
                                                                  ),
                                                                  (0, N.jsx)(
                                                                    w,
                                                                    {
                                                                      size: 15,
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                              t,
                                                            ),
                                                        ),
                                                      ],
                                                    }),
                                                  (0, N.jsxs)(`div`, {
                                                    className: `form-pair`,
                                                    children: [
                                                      (0, N.jsxs)(`label`, {
                                                        children: [
                                                          translate(
                                                            `Student name`,
                                                          ),
                                                          (0, N.jsx)(`input`, {
                                                            required: !0,
                                                            maxLength: 100,
                                                            value: Bt.name,
                                                            onChange: (e) =>
                                                              Vt({
                                                                ...Bt,
                                                                name: e.target
                                                                  .value,
                                                              }),
                                                          }),
                                                        ],
                                                      }),
                                                      (0, N.jsxs)(`label`, {
                                                        children: [
                                                          translate(`Question`),
                                                          (0, N.jsx)(`input`, {
                                                            required: !0,
                                                            maxLength: 1e3,
                                                            value: Bt.question,
                                                            onChange: (e) =>
                                                              Vt({
                                                                ...Bt,
                                                                question:
                                                                  e.target
                                                                    .value,
                                                              }),
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  (0, N.jsxs)(`div`, {
                                                    className: `form-pair`,
                                                    children: [
                                                      (0, N.jsxs)(`label`, {
                                                        children: [
                                                          translate(
                                                            `Their answer`,
                                                          ),
                                                          (0, N.jsx)(`input`, {
                                                            dir: `auto`,
                                                            required: !0,
                                                            maxLength: 1e3,
                                                            value: Bt.chosen,
                                                            onChange: (e) =>
                                                              Vt({
                                                                ...Bt,
                                                                chosen:
                                                                  e.target
                                                                    .value,
                                                              }),
                                                          }),
                                                        ],
                                                      }),
                                                      (0, N.jsxs)(`label`, {
                                                        children: [
                                                          translate(
                                                            `Correct answer`,
                                                          ),
                                                          (0, N.jsx)(`input`, {
                                                            dir: `auto`,
                                                            required: !0,
                                                            maxLength: 1e3,
                                                            value: Bt.correct,
                                                            onChange: (e) =>
                                                              Vt({
                                                                ...Bt,
                                                                correct:
                                                                  e.target
                                                                    .value,
                                                              }),
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  (0, N.jsxs)(`label`, {
                                                    children: [
                                                      translate(
                                                        `Funny caption`,
                                                      ),
                                                      (0, N.jsx)(`textarea`, {
                                                        required: !0,
                                                        maxLength: 1e3,
                                                        value: Bt.caption,
                                                        onChange: (e) =>
                                                          Vt({
                                                            ...Bt,
                                                            caption:
                                                              e.target.value,
                                                          }),
                                                        placeholder: translate(
                                                          `Keep the joke about the answer`,
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                  (0, N.jsxs)(`div`, {
                                                    className: `form-actions`,
                                                    children: [
                                                      (0, N.jsx)(`button`, {
                                                        type: `button`,
                                                        className: `secondary`,
                                                        onClick: () => zt(!1),
                                                        children:
                                                          translate(`Cancel`),
                                                      }),
                                                      (0, N.jsxs)(`button`, {
                                                        className: `primary`,
                                                        disabled: c,
                                                        children: [
                                                          translate(
                                                            `Publish funny answer`,
                                                          ),
                                                          (0, N.jsx)(ce, {
                                                            size: 17,
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            !e.moments.length &&
                                              !Rt &&
                                              (0, N.jsxs)(`div`, {
                                                className: `empty-state`,
                                                children: [
                                                  (0, N.jsx)(ge, { size: 30 }),
                                                  (0, N.jsx)(`h2`, {
                                                    children: translate(
                                                      `No funny answers published yet`,
                                                    ),
                                                  }),
                                                  (0, N.jsx)(`p`, {
                                                    children: translate(
                                                      `Add one yourself or choose a wrong answer from a submitted quiz.`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            (0, N.jsx)(`div`, {
                                              className: `moments-list`,
                                              children: e.moments.map((e) =>
                                                (0, N.jsxs)(
                                                  `div`,
                                                  {
                                                    children: [
                                                      (0, N.jsx)(Je, {
                                                        moment: e,
                                                      }),
                                                      (0, N.jsxs)(`div`, {
                                                        className: `moment-actions`,
                                                        children: [
                                                          (0, N.jsxs)(
                                                            `button`,
                                                            {
                                                              className: `text-button`,
                                                              onClick: () => {
                                                                (Vt({ ...e }),
                                                                  zt(!0),
                                                                  setTimeout(
                                                                    () =>
                                                                      document
                                                                        .getElementById(
                                                                          `moment-editor`,
                                                                        )
                                                                        ?.scrollIntoView(
                                                                          {
                                                                            block: `start`,
                                                                          },
                                                                        ),
                                                                    0,
                                                                  ));
                                                              },
                                                              children: [
                                                                (0, N.jsx)(we, {
                                                                  size: 15,
                                                                }),
                                                                translate(
                                                                  `Edit`,
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                          (0, N.jsxs)(
                                                            `button`,
                                                            {
                                                              className: `text-button`,
                                                              onClick: () =>
                                                                vn(
                                                                  `${e.question}\n\n${e.name} answered “${e.chosen}”.\nCorrect answer: ${e.correct}.\n\n${e.caption}`,
                                                                ),
                                                              children: [
                                                                (0, N.jsx)(me, {
                                                                  size: 15,
                                                                }),
                                                                translate(
                                                                  `Copy for WhatsApp`,
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                          (0, N.jsxs)(
                                                            `button`,
                                                            {
                                                              className: `text-button danger`,
                                                              disabled: c,
                                                              onClick: () => {
                                                                confirm(
                                                                  translate(
                                                                    `Remove this funny answer?`,
                                                                  ),
                                                                ) &&
                                                                  sn(
                                                                    async () => {
                                                                      (await I(
                                                                        `/api/moments`,
                                                                        `DELETE`,
                                                                        {
                                                                          id: e.id,
                                                                        },
                                                                      ),
                                                                        await rn(),
                                                                        s(
                                                                          translate(
                                                                            `Funny answer removed.`,
                                                                          ),
                                                                        ));
                                                                    },
                                                                  );
                                                              },
                                                              children: [
                                                                (0, N.jsx)(Le, {
                                                                  size: 15,
                                                                }),
                                                                translate(
                                                                  `Remove`,
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                        ],
                                                      }),
                                                    ],
                                                  },
                                                  e.id,
                                                ),
                                              ),
                                            }),
                                          ],
                                        })
                                      : e
                                        ? (0, N.jsxs)(`section`, {
                                            className: `login`,
                                            children: [
                                              (0, N.jsxs)(`button`, {
                                                className: `text-button back`,
                                                onClick: () => L(`quizzes`),
                                                children: [
                                                  (0, N.jsx)(te, { size: 17 }),
                                                  translate(`Back to quizzes`),
                                                ],
                                              }),
                                              (0, N.jsx)(`h1`, {
                                                children:
                                                  translate(`Teacher sign in`),
                                              }),
                                              (0, N.jsx)(`p`, {
                                                children: translate(
                                                  `Sign in to create quizzes, manage grades and publish funny answers.`,
                                                ),
                                              }),
                                              (0, N.jsxs)(`form`, {
                                                onSubmit: (e) => {
                                                  (e.preventDefault(),
                                                    sn(async () => {
                                                      (await I(
                                                        `/api/teacher`,
                                                        `POST`,
                                                        { key: Ue },
                                                      ),
                                                        await rn(),
                                                        Ze(``),
                                                        ln(`quizzes`),
                                                        s(
                                                          translate(
                                                            `Signed in. You can now manage quizzes and grades.`,
                                                          ),
                                                        ));
                                                    }));
                                                },
                                                children: [
                                                  (0, N.jsxs)(`label`, {
                                                    htmlFor: `teacher-key`,
                                                    children: [
                                                      translate(
                                                        `Teacher access key`,
                                                      ),
                                                      (0, N.jsx)(`input`, {
                                                        id: `teacher-key`,
                                                        type: `password`,
                                                        autoComplete: `current-password`,
                                                        value: Ue,
                                                        onChange: (e) =>
                                                          Ze(e.target.value),
                                                        required: !0,
                                                      }),
                                                    ],
                                                  }),
                                                  (0, N.jsxs)(`button`, {
                                                    className: `primary`,
                                                    disabled: c,
                                                    children: [
                                                      c
                                                        ? translate(
                                                            `Signing in…`,
                                                          )
                                                        : translate(`Sign in`),
                                                      (0, N.jsx)(w, {
                                                        size: 17,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, N.jsxs)(`div`, {
                                                className: `login-help`,
                                                children: [
                                                  (0, N.jsx)(`h2`, {
                                                    children: translate(
                                                      `Where is my access key?`,
                                                    ),
                                                  }),
                                                  (0, N.jsxs)(`p`, {
                                                    children: [
                                                      translate(
                                                        `The private teacher link shared in this chat signs you in automatically. The key is the text after `,
                                                      ),
                                                      (0, N.jsx)(`code`, {
                                                        children: `#teacher=`,
                                                      }),
                                                      translate(
                                                        ` in that link. Keep it private.`,
                                                      ),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          })
                                        : null,
                Mt &&
                  (0, N.jsxs)(`section`, {
                    className: `share-box`,
                    children: [
                      (0, N.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, N.jsx)(`h2`, {
                            children: Mt.startsWith(`http`)
                              ? translate(`Student quiz link`)
                              : translate(`Ready to copy`),
                          }),
                          (0, N.jsx)(`button`, {
                            className: `icon-button`,
                            onClick: () => Nt(``),
                            "aria-label": translate(`Close sharing box`),
                            children: (0, N.jsx)(Ve, { size: 20 }),
                          }),
                        ],
                      }),
                      (0, N.jsx)(`p`, {
                        className: `help`,
                        children: Mt.startsWith(`http`)
                          ? translate(
                              `Anyone with this link can take the quiz. Teacher controls are not included.`,
                            )
                          : translate(
                              `Copy this text into WhatsApp or your group chat.`,
                            ),
                      }),
                      (0, N.jsx)(`textarea`, {
                        "aria-label": translate(`Text to copy`),
                        readOnly: !0,
                        rows: Mt.includes(`
`)
                          ? 8
                          : 2,
                        value: Mt,
                        onFocus: (e) => e.target.select(),
                      }),
                      (0, N.jsxs)(`button`, {
                        className: `secondary`,
                        onClick: () => vn(Mt),
                        children: [
                          (0, N.jsx)(me, { size: 16 }),
                          translate(`Copy again`),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            el(GatheringFooter),
          ],
        });
}

(0, Ue.createRoot)(document.getElementById("root")).render(el(Tt));
