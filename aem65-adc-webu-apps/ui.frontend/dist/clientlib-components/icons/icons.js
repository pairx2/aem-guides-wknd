!(function (n) {
  function e(e) {
    for (
      var r, a, c = e[0], u = e[1], l = e[2], f = 0, p = [];
      f < c.length;
      f++
    )
      (a = c[f]),
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && p.push(o[a][0]),
        (o[a] = 0);
    for (r in u) Object.prototype.hasOwnProperty.call(u, r) && (n[r] = u[r]);
    for (s && s(e); p.length; ) p.shift()();
    return i.push.apply(i, l || []), t();
  }
  function t() {
    for (var n, e = 0; e < i.length; e++) {
      for (var t = i[e], r = !0, c = 1; c < t.length; c++) {
        var u = t[c];
        0 !== o[u] && (r = !1);
      }
      r && (i.splice(e--, 1), (n = a((a.s = t[0]))));
    }
    return n;
  }
  var r = {},
    o = { 33: 0, 25: 0 },
    i = [];
  function a(e) {
    if (r[e]) return r[e].exports;
    var t = (r[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, a), (t.l = !0), t.exports;
  }
  (a.m = n),
    (a.c = r),
    (a.d = function (n, e, t) {
      a.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: t });
    }),
    (a.r = function (n) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (a.t = function (n, e) {
      if ((1 & e && (n = a(n)), 8 & e)) return n;
      if (4 & e && "object" == typeof n && n && n.__esModule) return n;
      var t = Object.create(null);
      if (
        (a.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: n }),
        2 & e && "string" != typeof n)
      )
        for (var r in n)
          a.d(
            t,
            r,
            function (e) {
              return n[e];
            }.bind(null, r)
          );
      return t;
    }),
    (a.n = function (n) {
      var e =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return a.d(e, "a", e), e;
    }),
    (a.o = function (n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (a.p = "");
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    u = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var l = 0; l < c.length; l++) e(c[l]);
  var s = u;
  i.push([158, 0]), t();
})({
  158: function (n, e, t) {
    (function (n, e) {
      var t =
          (this && this.__awaiter) ||
          function (e, t, r, o) {
            return new (r || (r = n))(function (n, i) {
              function a(n) {
                try {
                  u(o.next(n));
                } catch (n) {
                  i(n);
                }
              }
              function c(n) {
                try {
                  u(o.throw(n));
                } catch (n) {
                  i(n);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? n(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (n) {
                          n(t);
                        })).then(a, c);
              }
              u((o = o.apply(e, t || [])).next());
            });
          },
        r =
          (this && this.__generator) ||
          function (n, e) {
            var t,
              r,
              o,
              i,
              a = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (i = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this;
                }),
              i
            );
            function c(i) {
              return function (c) {
                return (function (i) {
                  if (t) throw new TypeError("Generator is already executing.");
                  for (; a; )
                    try {
                      if (
                        ((t = 1),
                        r &&
                          (o =
                            2 & i[0]
                              ? r.return
                              : i[0]
                              ? r.throw || ((o = r.return) && o.call(r), 0)
                              : r.next) &&
                          !(o = o.call(r, i[1])).done)
                      )
                        return o;
                      switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                        case 0:
                        case 1:
                          o = i;
                          break;
                        case 4:
                          return a.label++, { value: i[1], done: !1 };
                        case 5:
                          a.label++, (r = i[1]), (i = [0]);
                          continue;
                        case 7:
                          (i = a.ops.pop()), a.trys.pop();
                          continue;
                        default:
                          if (
                            !((o = a.trys),
                            (o = o.length > 0 && o[o.length - 1]) ||
                              (6 !== i[0] && 2 !== i[0]))
                          ) {
                            a = 0;
                            continue;
                          }
                          if (
                            3 === i[0] &&
                            (!o || (i[1] > o[0] && i[1] < o[3]))
                          ) {
                            a.label = i[1];
                            break;
                          }
                          if (6 === i[0] && a.label < o[1]) {
                            (a.label = o[1]), (o = i);
                            break;
                          }
                          if (o && a.label < o[2]) {
                            (a.label = o[2]), a.ops.push(i);
                            break;
                          }
                          o[2] && a.ops.pop(), a.trys.pop();
                          continue;
                      }
                      i = e.call(n, a);
                    } catch (n) {
                      (i = [6, n]), (r = 0);
                    } finally {
                      t = o = 0;
                    }
                  if (5 & i[0]) throw i[1];
                  return { value: i[0] ? i[1] : void 0, done: !0 };
                })([i, c]);
              };
            }
          };
      e(function () {
        return t(this, void 0, void 0, function () {
          var n, e, t;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return (n = document.querySelector(
                  '[data-js-component="icons"]'
                ))
                  ? ((e = []),
                    [
                      4,
                      fetch("../../../public/resources/icons/selection.json"),
                    ])
                  : [2];
              case 1:
                return (t = r.sent()).ok ? [4, t.json()] : [3, 3];
              case 2:
                return (
                  r.sent().icons.map(function (n) {
                    e.push(
                      '\n        <div class="display-icon-wrap">\n          <div class="display-icon-column">\n            <span class="abt-icon-' +
                        n.properties.name +
                        '"></span>\n            <span class="mls">abt-icon-' +
                        n.properties.name +
                        "</span>\n          </div>\n        </div>\n      "
                    );
                  }),
                  (n.innerHTML = e.join("")),
                  [3, 4]
                );
              case 3:
                (n.innerHTML = "Unable to load the icons"), (r.label = 4);
              case 4:
                return [2];
            }
          });
        });
      });
    }.call(this, t(20), t(6)));
  },
  58: function (n, e) {},
});
