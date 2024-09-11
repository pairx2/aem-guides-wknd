!(function (e) {
  function t(t) {
    for (
      var o, c, l = t[0], u = t[1], s = t[2], a = 0, f = [];
      a < l.length;
      a++
    )
      (c = l[a]),
        Object.prototype.hasOwnProperty.call(r, c) && r[c] && f.push(r[c][0]),
        (r[c] = 0);
    for (o in u) Object.prototype.hasOwnProperty.call(u, o) && (e[o] = u[o]);
    for (d && d(t); f.length; ) f.shift()();
    return i.push.apply(i, s || []), n();
  }
  function n() {
    for (var e, t = 0; t < i.length; t++) {
      for (var n = i[t], o = !0, l = 1; l < n.length; l++) {
        var u = n[l];
        0 !== r[u] && (o = !1);
      }
      o && (i.splice(t--, 1), (e = c((c.s = n[0]))));
    }
    return e;
  }
  var o = {},
    r = { 62: 0 },
    i = [];
  function c(t) {
    if (o[t]) return o[t].exports;
    var n = (o[t] = { i: t, l: !1, exports: {} });
    return e[t].call(n.exports, n, n.exports, c), (n.l = !0), n.exports;
  }
  (c.m = e),
    (c.c = o),
    (c.d = function (e, t, n) {
      c.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (c.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (c.t = function (e, t) {
      if ((1 & t && (e = c(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (c.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          c.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (c.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return c.d(t, "a", t), t;
    }),
    (c.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (c.p = "");
  var l = (window.webpackJsonp = window.webpackJsonp || []),
    u = l.push.bind(l);
  (l.push = t), (l = l.slice());
  for (var s = 0; s < l.length; s++) t(l[s]);
  var d = u;
  i.push([181, 0]), n();
})({
  181: function (e, t, n) {
    (function (e) {
      var t;
      (t = (function () {
        function t(e) {
          (this.smoothScrollTo = function (e, t) {
            var n = window.pageYOffset,
              o = null;
            null == t && (t = 500),
              (e = +e),
              (t = +t),
              window.requestAnimationFrame(function r(i) {
                var c = i - (o = o || i);
                n < e
                  ? window.scrollTo(0, ((e - n) * c) / t + n)
                  : window.scrollTo(0, n - ((n - e) * c) / t),
                  c < t
                    ? window.requestAnimationFrame(r)
                    : window.scrollTo(0, e);
              });
          }),
            (this.elem = e),
            this.init(this, e);
        }
        return (
          (t.prototype.init = function (t, n) {
            var o,
              r,
              i = 0;
            setTimeout(function () {
              var o;
              if (n.querySelector(".stickyMenu .m-link-stack__title")) {
                var r =
                    null ===
                      (o = n.querySelector(".stickyMenu .m-link-stack__title")
                        .outerHTML) || void 0 === o
                      ? void 0
                      : o.replace("h4", "h2"),
                  c = document.createElement("div");
                (c.innerHTML = r),
                  (i =
                    n.querySelector(".stickyMenu .m-link-stack__title")
                      .clientHeight + 30),
                  document
                    .querySelectorAll(".stickyMenu .m-link-stack__title")
                    .forEach(function (e) {
                      e.remove();
                    }),
                  n
                    .querySelector(".stickyMenu")
                    .insertBefore(
                      c,
                      document.querySelector(".stickyMenu .m-link-stack")
                    ),
                  n
                    .querySelector(".stickyMenu > div > .m-link-stack__title")
                    .classList.add("container"),
                  n
                    .querySelector(".stickyMenu > div > .m-link-stack__title")
                    .classList.add("product-title"),
                  n
                    .querySelector(".stickyMenu > div > .m-link-stack__title")
                    .classList.add("d-none");
              }
              function l(e) {
                return null === (null == e ? void 0 : e.offsetParent);
              }
              n.querySelectorAll('.m-link-stack__list a[href^="#"]').forEach(
                function (o) {
                  (null == o ? void 0 : o.closest(".faq-link")) ||
                    null == o ||
                    o.addEventListener("click", function (r) {
                      var c, u;
                      r.preventDefault();
                      var s,
                        d = e(n).offset().top,
                        a = o.getAttribute("href");
                      document.querySelector(a)
                        ? document.querySelector(a).closest(".devicespecific")
                          ? document.querySelectorAll(a).forEach(function (t) {
                              l(t) || (s = e(t).offset().top);
                            })
                          : (s = e(a).offset().top)
                        : ((a = "#section_" + a.replace("#", "")),
                          document.querySelector(a).closest(".devicespecific")
                            ? document
                                .querySelectorAll(a)
                                .forEach(function (t) {
                                  l(n) || (s = e(t).offset().top);
                                })
                            : (s = e(a).offset().top));
                      var f,
                        y = 0;
                      document.documentElement.scrollTop < d &&
                        window.innerWidth < 991 &&
                        (i = 100),
                        document.documentElement.scrollTop < d &&
                          (null ===
                            (c = document.querySelector(".product-title")) ||
                          void 0 === c
                            ? void 0
                            : c.innerText.length) > 33 &&
                          window.innerWidth > 767 &&
                          window.innerWidth < 991 &&
                          (i = 140),
                        document.querySelector(".o-header__sticky-section") &&
                          (y = document.querySelector(
                            ".o-header__sticky-section"
                          ).clientHeight),
                        document.querySelector(
                          ".o-header-v2-global__sticky-section"
                        ) &&
                          (y = document.querySelector(
                            ".o-header-v2-global__sticky-section"
                          ).clientHeight),
                        (f =
                          (null === (u = n.querySelector(".stickyMenu")) ||
                          void 0 === u
                            ? void 0
                            : u.clientHeight) + y);
                      var p = s,
                        m = document.documentElement.scrollTop;
                      window.innerWidth > 767 &&
                        parseInt(m) > d &&
                        (p = parseInt(p) + 50),
                        window.innerWidth > 767 &&
                          parseInt(m) < d &&
                          (p = parseInt(p) - 70),
                        parseInt(s) > d &&
                          ((p = p - (f + (i || 0)) + 40),
                          window.innerWidth > 991 && (p -= 70)),
                        parseInt(s) <= d && (p = p - f + 40),
                        window.innerWidth < 767 &&
                          parseInt(m) > d &&
                          (p = parseInt(p) + 192),
                        window.innerWidth < 767 &&
                          parseInt(m) < d &&
                          (p = parseInt(p) - 70),
                        parseInt(m) < d &&
                          0 == document.documentElement.scrollTop &&
                          parseInt(s) > d &&
                          window.innerWidth > 767 &&
                          (p -= f - 40),
                        0 == document.documentElement.scrollTop &&
                          parseInt(s) > d &&
                          window.innerWidth <= 767 &&
                          (p -= f - 20),
                        t.smoothScrollTo(p, 1e3),
                        o.classList.contains("clickedLink") ||
                          o.classList.add("clickedLink");
                    });
                }
              );
            }, 500),
              (null ===
                (o = n.querySelector(
                  ".stickyMenu .m-link-stack__dropdown-wrapper"
                )) || void 0 === o
                ? void 0
                : o.classList.contains("d-none")) &&
                window.innerWidth > 767 &&
                (null ===
                  (r = n.querySelector(
                    ".stickyMenu .m-link-stack__dropdown-wrapper"
                  )) ||
                  void 0 === r ||
                  r.classList.remove("d-none")),
              window.addEventListener("scroll", function () {
                var e,
                  t,
                  o,
                  r,
                  i,
                  c,
                  l,
                  u,
                  s =
                    n.querySelector(
                      ".stickyMenu .m-link-stack__dropdown-wrapper"
                    ).clientHeight + 20,
                  d =
                    (null === (e = n) || void 0 === e ? void 0 : e.offsetTop) -
                    s;
                (window.pageYOffset || document.documentElement.scrollTop) > d
                  ? (null === (t = n.querySelector(".stickyMenu")) ||
                      void 0 === t ||
                      t.classList.add("sticky"),
                    null ===
                      (o = n.querySelector(".stickyMenu .product-title")) ||
                      void 0 === o ||
                      o.classList.remove("d-none"))
                  : (null === (r = n.querySelector(".stickyMenu")) ||
                      void 0 === r ||
                      r.classList.remove("sticky"),
                    null ===
                      (i = n.querySelector(".stickyMenu .product-title")) ||
                      void 0 === i ||
                      i.classList.add("d-none"));
                var a = 0;
                document.querySelector(".o-header__sticky-section") &&
                  "fixed" ==
                    getComputedStyle(
                      document.querySelector(".o-header__sticky-section")
                    ).position &&
                  ((a = document.querySelector(".o-header__sticky-section")
                    .clientHeight),
                  (a -= 1)),
                  document.querySelector(
                    ".o-header-v2-global__sticky-section"
                  ) &&
                    "fixed" ==
                      getComputedStyle(
                        document.querySelector(
                          ".o-header-v2-global__sticky-section"
                        )
                      ).position &&
                    "fixed" ==
                      getComputedStyle(
                        document.querySelector(
                          ".o-header-v2-global__section--utility-top"
                        )
                      ).position &&
                    ((a =
                      (null ===
                        (c = document.querySelector(
                          ".o-header-v2-global__sticky-section"
                        )) || void 0 === c
                        ? void 0
                        : c.clientHeight) +
                      (null ===
                        (l = document.querySelector(
                          ".o-header-v2-global__section--utility-top"
                        )) || void 0 === l
                        ? void 0
                        : l.clientHeight)),
                    (a -= 1)),
                  null === (u = n.querySelector(".stickyMenu")) ||
                    void 0 === u ||
                    u.setAttribute("style", "top:" + a + "px");
              });
          }),
          (t.prototype.findPosY = function (e) {
            var t = 0;
            if (e.offsetParent)
              for (; e.offsetParent; ) (t += e.offsetTop), (e = e.offsetParent);
            else e.y && (t += e.y);
            return t;
          }),
          t
        );
      })()),
        document.querySelectorAll(".stickymenu").forEach(function (e) {
          var n;
          null !== (null == (n = e) ? void 0 : n.offsetParent) && new t(e);
        });
    }.call(this, n(6)));
  },
});
