!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var l = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(l.exports, l, l.exports, r), (l.l = !0), l.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var l in e)
          r.d(
            n,
            l,
            function (t) {
              return e[t];
            }.bind(null, l)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 163));
})({
  163: function (e, t) {
    var r;
    (r = (function () {
      function e(e) {
        (this.elem = e), this.init(this, e);
      }
      return (
        (e.prototype.init = function (e, t) {
          setTimeout(function () {
            var e,
              r,
              n,
              l,
              o,
              i = t.querySelectorAll(".slick-dots li");
            i.forEach(function (e, t) {
              e.setAttribute("tabindex", "0");
            }),
              i.forEach(function (e, t) {
                e.addEventListener(
                  "keypress",
                  function (t) {
                    13 === t.keyCode && e.click();
                  },
                  !1
                );
              }),
              t
                .querySelectorAll(
                  ".product-thumbnail-wrapper .product-thumbnail"
                )
                .forEach(function (e, t) {
                  var r,
                    n =
                      null === (r = e.querySelector("img")) || void 0 === r
                        ? void 0
                        : r.src;
                  e.classList.contains("wistiaVideo") &&
                    i[t].classList.add("wistia-video__has-image"),
                    (i[t].style.backgroundImage = "url(" + n + ")");
                }),
              (t.querySelector(".assetsgallery-left-thumb") ||
                t.querySelector(".assetsgallery-right-thumb")) &&
                (window.innerWidth > 1024 &&
                  (t.querySelector(".slick-dots").style.height =
                    t.querySelector(".slick-slide").clientHeight + "px"),
                window.innerWidth <= 1024 &&
                  ((null == t
                    ? void 0
                    : t
                        .querySelector(".carousel-inner")
                        .classList.contains("assetsgallery-left-thumb")) &&
                    (null ===
                      (r =
                        null ===
                          (e =
                            null == t
                              ? void 0
                              : t.querySelector(".carousel-inner")) ||
                        void 0 === e
                          ? void 0
                          : e.classList) ||
                      void 0 === r ||
                      r.remove("assetsgallery-left-thumb")),
                  (null == t
                    ? void 0
                    : t
                        .querySelector(".carousel-inner")
                        .classList.contains("assetsgallery-right-thumb")) &&
                    (null ===
                      (l =
                        null ===
                          (n =
                            null == t
                              ? void 0
                              : t.querySelector(".carousel-inner")) ||
                        void 0 === n
                          ? void 0
                          : n.classList) ||
                      void 0 === l ||
                      l.remove("assetsgallery-right-thumb")),
                  null ===
                    (o =
                      null == t
                        ? void 0
                        : t.querySelector(".carousel-inner")) ||
                    void 0 === o ||
                    o.classList.add("assetsgallery-bottom-thumb")));
          }, 500);
        }),
        e
      );
    })()),
      document.querySelectorAll(".assetsgallery").forEach(function (e) {
        new r(e);
      });
  },
});
