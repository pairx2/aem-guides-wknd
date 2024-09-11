!(function (e) {
  var t = {};
  function o(i) {
    if (t[i]) return t[i].exports;
    var l = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(l.exports, l, l.exports, o), (l.l = !0), l.exports;
  }
  (o.m = e),
    (o.c = t),
    (o.d = function (e, t, i) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (o.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function (e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (o.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var l in e)
          o.d(
            i,
            l,
            function (t) {
              return e[t];
            }.bind(null, l)
          );
      return i;
    }),
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 183));
})({
  183: function (module, exports) {
    !(function () {
      var VideoComp = (function () {
          function VideoComp(e) {
            if (!e) throw new Error("Video element is required");
            (this._this = this),
              (this.elem = e),
              (this.PLAY = "play"),
              (this.PAUSE = "pause"),
              (this.videoHTML5Player = this.elem.querySelector(
                "video.a-video__player-source"
              )),
              (this.videoIFramePalyer = this.elem.querySelector(
                "iframe.a-video__player-source"
              )),
              (this.videoPlayElem = this.elem.querySelector(
                ".a-video__play-btn"
              )),
              (this.videoLLPlayer = this.elem.querySelector(
                ".limeLight-video.a-video__player-source"
              )),
              this.init(this, e),
              this.bindEvents(this);
            var t = this;
            setTimeout(function () {
              var e, o, i;
              null ===
                (e = document.querySelectorAll(
                  ".limeLight-video.a-video__player-source"
                )) ||
                void 0 === e ||
                e.forEach(function (e) {
                  t.bindLimeLightVideo(e), t.videoLLloop(e);
                }),
                null ===
                  (o = document.querySelectorAll(".a-video__dom-video")) ||
                  void 0 === o ||
                  o.forEach(function (e) {
                    t.videoDamControls(e);
                  }),
                null ===
                  (i = document.querySelectorAll(
                    "iframe.a-video__player-source"
                  )) ||
                  void 0 === i ||
                  i.forEach(function (e) {
                    e.src.indexOf("youtube") > -1 && t.videoIFrameYTControl(e);
                  });
            }, 1100);
          }
          return (
            (VideoComp.prototype.removeURLParameter = function (e, t) {
              var o = t;
              return (
                t.split("?")[1] &&
                  (o =
                    t.split("?")[0] +
                    "?" +
                    t
                      .split("?")[1]
                      .split("&")
                      .filter(function (t) {
                        return t.indexOf(e) < 0;
                      })
                      .join("&")),
                o
              );
            }),
            (VideoComp.prototype.checkQueryStringParameterExists = function (
              e,
              t
            ) {
              return (
                t.indexOf("?" + e + "=") >= 0 || t.indexOf("&" + e + "=") >= 0
              );
            }),
            (VideoComp.prototype.playOrPauseVideo = function (e) {
              var t,
                o,
                i,
                l,
                a,
                d,
                r,
                u,
                n,
                v,
                p,
                c,
                s,
                y,
                m,
                L,
                h,
                b,
                g,
                f,
                _,
                P,
                A,
                S,
                q = this,
                D =
                  null ===
                    (o =
                      null ===
                        (t = this.elem.querySelector(
                          ".a-video__player-source"
                        )) || void 0 === t
                        ? void 0
                        : t.closest(".a-video")) || void 0 === o
                    ? void 0
                    : o.querySelector("video");
              if (null !== this.elem.querySelector(".limeLight-video")) {
                var V =
                  null ===
                    (i = this.elem.querySelector(".limeLight-video>div")) ||
                  void 0 === i
                    ? void 0
                    : i.getAttribute("id");
                D =
                  null === (l = document.querySelector("#" + V)) || void 0 === l
                    ? void 0
                    : l.querySelector("video");
              }
              var w =
                null === (a = null == D ? void 0 : D.closest(".a-video")) ||
                void 0 === a
                  ? void 0
                  : a.getAttribute("data-control");
              if (D) {
                if (("true" == w && (D.controls = !0), e === this.PAUSE))
                  D.pause(), (D.currentTime = 0);
                else if (e === this.PLAY) {
                  "embed" ==
                    (null ===
                      (r =
                        null ===
                          (d = this.elem.querySelector(
                            ".a-video__player-source"
                          )) || void 0 === d
                          ? void 0
                          : d.closest(".a-video")) || void 0 === r
                      ? void 0
                      : r.getAttribute("data-playertype")) &&
                    this.elem.querySelector(
                      ".a-video__player-source .vjs-control-bar"
                    ) &&
                    (this.elem.querySelector(
                      ".a-video__player-source .vjs-control-bar"
                    ).style.display = "none"),
                    "modal" ==
                      (null ===
                        (n =
                          null ===
                            (u = this.elem.querySelector(
                              ".a-video__player-source"
                            )) || void 0 === u
                            ? void 0
                            : u.closest(".a-video")) || void 0 === n
                        ? void 0
                        : n.getAttribute("data-playertype")) &&
                      ("true" ==
                        (null ===
                          (p =
                            null ===
                              (v = this.elem.querySelector(
                                ".a-video__player-source"
                              )) || void 0 === v
                              ? void 0
                              : v.closest(".a-video")) || void 0 === p
                          ? void 0
                          : p.getAttribute("data-muted")) && (D.muted = !0),
                      "false" ==
                        (null ===
                          (s =
                            null ===
                              (c = this.elem.querySelector(
                                ".a-video__player-source"
                              )) || void 0 === c
                              ? void 0
                              : c.closest(".a-video")) || void 0 === s
                          ? void 0
                          : s.getAttribute("data-muted")) && (D.muted = !1)),
                    (null == D.closest(".brightCove-video") &&
                      null == D.closest(".limeLight-video")) ||
                      (D.controls = !1),
                    "embed" ==
                      (null ===
                        (m =
                          null ===
                            (y = this.elem.querySelector(
                              ".a-video__player-source"
                            )) || void 0 === y
                            ? void 0
                            : y.closest(".a-video")) || void 0 === m
                        ? void 0
                        : m.getAttribute("data-playertype")) && (D.muted = !0),
                    D.play();
                  var I = document.querySelector(".vjs-limelight-big-play");
                  I && (null == I || I.click());
                }
              } else if (this.videoIFramePalyer) {
                var C = this.videoIFramePalyer.src.split("/"),
                  E = C[(C && C.length) - 1].split("?")[0];
                if (
                  (this.videoIFramePalyer.setAttribute("id", "iframe_" + E),
                  e === this.PAUSE &&
                  this.checkQueryStringParameterExists(
                    "autoplay",
                    this.videoIFramePalyer.src
                  )
                    ? (this.videoIFramePalyer.src = this.removeURLParameter(
                        "autoplay",
                        this.videoIFramePalyer.src
                      ))
                    : e !== this.PLAY ||
                      this.checkQueryStringParameterExists(
                        "autoplay",
                        this.videoIFramePalyer.src
                      ) ||
                      (this.videoIFramePalyer.src +=
                        (this.videoIFramePalyer.src.indexOf("?") > -1
                          ? "&"
                          : "?") + "autoplay=1"),
                  e === this.PLAY && window.innerWidth <= 767)
                ) {
                  var j =
                      null ===
                        (L = this.videoIFramePalyer.closest(".global-video")) ||
                      void 0 === L
                        ? void 0
                        : L.offsetWidth,
                    T =
                      null ===
                        (h = this.videoIFramePalyer.closest(".global-video")) ||
                      void 0 === h
                        ? void 0
                        : h.offsetHeight,
                    W =
                      null ===
                        (b = this.videoIFramePalyer.closest(".a-video")) ||
                      void 0 === b
                        ? void 0
                        : b.getAttribute("data-muted"),
                    k =
                      null ===
                        (f =
                          null === (g = this.videoIFramePalyer) || void 0 === g
                            ? void 0
                            : g.closest(".a-video")) || void 0 === f
                        ? void 0
                        : f.getAttribute("data-loop"),
                    O =
                      null ===
                        (P =
                          null === (_ = this.videoIFramePalyer) || void 0 === _
                            ? void 0
                            : _.closest(".a-video")) || void 0 === P
                        ? void 0
                        : P.getAttribute("data-controls");
                  if (
                    (null ===
                      (S =
                        null === (A = this.videoIFramePalyer) || void 0 === A
                          ? void 0
                          : A.src) || void 0 === S
                      ? void 0
                      : S.indexOf("youtube")) > -1
                  ) {
                    this.videoIFramePalyer.closest(".global-video") &&
                      (this.videoIFramePalyer.closest(
                        ".global-video"
                      ).innerHTML =
                        "<div id=iframe_" + E + " data-muted=" + W + "></div>");
                    var F = "iframe_" + E;
                    setTimeout(function () {
                      q.onYouTubeIframeAPIReady(E, F, j, T, k, O);
                    }, 100);
                  }
                }
              }
              this.videoPlayElem &&
                (e === this.PAUSE
                  ? (this.videoPlayElem.style.display = "block")
                  : e === this.PLAY &&
                    (this.videoPlayElem.style.display = "none"));
            }),
            (VideoComp.prototype.onYouTubeIframeAPIReady = function (
              e,
              t,
              o,
              i,
              l,
              a
            ) {
              var d = this;
              setTimeout(function () {
                var r = d,
                  u = 1;
                "true" == a && (u = 0),
                  "true" == l
                    ? window.YT.ready(function () {
                        new window.YT.Player(t, {
                          width: o,
                          height: i,
                          videoId: e,
                          playerVars: {
                            version: 3,
                            autoplay: 1,
                            playsinline: 1,
                            loop: 1,
                            playlist: e,
                            controls: u,
                          },
                          events: {
                            onReady: function (e) {
                              r.onPlayerReady(e);
                            },
                          },
                        });
                      })
                    : window.YT.ready(function () {
                        new window.YT.Player(t, {
                          width: o,
                          height: i,
                          videoId: e,
                          playerVars: {
                            autoplay: 1,
                            playsinline: 1,
                            controls: u,
                          },
                          events: {
                            onReady: function (e) {
                              r.onPlayerReady(e);
                            },
                          },
                        });
                      });
              }, 200);
            }),
            (VideoComp.prototype.onPlayerReady = function (e) {
              var t = e.target.getIframe().getAttribute("data-muted"),
                o = e.target
                  .getIframe()
                  .closest(".a-video")
                  .getAttribute("data-playertype");
              "true" == t ? e.target.mute() : e.target.unMute(),
                "embed" == o && e.target.mute(),
                e.target.setVolume(70),
                e.target.playVideo();
            }),
            (VideoComp.prototype.bindLimeLightVideo = function (elem) {
              var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
              if (elem) {
                var LLVideoPlayer_1 = elem,
                  LLVideoParent =
                    null == LLVideoPlayer_1
                      ? void 0
                      : LLVideoPlayer_1.closest(".a-video"),
                  LLplayerID =
                    "limelight_player_" +
                    LLVideoPlayer_1.getAttribute("data-player-ID"),
                  LLmediaID = LLVideoPlayer_1.getAttribute("data-media-ID"),
                  LLplayerForm = "Player",
                  LLautoPlay_1 =
                    null == LLVideoParent
                      ? void 0
                      : LLVideoParent.getAttribute("data-autoplay"),
                  LLMobileautoPlay_1 =
                    null == LLVideoParent
                      ? void 0
                      : LLVideoParent.getAttribute("data-mobile-autoplay"),
                  LLMuted =
                    null == LLVideoParent
                      ? void 0
                      : LLVideoParent.getAttribute("data-muted"),
                  videoLLWidth =
                    null == LLVideoParent ? void 0 : LLVideoParent.offsetWidth,
                  videoLLHeight = videoLLWidth || 0;
                window.innerWidth > 767 &&
                "embed" ==
                  (null == LLVideoParent
                    ? void 0
                    : LLVideoParent.getAttribute("data-playertype"))
                  ? LimelightPlayerUtil.embed({
                      playerId: LLplayerID,
                      mediaId: LLmediaID,
                      playerForm: LLplayerForm,
                      width: videoLLWidth,
                      height: videoLLHeight,
                      autoplay: LLautoPlay_1,
                      muted: LLMuted,
                    })
                  : window.innerWidth <= 767 &&
                    "embed" ==
                      (null == LLVideoParent
                        ? void 0
                        : LLVideoParent.getAttribute("data-playertype"))
                  ? LimelightPlayerUtil.embed({
                      playerId: LLplayerID,
                      mediaId: LLmediaID,
                      playerForm: LLplayerForm,
                      width: videoLLWidth,
                      height: videoLLHeight,
                      autoplay: LLMobileautoPlay_1,
                      muted: LLMuted,
                    })
                  : "modal" !=
                      (null == LLVideoParent
                        ? void 0
                        : LLVideoParent.getAttribute("data-playertype")) ||
                    (null ===
                      (_b =
                        null == LLVideoPlayer_1
                          ? void 0
                          : LLVideoPlayer_1.closest(".modal")) || void 0 === _b
                      ? void 0
                      : _b.classList.contains("show"))
                  ? window.innerWidth > 767 &&
                    "modal" ==
                      (null == LLVideoParent
                        ? void 0
                        : LLVideoParent.getAttribute("data-playertype")) &&
                    (null ===
                      (_c =
                        null == LLVideoPlayer_1
                          ? void 0
                          : LLVideoPlayer_1.closest(".modal")) || void 0 === _c
                      ? void 0
                      : _c.classList.contains("show"))
                    ? LimelightPlayerUtil.embed({
                        playerId: LLplayerID,
                        mediaId: LLmediaID,
                        playerForm: LLplayerForm,
                        width: videoLLWidth,
                        height: videoLLHeight,
                        autoplay: LLautoPlay_1,
                        muted: LLMuted,
                      })
                    : window.innerWidth <= 767 &&
                      "modal" ==
                        (null == LLVideoParent
                          ? void 0
                          : LLVideoParent.getAttribute("data-playertype")) &&
                      (null ===
                        (_d =
                          null == LLVideoPlayer_1
                            ? void 0
                            : LLVideoPlayer_1.closest(".modal")) ||
                      void 0 === _d
                        ? void 0
                        : _d.classList.contains("show")) &&
                      LimelightPlayerUtil.embed({
                        playerId: LLplayerID,
                        mediaId: LLmediaID,
                        playerForm: LLplayerForm,
                        width: videoLLWidth,
                        height: videoLLHeight,
                        autoplay: LLMobileautoPlay_1,
                        muted: LLMuted,
                      })
                  : setTimeout(function () {
                      (LLautoPlay_1 || LLMobileautoPlay_1) &&
                        LLVideoPlayer_1.querySelector("video") &&
                        ((LLVideoPlayer_1.querySelector("video").muted = !0),
                        (LLVideoPlayer_1.querySelector(
                          "video"
                        ).currentTime = 0),
                        LLVideoPlayer_1.querySelector("video").pause());
                    }, 5e3);
                var LLLoop =
                  null ===
                    (_e =
                      null == LLVideoPlayer_1
                        ? void 0
                        : LLVideoPlayer_1.closest(".a-video")) || void 0 === _e
                    ? void 0
                    : _e.getAttribute("data-loop");
                (LLLoop = eval(LLLoop)),
                  1 == LLLoop &&
                    (null ===
                      (_f =
                        null == LLVideoPlayer_1
                          ? void 0
                          : LLVideoPlayer_1.querySelector("video")) ||
                      void 0 === _f ||
                      _f.addEventListener(
                        "ended",
                        function () {
                          (this.currentTime = 0), this.play();
                        },
                        !1
                      )),
                  (null ===
                    (_g =
                      null == LLVideoParent
                        ? void 0
                        : LLVideoParent.querySelector(".vjs-play-control")) ||
                  void 0 === _g
                    ? void 0
                    : _g.classList.contains("click-handler")) ||
                    (null ===
                      (_h =
                        null == LLVideoParent
                          ? void 0
                          : LLVideoParent.querySelector(".vjs-play-control")) ||
                      void 0 === _h ||
                      _h.classList.add("click-handler"),
                    null ===
                      (_j =
                        null == LLVideoParent
                          ? void 0
                          : LLVideoParent.querySelector(".vjs-play-control")) ||
                      void 0 === _j ||
                      _j.addEventListener("click", function (e) {
                        var t = this;
                        e.preventDefault(),
                          e.stopPropagation(),
                          this.classList.contains("vjs-paused") &&
                            setTimeout(function () {
                              t
                                .closest(".vjs-limelight")
                                .querySelector("video")
                                .play(),
                                t.classList.add("vjs-playing"),
                                t.classList.remove("vjs-paused");
                            }, 1e3);
                      })),
                  (null ===
                    (_k =
                      null == LLVideoParent
                        ? void 0
                        : LLVideoParent.querySelector(".vjs-limelight")) ||
                  void 0 === _k
                    ? void 0
                    : _k.classList.contains("click-handler")) ||
                    (null ===
                      (_l =
                        null == LLVideoParent
                          ? void 0
                          : LLVideoParent.querySelector(".vjs-limelight")) ||
                      void 0 === _l ||
                      _l.classList.add("click-handler"),
                    null ===
                      (_m =
                        null == LLVideoParent
                          ? void 0
                          : LLVideoParent.querySelector(".vjs-limelight")) ||
                      void 0 === _m ||
                      _m.addEventListener("click", function (e) {
                        e.preventDefault(), e.stopPropagation();
                        new KeyboardEvent("keydown", {
                          keyCode: 32,
                          which: 32,
                        });
                      }));
              }
            }),
            (VideoComp.prototype.bindEvents = function (e) {
              var t;
              null === (t = this.videoPlayElem) ||
                void 0 === t ||
                t.addEventListener(
                  "click",
                  function () {
                    e.playOrPauseVideo(e.PLAY);
                  }.bind(this)
                );
            }),
            (VideoComp.prototype.init = function (e, t) {
              "true" !== t.getAttribute("data-autoplay") &&
              window.innerWidth > 767
                ? e.playOrPauseVideo(e.PAUSE)
                : "true" == t.getAttribute("data-autoplay") &&
                  window.innerWidth > 767 &&
                  setTimeout(function () {
                    var o;
                    "embed" == t.getAttribute("data-playertype") &&
                      e.playOrPauseVideo(e.PLAY),
                      "modal" == t.getAttribute("data-playertype") &&
                        (null !==
                          (null == t
                            ? void 0
                            : t.querySelector(".limeLight-video")) &&
                          e.playOrPauseVideo(e.PAUSE),
                        null !==
                          (null == t
                            ? void 0
                            : t.querySelector(".limeLight-video")) &&
                          (null ===
                            (o = null == t ? void 0 : t.closest(".modal")) ||
                          void 0 === o
                            ? void 0
                            : o.classList.contains("show")) &&
                          e.playOrPauseVideo(e.PLAY),
                        null ==
                          (null == t
                            ? void 0
                            : t.querySelector(".limeLight-video")) &&
                          e.playOrPauseVideo(e.PLAY));
                  }, 1300),
                "true" !== t.getAttribute("data-mobile-autoplay") &&
                window.innerWidth <= 767
                  ? e.playOrPauseVideo(e.PAUSE)
                  : "true" == t.getAttribute("data-mobile-autoplay") &&
                    window.innerWidth <= 767 &&
                    setTimeout(function () {
                      var o;
                      "embed" == t.getAttribute("data-playertype") &&
                        e.playOrPauseVideo(e.PLAY),
                        "modal" == t.getAttribute("data-playertype") &&
                          (null !==
                            (null == t
                              ? void 0
                              : t.querySelector(".limeLight-video")) &&
                            e.playOrPauseVideo(e.PAUSE),
                          null !==
                            (null == t
                              ? void 0
                              : t.querySelector(".limeLight-video")) &&
                            (null ===
                              (o = null == t ? void 0 : t.closest(".modal")) ||
                            void 0 === o
                              ? void 0
                              : o.classList.contains("show")) &&
                            e.playOrPauseVideo(e.PLAY),
                          null ==
                            (null == t
                              ? void 0
                              : t.querySelector(".limeLight-video")) &&
                            e.playOrPauseVideo(e.PLAY));
                    }, 1300);
            }),
            (VideoComp.prototype.videoLLloop = function (e) {
              var t = this,
                o = e;
              setTimeout(function () {
                if (
                  null == o
                    ? void 0
                    : o.classList.contains("limeLight-video-wrapper")
                ) {
                  var e,
                    i = o.closest(".a-video"),
                    l = null == i ? void 0 : i.getAttribute("data-controls");
                  if (
                    ("true" ==
                      (null == i ? void 0 : i.getAttribute("data-loop")) &&
                      t.videoLoop(),
                    "true" == l)
                  )
                    (e =
                      null == o
                        ? void 0
                        : o.querySelector(".vjs-control-bar")) &&
                      (e.style.display = "none");
                  if ("false" == l)
                    (e =
                      null == o
                        ? void 0
                        : o.querySelector(".vjs-control-bar")) &&
                      (e.style.display = "flex");
                }
              }, 100);
            }),
            (VideoComp.prototype.videoDamControls = function (e) {
              var t,
                o,
                i,
                l =
                  null === (t = e) || void 0 === t
                    ? void 0
                    : t.classList.contains("a-video__dom-video"),
                a =
                  null ===
                    (i =
                      null === (o = e) || void 0 === o
                        ? void 0
                        : o.closest(".a-video")) || void 0 === i
                    ? void 0
                    : i.getAttribute("data-controls");
              if (l && "true" === a) {
                var d = e;
                setTimeout(function () {
                  var e;
                  null === (e = d) ||
                    void 0 === e ||
                    e.removeAttribute("controls");
                }, 500);
              }
              if (
                "embed" ==
                (null == e
                  ? void 0
                  : e.closest(".a-video").getAttribute("data-playertype"))
              ) {
                var r = e;
                r &&
                  setTimeout(function () {
                    var t, o, i, l, a, d;
                    (r.currentTime = 0),
                      "true" ==
                        (null === (t = e.closest(".a-video")) || void 0 === t
                          ? void 0
                          : t.getAttribute("data-autoplay")) &&
                        window.innerWidth > 767 &&
                        ((r.muted = !0), null == r || r.play()),
                      "false" ==
                        (null === (o = e.closest(".a-video")) || void 0 === o
                          ? void 0
                          : o.getAttribute("data-autoplay")) &&
                        window.innerWidth > 767 &&
                        (null == r || r.pause()),
                      "true" ==
                        (null === (i = e.closest(".a-video")) || void 0 === i
                          ? void 0
                          : i.getAttribute("data-mobile-autoplay")) &&
                        window.innerWidth <= 767 &&
                        ((r.muted = !0), null == r || r.play()),
                      "false" ==
                        (null === (l = e.closest(".a-video")) || void 0 === l
                          ? void 0
                          : l.getAttribute("data-mobile-autoplay")) &&
                        window.innerWidth <= 767 &&
                        (null == r || r.pause()),
                      "true" ==
                        (null === (a = e.closest(".a-video")) || void 0 === a
                          ? void 0
                          : a.getAttribute("data-autoplay")) &&
                        "false" ==
                          (null === (d = e.closest(".a-video")) || void 0 === d
                            ? void 0
                            : d.getAttribute("data-mobile-autoplay")) &&
                        window.innerWidth <= 767 &&
                        (null == r || r.pause());
                  }, 250);
              } else if (
                "modal" ==
                (null == e ? void 0 : e.getAttribute("data-playertype"))
              ) {
                var u = this,
                  n = this.videoHTML5Player;
                n &&
                  ((n.muted = !0),
                  setTimeout(function () {
                    u.playOrPauseVideo(u.PAUSE),
                      (n.currentTime = 0),
                      n.pause(),
                      new CloseVideoPopup();
                  }, 1500));
              }
            }),
            (VideoComp.prototype.videoIFrameYTControl = function (e) {
              var t,
                o,
                i,
                l,
                a,
                d,
                r,
                u = this;
              if (
                "embed" ==
                  e.closest(".a-video").getAttribute("data-playertype") &&
                (("true" ==
                  e.closest(".a-video").getAttribute("data-mobile-autoplay") &&
                  window.innerWidth <= 767) ||
                  ("true" ==
                    e.closest(".a-video").getAttribute("data-autoplay") &&
                    window.innerWidth > 767))
              ) {
                var n = this.videoIFramePalyer.src.split("/"),
                  v = n[(n && n.length) - 1].split("?")[0],
                  p =
                    null === (t = e.closest(".global-video-embedDam")) ||
                    void 0 === t
                      ? void 0
                      : t.offsetWidth,
                  c =
                    null === (o = e.closest(".global-video-embedDam")) ||
                    void 0 === o
                      ? void 0
                      : o.offsetHeight,
                  s =
                    null === (i = e.closest(".a-video")) || void 0 === i
                      ? void 0
                      : i.getAttribute("data-muted"),
                  y =
                    null ===
                      (a =
                        null === (l = e) || void 0 === l
                          ? void 0
                          : l.closest(".a-video")) || void 0 === a
                      ? void 0
                      : a.getAttribute("data-loop"),
                  m =
                    null ===
                      (r =
                        null === (d = e) || void 0 === d
                          ? void 0
                          : d.closest(".a-video")) || void 0 === r
                      ? void 0
                      : r.getAttribute("data-controls");
                e.closest(".global-video-embedDam") &&
                  (e.closest(".global-video-embedDam").innerHTML =
                    "<div id=iframe_" + v + " data-muted=" + s + "></div>"),
                  e.setAttribute("id", "iframe_" + v);
                var L = "iframe_" + v;
                setTimeout(function () {
                  u.onYouTubeIframeAPIReady(v, L, p, c, y, m);
                }, 100);
              }
            }),
            (VideoComp.prototype.videoLoop = function () {
              var e;
              if (
                (document.querySelectorAll(".video-js").forEach(function (t) {
                  e = t.classList.contains("vjs-ended");
                }),
                e)
              )
                document
                  .querySelectorAll('[data-js-component="video"]')
                  .forEach(function (e) {
                    var t,
                      o =
                        null === (t = e.querySelector(".global-video")) ||
                        void 0 === t
                          ? void 0
                          : t.closest(".a-video");
                    o && new VideoComp(o);
                  });
              else {
                var t = this;
                setTimeout(function () {
                  t.videoLoop();
                }, 1e3);
              }
            }),
            VideoComp
          );
        })(),
        tempSrc_1,
        CloseVideoPopup = (function () {
          function e() {
            this.init();
          }
          return (
            (e.prototype.init = function () {
              document
                .querySelectorAll(
                  '[data-js-component="video"] iframe,[data-js-component="video"] video'
                )
                .forEach(function (e) {
                  if ("video" === e.tagName.toLowerCase())
                    setTimeout(function () {
                      e.pause(), (e.currentTime = 0);
                    }, 1e3);
                  else if ("iframe" === e.tagName.toLowerCase()) {
                    tempSrc_1 = e.src;
                    var t = e.src;
                    setTimeout(function () {
                      e.src.indexOf("youtube") > -1
                        ? (e.src = t.split("?")[0])
                        : e.src.indexOf("brightcove") > -1
                        ? (e.src = t.split("&")[0])
                        : (e.src = t);
                    }, 1e3);
                  }
                });
            }),
            e
          );
        })(),
        YouTubeIframe = (function () {
          function e(e) {
            (this.elem = e), this.init();
          }
          return (
            (e.prototype.init = function () {
              var e, t, o, i, l, a, d;
              if (null != this.elem.querySelector(".play-icon")) {
                var r =
                    "#" +
                    (null === (e = this.elem.querySelector(".play-icon")) ||
                    void 0 === e
                      ? void 0
                      : e.getAttribute("id")) +
                    "-modal",
                  u =
                    null ===
                      (o =
                        null === (t = document.querySelector(r)) || void 0 === t
                          ? void 0
                          : t.querySelector("iframe")) || void 0 === o
                      ? void 0
                      : o.getAttribute("data-url");
                this.checkQueryStringParameterExists("autoplay", u) &&
                window.innerWidth <= 767
                  ? null ===
                      (l =
                        null === (i = document.querySelector(r)) || void 0 === i
                          ? void 0
                          : i.querySelector("iframe")) ||
                    void 0 === l ||
                    l.setAttribute("src", u + "&mute=1")
                  : null ===
                      (d =
                        null === (a = document.querySelector(r)) || void 0 === a
                          ? void 0
                          : a.querySelector("iframe")) ||
                    void 0 === d ||
                    d.setAttribute("src", u);
              }
            }),
            (e.prototype.checkQueryStringParameterExists = function (e, t) {
              return (
                t.indexOf("?" + e + "=") >= 0 || t.indexOf("&" + e + "=") >= 0
              );
            }),
            e
          );
        })(),
        BrightCoveVideo = (function () {
          function BrightCoveVideo(e, t) {
            (this.elem = e), (this.obj = t), this.init(this.obj);
          }
          return (
            (BrightCoveVideo.prototype.init = function (e) {
              var t, o, i, l;
              l = e.loop
                ? '<video-js id="myPlayerID" data-video-id="' +
                  e.videoId +
                  '"  data-account="' +
                  e.accountId +
                  '" data-player="' +
                  e.playerId +
                  '"data-embed="default" loop controls ></video-js>'
                : '<video-js id="myPlayerID" data-video-id="' +
                  e.videoId +
                  '"  data-account="' +
                  e.accountId +
                  '" data-player="' +
                  e.playerId +
                  '"data-embed="default" controls ></video-js>';
              var a =
                  "#" +
                  (null ===
                    (o =
                      null === (t = this.elem) || void 0 === t
                        ? void 0
                        : t.querySelector(".play-icon")) || void 0 === o
                    ? void 0
                    : o.getAttribute("id")) +
                  "-modal",
                d = document.querySelector(a);
              if (
                null != (null == d ? void 0 : d.querySelector(".placeHolder"))
              ) {
                (null == d
                  ? void 0
                  : d.querySelector(".placeHolder")
                ).innerHTML = l;
                var r = document.createElement("script");
                (r.src =
                  "https://players.brightcove.net/" +
                  e.accountId +
                  "/" +
                  e.playerId +
                  "_default/index.min.js"),
                  null ===
                    (i =
                      null == d ? void 0 : d.querySelector(".placeHolder")) ||
                    void 0 === i ||
                    i.appendChild(r),
                  (r.onload = this.callback(this.elem));
              }
            }),
            (BrightCoveVideo.prototype.callback = function (_elem) {
              var _this = this;
              setTimeout(function () {
                var _b,
                  _c,
                  _d,
                  myPlayer = bc("myPlayerID");
                if (myPlayer) {
                  var popupId =
                      "#" +
                      _elem.querySelector(".play-icon").getAttribute("id") +
                      "-modal",
                    popupDiv = document.querySelector(popupId),
                    autoPlay =
                      null ===
                        (_b =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _b
                        ? void 0
                        : _b.getAttribute("data-autoplay"),
                    autoPlayData = eval(autoPlay),
                    mobileAutoPlay =
                      null ===
                        (_c =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _c
                        ? void 0
                        : _c.getAttribute("data-mobile-autoplay"),
                    mobileAutoPlayData = eval(mobileAutoPlay),
                    meta =
                      null ===
                        (_d =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _d
                        ? void 0
                        : _d.getAttribute("data-muted"),
                    muteData = eval(meta);
                  muteData || myPlayer.muted(!0),
                    (autoPlayData || mobileAutoPlayData) &&
                      _this.autoPlayBrightCove(_elem),
                    document
                      .querySelectorAll(
                        ".generic-modal.generic-modal--image .vjs-poster"
                      )
                      .forEach(function (e) {
                        e.addEventListener("click", function () {
                          var e = this;
                          setTimeout(function () {
                            e.closest(".video-js")
                              .querySelector("video")
                              .play();
                          }, 500);
                        });
                      }),
                    document
                      .querySelectorAll(
                        ".generic-modal.generic-modal--image .vjs-big-play-button"
                      )
                      .forEach(function (e) {
                        e.addEventListener("click", function () {
                          var e = this;
                          setTimeout(function () {
                            e.closest(".video-js")
                              .querySelector("video")
                              .play();
                          }, 500);
                        });
                      });
                }
              }, 1200);
            }),
            (BrightCoveVideo.prototype.autoPlayBrightCove = function (_elem) {
              null === videojs ||
                void 0 === videojs ||
                videojs.getPlayer("myPlayerID").ready(function () {
                  var _b,
                    _c,
                    _d,
                    _e,
                    popupId =
                      "#" +
                      _elem.querySelector(".play-icon").getAttribute("id") +
                      "-modal",
                    popupDiv = document.querySelector(popupId),
                    autoPlay =
                      null ===
                        (_b =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _b
                        ? void 0
                        : _b.getAttribute("data-autoplay"),
                    autoPlayData = eval(autoPlay),
                    mobileAutoPlay =
                      null ===
                        (_c =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _c
                        ? void 0
                        : _c.getAttribute("data-mobile-autoplay"),
                    mobileAutoPlayData = eval(mobileAutoPlay),
                    controls =
                      null ===
                        (_d =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _d
                        ? void 0
                        : _d.getAttribute("data-controls"),
                    controlsData = eval(controls),
                    meta =
                      null ===
                        (_e =
                          null == popupDiv
                            ? void 0
                            : popupDiv.querySelector(".brightCove-video")) ||
                      void 0 === _e
                        ? void 0
                        : _e.getAttribute("data-muted"),
                    muteData = eval(meta),
                    myPlayer = this;
                  autoPlayData && window.innerWidth > 767 && myPlayer.play(),
                    mobileAutoPlayData &&
                      window.innerWidth <= 767 &&
                      myPlayer.play(),
                    controlsData &&
                      ((null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".vjs-control-bar")
                      ).style.display = "none"),
                    controlsData ||
                      ((null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".vjs-control-bar")
                      ).style.display = "flex"),
                    muteData || myPlayer.muted(!0);
                });
            }),
            BrightCoveVideo
          );
        })();
      !(function () {
        var _b;
        loadIframeAPI();
        var brightCovePopUp = document.querySelectorAll(
            ".m-video-popup.brightCove"
          ),
          limeLightPopUp = document.querySelectorAll(
            ".m-video-popup.limeLight"
          ),
          videoURLPopUp = document.querySelectorAll(".m-video-popup.videoURL"),
          damPopUp = document.querySelectorAll(".m-video-popup.dam"),
          mVideoPopup = document.querySelectorAll(".m-video-popup"),
          popupId;
        function loadIframeAPI() {
          var e,
            t = document.createElement("script");
          t.src = "https://www.youtube.com/iframe_api";
          var o = document.getElementsByTagName("script")[0];
          null === (e = null == o ? void 0 : o.parentNode) ||
            void 0 === e ||
            e.insertBefore(t, o);
        }
        null == mVideoPopup ||
          mVideoPopup.forEach(function (e) {
            var t = null == e ? void 0 : e.getAttribute("data-target"),
              o = setInterval(function () {
                var e;
                null === (e = document.querySelector(t)) ||
                  void 0 === e ||
                  e.classList.add("modal-video-popup"),
                  clearInterval(o);
              }, 100);
          }),
          setTimeout(function () {
            brightCovePopUp &&
              brightCovePopUp.length > 0 &&
              brightCovePopUp.forEach(function (play) {
                var _b,
                  _c,
                  _d,
                  _e,
                  popupIdNew =
                    "#" +
                    play.querySelector(".play-icon").getAttribute("id") +
                    "-modal",
                  popupDiv = document.querySelector(popupIdNew),
                  accId =
                    null ===
                      (_b =
                        null == popupDiv
                          ? void 0
                          : popupDiv.querySelector(".brightCove-video")) ||
                    void 0 === _b
                      ? void 0
                      : _b.getAttribute("data-account"),
                  playId =
                    null ===
                      (_c =
                        null == popupDiv
                          ? void 0
                          : popupDiv.querySelector(".brightCove-video")) ||
                    void 0 === _c
                      ? void 0
                      : _c.getAttribute("data-player"),
                  vidId =
                    null ===
                      (_d =
                        null == popupDiv
                          ? void 0
                          : popupDiv.querySelector(".brightCove-video")) ||
                    void 0 === _d
                      ? void 0
                      : _d.getAttribute("data-video-id"),
                  loopAttr =
                    null ===
                      (_e =
                        null == popupDiv
                          ? void 0
                          : popupDiv.querySelector(".brightCove-video")) ||
                    void 0 === _e
                      ? void 0
                      : _e.getAttribute("data-loop"),
                  loopData = eval(loopAttr),
                  obj = {
                    accountId: accId,
                    playerId: playId,
                    videoId: vidId,
                    loop: loopData,
                  };
                new BrightCoveVideo(popupDiv, obj);
              });
            var brightCoveEmbed = document.querySelectorAll(
              ".brightCove-video"
            );
            brightCoveEmbed.forEach(function (video) {
              var _b, _c, _d;
              if (!popupId && video) {
                var popupDiv =
                    null == video ? void 0 : video.closest(".a-video"),
                  autoPlay =
                    null === (_b = popupDiv) || void 0 === _b
                      ? void 0
                      : _b.getAttribute("data-autoplay"),
                  autoPlayData = eval(autoPlay),
                  mobileAutoPlay =
                    null === (_c = popupDiv) || void 0 === _c
                      ? void 0
                      : _c.getAttribute("data-mobile-autoplay"),
                  mobileAutoPlayData = eval(mobileAutoPlay),
                  controls =
                    null === (_d = popupDiv) || void 0 === _d
                      ? void 0
                      : _d.getAttribute("data-controls"),
                  controlsData = eval(controls),
                  loopAttr =
                    null == popupDiv
                      ? void 0
                      : popupDiv.getAttribute("data-loop"),
                  loopData = eval(loopAttr),
                  myPlayer = popupDiv.querySelector("video");
                myPlayer &&
                  (controlsData &&
                    (null == popupDiv
                      ? void 0
                      : popupDiv.querySelector(".vjs-control-bar")) &&
                    ((null == popupDiv
                      ? void 0
                      : popupDiv.querySelector(".vjs-control-bar")
                    ).style.display = "none"),
                  !controlsData &&
                    (null == popupDiv
                      ? void 0
                      : popupDiv.querySelector(".vjs-control-bar")) &&
                    ((null == popupDiv
                      ? void 0
                      : popupDiv.querySelector(".vjs-control-bar")
                    ).style.display = "flex"),
                  autoPlayData && window.innerWidth > 767
                    ? ((myPlayer.muted = !0), myPlayer.play())
                    : !autoPlayData &&
                      window.innerWidth > 767 &&
                      myPlayer.pause(),
                  mobileAutoPlayData && window.innerWidth <= 767
                    ? ((myPlayer.muted = !0), myPlayer.play())
                    : !mobileAutoPlayData &&
                      window.innerWidth <= 767 &&
                      myPlayer.pause(),
                  loopData && myPlayer.setAttribute("loop", !0),
                  loopData || myPlayer.removeAttribute("loop"));
              }
            });
          }, 1501),
          null === (_b = document.querySelector(".generic-modal--close")) ||
            void 0 === _b ||
            _b.addEventListener("click", function () {
              new CloseVideoPopup();
            }),
          document.addEventListener("click", function (e) {
            var t, o;
            ((null === (t = e.target) || void 0 === t
              ? void 0
              : t.classList.contains("generic-modal--image")) ||
              (null === (o = e.target) || void 0 === o
                ? void 0
                : o.classList.contains("abt-icon-cancel"))) &&
              new CloseVideoPopup();
          }),
          damPopUp.forEach(function (e) {
            e.addEventListener("click", function () {
              var t, o, i, l, a, d, r, u, n;
              this.classList.add("clicked-dam");
              var v = this.getAttribute("data-target"),
                p = document
                  .querySelector(v)
                  .querySelector("video.a-video__player-source"),
                c =
                  null === (t = p) || void 0 === t
                    ? void 0
                    : t.classList.contains("a-video__dom-video"),
                s =
                  null ===
                    (l =
                      null ===
                        (i =
                          null === (o = p) || void 0 === o
                            ? void 0
                            : o.parentElement) || void 0 === i
                        ? void 0
                        : i.parentElement) || void 0 === l
                    ? void 0
                    : l.getAttribute("data-controls");
              c &&
                "true" === s &&
                (null === (a = p) ||
                  void 0 === a ||
                  a.removeAttribute("controls")),
                (("true" ==
                  (null === (d = e.closest(".a-video")) || void 0 === d
                    ? void 0
                    : d.getAttribute("data-autoplay")) &&
                  window.innerWidth > 767) ||
                  ("true" ==
                    (null === (r = e.closest(".a-video")) || void 0 === r
                      ? void 0
                      : r.getAttribute("data-mobile-autoplay")) &&
                    window.innerWidth <= 767)) &&
                  ((p.currentTime = 0), p.play()),
                (("false" ==
                  (null === (u = e.closest(".a-video")) || void 0 === u
                    ? void 0
                    : u.getAttribute("data-autoplay")) &&
                  window.innerWidth > 767) ||
                  ("false" ==
                    (null === (n = e.closest(".a-video")) || void 0 === n
                      ? void 0
                      : n.getAttribute("data-mobile-autoplay")) &&
                    window.innerWidth <= 767)) &&
                  ((p.currentTime = 0), p.pause());
            });
          }),
          brightCovePopUp.forEach(function (play) {
            play.addEventListener("click", function () {
              var _b, _c, _d, _e, _f;
              this.classList.add("clicked-brightCove");
              var popupId =
                  "#" +
                  this.querySelector(".play-icon").getAttribute("id") +
                  "-modal",
                popupDiv = document.querySelector(popupId),
                accId =
                  null ===
                    (_b =
                      null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".brightCove-video")) ||
                  void 0 === _b
                    ? void 0
                    : _b.getAttribute("data-account"),
                playId =
                  null ===
                    (_c =
                      null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".brightCove-video")) ||
                  void 0 === _c
                    ? void 0
                    : _c.getAttribute("data-player"),
                vidId =
                  null ===
                    (_d =
                      null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".brightCove-video")) ||
                  void 0 === _d
                    ? void 0
                    : _d.getAttribute("data-video-id"),
                loopAttr =
                  null ===
                    (_e =
                      null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".brightCove-video")) ||
                  void 0 === _e
                    ? void 0
                    : _e.getAttribute("data-loop"),
                loopData = eval(loopAttr),
                muteAttr =
                  null ===
                    (_f =
                      null == popupDiv
                        ? void 0
                        : popupDiv.querySelector(".brightCove-video")) ||
                  void 0 === _f
                    ? void 0
                    : _f.getAttribute("data-mute"),
                muteData = eval(muteAttr),
                obj = {
                  accountId: accId,
                  playerId: playId,
                  videoId: vidId,
                  loop: loopData,
                  mute: muteData,
                };
              new BrightCoveVideo(this, obj);
            });
          }),
          limeLightPopUp.forEach(function (e) {
            e.addEventListener("click", function (e) {
              e.preventDefault();
              var t = this.getAttribute("data-target");
              this.classList.add("clicked-limeLight"),
                document.querySelectorAll(t).forEach(function (e) {
                  var t,
                    o =
                      null === (t = e.querySelector(".limeLight-video")) ||
                      void 0 === t
                        ? void 0
                        : t.closest(".a-video");
                  o && new VideoComp(o);
                });
            });
          }),
          videoURLPopUp.forEach(function (e) {
            e.addEventListener("click", function (e) {
              var t, o, i, l;
              if (
                (null ===
                  (o =
                    null === (t = e.target) || void 0 === t
                      ? void 0
                      : t.closest(".m-popup")) ||
                  void 0 === o ||
                  o.classList.add("clicked-iframe"),
                window.innerWidth > 767)
              )
                new YouTubeIframe(e.target.closest(".m-popup"));
              else if (window.innerWidth <= 767) {
                var a =
                  null ===
                    (l =
                      null === (i = e.target) || void 0 === i
                        ? void 0
                        : i.closest(".m-popup")) || void 0 === l
                    ? void 0
                    : l.getAttribute("data-target");
                tempSrc_1
                  ? setTimeout(function () {
                      "modal" ==
                        document
                          .querySelector(a)
                          .querySelector(".a-video")
                          .getAttribute("data-playertype") &&
                        (document
                          .querySelector(a)
                          .querySelector(".a-video iframe").src = tempSrc_1);
                    }, 300)
                  : document
                      .querySelector(a)
                      .querySelector(".a-video iframe")
                      .src.indexOf("youtube") > -1 &&
                    new VideoComp(
                      document.querySelector(a).querySelector(".a-video")
                    );
              }
            });
          }),
          document
            .querySelectorAll('[data-js-component="video"]')
            .forEach(function (e) {
              var t,
                o =
                  null === (t = e.querySelector(".a-video__player")) ||
                  void 0 === t
                    ? void 0
                    : t.closest(".a-video");
              o && new VideoComp(o);
            });
      })();
    })();
  },
});
