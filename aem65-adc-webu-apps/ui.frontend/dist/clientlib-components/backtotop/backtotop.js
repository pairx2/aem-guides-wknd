!(function (o) {
  function t(t) {
    for (
      var n, l, s = t[0], a = t[1], c = t[2], h = 0, d = [];
      h < s.length;
      h++
    )
      (l = s[h]),
        Object.prototype.hasOwnProperty.call(r, l) && r[l] && d.push(r[l][0]),
        (r[l] = 0);
    for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (o[n] = a[n]);
    for (u && u(t); d.length; ) d.shift()();
    return i.push.apply(i, c || []), e();
  }
  function e() {
    for (var o, t = 0; t < i.length; t++) {
      for (var e = i[t], n = !0, s = 1; s < e.length; s++) {
        var a = e[s];
        0 !== r[a] && (n = !1);
      }
      n && (i.splice(t--, 1), (o = l((l.s = e[0]))));
    }
    return o;
  }
  var n = {},
    r = { 8: 0 },
    i = [];
  function l(t) {
    if (n[t]) return n[t].exports;
    var e = (n[t] = { i: t, l: !1, exports: {} });
    return o[t].call(e.exports, e, e.exports, l), (e.l = !0), e.exports;
  }
  (l.m = o),
    (l.c = n),
    (l.d = function (o, t, e) {
      l.o(o, t) || Object.defineProperty(o, t, { enumerable: !0, get: e });
    }),
    (l.r = function (o) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(o, "__esModule", { value: !0 });
    }),
    (l.t = function (o, t) {
      if ((1 & t && (o = l(o)), 8 & t)) return o;
      if (4 & t && "object" == typeof o && o && o.__esModule) return o;
      var e = Object.create(null);
      if (
        (l.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: o }),
        2 & t && "string" != typeof o)
      )
        for (var n in o)
          l.d(
            e,
            n,
            function (t) {
              return o[t];
            }.bind(null, n)
          );
      return e;
    }),
    (l.n = function (o) {
      var t =
        o && o.__esModule
          ? function () {
              return o.default;
            }
          : function () {
              return o;
            };
      return l.d(t, "a", t), t;
    }),
    (l.o = function (o, t) {
      return Object.prototype.hasOwnProperty.call(o, t);
    }),
    (l.p = "");
  var s = (window.webpackJsonp = window.webpackJsonp || []),
    a = s.push.bind(s);
  (s.push = t), (s = s.slice());
  for (var c = 0; c < s.length; c++) t(s[c]);
  var u = a;
  i.push([127, 0]), e();
})({
  127: function (o, t, e) {
    (function (o) {
      !(function () {
        "use strict";
        var t = (function () {
          function t(t) {
            (this.showClassName = "show"),
              (this.footerClass = "footer"),
              (this.minScrollShow = 300),
              (this.backToTopBtn = o(t)),
              this.afterWindowLoad();
          }
          return (
            (t.prototype.afterWindowLoad = function () {
              var o, t, e;
              (this.showIfPageLongerThen =
                null !==
                  (o = +this.backToTopBtn.attr("data-page-longer-then")) &&
                void 0 !== o
                  ? o
                  : 0),
                this.showIfPageLongerThen &&
                  0 != this.showIfPageLongerThen &&
                  (this.backToTopBtn.on("click", this.scrollToTop),
                  (this.footerHeight =
                    null !==
                      (e =
                        null ===
                          (t = document.getElementsByClassName(
                            this.footerClass
                          )[0]) || void 0 === t
                          ? void 0
                          : t.clientHeight) && void 0 !== e
                      ? e
                      : 0),
                  this.buttonWillShow());
            }),
            (t.prototype.scrollToTop = function (t) {
              null == t || t.preventDefault(),
                o("html, body").animate({ scrollTop: 0 }, 500);
            }),
            (t.prototype.buttonWillShow = function () {
              var o,
                t = this,
                e =
                  null ===
                    (o =
                      null === window || void 0 === window
                        ? void 0
                        : window.screen) || void 0 === o
                    ? void 0
                    : o.height;
              document.body.clientHeight >= e * this.showIfPageLongerThen &&
                window.addEventListener("scroll", function () {
                  t.stopOverlayFooter();
                });
            }),
            (t.prototype.stopOverlayFooter = function () {
              var o,
                t,
                e,
                n,
                r =
                  document.body.scrollTop || document.documentElement.scrollTop,
                i =
                  document.documentElement.scrollHeight -
                  document.documentElement.clientHeight -
                  this.footerHeight;
              r > this.minScrollShow && i >= r
                ? !(null === (o = this.backToTopBtn) || void 0 === o
                    ? void 0
                    : o.hasClass(this.showClassName)) &&
                  (null === (t = this.backToTopBtn) ||
                    void 0 === t ||
                    t.addClass(this.showClassName))
                : (null === (e = this.backToTopBtn) || void 0 === e
                    ? void 0
                    : e.hasClass(this.showClassName)) &&
                  (null === (n = this.backToTopBtn) ||
                    void 0 === n ||
                    n.removeClass(this.showClassName));
            }),
            t
          );
        })();
        o(document).ready(function () {
          document
            .querySelectorAll('[data-js-component="back-to-top"]')
            .forEach(function (o) {
              new t(o);
            });
        });
      })();
    }.call(this, e(6)));
  },
});
