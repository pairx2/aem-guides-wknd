!(function (t) {
  function i(i) {
    for (
      var n, s, c = i[0], l = i[1], u = i[2], d = 0, p = [];
      d < c.length;
      d++
    )
      (s = c[d]),
        Object.prototype.hasOwnProperty.call(r, s) && r[s] && p.push(r[s][0]),
        (r[s] = 0);
    for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (t[n] = l[n]);
    for (a && a(i); p.length; ) p.shift()();
    return o.push.apply(o, u || []), e();
  }
  function e() {
    for (var t, i = 0; i < o.length; i++) {
      for (var e = o[i], n = !0, c = 1; c < e.length; c++) {
        var l = e[c];
        0 !== r[l] && (n = !1);
      }
      n && (o.splice(i--, 1), (t = s((s.s = e[0]))));
    }
    return t;
  }
  var n = {},
    r = { 13: 0 },
    o = [];
  function s(i) {
    if (n[i]) return n[i].exports;
    var e = (n[i] = { i: i, l: !1, exports: {} });
    return t[i].call(e.exports, e, e.exports, s), (e.l = !0), e.exports;
  }
  (s.m = t),
    (s.c = n),
    (s.d = function (t, i, e) {
      s.o(t, i) || Object.defineProperty(t, i, { enumerable: !0, get: e });
    }),
    (s.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function (t, i) {
      if ((1 & i && (t = s(t)), 8 & i)) return t;
      if (4 & i && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (s.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & i && "string" != typeof t)
      )
        for (var n in t)
          s.d(
            e,
            n,
            function (i) {
              return t[i];
            }.bind(null, n)
          );
      return e;
    }),
    (s.n = function (t) {
      var i =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return s.d(i, "a", i), i;
    }),
    (s.o = function (t, i) {
      return Object.prototype.hasOwnProperty.call(t, i);
    }),
    (s.p = "");
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    l = c.push.bind(c);
  (c.push = i), (c = c.slice());
  for (var u = 0; u < c.length; u++) i(c[u]);
  var a = l;
  o.push([34, 0]), e();
})({
  34: function (t, i, e) {
    "use strict";
    e.r(i),
      function (t) {
        var i;
        e(5);
        (i = (function () {
          function i(i) {
            (this.productItems = t(i).find(".product-section__items")),
              (this.isSlickInitialized = !1),
              this.initializeProductCarousel(),
              window.addEventListener(
                "resize",
                this.initializeProductCarousel.bind(this)
              );
          }
          return (
            (i.prototype.destroySlick = function () {
              this.isSlickInitialized &&
                (this.productItems.slick("unslick"),
                (this.isSlickInitialized = !1));
            }),
            (i.prototype.initializeProductCarousel = function () {
              window.innerWidth <= 768 && !this.isSlickInitialized
                ? (this.initSlick(), (this.isSlickInitialized = !0))
                : this.destroySlick();
            }),
            (i.prototype.initSlick = function () {
              var t = {
                dots: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow:
                  '<button type="button" aria-label="Previous" class="slick-prev slick-arrow"><em class="abt-icon abt-icon-left-arrow"></em></button>',
                nextArrow:
                  '<button type="button" aria-label="Next" class="slick-next slick-arrow"><em class="abt-icon abt-icon-right-arrow"></em></button>',
                swipeToSlide: !0,
                infinite: !1,
                variableWidth: !0,
                customPaging: function () {
                  return "<span></span>";
                },
              };
              this.productItems.slick(t), this.setupProgressbar();
            }),
            (i.prototype.setupProgressbar = function () {
              var i,
                e,
                n =
                  null ===
                    (e =
                      null === (i = this.productItems) || void 0 === i
                        ? void 0
                        : i.slick("getSlick")) || void 0 === e
                    ? void 0
                    : e.slideCount,
                r = t('<div class="slick-progress-bar"></div>').appendTo(
                  ".slick-dots"
                ),
                o = 100 / n;
              r.css("width", o + "%"),
                this.productItems.on("beforeChange", function (t, i, e, o) {
                  var s = ((o + 1) / n) * 100 + "%";
                  r.css("width", s);
                });
            }),
            i
          );
        })()),
          t(document).ready(function () {
            document
              .querySelectorAll('[data-js-component="product-section"]')
              .forEach(function (t) {
                new i(t);
              });
          });
      }.call(this, e(1));
  },
});
