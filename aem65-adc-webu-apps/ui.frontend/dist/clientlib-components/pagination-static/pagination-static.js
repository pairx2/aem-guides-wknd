!(function (t) {
  function n(n) {
    for (
      var o, a, c = n[0], s = n[1], u = n[2], p = 0, f = [];
      p < c.length;
      p++
    )
      (a = c[p]),
        Object.prototype.hasOwnProperty.call(i, a) && i[a] && f.push(i[a][0]),
        (i[a] = 0);
    for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (t[o] = s[o]);
    for (l && l(n); f.length; ) f.shift()();
    return r.push.apply(r, u || []), e();
  }
  function e() {
    for (var t, n = 0; n < r.length; n++) {
      for (var e = r[n], o = !0, c = 1; c < e.length; c++) {
        var s = e[c];
        0 !== i[s] && (o = !1);
      }
      o && (r.splice(n--, 1), (t = a((a.s = e[0]))));
    }
    return t;
  }
  var o = {},
    i = { 43: 0 },
    r = [];
  function a(n) {
    if (o[n]) return o[n].exports;
    var e = (o[n] = { i: n, l: !1, exports: {} });
    return t[n].call(e.exports, e, e.exports, a), (e.l = !0), e.exports;
  }
  (a.m = t),
    (a.c = o),
    (a.d = function (t, n, e) {
      a.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e });
    }),
    (a.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (a.t = function (t, n) {
      if ((1 & n && (t = a(t)), 8 & n)) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (a.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & n && "string" != typeof t)
      )
        for (var o in t)
          a.d(
            e,
            o,
            function (n) {
              return t[n];
            }.bind(null, o)
          );
      return e;
    }),
    (a.n = function (t) {
      var n =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return a.d(n, "a", n), n;
    }),
    (a.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (a.p = "");
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    s = c.push.bind(c);
  (c.push = n), (c = c.slice());
  for (var u = 0; u < c.length; u++) n(c[u]);
  var l = s;
  r.push([176, 0]), e();
})({
  176: function (t, n, e) {
    "use strict";
    e.r(n),
      function (t) {
        var n;
        e(221);
        (n = (function () {
          function n(t) {
            (this.componentArray = []),
              (this.container = t),
              this.cacheElements(),
              this.generateArray();
          }
          return (
            (n.prototype.cacheElements = function () {
              var t = this.container;
              (this.authoredComponents =
                null == t
                  ? void 0
                  : t.querySelector(".m-pagination-static__components")),
                (this.previousIcon =
                  '<em class="abt-icon abt-icon-left-arrow"></em>'),
                (this.nextIcon =
                  '<em class="abt-icon abt-icon-right-arrow"></em>'),
                (this.paginationContent =
                  null == t
                    ? void 0
                    : t.querySelector(".m-pagination-static__content")),
                (this.paginationLinks =
                  null == t
                    ? void 0
                    : t.querySelector(".m-pagination-static__links")),
                (this.autoHideNext =
                  "true" ===
                  (null == t
                    ? void 0
                    : t.getAttribute("auto-hide-next").toLowerCase())),
                (this.autoHidePrevious =
                  "true" ===
                  (null == t
                    ? void 0
                    : t.getAttribute("auto-hide-previous").toLowerCase())),
                (this.pageSize = +(null == t
                  ? void 0
                  : t.getAttribute("page-size")));
            }),
            (n.prototype.generateArray = function () {
              var n,
                e,
                o,
                i = this,
                r =
                  null === (n = this.authoredComponents) || void 0 === n
                    ? void 0
                    : n.querySelectorAll(".contentfragmentlist");
              r && r.length
                ? ((e = t(r)
                    .find(".cmp-contentfragmentlist")
                    .children()
                    .clone(!0)),
                  (o = t(r)
                    .find(".cmp-contentfragmentlist")
                    .parent()
                    .clone(!0)),
                  t(o).find(".cmp-contentfragmentlist").empty(),
                  t(o).find(".pagination").remove())
                : (e = t(this.authoredComponents).children().clone(!0)),
                Array.from(e).forEach(function (t) {
                  i.componentArray.push(t);
                }),
                this.generatePagination(o);
            }),
            (n.prototype.generatePagination = function (n) {
              var e = this;
              t(this.paginationLinks).pagination({
                dataSource: this.componentArray,
                pageSize: this.pageSize,
                autoHideNext: this.autoHideNext,
                autoHidePrevious: this.autoHidePrevious,
                callback: function (o, i) {
                  t(e.paginationContent).empty(),
                    t.each(o, function (o, i) {
                      if (n && n.length) {
                        if (
                          null ==
                          e.paginationContent.querySelector(
                            ".cmp-contentfragmentlist"
                          )
                        ) {
                          var r = t(n[0]).clone(!0);
                          t(r).appendTo(e.paginationContent);
                        }
                        t(i).appendTo(
                          e.paginationContent.querySelector(
                            ".cmp-contentfragmentlist"
                          )
                        );
                      } else t(i).appendTo(e.paginationContent);
                    }),
                    e.updateIcons(),
                    e.focusOnClick();
                },
              }),
                "false" === t("#wcmMode").val() &&
                  (this.authoredComponents.style.display = "none");
            }),
            (n.prototype.updateIcons = function () {
              (this.paginationLinks.querySelector(
                ".paginationjs-prev a"
              ).innerHTML = this.previousIcon),
                (this.paginationLinks.querySelector(
                  ".paginationjs-next a"
                ).innerHTML = this.nextIcon);
            }),
            (n.prototype.focusOnClick = function () {
              var n = this;
              this.paginationLinks.querySelectorAll("li").forEach(function (e) {
                !e.classList.contains("disabled") &&
                  !e.classList.contains("active") &&
                  e.addEventListener(
                    "click",
                    function () {
                      t("html,body").animate(
                        { scrollTop: this.container.offsetTop },
                        400
                      );
                    }.bind(n)
                  );
              });
            }),
            n
          );
        })()),
          t(function () {
            document
              .querySelectorAll('[data-js-component="pagination-static"]')
              .forEach(function (t) {
                new n(t);
              });
          });
      }.call(this, e(6));
  },
});
