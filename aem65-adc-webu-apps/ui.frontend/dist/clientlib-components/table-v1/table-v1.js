!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
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
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
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
    (n.p = ""),
    n((n.s = 182));
})({
  182: function (e, t) {
    var n;
    (n = (function () {
      function e(e) {
        (this.elem = e), this.init(this, e);
      }
      return (
        (e.prototype.init = function (e, t) {
          setTimeout(function () {
            var n,
              o,
              r = t;
            r &&
              document.querySelectorAll(".editmode").forEach(function (e) {
                e.remove();
              }),
              null ===
                (o =
                  null ===
                    (n =
                      null == r
                        ? void 0
                        : r.querySelector(".js-copy-table-html")) ||
                  void 0 === n
                    ? void 0
                    : n.parentNode) ||
                void 0 === o ||
                o.addEventListener("click", function () {
                  var t = this.closest(".m-table-component");
                  e.detach(this);
                  var n = document.createElement("textarea");
                  (n.value =
                    '<div class="m-table-component">' + t.outerHTML + "</div>"),
                    t.appendChild(this),
                    document.body.appendChild(n),
                    n.select(),
                    document.execCommand("copy"),
                    document.body.removeChild(n);
                });
          }, 500);
        }),
        (e.prototype.detach = function (e) {
          return e.parentElement.removeChild(e);
        }),
        e
      );
    })()),
      document
        .querySelectorAll('[data-js-component="m-table-component"]')
        .forEach(function (e) {
          new n(e);
        });
  },
});