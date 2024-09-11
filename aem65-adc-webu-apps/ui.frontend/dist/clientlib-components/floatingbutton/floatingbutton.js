!(function (t) {
  var o = {};
  function e(n) {
    if (o[n]) return o[n].exports;
    var i = (o[n] = { i: n, l: !1, exports: {} });
    return t[n].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  (e.m = t),
    (e.c = o),
    (e.d = function (t, o, n) {
      e.o(t, o) || Object.defineProperty(t, o, { enumerable: !0, get: n });
    }),
    (e.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (e.t = function (t, o) {
      if ((1 & o && (t = e(t)), 8 & o)) return t;
      if (4 & o && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (e.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & o && "string" != typeof t)
      )
        for (var i in t)
          e.d(
            n,
            i,
            function (o) {
              return t[o];
            }.bind(null, i)
          );
      return n;
    }),
    (e.n = function (t) {
      var o =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(o, "a", o), o;
    }),
    (e.o = function (t, o) {
      return Object.prototype.hasOwnProperty.call(t, o);
    }),
    (e.p = ""),
    e((e.s = 132));
})({
  132: function (t, o) {
    var e, n;
    (n = (function () {
      function t(t) {
        (this.smoothScrollTo = function (t, o, e) {
          var n = window.scrollX || window.pageXOffset,
            i = window.scrollY || window.pageYOffset,
            l = t - n,
            a = o - i,
            u = new Date().getTime(),
            r = function (t, o, e, n) {
              return (t /= n / 2) < 1
                ? (e / 2) * t * t * t * t + o
                : (-e / 2) * ((t -= 2) * t * t * t - 2) + o;
            },
            c = window.setInterval(function () {
              var t = new Date().getTime() - u,
                o = r(t, n, l, e),
                d = r(t, i, a, e);
              t >= e && window.clearInterval(c), window.scrollTo(o, d);
            }, 1e3 / 60);
        }),
          (this.elem = t),
          (this.videoLLPlayer = this.elem.querySelector(
            ".limeLight-video.a-video__player-source"
          )),
          this.init(this, t),
          this.bindLimeLightVideo(),
          this.videoLoop(),
          this.videoLLloop();
      }
      return (
        (t.prototype.init = function (t, o) {
          var e, n, i, l, a;
          null === (e = document.querySelector(".generic-modal--close")) ||
            void 0 === e ||
            e.addEventListener("click", function () {
              t.stopVideos();
            }),
            document.addEventListener("click", function (o) {
              var e, n;
              ((null === (e = o.target) || void 0 === e
                ? void 0
                : e.classList.contains("generic-modal--image")) ||
                (null === (n = o.target) || void 0 === n
                  ? void 0
                  : n.classList.contains("abt-icon-cancel"))) &&
                t.stopVideos();
            }),
            null === (n = o.querySelector(".cmp-button__link")) ||
              void 0 === n ||
              n.addEventListener("click", function (t) {
                var e, n, i;
                t.target.closest("a").getAttribute("target") ||
                  null ===
                    (n =
                      null ===
                        (e = o.querySelector(
                          ".a-floatingactionbutton__floating-button"
                        )) || void 0 === e
                        ? void 0
                        : e.closest(".a-floatingactionbutton ")) ||
                  void 0 === n ||
                  n.classList.remove("a-floatingactionbutton--sticky-button");
                var l = t.target;
                (l = t.target.classList.contains("button-alignment")
                  ? null === (i = t.target) || void 0 === i
                    ? void 0
                    : i.closest("button")
                  : t.target),
                  setTimeout(function () {
                    a = l;
                  }, 300);
              }),
            null ===
              (l =
                null ===
                  (i = o.querySelector(
                    ".a-floatingactionbutton__floating-button"
                  )) || void 0 === i
                  ? void 0
                  : i.closest(".a-floatingactionbutton ")) ||
              void 0 === l ||
              l.classList.add("a-floatingactionbutton--sticky-button");
          var u = document.querySelector(
            ".abt-icon .right-aligned .floating-btn-text"
          );
          null == u || u.classList.add("icon-text-align"),
            setTimeout(function () {
              var e, n;
              if (
                document.querySelector(".a-floatingactionbutton--sticky-button")
              ) {
                var i = document
                  .querySelector(".footer")
                  .getBoundingClientRect();
                if (i.top < window.innerHeight && i.bottom >= 0) {
                  var l = window.innerHeight - i.top;
                  null ===
                    (e = document.querySelector(
                      ".a-floatingactionbutton--sticky-button"
                    )) ||
                    void 0 === e ||
                    e.setAttribute("style", "bottom:" + l + "px");
                } else
                  null ===
                    (n = document.querySelector(
                      ".a-floatingactionbutton--sticky-button"
                    )) ||
                    void 0 === n ||
                    n.setAttribute("style", "bottom:0px");
              }
              document
                .querySelectorAll(
                  '.a-floatingactionbutton__floating-button a[href^="#"]'
                )
                .forEach(function (o) {
                  o.addEventListener("click", function (o) {
                    var e = this;
                    o.preventDefault(),
                      setTimeout(function () {
                        var o,
                          n,
                          i,
                          l,
                          a,
                          u = e.getAttribute("href"),
                          r = t.findPosY(document.querySelector(u)),
                          c = 0;
                        document.querySelector(".o-header__sticky-section") &&
                          "fixed" ==
                            getComputedStyle(
                              document.querySelector(
                                ".o-header__sticky-section"
                              )
                            ).position &&
                          (c =
                            null ===
                              (o = document.querySelector(
                                ".o-header__sticky-section"
                              )) || void 0 === o
                              ? void 0
                              : o.clientHeight),
                          document.querySelector(
                            ".o-header-v2-global__sticky-section"
                          ) &&
                            "fixed" ==
                              getComputedStyle(
                                document.querySelector(
                                  ".o-header-v2-global__sticky-section"
                                )
                              ).position &&
                            (c =
                              null ===
                                (n = document.querySelector(
                                  ".o-header-v2-global__sticky-section"
                                )) || void 0 === n
                                ? void 0
                                : n.clientHeight),
                          document.querySelector(".o-header__sticky-section") &&
                            "fixed" !=
                              getComputedStyle(
                                document.querySelector(
                                  ".o-header__sticky-section"
                                )
                              ).position &&
                            (c =
                              (null ===
                                (l =
                                  null ===
                                    (i = document.querySelector(
                                      ".o-header__sticky-section"
                                    )) || void 0 === i
                                    ? void 0
                                    : i.closest(".o-header-v2-global")) ||
                              void 0 === l
                                ? void 0
                                : l.clientHeight) + 40),
                          document.querySelector(
                            ".o-header-v2-global__sticky-section"
                          ) &&
                            "fixed" !=
                              getComputedStyle(
                                document.querySelector(
                                  ".o-header-v2-global__sticky-section"
                                )
                              ).position &&
                            (c =
                              (null ===
                                (a = document.querySelector(
                                  ".o-header-v2-global__sticky-section"
                                )) || void 0 === a
                                ? void 0
                                : a.closest(".o-header-v2-global")
                              ).clientHeight + 40),
                          t.smoothScrollTo(0, r - (c || 0) - 40, 750);
                      }, 50);
                  });
                }),
                document.addEventListener("scroll", function () {
                  var t, e, n, i, l, u, r, c, d, s, f, g;
                  if (
                    (null ===
                      (e =
                        null ===
                          (t = o.querySelector(
                            ".a-floatingactionbutton__floating-button"
                          )) || void 0 === t
                          ? void 0
                          : t.closest(".a-floatingactionbutton ")) ||
                      void 0 === e ||
                      e.classList.add("a-floatingactionbutton--sticky-button"),
                    document.querySelector(
                      ".a-floatingactionbutton__floating-button .btn-full-width"
                    ) &&
                      (null ===
                        (n = document
                          .querySelector(
                            ".a-floatingactionbutton__floating-button .btn-full-width"
                          )
                          .closest(".a-floatingactionbutton ")) ||
                        void 0 === n ||
                        n.classList.add(
                          "a-floatingactionbutton--sticky-button"
                        ),
                      (document.querySelector(
                        ".a-floatingactionbutton__floating-button .btn-full-width"
                      ).style.display = "inline-block")),
                    document.querySelector(
                      ".a-floatingactionbutton__floating-button .right-aligned button"
                    ) &&
                      (null ===
                        (l =
                          null ===
                            (i = document.querySelector(
                              ".a-floatingactionbutton__floating-button .right-aligned button"
                            )) || void 0 === i
                            ? void 0
                            : i.closest(".a-floatingactionbutton ")) ||
                        void 0 === l ||
                        l.classList.add(
                          "a-floatingactionbutton--sticky-button"
                        ),
                      (document.querySelector(
                        ".a-floatingactionbutton__floating-button .right-aligned button"
                      ).style.display = "flex")),
                    null != a &&
                      (a.classList.contains("btn-full-width") ||
                        (a.style.display = "flex")),
                    document.querySelector(
                      ".a-floatingactionbutton--sticky-button"
                    ))
                  ) {
                    var v =
                      null ===
                        (r =
                          null ===
                            (u = document.querySelector(
                              ".a-floatingactionbutton__floating-button .btn-full-width"
                            )) || void 0 === u
                            ? void 0
                            : u.closest("a")) || void 0 === r
                        ? void 0
                        : r.getAttribute("href");
                    v &&
                      (document.querySelector(v).getBoundingClientRect().top <
                      window.innerHeight
                        ? ((null ===
                            (c = document.querySelector(
                              ".a-floatingactionbutton__floating-button .btn-full-width"
                            )) || void 0 === c
                            ? void 0
                            : c.closest(
                                ".a-floatingactionbutton--sticky-button"
                              )
                          ).style.display = "none")
                        : null ===
                            (s =
                              null ===
                                (d = document.querySelector(
                                  ".a-floatingactionbutton__floating-button .btn-full-width"
                                )) || void 0 === d
                                ? void 0
                                : d.closest(
                                    ".a-floatingactionbutton--sticky-button"
                                  )) ||
                          void 0 === s ||
                          s.setAttribute(
                            "style",
                            "position: fixed;bottom:0px;width:100%;"
                          ));
                    var b =
                      null ===
                        (g =
                          null ===
                            (f = document.querySelector(
                              ".a-floatingactionbutton__floating-button .right-aligned button"
                            )) || void 0 === f
                            ? void 0
                            : f.closest("a")) || void 0 === g
                        ? void 0
                        : g.getAttribute("href");
                    if (b) {
                      var y = document.querySelector(b).getBoundingClientRect();
                      y.top < window.innerHeight &&
                        y.bottom >= 0 &&
                        (document.querySelector(
                          ".a-floatingactionbutton__floating-button .right-aligned button"
                        ).style.display = "none");
                    }
                  }
                });
            }, 500);
        }),
        (t.prototype.bindLimeLightVideo = function () {
          var t;
          if (this.videoLLPlayer) {
            var o = this.videoLLPlayer,
              e =
                null === (t = null == o ? void 0 : o.parentElement) ||
                void 0 === t
                  ? void 0
                  : t.parentElement,
              n = "limelight_player_" + o.getAttribute("data-player-ID"),
              i = o.getAttribute("data-media-ID"),
              l = null == e ? void 0 : e.getAttribute("data-autoplay"),
              a = null == e ? void 0 : e.getAttribute("data-muted"),
              u = null == e ? void 0 : e.offsetWidth,
              r = u || 0;
            LimelightPlayerUtil.embed({
              playerId: n,
              mediaId: i,
              playerForm: "Player",
              width: u,
              height: r,
              autoplay: l,
              muted: a,
            });
          }
        }),
        (t.prototype.videoLLloop = function () {
          var t,
            o = this.videoLLPlayer;
          if (
            null == o ? void 0 : o.classList.contains("limeLight-video-wrapper")
          ) {
            var e =
                null === (t = o.parentElement) || void 0 === t
                  ? void 0
                  : t.parentElement,
              n = null == e ? void 0 : e.getAttribute("data-controls");
            "true" == (null == e ? void 0 : e.getAttribute("data-loop")) &&
              this.videoLoop(),
              "true" == n &&
                (o.find(".vjs-control-bar").style.display = "none");
          }
        }),
        (t.prototype.videoLoop = function () {
          var o;
          (
            null === (o = document.querySelector(".video-js")) || void 0 === o
              ? void 0
              : o.classList.contains("vjs-ended")
          )
            ? document
                .querySelectorAll('[data-js-component="floatingbutton"]')
                .forEach(function (o) {
                  new t(o);
                })
            : setTimeout(this.videoLoop, 500);
        }),
        (t.prototype.stopVideos = function () {
          document
            .querySelectorAll(
              ".modal-float-button iframe,.modal-float-button video"
            )
            .forEach(function (t) {
              if ("video" === t.tagName.toLowerCase())
                setTimeout(function () {
                  t.pause(), (t.currentTime = 0);
                }, 1e3);
              else if ("iframe" === t.tagName.toLowerCase()) {
                var o = t.src;
                setTimeout(function () {
                  (t.src = ""), (t.src = o);
                }, 1e3);
              } else {
                var e = t.src;
                t.src = e;
              }
            });
        }),
        (t.prototype.findPosY = function (t) {
          var o = 0;
          if (t.offsetParent)
            for (; t.offsetParent; ) (o += t.offsetTop), (t = t.offsetParent);
          else t.y && (o += t.y);
          return o;
        }),
        t
      );
    })()),
      null == (e = document.querySelectorAll(".m-floating-popup")) ||
        e.forEach(function (t) {
          var o = t.getAttribute("data-target"),
            e = setInterval(function () {
              var t;
              null === (t = document.querySelector(o)) ||
                void 0 === t ||
                t.classList.add("modal-float-button"),
                clearInterval(e);
            }, 500);
        }),
      document
        .querySelectorAll('[data-js-component="floatingbutton"]')
        .forEach(function (t) {
          new n(t);
        });
  },
});
