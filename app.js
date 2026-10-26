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
} from "./i18n.js";
import {
  Ze,
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
} from "./components.js";
const el = y.createElement;
const Xe = "https://tamkeen-maqraah-learning.modest-mink-0683.chatgpt.site";
var tt = {
  revisit: `tamkeen-revisit`,
  draft: `tamkeen-draft`,
  done: `tamkeen-done`,
  name: `tamkeen-name`,
  token: `tamkeen-token`,
  door: `tamkeen-door`,
  remembered: `tamkeen-remembered`,
};
function nt(e, t) {
  let n = e.trim().replace(/\s+/g, ` `);
  return t.find((e) => e.trim().toLowerCase() === n.toLowerCase()) || n;
}
function rt(e, t) {
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
function it(e, t) {
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
function at(e, t) {
  if (!e) return null;
  try {
    let n = e.getItem(t);
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function ot(e, t, n) {
  e?.setItem(t, JSON.stringify(n));
}
function st(e, t) {
  e?.removeItem(t);
}
var N = tt;
async function ct(e) {
  let t = await crypto.subtle.digest(`SHA-256`, new TextEncoder().encode(e));
  return [...new Uint8Array(t)]
    .map((e) => e.toString(16).padStart(2, `0`))
    .join(``);
}
function lt(e, t) {
  let n = e.length === t.length ? 0 : 1;
  for (let r = 0; r < Math.min(e.length, t.length); r++)
    n |= e.charCodeAt(r) ^ t.charCodeAt(r);
  return n === 0;
}
function ut(e) {
  return e.trim().replace(/\s+/g, ` `);
}
function dt(e) {
  let t = ut(e);
  return t.length < 2
    ? translate(`Use the name the tent knows.`)
    : t.length > 40
      ? translate(`That name is too long.`)
      : /^[\p{L}][\p{L}\s'.-]*$/u.test(t)
        ? null
        : translate(`Use letters in your name.`);
}
function ft(e) {
  return e.length < 6
    ? translate(`Use at least 6 characters.`)
    : e.length > 72
      ? translate(`That password is too long.`)
      : null;
}
function pt(e) {
  return at(e, N.door);
}
function mt(e, t) {
  ot(e, N.door, t);
}
function ht(e) {
  return e?.getItem(N.remembered) === `1`;
}
function gt(e) {
  e?.setItem(N.remembered, `1`);
}
function _t(e) {
  (e?.removeItem(N.remembered), st(e, N.token));
}
function vt({
  savedName: e,
  busy: t,
  error: n,
  onCreate: r,
  onEnter: i,
  onTeacher: a,
  onSomeoneElse: o,
}) {
  let [s, c] = (0, y.useState)(e ? `back` : `create`),
    [l, u] = (0, y.useState)(e),
    [d, f] = (0, y.useState)(``),
    [p, m] = (0, y.useState)(``),
    [h, g] = (0, y.useState)(``),
    _ = h || n;
  async function v(t) {
    (t.preventDefault(), g(``));
    let n = s === `back` ? e : l,
      a = dt(n) || ft(d);
    if (a) {
      g(a);
      return;
    }
    if (s === `create` && d !== p) {
      g(translate(`Those passwords do not match.`));
      return;
    }
    s === `create` ? await r(ut(n), d) : await i(ut(n), d);
  }
  return (0, M.jsx)(`div`, {
    className: `door`,
    children: (0, M.jsxs)(`div`, {
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
        (0, M.jsx)(`h1`, { lang: `ar`, dir: `rtl`, children: `أصحاب الخيمة` }),
        s === `back`
          ? (0, M.jsx)(`p`, {
              children: translate(
                `This phone kept your name. Enter the password to come back in.`,
              ),
            })
          : (0, M.jsx)(`p`, {
              children: translate(
                `Set your name once. This phone remembers you, and next time you come straight in.`,
              ),
            }),
        (0, M.jsxs)(`form`, {
          onSubmit: v,
          children: [
            s !== `back` &&
              (0, M.jsxs)(`label`, {
                htmlFor: `door-name`,
                children: [
                  translate(`Your name`),
                  (0, M.jsx)(`input`, {
                    id: `door-name`,
                    autoComplete: `name`,
                    autoFocus: !0,
                    maxLength: 40,
                    value: l,
                    onChange: (e) => u(e.target.value),
                    required: !0,
                  }),
                ],
              }),
            s === `back` &&
              (0, M.jsx)(`p`, { className: `door-name`, children: e }),
            (0, M.jsxs)(`label`, {
              htmlFor: `door-password`,
              children: [
                translate(`Password`),
                (0, M.jsx)(`input`, {
                  id: `door-password`,
                  type: `password`,
                  autoComplete:
                    s === `create` ? `new-password` : `current-password`,
                  autoFocus: s === `back`,
                  maxLength: 72,
                  value: d,
                  onChange: (e) => f(e.target.value),
                  required: !0,
                }),
                (0, M.jsx)(`small`, {
                  children:
                    s === `create`
                      ? translate(
                          `At least 6 characters. You only type it again if you sign out.`,
                        )
                      : translate(`The password you chose for this name.`),
                }),
              ],
            }),
            s === `create` &&
              (0, M.jsxs)(`label`, {
                htmlFor: `door-confirm`,
                children: [
                  translate(`Confirm password`),
                  (0, M.jsx)(`input`, {
                    id: `door-confirm`,
                    type: `password`,
                    autoComplete: `new-password`,
                    maxLength: 72,
                    value: p,
                    onChange: (e) => m(e.target.value),
                    required: !0,
                  }),
                ],
              }),
            _ &&
              (0, M.jsx)(`p`, {
                className: `door-error`,
                role: `alert`,
                children: translate(_),
              }),
            (0, M.jsxs)(`button`, {
              className: `primary`,
              disabled: t,
              children: [
                t ? translate(`Saving…`) : translate(`Come in`),
                (0, M.jsx)(w, { size: 17 }),
              ],
            }),
          ],
        }),
        (0, M.jsxs)(`div`, {
          className: `door-switch`,
          children: [
            s === `create`
              ? (0, M.jsx)(`button`, {
                  className: `text-button`,
                  type: `button`,
                  onClick: () => {
                    (c(`enter`), g(``));
                  },
                  children: translate(`I already have a name`),
                })
              : s === `back`
                ? (0, M.jsx)(`button`, {
                    className: `text-button`,
                    type: `button`,
                    onClick: () => {
                      (o(), c(`create`), u(``), f(``), m(``), g(``));
                    },
                    children: translate(`This is someone else`),
                  })
                : (0, M.jsx)(`button`, {
                    className: `text-button`,
                    type: `button`,
                    onClick: () => {
                      (c(`create`), g(``));
                    },
                    children: translate(`New name`),
                  }),
            (0, M.jsx)(`button`, {
              className: `text-button`,
              type: `button`,
              onClick: a,
              children: translate(`Teacher sign in`),
            }),
          ],
        }),
      ],
    }),
  });
}
var yt = `paper-original`,
  bt = () => ({
    prompt: ``,
    options: [``, ``, ``, ``],
    correct: -1,
    explanation: ``,
  }),
  xt = () => ({ name: ``, question: ``, chosen: ``, correct: ``, caption: `` }),
  St = (e) =>
    e.prompt.trim() &&
    e.options.every((e) => e.trim()) &&
    e.correct >= 0 &&
    e.correct < 4;
function Ct() {
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
    [j, Me] = (0, y.useState)([bt()]),
    [Pe, Ie] = (0, y.useState)(yt),
    [Re, Be] = (0, y.useState)([]),
    [He, Ue] = (0, y.useState)(!1),
    [We, Qe] = (0, y.useState)(``),
    [tt, Ct] = (0, y.useState)(`loading`),
    [wt, Tt] = (0, y.useState)(``),
    [Et, Dt] = (0, y.useState)(``),
    [Ot, kt] = (0, y.useState)(``),
    [At, jt] = (0, y.useState)(``),
    [Mt, Nt] = (0, y.useState)(`all`),
    [Pt, Ft] = (0, y.useState)(!1),
    [P, It] = (0, y.useState)(xt()),
    [Lt, Rt] = (0, y.useState)(null),
    [zt, Bt] = (0, y.useState)(``),
    [Vt, Ht] = (0, y.useState)(``),
    [Ut, Wt] = (0, y.useState)(`saturday`),
    [Gt, Kt] = (0, y.useState)(10),
    [qt, Jt] = (0, y.useState)(``),
    [Yt, Xt] = (0, y.useState)(!1),
    [Zt, Qt] = (0, y.useState)(!1);
  async function F(e, t = `GET`, n) {
    let r = T(),
      i = r?.getItem(N.token) || ``,
      a = /^[a-f0-9]{64}$/.test(i),
      o = (r) =>
        fetch(Xe + e, {
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
      (r?.removeItem(N.token), (s = await o(!1)));
    }
    let c = await s.json();
    if (!s.ok)
      throw Error(
        c.error || translate(`Something went wrong. Please try again.`),
      );
    return c;
  }
  async function $t() {
    let e = await F(`/api/data`),
      n = T();
    n?.getItem(N.token) && e.accounts && !e.account && n.removeItem(N.token);
    let r = pt(n);
    if (r && ht(n)) {
      let t = nt(r.name, [
        ...new Set(
          (e.community?.boards || []).flatMap((e) => e.rows.map((e) => e.name)),
        ),
      ]);
      t !== r.name &&
        (mt(n, { ...r, name: t }), n?.setItem(N.name, t), b(t), Tt(t));
    }
    return (
      e.account &&
        (n?.setItem(N.name, e.account.name),
        b(e.account.name),
        e.accountMisses?.misses?.length
          ? (le(e.accountMisses), ot(n, N.revisit, e.accountMisses))
          : (le(null), st(n, N.revisit))),
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
          i = pt(n),
          o = !!(i && ht(n)),
          s = !!(
            t ||
            [`teacher`, `login`, `grades`, `ai`, `manage`].includes(
              e.get(`view`) || ``,
            )
          );
        if (
          (o && i
            ? (b(i.name), Tt(i.name), Ct(`in`))
            : s
              ? Ct(`in`)
              : (i && Tt(i.name), Ct(`door`)),
          s)
        ) {
          location.replace(Xe + `/` + location.search + location.hash);
          return;
        }
        t &&
          (history.replaceState(null, ``, location.pathname + location.search),
          await F(`/api/teacher`, `POST`, { key: t }));
        let c = await $t(),
          l = e.get(`view`);
        l === `results` || l === `leaderboard`
          ? r(`leaderboard`)
          : l === `home` || l === `quizzes` || l === `moments`
            ? r(l)
            : l === `grades` || l === `ai`
              ? r(c.teacher ? l : `login`)
              : (l === `teacher` || l === `login`) &&
                r(c.teacher ? `quizzes` : `login`);
        let u = e.get(`quizId`);
        u && Ie(u);
        let d = e.get(`quiz`);
        if (d) {
          let e = c.quizzes.find((e) => e.id === d);
          e && e.published
            ? an(e, !1)
            : (r(`quizzes`),
              a(
                translate(
                  `This quiz is not available. It may have been closed. Choose another quiz below.`,
                ),
              ));
        }
      } catch (e) {
        (a(e.message), ht(T()) || Ct(`door`));
      }
    })();
  }, []),
    (0, y.useEffect)(() => {
      e && !He && Be(e.records.map((e) => ({ ...e })));
    }, [e, He]),
    (0, y.useEffect)(() => {
      let e = at(T(), N.revisit);
      e?.misses?.length && le(e);
    }, []),
    (0, y.useEffect)(() => {
      let e = T();
      !e ||
        !u ||
        f ||
        m ||
        (v.trim() && e.setItem(N.name, v.trim()),
        !(S || (g < 0 && x.every((e) => e === -1))) &&
          ot(e, N.draft, {
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
    }, [g, u, S]));
  let en =
      de &&
      !!(
        Ce.trim() ||
        De.trim() ||
        j.some((e) => e.prompt.trim() || e.options.some((e) => e.trim()))
      ),
    tn = !!(u && !S && x.some((e) => e !== -1));
  (0, y.useEffect)(() => {
    let e = (e) => {
      (en || tn || He) && (e.preventDefault(), (e.returnValue = ``));
    };
    return (
      window.addEventListener(`beforeunload`, e),
      () => window.removeEventListener(`beforeunload`, e)
    );
  }, [en, tn, He]);
  async function I(e) {
    (l(!0), a(``), s(``));
    try {
      await e();
    } catch (e) {
      (a(e.message), window.scrollTo({ top: 0, behavior: `smooth` }));
    } finally {
      l(!1);
    }
  }
  function nn() {
    return He
      ? confirm(translate(`Leave without saving the grade changes?`))
      : tn
        ? confirm(
            translate(`Leave this quiz? Your answers have not been submitted.`),
          )
        : en
          ? confirm(
              translate(`Leave the quiz editor? Unsaved changes will be lost.`),
            )
          : !0;
  }
  function rn(e) {
    (d(null),
      h(!1),
      C(null),
      pe(!1),
      Ue(!1),
      r(e),
      a(``),
      s(``),
      kt(``),
      history.replaceState(null, ``, `/` + (e === `home` ? `` : `?view=` + e)),
      window.scrollTo(0, 0));
  }
  function L(e) {
    if (nn()) {
      if (e === `login`) {
        location.assign(Xe + `/?view=teacher`);
        return;
      }
      rn(e);
    }
  }
  function an(e, t = !1) {
    let n = T(),
      r = t ? null : at(n, N.draft),
      i = t ? null : at(n, N.done),
      o =
        r?.quizId === e.id &&
        r.answers.length === e.questions.length &&
        (r.step >= 0 || r.answers.some((e) => e !== -1))
          ? r
          : null,
      c = i?.quizId === e.id ? i : null,
      l = !!(n && ht(n) && !t);
    (d(e),
      p(t),
      h(!1),
      b(
        l
          ? pt(n)?.name || n?.getItem(N.name) || ``
          : o?.name || c?.name || n?.getItem(N.name) || ``,
      ),
      ee(o ? o.answers : Array(e.questions.length).fill(-1)),
      oe(o?.attemptId || c?.attemptId || crypto.randomUUID()),
      _(o ? Math.min(o.step, e.questions.length - 1) : -1),
      C(c && !o ? { score: c.score, max: c.max, review: c.review } : null),
      a(``),
      s(``),
      kt(``),
      history.replaceState(
        null,
        ``,
        `/` + (t ? `?view=quizzes` : `?quiz=` + encodeURIComponent(e.id)),
      ),
      window.scrollTo(0, 0));
  }
  function on() {
    let e = T();
    (st(e, N.draft),
      st(e, N.done),
      u &&
        (h(!1),
        C(null),
        _(-1),
        ee(Array(u.questions.length).fill(-1)),
        oe(crypto.randomUUID())));
  }
  function sn(e, t, n) {
    let r = T(),
      i = (n.review || []).map((e) => ({
        prompt: e.prompt,
        correct: e.correct,
        explanation: e.explanation || ``,
        right: e.right,
      }));
    (ot(r, N.done, {
      quizId: e.id,
      attemptId: ae,
      name: t,
      title: e.title,
      score: n.score,
      max: n.max,
      review: i,
    }),
      st(r, N.draft));
    let a = rt(e.questions, i),
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
    return (le(o), o ? ot(r, N.revisit, o) : st(r, N.revisit), i);
  }
  function cn() {
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
  function ln() {
    (st(T(), N.revisit), le(null));
  }
  function un(e, t = !1, n = !1) {
    nn() &&
      (Te(e ? (t ? e.title : e.title + translate(` — copy`)) : ``),
      ke(e?.description || ``),
      Me(
        e
          ? e.questions.map((e) => ({ ...e, options: [...e.options] }))
          : [bt()],
      ),
      he(t && e ? e.id : null),
      Xt(!!e?.questions.some((e) => e.evidence)),
      Qt(!1),
      xe(0),
      ve(n ? 2 : 0),
      pe(!0),
      r(`quizzes`),
      d(null),
      a(``),
      s(``),
      window.scrollTo(0, 0));
  }
  function dn(e, t) {
    Me((n) => n.map((n, r) => (r === e ? { ...n, ...t } : n)));
  }
  async function fn(t) {
    if (t && Yt && !Zt) {
      a(
        translate(
          `Confirm you have reviewed the AI questions and correct answers before publishing.`,
        ),
      );
      return;
    }
    await I(async () => {
      let n = {
          title: Ce,
          description: De,
          questions: j,
          published: t,
          ...(D ? { id: D } : {}),
        },
        r = await F(`/api/quizzes`, D ? `PATCH` : `POST`, n);
      (await $t(),
        rn(`quizzes`),
        s(
          t
            ? translate(`Quiz published. Copy the student link to share it.`)
            : translate(
                `Draft saved. You can continue editing it from Quizzes.`,
              ),
        ),
        t &&
          kt(
            (e?.publicSiteUrl || location.origin + `/`) +
              `?quiz=` +
              encodeURIComponent(D || r.id),
          ));
    });
  }
  async function pn(e) {
    kt(e);
    try {
      (await navigator.clipboard.writeText(e),
        s(translate(`Copied. Paste it into WhatsApp or your group chat.`)));
    } catch {
      s(translate(`Copy the text in the box below.`));
    }
  }
  function mn(e) {
    nn() && (Ie(e.id), rn(`grades`));
  }
  function hn(t) {
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
      I(async () => {
        (await F(`/api/quizzes`, `DELETE`, { id: t.id }),
          Lt?.id === t.id && Rt(null),
          Pe === t.id && Ie(yt),
          await $t(),
          rn(`quizzes`),
          s(translate(`Quiz deleted.`)));
      });
  }
  async function gn(t, n, r) {
    (l(!0), Dt(``));
    try {
      let i = nt(ut(n), [
          ...new Set(
            (e?.community.boards || []).flatMap((e) =>
              e.rows.map((e) => e.name),
            ),
          ),
        ]),
        a = dt(i) || ft(r);
      if (a) throw Error(a);
      let o = await ct(r),
        s = T(),
        c = pt(s);
      if (t === `enter`) {
        let e = !!(
            c &&
            c.name.toLocaleLowerCase(`en`) === i.toLocaleLowerCase(`en`) &&
            lt(c.passwordHash, o)
          ),
          t = null;
        try {
          t = await F(`/api/account/login`, `POST`, { name: i, password: r });
        } catch (t) {
          if (!e)
            throw Error(
              /do not match/.test(t?.message || ``) || c
                ? translate(`That name and password do not match.`)
                : translate(`This phone has not saved that name yet.`),
            );
        }
        if (!t && !e)
          throw Error(translate(`That name and password do not match.`));
        let n = t?.student?.name || c?.name || i;
        (mt(s, { name: n, passwordHash: o }),
          t?.token && s?.setItem(N.token, t.token),
          s?.setItem(N.name, n),
          gt(s),
          b(n),
          Tt(n));
      } else {
        let e = null;
        try {
          e = await F(`/api/account/register`, `POST`, {
            name: i,
            password: r,
          });
        } catch (e) {
          if (/already/.test(e?.message || ``)) throw e;
        }
        let t = e?.student?.name || i;
        (mt(s, { name: t, passwordHash: o }),
          e?.token && s?.setItem(N.token, e.token),
          s?.setItem(N.name, t),
          gt(s),
          b(t),
          Tt(t));
      }
      Ct(`in`);
    } catch (e) {
      Dt(e.message || translate(`Could not save this name. Please try again.`));
    } finally {
      l(!1);
    }
  }
  function _n() {
    let e = T();
    (e?.getItem(N.token) && F(`/api/account`, `DELETE`).catch(() => {}),
      _t(e),
      d(null),
      h(!1),
      C(null),
      a(``),
      s(``),
      Ct(`door`));
  }
  async function vn() {
    await I(async () => {
      let t = u,
        n;
      if (m) {
        let e = it(
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
          r ? ot(T(), N.revisit, r) : st(T(), N.revisit),
          T()?.getItem(N.token))
        )
          try {
            await F(`/api/account`, `POST`, {
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
        let r = nt(v, [
          ...new Set(
            (e?.community.boards || []).flatMap((e) =>
              e.rows.map((e) => e.name),
            ),
          ),
        ]);
        (b(r),
          (n = await F(`/api/submit`, `POST`, {
            quizId: t.id,
            name: r,
            answers: x,
            attemptId: ae,
          })),
          n.review?.length && (n = { ...n, review: sn(t, r, n) }),
          await $t(),
          re({ ...n, title: t.title, name: r }));
      }
      (C(n), window.scrollTo(0, 0));
    });
  }
  let yn = e?.quizzes || [],
    bn = yn.filter((e) => e.published),
    xn = yn.filter((e) => !e.published),
    Sn = yn.filter(
      (e) =>
        (Mt === `all` || (Mt === `published` ? e.published : !e.published)) &&
        e.title.toLowerCase().includes(At.toLowerCase()),
    ),
    Cn = yn.find((e) => e.id === Pe),
    wn = qe(
      Pe === yt
        ? (e?.records || []).map((e) => ({ ...e, score: e.regular + e.bonus }))
        : (e?.submissions || []).filter((e) => e.quiz_id === Pe),
    ),
    Tn = wn.length
      ? (wn.reduce((e, t) => e + Ge(t), 0) / wn.length).toFixed(1)
      : `0`,
    En = !!(Ce.trim() && j.length && j.every(St)),
    Dn = (e?.teacher ? e.submissions : []).flatMap((e) => {
      let t = yn.find((t) => t.id === e.quiz_id),
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
  function On(e, t, n, r = !0) {
    return (0, M.jsxs)(`fieldset`, {
      className: `quiz-choices`,
      children: [
        (0, M.jsx)(`legend`, { children: translate(`Choose a quiz`) }),
        [
          ...(r
            ? [
                {
                  id: yt,
                  title: translate(`Original etiquette quiz`),
                  detail: translate(`Paper quiz · 13 points + bonus`),
                },
              ]
            : []),
          ...yn.map((e) => ({
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
          (0, M.jsxs)(
            `label`,
            {
              className: t === r.id ? `chosen` : ``,
              children: [
                (0, M.jsx)(`input`, {
                  type: `radio`,
                  name: e,
                  value: r.id,
                  checked: t === r.id,
                  onChange: () => n(r.id),
                }),
                (0, M.jsxs)(`span`, {
                  children: [
                    (0, M.jsx)(`b`, { children: r.title }),
                    (0, M.jsx)(`small`, { children: r.detail }),
                  ],
                }),
                (0, M.jsx)(`span`, {
                  className: `choice-check`,
                  children: t === r.id && (0, M.jsx)(ce, { size: 15 }),
                }),
              ],
            },
            r.id,
          ),
        ),
      ],
    });
  }
  function kn(e) {
    return On(e, Pe, (e) => {
      nn() && (Ie(e), Ue(!1));
    });
  }
  async function An() {
    await I(async () => {
      let e = await F(`/api/ai`, `POST`, {
        kind: `quiz`,
        title: zt,
        source: Vt,
        session: Ut,
        count: Gt,
      });
      (Te(e.draft.title),
        ke(e.draft.description),
        Me(e.draft.questions),
        he(null),
        xe(0),
        ve(1),
        Xt(!0),
        Qt(!1),
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
  async function jn() {
    await I(async () => {
      (It(
        (await F(`/api/ai`, `POST`, { kind: `highlight`, quizId: qt }))
          .suggestion,
      ),
        Ft(!0),
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
  let Mn = m
      ? S?.score === S?.max
        ? translate(`Those answers are clear now`)
        : translate(`Still worth another look`)
      : f
        ? translate(`Preview complete`)
        : S?.score === S?.max
          ? translate(`All answers correct!`)
          : translate(`Quiz complete`),
    Nn = m
      ? translate(
          `This practice stays on your phone. The leaderboard was not changed.`,
        )
      : f
        ? translate(`This was a preview. No grade was saved.`)
        : translate("{name}, your result has been saved.", { name: v }),
    Pn = m ? translate(`Back home`) : translate(`Back to quizzes`),
    Fn = m ? `home` : `quizzes`,
    In = [
      [`home`, translate(`Home`), ye],
      [`quizzes`, translate(`Quizzes`), ie],
      ...(e?.teacher ? [[`grades`, translate(`Grades`), E]] : []),
      [`leaderboard`, translate(`Leaderboard`), ze],
      [`moments`, translate(`Funny answers`), ge],
    ];
  return tt === `door`
    ? (0, M.jsx)(vt, {
        savedName: wt,
        busy: c,
        error: Et,
        onCreate: (e, t) => gn(`create`, e, t),
        onEnter: (e, t) => gn(`enter`, e, t),
        onTeacher: () => {
          (Ct(`in`), L(`login`));
        },
        onSomeoneElse: () => {
          (st(T(), N.door), Tt(``), b(``), Dt(``));
        },
      })
    : (0, M.jsxs)(`div`, {
        className: `site`,
        children: [
          (0, M.jsx)(`a`, {
            href: `#main`,
            className: `skip-link`,
            children: translate(`Skip to content`),
          }),
          (0, M.jsxs)(`header`, {
            className: `app-header`,
            children: [
              (0, M.jsxs)(`div`, {
                className: `header-inner`,
                children: [
                  el(Brand, {
                    onClick: (event) => {
                      event.preventDefault();
                      L("home");
                    },
                  }),
                  (0, M.jsxs)(`div`, {
                    className: `header-actions`,
                    children: [
                      el(LanguageSwitcher),
                      el(MotionToggle),
                      tt === `in` && v && !e?.teacher
                        ? (0, M.jsxs)(`div`, {
                            className: `teacher-account`,
                            children: [
                              (0, M.jsx)(`span`, { children: v }),
                              (0, M.jsxs)(`button`, {
                                className: `text-button`,
                                onClick: _n,
                                children: [
                                  (0, M.jsx)(Se, { size: 15 }),
                                  translate(`Sign out`),
                                ],
                              }),
                            ],
                          })
                        : null,
                      e?.teacher
                        ? (0, M.jsxs)(`div`, {
                            className: `teacher-account`,
                            children: [
                              (0, M.jsx)(`span`, {
                                children: translate(`Teacher`),
                              }),
                              (0, M.jsxs)(`button`, {
                                className: `text-button`,
                                onClick: () => {
                                  nn() &&
                                    I(async () => {
                                      (await F(`/api/teacher`, `DELETE`),
                                        await $t(),
                                        rn(`home`),
                                        s(translate(`Signed out.`)));
                                    });
                                },
                                children: [
                                  (0, M.jsx)(Se, { size: 15 }),
                                  translate(`Sign out`),
                                ],
                              }),
                            ],
                          })
                        : (0, M.jsxs)(`button`, {
                            className: `teacher-signin`,
                            onClick: () => L(`login`),
                            children: [
                              (0, M.jsx)(be, { size: 15 }),
                              translate(`Teacher sign in`),
                            ],
                          }),
                    ],
                  }),
                ],
              }),
              e &&
                (0, M.jsx)(`nav`, {
                  className:
                    `main-nav ` + (e.teacher ? `teacher-nav` : `student-nav`),
                  "aria-label": translate(`Main navigation`),
                  children: In.map(([e, t, r]) => {
                    let i = r;
                    return (0, M.jsxs)(
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
                          (0, M.jsx)(i, { size: 17 }),
                          (0, M.jsx)(`span`, { children: t }),
                        ],
                      },
                      e,
                    );
                  }),
                }),
            ],
          }),
          (0, M.jsxs)(`main`, {
            id: `main`,
            children: [
              i &&
                (0, M.jsxs)(`div`, {
                  className: `alert error`,
                  role: `alert`,
                  children: [
                    (0, M.jsx)(_e, { size: 19 }),
                    (0, M.jsx)(`span`, { children: i }),
                    !e &&
                      (0, M.jsx)(`button`, {
                        onClick: () =>
                          I(async () => {
                            await $t();
                          }),
                        children: translate(`Try again`),
                      }),
                  ],
                }),
              o &&
                (0, M.jsxs)(`div`, {
                  className: `alert success`,
                  role: `status`,
                  children: [
                    (0, M.jsx)(ue, { size: 19 }),
                    (0, M.jsx)(`span`, { children: o }),
                    (0, M.jsx)(`button`, {
                      className: `icon-button`,
                      "aria-label": translate(`Dismiss message`),
                      onClick: () => s(``),
                      children: (0, M.jsx)(Ve, { size: 18 }),
                    }),
                  ],
                }),
              !e &&
                !i &&
                (0, M.jsxs)(`div`, {
                  className: `loading`,
                  role: `status`,
                  children: [
                    translate(`Loading the tent…`),
                    (0, M.jsx)(`div`, {}),
                    (0, M.jsx)(`div`, {}),
                  ],
                }),
              e && u
                ? (0, M.jsxs)(`section`, {
                    className: `attempt`,
                    children: [
                      el(Cushion, {
                        kind: "armrest",
                        className: "attempt-cushion",
                      }),
                      (0, M.jsxs)(`button`, {
                        className: `text-button back`,
                        onClick: () => L(`quizzes`),
                        children: [
                          (0, M.jsx)(te, { size: 17 }),
                          translate(`Back to quizzes`),
                        ],
                      }),
                      (0, M.jsx)(`h1`, { dir: `auto`, children: u.title }),
                      f &&
                        (0, M.jsxs)(`p`, {
                          className: `info-note`,
                          children: [
                            (0, M.jsx)(O, { size: 16 }),
                            translate(
                              `Teacher preview. No student result will be saved.`,
                            ),
                          ],
                        }),
                      m &&
                        (0, M.jsxs)(`p`, {
                          className: `info-note`,
                          children: [
                            (0, M.jsx)(Oe, { size: 16 }),
                            translate(
                              `These are the questions you missed. This practice is not graded.`,
                            ),
                          ],
                        }),
                      S
                        ? (0, M.jsxs)(M.Fragment, {
                            children: [
                              (0, M.jsxs)(`section`, {
                                className: `result`,
                                children: [
                                  !m &&
                                    (0, M.jsx)(`div`, {
                                      className: `confetti`,
                                      "aria-hidden": `true`,
                                      children: Array.from(
                                        { length: 30 },
                                        (e, t) =>
                                          (0, M.jsx)(
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
                                  (0, M.jsx)(`div`, {
                                    className: `result-medal`,
                                    children: (0, M.jsx)(ze, { size: 29 }),
                                  }),
                                  (0, M.jsx)(`h2`, { children: Mn }),
                                  (0, M.jsx)(`p`, { children: Nn }),
                                  (0, M.jsxs)(`div`, {
                                    className: `result-score`,
                                    children: [
                                      S.score,
                                      (0, M.jsxs)(`span`, {
                                        children: [`/`, S.max],
                                      }),
                                    ],
                                  }),
                                  (0, M.jsxs)(`span`, {
                                    children: [
                                      ((S.score / S.max) * 100).toFixed(1),
                                      `%`,
                                    ],
                                  }),
                                  (0, M.jsxs)(`div`, {
                                    className: `attempt-actions`,
                                    children: [
                                      !m &&
                                        !f &&
                                        (0, M.jsx)(`button`, {
                                          className: `secondary`,
                                          onClick: on,
                                          children: translate(`Take it again`),
                                        }),
                                      (0, M.jsxs)(`button`, {
                                        className: `primary`,
                                        onClick: () => L(Fn),
                                        children: [
                                          Pn,
                                          (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, M.jsx)(`h2`, {
                                className: `section-title`,
                                children: translate(`Your answers`),
                              }),
                              S.alreadySubmitted &&
                                !(S.review || []).length &&
                                (0, M.jsx)(`p`, {
                                  className: `help`,
                                  children: translate(
                                    `This attempt was already saved.`,
                                  ),
                                }),
                              (S.review || []).map((e, t) =>
                                (0, M.jsxs)(
                                  `article`,
                                  {
                                    className: `answer-review`,
                                    children: [
                                      (0, M.jsx)(`span`, {
                                        className: e.right
                                          ? `review-mark correct`
                                          : `review-mark incorrect`,
                                        children: e.right
                                          ? (0, M.jsx)(ce, { size: 19 })
                                          : (0, M.jsx)(Oe, { size: 18 }),
                                      }),
                                      (0, M.jsxs)(`div`, {
                                        children: [
                                          (0, M.jsxs)(`span`, {
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
                                          (0, M.jsx)(`h3`, {
                                            dir: `auto`,
                                            children: e.prompt,
                                          }),
                                          (0, M.jsxs)(`p`, {
                                            children: [
                                              translate(`Correct answer: `),
                                              (0, M.jsx)(`b`, {
                                                dir: `auto`,
                                                children: e.correct,
                                              }),
                                            ],
                                          }),
                                          e.explanation &&
                                            (0, M.jsx)(`p`, {
                                              children: e.explanation,
                                            }),
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
                          ? (0, M.jsxs)(`form`, {
                              className: `start-form`,
                              onSubmit: (e) => {
                                (e.preventDefault(), _(0));
                              },
                              children: [
                                u.description &&
                                  (0, M.jsx)(`p`, { children: u.description }),
                                (0, M.jsxs)(`p`, {
                                  className: `quiz-facts`,
                                  children: [
                                    (0, M.jsxs)(`span`, {
                                      children: [
                                        (0, M.jsx)(E, { size: 16 }),
                                        u.questions.length,
                                        translate(` questions`),
                                      ],
                                    }),
                                    (0, M.jsxs)(`span`, {
                                      children: [
                                        (0, M.jsx)(fe, { size: 16 }),
                                        translate(`No time limit`),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, M.jsxs)(`label`, {
                                  htmlFor: `student-name`,
                                  children: [
                                    translate(`Your name`),
                                    (0, M.jsx)(`input`, {
                                      id: `student-name`,
                                      autoComplete: `name`,
                                      maxLength: 100,
                                      value: v,
                                      placeholder: translate(`Enter your name`),
                                      onChange: (e) => b(e.target.value),
                                      readOnly: ht(T()),
                                      required: !0,
                                    }),
                                  ],
                                }),
                                (0, M.jsx)(`small`, {
                                  children: ht(T())
                                    ? translate(
                                        `This phone remembers this name.`,
                                      )
                                    : translate(
                                        `Use the name your teacher knows. Your name and score will appear on the group leaderboard.`,
                                      ),
                                }),
                                (0, M.jsxs)(`button`, {
                                  className: `primary`,
                                  disabled: !v.trim(),
                                  children: [
                                    translate(`Start quiz`),
                                    (0, M.jsx)(w, { size: 17 }),
                                  ],
                                }),
                              ],
                            })
                          : (0, M.jsxs)(M.Fragment, {
                              children: [
                                (0, M.jsxs)(`div`, {
                                  className: `question-progress`,
                                  children: [
                                    (0, M.jsxs)(`span`, {
                                      children: [
                                        translate(`Question `),
                                        g + 1,
                                        translate(` of `),
                                        u.questions.length,
                                      ],
                                    }),
                                    (0, M.jsxs)(`span`, {
                                      children: [
                                        x.filter((e) => e !== -1).length,
                                        translate(` answered`),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, M.jsx)(`div`, {
                                  className: `progress-track`,
                                  children: u.questions.map((e, t) =>
                                    (0, M.jsx)(
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
                                (0, M.jsxs)(
                                  `fieldset`,
                                  {
                                    className: `question`,
                                    children: [
                                      (0, M.jsx)(`legend`, {
                                        id: `question-focus`,
                                        tabIndex: -1,
                                        dir: `auto`,
                                        children: u.questions[g].prompt,
                                      }),
                                      u.questions[g].options.map((e, t) =>
                                        (0, M.jsxs)(
                                          `label`,
                                          {
                                            className:
                                              `answer-option ` +
                                              (x[g] === t ? `picked` : ``),
                                            children: [
                                              (0, M.jsx)(`input`, {
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
                                              (0, M.jsx)(`span`, {
                                                className: `option-letter`,
                                                children: (getLanguage() ===
                                                "ar"
                                                  ? ["أ", "ب", "ج", "د"]
                                                  : ["A", "B", "C", "D"])[t],
                                              }),
                                              (0, M.jsx)(`span`, {
                                                className: `option-text`,
                                                dir: `auto`,
                                                children: e,
                                              }),
                                              (0, M.jsx)(`span`, {
                                                className: `option-check`,
                                                children:
                                                  x[g] === t &&
                                                  (0, M.jsx)(ce, { size: 17 }),
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
                                (0, M.jsxs)(`div`, {
                                  className: `attempt-actions`,
                                  children: [
                                    (0, M.jsxs)(`button`, {
                                      className: `secondary`,
                                      onClick: () =>
                                        m && g === 0
                                          ? L(`home`)
                                          : _((e) => e - 1),
                                      children: [
                                        (0, M.jsx)(te, { size: 17 }),
                                        m && g === 0
                                          ? translate(`Home`)
                                          : g === 0
                                            ? translate(`Back`)
                                            : translate(`Previous`),
                                      ],
                                    }),
                                    g < u.questions.length - 1
                                      ? (0, M.jsxs)(`button`, {
                                          className: `primary`,
                                          disabled: x[g] === -1,
                                          onClick: () => {
                                            (_((e) => e + 1),
                                              window.scrollTo(0, 0));
                                          },
                                          children: [
                                            translate(`Next`),
                                            (0, M.jsx)(w, { size: 17 }),
                                          ],
                                        })
                                      : (0, M.jsxs)(`button`, {
                                          className: `primary`,
                                          disabled:
                                            c || x.some((e) => e === -1),
                                          onClick: vn,
                                          children: [
                                            c
                                              ? translate(`Saving result…`)
                                              : translate(`Submit quiz`),
                                            (0, M.jsx)(ce, { size: 17 }),
                                          ],
                                        }),
                                  ],
                                }),
                                (0, M.jsxs)(`p`, {
                                  className: `help question-help`,
                                  children: [
                                    translate(
                                      `You can change answers before submitting. `,
                                    ),
                                    !f &&
                                      !m &&
                                      (0, M.jsx)(`button`, {
                                        className: `text-button`,
                                        type: `button`,
                                        onClick: on,
                                        children: translate(`Start over`),
                                      }),
                                  ],
                                }),
                              ],
                            }),
                    ],
                  })
                : e && n === `home` && !de
                  ? (0, M.jsx)(Ze, {
                      data: e,
                      recent: ne,
                      revisit: se,
                      onPractice: cn,
                      onClearRevisit: ln,
                      onNavigate: L,
                      onStart: an,
                      onCreate: () => un(),
                    })
                  : e && !e.teacher && n === `leaderboard`
                    ? (0, M.jsx)($e, { community: e.community, onNavigate: L })
                    : e && !e.teacher && n === `moments`
                      ? (0, M.jsx)(et, {
                          community: e.community,
                          onNavigate: L,
                        })
                      : e && de
                        ? (0, M.jsxs)(`section`, {
                            className: `builder`,
                            children: [
                              (0, M.jsxs)(`button`, {
                                className: `text-button back`,
                                onClick: () => L(`quizzes`),
                                children: [
                                  (0, M.jsx)(te, { size: 17 }),
                                  translate(`Back to quizzes`),
                                ],
                              }),
                              (0, M.jsxs)(`div`, {
                                className: `page-heading`,
                                children: [
                                  (0, M.jsx)(`h1`, {
                                    children: D
                                      ? translate(`Edit quiz`)
                                      : translate(`Create a quiz`),
                                  }),
                                  (0, M.jsx)(`span`, {
                                    className: `help`,
                                    children: translate(
                                      `Changes are not saved yet`,
                                    ),
                                  }),
                                ],
                              }),
                              (0, M.jsx)(`ol`, {
                                className: `builder-steps`,
                                "aria-label": translate(`Quiz creation steps`),
                                children: [
                                  translate(`Details`),
                                  translate(`Questions`),
                                  translate(`Publish`),
                                ].map((e, t) =>
                                  (0, M.jsxs)(
                                    `li`,
                                    {
                                      className:
                                        t === k
                                          ? `current`
                                          : t < k
                                            ? `complete`
                                            : ``,
                                      "aria-current": t === k ? `step` : void 0,
                                      children: [
                                        (0, M.jsx)(`span`, {
                                          children:
                                            t < k
                                              ? (0, M.jsx)(ce, { size: 15 })
                                              : t + 1,
                                        }),
                                        e,
                                      ],
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, M.jsxs)(`form`, {
                                onSubmit: (e) => {
                                  if ((e.preventDefault(), k === 0)) ve(1);
                                  else if (k === 1) {
                                    if (!j.every(St)) {
                                      (xe(j.findIndex((e) => !St(e))),
                                        a(
                                          translate(
                                            `Complete every question and select its correct answer before continuing.`,
                                          ),
                                        ));
                                      return;
                                    }
                                    ve(2);
                                  } else fn(!0);
                                  window.scrollTo(0, 0);
                                },
                                children: [
                                  k === 0
                                    ? (0, M.jsxs)(`div`, {
                                        className: `builder-panel`,
                                        children: [
                                          (0, M.jsx)(`h2`, {
                                            children: translate(`Quiz details`),
                                          }),
                                          (0, M.jsxs)(`label`, {
                                            htmlFor: `quiz-title`,
                                            children: [
                                              translate(`Quiz title`),
                                              (0, M.jsx)(`input`, {
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
                                          (0, M.jsxs)(`label`, {
                                            children: [
                                              translate(
                                                `Student instructions `,
                                              ),
                                              (0, M.jsx)(`span`, {
                                                className: `optional`,
                                                children: translate(`Optional`),
                                              }),
                                              (0, M.jsx)(`textarea`, {
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
                                      ? (0, M.jsxs)(`div`, {
                                          className: `builder-panel`,
                                          children: [
                                            (0, M.jsxs)(`div`, {
                                              className: `question-editor-heading`,
                                              children: [
                                                (0, M.jsxs)(`h2`, {
                                                  children: [
                                                    translate(`Question `),
                                                    A + 1,
                                                  ],
                                                }),
                                                j.length > 1 &&
                                                  (0, M.jsxs)(`button`, {
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
                                                      (0, M.jsx)(Le, {
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
                                              (0, M.jsx)(`div`, {
                                                className: `question-picker`,
                                                "aria-label":
                                                  translate(
                                                    `Select a question`,
                                                  ),
                                                children: j.map((e, t) =>
                                                  (0, M.jsxs)(
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
                                                        St(e) &&
                                                          (0, M.jsx)(ce, {
                                                            size: 12,
                                                          }),
                                                      ],
                                                    },
                                                    t,
                                                  ),
                                                ),
                                              }),
                                            (0, M.jsxs)(`label`, {
                                              htmlFor: `question-text`,
                                              children: [
                                                translate(`Question`),
                                                (0, M.jsx)(`textarea`, {
                                                  id: `question-text`,
                                                  dir: `auto`,
                                                  value: j[A].prompt,
                                                  maxLength: 2e3,
                                                  onChange: (e) =>
                                                    dn(A, {
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
                                            (0, M.jsxs)(`fieldset`, {
                                              className: `builder-options`,
                                              children: [
                                                (0, M.jsx)(`legend`, {
                                                  children:
                                                    translate(`Answer choices`),
                                                }),
                                                (0, M.jsx)(`p`, {
                                                  className: `help`,
                                                  children: translate(
                                                    `Enter four options and select the correct answer.`,
                                                  ),
                                                }),
                                                j[A].options.map((e, t) =>
                                                  (0, M.jsxs)(
                                                    `div`,
                                                    {
                                                      className:
                                                        j[A].correct === t
                                                          ? `is-correct`
                                                          : ``,
                                                      children: [
                                                        (0, M.jsxs)(`label`, {
                                                          className: `correct-selector`,
                                                          children: [
                                                            (0, M.jsx)(
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
                                                                onChange: () =>
                                                                  dn(A, {
                                                                    correct: t,
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
                                                            (0, M.jsx)(`span`, {
                                                              children: `ABCD`[
                                                                t
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                        (0, M.jsx)(`input`, {
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
                                                            dn(A, {
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
                                                          (0, M.jsxs)(`span`, {
                                                            className: `correct-label`,
                                                            children: [
                                                              (0, M.jsx)(ce, {
                                                                size: 14,
                                                              }),
                                                              translate(
                                                                `Correct`,
                                                              ),
                                                            ],
                                                          }),
                                                      ],
                                                    },
                                                    t,
                                                  ),
                                                ),
                                              ],
                                            }),
                                            (0, M.jsxs)(`label`, {
                                              children: [
                                                translate(
                                                  `Answer explanation `,
                                                ),
                                                (0, M.jsx)(`span`, {
                                                  className: `optional`,
                                                  children:
                                                    translate(`Optional`),
                                                }),
                                                (0, M.jsx)(`textarea`, {
                                                  dir: `auto`,
                                                  value: j[A].explanation,
                                                  maxLength: 2e3,
                                                  onChange: (e) =>
                                                    dn(A, {
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
                                              (0, M.jsxs)(`blockquote`, {
                                                className: `source-evidence`,
                                                children: [
                                                  (0, M.jsx)(`b`, {
                                                    children: translate(
                                                      `From your lesson notes`,
                                                    ),
                                                  }),
                                                  (0, M.jsx)(`p`, {
                                                    children: j[A].evidence,
                                                  }),
                                                ],
                                              }),
                                            (0, M.jsxs)(`button`, {
                                              type: `button`,
                                              className: `secondary add-question`,
                                              disabled:
                                                j.length >= 50 || !St(j[A]),
                                              onClick: () => {
                                                (xe(j.length),
                                                  Me((e) => [...e, bt()]));
                                              },
                                              children: [
                                                (0, M.jsx)(Ee, { size: 17 }),
                                                translate(
                                                  `Add another question`,
                                                ),
                                              ],
                                            }),
                                          ],
                                        })
                                      : (0, M.jsxs)(`div`, {
                                          className: `builder-panel review-quiz`,
                                          children: [
                                            (0, M.jsx)(`h2`, {
                                              children:
                                                translate(`Review your quiz`),
                                            }),
                                            (0, M.jsxs)(`div`, {
                                              className: `quiz-review-title`,
                                              children: [
                                                (0, M.jsx)(ie, { size: 24 }),
                                                (0, M.jsxs)(`div`, {
                                                  children: [
                                                    (0, M.jsx)(`h3`, {
                                                      children: Ce,
                                                    }),
                                                    (0, M.jsxs)(`p`, {
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
                                              (0, M.jsx)(`p`, { children: De }),
                                            (0, M.jsx)(`p`, {
                                              children: translate(
                                                `Publishing makes this quiz available to anyone with its student link.`,
                                              ),
                                            }),
                                            (0, M.jsx)(`h3`, {
                                              children: translate(
                                                `Questions and correct answers`,
                                              ),
                                            }),
                                            j.map((e, t) =>
                                              (0, M.jsxs)(
                                                `div`,
                                                {
                                                  className: `review-question`,
                                                  children: [
                                                    (0, M.jsxs)(`b`, {
                                                      children: [
                                                        t + 1,
                                                        `. `,
                                                        e.prompt,
                                                      ],
                                                    }),
                                                    (0, M.jsxs)(`p`, {
                                                      dir: `auto`,
                                                      children: [
                                                        (0, M.jsx)(ce, {
                                                          size: 15,
                                                        }),
                                                        e.options[e.correct],
                                                      ],
                                                    }),
                                                    (0, M.jsxs)(`button`, {
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
                                            Yt &&
                                              (0, M.jsxs)(`label`, {
                                                className: `review-approval`,
                                                children: [
                                                  (0, M.jsx)(`input`, {
                                                    type: `checkbox`,
                                                    checked: Zt,
                                                    onChange: (e) =>
                                                      Qt(e.target.checked),
                                                    required: !0,
                                                  }),
                                                  translate(
                                                    `I have reviewed the AI questions and correct answers.`,
                                                  ),
                                                ],
                                              }),
                                          ],
                                        }),
                                  (0, M.jsxs)(`div`, {
                                    className: `builder-footer`,
                                    children: [
                                      (0, M.jsxs)(`div`, {
                                        children: [
                                          k > 0 &&
                                            (0, M.jsxs)(`button`, {
                                              type: `button`,
                                              className: `secondary`,
                                              onClick: () => ve((e) => e - 1),
                                              children: [
                                                (0, M.jsx)(te, { size: 17 }),
                                                translate(`Back`),
                                              ],
                                            }),
                                          (0, M.jsxs)(`button`, {
                                            type: `button`,
                                            className: `text-button`,
                                            disabled: c || !En,
                                            onClick: () => fn(!1),
                                            children: [
                                              (0, M.jsx)(Ae, { size: 16 }),
                                              translate(`Save draft`),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, M.jsxs)(`button`, {
                                        className: `primary`,
                                        disabled: c,
                                        children: [
                                          c
                                            ? translate(`Saving…`)
                                            : k === 0
                                              ? translate(`Next: add questions`)
                                              : k === 1
                                                ? translate(`Next: review quiz`)
                                                : translate(`Publish quiz`),
                                          k === 2
                                            ? (0, M.jsx)(Ne, { size: 17 })
                                            : (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  !En &&
                                    (0, M.jsx)(`p`, {
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
                          ? (0, M.jsxs)(`section`, {
                              className: `ai-drafter`,
                              children: [
                                (0, M.jsxs)(`button`, {
                                  className: `text-button back`,
                                  onClick: () => L(`quizzes`),
                                  children: [
                                    (0, M.jsx)(te, { size: 17 }),
                                    translate(`Back to quizzes`),
                                  ],
                                }),
                                (0, M.jsx)(`h1`, {
                                  children: translate(`Draft a quiz with AI`),
                                }),
                                (0, M.jsx)(`p`, {
                                  children: translate(
                                    `Paste a transcript or detailed teaching notes. AI will draft challenging questions with plausible answer choices for you to review.`,
                                  ),
                                }),
                                !e.aiConfigured &&
                                  (0, M.jsxs)(`div`, {
                                    className: `ai-setup`,
                                    children: [
                                      (0, M.jsx)(be, { size: 20 }),
                                      (0, M.jsxs)(`div`, {
                                        children: [
                                          (0, M.jsx)(`h2`, {
                                            children: translate(
                                              `Connect Gemini to use AI`,
                                            ),
                                          }),
                                          (0, M.jsx)(`p`, {
                                            children: translate(
                                              `The integration is ready, but no server API key is connected. Manual quizzes and automatic grading already work.`,
                                            ),
                                          }),
                                          (0, M.jsxs)(`p`, {
                                            children: [
                                              translate(`Set `),
                                              (0, M.jsx)(`code`, {
                                                children: `GEMINI_API_KEY`,
                                              }),
                                              translate(
                                                ` as a secret in this site’s server settings, then redeploy. Keep the key out of student links and public code.`,
                                              ),
                                            ],
                                          }),
                                          (0, M.jsxs)(`a`, {
                                            href: `https://aistudio.google.com/apikey`,
                                            target: `_blank`,
                                            rel: `noreferrer`,
                                            children: [
                                              translate(
                                                `Open Google AI Studio`,
                                              ),
                                              (0, M.jsx)(w, { size: 15 }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                (0, M.jsxs)(`form`, {
                                  onSubmit: (e) => {
                                    (e.preventDefault(), An());
                                  },
                                  children: [
                                    (0, M.jsxs)(`label`, {
                                      children: [
                                        translate(`Lesson title`),
                                        (0, M.jsx)(`input`, {
                                          value: zt,
                                          maxLength: 150,
                                          onChange: (e) => Bt(e.target.value),
                                          placeholder: translate(
                                            `For example: Etiquette of eating`,
                                          ),
                                          required: !0,
                                        }),
                                      ],
                                    }),
                                    (0, M.jsxs)(`fieldset`, {
                                      className: `choice-group`,
                                      children: [
                                        (0, M.jsx)(`legend`, {
                                          children: translate(`Halaqah`),
                                        }),
                                        (0, M.jsx)(`div`, {
                                          children: [
                                            {
                                              id: `saturday`,
                                              label: translate(`Saturday`),
                                              detail: translate(`Core lesson`),
                                            },
                                            {
                                              id: `tuesday`,
                                              label: translate(`Tuesday`),
                                              detail:
                                                translate(`Optional practice`),
                                            },
                                          ].map((e) =>
                                            (0, M.jsxs)(
                                              `label`,
                                              {
                                                className:
                                                  Ut === e.id ? `selected` : ``,
                                                children: [
                                                  (0, M.jsx)(`input`, {
                                                    type: `radio`,
                                                    name: `session`,
                                                    checked: Ut === e.id,
                                                    onChange: () => Wt(e.id),
                                                  }),
                                                  (0, M.jsx)(`b`, {
                                                    children: e.label,
                                                  }),
                                                  (0, M.jsx)(`small`, {
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
                                    (0, M.jsxs)(`label`, {
                                      children: [
                                        translate(
                                          `Transcript or detailed teaching notes`,
                                        ),
                                        (0, M.jsx)(`textarea`, {
                                          rows: 10,
                                          minLength: 100,
                                          maxLength: 3e4,
                                          value: Vt,
                                          onChange: (e) => Ht(e.target.value),
                                          placeholder: translate(
                                            `Paste what was taught, including the key facts and explanations. For topic-only input, add your intended teaching points.`,
                                          ),
                                          required: !0,
                                        }),
                                      ],
                                    }),
                                    (0, M.jsx)(`p`, {
                                      className: `help`,
                                      children: translate(
                                        `100–30,000 characters. Each correct answer must be supported by an excerpt from these notes. Your notes are sent to Gemini when you generate.`,
                                      ),
                                    }),
                                    (0, M.jsxs)(`fieldset`, {
                                      className: `choice-group`,
                                      children: [
                                        (0, M.jsx)(`legend`, {
                                          children:
                                            translate(`Number of questions`),
                                        }),
                                        (0, M.jsx)(`div`, {
                                          children: [5, 10, 15].map((e) =>
                                            (0, M.jsxs)(
                                              `label`,
                                              {
                                                className:
                                                  Gt === e ? `selected` : ``,
                                                children: [
                                                  (0, M.jsx)(`input`, {
                                                    type: `radio`,
                                                    name: `count`,
                                                    checked: Gt === e,
                                                    onChange: () => Kt(e),
                                                  }),
                                                  (0, M.jsx)(`b`, {
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
                                    (0, M.jsxs)(`p`, {
                                      className: `info-note`,
                                      children: [
                                        (0, M.jsx)(ue, { size: 17 }),
                                        translate(
                                          `AI drafts are checked for evidence and ambiguity. You review the answers before publishing.`,
                                        ),
                                      ],
                                    }),
                                    (0, M.jsxs)(`button`, {
                                      className: `primary`,
                                      disabled: c || !e.aiConfigured,
                                      children: [
                                        c
                                          ? translate(
                                              `Drafting and checking questions…`,
                                            )
                                          : translate(`Generate quiz draft`),
                                        (0, M.jsx)(Fe, { size: 17 }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : e && e.teacher && n === `manage` && Lt
                            ? (0, M.jsxs)(`section`, {
                                className: `quiz-settings`,
                                children: [
                                  (0, M.jsxs)(`button`, {
                                    className: `text-button back`,
                                    onClick: () => L(`quizzes`),
                                    children: [
                                      (0, M.jsx)(te, { size: 17 }),
                                      translate(`Back to quizzes`),
                                    ],
                                  }),
                                  (0, M.jsx)(`h1`, { children: Lt.title }),
                                  (0, M.jsxs)(`p`, {
                                    className: `help`,
                                    children: [
                                      Lt.questions.length,
                                      translate(` questions · `),
                                      Lt.published
                                        ? translate(`Published`)
                                        : translate(`Not published`),
                                    ],
                                  }),
                                  Lt.published &&
                                    (0, M.jsxs)(`button`, {
                                      className: `primary`,
                                      onClick: () =>
                                        pn(
                                          (e?.publicSiteUrl ||
                                            location.origin + `/`) +
                                            `?quiz=` +
                                            encodeURIComponent(Lt.id),
                                        ),
                                      children: [
                                        (0, M.jsx)(me, { size: 16 }),
                                        translate(`Copy student link`),
                                      ],
                                    }),
                                  (0, M.jsxs)(`div`, {
                                    className: `manage-action-list`,
                                    children: [
                                      (0, M.jsxs)(`button`, {
                                        onClick: () => an(Lt, !0),
                                        children: [
                                          (0, M.jsx)(O, { size: 21 }),
                                          (0, M.jsxs)(`span`, {
                                            children: [
                                              (0, M.jsx)(`b`, {
                                                children:
                                                  translate(`Preview quiz`),
                                              }),
                                              (0, M.jsx)(`small`, {
                                                children: translate(
                                                  `Try the quiz without saving a grade.`,
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                      (0, M.jsxs)(`button`, {
                                        onClick: () => mn(Lt),
                                        children: [
                                          (0, M.jsx)(E, { size: 21 }),
                                          (0, M.jsxs)(`span`, {
                                            children: [
                                              (0, M.jsx)(`b`, {
                                                children:
                                                  translate(`View results`),
                                              }),
                                              (0, M.jsx)(`small`, {
                                                children: translate(
                                                  `See automatically graded submissions.`,
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                      (0, M.jsxs)(`button`, {
                                        onClick: () => un(Lt),
                                        children: [
                                          (0, M.jsx)(me, { size: 21 }),
                                          (0, M.jsxs)(`span`, {
                                            children: [
                                              (0, M.jsx)(`b`, {
                                                children:
                                                  translate(`Make a copy`),
                                              }),
                                              (0, M.jsx)(`small`, {
                                                children: translate(
                                                  `Create a new version and keep existing results.`,
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                      Lt.published &&
                                        (0, M.jsxs)(`button`, {
                                          disabled: c,
                                          onClick: () =>
                                            I(async () => {
                                              (await F(
                                                `/api/quizzes`,
                                                `PATCH`,
                                                { id: Lt.id, published: !1 },
                                              ),
                                                await $t(),
                                                rn(`quizzes`),
                                                s(
                                                  translate(
                                                    `Quiz closed. Existing results are kept.`,
                                                  ),
                                                ));
                                            }),
                                          children: [
                                            (0, M.jsx)(Ve, { size: 21 }),
                                            (0, M.jsxs)(`span`, {
                                              children: [
                                                (0, M.jsx)(`b`, {
                                                  children:
                                                    translate(`Close quiz`),
                                                }),
                                                (0, M.jsx)(`small`, {
                                                  children: translate(
                                                    `Stop accepting new submissions.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, M.jsx)(w, { size: 17 }),
                                          ],
                                        }),
                                      (0, M.jsxs)(`button`, {
                                        className: `danger`,
                                        disabled: c,
                                        onClick: () => hn(Lt),
                                        children: [
                                          (0, M.jsx)(Le, { size: 21 }),
                                          (0, M.jsxs)(`span`, {
                                            children: [
                                              (0, M.jsx)(`b`, {
                                                children:
                                                  translate(`Delete quiz`),
                                              }),
                                              (0, M.jsx)(`small`, {
                                                children: translate(
                                                  `Remove this quiz and its saved submissions.`,
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, M.jsx)(w, { size: 17 }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : e && n === `quizzes`
                              ? (0, M.jsxs)(M.Fragment, {
                                  children: [
                                    (0, M.jsxs)(`div`, {
                                      className: `page-heading`,
                                      children: [
                                        (0, M.jsxs)(`div`, {
                                          children: [
                                            (0, M.jsx)(`h1`, {
                                              children: e.teacher
                                                ? translate(`Quizzes`)
                                                : translate(`Take a quiz`),
                                            }),
                                            (0, M.jsx)(`p`, {
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
                                          (0, M.jsxs)(`div`, {
                                            className: `heading-actions`,
                                            children: [
                                              (0, M.jsxs)(`button`, {
                                                className: `secondary`,
                                                onClick: () => L(`ai`),
                                                children: [
                                                  (0, M.jsx)(Fe, { size: 17 }),
                                                  translate(`Draft with AI`),
                                                ],
                                              }),
                                              (0, M.jsxs)(`button`, {
                                                className: `primary`,
                                                onClick: () => un(),
                                                children: [
                                                  (0, M.jsx)(Ee, { size: 18 }),
                                                  translate(`Create quiz`),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.teacher
                                      ? (0, M.jsxs)(M.Fragment, {
                                          children: [
                                            (0, M.jsxs)(`div`, {
                                              className: `quiz-tools`,
                                              children: [
                                                (0, M.jsx)(`div`, {
                                                  className: `filter-tabs`,
                                                  "aria-label":
                                                    translate(`Filter quizzes`),
                                                  children: [
                                                    {
                                                      id: `all`,
                                                      label: translate(`All`),
                                                      n: yn.length,
                                                    },
                                                    {
                                                      id: `published`,
                                                      label:
                                                        translate(`Published`),
                                                      n: bn.length,
                                                    },
                                                    {
                                                      id: `draft`,
                                                      label:
                                                        translate(
                                                          `Drafts & closed`,
                                                        ),
                                                      n: xn.length,
                                                    },
                                                  ].map((e) =>
                                                    (0, M.jsxs)(
                                                      `button`,
                                                      {
                                                        className:
                                                          Mt === e.id
                                                            ? `selected`
                                                            : ``,
                                                        "aria-pressed":
                                                          Mt === e.id,
                                                        onClick: () => Nt(e.id),
                                                        children: [
                                                          e.label,
                                                          (0, M.jsx)(`span`, {
                                                            children: e.n,
                                                          }),
                                                        ],
                                                      },
                                                      e.id,
                                                    ),
                                                  ),
                                                }),
                                                yn.length > 3 &&
                                                  (0, M.jsxs)(`label`, {
                                                    className: `search-field`,
                                                    children: [
                                                      (0, M.jsx)(je, {
                                                        size: 17,
                                                      }),
                                                      (0, M.jsx)(`span`, {
                                                        className: `sr-only`,
                                                        children:
                                                          translate(
                                                            `Search quizzes`,
                                                          ),
                                                      }),
                                                      (0, M.jsx)(`input`, {
                                                        placeholder:
                                                          translate(
                                                            `Search quizzes`,
                                                          ),
                                                        value: At,
                                                        onChange: (e) =>
                                                          jt(e.target.value),
                                                      }),
                                                    ],
                                                  }),
                                              ],
                                            }),
                                            (0, M.jsxs)(`div`, {
                                              className: `quiz-management`,
                                              children: [
                                                Sn.map((t) => {
                                                  let n = e.submissions.filter(
                                                      (e) => e.quiz_id === t.id,
                                                    ).length,
                                                    r = !t.published && n > 0;
                                                  return (0, M.jsxs)(
                                                    `article`,
                                                    {
                                                      className: `manage-quiz`,
                                                      children: [
                                                        (0, M.jsxs)(`div`, {
                                                          className: `manage-quiz-copy`,
                                                          children: [
                                                            (0, M.jsx)(`span`, {
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
                                                            }),
                                                            (0, M.jsx)(`h2`, {
                                                              children: t.title,
                                                            }),
                                                            (0, M.jsxs)(`p`, {
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
                                                        (0, M.jsxs)(`div`, {
                                                          className: `quiz-actions`,
                                                          children: [
                                                            t.published
                                                              ? (0, M.jsxs)(
                                                                  M.Fragment,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      M.jsxs)(
                                                                        `button`,
                                                                        {
                                                                          className: `primary`,
                                                                          onClick:
                                                                            () =>
                                                                              pn(
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
                                                                              M.jsx)(
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
                                                                      M.jsx)(
                                                                        `button`,
                                                                        {
                                                                          className: `secondary`,
                                                                          onClick:
                                                                            () =>
                                                                              mn(
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
                                                              : (0, M.jsxs)(
                                                                  M.Fragment,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      M.jsx)(
                                                                        `button`,
                                                                        {
                                                                          className: `primary`,
                                                                          onClick:
                                                                            () =>
                                                                              r
                                                                                ? un(
                                                                                    t,
                                                                                  )
                                                                                : un(
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
                                                                      M.jsx)(
                                                                        `button`,
                                                                        {
                                                                          className: `secondary`,
                                                                          disabled:
                                                                            c,
                                                                          onClick:
                                                                            () =>
                                                                              r
                                                                                ? I(
                                                                                    async () => {
                                                                                      (await F(
                                                                                        `/api/quizzes`,
                                                                                        `PATCH`,
                                                                                        {
                                                                                          id: t.id,
                                                                                          published:
                                                                                            !0,
                                                                                        },
                                                                                      ),
                                                                                        await $t(),
                                                                                        s(
                                                                                          translate(
                                                                                            `Quiz reopened. Copy its student link to share it.`,
                                                                                          ),
                                                                                        ),
                                                                                        kt(
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
                                                                                : un(
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
                                                            (0, M.jsxs)(
                                                              `button`,
                                                              {
                                                                className: `text-button`,
                                                                onClick: () => {
                                                                  (Rt(t),
                                                                    rn(
                                                                      `manage`,
                                                                    ));
                                                                },
                                                                children: [
                                                                  translate(
                                                                    `Manage quiz`,
                                                                  ),
                                                                  (0, M.jsx)(
                                                                    w,
                                                                    {
                                                                      size: 14,
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                            (0, M.jsxs)(
                                                              `button`,
                                                              {
                                                                className: `text-button danger`,
                                                                disabled: c,
                                                                onClick: () =>
                                                                  hn(t),
                                                                children: [
                                                                  (0, M.jsx)(
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
                                                !Sn.length &&
                                                  (0, M.jsxs)(`div`, {
                                                    className: `empty-state`,
                                                    children: [
                                                      (0, M.jsx)(`h2`, {
                                                        children: yn.length
                                                          ? translate(
                                                              `No quizzes match this filter`,
                                                            )
                                                          : translate(
                                                              `Create your first quiz`,
                                                            ),
                                                      }),
                                                      (0, M.jsx)(`p`, {
                                                        children: yn.length
                                                          ? translate(
                                                              `Choose another filter to see your quizzes.`,
                                                            )
                                                          : translate(
                                                              `Add questions, choose the correct answers, then publish.`,
                                                            ),
                                                      }),
                                                      !yn.length &&
                                                        (0, M.jsxs)(`button`, {
                                                          className: `primary`,
                                                          onClick: () => un(),
                                                          children: [
                                                            (0, M.jsx)(Ee, {
                                                              size: 17,
                                                            }),
                                                            translate(
                                                              `Create quiz`,
                                                            ),
                                                          ],
                                                        }),
                                                    ],
                                                  }),
                                              ],
                                            }),
                                            !yn.length &&
                                              !e.records.length &&
                                              (0, M.jsx)(`button`, {
                                                className: `text-button`,
                                                disabled: c,
                                                onClick: () =>
                                                  I(async () => {
                                                    (await F(
                                                      `/api/setup`,
                                                      `POST`,
                                                      {},
                                                    ),
                                                      await $t(),
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
                                            (0, M.jsxs)(`p`, {
                                              className: `help library-help`,
                                              children: [
                                                (0, M.jsx)(be, { size: 14 }),
                                                translate(
                                                  `You’re viewing teacher controls. Student links open the quiz directly. Home, leaderboards and published funny answers are public.`,
                                                ),
                                              ],
                                            }),
                                          ],
                                        })
                                      : (0, M.jsxs)(M.Fragment, {
                                          children: [
                                            (0, M.jsx)(`div`, {
                                              className: `student-quizzes`,
                                              children: bn.map((e) =>
                                                (0, M.jsxs)(
                                                  `article`,
                                                  {
                                                    className: `student-quiz`,
                                                    children: [
                                                      (0, M.jsxs)(`div`, {
                                                        children: [
                                                          (0, M.jsx)(`h2`, {
                                                            children: e.title,
                                                          }),
                                                          e.description &&
                                                            (0, M.jsx)(`p`, {
                                                              children:
                                                                e.description,
                                                            }),
                                                          (0, M.jsxs)(`span`, {
                                                            className: `help`,
                                                            children: [
                                                              e.questions
                                                                .length,
                                                              translate(
                                                                ` questions · no time limit`,
                                                              ),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      (0, M.jsxs)(`button`, {
                                                        className: `primary`,
                                                        onClick: () => an(e),
                                                        children: [
                                                          translate(
                                                            `Start quiz`,
                                                          ),
                                                          (0, M.jsx)(w, {
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
                                            !bn.length &&
                                              (0, M.jsxs)(`div`, {
                                                className: `empty-state`,
                                                children: [
                                                  (0, M.jsx)(ie, { size: 30 }),
                                                  (0, M.jsx)(`h2`, {
                                                    children: translate(
                                                      `No quizzes are available yet`,
                                                    ),
                                                  }),
                                                  (0, M.jsx)(`p`, {
                                                    children: translate(
                                                      `Your teacher will share the next quiz here.`,
                                                    ),
                                                  }),
                                                  (0, M.jsxs)(`button`, {
                                                    className: `primary`,
                                                    onClick: () => L(`home`),
                                                    children: [
                                                      translate(`Back home`),
                                                      (0, M.jsx)(w, {
                                                        size: 17,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ne &&
                                              (0, M.jsxs)(`div`, {
                                                className: `recent-result`,
                                                children: [
                                                  (0, M.jsx)(ue, { size: 22 }),
                                                  (0, M.jsxs)(`div`, {
                                                    children: [
                                                      (0, M.jsxs)(`b`, {
                                                        children: [
                                                          translate(
                                                            `Your latest result: `,
                                                          ),
                                                          ne.score,
                                                          `/`,
                                                          ne.max,
                                                        ],
                                                      }),
                                                      (0, M.jsxs)(`p`, {
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
                                ? (0, M.jsxs)(M.Fragment, {
                                    children: [
                                      (0, M.jsx)(`div`, {
                                        className: `page-heading`,
                                        children: (0, M.jsxs)(`div`, {
                                          children: [
                                            (0, M.jsx)(`h1`, {
                                              children: translate(`Grades`),
                                            }),
                                            (0, M.jsx)(`p`, {
                                              children: translate(
                                                `Select a quiz to enter paper grades or view online submissions.`,
                                              ),
                                            }),
                                          ],
                                        }),
                                      }),
                                      kn(`grade-quiz`),
                                      Pe === yt
                                        ? (0, M.jsxs)(`form`, {
                                            onSubmit: (e) => {
                                              (e.preventDefault(),
                                                I(async () => {
                                                  (await F(
                                                    `/api/records`,
                                                    `POST`,
                                                    {
                                                      records: Re.map((e) => ({
                                                        ...e,
                                                        regular: Number(
                                                          e.regular,
                                                        ),
                                                        bonus: Number(e.bonus),
                                                      })),
                                                    },
                                                  ),
                                                    await $t(),
                                                    Ue(!1),
                                                    s(
                                                      translate(
                                                        `All grades saved. The leaderboard is updated.`,
                                                      ),
                                                    ));
                                                }));
                                            },
                                            children: [
                                              (0, M.jsxs)(`div`, {
                                                className: `grade-instructions`,
                                                children: [
                                                  (0, M.jsxs)(`p`, {
                                                    children: [
                                                      (0, M.jsx)(`b`, {
                                                        children: translate(
                                                          `Original etiquette quiz`,
                                                        ),
                                                      }),
                                                      translate(
                                                        ` · 13 regular points + 1 optional bonus.`,
                                                      ),
                                                    ],
                                                  }),
                                                  (0, M.jsxs)(`p`, {
                                                    children: [
                                                      translate(
                                                        `Change a score below, then select `,
                                                      ),
                                                      (0, M.jsx)(`b`, {
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
                                              (0, M.jsxs)(`div`, {
                                                className: `grade-list`,
                                                children: [
                                                  (0, M.jsxs)(`div`, {
                                                    className: `grade-list-heading`,
                                                    "aria-hidden": `true`,
                                                    children: [
                                                      (0, M.jsx)(`span`, {
                                                        children:
                                                          translate(`Student`),
                                                      }),
                                                      (0, M.jsx)(`span`, {
                                                        children:
                                                          translate(
                                                            `Regular /13`,
                                                          ),
                                                      }),
                                                      (0, M.jsx)(`span`, {
                                                        children:
                                                          translate(`Bonus /1`),
                                                      }),
                                                      (0, M.jsx)(`span`, {
                                                        children:
                                                          translate(`Total`),
                                                      }),
                                                    ],
                                                  }),
                                                  Re.map((e, t) =>
                                                    (0, M.jsxs)(
                                                      `div`,
                                                      {
                                                        className: `grade-row`,
                                                        children: [
                                                          (0, M.jsx)(`b`, {
                                                            className: `grade-name`,
                                                            children: e.name,
                                                          }),
                                                          (0, M.jsxs)(`label`, {
                                                            children: [
                                                              (0, M.jsx)(
                                                                `span`,
                                                                {
                                                                  children:
                                                                    translate(
                                                                      `Regular /13`,
                                                                    ),
                                                                },
                                                              ),
                                                              (0, M.jsx)(
                                                                `input`,
                                                                {
                                                                  "aria-label":
                                                                    translate(
                                                                      `Regular grade for `,
                                                                    ) + e.name,
                                                                  type: `number`,
                                                                  inputMode: `numeric`,
                                                                  min: 0,
                                                                  max: 13,
                                                                  step: 1,
                                                                  required: !0,
                                                                  value:
                                                                    e.regular,
                                                                  onChange: (
                                                                    e,
                                                                  ) => {
                                                                    (Be((n) =>
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
                                                                      Ue(!0));
                                                                  },
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, M.jsxs)(`label`, {
                                                            children: [
                                                              (0, M.jsx)(
                                                                `span`,
                                                                {
                                                                  children:
                                                                    translate(
                                                                      `Bonus /1`,
                                                                    ),
                                                                },
                                                              ),
                                                              (0, M.jsx)(
                                                                `input`,
                                                                {
                                                                  "aria-label":
                                                                    translate(
                                                                      `Bonus grade for `,
                                                                    ) + e.name,
                                                                  type: `number`,
                                                                  inputMode: `numeric`,
                                                                  min: 0,
                                                                  max: 1,
                                                                  step: 1,
                                                                  required: !0,
                                                                  value:
                                                                    e.bonus,
                                                                  onChange: (
                                                                    e,
                                                                  ) => {
                                                                    (Be((n) =>
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
                                                                      Ue(!0));
                                                                  },
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, M.jsxs)(
                                                            `strong`,
                                                            {
                                                              className: `grade-total`,
                                                              children: [
                                                                (0, M.jsx)(
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
                                                                (0, M.jsx)(
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
                                                (0, M.jsxs)(`div`, {
                                                  className: `empty-state`,
                                                  children: [
                                                    (0, M.jsx)(`h2`, {
                                                      children:
                                                        translate(
                                                          `No paper grades yet`,
                                                        ),
                                                    }),
                                                    (0, M.jsx)(`p`, {
                                                      children: translate(
                                                        `Load the original quiz from Quizzes to start.`,
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              (0, M.jsxs)(`div`, {
                                                className: `grade-savebar`,
                                                children: [
                                                  (0, M.jsx)(`span`, {
                                                    children: He
                                                      ? translate(
                                                          `You have unsaved changes.`,
                                                        )
                                                      : translate(
                                                          `Grades are up to date.`,
                                                        ),
                                                  }),
                                                  (0, M.jsxs)(`button`, {
                                                    className: `primary`,
                                                    disabled:
                                                      c || !He || !Re.length,
                                                    children: [
                                                      c
                                                        ? translate(`Saving…`)
                                                        : translate(
                                                            `Save all grades`,
                                                          ),
                                                      (0, M.jsx)(ce, {
                                                        size: 17,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          })
                                        : (0, M.jsxs)(M.Fragment, {
                                            children: [
                                              (0, M.jsxs)(`p`, {
                                                className: `info-note`,
                                                children: [
                                                  (0, M.jsx)(ue, { size: 17 }),
                                                  translate(
                                                    `Online submissions are graded automatically. No entry is needed.`,
                                                  ),
                                                ],
                                              }),
                                              wn.length
                                                ? (0, M.jsxs)(M.Fragment, {
                                                    children: [
                                                      (0, M.jsxs)(`div`, {
                                                        className: `simple-results`,
                                                        children: [
                                                          (0, M.jsxs)(`div`, {
                                                            className: `results-column-headings`,
                                                            children: [
                                                              (0, M.jsx)(
                                                                `span`,
                                                                {
                                                                  children:
                                                                    translate(
                                                                      `Student`,
                                                                    ),
                                                                },
                                                              ),
                                                              (0, M.jsx)(
                                                                `span`,
                                                                {
                                                                  children:
                                                                    translate(
                                                                      `Score`,
                                                                    ),
                                                                },
                                                              ),
                                                              (0, M.jsx)(
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
                                                              (0, M.jsxs)(
                                                                `div`,
                                                                {
                                                                  className: `submission-row`,
                                                                  children: [
                                                                    (0, M.jsxs)(
                                                                      `div`,
                                                                      {
                                                                        children:
                                                                          [
                                                                            (0,
                                                                            M.jsx)(
                                                                              `b`,
                                                                              {
                                                                                children:
                                                                                  e.name,
                                                                              },
                                                                            ),
                                                                            (0,
                                                                            M.jsx)(
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
                                                                    (0, M.jsxs)(
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
                                                                    (0, M.jsxs)(
                                                                      `b`,
                                                                      {
                                                                        children:
                                                                          [
                                                                            Ge(
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
                                                      (0, M.jsxs)(`button`, {
                                                        className: `secondary section-action`,
                                                        onClick: () =>
                                                          L(`leaderboard`),
                                                        children: [
                                                          translate(
                                                            `View leaderboard`,
                                                          ),
                                                          (0, M.jsx)(ze, {
                                                            size: 17,
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  })
                                                : (0, M.jsxs)(`div`, {
                                                    className: `empty-state`,
                                                    children: [
                                                      (0, M.jsx)(`h2`, {
                                                        children:
                                                          translate(
                                                            `No submissions yet`,
                                                          ),
                                                      }),
                                                      (0, M.jsx)(`p`, {
                                                        children: translate(
                                                          `Share this quiz’s student link. Results appear here after students submit.`,
                                                        ),
                                                      }),
                                                      Cn?.published &&
                                                        (0, M.jsxs)(`button`, {
                                                          className: `primary`,
                                                          onClick: () =>
                                                            pn(
                                                              (e?.publicSiteUrl ||
                                                                location.origin +
                                                                  `/`) +
                                                                `?quiz=` +
                                                                encodeURIComponent(
                                                                  Cn.id,
                                                                ),
                                                            ),
                                                          children: [
                                                            (0, M.jsx)(me, {
                                                              size: 16,
                                                            }),
                                                            translate(
                                                              `Copy student link`,
                                                            ),
                                                          ],
                                                        }),
                                                    ],
                                                  }),
                                            ],
                                          }),
                                    ],
                                  })
                                : e && e.teacher && n === `leaderboard`
                                  ? (0, M.jsxs)(M.Fragment, {
                                      children: [
                                        (0, M.jsxs)(`div`, {
                                          className: `page-heading`,
                                          children: [
                                            (0, M.jsxs)(`div`, {
                                              children: [
                                                (0, M.jsx)(`h1`, {
                                                  children:
                                                    translate(`Leaderboard`),
                                                }),
                                                (0, M.jsx)(`p`, {
                                                  children: translate(
                                                    `Rankings for the selected quiz. Equal scores share a rank.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, M.jsxs)(`button`, {
                                              className: `secondary`,
                                              onClick: () => L(`grades`),
                                              children: [
                                                (0, M.jsx)(we, { size: 16 }),
                                                translate(`Enter grades`),
                                              ],
                                            }),
                                          ],
                                        }),
                                        kn(`leaderboard-quiz`),
                                        wn.length
                                          ? (0, M.jsxs)(M.Fragment, {
                                              children: [
                                                (0, M.jsxs)(`div`, {
                                                  className: `leaderboard-summary`,
                                                  children: [
                                                    (0, M.jsxs)(`span`, {
                                                      children: [
                                                        wn.length,
                                                        ` `,
                                                        Pe === yt
                                                          ? translate(
                                                              `students`,
                                                            )
                                                          : translate(
                                                              `attempts`,
                                                            ),
                                                        translate(
                                                          ` · Average `,
                                                        ),
                                                        Tn,
                                                        `%`,
                                                      ],
                                                    }),
                                                    (0, M.jsxs)(`button`, {
                                                      className: `text-button`,
                                                      onClick: () =>
                                                        pn(
                                                          `Assalamu alaikum everyone,

*أصحاب الخيمة — ` +
                                                            (Cn?.title ||
                                                              translate(
                                                                `Original Etiquette Quiz`,
                                                              )) +
                                                            `*

` +
                                                            wn.map(
                                                              (e) =>
                                                                `${e.rank}. ${e.name} — ${e.score}/${e.max} (${Ge(e).toFixed(1)}%)`,
                                                            ).join(`
`) +
                                                            `

Jazakum Allahu khayran.`,
                                                        ),
                                                      children: [
                                                        (0, M.jsx)(me, {
                                                          size: 15,
                                                        }),
                                                        translate(
                                                          `Copy results`,
                                                        ),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, M.jsx)(`section`, {
                                                  className: `leaderboard-podium`,
                                                  children: (0, M.jsx)(Je, {
                                                    rows: wn,
                                                  }),
                                                }),
                                                (0, M.jsxs)(`div`, {
                                                  className: `ranking-list`,
                                                  "aria-label":
                                                    translate(`Quiz rankings`),
                                                  children: [
                                                    (0, M.jsxs)(`div`, {
                                                      className: `ranking-header`,
                                                      children: [
                                                        (0, M.jsx)(`span`, {
                                                          children:
                                                            translate(`Rank`),
                                                        }),
                                                        (0, M.jsx)(`span`, {
                                                          children:
                                                            translate(
                                                              `Student`,
                                                            ),
                                                        }),
                                                        (0, M.jsx)(`span`, {
                                                          children:
                                                            translate(`Score`),
                                                        }),
                                                        (0, M.jsx)(`span`, {
                                                          children:
                                                            translate(
                                                              `Percentage`,
                                                            ),
                                                        }),
                                                      ],
                                                    }),
                                                    wn.map((e) =>
                                                      (0, M.jsxs)(
                                                        `div`,
                                                        {
                                                          className:
                                                            `ranking-row` +
                                                            (e.rank === 1
                                                              ? ` is-champion`
                                                              : ``),
                                                          children: [
                                                            (0, M.jsx)(`span`, {
                                                              className:
                                                                `rank rank-` +
                                                                e.rank,
                                                              children: e.rank,
                                                            }),
                                                            (0, M.jsxs)(
                                                              `span`,
                                                              {
                                                                className: `ranking-student`,
                                                                children: [
                                                                  (0, M.jsx)(
                                                                    `span`,
                                                                    {
                                                                      className:
                                                                        `avatar color-` +
                                                                        e.rank,
                                                                      children:
                                                                        Ke(
                                                                          e.name,
                                                                        ),
                                                                    },
                                                                  ),
                                                                  (0, M.jsx)(
                                                                    `b`,
                                                                    {
                                                                      children:
                                                                        e.name,
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                            (0, M.jsxs)(
                                                              `strong`,
                                                              {
                                                                className: `ranking-score`,
                                                                children: [
                                                                  e.score,
                                                                  (0, M.jsxs)(
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
                                                                      M.jsxs)(
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
                                                            (0, M.jsxs)(
                                                              `span`,
                                                              {
                                                                className: `ranking-percent`,
                                                                children: [
                                                                  Ge(e).toFixed(
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
                                                (0, M.jsx)(`p`, {
                                                  className: `help`,
                                                  children:
                                                    Pe === yt
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
                                                  children: translate(
                                                    `No results for this quiz yet`,
                                                  ),
                                                }),
                                                (0, M.jsx)(`p`, {
                                                  children: translate(
                                                    `Once grades are recorded, the rankings will appear here.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                      ],
                                    })
                                  : e && e.teacher && n === `moments`
                                    ? (0, M.jsxs)(M.Fragment, {
                                        children: [
                                          (0, M.jsxs)(`div`, {
                                            className: `page-heading`,
                                            children: [
                                              (0, M.jsxs)(`div`, {
                                                children: [
                                                  (0, M.jsx)(`h1`, {
                                                    children:
                                                      translate(
                                                        `Funny answers`,
                                                      ),
                                                  }),
                                                  (0, M.jsx)(`p`, {
                                                    children: translate(
                                                      `Review a mix-up and publish it for everyone to enjoy.`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              (0, M.jsxs)(`button`, {
                                                className: `primary`,
                                                onClick: () => {
                                                  (It(xt()), Ft(!0));
                                                },
                                                children: [
                                                  (0, M.jsx)(Ee, { size: 17 }),
                                                  translate(`Add funny answer`),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, M.jsxs)(`p`, {
                                            className: `privacy-help`,
                                            children: [
                                              (0, M.jsx)(be, { size: 14 }),
                                              translate(
                                                `Published funny answers are visible to everyone. Only teachers can add or remove them.`,
                                              ),
                                            ],
                                          }),
                                          (0, M.jsxs)(`section`, {
                                            className: `ai-highlight`,
                                            children: [
                                              (0, M.jsxs)(`div`, {
                                                className: `section-heading`,
                                                children: [
                                                  (0, M.jsx)(`h2`, {
                                                    children: translate(
                                                      `Let AI find a funny answer`,
                                                    ),
                                                  }),
                                                  (0, M.jsx)(`span`, {
                                                    className: `help`,
                                                    children: translate(
                                                      `Teacher review required`,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              (0, M.jsx)(`p`, {
                                                children: translate(
                                                  `AI chooses from real incorrect submissions and suggests a playful caption. Students’ names are added locally and are not sent to Gemini.`,
                                                ),
                                              }),
                                              On(`highlight-quiz`, qt, Jt, !1),
                                              !e.aiConfigured &&
                                                (0, M.jsxs)(`p`, {
                                                  className: `help`,
                                                  children: [
                                                    translate(
                                                      `Connect Gemini from `,
                                                    ),
                                                    (0, M.jsx)(`button`, {
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
                                              (0, M.jsxs)(`button`, {
                                                className: `secondary`,
                                                disabled:
                                                  c || !e.aiConfigured || !qt,
                                                onClick: jn,
                                                children: [
                                                  (0, M.jsx)(Fe, { size: 17 }),
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
                                          Pt &&
                                            (0, M.jsxs)(`form`, {
                                              id: `moment-editor`,
                                              className: `moment-editor`,
                                              onSubmit: (e) => {
                                                (e.preventDefault(),
                                                  I(async () => {
                                                    (await F(
                                                      `/api/moments`,
                                                      P.id ? `PATCH` : `POST`,
                                                      P,
                                                    ),
                                                      await $t(),
                                                      Ft(!1),
                                                      s(
                                                        translate(
                                                          `Funny answer published for the group.`,
                                                        ),
                                                      ));
                                                  }));
                                              },
                                              children: [
                                                (0, M.jsxs)(`div`, {
                                                  className: `section-heading`,
                                                  children: [
                                                    (0, M.jsx)(`h2`, {
                                                      children: P.id
                                                        ? translate(
                                                            `Edit funny answer`,
                                                          )
                                                        : translate(
                                                            `Add a funny answer`,
                                                          ),
                                                    }),
                                                    (0, M.jsx)(`button`, {
                                                      type: `button`,
                                                      className: `icon-button`,
                                                      onClick: () => Ft(!1),
                                                      "aria-label": translate(
                                                        `Close funny answer editor`,
                                                      ),
                                                      children: (0, M.jsx)(Ve, {
                                                        size: 20,
                                                      }),
                                                    }),
                                                  ],
                                                }),
                                                Dn.length > 0 &&
                                                  (0, M.jsxs)(`fieldset`, {
                                                    className: `wrong-answer-choices`,
                                                    children: [
                                                      (0, M.jsx)(`legend`, {
                                                        children: translate(
                                                          `Use a submitted answer, or enter one below`,
                                                        ),
                                                      }),
                                                      Dn.slice(0, 12).map(
                                                        (e, t) =>
                                                          (0, M.jsxs)(
                                                            `button`,
                                                            {
                                                              type: `button`,
                                                              onClick: () =>
                                                                It(e),
                                                              children: [
                                                                (0, M.jsx)(
                                                                  `b`,
                                                                  {
                                                                    children:
                                                                      e.name,
                                                                  },
                                                                ),
                                                                (0, M.jsx)(
                                                                  `span`,
                                                                  {
                                                                    children:
                                                                      e.chosen,
                                                                  },
                                                                ),
                                                                (0, M.jsx)(w, {
                                                                  size: 15,
                                                                }),
                                                              ],
                                                            },
                                                            t,
                                                          ),
                                                      ),
                                                    ],
                                                  }),
                                                (0, M.jsxs)(`div`, {
                                                  className: `form-pair`,
                                                  children: [
                                                    (0, M.jsxs)(`label`, {
                                                      children: [
                                                        translate(
                                                          `Student name`,
                                                        ),
                                                        (0, M.jsx)(`input`, {
                                                          required: !0,
                                                          maxLength: 100,
                                                          value: P.name,
                                                          onChange: (e) =>
                                                            It({
                                                              ...P,
                                                              name: e.target
                                                                .value,
                                                            }),
                                                        }),
                                                      ],
                                                    }),
                                                    (0, M.jsxs)(`label`, {
                                                      children: [
                                                        translate(`Question`),
                                                        (0, M.jsx)(`input`, {
                                                          required: !0,
                                                          maxLength: 1e3,
                                                          value: P.question,
                                                          onChange: (e) =>
                                                            It({
                                                              ...P,
                                                              question:
                                                                e.target.value,
                                                            }),
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, M.jsxs)(`div`, {
                                                  className: `form-pair`,
                                                  children: [
                                                    (0, M.jsxs)(`label`, {
                                                      children: [
                                                        translate(
                                                          `Their answer`,
                                                        ),
                                                        (0, M.jsx)(`input`, {
                                                          dir: `auto`,
                                                          required: !0,
                                                          maxLength: 1e3,
                                                          value: P.chosen,
                                                          onChange: (e) =>
                                                            It({
                                                              ...P,
                                                              chosen:
                                                                e.target.value,
                                                            }),
                                                        }),
                                                      ],
                                                    }),
                                                    (0, M.jsxs)(`label`, {
                                                      children: [
                                                        translate(
                                                          `Correct answer`,
                                                        ),
                                                        (0, M.jsx)(`input`, {
                                                          dir: `auto`,
                                                          required: !0,
                                                          maxLength: 1e3,
                                                          value: P.correct,
                                                          onChange: (e) =>
                                                            It({
                                                              ...P,
                                                              correct:
                                                                e.target.value,
                                                            }),
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, M.jsxs)(`label`, {
                                                  children: [
                                                    translate(`Funny caption`),
                                                    (0, M.jsx)(`textarea`, {
                                                      required: !0,
                                                      maxLength: 1e3,
                                                      value: P.caption,
                                                      onChange: (e) =>
                                                        It({
                                                          ...P,
                                                          caption:
                                                            e.target.value,
                                                        }),
                                                      placeholder: translate(
                                                        `Keep the joke about the answer`,
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                                (0, M.jsxs)(`div`, {
                                                  className: `form-actions`,
                                                  children: [
                                                    (0, M.jsx)(`button`, {
                                                      type: `button`,
                                                      className: `secondary`,
                                                      onClick: () => Ft(!1),
                                                      children:
                                                        translate(`Cancel`),
                                                    }),
                                                    (0, M.jsxs)(`button`, {
                                                      className: `primary`,
                                                      disabled: c,
                                                      children: [
                                                        translate(
                                                          `Publish funny answer`,
                                                        ),
                                                        (0, M.jsx)(ce, {
                                                          size: 17,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          !e.moments.length &&
                                            !Pt &&
                                            (0, M.jsxs)(`div`, {
                                              className: `empty-state`,
                                              children: [
                                                (0, M.jsx)(ge, { size: 30 }),
                                                (0, M.jsx)(`h2`, {
                                                  children: translate(
                                                    `No funny answers published yet`,
                                                  ),
                                                }),
                                                (0, M.jsx)(`p`, {
                                                  children: translate(
                                                    `Add one yourself or choose a wrong answer from a submitted quiz.`,
                                                  ),
                                                }),
                                              ],
                                            }),
                                          (0, M.jsx)(`div`, {
                                            className: `moments-list`,
                                            children: e.moments.map((e) =>
                                              (0, M.jsxs)(
                                                `div`,
                                                {
                                                  children: [
                                                    (0, M.jsx)(Ye, {
                                                      moment: e,
                                                    }),
                                                    (0, M.jsxs)(`div`, {
                                                      className: `moment-actions`,
                                                      children: [
                                                        (0, M.jsxs)(`button`, {
                                                          className: `text-button`,
                                                          onClick: () => {
                                                            (It({ ...e }),
                                                              Ft(!0),
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
                                                            (0, M.jsx)(we, {
                                                              size: 15,
                                                            }),
                                                            translate(`Edit`),
                                                          ],
                                                        }),
                                                        (0, M.jsxs)(`button`, {
                                                          className: `text-button`,
                                                          onClick: () =>
                                                            pn(
                                                              `${e.question}\n\n${e.name} answered “${e.chosen}”.\nCorrect answer: ${e.correct}.\n\n${e.caption}`,
                                                            ),
                                                          children: [
                                                            (0, M.jsx)(me, {
                                                              size: 15,
                                                            }),
                                                            translate(
                                                              `Copy for WhatsApp`,
                                                            ),
                                                          ],
                                                        }),
                                                        (0, M.jsxs)(`button`, {
                                                          className: `text-button danger`,
                                                          disabled: c,
                                                          onClick: () => {
                                                            confirm(
                                                              translate(
                                                                `Remove this funny answer?`,
                                                              ),
                                                            ) &&
                                                              I(async () => {
                                                                (await F(
                                                                  `/api/moments`,
                                                                  `DELETE`,
                                                                  { id: e.id },
                                                                ),
                                                                  await $t(),
                                                                  s(
                                                                    translate(
                                                                      `Funny answer removed.`,
                                                                    ),
                                                                  ));
                                                              });
                                                          },
                                                          children: [
                                                            (0, M.jsx)(Le, {
                                                              size: 15,
                                                            }),
                                                            translate(`Remove`),
                                                          ],
                                                        }),
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
                                      ? (0, M.jsxs)(`section`, {
                                          className: `login`,
                                          children: [
                                            (0, M.jsxs)(`button`, {
                                              className: `text-button back`,
                                              onClick: () => L(`quizzes`),
                                              children: [
                                                (0, M.jsx)(te, { size: 17 }),
                                                translate(`Back to quizzes`),
                                              ],
                                            }),
                                            (0, M.jsx)(`h1`, {
                                              children:
                                                translate(`Teacher sign in`),
                                            }),
                                            (0, M.jsx)(`p`, {
                                              children: translate(
                                                `Sign in to create quizzes, manage grades and publish funny answers.`,
                                              ),
                                            }),
                                            (0, M.jsxs)(`form`, {
                                              onSubmit: (e) => {
                                                (e.preventDefault(),
                                                  I(async () => {
                                                    (await F(
                                                      `/api/teacher`,
                                                      `POST`,
                                                      { key: We },
                                                    ),
                                                      await $t(),
                                                      Qe(``),
                                                      rn(`quizzes`),
                                                      s(
                                                        translate(
                                                          `Signed in. You can now manage quizzes and grades.`,
                                                        ),
                                                      ));
                                                  }));
                                              },
                                              children: [
                                                (0, M.jsxs)(`label`, {
                                                  htmlFor: `teacher-key`,
                                                  children: [
                                                    translate(
                                                      `Teacher access key`,
                                                    ),
                                                    (0, M.jsx)(`input`, {
                                                      id: `teacher-key`,
                                                      type: `password`,
                                                      autoComplete: `current-password`,
                                                      value: We,
                                                      onChange: (e) =>
                                                        Qe(e.target.value),
                                                      required: !0,
                                                    }),
                                                  ],
                                                }),
                                                (0, M.jsxs)(`button`, {
                                                  className: `primary`,
                                                  disabled: c,
                                                  children: [
                                                    c
                                                      ? translate(`Signing in…`)
                                                      : translate(`Sign in`),
                                                    (0, M.jsx)(w, { size: 17 }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, M.jsxs)(`div`, {
                                              className: `login-help`,
                                              children: [
                                                (0, M.jsx)(`h2`, {
                                                  children: translate(
                                                    `Where is my access key?`,
                                                  ),
                                                }),
                                                (0, M.jsxs)(`p`, {
                                                  children: [
                                                    translate(
                                                      `The private teacher link shared in this chat signs you in automatically. The key is the text after `,
                                                    ),
                                                    (0, M.jsx)(`code`, {
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
              Ot &&
                (0, M.jsxs)(`section`, {
                  className: `share-box`,
                  children: [
                    (0, M.jsxs)(`div`, {
                      className: `section-heading`,
                      children: [
                        (0, M.jsx)(`h2`, {
                          children: Ot.startsWith(`http`)
                            ? translate(`Student quiz link`)
                            : translate(`Ready to copy`),
                        }),
                        (0, M.jsx)(`button`, {
                          className: `icon-button`,
                          onClick: () => kt(``),
                          "aria-label": translate(`Close sharing box`),
                          children: (0, M.jsx)(Ve, { size: 20 }),
                        }),
                      ],
                    }),
                    (0, M.jsx)(`p`, {
                      className: `help`,
                      children: Ot.startsWith(`http`)
                        ? translate(
                            `Anyone with this link can take the quiz. Teacher controls are not included.`,
                          )
                        : translate(
                            `Copy this text into WhatsApp or your group chat.`,
                          ),
                    }),
                    (0, M.jsx)(`textarea`, {
                      "aria-label": translate(`Text to copy`),
                      readOnly: !0,
                      rows: Ot.includes(`
`)
                        ? 8
                        : 2,
                      value: Ot,
                      onFocus: (e) => e.target.select(),
                    }),
                    (0, M.jsxs)(`button`, {
                      className: `secondary`,
                      onClick: () => pn(Ot),
                      children: [
                        (0, M.jsx)(me, { size: 16 }),
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

(0, We.createRoot)(document.getElementById("root")).render(el(Ct));
