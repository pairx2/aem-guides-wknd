!(function (t) {
  function n(n) {
    for (
      var e, c, a = n[0], u = n[1], l = n[2], p = 0, d = [];
      p < a.length;
      p++
    )
      (c = a[p]),
        Object.prototype.hasOwnProperty.call(r, c) && r[c] && d.push(r[c][0]),
        (r[c] = 0);
    for (e in u) Object.prototype.hasOwnProperty.call(u, e) && (t[e] = u[e]);
    for (f && f(n); d.length; ) d.shift()();
    return i.push.apply(i, l || []), o();
  }
  function o() {
    for (var t, n = 0; n < i.length; n++) {
      for (var o = i[n], e = !0, a = 1; a < o.length; a++) {
        var u = o[a];
        0 !== r[u] && (e = !1);
      }
      e && (i.splice(n--, 1), (t = c((c.s = o[0]))));
    }
    return t;
  }
  var e = {},
    r = { 4: 0 },
    i = [];
  function c(n) {
    if (e[n]) return e[n].exports;
    var o = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, c), (o.l = !0), o.exports;
  }
  (c.m = t),
    (c.c = e),
    (c.d = function (t, n, o) {
      c.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: o });
    }),
    (c.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (c.t = function (t, n) {
      if ((1 & n && (t = c(t)), 8 & n)) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var o = Object.create(null);
      if (
        (c.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: t }),
        2 & n && "string" != typeof t)
      )
        for (var e in t)
          c.d(
            o,
            e,
            function (n) {
              return t[n];
            }.bind(null, e)
          );
      return o;
    }),
    (c.n = function (t) {
      var n =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return c.d(n, "a", n), n;
    }),
    (c.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (c.p = "");
  var a = (window.webpackJsonp = window.webpackJsonp || []),
    u = a.push.bind(a);
  (a.push = n), (a = a.slice());
  for (var l = 0; l < a.length; l++) n(a[l]);
  var f = u;
  i.push([160, 0]), o();
})({
  160: function (t, n, o) {
    "use strict";
    o.r(n),
      function (t) {
        o.d(n, "AccountNavigation", function () {
          return e;
        });
        var e = function (n) {
          var o = this;
          (this.toggleDropdown = function (t) {
            t.preventDefault(), o.$toggleDropdownBtn.toggleClass("open");
          }),
            (this.setDropdownTitle = function () {
              var t = o.$dropdownOptions.find(
                ".m-account-navigation__item--active"
              );
              if (t) {
                var n = t.find(".m-account-navigation__text").text(),
                  e = t.find(".m-account-navigation__icon em").attr("class");
                o.$toggleDropdownBtn
                  .find(".m-account-navigation__accordion-title")
                  .text(n),
                  o.$toggleDropdownBtn
                    .find(".m-account-navigation__accordion-icon em")
                    .attr("class", e);
              }
            }),
            (this.$toggleDropdownBtn = t(n).find(
              ".m-account-navigation__accordion-toggle"
            )),
            (this.$dropdownOptions = t(n).find(
              ".m-account-navigation__accordion-content"
            )),
            this.$toggleDropdownBtn.on("click", this.toggleDropdown),
            this.setDropdownTitle();
        };
        t(document).ready(function () {
          document
            .querySelectorAll(".js-account-navigation")
            .forEach(function (t) {
              new e(t);
            });
        });
      }.call(this, o(6));
  },
});
