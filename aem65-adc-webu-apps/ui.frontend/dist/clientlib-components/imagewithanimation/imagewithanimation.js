!(function (t) {
  function e(e) {
    for (
      var i, s, a = e[0], l = e[1], u = e[2], p = 0, f = [];
      p < a.length;
      p++
    )
      (s = a[p]),
        Object.prototype.hasOwnProperty.call(r, s) && r[s] && f.push(r[s][0]),
        (r[s] = 0);
    for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (t[i] = l[i]);
    for (c && c(e); f.length; ) f.shift()();
    return o.push.apply(o, u || []), n();
  }
  function n() {
    for (var t, e = 0; e < o.length; e++) {
      for (var n = o[e], i = !0, a = 1; a < n.length; a++) {
        var l = n[a];
        0 !== r[l] && (i = !1);
      }
      i && (o.splice(e--, 1), (t = s((s.s = n[0]))));
    }
    return t;
  }
  var i = {},
    r = { 36: 0 },
    o = [];
  function s(e) {
    if (i[e]) return i[e].exports;
    var n = (i[e] = { i: e, l: !1, exports: {} });
    return t[e].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.m = t),
    (s.c = i),
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
        for (var i in t)
          s.d(
            n,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
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
    l = a.push.bind(a);
  (a.push = e), (a = a.slice());
  for (var u = 0; u < a.length; u++) e(a[u]);
  var c = l;
  o.push([172, 0]), n();
})({
  172: function (t, e, n) {
    (function (t) {
      var e = (function () {
        function t(t) {
          (this.elem = t),
            this.elem.classList.add("js-iwa-initialized"),
            this.init();
        }
        return (
          (t.prototype.toggleClassHelper = function () {
            var t = this.btn.querySelector(".js-iwa-button-icon");
            "pause" === this.state
              ? ((this.state = "play"),
                (this.animatedLayer.style.display = "block"),
                (this.stillLayer.style.display = "none"))
              : ((this.state = "pause"),
                (this.animatedLayer.style.display = "none"),
                (this.stillLayer.style.display = "block")),
              t.classList.toggle("abt-icon-play2"),
              t.classList.toggle("abt-icon-pause");
          }),
          (t.prototype.bindClickEvents = function () {
            var t = this;
            this.btn.addEventListener("click", function (e) {
              e.preventDefault(), t.toggleClassHelper();
            });
          }),
          (t.prototype.init = function () {
            (this.btn = this.elem.querySelector(".js-iwa-button")),
              (this.state = this.btn.dataset.state),
              (this.animatedLayer = this.elem.querySelector(
                ".js-iwa-animated-layer"
              )),
              (this.stillLayer = this.elem.querySelector(
                ".js-iwa-still-layer"
              )),
              this.btn && this.bindClickEvents();
          }),
          t
        );
      })();
      t(function () {
        document.querySelectorAll(".js-iwa-component").forEach(function (n) {
          t(n).hasClass("js-iwa-initialized") || new e(n);
        });
      });
    }.call(this, n(6)));
  },
});