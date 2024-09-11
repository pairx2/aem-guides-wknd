!(function (t) {
  function e(e) {
    for (
      var o, s, c = e[0], a = e[1], r = e[2], u = 0, k = [];
      u < c.length;
      u++
    )
      (s = c[u]),
        Object.prototype.hasOwnProperty.call(i, s) && i[s] && k.push(i[s][0]),
        (i[s] = 0);
    for (o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    for (d && d(e); k.length; ) k.shift()();
    return l.push.apply(l, r || []), n();
  }
  function n() {
    for (var t, e = 0; e < l.length; e++) {
      for (var n = l[e], o = !0, c = 1; c < n.length; c++) {
        var a = n[c];
        0 !== i[a] && (o = !1);
      }
      o && (l.splice(e--, 1), (t = s((s.s = n[0]))));
    }
    return t;
  }
  var o = {},
    i = { 10: 0 },
    l = [];
  function s(e) {
    if (o[e]) return o[e].exports;
    var n = (o[e] = { i: e, l: !1, exports: {} });
    return t[e].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.m = t),
    (s.c = o),
    (s.d = function (t, e, n) {
      s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (s.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function (t, e) {
      if ((1 & e && (t = s(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (s.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          s.d(
            n,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (s.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return s.d(e, "a", e), e;
    }),
    (s.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (s.p = "");
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    a = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var r = 0; r < c.length; r++) e(c[r]);
  var d = a;
  l.push([31, 0]), n();
})({
  31: function (t, e, n) {
    (function (t) {
      !(function () {
        var e = (function () {
          function e(e) {
            this.subscribers = [];
            var n = t(e).find(".js-collapse-icon"),
              o = t(e).find(".link-stack--dropdown"),
              i = t(e).find(".link");
            n.on("click", this.toggleLinkStack),
              o.on("click", this.toggleFaqLinkStack),
              i.on("click", this.selectLink),
              t(document).on("click", this.closeFaqLinkStack);
          }
          return (
            (e.prototype.toggleLinkStack = function (e) {
              void 0 === e && (e = event), null == e || e.preventDefault();
              var n = t(
                  null === event || void 0 === event ? void 0 : event.target
                ).closest(".js-link-stack"),
                o = null == n ? void 0 : n.find(".js-collapsable-links"),
                i = null == n ? void 0 : n.find(".js-collapse-icon");
              o.length &&
                (o.toggleClass("d-none"), i.toggleClass("rotate-upside"));
            }),
            (e.prototype.toggleFaqLinkStack = function (e) {
              void 0 === e && (e = event), null == e || e.preventDefault();
              var n = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .closest(".js-link-stack")
                  .find(".js-faq-links"),
                o = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .closest(".js-link-stack")
                  .find(".link-stack--dropdown");
              n.length &&
                (o.toggleClass("link-stack--dropdown-open"),
                n.toggleClass("d-none"));
            }),
            (e.prototype.closeFaqLinkStack = function (e) {
              var n = t(".js-faq-links"),
                o = t(".link-stack--dropdown");
              o.is(e.target) ||
                0 !== o.has(e.target).length ||
                (o.removeClass("link-stack--dropdown-open"),
                n.addClass("d-none"));
            }),
            (e.prototype.selectLink = function (e) {
              void 0 === e && (e = event);
              var n = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .closest(".js-link-stack")
                  .find(".link-stack--dropdown-value"),
                o = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .find(".link__text")
                  .text();
              n.html(o);
            }),
            (e.prototype.onDataLoad = function (t) {
              this.subscribers.push(t);
            }),
            e
          );
        })();
        t(document).ready(function () {
          document
            .querySelectorAll('[data-js-component="default-link-stack"]')
            .forEach(function (t) {
              new e(t);
            });
        });
        var n = (function () {
          function e(e) {
            var n = t(e).find(".js-collapse-icon-sticky"),
              o = t(e).find(".js-link-stack-sticky-dropdown-option");
            n.on("click", this.toggleLinkStackSticky),
              o.on("click", this.setMobileButtonText),
              t(document).on("click", this.closeMobileMenu),
              this.setSticky(t(e));
          }
          return (
            (e.prototype.toggleLinkStackSticky = function (e) {
              void 0 === e && (e = event), null == e || e.preventDefault();
              var n = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .closest(".js-link-stack-sticky")
                  .find(".js-collapsable-links-sticky"),
                o = t(
                  null === event || void 0 === event ? void 0 : event.target
                )
                  .closest(".js-link-stack-sticky")
                  .find(".js-link-stack-sticky-header-icon");
              n.length &&
                (n.toggleClass("d-none"), o.toggleClass("arrow-rotated-up"));
            }),
            (e.prototype.setMobileButtonText = function (e) {
              void 0 === e && (e = event),
                window.setTimeout(function () {
                  var n = t(null == e ? void 0 : e.target).html();
                  t(
                    ".js-collapse-icon-sticky .link-stack-sticky__header-title"
                  ).html(n);
                }, 0);
            }),
            (e.prototype.setSticky = function (t) {
              t.data("sticky") &&
                !t.data("editMode") &&
                (t.appendTo(".header__sticky-section"),
                t.removeClass("d-none"));
            }),
            (e.prototype.closeMobileMenu = function (e) {
              var n = t(".js-collapsable-links-sticky"),
                o = t(".js-collapse-icon-sticky"),
                i = t(".js-link-stack-sticky-header-icon");
              o.is(e.target) ||
                0 !== o.has(e.target).length ||
                (n.addClass("d-none"), i.toggleClass("arrow-rotated-up"));
            }),
            e
          );
        })();
        t(document).ready(function () {
          document
            .querySelectorAll('[data-js-component="default-link-stack-sticky"]')
            .forEach(function (t) {
              new n(t);
            });
        });
      })();
    }.call(this, n(1)));
  },
});
