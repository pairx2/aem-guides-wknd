!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
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
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
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
    r((r.s = 141));
})({
  141: function (e, t) {
    var r, n;
    (r = (function () {
      function e(e) {
        (this.elem = e), this.init();
      }
      return (
        (e.prototype.init = function () {
          var e = this.elem.getAttribute("data-short-numberoflines"),
            t = this.elem.getAttribute("data-short-morelink"),
            r = document.createElement("button");
          (r.innerHTML = t),
            (r.className = "a-read--more-less"),
            (r.type = "button");
          var n = 0,
            o = 0;
          this.elem.parentNode.appendChild(r);
          var l = parseInt(
              window
                .getComputedStyle(this.elem.querySelectorAll("p")[0])
                .getPropertyValue("line-height")
            ),
            i = parseInt(
              window
                .getComputedStyle(this.elem.querySelectorAll("p")[0])
                .getPropertyValue("margin-bottom")
            );
          this.elem.querySelectorAll("p").forEach(function (t) {
            var r = parseInt(t.offsetHeight) / l;
            e > o && ((n += i), (o += r));
          }),
            (this.elem.style.height = e * l + n - i + "px");
        }),
        e
      );
    })()),
      (n = (function () {
        function e(e) {
          (this.elem = e), this.init();
        }
        return (
          (e.prototype.init = function () {
            var e = this.elem.closest(".text");
            if (e.querySelectorAll(".a-short").length > 0) {
              console.log(e.querySelectorAll(".a-short").length);
              var t = e.querySelector(".a-short").getAttribute("aria-expanded"),
                r = e
                  .querySelector(".a-short")
                  .getAttribute("data-short-numberoflines"),
                n = e
                  .querySelector(".a-short")
                  .getAttribute("data-short-lesslink"),
                o = e
                  .querySelector(".a-short")
                  .getAttribute("data-short-morelink"),
                l = e.querySelector("button"),
                i = e.querySelector(".a-short");
              if ("false" == t)
                (i.ariaExpanded = !0),
                  (i.style.height = "auto"),
                  (l.innerHTML = n);
              else {
                var a = 0,
                  u = 0;
                this.elem.parentNode.appendChild(l);
                var s = parseInt(
                    window
                      .getComputedStyle(e.querySelectorAll("p")[0])
                      .getPropertyValue("line-height")
                  ),
                  c = parseInt(
                    window
                      .getComputedStyle(e.querySelectorAll("p")[0])
                      .getPropertyValue("margin-bottom")
                  );
                e.querySelectorAll("p").forEach(function (e) {
                  var t = parseInt(e.offsetHeight) / s;
                  r > u &&
                    (console.log("lineCount 1", r, t, u, r > u, a),
                    (a += c),
                    (u += t));
                }),
                  (i.style.height = r * s + a - c + "px"),
                  (i.ariaExpanded = !1),
                  (l.innerHTML = o);
              }
            }
          }),
          e
        );
      })()),
      document
        .querySelectorAll('[data-js-component="text"]')
        .forEach(function (e) {
          e.classList.contains("a-short") && new r(e);
        }),
      setTimeout(function () {
        document.querySelectorAll(".a-read--more-less").forEach(function (e) {
          e.addEventListener("click", function () {
            new n(this);
          });
        });
      }, 1e3);
  },
});
