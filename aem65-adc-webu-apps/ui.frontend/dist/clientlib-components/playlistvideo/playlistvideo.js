!(function (t) {
  var e = {};
  function i(l) {
    if (e[l]) return e[l].exports;
    var s = (e[l] = { i: l, l: !1, exports: {} });
    return t[l].call(s.exports, s, s.exports, i), (s.l = !0), s.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, l) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: l });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var l = Object.create(null);
      if (
        (i.r(l),
        Object.defineProperty(l, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var s in t)
          i.d(
            l,
            s,
            function (e) {
              return t[e];
            }.bind(null, s)
          );
      return l;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 177));
})({
  177: function (t, e) {
    var i, l;
    (i = (function () {
      function t(t) {
        (this.elem = t), this.init();
      }
      return (
        (t.prototype.init = function () {
          var t = this.elem;
          t.querySelectorAll(".wistia-playlist__video-item").forEach(function (
            e
          ) {
            e.addEventListener("click", function (e) {
              e.preventDefault(),
                t
                  .querySelectorAll(".wistia-playlist__video-item")
                  .forEach(function (t) {
                    t.classList.remove("active");
                  }),
                this.classList.add("active"),
                (this.closest(".wistia-playlist").querySelector(
                  ".wistia-playlist__main-title"
                ).innerHTML = this.querySelector(
                  ".wistia-playlist__video-title"
                ).innerHTML),
                (this.closest(".wistia-playlist")
                  .querySelector(".wistia-playlist__main-description")
                  .querySelector("p").innerHTML = this.querySelector(
                  "p"
                ).innerHTML),
                this.closest(".wistia-playlist").querySelector(
                  ".wistia-playlist__main-button"
                ) &&
                  (this.closest(".wistia-playlist")
                    .querySelector(".wistia-playlist__main-button")
                    .querySelector("a")
                    .setAttribute(
                      "href",
                      this.querySelector(
                        ".wistia-playlist__button-data"
                      ).getAttribute("data-button-link")
                    ),
                  (this.closest(".wistia-playlist")
                    .querySelector(".wistia-playlist__main-button")
                    .querySelector("a").innerHTML = this.querySelector(
                    ".wistia-playlist__button-data"
                  ).getAttribute("data-button-text"))),
                this.closest(".wistia-playlist")
                  .querySelector("iframe")
                  .setAttribute("src", this.getAttribute("data-video-url"));
            });
          });
        }),
        t
      );
    })()),
      (l = (function () {
        function t(t) {
          (this.elem = t), this.init();
        }
        return (
          (t.prototype.init = function () {
            var t,
              e,
              i = this.elem,
              l =
                null ===
                  (t =
                    null == i
                      ? void 0
                      : i.querySelector(
                          ".wistia-playlist__main-video-image img"
                        )) || void 0 === t
                  ? void 0
                  : t.clientHeight;
            l &&
              (null === (e = i.querySelector(".wistia-playlist__list-items")) ||
                void 0 === e ||
                e.setAttribute("style", "height:" + l + "px")),
              i
                .querySelectorAll(".wistia-playlist__video-item")
                .forEach(function (t) {
                  t.addEventListener("click", function (t) {
                    var e;
                    t.preventDefault(),
                      i
                        .querySelectorAll(".wistia-playlist__video-item")
                        .forEach(function (t) {
                          t.classList.remove("active");
                        }),
                      this.classList.add("active"),
                      (this.closest(".wistia-playlist").querySelector(
                        ".wistia-playlist__main-title"
                      ).innerHTML = this.querySelector(
                        ".wistia-playlist__video-title"
                      ).innerHTML),
                      (this.closest(".wistia-playlist")
                        .querySelector(".wistia-playlist__main-description")
                        .querySelector("p").innerHTML = this.querySelector(
                        "p"
                      ).innerHTML),
                      this.closest(".wistia-playlist").querySelector(
                        ".wistia-playlist__main-button"
                      ) &&
                        (this.closest(".wistia-playlist")
                          .querySelector(".wistia-playlist__main-button")
                          .querySelector("a")
                          .setAttribute(
                            "href",
                            this.querySelector(
                              ".wistia-playlist__button-data"
                            ).getAttribute("data-button-link")
                          ),
                        (this.closest(".wistia-playlist")
                          .querySelector(".wistia-playlist__main-button")
                          .querySelector("a")
                          .querySelector("span").innerHTML = this.querySelector(
                          ".wistia-playlist__button-data"
                        ).getAttribute("data-button-text"))),
                      null === (e = this.closest(".wistia-playlist")) ||
                        void 0 === e ||
                        e
                          .querySelector(".wistia-playlist__main-video-image")
                          .classList.add("hide");
                  });
                }),
              i
                .querySelectorAll(".wistia-playlist__main-video-image")
                .forEach(function (t) {
                  t.addEventListener("click", function (t) {
                    null == this || this.classList.add("hide");
                  });
                });
          }),
          t
        );
      })()),
      document
        .querySelectorAll('[data-js-component="html5Videos"]')
        .forEach(function (t) {
          new i(t);
        }),
      document
        .querySelectorAll('[data-js-component="wistiaVideos"]')
        .forEach(function (t) {
          new l(t);
        });
  },
});
