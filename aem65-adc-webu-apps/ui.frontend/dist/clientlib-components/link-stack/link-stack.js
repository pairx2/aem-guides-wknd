!(function (t) {
  function e(e) {
    for (
      var o, s, a = e[0], r = e[1], l = e[2], k = 0, d = [];
      k < a.length;
      k++
    )
      (s = a[k]),
        Object.prototype.hasOwnProperty.call(i, s) && i[s] && d.push(i[s][0]),
        (i[s] = 0);
    for (o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    for (u && u(e); d.length; ) d.shift()();
    return c.push.apply(c, l || []), n();
  }
  function n() {
    for (var t, e = 0; e < c.length; e++) {
      for (var n = c[e], o = !0, a = 1; a < n.length; a++) {
        var r = n[a];
        0 !== i[r] && (o = !1);
      }
      o && (c.splice(e--, 1), (t = s((s.s = n[0]))));
    }
    return t;
  }
  var o = {},
    i = { 38: 0 },
    c = [];
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
  var a = (window.webpackJsonp = window.webpackJsonp || []),
    r = a.push.bind(a);
  (a.push = e), (a = a.slice());
  for (var l = 0; l < a.length; l++) e(a[l]);
  var u = r;
  c.push([174, 0]), n();
})({
  174: function (t, e, n) {
    "use strict";
    n.r(e),
      function (t) {
        n.d(e, "DefaultLinkStack", function () {
          return o;
        }),
          n.d(e, "DefaultLinkStackSticky", function () {
            return i;
          });
        var o = (function () {
          function e(e) {
            this.subscribers = [];
            var n = t(e).find(".js-collapse-icon"),
              o = t(e).find(".m-link-stack--dropdown"),
              i = t(e).find(".a-link");
            n.on("click", this.toggleLinkStack),
              o.on("click", this.toggleFaqLinkStack),
              i.on("click", this.selectLink),
              t(document).on("click", this.closeFaqLinkStack);
          }
          return (
            (e.prototype.toggleLinkStack = function (e) {
              void 0 === e && (e = event), e.preventDefault();
              var n = t(event.target)
                .closest(".js-m-link-stack")
                .find(".js-collapsable-links");
              n.length && n.toggleClass("d-none");
            }),
            (e.prototype.toggleFaqLinkStack = function (e) {
              void 0 === e && (e = event), e.preventDefault();
              var n = t(event.target)
                  .closest(".js-m-link-stack")
                  .find(".js-faq-links"),
                o = t(event.target)
                  .closest(".js-m-link-stack")
                  .find(".m-link-stack--dropdown");
              n.length &&
                (o.toggleClass("m-link-stack--dropdown-open"),
                n.toggleClass("d-none"));
            }),
            (e.prototype.closeFaqLinkStack = function (e) {
              var n = t(".js-faq-links"),
                o = t(".m-link-stack--dropdown");
              o.is(e.target) ||
                0 !== o.has(e.target).length ||
                (o.removeClass("m-link-stack--dropdown-open"),
                n.addClass("d-none"));
            }),
            (e.prototype.selectLink = function (e) {
              void 0 === e && (e = event);
              var n = t(event.target)
                  .closest(".js-m-link-stack")
                  .find(".m-link-stack--dropdown-value"),
                o = t(event.target).find(".a-link__text").text();
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
              new o(t);
            });
        });
        var i = (function () {
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
              void 0 === e && (e = event), e.preventDefault();
              var n = t(event.target)
                  .closest(".js-m-link-stack-sticky")
                  .find(".js-collapsable-links-sticky"),
                o = t(event.target)
                  .closest(".js-m-link-stack-sticky")
                  .find(".js-link-stack-sticky-header-icon");
              n.length &&
                (n.toggleClass("d-none"), o.toggleClass("arrow-rotated-up"));
            }),
            (e.prototype.setMobileButtonText = function (e) {
              void 0 === e && (e = event),
                window.setTimeout(function () {
                  var n = t(e.target).html();
                  t(
                    ".js-collapse-icon-sticky .m-link-stack-sticky__header-title"
                  ).html(n);
                }, 0);
            }),
            (e.prototype.setSticky = function (t) {
              t.data("sticky") &&
                !t.data("editMode") &&
                (t.appendTo(".o-header__sticky-section"),
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
              new i(t);
            });
        });
      }.call(this, n(6));
  },
});
