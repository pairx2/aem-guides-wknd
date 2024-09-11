!(function (e) {
  function n(n) {
    for (
      var o, r, d = n[0], l = n[1], c = n[2], s = 0, u = [];
      s < d.length;
      s++
    )
      (r = d[s]),
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && u.push(a[r][0]),
        (a[r] = 0);
    for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
    for (p && p(n); u.length; ) u.shift()();
    return i.push.apply(i, c || []), t();
  }
  function t() {
    for (var e, n = 0; n < i.length; n++) {
      for (var t = i[n], o = !0, d = 1; d < t.length; d++) {
        var l = t[d];
        0 !== a[l] && (o = !1);
      }
      o && (i.splice(n--, 1), (e = r((r.s = t[0]))));
    }
    return e;
  }
  var o = {},
    a = { 9: 0 },
    i = [];
  function r(n) {
    if (o[n]) return o[n].exports;
    var t = (o[n] = { i: n, l: !1, exports: {} });
    return e[n].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
  }
  (r.m = e),
    (r.c = o),
    (r.d = function (e, n, t) {
      r.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: t });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, n) {
      if ((1 & n && (e = r(e)), 8 & n)) return e;
      if (4 & n && "object" == typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (r.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            t,
            o,
            function (n) {
              return e[n];
            }.bind(null, o)
          );
      return t;
    }),
    (r.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(n, "a", n), n;
    }),
    (r.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (r.p = "");
  var d = (window.webpackJsonp = window.webpackJsonp || []),
    l = d.push.bind(d);
  (d.push = n), (d = d.slice());
  for (var c = 0; c < d.length; c++) n(d[c]);
  var p = l;
  i.push([32, 0]), t();
})({
  32: function (e, n, t) {
    (function (e) {
      !(function () {
        "use strict";
        var n,
          t = "siteLeavingPopupFragmentPathModal";
        function o() {
          var t = e(this).closest(".popup"),
            o = t.data("external-link"),
            a = t.data("external-target");
          n.attr("href", o), n.attr("target", a);
        }
        function a() {
          var a = e(this),
            i = a.attr("data-target").substring(1),
            r = "#" + i,
            d = e("body"),
            l = a,
            c = d.find(r);
          if ((i == t && a.find("a").on("click", o), !(c.length > 0))) {
            i == t && (l = d.find("#site-leaving-popup-content"));
            var p = "";
            l.find(".popup-content")
              .find("section.container")
              .find("div.container__column")
              .each(function () {
                e(this).remove(), (p += e(this).html());
              });
            var s = l.find(".popup-content").html(),
              u = e.parseHTML(
                '<div class="modal generic-modal" tabindex="-1" role="dialog" id="' +
                  i +
                  '" data-js-component="pop-up"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content generic-modal__content"><div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div><div class="modal-body generic-modal__content-body">' +
                  s +
                  '</div><div class="modal-footer generic-modal__content-footer">' +
                  p +
                  "</div></div></div></div>"
              );
            l.find("img").length > 0 &&
              (e(u).addClass("generic-modal--image"),
              e(u).find("img").addClass("generic-modal__image-link"),
              e(u).find("img").parent().addClass("generic-modal__image"));
            var f = new Event("modal:content-updated");
            d.append(u),
              l.find(".popup-content").remove(),
              l.find(".popup-content-footer").remove(),
              document.dispatchEvent(f),
              i == t &&
                (d.find("#site-leaving-popup-content").remove(),
                (n = e("body")
                  .find("#siteLeavingPopupFragmentPathModal")
                  .find('[data-btn-type="continue"]')
                  .find("a")));
          }
        }
        e(document).ready(function () {
          e(".popup").each(a);
        });
      })();
    }.call(this, t(1)));
  },
});
