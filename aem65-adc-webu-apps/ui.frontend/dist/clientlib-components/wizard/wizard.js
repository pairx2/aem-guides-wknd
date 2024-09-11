!(function (t) {
  function n(n) {
    for (
      var s, r, u = n[0], c = n[1], i = n[2], l = 0, d = [];
      l < u.length;
      l++
    )
      (r = u[l]),
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && d.push(a[r][0]),
        (a[r] = 0);
    for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (t[s] = c[s]);
    for (f && f(n); d.length; ) d.shift()();
    return o.push.apply(o, i || []), e();
  }
  function e() {
    for (var t, n = 0; n < o.length; n++) {
      for (var e = o[n], s = !0, u = 1; u < e.length; u++) {
        var c = e[u];
        0 !== a[c] && (s = !1);
      }
      s && (o.splice(n--, 1), (t = r((r.s = e[0]))));
    }
    return t;
  }
  var s = {},
    a = { 72: 0 },
    o = [];
  function r(n) {
    if (s[n]) return s[n].exports;
    var e = (s[n] = { i: n, l: !1, exports: {} });
    return t[n].call(e.exports, e, e.exports, r), (e.l = !0), e.exports;
  }
  (r.m = t),
    (r.c = s),
    (r.d = function (t, n, e) {
      r.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, n) {
      if ((1 & n && (t = r(t)), 8 & n)) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (r.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & n && "string" != typeof t)
      )
        for (var s in t)
          r.d(
            e,
            s,
            function (n) {
              return t[n];
            }.bind(null, s)
          );
      return e;
    }),
    (r.n = function (t) {
      var n =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(n, "a", n), n;
    }),
    (r.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (r.p = "");
  var u = (window.webpackJsonp = window.webpackJsonp || []),
    c = u.push.bind(u);
  (u.push = n), (u = u.slice());
  for (var i = 0; i < u.length; i++) n(u[i]);
  var f = c;
  o.push([184, 0]), e();
})({
  184: function (t, n, e) {
    (function (t) {
      var n = (function () {
        function n(n) {
          (this.formButtonWrapper = t(n)),
            this.checkButtonAlignment(this.formButtonWrapper);
        }
        return (
          (n.prototype.checkButtonAlignment = function (n) {
            var e = t(n).find(".button"),
              s = t(e).length;
            if (1 == s) {
              var a = e[0];
              t(a).hasClass("justify-content-center")
                ? t(n).addClass("justify-content-center")
                : t(a).hasClass("justify-content-start")
                ? t(n).addClass("justify-content-start")
                : t(n).addClass("justify-content-end");
            } else if (2 == s) {
              a = e[0];
              var o = e[1];
              t(a).hasClass("justify-content-start") &&
              (t(o).hasClass("justify-content-center") ||
                t(o).hasClass("justify-content-start"))
                ? t(n).addClass("justify-content-start")
                : t(a).hasClass("justify-content-start") &&
                  t(o).hasClass("justify-content-end")
                ? t(n).addClass("justify-content-between")
                : t(a).hasClass("justify-content-center")
                ? t(n).addClass("justify-content-around")
                : t(a).hasClass("justify-content-end")
                ? t(n).addClass("justify-content-end")
                : t(n).addClass("justify-content-between");
            } else if (3 == s) {
              (a = e[0]), (o = e[1]);
              var r = e[2];
              t(a).hasClass("justify-content-start") &&
              !0 !== t(o).hasClass("justify-content-center") &&
              !0 !== t(r).hasClass("justify-content-end")
                ? t(n).addClass("justify-content-start")
                : t(a).hasClass("justify-content-start") &&
                  t(o).hasClass("justify-content-center") &&
                  t(r).hasClass("justify-content-end")
                ? t(n).addClass("justify-content-between")
                : t(a).hasClass("justify-content-center")
                ? t(n).addClass("justify-content-around")
                : t(a).hasClass("justify-content-end")
                ? t(n).addClass("justify-content-end")
                : t(n).addClass("justify-content-between");
            } else t(n).addClass("justify-content-end");
          }),
          n
        );
      })();
      t(document).ready(function () {
        document
          .querySelectorAll(".o-form-container__buttons, .o-wizard__btn")
          .forEach(function (t) {
            new n(t);
          });
      });
    }.call(this, e(6)));
  },
});
