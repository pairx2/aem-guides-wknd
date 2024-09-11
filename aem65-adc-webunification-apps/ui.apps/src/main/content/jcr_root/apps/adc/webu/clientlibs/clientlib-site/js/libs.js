(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  [
    function (t, e, n) {
      "use strict";
      (function (t) {
        function i(t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        }
        function r(t, e) {
          (t.prototype = Object.create(e.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = e);
        }
        /*!
         * GSAP 3.12.5
         * https://gsap.com
         *
         * @license Copyright 2008-2024, GreenSock. All rights reserved.
         * Subject to the terms at https://gsap.com/standard-license or for
         * Club GSAP members, the agreement issued with that membership.
         * @author: Jack Doyle, jack@greensock.com
         */ n.d(e, "a", function () {
          return Ne;
        }),
          n.d(e, "b", function () {
            return cn;
          }),
          n.d(e, "y", function () {
            return Tn;
          }),
          n.d(e, "x", function () {
            return Qt;
          }),
          n.d(e, "i", function () {
            return pt;
          }),
          n.d(e, "n", function () {
            return q;
          }),
          n.d(e, "o", function () {
            return I;
          }),
          n.d(e, "k", function () {
            return E;
          }),
          n.d(e, "l", function () {
            return $;
          }),
          n.d(e, "s", function () {
            return rn;
          }),
          n.d(e, "r", function () {
            return B;
          }),
          n.d(e, "g", function () {
            return ft;
          }),
          n.d(e, "v", function () {
            return un;
          }),
          n.d(e, "e", function () {
            return xe;
          }),
          n.d(e, "t", function () {
            return le;
          }),
          n.d(e, "c", function () {
            return Be;
          }),
          n.d(e, "q", function () {
            return ot;
          }),
          n.d(e, "w", function () {
            return Te;
          }),
          n.d(e, "f", function () {
            return _;
          }),
          n.d(e, "u", function () {
            return ht;
          }),
          n.d(e, "m", function () {
            return G;
          }),
          n.d(e, "j", function () {
            return tn;
          }),
          n.d(e, "h", function () {
            return dt;
          }),
          n.d(e, "d", function () {
            return _e;
          }),
          n.d(e, "p", function () {
            return vt;
          });
        var o,
          s,
          a,
          l,
          u,
          c,
          d,
          p,
          f,
          h,
          g,
          v,
          m,
          y,
          b,
          _ = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: { lineHeight: "" },
          },
          w = { duration: 0.5, overwrite: !1, delay: 0 },
          x = 1e8,
          T = 2 * Math.PI,
          k = T / 4,
          S = 0,
          C = Math.sqrt,
          A = Math.cos,
          O = Math.sin,
          E = function (t) {
            return "string" == typeof t;
          },
          D = function (t) {
            return "function" == typeof t;
          },
          M = function (t) {
            return "number" == typeof t;
          },
          $ = function (t) {
            return void 0 === t;
          },
          P = function (t) {
            return "object" == typeof t;
          },
          j = function (t) {
            return !1 !== t;
          },
          L = function () {
            return "undefined" != typeof window;
          },
          N = function (t) {
            return D(t) || E(t);
          },
          R =
            ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
            function () {},
          H = Array.isArray,
          z = /(?:-?\.?\d|\.)+/gi,
          q = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
          I = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
          F = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
          B = /[+-]=-?[.\d]+/,
          W = /[^,'"\[\]\s]+/gi,
          X = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
          Y = {},
          U = {},
          V = function (t) {
            return (U = Tt(t, Y)) && Tn;
          },
          G = function (t, e) {
            return console.warn(
              "Invalid property",
              t,
              "set to",
              e,
              "Missing plugin? gsap.registerPlugin()"
            );
          },
          Q = function (t, e) {
            return !e && console.warn(t);
          },
          J = function (t, e) {
            return (t && (Y[t] = e) && U && (U[t] = e)) || Y;
          },
          K = function () {
            return 0;
          },
          Z = { suppressEvents: !0, isStart: !0, kill: !1 },
          tt = { suppressEvents: !0, kill: !1 },
          et = { suppressEvents: !0 },
          nt = {},
          it = [],
          rt = {},
          ot = {},
          st = {},
          at = 30,
          lt = [],
          ut = "",
          ct = function (t) {
            var e,
              n,
              i = t[0];
            if ((P(i) || D(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
              for (n = lt.length; n-- && !lt[n].targetTest(i); );
              e = lt[n];
            }
            for (n = t.length; n--; )
              (t[n] && (t[n]._gsap || (t[n]._gsap = new Ne(t[n], e)))) ||
                t.splice(n, 1);
            return t;
          },
          dt = function (t) {
            return t._gsap || ct(te(t))[0]._gsap;
          },
          pt = function (t, e, n) {
            return (n = t[e]) && D(n)
              ? t[e]()
              : ($(n) && t.getAttribute && t.getAttribute(e)) || n;
          },
          ft = function (t, e) {
            return (t = t.split(",")).forEach(e) || t;
          },
          ht = function (t) {
            return Math.round(1e5 * t) / 1e5 || 0;
          },
          gt = function (t) {
            return Math.round(1e7 * t) / 1e7 || 0;
          },
          vt = function (t, e) {
            var n = e.charAt(0),
              i = parseFloat(e.substr(2));
            return (
              (t = parseFloat(t)),
              "+" === n ? t + i : "-" === n ? t - i : "*" === n ? t * i : t / i
            );
          },
          mt = function (t, e) {
            for (var n = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < n; );
            return i < n;
          },
          yt = function () {
            var t,
              e,
              n = it.length,
              i = it.slice(0);
            for (rt = {}, it.length = 0, t = 0; t < n; t++)
              (e = i[t]) &&
                e._lazy &&
                (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
          },
          bt = function (t, e, n, i) {
            it.length && !s && yt(),
              t.render(e, n, i || (s && e < 0 && (t._initted || t._startAt))),
              it.length && !s && yt();
          },
          _t = function (t) {
            var e = parseFloat(t);
            return (e || 0 === e) && (t + "").match(W).length < 2
              ? e
              : E(t)
              ? t.trim()
              : t;
          },
          wt = function (t) {
            return t;
          },
          xt = function (t, e) {
            for (var n in e) n in t || (t[n] = e[n]);
            return t;
          },
          Tt = function (t, e) {
            for (var n in e) t[n] = e[n];
            return t;
          },
          kt = function t(e, n) {
            for (var i in n)
              "__proto__" !== i &&
                "constructor" !== i &&
                "prototype" !== i &&
                (e[i] = P(n[i]) ? t(e[i] || (e[i] = {}), n[i]) : n[i]);
            return e;
          },
          St = function (t, e) {
            var n,
              i = {};
            for (n in t) n in e || (i[n] = t[n]);
            return i;
          },
          Ct = function (t) {
            var e,
              n = t.parent || l,
              i = t.keyframes
                ? ((e = H(t.keyframes)),
                  function (t, n) {
                    for (var i in n)
                      i in t ||
                        ("duration" === i && e) ||
                        "ease" === i ||
                        (t[i] = n[i]);
                  })
                : xt;
            if (j(t.inherit))
              for (; n; ) i(t, n.vars.defaults), (n = n.parent || n._dp);
            return t;
          },
          At = function (t, e, n, i, r) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var o,
              s = t[i];
            if (r) for (o = e[r]; s && s[r] > o; ) s = s._prev;
            return (
              s
                ? ((e._next = s._next), (s._next = e))
                : ((e._next = t[n]), (t[n] = e)),
              e._next ? (e._next._prev = e) : (t[i] = e),
              (e._prev = s),
              (e.parent = e._dp = t),
              e
            );
          },
          Ot = function (t, e, n, i) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var r = e._prev,
              o = e._next;
            r ? (r._next = o) : t[n] === e && (t[n] = o),
              o ? (o._prev = r) : t[i] === e && (t[i] = r),
              (e._next = e._prev = e.parent = null);
          },
          Et = function (t, e) {
            t.parent &&
              (!e || t.parent.autoRemoveChildren) &&
              t.parent.remove &&
              t.parent.remove(t),
              (t._act = 0);
          },
          Dt = function (t, e) {
            if (t && (!e || e._end > t._dur || e._start < 0))
              for (var n = t; n; ) (n._dirty = 1), (n = n.parent);
            return t;
          },
          Mt = function (t) {
            for (var e = t.parent; e && e.parent; )
              (e._dirty = 1), e.totalDuration(), (e = e.parent);
            return t;
          },
          $t = function (t, e, n, i) {
            return (
              t._startAt &&
              (s
                ? t._startAt.revert(tt)
                : (t.vars.immediateRender && !t.vars.autoRevert) ||
                  t._startAt.render(e, !0, i))
            );
          },
          Pt = function (t) {
            return t._repeat
              ? jt(t._tTime, (t = t.duration() + t._rDelay)) * t
              : 0;
          },
          jt = function (t, e) {
            var n = Math.floor((t /= e));
            return t && n === t ? n - 1 : n;
          },
          Lt = function (t, e) {
            return (
              (t - e._start) * e._ts +
              (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
            );
          },
          Nt = function (t) {
            return (t._end = gt(
              t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0)
            ));
          },
          Rt = function (t, e) {
            var n = t._dp;
            return (
              n &&
                n.smoothChildTiming &&
                t._ts &&
                ((t._start = gt(
                  n._time -
                    (t._ts > 0
                      ? e / t._ts
                      : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
                )),
                Nt(t),
                n._dirty || Dt(n, t)),
              t
            );
          },
          Ht = function (t, e) {
            var n;
            if (
              ((e._time ||
                (!e._dur && e._initted) ||
                (e._start < t._time && (e._dur || !e.add))) &&
                ((n = Lt(t.rawTime(), e)),
                (!e._dur || Gt(0, e.totalDuration(), n) - e._tTime > 1e-8) &&
                  e.render(n, !0)),
              Dt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
            ) {
              if (t._dur < t.duration())
                for (n = t; n._dp; )
                  n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
              t._zTime = -1e-8;
            }
          },
          zt = function (t, e, n, i) {
            return (
              e.parent && Et(e),
              (e._start = gt(
                (M(n) ? n : n || t !== l ? Yt(t, n, e) : t._time) + e._delay
              )),
              (e._end = gt(
                e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
              )),
              At(t, e, "_first", "_last", t._sort ? "_start" : 0),
              Ft(e) || (t._recent = e),
              i || Ht(t, e),
              t._ts < 0 && Rt(t, t._tTime),
              t
            );
          },
          qt = function (t, e) {
            return (
              (Y.ScrollTrigger || G("scrollTrigger", e)) &&
              Y.ScrollTrigger.create(e, t)
            );
          },
          It = function (t, e, n, i, r) {
            return (
              We(t, e, r),
              t._initted
                ? !n &&
                  t._pt &&
                  !s &&
                  ((t._dur && !1 !== t.vars.lazy) ||
                    (!t._dur && t.vars.lazy)) &&
                  f !== Te.frame
                  ? (it.push(t), (t._lazy = [r, i]), 1)
                  : void 0
                : 1
            );
          },
          Ft = function (t) {
            var e = t.data;
            return "isFromStart" === e || "isStart" === e;
          },
          Bt = function (t, e, n, i) {
            var r = t._repeat,
              o = gt(e) || 0,
              s = t._tTime / t._tDur;
            return (
              s && !i && (t._time *= o / t._dur),
              (t._dur = o),
              (t._tDur = r
                ? r < 0
                  ? 1e10
                  : gt(o * (r + 1) + t._rDelay * r)
                : o),
              s > 0 && !i && Rt(t, (t._tTime = t._tDur * s)),
              t.parent && Nt(t),
              n || Dt(t.parent, t),
              t
            );
          },
          Wt = function (t) {
            return t instanceof He ? Dt(t) : Bt(t, t._dur);
          },
          Xt = { _start: 0, endTime: K, totalDuration: K },
          Yt = function t(e, n, i) {
            var r,
              o,
              s,
              a = e.labels,
              l = e._recent || Xt,
              u = e.duration() >= x ? l.endTime(!1) : e._dur;
            return E(n) && (isNaN(n) || n in a)
              ? ((o = n.charAt(0)),
                (s = "%" === n.substr(-1)),
                (r = n.indexOf("=")),
                "<" === o || ">" === o
                  ? (r >= 0 && (n = n.replace(/=/, "")),
                    ("<" === o ? l._start : l.endTime(l._repeat >= 0)) +
                      (parseFloat(n.substr(1)) || 0) *
                        (s ? (r < 0 ? l : i).totalDuration() / 100 : 1))
                  : r < 0
                  ? (n in a || (a[n] = u), a[n])
                  : ((o = parseFloat(n.charAt(r - 1) + n.substr(r + 1))),
                    s &&
                      i &&
                      (o = (o / 100) * (H(i) ? i[0] : i).totalDuration()),
                    r > 1 ? t(e, n.substr(0, r - 1), i) + o : u + o))
              : null == n
              ? u
              : +n;
          },
          Ut = function (t, e, n) {
            var i,
              r,
              o = M(e[1]),
              s = (o ? 2 : 1) + (t < 2 ? 0 : 1),
              a = e[s];
            if ((o && (a.duration = e[1]), (a.parent = n), t)) {
              for (i = a, r = n; r && !("immediateRender" in i); )
                (i = r.vars.defaults || {}),
                  (r = j(r.vars.inherit) && r.parent);
              (a.immediateRender = j(i.immediateRender)),
                t < 2 ? (a.runBackwards = 1) : (a.startAt = e[s - 1]);
            }
            return new Ge(e[0], a, e[s + 1]);
          },
          Vt = function (t, e) {
            return t || 0 === t ? e(t) : e;
          },
          Gt = function (t, e, n) {
            return n < t ? t : n > e ? e : n;
          },
          Qt = function (t, e) {
            return E(t) && (e = X.exec(t)) ? e[1] : "";
          },
          Jt = [].slice,
          Kt = function (t, e) {
            return (
              t &&
              P(t) &&
              "length" in t &&
              ((!e && !t.length) || (t.length - 1 in t && P(t[0]))) &&
              !t.nodeType &&
              t !== u
            );
          },
          Zt = function (t, e, n) {
            return (
              void 0 === n && (n = []),
              t.forEach(function (t) {
                var i;
                return (E(t) && !e) || Kt(t, 1)
                  ? (i = n).push.apply(i, te(t))
                  : n.push(t);
              }) || n
            );
          },
          te = function (t, e, n) {
            return a && !e && a.selector
              ? a.selector(t)
              : !E(t) || n || (!c && ke())
              ? H(t)
                ? Zt(t, n)
                : Kt(t)
                ? Jt.call(t, 0)
                : t
                ? [t]
                : []
              : Jt.call((e || d).querySelectorAll(t), 0);
          },
          ee = function (t) {
            return (
              (t = te(t)[0] || Q("Invalid scope") || {}),
              function (e) {
                var n = t.current || t.nativeElement || t;
                return te(
                  e,
                  n.querySelectorAll
                    ? n
                    : n === t
                    ? Q("Invalid scope") || d.createElement("div")
                    : t
                );
              }
            );
          },
          ne = function (t) {
            return t.sort(function () {
              return 0.5 - Math.random();
            });
          },
          ie = function (t) {
            if (D(t)) return t;
            var e = P(t) ? t : { each: t },
              n = Me(e.ease),
              i = e.from || 0,
              r = parseFloat(e.base) || 0,
              o = {},
              s = i > 0 && i < 1,
              a = isNaN(i) || s,
              l = e.axis,
              u = i,
              c = i;
            return (
              E(i)
                ? (u = c = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
                : !s && a && ((u = i[0]), (c = i[1])),
              function (t, s, d) {
                var p,
                  f,
                  h,
                  g,
                  v,
                  m,
                  y,
                  b,
                  _,
                  w = (d || e).length,
                  T = o[w];
                if (!T) {
                  if (!(_ = "auto" === e.grid ? 0 : (e.grid || [1, x])[1])) {
                    for (
                      y = -x;
                      y < (y = d[_++].getBoundingClientRect().left) && _ < w;

                    );
                    _ < w && _--;
                  }
                  for (
                    T = o[w] = [],
                      p = a ? Math.min(_, w) * u - 0.5 : i % _,
                      f = _ === x ? 0 : a ? (w * c) / _ - 0.5 : (i / _) | 0,
                      y = 0,
                      b = x,
                      m = 0;
                    m < w;
                    m++
                  )
                    (h = (m % _) - p),
                      (g = f - ((m / _) | 0)),
                      (T[m] = v = l
                        ? Math.abs("y" === l ? g : h)
                        : C(h * h + g * g)),
                      v > y && (y = v),
                      v < b && (b = v);
                  "random" === i && ne(T),
                    (T.max = y - b),
                    (T.min = b),
                    (T.v = w =
                      (parseFloat(e.amount) ||
                        parseFloat(e.each) *
                          (_ > w
                            ? w - 1
                            : l
                            ? "y" === l
                              ? w / _
                              : _
                            : Math.max(_, w / _)) ||
                        0) * ("edges" === i ? -1 : 1)),
                    (T.b = w < 0 ? r - w : r),
                    (T.u = Qt(e.amount || e.each) || 0),
                    (n = n && w < 0 ? Ee(n) : n);
                }
                return (
                  (w = (T[t] - T.min) / T.max || 0),
                  gt(T.b + (n ? n(w) : w) * T.v) + T.u
                );
              }
            );
          },
          re = function (t) {
            var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
            return function (n) {
              var i = gt(Math.round(parseFloat(n) / t) * t * e);
              return (i - (i % 1)) / e + (M(n) ? 0 : Qt(n));
            };
          },
          oe = function (t, e) {
            var n,
              i,
              r = H(t);
            return (
              !r &&
                P(t) &&
                ((n = r = t.radius || x),
                t.values
                  ? ((t = te(t.values)), (i = !M(t[0])) && (n *= n))
                  : (t = re(t.increment))),
              Vt(
                e,
                r
                  ? D(t)
                    ? function (e) {
                        return (i = t(e)), Math.abs(i - e) <= n ? i : e;
                      }
                    : function (e) {
                        for (
                          var r,
                            o,
                            s = parseFloat(i ? e.x : e),
                            a = parseFloat(i ? e.y : 0),
                            l = x,
                            u = 0,
                            c = t.length;
                          c--;

                        )
                          (r = i
                            ? (r = t[c].x - s) * r + (o = t[c].y - a) * o
                            : Math.abs(t[c] - s)) < l && ((l = r), (u = c));
                        return (
                          (u = !n || l <= n ? t[u] : e),
                          i || u === e || M(e) ? u : u + Qt(e)
                        );
                      }
                  : re(t)
              )
            );
          },
          se = function (t, e, n, i) {
            return Vt(H(t) ? !e : !0 === n ? !!(n = 0) : !i, function () {
              return H(t)
                ? t[~~(Math.random() * t.length)]
                : (n = n || 1e-5) &&
                    (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) &&
                    Math.floor(
                      Math.round(
                        (t - n / 2 + Math.random() * (e - t + 0.99 * n)) / n
                      ) *
                        n *
                        i
                    ) / i;
            });
          },
          ae = function (t, e, n) {
            return Vt(n, function (n) {
              return t[~~e(n)];
            });
          },
          le = function (t) {
            for (
              var e, n, i, r, o = 0, s = "";
              ~(e = t.indexOf("random(", o));

            )
              (i = t.indexOf(")", e)),
                (r = "[" === t.charAt(e + 7)),
                (n = t.substr(e + 7, i - e - 7).match(r ? W : z)),
                (s +=
                  t.substr(o, e - o) +
                  se(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5)),
                (o = i + 1);
            return s + t.substr(o, t.length - o);
          },
          ue = function (t, e, n, i, r) {
            var o = e - t,
              s = i - n;
            return Vt(r, function (e) {
              return n + (((e - t) / o) * s || 0);
            });
          },
          ce = function (t, e, n) {
            var i,
              r,
              o,
              s = t.labels,
              a = x;
            for (i in s)
              (r = s[i] - e) < 0 == !!n &&
                r &&
                a > (r = Math.abs(r)) &&
                ((o = i), (a = r));
            return o;
          },
          de = function (t, e, n) {
            var i,
              r,
              o,
              s = t.vars,
              l = s[e],
              u = a,
              c = t._ctx;
            if (l)
              return (
                (i = s[e + "Params"]),
                (r = s.callbackScope || t),
                n && it.length && yt(),
                c && (a = c),
                (o = i ? l.apply(r, i) : l.call(r)),
                (a = u),
                o
              );
          },
          pe = function (t) {
            return (
              Et(t),
              t.scrollTrigger && t.scrollTrigger.kill(!!s),
              t.progress() < 1 && de(t, "onInterrupt"),
              t
            );
          },
          fe = [],
          he = function (t) {
            if (t)
              if (((t = (!t.name && t.default) || t), L() || t.headless)) {
                var e = t.name,
                  n = D(t),
                  i =
                    e && !n && t.init
                      ? function () {
                          this._props = [];
                        }
                      : t,
                  r = {
                    init: K,
                    render: on,
                    add: Fe,
                    kill: an,
                    modifier: sn,
                    rawVars: 0,
                  },
                  o = {
                    targetTest: 0,
                    get: 0,
                    getSetter: tn,
                    aliases: {},
                    register: 0,
                  };
                if ((ke(), t !== i)) {
                  if (ot[e]) return;
                  xt(i, xt(St(t, r), o)),
                    Tt(i.prototype, Tt(r, St(t, o))),
                    (ot[(i.prop = e)] = i),
                    t.targetTest && (lt.push(i), (nt[e] = 1)),
                    (e =
                      ("css" === e
                        ? "CSS"
                        : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
                }
                J(e, i), t.register && t.register(Tn, i, cn);
              } else fe.push(t);
          },
          ge = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          ve = function (t, e, n) {
            return (
              (255 *
                (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
                  ? e + (n - e) * t * 6
                  : t < 0.5
                  ? n
                  : 3 * t < 2
                  ? e + (n - e) * (2 / 3 - t) * 6
                  : e) +
                0.5) |
              0
            );
          },
          me = function (t, e, n) {
            var i,
              r,
              o,
              s,
              a,
              l,
              u,
              c,
              d,
              p,
              f = t
                ? M(t)
                  ? [t >> 16, (t >> 8) & 255, 255 & t]
                  : 0
                : ge.black;
            if (!f) {
              if (
                ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ge[t])
              )
                f = ge[t];
              else if ("#" === t.charAt(0)) {
                if (
                  (t.length < 6 &&
                    ((i = t.charAt(1)),
                    (r = t.charAt(2)),
                    (o = t.charAt(3)),
                    (t =
                      "#" +
                      i +
                      i +
                      r +
                      r +
                      o +
                      o +
                      (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
                  9 === t.length)
                )
                  return [
                    (f = parseInt(t.substr(1, 6), 16)) >> 16,
                    (f >> 8) & 255,
                    255 & f,
                    parseInt(t.substr(7), 16) / 255,
                  ];
                f = [
                  (t = parseInt(t.substr(1), 16)) >> 16,
                  (t >> 8) & 255,
                  255 & t,
                ];
              } else if ("hsl" === t.substr(0, 3))
                if (((f = p = t.match(z)), e)) {
                  if (~t.indexOf("="))
                    return (f = t.match(q)), n && f.length < 4 && (f[3] = 1), f;
                } else
                  (s = (+f[0] % 360) / 360),
                    (a = +f[1] / 100),
                    (i =
                      2 * (l = +f[2] / 100) -
                      (r = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
                    f.length > 3 && (f[3] *= 1),
                    (f[0] = ve(s + 1 / 3, i, r)),
                    (f[1] = ve(s, i, r)),
                    (f[2] = ve(s - 1 / 3, i, r));
              else f = t.match(z) || ge.transparent;
              f = f.map(Number);
            }
            return (
              e &&
                !p &&
                ((i = f[0] / 255),
                (r = f[1] / 255),
                (o = f[2] / 255),
                (l = ((u = Math.max(i, r, o)) + (c = Math.min(i, r, o))) / 2),
                u === c
                  ? (s = a = 0)
                  : ((d = u - c),
                    (a = l > 0.5 ? d / (2 - u - c) : d / (u + c)),
                    (s =
                      u === i
                        ? (r - o) / d + (r < o ? 6 : 0)
                        : u === r
                        ? (o - i) / d + 2
                        : (i - r) / d + 4),
                    (s *= 60)),
                (f[0] = ~~(s + 0.5)),
                (f[1] = ~~(100 * a + 0.5)),
                (f[2] = ~~(100 * l + 0.5))),
              n && f.length < 4 && (f[3] = 1),
              f
            );
          },
          ye = function (t) {
            var e = [],
              n = [],
              i = -1;
            return (
              t.split(_e).forEach(function (t) {
                var r = t.match(I) || [];
                e.push.apply(e, r), n.push((i += r.length + 1));
              }),
              (e.c = n),
              e
            );
          },
          be = function (t, e, n) {
            var i,
              r,
              o,
              s,
              a = "",
              l = (t + a).match(_e),
              u = e ? "hsla(" : "rgba(",
              c = 0;
            if (!l) return t;
            if (
              ((l = l.map(function (t) {
                return (
                  (t = me(t, e, 1)) &&
                  u +
                    (e
                      ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                      : t.join(",")) +
                    ")"
                );
              })),
              n && ((o = ye(t)), (i = n.c).join(a) !== o.c.join(a)))
            )
              for (s = (r = t.replace(_e, "1").split(I)).length - 1; c < s; c++)
                a +=
                  r[c] +
                  (~i.indexOf(c)
                    ? l.shift() || u + "0,0,0,0)"
                    : (o.length ? o : l.length ? l : n).shift());
            if (!r)
              for (s = (r = t.split(_e)).length - 1; c < s; c++)
                a += r[c] + l[c];
            return a + r[s];
          },
          _e = (function () {
            var t,
              e =
                "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in ge) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi");
          })(),
          we = /hsl[a]?\(/,
          xe = function (t) {
            var e,
              n = t.join(" ");
            if (((_e.lastIndex = 0), _e.test(n)))
              return (
                (e = we.test(n)),
                (t[1] = be(t[1], e)),
                (t[0] = be(t[0], e, ye(t[1]))),
                !0
              );
          },
          Te = (function () {
            var t,
              e,
              n,
              i,
              r,
              o,
              s = Date.now,
              a = 500,
              l = 33,
              f = s(),
              h = f,
              v = 1e3 / 240,
              m = v,
              y = [],
              b = function n(u) {
                var c,
                  d,
                  p,
                  g,
                  b = s() - h,
                  _ = !0 === u;
                if (
                  ((b > a || b < 0) && (f += b - l),
                  ((c = (p = (h += b) - f) - m) > 0 || _) &&
                    ((g = ++i.frame),
                    (r = p - 1e3 * i.time),
                    (i.time = p /= 1e3),
                    (m += c + (c >= v ? 4 : v - c)),
                    (d = 1)),
                  _ || (t = e(n)),
                  d)
                )
                  for (o = 0; o < y.length; o++) y[o](p, r, g, u);
              };
            return (i = {
              time: 0,
              frame: 0,
              tick: function () {
                b(!0);
              },
              deltaRatio: function (t) {
                return r / (1e3 / (t || 60));
              },
              wake: function () {
                p &&
                  (!c &&
                    L() &&
                    ((u = c = window),
                    (d = u.document || {}),
                    (Y.gsap = Tn),
                    (u.gsapVersions || (u.gsapVersions = [])).push(Tn.version),
                    V(U || u.GreenSockGlobals || (!u.gsap && u) || {}),
                    fe.forEach(he)),
                  (n =
                    "undefined" != typeof requestAnimationFrame &&
                    requestAnimationFrame),
                  t && i.sleep(),
                  (e =
                    n ||
                    function (t) {
                      return setTimeout(t, (m - 1e3 * i.time + 1) | 0);
                    }),
                  (g = 1),
                  b(2));
              },
              sleep: function () {
                (n ? cancelAnimationFrame : clearTimeout)(t), (g = 0), (e = K);
              },
              lagSmoothing: function (t, e) {
                (a = t || 1 / 0), (l = Math.min(e || 33, a));
              },
              fps: function (t) {
                (v = 1e3 / (t || 240)), (m = 1e3 * i.time + v);
              },
              add: function (t, e, n) {
                var r = e
                  ? function (e, n, o, s) {
                      t(e, n, o, s), i.remove(r);
                    }
                  : t;
                return i.remove(t), y[n ? "unshift" : "push"](r), ke(), r;
              },
              remove: function (t, e) {
                ~(e = y.indexOf(t)) && y.splice(e, 1) && o >= e && o--;
              },
              _listeners: y,
            });
          })(),
          ke = function () {
            return !g && Te.wake();
          },
          Se = {},
          Ce = /^[\d.\-M][\d.\-,\s]/,
          Ae = /["']/g,
          Oe = function (t) {
            for (
              var e,
                n,
                i,
                r = {},
                o = t.substr(1, t.length - 3).split(":"),
                s = o[0],
                a = 1,
                l = o.length;
              a < l;
              a++
            )
              (n = o[a]),
                (e = a !== l - 1 ? n.lastIndexOf(",") : n.length),
                (i = n.substr(0, e)),
                (r[s] = isNaN(i) ? i.replace(Ae, "").trim() : +i),
                (s = n.substr(e + 1).trim());
            return r;
          },
          Ee = function (t) {
            return function (e) {
              return 1 - t(1 - e);
            };
          },
          De = function t(e, n) {
            for (var i, r = e._first; r; )
              r instanceof He
                ? t(r, n)
                : !r.vars.yoyoEase ||
                  (r._yoyo && r._repeat) ||
                  r._yoyo === n ||
                  (r.timeline
                    ? t(r.timeline, n)
                    : ((i = r._ease),
                      (r._ease = r._yEase),
                      (r._yEase = i),
                      (r._yoyo = n))),
                (r = r._next);
          },
          Me = function (t, e) {
            return (
              (t &&
                (D(t)
                  ? t
                  : Se[t] ||
                    (function (t) {
                      var e,
                        n,
                        i,
                        r,
                        o = (t + "").split("("),
                        s = Se[o[0]];
                      return s && o.length > 1 && s.config
                        ? s.config.apply(
                            null,
                            ~t.indexOf("{")
                              ? [Oe(o[1])]
                              : ((e = t),
                                (n = e.indexOf("(") + 1),
                                (i = e.indexOf(")")),
                                (r = e.indexOf("(", n)),
                                e.substring(
                                  n,
                                  ~r && r < i ? e.indexOf(")", i + 1) : i
                                ))
                                  .split(",")
                                  .map(_t)
                          )
                        : Se._CE && Ce.test(t)
                        ? Se._CE("", t)
                        : s;
                    })(t))) ||
              e
            );
          },
          $e = function (t, e, n, i) {
            void 0 === n &&
              (n = function (t) {
                return 1 - e(1 - t);
              }),
              void 0 === i &&
                (i = function (t) {
                  return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
                });
            var r,
              o = { easeIn: e, easeOut: n, easeInOut: i };
            return (
              ft(t, function (t) {
                for (var e in ((Se[t] = Y[t] = o),
                (Se[(r = t.toLowerCase())] = n),
                o))
                  Se[
                    r +
                      ("easeIn" === e
                        ? ".in"
                        : "easeOut" === e
                        ? ".out"
                        : ".inOut")
                  ] = Se[t + "." + e] = o[e];
              }),
              o
            );
          },
          Pe = function (t) {
            return function (e) {
              return e < 0.5
                ? (1 - t(1 - 2 * e)) / 2
                : 0.5 + t(2 * (e - 0.5)) / 2;
            };
          },
          je = function t(e, n, i) {
            var r = n >= 1 ? n : 1,
              o = (i || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1),
              s = (o / T) * (Math.asin(1 / r) || 0),
              a = function (t) {
                return 1 === t
                  ? 1
                  : r * Math.pow(2, -10 * t) * O((t - s) * o) + 1;
              },
              l =
                "out" === e
                  ? a
                  : "in" === e
                  ? function (t) {
                      return 1 - a(1 - t);
                    }
                  : Pe(a);
            return (
              (o = T / o),
              (l.config = function (n, i) {
                return t(e, n, i);
              }),
              l
            );
          },
          Le = function t(e, n) {
            void 0 === n && (n = 1.70158);
            var i = function (t) {
                return t ? --t * t * ((n + 1) * t + n) + 1 : 0;
              },
              r =
                "out" === e
                  ? i
                  : "in" === e
                  ? function (t) {
                      return 1 - i(1 - t);
                    }
                  : Pe(i);
            return (
              (r.config = function (n) {
                return t(e, n);
              }),
              r
            );
          };
        ft("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
          var n = e < 5 ? e + 1 : e;
          $e(
            t + ",Power" + (n - 1),
            e
              ? function (t) {
                  return Math.pow(t, n);
                }
              : function (t) {
                  return t;
                },
            function (t) {
              return 1 - Math.pow(1 - t, n);
            },
            function (t) {
              return t < 0.5
                ? Math.pow(2 * t, n) / 2
                : 1 - Math.pow(2 * (1 - t), n) / 2;
            }
          );
        }),
          (Se.Linear.easeNone = Se.none = Se.Linear.easeIn),
          $e("Elastic", je("in"), je("out"), je()),
          (v = 7.5625),
          (y = 1 / (m = 2.75)),
          $e(
            "Bounce",
            function (t) {
              return 1 - b(1 - t);
            },
            (b = function (t) {
              return t < y
                ? v * t * t
                : t < 0.7272727272727273
                ? v * Math.pow(t - 1.5 / m, 2) + 0.75
                : t < 0.9090909090909092
                ? v * (t -= 2.25 / m) * t + 0.9375
                : v * Math.pow(t - 2.625 / m, 2) + 0.984375;
            })
          ),
          $e("Expo", function (t) {
            return t ? Math.pow(2, 10 * (t - 1)) : 0;
          }),
          $e("Circ", function (t) {
            return -(C(1 - t * t) - 1);
          }),
          $e("Sine", function (t) {
            return 1 === t ? 1 : 1 - A(t * k);
          }),
          $e("Back", Le("in"), Le("out"), Le()),
          (Se.SteppedEase = Se.steps = Y.SteppedEase = {
            config: function (t, e) {
              void 0 === t && (t = 1);
              var n = 1 / t,
                i = t + (e ? 0 : 1),
                r = e ? 1 : 0;
              return function (t) {
                return (((i * Gt(0, 1 - 1e-8, t)) | 0) + r) * n;
              };
            },
          }),
          (w.ease = Se["quad.out"]),
          ft(
            "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
            function (t) {
              return (ut += t + "," + t + "Params,");
            }
          );
        var Ne = function (t, e) {
            (this.id = S++),
              (t._gsap = this),
              (this.target = t),
              (this.harness = e),
              (this.get = e ? e.get : pt),
              (this.set = e ? e.getSetter : tn);
          },
          Re = (function () {
            function e(t) {
              (this.vars = t),
                (this._delay = +t.delay || 0),
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                  ((this._rDelay = t.repeatDelay || 0),
                  (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                (this._ts = 1),
                Bt(this, +t.duration, 1, 1),
                (this.data = t.data),
                a && ((this._ctx = a), a.data.push(this)),
                g || Te.wake();
            }
            var n = e.prototype;
            return (
              (n.delay = function (t) {
                return t || 0 === t
                  ? (this.parent &&
                      this.parent.smoothChildTiming &&
                      this.startTime(this._start + t - this._delay),
                    (this._delay = t),
                    this)
                  : this._delay;
              }),
              (n.duration = function (t) {
                return arguments.length
                  ? this.totalDuration(
                      this._repeat > 0
                        ? t + (t + this._rDelay) * this._repeat
                        : t
                    )
                  : this.totalDuration() && this._dur;
              }),
              (n.totalDuration = function (t) {
                return arguments.length
                  ? ((this._dirty = 0),
                    Bt(
                      this,
                      this._repeat < 0
                        ? t
                        : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                    ))
                  : this._tDur;
              }),
              (n.totalTime = function (t, e) {
                if ((ke(), !arguments.length)) return this._tTime;
                var n = this._dp;
                if (n && n.smoothChildTiming && this._ts) {
                  for (
                    Rt(this, t), !n._dp || n.parent || Ht(n, this);
                    n && n.parent;

                  )
                    n.parent._time !==
                      n._start +
                        (n._ts >= 0
                          ? n._tTime / n._ts
                          : (n.totalDuration() - n._tTime) / -n._ts) &&
                      n.totalTime(n._tTime, !0),
                      (n = n.parent);
                  !this.parent &&
                    this._dp.autoRemoveChildren &&
                    ((this._ts > 0 && t < this._tDur) ||
                      (this._ts < 0 && t > 0) ||
                      (!this._tDur && !t)) &&
                    zt(this._dp, this, this._start - this._delay);
                }
                return (
                  (this._tTime !== t ||
                    (!this._dur && !e) ||
                    (this._initted && 1e-8 === Math.abs(this._zTime)) ||
                    (!t && !this._initted && (this.add || this._ptLookup))) &&
                    (this._ts || (this._pTime = t), bt(this, t, e)),
                  this
                );
              }),
              (n.time = function (t, e) {
                return arguments.length
                  ? this.totalTime(
                      Math.min(this.totalDuration(), t + Pt(this)) %
                        (this._dur + this._rDelay) || (t ? this._dur : 0),
                      e
                    )
                  : this._time;
              }),
              (n.totalProgress = function (t, e) {
                return arguments.length
                  ? this.totalTime(this.totalDuration() * t, e)
                  : this.totalDuration()
                  ? Math.min(1, this._tTime / this._tDur)
                  : this.rawTime() > 0
                  ? 1
                  : 0;
              }),
              (n.progress = function (t, e) {
                return arguments.length
                  ? this.totalTime(
                      this.duration() *
                        (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                        Pt(this),
                      e
                    )
                  : this.duration()
                  ? Math.min(1, this._time / this._dur)
                  : this.rawTime() > 0
                  ? 1
                  : 0;
              }),
              (n.iteration = function (t, e) {
                var n = this.duration() + this._rDelay;
                return arguments.length
                  ? this.totalTime(this._time + (t - 1) * n, e)
                  : this._repeat
                  ? jt(this._tTime, n) + 1
                  : 1;
              }),
              (n.timeScale = function (t, e) {
                if (!arguments.length)
                  return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === t) return this;
                var n =
                  this.parent && this._ts
                    ? Lt(this.parent._time, this)
                    : this._tTime;
                return (
                  (this._rts = +t || 0),
                  (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                  this.totalTime(
                    Gt(-Math.abs(this._delay), this._tDur, n),
                    !1 !== e
                  ),
                  Nt(this),
                  Mt(this)
                );
              }),
              (n.paused = function (t) {
                return arguments.length
                  ? (this._ps !== t &&
                      ((this._ps = t),
                      t
                        ? ((this._pTime =
                            this._tTime ||
                            Math.max(-this._delay, this.rawTime())),
                          (this._ts = this._act = 0))
                        : (ke(),
                          (this._ts = this._rts),
                          this.totalTime(
                            this.parent && !this.parent.smoothChildTiming
                              ? this.rawTime()
                              : this._tTime || this._pTime,
                            1 === this.progress() &&
                              1e-8 !== Math.abs(this._zTime) &&
                              (this._tTime -= 1e-8)
                          ))),
                    this)
                  : this._ps;
              }),
              (n.startTime = function (t) {
                if (arguments.length) {
                  this._start = t;
                  var e = this.parent || this._dp;
                  return (
                    e &&
                      (e._sort || !this.parent) &&
                      zt(e, this, t - this._delay),
                    this
                  );
                }
                return this._start;
              }),
              (n.endTime = function (t) {
                return (
                  this._start +
                  (j(t) ? this.totalDuration() : this.duration()) /
                    Math.abs(this._ts || 1)
                );
              }),
              (n.rawTime = function (t) {
                var e = this.parent || this._dp;
                return e
                  ? t &&
                    (!this._ts ||
                      (this._repeat && this._time && this.totalProgress() < 1))
                    ? this._tTime % (this._dur + this._rDelay)
                    : this._ts
                    ? Lt(e.rawTime(t), this)
                    : this._tTime
                  : this._tTime;
              }),
              (n.revert = function (t) {
                void 0 === t && (t = et);
                var e = s;
                return (
                  (s = t),
                  (this._initted || this._startAt) &&
                    (this.timeline && this.timeline.revert(t),
                    this.totalTime(-0.01, t.suppressEvents)),
                  "nested" !== this.data && !1 !== t.kill && this.kill(),
                  (s = e),
                  this
                );
              }),
              (n.globalTime = function (t) {
                for (var e = this, n = arguments.length ? t : e.rawTime(); e; )
                  (n = e._start + n / (Math.abs(e._ts) || 1)), (e = e._dp);
                return !this.parent && this._sat ? this._sat.globalTime(t) : n;
              }),
              (n.repeat = function (t) {
                return arguments.length
                  ? ((this._repeat = t === 1 / 0 ? -2 : t), Wt(this))
                  : -2 === this._repeat
                  ? 1 / 0
                  : this._repeat;
              }),
              (n.repeatDelay = function (t) {
                if (arguments.length) {
                  var e = this._time;
                  return (this._rDelay = t), Wt(this), e ? this.time(e) : this;
                }
                return this._rDelay;
              }),
              (n.yoyo = function (t) {
                return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
              }),
              (n.seek = function (t, e) {
                return this.totalTime(Yt(this, t), j(e));
              }),
              (n.restart = function (t, e) {
                return this.play().totalTime(t ? -this._delay : 0, j(e));
              }),
              (n.play = function (t, e) {
                return (
                  null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                );
              }),
              (n.reverse = function (t, e) {
                return (
                  null != t && this.seek(t || this.totalDuration(), e),
                  this.reversed(!0).paused(!1)
                );
              }),
              (n.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0);
              }),
              (n.resume = function () {
                return this.paused(!1);
              }),
              (n.reversed = function (t) {
                return arguments.length
                  ? (!!t !== this.reversed() &&
                      this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                    this)
                  : this._rts < 0;
              }),
              (n.invalidate = function () {
                return (
                  (this._initted = this._act = 0), (this._zTime = -1e-8), this
                );
              }),
              (n.isActive = function () {
                var t,
                  e = this.parent || this._dp,
                  n = this._start;
                return !(
                  e &&
                  !(
                    this._ts &&
                    this._initted &&
                    e.isActive() &&
                    (t = e.rawTime(!0)) >= n &&
                    t < this.endTime(!0) - 1e-8
                  )
                );
              }),
              (n.eventCallback = function (t, e, n) {
                var i = this.vars;
                return arguments.length > 1
                  ? (e
                      ? ((i[t] = e),
                        n && (i[t + "Params"] = n),
                        "onUpdate" === t && (this._onUpdate = e))
                      : delete i[t],
                    this)
                  : i[t];
              }),
              (n.then = function (e) {
                var n = this;
                return new t(function (t) {
                  var i = D(e) ? e : wt,
                    r = function () {
                      var e = n.then;
                      (n.then = null),
                        D(i) &&
                          (i = i(n)) &&
                          (i.then || i === n) &&
                          (n.then = e),
                        t(i),
                        (n.then = e);
                    };
                  (n._initted && 1 === n.totalProgress() && n._ts >= 0) ||
                  (!n._tTime && n._ts < 0)
                    ? r()
                    : (n._prom = r);
                });
              }),
              (n.kill = function () {
                pe(this);
              }),
              e
            );
          })();
        xt(Re.prototype, {
          _time: 0,
          _start: 0,
          _end: 0,
          _tTime: 0,
          _tDur: 0,
          _dirty: 0,
          _repeat: 0,
          _yoyo: !1,
          parent: null,
          _initted: !1,
          _rDelay: 0,
          _ts: 1,
          _dp: 0,
          ratio: 0,
          _zTime: -1e-8,
          _prom: 0,
          _ps: !1,
          _rts: 1,
        });
        var He = (function (t) {
          function e(e, n) {
            var r;
            return (
              void 0 === e && (e = {}),
              ((r = t.call(this, e) || this).labels = {}),
              (r.smoothChildTiming = !!e.smoothChildTiming),
              (r.autoRemoveChildren = !!e.autoRemoveChildren),
              (r._sort = j(e.sortChildren)),
              l && zt(e.parent || l, i(r), n),
              e.reversed && r.reverse(),
              e.paused && r.paused(!0),
              e.scrollTrigger && qt(i(r), e.scrollTrigger),
              r
            );
          }
          r(e, t);
          var n = e.prototype;
          return (
            (n.to = function (t, e, n) {
              return Ut(0, arguments, this), this;
            }),
            (n.from = function (t, e, n) {
              return Ut(1, arguments, this), this;
            }),
            (n.fromTo = function (t, e, n, i) {
              return Ut(2, arguments, this), this;
            }),
            (n.set = function (t, e, n) {
              return (
                (e.duration = 0),
                (e.parent = this),
                Ct(e).repeatDelay || (e.repeat = 0),
                (e.immediateRender = !!e.immediateRender),
                new Ge(t, e, Yt(this, n), 1),
                this
              );
            }),
            (n.call = function (t, e, n) {
              return zt(this, Ge.delayedCall(0, t, e), n);
            }),
            (n.staggerTo = function (t, e, n, i, r, o, s) {
              return (
                (n.duration = e),
                (n.stagger = n.stagger || i),
                (n.onComplete = o),
                (n.onCompleteParams = s),
                (n.parent = this),
                new Ge(t, n, Yt(this, r)),
                this
              );
            }),
            (n.staggerFrom = function (t, e, n, i, r, o, s) {
              return (
                (n.runBackwards = 1),
                (Ct(n).immediateRender = j(n.immediateRender)),
                this.staggerTo(t, e, n, i, r, o, s)
              );
            }),
            (n.staggerFromTo = function (t, e, n, i, r, o, s, a) {
              return (
                (i.startAt = n),
                (Ct(i).immediateRender = j(i.immediateRender)),
                this.staggerTo(t, e, i, r, o, s, a)
              );
            }),
            (n.render = function (t, e, n) {
              var i,
                r,
                o,
                a,
                u,
                c,
                d,
                p,
                f,
                h,
                g,
                v,
                m = this._time,
                y = this._dirty ? this.totalDuration() : this._tDur,
                b = this._dur,
                _ = t <= 0 ? 0 : gt(t),
                w = this._zTime < 0 != t < 0 && (this._initted || !b);
              if (
                (this !== l && _ > y && t >= 0 && (_ = y),
                _ !== this._tTime || n || w)
              ) {
                if (
                  (m !== this._time &&
                    b &&
                    ((_ += this._time - m), (t += this._time - m)),
                  (i = _),
                  (f = this._start),
                  (c = !(p = this._ts)),
                  w && (b || (m = this._zTime), (t || !e) && (this._zTime = t)),
                  this._repeat)
                ) {
                  if (
                    ((g = this._yoyo),
                    (u = b + this._rDelay),
                    this._repeat < -1 && t < 0)
                  )
                    return this.totalTime(100 * u + t, e, n);
                  if (
                    ((i = gt(_ % u)),
                    _ === y
                      ? ((a = this._repeat), (i = b))
                      : ((a = ~~(_ / u)) && a === _ / u && ((i = b), a--),
                        i > b && (i = b)),
                    (h = jt(this._tTime, u)),
                    !m &&
                      this._tTime &&
                      h !== a &&
                      this._tTime - h * u - this._dur <= 0 &&
                      (h = a),
                    g && 1 & a && ((i = b - i), (v = 1)),
                    a !== h && !this._lock)
                  ) {
                    var x = g && 1 & h,
                      T = x === (g && 1 & a);
                    if (
                      (a < h && (x = !x),
                      (m = x ? 0 : _ % b ? b : _),
                      (this._lock = 1),
                      (this.render(m || (v ? 0 : gt(a * u)), e, !b)._lock = 0),
                      (this._tTime = _),
                      !e && this.parent && de(this, "onRepeat"),
                      this.vars.repeatRefresh &&
                        !v &&
                        (this.invalidate()._lock = 1),
                      (m && m !== this._time) ||
                        c !== !this._ts ||
                        (this.vars.onRepeat && !this.parent && !this._act))
                    )
                      return this;
                    if (
                      ((b = this._dur),
                      (y = this._tDur),
                      T &&
                        ((this._lock = 2),
                        (m = x ? b : -1e-4),
                        this.render(m, !0),
                        this.vars.repeatRefresh && !v && this.invalidate()),
                      (this._lock = 0),
                      !this._ts && !c)
                    )
                      return this;
                    De(this, v);
                  }
                }
                if (
                  (this._hasPause &&
                    !this._forcing &&
                    this._lock < 2 &&
                    (d = (function (t, e, n) {
                      var i;
                      if (n > e)
                        for (i = t._first; i && i._start <= n; ) {
                          if ("isPause" === i.data && i._start > e) return i;
                          i = i._next;
                        }
                      else
                        for (i = t._last; i && i._start >= n; ) {
                          if ("isPause" === i.data && i._start < e) return i;
                          i = i._prev;
                        }
                    })(this, gt(m), gt(i))) &&
                    (_ -= i - (i = d._start)),
                  (this._tTime = _),
                  (this._time = i),
                  (this._act = !p),
                  this._initted ||
                    ((this._onUpdate = this.vars.onUpdate),
                    (this._initted = 1),
                    (this._zTime = t),
                    (m = 0)),
                  !m &&
                    i &&
                    !e &&
                    !a &&
                    (de(this, "onStart"), this._tTime !== _))
                )
                  return this;
                if (i >= m && t >= 0)
                  for (r = this._first; r; ) {
                    if (
                      ((o = r._next),
                      (r._act || i >= r._start) && r._ts && d !== r)
                    ) {
                      if (r.parent !== this) return this.render(t, e, n);
                      if (
                        (r.render(
                          r._ts > 0
                            ? (i - r._start) * r._ts
                            : (r._dirty ? r.totalDuration() : r._tDur) +
                                (i - r._start) * r._ts,
                          e,
                          n
                        ),
                        i !== this._time || (!this._ts && !c))
                      ) {
                        (d = 0), o && (_ += this._zTime = -1e-8);
                        break;
                      }
                    }
                    r = o;
                  }
                else {
                  r = this._last;
                  for (var k = t < 0 ? t : i; r; ) {
                    if (
                      ((o = r._prev),
                      (r._act || k <= r._end) && r._ts && d !== r)
                    ) {
                      if (r.parent !== this) return this.render(t, e, n);
                      if (
                        (r.render(
                          r._ts > 0
                            ? (k - r._start) * r._ts
                            : (r._dirty ? r.totalDuration() : r._tDur) +
                                (k - r._start) * r._ts,
                          e,
                          n || (s && (r._initted || r._startAt))
                        ),
                        i !== this._time || (!this._ts && !c))
                      ) {
                        (d = 0), o && (_ += this._zTime = k ? -1e-8 : 1e-8);
                        break;
                      }
                    }
                    r = o;
                  }
                }
                if (
                  d &&
                  !e &&
                  (this.pause(),
                  (d.render(i >= m ? 0 : -1e-8)._zTime = i >= m ? 1 : -1),
                  this._ts)
                )
                  return (this._start = f), Nt(this), this.render(t, e, n);
                this._onUpdate && !e && de(this, "onUpdate", !0),
                  ((_ === y && this._tTime >= this.totalDuration()) ||
                    (!_ && m)) &&
                    ((f !== this._start &&
                      Math.abs(p) === Math.abs(this._ts)) ||
                      this._lock ||
                      ((t || !b) &&
                        ((_ === y && this._ts > 0) || (!_ && this._ts < 0)) &&
                        Et(this, 1),
                      e ||
                        (t < 0 && !m) ||
                        (!_ && !m && y) ||
                        (de(
                          this,
                          _ === y && t >= 0
                            ? "onComplete"
                            : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(_ < y && this.timeScale() > 0) &&
                          this._prom())));
              }
              return this;
            }),
            (n.add = function (t, e) {
              var n = this;
              if ((M(e) || (e = Yt(this, e, t)), !(t instanceof Re))) {
                if (H(t))
                  return (
                    t.forEach(function (t) {
                      return n.add(t, e);
                    }),
                    this
                  );
                if (E(t)) return this.addLabel(t, e);
                if (!D(t)) return this;
                t = Ge.delayedCall(0, t);
              }
              return this !== t ? zt(this, t, e) : this;
            }),
            (n.getChildren = function (t, e, n, i) {
              void 0 === t && (t = !0),
                void 0 === e && (e = !0),
                void 0 === n && (n = !0),
                void 0 === i && (i = -x);
              for (var r = [], o = this._first; o; )
                o._start >= i &&
                  (o instanceof Ge
                    ? e && r.push(o)
                    : (n && r.push(o),
                      t && r.push.apply(r, o.getChildren(!0, e, n)))),
                  (o = o._next);
              return r;
            }),
            (n.getById = function (t) {
              for (var e = this.getChildren(1, 1, 1), n = e.length; n--; )
                if (e[n].vars.id === t) return e[n];
            }),
            (n.remove = function (t) {
              return E(t)
                ? this.removeLabel(t)
                : D(t)
                ? this.killTweensOf(t)
                : (Ot(this, t),
                  t === this._recent && (this._recent = this._last),
                  Dt(this));
            }),
            (n.totalTime = function (e, n) {
              return arguments.length
                ? ((this._forcing = 1),
                  !this._dp &&
                    this._ts &&
                    (this._start = gt(
                      Te.time -
                        (this._ts > 0
                          ? e / this._ts
                          : (this.totalDuration() - e) / -this._ts)
                    )),
                  t.prototype.totalTime.call(this, e, n),
                  (this._forcing = 0),
                  this)
                : this._tTime;
            }),
            (n.addLabel = function (t, e) {
              return (this.labels[t] = Yt(this, e)), this;
            }),
            (n.removeLabel = function (t) {
              return delete this.labels[t], this;
            }),
            (n.addPause = function (t, e, n) {
              var i = Ge.delayedCall(0, e || K, n);
              return (
                (i.data = "isPause"),
                (this._hasPause = 1),
                zt(this, i, Yt(this, t))
              );
            }),
            (n.removePause = function (t) {
              var e = this._first;
              for (t = Yt(this, t); e; )
                e._start === t && "isPause" === e.data && Et(e), (e = e._next);
            }),
            (n.killTweensOf = function (t, e, n) {
              for (var i = this.getTweensOf(t, n), r = i.length; r--; )
                ze !== i[r] && i[r].kill(t, e);
              return this;
            }),
            (n.getTweensOf = function (t, e) {
              for (var n, i = [], r = te(t), o = this._first, s = M(e); o; )
                o instanceof Ge
                  ? mt(o._targets, r) &&
                    (s
                      ? (!ze || (o._initted && o._ts)) &&
                        o.globalTime(0) <= e &&
                        o.globalTime(o.totalDuration()) > e
                      : !e || o.isActive()) &&
                    i.push(o)
                  : (n = o.getTweensOf(r, e)).length && i.push.apply(i, n),
                  (o = o._next);
              return i;
            }),
            (n.tweenTo = function (t, e) {
              e = e || {};
              var n,
                i = this,
                r = Yt(i, t),
                o = e,
                s = o.startAt,
                a = o.onStart,
                l = o.onStartParams,
                u = o.immediateRender,
                c = Ge.to(
                  i,
                  xt(
                    {
                      ease: e.ease || "none",
                      lazy: !1,
                      immediateRender: !1,
                      time: r,
                      overwrite: "auto",
                      duration:
                        e.duration ||
                        Math.abs(
                          (r - (s && "time" in s ? s.time : i._time)) /
                            i.timeScale()
                        ) ||
                        1e-8,
                      onStart: function () {
                        if ((i.pause(), !n)) {
                          var t =
                            e.duration ||
                            Math.abs(
                              (r - (s && "time" in s ? s.time : i._time)) /
                                i.timeScale()
                            );
                          c._dur !== t &&
                            Bt(c, t, 0, 1).render(c._time, !0, !0),
                            (n = 1);
                        }
                        a && a.apply(c, l || []);
                      },
                    },
                    e
                  )
                );
              return u ? c.render(0) : c;
            }),
            (n.tweenFromTo = function (t, e, n) {
              return this.tweenTo(e, xt({ startAt: { time: Yt(this, t) } }, n));
            }),
            (n.recent = function () {
              return this._recent;
            }),
            (n.nextLabel = function (t) {
              return void 0 === t && (t = this._time), ce(this, Yt(this, t));
            }),
            (n.previousLabel = function (t) {
              return void 0 === t && (t = this._time), ce(this, Yt(this, t), 1);
            }),
            (n.currentLabel = function (t) {
              return arguments.length
                ? this.seek(t, !0)
                : this.previousLabel(this._time + 1e-8);
            }),
            (n.shiftChildren = function (t, e, n) {
              void 0 === n && (n = 0);
              for (var i, r = this._first, o = this.labels; r; )
                r._start >= n && ((r._start += t), (r._end += t)),
                  (r = r._next);
              if (e) for (i in o) o[i] >= n && (o[i] += t);
              return Dt(this);
            }),
            (n.invalidate = function (e) {
              var n = this._first;
              for (this._lock = 0; n; ) n.invalidate(e), (n = n._next);
              return t.prototype.invalidate.call(this, e);
            }),
            (n.clear = function (t) {
              void 0 === t && (t = !0);
              for (var e, n = this._first; n; )
                (e = n._next), this.remove(n), (n = e);
              return (
                this._dp && (this._time = this._tTime = this._pTime = 0),
                t && (this.labels = {}),
                Dt(this)
              );
            }),
            (n.totalDuration = function (t) {
              var e,
                n,
                i,
                r = 0,
                o = this,
                s = o._last,
                a = x;
              if (arguments.length)
                return o.timeScale(
                  (o._repeat < 0 ? o.duration() : o.totalDuration()) /
                    (o.reversed() ? -t : t)
                );
              if (o._dirty) {
                for (i = o.parent; s; )
                  (e = s._prev),
                    s._dirty && s.totalDuration(),
                    (n = s._start) > a && o._sort && s._ts && !o._lock
                      ? ((o._lock = 1), (zt(o, s, n - s._delay, 1)._lock = 0))
                      : (a = n),
                    n < 0 &&
                      s._ts &&
                      ((r -= n),
                      ((!i && !o._dp) || (i && i.smoothChildTiming)) &&
                        ((o._start += n / o._ts),
                        (o._time -= n),
                        (o._tTime -= n)),
                      o.shiftChildren(-n, !1, -Infinity),
                      (a = 0)),
                    s._end > r && s._ts && (r = s._end),
                    (s = e);
                Bt(o, o === l && o._time > r ? o._time : r, 1, 1),
                  (o._dirty = 0);
              }
              return o._tDur;
            }),
            (e.updateRoot = function (t) {
              if (
                (l._ts && (bt(l, Lt(t, l)), (f = Te.frame)), Te.frame >= at)
              ) {
                at += _.autoSleep || 120;
                var e = l._first;
                if ((!e || !e._ts) && _.autoSleep && Te._listeners.length < 2) {
                  for (; e && !e._ts; ) e = e._next;
                  e || Te.sleep();
                }
              }
            }),
            e
          );
        })(Re);
        xt(He.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
        var ze,
          qe,
          Ie = function (t, e, n, i, r, o, s) {
            var a,
              l,
              u,
              c,
              d,
              p,
              f,
              h,
              g = new cn(this._pt, t, e, 0, 1, rn, null, r),
              v = 0,
              m = 0;
            for (
              g.b = n,
                g.e = i,
                n += "",
                (f = ~(i += "").indexOf("random(")) && (i = le(i)),
                o && (o((h = [n, i]), t, e), (n = h[0]), (i = h[1])),
                l = n.match(F) || [];
              (a = F.exec(i));

            )
              (c = a[0]),
                (d = i.substring(v, a.index)),
                u ? (u = (u + 1) % 5) : "rgba(" === d.substr(-5) && (u = 1),
                c !== l[m++] &&
                  ((p = parseFloat(l[m - 1]) || 0),
                  (g._pt = {
                    _next: g._pt,
                    p: d || 1 === m ? d : ",",
                    s: p,
                    c: "=" === c.charAt(1) ? vt(p, c) - p : parseFloat(c) - p,
                    m: u && u < 4 ? Math.round : 0,
                  }),
                  (v = F.lastIndex));
            return (
              (g.c = v < i.length ? i.substring(v, i.length) : ""),
              (g.fp = s),
              (B.test(i) || f) && (g.e = 0),
              (this._pt = g),
              g
            );
          },
          Fe = function (t, e, n, i, r, o, s, a, l, u) {
            D(i) && (i = i(r || 0, t, o));
            var c,
              d = t[e],
              p =
                "get" !== n
                  ? n
                  : D(d)
                  ? l
                    ? t[
                        e.indexOf("set") || !D(t["get" + e.substr(3)])
                          ? e
                          : "get" + e.substr(3)
                      ](l)
                    : t[e]()
                  : d,
              f = D(d) ? (l ? Ke : Je) : Qe;
            if (
              (E(i) &&
                (~i.indexOf("random(") && (i = le(i)),
                "=" === i.charAt(1) &&
                  ((c = vt(p, i) + (Qt(p) || 0)) || 0 === c) &&
                  (i = c)),
              !u || p !== i || qe)
            )
              return isNaN(p * i) || "" === i
                ? (!d && !(e in t) && G(e, i),
                  Ie.call(this, t, e, p, i, f, a || _.stringFilter, l))
                : ((c = new cn(
                    this._pt,
                    t,
                    e,
                    +p || 0,
                    i - (p || 0),
                    "boolean" == typeof d ? nn : en,
                    0,
                    f
                  )),
                  l && (c.fp = l),
                  s && c.modifier(s, this, t),
                  (this._pt = c));
          },
          Be = function (t, e, n, i, r, o) {
            var s, a, l, u;
            if (
              ot[t] &&
              !1 !==
                (s = new ot[t]()).init(
                  r,
                  s.rawVars
                    ? e[t]
                    : (function (t, e, n, i, r) {
                        if (
                          (D(t) && (t = Ye(t, r, e, n, i)),
                          !P(t) || (t.style && t.nodeType) || H(t) || R(t))
                        )
                          return E(t) ? Ye(t, r, e, n, i) : t;
                        var o,
                          s = {};
                        for (o in t) s[o] = Ye(t[o], r, e, n, i);
                        return s;
                      })(e[t], i, r, o, n),
                  n,
                  i,
                  o
                ) &&
              ((n._pt = a = new cn(
                n._pt,
                r,
                t,
                0,
                1,
                s.render,
                s,
                0,
                s.priority
              )),
              n !== h)
            )
              for (
                l = n._ptLookup[n._targets.indexOf(r)], u = s._props.length;
                u--;

              )
                l[s._props[u]] = a;
            return s;
          },
          We = function t(e, n, i) {
            var r,
              a,
              u,
              c,
              d,
              p,
              f,
              h,
              g,
              v,
              m,
              y,
              b,
              _ = e.vars,
              T = _.ease,
              k = _.startAt,
              S = _.immediateRender,
              C = _.lazy,
              A = _.onUpdate,
              O = _.runBackwards,
              E = _.yoyoEase,
              D = _.keyframes,
              M = _.autoRevert,
              $ = e._dur,
              P = e._startAt,
              L = e._targets,
              N = e.parent,
              R = N && "nested" === N.data ? N.vars.targets : L,
              H = "auto" === e._overwrite && !o,
              z = e.timeline;
            if (
              (z && (!D || !T) && (T = "none"),
              (e._ease = Me(T, w.ease)),
              (e._yEase = E ? Ee(Me(!0 === E ? T : E, w.ease)) : 0),
              E &&
                e._yoyo &&
                !e._repeat &&
                ((E = e._yEase), (e._yEase = e._ease), (e._ease = E)),
              (e._from = !z && !!_.runBackwards),
              !z || (D && !_.stagger))
            ) {
              if (
                ((y = (h = L[0] ? dt(L[0]).harness : 0) && _[h.prop]),
                (r = St(_, nt)),
                P &&
                  (P._zTime < 0 && P.progress(1),
                  n < 0 && O && S && !M
                    ? P.render(-1, !0)
                    : P.revert(O && $ ? tt : Z),
                  (P._lazy = 0)),
                k)
              ) {
                if (
                  (Et(
                    (e._startAt = Ge.set(
                      L,
                      xt(
                        {
                          data: "isStart",
                          overwrite: !1,
                          parent: N,
                          immediateRender: !0,
                          lazy: !P && j(C),
                          startAt: null,
                          delay: 0,
                          onUpdate:
                            A &&
                            function () {
                              return de(e, "onUpdate");
                            },
                          stagger: 0,
                        },
                        k
                      )
                    ))
                  ),
                  (e._startAt._dp = 0),
                  (e._startAt._sat = e),
                  n < 0 && (s || (!S && !M)) && e._startAt.revert(tt),
                  S && $ && n <= 0 && i <= 0)
                )
                  return void (n && (e._zTime = n));
              } else if (O && $ && !P)
                if (
                  (n && (S = !1),
                  (u = xt(
                    {
                      overwrite: !1,
                      data: "isFromStart",
                      lazy: S && !P && j(C),
                      immediateRender: S,
                      stagger: 0,
                      parent: N,
                    },
                    r
                  )),
                  y && (u[h.prop] = y),
                  Et((e._startAt = Ge.set(L, u))),
                  (e._startAt._dp = 0),
                  (e._startAt._sat = e),
                  n < 0 &&
                    (s ? e._startAt.revert(tt) : e._startAt.render(-1, !0)),
                  (e._zTime = n),
                  S)
                ) {
                  if (!n) return;
                } else t(e._startAt, 1e-8, 1e-8);
              for (
                e._pt = e._ptCache = 0, C = ($ && j(C)) || (C && !$), a = 0;
                a < L.length;
                a++
              ) {
                if (
                  ((f = (d = L[a])._gsap || ct(L)[a]._gsap),
                  (e._ptLookup[a] = v = {}),
                  rt[f.id] && it.length && yt(),
                  (m = R === L ? a : R.indexOf(d)),
                  h &&
                    !1 !== (g = new h()).init(d, y || r, e, m, R) &&
                    ((e._pt = c = new cn(
                      e._pt,
                      d,
                      g.name,
                      0,
                      1,
                      g.render,
                      g,
                      0,
                      g.priority
                    )),
                    g._props.forEach(function (t) {
                      v[t] = c;
                    }),
                    g.priority && (p = 1)),
                  !h || y)
                )
                  for (u in r)
                    ot[u] && (g = Be(u, r, e, m, d, R))
                      ? g.priority && (p = 1)
                      : (v[u] = c = Fe.call(
                          e,
                          d,
                          u,
                          "get",
                          r[u],
                          m,
                          R,
                          0,
                          _.stringFilter
                        ));
                e._op && e._op[a] && e.kill(d, e._op[a]),
                  H &&
                    e._pt &&
                    ((ze = e),
                    l.killTweensOf(d, v, e.globalTime(n)),
                    (b = !e.parent),
                    (ze = 0)),
                  e._pt && C && (rt[f.id] = 1);
              }
              p && un(e), e._onInit && e._onInit(e);
            }
            (e._onUpdate = A),
              (e._initted = (!e._op || e._pt) && !b),
              D && n <= 0 && z.render(x, !0, !0);
          },
          Xe = function (t, e, n, i) {
            var r,
              o,
              s = e.ease || i || "power1.inOut";
            if (H(e))
              (o = n[t] || (n[t] = [])),
                e.forEach(function (t, n) {
                  return o.push({ t: (n / (e.length - 1)) * 100, v: t, e: s });
                });
            else
              for (r in e)
                (o = n[r] || (n[r] = [])),
                  "ease" === r || o.push({ t: parseFloat(t), v: e[r], e: s });
          },
          Ye = function (t, e, n, i, r) {
            return D(t)
              ? t.call(e, n, i, r)
              : E(t) && ~t.indexOf("random(")
              ? le(t)
              : t;
          },
          Ue = ut + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
          Ve = {};
        ft(
          Ue + ",id,stagger,delay,duration,paused,scrollTrigger",
          function (t) {
            return (Ve[t] = 1);
          }
        );
        var Ge = (function (t) {
          function e(e, n, r, s) {
            var a;
            "number" == typeof n && ((r.duration = n), (n = r), (r = null));
            var u,
              c,
              d,
              p,
              f,
              h,
              g,
              v,
              m = (a = t.call(this, s ? n : Ct(n)) || this).vars,
              y = m.duration,
              b = m.delay,
              w = m.immediateRender,
              x = m.stagger,
              T = m.overwrite,
              k = m.keyframes,
              S = m.defaults,
              C = m.scrollTrigger,
              A = m.yoyoEase,
              O = n.parent || l,
              E = (H(e) || R(e) ? M(e[0]) : "length" in n) ? [e] : te(e);
            if (
              ((a._targets = E.length
                ? ct(E)
                : Q(
                    "GSAP target " + e + " not found. https://gsap.com",
                    !_.nullTargetWarn
                  ) || []),
              (a._ptLookup = []),
              (a._overwrite = T),
              k || x || N(y) || N(b))
            ) {
              if (
                ((n = a.vars),
                (u = a.timeline = new He({
                  data: "nested",
                  defaults: S || {},
                  targets: O && "nested" === O.data ? O.vars.targets : E,
                })).kill(),
                (u.parent = u._dp = i(a)),
                (u._start = 0),
                x || N(y) || N(b))
              ) {
                if (((p = E.length), (g = x && ie(x)), P(x)))
                  for (f in x) ~Ue.indexOf(f) && (v || (v = {}), (v[f] = x[f]));
                for (c = 0; c < p; c++)
                  ((d = St(n, Ve)).stagger = 0),
                    A && (d.yoyoEase = A),
                    v && Tt(d, v),
                    (h = E[c]),
                    (d.duration = +Ye(y, i(a), c, h, E)),
                    (d.delay = (+Ye(b, i(a), c, h, E) || 0) - a._delay),
                    !x &&
                      1 === p &&
                      d.delay &&
                      ((a._delay = b = d.delay),
                      (a._start += b),
                      (d.delay = 0)),
                    u.to(h, d, g ? g(c, h, E) : 0),
                    (u._ease = Se.none);
                u.duration() ? (y = b = 0) : (a.timeline = 0);
              } else if (k) {
                Ct(xt(u.vars.defaults, { ease: "none" })),
                  (u._ease = Me(k.ease || n.ease || "none"));
                var D,
                  $,
                  L,
                  z = 0;
                if (H(k))
                  k.forEach(function (t) {
                    return u.to(E, t, ">");
                  }),
                    u.duration();
                else {
                  for (f in ((d = {}), k))
                    "ease" === f ||
                      "easeEach" === f ||
                      Xe(f, k[f], d, k.easeEach);
                  for (f in d)
                    for (
                      D = d[f].sort(function (t, e) {
                        return t.t - e.t;
                      }),
                        z = 0,
                        c = 0;
                      c < D.length;
                      c++
                    )
                      ((L = {
                        ease: ($ = D[c]).e,
                        duration: (($.t - (c ? D[c - 1].t : 0)) / 100) * y,
                      })[f] = $.v),
                        u.to(E, L, z),
                        (z += L.duration);
                  u.duration() < y && u.to({}, { duration: y - u.duration() });
                }
              }
              y || a.duration((y = u.duration()));
            } else a.timeline = 0;
            return (
              !0 !== T || o || ((ze = i(a)), l.killTweensOf(E), (ze = 0)),
              zt(O, i(a), r),
              n.reversed && a.reverse(),
              n.paused && a.paused(!0),
              (w ||
                (!y &&
                  !k &&
                  a._start === gt(O._time) &&
                  j(w) &&
                  (function t(e) {
                    return !e || (e._ts && t(e.parent));
                  })(i(a)) &&
                  "nested" !== O.data)) &&
                ((a._tTime = -1e-8), a.render(Math.max(0, -b) || 0)),
              C && qt(i(a), C),
              a
            );
          }
          r(e, t);
          var n = e.prototype;
          return (
            (n.render = function (t, e, n) {
              var i,
                r,
                o,
                a,
                l,
                u,
                c,
                d,
                p,
                f = this._time,
                h = this._tDur,
                g = this._dur,
                v = t < 0,
                m = t > h - 1e-8 && !v ? h : t < 1e-8 ? 0 : t;
              if (g) {
                if (
                  m !== this._tTime ||
                  !t ||
                  n ||
                  (!this._initted && this._tTime) ||
                  (this._startAt && this._zTime < 0 !== v)
                ) {
                  if (((i = m), (d = this.timeline), this._repeat)) {
                    if (((a = g + this._rDelay), this._repeat < -1 && v))
                      return this.totalTime(100 * a + t, e, n);
                    if (
                      ((i = gt(m % a)),
                      m === h
                        ? ((o = this._repeat), (i = g))
                        : ((o = ~~(m / a)) && o === gt(m / a) && ((i = g), o--),
                          i > g && (i = g)),
                      (u = this._yoyo && 1 & o) &&
                        ((p = this._yEase), (i = g - i)),
                      (l = jt(this._tTime, a)),
                      i === f && !n && this._initted && o === l)
                    )
                      return (this._tTime = m), this;
                    o !== l &&
                      (d && this._yEase && De(d, u),
                      this.vars.repeatRefresh &&
                        !u &&
                        !this._lock &&
                        this._time !== a &&
                        this._initted &&
                        ((this._lock = n = 1),
                        (this.render(gt(a * o), !0).invalidate()._lock = 0)));
                  }
                  if (!this._initted) {
                    if (It(this, v ? t : i, n, e, m))
                      return (this._tTime = 0), this;
                    if (
                      !(
                        f === this._time ||
                        (n && this.vars.repeatRefresh && o !== l)
                      )
                    )
                      return this;
                    if (g !== this._dur) return this.render(t, e, n);
                  }
                  if (
                    ((this._tTime = m),
                    (this._time = i),
                    !this._act &&
                      this._ts &&
                      ((this._act = 1), (this._lazy = 0)),
                    (this.ratio = c = (p || this._ease)(i / g)),
                    this._from && (this.ratio = c = 1 - c),
                    i &&
                      !f &&
                      !e &&
                      !o &&
                      (de(this, "onStart"), this._tTime !== m))
                  )
                    return this;
                  for (r = this._pt; r; ) r.r(c, r.d), (r = r._next);
                  (d &&
                    d.render(
                      t < 0 ? t : d._dur * d._ease(i / this._dur),
                      e,
                      n
                    )) ||
                    (this._startAt && (this._zTime = t)),
                    this._onUpdate &&
                      !e &&
                      (v && $t(this, t, 0, n), de(this, "onUpdate")),
                    this._repeat &&
                      o !== l &&
                      this.vars.onRepeat &&
                      !e &&
                      this.parent &&
                      de(this, "onRepeat"),
                    (m !== this._tDur && m) ||
                      this._tTime !== m ||
                      (v && !this._onUpdate && $t(this, t, 0, !0),
                      (t || !g) &&
                        ((m === this._tDur && this._ts > 0) ||
                          (!m && this._ts < 0)) &&
                        Et(this, 1),
                      e ||
                        (v && !f) ||
                        !(m || f || u) ||
                        (de(
                          this,
                          m === h ? "onComplete" : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(m < h && this.timeScale() > 0) &&
                          this._prom()));
                }
              } else
                !(function (t, e, n, i) {
                  var r,
                    o,
                    a,
                    l = t.ratio,
                    u =
                      e < 0 ||
                      (!e &&
                        ((!t._start &&
                          (function t(e) {
                            var n = e.parent;
                            return (
                              n &&
                              n._ts &&
                              n._initted &&
                              !n._lock &&
                              (n.rawTime() < 0 || t(n))
                            );
                          })(t) &&
                          (t._initted || !Ft(t))) ||
                          ((t._ts < 0 || t._dp._ts < 0) && !Ft(t))))
                        ? 0
                        : 1,
                    c = t._rDelay,
                    d = 0;
                  if (
                    (c &&
                      t._repeat &&
                      ((d = Gt(0, t._tDur, e)),
                      (o = jt(d, c)),
                      t._yoyo && 1 & o && (u = 1 - u),
                      o !== jt(t._tTime, c) &&
                        ((l = 1 - u),
                        t.vars.repeatRefresh && t._initted && t.invalidate())),
                    u !== l || s || i || 1e-8 === t._zTime || (!e && t._zTime))
                  ) {
                    if (!t._initted && It(t, e, i, n, d)) return;
                    for (
                      a = t._zTime,
                        t._zTime = e || (n ? 1e-8 : 0),
                        n || (n = e && !a),
                        t.ratio = u,
                        t._from && (u = 1 - u),
                        t._time = 0,
                        t._tTime = d,
                        r = t._pt;
                      r;

                    )
                      r.r(u, r.d), (r = r._next);
                    e < 0 && $t(t, e, 0, !0),
                      t._onUpdate && !n && de(t, "onUpdate"),
                      d && t._repeat && !n && t.parent && de(t, "onRepeat"),
                      (e >= t._tDur || e < 0) &&
                        t.ratio === u &&
                        (u && Et(t, 1),
                        n ||
                          s ||
                          (de(t, u ? "onComplete" : "onReverseComplete", !0),
                          t._prom && t._prom()));
                  } else t._zTime || (t._zTime = e);
                })(this, t, e, n);
              return this;
            }),
            (n.targets = function () {
              return this._targets;
            }),
            (n.invalidate = function (e) {
              return (
                (!e || !this.vars.runBackwards) && (this._startAt = 0),
                (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
                (this._ptLookup = []),
                this.timeline && this.timeline.invalidate(e),
                t.prototype.invalidate.call(this, e)
              );
            }),
            (n.resetTo = function (t, e, n, i, r) {
              g || Te.wake(), this._ts || this.play();
              var o = Math.min(
                this._dur,
                (this._dp._time - this._start) * this._ts
              );
              return (
                this._initted || We(this, o),
                (function (t, e, n, i, r, o, s, a) {
                  var l,
                    u,
                    c,
                    d,
                    p = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
                  if (!p)
                    for (
                      p = t._ptCache[e] = [],
                        c = t._ptLookup,
                        d = t._targets.length;
                      d--;

                    ) {
                      if ((l = c[d][e]) && l.d && l.d._pt)
                        for (l = l.d._pt; l && l.p !== e && l.fp !== e; )
                          l = l._next;
                      if (!l)
                        return (
                          (qe = 1),
                          (t.vars[e] = "+=0"),
                          We(t, s),
                          (qe = 0),
                          a ? Q(e + " not eligible for reset") : 1
                        );
                      p.push(l);
                    }
                  for (d = p.length; d--; )
                    ((l = (u = p[d])._pt || u).s =
                      (!i && 0 !== i) || r ? l.s + (i || 0) + o * l.c : i),
                      (l.c = n - l.s),
                      u.e && (u.e = ht(n) + Qt(u.e)),
                      u.b && (u.b = l.s + Qt(u.b));
                })(this, t, e, n, i, this._ease(o / this._dur), o, r)
                  ? this.resetTo(t, e, n, i, 1)
                  : (Rt(this, 0),
                    this.parent ||
                      At(
                        this._dp,
                        this,
                        "_first",
                        "_last",
                        this._dp._sort ? "_start" : 0
                      ),
                    this.render(0))
              );
            }),
            (n.kill = function (t, e) {
              if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
                return (
                  (this._lazy = this._pt = 0), this.parent ? pe(this) : this
                );
              if (this.timeline) {
                var n = this.timeline.totalDuration();
                return (
                  this.timeline.killTweensOf(
                    t,
                    e,
                    ze && !0 !== ze.vars.overwrite
                  )._first || pe(this),
                  this.parent &&
                    n !== this.timeline.totalDuration() &&
                    Bt(this, (this._dur * this.timeline._tDur) / n, 0, 1),
                  this
                );
              }
              var i,
                r,
                o,
                s,
                a,
                l,
                u,
                c = this._targets,
                d = t ? te(t) : c,
                p = this._ptLookup,
                f = this._pt;
              if (
                (!e || "all" === e) &&
                (function (t, e) {
                  for (
                    var n = t.length, i = n === e.length;
                    i && n-- && t[n] === e[n];

                  );
                  return n < 0;
                })(c, d)
              )
                return "all" === e && (this._pt = 0), pe(this);
              for (
                i = this._op = this._op || [],
                  "all" !== e &&
                    (E(e) &&
                      ((a = {}),
                      ft(e, function (t) {
                        return (a[t] = 1);
                      }),
                      (e = a)),
                    (e = (function (t, e) {
                      var n,
                        i,
                        r,
                        o,
                        s = t[0] ? dt(t[0]).harness : 0,
                        a = s && s.aliases;
                      if (!a) return e;
                      for (i in ((n = Tt({}, e)), a))
                        if ((i in n))
                          for (r = (o = a[i].split(",")).length; r--; )
                            n[o[r]] = n[i];
                      return n;
                    })(c, e))),
                  u = c.length;
                u--;

              )
                if (~d.indexOf(c[u]))
                  for (a in ((r = p[u]),
                  "all" === e
                    ? ((i[u] = e), (s = r), (o = {}))
                    : ((o = i[u] = i[u] || {}), (s = e)),
                  s))
                    (l = r && r[a]) &&
                      (("kill" in l.d && !0 !== l.d.kill(a)) ||
                        Ot(this, l, "_pt"),
                      delete r[a]),
                      "all" !== o && (o[a] = 1);
              return this._initted && !this._pt && f && pe(this), this;
            }),
            (e.to = function (t, n) {
              return new e(t, n, arguments[2]);
            }),
            (e.from = function (t, e) {
              return Ut(1, arguments);
            }),
            (e.delayedCall = function (t, n, i, r) {
              return new e(n, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: n,
                onReverseComplete: n,
                onCompleteParams: i,
                onReverseCompleteParams: i,
                callbackScope: r,
              });
            }),
            (e.fromTo = function (t, e, n) {
              return Ut(2, arguments);
            }),
            (e.set = function (t, n) {
              return (
                (n.duration = 0), n.repeatDelay || (n.repeat = 0), new e(t, n)
              );
            }),
            (e.killTweensOf = function (t, e, n) {
              return l.killTweensOf(t, e, n);
            }),
            e
          );
        })(Re);
        xt(Ge.prototype, {
          _targets: [],
          _lazy: 0,
          _startAt: 0,
          _op: 0,
          _onInit: 0,
        }),
          ft("staggerTo,staggerFrom,staggerFromTo", function (t) {
            Ge[t] = function () {
              var e = new He(),
                n = Jt.call(arguments, 0);
              return (
                n.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, n)
              );
            };
          });
        var Qe = function (t, e, n) {
            return (t[e] = n);
          },
          Je = function (t, e, n) {
            return t[e](n);
          },
          Ke = function (t, e, n, i) {
            return t[e](i.fp, n);
          },
          Ze = function (t, e, n) {
            return t.setAttribute(e, n);
          },
          tn = function (t, e) {
            return D(t[e]) ? Je : $(t[e]) && t.setAttribute ? Ze : Qe;
          },
          en = function (t, e) {
            return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
          },
          nn = function (t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e);
          },
          rn = function (t, e) {
            var n = e._pt,
              i = "";
            if (!t && e.b) i = e.b;
            else if (1 === t && e.e) i = e.e;
            else {
              for (; n; )
                (i =
                  n.p +
                  (n.m
                    ? n.m(n.s + n.c * t)
                    : Math.round(1e4 * (n.s + n.c * t)) / 1e4) +
                  i),
                  (n = n._next);
              i += e.c;
            }
            e.set(e.t, e.p, i, e);
          },
          on = function (t, e) {
            for (var n = e._pt; n; ) n.r(t, n.d), (n = n._next);
          },
          sn = function (t, e, n, i) {
            for (var r, o = this._pt; o; )
              (r = o._next), o.p === i && o.modifier(t, e, n), (o = r);
          },
          an = function (t) {
            for (var e, n, i = this._pt; i; )
              (n = i._next),
                (i.p === t && !i.op) || i.op === t
                  ? Ot(this, i, "_pt")
                  : i.dep || (e = 1),
                (i = n);
            return !e;
          },
          ln = function (t, e, n, i) {
            i.mSet(t, e, i.m.call(i.tween, n, i.mt), i);
          },
          un = function (t) {
            for (var e, n, i, r, o = t._pt; o; ) {
              for (e = o._next, n = i; n && n.pr > o.pr; ) n = n._next;
              (o._prev = n ? n._prev : r) ? (o._prev._next = o) : (i = o),
                (o._next = n) ? (n._prev = o) : (r = o),
                (o = e);
            }
            t._pt = i;
          },
          cn = (function () {
            function t(t, e, n, i, r, o, s, a, l) {
              (this.t = e),
                (this.s = i),
                (this.c = r),
                (this.p = n),
                (this.r = o || en),
                (this.d = s || this),
                (this.set = a || Qe),
                (this.pr = l || 0),
                (this._next = t),
                t && (t._prev = this);
            }
            return (
              (t.prototype.modifier = function (t, e, n) {
                (this.mSet = this.mSet || this.set),
                  (this.set = ln),
                  (this.m = t),
                  (this.mt = n),
                  (this.tween = e);
              }),
              t
            );
          })();
        ft(
          ut +
            "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
          function (t) {
            return (nt[t] = 1);
          }
        ),
          (Y.TweenMax = Y.TweenLite = Ge),
          (Y.TimelineLite = Y.TimelineMax = He),
          (l = new He({
            sortChildren: !1,
            defaults: w,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0,
          })),
          (_.stringFilter = xe);
        var dn = [],
          pn = {},
          fn = [],
          hn = 0,
          gn = 0,
          vn = function (t) {
            return (pn[t] || fn).map(function (t) {
              return t();
            });
          },
          mn = function () {
            var t = Date.now(),
              e = [];
            t - hn > 2 &&
              (vn("matchMediaInit"),
              dn.forEach(function (t) {
                var n,
                  i,
                  r,
                  o,
                  s = t.queries,
                  a = t.conditions;
                for (i in s)
                  (n = u.matchMedia(s[i]).matches) && (r = 1),
                    n !== a[i] && ((a[i] = n), (o = 1));
                o && (t.revert(), r && e.push(t));
              }),
              vn("matchMediaRevert"),
              e.forEach(function (t) {
                return t.onMatch(t, function (e) {
                  return t.add(null, e);
                });
              }),
              (hn = t),
              vn("matchMedia"));
          },
          yn = (function () {
            function t(t, e) {
              (this.selector = e && ee(e)),
                (this.data = []),
                (this._r = []),
                (this.isReverted = !1),
                (this.id = gn++),
                t && this.add(t);
            }
            var e = t.prototype;
            return (
              (e.add = function (t, e, n) {
                D(t) && ((n = e), (e = t), (t = D));
                var i = this,
                  r = function () {
                    var t,
                      r = a,
                      o = i.selector;
                    return (
                      r && r !== i && r.data.push(i),
                      n && (i.selector = ee(n)),
                      (a = i),
                      (t = e.apply(i, arguments)),
                      D(t) && i._r.push(t),
                      (a = r),
                      (i.selector = o),
                      (i.isReverted = !1),
                      t
                    );
                  };
                return (
                  (i.last = r),
                  t === D
                    ? r(i, function (t) {
                        return i.add(null, t);
                      })
                    : t
                    ? (i[t] = r)
                    : r
                );
              }),
              (e.ignore = function (t) {
                var e = a;
                (a = null), t(this), (a = e);
              }),
              (e.getTweens = function () {
                var e = [];
                return (
                  this.data.forEach(function (n) {
                    return n instanceof t
                      ? e.push.apply(e, n.getTweens())
                      : n instanceof Ge &&
                          !(n.parent && "nested" === n.parent.data) &&
                          e.push(n);
                  }),
                  e
                );
              }),
              (e.clear = function () {
                this._r.length = this.data.length = 0;
              }),
              (e.kill = function (t, e) {
                var n = this;
                if (
                  (t
                    ? (function () {
                        for (var e, i = n.getTweens(), r = n.data.length; r--; )
                          "isFlip" === (e = n.data[r]).data &&
                            (e.revert(),
                            e.getChildren(!0, !0, !1).forEach(function (t) {
                              return i.splice(i.indexOf(t), 1);
                            }));
                        for (
                          i
                            .map(function (t) {
                              return {
                                g:
                                  t._dur ||
                                  t._delay ||
                                  (t._sat && !t._sat.vars.immediateRender)
                                    ? t.globalTime(0)
                                    : -1 / 0,
                                t: t,
                              };
                            })
                            .sort(function (t, e) {
                              return e.g - t.g || -1 / 0;
                            })
                            .forEach(function (e) {
                              return e.t.revert(t);
                            }),
                            r = n.data.length;
                          r--;

                        )
                          (e = n.data[r]) instanceof He
                            ? "nested" !== e.data &&
                              (e.scrollTrigger && e.scrollTrigger.revert(),
                              e.kill())
                            : !(e instanceof Ge) && e.revert && e.revert(t);
                        n._r.forEach(function (e) {
                          return e(t, n);
                        }),
                          (n.isReverted = !0);
                      })()
                    : this.data.forEach(function (t) {
                        return t.kill && t.kill();
                      }),
                  this.clear(),
                  e)
                )
                  for (var i = dn.length; i--; )
                    dn[i].id === this.id && dn.splice(i, 1);
              }),
              (e.revert = function (t) {
                this.kill(t || {});
              }),
              t
            );
          })(),
          bn = (function () {
            function t(t) {
              (this.contexts = []), (this.scope = t), a && a.data.push(this);
            }
            var e = t.prototype;
            return (
              (e.add = function (t, e, n) {
                P(t) || (t = { matches: t });
                var i,
                  r,
                  o,
                  s = new yn(0, n || this.scope),
                  l = (s.conditions = {});
                for (r in (a && !s.selector && (s.selector = a.selector),
                this.contexts.push(s),
                (e = s.add("onMatch", e)),
                (s.queries = t),
                t))
                  "all" === r
                    ? (o = 1)
                    : (i = u.matchMedia(t[r])) &&
                      (dn.indexOf(s) < 0 && dn.push(s),
                      (l[r] = i.matches) && (o = 1),
                      i.addListener
                        ? i.addListener(mn)
                        : i.addEventListener("change", mn));
                return (
                  o &&
                    e(s, function (t) {
                      return s.add(null, t);
                    }),
                  this
                );
              }),
              (e.revert = function (t) {
                this.kill(t || {});
              }),
              (e.kill = function (t) {
                this.contexts.forEach(function (e) {
                  return e.kill(t, !0);
                });
              }),
              t
            );
          })(),
          _n = {
            registerPlugin: function () {
              for (
                var t = arguments.length, e = new Array(t), n = 0;
                n < t;
                n++
              )
                e[n] = arguments[n];
              e.forEach(function (t) {
                return he(t);
              });
            },
            timeline: function (t) {
              return new He(t);
            },
            getTweensOf: function (t, e) {
              return l.getTweensOf(t, e);
            },
            getProperty: function (t, e, n, i) {
              E(t) && (t = te(t)[0]);
              var r = dt(t || {}).get,
                o = n ? wt : _t;
              return (
                "native" === n && (n = ""),
                t
                  ? e
                    ? o(((ot[e] && ot[e].get) || r)(t, e, n, i))
                    : function (e, n, i) {
                        return o(((ot[e] && ot[e].get) || r)(t, e, n, i));
                      }
                  : t
              );
            },
            quickSetter: function (t, e, n) {
              if ((t = te(t)).length > 1) {
                var i = t.map(function (t) {
                    return Tn.quickSetter(t, e, n);
                  }),
                  r = i.length;
                return function (t) {
                  for (var e = r; e--; ) i[e](t);
                };
              }
              t = t[0] || {};
              var o = ot[e],
                s = dt(t),
                a = (s.harness && (s.harness.aliases || {})[e]) || e,
                l = o
                  ? function (e) {
                      var i = new o();
                      (h._pt = 0),
                        i.init(t, n ? e + n : e, h, 0, [t]),
                        i.render(1, i),
                        h._pt && on(1, h);
                    }
                  : s.set(t, a);
              return o
                ? l
                : function (e) {
                    return l(t, a, n ? e + n : e, s, 1);
                  };
            },
            quickTo: function (t, e, n) {
              var i,
                r = Tn.to(
                  t,
                  Tt((((i = {})[e] = "+=0.1"), (i.paused = !0), i), n || {})
                ),
                o = function (t, n, i) {
                  return r.resetTo(e, t, n, i);
                };
              return (o.tween = r), o;
            },
            isTweening: function (t) {
              return l.getTweensOf(t, !0).length > 0;
            },
            defaults: function (t) {
              return (
                t && t.ease && (t.ease = Me(t.ease, w.ease)), kt(w, t || {})
              );
            },
            config: function (t) {
              return kt(_, t || {});
            },
            registerEffect: function (t) {
              var e = t.name,
                n = t.effect,
                i = t.plugins,
                r = t.defaults,
                o = t.extendTimeline;
              (i || "").split(",").forEach(function (t) {
                return (
                  t &&
                  !ot[t] &&
                  !Y[t] &&
                  Q(e + " effect requires " + t + " plugin.")
                );
              }),
                (st[e] = function (t, e, i) {
                  return n(te(t), xt(e || {}, r), i);
                }),
                o &&
                  (He.prototype[e] = function (t, n, i) {
                    return this.add(
                      st[e](t, P(n) ? n : (i = n) && {}, this),
                      i
                    );
                  });
            },
            registerEase: function (t, e) {
              Se[t] = Me(e);
            },
            parseEase: function (t, e) {
              return arguments.length ? Me(t, e) : Se;
            },
            getById: function (t) {
              return l.getById(t);
            },
            exportRoot: function (t, e) {
              void 0 === t && (t = {});
              var n,
                i,
                r = new He(t);
              for (
                r.smoothChildTiming = j(t.smoothChildTiming),
                  l.remove(r),
                  r._dp = 0,
                  r._time = r._tTime = l._time,
                  n = l._first;
                n;

              )
                (i = n._next),
                  (!e &&
                    !n._dur &&
                    n instanceof Ge &&
                    n.vars.onComplete === n._targets[0]) ||
                    zt(r, n, n._start - n._delay),
                  (n = i);
              return zt(l, r, 0), r;
            },
            context: function (t, e) {
              return t ? new yn(t, e) : a;
            },
            matchMedia: function (t) {
              return new bn(t);
            },
            matchMediaRefresh: function () {
              return (
                dn.forEach(function (t) {
                  var e,
                    n,
                    i = t.conditions;
                  for (n in i) i[n] && ((i[n] = !1), (e = 1));
                  e && t.revert();
                }) || mn()
              );
            },
            addEventListener: function (t, e) {
              var n = pn[t] || (pn[t] = []);
              ~n.indexOf(e) || n.push(e);
            },
            removeEventListener: function (t, e) {
              var n = pn[t],
                i = n && n.indexOf(e);
              i >= 0 && n.splice(i, 1);
            },
            utils: {
              wrap: function t(e, n, i) {
                var r = n - e;
                return H(e)
                  ? ae(e, t(0, e.length), n)
                  : Vt(i, function (t) {
                      return ((r + ((t - e) % r)) % r) + e;
                    });
              },
              wrapYoyo: function t(e, n, i) {
                var r = n - e,
                  o = 2 * r;
                return H(e)
                  ? ae(e, t(0, e.length - 1), n)
                  : Vt(i, function (t) {
                      return (
                        e + ((t = (o + ((t - e) % o)) % o || 0) > r ? o - t : t)
                      );
                    });
              },
              distribute: ie,
              random: se,
              snap: oe,
              normalize: function (t, e, n) {
                return ue(t, e, 0, 1, n);
              },
              getUnit: Qt,
              clamp: function (t, e, n) {
                return Vt(n, function (n) {
                  return Gt(t, e, n);
                });
              },
              splitColor: me,
              toArray: te,
              selector: ee,
              mapRange: ue,
              pipe: function () {
                for (
                  var t = arguments.length, e = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  e[n] = arguments[n];
                return function (t) {
                  return e.reduce(function (t, e) {
                    return e(t);
                  }, t);
                };
              },
              unitize: function (t, e) {
                return function (n) {
                  return t(parseFloat(n)) + (e || Qt(n));
                };
              },
              interpolate: function t(e, n, i, r) {
                var o = isNaN(e + n)
                  ? 0
                  : function (t) {
                      return (1 - t) * e + t * n;
                    };
                if (!o) {
                  var s,
                    a,
                    l,
                    u,
                    c,
                    d = E(e),
                    p = {};
                  if ((!0 === i && (r = 1) && (i = null), d))
                    (e = { p: e }), (n = { p: n });
                  else if (H(e) && !H(n)) {
                    for (l = [], u = e.length, c = u - 2, a = 1; a < u; a++)
                      l.push(t(e[a - 1], e[a]));
                    u--,
                      (o = function (t) {
                        t *= u;
                        var e = Math.min(c, ~~t);
                        return l[e](t - e);
                      }),
                      (i = n);
                  } else r || (e = Tt(H(e) ? [] : {}, e));
                  if (!l) {
                    for (s in n) Fe.call(p, e, s, "get", n[s]);
                    o = function (t) {
                      return on(t, p) || (d ? e.p : e);
                    };
                  }
                }
                return Vt(i, o);
              },
              shuffle: ne,
            },
            install: V,
            effects: st,
            ticker: Te,
            updateRoot: He.updateRoot,
            plugins: ot,
            globalTimeline: l,
            core: {
              PropTween: cn,
              globals: J,
              Tween: Ge,
              Timeline: He,
              Animation: Re,
              getCache: dt,
              _removeLinkedListItem: Ot,
              reverting: function () {
                return s;
              },
              context: function (t) {
                return t && a && (a.data.push(t), (t._ctx = a)), a;
              },
              suppressOverwrites: function (t) {
                return (o = t);
              },
            },
          };
        ft("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
          return (_n[t] = Ge[t]);
        }),
          Te.add(He.updateRoot),
          (h = _n.to({}, { duration: 0 }));
        var wn = function (t, e) {
            for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e; )
              n = n._next;
            return n;
          },
          xn = function (t, e) {
            return {
              name: t,
              rawVars: 1,
              init: function (t, n, i) {
                i._onInit = function (t) {
                  var i, r;
                  if (
                    (E(n) &&
                      ((i = {}),
                      ft(n, function (t) {
                        return (i[t] = 1);
                      }),
                      (n = i)),
                    e)
                  ) {
                    for (r in ((i = {}), n)) i[r] = e(n[r]);
                    n = i;
                  }
                  !(function (t, e) {
                    var n,
                      i,
                      r,
                      o = t._targets;
                    for (n in e)
                      for (i = o.length; i--; )
                        (r = t._ptLookup[i][n]) &&
                          (r = r.d) &&
                          (r._pt && (r = wn(r, n)),
                          r && r.modifier && r.modifier(e[n], t, o[i], n));
                  })(t, n);
                };
              },
            };
          },
          Tn =
            _n.registerPlugin(
              {
                name: "attr",
                init: function (t, e, n, i, r) {
                  var o, s, a;
                  for (o in ((this.tween = n), e))
                    (a = t.getAttribute(o) || ""),
                      ((s = this.add(
                        t,
                        "setAttribute",
                        (a || 0) + "",
                        e[o],
                        i,
                        r,
                        0,
                        0,
                        o
                      )).op = o),
                      (s.b = a),
                      this._props.push(o);
                },
                render: function (t, e) {
                  for (var n = e._pt; n; )
                    s ? n.set(n.t, n.p, n.b, n) : n.r(t, n.d), (n = n._next);
                },
              },
              {
                name: "endArray",
                init: function (t, e) {
                  for (var n = e.length; n--; )
                    this.add(t, n, t[n] || 0, e[n], 0, 0, 0, 0, 0, 1);
                },
              },
              xn("roundProps", re),
              xn("modifiers"),
              xn("snap", oe)
            ) || _n;
        (Ge.version = He.version = Tn.version = "3.12.5"), (p = 1), L() && ke();
        Se.Power0,
          Se.Power1,
          Se.Power2,
          Se.Power3,
          Se.Power4,
          Se.Linear,
          Se.Quad,
          Se.Cubic,
          Se.Quart,
          Se.Quint,
          Se.Strong,
          Se.Elastic,
          Se.Back,
          Se.SteppedEase,
          Se.Bounce,
          Se.Sine,
          Se.Expo,
          Se.Circ;
      }.call(this, n(25)));
    },
    function (t, e, n) {
      var i;
      /*!
       * jQuery JavaScript Library v3.6.0
       * https://jquery.com/
       *
       * Includes Sizzle.js
       * https://sizzlejs.com/
       *
       * Copyright OpenJS Foundation and other contributors
       * Released under the MIT license
       * https://jquery.org/license
       *
       * Date: 2021-03-02T17:08Z
       */ !(function (e, n) {
        "use strict";
        "object" == typeof t.exports
          ? (t.exports = e.document
              ? n(e, !0)
              : function (t) {
                  if (!t.document)
                    throw new Error("jQuery requires a window with a document");
                  return n(t);
                })
          : n(e);
      })("undefined" != typeof window ? window : this, function (n, r) {
        "use strict";
        var o = [],
          s = Object.getPrototypeOf,
          a = o.slice,
          l = o.flat
            ? function (t) {
                return o.flat.call(t);
              }
            : function (t) {
                return o.concat.apply([], t);
              },
          u = o.push,
          c = o.indexOf,
          d = {},
          p = d.toString,
          f = d.hasOwnProperty,
          h = f.toString,
          g = h.call(Object),
          v = {},
          m = function (t) {
            return (
              "function" == typeof t &&
              "number" != typeof t.nodeType &&
              "function" != typeof t.item
            );
          },
          y = function (t) {
            return null != t && t === t.window;
          },
          b = n.document,
          _ = { type: !0, src: !0, nonce: !0, noModule: !0 };
        function w(t, e, n) {
          var i,
            r,
            o = (n = n || b).createElement("script");
          if (((o.text = t), e))
            for (i in _)
              (r = e[i] || (e.getAttribute && e.getAttribute(i))) &&
                o.setAttribute(i, r);
          n.head.appendChild(o).parentNode.removeChild(o);
        }
        function x(t) {
          return null == t
            ? t + ""
            : "object" == typeof t || "function" == typeof t
            ? d[p.call(t)] || "object"
            : typeof t;
        }
        var T = function (t, e) {
          return new T.fn.init(t, e);
        };
        function k(t) {
          var e = !!t && "length" in t && t.length,
            n = x(t);
          return (
            !m(t) &&
            !y(t) &&
            ("array" === n ||
              0 === e ||
              ("number" == typeof e && e > 0 && e - 1 in t))
          );
        }
        (T.fn = T.prototype = {
          jquery: "3.6.0",
          constructor: T,
          length: 0,
          toArray: function () {
            return a.call(this);
          },
          get: function (t) {
            return null == t
              ? a.call(this)
              : t < 0
              ? this[t + this.length]
              : this[t];
          },
          pushStack: function (t) {
            var e = T.merge(this.constructor(), t);
            return (e.prevObject = this), e;
          },
          each: function (t) {
            return T.each(this, t);
          },
          map: function (t) {
            return this.pushStack(
              T.map(this, function (e, n) {
                return t.call(e, n, e);
              })
            );
          },
          slice: function () {
            return this.pushStack(a.apply(this, arguments));
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          even: function () {
            return this.pushStack(
              T.grep(this, function (t, e) {
                return (e + 1) % 2;
              })
            );
          },
          odd: function () {
            return this.pushStack(
              T.grep(this, function (t, e) {
                return e % 2;
              })
            );
          },
          eq: function (t) {
            var e = this.length,
              n = +t + (t < 0 ? e : 0);
            return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
          },
          end: function () {
            return this.prevObject || this.constructor();
          },
          push: u,
          sort: o.sort,
          splice: o.splice,
        }),
          (T.extend = T.fn.extend = function () {
            var t,
              e,
              n,
              i,
              r,
              o,
              s = arguments[0] || {},
              a = 1,
              l = arguments.length,
              u = !1;
            for (
              "boolean" == typeof s && ((u = s), (s = arguments[a] || {}), a++),
                "object" == typeof s || m(s) || (s = {}),
                a === l && ((s = this), a--);
              a < l;
              a++
            )
              if (null != (t = arguments[a]))
                for (e in t)
                  (i = t[e]),
                    "__proto__" !== e &&
                      s !== i &&
                      (u && i && (T.isPlainObject(i) || (r = Array.isArray(i)))
                        ? ((n = s[e]),
                          (o =
                            r && !Array.isArray(n)
                              ? []
                              : r || T.isPlainObject(n)
                              ? n
                              : {}),
                          (r = !1),
                          (s[e] = T.extend(u, o, i)))
                        : void 0 !== i && (s[e] = i));
            return s;
          }),
          T.extend({
            expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (t) {
              throw new Error(t);
            },
            noop: function () {},
            isPlainObject: function (t) {
              var e, n;
              return (
                !(!t || "[object Object]" !== p.call(t)) &&
                (!(e = s(t)) ||
                  ("function" ==
                    typeof (n = f.call(e, "constructor") && e.constructor) &&
                    h.call(n) === g))
              );
            },
            isEmptyObject: function (t) {
              var e;
              for (e in t) return !1;
              return !0;
            },
            globalEval: function (t, e, n) {
              w(t, { nonce: e && e.nonce }, n);
            },
            each: function (t, e) {
              var n,
                i = 0;
              if (k(t))
                for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
              else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
              return t;
            },
            makeArray: function (t, e) {
              var n = e || [];
              return (
                null != t &&
                  (k(Object(t))
                    ? T.merge(n, "string" == typeof t ? [t] : t)
                    : u.call(n, t)),
                n
              );
            },
            inArray: function (t, e, n) {
              return null == e ? -1 : c.call(e, t, n);
            },
            merge: function (t, e) {
              for (var n = +e.length, i = 0, r = t.length; i < n; i++)
                t[r++] = e[i];
              return (t.length = r), t;
            },
            grep: function (t, e, n) {
              for (var i = [], r = 0, o = t.length, s = !n; r < o; r++)
                !e(t[r], r) !== s && i.push(t[r]);
              return i;
            },
            map: function (t, e, n) {
              var i,
                r,
                o = 0,
                s = [];
              if (k(t))
                for (i = t.length; o < i; o++)
                  null != (r = e(t[o], o, n)) && s.push(r);
              else for (o in t) null != (r = e(t[o], o, n)) && s.push(r);
              return l(s);
            },
            guid: 1,
            support: v,
          }),
          "function" == typeof Symbol &&
            (T.fn[Symbol.iterator] = o[Symbol.iterator]),
          T.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
              " "
            ),
            function (t, e) {
              d["[object " + e + "]"] = e.toLowerCase();
            }
          );
        var S =
          /*!
           * Sizzle CSS Selector Engine v2.3.6
           * https://sizzlejs.com/
           *
           * Copyright JS Foundation and other contributors
           * Released under the MIT license
           * https://js.foundation/
           *
           * Date: 2021-02-16
           */
          (function (t) {
            var e,
              n,
              i,
              r,
              o,
              s,
              a,
              l,
              u,
              c,
              d,
              p,
              f,
              h,
              g,
              v,
              m,
              y,
              b,
              _ = "sizzle" + 1 * new Date(),
              w = t.document,
              x = 0,
              T = 0,
              k = lt(),
              S = lt(),
              C = lt(),
              A = lt(),
              O = function (t, e) {
                return t === e && (d = !0), 0;
              },
              E = {}.hasOwnProperty,
              D = [],
              M = D.pop,
              $ = D.push,
              P = D.push,
              j = D.slice,
              L = function (t, e) {
                for (var n = 0, i = t.length; n < i; n++)
                  if (t[n] === e) return n;
                return -1;
              },
              N =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              R = "[\\x20\\t\\r\\n\\f]",
              H =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                R +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              z =
                "\\[" +
                R +
                "*(" +
                H +
                ")(?:" +
                R +
                "*([*^$|!~]?=)" +
                R +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                H +
                "))|)" +
                R +
                "*\\]",
              q =
                ":(" +
                H +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                z +
                ")*)|.*)\\)|)",
              I = new RegExp(R + "+", "g"),
              F = new RegExp(
                "^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$",
                "g"
              ),
              B = new RegExp("^" + R + "*," + R + "*"),
              W = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
              X = new RegExp(R + "|>"),
              Y = new RegExp(q),
              U = new RegExp("^" + H + "$"),
              V = {
                ID: new RegExp("^#(" + H + ")"),
                CLASS: new RegExp("^\\.(" + H + ")"),
                TAG: new RegExp("^(" + H + "|[*])"),
                ATTR: new RegExp("^" + z),
                PSEUDO: new RegExp("^" + q),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    R +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    R +
                    "*(?:([+-]|)" +
                    R +
                    "*(\\d+)|))" +
                    R +
                    "*\\)|)",
                  "i"
                ),
                bool: new RegExp("^(?:" + N + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    R +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    R +
                    "*((?:-\\d)?\\d*)" +
                    R +
                    "*\\)|)(?=[^-]|$)",
                  "i"
                ),
              },
              G = /HTML$/i,
              Q = /^(?:input|select|textarea|button)$/i,
              J = /^h\d$/i,
              K = /^[^{]+\{\s*\[native \w/,
              Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              tt = /[+~]/,
              et = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])",
                "g"
              ),
              nt = function (t, e) {
                var n = "0x" + t.slice(1) - 65536;
                return (
                  e ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              rt = function (t, e) {
                return e
                  ? "\0" === t
                    ? "�"
                    : t.slice(0, -1) +
                      "\\" +
                      t.charCodeAt(t.length - 1).toString(16) +
                      " "
                  : "\\" + t;
              },
              ot = function () {
                p();
              },
              st = _t(
                function (t) {
                  return (
                    !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
                  );
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              P.apply((D = j.call(w.childNodes)), w.childNodes),
                D[w.childNodes.length].nodeType;
            } catch (t) {
              P = {
                apply: D.length
                  ? function (t, e) {
                      $.apply(t, j.call(e));
                    }
                  : function (t, e) {
                      for (var n = t.length, i = 0; (t[n++] = e[i++]); );
                      t.length = n - 1;
                    },
              };
            }
            function at(t, e, i, r) {
              var o,
                a,
                u,
                c,
                d,
                h,
                m,
                y = e && e.ownerDocument,
                w = e ? e.nodeType : 9;
              if (
                ((i = i || []),
                "string" != typeof t || !t || (1 !== w && 9 !== w && 11 !== w))
              )
                return i;
              if (!r && (p(e), (e = e || f), g)) {
                if (11 !== w && (d = Z.exec(t)))
                  if ((o = d[1])) {
                    if (9 === w) {
                      if (!(u = e.getElementById(o))) return i;
                      if (u.id === o) return i.push(u), i;
                    } else if (
                      y &&
                      (u = y.getElementById(o)) &&
                      b(e, u) &&
                      u.id === o
                    )
                      return i.push(u), i;
                  } else {
                    if (d[2]) return P.apply(i, e.getElementsByTagName(t)), i;
                    if (
                      (o = d[3]) &&
                      n.getElementsByClassName &&
                      e.getElementsByClassName
                    )
                      return P.apply(i, e.getElementsByClassName(o)), i;
                  }
                if (
                  n.qsa &&
                  !A[t + " "] &&
                  (!v || !v.test(t)) &&
                  (1 !== w || "object" !== e.nodeName.toLowerCase())
                ) {
                  if (((m = t), (y = e), 1 === w && (X.test(t) || W.test(t)))) {
                    for (
                      ((y = (tt.test(t) && mt(e.parentNode)) || e) === e &&
                        n.scope) ||
                        ((c = e.getAttribute("id"))
                          ? (c = c.replace(it, rt))
                          : e.setAttribute("id", (c = _))),
                        a = (h = s(t)).length;
                      a--;

                    )
                      h[a] = (c ? "#" + c : ":scope") + " " + bt(h[a]);
                    m = h.join(",");
                  }
                  try {
                    return P.apply(i, y.querySelectorAll(m)), i;
                  } catch (e) {
                    A(t, !0);
                  } finally {
                    c === _ && e.removeAttribute("id");
                  }
                }
              }
              return l(t.replace(F, "$1"), e, i, r);
            }
            function lt() {
              var t = [];
              return function e(n, r) {
                return (
                  t.push(n + " ") > i.cacheLength && delete e[t.shift()],
                  (e[n + " "] = r)
                );
              };
            }
            function ut(t) {
              return (t[_] = !0), t;
            }
            function ct(t) {
              var e = f.createElement("fieldset");
              try {
                return !!t(e);
              } catch (t) {
                return !1;
              } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
              }
            }
            function dt(t, e) {
              for (var n = t.split("|"), r = n.length; r--; )
                i.attrHandle[n[r]] = e;
            }
            function pt(t, e) {
              var n = e && t,
                i =
                  n &&
                  1 === t.nodeType &&
                  1 === e.nodeType &&
                  t.sourceIndex - e.sourceIndex;
              if (i) return i;
              if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
              return t ? 1 : -1;
            }
            function ft(t) {
              return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
              };
            }
            function ht(t) {
              return function (e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t;
              };
            }
            function gt(t) {
              return function (e) {
                return "form" in e
                  ? e.parentNode && !1 === e.disabled
                    ? "label" in e
                      ? "label" in e.parentNode
                        ? e.parentNode.disabled === t
                        : e.disabled === t
                      : e.isDisabled === t ||
                        (e.isDisabled !== !t && st(e) === t)
                    : e.disabled === t
                  : "label" in e && e.disabled === t;
              };
            }
            function vt(t) {
              return ut(function (e) {
                return (
                  (e = +e),
                  ut(function (n, i) {
                    for (var r, o = t([], n.length, e), s = o.length; s--; )
                      n[(r = o[s])] && (n[r] = !(i[r] = n[r]));
                  })
                );
              });
            }
            function mt(t) {
              return t && void 0 !== t.getElementsByTagName && t;
            }
            for (e in ((n = at.support = {}),
            (o = at.isXML = function (t) {
              var e = t && t.namespaceURI,
                n = t && (t.ownerDocument || t).documentElement;
              return !G.test(e || (n && n.nodeName) || "HTML");
            }),
            (p = at.setDocument = function (t) {
              var e,
                r,
                s = t ? t.ownerDocument || t : w;
              return s != f && 9 === s.nodeType && s.documentElement
                ? ((h = (f = s).documentElement),
                  (g = !o(f)),
                  w != f &&
                    (r = f.defaultView) &&
                    r.top !== r &&
                    (r.addEventListener
                      ? r.addEventListener("unload", ot, !1)
                      : r.attachEvent && r.attachEvent("onunload", ot)),
                  (n.scope = ct(function (t) {
                    return (
                      h.appendChild(t).appendChild(f.createElement("div")),
                      void 0 !== t.querySelectorAll &&
                        !t.querySelectorAll(":scope fieldset div").length
                    );
                  })),
                  (n.attributes = ct(function (t) {
                    return (t.className = "i"), !t.getAttribute("className");
                  })),
                  (n.getElementsByTagName = ct(function (t) {
                    return (
                      t.appendChild(f.createComment("")),
                      !t.getElementsByTagName("*").length
                    );
                  })),
                  (n.getElementsByClassName = K.test(f.getElementsByClassName)),
                  (n.getById = ct(function (t) {
                    return (
                      (h.appendChild(t).id = _),
                      !f.getElementsByName || !f.getElementsByName(_).length
                    );
                  })),
                  n.getById
                    ? ((i.filter.ID = function (t) {
                        var e = t.replace(et, nt);
                        return function (t) {
                          return t.getAttribute("id") === e;
                        };
                      }),
                      (i.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && g) {
                          var n = e.getElementById(t);
                          return n ? [n] : [];
                        }
                      }))
                    : ((i.filter.ID = function (t) {
                        var e = t.replace(et, nt);
                        return function (t) {
                          var n =
                            void 0 !== t.getAttributeNode &&
                            t.getAttributeNode("id");
                          return n && n.value === e;
                        };
                      }),
                      (i.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && g) {
                          var n,
                            i,
                            r,
                            o = e.getElementById(t);
                          if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === t)
                              return [o];
                            for (
                              r = e.getElementsByName(t), i = 0;
                              (o = r[i++]);

                            )
                              if (
                                (n = o.getAttributeNode("id")) &&
                                n.value === t
                              )
                                return [o];
                          }
                          return [];
                        }
                      })),
                  (i.find.TAG = n.getElementsByTagName
                    ? function (t, e) {
                        return void 0 !== e.getElementsByTagName
                          ? e.getElementsByTagName(t)
                          : n.qsa
                          ? e.querySelectorAll(t)
                          : void 0;
                      }
                    : function (t, e) {
                        var n,
                          i = [],
                          r = 0,
                          o = e.getElementsByTagName(t);
                        if ("*" === t) {
                          for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                          return i;
                        }
                        return o;
                      }),
                  (i.find.CLASS =
                    n.getElementsByClassName &&
                    function (t, e) {
                      if (void 0 !== e.getElementsByClassName && g)
                        return e.getElementsByClassName(t);
                    }),
                  (m = []),
                  (v = []),
                  (n.qsa = K.test(f.querySelectorAll)) &&
                    (ct(function (t) {
                      var e;
                      (h.appendChild(t).innerHTML =
                        "<a id='" +
                        _ +
                        "'></a><select id='" +
                        _ +
                        "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                        t.querySelectorAll("[msallowcapture^='']").length &&
                          v.push("[*^$]=" + R + "*(?:''|\"\")"),
                        t.querySelectorAll("[selected]").length ||
                          v.push("\\[" + R + "*(?:value|" + N + ")"),
                        t.querySelectorAll("[id~=" + _ + "-]").length ||
                          v.push("~="),
                        (e = f.createElement("input")).setAttribute("name", ""),
                        t.appendChild(e),
                        t.querySelectorAll("[name='']").length ||
                          v.push(
                            "\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"
                          ),
                        t.querySelectorAll(":checked").length ||
                          v.push(":checked"),
                        t.querySelectorAll("a#" + _ + "+*").length ||
                          v.push(".#.+[+~]"),
                        t.querySelectorAll("\\\f"),
                        v.push("[\\r\\n\\f]");
                    }),
                    ct(function (t) {
                      t.innerHTML =
                        "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                      var e = f.createElement("input");
                      e.setAttribute("type", "hidden"),
                        t.appendChild(e).setAttribute("name", "D"),
                        t.querySelectorAll("[name=d]").length &&
                          v.push("name" + R + "*[*^$|!~]?="),
                        2 !== t.querySelectorAll(":enabled").length &&
                          v.push(":enabled", ":disabled"),
                        (h.appendChild(t).disabled = !0),
                        2 !== t.querySelectorAll(":disabled").length &&
                          v.push(":enabled", ":disabled"),
                        t.querySelectorAll("*,:x"),
                        v.push(",.*:");
                    })),
                  (n.matchesSelector = K.test(
                    (y =
                      h.matches ||
                      h.webkitMatchesSelector ||
                      h.mozMatchesSelector ||
                      h.oMatchesSelector ||
                      h.msMatchesSelector)
                  )) &&
                    ct(function (t) {
                      (n.disconnectedMatch = y.call(t, "*")),
                        y.call(t, "[s!='']:x"),
                        m.push("!=", q);
                    }),
                  (v = v.length && new RegExp(v.join("|"))),
                  (m = m.length && new RegExp(m.join("|"))),
                  (e = K.test(h.compareDocumentPosition)),
                  (b =
                    e || K.test(h.contains)
                      ? function (t, e) {
                          var n = 9 === t.nodeType ? t.documentElement : t,
                            i = e && e.parentNode;
                          return (
                            t === i ||
                            !(
                              !i ||
                              1 !== i.nodeType ||
                              !(n.contains
                                ? n.contains(i)
                                : t.compareDocumentPosition &&
                                  16 & t.compareDocumentPosition(i))
                            )
                          );
                        }
                      : function (t, e) {
                          if (e)
                            for (; (e = e.parentNode); ) if (e === t) return !0;
                          return !1;
                        }),
                  (O = e
                    ? function (t, e) {
                        if (t === e) return (d = !0), 0;
                        var i =
                          !t.compareDocumentPosition -
                          !e.compareDocumentPosition;
                        return (
                          i ||
                          (1 &
                            (i =
                              (t.ownerDocument || t) == (e.ownerDocument || e)
                                ? t.compareDocumentPosition(e)
                                : 1) ||
                          (!n.sortDetached &&
                            e.compareDocumentPosition(t) === i)
                            ? t == f || (t.ownerDocument == w && b(w, t))
                              ? -1
                              : e == f || (e.ownerDocument == w && b(w, e))
                              ? 1
                              : c
                              ? L(c, t) - L(c, e)
                              : 0
                            : 4 & i
                            ? -1
                            : 1)
                        );
                      }
                    : function (t, e) {
                        if (t === e) return (d = !0), 0;
                        var n,
                          i = 0,
                          r = t.parentNode,
                          o = e.parentNode,
                          s = [t],
                          a = [e];
                        if (!r || !o)
                          return t == f
                            ? -1
                            : e == f
                            ? 1
                            : r
                            ? -1
                            : o
                            ? 1
                            : c
                            ? L(c, t) - L(c, e)
                            : 0;
                        if (r === o) return pt(t, e);
                        for (n = t; (n = n.parentNode); ) s.unshift(n);
                        for (n = e; (n = n.parentNode); ) a.unshift(n);
                        for (; s[i] === a[i]; ) i++;
                        return i
                          ? pt(s[i], a[i])
                          : s[i] == w
                          ? -1
                          : a[i] == w
                          ? 1
                          : 0;
                      }),
                  f)
                : f;
            }),
            (at.matches = function (t, e) {
              return at(t, null, null, e);
            }),
            (at.matchesSelector = function (t, e) {
              if (
                (p(t),
                n.matchesSelector &&
                  g &&
                  !A[e + " "] &&
                  (!m || !m.test(e)) &&
                  (!v || !v.test(e)))
              )
                try {
                  var i = y.call(t, e);
                  if (
                    i ||
                    n.disconnectedMatch ||
                    (t.document && 11 !== t.document.nodeType)
                  )
                    return i;
                } catch (t) {
                  A(e, !0);
                }
              return at(e, f, null, [t]).length > 0;
            }),
            (at.contains = function (t, e) {
              return (t.ownerDocument || t) != f && p(t), b(t, e);
            }),
            (at.attr = function (t, e) {
              (t.ownerDocument || t) != f && p(t);
              var r = i.attrHandle[e.toLowerCase()],
                o =
                  r && E.call(i.attrHandle, e.toLowerCase())
                    ? r(t, e, !g)
                    : void 0;
              return void 0 !== o
                ? o
                : n.attributes || !g
                ? t.getAttribute(e)
                : (o = t.getAttributeNode(e)) && o.specified
                ? o.value
                : null;
            }),
            (at.escape = function (t) {
              return (t + "").replace(it, rt);
            }),
            (at.error = function (t) {
              throw new Error("Syntax error, unrecognized expression: " + t);
            }),
            (at.uniqueSort = function (t) {
              var e,
                i = [],
                r = 0,
                o = 0;
              if (
                ((d = !n.detectDuplicates),
                (c = !n.sortStable && t.slice(0)),
                t.sort(O),
                d)
              ) {
                for (; (e = t[o++]); ) e === t[o] && (r = i.push(o));
                for (; r--; ) t.splice(i[r], 1);
              }
              return (c = null), t;
            }),
            (r = at.getText = function (t) {
              var e,
                n = "",
                i = 0,
                o = t.nodeType;
              if (o) {
                if (1 === o || 9 === o || 11 === o) {
                  if ("string" == typeof t.textContent) return t.textContent;
                  for (t = t.firstChild; t; t = t.nextSibling) n += r(t);
                } else if (3 === o || 4 === o) return t.nodeValue;
              } else for (; (e = t[i++]); ) n += r(e);
              return n;
            }),
            ((i = at.selectors = {
              cacheLength: 50,
              createPseudo: ut,
              match: V,
              attrHandle: {},
              find: {},
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (t) {
                  return (
                    (t[1] = t[1].replace(et, nt)),
                    (t[3] = (t[3] || t[4] || t[5] || "").replace(et, nt)),
                    "~=" === t[2] && (t[3] = " " + t[3] + " "),
                    t.slice(0, 4)
                  );
                },
                CHILD: function (t) {
                  return (
                    (t[1] = t[1].toLowerCase()),
                    "nth" === t[1].slice(0, 3)
                      ? (t[3] || at.error(t[0]),
                        (t[4] = +(t[4]
                          ? t[5] + (t[6] || 1)
                          : 2 * ("even" === t[3] || "odd" === t[3]))),
                        (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                      : t[3] && at.error(t[0]),
                    t
                  );
                },
                PSEUDO: function (t) {
                  var e,
                    n = !t[6] && t[2];
                  return V.CHILD.test(t[0])
                    ? null
                    : (t[3]
                        ? (t[2] = t[4] || t[5] || "")
                        : n &&
                          Y.test(n) &&
                          (e = s(n, !0)) &&
                          (e = n.indexOf(")", n.length - e) - n.length) &&
                          ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                      t.slice(0, 3));
                },
              },
              filter: {
                TAG: function (t) {
                  var e = t.replace(et, nt).toLowerCase();
                  return "*" === t
                    ? function () {
                        return !0;
                      }
                    : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e;
                      };
                },
                CLASS: function (t) {
                  var e = k[t + " "];
                  return (
                    e ||
                    ((e = new RegExp("(^|" + R + ")" + t + "(" + R + "|$)")) &&
                      k(t, function (t) {
                        return e.test(
                          ("string" == typeof t.className && t.className) ||
                            (void 0 !== t.getAttribute &&
                              t.getAttribute("class")) ||
                            ""
                        );
                      }))
                  );
                },
                ATTR: function (t, e, n) {
                  return function (i) {
                    var r = at.attr(i, t);
                    return null == r
                      ? "!=" === e
                      : !e ||
                          ((r += ""),
                          "=" === e
                            ? r === n
                            : "!=" === e
                            ? r !== n
                            : "^=" === e
                            ? n && 0 === r.indexOf(n)
                            : "*=" === e
                            ? n && r.indexOf(n) > -1
                            : "$=" === e
                            ? n && r.slice(-n.length) === n
                            : "~=" === e
                            ? (" " + r.replace(I, " ") + " ").indexOf(n) > -1
                            : "|=" === e &&
                              (r === n ||
                                r.slice(0, n.length + 1) === n + "-"));
                  };
                },
                CHILD: function (t, e, n, i, r) {
                  var o = "nth" !== t.slice(0, 3),
                    s = "last" !== t.slice(-4),
                    a = "of-type" === e;
                  return 1 === i && 0 === r
                    ? function (t) {
                        return !!t.parentNode;
                      }
                    : function (e, n, l) {
                        var u,
                          c,
                          d,
                          p,
                          f,
                          h,
                          g = o !== s ? "nextSibling" : "previousSibling",
                          v = e.parentNode,
                          m = a && e.nodeName.toLowerCase(),
                          y = !l && !a,
                          b = !1;
                        if (v) {
                          if (o) {
                            for (; g; ) {
                              for (p = e; (p = p[g]); )
                                if (
                                  a
                                    ? p.nodeName.toLowerCase() === m
                                    : 1 === p.nodeType
                                )
                                  return !1;
                              h = g = "only" === t && !h && "nextSibling";
                            }
                            return !0;
                          }
                          if (
                            ((h = [s ? v.firstChild : v.lastChild]), s && y)
                          ) {
                            for (
                              b =
                                (f =
                                  (u =
                                    (c =
                                      (d = (p = v)[_] || (p[_] = {}))[
                                        p.uniqueID
                                      ] || (d[p.uniqueID] = {}))[t] ||
                                    [])[0] === x && u[1]) && u[2],
                                p = f && v.childNodes[f];
                              (p =
                                (++f && p && p[g]) || (b = f = 0) || h.pop());

                            )
                              if (1 === p.nodeType && ++b && p === e) {
                                c[t] = [x, f, b];
                                break;
                              }
                          } else if (
                            (y &&
                              (b = f =
                                (u =
                                  (c =
                                    (d = (p = e)[_] || (p[_] = {}))[
                                      p.uniqueID
                                    ] || (d[p.uniqueID] = {}))[t] || [])[0] ===
                                  x && u[1]),
                            !1 === b)
                          )
                            for (
                              ;
                              (p =
                                (++f && p && p[g]) || (b = f = 0) || h.pop()) &&
                              ((a
                                ? p.nodeName.toLowerCase() !== m
                                : 1 !== p.nodeType) ||
                                !++b ||
                                (y &&
                                  ((c =
                                    (d = p[_] || (p[_] = {}))[p.uniqueID] ||
                                    (d[p.uniqueID] = {}))[t] = [x, b]),
                                p !== e));

                            );
                          return (b -= r) === i || (b % i == 0 && b / i >= 0);
                        }
                      };
                },
                PSEUDO: function (t, e) {
                  var n,
                    r =
                      i.pseudos[t] ||
                      i.setFilters[t.toLowerCase()] ||
                      at.error("unsupported pseudo: " + t);
                  return r[_]
                    ? r(e)
                    : r.length > 1
                    ? ((n = [t, t, "", e]),
                      i.setFilters.hasOwnProperty(t.toLowerCase())
                        ? ut(function (t, n) {
                            for (var i, o = r(t, e), s = o.length; s--; )
                              t[(i = L(t, o[s]))] = !(n[i] = o[s]);
                          })
                        : function (t) {
                            return r(t, 0, n);
                          })
                    : r;
                },
              },
              pseudos: {
                not: ut(function (t) {
                  var e = [],
                    n = [],
                    i = a(t.replace(F, "$1"));
                  return i[_]
                    ? ut(function (t, e, n, r) {
                        for (var o, s = i(t, null, r, []), a = t.length; a--; )
                          (o = s[a]) && (t[a] = !(e[a] = o));
                      })
                    : function (t, r, o) {
                        return (
                          (e[0] = t), i(e, null, o, n), (e[0] = null), !n.pop()
                        );
                      };
                }),
                has: ut(function (t) {
                  return function (e) {
                    return at(t, e).length > 0;
                  };
                }),
                contains: ut(function (t) {
                  return (
                    (t = t.replace(et, nt)),
                    function (e) {
                      return (e.textContent || r(e)).indexOf(t) > -1;
                    }
                  );
                }),
                lang: ut(function (t) {
                  return (
                    U.test(t || "") || at.error("unsupported lang: " + t),
                    (t = t.replace(et, nt).toLowerCase()),
                    function (e) {
                      var n;
                      do {
                        if (
                          (n = g
                            ? e.lang
                            : e.getAttribute("xml:lang") ||
                              e.getAttribute("lang"))
                        )
                          return (
                            (n = n.toLowerCase()) === t ||
                            0 === n.indexOf(t + "-")
                          );
                      } while ((e = e.parentNode) && 1 === e.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (e) {
                  var n = t.location && t.location.hash;
                  return n && n.slice(1) === e.id;
                },
                root: function (t) {
                  return t === h;
                },
                focus: function (t) {
                  return (
                    t === f.activeElement &&
                    (!f.hasFocus || f.hasFocus()) &&
                    !!(t.type || t.href || ~t.tabIndex)
                  );
                },
                enabled: gt(!1),
                disabled: gt(!0),
                checked: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return (
                    ("input" === e && !!t.checked) ||
                    ("option" === e && !!t.selected)
                  );
                },
                selected: function (t) {
                  return (
                    t.parentNode && t.parentNode.selectedIndex,
                    !0 === t.selected
                  );
                },
                empty: function (t) {
                  for (t = t.firstChild; t; t = t.nextSibling)
                    if (t.nodeType < 6) return !1;
                  return !0;
                },
                parent: function (t) {
                  return !i.pseudos.empty(t);
                },
                header: function (t) {
                  return J.test(t.nodeName);
                },
                input: function (t) {
                  return Q.test(t.nodeName);
                },
                button: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return (
                    ("input" === e && "button" === t.type) || "button" === e
                  );
                },
                text: function (t) {
                  var e;
                  return (
                    "input" === t.nodeName.toLowerCase() &&
                    "text" === t.type &&
                    (null == (e = t.getAttribute("type")) ||
                      "text" === e.toLowerCase())
                  );
                },
                first: vt(function () {
                  return [0];
                }),
                last: vt(function (t, e) {
                  return [e - 1];
                }),
                eq: vt(function (t, e, n) {
                  return [n < 0 ? n + e : n];
                }),
                even: vt(function (t, e) {
                  for (var n = 0; n < e; n += 2) t.push(n);
                  return t;
                }),
                odd: vt(function (t, e) {
                  for (var n = 1; n < e; n += 2) t.push(n);
                  return t;
                }),
                lt: vt(function (t, e, n) {
                  for (var i = n < 0 ? n + e : n > e ? e : n; --i >= 0; )
                    t.push(i);
                  return t;
                }),
                gt: vt(function (t, e, n) {
                  for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
                  return t;
                }),
              },
            }).pseudos.nth = i.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              i.pseudos[e] = ft(e);
            for (e in { submit: !0, reset: !0 }) i.pseudos[e] = ht(e);
            function yt() {}
            function bt(t) {
              for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
              return i;
            }
            function _t(t, e, n) {
              var i = e.dir,
                r = e.next,
                o = r || i,
                s = n && "parentNode" === o,
                a = T++;
              return e.first
                ? function (e, n, r) {
                    for (; (e = e[i]); )
                      if (1 === e.nodeType || s) return t(e, n, r);
                    return !1;
                  }
                : function (e, n, l) {
                    var u,
                      c,
                      d,
                      p = [x, a];
                    if (l) {
                      for (; (e = e[i]); )
                        if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
                    } else
                      for (; (e = e[i]); )
                        if (1 === e.nodeType || s)
                          if (
                            ((c =
                              (d = e[_] || (e[_] = {}))[e.uniqueID] ||
                              (d[e.uniqueID] = {})),
                            r && r === e.nodeName.toLowerCase())
                          )
                            e = e[i] || e;
                          else {
                            if ((u = c[o]) && u[0] === x && u[1] === a)
                              return (p[2] = u[2]);
                            if (((c[o] = p), (p[2] = t(e, n, l)))) return !0;
                          }
                    return !1;
                  };
            }
            function wt(t) {
              return t.length > 1
                ? function (e, n, i) {
                    for (var r = t.length; r--; ) if (!t[r](e, n, i)) return !1;
                    return !0;
                  }
                : t[0];
            }
            function xt(t, e, n, i, r) {
              for (
                var o, s = [], a = 0, l = t.length, u = null != e;
                a < l;
                a++
              )
                (o = t[a]) &&
                  ((n && !n(o, i, r)) || (s.push(o), u && e.push(a)));
              return s;
            }
            function Tt(t, e, n, i, r, o) {
              return (
                i && !i[_] && (i = Tt(i)),
                r && !r[_] && (r = Tt(r, o)),
                ut(function (o, s, a, l) {
                  var u,
                    c,
                    d,
                    p = [],
                    f = [],
                    h = s.length,
                    g =
                      o ||
                      (function (t, e, n) {
                        for (var i = 0, r = e.length; i < r; i++)
                          at(t, e[i], n);
                        return n;
                      })(e || "*", a.nodeType ? [a] : a, []),
                    v = !t || (!o && e) ? g : xt(g, p, t, a, l),
                    m = n ? (r || (o ? t : h || i) ? [] : s) : v;
                  if ((n && n(v, m, a, l), i))
                    for (u = xt(m, f), i(u, [], a, l), c = u.length; c--; )
                      (d = u[c]) && (m[f[c]] = !(v[f[c]] = d));
                  if (o) {
                    if (r || t) {
                      if (r) {
                        for (u = [], c = m.length; c--; )
                          (d = m[c]) && u.push((v[c] = d));
                        r(null, (m = []), u, l);
                      }
                      for (c = m.length; c--; )
                        (d = m[c]) &&
                          (u = r ? L(o, d) : p[c]) > -1 &&
                          (o[u] = !(s[u] = d));
                    }
                  } else (m = xt(m === s ? m.splice(h, m.length) : m)), r ? r(null, s, m, l) : P.apply(s, m);
                })
              );
            }
            function kt(t) {
              for (
                var e,
                  n,
                  r,
                  o = t.length,
                  s = i.relative[t[0].type],
                  a = s || i.relative[" "],
                  l = s ? 1 : 0,
                  c = _t(
                    function (t) {
                      return t === e;
                    },
                    a,
                    !0
                  ),
                  d = _t(
                    function (t) {
                      return L(e, t) > -1;
                    },
                    a,
                    !0
                  ),
                  p = [
                    function (t, n, i) {
                      var r =
                        (!s && (i || n !== u)) ||
                        ((e = n).nodeType ? c(t, n, i) : d(t, n, i));
                      return (e = null), r;
                    },
                  ];
                l < o;
                l++
              )
                if ((n = i.relative[t[l].type])) p = [_t(wt(p), n)];
                else {
                  if ((n = i.filter[t[l].type].apply(null, t[l].matches))[_]) {
                    for (r = ++l; r < o && !i.relative[t[r].type]; r++);
                    return Tt(
                      l > 1 && wt(p),
                      l > 1 &&
                        bt(
                          t
                            .slice(0, l - 1)
                            .concat({ value: " " === t[l - 2].type ? "*" : "" })
                        ).replace(F, "$1"),
                      n,
                      l < r && kt(t.slice(l, r)),
                      r < o && kt((t = t.slice(r))),
                      r < o && bt(t)
                    );
                  }
                  p.push(n);
                }
              return wt(p);
            }
            return (
              (yt.prototype = i.filters = i.pseudos),
              (i.setFilters = new yt()),
              (s = at.tokenize = function (t, e) {
                var n,
                  r,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c = S[t + " "];
                if (c) return e ? 0 : c.slice(0);
                for (a = t, l = [], u = i.preFilter; a; ) {
                  for (s in ((n && !(r = B.exec(a))) ||
                    (r && (a = a.slice(r[0].length) || a), l.push((o = []))),
                  (n = !1),
                  (r = W.exec(a)) &&
                    ((n = r.shift()),
                    o.push({ value: n, type: r[0].replace(F, " ") }),
                    (a = a.slice(n.length))),
                  i.filter))
                    !(r = V[s].exec(a)) ||
                      (u[s] && !(r = u[s](r))) ||
                      ((n = r.shift()),
                      o.push({ value: n, type: s, matches: r }),
                      (a = a.slice(n.length)));
                  if (!n) break;
                }
                return e ? a.length : a ? at.error(t) : S(t, l).slice(0);
              }),
              (a = at.compile = function (t, e) {
                var n,
                  r = [],
                  o = [],
                  a = C[t + " "];
                if (!a) {
                  for (e || (e = s(t)), n = e.length; n--; )
                    (a = kt(e[n]))[_] ? r.push(a) : o.push(a);
                  (a = C(
                    t,
                    (function (t, e) {
                      var n = e.length > 0,
                        r = t.length > 0,
                        o = function (o, s, a, l, c) {
                          var d,
                            h,
                            v,
                            m = 0,
                            y = "0",
                            b = o && [],
                            _ = [],
                            w = u,
                            T = o || (r && i.find.TAG("*", c)),
                            k = (x += null == w ? 1 : Math.random() || 0.1),
                            S = T.length;
                          for (
                            c && (u = s == f || s || c);
                            y !== S && null != (d = T[y]);
                            y++
                          ) {
                            if (r && d) {
                              for (
                                h = 0,
                                  s || d.ownerDocument == f || (p(d), (a = !g));
                                (v = t[h++]);

                              )
                                if (v(d, s || f, a)) {
                                  l.push(d);
                                  break;
                                }
                              c && (x = k);
                            }
                            n && ((d = !v && d) && m--, o && b.push(d));
                          }
                          if (((m += y), n && y !== m)) {
                            for (h = 0; (v = e[h++]); ) v(b, _, s, a);
                            if (o) {
                              if (m > 0)
                                for (; y--; )
                                  b[y] || _[y] || (_[y] = M.call(l));
                              _ = xt(_);
                            }
                            P.apply(l, _),
                              c &&
                                !o &&
                                _.length > 0 &&
                                m + e.length > 1 &&
                                at.uniqueSort(l);
                          }
                          return c && ((x = k), (u = w)), b;
                        };
                      return n ? ut(o) : o;
                    })(o, r)
                  )).selector = t;
                }
                return a;
              }),
              (l = at.select = function (t, e, n, r) {
                var o,
                  l,
                  u,
                  c,
                  d,
                  p = "function" == typeof t && t,
                  f = !r && s((t = p.selector || t));
                if (((n = n || []), 1 === f.length)) {
                  if (
                    (l = f[0] = f[0].slice(0)).length > 2 &&
                    "ID" === (u = l[0]).type &&
                    9 === e.nodeType &&
                    g &&
                    i.relative[l[1].type]
                  ) {
                    if (
                      !(e = (i.find.ID(u.matches[0].replace(et, nt), e) ||
                        [])[0])
                    )
                      return n;
                    p && (e = e.parentNode),
                      (t = t.slice(l.shift().value.length));
                  }
                  for (
                    o = V.needsContext.test(t) ? 0 : l.length;
                    o-- && ((u = l[o]), !i.relative[(c = u.type)]);

                  )
                    if (
                      (d = i.find[c]) &&
                      (r = d(
                        u.matches[0].replace(et, nt),
                        (tt.test(l[0].type) && mt(e.parentNode)) || e
                      ))
                    ) {
                      if ((l.splice(o, 1), !(t = r.length && bt(l))))
                        return P.apply(n, r), n;
                      break;
                    }
                }
                return (
                  (p || a(t, f))(
                    r,
                    e,
                    !g,
                    n,
                    !e || (tt.test(t) && mt(e.parentNode)) || e
                  ),
                  n
                );
              }),
              (n.sortStable = _.split("").sort(O).join("") === _),
              (n.detectDuplicates = !!d),
              p(),
              (n.sortDetached = ct(function (t) {
                return (
                  1 & t.compareDocumentPosition(f.createElement("fieldset"))
                );
              })),
              ct(function (t) {
                return (
                  (t.innerHTML = "<a href='#'></a>"),
                  "#" === t.firstChild.getAttribute("href")
                );
              }) ||
                dt("type|href|height|width", function (t, e, n) {
                  if (!n)
                    return t.getAttribute(
                      e,
                      "type" === e.toLowerCase() ? 1 : 2
                    );
                }),
              (n.attributes &&
                ct(function (t) {
                  return (
                    (t.innerHTML = "<input/>"),
                    t.firstChild.setAttribute("value", ""),
                    "" === t.firstChild.getAttribute("value")
                  );
                })) ||
                dt("value", function (t, e, n) {
                  if (!n && "input" === t.nodeName.toLowerCase())
                    return t.defaultValue;
                }),
              ct(function (t) {
                return null == t.getAttribute("disabled");
              }) ||
                dt(N, function (t, e, n) {
                  var i;
                  if (!n)
                    return !0 === t[e]
                      ? e.toLowerCase()
                      : (i = t.getAttributeNode(e)) && i.specified
                      ? i.value
                      : null;
                }),
              at
            );
          })(n);
        (T.find = S),
          (T.expr = S.selectors),
          (T.expr[":"] = T.expr.pseudos),
          (T.uniqueSort = T.unique = S.uniqueSort),
          (T.text = S.getText),
          (T.isXMLDoc = S.isXML),
          (T.contains = S.contains),
          (T.escapeSelector = S.escape);
        var C = function (t, e, n) {
            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
              if (1 === t.nodeType) {
                if (r && T(t).is(n)) break;
                i.push(t);
              }
            return i;
          },
          A = function (t, e) {
            for (var n = []; t; t = t.nextSibling)
              1 === t.nodeType && t !== e && n.push(t);
            return n;
          },
          O = T.expr.match.needsContext;
        function E(t, e) {
          return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
        }
        var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function M(t, e, n) {
          return m(e)
            ? T.grep(t, function (t, i) {
                return !!e.call(t, i, t) !== n;
              })
            : e.nodeType
            ? T.grep(t, function (t) {
                return (t === e) !== n;
              })
            : "string" != typeof e
            ? T.grep(t, function (t) {
                return c.call(e, t) > -1 !== n;
              })
            : T.filter(e, t, n);
        }
        (T.filter = function (t, e, n) {
          var i = e[0];
          return (
            n && (t = ":not(" + t + ")"),
            1 === e.length && 1 === i.nodeType
              ? T.find.matchesSelector(i, t)
                ? [i]
                : []
              : T.find.matches(
                  t,
                  T.grep(e, function (t) {
                    return 1 === t.nodeType;
                  })
                )
          );
        }),
          T.fn.extend({
            find: function (t) {
              var e,
                n,
                i = this.length,
                r = this;
              if ("string" != typeof t)
                return this.pushStack(
                  T(t).filter(function () {
                    for (e = 0; e < i; e++)
                      if (T.contains(r[e], this)) return !0;
                  })
                );
              for (n = this.pushStack([]), e = 0; e < i; e++)
                T.find(t, r[e], n);
              return i > 1 ? T.uniqueSort(n) : n;
            },
            filter: function (t) {
              return this.pushStack(M(this, t || [], !1));
            },
            not: function (t) {
              return this.pushStack(M(this, t || [], !0));
            },
            is: function (t) {
              return !!M(
                this,
                "string" == typeof t && O.test(t) ? T(t) : t || [],
                !1
              ).length;
            },
          });
        var $,
          P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((T.fn.init = function (t, e, n) {
          var i, r;
          if (!t) return this;
          if (((n = n || $), "string" == typeof t)) {
            if (
              !(i =
                "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                  ? [null, t, null]
                  : P.exec(t)) ||
              (!i[1] && e)
            )
              return !e || e.jquery
                ? (e || n).find(t)
                : this.constructor(e).find(t);
            if (i[1]) {
              if (
                ((e = e instanceof T ? e[0] : e),
                T.merge(
                  this,
                  T.parseHTML(
                    i[1],
                    e && e.nodeType ? e.ownerDocument || e : b,
                    !0
                  )
                ),
                D.test(i[1]) && T.isPlainObject(e))
              )
                for (i in e) m(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
              return this;
            }
            return (
              (r = b.getElementById(i[2])) &&
                ((this[0] = r), (this.length = 1)),
              this
            );
          }
          return t.nodeType
            ? ((this[0] = t), (this.length = 1), this)
            : m(t)
            ? void 0 !== n.ready
              ? n.ready(t)
              : t(T)
            : T.makeArray(t, this);
        }).prototype = T.fn),
          ($ = T(b));
        var j = /^(?:parents|prev(?:Until|All))/,
          L = { children: !0, contents: !0, next: !0, prev: !0 };
        function N(t, e) {
          for (; (t = t[e]) && 1 !== t.nodeType; );
          return t;
        }
        T.fn.extend({
          has: function (t) {
            var e = T(t, this),
              n = e.length;
            return this.filter(function () {
              for (var t = 0; t < n; t++) if (T.contains(this, e[t])) return !0;
            });
          },
          closest: function (t, e) {
            var n,
              i = 0,
              r = this.length,
              o = [],
              s = "string" != typeof t && T(t);
            if (!O.test(t))
              for (; i < r; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                  if (
                    n.nodeType < 11 &&
                    (s
                      ? s.index(n) > -1
                      : 1 === n.nodeType && T.find.matchesSelector(n, t))
                  ) {
                    o.push(n);
                    break;
                  }
            return this.pushStack(o.length > 1 ? T.uniqueSort(o) : o);
          },
          index: function (t) {
            return t
              ? "string" == typeof t
                ? c.call(T(t), this[0])
                : c.call(this, t.jquery ? t[0] : t)
              : this[0] && this[0].parentNode
              ? this.first().prevAll().length
              : -1;
          },
          add: function (t, e) {
            return this.pushStack(T.uniqueSort(T.merge(this.get(), T(t, e))));
          },
          addBack: function (t) {
            return this.add(
              null == t ? this.prevObject : this.prevObject.filter(t)
            );
          },
        }),
          T.each(
            {
              parent: function (t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null;
              },
              parents: function (t) {
                return C(t, "parentNode");
              },
              parentsUntil: function (t, e, n) {
                return C(t, "parentNode", n);
              },
              next: function (t) {
                return N(t, "nextSibling");
              },
              prev: function (t) {
                return N(t, "previousSibling");
              },
              nextAll: function (t) {
                return C(t, "nextSibling");
              },
              prevAll: function (t) {
                return C(t, "previousSibling");
              },
              nextUntil: function (t, e, n) {
                return C(t, "nextSibling", n);
              },
              prevUntil: function (t, e, n) {
                return C(t, "previousSibling", n);
              },
              siblings: function (t) {
                return A((t.parentNode || {}).firstChild, t);
              },
              children: function (t) {
                return A(t.firstChild);
              },
              contents: function (t) {
                return null != t.contentDocument && s(t.contentDocument)
                  ? t.contentDocument
                  : (E(t, "template") && (t = t.content || t),
                    T.merge([], t.childNodes));
              },
            },
            function (t, e) {
              T.fn[t] = function (n, i) {
                var r = T.map(this, e, n);
                return (
                  "Until" !== t.slice(-5) && (i = n),
                  i && "string" == typeof i && (r = T.filter(i, r)),
                  this.length > 1 &&
                    (L[t] || T.uniqueSort(r), j.test(t) && r.reverse()),
                  this.pushStack(r)
                );
              };
            }
          );
        var R = /[^\x20\t\r\n\f]+/g;
        function H(t) {
          return t;
        }
        function z(t) {
          throw t;
        }
        function q(t, e, n, i) {
          var r;
          try {
            t && m((r = t.promise))
              ? r.call(t).done(e).fail(n)
              : t && m((r = t.then))
              ? r.call(t, e, n)
              : e.apply(void 0, [t].slice(i));
          } catch (t) {
            n.apply(void 0, [t]);
          }
        }
        (T.Callbacks = function (t) {
          t =
            "string" == typeof t
              ? (function (t) {
                  var e = {};
                  return (
                    T.each(t.match(R) || [], function (t, n) {
                      e[n] = !0;
                    }),
                    e
                  );
                })(t)
              : T.extend({}, t);
          var e,
            n,
            i,
            r,
            o = [],
            s = [],
            a = -1,
            l = function () {
              for (r = r || t.once, i = e = !0; s.length; a = -1)
                for (n = s.shift(); ++a < o.length; )
                  !1 === o[a].apply(n[0], n[1]) &&
                    t.stopOnFalse &&
                    ((a = o.length), (n = !1));
              t.memory || (n = !1), (e = !1), r && (o = n ? [] : "");
            },
            u = {
              add: function () {
                return (
                  o &&
                    (n && !e && ((a = o.length - 1), s.push(n)),
                    (function e(n) {
                      T.each(n, function (n, i) {
                        m(i)
                          ? (t.unique && u.has(i)) || o.push(i)
                          : i && i.length && "string" !== x(i) && e(i);
                      });
                    })(arguments),
                    n && !e && l()),
                  this
                );
              },
              remove: function () {
                return (
                  T.each(arguments, function (t, e) {
                    for (var n; (n = T.inArray(e, o, n)) > -1; )
                      o.splice(n, 1), n <= a && a--;
                  }),
                  this
                );
              },
              has: function (t) {
                return t ? T.inArray(t, o) > -1 : o.length > 0;
              },
              empty: function () {
                return o && (o = []), this;
              },
              disable: function () {
                return (r = s = []), (o = n = ""), this;
              },
              disabled: function () {
                return !o;
              },
              lock: function () {
                return (r = s = []), n || e || (o = n = ""), this;
              },
              locked: function () {
                return !!r;
              },
              fireWith: function (t, n) {
                return (
                  r ||
                    ((n = [t, (n = n || []).slice ? n.slice() : n]),
                    s.push(n),
                    e || l()),
                  this
                );
              },
              fire: function () {
                return u.fireWith(this, arguments), this;
              },
              fired: function () {
                return !!i;
              },
            };
          return u;
        }),
          T.extend({
            Deferred: function (t) {
              var e = [
                  [
                    "notify",
                    "progress",
                    T.Callbacks("memory"),
                    T.Callbacks("memory"),
                    2,
                  ],
                  [
                    "resolve",
                    "done",
                    T.Callbacks("once memory"),
                    T.Callbacks("once memory"),
                    0,
                    "resolved",
                  ],
                  [
                    "reject",
                    "fail",
                    T.Callbacks("once memory"),
                    T.Callbacks("once memory"),
                    1,
                    "rejected",
                  ],
                ],
                i = "pending",
                r = {
                  state: function () {
                    return i;
                  },
                  always: function () {
                    return o.done(arguments).fail(arguments), this;
                  },
                  catch: function (t) {
                    return r.then(null, t);
                  },
                  pipe: function () {
                    var t = arguments;
                    return T.Deferred(function (n) {
                      T.each(e, function (e, i) {
                        var r = m(t[i[4]]) && t[i[4]];
                        o[i[1]](function () {
                          var t = r && r.apply(this, arguments);
                          t && m(t.promise)
                            ? t
                                .promise()
                                .progress(n.notify)
                                .done(n.resolve)
                                .fail(n.reject)
                            : n[i[0] + "With"](this, r ? [t] : arguments);
                        });
                      }),
                        (t = null);
                    }).promise();
                  },
                  then: function (t, i, r) {
                    var o = 0;
                    function s(t, e, i, r) {
                      return function () {
                        var a = this,
                          l = arguments,
                          u = function () {
                            var n, u;
                            if (!(t < o)) {
                              if ((n = i.apply(a, l)) === e.promise())
                                throw new TypeError("Thenable self-resolution");
                              (u =
                                n &&
                                ("object" == typeof n ||
                                  "function" == typeof n) &&
                                n.then),
                                m(u)
                                  ? r
                                    ? u.call(n, s(o, e, H, r), s(o, e, z, r))
                                    : (o++,
                                      u.call(
                                        n,
                                        s(o, e, H, r),
                                        s(o, e, z, r),
                                        s(o, e, H, e.notifyWith)
                                      ))
                                  : (i !== H && ((a = void 0), (l = [n])),
                                    (r || e.resolveWith)(a, l));
                            }
                          },
                          c = r
                            ? u
                            : function () {
                                try {
                                  u();
                                } catch (n) {
                                  T.Deferred.exceptionHook &&
                                    T.Deferred.exceptionHook(n, c.stackTrace),
                                    t + 1 >= o &&
                                      (i !== z && ((a = void 0), (l = [n])),
                                      e.rejectWith(a, l));
                                }
                              };
                        t
                          ? c()
                          : (T.Deferred.getStackHook &&
                              (c.stackTrace = T.Deferred.getStackHook()),
                            n.setTimeout(c));
                      };
                    }
                    return T.Deferred(function (n) {
                      e[0][3].add(s(0, n, m(r) ? r : H, n.notifyWith)),
                        e[1][3].add(s(0, n, m(t) ? t : H)),
                        e[2][3].add(s(0, n, m(i) ? i : z));
                    }).promise();
                  },
                  promise: function (t) {
                    return null != t ? T.extend(t, r) : r;
                  },
                },
                o = {};
              return (
                T.each(e, function (t, n) {
                  var s = n[2],
                    a = n[5];
                  (r[n[1]] = s.add),
                    a &&
                      s.add(
                        function () {
                          i = a;
                        },
                        e[3 - t][2].disable,
                        e[3 - t][3].disable,
                        e[0][2].lock,
                        e[0][3].lock
                      ),
                    s.add(n[3].fire),
                    (o[n[0]] = function () {
                      return (
                        o[n[0] + "With"](this === o ? void 0 : this, arguments),
                        this
                      );
                    }),
                    (o[n[0] + "With"] = s.fireWith);
                }),
                r.promise(o),
                t && t.call(o, o),
                o
              );
            },
            when: function (t) {
              var e = arguments.length,
                n = e,
                i = Array(n),
                r = a.call(arguments),
                o = T.Deferred(),
                s = function (t) {
                  return function (n) {
                    (i[t] = this),
                      (r[t] = arguments.length > 1 ? a.call(arguments) : n),
                      --e || o.resolveWith(i, r);
                  };
                };
              if (
                e <= 1 &&
                (q(t, o.done(s(n)).resolve, o.reject, !e),
                "pending" === o.state() || m(r[n] && r[n].then))
              )
                return o.then();
              for (; n--; ) q(r[n], s(n), o.reject);
              return o.promise();
            },
          });
        var I = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (T.Deferred.exceptionHook = function (t, e) {
          n.console &&
            n.console.warn &&
            t &&
            I.test(t.name) &&
            n.console.warn(
              "jQuery.Deferred exception: " + t.message,
              t.stack,
              e
            );
        }),
          (T.readyException = function (t) {
            n.setTimeout(function () {
              throw t;
            });
          });
        var F = T.Deferred();
        function B() {
          b.removeEventListener("DOMContentLoaded", B),
            n.removeEventListener("load", B),
            T.ready();
        }
        (T.fn.ready = function (t) {
          return (
            F.then(t).catch(function (t) {
              T.readyException(t);
            }),
            this
          );
        }),
          T.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (t) {
              (!0 === t ? --T.readyWait : T.isReady) ||
                ((T.isReady = !0),
                (!0 !== t && --T.readyWait > 0) || F.resolveWith(b, [T]));
            },
          }),
          (T.ready.then = F.then),
          "complete" === b.readyState ||
          ("loading" !== b.readyState && !b.documentElement.doScroll)
            ? n.setTimeout(T.ready)
            : (b.addEventListener("DOMContentLoaded", B),
              n.addEventListener("load", B));
        var W = function (t, e, n, i, r, o, s) {
            var a = 0,
              l = t.length,
              u = null == n;
            if ("object" === x(n))
              for (a in ((r = !0), n)) W(t, e, a, n[a], !0, o, s);
            else if (
              void 0 !== i &&
              ((r = !0),
              m(i) || (s = !0),
              u &&
                (s
                  ? (e.call(t, i), (e = null))
                  : ((u = e),
                    (e = function (t, e, n) {
                      return u.call(T(t), n);
                    }))),
              e)
            )
              for (; a < l; a++)
                e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
            return r ? t : u ? e.call(t) : l ? e(t[0], n) : o;
          },
          X = /^-ms-/,
          Y = /-([a-z])/g;
        function U(t, e) {
          return e.toUpperCase();
        }
        function V(t) {
          return t.replace(X, "ms-").replace(Y, U);
        }
        var G = function (t) {
          return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
        };
        function Q() {
          this.expando = T.expando + Q.uid++;
        }
        (Q.uid = 1),
          (Q.prototype = {
            cache: function (t) {
              var e = t[this.expando];
              return (
                e ||
                  ((e = {}),
                  G(t) &&
                    (t.nodeType
                      ? (t[this.expando] = e)
                      : Object.defineProperty(t, this.expando, {
                          value: e,
                          configurable: !0,
                        }))),
                e
              );
            },
            set: function (t, e, n) {
              var i,
                r = this.cache(t);
              if ("string" == typeof e) r[V(e)] = n;
              else for (i in e) r[V(i)] = e[i];
              return r;
            },
            get: function (t, e) {
              return void 0 === e
                ? this.cache(t)
                : t[this.expando] && t[this.expando][V(e)];
            },
            access: function (t, e, n) {
              return void 0 === e || (e && "string" == typeof e && void 0 === n)
                ? this.get(t, e)
                : (this.set(t, e, n), void 0 !== n ? n : e);
            },
            remove: function (t, e) {
              var n,
                i = t[this.expando];
              if (void 0 !== i) {
                if (void 0 !== e) {
                  n = (e = Array.isArray(e)
                    ? e.map(V)
                    : (e = V(e)) in i
                    ? [e]
                    : e.match(R) || []).length;
                  for (; n--; ) delete i[e[n]];
                }
                (void 0 === e || T.isEmptyObject(i)) &&
                  (t.nodeType
                    ? (t[this.expando] = void 0)
                    : delete t[this.expando]);
              }
            },
            hasData: function (t) {
              var e = t[this.expando];
              return void 0 !== e && !T.isEmptyObject(e);
            },
          });
        var J = new Q(),
          K = new Q(),
          Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
          tt = /[A-Z]/g;
        function et(t, e, n) {
          var i;
          if (void 0 === n && 1 === t.nodeType)
            if (
              ((i = "data-" + e.replace(tt, "-$&").toLowerCase()),
              "string" == typeof (n = t.getAttribute(i)))
            ) {
              try {
                n = (function (t) {
                  return (
                    "true" === t ||
                    ("false" !== t &&
                      ("null" === t
                        ? null
                        : t === +t + ""
                        ? +t
                        : Z.test(t)
                        ? JSON.parse(t)
                        : t))
                  );
                })(n);
              } catch (t) {}
              K.set(t, e, n);
            } else n = void 0;
          return n;
        }
        T.extend({
          hasData: function (t) {
            return K.hasData(t) || J.hasData(t);
          },
          data: function (t, e, n) {
            return K.access(t, e, n);
          },
          removeData: function (t, e) {
            K.remove(t, e);
          },
          _data: function (t, e, n) {
            return J.access(t, e, n);
          },
          _removeData: function (t, e) {
            J.remove(t, e);
          },
        }),
          T.fn.extend({
            data: function (t, e) {
              var n,
                i,
                r,
                o = this[0],
                s = o && o.attributes;
              if (void 0 === t) {
                if (
                  this.length &&
                  ((r = K.get(o)),
                  1 === o.nodeType && !J.get(o, "hasDataAttrs"))
                ) {
                  for (n = s.length; n--; )
                    s[n] &&
                      0 === (i = s[n].name).indexOf("data-") &&
                      ((i = V(i.slice(5))), et(o, i, r[i]));
                  J.set(o, "hasDataAttrs", !0);
                }
                return r;
              }
              return "object" == typeof t
                ? this.each(function () {
                    K.set(this, t);
                  })
                : W(
                    this,
                    function (e) {
                      var n;
                      if (o && void 0 === e)
                        return void 0 !== (n = K.get(o, t)) ||
                          void 0 !== (n = et(o, t))
                          ? n
                          : void 0;
                      this.each(function () {
                        K.set(this, t, e);
                      });
                    },
                    null,
                    e,
                    arguments.length > 1,
                    null,
                    !0
                  );
            },
            removeData: function (t) {
              return this.each(function () {
                K.remove(this, t);
              });
            },
          }),
          T.extend({
            queue: function (t, e, n) {
              var i;
              if (t)
                return (
                  (e = (e || "fx") + "queue"),
                  (i = J.get(t, e)),
                  n &&
                    (!i || Array.isArray(n)
                      ? (i = J.access(t, e, T.makeArray(n)))
                      : i.push(n)),
                  i || []
                );
            },
            dequeue: function (t, e) {
              e = e || "fx";
              var n = T.queue(t, e),
                i = n.length,
                r = n.shift(),
                o = T._queueHooks(t, e);
              "inprogress" === r && ((r = n.shift()), i--),
                r &&
                  ("fx" === e && n.unshift("inprogress"),
                  delete o.stop,
                  r.call(
                    t,
                    function () {
                      T.dequeue(t, e);
                    },
                    o
                  )),
                !i && o && o.empty.fire();
            },
            _queueHooks: function (t, e) {
              var n = e + "queueHooks";
              return (
                J.get(t, n) ||
                J.access(t, n, {
                  empty: T.Callbacks("once memory").add(function () {
                    J.remove(t, [e + "queue", n]);
                  }),
                })
              );
            },
          }),
          T.fn.extend({
            queue: function (t, e) {
              var n = 2;
              return (
                "string" != typeof t && ((e = t), (t = "fx"), n--),
                arguments.length < n
                  ? T.queue(this[0], t)
                  : void 0 === e
                  ? this
                  : this.each(function () {
                      var n = T.queue(this, t, e);
                      T._queueHooks(this, t),
                        "fx" === t &&
                          "inprogress" !== n[0] &&
                          T.dequeue(this, t);
                    })
              );
            },
            dequeue: function (t) {
              return this.each(function () {
                T.dequeue(this, t);
              });
            },
            clearQueue: function (t) {
              return this.queue(t || "fx", []);
            },
            promise: function (t, e) {
              var n,
                i = 1,
                r = T.Deferred(),
                o = this,
                s = this.length,
                a = function () {
                  --i || r.resolveWith(o, [o]);
                };
              for (
                "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
                s--;

              )
                (n = J.get(o[s], t + "queueHooks")) &&
                  n.empty &&
                  (i++, n.empty.add(a));
              return a(), r.promise(e);
            },
          });
        var nt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
          it = new RegExp("^(?:([+-])=|)(" + nt + ")([a-z%]*)$", "i"),
          rt = ["Top", "Right", "Bottom", "Left"],
          ot = b.documentElement,
          st = function (t) {
            return T.contains(t.ownerDocument, t);
          },
          at = { composed: !0 };
        ot.getRootNode &&
          (st = function (t) {
            return (
              T.contains(t.ownerDocument, t) ||
              t.getRootNode(at) === t.ownerDocument
            );
          });
        var lt = function (t, e) {
          return (
            "none" === (t = e || t).style.display ||
            ("" === t.style.display && st(t) && "none" === T.css(t, "display"))
          );
        };
        function ut(t, e, n, i) {
          var r,
            o,
            s = 20,
            a = i
              ? function () {
                  return i.cur();
                }
              : function () {
                  return T.css(t, e, "");
                },
            l = a(),
            u = (n && n[3]) || (T.cssNumber[e] ? "" : "px"),
            c =
              t.nodeType &&
              (T.cssNumber[e] || ("px" !== u && +l)) &&
              it.exec(T.css(t, e));
          if (c && c[3] !== u) {
            for (l /= 2, u = u || c[3], c = +l || 1; s--; )
              T.style(t, e, c + u),
                (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
                (c /= o);
            (c *= 2), T.style(t, e, c + u), (n = n || []);
          }
          return (
            n &&
              ((c = +c || +l || 0),
              (r = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
              i && ((i.unit = u), (i.start = c), (i.end = r))),
            r
          );
        }
        var ct = {};
        function dt(t) {
          var e,
            n = t.ownerDocument,
            i = t.nodeName,
            r = ct[i];
          return (
            r ||
            ((e = n.body.appendChild(n.createElement(i))),
            (r = T.css(e, "display")),
            e.parentNode.removeChild(e),
            "none" === r && (r = "block"),
            (ct[i] = r),
            r)
          );
        }
        function pt(t, e) {
          for (var n, i, r = [], o = 0, s = t.length; o < s; o++)
            (i = t[o]).style &&
              ((n = i.style.display),
              e
                ? ("none" === n &&
                    ((r[o] = J.get(i, "display") || null),
                    r[o] || (i.style.display = "")),
                  "" === i.style.display && lt(i) && (r[o] = dt(i)))
                : "none" !== n && ((r[o] = "none"), J.set(i, "display", n)));
          for (o = 0; o < s; o++) null != r[o] && (t[o].style.display = r[o]);
          return t;
        }
        T.fn.extend({
          show: function () {
            return pt(this, !0);
          },
          hide: function () {
            return pt(this);
          },
          toggle: function (t) {
            return "boolean" == typeof t
              ? t
                ? this.show()
                : this.hide()
              : this.each(function () {
                  lt(this) ? T(this).show() : T(this).hide();
                });
          },
        });
        var ft,
          ht,
          gt = /^(?:checkbox|radio)$/i,
          vt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
          mt = /^$|^module$|\/(?:java|ecma)script/i;
        (ft = b.createDocumentFragment().appendChild(b.createElement("div"))),
          (ht = b.createElement("input")).setAttribute("type", "radio"),
          ht.setAttribute("checked", "checked"),
          ht.setAttribute("name", "t"),
          ft.appendChild(ht),
          (v.checkClone = ft.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (ft.innerHTML = "<textarea>x</textarea>"),
          (v.noCloneChecked = !!ft.cloneNode(!0).lastChild.defaultValue),
          (ft.innerHTML = "<option></option>"),
          (v.option = !!ft.lastChild);
        var yt = {
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""],
        };
        function bt(t, e) {
          var n;
          return (
            (n =
              void 0 !== t.getElementsByTagName
                ? t.getElementsByTagName(e || "*")
                : void 0 !== t.querySelectorAll
                ? t.querySelectorAll(e || "*")
                : []),
            void 0 === e || (e && E(t, e)) ? T.merge([t], n) : n
          );
        }
        function _t(t, e) {
          for (var n = 0, i = t.length; n < i; n++)
            J.set(t[n], "globalEval", !e || J.get(e[n], "globalEval"));
        }
        (yt.tbody = yt.tfoot = yt.colgroup = yt.caption = yt.thead),
          (yt.th = yt.td),
          v.option ||
            (yt.optgroup = yt.option = [
              1,
              "<select multiple='multiple'>",
              "</select>",
            ]);
        var wt = /<|&#?\w+;/;
        function xt(t, e, n, i, r) {
          for (
            var o,
              s,
              a,
              l,
              u,
              c,
              d = e.createDocumentFragment(),
              p = [],
              f = 0,
              h = t.length;
            f < h;
            f++
          )
            if ((o = t[f]) || 0 === o)
              if ("object" === x(o)) T.merge(p, o.nodeType ? [o] : o);
              else if (wt.test(o)) {
                for (
                  s = s || d.appendChild(e.createElement("div")),
                    a = (vt.exec(o) || ["", ""])[1].toLowerCase(),
                    l = yt[a] || yt._default,
                    s.innerHTML = l[1] + T.htmlPrefilter(o) + l[2],
                    c = l[0];
                  c--;

                )
                  s = s.lastChild;
                T.merge(p, s.childNodes), ((s = d.firstChild).textContent = "");
              } else p.push(e.createTextNode(o));
          for (d.textContent = "", f = 0; (o = p[f++]); )
            if (i && T.inArray(o, i) > -1) r && r.push(o);
            else if (
              ((u = st(o)), (s = bt(d.appendChild(o), "script")), u && _t(s), n)
            )
              for (c = 0; (o = s[c++]); ) mt.test(o.type || "") && n.push(o);
          return d;
        }
        var Tt = /^([^.]*)(?:\.(.+)|)/;
        function kt() {
          return !0;
        }
        function St() {
          return !1;
        }
        function Ct(t, e) {
          return (
            (t ===
              (function () {
                try {
                  return b.activeElement;
                } catch (t) {}
              })()) ==
            ("focus" === e)
          );
        }
        function At(t, e, n, i, r, o) {
          var s, a;
          if ("object" == typeof e) {
            for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), e))
              At(t, a, n, i, e[a], o);
            return t;
          }
          if (
            (null == i && null == r
              ? ((r = n), (i = n = void 0))
              : null == r &&
                ("string" == typeof n
                  ? ((r = i), (i = void 0))
                  : ((r = i), (i = n), (n = void 0))),
            !1 === r)
          )
            r = St;
          else if (!r) return t;
          return (
            1 === o &&
              ((s = r),
              ((r = function (t) {
                return T().off(t), s.apply(this, arguments);
              }).guid = s.guid || (s.guid = T.guid++))),
            t.each(function () {
              T.event.add(this, e, r, i, n);
            })
          );
        }
        function Ot(t, e, n) {
          n
            ? (J.set(t, e, !1),
              T.event.add(t, e, {
                namespace: !1,
                handler: function (t) {
                  var i,
                    r,
                    o = J.get(this, e);
                  if (1 & t.isTrigger && this[e]) {
                    if (o.length)
                      (T.event.special[e] || {}).delegateType &&
                        t.stopPropagation();
                    else if (
                      ((o = a.call(arguments)),
                      J.set(this, e, o),
                      (i = n(this, e)),
                      this[e](),
                      o !== (r = J.get(this, e)) || i
                        ? J.set(this, e, !1)
                        : (r = {}),
                      o !== r)
                    )
                      return (
                        t.stopImmediatePropagation(),
                        t.preventDefault(),
                        r && r.value
                      );
                  } else
                    o.length &&
                      (J.set(this, e, {
                        value: T.event.trigger(
                          T.extend(o[0], T.Event.prototype),
                          o.slice(1),
                          this
                        ),
                      }),
                      t.stopImmediatePropagation());
                },
              }))
            : void 0 === J.get(t, e) && T.event.add(t, e, kt);
        }
        (T.event = {
          global: {},
          add: function (t, e, n, i, r) {
            var o,
              s,
              a,
              l,
              u,
              c,
              d,
              p,
              f,
              h,
              g,
              v = J.get(t);
            if (G(t))
              for (
                n.handler && ((n = (o = n).handler), (r = o.selector)),
                  r && T.find.matchesSelector(ot, r),
                  n.guid || (n.guid = T.guid++),
                  (l = v.events) || (l = v.events = Object.create(null)),
                  (s = v.handle) ||
                    (s = v.handle = function (e) {
                      return void 0 !== T && T.event.triggered !== e.type
                        ? T.event.dispatch.apply(t, arguments)
                        : void 0;
                    }),
                  u = (e = (e || "").match(R) || [""]).length;
                u--;

              )
                (f = g = (a = Tt.exec(e[u]) || [])[1]),
                  (h = (a[2] || "").split(".").sort()),
                  f &&
                    ((d = T.event.special[f] || {}),
                    (f = (r ? d.delegateType : d.bindType) || f),
                    (d = T.event.special[f] || {}),
                    (c = T.extend(
                      {
                        type: f,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && T.expr.match.needsContext.test(r),
                        namespace: h.join("."),
                      },
                      o
                    )),
                    (p = l[f]) ||
                      (((p = l[f] = []).delegateCount = 0),
                      (d.setup && !1 !== d.setup.call(t, i, h, s)) ||
                        (t.addEventListener && t.addEventListener(f, s))),
                    d.add &&
                      (d.add.call(t, c),
                      c.handler.guid || (c.handler.guid = n.guid)),
                    r ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    (T.event.global[f] = !0));
          },
          remove: function (t, e, n, i, r) {
            var o,
              s,
              a,
              l,
              u,
              c,
              d,
              p,
              f,
              h,
              g,
              v = J.hasData(t) && J.get(t);
            if (v && (l = v.events)) {
              for (u = (e = (e || "").match(R) || [""]).length; u--; )
                if (
                  ((f = g = (a = Tt.exec(e[u]) || [])[1]),
                  (h = (a[2] || "").split(".").sort()),
                  f)
                ) {
                  for (
                    d = T.event.special[f] || {},
                      p = l[(f = (i ? d.delegateType : d.bindType) || f)] || [],
                      a =
                        a[2] &&
                        new RegExp(
                          "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                        ),
                      s = o = p.length;
                    o--;

                  )
                    (c = p[o]),
                      (!r && g !== c.origType) ||
                        (n && n.guid !== c.guid) ||
                        (a && !a.test(c.namespace)) ||
                        (i &&
                          i !== c.selector &&
                          ("**" !== i || !c.selector)) ||
                        (p.splice(o, 1),
                        c.selector && p.delegateCount--,
                        d.remove && d.remove.call(t, c));
                  s &&
                    !p.length &&
                    ((d.teardown && !1 !== d.teardown.call(t, h, v.handle)) ||
                      T.removeEvent(t, f, v.handle),
                    delete l[f]);
                } else for (f in l) T.event.remove(t, f + e[u], n, i, !0);
              T.isEmptyObject(l) && J.remove(t, "handle events");
            }
          },
          dispatch: function (t) {
            var e,
              n,
              i,
              r,
              o,
              s,
              a = new Array(arguments.length),
              l = T.event.fix(t),
              u = (J.get(this, "events") || Object.create(null))[l.type] || [],
              c = T.event.special[l.type] || {};
            for (a[0] = l, e = 1; e < arguments.length; e++)
              a[e] = arguments[e];
            if (
              ((l.delegateTarget = this),
              !c.preDispatch || !1 !== c.preDispatch.call(this, l))
            ) {
              for (
                s = T.event.handlers.call(this, l, u), e = 0;
                (r = s[e++]) && !l.isPropagationStopped();

              )
                for (
                  l.currentTarget = r.elem, n = 0;
                  (o = r.handlers[n++]) && !l.isImmediatePropagationStopped();

                )
                  (l.rnamespace &&
                    !1 !== o.namespace &&
                    !l.rnamespace.test(o.namespace)) ||
                    ((l.handleObj = o),
                    (l.data = o.data),
                    void 0 !==
                      (i = (
                        (T.event.special[o.origType] || {}).handle || o.handler
                      ).apply(r.elem, a)) &&
                      !1 === (l.result = i) &&
                      (l.preventDefault(), l.stopPropagation()));
              return c.postDispatch && c.postDispatch.call(this, l), l.result;
            }
          },
          handlers: function (t, e) {
            var n,
              i,
              r,
              o,
              s,
              a = [],
              l = e.delegateCount,
              u = t.target;
            if (l && u.nodeType && !("click" === t.type && t.button >= 1))
              for (; u !== this; u = u.parentNode || this)
                if (
                  1 === u.nodeType &&
                  ("click" !== t.type || !0 !== u.disabled)
                ) {
                  for (o = [], s = {}, n = 0; n < l; n++)
                    void 0 === s[(r = (i = e[n]).selector + " ")] &&
                      (s[r] = i.needsContext
                        ? T(r, this).index(u) > -1
                        : T.find(r, this, null, [u]).length),
                      s[r] && o.push(i);
                  o.length && a.push({ elem: u, handlers: o });
                }
            return (
              (u = this),
              l < e.length && a.push({ elem: u, handlers: e.slice(l) }),
              a
            );
          },
          addProp: function (t, e) {
            Object.defineProperty(T.Event.prototype, t, {
              enumerable: !0,
              configurable: !0,
              get: m(e)
                ? function () {
                    if (this.originalEvent) return e(this.originalEvent);
                  }
                : function () {
                    if (this.originalEvent) return this.originalEvent[t];
                  },
              set: function (e) {
                Object.defineProperty(this, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: e,
                });
              },
            });
          },
          fix: function (t) {
            return t[T.expando] ? t : new T.Event(t);
          },
          special: {
            load: { noBubble: !0 },
            click: {
              setup: function (t) {
                var e = this || t;
                return (
                  gt.test(e.type) &&
                    e.click &&
                    E(e, "input") &&
                    Ot(e, "click", kt),
                  !1
                );
              },
              trigger: function (t) {
                var e = this || t;
                return (
                  gt.test(e.type) && e.click && E(e, "input") && Ot(e, "click"),
                  !0
                );
              },
              _default: function (t) {
                var e = t.target;
                return (
                  (gt.test(e.type) &&
                    e.click &&
                    E(e, "input") &&
                    J.get(e, "click")) ||
                  E(e, "a")
                );
              },
            },
            beforeunload: {
              postDispatch: function (t) {
                void 0 !== t.result &&
                  t.originalEvent &&
                  (t.originalEvent.returnValue = t.result);
              },
            },
          },
        }),
          (T.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n);
          }),
          (T.Event = function (t, e) {
            if (!(this instanceof T.Event)) return new T.Event(t, e);
            t && t.type
              ? ((this.originalEvent = t),
                (this.type = t.type),
                (this.isDefaultPrevented =
                  t.defaultPrevented ||
                  (void 0 === t.defaultPrevented && !1 === t.returnValue)
                    ? kt
                    : St),
                (this.target =
                  t.target && 3 === t.target.nodeType
                    ? t.target.parentNode
                    : t.target),
                (this.currentTarget = t.currentTarget),
                (this.relatedTarget = t.relatedTarget))
              : (this.type = t),
              e && T.extend(this, e),
              (this.timeStamp = (t && t.timeStamp) || Date.now()),
              (this[T.expando] = !0);
          }),
          (T.Event.prototype = {
            constructor: T.Event,
            isDefaultPrevented: St,
            isPropagationStopped: St,
            isImmediatePropagationStopped: St,
            isSimulated: !1,
            preventDefault: function () {
              var t = this.originalEvent;
              (this.isDefaultPrevented = kt),
                t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation: function () {
              var t = this.originalEvent;
              (this.isPropagationStopped = kt),
                t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation: function () {
              var t = this.originalEvent;
              (this.isImmediatePropagationStopped = kt),
                t && !this.isSimulated && t.stopImmediatePropagation(),
                this.stopPropagation();
            },
          }),
          T.each(
            {
              altKey: !0,
              bubbles: !0,
              cancelable: !0,
              changedTouches: !0,
              ctrlKey: !0,
              detail: !0,
              eventPhase: !0,
              metaKey: !0,
              pageX: !0,
              pageY: !0,
              shiftKey: !0,
              view: !0,
              char: !0,
              code: !0,
              charCode: !0,
              key: !0,
              keyCode: !0,
              button: !0,
              buttons: !0,
              clientX: !0,
              clientY: !0,
              offsetX: !0,
              offsetY: !0,
              pointerId: !0,
              pointerType: !0,
              screenX: !0,
              screenY: !0,
              targetTouches: !0,
              toElement: !0,
              touches: !0,
              which: !0,
            },
            T.event.addProp
          ),
          T.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
            T.event.special[t] = {
              setup: function () {
                return Ot(this, t, Ct), !1;
              },
              trigger: function () {
                return Ot(this, t), !0;
              },
              _default: function () {
                return !0;
              },
              delegateType: e,
            };
          }),
          T.each(
            {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              pointerenter: "pointerover",
              pointerleave: "pointerout",
            },
            function (t, e) {
              T.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function (t) {
                  var n,
                    i = this,
                    r = t.relatedTarget,
                    o = t.handleObj;
                  return (
                    (r && (r === i || T.contains(i, r))) ||
                      ((t.type = o.origType),
                      (n = o.handler.apply(this, arguments)),
                      (t.type = e)),
                    n
                  );
                },
              };
            }
          ),
          T.fn.extend({
            on: function (t, e, n, i) {
              return At(this, t, e, n, i);
            },
            one: function (t, e, n, i) {
              return At(this, t, e, n, i, 1);
            },
            off: function (t, e, n) {
              var i, r;
              if (t && t.preventDefault && t.handleObj)
                return (
                  (i = t.handleObj),
                  T(t.delegateTarget).off(
                    i.namespace ? i.origType + "." + i.namespace : i.origType,
                    i.selector,
                    i.handler
                  ),
                  this
                );
              if ("object" == typeof t) {
                for (r in t) this.off(r, e, t[r]);
                return this;
              }
              return (
                (!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
                !1 === n && (n = St),
                this.each(function () {
                  T.event.remove(this, t, n, e);
                })
              );
            },
          });
        var Et = /<script|<style|<link/i,
          Dt = /checked\s*(?:[^=]|=\s*.checked.)/i,
          Mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function $t(t, e) {
          return (
            (E(t, "table") &&
              E(11 !== e.nodeType ? e : e.firstChild, "tr") &&
              T(t).children("tbody")[0]) ||
            t
          );
        }
        function Pt(t) {
          return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
        }
        function jt(t) {
          return (
            "true/" === (t.type || "").slice(0, 5)
              ? (t.type = t.type.slice(5))
              : t.removeAttribute("type"),
            t
          );
        }
        function Lt(t, e) {
          var n, i, r, o, s, a;
          if (1 === e.nodeType) {
            if (J.hasData(t) && (a = J.get(t).events))
              for (r in (J.remove(e, "handle events"), a))
                for (n = 0, i = a[r].length; n < i; n++)
                  T.event.add(e, r, a[r][n]);
            K.hasData(t) &&
              ((o = K.access(t)), (s = T.extend({}, o)), K.set(e, s));
          }
        }
        function Nt(t, e) {
          var n = e.nodeName.toLowerCase();
          "input" === n && gt.test(t.type)
            ? (e.checked = t.checked)
            : ("input" !== n && "textarea" !== n) ||
              (e.defaultValue = t.defaultValue);
        }
        function Rt(t, e, n, i) {
          e = l(e);
          var r,
            o,
            s,
            a,
            u,
            c,
            d = 0,
            p = t.length,
            f = p - 1,
            h = e[0],
            g = m(h);
          if (
            g ||
            (p > 1 && "string" == typeof h && !v.checkClone && Dt.test(h))
          )
            return t.each(function (r) {
              var o = t.eq(r);
              g && (e[0] = h.call(this, r, o.html())), Rt(o, e, n, i);
            });
          if (
            p &&
            ((o = (r = xt(e, t[0].ownerDocument, !1, t, i)).firstChild),
            1 === r.childNodes.length && (r = o),
            o || i)
          ) {
            for (a = (s = T.map(bt(r, "script"), Pt)).length; d < p; d++)
              (u = r),
                d !== f &&
                  ((u = T.clone(u, !0, !0)), a && T.merge(s, bt(u, "script"))),
                n.call(t[d], u, d);
            if (a)
              for (
                c = s[s.length - 1].ownerDocument, T.map(s, jt), d = 0;
                d < a;
                d++
              )
                (u = s[d]),
                  mt.test(u.type || "") &&
                    !J.access(u, "globalEval") &&
                    T.contains(c, u) &&
                    (u.src && "module" !== (u.type || "").toLowerCase()
                      ? T._evalUrl &&
                        !u.noModule &&
                        T._evalUrl(
                          u.src,
                          { nonce: u.nonce || u.getAttribute("nonce") },
                          c
                        )
                      : w(u.textContent.replace(Mt, ""), u, c));
          }
          return t;
        }
        function Ht(t, e, n) {
          for (
            var i, r = e ? T.filter(e, t) : t, o = 0;
            null != (i = r[o]);
            o++
          )
            n || 1 !== i.nodeType || T.cleanData(bt(i)),
              i.parentNode &&
                (n && st(i) && _t(bt(i, "script")),
                i.parentNode.removeChild(i));
          return t;
        }
        T.extend({
          htmlPrefilter: function (t) {
            return t;
          },
          clone: function (t, e, n) {
            var i,
              r,
              o,
              s,
              a = t.cloneNode(!0),
              l = st(t);
            if (
              !(
                v.noCloneChecked ||
                (1 !== t.nodeType && 11 !== t.nodeType) ||
                T.isXMLDoc(t)
              )
            )
              for (s = bt(a), i = 0, r = (o = bt(t)).length; i < r; i++)
                Nt(o[i], s[i]);
            if (e)
              if (n)
                for (
                  o = o || bt(t), s = s || bt(a), i = 0, r = o.length;
                  i < r;
                  i++
                )
                  Lt(o[i], s[i]);
              else Lt(t, a);
            return (
              (s = bt(a, "script")).length > 0 && _t(s, !l && bt(t, "script")),
              a
            );
          },
          cleanData: function (t) {
            for (
              var e, n, i, r = T.event.special, o = 0;
              void 0 !== (n = t[o]);
              o++
            )
              if (G(n)) {
                if ((e = n[J.expando])) {
                  if (e.events)
                    for (i in e.events)
                      r[i]
                        ? T.event.remove(n, i)
                        : T.removeEvent(n, i, e.handle);
                  n[J.expando] = void 0;
                }
                n[K.expando] && (n[K.expando] = void 0);
              }
          },
        }),
          T.fn.extend({
            detach: function (t) {
              return Ht(this, t, !0);
            },
            remove: function (t) {
              return Ht(this, t);
            },
            text: function (t) {
              return W(
                this,
                function (t) {
                  return void 0 === t
                    ? T.text(this)
                    : this.empty().each(function () {
                        (1 !== this.nodeType &&
                          11 !== this.nodeType &&
                          9 !== this.nodeType) ||
                          (this.textContent = t);
                      });
                },
                null,
                t,
                arguments.length
              );
            },
            append: function () {
              return Rt(this, arguments, function (t) {
                (1 !== this.nodeType &&
                  11 !== this.nodeType &&
                  9 !== this.nodeType) ||
                  $t(this, t).appendChild(t);
              });
            },
            prepend: function () {
              return Rt(this, arguments, function (t) {
                if (
                  1 === this.nodeType ||
                  11 === this.nodeType ||
                  9 === this.nodeType
                ) {
                  var e = $t(this, t);
                  e.insertBefore(t, e.firstChild);
                }
              });
            },
            before: function () {
              return Rt(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this);
              });
            },
            after: function () {
              return Rt(this, arguments, function (t) {
                this.parentNode &&
                  this.parentNode.insertBefore(t, this.nextSibling);
              });
            },
            empty: function () {
              for (var t, e = 0; null != (t = this[e]); e++)
                1 === t.nodeType &&
                  (T.cleanData(bt(t, !1)), (t.textContent = ""));
              return this;
            },
            clone: function (t, e) {
              return (
                (t = null != t && t),
                (e = null == e ? t : e),
                this.map(function () {
                  return T.clone(this, t, e);
                })
              );
            },
            html: function (t) {
              return W(
                this,
                function (t) {
                  var e = this[0] || {},
                    n = 0,
                    i = this.length;
                  if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                  if (
                    "string" == typeof t &&
                    !Et.test(t) &&
                    !yt[(vt.exec(t) || ["", ""])[1].toLowerCase()]
                  ) {
                    t = T.htmlPrefilter(t);
                    try {
                      for (; n < i; n++)
                        1 === (e = this[n] || {}).nodeType &&
                          (T.cleanData(bt(e, !1)), (e.innerHTML = t));
                      e = 0;
                    } catch (t) {}
                  }
                  e && this.empty().append(t);
                },
                null,
                t,
                arguments.length
              );
            },
            replaceWith: function () {
              var t = [];
              return Rt(
                this,
                arguments,
                function (e) {
                  var n = this.parentNode;
                  T.inArray(this, t) < 0 &&
                    (T.cleanData(bt(this)), n && n.replaceChild(e, this));
                },
                t
              );
            },
          }),
          T.each(
            {
              appendTo: "append",
              prependTo: "prepend",
              insertBefore: "before",
              insertAfter: "after",
              replaceAll: "replaceWith",
            },
            function (t, e) {
              T.fn[t] = function (t) {
                for (
                  var n, i = [], r = T(t), o = r.length - 1, s = 0;
                  s <= o;
                  s++
                )
                  (n = s === o ? this : this.clone(!0)),
                    T(r[s])[e](n),
                    u.apply(i, n.get());
                return this.pushStack(i);
              };
            }
          );
        var zt = new RegExp("^(" + nt + ")(?!px)[a-z%]+$", "i"),
          qt = function (t) {
            var e = t.ownerDocument.defaultView;
            return (e && e.opener) || (e = n), e.getComputedStyle(t);
          },
          It = function (t, e, n) {
            var i,
              r,
              o = {};
            for (r in e) (o[r] = t.style[r]), (t.style[r] = e[r]);
            for (r in ((i = n.call(t)), e)) t.style[r] = o[r];
            return i;
          },
          Ft = new RegExp(rt.join("|"), "i");
        function Bt(t, e, n) {
          var i,
            r,
            o,
            s,
            a = t.style;
          return (
            (n = n || qt(t)) &&
              ("" !== (s = n.getPropertyValue(e) || n[e]) ||
                st(t) ||
                (s = T.style(t, e)),
              !v.pixelBoxStyles() &&
                zt.test(s) &&
                Ft.test(e) &&
                ((i = a.width),
                (r = a.minWidth),
                (o = a.maxWidth),
                (a.minWidth = a.maxWidth = a.width = s),
                (s = n.width),
                (a.width = i),
                (a.minWidth = r),
                (a.maxWidth = o))),
            void 0 !== s ? s + "" : s
          );
        }
        function Wt(t, e) {
          return {
            get: function () {
              if (!t()) return (this.get = e).apply(this, arguments);
              delete this.get;
            },
          };
        }
        !(function () {
          function t() {
            if (c) {
              (u.style.cssText =
                "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                (c.style.cssText =
                  "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                ot.appendChild(u).appendChild(c);
              var t = n.getComputedStyle(c);
              (i = "1%" !== t.top),
                (l = 12 === e(t.marginLeft)),
                (c.style.right = "60%"),
                (s = 36 === e(t.right)),
                (r = 36 === e(t.width)),
                (c.style.position = "absolute"),
                (o = 12 === e(c.offsetWidth / 3)),
                ot.removeChild(u),
                (c = null);
            }
          }
          function e(t) {
            return Math.round(parseFloat(t));
          }
          var i,
            r,
            o,
            s,
            a,
            l,
            u = b.createElement("div"),
            c = b.createElement("div");
          c.style &&
            ((c.style.backgroundClip = "content-box"),
            (c.cloneNode(!0).style.backgroundClip = ""),
            (v.clearCloneStyle = "content-box" === c.style.backgroundClip),
            T.extend(v, {
              boxSizingReliable: function () {
                return t(), r;
              },
              pixelBoxStyles: function () {
                return t(), s;
              },
              pixelPosition: function () {
                return t(), i;
              },
              reliableMarginLeft: function () {
                return t(), l;
              },
              scrollboxSize: function () {
                return t(), o;
              },
              reliableTrDimensions: function () {
                var t, e, i, r;
                return (
                  null == a &&
                    ((t = b.createElement("table")),
                    (e = b.createElement("tr")),
                    (i = b.createElement("div")),
                    (t.style.cssText =
                      "position:absolute;left:-11111px;border-collapse:separate"),
                    (e.style.cssText = "border:1px solid"),
                    (e.style.height = "1px"),
                    (i.style.height = "9px"),
                    (i.style.display = "block"),
                    ot.appendChild(t).appendChild(e).appendChild(i),
                    (r = n.getComputedStyle(e)),
                    (a =
                      parseInt(r.height, 10) +
                        parseInt(r.borderTopWidth, 10) +
                        parseInt(r.borderBottomWidth, 10) ===
                      e.offsetHeight),
                    ot.removeChild(t)),
                  a
                );
              },
            }));
        })();
        var Xt = ["Webkit", "Moz", "ms"],
          Yt = b.createElement("div").style,
          Ut = {};
        function Vt(t) {
          var e = T.cssProps[t] || Ut[t];
          return (
            e ||
            (t in Yt
              ? t
              : (Ut[t] =
                  (function (t) {
                    for (
                      var e = t[0].toUpperCase() + t.slice(1), n = Xt.length;
                      n--;

                    )
                      if ((t = Xt[n] + e) in Yt) return t;
                  })(t) || t))
          );
        }
        var Gt = /^(none|table(?!-c[ea]).+)/,
          Qt = /^--/,
          Jt = { position: "absolute", visibility: "hidden", display: "block" },
          Kt = { letterSpacing: "0", fontWeight: "400" };
        function Zt(t, e, n) {
          var i = it.exec(e);
          return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e;
        }
        function te(t, e, n, i, r, o) {
          var s = "width" === e ? 1 : 0,
            a = 0,
            l = 0;
          if (n === (i ? "border" : "content")) return 0;
          for (; s < 4; s += 2)
            "margin" === n && (l += T.css(t, n + rt[s], !0, r)),
              i
                ? ("content" === n && (l -= T.css(t, "padding" + rt[s], !0, r)),
                  "margin" !== n &&
                    (l -= T.css(t, "border" + rt[s] + "Width", !0, r)))
                : ((l += T.css(t, "padding" + rt[s], !0, r)),
                  "padding" !== n
                    ? (l += T.css(t, "border" + rt[s] + "Width", !0, r))
                    : (a += T.css(t, "border" + rt[s] + "Width", !0, r)));
          return (
            !i &&
              o >= 0 &&
              (l +=
                Math.max(
                  0,
                  Math.ceil(
                    t["offset" + e[0].toUpperCase() + e.slice(1)] -
                      o -
                      l -
                      a -
                      0.5
                  )
                ) || 0),
            l
          );
        }
        function ee(t, e, n) {
          var i = qt(t),
            r =
              (!v.boxSizingReliable() || n) &&
              "border-box" === T.css(t, "boxSizing", !1, i),
            o = r,
            s = Bt(t, e, i),
            a = "offset" + e[0].toUpperCase() + e.slice(1);
          if (zt.test(s)) {
            if (!n) return s;
            s = "auto";
          }
          return (
            ((!v.boxSizingReliable() && r) ||
              (!v.reliableTrDimensions() && E(t, "tr")) ||
              "auto" === s ||
              (!parseFloat(s) && "inline" === T.css(t, "display", !1, i))) &&
              t.getClientRects().length &&
              ((r = "border-box" === T.css(t, "boxSizing", !1, i)),
              (o = a in t) && (s = t[a])),
            (s = parseFloat(s) || 0) +
              te(t, e, n || (r ? "border" : "content"), o, i, s) +
              "px"
          );
        }
        function ne(t, e, n, i, r) {
          return new ne.prototype.init(t, e, n, i, r);
        }
        T.extend({
          cssHooks: {
            opacity: {
              get: function (t, e) {
                if (e) {
                  var n = Bt(t, "opacity");
                  return "" === n ? "1" : n;
                }
              },
            },
          },
          cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
          },
          cssProps: {},
          style: function (t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
              var r,
                o,
                s,
                a = V(e),
                l = Qt.test(e),
                u = t.style;
              if (
                (l || (e = Vt(a)),
                (s = T.cssHooks[e] || T.cssHooks[a]),
                void 0 === n)
              )
                return s && "get" in s && void 0 !== (r = s.get(t, !1, i))
                  ? r
                  : u[e];
              "string" === (o = typeof n) &&
                (r = it.exec(n)) &&
                r[1] &&
                ((n = ut(t, e, r)), (o = "number")),
                null != n &&
                  n == n &&
                  ("number" !== o ||
                    l ||
                    (n += (r && r[3]) || (T.cssNumber[a] ? "" : "px")),
                  v.clearCloneStyle ||
                    "" !== n ||
                    0 !== e.indexOf("background") ||
                    (u[e] = "inherit"),
                  (s && "set" in s && void 0 === (n = s.set(t, n, i))) ||
                    (l ? u.setProperty(e, n) : (u[e] = n)));
            }
          },
          css: function (t, e, n, i) {
            var r,
              o,
              s,
              a = V(e);
            return (
              Qt.test(e) || (e = Vt(a)),
              (s = T.cssHooks[e] || T.cssHooks[a]) &&
                "get" in s &&
                (r = s.get(t, !0, n)),
              void 0 === r && (r = Bt(t, e, i)),
              "normal" === r && e in Kt && (r = Kt[e]),
              "" === n || n
                ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r)
                : r
            );
          },
        }),
          T.each(["height", "width"], function (t, e) {
            T.cssHooks[e] = {
              get: function (t, n, i) {
                if (n)
                  return !Gt.test(T.css(t, "display")) ||
                    (t.getClientRects().length &&
                      t.getBoundingClientRect().width)
                    ? ee(t, e, i)
                    : It(t, Jt, function () {
                        return ee(t, e, i);
                      });
              },
              set: function (t, n, i) {
                var r,
                  o = qt(t),
                  s = !v.scrollboxSize() && "absolute" === o.position,
                  a = (s || i) && "border-box" === T.css(t, "boxSizing", !1, o),
                  l = i ? te(t, e, i, a, o) : 0;
                return (
                  a &&
                    s &&
                    (l -= Math.ceil(
                      t["offset" + e[0].toUpperCase() + e.slice(1)] -
                        parseFloat(o[e]) -
                        te(t, e, "border", !1, o) -
                        0.5
                    )),
                  l &&
                    (r = it.exec(n)) &&
                    "px" !== (r[3] || "px") &&
                    ((t.style[e] = n), (n = T.css(t, e))),
                  Zt(0, n, l)
                );
              },
            };
          }),
          (T.cssHooks.marginLeft = Wt(v.reliableMarginLeft, function (t, e) {
            if (e)
              return (
                (parseFloat(Bt(t, "marginLeft")) ||
                  t.getBoundingClientRect().left -
                    It(t, { marginLeft: 0 }, function () {
                      return t.getBoundingClientRect().left;
                    })) + "px"
              );
          })),
          T.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
            (T.cssHooks[t + e] = {
              expand: function (n) {
                for (
                  var i = 0,
                    r = {},
                    o = "string" == typeof n ? n.split(" ") : [n];
                  i < 4;
                  i++
                )
                  r[t + rt[i] + e] = o[i] || o[i - 2] || o[0];
                return r;
              },
            }),
              "margin" !== t && (T.cssHooks[t + e].set = Zt);
          }),
          T.fn.extend({
            css: function (t, e) {
              return W(
                this,
                function (t, e, n) {
                  var i,
                    r,
                    o = {},
                    s = 0;
                  if (Array.isArray(e)) {
                    for (i = qt(t), r = e.length; s < r; s++)
                      o[e[s]] = T.css(t, e[s], !1, i);
                    return o;
                  }
                  return void 0 !== n ? T.style(t, e, n) : T.css(t, e);
                },
                t,
                e,
                arguments.length > 1
              );
            },
          }),
          (T.Tween = ne),
          (ne.prototype = {
            constructor: ne,
            init: function (t, e, n, i, r, o) {
              (this.elem = t),
                (this.prop = n),
                (this.easing = r || T.easing._default),
                (this.options = e),
                (this.start = this.now = this.cur()),
                (this.end = i),
                (this.unit = o || (T.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
              var t = ne.propHooks[this.prop];
              return t && t.get ? t.get(this) : ne.propHooks._default.get(this);
            },
            run: function (t) {
              var e,
                n = ne.propHooks[this.prop];
              return (
                this.options.duration
                  ? (this.pos = e = T.easing[this.easing](
                      t,
                      this.options.duration * t,
                      0,
                      1,
                      this.options.duration
                    ))
                  : (this.pos = e = t),
                (this.now = (this.end - this.start) * e + this.start),
                this.options.step &&
                  this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : ne.propHooks._default.set(this),
                this
              );
            },
          }),
          (ne.prototype.init.prototype = ne.prototype),
          (ne.propHooks = {
            _default: {
              get: function (t) {
                var e;
                return 1 !== t.elem.nodeType ||
                  (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                  ? t.elem[t.prop]
                  : (e = T.css(t.elem, t.prop, "")) && "auto" !== e
                  ? e
                  : 0;
              },
              set: function (t) {
                T.fx.step[t.prop]
                  ? T.fx.step[t.prop](t)
                  : 1 !== t.elem.nodeType ||
                    (!T.cssHooks[t.prop] && null == t.elem.style[Vt(t.prop)])
                  ? (t.elem[t.prop] = t.now)
                  : T.style(t.elem, t.prop, t.now + t.unit);
              },
            },
          }),
          (ne.propHooks.scrollTop = ne.propHooks.scrollLeft = {
            set: function (t) {
              t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
            },
          }),
          (T.easing = {
            linear: function (t) {
              return t;
            },
            swing: function (t) {
              return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: "swing",
          }),
          (T.fx = ne.prototype.init),
          (T.fx.step = {});
        var ie,
          re,
          oe = /^(?:toggle|show|hide)$/,
          se = /queueHooks$/;
        function ae() {
          re &&
            (!1 === b.hidden && n.requestAnimationFrame
              ? n.requestAnimationFrame(ae)
              : n.setTimeout(ae, T.fx.interval),
            T.fx.tick());
        }
        function le() {
          return (
            n.setTimeout(function () {
              ie = void 0;
            }),
            (ie = Date.now())
          );
        }
        function ue(t, e) {
          var n,
            i = 0,
            r = { height: t };
          for (e = e ? 1 : 0; i < 4; i += 2 - e)
            r["margin" + (n = rt[i])] = r["padding" + n] = t;
          return e && (r.opacity = r.width = t), r;
        }
        function ce(t, e, n) {
          for (
            var i,
              r = (de.tweeners[e] || []).concat(de.tweeners["*"]),
              o = 0,
              s = r.length;
            o < s;
            o++
          )
            if ((i = r[o].call(n, e, t))) return i;
        }
        function de(t, e, n) {
          var i,
            r,
            o = 0,
            s = de.prefilters.length,
            a = T.Deferred().always(function () {
              delete l.elem;
            }),
            l = function () {
              if (r) return !1;
              for (
                var e = ie || le(),
                  n = Math.max(0, u.startTime + u.duration - e),
                  i = 1 - (n / u.duration || 0),
                  o = 0,
                  s = u.tweens.length;
                o < s;
                o++
              )
                u.tweens[o].run(i);
              return (
                a.notifyWith(t, [u, i, n]),
                i < 1 && s
                  ? n
                  : (s || a.notifyWith(t, [u, 1, 0]), a.resolveWith(t, [u]), !1)
              );
            },
            u = a.promise({
              elem: t,
              props: T.extend({}, e),
              opts: T.extend(
                !0,
                { specialEasing: {}, easing: T.easing._default },
                n
              ),
              originalProperties: e,
              originalOptions: n,
              startTime: ie || le(),
              duration: n.duration,
              tweens: [],
              createTween: function (e, n) {
                var i = T.Tween(
                  t,
                  u.opts,
                  e,
                  n,
                  u.opts.specialEasing[e] || u.opts.easing
                );
                return u.tweens.push(i), i;
              },
              stop: function (e) {
                var n = 0,
                  i = e ? u.tweens.length : 0;
                if (r) return this;
                for (r = !0; n < i; n++) u.tweens[n].run(1);
                return (
                  e
                    ? (a.notifyWith(t, [u, 1, 0]), a.resolveWith(t, [u, e]))
                    : a.rejectWith(t, [u, e]),
                  this
                );
              },
            }),
            c = u.props;
          for (
            !(function (t, e) {
              var n, i, r, o, s;
              for (n in t)
                if (
                  ((r = e[(i = V(n))]),
                  (o = t[n]),
                  Array.isArray(o) && ((r = o[1]), (o = t[n] = o[0])),
                  n !== i && ((t[i] = o), delete t[n]),
                  (s = T.cssHooks[i]) && ("expand" in s))
                )
                  for (n in ((o = s.expand(o)), delete t[i], o))
                    (n in t) || ((t[n] = o[n]), (e[n] = r));
                else e[i] = r;
            })(c, u.opts.specialEasing);
            o < s;
            o++
          )
            if ((i = de.prefilters[o].call(u, t, c, u.opts)))
              return (
                m(i.stop) &&
                  (T._queueHooks(u.elem, u.opts.queue).stop = i.stop.bind(i)),
                i
              );
          return (
            T.map(c, ce, u),
            m(u.opts.start) && u.opts.start.call(t, u),
            u
              .progress(u.opts.progress)
              .done(u.opts.done, u.opts.complete)
              .fail(u.opts.fail)
              .always(u.opts.always),
            T.fx.timer(T.extend(l, { elem: t, anim: u, queue: u.opts.queue })),
            u
          );
        }
        (T.Animation = T.extend(de, {
          tweeners: {
            "*": [
              function (t, e) {
                var n = this.createTween(t, e);
                return ut(n.elem, t, it.exec(e), n), n;
              },
            ],
          },
          tweener: function (t, e) {
            m(t) ? ((e = t), (t = ["*"])) : (t = t.match(R));
            for (var n, i = 0, r = t.length; i < r; i++)
              (n = t[i]),
                (de.tweeners[n] = de.tweeners[n] || []),
                de.tweeners[n].unshift(e);
          },
          prefilters: [
            function (t, e, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                u,
                c,
                d = "width" in e || "height" in e,
                p = this,
                f = {},
                h = t.style,
                g = t.nodeType && lt(t),
                v = J.get(t, "fxshow");
              for (i in (n.queue ||
                (null == (s = T._queueHooks(t, "fx")).unqueued &&
                  ((s.unqueued = 0),
                  (a = s.empty.fire),
                  (s.empty.fire = function () {
                    s.unqueued || a();
                  })),
                s.unqueued++,
                p.always(function () {
                  p.always(function () {
                    s.unqueued--, T.queue(t, "fx").length || s.empty.fire();
                  });
                })),
              e))
                if (((r = e[i]), oe.test(r))) {
                  if (
                    (delete e[i],
                    (o = o || "toggle" === r),
                    r === (g ? "hide" : "show"))
                  ) {
                    if ("show" !== r || !v || void 0 === v[i]) continue;
                    g = !0;
                  }
                  f[i] = (v && v[i]) || T.style(t, i);
                }
              if ((l = !T.isEmptyObject(e)) || !T.isEmptyObject(f))
                for (i in (d &&
                  1 === t.nodeType &&
                  ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                  null == (u = v && v.display) && (u = J.get(t, "display")),
                  "none" === (c = T.css(t, "display")) &&
                    (u
                      ? (c = u)
                      : (pt([t], !0),
                        (u = t.style.display || u),
                        (c = T.css(t, "display")),
                        pt([t]))),
                  ("inline" === c || ("inline-block" === c && null != u)) &&
                    "none" === T.css(t, "float") &&
                    (l ||
                      (p.done(function () {
                        h.display = u;
                      }),
                      null == u &&
                        ((c = h.display), (u = "none" === c ? "" : c))),
                    (h.display = "inline-block"))),
                n.overflow &&
                  ((h.overflow = "hidden"),
                  p.always(function () {
                    (h.overflow = n.overflow[0]),
                      (h.overflowX = n.overflow[1]),
                      (h.overflowY = n.overflow[2]);
                  })),
                (l = !1),
                f))
                  l ||
                    (v
                      ? "hidden" in v && (g = v.hidden)
                      : (v = J.access(t, "fxshow", { display: u })),
                    o && (v.hidden = !g),
                    g && pt([t], !0),
                    p.done(function () {
                      for (i in (g || pt([t]), J.remove(t, "fxshow"), f))
                        T.style(t, i, f[i]);
                    })),
                    (l = ce(g ? v[i] : 0, i, p)),
                    i in v ||
                      ((v[i] = l.start),
                      g && ((l.end = l.start), (l.start = 0)));
            },
          ],
          prefilter: function (t, e) {
            e ? de.prefilters.unshift(t) : de.prefilters.push(t);
          },
        })),
          (T.speed = function (t, e, n) {
            var i =
              t && "object" == typeof t
                ? T.extend({}, t)
                : {
                    complete: n || (!n && e) || (m(t) && t),
                    duration: t,
                    easing: (n && e) || (e && !m(e) && e),
                  };
            return (
              T.fx.off
                ? (i.duration = 0)
                : "number" != typeof i.duration &&
                  (i.duration in T.fx.speeds
                    ? (i.duration = T.fx.speeds[i.duration])
                    : (i.duration = T.fx.speeds._default)),
              (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
              (i.old = i.complete),
              (i.complete = function () {
                m(i.old) && i.old.call(this),
                  i.queue && T.dequeue(this, i.queue);
              }),
              i
            );
          }),
          T.fn.extend({
            fadeTo: function (t, e, n, i) {
              return this.filter(lt)
                .css("opacity", 0)
                .show()
                .end()
                .animate({ opacity: e }, t, n, i);
            },
            animate: function (t, e, n, i) {
              var r = T.isEmptyObject(t),
                o = T.speed(e, n, i),
                s = function () {
                  var e = de(this, T.extend({}, t), o);
                  (r || J.get(this, "finish")) && e.stop(!0);
                };
              return (
                (s.finish = s),
                r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
              );
            },
            stop: function (t, e, n) {
              var i = function (t) {
                var e = t.stop;
                delete t.stop, e(n);
              };
              return (
                "string" != typeof t && ((n = e), (e = t), (t = void 0)),
                e && this.queue(t || "fx", []),
                this.each(function () {
                  var e = !0,
                    r = null != t && t + "queueHooks",
                    o = T.timers,
                    s = J.get(this);
                  if (r) s[r] && s[r].stop && i(s[r]);
                  else for (r in s) s[r] && s[r].stop && se.test(r) && i(s[r]);
                  for (r = o.length; r--; )
                    o[r].elem !== this ||
                      (null != t && o[r].queue !== t) ||
                      (o[r].anim.stop(n), (e = !1), o.splice(r, 1));
                  (!e && n) || T.dequeue(this, t);
                })
              );
            },
            finish: function (t) {
              return (
                !1 !== t && (t = t || "fx"),
                this.each(function () {
                  var e,
                    n = J.get(this),
                    i = n[t + "queue"],
                    r = n[t + "queueHooks"],
                    o = T.timers,
                    s = i ? i.length : 0;
                  for (
                    n.finish = !0,
                      T.queue(this, t, []),
                      r && r.stop && r.stop.call(this, !0),
                      e = o.length;
                    e--;

                  )
                    o[e].elem === this &&
                      o[e].queue === t &&
                      (o[e].anim.stop(!0), o.splice(e, 1));
                  for (e = 0; e < s; e++)
                    i[e] && i[e].finish && i[e].finish.call(this);
                  delete n.finish;
                })
              );
            },
          }),
          T.each(["toggle", "show", "hide"], function (t, e) {
            var n = T.fn[e];
            T.fn[e] = function (t, i, r) {
              return null == t || "boolean" == typeof t
                ? n.apply(this, arguments)
                : this.animate(ue(e, !0), t, i, r);
            };
          }),
          T.each(
            {
              slideDown: ue("show"),
              slideUp: ue("hide"),
              slideToggle: ue("toggle"),
              fadeIn: { opacity: "show" },
              fadeOut: { opacity: "hide" },
              fadeToggle: { opacity: "toggle" },
            },
            function (t, e) {
              T.fn[t] = function (t, n, i) {
                return this.animate(e, t, n, i);
              };
            }
          ),
          (T.timers = []),
          (T.fx.tick = function () {
            var t,
              e = 0,
              n = T.timers;
            for (ie = Date.now(); e < n.length; e++)
              (t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || T.fx.stop(), (ie = void 0);
          }),
          (T.fx.timer = function (t) {
            T.timers.push(t), T.fx.start();
          }),
          (T.fx.interval = 13),
          (T.fx.start = function () {
            re || ((re = !0), ae());
          }),
          (T.fx.stop = function () {
            re = null;
          }),
          (T.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
          (T.fn.delay = function (t, e) {
            return (
              (t = (T.fx && T.fx.speeds[t]) || t),
              (e = e || "fx"),
              this.queue(e, function (e, i) {
                var r = n.setTimeout(e, t);
                i.stop = function () {
                  n.clearTimeout(r);
                };
              })
            );
          }),
          (function () {
            var t = b.createElement("input"),
              e = b
                .createElement("select")
                .appendChild(b.createElement("option"));
            (t.type = "checkbox"),
              (v.checkOn = "" !== t.value),
              (v.optSelected = e.selected),
              ((t = b.createElement("input")).value = "t"),
              (t.type = "radio"),
              (v.radioValue = "t" === t.value);
          })();
        var pe,
          fe = T.expr.attrHandle;
        T.fn.extend({
          attr: function (t, e) {
            return W(this, T.attr, t, e, arguments.length > 1);
          },
          removeAttr: function (t) {
            return this.each(function () {
              T.removeAttr(this, t);
            });
          },
        }),
          T.extend({
            attr: function (t, e, n) {
              var i,
                r,
                o = t.nodeType;
              if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === t.getAttribute
                  ? T.prop(t, e, n)
                  : ((1 === o && T.isXMLDoc(t)) ||
                      (r =
                        T.attrHooks[e.toLowerCase()] ||
                        (T.expr.match.bool.test(e) ? pe : void 0)),
                    void 0 !== n
                      ? null === n
                        ? void T.removeAttr(t, e)
                        : r && "set" in r && void 0 !== (i = r.set(t, n, e))
                        ? i
                        : (t.setAttribute(e, n + ""), n)
                      : r && "get" in r && null !== (i = r.get(t, e))
                      ? i
                      : null == (i = T.find.attr(t, e))
                      ? void 0
                      : i);
            },
            attrHooks: {
              type: {
                set: function (t, e) {
                  if (!v.radioValue && "radio" === e && E(t, "input")) {
                    var n = t.value;
                    return t.setAttribute("type", e), n && (t.value = n), e;
                  }
                },
              },
            },
            removeAttr: function (t, e) {
              var n,
                i = 0,
                r = e && e.match(R);
              if (r && 1 === t.nodeType)
                for (; (n = r[i++]); ) t.removeAttribute(n);
            },
          }),
          (pe = {
            set: function (t, e, n) {
              return !1 === e ? T.removeAttr(t, n) : t.setAttribute(n, n), n;
            },
          }),
          T.each(T.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = fe[e] || T.find.attr;
            fe[e] = function (t, e, i) {
              var r,
                o,
                s = e.toLowerCase();
              return (
                i ||
                  ((o = fe[s]),
                  (fe[s] = r),
                  (r = null != n(t, e, i) ? s : null),
                  (fe[s] = o)),
                r
              );
            };
          });
        var he = /^(?:input|select|textarea|button)$/i,
          ge = /^(?:a|area)$/i;
        function ve(t) {
          return (t.match(R) || []).join(" ");
        }
        function me(t) {
          return (t.getAttribute && t.getAttribute("class")) || "";
        }
        function ye(t) {
          return Array.isArray(t)
            ? t
            : ("string" == typeof t && t.match(R)) || [];
        }
        T.fn.extend({
          prop: function (t, e) {
            return W(this, T.prop, t, e, arguments.length > 1);
          },
          removeProp: function (t) {
            return this.each(function () {
              delete this[T.propFix[t] || t];
            });
          },
        }),
          T.extend({
            prop: function (t, e, n) {
              var i,
                r,
                o = t.nodeType;
              if (3 !== o && 8 !== o && 2 !== o)
                return (
                  (1 === o && T.isXMLDoc(t)) ||
                    ((e = T.propFix[e] || e), (r = T.propHooks[e])),
                  void 0 !== n
                    ? r && "set" in r && void 0 !== (i = r.set(t, n, e))
                      ? i
                      : (t[e] = n)
                    : r && "get" in r && null !== (i = r.get(t, e))
                    ? i
                    : t[e]
                );
            },
            propHooks: {
              tabIndex: {
                get: function (t) {
                  var e = T.find.attr(t, "tabindex");
                  return e
                    ? parseInt(e, 10)
                    : he.test(t.nodeName) || (ge.test(t.nodeName) && t.href)
                    ? 0
                    : -1;
                },
              },
            },
            propFix: { for: "htmlFor", class: "className" },
          }),
          v.optSelected ||
            (T.propHooks.selected = {
              get: function (t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null;
              },
              set: function (t) {
                var e = t.parentNode;
                e &&
                  (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
              },
            }),
          T.each(
            [
              "tabIndex",
              "readOnly",
              "maxLength",
              "cellSpacing",
              "cellPadding",
              "rowSpan",
              "colSpan",
              "useMap",
              "frameBorder",
              "contentEditable",
            ],
            function () {
              T.propFix[this.toLowerCase()] = this;
            }
          ),
          T.fn.extend({
            addClass: function (t) {
              var e,
                n,
                i,
                r,
                o,
                s,
                a,
                l = 0;
              if (m(t))
                return this.each(function (e) {
                  T(this).addClass(t.call(this, e, me(this)));
                });
              if ((e = ye(t)).length)
                for (; (n = this[l++]); )
                  if (
                    ((r = me(n)), (i = 1 === n.nodeType && " " + ve(r) + " "))
                  ) {
                    for (s = 0; (o = e[s++]); )
                      i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                    r !== (a = ve(i)) && n.setAttribute("class", a);
                  }
              return this;
            },
            removeClass: function (t) {
              var e,
                n,
                i,
                r,
                o,
                s,
                a,
                l = 0;
              if (m(t))
                return this.each(function (e) {
                  T(this).removeClass(t.call(this, e, me(this)));
                });
              if (!arguments.length) return this.attr("class", "");
              if ((e = ye(t)).length)
                for (; (n = this[l++]); )
                  if (
                    ((r = me(n)), (i = 1 === n.nodeType && " " + ve(r) + " "))
                  ) {
                    for (s = 0; (o = e[s++]); )
                      for (; i.indexOf(" " + o + " ") > -1; )
                        i = i.replace(" " + o + " ", " ");
                    r !== (a = ve(i)) && n.setAttribute("class", a);
                  }
              return this;
            },
            toggleClass: function (t, e) {
              var n = typeof t,
                i = "string" === n || Array.isArray(t);
              return "boolean" == typeof e && i
                ? e
                  ? this.addClass(t)
                  : this.removeClass(t)
                : m(t)
                ? this.each(function (n) {
                    T(this).toggleClass(t.call(this, n, me(this), e), e);
                  })
                : this.each(function () {
                    var e, r, o, s;
                    if (i)
                      for (r = 0, o = T(this), s = ye(t); (e = s[r++]); )
                        o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                    else
                      (void 0 !== t && "boolean" !== n) ||
                        ((e = me(this)) && J.set(this, "__className__", e),
                        this.setAttribute &&
                          this.setAttribute(
                            "class",
                            e || !1 === t
                              ? ""
                              : J.get(this, "__className__") || ""
                          ));
                  });
            },
            hasClass: function (t) {
              var e,
                n,
                i = 0;
              for (e = " " + t + " "; (n = this[i++]); )
                if (1 === n.nodeType && (" " + ve(me(n)) + " ").indexOf(e) > -1)
                  return !0;
              return !1;
            },
          });
        var be = /\r/g;
        T.fn.extend({
          val: function (t) {
            var e,
              n,
              i,
              r = this[0];
            return arguments.length
              ? ((i = m(t)),
                this.each(function (n) {
                  var r;
                  1 === this.nodeType &&
                    (null == (r = i ? t.call(this, n, T(this).val()) : t)
                      ? (r = "")
                      : "number" == typeof r
                      ? (r += "")
                      : Array.isArray(r) &&
                        (r = T.map(r, function (t) {
                          return null == t ? "" : t + "";
                        })),
                    ((e =
                      T.valHooks[this.type] ||
                      T.valHooks[this.nodeName.toLowerCase()]) &&
                      "set" in e &&
                      void 0 !== e.set(this, r, "value")) ||
                      (this.value = r));
                }))
              : r
              ? (e =
                  T.valHooks[r.type] || T.valHooks[r.nodeName.toLowerCase()]) &&
                "get" in e &&
                void 0 !== (n = e.get(r, "value"))
                ? n
                : "string" == typeof (n = r.value)
                ? n.replace(be, "")
                : null == n
                ? ""
                : n
              : void 0;
          },
        }),
          T.extend({
            valHooks: {
              option: {
                get: function (t) {
                  var e = T.find.attr(t, "value");
                  return null != e ? e : ve(T.text(t));
                },
              },
              select: {
                get: function (t) {
                  var e,
                    n,
                    i,
                    r = t.options,
                    o = t.selectedIndex,
                    s = "select-one" === t.type,
                    a = s ? null : [],
                    l = s ? o + 1 : r.length;
                  for (i = o < 0 ? l : s ? o : 0; i < l; i++)
                    if (
                      ((n = r[i]).selected || i === o) &&
                      !n.disabled &&
                      (!n.parentNode.disabled || !E(n.parentNode, "optgroup"))
                    ) {
                      if (((e = T(n).val()), s)) return e;
                      a.push(e);
                    }
                  return a;
                },
                set: function (t, e) {
                  for (
                    var n, i, r = t.options, o = T.makeArray(e), s = r.length;
                    s--;

                  )
                    ((i = r[s]).selected =
                      T.inArray(T.valHooks.option.get(i), o) > -1) && (n = !0);
                  return n || (t.selectedIndex = -1), o;
                },
              },
            },
          }),
          T.each(["radio", "checkbox"], function () {
            (T.valHooks[this] = {
              set: function (t, e) {
                if (Array.isArray(e))
                  return (t.checked = T.inArray(T(t).val(), e) > -1);
              },
            }),
              v.checkOn ||
                (T.valHooks[this].get = function (t) {
                  return null === t.getAttribute("value") ? "on" : t.value;
                });
          }),
          (v.focusin = "onfocusin" in n);
        var _e = /^(?:focusinfocus|focusoutblur)$/,
          we = function (t) {
            t.stopPropagation();
          };
        T.extend(T.event, {
          trigger: function (t, e, i, r) {
            var o,
              s,
              a,
              l,
              u,
              c,
              d,
              p,
              h = [i || b],
              g = f.call(t, "type") ? t.type : t,
              v = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
              ((s = p = a = i = i || b),
              3 !== i.nodeType &&
                8 !== i.nodeType &&
                !_e.test(g + T.event.triggered) &&
                (g.indexOf(".") > -1 &&
                  ((v = g.split(".")), (g = v.shift()), v.sort()),
                (u = g.indexOf(":") < 0 && "on" + g),
                ((t = t[T.expando]
                  ? t
                  : new T.Event(g, "object" == typeof t && t)).isTrigger = r
                  ? 2
                  : 3),
                (t.namespace = v.join(".")),
                (t.rnamespace = t.namespace
                  ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)")
                  : null),
                (t.result = void 0),
                t.target || (t.target = i),
                (e = null == e ? [t] : T.makeArray(e, [t])),
                (d = T.event.special[g] || {}),
                r || !d.trigger || !1 !== d.trigger.apply(i, e)))
            ) {
              if (!r && !d.noBubble && !y(i)) {
                for (
                  l = d.delegateType || g, _e.test(l + g) || (s = s.parentNode);
                  s;
                  s = s.parentNode
                )
                  h.push(s), (a = s);
                a === (i.ownerDocument || b) &&
                  h.push(a.defaultView || a.parentWindow || n);
              }
              for (o = 0; (s = h[o++]) && !t.isPropagationStopped(); )
                (p = s),
                  (t.type = o > 1 ? l : d.bindType || g),
                  (c =
                    (J.get(s, "events") || Object.create(null))[t.type] &&
                    J.get(s, "handle")) && c.apply(s, e),
                  (c = u && s[u]) &&
                    c.apply &&
                    G(s) &&
                    ((t.result = c.apply(s, e)),
                    !1 === t.result && t.preventDefault());
              return (
                (t.type = g),
                r ||
                  t.isDefaultPrevented() ||
                  (d._default && !1 !== d._default.apply(h.pop(), e)) ||
                  !G(i) ||
                  (u &&
                    m(i[g]) &&
                    !y(i) &&
                    ((a = i[u]) && (i[u] = null),
                    (T.event.triggered = g),
                    t.isPropagationStopped() && p.addEventListener(g, we),
                    i[g](),
                    t.isPropagationStopped() && p.removeEventListener(g, we),
                    (T.event.triggered = void 0),
                    a && (i[u] = a))),
                t.result
              );
            }
          },
          simulate: function (t, e, n) {
            var i = T.extend(new T.Event(), n, { type: t, isSimulated: !0 });
            T.event.trigger(i, null, e);
          },
        }),
          T.fn.extend({
            trigger: function (t, e) {
              return this.each(function () {
                T.event.trigger(t, e, this);
              });
            },
            triggerHandler: function (t, e) {
              var n = this[0];
              if (n) return T.event.trigger(t, e, n, !0);
            },
          }),
          v.focusin ||
            T.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
              var n = function (t) {
                T.event.simulate(e, t.target, T.event.fix(t));
              };
              T.event.special[e] = {
                setup: function () {
                  var i = this.ownerDocument || this.document || this,
                    r = J.access(i, e);
                  r || i.addEventListener(t, n, !0),
                    J.access(i, e, (r || 0) + 1);
                },
                teardown: function () {
                  var i = this.ownerDocument || this.document || this,
                    r = J.access(i, e) - 1;
                  r
                    ? J.access(i, e, r)
                    : (i.removeEventListener(t, n, !0), J.remove(i, e));
                },
              };
            });
        var xe = n.location,
          Te = { guid: Date.now() },
          ke = /\?/;
        T.parseXML = function (t) {
          var e, i;
          if (!t || "string" != typeof t) return null;
          try {
            e = new n.DOMParser().parseFromString(t, "text/xml");
          } catch (t) {}
          return (
            (i = e && e.getElementsByTagName("parsererror")[0]),
            (e && !i) ||
              T.error(
                "Invalid XML: " +
                  (i
                    ? T.map(i.childNodes, function (t) {
                        return t.textContent;
                      }).join("\n")
                    : t)
              ),
            e
          );
        };
        var Se = /\[\]$/,
          Ce = /\r?\n/g,
          Ae = /^(?:submit|button|image|reset|file)$/i,
          Oe = /^(?:input|select|textarea|keygen)/i;
        function Ee(t, e, n, i) {
          var r;
          if (Array.isArray(e))
            T.each(e, function (e, r) {
              n || Se.test(t)
                ? i(t, r)
                : Ee(
                    t +
                      "[" +
                      ("object" == typeof r && null != r ? e : "") +
                      "]",
                    r,
                    n,
                    i
                  );
            });
          else if (n || "object" !== x(e)) i(t, e);
          else for (r in e) Ee(t + "[" + r + "]", e[r], n, i);
        }
        (T.param = function (t, e) {
          var n,
            i = [],
            r = function (t, e) {
              var n = m(e) ? e() : e;
              i[i.length] =
                encodeURIComponent(t) +
                "=" +
                encodeURIComponent(null == n ? "" : n);
            };
          if (null == t) return "";
          if (Array.isArray(t) || (t.jquery && !T.isPlainObject(t)))
            T.each(t, function () {
              r(this.name, this.value);
            });
          else for (n in t) Ee(n, t[n], e, r);
          return i.join("&");
        }),
          T.fn.extend({
            serialize: function () {
              return T.param(this.serializeArray());
            },
            serializeArray: function () {
              return this.map(function () {
                var t = T.prop(this, "elements");
                return t ? T.makeArray(t) : this;
              })
                .filter(function () {
                  var t = this.type;
                  return (
                    this.name &&
                    !T(this).is(":disabled") &&
                    Oe.test(this.nodeName) &&
                    !Ae.test(t) &&
                    (this.checked || !gt.test(t))
                  );
                })
                .map(function (t, e) {
                  var n = T(this).val();
                  return null == n
                    ? null
                    : Array.isArray(n)
                    ? T.map(n, function (t) {
                        return { name: e.name, value: t.replace(Ce, "\r\n") };
                      })
                    : { name: e.name, value: n.replace(Ce, "\r\n") };
                })
                .get();
            },
          });
        var De = /%20/g,
          Me = /#.*$/,
          $e = /([?&])_=[^&]*/,
          Pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
          je = /^(?:GET|HEAD)$/,
          Le = /^\/\//,
          Ne = {},
          Re = {},
          He = "*/".concat("*"),
          ze = b.createElement("a");
        function qe(t) {
          return function (e, n) {
            "string" != typeof e && ((n = e), (e = "*"));
            var i,
              r = 0,
              o = e.toLowerCase().match(R) || [];
            if (m(n))
              for (; (i = o[r++]); )
                "+" === i[0]
                  ? ((i = i.slice(1) || "*"), (t[i] = t[i] || []).unshift(n))
                  : (t[i] = t[i] || []).push(n);
          };
        }
        function Ie(t, e, n, i) {
          var r = {},
            o = t === Re;
          function s(a) {
            var l;
            return (
              (r[a] = !0),
              T.each(t[a] || [], function (t, a) {
                var u = a(e, n, i);
                return "string" != typeof u || o || r[u]
                  ? o
                    ? !(l = u)
                    : void 0
                  : (e.dataTypes.unshift(u), s(u), !1);
              }),
              l
            );
          }
          return s(e.dataTypes[0]) || (!r["*"] && s("*"));
        }
        function Fe(t, e) {
          var n,
            i,
            r = T.ajaxSettings.flatOptions || {};
          for (n in e)
            void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
          return i && T.extend(!0, t, i), t;
        }
        (ze.href = xe.href),
          T.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
              url: xe.href,
              type: "GET",
              isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                xe.protocol
              ),
              global: !0,
              processData: !0,
              async: !0,
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              accepts: {
                "*": He,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
              },
              contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
              responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON",
              },
              converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": T.parseXML,
              },
              flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (t, e) {
              return e ? Fe(Fe(t, T.ajaxSettings), e) : Fe(T.ajaxSettings, t);
            },
            ajaxPrefilter: qe(Ne),
            ajaxTransport: qe(Re),
            ajax: function (t, e) {
              "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
              var i,
                r,
                o,
                s,
                a,
                l,
                u,
                c,
                d,
                p,
                f = T.ajaxSetup({}, e),
                h = f.context || f,
                g = f.context && (h.nodeType || h.jquery) ? T(h) : T.event,
                v = T.Deferred(),
                m = T.Callbacks("once memory"),
                y = f.statusCode || {},
                _ = {},
                w = {},
                x = "canceled",
                k = {
                  readyState: 0,
                  getResponseHeader: function (t) {
                    var e;
                    if (u) {
                      if (!s)
                        for (s = {}; (e = Pe.exec(o)); )
                          s[e[1].toLowerCase() + " "] = (
                            s[e[1].toLowerCase() + " "] || []
                          ).concat(e[2]);
                      e = s[t.toLowerCase() + " "];
                    }
                    return null == e ? null : e.join(", ");
                  },
                  getAllResponseHeaders: function () {
                    return u ? o : null;
                  },
                  setRequestHeader: function (t, e) {
                    return (
                      null == u &&
                        ((t = w[t.toLowerCase()] = w[t.toLowerCase()] || t),
                        (_[t] = e)),
                      this
                    );
                  },
                  overrideMimeType: function (t) {
                    return null == u && (f.mimeType = t), this;
                  },
                  statusCode: function (t) {
                    var e;
                    if (t)
                      if (u) k.always(t[k.status]);
                      else for (e in t) y[e] = [y[e], t[e]];
                    return this;
                  },
                  abort: function (t) {
                    var e = t || x;
                    return i && i.abort(e), S(0, e), this;
                  },
                };
              if (
                (v.promise(k),
                (f.url = ((t || f.url || xe.href) + "").replace(
                  Le,
                  xe.protocol + "//"
                )),
                (f.type = e.method || e.type || f.method || f.type),
                (f.dataTypes = (f.dataType || "*").toLowerCase().match(R) || [
                  "",
                ]),
                null == f.crossDomain)
              ) {
                l = b.createElement("a");
                try {
                  (l.href = f.url),
                    (l.href = l.href),
                    (f.crossDomain =
                      ze.protocol + "//" + ze.host !=
                      l.protocol + "//" + l.host);
                } catch (t) {
                  f.crossDomain = !0;
                }
              }
              if (
                (f.data &&
                  f.processData &&
                  "string" != typeof f.data &&
                  (f.data = T.param(f.data, f.traditional)),
                Ie(Ne, f, e, k),
                u)
              )
                return k;
              for (d in ((c = T.event && f.global) &&
                0 == T.active++ &&
                T.event.trigger("ajaxStart"),
              (f.type = f.type.toUpperCase()),
              (f.hasContent = !je.test(f.type)),
              (r = f.url.replace(Me, "")),
              f.hasContent
                ? f.data &&
                  f.processData &&
                  0 ===
                    (f.contentType || "").indexOf(
                      "application/x-www-form-urlencoded"
                    ) &&
                  (f.data = f.data.replace(De, "+"))
                : ((p = f.url.slice(r.length)),
                  f.data &&
                    (f.processData || "string" == typeof f.data) &&
                    ((r += (ke.test(r) ? "&" : "?") + f.data), delete f.data),
                  !1 === f.cache &&
                    ((r = r.replace($e, "$1")),
                    (p = (ke.test(r) ? "&" : "?") + "_=" + Te.guid++ + p)),
                  (f.url = r + p)),
              f.ifModified &&
                (T.lastModified[r] &&
                  k.setRequestHeader("If-Modified-Since", T.lastModified[r]),
                T.etag[r] && k.setRequestHeader("If-None-Match", T.etag[r])),
              ((f.data && f.hasContent && !1 !== f.contentType) ||
                e.contentType) &&
                k.setRequestHeader("Content-Type", f.contentType),
              k.setRequestHeader(
                "Accept",
                f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                  ? f.accepts[f.dataTypes[0]] +
                      ("*" !== f.dataTypes[0] ? ", " + He + "; q=0.01" : "")
                  : f.accepts["*"]
              ),
              f.headers))
                k.setRequestHeader(d, f.headers[d]);
              if (f.beforeSend && (!1 === f.beforeSend.call(h, k, f) || u))
                return k.abort();
              if (
                ((x = "abort"),
                m.add(f.complete),
                k.done(f.success),
                k.fail(f.error),
                (i = Ie(Re, f, e, k)))
              ) {
                if (((k.readyState = 1), c && g.trigger("ajaxSend", [k, f]), u))
                  return k;
                f.async &&
                  f.timeout > 0 &&
                  (a = n.setTimeout(function () {
                    k.abort("timeout");
                  }, f.timeout));
                try {
                  (u = !1), i.send(_, S);
                } catch (t) {
                  if (u) throw t;
                  S(-1, t);
                }
              } else S(-1, "No Transport");
              function S(t, e, s, l) {
                var d,
                  p,
                  b,
                  _,
                  w,
                  x = e;
                u ||
                  ((u = !0),
                  a && n.clearTimeout(a),
                  (i = void 0),
                  (o = l || ""),
                  (k.readyState = t > 0 ? 4 : 0),
                  (d = (t >= 200 && t < 300) || 304 === t),
                  s &&
                    (_ = (function (t, e, n) {
                      for (
                        var i, r, o, s, a = t.contents, l = t.dataTypes;
                        "*" === l[0];

                      )
                        l.shift(),
                          void 0 === i &&
                            (i =
                              t.mimeType ||
                              e.getResponseHeader("Content-Type"));
                      if (i)
                        for (r in a)
                          if (a[r] && a[r].test(i)) {
                            l.unshift(r);
                            break;
                          }
                      if (l[0] in n) o = l[0];
                      else {
                        for (r in n) {
                          if (!l[0] || t.converters[r + " " + l[0]]) {
                            o = r;
                            break;
                          }
                          s || (s = r);
                        }
                        o = o || s;
                      }
                      if (o) return o !== l[0] && l.unshift(o), n[o];
                    })(f, k, s)),
                  !d &&
                    T.inArray("script", f.dataTypes) > -1 &&
                    T.inArray("json", f.dataTypes) < 0 &&
                    (f.converters["text script"] = function () {}),
                  (_ = (function (t, e, n, i) {
                    var r,
                      o,
                      s,
                      a,
                      l,
                      u = {},
                      c = t.dataTypes.slice();
                    if (c[1])
                      for (s in t.converters)
                        u[s.toLowerCase()] = t.converters[s];
                    for (o = c.shift(); o; )
                      if (
                        (t.responseFields[o] && (n[t.responseFields[o]] = e),
                        !l &&
                          i &&
                          t.dataFilter &&
                          (e = t.dataFilter(e, t.dataType)),
                        (l = o),
                        (o = c.shift()))
                      )
                        if ("*" === o) o = l;
                        else if ("*" !== l && l !== o) {
                          if (!(s = u[l + " " + o] || u["* " + o]))
                            for (r in u)
                              if (
                                (a = r.split(" "))[1] === o &&
                                (s = u[l + " " + a[0]] || u["* " + a[0]])
                              ) {
                                !0 === s
                                  ? (s = u[r])
                                  : !0 !== u[r] &&
                                    ((o = a[0]), c.unshift(a[1]));
                                break;
                              }
                          if (!0 !== s)
                            if (s && t.throws) e = s(e);
                            else
                              try {
                                e = s(e);
                              } catch (t) {
                                return {
                                  state: "parsererror",
                                  error: s
                                    ? t
                                    : "No conversion from " + l + " to " + o,
                                };
                              }
                        }
                    return { state: "success", data: e };
                  })(f, _, k, d)),
                  d
                    ? (f.ifModified &&
                        ((w = k.getResponseHeader("Last-Modified")) &&
                          (T.lastModified[r] = w),
                        (w = k.getResponseHeader("etag")) && (T.etag[r] = w)),
                      204 === t || "HEAD" === f.type
                        ? (x = "nocontent")
                        : 304 === t
                        ? (x = "notmodified")
                        : ((x = _.state), (p = _.data), (d = !(b = _.error))))
                    : ((b = x), (!t && x) || ((x = "error"), t < 0 && (t = 0))),
                  (k.status = t),
                  (k.statusText = (e || x) + ""),
                  d ? v.resolveWith(h, [p, x, k]) : v.rejectWith(h, [k, x, b]),
                  k.statusCode(y),
                  (y = void 0),
                  c &&
                    g.trigger(d ? "ajaxSuccess" : "ajaxError", [
                      k,
                      f,
                      d ? p : b,
                    ]),
                  m.fireWith(h, [k, x]),
                  c &&
                    (g.trigger("ajaxComplete", [k, f]),
                    --T.active || T.event.trigger("ajaxStop")));
              }
              return k;
            },
            getJSON: function (t, e, n) {
              return T.get(t, e, n, "json");
            },
            getScript: function (t, e) {
              return T.get(t, void 0, e, "script");
            },
          }),
          T.each(["get", "post"], function (t, e) {
            T[e] = function (t, n, i, r) {
              return (
                m(n) && ((r = r || i), (i = n), (n = void 0)),
                T.ajax(
                  T.extend(
                    { url: t, type: e, dataType: r, data: n, success: i },
                    T.isPlainObject(t) && t
                  )
                )
              );
            };
          }),
          T.ajaxPrefilter(function (t) {
            var e;
            for (e in t.headers)
              "content-type" === e.toLowerCase() &&
                (t.contentType = t.headers[e] || "");
          }),
          (T._evalUrl = function (t, e, n) {
            return T.ajax({
              url: t,
              type: "GET",
              dataType: "script",
              cache: !0,
              async: !1,
              global: !1,
              converters: { "text script": function () {} },
              dataFilter: function (t) {
                T.globalEval(t, e, n);
              },
            });
          }),
          T.fn.extend({
            wrapAll: function (t) {
              var e;
              return (
                this[0] &&
                  (m(t) && (t = t.call(this[0])),
                  (e = T(t, this[0].ownerDocument).eq(0).clone(!0)),
                  this[0].parentNode && e.insertBefore(this[0]),
                  e
                    .map(function () {
                      for (var t = this; t.firstElementChild; )
                        t = t.firstElementChild;
                      return t;
                    })
                    .append(this)),
                this
              );
            },
            wrapInner: function (t) {
              return m(t)
                ? this.each(function (e) {
                    T(this).wrapInner(t.call(this, e));
                  })
                : this.each(function () {
                    var e = T(this),
                      n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t);
                  });
            },
            wrap: function (t) {
              var e = m(t);
              return this.each(function (n) {
                T(this).wrapAll(e ? t.call(this, n) : t);
              });
            },
            unwrap: function (t) {
              return (
                this.parent(t)
                  .not("body")
                  .each(function () {
                    T(this).replaceWith(this.childNodes);
                  }),
                this
              );
            },
          }),
          (T.expr.pseudos.hidden = function (t) {
            return !T.expr.pseudos.visible(t);
          }),
          (T.expr.pseudos.visible = function (t) {
            return !!(
              t.offsetWidth ||
              t.offsetHeight ||
              t.getClientRects().length
            );
          }),
          (T.ajaxSettings.xhr = function () {
            try {
              return new n.XMLHttpRequest();
            } catch (t) {}
          });
        var Be = { 0: 200, 1223: 204 },
          We = T.ajaxSettings.xhr();
        (v.cors = !!We && "withCredentials" in We),
          (v.ajax = We = !!We),
          T.ajaxTransport(function (t) {
            var e, i;
            if (v.cors || (We && !t.crossDomain))
              return {
                send: function (r, o) {
                  var s,
                    a = t.xhr();
                  if (
                    (a.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                  )
                    for (s in t.xhrFields) a[s] = t.xhrFields[s];
                  for (s in (t.mimeType &&
                    a.overrideMimeType &&
                    a.overrideMimeType(t.mimeType),
                  t.crossDomain ||
                    r["X-Requested-With"] ||
                    (r["X-Requested-With"] = "XMLHttpRequest"),
                  r))
                    a.setRequestHeader(s, r[s]);
                  (e = function (t) {
                    return function () {
                      e &&
                        ((e = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                        "abort" === t
                          ? a.abort()
                          : "error" === t
                          ? "number" != typeof a.status
                            ? o(0, "error")
                            : o(a.status, a.statusText)
                          : o(
                              Be[a.status] || a.status,
                              a.statusText,
                              "text" !== (a.responseType || "text") ||
                                "string" != typeof a.responseText
                                ? { binary: a.response }
                                : { text: a.responseText },
                              a.getAllResponseHeaders()
                            ));
                    };
                  }),
                    (a.onload = e()),
                    (i = a.onerror = a.ontimeout = e("error")),
                    void 0 !== a.onabort
                      ? (a.onabort = i)
                      : (a.onreadystatechange = function () {
                          4 === a.readyState &&
                            n.setTimeout(function () {
                              e && i();
                            });
                        }),
                    (e = e("abort"));
                  try {
                    a.send((t.hasContent && t.data) || null);
                  } catch (t) {
                    if (e) throw t;
                  }
                },
                abort: function () {
                  e && e();
                },
              };
          }),
          T.ajaxPrefilter(function (t) {
            t.crossDomain && (t.contents.script = !1);
          }),
          T.ajaxSetup({
            accepts: {
              script:
                "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
              "text script": function (t) {
                return T.globalEval(t), t;
              },
            },
          }),
          T.ajaxPrefilter("script", function (t) {
            void 0 === t.cache && (t.cache = !1),
              t.crossDomain && (t.type = "GET");
          }),
          T.ajaxTransport("script", function (t) {
            var e, n;
            if (t.crossDomain || t.scriptAttrs)
              return {
                send: function (i, r) {
                  (e = T("<script>")
                    .attr(t.scriptAttrs || {})
                    .prop({ charset: t.scriptCharset, src: t.url })
                    .on(
                      "load error",
                      (n = function (t) {
                        e.remove(),
                          (n = null),
                          t && r("error" === t.type ? 404 : 200, t.type);
                      })
                    )),
                    b.head.appendChild(e[0]);
                },
                abort: function () {
                  n && n();
                },
              };
          });
        var Xe,
          Ye = [],
          Ue = /(=)\?(?=&|$)|\?\?/;
        T.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
            var t = Ye.pop() || T.expando + "_" + Te.guid++;
            return (this[t] = !0), t;
          },
        }),
          T.ajaxPrefilter("json jsonp", function (t, e, i) {
            var r,
              o,
              s,
              a =
                !1 !== t.jsonp &&
                (Ue.test(t.url)
                  ? "url"
                  : "string" == typeof t.data &&
                    0 ===
                      (t.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    Ue.test(t.data) &&
                    "data");
            if (a || "jsonp" === t.dataTypes[0])
              return (
                (r = t.jsonpCallback = m(t.jsonpCallback)
                  ? t.jsonpCallback()
                  : t.jsonpCallback),
                a
                  ? (t[a] = t[a].replace(Ue, "$1" + r))
                  : !1 !== t.jsonp &&
                    (t.url += (ke.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
                (t.converters["script json"] = function () {
                  return s || T.error(r + " was not called"), s[0];
                }),
                (t.dataTypes[0] = "json"),
                (o = n[r]),
                (n[r] = function () {
                  s = arguments;
                }),
                i.always(function () {
                  void 0 === o ? T(n).removeProp(r) : (n[r] = o),
                    t[r] && ((t.jsonpCallback = e.jsonpCallback), Ye.push(r)),
                    s && m(o) && o(s[0]),
                    (s = o = void 0);
                }),
                "script"
              );
          }),
          (v.createHTMLDocument =
            (((Xe = b.implementation.createHTMLDocument("").body).innerHTML =
              "<form></form><form></form>"),
            2 === Xe.childNodes.length)),
          (T.parseHTML = function (t, e, n) {
            return "string" != typeof t
              ? []
              : ("boolean" == typeof e && ((n = e), (e = !1)),
                e ||
                  (v.createHTMLDocument
                    ? (((i = (e = b.implementation.createHTMLDocument(
                        ""
                      )).createElement("base")).href = b.location.href),
                      e.head.appendChild(i))
                    : (e = b)),
                (o = !n && []),
                (r = D.exec(t))
                  ? [e.createElement(r[1])]
                  : ((r = xt([t], e, o)),
                    o && o.length && T(o).remove(),
                    T.merge([], r.childNodes)));
            var i, r, o;
          }),
          (T.fn.load = function (t, e, n) {
            var i,
              r,
              o,
              s = this,
              a = t.indexOf(" ");
            return (
              a > -1 && ((i = ve(t.slice(a))), (t = t.slice(0, a))),
              m(e)
                ? ((n = e), (e = void 0))
                : e && "object" == typeof e && (r = "POST"),
              s.length > 0 &&
                T.ajax({ url: t, type: r || "GET", dataType: "html", data: e })
                  .done(function (t) {
                    (o = arguments),
                      s.html(i ? T("<div>").append(T.parseHTML(t)).find(i) : t);
                  })
                  .always(
                    n &&
                      function (t, e) {
                        s.each(function () {
                          n.apply(this, o || [t.responseText, e, t]);
                        });
                      }
                  ),
              this
            );
          }),
          (T.expr.pseudos.animated = function (t) {
            return T.grep(T.timers, function (e) {
              return t === e.elem;
            }).length;
          }),
          (T.offset = {
            setOffset: function (t, e, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                u = T.css(t, "position"),
                c = T(t),
                d = {};
              "static" === u && (t.style.position = "relative"),
                (a = c.offset()),
                (o = T.css(t, "top")),
                (l = T.css(t, "left")),
                ("absolute" === u || "fixed" === u) &&
                (o + l).indexOf("auto") > -1
                  ? ((s = (i = c.position()).top), (r = i.left))
                  : ((s = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
                m(e) && (e = e.call(t, n, T.extend({}, a))),
                null != e.top && (d.top = e.top - a.top + s),
                null != e.left && (d.left = e.left - a.left + r),
                "using" in e ? e.using.call(t, d) : c.css(d);
            },
          }),
          T.fn.extend({
            offset: function (t) {
              if (arguments.length)
                return void 0 === t
                  ? this
                  : this.each(function (e) {
                      T.offset.setOffset(this, t, e);
                    });
              var e,
                n,
                i = this[0];
              return i
                ? i.getClientRects().length
                  ? ((e = i.getBoundingClientRect()),
                    (n = i.ownerDocument.defaultView),
                    {
                      top: e.top + n.pageYOffset,
                      left: e.left + n.pageXOffset,
                    })
                  : { top: 0, left: 0 }
                : void 0;
            },
            position: function () {
              if (this[0]) {
                var t,
                  e,
                  n,
                  i = this[0],
                  r = { top: 0, left: 0 };
                if ("fixed" === T.css(i, "position"))
                  e = i.getBoundingClientRect();
                else {
                  for (
                    e = this.offset(),
                      n = i.ownerDocument,
                      t = i.offsetParent || n.documentElement;
                    t &&
                    (t === n.body || t === n.documentElement) &&
                    "static" === T.css(t, "position");

                  )
                    t = t.parentNode;
                  t &&
                    t !== i &&
                    1 === t.nodeType &&
                    (((r = T(t).offset()).top += T.css(
                      t,
                      "borderTopWidth",
                      !0
                    )),
                    (r.left += T.css(t, "borderLeftWidth", !0)));
                }
                return {
                  top: e.top - r.top - T.css(i, "marginTop", !0),
                  left: e.left - r.left - T.css(i, "marginLeft", !0),
                };
              }
            },
            offsetParent: function () {
              return this.map(function () {
                for (
                  var t = this.offsetParent;
                  t && "static" === T.css(t, "position");

                )
                  t = t.offsetParent;
                return t || ot;
              });
            },
          }),
          T.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (t, e) {
              var n = "pageYOffset" === e;
              T.fn[t] = function (i) {
                return W(
                  this,
                  function (t, i, r) {
                    var o;
                    if (
                      (y(t) ? (o = t) : 9 === t.nodeType && (o = t.defaultView),
                      void 0 === r)
                    )
                      return o ? o[e] : t[i];
                    o
                      ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset)
                      : (t[i] = r);
                  },
                  t,
                  i,
                  arguments.length
                );
              };
            }
          ),
          T.each(["top", "left"], function (t, e) {
            T.cssHooks[e] = Wt(v.pixelPosition, function (t, n) {
              if (n)
                return (
                  (n = Bt(t, e)), zt.test(n) ? T(t).position()[e] + "px" : n
                );
            });
          }),
          T.each({ Height: "height", Width: "width" }, function (t, e) {
            T.each(
              { padding: "inner" + t, content: e, "": "outer" + t },
              function (n, i) {
                T.fn[i] = function (r, o) {
                  var s = arguments.length && (n || "boolean" != typeof r),
                    a = n || (!0 === r || !0 === o ? "margin" : "border");
                  return W(
                    this,
                    function (e, n, r) {
                      var o;
                      return y(e)
                        ? 0 === i.indexOf("outer")
                          ? e["inner" + t]
                          : e.document.documentElement["client" + t]
                        : 9 === e.nodeType
                        ? ((o = e.documentElement),
                          Math.max(
                            e.body["scroll" + t],
                            o["scroll" + t],
                            e.body["offset" + t],
                            o["offset" + t],
                            o["client" + t]
                          ))
                        : void 0 === r
                        ? T.css(e, n, a)
                        : T.style(e, n, r, a);
                    },
                    e,
                    s ? r : void 0,
                    s
                  );
                };
              }
            );
          }),
          T.each(
            [
              "ajaxStart",
              "ajaxStop",
              "ajaxComplete",
              "ajaxError",
              "ajaxSuccess",
              "ajaxSend",
            ],
            function (t, e) {
              T.fn[e] = function (t) {
                return this.on(e, t);
              };
            }
          ),
          T.fn.extend({
            bind: function (t, e, n) {
              return this.on(t, null, e, n);
            },
            unbind: function (t, e) {
              return this.off(t, null, e);
            },
            delegate: function (t, e, n, i) {
              return this.on(e, t, n, i);
            },
            undelegate: function (t, e, n) {
              return 1 === arguments.length
                ? this.off(t, "**")
                : this.off(e, t || "**", n);
            },
            hover: function (t, e) {
              return this.mouseenter(t).mouseleave(e || t);
            },
          }),
          T.each(
            "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
              " "
            ),
            function (t, e) {
              T.fn[e] = function (t, n) {
                return arguments.length > 0
                  ? this.on(e, null, t, n)
                  : this.trigger(e);
              };
            }
          );
        var Ve = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        (T.proxy = function (t, e) {
          var n, i, r;
          if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), m(t)))
            return (
              (i = a.call(arguments, 2)),
              ((r = function () {
                return t.apply(e || this, i.concat(a.call(arguments)));
              }).guid = t.guid = t.guid || T.guid++),
              r
            );
        }),
          (T.holdReady = function (t) {
            t ? T.readyWait++ : T.ready(!0);
          }),
          (T.isArray = Array.isArray),
          (T.parseJSON = JSON.parse),
          (T.nodeName = E),
          (T.isFunction = m),
          (T.isWindow = y),
          (T.camelCase = V),
          (T.type = x),
          (T.now = Date.now),
          (T.isNumeric = function (t) {
            var e = T.type(t);
            return (
              ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            );
          }),
          (T.trim = function (t) {
            return null == t ? "" : (t + "").replace(Ve, "");
          }),
          void 0 ===
            (i = function () {
              return T;
            }.apply(e, [])) || (t.exports = i);
        var Ge = n.jQuery,
          Qe = n.$;
        return (
          (T.noConflict = function (t) {
            return (
              n.$ === T && (n.$ = Qe), t && n.jQuery === T && (n.jQuery = Ge), T
            );
          }),
          void 0 === r && (n.jQuery = n.$ = T),
          T
        );
      });
    },
    function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return wt;
      });
      var i,
        r,
        o,
        s,
        a,
        l,
        u,
        c,
        d = n(0),
        p = {},
        f = 180 / Math.PI,
        h = Math.PI / 180,
        g = Math.atan2,
        v = /([A-Z])/g,
        m = /(left|right|width|margin|padding|x)/i,
        y = /[\s,\(]\S/,
        b = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        _ = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        w = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        x = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
          );
        },
        T = function (t, e) {
          var n = e.s + e.c * t;
          e.set(e.t, e.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        k = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        S = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        C = function (t, e, n) {
          return (t.style[e] = n);
        },
        A = function (t, e, n) {
          return t.style.setProperty(e, n);
        },
        O = function (t, e, n) {
          return (t._gsap[e] = n);
        },
        E = function (t, e, n) {
          return (t._gsap.scaleX = t._gsap.scaleY = n);
        },
        D = function (t, e, n, i, r) {
          var o = t._gsap;
          (o.scaleX = o.scaleY = n), o.renderTransform(r, o);
        },
        M = function (t, e, n, i, r) {
          var o = t._gsap;
          (o[e] = n), o.renderTransform(r, o);
        },
        $ = "transform",
        P = $ + "Origin",
        j = function t(e, n) {
          var i = this,
            r = this.target,
            o = r.style,
            s = r._gsap;
          if (e in p && o) {
            if (((this.tfm = this.tfm || {}), "transform" === e))
              return b.transform.split(",").forEach(function (e) {
                return t.call(i, e, n);
              });
            if (
              (~(e = b[e] || e).indexOf(",")
                ? e.split(",").forEach(function (t) {
                    return (i.tfm[t] = K(r, t));
                  })
                : (this.tfm[e] = s.x ? s[e] : K(r, e)),
              e === P && (this.tfm.zOrigin = s.zOrigin),
              this.props.indexOf($) >= 0)
            )
              return;
            s.svg &&
              ((this.svgo = r.getAttribute("data-svg-origin")),
              this.props.push(P, n, "")),
              (e = $);
          }
          (o || n) && this.props.push(e, n, o[e]);
        },
        L = function (t) {
          t.translate &&
            (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"));
        },
        N = function () {
          var t,
            e,
            n = this.props,
            i = this.target,
            r = i.style,
            o = i._gsap;
          for (t = 0; t < n.length; t += 3)
            n[t + 1]
              ? (i[n[t]] = n[t + 2])
              : n[t + 2]
              ? (r[n[t]] = n[t + 2])
              : r.removeProperty(
                  "--" === n[t].substr(0, 2)
                    ? n[t]
                    : n[t].replace(v, "-$1").toLowerCase()
                );
          if (this.tfm) {
            for (e in this.tfm) o[e] = this.tfm[e];
            o.svg &&
              (o.renderTransform(),
              i.setAttribute("data-svg-origin", this.svgo || "")),
              ((t = u()) && t.isStart) ||
                r[$] ||
                (L(r),
                o.zOrigin &&
                  r[P] &&
                  ((r[P] += " " + o.zOrigin + "px"),
                  (o.zOrigin = 0),
                  o.renderTransform()),
                (o.uncache = 1));
          }
        },
        R = function (t, e) {
          var n = { target: t, props: [], revert: N, save: j };
          return (
            t._gsap || d.y.core.getCache(t),
            e &&
              e.split(",").forEach(function (t) {
                return n.save(t);
              }),
            n
          );
        },
        H = function (t, e) {
          var n = r.createElementNS
            ? r.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                t
              )
            : r.createElement(t);
          return n && n.style ? n : r.createElement(t);
        },
        z = function t(e, n, i) {
          var r = getComputedStyle(e);
          return (
            r[n] ||
            r.getPropertyValue(n.replace(v, "-$1").toLowerCase()) ||
            r.getPropertyValue(n) ||
            (!i && t(e, I(n) || n, 1)) ||
            ""
          );
        },
        q = "O,Moz,ms,Ms,Webkit".split(","),
        I = function (t, e, n) {
          var i = (e || a).style,
            r = 5;
          if (t in i && !n) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            r-- && !(q[r] + t in i);

          );
          return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? q[r] : "") + t;
        },
        F = function () {
          "undefined" != typeof window &&
            window.document &&
            ((i = window),
            (r = i.document),
            (o = r.documentElement),
            (a = H("div") || { style: {} }),
            H("div"),
            ($ = I($)),
            (P = $ + "Origin"),
            (a.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (c = !!I("perspective")),
            (u = d.y.core.reverting),
            (s = 1));
        },
        B = function t(e) {
          var n,
            i = H(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            r = this.parentNode,
            s = this.nextSibling,
            a = this.style.cssText;
          if (
            (o.appendChild(i),
            i.appendChild(this),
            (this.style.display = "block"),
            e)
          )
            try {
              (n = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (t) {}
          else this._gsapBBox && (n = this._gsapBBox());
          return (
            r && (s ? r.insertBefore(this, s) : r.appendChild(this)),
            o.removeChild(i),
            (this.style.cssText = a),
            n
          );
        },
        W = function (t, e) {
          for (var n = e.length; n--; )
            if (t.hasAttribute(e[n])) return t.getAttribute(e[n]);
        },
        X = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (n) {
            e = B.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === B ||
              (e = B.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +W(t, ["x", "cx", "x1"]) || 0,
                  y: +W(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        Y = function (t) {
          return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !X(t));
        },
        U = function (t, e) {
          if (e) {
            var n,
              i = t.style;
            e in p && e !== P && (e = $),
              i.removeProperty
                ? (("ms" !== (n = e.substr(0, 2)) &&
                    "webkit" !== e.substr(0, 6)) ||
                    (e = "-" + e),
                  i.removeProperty(
                    "--" === n ? e : e.replace(v, "-$1").toLowerCase()
                  ))
                : i.removeAttribute(e);
          }
        },
        V = function (t, e, n, i, r, o) {
          var s = new d.b(t._pt, e, n, 0, 1, o ? S : k);
          return (t._pt = s), (s.b = i), (s.e = r), t._props.push(n), s;
        },
        G = { deg: 1, rad: 1, turn: 1 },
        Q = { grid: 1, flex: 1 },
        J = function t(e, n, i, o) {
          var s,
            l,
            u,
            c,
            f = parseFloat(i) || 0,
            h = (i + "").trim().substr((f + "").length) || "px",
            g = a.style,
            v = m.test(n),
            y = "svg" === e.tagName.toLowerCase(),
            b = (y ? "client" : "offset") + (v ? "Width" : "Height"),
            _ = "px" === o,
            w = "%" === o;
          if (o === h || !f || G[o] || G[h]) return f;
          if (
            ("px" !== h && !_ && (f = t(e, n, i, "px")),
            (c = e.getCTM && Y(e)),
            (w || "%" === h) && (p[n] || ~n.indexOf("adius")))
          )
            return (
              (s = c ? e.getBBox()[v ? "width" : "height"] : e[b]),
              Object(d.u)(w ? (f / s) * 100 : (f / 100) * s)
            );
          if (
            ((g[v ? "width" : "height"] = 100 + (_ ? h : o)),
            (l =
              ~n.indexOf("adius") || ("em" === o && e.appendChild && !y)
                ? e
                : e.parentNode),
            c && (l = (e.ownerSVGElement || {}).parentNode),
            (l && l !== r && l.appendChild) || (l = r.body),
            (u = l._gsap) &&
              w &&
              u.width &&
              v &&
              u.time === d.w.time &&
              !u.uncache)
          )
            return Object(d.u)((f / u.width) * 100);
          if (!w || ("height" !== n && "width" !== n))
            (w || "%" === h) &&
              !Q[z(l, "display")] &&
              (g.position = z(e, "position")),
              l === e && (g.position = "static"),
              l.appendChild(a),
              (s = a[b]),
              l.removeChild(a),
              (g.position = "absolute");
          else {
            var x = e.style[n];
            (e.style[n] = 100 + o), (s = e[b]), x ? (e.style[n] = x) : U(e, n);
          }
          return (
            v &&
              w &&
              (((u = Object(d.h)(l)).time = d.w.time), (u.width = l[b])),
            Object(d.u)(_ ? (s * f) / 100 : s && f ? (100 / s) * f : 0)
          );
        },
        K = function (t, e, n, i) {
          var r;
          return (
            s || F(),
            e in b &&
              "transform" !== e &&
              ~(e = b[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            p[e] && "transform" !== e
              ? ((r = ut(t, i)),
                (r =
                  "transformOrigin" !== e
                    ? r[e]
                    : r.svg
                    ? r.origin
                    : ct(z(t, P)) + " " + r.zOrigin + "px"))
              : (!(r = t.style[e]) ||
                  "auto" === r ||
                  i ||
                  ~(r + "").indexOf("calc(")) &&
                (r =
                  (nt[e] && nt[e](t, e, n)) ||
                  z(t, e) ||
                  Object(d.i)(t, e) ||
                  ("opacity" === e ? 1 : 0)),
            n && !~(r + "").trim().indexOf(" ") ? J(t, e, r, n) + n : r
          );
        },
        Z = function (t, e, n, i) {
          if (!n || "none" === n) {
            var r = I(e, t, 1),
              o = r && z(t, r, 1);
            o && o !== n
              ? ((e = r), (n = o))
              : "borderColor" === e && (n = z(t, "borderTopColor"));
          }
          var s,
            a,
            l,
            u,
            c,
            p,
            f,
            h,
            g,
            v,
            m,
            y = new d.b(this._pt, t.style, e, 0, 1, d.s),
            b = 0,
            _ = 0;
          if (
            ((y.b = n),
            (y.e = i),
            (n += ""),
            "auto" === (i += "") &&
              ((p = t.style[e]),
              (t.style[e] = i),
              (i = z(t, e) || i),
              p ? (t.style[e] = p) : U(t, e)),
            (s = [n, i]),
            Object(d.e)(s),
            (i = s[1]),
            (l = (n = s[0]).match(d.o) || []),
            (i.match(d.o) || []).length)
          ) {
            for (; (a = d.o.exec(i)); )
              (f = a[0]),
                (g = i.substring(b, a.index)),
                c
                  ? (c = (c + 1) % 5)
                  : ("rgba(" !== g.substr(-5) && "hsla(" !== g.substr(-5)) ||
                    (c = 1),
                f !== (p = l[_++] || "") &&
                  ((u = parseFloat(p) || 0),
                  (m = p.substr((u + "").length)),
                  "=" === f.charAt(1) && (f = Object(d.p)(u, f) + m),
                  (h = parseFloat(f)),
                  (v = f.substr((h + "").length)),
                  (b = d.o.lastIndex - v.length),
                  v ||
                    ((v = v || d.f.units[e] || m),
                    b === i.length && ((i += v), (y.e += v))),
                  m !== v && (u = J(t, e, p, v) || 0),
                  (y._pt = {
                    _next: y._pt,
                    p: g || 1 === _ ? g : ",",
                    s: u,
                    c: h - u,
                    m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            y.c = b < i.length ? i.substring(b, i.length) : "";
          } else y.r = "display" === e && "none" === i ? S : k;
          return d.r.test(i) && (y.e = 0), (this._pt = y), y;
        },
        tt = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        et = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var n,
              i,
              r,
              o = e.t,
              s = o.style,
              a = e.u,
              l = o._gsap;
            if ("all" === a || !0 === a) (s.cssText = ""), (i = 1);
            else
              for (r = (a = a.split(",")).length; --r > -1; )
                (n = a[r]),
                  p[n] && ((i = 1), (n = "transformOrigin" === n ? P : $)),
                  U(o, n);
            i &&
              (U(o, $),
              l &&
                (l.svg && o.removeAttribute("transform"),
                ut(o, 1),
                (l.uncache = 1),
                L(s)));
          }
        },
        nt = {
          clearProps: function (t, e, n, i, r) {
            if ("isFromStart" !== r.data) {
              var o = (t._pt = new d.b(t._pt, e, n, 0, 0, et));
              return (
                (o.u = i), (o.pr = -10), (o.tween = r), t._props.push(n), 1
              );
            }
          },
        },
        it = [1, 0, 0, 1, 0, 0],
        rt = {},
        ot = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        st = function (t) {
          var e = z(t, $);
          return ot(e) ? it : e.substr(7).match(d.n).map(d.u);
        },
        at = function (t, e) {
          var n,
            i,
            r,
            s,
            a = t._gsap || Object(d.h)(t),
            l = t.style,
            u = st(t);
          return a.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (u = [
                (r = t.transform.baseVal.consolidate().matrix).a,
                r.b,
                r.c,
                r.d,
                r.e,
                r.f,
              ]).join(",")
              ? it
              : u
            : (u !== it ||
                t.offsetParent ||
                t === o ||
                a.svg ||
                ((r = l.display),
                (l.display = "block"),
                ((n = t.parentNode) && t.offsetParent) ||
                  ((s = 1), (i = t.nextElementSibling), o.appendChild(t)),
                (u = st(t)),
                r ? (l.display = r) : U(t, "display"),
                s &&
                  (i
                    ? n.insertBefore(t, i)
                    : n
                    ? n.appendChild(t)
                    : o.removeChild(t))),
              e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
        },
        lt = function (t, e, n, i, r, o) {
          var s,
            a,
            l,
            u = t._gsap,
            c = r || at(t, !0),
            d = u.xOrigin || 0,
            p = u.yOrigin || 0,
            f = u.xOffset || 0,
            h = u.yOffset || 0,
            g = c[0],
            v = c[1],
            m = c[2],
            y = c[3],
            b = c[4],
            _ = c[5],
            w = e.split(" "),
            x = parseFloat(w[0]) || 0,
            T = parseFloat(w[1]) || 0;
          n
            ? c !== it &&
              (a = g * y - v * m) &&
              ((l = x * (-v / a) + T * (g / a) - (g * _ - v * b) / a),
              (x = x * (y / a) + T * (-m / a) + (m * _ - y * b) / a),
              (T = l))
            : ((x =
                (s = X(t)).x + (~w[0].indexOf("%") ? (x / 100) * s.width : x)),
              (T =
                s.y +
                (~(w[1] || w[0]).indexOf("%") ? (T / 100) * s.height : T))),
            i || (!1 !== i && u.smooth)
              ? ((b = x - d),
                (_ = T - p),
                (u.xOffset = f + (b * g + _ * m) - b),
                (u.yOffset = h + (b * v + _ * y) - _))
              : (u.xOffset = u.yOffset = 0),
            (u.xOrigin = x),
            (u.yOrigin = T),
            (u.smooth = !!i),
            (u.origin = e),
            (u.originIsAbsolute = !!n),
            (t.style[P] = "0px 0px"),
            o &&
              (V(o, u, "xOrigin", d, x),
              V(o, u, "yOrigin", p, T),
              V(o, u, "xOffset", f, u.xOffset),
              V(o, u, "yOffset", h, u.yOffset)),
            t.setAttribute("data-svg-origin", x + " " + T);
        },
        ut = function (t, e) {
          var n = t._gsap || new d.a(t);
          if ("x" in n && !e && !n.uncache) return n;
          var i,
            r,
            o,
            s,
            a,
            l,
            u,
            p,
            v,
            m,
            y,
            b,
            _,
            w,
            x,
            T,
            k,
            S,
            C,
            A,
            O,
            E,
            D,
            M,
            j,
            L,
            N,
            R,
            H,
            q,
            I,
            F,
            B = t.style,
            W = n.scaleX < 0,
            X = getComputedStyle(t),
            U = z(t, P) || "0";
          return (
            (i = r = o = l = u = p = v = m = y = 0),
            (s = a = 1),
            (n.svg = !(!t.getCTM || !Y(t))),
            X.translate &&
              (("none" === X.translate &&
                "none" === X.scale &&
                "none" === X.rotate) ||
                (B[$] =
                  ("none" !== X.translate
                    ? "translate3d(" +
                      (X.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                      ") "
                    : "") +
                  ("none" !== X.rotate ? "rotate(" + X.rotate + ") " : "") +
                  ("none" !== X.scale
                    ? "scale(" + X.scale.split(" ").join(",") + ") "
                    : "") +
                  ("none" !== X[$] ? X[$] : "")),
              (B.scale = B.rotate = B.translate = "none")),
            (w = at(t, n.svg)),
            n.svg &&
              (n.uncache
                ? ((j = t.getBBox()),
                  (U = n.xOrigin - j.x + "px " + (n.yOrigin - j.y) + "px"),
                  (M = ""))
                : (M = !e && t.getAttribute("data-svg-origin")),
              lt(t, M || U, !!M || n.originIsAbsolute, !1 !== n.smooth, w)),
            (b = n.xOrigin || 0),
            (_ = n.yOrigin || 0),
            w !== it &&
              ((S = w[0]),
              (C = w[1]),
              (A = w[2]),
              (O = w[3]),
              (i = E = w[4]),
              (r = D = w[5]),
              6 === w.length
                ? ((s = Math.sqrt(S * S + C * C)),
                  (a = Math.sqrt(O * O + A * A)),
                  (l = S || C ? g(C, S) * f : 0),
                  (v = A || O ? g(A, O) * f + l : 0) &&
                    (a *= Math.abs(Math.cos(v * h))),
                  n.svg &&
                    ((i -= b - (b * S + _ * A)), (r -= _ - (b * C + _ * O))))
                : ((F = w[6]),
                  (q = w[7]),
                  (N = w[8]),
                  (R = w[9]),
                  (H = w[10]),
                  (I = w[11]),
                  (i = w[12]),
                  (r = w[13]),
                  (o = w[14]),
                  (u = (x = g(F, H)) * f),
                  x &&
                    ((M = E * (T = Math.cos(-x)) + N * (k = Math.sin(-x))),
                    (j = D * T + R * k),
                    (L = F * T + H * k),
                    (N = E * -k + N * T),
                    (R = D * -k + R * T),
                    (H = F * -k + H * T),
                    (I = q * -k + I * T),
                    (E = M),
                    (D = j),
                    (F = L)),
                  (p = (x = g(-A, H)) * f),
                  x &&
                    ((T = Math.cos(-x)),
                    (I = O * (k = Math.sin(-x)) + I * T),
                    (S = M = S * T - N * k),
                    (C = j = C * T - R * k),
                    (A = L = A * T - H * k)),
                  (l = (x = g(C, S)) * f),
                  x &&
                    ((M = S * (T = Math.cos(x)) + C * (k = Math.sin(x))),
                    (j = E * T + D * k),
                    (C = C * T - S * k),
                    (D = D * T - E * k),
                    (S = M),
                    (E = j)),
                  u &&
                    Math.abs(u) + Math.abs(l) > 359.9 &&
                    ((u = l = 0), (p = 180 - p)),
                  (s = Object(d.u)(Math.sqrt(S * S + C * C + A * A))),
                  (a = Object(d.u)(Math.sqrt(D * D + F * F))),
                  (x = g(E, D)),
                  (v = Math.abs(x) > 2e-4 ? x * f : 0),
                  (y = I ? 1 / (I < 0 ? -I : I) : 0)),
              n.svg &&
                ((M = t.getAttribute("transform")),
                (n.forceCSS = t.setAttribute("transform", "") || !ot(z(t, $))),
                M && t.setAttribute("transform", M))),
            Math.abs(v) > 90 &&
              Math.abs(v) < 270 &&
              (W
                ? ((s *= -1),
                  (v += l <= 0 ? 180 : -180),
                  (l += l <= 0 ? 180 : -180))
                : ((a *= -1), (v += v <= 0 ? 180 : -180))),
            (e = e || n.uncache),
            (n.x =
              i -
              ((n.xPercent =
                i &&
                ((!e && n.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
                ? (t.offsetWidth * n.xPercent) / 100
                : 0) +
              "px"),
            (n.y =
              r -
              ((n.yPercent =
                r &&
                ((!e && n.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-r)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * n.yPercent) / 100
                : 0) +
              "px"),
            (n.z = o + "px"),
            (n.scaleX = Object(d.u)(s)),
            (n.scaleY = Object(d.u)(a)),
            (n.rotation = Object(d.u)(l) + "deg"),
            (n.rotationX = Object(d.u)(u) + "deg"),
            (n.rotationY = Object(d.u)(p) + "deg"),
            (n.skewX = v + "deg"),
            (n.skewY = m + "deg"),
            (n.transformPerspective = y + "px"),
            (n.zOrigin =
              parseFloat(U.split(" ")[2]) || (!e && n.zOrigin) || 0) &&
              (B[P] = ct(U)),
            (n.xOffset = n.yOffset = 0),
            (n.force3D = d.f.force3D),
            (n.renderTransform = n.svg ? ht : c ? ft : pt),
            (n.uncache = 0),
            n
          );
        },
        ct = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        dt = function (t, e, n) {
          var i = Object(d.x)(e);
          return (
            Object(d.u)(parseFloat(e) + parseFloat(J(t, "x", n + "px", i))) + i
          );
        },
        pt = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            ft(t, e);
        },
        ft = function (t, e) {
          var n = e || this,
            i = n.xPercent,
            r = n.yPercent,
            o = n.x,
            s = n.y,
            a = n.z,
            l = n.rotation,
            u = n.rotationY,
            c = n.rotationX,
            d = n.skewX,
            p = n.skewY,
            f = n.scaleX,
            g = n.scaleY,
            v = n.transformPerspective,
            m = n.force3D,
            y = n.target,
            b = n.zOrigin,
            _ = "",
            w = ("auto" === m && t && 1 !== t) || !0 === m;
          if (b && ("0deg" !== c || "0deg" !== u)) {
            var x,
              T = parseFloat(u) * h,
              k = Math.sin(T),
              S = Math.cos(T);
            (T = parseFloat(c) * h),
              (x = Math.cos(T)),
              (o = dt(y, o, k * x * -b)),
              (s = dt(y, s, -Math.sin(T) * -b)),
              (a = dt(y, a, S * x * -b + b));
          }
          "0px" !== v && (_ += "perspective(" + v + ") "),
            (i || r) && (_ += "translate(" + i + "%, " + r + "%) "),
            (w || "0px" !== o || "0px" !== s || "0px" !== a) &&
              (_ +=
                "0px" !== a || w
                  ? "translate3d(" + o + ", " + s + ", " + a + ") "
                  : "translate(" + o + ", " + s + ") "),
            "0deg" !== l && (_ += "rotate(" + l + ") "),
            "0deg" !== u && (_ += "rotateY(" + u + ") "),
            "0deg" !== c && (_ += "rotateX(" + c + ") "),
            ("0deg" === d && "0deg" === p) ||
              (_ += "skew(" + d + ", " + p + ") "),
            (1 === f && 1 === g) || (_ += "scale(" + f + ", " + g + ") "),
            (y.style[$] = _ || "translate(0, 0)");
        },
        ht = function (t, e) {
          var n,
            i,
            r,
            o,
            s,
            a = e || this,
            l = a.xPercent,
            u = a.yPercent,
            c = a.x,
            p = a.y,
            f = a.rotation,
            g = a.skewX,
            v = a.skewY,
            m = a.scaleX,
            y = a.scaleY,
            b = a.target,
            _ = a.xOrigin,
            w = a.yOrigin,
            x = a.xOffset,
            T = a.yOffset,
            k = a.forceCSS,
            S = parseFloat(c),
            C = parseFloat(p);
          (f = parseFloat(f)),
            (g = parseFloat(g)),
            (v = parseFloat(v)) && ((g += v = parseFloat(v)), (f += v)),
            f || g
              ? ((f *= h),
                (g *= h),
                (n = Math.cos(f) * m),
                (i = Math.sin(f) * m),
                (r = Math.sin(f - g) * -y),
                (o = Math.cos(f - g) * y),
                g &&
                  ((v *= h),
                  (s = Math.tan(g - v)),
                  (r *= s = Math.sqrt(1 + s * s)),
                  (o *= s),
                  v &&
                    ((s = Math.tan(v)),
                    (n *= s = Math.sqrt(1 + s * s)),
                    (i *= s))),
                (n = Object(d.u)(n)),
                (i = Object(d.u)(i)),
                (r = Object(d.u)(r)),
                (o = Object(d.u)(o)))
              : ((n = m), (o = y), (i = r = 0)),
            ((S && !~(c + "").indexOf("px")) ||
              (C && !~(p + "").indexOf("px"))) &&
              ((S = J(b, "x", c, "px")), (C = J(b, "y", p, "px"))),
            (_ || w || x || T) &&
              ((S = Object(d.u)(S + _ - (_ * n + w * r) + x)),
              (C = Object(d.u)(C + w - (_ * i + w * o) + T))),
            (l || u) &&
              ((s = b.getBBox()),
              (S = Object(d.u)(S + (l / 100) * s.width)),
              (C = Object(d.u)(C + (u / 100) * s.height))),
            (s =
              "matrix(" +
              n +
              "," +
              i +
              "," +
              r +
              "," +
              o +
              "," +
              S +
              "," +
              C +
              ")"),
            b.setAttribute("transform", s),
            k && (b.style[$] = s);
        },
        gt = function (t, e, n, i, r) {
          var o,
            s,
            a = Object(d.k)(r),
            l = parseFloat(r) * (a && ~r.indexOf("rad") ? f : 1) - i,
            u = i + l + "deg";
          return (
            a &&
              ("short" === (o = r.split("_")[1]) &&
                (l %= 360) !== l % 180 &&
                (l += l < 0 ? 360 : -360),
              "cw" === o && l < 0
                ? (l = ((l + 36e9) % 360) - 360 * ~~(l / 360))
                : "ccw" === o &&
                  l > 0 &&
                  (l = ((l - 36e9) % 360) - 360 * ~~(l / 360))),
            (t._pt = s = new d.b(t._pt, e, n, i, l, w)),
            (s.e = u),
            (s.u = "deg"),
            t._props.push(n),
            s
          );
        },
        vt = function (t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        },
        mt = function (t, e, n) {
          var i,
            r,
            o,
            s,
            a,
            l,
            u,
            c = vt({}, n._gsap),
            f = n.style;
          for (r in (c.svg
            ? ((o = n.getAttribute("transform")),
              n.setAttribute("transform", ""),
              (f[$] = e),
              (i = ut(n, 1)),
              U(n, $),
              n.setAttribute("transform", o))
            : ((o = getComputedStyle(n)[$]),
              (f[$] = e),
              (i = ut(n, 1)),
              (f[$] = o)),
          p))
            (o = c[r]) !== (s = i[r]) &&
              "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 &&
              ((a =
                Object(d.x)(o) !== (u = Object(d.x)(s))
                  ? J(n, r, o, u)
                  : parseFloat(o)),
              (l = parseFloat(s)),
              (t._pt = new d.b(t._pt, i, r, a, l - a, _)),
              (t._pt.u = u || 0),
              t._props.push(r));
          vt(i, c);
        };
      /*!
       * CSSPlugin 3.12.5
       * https://gsap.com
       *
       * Copyright 2008-2024, GreenSock. All rights reserved.
       * Subject to the terms at https://gsap.com/standard-license or for
       * Club GSAP members, the agreement issued with that membership.
       * @author: Jack Doyle, jack@greensock.com
       */ Object(d.g)("padding,margin,Width,Radius", function (t, e) {
        var n = "Top",
          i = "Right",
          r = "Bottom",
          o = "Left",
          s = (e < 3 ? [n, i, r, o] : [n + o, n + i, r + i, r + o]).map(
            function (n) {
              return e < 2 ? t + n : "border" + n + t;
            }
          );
        nt[e > 1 ? "border" + t : t] = function (t, e, n, i, r) {
          var o, a;
          if (arguments.length < 4)
            return (
              (o = s.map(function (e) {
                return K(t, e, n);
              })),
              5 === (a = o.join(" ")).split(o[0]).length ? o[0] : a
            );
          (o = (i + "").split(" ")),
            (a = {}),
            s.forEach(function (t, e) {
              return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
            }),
            t.init(e, a, r);
        };
      });
      var yt,
        bt,
        _t = {
          name: "css",
          register: F,
          targetTest: function (t) {
            return t.style && t.nodeType;
          },
          init: function (t, e, n, i, r) {
            var o,
              a,
              l,
              u,
              c,
              f,
              h,
              g,
              v,
              m,
              w,
              k,
              S,
              C,
              A,
              O,
              E,
              D,
              M,
              j,
              L = this._props,
              N = t.style,
              H = n.vars.startAt;
            for (h in (s || F(),
            (this.styles = this.styles || R(t)),
            (O = this.styles.props),
            (this.tween = n),
            e))
              if (
                "autoRound" !== h &&
                ((a = e[h]), !d.q[h] || !Object(d.c)(h, e, n, i, t, r))
              )
                if (
                  ((c = typeof a),
                  (f = nt[h]),
                  "function" === c && (c = typeof (a = a.call(n, i, t, r))),
                  "string" === c &&
                    ~a.indexOf("random(") &&
                    (a = Object(d.t)(a)),
                  f)
                )
                  f(this, t, h, a, n) && (A = 1);
                else if ("--" === h.substr(0, 2))
                  (o = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
                    (a += ""),
                    (d.d.lastIndex = 0),
                    d.d.test(o) || ((g = Object(d.x)(o)), (v = Object(d.x)(a))),
                    v ? g !== v && (o = J(t, h, o, v) + v) : g && (a += g),
                    this.add(N, "setProperty", o, a, i, r, 0, 0, h),
                    L.push(h),
                    O.push(h, 0, N[h]);
                else if ("undefined" !== c) {
                  if (
                    (H && h in H
                      ? ((o =
                          "function" == typeof H[h]
                            ? H[h].call(n, i, t, r)
                            : H[h]),
                        Object(d.k)(o) &&
                          ~o.indexOf("random(") &&
                          (o = Object(d.t)(o)),
                        Object(d.x)(o + "") ||
                          "auto" === o ||
                          (o += d.f.units[h] || Object(d.x)(K(t, h)) || ""),
                        "=" === (o + "").charAt(1) && (o = K(t, h)))
                      : (o = K(t, h)),
                    (u = parseFloat(o)),
                    (m =
                      "string" === c &&
                      "=" === a.charAt(1) &&
                      a.substr(0, 2)) && (a = a.substr(2)),
                    (l = parseFloat(a)),
                    h in b &&
                      ("autoAlpha" === h &&
                        (1 === u &&
                          "hidden" === K(t, "visibility") &&
                          l &&
                          (u = 0),
                        O.push("visibility", 0, N.visibility),
                        V(
                          this,
                          N,
                          "visibility",
                          u ? "inherit" : "hidden",
                          l ? "inherit" : "hidden",
                          !l
                        )),
                      "scale" !== h &&
                        "transform" !== h &&
                        ~(h = b[h]).indexOf(",") &&
                        (h = h.split(",")[0])),
                    (w = h in p))
                  )
                    if (
                      (this.styles.save(h),
                      k ||
                        (((S = t._gsap).renderTransform && !e.parseTransform) ||
                          ut(t, e.parseTransform),
                        (C = !1 !== e.smoothOrigin && S.smooth),
                        ((k = this._pt = new d.b(
                          this._pt,
                          N,
                          $,
                          0,
                          1,
                          S.renderTransform,
                          S,
                          0,
                          -1
                        )).dep = 1)),
                      "scale" === h)
                    )
                      (this._pt = new d.b(
                        this._pt,
                        S,
                        "scaleY",
                        S.scaleY,
                        (m ? Object(d.p)(S.scaleY, m + l) : l) - S.scaleY || 0,
                        _
                      )),
                        (this._pt.u = 0),
                        L.push("scaleY", h),
                        (h += "X");
                    else {
                      if ("transformOrigin" === h) {
                        O.push(P, 0, N[P]),
                          (D = void 0),
                          (M = void 0),
                          (j = void 0),
                          (D = (E = a).split(" ")),
                          (M = D[0]),
                          (j = D[1] || "50%"),
                          ("top" !== M &&
                            "bottom" !== M &&
                            "left" !== j &&
                            "right" !== j) ||
                            ((E = M), (M = j), (j = E)),
                          (D[0] = tt[M] || M),
                          (D[1] = tt[j] || j),
                          (a = D.join(" ")),
                          S.svg
                            ? lt(t, a, 0, C, 0, this)
                            : ((v = parseFloat(a.split(" ")[2]) || 0) !==
                                S.zOrigin &&
                                V(this, S, "zOrigin", S.zOrigin, v),
                              V(this, N, h, ct(o), ct(a)));
                        continue;
                      }
                      if ("svgOrigin" === h) {
                        lt(t, a, 1, C, 0, this);
                        continue;
                      }
                      if (h in rt) {
                        gt(this, S, h, u, m ? Object(d.p)(u, m + a) : a);
                        continue;
                      }
                      if ("smoothOrigin" === h) {
                        V(this, S, "smooth", S.smooth, a);
                        continue;
                      }
                      if ("force3D" === h) {
                        S[h] = a;
                        continue;
                      }
                      if ("transform" === h) {
                        mt(this, a, t);
                        continue;
                      }
                    }
                  else h in N || (h = I(h) || h);
                  if (
                    w ||
                    ((l || 0 === l) && (u || 0 === u) && !y.test(a) && h in N)
                  )
                    l || (l = 0),
                      (g = (o + "").substr((u + "").length)) !==
                        (v =
                          Object(d.x)(a) ||
                          (h in d.f.units ? d.f.units[h] : g)) &&
                        (u = J(t, h, o, v)),
                      (this._pt = new d.b(
                        this._pt,
                        w ? S : N,
                        h,
                        u,
                        (m ? Object(d.p)(u, m + l) : l) - u,
                        w ||
                        ("px" !== v && "zIndex" !== h) ||
                        !1 === e.autoRound
                          ? _
                          : T
                      )),
                      (this._pt.u = v || 0),
                      g !== v &&
                        "%" !== v &&
                        ((this._pt.b = o), (this._pt.r = x));
                  else if (h in N) Z.call(this, t, h, o, m ? m + a : a);
                  else if (h in t)
                    this.add(t, h, o || t[h], m ? m + a : a, i, r);
                  else if ("parseTransform" !== h) {
                    Object(d.m)(h, a);
                    continue;
                  }
                  w || (h in N ? O.push(h, 0, N[h]) : O.push(h, 1, o || t[h])),
                    L.push(h);
                }
            A && Object(d.v)(this);
          },
          render: function (t, e) {
            if (e.tween._time || !u())
              for (var n = e._pt; n; ) n.r(t, n.d), (n = n._next);
            else e.styles.revert();
          },
          get: K,
          aliases: b,
          getSetter: function (t, e, n) {
            var i = b[e];
            return (
              i && i.indexOf(",") < 0 && (e = i),
              e in p && e !== P && (t._gsap.x || K(t, "x"))
                ? n && l === n
                  ? "scale" === e
                    ? E
                    : O
                  : (l = n || {}) && ("scale" === e ? D : M)
                : t.style && !Object(d.l)(t.style[e])
                ? C
                : ~e.indexOf("-")
                ? A
                : Object(d.j)(t, e)
            );
          },
          core: { _removeProperty: U, _getMatrix: at },
        };
      (d.y.utils.checkPrefix = I),
        (d.y.core.getStyleSaver = R),
        (yt = "rotation,rotationX,rotationY,skewX,skewY"),
        (bt = Object(d.g)(
          "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," +
            yt +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (t) {
            p[t] = 1;
          }
        )),
        Object(d.g)(yt, function (t) {
          (d.f.units[t] = "deg"), (rt[t] = 1);
        }),
        (b[bt[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + yt),
        Object(d.g)(
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
          function (t) {
            var e = t.split(":");
            b[e[1]] = bt[e[0]];
          }
        ),
        Object(d.g)(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            d.f.units[t] = "px";
          }
        ),
        d.y.registerPlugin(_t);
      var wt = d.y.registerPlugin(_t) || d.y;
      wt.core.Tween;
    },
    function (t, e, n) {
      "use strict";
      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      n.d(e, "a", function () {
        return Ue;
      });
      /*!
       * Observer 3.12.5
       * https://gsap.com
       *
       * @license Copyright 2008-2024, GreenSock. All rights reserved.
       * Subject to the terms at https://gsap.com/standard-license or for
       * Club GSAP members, the agreement issued with that membership.
       * @author: Jack Doyle, jack@greensock.com
       */
      var r,
        o,
        s,
        a,
        l,
        u,
        c,
        d,
        p,
        f,
        h,
        g,
        v,
        m = function () {
          return (
            r ||
            ("undefined" != typeof window &&
              (r = window.gsap) &&
              r.registerPlugin &&
              r)
          );
        },
        y = 1,
        b = [],
        _ = [],
        w = [],
        x = Date.now,
        T = function (t, e) {
          return e;
        },
        k = function (t, e) {
          return ~w.indexOf(t) && w[w.indexOf(t) + 1][e];
        },
        S = function (t) {
          return !!~f.indexOf(t);
        },
        C = function (t, e, n, i, r) {
          return t.addEventListener(e, n, { passive: !1 !== i, capture: !!r });
        },
        A = function (t, e, n, i) {
          return t.removeEventListener(e, n, !!i);
        },
        O = function () {
          return (h && h.isPressed) || _.cache++;
        },
        E = function (t, e) {
          var n = function n(i) {
            if (i || 0 === i) {
              y && (s.history.scrollRestoration = "manual");
              var r = h && h.isPressed;
              (i = n.v = Math.round(i) || (h && h.iOS ? 1 : 0)),
                t(i),
                (n.cacheID = _.cache),
                r && T("ss", i);
            } else
              (e || _.cache !== n.cacheID || T("ref")) &&
                ((n.cacheID = _.cache), (n.v = t()));
            return n.v + n.offset;
          };
          return (n.offset = 0), t && n;
        },
        D = {
          s: "scrollLeft",
          p: "left",
          p2: "Left",
          os: "right",
          os2: "Right",
          d: "width",
          d2: "Width",
          a: "x",
          sc: E(function (t) {
            return arguments.length
              ? s.scrollTo(t, M.sc())
              : s.pageXOffset ||
                  a.scrollLeft ||
                  l.scrollLeft ||
                  u.scrollLeft ||
                  0;
          }),
        },
        M = {
          s: "scrollTop",
          p: "top",
          p2: "Top",
          os: "bottom",
          os2: "Bottom",
          d: "height",
          d2: "Height",
          a: "y",
          op: D,
          sc: E(function (t) {
            return arguments.length
              ? s.scrollTo(D.sc(), t)
              : s.pageYOffset || a.scrollTop || l.scrollTop || u.scrollTop || 0;
          }),
        },
        $ = function (t, e) {
          return (
            ((e && e._ctx && e._ctx.selector) || r.utils.toArray)(t)[0] ||
            ("string" == typeof t && !1 !== r.config().nullTargetWarn
              ? console.warn("Element not found:", t)
              : null)
          );
        },
        P = function (t, e) {
          var n = e.s,
            i = e.sc;
          S(t) && (t = a.scrollingElement || l);
          var o = _.indexOf(t),
            s = i === M.sc ? 1 : 2;
          !~o && (o = _.push(t) - 1), _[o + s] || C(t, "scroll", O);
          var u = _[o + s],
            c =
              u ||
              (_[o + s] =
                E(k(t, n), !0) ||
                (S(t)
                  ? i
                  : E(function (e) {
                      return arguments.length ? (t[n] = e) : t[n];
                    })));
          return (
            (c.target = t),
            u || (c.smooth = "smooth" === r.getProperty(t, "scrollBehavior")),
            c
          );
        },
        j = function (t, e, n) {
          var i = t,
            r = t,
            o = x(),
            s = o,
            a = e || 50,
            l = Math.max(500, 3 * a),
            u = function (t, e) {
              var l = x();
              e || l - o > a
                ? ((r = i), (i = t), (s = o), (o = l))
                : n
                ? (i += t)
                : (i = r + ((t - r) / (l - s)) * (o - s));
            };
          return {
            update: u,
            reset: function () {
              (r = i = n ? 0 : i), (s = o = 0);
            },
            getVelocity: function (t) {
              var e = s,
                a = r,
                c = x();
              return (
                (t || 0 === t) && t !== i && u(t),
                o === s || c - s > l
                  ? 0
                  : ((i + (n ? a : -a)) / ((n ? c : o) - e)) * 1e3
              );
            },
          };
        },
        L = function (t, e) {
          return (
            e && !t._gsapAllow && t.preventDefault(),
            t.changedTouches ? t.changedTouches[0] : t
          );
        },
        N = function (t) {
          var e = Math.max.apply(Math, t),
            n = Math.min.apply(Math, t);
          return Math.abs(e) >= Math.abs(n) ? e : n;
        },
        R = function () {
          var t, e, n, i;
          (p = r.core.globals().ScrollTrigger) &&
            p.core &&
            ((t = p.core),
            (e = t.bridge || {}),
            (n = t._scrollers),
            (i = t._proxies),
            n.push.apply(n, _),
            i.push.apply(i, w),
            (_ = n),
            (w = i),
            (T = function (t, n) {
              return e[t](n);
            }));
        },
        H = function (t) {
          return (
            (r = t || m()),
            !o &&
              r &&
              "undefined" != typeof document &&
              document.body &&
              ((s = window),
              (a = document),
              (l = a.documentElement),
              (u = a.body),
              (f = [s, a, l, u]),
              r.utils.clamp,
              (v = r.core.context || function () {}),
              (d = "onpointerenter" in u ? "pointer" : "mouse"),
              (c = z.isTouch =
                s.matchMedia &&
                s.matchMedia("(hover: none), (pointer: coarse)").matches
                  ? 1
                  : "ontouchstart" in s ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0
                  ? 2
                  : 0),
              (g = z.eventTypes = ("ontouchstart" in l
                ? "touchstart,touchmove,touchcancel,touchend"
                : "onpointerdown" in l
                ? "pointerdown,pointermove,pointercancel,pointerup"
                : "mousedown,mousemove,mouseup,mouseup"
              ).split(",")),
              setTimeout(function () {
                return (y = 0);
              }, 500),
              R(),
              (o = 1)),
            o
          );
        };
      (D.op = M), (_.cache = 0);
      var z = (function () {
        function t(t) {
          this.init(t);
        }
        var e, n, f;
        return (
          (t.prototype.init = function (t) {
            o || H(r) || console.warn("Please gsap.registerPlugin(Observer)"),
              p || R();
            var e = t.tolerance,
              n = t.dragMinimum,
              i = t.type,
              f = t.target,
              m = t.lineHeight,
              y = t.debounce,
              _ = t.preventDefault,
              w = t.onStop,
              T = t.onStopDelay,
              k = t.ignore,
              E = t.wheelSpeed,
              z = t.event,
              q = t.onDragStart,
              I = t.onDragEnd,
              F = t.onDrag,
              B = t.onPress,
              W = t.onRelease,
              X = t.onRight,
              Y = t.onLeft,
              U = t.onUp,
              V = t.onDown,
              G = t.onChangeX,
              Q = t.onChangeY,
              J = t.onChange,
              K = t.onToggleX,
              Z = t.onToggleY,
              tt = t.onHover,
              et = t.onHoverEnd,
              nt = t.onMove,
              it = t.ignoreCheck,
              rt = t.isNormalizer,
              ot = t.onGestureStart,
              st = t.onGestureEnd,
              at = t.onWheel,
              lt = t.onEnable,
              ut = t.onDisable,
              ct = t.onClick,
              dt = t.scrollSpeed,
              pt = t.capture,
              ft = t.allowClicks,
              ht = t.lockAxis,
              gt = t.onLockAxis;
            (this.target = f = $(f) || l),
              (this.vars = t),
              k && (k = r.utils.toArray(k)),
              (e = e || 1e-9),
              (n = n || 0),
              (E = E || 1),
              (dt = dt || 1),
              (i = i || "wheel,touch,pointer"),
              (y = !1 !== y),
              m || (m = parseFloat(s.getComputedStyle(u).lineHeight) || 22);
            var vt,
              mt,
              yt,
              bt,
              _t,
              wt,
              xt,
              Tt = this,
              kt = 0,
              St = 0,
              Ct = t.passive || !_,
              At = P(f, D),
              Ot = P(f, M),
              Et = At(),
              Dt = Ot(),
              Mt =
                ~i.indexOf("touch") &&
                !~i.indexOf("pointer") &&
                "pointerdown" === g[0],
              $t = S(f),
              Pt = f.ownerDocument || a,
              jt = [0, 0, 0],
              Lt = [0, 0, 0],
              Nt = 0,
              Rt = function () {
                return (Nt = x());
              },
              Ht = function (t, e) {
                return (
                  ((Tt.event = t) && k && ~k.indexOf(t.target)) ||
                  (e && Mt && "touch" !== t.pointerType) ||
                  (it && it(t, e))
                );
              },
              zt = function () {
                var t = (Tt.deltaX = N(jt)),
                  n = (Tt.deltaY = N(Lt)),
                  i = Math.abs(t) >= e,
                  r = Math.abs(n) >= e;
                J && (i || r) && J(Tt, t, n, jt, Lt),
                  i &&
                    (X && Tt.deltaX > 0 && X(Tt),
                    Y && Tt.deltaX < 0 && Y(Tt),
                    G && G(Tt),
                    K && Tt.deltaX < 0 != kt < 0 && K(Tt),
                    (kt = Tt.deltaX),
                    (jt[0] = jt[1] = jt[2] = 0)),
                  r &&
                    (V && Tt.deltaY > 0 && V(Tt),
                    U && Tt.deltaY < 0 && U(Tt),
                    Q && Q(Tt),
                    Z && Tt.deltaY < 0 != St < 0 && Z(Tt),
                    (St = Tt.deltaY),
                    (Lt[0] = Lt[1] = Lt[2] = 0)),
                  (bt || yt) &&
                    (nt && nt(Tt), yt && (F(Tt), (yt = !1)), (bt = !1)),
                  wt && !(wt = !1) && gt && gt(Tt),
                  _t && (at(Tt), (_t = !1)),
                  (vt = 0);
              },
              qt = function (t, e, n) {
                (jt[n] += t),
                  (Lt[n] += e),
                  Tt._vx.update(t),
                  Tt._vy.update(e),
                  y ? vt || (vt = requestAnimationFrame(zt)) : zt();
              },
              It = function (t, e) {
                ht &&
                  !xt &&
                  ((Tt.axis = xt = Math.abs(t) > Math.abs(e) ? "x" : "y"),
                  (wt = !0)),
                  "y" !== xt && ((jt[2] += t), Tt._vx.update(t, !0)),
                  "x" !== xt && ((Lt[2] += e), Tt._vy.update(e, !0)),
                  y ? vt || (vt = requestAnimationFrame(zt)) : zt();
              },
              Ft = function (t) {
                if (!Ht(t, 1)) {
                  var e = (t = L(t, _)).clientX,
                    i = t.clientY,
                    r = e - Tt.x,
                    o = i - Tt.y,
                    s = Tt.isDragging;
                  (Tt.x = e),
                    (Tt.y = i),
                    (s ||
                      Math.abs(Tt.startX - e) >= n ||
                      Math.abs(Tt.startY - i) >= n) &&
                      (F && (yt = !0),
                      s || (Tt.isDragging = !0),
                      It(r, o),
                      s || (q && q(Tt)));
                }
              },
              Bt = (Tt.onPress = function (t) {
                Ht(t, 1) ||
                  (t && t.button) ||
                  ((Tt.axis = xt = null),
                  mt.pause(),
                  (Tt.isPressed = !0),
                  (t = L(t)),
                  (kt = St = 0),
                  (Tt.startX = Tt.x = t.clientX),
                  (Tt.startY = Tt.y = t.clientY),
                  Tt._vx.reset(),
                  Tt._vy.reset(),
                  C(rt ? f : Pt, g[1], Ft, Ct, !0),
                  (Tt.deltaX = Tt.deltaY = 0),
                  B && B(Tt));
              }),
              Wt = (Tt.onRelease = function (t) {
                if (!Ht(t, 1)) {
                  A(rt ? f : Pt, g[1], Ft, !0);
                  var e = !isNaN(Tt.y - Tt.startY),
                    n = Tt.isDragging,
                    i =
                      n &&
                      (Math.abs(Tt.x - Tt.startX) > 3 ||
                        Math.abs(Tt.y - Tt.startY) > 3),
                    o = L(t);
                  !i &&
                    e &&
                    (Tt._vx.reset(),
                    Tt._vy.reset(),
                    _ &&
                      ft &&
                      r.delayedCall(0.08, function () {
                        if (x() - Nt > 300 && !t.defaultPrevented)
                          if (t.target.click) t.target.click();
                          else if (Pt.createEvent) {
                            var e = Pt.createEvent("MouseEvents");
                            e.initMouseEvent(
                              "click",
                              !0,
                              !0,
                              s,
                              1,
                              o.screenX,
                              o.screenY,
                              o.clientX,
                              o.clientY,
                              !1,
                              !1,
                              !1,
                              !1,
                              0,
                              null
                            ),
                              t.target.dispatchEvent(e);
                          }
                      })),
                    (Tt.isDragging = Tt.isGesturing = Tt.isPressed = !1),
                    w && n && !rt && mt.restart(!0),
                    I && n && I(Tt),
                    W && W(Tt, i);
                }
              }),
              Xt = function (t) {
                return (
                  t.touches &&
                  t.touches.length > 1 &&
                  (Tt.isGesturing = !0) &&
                  ot(t, Tt.isDragging)
                );
              },
              Yt = function () {
                return (Tt.isGesturing = !1) || st(Tt);
              },
              Ut = function (t) {
                if (!Ht(t)) {
                  var e = At(),
                    n = Ot();
                  qt((e - Et) * dt, (n - Dt) * dt, 1),
                    (Et = e),
                    (Dt = n),
                    w && mt.restart(!0);
                }
              },
              Vt = function (t) {
                if (!Ht(t)) {
                  (t = L(t, _)), at && (_t = !0);
                  var e =
                    (1 === t.deltaMode
                      ? m
                      : 2 === t.deltaMode
                      ? s.innerHeight
                      : 1) * E;
                  qt(t.deltaX * e, t.deltaY * e, 0), w && !rt && mt.restart(!0);
                }
              },
              Gt = function (t) {
                if (!Ht(t)) {
                  var e = t.clientX,
                    n = t.clientY,
                    i = e - Tt.x,
                    r = n - Tt.y;
                  (Tt.x = e),
                    (Tt.y = n),
                    (bt = !0),
                    w && mt.restart(!0),
                    (i || r) && It(i, r);
                }
              },
              Qt = function (t) {
                (Tt.event = t), tt(Tt);
              },
              Jt = function (t) {
                (Tt.event = t), et(Tt);
              },
              Kt = function (t) {
                return Ht(t) || (L(t, _) && ct(Tt));
              };
            (mt = Tt._dc = r
              .delayedCall(T || 0.25, function () {
                Tt._vx.reset(), Tt._vy.reset(), mt.pause(), w && w(Tt);
              })
              .pause()),
              (Tt.deltaX = Tt.deltaY = 0),
              (Tt._vx = j(0, 50, !0)),
              (Tt._vy = j(0, 50, !0)),
              (Tt.scrollX = At),
              (Tt.scrollY = Ot),
              (Tt.isDragging = Tt.isGesturing = Tt.isPressed = !1),
              v(this),
              (Tt.enable = function (t) {
                return (
                  Tt.isEnabled ||
                    (C($t ? Pt : f, "scroll", O),
                    i.indexOf("scroll") >= 0 &&
                      C($t ? Pt : f, "scroll", Ut, Ct, pt),
                    i.indexOf("wheel") >= 0 && C(f, "wheel", Vt, Ct, pt),
                    ((i.indexOf("touch") >= 0 && c) ||
                      i.indexOf("pointer") >= 0) &&
                      (C(f, g[0], Bt, Ct, pt),
                      C(Pt, g[2], Wt),
                      C(Pt, g[3], Wt),
                      ft && C(f, "click", Rt, !0, !0),
                      ct && C(f, "click", Kt),
                      ot && C(Pt, "gesturestart", Xt),
                      st && C(Pt, "gestureend", Yt),
                      tt && C(f, d + "enter", Qt),
                      et && C(f, d + "leave", Jt),
                      nt && C(f, d + "move", Gt)),
                    (Tt.isEnabled = !0),
                    t && t.type && Bt(t),
                    lt && lt(Tt)),
                  Tt
                );
              }),
              (Tt.disable = function () {
                Tt.isEnabled &&
                  (b.filter(function (t) {
                    return t !== Tt && S(t.target);
                  }).length || A($t ? Pt : f, "scroll", O),
                  Tt.isPressed &&
                    (Tt._vx.reset(),
                    Tt._vy.reset(),
                    A(rt ? f : Pt, g[1], Ft, !0)),
                  A($t ? Pt : f, "scroll", Ut, pt),
                  A(f, "wheel", Vt, pt),
                  A(f, g[0], Bt, pt),
                  A(Pt, g[2], Wt),
                  A(Pt, g[3], Wt),
                  A(f, "click", Rt, !0),
                  A(f, "click", Kt),
                  A(Pt, "gesturestart", Xt),
                  A(Pt, "gestureend", Yt),
                  A(f, d + "enter", Qt),
                  A(f, d + "leave", Jt),
                  A(f, d + "move", Gt),
                  (Tt.isEnabled = Tt.isPressed = Tt.isDragging = !1),
                  ut && ut(Tt));
              }),
              (Tt.kill = Tt.revert = function () {
                Tt.disable();
                var t = b.indexOf(Tt);
                t >= 0 && b.splice(t, 1), h === Tt && (h = 0);
              }),
              b.push(Tt),
              rt && S(f) && (h = Tt),
              Tt.enable(z);
          }),
          (e = t),
          (n = [
            {
              key: "velocityX",
              get: function () {
                return this._vx.getVelocity();
              },
            },
            {
              key: "velocityY",
              get: function () {
                return this._vy.getVelocity();
              },
            },
          ]) && i(e.prototype, n),
          f && i(e, f),
          t
        );
      })();
      (z.version = "3.12.5"),
        (z.create = function (t) {
          return new z(t);
        }),
        (z.register = H),
        (z.getAll = function () {
          return b.slice();
        }),
        (z.getById = function (t) {
          return b.filter(function (e) {
            return e.vars.id === t;
          })[0];
        }),
        m() && r.registerPlugin(z);
      /*!
       * ScrollTrigger 3.12.5
       * https://gsap.com
       *
       * @license Copyright 2008-2024, GreenSock. All rights reserved.
       * Subject to the terms at https://gsap.com/standard-license or for
       * Club GSAP members, the agreement issued with that membership.
       * @author: Jack Doyle, jack@greensock.com
       */
      var q,
        I,
        F,
        B,
        W,
        X,
        Y,
        U,
        V,
        G,
        Q,
        J,
        K,
        Z,
        tt,
        et,
        nt,
        it,
        rt,
        ot,
        st,
        at,
        lt,
        ut,
        ct,
        dt,
        pt,
        ft,
        ht,
        gt,
        vt,
        mt,
        yt,
        bt,
        _t,
        wt,
        xt,
        Tt,
        kt = 1,
        St = Date.now,
        Ct = St(),
        At = 0,
        Ot = 0,
        Et = function (t, e, n) {
          var i =
            Ft(t) && ("clamp(" === t.substr(0, 6) || t.indexOf("max") > -1);
          return (n["_" + e + "Clamp"] = i), i ? t.substr(6, t.length - 7) : t;
        },
        Dt = function (t, e) {
          return !e || (Ft(t) && "clamp(" === t.substr(0, 6))
            ? t
            : "clamp(" + t + ")";
        },
        Mt = function () {
          return (Z = 1);
        },
        $t = function () {
          return (Z = 0);
        },
        Pt = function (t) {
          return t;
        },
        jt = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        Lt = function () {
          return "undefined" != typeof window;
        },
        Nt = function () {
          return q || (Lt() && (q = window.gsap) && q.registerPlugin && q);
        },
        Rt = function (t) {
          return !!~Y.indexOf(t);
        },
        Ht = function (t) {
          return (
            ("Height" === t ? vt : F["inner" + t]) ||
            W["client" + t] ||
            X["client" + t]
          );
        },
        zt = function (t) {
          return (
            k(t, "getBoundingClientRect") ||
            (Rt(t)
              ? function () {
                  return (qe.width = F.innerWidth), (qe.height = vt), qe;
                }
              : function () {
                  return Zt(t);
                })
          );
        },
        qt = function (t, e) {
          var n = e.s,
            i = e.d2,
            r = e.d,
            o = e.a;
          return Math.max(
            0,
            (n = "scroll" + i) && (o = k(t, n))
              ? o() - zt(t)()[r]
              : Rt(t)
              ? (W[n] || X[n]) - Ht(i)
              : t[n] - t["offset" + i]
          );
        },
        It = function (t, e) {
          for (var n = 0; n < rt.length; n += 3)
            (!e || ~e.indexOf(rt[n + 1])) && t(rt[n], rt[n + 1], rt[n + 2]);
        },
        Ft = function (t) {
          return "string" == typeof t;
        },
        Bt = function (t) {
          return "function" == typeof t;
        },
        Wt = function (t) {
          return "number" == typeof t;
        },
        Xt = function (t) {
          return "object" == typeof t;
        },
        Yt = function (t, e, n) {
          return t && t.progress(e ? 0 : 1) && n && t.pause();
        },
        Ut = function (t, e) {
          if (t.enabled) {
            var n = t._ctx
              ? t._ctx.add(function () {
                  return e(t);
                })
              : e(t);
            n && n.totalTime && (t.callbackAnimation = n);
          }
        },
        Vt = Math.abs,
        Gt = "padding",
        Qt = "px",
        Jt = function (t) {
          return F.getComputedStyle(t);
        },
        Kt = function (t, e) {
          for (var n in e) n in t || (t[n] = e[n]);
          return t;
        },
        Zt = function (t, e) {
          var n =
              e &&
              "matrix(1, 0, 0, 1, 0, 0)" !== Jt(t)[tt] &&
              q
                .to(t, {
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  rotation: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  skewX: 0,
                  skewY: 0,
                })
                .progress(1),
            i = t.getBoundingClientRect();
          return n && n.progress(0).kill(), i;
        },
        te = function (t, e) {
          var n = e.d2;
          return t["offset" + n] || t["client" + n] || 0;
        },
        ee = function (t) {
          var e,
            n = [],
            i = t.labels,
            r = t.duration();
          for (e in i) n.push(i[e] / r);
          return n;
        },
        ne = function (t) {
          var e = q.utils.snap(t),
            n =
              Array.isArray(t) &&
              t.slice(0).sort(function (t, e) {
                return t - e;
              });
          return n
            ? function (t, i, r) {
                var o;
                if ((void 0 === r && (r = 0.001), !i)) return e(t);
                if (i > 0) {
                  for (t -= r, o = 0; o < n.length; o++)
                    if (n[o] >= t) return n[o];
                  return n[o - 1];
                }
                for (o = n.length, t += r; o--; ) if (n[o] <= t) return n[o];
                return n[0];
              }
            : function (n, i, r) {
                void 0 === r && (r = 0.001);
                var o = e(n);
                return !i || Math.abs(o - n) < r || o - n < 0 == i < 0
                  ? o
                  : e(i < 0 ? n - t : n + t);
              };
        },
        ie = function (t, e, n, i) {
          return n.split(",").forEach(function (n) {
            return t(e, n, i);
          });
        },
        re = function (t, e, n, i, r) {
          return t.addEventListener(e, n, { passive: !i, capture: !!r });
        },
        oe = function (t, e, n, i) {
          return t.removeEventListener(e, n, !!i);
        },
        se = function (t, e, n) {
          (n = n && n.wheelHandler) && (t(e, "wheel", n), t(e, "touchmove", n));
        },
        ae = {
          startColor: "green",
          endColor: "red",
          indent: 0,
          fontSize: "16px",
          fontWeight: "normal",
        },
        le = { toggleActions: "play", anticipatePin: 0 },
        ue = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
        ce = function (t, e) {
          if (Ft(t)) {
            var n = t.indexOf("="),
              i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
            ~n &&
              (t.indexOf("%") > n && (i *= e / 100), (t = t.substr(0, n - 1))),
              (t =
                i +
                (t in ue
                  ? ue[t] * e
                  : ~t.indexOf("%")
                  ? (parseFloat(t) * e) / 100
                  : parseFloat(t) || 0));
          }
          return t;
        },
        de = function (t, e, n, i, r, o, s, a) {
          var l = r.startColor,
            u = r.endColor,
            c = r.fontSize,
            d = r.indent,
            p = r.fontWeight,
            f = B.createElement("div"),
            h = Rt(n) || "fixed" === k(n, "pinType"),
            g = -1 !== t.indexOf("scroller"),
            v = h ? X : n,
            m = -1 !== t.indexOf("start"),
            y = m ? l : u,
            b =
              "border-color:" +
              y +
              ";font-size:" +
              c +
              ";color:" +
              y +
              ";font-weight:" +
              p +
              ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
          return (
            (b += "position:" + ((g || a) && h ? "fixed;" : "absolute;")),
            (g || a || !h) &&
              (b +=
                (i === M ? "right" : "bottom") +
                ":" +
                (o + parseFloat(d)) +
                "px;"),
            s &&
              (b +=
                "box-sizing:border-box;text-align:left;width:" +
                s.offsetWidth +
                "px;"),
            (f._isStart = m),
            f.setAttribute(
              "class",
              "gsap-marker-" + t + (e ? " marker-" + e : "")
            ),
            (f.style.cssText = b),
            (f.innerText = e || 0 === e ? t + "-" + e : t),
            v.children[0] ? v.insertBefore(f, v.children[0]) : v.appendChild(f),
            (f._offset = f["offset" + i.op.d2]),
            pe(f, 0, i, m),
            f
          );
        },
        pe = function (t, e, n, i) {
          var r = { display: "block" },
            o = n[i ? "os2" : "p2"],
            s = n[i ? "p2" : "os2"];
          (t._isFlipped = i),
            (r[n.a + "Percent"] = i ? -100 : 0),
            (r[n.a] = i ? "1px" : 0),
            (r["border" + o + "Width"] = 1),
            (r["border" + s + "Width"] = 0),
            (r[n.p] = e + "px"),
            q.set(t, r);
        },
        fe = [],
        he = {},
        ge = function () {
          return St() - At > 34 && (_t || (_t = requestAnimationFrame(Pe)));
        },
        ve = function () {
          (!lt || !lt.isPressed || lt.startX > X.clientWidth) &&
            (_.cache++,
            lt ? _t || (_t = requestAnimationFrame(Pe)) : Pe(),
            At || xe("scrollStart"),
            (At = St()));
        },
        me = function () {
          (dt = F.innerWidth), (ct = F.innerHeight);
        },
        ye = function () {
          _.cache++,
            !K &&
              !at &&
              !B.fullscreenElement &&
              !B.webkitFullscreenElement &&
              (!ut ||
                dt !== F.innerWidth ||
                Math.abs(F.innerHeight - ct) > 0.25 * F.innerHeight) &&
              U.restart(!0);
        },
        be = {},
        _e = [],
        we = function t() {
          return oe(Ue, "scrollEnd", t) || De(!0);
        },
        xe = function (t) {
          return (
            (be[t] &&
              be[t].map(function (t) {
                return t();
              })) ||
            _e
          );
        },
        Te = [],
        ke = function (t) {
          for (var e = 0; e < Te.length; e += 5)
            (!t || (Te[e + 4] && Te[e + 4].query === t)) &&
              ((Te[e].style.cssText = Te[e + 1]),
              Te[e].getBBox && Te[e].setAttribute("transform", Te[e + 2] || ""),
              (Te[e + 3].uncache = 1));
        },
        Se = function (t, e) {
          var n;
          for (et = 0; et < fe.length; et++)
            !(n = fe[et]) ||
              (e && n._ctx !== e) ||
              (t ? n.kill(1) : n.revert(!0, !0));
          (mt = !0), e && ke(e), e || xe("revert");
        },
        Ce = function (t, e) {
          _.cache++,
            (e || !wt) &&
              _.forEach(function (t) {
                return Bt(t) && t.cacheID++ && (t.rec = 0);
              }),
            Ft(t) && (F.history.scrollRestoration = ht = t);
        },
        Ae = 0,
        Oe = function () {
          X.appendChild(gt),
            (vt = (!lt && gt.offsetHeight) || F.innerHeight),
            X.removeChild(gt);
        },
        Ee = function (t) {
          return V(
            ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
          ).forEach(function (e) {
            return (e.style.display = t ? "none" : "block");
          });
        },
        De = function (t, e) {
          if (!At || t || mt) {
            Oe(),
              (wt = Ue.isRefreshing = !0),
              _.forEach(function (t) {
                return Bt(t) && ++t.cacheID && (t.rec = t());
              });
            var n = xe("refreshInit");
            ot && Ue.sort(),
              e || Se(),
              _.forEach(function (t) {
                Bt(t) &&
                  (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0));
              }),
              fe.slice(0).forEach(function (t) {
                return t.refresh();
              }),
              (mt = !1),
              fe.forEach(function (t) {
                if (t._subPinOffset && t.pin) {
                  var e = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                    n = t.pin[e];
                  t.revert(!0, 1),
                    t.adjustPinSpacing(t.pin[e] - n),
                    t.refresh();
                }
              }),
              (yt = 1),
              Ee(!0),
              fe.forEach(function (t) {
                var e = qt(t.scroller, t._dir),
                  n = "max" === t.vars.end || (t._endClamp && t.end > e),
                  i = t._startClamp && t.start >= e;
                (n || i) &&
                  t.setPositions(
                    i ? e - 1 : t.start,
                    n ? Math.max(i ? e : t.start + 1, e) : t.end,
                    !0
                  );
              }),
              Ee(!1),
              (yt = 0),
              n.forEach(function (t) {
                return t && t.render && t.render(-1);
              }),
              _.forEach(function (t) {
                Bt(t) &&
                  (t.smooth &&
                    requestAnimationFrame(function () {
                      return (t.target.style.scrollBehavior = "smooth");
                    }),
                  t.rec && t(t.rec));
              }),
              Ce(ht, 1),
              U.pause(),
              Ae++,
              (wt = 2),
              Pe(2),
              fe.forEach(function (t) {
                return Bt(t.vars.onRefresh) && t.vars.onRefresh(t);
              }),
              (wt = Ue.isRefreshing = !1),
              xe("refresh");
          } else re(Ue, "scrollEnd", we);
        },
        Me = 0,
        $e = 1,
        Pe = function (t) {
          if (2 === t || (!wt && !mt)) {
            (Ue.isUpdating = !0), Tt && Tt.update(0);
            var e = fe.length,
              n = St(),
              i = n - Ct >= 50,
              r = e && fe[0].scroll();
            if (
              (($e = Me > r ? -1 : 1),
              wt || (Me = r),
              i &&
                (At && !Z && n - At > 200 && ((At = 0), xe("scrollEnd")),
                (Q = Ct),
                (Ct = n)),
              $e < 0)
            ) {
              for (et = e; et-- > 0; ) fe[et] && fe[et].update(0, i);
              $e = 1;
            } else for (et = 0; et < e; et++) fe[et] && fe[et].update(0, i);
            Ue.isUpdating = !1;
          }
          _t = 0;
        },
        je = [
          "left",
          "top",
          "bottom",
          "right",
          "marginBottom",
          "marginRight",
          "marginTop",
          "marginLeft",
          "display",
          "flexShrink",
          "float",
          "zIndex",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRowStart",
          "gridRowEnd",
          "gridArea",
          "justifySelf",
          "alignSelf",
          "placeSelf",
          "order",
        ],
        Le = je.concat([
          "width",
          "height",
          "boxSizing",
          "maxWidth",
          "maxHeight",
          "position",
          "margin",
          Gt,
          Gt + "Top",
          Gt + "Right",
          Gt + "Bottom",
          Gt + "Left",
        ]),
        Ne = function (t, e, n, i) {
          if (!t._gsap.swappedIn) {
            for (var r, o = je.length, s = e.style, a = t.style; o--; )
              s[(r = je[o])] = n[r];
            (s.position = "absolute" === n.position ? "absolute" : "relative"),
              "inline" === n.display && (s.display = "inline-block"),
              (a.bottom = a.right = "auto"),
              (s.flexBasis = n.flexBasis || "auto"),
              (s.overflow = "visible"),
              (s.boxSizing = "border-box"),
              (s.width = te(t, D) + Qt),
              (s.height = te(t, M) + Qt),
              (s[Gt] = a.margin = a.top = a.left = "0"),
              He(i),
              (a.width = a.maxWidth = n.width),
              (a.height = a.maxHeight = n.height),
              (a[Gt] = n[Gt]),
              t.parentNode !== e &&
                (t.parentNode.insertBefore(e, t), e.appendChild(t)),
              (t._gsap.swappedIn = !0);
          }
        },
        Re = /([A-Z])/g,
        He = function (t) {
          if (t) {
            var e,
              n,
              i = t.t.style,
              r = t.length,
              o = 0;
            for ((t.t._gsap || q.core.getCache(t.t)).uncache = 1; o < r; o += 2)
              (n = t[o + 1]),
                (e = t[o]),
                n
                  ? (i[e] = n)
                  : i[e] &&
                    i.removeProperty(e.replace(Re, "-$1").toLowerCase());
          }
        },
        ze = function (t) {
          for (var e = Le.length, n = t.style, i = [], r = 0; r < e; r++)
            i.push(Le[r], n[Le[r]]);
          return (i.t = t), i;
        },
        qe = { left: 0, top: 0 },
        Ie = function (t, e, n, i, r, o, s, a, l, u, c, d, p, f) {
          Bt(t) && (t = t(a)),
            Ft(t) &&
              "max" === t.substr(0, 3) &&
              (t = d + ("=" === t.charAt(4) ? ce("0" + t.substr(3), n) : 0));
          var h,
            g,
            v,
            m = p ? p.time() : 0;
          if ((p && p.seek(0), isNaN(t) || (t = +t), Wt(t)))
            p &&
              (t = q.utils.mapRange(
                p.scrollTrigger.start,
                p.scrollTrigger.end,
                0,
                d,
                t
              )),
              s && pe(s, n, i, !0);
          else {
            Bt(e) && (e = e(a));
            var y,
              b,
              _,
              w,
              x = (t || "0").split(" ");
            (v = $(e, a) || X),
              ((y = Zt(v) || {}) && (y.left || y.top)) ||
                "none" !== Jt(v).display ||
                ((w = v.style.display),
                (v.style.display = "block"),
                (y = Zt(v)),
                w ? (v.style.display = w) : v.style.removeProperty("display")),
              (b = ce(x[0], y[i.d])),
              (_ = ce(x[1] || "0", n)),
              (t = y[i.p] - l[i.p] - u + b + r - _),
              s && pe(s, _, i, n - _ < 20 || (s._isStart && _ > 20)),
              (n -= n - _);
          }
          if ((f && ((a[f] = t || -0.001), t < 0 && (t = 0)), o)) {
            var T = t + n,
              k = o._isStart;
            (h = "scroll" + i.d2),
              pe(
                o,
                T,
                i,
                (k && T > 20) ||
                  (!k && (c ? Math.max(X[h], W[h]) : o.parentNode[h]) <= T + 1)
              ),
              c &&
                ((l = Zt(s)),
                c && (o.style[i.op.p] = l[i.op.p] - i.op.m - o._offset + Qt));
          }
          return (
            p &&
              v &&
              ((h = Zt(v)),
              p.seek(d),
              (g = Zt(v)),
              (p._caScrollDist = h[i.p] - g[i.p]),
              (t = (t / p._caScrollDist) * d)),
            p && p.seek(m),
            p ? t : Math.round(t)
          );
        },
        Fe = /(webkit|moz|length|cssText|inset)/i,
        Be = function (t, e, n, i) {
          if (t.parentNode !== e) {
            var r,
              o,
              s = t.style;
            if (e === X) {
              for (r in ((t._stOrig = s.cssText), (o = Jt(t))))
                +r ||
                  Fe.test(r) ||
                  !o[r] ||
                  "string" != typeof s[r] ||
                  "0" === r ||
                  (s[r] = o[r]);
              (s.top = n), (s.left = i);
            } else s.cssText = t._stOrig;
            (q.core.getCache(t).uncache = 1), e.appendChild(t);
          }
        },
        We = function (t, e, n) {
          var i = e,
            r = i;
          return function (e) {
            var o = Math.round(t());
            return (
              o !== i &&
                o !== r &&
                Math.abs(o - i) > 3 &&
                Math.abs(o - r) > 3 &&
                ((e = o), n && n()),
              (r = i),
              (i = e),
              e
            );
          };
        },
        Xe = function (t, e, n) {
          var i = {};
          (i[e.p] = "+=" + n), q.set(t, i);
        },
        Ye = function (t, e) {
          var n = P(t, e),
            i = "_scroll" + e.p2,
            r = function e(r, o, s, a, l) {
              var u = e.tween,
                c = o.onComplete,
                d = {};
              s = s || n();
              var p = We(n, s, function () {
                u.kill(), (e.tween = 0);
              });
              return (
                (l = (a && l) || 0),
                (a = a || r - s),
                u && u.kill(),
                (o[i] = r),
                (o.inherit = !1),
                (o.modifiers = d),
                (d[i] = function () {
                  return p(s + a * u.ratio + l * u.ratio * u.ratio);
                }),
                (o.onUpdate = function () {
                  _.cache++, e.tween && Pe();
                }),
                (o.onComplete = function () {
                  (e.tween = 0), c && c.call(u);
                }),
                (u = e.tween = q.to(t, o))
              );
            };
          return (
            (t[i] = n),
            (n.wheelHandler = function () {
              return r.tween && r.tween.kill() && (r.tween = 0);
            }),
            re(t, "wheel", n.wheelHandler),
            Ue.isTouch && re(t, "touchmove", n.wheelHandler),
            r
          );
        },
        Ue = (function () {
          function t(e, n) {
            I ||
              t.register(q) ||
              console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
              ft(this),
              this.init(e, n);
          }
          return (
            (t.prototype.init = function (e, n) {
              if (
                ((this.progress = this.start = 0),
                this.vars && this.kill(!0, !0),
                Ot)
              ) {
                var i,
                  r,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  d,
                  p,
                  f,
                  h,
                  g,
                  v,
                  m,
                  y,
                  b,
                  x,
                  T,
                  S,
                  C,
                  A,
                  O,
                  E,
                  j,
                  L,
                  N,
                  R,
                  H,
                  z,
                  I,
                  Y,
                  U,
                  J,
                  tt,
                  nt,
                  it,
                  rt,
                  at,
                  lt,
                  ut,
                  ct,
                  dt = (e = Kt(
                    Ft(e) || Wt(e) || e.nodeType ? { trigger: e } : e,
                    le
                  )),
                  pt = dt.onUpdate,
                  ft = dt.toggleClass,
                  ht = dt.id,
                  gt = dt.onToggle,
                  vt = dt.onRefresh,
                  mt = dt.scrub,
                  _t = dt.trigger,
                  Ct = dt.pin,
                  Mt = dt.pinSpacing,
                  $t = dt.invalidateOnRefresh,
                  Lt = dt.anticipatePin,
                  Nt = dt.onScrubComplete,
                  It = dt.onSnapComplete,
                  ie = dt.once,
                  se = dt.snap,
                  ue = dt.pinReparent,
                  pe = dt.pinSpacer,
                  ge = dt.containerAnimation,
                  me = dt.fastScrollEnd,
                  be = dt.preventOverlaps,
                  _e =
                    e.horizontal ||
                    (e.containerAnimation && !1 !== e.horizontal)
                      ? D
                      : M,
                  xe = !mt && 0 !== mt,
                  Te = $(e.scroller || F),
                  ke = q.core.getCache(Te),
                  Se = Rt(Te),
                  Ce =
                    "fixed" ===
                    ("pinType" in e
                      ? e.pinType
                      : k(Te, "pinType") || (Se && "fixed")),
                  Oe = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                  Ee = xe && e.toggleActions.split(" "),
                  Me = "markers" in e ? e.markers : le.markers,
                  Pe = Se
                    ? 0
                    : parseFloat(Jt(Te)["border" + _e.p2 + "Width"]) || 0,
                  je = this,
                  Le =
                    e.onRefreshInit &&
                    function () {
                      return e.onRefreshInit(je);
                    },
                  Re = (function (t, e, n) {
                    var i = n.d,
                      r = n.d2,
                      o = n.a;
                    return (o = k(t, "getBoundingClientRect"))
                      ? function () {
                          return o()[i];
                        }
                      : function () {
                          return (e ? Ht(r) : t["client" + r]) || 0;
                        };
                  })(Te, Se, _e),
                  Fe = (function (t, e) {
                    return !e || ~w.indexOf(t)
                      ? zt(t)
                      : function () {
                          return qe;
                        };
                  })(Te, Se),
                  We = 0,
                  Ue = 0,
                  Ve = 0,
                  Ge = P(Te, _e);
                if (
                  ((je._startClamp = je._endClamp = !1),
                  (je._dir = _e),
                  (Lt *= 45),
                  (je.scroller = Te),
                  (je.scroll = ge ? ge.time.bind(ge) : Ge),
                  (s = Ge()),
                  (je.vars = e),
                  (n = n || e.animation),
                  "refreshPriority" in e &&
                    ((ot = 1), -9999 === e.refreshPriority && (Tt = je)),
                  (ke.tweenScroll = ke.tweenScroll || {
                    top: Ye(Te, M),
                    left: Ye(Te, D),
                  }),
                  (je.tweenTo = i = ke.tweenScroll[_e.p]),
                  (je.scrubDuration = function (t) {
                    (U = Wt(t) && t)
                      ? Y
                        ? Y.duration(t)
                        : (Y = q.to(n, {
                            ease: "expo",
                            totalProgress: "+=0",
                            inherit: !1,
                            duration: U,
                            paused: !0,
                            onComplete: function () {
                              return Nt && Nt(je);
                            },
                          }))
                      : (Y && Y.progress(1).kill(), (Y = 0));
                  }),
                  n &&
                    ((n.vars.lazy = !1),
                    (n._initted && !je.isReverted) ||
                      (!1 !== n.vars.immediateRender &&
                        !1 !== e.immediateRender &&
                        n.duration() &&
                        n.render(0, !0, !0)),
                    (je.animation = n.pause()),
                    (n.scrollTrigger = je),
                    je.scrubDuration(mt),
                    (z = 0),
                    ht || (ht = n.vars.id)),
                  se &&
                    ((Xt(se) && !se.push) || (se = { snapTo: se }),
                    "scrollBehavior" in X.style &&
                      q.set(Se ? [X, W] : Te, { scrollBehavior: "auto" }),
                    _.forEach(function (t) {
                      return (
                        Bt(t) &&
                        t.target === (Se ? B.scrollingElement || W : Te) &&
                        (t.smooth = !1)
                      );
                    }),
                    (o = Bt(se.snapTo)
                      ? se.snapTo
                      : "labels" === se.snapTo
                      ? (function (t) {
                          return function (e) {
                            return q.utils.snap(ee(t), e);
                          };
                        })(n)
                      : "labelsDirectional" === se.snapTo
                      ? ((lt = n),
                        function (t, e) {
                          return ne(ee(lt))(t, e.direction);
                        })
                      : !1 !== se.directional
                      ? function (t, e) {
                          return ne(se.snapTo)(
                            t,
                            St() - Ue < 500 ? 0 : e.direction
                          );
                        }
                      : q.utils.snap(se.snapTo)),
                    (J = se.duration || { min: 0.1, max: 2 }),
                    (J = Xt(J) ? G(J.min, J.max) : G(J, J)),
                    (tt = q
                      .delayedCall(se.delay || U / 2 || 0.1, function () {
                        var t = Ge(),
                          e = St() - Ue < 500,
                          r = i.tween;
                        if (
                          !(e || Math.abs(je.getVelocity()) < 10) ||
                          r ||
                          Z ||
                          We === t
                        )
                          je.isActive && We !== t && tt.restart(!0);
                        else {
                          var s,
                            a,
                            c = (t - l) / v,
                            d = n && !xe ? n.totalProgress() : c,
                            p = e ? 0 : ((d - I) / (St() - Q)) * 1e3 || 0,
                            f = q.utils.clamp(
                              -c,
                              1 - c,
                              (Vt(p / 2) * p) / 0.185
                            ),
                            h = c + (!1 === se.inertia ? 0 : f),
                            g = se,
                            m = g.onStart,
                            y = g.onInterrupt,
                            b = g.onComplete;
                          if (
                            ((s = o(h, je)),
                            Wt(s) || (s = h),
                            (a = Math.round(l + s * v)),
                            t <= u && t >= l && a !== t)
                          ) {
                            if (r && !r._initted && r.data <= Vt(a - t)) return;
                            !1 === se.inertia && (f = s - c),
                              i(
                                a,
                                {
                                  duration: J(
                                    Vt(
                                      (0.185 * Math.max(Vt(h - d), Vt(s - d))) /
                                        p /
                                        0.05 || 0
                                    )
                                  ),
                                  ease: se.ease || "power3",
                                  data: Vt(a - t),
                                  onInterrupt: function () {
                                    return tt.restart(!0) && y && y(je);
                                  },
                                  onComplete: function () {
                                    je.update(),
                                      (We = Ge()),
                                      n &&
                                        (Y
                                          ? Y.resetTo(
                                              "totalProgress",
                                              s,
                                              n._tTime / n._tDur
                                            )
                                          : n.progress(s)),
                                      (z = I =
                                        n && !xe
                                          ? n.totalProgress()
                                          : je.progress),
                                      It && It(je),
                                      b && b(je);
                                  },
                                },
                                t,
                                f * v,
                                a - t - f * v
                              ),
                              m && m(je, i.tween);
                          }
                        }
                      })
                      .pause())),
                  ht && (he[ht] = je),
                  (at =
                    (_t = je.trigger = $(_t || (!0 !== Ct && Ct))) &&
                    _t._gsap &&
                    _t._gsap.stRevert) && (at = at(je)),
                  (Ct = !0 === Ct ? _t : $(Ct)),
                  Ft(ft) && (ft = { targets: _t, className: ft }),
                  Ct &&
                    (!1 === Mt ||
                      "margin" === Mt ||
                      (Mt =
                        !(
                          !Mt &&
                          Ct.parentNode &&
                          Ct.parentNode.style &&
                          "flex" === Jt(Ct.parentNode).display
                        ) && Gt),
                    (je.pin = Ct),
                    (r = q.core.getCache(Ct)).spacer
                      ? (m = r.pinState)
                      : (pe &&
                          ((pe = $(pe)) &&
                            !pe.nodeType &&
                            (pe = pe.current || pe.nativeElement),
                          (r.spacerIsNative = !!pe),
                          pe && (r.spacerState = ze(pe))),
                        (r.spacer = x = pe || B.createElement("div")),
                        x.classList.add("pin-spacer"),
                        ht && x.classList.add("pin-spacer-" + ht),
                        (r.pinState = m = ze(Ct))),
                    !1 !== e.force3D && q.set(Ct, { force3D: !0 }),
                    (je.spacer = x = r.spacer),
                    (H = Jt(Ct)),
                    (E = H[Mt + _e.os2]),
                    (S = q.getProperty(Ct)),
                    (C = q.quickSetter(Ct, _e.a, Qt)),
                    Ne(Ct, x, H),
                    (b = ze(Ct))),
                  Me)
                ) {
                  (h = Xt(Me) ? Kt(Me, ae) : ae),
                    (p = de("scroller-start", ht, Te, _e, h, 0)),
                    (f = de("scroller-end", ht, Te, _e, h, 0, p)),
                    (T = p["offset" + _e.op.d2]);
                  var Qe = $(k(Te, "content") || Te);
                  (c = this.markerStart = de("start", ht, Qe, _e, h, T, 0, ge)),
                    (d = this.markerEnd = de("end", ht, Qe, _e, h, T, 0, ge)),
                    ge && (rt = q.quickSetter([c, d], _e.a, Qt)),
                    Ce ||
                      (w.length && !0 === k(Te, "fixedMarkers")) ||
                      ((ct = Jt((ut = Se ? X : Te)).position),
                      (ut.style.position =
                        "absolute" === ct || "fixed" === ct ? ct : "relative"),
                      q.set([p, f], { force3D: !0 }),
                      (L = q.quickSetter(p, _e.a, Qt)),
                      (R = q.quickSetter(f, _e.a, Qt)));
                }
                if (ge) {
                  var Je = ge.vars.onUpdate,
                    Ke = ge.vars.onUpdateParams;
                  ge.eventCallback("onUpdate", function () {
                    je.update(0, 0, 1), Je && Je.apply(ge, Ke || []);
                  });
                }
                if (
                  ((je.previous = function () {
                    return fe[fe.indexOf(je) - 1];
                  }),
                  (je.next = function () {
                    return fe[fe.indexOf(je) + 1];
                  }),
                  (je.revert = function (t, e) {
                    if (!e) return je.kill(!0);
                    var i = !1 !== t || !je.enabled,
                      r = K;
                    i !== je.isReverted &&
                      (i &&
                        ((nt = Math.max(Ge(), je.scroll.rec || 0)),
                        (Ve = je.progress),
                        (it = n && n.progress())),
                      c &&
                        [c, d, p, f].forEach(function (t) {
                          return (t.style.display = i ? "none" : "block");
                        }),
                      i && ((K = je), je.update(i)),
                      !Ct ||
                        (ue && je.isActive) ||
                        (i
                          ? (function (t, e, n) {
                              He(n);
                              var i = t._gsap;
                              if (i.spacerIsNative) He(i.spacerState);
                              else if (t._gsap.swappedIn) {
                                var r = e.parentNode;
                                r && (r.insertBefore(t, e), r.removeChild(e));
                              }
                              t._gsap.swappedIn = !1;
                            })(Ct, x, m)
                          : Ne(Ct, x, Jt(Ct), j)),
                      i || je.update(i),
                      (K = r),
                      (je.isReverted = i));
                  }),
                  (je.refresh = function (r, o, h, _) {
                    if ((!K && je.enabled) || o)
                      if (Ct && r && At) re(t, "scrollEnd", we);
                      else {
                        !wt && Le && Le(je),
                          (K = je),
                          i.tween && !h && (i.tween.kill(), (i.tween = 0)),
                          Y && Y.pause(),
                          $t && n && n.revert({ kill: !1 }).invalidate(),
                          je.isReverted || je.revert(!0, !0),
                          (je._subPinOffset = !1);
                        var w,
                          T,
                          k,
                          C,
                          E,
                          L,
                          R,
                          H,
                          z,
                          I,
                          F,
                          U,
                          V,
                          G = Re(),
                          Q = Fe(),
                          J = ge ? ge.duration() : qt(Te, _e),
                          Z = v <= 0.01,
                          et = 0,
                          rt = _ || 0,
                          ot = Xt(h) ? h.end : e.end,
                          at = e.endTrigger || _t,
                          lt = Xt(h)
                            ? h.start
                            : e.start ||
                              (0 !== e.start && _t
                                ? Ct
                                  ? "0 0"
                                  : "0 100%"
                                : 0),
                          ut = (je.pinnedContainer =
                            e.pinnedContainer && $(e.pinnedContainer, je)),
                          ct = (_t && Math.max(0, fe.indexOf(je))) || 0,
                          dt = ct;
                        for (
                          Me &&
                          Xt(h) &&
                          ((U = q.getProperty(p, _e.p)),
                          (V = q.getProperty(f, _e.p)));
                          dt--;

                        )
                          (L = fe[dt]).end || L.refresh(0, 1) || (K = je),
                            !(R = L.pin) ||
                              (R !== _t && R !== Ct && R !== ut) ||
                              L.isReverted ||
                              (I || (I = []), I.unshift(L), L.revert(!0, !0)),
                            L !== fe[dt] && (ct--, dt--);
                        for (
                          Bt(lt) && (lt = lt(je)),
                            lt = Et(lt, "start", je),
                            l =
                              Ie(
                                lt,
                                _t,
                                G,
                                _e,
                                Ge(),
                                c,
                                p,
                                je,
                                Q,
                                Pe,
                                Ce,
                                J,
                                ge,
                                je._startClamp && "_startClamp"
                              ) || (Ct ? -0.001 : 0),
                            Bt(ot) && (ot = ot(je)),
                            Ft(ot) &&
                              !ot.indexOf("+=") &&
                              (~ot.indexOf(" ")
                                ? (ot = (Ft(lt) ? lt.split(" ")[0] : "") + ot)
                                : ((et = ce(ot.substr(2), G)),
                                  (ot = Ft(lt)
                                    ? lt
                                    : (ge
                                        ? q.utils.mapRange(
                                            0,
                                            ge.duration(),
                                            ge.scrollTrigger.start,
                                            ge.scrollTrigger.end,
                                            l
                                          )
                                        : l) + et),
                                  (at = _t))),
                            ot = Et(ot, "end", je),
                            u =
                              Math.max(
                                l,
                                Ie(
                                  ot || (at ? "100% 0" : J),
                                  at,
                                  G,
                                  _e,
                                  Ge() + et,
                                  d,
                                  f,
                                  je,
                                  Q,
                                  Pe,
                                  Ce,
                                  J,
                                  ge,
                                  je._endClamp && "_endClamp"
                                )
                              ) || -0.001,
                            et = 0,
                            dt = ct;
                          dt--;

                        )
                          (R = (L = fe[dt]).pin) &&
                            L.start - L._pinPush <= l &&
                            !ge &&
                            L.end > 0 &&
                            ((w =
                              L.end -
                              (je._startClamp
                                ? Math.max(0, L.start)
                                : L.start)),
                            ((R === _t && L.start - L._pinPush < l) ||
                              R === ut) &&
                              isNaN(lt) &&
                              (et += w * (1 - L.progress)),
                            R === Ct && (rt += w));
                        if (
                          ((l += et),
                          (u += et),
                          je._startClamp && (je._startClamp += et),
                          je._endClamp &&
                            !wt &&
                            ((je._endClamp = u || -0.001),
                            (u = Math.min(u, qt(Te, _e)))),
                          (v = u - l || ((l -= 0.01) && 0.001)),
                          Z &&
                            (Ve = q.utils.clamp(
                              0,
                              1,
                              q.utils.normalize(l, u, nt)
                            )),
                          (je._pinPush = rt),
                          c &&
                            et &&
                            (((w = {})[_e.a] = "+=" + et),
                            ut && (w[_e.p] = "-=" + Ge()),
                            q.set([c, d], w)),
                          !Ct || (yt && je.end >= qt(Te, _e)))
                        ) {
                          if (_t && Ge() && !ge)
                            for (T = _t.parentNode; T && T !== X; )
                              T._pinOffset &&
                                ((l -= T._pinOffset), (u -= T._pinOffset)),
                                (T = T.parentNode);
                        } else
                          (w = Jt(Ct)),
                            (C = _e === M),
                            (k = Ge()),
                            (A = parseFloat(S(_e.a)) + rt),
                            !J &&
                              u > 1 &&
                              ((F = {
                                style: (F = (Se ? B.scrollingElement || W : Te)
                                  .style),
                                value: F["overflow" + _e.a.toUpperCase()],
                              }),
                              Se &&
                                "scroll" !==
                                  Jt(X)["overflow" + _e.a.toUpperCase()] &&
                                (F.style["overflow" + _e.a.toUpperCase()] =
                                  "scroll")),
                            Ne(Ct, x, w),
                            (b = ze(Ct)),
                            (T = Zt(Ct, !0)),
                            (H = Ce && P(Te, C ? D : M)()),
                            Mt
                              ? (((j = [Mt + _e.os2, v + rt + Qt]).t = x),
                                (dt = Mt === Gt ? te(Ct, _e) + v + rt : 0) &&
                                  (j.push(_e.d, dt + Qt),
                                  "auto" !== x.style.flexBasis &&
                                    (x.style.flexBasis = dt + Qt)),
                                He(j),
                                ut &&
                                  fe.forEach(function (t) {
                                    t.pin === ut &&
                                      !1 !== t.vars.pinSpacing &&
                                      (t._subPinOffset = !0);
                                  }),
                                Ce && Ge(nt))
                              : (dt = te(Ct, _e)) &&
                                "auto" !== x.style.flexBasis &&
                                (x.style.flexBasis = dt + Qt),
                            Ce &&
                              (((E = {
                                top: T.top + (C ? k - l : H) + Qt,
                                left: T.left + (C ? H : k - l) + Qt,
                                boxSizing: "border-box",
                                position: "fixed",
                              }).width = E.maxWidth = Math.ceil(T.width) + Qt),
                              (E.height = E.maxHeight =
                                Math.ceil(T.height) + Qt),
                              (E.margin = E.marginTop = E.marginRight = E.marginBottom = E.marginLeft =
                                "0"),
                              (E[Gt] = w[Gt]),
                              (E[Gt + "Top"] = w[Gt + "Top"]),
                              (E[Gt + "Right"] = w[Gt + "Right"]),
                              (E[Gt + "Bottom"] = w[Gt + "Bottom"]),
                              (E[Gt + "Left"] = w[Gt + "Left"]),
                              (y = (function (t, e, n) {
                                for (
                                  var i, r = [], o = t.length, s = n ? 8 : 0;
                                  s < o;
                                  s += 2
                                )
                                  (i = t[s]),
                                    r.push(i, i in e ? e[i] : t[s + 1]);
                                return (r.t = t.t), r;
                              })(m, E, ue)),
                              wt && Ge(0)),
                            n
                              ? ((z = n._initted),
                                st(1),
                                n.render(n.duration(), !0, !0),
                                (O = S(_e.a) - A + v + rt),
                                (N = Math.abs(v - O) > 1),
                                Ce && N && y.splice(y.length - 2, 2),
                                n.render(0, !0, !0),
                                z || n.invalidate(!0),
                                n.parent || n.totalTime(n.totalTime()),
                                st(0))
                              : (O = v),
                            F &&
                              (F.value
                                ? (F.style["overflow" + _e.a.toUpperCase()] =
                                    F.value)
                                : F.style.removeProperty("overflow-" + _e.a));
                        I &&
                          I.forEach(function (t) {
                            return t.revert(!1, !0);
                          }),
                          (je.start = l),
                          (je.end = u),
                          (s = a = wt ? nt : Ge()),
                          ge || wt || (s < nt && Ge(nt), (je.scroll.rec = 0)),
                          je.revert(!1, !0),
                          (Ue = St()),
                          tt && ((We = -1), tt.restart(!0)),
                          (K = 0),
                          n &&
                            xe &&
                            (n._initted || it) &&
                            n.progress() !== it &&
                            n.progress(it || 0, !0).render(n.time(), !0, !0),
                          (Z || Ve !== je.progress || ge || $t) &&
                            (n &&
                              !xe &&
                              n.totalProgress(
                                ge && l < -0.001 && !Ve
                                  ? q.utils.normalize(l, u, 0)
                                  : Ve,
                                !0
                              ),
                            (je.progress = Z || (s - l) / v === Ve ? 0 : Ve)),
                          Ct &&
                            Mt &&
                            (x._pinOffset = Math.round(je.progress * O)),
                          Y && Y.invalidate(),
                          isNaN(U) ||
                            ((U -= q.getProperty(p, _e.p)),
                            (V -= q.getProperty(f, _e.p)),
                            Xe(p, _e, U),
                            Xe(c, _e, U - (_ || 0)),
                            Xe(f, _e, V),
                            Xe(d, _e, V - (_ || 0))),
                          Z && !wt && je.update(),
                          !vt || wt || g || ((g = !0), vt(je), (g = !1));
                      }
                  }),
                  (je.getVelocity = function () {
                    return ((Ge() - a) / (St() - Q)) * 1e3 || 0;
                  }),
                  (je.endAnimation = function () {
                    Yt(je.callbackAnimation),
                      n &&
                        (Y
                          ? Y.progress(1)
                          : n.paused()
                          ? xe || Yt(n, je.direction < 0, 1)
                          : Yt(n, n.reversed()));
                  }),
                  (je.labelToScroll = function (t) {
                    return (
                      (n &&
                        n.labels &&
                        (l || je.refresh() || l) +
                          (n.labels[t] / n.duration()) * v) ||
                      0
                    );
                  }),
                  (je.getTrailing = function (t) {
                    var e = fe.indexOf(je),
                      n =
                        je.direction > 0
                          ? fe.slice(0, e).reverse()
                          : fe.slice(e + 1);
                    return (Ft(t)
                      ? n.filter(function (e) {
                          return e.vars.preventOverlaps === t;
                        })
                      : n
                    ).filter(function (t) {
                      return je.direction > 0 ? t.end <= l : t.start >= u;
                    });
                  }),
                  (je.update = function (t, e, r) {
                    if (!ge || r || t) {
                      var o,
                        c,
                        d,
                        f,
                        h,
                        g,
                        m,
                        _ = !0 === wt ? nt : je.scroll(),
                        w = t ? 0 : (_ - l) / v,
                        T = w < 0 ? 0 : w > 1 ? 1 : w || 0,
                        k = je.progress;
                      if (
                        (e &&
                          ((a = s),
                          (s = ge ? Ge() : _),
                          se &&
                            ((I = z), (z = n && !xe ? n.totalProgress() : T))),
                        Lt &&
                          Ct &&
                          !K &&
                          !kt &&
                          At &&
                          (!T && l < _ + ((_ - a) / (St() - Q)) * Lt
                            ? (T = 1e-4)
                            : 1 === T &&
                              u > _ + ((_ - a) / (St() - Q)) * Lt &&
                              (T = 0.9999)),
                        T !== k && je.enabled)
                      ) {
                        if (
                          ((f =
                            (h =
                              (o = je.isActive = !!T && T < 1) !==
                              (!!k && k < 1)) || !!T != !!k),
                          (je.direction = T > k ? 1 : -1),
                          (je.progress = T),
                          f &&
                            !K &&
                            ((c = T && !k ? 0 : 1 === T ? 1 : 1 === k ? 2 : 3),
                            xe &&
                              ((d =
                                (!h && "none" !== Ee[c + 1] && Ee[c + 1]) ||
                                Ee[c]),
                              (m =
                                n &&
                                ("complete" === d ||
                                  "reset" === d ||
                                  d in n)))),
                          be &&
                            (h || m) &&
                            (m || mt || !n) &&
                            (Bt(be)
                              ? be(je)
                              : je.getTrailing(be).forEach(function (t) {
                                  return t.endAnimation();
                                })),
                          xe ||
                            (!Y || K || kt
                              ? n && n.totalProgress(T, !(!K || (!Ue && !t)))
                              : (Y._dp._time - Y._start !== Y._time &&
                                  Y.render(Y._dp._time - Y._start),
                                Y.resetTo
                                  ? Y.resetTo(
                                      "totalProgress",
                                      T,
                                      n._tTime / n._tDur
                                    )
                                  : ((Y.vars.totalProgress = T),
                                    Y.invalidate().restart()))),
                          Ct)
                        )
                          if ((t && Mt && (x.style[Mt + _e.os2] = E), Ce)) {
                            if (f) {
                              if (
                                ((g =
                                  !t &&
                                  T > k &&
                                  u + 1 > _ &&
                                  _ + 1 >= qt(Te, _e)),
                                ue)
                              )
                                if (t || (!o && !g)) Be(Ct, x);
                                else {
                                  var S = Zt(Ct, !0),
                                    D = _ - l;
                                  Be(
                                    Ct,
                                    X,
                                    S.top + (_e === M ? D : 0) + Qt,
                                    S.left + (_e === M ? 0 : D) + Qt
                                  );
                                }
                              He(o || g ? y : b),
                                (N && T < 1 && o) ||
                                  C(A + (1 !== T || g ? 0 : O));
                            }
                          } else C(jt(A + O * T));
                        se && !i.tween && !K && !kt && tt.restart(!0),
                          ft &&
                            (h || (ie && T && (T < 1 || !bt))) &&
                            V(ft.targets).forEach(function (t) {
                              return t.classList[o || ie ? "add" : "remove"](
                                ft.className
                              );
                            }),
                          pt && !xe && !t && pt(je),
                          f && !K
                            ? (xe &&
                                (m &&
                                  ("complete" === d
                                    ? n.pause().totalProgress(1)
                                    : "reset" === d
                                    ? n.restart(!0).pause()
                                    : "restart" === d
                                    ? n.restart(!0)
                                    : n[d]()),
                                pt && pt(je)),
                              (!h && bt) ||
                                (gt && h && Ut(je, gt),
                                Oe[c] && Ut(je, Oe[c]),
                                ie && (1 === T ? je.kill(!1, 1) : (Oe[c] = 0)),
                                h ||
                                  (Oe[(c = 1 === T ? 1 : 3)] && Ut(je, Oe[c]))),
                              me &&
                                !o &&
                                Math.abs(je.getVelocity()) >
                                  (Wt(me) ? me : 2500) &&
                                (Yt(je.callbackAnimation),
                                Y
                                  ? Y.progress(1)
                                  : Yt(n, "reverse" === d ? 1 : !T, 1)))
                            : xe && pt && !K && pt(je);
                      }
                      if (R) {
                        var $ = ge
                          ? (_ / ge.duration()) * (ge._caScrollDist || 0)
                          : _;
                        L($ + (p._isFlipped ? 1 : 0)), R($);
                      }
                      rt && rt((-_ / ge.duration()) * (ge._caScrollDist || 0));
                    }
                  }),
                  (je.enable = function (e, n) {
                    je.enabled ||
                      ((je.enabled = !0),
                      re(Te, "resize", ye),
                      Se || re(Te, "scroll", ve),
                      Le && re(t, "refreshInit", Le),
                      !1 !== e && ((je.progress = Ve = 0), (s = a = We = Ge())),
                      !1 !== n && je.refresh());
                  }),
                  (je.getTween = function (t) {
                    return t && i ? i.tween : Y;
                  }),
                  (je.setPositions = function (t, e, n, i) {
                    if (ge) {
                      var r = ge.scrollTrigger,
                        o = ge.duration(),
                        s = r.end - r.start;
                      (t = r.start + (s * t) / o), (e = r.start + (s * e) / o);
                    }
                    je.refresh(
                      !1,
                      !1,
                      {
                        start: Dt(t, n && !!je._startClamp),
                        end: Dt(e, n && !!je._endClamp),
                      },
                      i
                    ),
                      je.update();
                  }),
                  (je.adjustPinSpacing = function (t) {
                    if (j && t) {
                      var e = j.indexOf(_e.d) + 1;
                      (j[e] = parseFloat(j[e]) + t + Qt),
                        (j[1] = parseFloat(j[1]) + t + Qt),
                        He(j);
                    }
                  }),
                  (je.disable = function (e, n) {
                    if (
                      je.enabled &&
                      (!1 !== e && je.revert(!0, !0),
                      (je.enabled = je.isActive = !1),
                      n || (Y && Y.pause()),
                      (nt = 0),
                      r && (r.uncache = 1),
                      Le && oe(t, "refreshInit", Le),
                      tt &&
                        (tt.pause(),
                        i.tween && i.tween.kill() && (i.tween = 0)),
                      !Se)
                    ) {
                      for (var o = fe.length; o--; )
                        if (fe[o].scroller === Te && fe[o] !== je) return;
                      oe(Te, "resize", ye), Se || oe(Te, "scroll", ve);
                    }
                  }),
                  (je.kill = function (t, i) {
                    je.disable(t, i), Y && !i && Y.kill(), ht && delete he[ht];
                    var o = fe.indexOf(je);
                    o >= 0 && fe.splice(o, 1),
                      o === et && $e > 0 && et--,
                      (o = 0),
                      fe.forEach(function (t) {
                        return t.scroller === je.scroller && (o = 1);
                      }),
                      o || wt || (je.scroll.rec = 0),
                      n &&
                        ((n.scrollTrigger = null),
                        t && n.revert({ kill: !1 }),
                        i || n.kill()),
                      c &&
                        [c, d, p, f].forEach(function (t) {
                          return t.parentNode && t.parentNode.removeChild(t);
                        }),
                      Tt === je && (Tt = 0),
                      Ct &&
                        (r && (r.uncache = 1),
                        (o = 0),
                        fe.forEach(function (t) {
                          return t.pin === Ct && o++;
                        }),
                        o || (r.spacer = 0)),
                      e.onKill && e.onKill(je);
                  }),
                  fe.push(je),
                  je.enable(!1, !1),
                  at && at(je),
                  n && n.add && !v)
                ) {
                  var Ze = je.update;
                  (je.update = function () {
                    (je.update = Ze), l || u || je.refresh();
                  }),
                    q.delayedCall(0.01, je.update),
                    (v = 0.01),
                    (l = u = 0);
                } else je.refresh();
                Ct &&
                  (function () {
                    if (xt !== Ae) {
                      var t = (xt = Ae);
                      requestAnimationFrame(function () {
                        return t === Ae && De(!0);
                      });
                    }
                  })();
              } else this.update = this.refresh = this.kill = Pt;
            }),
            (t.register = function (e) {
              return (
                I ||
                  ((q = e || Nt()),
                  Lt() && window.document && t.enable(),
                  (I = Ot)),
                I
              );
            }),
            (t.defaults = function (t) {
              if (t) for (var e in t) le[e] = t[e];
              return le;
            }),
            (t.disable = function (t, e) {
              (Ot = 0),
                fe.forEach(function (n) {
                  return n[e ? "kill" : "disable"](t);
                }),
                oe(F, "wheel", ve),
                oe(B, "scroll", ve),
                clearInterval(J),
                oe(B, "touchcancel", Pt),
                oe(X, "touchstart", Pt),
                ie(oe, B, "pointerdown,touchstart,mousedown", Mt),
                ie(oe, B, "pointerup,touchend,mouseup", $t),
                U.kill(),
                It(oe);
              for (var n = 0; n < _.length; n += 3)
                se(oe, _[n], _[n + 1]), se(oe, _[n], _[n + 2]);
            }),
            (t.enable = function () {
              if (
                ((F = window),
                (B = document),
                (W = B.documentElement),
                (X = B.body),
                q &&
                  ((V = q.utils.toArray),
                  (G = q.utils.clamp),
                  (ft = q.core.context || Pt),
                  (st = q.core.suppressOverwrites || Pt),
                  (ht = F.history.scrollRestoration || "auto"),
                  (Me = F.pageYOffset),
                  q.core.globals("ScrollTrigger", t),
                  X))
              ) {
                (Ot = 1),
                  ((gt = document.createElement("div")).style.height = "100vh"),
                  (gt.style.position = "absolute"),
                  Oe(),
                  (function t() {
                    return Ot && requestAnimationFrame(t);
                  })(),
                  z.register(q),
                  (t.isTouch = z.isTouch),
                  (pt =
                    z.isTouch &&
                    /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                  (ut = 1 === z.isTouch),
                  re(F, "wheel", ve),
                  (Y = [F, B, W, X]),
                  q.matchMedia
                    ? ((t.matchMedia = function (t) {
                        var e,
                          n = q.matchMedia();
                        for (e in t) n.add(e, t[e]);
                        return n;
                      }),
                      q.addEventListener("matchMediaInit", function () {
                        return Se();
                      }),
                      q.addEventListener("matchMediaRevert", function () {
                        return ke();
                      }),
                      q.addEventListener("matchMedia", function () {
                        De(0, 1), xe("matchMedia");
                      }),
                      q.matchMedia("(orientation: portrait)", function () {
                        return me(), me;
                      }))
                    : console.warn("Requires GSAP 3.11.0 or later"),
                  me(),
                  re(B, "scroll", ve);
                var e,
                  n,
                  i = X.style,
                  r = i.borderTopStyle,
                  o = q.core.Animation.prototype;
                for (
                  o.revert ||
                    Object.defineProperty(o, "revert", {
                      value: function () {
                        return this.time(-0.01, !0);
                      },
                    }),
                    i.borderTopStyle = "solid",
                    e = Zt(X),
                    M.m = Math.round(e.top + M.sc()) || 0,
                    D.m = Math.round(e.left + D.sc()) || 0,
                    r
                      ? (i.borderTopStyle = r)
                      : i.removeProperty("border-top-style"),
                    J = setInterval(ge, 250),
                    q.delayedCall(0.5, function () {
                      return (kt = 0);
                    }),
                    re(B, "touchcancel", Pt),
                    re(X, "touchstart", Pt),
                    ie(re, B, "pointerdown,touchstart,mousedown", Mt),
                    ie(re, B, "pointerup,touchend,mouseup", $t),
                    tt = q.utils.checkPrefix("transform"),
                    Le.push(tt),
                    I = St(),
                    U = q.delayedCall(0.2, De).pause(),
                    rt = [
                      B,
                      "visibilitychange",
                      function () {
                        var t = F.innerWidth,
                          e = F.innerHeight;
                        B.hidden
                          ? ((nt = t), (it = e))
                          : (nt === t && it === e) || ye();
                      },
                      B,
                      "DOMContentLoaded",
                      De,
                      F,
                      "load",
                      De,
                      F,
                      "resize",
                      ye,
                    ],
                    It(re),
                    fe.forEach(function (t) {
                      return t.enable(0, 1);
                    }),
                    n = 0;
                  n < _.length;
                  n += 3
                )
                  se(oe, _[n], _[n + 1]), se(oe, _[n], _[n + 2]);
              }
            }),
            (t.config = function (e) {
              "limitCallbacks" in e && (bt = !!e.limitCallbacks);
              var n = e.syncInterval;
              (n && clearInterval(J)) || ((J = n) && setInterval(ge, n)),
                "ignoreMobileResize" in e &&
                  (ut = 1 === t.isTouch && e.ignoreMobileResize),
                "autoRefreshEvents" in e &&
                  (It(oe) || It(re, e.autoRefreshEvents || "none"),
                  (at = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
            }),
            (t.scrollerProxy = function (t, e) {
              var n = $(t),
                i = _.indexOf(n),
                r = Rt(n);
              ~i && _.splice(i, r ? 6 : 2),
                e && (r ? w.unshift(F, e, X, e, W, e) : w.unshift(n, e));
            }),
            (t.clearMatchMedia = function (t) {
              fe.forEach(function (e) {
                return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
              });
            }),
            (t.isInViewport = function (t, e, n) {
              var i = (Ft(t) ? $(t) : t).getBoundingClientRect(),
                r = i[n ? "width" : "height"] * e || 0;
              return n
                ? i.right - r > 0 && i.left + r < F.innerWidth
                : i.bottom - r > 0 && i.top + r < F.innerHeight;
            }),
            (t.positionInViewport = function (t, e, n) {
              Ft(t) && (t = $(t));
              var i = t.getBoundingClientRect(),
                r = i[n ? "width" : "height"],
                o =
                  null == e
                    ? r / 2
                    : e in ue
                    ? ue[e] * r
                    : ~e.indexOf("%")
                    ? (parseFloat(e) * r) / 100
                    : parseFloat(e) || 0;
              return n
                ? (i.left + o) / F.innerWidth
                : (i.top + o) / F.innerHeight;
            }),
            (t.killAll = function (t) {
              if (
                (fe.slice(0).forEach(function (t) {
                  return "ScrollSmoother" !== t.vars.id && t.kill();
                }),
                !0 !== t)
              ) {
                var e = be.killAll || [];
                (be = {}),
                  e.forEach(function (t) {
                    return t();
                  });
              }
            }),
            t
          );
        })();
      (Ue.version = "3.12.5"),
        (Ue.saveStyles = function (t) {
          return t
            ? V(t).forEach(function (t) {
                if (t && t.style) {
                  var e = Te.indexOf(t);
                  e >= 0 && Te.splice(e, 5),
                    Te.push(
                      t,
                      t.style.cssText,
                      t.getBBox && t.getAttribute("transform"),
                      q.core.getCache(t),
                      ft()
                    );
                }
              })
            : Te;
        }),
        (Ue.revert = function (t, e) {
          return Se(!t, e);
        }),
        (Ue.create = function (t, e) {
          return new Ue(t, e);
        }),
        (Ue.refresh = function (t) {
          return t ? ye() : (I || Ue.register()) && De(!0);
        }),
        (Ue.update = function (t) {
          return ++_.cache && Pe(!0 === t ? 2 : 0);
        }),
        (Ue.clearScrollMemory = Ce),
        (Ue.maxScroll = function (t, e) {
          return qt(t, e ? D : M);
        }),
        (Ue.getScrollFunc = function (t, e) {
          return P($(t), e ? D : M);
        }),
        (Ue.getById = function (t) {
          return he[t];
        }),
        (Ue.getAll = function () {
          return fe.filter(function (t) {
            return "ScrollSmoother" !== t.vars.id;
          });
        }),
        (Ue.isScrolling = function () {
          return !!At;
        }),
        (Ue.snapDirectional = ne),
        (Ue.addEventListener = function (t, e) {
          var n = be[t] || (be[t] = []);
          ~n.indexOf(e) || n.push(e);
        }),
        (Ue.removeEventListener = function (t, e) {
          var n = be[t],
            i = n && n.indexOf(e);
          i >= 0 && n.splice(i, 1);
        }),
        (Ue.batch = function (t, e) {
          var n,
            i = [],
            r = {},
            o = e.interval || 0.016,
            s = e.batchMax || 1e9,
            a = function (t, e) {
              var n = [],
                i = [],
                r = q
                  .delayedCall(o, function () {
                    e(n, i), (n = []), (i = []);
                  })
                  .pause();
              return function (t) {
                n.length || r.restart(!0),
                  n.push(t.trigger),
                  i.push(t),
                  s <= n.length && r.progress(1);
              };
            };
          for (n in e)
            r[n] =
              "on" === n.substr(0, 2) && Bt(e[n]) && "onRefreshInit" !== n
                ? a(0, e[n])
                : e[n];
          return (
            Bt(s) &&
              ((s = s()),
              re(Ue, "refresh", function () {
                return (s = e.batchMax());
              })),
            V(t).forEach(function (t) {
              var e = {};
              for (n in r) e[n] = r[n];
              (e.trigger = t), i.push(Ue.create(e));
            }),
            i
          );
        });
      var Ve,
        Ge = function (t, e, n, i) {
          return (
            e > i ? t(i) : e < 0 && t(0),
            n > i ? (i - e) / (n - e) : n < 0 ? e / (e - n) : 1
          );
        },
        Qe = function t(e, n) {
          !0 === n
            ? e.style.removeProperty("touch-action")
            : (e.style.touchAction =
                !0 === n
                  ? "auto"
                  : n
                  ? "pan-" + n + (z.isTouch ? " pinch-zoom" : "")
                  : "none"),
            e === W && t(X, n);
        },
        Je = { auto: 1, scroll: 1 },
        Ke = function (t) {
          var e,
            n = t.event,
            i = t.target,
            r = t.axis,
            o = (n.changedTouches ? n.changedTouches[0] : n).target,
            s = o._gsap || q.core.getCache(o),
            a = St();
          if (!s._isScrollT || a - s._isScrollT > 2e3) {
            for (
              ;
              o &&
              o !== X &&
              ((o.scrollHeight <= o.clientHeight &&
                o.scrollWidth <= o.clientWidth) ||
                (!Je[(e = Jt(o)).overflowY] && !Je[e.overflowX]));

            )
              o = o.parentNode;
            (s._isScroll =
              o &&
              o !== i &&
              !Rt(o) &&
              (Je[(e = Jt(o)).overflowY] || Je[e.overflowX])),
              (s._isScrollT = a);
          }
          (s._isScroll || "x" === r) &&
            (n.stopPropagation(), (n._gsapAllow = !0));
        },
        Ze = function (t, e, n, i) {
          return z.create({
            target: t,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: e,
            onWheel: (i = i && Ke),
            onPress: i,
            onDrag: i,
            onScroll: i,
            onEnable: function () {
              return n && re(B, z.eventTypes[0], en, !1, !0);
            },
            onDisable: function () {
              return oe(B, z.eventTypes[0], en, !0);
            },
          });
        },
        tn = /(input|label|select|textarea)/i,
        en = function (t) {
          var e = tn.test(t.target.tagName);
          (e || Ve) && ((t._gsapAllow = !0), (Ve = e));
        },
        nn = function (t) {
          Xt(t) || (t = {}),
            (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
            t.type || (t.type = "wheel,touch"),
            (t.debounce = !!t.debounce),
            (t.id = t.id || "normalizer");
          var e,
            n,
            i,
            r,
            o,
            s,
            a,
            l,
            u = t,
            c = u.normalizeScrollX,
            d = u.momentum,
            p = u.allowNestedScroll,
            f = u.onRelease,
            h = $(t.target) || W,
            g = q.core.globals().ScrollSmoother,
            v = g && g.get(),
            m =
              pt &&
              ((t.content && $(t.content)) ||
                (v && !1 !== t.content && !v.smooth() && v.content())),
            y = P(h, M),
            b = P(h, D),
            w = 1,
            x =
              (z.isTouch && F.visualViewport
                ? F.visualViewport.scale * F.visualViewport.width
                : F.outerWidth) / F.innerWidth,
            T = 0,
            k = Bt(d)
              ? function () {
                  return d(e);
                }
              : function () {
                  return d || 2.8;
                },
            S = Ze(h, t.type, !0, p),
            C = function () {
              return (r = !1);
            },
            A = Pt,
            O = Pt,
            E = function () {
              (n = qt(h, M)),
                (O = G(pt ? 1 : 0, n)),
                c && (A = G(0, qt(h, D))),
                (i = Ae);
            },
            j = function () {
              (m._gsap.y = jt(parseFloat(m._gsap.y) + y.offset) + "px"),
                (m.style.transform =
                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                  parseFloat(m._gsap.y) +
                  ", 0, 1)"),
                (y.offset = y.cacheID = 0);
            },
            L = function () {
              E(),
                o.isActive() &&
                  o.vars.scrollY > n &&
                  (y() > n ? o.progress(1) && y(n) : o.resetTo("scrollY", n));
            };
          return (
            m && q.set(m, { y: "+=0" }),
            (t.ignoreCheck = function (t) {
              return (
                (pt &&
                  "touchmove" === t.type &&
                  (function () {
                    if (r) {
                      requestAnimationFrame(C);
                      var t = jt(e.deltaY / 2),
                        n = O(y.v - t);
                      if (m && n !== y.v + y.offset) {
                        y.offset = n - y.v;
                        var i = jt(
                          (parseFloat(m && m._gsap.y) || 0) - y.offset
                        );
                        (m.style.transform =
                          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                          i +
                          ", 0, 1)"),
                          (m._gsap.y = i + "px"),
                          (y.cacheID = _.cache),
                          Pe();
                      }
                      return !0;
                    }
                    y.offset && j(), (r = !0);
                  })()) ||
                (w > 1.05 && "touchstart" !== t.type) ||
                e.isGesturing ||
                (t.touches && t.touches.length > 1)
              );
            }),
            (t.onPress = function () {
              r = !1;
              var t = w;
              (w = jt(((F.visualViewport && F.visualViewport.scale) || 1) / x)),
                o.pause(),
                t !== w && Qe(h, w > 1.01 || (!c && "x")),
                (s = b()),
                (a = y()),
                E(),
                (i = Ae);
            }),
            (t.onRelease = t.onGestureStart = function (t, e) {
              if ((y.offset && j(), e)) {
                _.cache++;
                var i,
                  r,
                  s = k();
                c &&
                  ((r = (i = b()) + (0.05 * s * -t.velocityX) / 0.227),
                  (s *= Ge(b, i, r, qt(h, D))),
                  (o.vars.scrollX = A(r))),
                  (r = (i = y()) + (0.05 * s * -t.velocityY) / 0.227),
                  (s *= Ge(y, i, r, qt(h, M))),
                  (o.vars.scrollY = O(r)),
                  o.invalidate().duration(s).play(0.01),
                  ((pt && o.vars.scrollY >= n) || i >= n - 1) &&
                    q.to({}, { onUpdate: L, duration: s });
              } else l.restart(!0);
              f && f(t);
            }),
            (t.onWheel = function () {
              o._ts && o.pause(), St() - T > 1e3 && ((i = 0), (T = St()));
            }),
            (t.onChange = function (t, e, n, r, o) {
              if (
                (Ae !== i && E(),
                e &&
                  c &&
                  b(A(r[2] === e ? s + (t.startX - t.x) : b() + e - r[1])),
                n)
              ) {
                y.offset && j();
                var l = o[2] === n,
                  u = l ? a + t.startY - t.y : y() + n - o[1],
                  d = O(u);
                l && u !== d && (a += d - u), y(d);
              }
              (n || e) && Pe();
            }),
            (t.onEnable = function () {
              Qe(h, !c && "x"),
                Ue.addEventListener("refresh", L),
                re(F, "resize", L),
                y.smooth &&
                  ((y.target.style.scrollBehavior = "auto"),
                  (y.smooth = b.smooth = !1)),
                S.enable();
            }),
            (t.onDisable = function () {
              Qe(h, !0),
                oe(F, "resize", L),
                Ue.removeEventListener("refresh", L),
                S.kill();
            }),
            (t.lockAxis = !1 !== t.lockAxis),
            ((e = new z(t)).iOS = pt),
            pt && !y() && y(1),
            pt && q.ticker.add(Pt),
            (l = e._dc),
            (o = q.to(e, {
              ease: "power4",
              paused: !0,
              inherit: !1,
              scrollX: c ? "+=0.1" : "+=0",
              scrollY: "+=0.1",
              modifiers: {
                scrollY: We(y, y(), function () {
                  return o.pause();
                }),
              },
              onUpdate: Pe,
              onComplete: l.vars.onComplete,
            })),
            e
          );
        };
      (Ue.sort = function (t) {
        return fe.sort(
          t ||
            function (t, e) {
              return (
                -1e6 * (t.vars.refreshPriority || 0) +
                t.start -
                (e.start + -1e6 * (e.vars.refreshPriority || 0))
              );
            }
        );
      }),
        (Ue.observe = function (t) {
          return new z(t);
        }),
        (Ue.normalizeScroll = function (t) {
          if (void 0 === t) return lt;
          if (!0 === t && lt) return lt.enable();
          if (!1 === t) return lt && lt.kill(), void (lt = t);
          var e = t instanceof z ? t : nn(t);
          return (
            lt && lt.target === e.target && lt.kill(),
            Rt(e.target) && (lt = e),
            e
          );
        }),
        (Ue.core = {
          _getVelocityProp: j,
          _inputObserver: Ze,
          _scrollers: _,
          _proxies: w,
          bridge: {
            ss: function () {
              At || xe("scrollStart"), (At = St());
            },
            ref: function () {
              return K;
            },
          },
        }),
        Nt() && q.registerPlugin(Ue);
    },
    function (t, e) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    },
    function (t, e, n) {
      var i, r, o;
      !(function (s) {
        "use strict";
        (r = [n(1)]),
          void 0 ===
            (o =
              "function" ==
              typeof (i = function (t) {
                var e = window.Slick || {};
                (((n = 0),
                (e = function (e, i) {
                  var r,
                    o = this;
                  (o.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(e),
                    appendDots: t(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow:
                      '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow:
                      '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (e, n) {
                      return t('<button type="button" />').text(n + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                  }),
                    (o.initials = {
                      animating: !1,
                      dragging: !1,
                      autoPlayTimer: null,
                      currentDirection: 0,
                      currentLeft: null,
                      currentSlide: 0,
                      direction: 1,
                      $dots: null,
                      listWidth: null,
                      listHeight: null,
                      loadIndex: 0,
                      $nextArrow: null,
                      $prevArrow: null,
                      scrolling: !1,
                      slideCount: null,
                      slideWidth: null,
                      $slideTrack: null,
                      $slides: null,
                      sliding: !1,
                      slideOffset: 0,
                      swipeLeft: null,
                      swiping: !1,
                      $list: null,
                      touchObject: {},
                      transformsEnabled: !1,
                      unslicked: !1,
                    }),
                    t.extend(o, o.initials),
                    (o.activeBreakpoint = null),
                    (o.animType = null),
                    (o.animProp = null),
                    (o.breakpoints = []),
                    (o.breakpointSettings = []),
                    (o.cssTransitions = !1),
                    (o.focussed = !1),
                    (o.interrupted = !1),
                    (o.hidden = "hidden"),
                    (o.paused = !0),
                    (o.positionProp = null),
                    (o.respondTo = null),
                    (o.rowCount = 1),
                    (o.shouldClick = !0),
                    (o.$slider = t(e)),
                    (o.$slidesCache = null),
                    (o.transformType = null),
                    (o.transitionType = null),
                    (o.visibilityChange = "visibilitychange"),
                    (o.windowWidth = 0),
                    (o.windowTimer = null),
                    (r = t(e).data("slick") || {}),
                    (o.options = t.extend({}, o.defaults, i, r)),
                    (o.currentSlide = o.options.initialSlide),
                    (o.originalSettings = o.options),
                    void 0 !== document.mozHidden
                      ? ((o.hidden = "mozHidden"),
                        (o.visibilityChange = "mozvisibilitychange"))
                      : void 0 !== document.webkitHidden &&
                        ((o.hidden = "webkitHidden"),
                        (o.visibilityChange = "webkitvisibilitychange")),
                    (o.autoPlay = t.proxy(o.autoPlay, o)),
                    (o.autoPlayClear = t.proxy(o.autoPlayClear, o)),
                    (o.autoPlayIterator = t.proxy(o.autoPlayIterator, o)),
                    (o.changeSlide = t.proxy(o.changeSlide, o)),
                    (o.clickHandler = t.proxy(o.clickHandler, o)),
                    (o.selectHandler = t.proxy(o.selectHandler, o)),
                    (o.setPosition = t.proxy(o.setPosition, o)),
                    (o.swipeHandler = t.proxy(o.swipeHandler, o)),
                    (o.dragHandler = t.proxy(o.dragHandler, o)),
                    (o.keyHandler = t.proxy(o.keyHandler, o)),
                    (o.instanceUid = n++),
                    (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    o.registerBreakpoints(),
                    o.init(!0);
                })).prototype.activateADA = function () {
                  this.$slideTrack
                    .find(".slick-active")
                    .attr({ "aria-hidden": "false" })
                    .find("a, input, button, select")
                    .attr({ tabindex: "0" });
                }),
                  (e.prototype.addSlide = e.prototype.slickAdd = function (
                    e,
                    n,
                    i
                  ) {
                    var r = this;
                    if ("boolean" == typeof n) (i = n), (n = null);
                    else if (n < 0 || n >= r.slideCount) return !1;
                    r.unload(),
                      "number" == typeof n
                        ? 0 === n && 0 === r.$slides.length
                          ? t(e).appendTo(r.$slideTrack)
                          : i
                          ? t(e).insertBefore(r.$slides.eq(n))
                          : t(e).insertAfter(r.$slides.eq(n))
                        : !0 === i
                        ? t(e).prependTo(r.$slideTrack)
                        : t(e).appendTo(r.$slideTrack),
                      (r.$slides = r.$slideTrack.children(this.options.slide)),
                      r.$slideTrack.children(this.options.slide).detach(),
                      r.$slideTrack.append(r.$slides),
                      r.$slides.each(function (e, n) {
                        t(n).attr("data-slick-index", e);
                      }),
                      (r.$slidesCache = r.$slides),
                      r.reinit();
                  }),
                  (e.prototype.animateHeight = function () {
                    var t = this;
                    if (
                      1 === t.options.slidesToShow &&
                      !0 === t.options.adaptiveHeight &&
                      !1 === t.options.vertical
                    ) {
                      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                      t.$list.animate({ height: e }, t.options.speed);
                    }
                  }),
                  (e.prototype.animateSlide = function (e, n) {
                    var i = {},
                      r = this;
                    r.animateHeight(),
                      !0 === r.options.rtl &&
                        !1 === r.options.vertical &&
                        (e = -e),
                      !1 === r.transformsEnabled
                        ? !1 === r.options.vertical
                          ? r.$slideTrack.animate(
                              { left: e },
                              r.options.speed,
                              r.options.easing,
                              n
                            )
                          : r.$slideTrack.animate(
                              { top: e },
                              r.options.speed,
                              r.options.easing,
                              n
                            )
                        : !1 === r.cssTransitions
                        ? (!0 === r.options.rtl &&
                            (r.currentLeft = -r.currentLeft),
                          t({ animStart: r.currentLeft }).animate(
                            { animStart: e },
                            {
                              duration: r.options.speed,
                              easing: r.options.easing,
                              step: function (t) {
                                (t = Math.ceil(t)),
                                  !1 === r.options.vertical
                                    ? ((i[r.animType] =
                                        "translate(" + t + "px, 0px)"),
                                      r.$slideTrack.css(i))
                                    : ((i[r.animType] =
                                        "translate(0px," + t + "px)"),
                                      r.$slideTrack.css(i));
                              },
                              complete: function () {
                                n && n.call();
                              },
                            }
                          ))
                        : (r.applyTransition(),
                          (e = Math.ceil(e)),
                          !1 === r.options.vertical
                            ? (i[r.animType] =
                                "translate3d(" + e + "px, 0px, 0px)")
                            : (i[r.animType] =
                                "translate3d(0px," + e + "px, 0px)"),
                          r.$slideTrack.css(i),
                          n &&
                            setTimeout(function () {
                              r.disableTransition(), n.call();
                            }, r.options.speed));
                  }),
                  (e.prototype.getNavTarget = function () {
                    var e = this.options.asNavFor;
                    return e && null !== e && (e = t(e).not(this.$slider)), e;
                  }),
                  (e.prototype.asNavFor = function (e) {
                    var n = this.getNavTarget();
                    null !== n &&
                      "object" == typeof n &&
                      n.each(function () {
                        var n = t(this).slick("getSlick");
                        n.unslicked || n.slideHandler(e, !0);
                      });
                  }),
                  (e.prototype.applyTransition = function (t) {
                    var e = this,
                      n = {};
                    !1 === e.options.fade
                      ? (n[e.transitionType] =
                          e.transformType +
                          " " +
                          e.options.speed +
                          "ms " +
                          e.options.cssEase)
                      : (n[e.transitionType] =
                          "opacity " +
                          e.options.speed +
                          "ms " +
                          e.options.cssEase),
                      !1 === e.options.fade
                        ? e.$slideTrack.css(n)
                        : e.$slides.eq(t).css(n);
                  }),
                  (e.prototype.autoPlay = function () {
                    var t = this;
                    t.autoPlayClear(),
                      t.slideCount > t.options.slidesToShow &&
                        (t.autoPlayTimer = setInterval(
                          t.autoPlayIterator,
                          t.options.autoplaySpeed
                        ));
                  }),
                  (e.prototype.autoPlayClear = function () {
                    this.autoPlayTimer && clearInterval(this.autoPlayTimer);
                  }),
                  (e.prototype.autoPlayIterator = function () {
                    var t = this,
                      e = t.currentSlide + t.options.slidesToScroll;
                    t.paused ||
                      t.interrupted ||
                      t.focussed ||
                      (!1 === t.options.infinite &&
                        (1 === t.direction &&
                        t.currentSlide + 1 === t.slideCount - 1
                          ? (t.direction = 0)
                          : 0 === t.direction &&
                            ((e = t.currentSlide - t.options.slidesToScroll),
                            t.currentSlide - 1 == 0 && (t.direction = 1))),
                      t.slideHandler(e));
                  }),
                  (e.prototype.buildArrows = function () {
                    var e = this;
                    !0 === e.options.arrows &&
                      ((e.$prevArrow = t(e.options.prevArrow).addClass(
                        "slick-arrow"
                      )),
                      (e.$nextArrow = t(e.options.nextArrow).addClass(
                        "slick-arrow"
                      )),
                      e.slideCount > e.options.slidesToShow
                        ? (e.$prevArrow
                            .removeClass("slick-hidden")
                            .removeAttr("aria-hidden tabindex"),
                          e.$nextArrow
                            .removeClass("slick-hidden")
                            .removeAttr("aria-hidden tabindex"),
                          e.htmlExpr.test(e.options.prevArrow) &&
                            e.$prevArrow.prependTo(e.options.appendArrows),
                          e.htmlExpr.test(e.options.nextArrow) &&
                            e.$nextArrow.appendTo(e.options.appendArrows),
                          !0 !== e.options.infinite &&
                            e.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"))
                        : e.$prevArrow
                            .add(e.$nextArrow)
                            .addClass("slick-hidden")
                            .attr({ "aria-disabled": "true", tabindex: "-1" }));
                  }),
                  (e.prototype.buildDots = function () {
                    var e,
                      n,
                      i = this;
                    if (
                      !0 === i.options.dots &&
                      i.slideCount > i.options.slidesToShow
                    ) {
                      for (
                        i.$slider.addClass("slick-dotted"),
                          n = t("<ul />").addClass(i.options.dotsClass),
                          e = 0;
                        e <= i.getDotCount();
                        e += 1
                      )
                        n.append(
                          t("<li />").append(
                            i.options.customPaging.call(this, i, e)
                          )
                        );
                      (i.$dots = n.appendTo(i.options.appendDots)),
                        i.$dots.find("li").first().addClass("slick-active");
                    }
                  }),
                  (e.prototype.buildOut = function () {
                    var e = this;
                    (e.$slides = e.$slider
                      .children(e.options.slide + ":not(.slick-cloned)")
                      .addClass("slick-slide")),
                      (e.slideCount = e.$slides.length),
                      e.$slides.each(function (e, n) {
                        t(n)
                          .attr("data-slick-index", e)
                          .data("originalStyling", t(n).attr("style") || "");
                      }),
                      e.$slider.addClass("slick-slider"),
                      (e.$slideTrack =
                        0 === e.slideCount
                          ? t('<div class="slick-track"/>').appendTo(e.$slider)
                          : e.$slides
                              .wrapAll('<div class="slick-track"/>')
                              .parent()),
                      (e.$list = e.$slideTrack
                        .wrap('<div class="slick-list"/>')
                        .parent()),
                      e.$slideTrack.css("opacity", 0),
                      (!0 !== e.options.centerMode &&
                        !0 !== e.options.swipeToSlide) ||
                        (e.options.slidesToScroll = 1),
                      t("img[data-lazy]", e.$slider)
                        .not("[src]")
                        .addClass("slick-loading"),
                      e.setupInfinite(),
                      e.buildArrows(),
                      e.buildDots(),
                      e.updateDots(),
                      e.setSlideClasses(
                        "number" == typeof e.currentSlide ? e.currentSlide : 0
                      ),
                      !0 === e.options.draggable &&
                        e.$list.addClass("draggable");
                  }),
                  (e.prototype.buildRows = function () {
                    var t,
                      e,
                      n,
                      i,
                      r,
                      o,
                      s,
                      a = this;
                    if (
                      ((i = document.createDocumentFragment()),
                      (o = a.$slider.children()),
                      a.options.rows > 0)
                    ) {
                      for (
                        s = a.options.slidesPerRow * a.options.rows,
                          r = Math.ceil(o.length / s),
                          t = 0;
                        t < r;
                        t++
                      ) {
                        var l = document.createElement("div");
                        for (e = 0; e < a.options.rows; e++) {
                          var u = document.createElement("div");
                          for (n = 0; n < a.options.slidesPerRow; n++) {
                            var c = t * s + (e * a.options.slidesPerRow + n);
                            o.get(c) && u.appendChild(o.get(c));
                          }
                          l.appendChild(u);
                        }
                        i.appendChild(l);
                      }
                      a.$slider.empty().append(i),
                        a.$slider
                          .children()
                          .children()
                          .children()
                          .css({
                            width: 100 / a.options.slidesPerRow + "%",
                            display: "inline-block",
                          });
                    }
                  }),
                  (e.prototype.checkResponsive = function (e, n) {
                    var i,
                      r,
                      o,
                      s = this,
                      a = !1,
                      l = s.$slider.width(),
                      u = window.innerWidth || t(window).width();
                    if (
                      ("window" === s.respondTo
                        ? (o = u)
                        : "slider" === s.respondTo
                        ? (o = l)
                        : "min" === s.respondTo && (o = Math.min(u, l)),
                      s.options.responsive &&
                        s.options.responsive.length &&
                        null !== s.options.responsive)
                    ) {
                      for (i in ((r = null), s.breakpoints))
                        s.breakpoints.hasOwnProperty(i) &&
                          (!1 === s.originalSettings.mobileFirst
                            ? o < s.breakpoints[i] && (r = s.breakpoints[i])
                            : o > s.breakpoints[i] && (r = s.breakpoints[i]));
                      null !== r
                        ? null !== s.activeBreakpoint
                          ? (r !== s.activeBreakpoint || n) &&
                            ((s.activeBreakpoint = r),
                            "unslick" === s.breakpointSettings[r]
                              ? s.unslick(r)
                              : ((s.options = t.extend(
                                  {},
                                  s.originalSettings,
                                  s.breakpointSettings[r]
                                )),
                                !0 === e &&
                                  (s.currentSlide = s.options.initialSlide),
                                s.refresh(e)),
                            (a = r))
                          : ((s.activeBreakpoint = r),
                            "unslick" === s.breakpointSettings[r]
                              ? s.unslick(r)
                              : ((s.options = t.extend(
                                  {},
                                  s.originalSettings,
                                  s.breakpointSettings[r]
                                )),
                                !0 === e &&
                                  (s.currentSlide = s.options.initialSlide),
                                s.refresh(e)),
                            (a = r))
                        : null !== s.activeBreakpoint &&
                          ((s.activeBreakpoint = null),
                          (s.options = s.originalSettings),
                          !0 === e && (s.currentSlide = s.options.initialSlide),
                          s.refresh(e),
                          (a = r)),
                        e ||
                          !1 === a ||
                          s.$slider.trigger("breakpoint", [s, a]);
                    }
                  }),
                  (e.prototype.changeSlide = function (e, n) {
                    var i,
                      r,
                      o = this,
                      s = t(e.currentTarget);
                    switch (
                      (s.is("a") && e.preventDefault(),
                      s.is("li") || (s = s.closest("li")),
                      (i =
                        o.slideCount % o.options.slidesToScroll != 0
                          ? 0
                          : (o.slideCount - o.currentSlide) %
                            o.options.slidesToScroll),
                      e.data.message)
                    ) {
                      case "previous":
                        (r =
                          0 === i
                            ? o.options.slidesToScroll
                            : o.options.slidesToShow - i),
                          o.slideCount > o.options.slidesToShow &&
                            o.slideHandler(o.currentSlide - r, !1, n);
                        break;
                      case "next":
                        (r = 0 === i ? o.options.slidesToScroll : i),
                          o.slideCount > o.options.slidesToShow &&
                            o.slideHandler(o.currentSlide + r, !1, n);
                        break;
                      case "index":
                        var a =
                          0 === e.data.index
                            ? 0
                            : e.data.index ||
                              s.index() * o.options.slidesToScroll;
                        o.slideHandler(o.checkNavigable(a), !1, n),
                          s.children().trigger("focus");
                        break;
                      default:
                        return;
                    }
                  }),
                  (e.prototype.checkNavigable = function (t) {
                    var e, n;
                    if (
                      ((n = 0),
                      t > (e = this.getNavigableIndexes())[e.length - 1])
                    )
                      t = e[e.length - 1];
                    else
                      for (var i in e) {
                        if (t < e[i]) {
                          t = n;
                          break;
                        }
                        n = e[i];
                      }
                    return t;
                  }),
                  (e.prototype.cleanUpEvents = function () {
                    var e = this;
                    e.options.dots &&
                      null !== e.$dots &&
                      (t("li", e.$dots)
                        .off("click.slick", e.changeSlide)
                        .off("mouseenter.slick", t.proxy(e.interrupt, e, !0))
                        .off("mouseleave.slick", t.proxy(e.interrupt, e, !1)),
                      !0 === e.options.accessibility &&
                        e.$dots.off("keydown.slick", e.keyHandler)),
                      e.$slider.off("focus.slick blur.slick"),
                      !0 === e.options.arrows &&
                        e.slideCount > e.options.slidesToShow &&
                        (e.$prevArrow &&
                          e.$prevArrow.off("click.slick", e.changeSlide),
                        e.$nextArrow &&
                          e.$nextArrow.off("click.slick", e.changeSlide),
                        !0 === e.options.accessibility &&
                          (e.$prevArrow &&
                            e.$prevArrow.off("keydown.slick", e.keyHandler),
                          e.$nextArrow &&
                            e.$nextArrow.off("keydown.slick", e.keyHandler))),
                      e.$list.off(
                        "touchstart.slick mousedown.slick",
                        e.swipeHandler
                      ),
                      e.$list.off(
                        "touchmove.slick mousemove.slick",
                        e.swipeHandler
                      ),
                      e.$list.off(
                        "touchend.slick mouseup.slick",
                        e.swipeHandler
                      ),
                      e.$list.off(
                        "touchcancel.slick mouseleave.slick",
                        e.swipeHandler
                      ),
                      e.$list.off("click.slick", e.clickHandler),
                      t(document).off(e.visibilityChange, e.visibility),
                      e.cleanUpSlideEvents(),
                      !0 === e.options.accessibility &&
                        e.$list.off("keydown.slick", e.keyHandler),
                      !0 === e.options.focusOnSelect &&
                        t(e.$slideTrack)
                          .children()
                          .off("click.slick", e.selectHandler),
                      t(window).off(
                        "orientationchange.slick.slick-" + e.instanceUid,
                        e.orientationChange
                      ),
                      t(window).off(
                        "resize.slick.slick-" + e.instanceUid,
                        e.resize
                      ),
                      t("[draggable!=true]", e.$slideTrack).off(
                        "dragstart",
                        e.preventDefault
                      ),
                      t(window).off(
                        "load.slick.slick-" + e.instanceUid,
                        e.setPosition
                      );
                  }),
                  (e.prototype.cleanUpSlideEvents = function () {
                    var e = this;
                    e.$list.off(
                      "mouseenter.slick",
                      t.proxy(e.interrupt, e, !0)
                    ),
                      e.$list.off(
                        "mouseleave.slick",
                        t.proxy(e.interrupt, e, !1)
                      );
                  }),
                  (e.prototype.cleanUpRows = function () {
                    var t,
                      e = this;
                    e.options.rows > 0 &&
                      ((t = e.$slides.children().children()).removeAttr(
                        "style"
                      ),
                      e.$slider.empty().append(t));
                  }),
                  (e.prototype.clickHandler = function (t) {
                    !1 === this.shouldClick &&
                      (t.stopImmediatePropagation(),
                      t.stopPropagation(),
                      t.preventDefault());
                  }),
                  (e.prototype.destroy = function (e) {
                    var n = this;
                    n.autoPlayClear(),
                      (n.touchObject = {}),
                      n.cleanUpEvents(),
                      t(".slick-cloned", n.$slider).detach(),
                      n.$dots && n.$dots.remove(),
                      n.$prevArrow &&
                        n.$prevArrow.length &&
                        (n.$prevArrow
                          .removeClass(
                            "slick-disabled slick-arrow slick-hidden"
                          )
                          .removeAttr("aria-hidden aria-disabled tabindex")
                          .css("display", ""),
                        n.htmlExpr.test(n.options.prevArrow) &&
                          n.$prevArrow.remove()),
                      n.$nextArrow &&
                        n.$nextArrow.length &&
                        (n.$nextArrow
                          .removeClass(
                            "slick-disabled slick-arrow slick-hidden"
                          )
                          .removeAttr("aria-hidden aria-disabled tabindex")
                          .css("display", ""),
                        n.htmlExpr.test(n.options.nextArrow) &&
                          n.$nextArrow.remove()),
                      n.$slides &&
                        (n.$slides
                          .removeClass(
                            "slick-slide slick-active slick-center slick-visible slick-current"
                          )
                          .removeAttr("aria-hidden")
                          .removeAttr("data-slick-index")
                          .each(function () {
                            t(this).attr(
                              "style",
                              t(this).data("originalStyling")
                            );
                          }),
                        n.$slideTrack.children(this.options.slide).detach(),
                        n.$slideTrack.detach(),
                        n.$list.detach(),
                        n.$slider.append(n.$slides)),
                      n.cleanUpRows(),
                      n.$slider.removeClass("slick-slider"),
                      n.$slider.removeClass("slick-initialized"),
                      n.$slider.removeClass("slick-dotted"),
                      (n.unslicked = !0),
                      e || n.$slider.trigger("destroy", [n]);
                  }),
                  (e.prototype.disableTransition = function (t) {
                    var e = this,
                      n = {};
                    (n[e.transitionType] = ""),
                      !1 === e.options.fade
                        ? e.$slideTrack.css(n)
                        : e.$slides.eq(t).css(n);
                  }),
                  (e.prototype.fadeSlide = function (t, e) {
                    var n = this;
                    !1 === n.cssTransitions
                      ? (n.$slides.eq(t).css({ zIndex: n.options.zIndex }),
                        n.$slides
                          .eq(t)
                          .animate(
                            { opacity: 1 },
                            n.options.speed,
                            n.options.easing,
                            e
                          ))
                      : (n.applyTransition(t),
                        n.$slides
                          .eq(t)
                          .css({ opacity: 1, zIndex: n.options.zIndex }),
                        e &&
                          setTimeout(function () {
                            n.disableTransition(t), e.call();
                          }, n.options.speed));
                  }),
                  (e.prototype.fadeSlideOut = function (t) {
                    var e = this;
                    !1 === e.cssTransitions
                      ? e.$slides
                          .eq(t)
                          .animate(
                            { opacity: 0, zIndex: e.options.zIndex - 2 },
                            e.options.speed,
                            e.options.easing
                          )
                      : (e.applyTransition(t),
                        e.$slides
                          .eq(t)
                          .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
                  }),
                  (e.prototype.filterSlides = e.prototype.slickFilter = function (
                    t
                  ) {
                    var e = this;
                    null !== t &&
                      ((e.$slidesCache = e.$slides),
                      e.unload(),
                      e.$slideTrack.children(this.options.slide).detach(),
                      e.$slidesCache.filter(t).appendTo(e.$slideTrack),
                      e.reinit());
                  }),
                  (e.prototype.focusHandler = function () {
                    var e = this;
                    e.$slider
                      .off("focus.slick blur.slick")
                      .on("focus.slick blur.slick", "*", function (n) {
                        n.stopImmediatePropagation();
                        var i = t(this);
                        setTimeout(function () {
                          e.options.pauseOnFocus &&
                            ((e.focussed = i.is(":focus")), e.autoPlay());
                        }, 0);
                      });
                  }),
                  (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
                    return this.currentSlide;
                  }),
                  (e.prototype.getDotCount = function () {
                    var t = this,
                      e = 0,
                      n = 0,
                      i = 0;
                    if (!0 === t.options.infinite)
                      if (t.slideCount <= t.options.slidesToShow) ++i;
                      else
                        for (; e < t.slideCount; )
                          ++i,
                            (e = n + t.options.slidesToScroll),
                            (n +=
                              t.options.slidesToScroll <= t.options.slidesToShow
                                ? t.options.slidesToScroll
                                : t.options.slidesToShow);
                    else if (!0 === t.options.centerMode) i = t.slideCount;
                    else if (t.options.asNavFor)
                      for (; e < t.slideCount; )
                        ++i,
                          (e = n + t.options.slidesToScroll),
                          (n +=
                            t.options.slidesToScroll <= t.options.slidesToShow
                              ? t.options.slidesToScroll
                              : t.options.slidesToShow);
                    else
                      i =
                        1 +
                        Math.ceil(
                          (t.slideCount - t.options.slidesToShow) /
                            t.options.slidesToScroll
                        );
                    return i - 1;
                  }),
                  (e.prototype.getLeft = function (t) {
                    var e,
                      n,
                      i,
                      r,
                      o = this,
                      s = 0;
                    return (
                      (o.slideOffset = 0),
                      (n = o.$slides.first().outerHeight(!0)),
                      !0 === o.options.infinite
                        ? (o.slideCount > o.options.slidesToShow &&
                            ((o.slideOffset =
                              o.slideWidth * o.options.slidesToShow * -1),
                            (r = -1),
                            !0 === o.options.vertical &&
                              !0 === o.options.centerMode &&
                              (2 === o.options.slidesToShow
                                ? (r = -1.5)
                                : 1 === o.options.slidesToShow && (r = -2)),
                            (s = n * o.options.slidesToShow * r)),
                          o.slideCount % o.options.slidesToScroll != 0 &&
                            t + o.options.slidesToScroll > o.slideCount &&
                            o.slideCount > o.options.slidesToShow &&
                            (t > o.slideCount
                              ? ((o.slideOffset =
                                  (o.options.slidesToShow -
                                    (t - o.slideCount)) *
                                  o.slideWidth *
                                  -1),
                                (s =
                                  (o.options.slidesToShow -
                                    (t - o.slideCount)) *
                                  n *
                                  -1))
                              : ((o.slideOffset =
                                  (o.slideCount % o.options.slidesToScroll) *
                                  o.slideWidth *
                                  -1),
                                (s =
                                  (o.slideCount % o.options.slidesToScroll) *
                                  n *
                                  -1))))
                        : t + o.options.slidesToShow > o.slideCount &&
                          ((o.slideOffset =
                            (t + o.options.slidesToShow - o.slideCount) *
                            o.slideWidth),
                          (s =
                            (t + o.options.slidesToShow - o.slideCount) * n)),
                      o.slideCount <= o.options.slidesToShow &&
                        ((o.slideOffset = 0), (s = 0)),
                      !0 === o.options.centerMode &&
                      o.slideCount <= o.options.slidesToShow
                        ? (o.slideOffset =
                            (o.slideWidth *
                              Math.floor(o.options.slidesToShow)) /
                              2 -
                            (o.slideWidth * o.slideCount) / 2)
                        : !0 === o.options.centerMode &&
                          !0 === o.options.infinite
                        ? (o.slideOffset +=
                            o.slideWidth *
                              Math.floor(o.options.slidesToShow / 2) -
                            o.slideWidth)
                        : !0 === o.options.centerMode &&
                          ((o.slideOffset = 0),
                          (o.slideOffset +=
                            o.slideWidth *
                            Math.floor(o.options.slidesToShow / 2))),
                      (e =
                        !1 === o.options.vertical
                          ? t * o.slideWidth * -1 + o.slideOffset
                          : t * n * -1 + s),
                      !0 === o.options.variableWidth &&
                        ((i =
                          o.slideCount <= o.options.slidesToShow ||
                          !1 === o.options.infinite
                            ? o.$slideTrack.children(".slick-slide").eq(t)
                            : o.$slideTrack
                                .children(".slick-slide")
                                .eq(t + o.options.slidesToShow)),
                        (e =
                          !0 === o.options.rtl
                            ? i[0]
                              ? -1 *
                                (o.$slideTrack.width() -
                                  i[0].offsetLeft -
                                  i.width())
                              : 0
                            : i[0]
                            ? -1 * i[0].offsetLeft
                            : 0),
                        !0 === o.options.centerMode &&
                          ((i =
                            o.slideCount <= o.options.slidesToShow ||
                            !1 === o.options.infinite
                              ? o.$slideTrack.children(".slick-slide").eq(t)
                              : o.$slideTrack
                                  .children(".slick-slide")
                                  .eq(t + o.options.slidesToShow + 1)),
                          (e =
                            !0 === o.options.rtl
                              ? i[0]
                                ? -1 *
                                  (o.$slideTrack.width() -
                                    i[0].offsetLeft -
                                    i.width())
                                : 0
                              : i[0]
                              ? -1 * i[0].offsetLeft
                              : 0),
                          (e += (o.$list.width() - i.outerWidth()) / 2))),
                      e
                    );
                  }),
                  (e.prototype.getOption = e.prototype.slickGetOption = function (
                    t
                  ) {
                    return this.options[t];
                  }),
                  (e.prototype.getNavigableIndexes = function () {
                    var t,
                      e = this,
                      n = 0,
                      i = 0,
                      r = [];
                    for (
                      !1 === e.options.infinite
                        ? (t = e.slideCount)
                        : ((n = -1 * e.options.slidesToScroll),
                          (i = -1 * e.options.slidesToScroll),
                          (t = 2 * e.slideCount));
                      n < t;

                    )
                      r.push(n),
                        (n = i + e.options.slidesToScroll),
                        (i +=
                          e.options.slidesToScroll <= e.options.slidesToShow
                            ? e.options.slidesToScroll
                            : e.options.slidesToShow);
                    return r;
                  }),
                  (e.prototype.getSlick = function () {
                    return this;
                  }),
                  (e.prototype.getSlideCount = function () {
                    var e,
                      n,
                      i = this;
                    return (
                      (n =
                        !0 === i.options.centerMode
                          ? i.slideWidth *
                            Math.floor(i.options.slidesToShow / 2)
                          : 0),
                      !0 === i.options.swipeToSlide
                        ? (i.$slideTrack
                            .find(".slick-slide")
                            .each(function (r, o) {
                              if (
                                o.offsetLeft - n + t(o).outerWidth() / 2 >
                                -1 * i.swipeLeft
                              )
                                return (e = o), !1;
                            }),
                          Math.abs(
                            t(e).attr("data-slick-index") - i.currentSlide
                          ) || 1)
                        : i.options.slidesToScroll
                    );
                  }),
                  (e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
                    this.changeSlide(
                      { data: { message: "index", index: parseInt(t) } },
                      e
                    );
                  }),
                  (e.prototype.init = function (e) {
                    var n = this;
                    t(n.$slider).hasClass("slick-initialized") ||
                      (t(n.$slider).addClass("slick-initialized"),
                      n.buildRows(),
                      n.buildOut(),
                      n.setProps(),
                      n.startLoad(),
                      n.loadSlider(),
                      n.initializeEvents(),
                      n.updateArrows(),
                      n.updateDots(),
                      n.checkResponsive(!0),
                      n.focusHandler()),
                      e && n.$slider.trigger("init", [n]),
                      !0 === n.options.accessibility && n.initADA(),
                      n.options.autoplay && ((n.paused = !1), n.autoPlay());
                  }),
                  (e.prototype.initADA = function () {
                    var e = this,
                      n = Math.ceil(e.slideCount / e.options.slidesToShow),
                      i = e.getNavigableIndexes().filter(function (t) {
                        return t >= 0 && t < e.slideCount;
                      });
                    e.$slides
                      .add(e.$slideTrack.find(".slick-cloned"))
                      .attr({ "aria-hidden": "true", tabindex: "-1" })
                      .find("a, input, button, select")
                      .attr({ tabindex: "-1" }),
                      null !== e.$dots &&
                        (e.$slides
                          .not(e.$slideTrack.find(".slick-cloned"))
                          .each(function (n) {
                            var r = i.indexOf(n);
                            if (
                              (t(this).attr({
                                role: "tabpanel",
                                id: "slick-slide" + e.instanceUid + n,
                                tabindex: -1,
                              }),
                              -1 !== r)
                            ) {
                              var o = "slick-slide-control" + e.instanceUid + r;
                              t("#" + o).length &&
                                t(this).attr({ "aria-describedby": o });
                            }
                          }),
                        e.$dots
                          .attr("role", "tablist")
                          .find("li")
                          .each(function (r) {
                            var o = i[r];
                            t(this).attr({ role: "presentation" }),
                              t(this)
                                .find("button")
                                .first()
                                .attr({
                                  role: "tab",
                                  id: "slick-slide-control" + e.instanceUid + r,
                                  "aria-controls":
                                    "slick-slide" + e.instanceUid + o,
                                  "aria-label": r + 1 + " of " + n,
                                  "aria-selected": null,
                                  tabindex: "-1",
                                });
                          })
                          .eq(e.currentSlide)
                          .find("button")
                          .attr({ "aria-selected": "true", tabindex: "0" })
                          .end());
                    for (
                      var r = e.currentSlide, o = r + e.options.slidesToShow;
                      r < o;
                      r++
                    )
                      e.options.focusOnChange
                        ? e.$slides.eq(r).attr({ tabindex: "0" })
                        : e.$slides.eq(r).removeAttr("tabindex");
                    e.activateADA();
                  }),
                  (e.prototype.initArrowEvents = function () {
                    var t = this;
                    !0 === t.options.arrows &&
                      t.slideCount > t.options.slidesToShow &&
                      (t.$prevArrow
                        .off("click.slick")
                        .on(
                          "click.slick",
                          { message: "previous" },
                          t.changeSlide
                        ),
                      t.$nextArrow
                        .off("click.slick")
                        .on("click.slick", { message: "next" }, t.changeSlide),
                      !0 === t.options.accessibility &&
                        (t.$prevArrow.on("keydown.slick", t.keyHandler),
                        t.$nextArrow.on("keydown.slick", t.keyHandler)));
                  }),
                  (e.prototype.initDotEvents = function () {
                    var e = this;
                    !0 === e.options.dots &&
                      e.slideCount > e.options.slidesToShow &&
                      (t("li", e.$dots).on(
                        "click.slick",
                        { message: "index" },
                        e.changeSlide
                      ),
                      !0 === e.options.accessibility &&
                        e.$dots.on("keydown.slick", e.keyHandler)),
                      !0 === e.options.dots &&
                        !0 === e.options.pauseOnDotsHover &&
                        e.slideCount > e.options.slidesToShow &&
                        t("li", e.$dots)
                          .on("mouseenter.slick", t.proxy(e.interrupt, e, !0))
                          .on("mouseleave.slick", t.proxy(e.interrupt, e, !1));
                  }),
                  (e.prototype.initSlideEvents = function () {
                    var e = this;
                    e.options.pauseOnHover &&
                      (e.$list.on(
                        "mouseenter.slick",
                        t.proxy(e.interrupt, e, !0)
                      ),
                      e.$list.on(
                        "mouseleave.slick",
                        t.proxy(e.interrupt, e, !1)
                      ));
                  }),
                  (e.prototype.initializeEvents = function () {
                    var e = this;
                    e.initArrowEvents(),
                      e.initDotEvents(),
                      e.initSlideEvents(),
                      e.$list.on(
                        "touchstart.slick mousedown.slick",
                        { action: "start" },
                        e.swipeHandler
                      ),
                      e.$list.on(
                        "touchmove.slick mousemove.slick",
                        { action: "move" },
                        e.swipeHandler
                      ),
                      e.$list.on(
                        "touchend.slick mouseup.slick",
                        { action: "end" },
                        e.swipeHandler
                      ),
                      e.$list.on(
                        "touchcancel.slick mouseleave.slick",
                        { action: "end" },
                        e.swipeHandler
                      ),
                      e.$list.on("click.slick", e.clickHandler),
                      t(document).on(
                        e.visibilityChange,
                        t.proxy(e.visibility, e)
                      ),
                      !0 === e.options.accessibility &&
                        e.$list.on("keydown.slick", e.keyHandler),
                      !0 === e.options.focusOnSelect &&
                        t(e.$slideTrack)
                          .children()
                          .on("click.slick", e.selectHandler),
                      t(window).on(
                        "orientationchange.slick.slick-" + e.instanceUid,
                        t.proxy(e.orientationChange, e)
                      ),
                      t(window).on(
                        "resize.slick.slick-" + e.instanceUid,
                        t.proxy(e.resize, e)
                      ),
                      t("[draggable!=true]", e.$slideTrack).on(
                        "dragstart",
                        e.preventDefault
                      ),
                      t(window).on(
                        "load.slick.slick-" + e.instanceUid,
                        e.setPosition
                      ),
                      t(e.setPosition);
                  }),
                  (e.prototype.initUI = function () {
                    var t = this;
                    !0 === t.options.arrows &&
                      t.slideCount > t.options.slidesToShow &&
                      (t.$prevArrow.show(), t.$nextArrow.show()),
                      !0 === t.options.dots &&
                        t.slideCount > t.options.slidesToShow &&
                        t.$dots.show();
                  }),
                  (e.prototype.keyHandler = function (t) {
                    var e = this;
                    t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                      (37 === t.keyCode && !0 === e.options.accessibility
                        ? e.changeSlide({
                            data: {
                              message:
                                !0 === e.options.rtl ? "next" : "previous",
                            },
                          })
                        : 39 === t.keyCode &&
                          !0 === e.options.accessibility &&
                          e.changeSlide({
                            data: {
                              message:
                                !0 === e.options.rtl ? "previous" : "next",
                            },
                          }));
                  }),
                  (e.prototype.lazyLoad = function () {
                    var e,
                      n,
                      i,
                      r = this;
                    function o(e) {
                      t("img[data-lazy]", e).each(function () {
                        var e = t(this),
                          n = t(this).attr("data-lazy"),
                          i = t(this).attr("data-srcset"),
                          o =
                            t(this).attr("data-sizes") ||
                            r.$slider.attr("data-sizes"),
                          s = document.createElement("img");
                        (s.onload = function () {
                          e.animate({ opacity: 0 }, 100, function () {
                            i && (e.attr("srcset", i), o && e.attr("sizes", o)),
                              e
                                .attr("src", n)
                                .animate({ opacity: 1 }, 200, function () {
                                  e.removeAttr(
                                    "data-lazy data-srcset data-sizes"
                                  ).removeClass("slick-loading");
                                }),
                              r.$slider.trigger("lazyLoaded", [r, e, n]);
                          });
                        }),
                          (s.onerror = function () {
                            e
                              .removeAttr("data-lazy")
                              .removeClass("slick-loading")
                              .addClass("slick-lazyload-error"),
                              r.$slider.trigger("lazyLoadError", [r, e, n]);
                          }),
                          (s.src = n);
                      });
                    }
                    if (
                      (!0 === r.options.centerMode
                        ? !0 === r.options.infinite
                          ? (i =
                              (n =
                                r.currentSlide +
                                (r.options.slidesToShow / 2 + 1)) +
                              r.options.slidesToShow +
                              2)
                          : ((n = Math.max(
                              0,
                              r.currentSlide - (r.options.slidesToShow / 2 + 1)
                            )),
                            (i =
                              r.options.slidesToShow / 2 +
                              1 +
                              2 +
                              r.currentSlide))
                        : ((n = r.options.infinite
                            ? r.options.slidesToShow + r.currentSlide
                            : r.currentSlide),
                          (i = Math.ceil(n + r.options.slidesToShow)),
                          !0 === r.options.fade &&
                            (n > 0 && n--, i <= r.slideCount && i++)),
                      (e = r.$slider.find(".slick-slide").slice(n, i)),
                      "anticipated" === r.options.lazyLoad)
                    )
                      for (
                        var s = n - 1,
                          a = i,
                          l = r.$slider.find(".slick-slide"),
                          u = 0;
                        u < r.options.slidesToScroll;
                        u++
                      )
                        s < 0 && (s = r.slideCount - 1),
                          (e = (e = e.add(l.eq(s))).add(l.eq(a))),
                          s--,
                          a++;
                    o(e),
                      r.slideCount <= r.options.slidesToShow
                        ? o(r.$slider.find(".slick-slide"))
                        : r.currentSlide >=
                          r.slideCount - r.options.slidesToShow
                        ? o(
                            r.$slider
                              .find(".slick-cloned")
                              .slice(0, r.options.slidesToShow)
                          )
                        : 0 === r.currentSlide &&
                          o(
                            r.$slider
                              .find(".slick-cloned")
                              .slice(-1 * r.options.slidesToShow)
                          );
                  }),
                  (e.prototype.loadSlider = function () {
                    var t = this;
                    t.setPosition(),
                      t.$slideTrack.css({ opacity: 1 }),
                      t.$slider.removeClass("slick-loading"),
                      t.initUI(),
                      "progressive" === t.options.lazyLoad &&
                        t.progressiveLazyLoad();
                  }),
                  (e.prototype.next = e.prototype.slickNext = function () {
                    this.changeSlide({ data: { message: "next" } });
                  }),
                  (e.prototype.orientationChange = function () {
                    this.checkResponsive(), this.setPosition();
                  }),
                  (e.prototype.pause = e.prototype.slickPause = function () {
                    this.autoPlayClear(), (this.paused = !0);
                  }),
                  (e.prototype.play = e.prototype.slickPlay = function () {
                    var t = this;
                    t.autoPlay(),
                      (t.options.autoplay = !0),
                      (t.paused = !1),
                      (t.focussed = !1),
                      (t.interrupted = !1);
                  }),
                  (e.prototype.postSlide = function (e) {
                    var n = this;
                    n.unslicked ||
                      (n.$slider.trigger("afterChange", [n, e]),
                      (n.animating = !1),
                      n.slideCount > n.options.slidesToShow && n.setPosition(),
                      (n.swipeLeft = null),
                      n.options.autoplay && n.autoPlay(),
                      !0 === n.options.accessibility &&
                        (n.initADA(),
                        n.options.focusOnChange &&
                          t(n.$slides.get(n.currentSlide))
                            .attr("tabindex", 0)
                            .focus()));
                  }),
                  (e.prototype.prev = e.prototype.slickPrev = function () {
                    this.changeSlide({ data: { message: "previous" } });
                  }),
                  (e.prototype.preventDefault = function (t) {
                    t.preventDefault();
                  }),
                  (e.prototype.progressiveLazyLoad = function (e) {
                    e = e || 1;
                    var n,
                      i,
                      r,
                      o,
                      s,
                      a = this,
                      l = t("img[data-lazy]", a.$slider);
                    l.length
                      ? ((n = l.first()),
                        (i = n.attr("data-lazy")),
                        (r = n.attr("data-srcset")),
                        (o =
                          n.attr("data-sizes") || a.$slider.attr("data-sizes")),
                        ((s = document.createElement(
                          "img"
                        )).onload = function () {
                          r && (n.attr("srcset", r), o && n.attr("sizes", o)),
                            n
                              .attr("src", i)
                              .removeAttr("data-lazy data-srcset data-sizes")
                              .removeClass("slick-loading"),
                            !0 === a.options.adaptiveHeight && a.setPosition(),
                            a.$slider.trigger("lazyLoaded", [a, n, i]),
                            a.progressiveLazyLoad();
                        }),
                        (s.onerror = function () {
                          e < 3
                            ? setTimeout(function () {
                                a.progressiveLazyLoad(e + 1);
                              }, 500)
                            : (n
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                              a.$slider.trigger("lazyLoadError", [a, n, i]),
                              a.progressiveLazyLoad());
                        }),
                        (s.src = i))
                      : a.$slider.trigger("allImagesLoaded", [a]);
                  }),
                  (e.prototype.refresh = function (e) {
                    var n,
                      i,
                      r = this;
                    (i = r.slideCount - r.options.slidesToShow),
                      !r.options.infinite &&
                        r.currentSlide > i &&
                        (r.currentSlide = i),
                      r.slideCount <= r.options.slidesToShow &&
                        (r.currentSlide = 0),
                      (n = r.currentSlide),
                      r.destroy(!0),
                      t.extend(r, r.initials, { currentSlide: n }),
                      r.init(),
                      e ||
                        r.changeSlide(
                          { data: { message: "index", index: n } },
                          !1
                        );
                  }),
                  (e.prototype.registerBreakpoints = function () {
                    var e,
                      n,
                      i,
                      r = this,
                      o = r.options.responsive || null;
                    if ("array" === t.type(o) && o.length) {
                      for (e in ((r.respondTo =
                        r.options.respondTo || "window"),
                      o))
                        if (
                          ((i = r.breakpoints.length - 1), o.hasOwnProperty(e))
                        ) {
                          for (n = o[e].breakpoint; i >= 0; )
                            r.breakpoints[i] &&
                              r.breakpoints[i] === n &&
                              r.breakpoints.splice(i, 1),
                              i--;
                          r.breakpoints.push(n),
                            (r.breakpointSettings[n] = o[e].settings);
                        }
                      r.breakpoints.sort(function (t, e) {
                        return r.options.mobileFirst ? t - e : e - t;
                      });
                    }
                  }),
                  (e.prototype.reinit = function () {
                    var e = this;
                    (e.$slides = e.$slideTrack
                      .children(e.options.slide)
                      .addClass("slick-slide")),
                      (e.slideCount = e.$slides.length),
                      e.currentSlide >= e.slideCount &&
                        0 !== e.currentSlide &&
                        (e.currentSlide =
                          e.currentSlide - e.options.slidesToScroll),
                      e.slideCount <= e.options.slidesToShow &&
                        (e.currentSlide = 0),
                      e.registerBreakpoints(),
                      e.setProps(),
                      e.setupInfinite(),
                      e.buildArrows(),
                      e.updateArrows(),
                      e.initArrowEvents(),
                      e.buildDots(),
                      e.updateDots(),
                      e.initDotEvents(),
                      e.cleanUpSlideEvents(),
                      e.initSlideEvents(),
                      e.checkResponsive(!1, !0),
                      !0 === e.options.focusOnSelect &&
                        t(e.$slideTrack)
                          .children()
                          .on("click.slick", e.selectHandler),
                      e.setSlideClasses(
                        "number" == typeof e.currentSlide ? e.currentSlide : 0
                      ),
                      e.setPosition(),
                      e.focusHandler(),
                      (e.paused = !e.options.autoplay),
                      e.autoPlay(),
                      e.$slider.trigger("reInit", [e]);
                  }),
                  (e.prototype.resize = function () {
                    var e = this;
                    t(window).width() !== e.windowWidth &&
                      (clearTimeout(e.windowDelay),
                      (e.windowDelay = window.setTimeout(function () {
                        (e.windowWidth = t(window).width()),
                          e.checkResponsive(),
                          e.unslicked || e.setPosition();
                      }, 50)));
                  }),
                  (e.prototype.removeSlide = e.prototype.slickRemove = function (
                    t,
                    e,
                    n
                  ) {
                    var i = this;
                    if (
                      ((t =
                        "boolean" == typeof t
                          ? !0 === (e = t)
                            ? 0
                            : i.slideCount - 1
                          : !0 === e
                          ? --t
                          : t),
                      i.slideCount < 1 || t < 0 || t > i.slideCount - 1)
                    )
                      return !1;
                    i.unload(),
                      !0 === n
                        ? i.$slideTrack.children().remove()
                        : i.$slideTrack
                            .children(this.options.slide)
                            .eq(t)
                            .remove(),
                      (i.$slides = i.$slideTrack.children(this.options.slide)),
                      i.$slideTrack.children(this.options.slide).detach(),
                      i.$slideTrack.append(i.$slides),
                      (i.$slidesCache = i.$slides),
                      i.reinit();
                  }),
                  (e.prototype.setCSS = function (t) {
                    var e,
                      n,
                      i = this,
                      r = {};
                    !0 === i.options.rtl && (t = -t),
                      (e =
                        "left" == i.positionProp ? Math.ceil(t) + "px" : "0px"),
                      (n =
                        "top" == i.positionProp ? Math.ceil(t) + "px" : "0px"),
                      (r[i.positionProp] = t),
                      !1 === i.transformsEnabled
                        ? i.$slideTrack.css(r)
                        : ((r = {}),
                          !1 === i.cssTransitions
                            ? ((r[i.animType] =
                                "translate(" + e + ", " + n + ")"),
                              i.$slideTrack.css(r))
                            : ((r[i.animType] =
                                "translate3d(" + e + ", " + n + ", 0px)"),
                              i.$slideTrack.css(r)));
                  }),
                  (e.prototype.setDimensions = function () {
                    var t = this;
                    !1 === t.options.vertical
                      ? !0 === t.options.centerMode &&
                        t.$list.css({
                          padding: "0px " + t.options.centerPadding,
                        })
                      : (t.$list.height(
                          t.$slides.first().outerHeight(!0) *
                            t.options.slidesToShow
                        ),
                        !0 === t.options.centerMode &&
                          t.$list.css({
                            padding: t.options.centerPadding + " 0px",
                          })),
                      (t.listWidth = t.$list.width()),
                      (t.listHeight = t.$list.height()),
                      !1 === t.options.vertical &&
                      !1 === t.options.variableWidth
                        ? ((t.slideWidth = Math.ceil(
                            t.listWidth / t.options.slidesToShow
                          )),
                          t.$slideTrack.width(
                            Math.ceil(
                              t.slideWidth *
                                t.$slideTrack.children(".slick-slide").length
                            )
                          ))
                        : !0 === t.options.variableWidth
                        ? t.$slideTrack.width(5e3 * t.slideCount)
                        : ((t.slideWidth = Math.ceil(t.listWidth)),
                          t.$slideTrack.height(
                            Math.ceil(
                              t.$slides.first().outerHeight(!0) *
                                t.$slideTrack.children(".slick-slide").length
                            )
                          ));
                    var e =
                      t.$slides.first().outerWidth(!0) -
                      t.$slides.first().width();
                    !1 === t.options.variableWidth &&
                      t.$slideTrack
                        .children(".slick-slide")
                        .width(t.slideWidth - e);
                  }),
                  (e.prototype.setFade = function () {
                    var e,
                      n = this;
                    n.$slides.each(function (i, r) {
                      (e = n.slideWidth * i * -1),
                        !0 === n.options.rtl
                          ? t(r).css({
                              position: "relative",
                              right: e,
                              top: 0,
                              zIndex: n.options.zIndex - 2,
                              opacity: 0,
                            })
                          : t(r).css({
                              position: "relative",
                              left: e,
                              top: 0,
                              zIndex: n.options.zIndex - 2,
                              opacity: 0,
                            });
                    }),
                      n.$slides
                        .eq(n.currentSlide)
                        .css({ zIndex: n.options.zIndex - 1, opacity: 1 });
                  }),
                  (e.prototype.setHeight = function () {
                    var t = this;
                    if (
                      1 === t.options.slidesToShow &&
                      !0 === t.options.adaptiveHeight &&
                      !1 === t.options.vertical
                    ) {
                      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                      t.$list.css("height", e);
                    }
                  }),
                  (e.prototype.setOption = e.prototype.slickSetOption = function () {
                    var e,
                      n,
                      i,
                      r,
                      o,
                      s = this,
                      a = !1;
                    if (
                      ("object" === t.type(arguments[0])
                        ? ((i = arguments[0]),
                          (a = arguments[1]),
                          (o = "multiple"))
                        : "string" === t.type(arguments[0]) &&
                          ((i = arguments[0]),
                          (r = arguments[1]),
                          (a = arguments[2]),
                          "responsive" === arguments[0] &&
                          "array" === t.type(arguments[1])
                            ? (o = "responsive")
                            : void 0 !== arguments[1] && (o = "single")),
                      "single" === o)
                    )
                      s.options[i] = r;
                    else if ("multiple" === o)
                      t.each(i, function (t, e) {
                        s.options[t] = e;
                      });
                    else if ("responsive" === o)
                      for (n in r)
                        if ("array" !== t.type(s.options.responsive))
                          s.options.responsive = [r[n]];
                        else {
                          for (e = s.options.responsive.length - 1; e >= 0; )
                            s.options.responsive[e].breakpoint ===
                              r[n].breakpoint &&
                              s.options.responsive.splice(e, 1),
                              e--;
                          s.options.responsive.push(r[n]);
                        }
                    a && (s.unload(), s.reinit());
                  }),
                  (e.prototype.setPosition = function () {
                    var t = this;
                    t.setDimensions(),
                      t.setHeight(),
                      !1 === t.options.fade
                        ? t.setCSS(t.getLeft(t.currentSlide))
                        : t.setFade(),
                      t.$slider.trigger("setPosition", [t]);
                  }),
                  (e.prototype.setProps = function () {
                    var t = this,
                      e = document.body.style;
                    (t.positionProp =
                      !0 === t.options.vertical ? "top" : "left"),
                      "top" === t.positionProp
                        ? t.$slider.addClass("slick-vertical")
                        : t.$slider.removeClass("slick-vertical"),
                      (void 0 === e.WebkitTransition &&
                        void 0 === e.MozTransition &&
                        void 0 === e.msTransition) ||
                        (!0 === t.options.useCSS && (t.cssTransitions = !0)),
                      t.options.fade &&
                        ("number" == typeof t.options.zIndex
                          ? t.options.zIndex < 3 && (t.options.zIndex = 3)
                          : (t.options.zIndex = t.defaults.zIndex)),
                      void 0 !== e.OTransform &&
                        ((t.animType = "OTransform"),
                        (t.transformType = "-o-transform"),
                        (t.transitionType = "OTransition"),
                        void 0 === e.perspectiveProperty &&
                          void 0 === e.webkitPerspective &&
                          (t.animType = !1)),
                      void 0 !== e.MozTransform &&
                        ((t.animType = "MozTransform"),
                        (t.transformType = "-moz-transform"),
                        (t.transitionType = "MozTransition"),
                        void 0 === e.perspectiveProperty &&
                          void 0 === e.MozPerspective &&
                          (t.animType = !1)),
                      void 0 !== e.webkitTransform &&
                        ((t.animType = "webkitTransform"),
                        (t.transformType = "-webkit-transform"),
                        (t.transitionType = "webkitTransition"),
                        void 0 === e.perspectiveProperty &&
                          void 0 === e.webkitPerspective &&
                          (t.animType = !1)),
                      void 0 !== e.msTransform &&
                        ((t.animType = "msTransform"),
                        (t.transformType = "-ms-transform"),
                        (t.transitionType = "msTransition"),
                        void 0 === e.msTransform && (t.animType = !1)),
                      void 0 !== e.transform &&
                        !1 !== t.animType &&
                        ((t.animType = "transform"),
                        (t.transformType = "transform"),
                        (t.transitionType = "transition")),
                      (t.transformsEnabled =
                        t.options.useTransform &&
                        null !== t.animType &&
                        !1 !== t.animType);
                  }),
                  (e.prototype.setSlideClasses = function (t) {
                    var e,
                      n,
                      i,
                      r,
                      o = this;
                    if (
                      ((n = o.$slider
                        .find(".slick-slide")
                        .removeClass("slick-active slick-center slick-current")
                        .attr("aria-hidden", "true")),
                      o.$slides.eq(t).addClass("slick-current"),
                      !0 === o.options.centerMode)
                    ) {
                      var s = o.options.slidesToShow % 2 == 0 ? 1 : 0;
                      (e = Math.floor(o.options.slidesToShow / 2)),
                        !0 === o.options.infinite &&
                          (t >= e && t <= o.slideCount - 1 - e
                            ? o.$slides
                                .slice(t - e + s, t + e + 1)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                            : ((i = o.options.slidesToShow + t),
                              n
                                .slice(i - e + 1 + s, i + e + 2)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")),
                          0 === t
                            ? n
                                .eq(n.length - 1 - o.options.slidesToShow)
                                .addClass("slick-center")
                            : t === o.slideCount - 1 &&
                              n
                                .eq(o.options.slidesToShow)
                                .addClass("slick-center")),
                        o.$slides.eq(t).addClass("slick-center");
                    } else
                      t >= 0 && t <= o.slideCount - o.options.slidesToShow
                        ? o.$slides
                            .slice(t, t + o.options.slidesToShow)
                            .addClass("slick-active")
                            .attr("aria-hidden", "false")
                        : n.length <= o.options.slidesToShow
                        ? n
                            .addClass("slick-active")
                            .attr("aria-hidden", "false")
                        : ((r = o.slideCount % o.options.slidesToShow),
                          (i =
                            !0 === o.options.infinite
                              ? o.options.slidesToShow + t
                              : t),
                          o.options.slidesToShow == o.options.slidesToScroll &&
                          o.slideCount - t < o.options.slidesToShow
                            ? n
                                .slice(i - (o.options.slidesToShow - r), i + r)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                            : n
                                .slice(i, i + o.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
                    ("ondemand" !== o.options.lazyLoad &&
                      "anticipated" !== o.options.lazyLoad) ||
                      o.lazyLoad();
                  }),
                  (e.prototype.setupInfinite = function () {
                    var e,
                      n,
                      i,
                      r = this;
                    if (
                      (!0 === r.options.fade && (r.options.centerMode = !1),
                      !0 === r.options.infinite &&
                        !1 === r.options.fade &&
                        ((n = null), r.slideCount > r.options.slidesToShow))
                    ) {
                      for (
                        i =
                          !0 === r.options.centerMode
                            ? r.options.slidesToShow + 1
                            : r.options.slidesToShow,
                          e = r.slideCount;
                        e > r.slideCount - i;
                        e -= 1
                      )
                        (n = e - 1),
                          t(r.$slides[n])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", n - r.slideCount)
                            .prependTo(r.$slideTrack)
                            .addClass("slick-cloned");
                      for (e = 0; e < i + r.slideCount; e += 1)
                        (n = e),
                          t(r.$slides[n])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", n + r.slideCount)
                            .appendTo(r.$slideTrack)
                            .addClass("slick-cloned");
                      r.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                          t(this).attr("id", "");
                        });
                    }
                  }),
                  (e.prototype.interrupt = function (t) {
                    t || this.autoPlay(), (this.interrupted = t);
                  }),
                  (e.prototype.selectHandler = function (e) {
                    var n = this,
                      i = t(e.target).is(".slick-slide")
                        ? t(e.target)
                        : t(e.target).parents(".slick-slide"),
                      r = parseInt(i.attr("data-slick-index"));
                    r || (r = 0),
                      n.slideCount <= n.options.slidesToShow
                        ? n.slideHandler(r, !1, !0)
                        : n.slideHandler(r);
                  }),
                  (e.prototype.slideHandler = function (t, e, n) {
                    var i,
                      r,
                      o,
                      s,
                      a,
                      l,
                      u = this;
                    if (
                      ((e = e || !1),
                      !(
                        (!0 === u.animating &&
                          !0 === u.options.waitForAnimate) ||
                        (!0 === u.options.fade && u.currentSlide === t)
                      ))
                    )
                      if (
                        (!1 === e && u.asNavFor(t),
                        (i = t),
                        (a = u.getLeft(i)),
                        (s = u.getLeft(u.currentSlide)),
                        (u.currentLeft =
                          null === u.swipeLeft ? s : u.swipeLeft),
                        !1 === u.options.infinite &&
                          !1 === u.options.centerMode &&
                          (t < 0 ||
                            t > u.getDotCount() * u.options.slidesToScroll))
                      )
                        !1 === u.options.fade &&
                          ((i = u.currentSlide),
                          !0 !== n && u.slideCount > u.options.slidesToShow
                            ? u.animateSlide(s, function () {
                                u.postSlide(i);
                              })
                            : u.postSlide(i));
                      else if (
                        !1 === u.options.infinite &&
                        !0 === u.options.centerMode &&
                        (t < 0 || t > u.slideCount - u.options.slidesToScroll)
                      )
                        !1 === u.options.fade &&
                          ((i = u.currentSlide),
                          !0 !== n && u.slideCount > u.options.slidesToShow
                            ? u.animateSlide(s, function () {
                                u.postSlide(i);
                              })
                            : u.postSlide(i));
                      else {
                        if (
                          (u.options.autoplay && clearInterval(u.autoPlayTimer),
                          (r =
                            i < 0
                              ? u.slideCount % u.options.slidesToScroll != 0
                                ? u.slideCount -
                                  (u.slideCount % u.options.slidesToScroll)
                                : u.slideCount + i
                              : i >= u.slideCount
                              ? u.slideCount % u.options.slidesToScroll != 0
                                ? 0
                                : i - u.slideCount
                              : i),
                          (u.animating = !0),
                          u.$slider.trigger("beforeChange", [
                            u,
                            u.currentSlide,
                            r,
                          ]),
                          (o = u.currentSlide),
                          (u.currentSlide = r),
                          u.setSlideClasses(u.currentSlide),
                          u.options.asNavFor &&
                            (l = (l = u.getNavTarget()).slick("getSlick"))
                              .slideCount <= l.options.slidesToShow &&
                            l.setSlideClasses(u.currentSlide),
                          u.updateDots(),
                          u.updateArrows(),
                          !0 === u.options.fade)
                        )
                          return (
                            !0 !== n
                              ? (u.fadeSlideOut(o),
                                u.fadeSlide(r, function () {
                                  u.postSlide(r);
                                }))
                              : u.postSlide(r),
                            void u.animateHeight()
                          );
                        !0 !== n && u.slideCount > u.options.slidesToShow
                          ? u.animateSlide(a, function () {
                              u.postSlide(r);
                            })
                          : u.postSlide(r);
                      }
                  }),
                  (e.prototype.startLoad = function () {
                    var t = this;
                    !0 === t.options.arrows &&
                      t.slideCount > t.options.slidesToShow &&
                      (t.$prevArrow.hide(), t.$nextArrow.hide()),
                      !0 === t.options.dots &&
                        t.slideCount > t.options.slidesToShow &&
                        t.$dots.hide(),
                      t.$slider.addClass("slick-loading");
                  }),
                  (e.prototype.swipeDirection = function () {
                    var t,
                      e,
                      n,
                      i,
                      r = this;
                    return (
                      (t = r.touchObject.startX - r.touchObject.curX),
                      (e = r.touchObject.startY - r.touchObject.curY),
                      (n = Math.atan2(e, t)),
                      (i = Math.round((180 * n) / Math.PI)) < 0 &&
                        (i = 360 - Math.abs(i)),
                      (i <= 45 && i >= 0) || (i <= 360 && i >= 315)
                        ? !1 === r.options.rtl
                          ? "left"
                          : "right"
                        : i >= 135 && i <= 225
                        ? !1 === r.options.rtl
                          ? "right"
                          : "left"
                        : !0 === r.options.verticalSwiping
                        ? i >= 35 && i <= 135
                          ? "down"
                          : "up"
                        : "vertical"
                    );
                  }),
                  (e.prototype.swipeEnd = function (t) {
                    var e,
                      n,
                      i = this;
                    if (((i.dragging = !1), (i.swiping = !1), i.scrolling))
                      return (i.scrolling = !1), !1;
                    if (
                      ((i.interrupted = !1),
                      (i.shouldClick = !(i.touchObject.swipeLength > 10)),
                      void 0 === i.touchObject.curX)
                    )
                      return !1;
                    if (
                      (!0 === i.touchObject.edgeHit &&
                        i.$slider.trigger("edge", [i, i.swipeDirection()]),
                      i.touchObject.swipeLength >= i.touchObject.minSwipe)
                    ) {
                      switch ((n = i.swipeDirection())) {
                        case "left":
                        case "down":
                          (e = i.options.swipeToSlide
                            ? i.checkNavigable(
                                i.currentSlide + i.getSlideCount()
                              )
                            : i.currentSlide + i.getSlideCount()),
                            (i.currentDirection = 0);
                          break;
                        case "right":
                        case "up":
                          (e = i.options.swipeToSlide
                            ? i.checkNavigable(
                                i.currentSlide - i.getSlideCount()
                              )
                            : i.currentSlide - i.getSlideCount()),
                            (i.currentDirection = 1);
                      }
                      "vertical" != n &&
                        (i.slideHandler(e),
                        (i.touchObject = {}),
                        i.$slider.trigger("swipe", [i, n]));
                    } else
                      i.touchObject.startX !== i.touchObject.curX &&
                        (i.slideHandler(i.currentSlide), (i.touchObject = {}));
                  }),
                  (e.prototype.swipeHandler = function (t) {
                    var e = this;
                    if (
                      !(
                        !1 === e.options.swipe ||
                        ("ontouchend" in document && !1 === e.options.swipe) ||
                        (!1 === e.options.draggable &&
                          -1 !== t.type.indexOf("mouse"))
                      )
                    )
                      switch (
                        ((e.touchObject.fingerCount =
                          t.originalEvent && void 0 !== t.originalEvent.touches
                            ? t.originalEvent.touches.length
                            : 1),
                        (e.touchObject.minSwipe =
                          e.listWidth / e.options.touchThreshold),
                        !0 === e.options.verticalSwiping &&
                          (e.touchObject.minSwipe =
                            e.listHeight / e.options.touchThreshold),
                        t.data.action)
                      ) {
                        case "start":
                          e.swipeStart(t);
                          break;
                        case "move":
                          e.swipeMove(t);
                          break;
                        case "end":
                          e.swipeEnd(t);
                      }
                  }),
                  (e.prototype.swipeMove = function (t) {
                    var e,
                      n,
                      i,
                      r,
                      o,
                      s,
                      a = this;
                    return (
                      (o =
                        void 0 !== t.originalEvent
                          ? t.originalEvent.touches
                          : null),
                      !(!a.dragging || a.scrolling || (o && 1 !== o.length)) &&
                        ((e = a.getLeft(a.currentSlide)),
                        (a.touchObject.curX =
                          void 0 !== o ? o[0].pageX : t.clientX),
                        (a.touchObject.curY =
                          void 0 !== o ? o[0].pageY : t.clientY),
                        (a.touchObject.swipeLength = Math.round(
                          Math.sqrt(
                            Math.pow(
                              a.touchObject.curX - a.touchObject.startX,
                              2
                            )
                          )
                        )),
                        (s = Math.round(
                          Math.sqrt(
                            Math.pow(
                              a.touchObject.curY - a.touchObject.startY,
                              2
                            )
                          )
                        )),
                        !a.options.verticalSwiping && !a.swiping && s > 4
                          ? ((a.scrolling = !0), !1)
                          : (!0 === a.options.verticalSwiping &&
                              (a.touchObject.swipeLength = s),
                            (n = a.swipeDirection()),
                            void 0 !== t.originalEvent &&
                              a.touchObject.swipeLength > 4 &&
                              ((a.swiping = !0), t.preventDefault()),
                            (r =
                              (!1 === a.options.rtl ? 1 : -1) *
                              (a.touchObject.curX > a.touchObject.startX
                                ? 1
                                : -1)),
                            !0 === a.options.verticalSwiping &&
                              (r =
                                a.touchObject.curY > a.touchObject.startY
                                  ? 1
                                  : -1),
                            (i = a.touchObject.swipeLength),
                            (a.touchObject.edgeHit = !1),
                            !1 === a.options.infinite &&
                              ((0 === a.currentSlide && "right" === n) ||
                                (a.currentSlide >= a.getDotCount() &&
                                  "left" === n)) &&
                              ((i =
                                a.touchObject.swipeLength *
                                a.options.edgeFriction),
                              (a.touchObject.edgeHit = !0)),
                            !1 === a.options.vertical
                              ? (a.swipeLeft = e + i * r)
                              : (a.swipeLeft =
                                  e + i * (a.$list.height() / a.listWidth) * r),
                            !0 === a.options.verticalSwiping &&
                              (a.swipeLeft = e + i * r),
                            !0 !== a.options.fade &&
                              !1 !== a.options.touchMove &&
                              (!0 === a.animating
                                ? ((a.swipeLeft = null), !1)
                                : void a.setCSS(a.swipeLeft))))
                    );
                  }),
                  (e.prototype.swipeStart = function (t) {
                    var e,
                      n = this;
                    if (
                      ((n.interrupted = !0),
                      1 !== n.touchObject.fingerCount ||
                        n.slideCount <= n.options.slidesToShow)
                    )
                      return (n.touchObject = {}), !1;
                    void 0 !== t.originalEvent &&
                      void 0 !== t.originalEvent.touches &&
                      (e = t.originalEvent.touches[0]),
                      (n.touchObject.startX = n.touchObject.curX =
                        void 0 !== e ? e.pageX : t.clientX),
                      (n.touchObject.startY = n.touchObject.curY =
                        void 0 !== e ? e.pageY : t.clientY),
                      (n.dragging = !0);
                  }),
                  (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
                    var t = this;
                    null !== t.$slidesCache &&
                      (t.unload(),
                      t.$slideTrack.children(this.options.slide).detach(),
                      t.$slidesCache.appendTo(t.$slideTrack),
                      t.reinit());
                  }),
                  (e.prototype.unload = function () {
                    var e = this;
                    t(".slick-cloned", e.$slider).remove(),
                      e.$dots && e.$dots.remove(),
                      e.$prevArrow &&
                        e.htmlExpr.test(e.options.prevArrow) &&
                        e.$prevArrow.remove(),
                      e.$nextArrow &&
                        e.htmlExpr.test(e.options.nextArrow) &&
                        e.$nextArrow.remove(),
                      e.$slides
                        .removeClass(
                          "slick-slide slick-active slick-visible slick-current"
                        )
                        .attr("aria-hidden", "true")
                        .css("width", "");
                  }),
                  (e.prototype.unslick = function (t) {
                    var e = this;
                    e.$slider.trigger("unslick", [e, t]), e.destroy();
                  }),
                  (e.prototype.updateArrows = function () {
                    var t = this;
                    Math.floor(t.options.slidesToShow / 2),
                      !0 === t.options.arrows &&
                        t.slideCount > t.options.slidesToShow &&
                        !t.options.infinite &&
                        (t.$prevArrow
                          .removeClass("slick-disabled")
                          .attr("aria-disabled", "false"),
                        t.$nextArrow
                          .removeClass("slick-disabled")
                          .attr("aria-disabled", "false"),
                        0 === t.currentSlide
                          ? (t.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                            t.$nextArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                          : ((t.currentSlide >=
                              t.slideCount - t.options.slidesToShow &&
                              !1 === t.options.centerMode) ||
                              (t.currentSlide >= t.slideCount - 1 &&
                                !0 === t.options.centerMode)) &&
                            (t.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                            t.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false")));
                  }),
                  (e.prototype.updateDots = function () {
                    var t = this;
                    null !== t.$dots &&
                      (t.$dots.find("li").removeClass("slick-active").end(),
                      t.$dots
                        .find("li")
                        .eq(
                          Math.floor(t.currentSlide / t.options.slidesToScroll)
                        )
                        .addClass("slick-active"));
                  }),
                  (e.prototype.visibility = function () {
                    var t = this;
                    t.options.autoplay &&
                      (document[t.hidden]
                        ? (t.interrupted = !0)
                        : (t.interrupted = !1));
                  }),
                  (t.fn.slick = function () {
                    var t,
                      n,
                      i = this,
                      r = arguments[0],
                      o = Array.prototype.slice.call(arguments, 1),
                      s = i.length;
                    for (t = 0; t < s; t++)
                      if (
                        ("object" == typeof r || void 0 === r
                          ? (i[t].slick = new e(i[t], r))
                          : (n = i[t].slick[r].apply(i[t].slick, o)),
                        void 0 !== n)
                      )
                        return n;
                    return i;
                  });
                var n;
              })
                ? i.apply(e, r)
                : i) || (t.exports = o);
      })();
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (t, e, n) {
      t.exports = n(26).Promise;
    },
    function (t, e, n) {
      (function (e, i) {
        var r;
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
         * @version   3.3.1
         */ (r = function () {
          "use strict";
          function t(t) {
            return "function" == typeof t;
          }
          var r = Array.isArray
              ? Array.isArray
              : function (t) {
                  return "[object Array]" === Object.prototype.toString.call(t);
                },
            o = 0,
            s = void 0,
            a = void 0,
            l = function (t, e) {
              (g[o] = t), (g[o + 1] = e), 2 === (o += 2) && (a ? a(v) : w());
            },
            u = "undefined" != typeof window ? window : void 0,
            c = u || {},
            d = c.MutationObserver || c.WebKitMutationObserver,
            p =
              "undefined" == typeof self &&
              void 0 !== e &&
              "[object process]" === {}.toString.call(e),
            f =
              "undefined" != typeof Uint8ClampedArray &&
              "undefined" != typeof importScripts &&
              "undefined" != typeof MessageChannel;
          function h() {
            var t = setTimeout;
            return function () {
              return t(v, 1);
            };
          }
          var g = new Array(1e3);
          function v() {
            for (var t = 0; t < o; t += 2)
              (0, g[t])(g[t + 1]), (g[t] = void 0), (g[t + 1] = void 0);
            o = 0;
          }
          var m,
            y,
            b,
            _,
            w = void 0;
          function x(t, e) {
            var n = arguments,
              i = this,
              r = new this.constructor(S);
            void 0 === r[k] && z(r);
            var o,
              s = i._state;
            return (
              s
                ? ((o = n[s - 1]),
                  l(function () {
                    return R(s, r, o, i._result);
                  }))
                : P(i, r, t, e),
              r
            );
          }
          function T(t) {
            if (t && "object" == typeof t && t.constructor === this) return t;
            var e = new this(S);
            return E(e, t), e;
          }
          p
            ? (w = function () {
                return e.nextTick(v);
              })
            : d
            ? ((y = 0),
              (b = new d(v)),
              (_ = document.createTextNode("")),
              b.observe(_, { characterData: !0 }),
              (w = function () {
                _.data = y = ++y % 2;
              }))
            : f
            ? (((m = new MessageChannel()).port1.onmessage = v),
              (w = function () {
                return m.port2.postMessage(0);
              }))
            : (w =
                void 0 === u
                  ? (function () {
                      try {
                        var t = n(6);
                        return (
                          (s = t.runOnLoop || t.runOnContext),
                          function () {
                            s(v);
                          }
                        );
                      } catch (t) {
                        return h();
                      }
                    })()
                  : h());
          var k = Math.random().toString(36).substring(16);
          function S() {}
          var C = new L();
          function A(t) {
            try {
              return t.then;
            } catch (t) {
              return (C.error = t), C;
            }
          }
          function O(e, n, i) {
            n.constructor === e.constructor &&
            i === x &&
            n.constructor.resolve === T
              ? (function (t, e) {
                  1 === e._state
                    ? M(t, e._result)
                    : 2 === e._state
                    ? $(t, e._result)
                    : P(
                        e,
                        void 0,
                        function (e) {
                          return E(t, e);
                        },
                        function (e) {
                          return $(t, e);
                        }
                      );
                })(e, n)
              : i === C
              ? $(e, C.error)
              : void 0 === i
              ? M(e, n)
              : t(i)
              ? (function (t, e, n) {
                  l(function (t) {
                    var i = !1,
                      r = (function (t, e, n, i) {
                        try {
                          t.call(e, n, i);
                        } catch (t) {
                          return t;
                        }
                      })(
                        n,
                        e,
                        function (n) {
                          i || ((i = !0), e !== n ? E(t, n) : M(t, n));
                        },
                        function (e) {
                          i || ((i = !0), $(t, e));
                        },
                        t._label
                      );
                    !i && r && ((i = !0), $(t, r));
                  }, t);
                })(e, n, i)
              : M(e, n);
          }
          function E(t, e) {
            var n;
            t === e
              ? $(t, new TypeError("You cannot resolve a promise with itself"))
              : "function" == typeof (n = e) ||
                ("object" == typeof n && null !== n)
              ? O(t, e, A(e))
              : M(t, e);
          }
          function D(t) {
            t._onerror && t._onerror(t._result), j(t);
          }
          function M(t, e) {
            void 0 === t._state &&
              ((t._result = e),
              (t._state = 1),
              0 !== t._subscribers.length && l(j, t));
          }
          function $(t, e) {
            void 0 === t._state && ((t._state = 2), (t._result = e), l(D, t));
          }
          function P(t, e, n, i) {
            var r = t._subscribers,
              o = r.length;
            (t._onerror = null),
              (r[o] = e),
              (r[o + 1] = n),
              (r[o + 2] = i),
              0 === o && t._state && l(j, t);
          }
          function j(t) {
            var e = t._subscribers,
              n = t._state;
            if (0 !== e.length) {
              for (
                var i = void 0, r = void 0, o = t._result, s = 0;
                s < e.length;
                s += 3
              )
                (i = e[s]), (r = e[s + n]), i ? R(n, i, r, o) : r(o);
              t._subscribers.length = 0;
            }
          }
          function L() {
            this.error = null;
          }
          var N = new L();
          function R(e, n, i, r) {
            var o = t(i),
              s = void 0,
              a = void 0,
              l = void 0,
              u = void 0;
            if (o) {
              if (
                ((s = (function (t, e) {
                  try {
                    return t(e);
                  } catch (t) {
                    return (N.error = t), N;
                  }
                })(i, r)) === N
                  ? ((u = !0), (a = s.error), (s = null))
                  : (l = !0),
                n === s)
              )
                return void $(
                  n,
                  new TypeError(
                    "A promises callback cannot return that same promise."
                  )
                );
            } else (s = r), (l = !0);
            void 0 !== n._state ||
              (o && l
                ? E(n, s)
                : u
                ? $(n, a)
                : 1 === e
                ? M(n, s)
                : 2 === e && $(n, s));
          }
          var H = 0;
          function z(t) {
            (t[k] = H++),
              (t._state = void 0),
              (t._result = void 0),
              (t._subscribers = []);
          }
          function q(t, e) {
            (this._instanceConstructor = t),
              (this.promise = new t(S)),
              this.promise[k] || z(this.promise),
              r(e)
                ? ((this._input = e),
                  (this.length = e.length),
                  (this._remaining = e.length),
                  (this._result = new Array(this.length)),
                  0 === this.length
                    ? M(this.promise, this._result)
                    : ((this.length = this.length || 0),
                      this._enumerate(),
                      0 === this._remaining && M(this.promise, this._result)))
                : $(
                    this.promise,
                    new Error("Array Methods must be provided an Array")
                  );
          }
          function I(t) {
            (this[k] = H++),
              (this._result = this._state = void 0),
              (this._subscribers = []),
              S !== t &&
                ("function" != typeof t &&
                  (function () {
                    throw new TypeError(
                      "You must pass a resolver function as the first argument to the promise constructor"
                    );
                  })(),
                this instanceof I
                  ? (function (t, e) {
                      try {
                        e(
                          function (e) {
                            E(t, e);
                          },
                          function (e) {
                            $(t, e);
                          }
                        );
                      } catch (e) {
                        $(t, e);
                      }
                    })(this, t)
                  : (function () {
                      throw new TypeError(
                        "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                      );
                    })());
          }
          function F() {
            var t = void 0;
            if (void 0 !== i) t = i;
            else if ("undefined" != typeof self) t = self;
            else
              try {
                t = Function("return this")();
              } catch (t) {
                throw new Error(
                  "polyfill failed because global object is unavailable in this environment"
                );
              }
            var e = t.Promise;
            if (e) {
              var n = null;
              try {
                n = Object.prototype.toString.call(e.resolve());
              } catch (t) {}
              if ("[object Promise]" === n && !e.cast) return;
            }
            t.Promise = I;
          }
          return (
            (q.prototype._enumerate = function () {
              for (
                var t = this.length, e = this._input, n = 0;
                void 0 === this._state && n < t;
                n++
              )
                this._eachEntry(e[n], n);
            }),
            (q.prototype._eachEntry = function (t, e) {
              var n = this._instanceConstructor,
                i = n.resolve;
              if (i === T) {
                var r = A(t);
                if (r === x && void 0 !== t._state)
                  this._settledAt(t._state, e, t._result);
                else if ("function" != typeof r)
                  this._remaining--, (this._result[e] = t);
                else if (n === I) {
                  var o = new n(S);
                  O(o, t, r), this._willSettleAt(o, e);
                } else
                  this._willSettleAt(
                    new n(function (e) {
                      return e(t);
                    }),
                    e
                  );
              } else this._willSettleAt(i(t), e);
            }),
            (q.prototype._settledAt = function (t, e, n) {
              var i = this.promise;
              void 0 === i._state &&
                (this._remaining--, 2 === t ? $(i, n) : (this._result[e] = n)),
                0 === this._remaining && M(i, this._result);
            }),
            (q.prototype._willSettleAt = function (t, e) {
              var n = this;
              P(
                t,
                void 0,
                function (t) {
                  return n._settledAt(1, e, t);
                },
                function (t) {
                  return n._settledAt(2, e, t);
                }
              );
            }),
            (I.all = function (t) {
              return new q(this, t).promise;
            }),
            (I.race = function (t) {
              var e = this;
              return r(t)
                ? new e(function (n, i) {
                    for (var r = t.length, o = 0; o < r; o++)
                      e.resolve(t[o]).then(n, i);
                  })
                : new e(function (t, e) {
                    return e(new TypeError("You must pass an array to race."));
                  });
            }),
            (I.resolve = T),
            (I.reject = function (t) {
              var e = new this(S);
              return $(e, t), e;
            }),
            (I._setScheduler = function (t) {
              a = t;
            }),
            (I._setAsap = function (t) {
              l = t;
            }),
            (I._asap = l),
            (I.prototype = {
              constructor: I,
              then: x,
              catch: function (t) {
                return this.then(null, t);
              },
            }),
            F(),
            (I.polyfill = F),
            (I.Promise = I),
            I
          );
        }),
          (t.exports = r());
      }.call(this, n(27), n(4)));
    },
    function (t, e) {
      var n,
        i,
        r = (t.exports = {});
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === o || !n) && setTimeout)
          return (n = setTimeout), setTimeout(t, 0);
        try {
          return n(t, 0);
        } catch (e) {
          try {
            return n.call(null, t, 0);
          } catch (e) {
            return n.call(this, t, 0);
          }
        }
      }
      !(function () {
        try {
          n = "function" == typeof setTimeout ? setTimeout : o;
        } catch (t) {
          n = o;
        }
        try {
          i = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (t) {
          i = s;
        }
      })();
      var l,
        u = [],
        c = !1,
        d = -1;
      function p() {
        c &&
          l &&
          ((c = !1), l.length ? (u = l.concat(u)) : (d = -1), u.length && f());
      }
      function f() {
        if (!c) {
          var t = a(p);
          c = !0;
          for (var e = u.length; e; ) {
            for (l = u, u = []; ++d < e; ) l && l[d].run();
            (d = -1), (e = u.length);
          }
          (l = null),
            (c = !1),
            (function (t) {
              if (i === clearTimeout) return clearTimeout(t);
              if ((i === s || !i) && clearTimeout)
                return (i = clearTimeout), clearTimeout(t);
              try {
                i(t);
              } catch (e) {
                try {
                  return i.call(null, t);
                } catch (e) {
                  return i.call(this, t);
                }
              }
            })(t);
        }
      }
      function h(t, e) {
        (this.fun = t), (this.array = e);
      }
      function g() {}
      (r.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        u.push(new h(t, e)), 1 !== u.length || c || a(f);
      }),
        (h.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (r.title = "browser"),
        (r.browser = !0),
        (r.env = {}),
        (r.argv = []),
        (r.version = ""),
        (r.versions = {}),
        (r.on = g),
        (r.addListener = g),
        (r.once = g),
        (r.off = g),
        (r.removeListener = g),
        (r.removeAllListeners = g),
        (r.emit = g),
        (r.prependListener = g),
        (r.prependOnceListener = g),
        (r.listeners = function (t) {
          return [];
        }),
        (r.binding = function (t) {
          throw new Error("process.binding is not supported");
        }),
        (r.cwd = function () {
          return "/";
        }),
        (r.chdir = function (t) {
          throw new Error("process.chdir is not supported");
        }),
        (r.umask = function () {
          return 0;
        });
    },
  ],
]);
