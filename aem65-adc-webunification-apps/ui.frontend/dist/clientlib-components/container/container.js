!(function (e) {
  function t(t) {
    for (
      var r, a, u = t[0], c = t[1], l = t[2], p = 0, s = [];
      p < u.length;
      p++
    )
      (a = u[p]),
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && s.push(o[a][0]),
        (o[a] = 0);
    for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
    for (d && d(t); s.length; ) s.shift()();
    return i.push.apply(i, l || []), n();
  }
  function n() {
    for (var e, t = 0; t < i.length; t++) {
      for (var n = i[t], r = !0, u = 1; u < n.length; u++) {
        var c = n[u];
        0 !== o[c] && (r = !1);
      }
      r && (i.splice(t--, 1), (e = a((a.s = n[0]))));
    }
    return e;
  }
  var r = {},
    o = { 3: 0 },
    i = [];
  function a(t) {
    if (r[t]) return r[t].exports;
    var n = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(n.exports, n, n.exports, a), (n.l = !0), n.exports;
  }
  (a.m = e),
    (a.c = r),
    (a.d = function (e, t, n) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (a.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (a.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          a.d(
            n,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return a.d(t, "a", t), t;
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = "");
  var u = (window.webpackJsonp = window.webpackJsonp || []),
    c = u.push.bind(u);
  (u.push = t), (u = u.slice());
  for (var l = 0; l < u.length; l++) t(u[l]);
  var d = c;
  i.push([22, 0]), n();
})({
  22: function (e, t, n) {
    (function (e) {
      var t;
      (t = (function () {
        function e(e) {
          var t = e;
          (this.curve = t.closest(".container_bg_yellow-gradient-curved")),
            this.curve && this.addCurve(this.curve),
            (this.imageElement = t.querySelector(
              ".container__media .cmp-image__image"
            )),
            this.imageElement && this.updateContainerImages(this.imageElement);
        }
        return (
          (e.prototype.addCurve = function (e) {
            e.innerHTML +=
              '<svg class="container_bg_yellow-curve" xmlns="http://www.w3.org/2000/svg" width="100%" height="43"\n        viewBox="0 0 1440 43" fill="none">\n        <path class="shape-fill" fill-rule="evenodd" clip-rule="evenodd"\n            d="M0 0C163.291 19.9294 407.102 42.0485 718.984 42.0485C1030.89 42.0485 1314.96 21.0343 1440 0H0Z"\n           />\n    </svg>';
          }),
          (e.prototype.updateContainerImages = function (e) {
            var t,
              n,
              r =
                null === (t = document.querySelector(".cmp-image__image")) ||
                void 0 === t
                  ? void 0
                  : t.getAttribute("data-tablet-img"),
              o =
                null === (n = document.querySelector(".cmp-image__image")) ||
                void 0 === n
                  ? void 0
                  : n.getAttribute("data-mobile-img");
            window.matchMedia("(max-width: 767px)").matches && o
              ? (e.src = o)
              : r &&
                window.matchMedia("(min-width: 768px)").matches &&
                window.matchMedia("(max-width: 991.9px)").matches &&
                (e.src = r);
          }),
          e
        );
      })()),
        e(function () {
          document
            .querySelectorAll('[data-js-component="container"]')
            .forEach(function (e) {
              new t(e);
            });
        });
    }.call(this, n(1)));
  },
});
