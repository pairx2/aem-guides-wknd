!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 169));
})({
  169: function (e, t) {
    var n;
    (n = (function () {
      function e(e) {
        (this.elem = e), this.init();
      }
      return (
        (e.prototype.init = function () {
          var e,
            t,
            n,
            o,
            r =
              null === (e = this.elem.querySelector(".m-hero__content")) ||
              void 0 === e
                ? void 0
                : e.clientHeight,
            i =
              null === (t = this.elem.querySelector(".m-hero__content")) ||
              void 0 === t
                ? void 0
                : t.style.paddingTop,
            l =
              null === (n = this.elem.querySelector(".m-hero__content")) ||
              void 0 === n
                ? void 0
                : n.style.paddingBottom;
          this.elem
            .closest(".m-hero")
            .classList.contains("m-hero--auto-height") &&
            (o = r + i + l) &&
            ((this.elem.querySelector(".m-hero__media").style.height =
              o + "px"),
            (this.elem.closest(".m-hero").style.height = o + "px"));
        }),
        e
      );
    })()),
      document
        .querySelectorAll('[data-js-component="hero-v2"]')
        .forEach(function (e) {
          new n(e);
        });
  },
});
