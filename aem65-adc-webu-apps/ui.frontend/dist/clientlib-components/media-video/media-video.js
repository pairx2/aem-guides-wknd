!(function (e) {
  function t(t) {
    for (
      var r, n, l = t[0], s = t[1], u = t[2], y = 0, p = [];
      y < l.length;
      y++
    )
      (n = l[y]),
        Object.prototype.hasOwnProperty.call(o, n) && o[n] && p.push(o[n][0]),
        (o[n] = 0);
    for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
    for (d && d(t); p.length; ) p.shift()();
    return a.push.apply(a, u || []), i();
  }
  function i() {
    for (var e, t = 0; t < a.length; t++) {
      for (var i = a[t], r = !0, l = 1; l < i.length; l++) {
        var s = i[l];
        0 !== o[s] && (r = !1);
      }
      r && (a.splice(t--, 1), (e = n((n.s = i[0]))));
    }
    return e;
  }
  var r = {},
    o = { 40: 0 },
    a = [];
  function n(t) {
    if (r[t]) return r[t].exports;
    var i = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = r),
    (n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            i,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "");
  var l = (window.webpackJsonp = window.webpackJsonp || []),
    s = l.push.bind(l);
  (l.push = t), (l = l.slice());
  for (var u = 0; u < l.length; u++) t(l[u]);
  var d = s;
  a.push([135, 0]), i();
})({
  135: function (e, t, i) {
    (function (e) {
      var t;
      (t = (function () {
        function e(e) {
          if (!e) throw new Error("Video element is required");
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
            this.bindLimeLightVideo(),
            this.bindEvents(),
            this.init();
        }
        return (
          (e.prototype.removeURLParameter = function (e, t) {
            var i = t;
            return (
              t.split("?")[1] &&
                (i =
                  t.split("?")[0] +
                  "?" +
                  t
                    .split("?")[1]
                    .split("&")
                    .filter(function (t) {
                      return t.indexOf(e) < 0;
                    })
                    .join("&")),
              i
            );
          }),
          (e.prototype.checkQueryStringParameterExists = function (e, t) {
            return (
              t.indexOf("?" + e + "=") >= 0 || t.indexOf("&" + e + "=") >= 0
            );
          }),
          (e.prototype.playOrPauseVideo = function (e) {
            this.videoHTML5Player
              ? ((this.videoHTML5Player.controls = !0),
                e === this.PAUSE
                  ? (this.videoHTML5Player.pause(),
                    (this.videoHTML5Player.currentTime = 0))
                  : e === this.PLAY && this.videoHTML5Player.play())
              : this.videoIFramePalyer &&
                (e === this.PAUSE &&
                this.checkQueryStringParameterExists(
                  "autoplay",
                  this.videoIFramePalyer.src
                )
                  ? (this.videoIFramePalyer.src = this.removeURLParameter(
                      "autoplay",
                      this.videoIFramePalyer.src
                    ))
                  : e === this.PLAY &&
                    (this.videoIFramePalyer.src +=
                      (this.videoIFramePalyer.src.indexOf("?") > -1
                        ? "&"
                        : "?") + "autoplay=1")),
              this.videoPlayElem &&
                (e === this.PAUSE
                  ? (this.videoPlayElem.style.display = "block")
                  : e === this.PLAY &&
                    (this.videoPlayElem.style.display = "none"));
          }),
          (e.prototype.bindLimeLightVideo = function () {
            if (this.videoLLPlayer) {
              var e = this.videoLLPlayer,
                t = e.parentElement.parentElement,
                i = "limelight_player_" + e.getAttribute("data-player-ID"),
                r = e.getAttribute("data-media-ID"),
                o = t.getAttribute("data-autoplay"),
                a = t.offsetWidth,
                n = 0.56 * a;
              LimelightPlayerUtil.embed({
                playerId: i,
                mediaId: r,
                playerForm: "Player",
                width: a,
                height: n,
                autoplay: o,
              });
            }
          }),
          (e.prototype.bindEvents = function () {
            var e;
            null === (e = this.videoPlayElem) ||
              void 0 === e ||
              e.addEventListener(
                "click",
                function () {
                  this.playOrPauseVideo(this.PLAY);
                }.bind(this)
              );
          }),
          (e.prototype.init = function () {
            "true" !== this.elem.getAttribute("data-autoplay")
              ? this.playOrPauseVideo(this.PAUSE)
              : this.playOrPauseVideo(this.PLAY);
          }),
          e
        );
      })()),
        e(function () {
          document
            .querySelectorAll('[data-js-component="video"]')
            .forEach(function (e) {
              var i = e.querySelector(".a-video");
              i && new t(i);
            });
        });
    }.call(this, i(6)));
  },
});
