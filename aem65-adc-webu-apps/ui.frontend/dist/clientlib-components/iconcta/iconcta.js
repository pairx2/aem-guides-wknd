!(function (e) {
  var t = {};
  function o(i) {
    if (t[i]) return t[i].exports;
    var r = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
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
        for (var r in e)
          o.d(
            i,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
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
    o((o.s = 171));
})({
  171: function (module, exports) {
    !(function () {
      var LimelightComp = (function () {
          function e(e) {
            if (!e) throw new Error("Video element is required");
            (this._this = this),
              (this.elem = e),
              (this.videoPlayElem = this.elem.querySelector(
                ".a-video__play-btn"
              )),
              (this.videoLLPlayer = this.elem.querySelector(
                ".limeLight-video.a-video__player-source"
              )),
              this.bindLimeLightVideo();
            var t = this;
            setTimeout(function () {
              t.bindLimeLightVideo();
            }, 200);
          }
          return (
            (e.prototype.bindLimeLightVideo = function () {
              var e;
              if (this.videoLLPlayer) {
                var t = this.videoLLPlayer,
                  o =
                    null === (e = null == t ? void 0 : t.parentElement) ||
                    void 0 === e
                      ? void 0
                      : e.parentElement,
                  i = "limelight_player_" + t.getAttribute("data-player-ID"),
                  r = t.getAttribute("data-media-ID"),
                  l = null == o ? void 0 : o.getAttribute("data-autoplay"),
                  a = null == o ? void 0 : o.getAttribute("data-muted"),
                  n = null == o ? void 0 : o.offsetWidth,
                  d = n || 0;
                LimelightPlayerUtil.embed({
                  playerId: i,
                  mediaId: r,
                  playerForm: "Player",
                  width: n,
                  height: d,
                  autoplay: l,
                  muted: a,
                });
              }
            }),
            e
          );
        })(),
        CloseVideoPopup = (function () {
          function e() {
            this.init();
          }
          return (
            (e.prototype.init = function () {
              var e = document.querySelectorAll(
                "[data-js-component='iconcta'] iframe, [data-js-component='iconcta'] video"
              );
              Array.prototype.forEach.call(e, function (e) {
                "video" === e.tagName.toLowerCase()
                  ? e.pause()
                  : "iframe" === e.tagName.toLowerCase() && (e.src = "");
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
              var e, t, o, i, r;
              if (null != this.elem.querySelector(".play-icon")) {
                var l =
                    "#" +
                    (null === (e = this.elem.querySelector(".play-icon")) ||
                    void 0 === e
                      ? void 0
                      : e.getAttribute("id")) +
                    "-modal",
                  a =
                    null ===
                      (o =
                        null === (t = document.querySelector(l)) || void 0 === t
                          ? void 0
                          : t.querySelector("iframe")) || void 0 === o
                      ? void 0
                      : o.getAttribute("data-url");
                null ===
                  (r =
                    null === (i = document.querySelector(l)) || void 0 === i
                      ? void 0
                      : i.querySelector("iframe")) ||
                  void 0 === r ||
                  r.setAttribute("src", a);
              }
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
              var t, o, i;
              i = e.loop
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
              var r =
                  "#" +
                  (null === (t = this.elem.querySelector(".play-icon")) ||
                  void 0 === t
                    ? void 0
                    : t.getAttribute("id")) +
                  "-modal",
                l = document.querySelector(r);
              if (null != l.querySelector(".placeHolder")) {
                l.querySelector(".placeHolder").innerHTML = i;
                var a = document.createElement("script");
                (a.src =
                  "https://players.brightcove.net/" +
                  e.accountId +
                  "/" +
                  e.playerId +
                  "_default/index.min.js"),
                  null === (o = l.querySelector(".placeHolder")) ||
                    void 0 === o ||
                    o.appendChild(a),
                  (a.onload = this.callback(this.elem));
              }
            }),
            (BrightCoveVideo.prototype.callback = function (e) {
              var t = this;
              setTimeout(function () {
                bc("myPlayerID").on("loadedmetadata", function () {
                  t.autoPlayBrightCove(e);
                });
              }, 500);
            }),
            (BrightCoveVideo.prototype.autoPlayBrightCove = function (_elem) {
              null === videojs ||
                void 0 === videojs ||
                videojs.getPlayer("myPlayerID").ready(function () {
                  var _a,
                    _b,
                    _c,
                    popupId =
                      "#" +
                      _elem.querySelector(".play-icon").getAttribute("id") +
                      "-modal",
                    popupDiv = document.querySelector(popupId),
                    autoPlay =
                      null ===
                        (_a = popupDiv.querySelector(".brightcove-video")) ||
                      void 0 === _a
                        ? void 0
                        : _a.getAttribute("data-autoplay"),
                    autoPlayData = eval(autoPlay),
                    controls =
                      null ===
                        (_b = popupDiv.querySelector(".brightcove-video")) ||
                      void 0 === _b
                        ? void 0
                        : _b.getAttribute("data-controls"),
                    controlsData = eval(controls),
                    meta =
                      null ===
                        (_c = popupDiv.querySelector(".brightcove-video")) ||
                      void 0 === _c
                        ? void 0
                        : _c.getAttribute("data-muted"),
                    muteData = eval(meta),
                    myPlayer = this;
                  autoPlayData && myPlayer.play(),
                    controlsData &&
                      (document.querySelector(
                        "#myPlayerID .vjs-control-bar"
                      ).style.display = "none"),
                    muteData || myPlayer.muted(!0);
                });
            }),
            BrightCoveVideo
          );
        })();
      !(function () {
        var brightCovePopUp = document.querySelectorAll(
            ".m-iconcta-popup.brightCove"
          ),
          limeLightPopUp = document.querySelectorAll(
            ".m-iconcta-popup.limeLight"
          ),
          videoURLPopUp = document.querySelectorAll(
            ".m-iconcta-popup.videoURL"
          ),
          iconCTA = document.querySelectorAll(".m-iconcta-popup");
        null == iconCTA ||
          iconCTA.forEach(function (e) {
            var t = e.getAttribute("data-target"),
              o = setInterval(function () {
                var e;
                null === (e = document.querySelector(t)) ||
                  void 0 === e ||
                  e.classList.add("modal-iconcta"),
                  clearInterval(o);
              }, 500);
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
          brightCovePopUp.forEach(function (play) {
            play.addEventListener("click", function () {
              var _a,
                _b,
                _c,
                _d,
                popupId =
                  "#" +
                  this.querySelector(".play-icon").getAttribute("id") +
                  "-modal",
                popupDiv = document.querySelector(popupId),
                accId =
                  null === (_a = popupDiv.querySelector(".brightcove-video")) ||
                  void 0 === _a
                    ? void 0
                    : _a.getAttribute("data-account"),
                playId =
                  null === (_b = popupDiv.querySelector(".brightcove-video")) ||
                  void 0 === _b
                    ? void 0
                    : _b.getAttribute("data-player"),
                vidId =
                  null === (_c = popupDiv.querySelector(".brightcove-video")) ||
                  void 0 === _c
                    ? void 0
                    : _c.getAttribute("data-video-id"),
                loopAttr =
                  null === (_d = popupDiv.querySelector(".brightcove-video")) ||
                  void 0 === _d
                    ? void 0
                    : _d.getAttribute("data-loop"),
                loopData = eval(loopAttr),
                obj = {
                  accountId: accId,
                  playerId: playId,
                  videoId: vidId,
                  loop: loopData,
                };
              new BrightCoveVideo(this, obj);
            });
          }),
          limeLightPopUp.forEach(function (e) {
            e.addEventListener("click", function () {
              document
                .querySelectorAll('[data-js-component="iconcta"]')
                .forEach(function (e) {
                  var t = e.querySelector(".a-video");
                  t && new LimelightComp(t);
                });
            });
          }),
          videoURLPopUp.forEach(function (e) {
            e.addEventListener("click", function () {
              new YouTubeIframe(this);
            });
          });
        var getCtaElement = document.querySelectorAll(".m-iconcta");
        Array.from(getCtaElement, function (e) {
          var t = e.querySelectorAll(".horizontal-ruler"),
            o = e.querySelectorAll(".custom-card img+p");
          Array.from(t, function (e, o) {
            t.length - 1 != o &&
              e.classList.add("horizontal-ruler--romove-border");
          }),
            o.length > 0 &&
              window.innerWidth > 767 &&
              setTimeout(function () {
                var e = o[0].clientHeight;
                o.forEach(function (t) {
                  t.clientHeight > e && (e = t.clientHeight);
                }),
                  o.forEach(function (t) {
                    t.setAttribute("style", "height:" + e + "px");
                  });
              }, 1e3);
        });
      })();
    })();
  },
});
