!(function (t) {
  function e(e) {
    for (
      var n, l, i = e[0], c = e[1], u = e[2], p = 0, s = [];
      p < i.length;
      p++
    )
      (l = i[p]),
        Object.prototype.hasOwnProperty.call(o, l) && o[l] && s.push(o[l][0]),
        (o[l] = 0);
    for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
    for (f && f(e); s.length; ) s.shift()();
    return a.push.apply(a, u || []), r();
  }
  function r() {
    for (var t, e = 0; e < a.length; e++) {
      for (var r = a[e], n = !0, i = 1; i < r.length; i++) {
        var c = r[i];
        0 !== o[c] && (n = !1);
      }
      n && (a.splice(e--, 1), (t = l((l.s = r[0]))));
    }
    return t;
  }
  var n = {},
    o = { 64: 0 },
    a = [];
  function l(e) {
    if (n[e]) return n[e].exports;
    var r = (n[e] = { i: e, l: !1, exports: {} });
    return t[e].call(r.exports, r, r.exports, l), (r.l = !0), r.exports;
  }
  (l.m = t),
    (l.c = n),
    (l.d = function (t, e, r) {
      l.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (l.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (l.t = function (t, e) {
      if ((1 & e && (t = l(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (l.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          l.d(
            r,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return r;
    }),
    (l.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return l.d(e, "a", e), e;
    }),
    (l.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (l.p = "");
  var i = (window.webpackJsonp = window.webpackJsonp || []),
    c = i.push.bind(i);
  (i.push = e), (i = i.slice());
  for (var u = 0; u < i.length; u++) e(i[u]);
  var f = c;
  a.push([140, 0]), r();
})({
  140: function (t, e, r) {
    (function (t) {
      var e = (function () {
        function e(e) {
          t(e).on("click", this.toggleSwitcherLabel);
        }
        return (
          (e.prototype.toggleSwitcherLabel = function (e) {
            void 0 === e && (e = event), e.preventDefault();
            var r = t(this).siblings(".custom-control-input");
            if (null != r.attr("checked")) {
              r.removeAttr("checked");
              var n = t(this).attr("data-offlabel");
              t(this).text(n), r.attr("aria-label", n);
            } else {
              r.attr("checked", "checked");
              var o = t(this).attr("data-onlabel");
              t(this).text(o), r.attr("aria-label", o);
            }
          }),
          e
        );
      })();
      document
        .querySelectorAll('[data-component="switcher"]')
        .forEach(function (t) {
          new e(t);
        });
    }.call(this, r(6)));
  },
});
