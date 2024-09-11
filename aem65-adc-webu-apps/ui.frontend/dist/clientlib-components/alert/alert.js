!(function (e) {
  function t(t) {
    for (
      var r, s, a = t[0], l = t[1], h = t[2], c = 0, p = [];
      c < a.length;
      c++
    )
      (s = a[c]),
        Object.prototype.hasOwnProperty.call(n, s) && n[s] && p.push(n[s][0]),
        (n[s] = 0);
    for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (e[r] = l[r]);
    for (u && u(t); p.length; ) p.shift()();
    return o.push.apply(o, h || []), i();
  }
  function i() {
    for (var e, t = 0; t < o.length; t++) {
      for (var i = o[t], r = !0, a = 1; a < i.length; a++) {
        var l = i[a];
        0 !== n[l] && (r = !1);
      }
      r && (o.splice(t--, 1), (e = s((s.s = i[0]))));
    }
    return e;
  }
  var r = {},
    n = { 5: 0 },
    o = [];
  function s(t) {
    if (r[t]) return r[t].exports;
    var i = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, s), (i.l = !0), i.exports;
  }
  (s.m = e),
    (s.c = r),
    (s.d = function (e, t, i) {
      s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (s.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (s.t = function (e, t) {
      if ((1 & t && (e = s(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (s.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          s.d(
            i,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (s.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return s.d(t, "a", t), t;
    }),
    (s.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (s.p = "");
  var a = (window.webpackJsonp = window.webpackJsonp || []),
    l = a.push.bind(a);
  (a.push = t), (a = a.slice());
  for (var h = 0; h < a.length; h++) t(a[h]);
  var u = l;
  o.push([161, 0]), i();
})({
  161: function (e, t, i) {
    (function (e) {
      !(function () {
        "use strict";
        var t = (function () {
          function t(t) {
            if (!t) throw new Error("Alert element is required");
            (this.elem = t),
              (this.closeIcon = this.elem.querySelector(
                ".m-alert__close-icon"
              )),
              (this.wrapperElem = this.elem.closest(".m-alert--wrapper")),
              (this.alertType = this.elem.getAttribute("data-alert-type")),
              (this.alertExpiryTime = this.elem.getAttribute("data-expiry-time")
                ? 1e3 * Number(this.elem.getAttribute("data-expiry-time"))
                : 0),
              (this.alertExpiryDate = isNaN(
                Date.parse(this.elem.getAttribute("data-expiry-date"))
              )
                ? 0
                : new Date(
                    this.elem.getAttribute("data-expiry-date")
                  ).getTime()),
              (this.isNotExperienceFragment =
                window.location.pathname.indexOf("experience-fragments") < 0),
              (this.TIME_BOUND = "time-bound"),
              (this.NON_TIME_BOUND = "non-time-bound"),
              (this.COOKIE_KEY = "alert-close-success"),
              (this.headerElem = e(".o-header")),
              this.bindEvents(),
              this.init();
          }
          return (
            (t.prototype.hideAlert = function () {
              var e;
              this.elem.classList.remove("m-alert--show"),
                this.elem.classList.add("m-alert--hide"),
                null === (e = this.wrapperElem) ||
                  void 0 === e ||
                  e.classList.add("m-alert--hide");
            }),
            (t.prototype.showAlert = function () {
              this.elem.classList.add("m-alert--show");
            }),
            (t.prototype.checkTimeBoundAlert = function () {
              this.alertExpiryDate &&
                (new Date().getTime() >= this.alertExpiryDate
                  ? this.hideAlert()
                  : this.showAlert());
              this.alertExpiryTime &&
                setTimeout(
                  function () {
                    this.hideAlert();
                  }.bind(this),
                  this.alertExpiryTime
                );
            }),
            (t.prototype.adjustHeaderPosition = function () {
              this.headerElem.css("top", 0),
                this.headerElem.css("transition", "all 0.3s ease-in-out");
            }),
            (t.prototype.getCookie = function (e) {
              for (
                var t = e + "=", i = document.cookie.split(";"), r = 0;
                r < i.length;
                r++
              ) {
                for (var n = i[r]; " " == n.charAt(0); ) n = n.substring(1);
                if (-1 != n.indexOf(t)) return n.substring(t.length, n.length);
              }
              return "";
            }),
            (t.prototype.bindEvents = function () {
              var e;
              null === (e = this.closeIcon) ||
                void 0 === e ||
                e.addEventListener(
                  "click",
                  function () {
                    this.isNotExperienceFragment &&
                      (document.cookie = this.COOKIE_KEY + "=true; path=/"),
                      this.hideAlert(),
                      this.adjustHeaderPosition();
                  }.bind(this)
                );
            }),
            (t.prototype.init = function () {
              this.alertType === this.TIME_BOUND &&
              (this.alertExpiryTime || this.alertExpiryDate) &&
              this.isNotExperienceFragment
                ? this.checkTimeBoundAlert()
                : ((this.alertType = this.NON_TIME_BOUND), this.showAlert()),
                this.getCookie(this.COOKIE_KEY) &&
                  this.isNotExperienceFragment &&
                  (this.hideAlert(), this.headerElem.css("top", 0));
            }),
            t
          );
        })();
        e(function () {
          document
            .querySelectorAll('[data-js-component="alert"]')
            .forEach(function (e) {
              new t(e);
            });
        });
      })();
    }.call(this, i(6)));
  },
});
