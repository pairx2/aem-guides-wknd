!(function (t) {
  function e(e) {
    for (
      var n, l, o = e[0], c = e[1], s = e[2], f = 0, p = [];
      f < o.length;
      f++
    )
      (l = o[f]),
        Object.prototype.hasOwnProperty.call(a, l) && a[l] && p.push(a[l][0]),
        (a[l] = 0);
    for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
    for (u && u(e); p.length; ) p.shift()();
    return r.push.apply(r, s || []), i();
  }
  function i() {
    for (var t, e = 0; e < r.length; e++) {
      for (var i = r[e], n = !0, o = 1; o < i.length; o++) {
        var c = i[o];
        0 !== a[c] && (n = !1);
      }
      n && (r.splice(e--, 1), (t = l((l.s = i[0]))));
    }
    return t;
  }
  var n = {},
    a = { 2: 0 },
    r = [];
  function l(e) {
    if (n[e]) return n[e].exports;
    var i = (n[e] = { i: e, l: !1, exports: {} });
    return t[e].call(i.exports, i, i.exports, l), (i.l = !0), i.exports;
  }
  (l.m = t),
    (l.c = n),
    (l.d = function (t, e, i) {
      l.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (l.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (l.t = function (t, e) {
      if ((1 & e && (t = l(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (l.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          l.d(
            i,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return i;
    }),
    (l.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return l.d(e, "a", e), e;
    }),
    (l.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (l.p = "");
  var o = (window.webpackJsonp = window.webpackJsonp || []),
    c = o.push.bind(o);
  (o.push = e), (o = o.slice());
  for (var s = 0; s < o.length; s++) e(o[s]);
  var u = c;
  r.push([126, 0]), i();
})({
  126: function (t, e, i) {
    "use strict";
    i.r(e),
      function (t) {
        i(96);
        var e = (function () {
          function e(e) {
            var i;
            (this.filterList = []),
              (this.callbackList = {}),
              (this.container = e),
              (this.$container = t(e)),
              (this.onElementClickFn =
                null ===
                  (i = this.container.querySelector(
                    'input[name="functionToCall"]'
                  )) || void 0 === i
                  ? void 0
                  : i.getAttribute("value")),
              (this.filterList = JSON.parse(e.dataset.manualData)),
              (this.listId = e.getAttribute("id")),
              this.setAbstractListCallbacks(),
              this.setCallbackBucket(this.listId),
              this.filterList.length && this.updateListDOM();
          }
          return (
            (e.prototype.setAbstractListCallbacks = function () {
              window.abstractListCallbacks = window.abstractListCallbacks || {};
              var t = this.listId;
              if (t) {
                window.abstractListCallbacks[t] ||
                  (window.abstractListCallbacks[t] = {});
                var e = window.abstractListCallbacks[t];
                this.onElementClickFn &&
                  (e.onElementClick = this.onElementClickFn);
              }
            }),
            (e.prototype.setCallbackBucket = function (t) {
              if (t) {
                var e = window.abstractListCallbacks;
                this.callbackList = e[t];
              }
            }),
            (e.prototype.isFunction = function (t) {
              return t && "function" == typeof t;
            }),
            (e.prototype.updateActiveFilterTitle = function (t) {
              var e = this.container.querySelector(".abstractlist-activeItem");
              if (e) {
                var i = t.target;
                this.activeItem && this.activeItem.classList.remove("active"),
                  i.classList.add("active"),
                  (e.innerHTML = i.dataset.title),
                  (this.activeItem = i);
              }
            }),
            (e.prototype.onElementClick = function (t) {
              this.updateActiveFilterTitle(t);
              var e = window[this.callbackList.onElementClick];
              this.isFunction(e) && e(t);
            }),
            (e.prototype.updateListDOM = function () {
              var e = this,
                i = this.$container.find(".abstractlist-item-list"),
                n = new URLSearchParams(window.location.search).get("category");
              i.length &&
                this.filterList.forEach(function (a) {
                  var r = a.title,
                    l = a.value,
                    o = t(
                      '<a href="javascript:void(0);" class="abstractlist-item-link" data-value="' +
                        l +
                        '" data-title="' +
                        r +
                        '">\n                ' +
                        r +
                        " </a>"
                    ),
                    c = t('<li class="abstractlist-item"></li>').append(o);
                  window[e.callbackList.onElementClick] &&
                    o.on("click", function (t) {
                      e.onElementClick(t);
                    }),
                    n === l && o.trigger("click"),
                    t(i).append(c);
                });
            }),
            e
          );
        })();
        t(function () {
          document
            .querySelectorAll('[data-js-component="abstract-list"]')
            .forEach(function (t) {
              new e(t);
            });
        });
      }.call(this, i(6));
  },
});