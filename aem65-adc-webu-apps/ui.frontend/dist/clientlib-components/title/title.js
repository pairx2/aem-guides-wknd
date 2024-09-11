!(function (t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var r = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          n.d(
            i,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 142));
})({
  142: function (t, e) {
    var n = (function () {
      function t(t) {
        (this.spacingClasses = [
          "a-title--mt-small",
          "a-title--mt-medium",
          "a-title--mb-small",
          "a-title--mb-medium",
        ]),
          (this.container = t.closest(".title")),
          this.compareSpacingClassName();
      }
      return (
        (t.prototype.compareSpacingClassName = function () {
          if (this.container)
            for (var t = this.container.classList, e = 0; e < t.length; e++)
              for (var n = 0; n < this.spacingClasses.length; n++)
                t[e] === this.spacingClasses[n] &&
                  this.applyCSSToElements(t[e]);
          return !1;
        }),
        (t.prototype.applyCSSToElements = function (t) {
          var e, n;
          -1 !== t.indexOf("a-title--mt") &&
            (null === (e = this.container.previousElementSibling) ||
              void 0 === e ||
              e.classList.add("mb-0")),
            -1 !== t.indexOf("a-title--mb") &&
              (null === (n = this.container.nextElementSibling) ||
                void 0 === n ||
                n.classList.add("mt-0"));
        }),
        t
      );
    })();
    document
      .querySelectorAll('[data-js-component="title"]')
      .forEach(function (t) {
        new n(t);
      });
  },
});
