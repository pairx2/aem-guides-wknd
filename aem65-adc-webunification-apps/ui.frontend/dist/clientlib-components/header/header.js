!(function (t) {
  function e(e) {
    for (
      var n, r, a = e[0], c = e[1], l = e[2], d = 0, p = [];
      d < a.length;
      d++
    )
      (r = a[d]),
        Object.prototype.hasOwnProperty.call(o, r) && o[r] && p.push(o[r][0]),
        (o[r] = 0);
    for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
    for (h && h(e); p.length; ) p.shift()();
    return s.push.apply(s, l || []), i();
  }
  function i() {
    for (var t, e = 0; e < s.length; e++) {
      for (var i = s[e], n = !0, a = 1; a < i.length; a++) {
        var c = i[a];
        0 !== o[c] && (n = !1);
      }
      n && (s.splice(e--, 1), (t = r((r.s = i[0]))));
    }
    return t;
  }
  var n = {},
    o = { 4: 0 },
    s = [];
  function r(e) {
    if (n[e]) return n[e].exports;
    var i = (n[e] = { i: e, l: !1, exports: {} });
    return t[e].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  (r.m = t),
    (r.c = n),
    (r.d = function (t, e, i) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          r.d(
            i,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return i;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = "");
  var a = (window.webpackJsonp = window.webpackJsonp || []),
    c = a.push.bind(a);
  (a.push = e), (a = a.slice());
  for (var l = 0; l < a.length; l++) e(a[l]);
  var h = c;
  s.push([23, 0]), i();
})({
  23: function (t, e, i) {
    (function (t) {
      var e, i, n, o, s, r, a;
      (e = { mounted: "header.mounted" }),
        (i = "data-position"),
        (n = "sticky"),
        (o = "open"),
        (r = {
          self: '[data-js-component="header"]',
          headerSection: ".header-section",
          stickySection: '[data-sticky="true"]',
          searchBar: ".search",
          searchInput: ".search__input",
          searchPlaceholderClass: "search__input-placeholder",
          searchClose: '[data-search-close="close"]',
          searchOverlay: "." + (s = "search__overlay"),
          navbar: '[data-js-component="mega-menu"]',
          navbarToggle: ".navbar-toggler",
          navbarDropdown: ".navbar-collapse",
          linkStack: ".link-stack.link-stack--dropdown",
          linkStackToggle: ".link-stack__link",
          linkStackDropdown: ".link-stack__dropdown-wrapper",
          stickySectionPlaceHolder: ".header-global__placeholder",
          megamenu: ".megamenu",
          headerUtilityBottomRight:
            ".header_utility-bottom--right > .header-group",
          headerUtilityBottomLeft:
            ".header_utility-bottom--left > .header-group",
        }),
        (a = (function () {
          function a(i) {
            (this.$ele = t(i)),
              (this._isStickyClassAdded = !1),
              (this.$stickySection = this.$ele.find(r.stickySection)),
              (this.$searchBars = this.$ele.find(r.searchBar)),
              (this.$navbars = this.$ele.find(r.navbar)),
              (this.$linkStacks = this.$ele.find(r.linkStack)),
              (this.$megamenu = this.$ele.find(r.megamenu).get(0)),
              (this.$headerBottomRight = this.$ele
                .find(r.headerUtilityBottomRight)
                .get(0)),
              (this.$headerBottomLeft = this.$ele
                .find(r.headerUtilityBottomLeft)
                .get(0)),
              (this._isSticky = this.$stickySection.length > 0),
              (this.screenWidth = 0),
              this.initializeSearch(),
              this.initializeNavbars(),
              this.initializeLinkStacks(),
              this.initializeMegamenuOnMobile(),
              this._isSticky && this.initializeStickyHeader(),
              this.$searchBars.on("click", this.onSearchClick.bind(this)),
              window.addEventListener("scroll", this.onScroll.bind(this)),
              window.addEventListener("resize", this.onResize.bind(this)),
              window.addEventListener("click", this.onClick.bind(this)),
              window.addEventListener(
                "resize",
                this.initializeMegamenuOnMobile.bind(this)
              ),
              window.dispatchEvent(
                new CustomEvent(e.mounted, { detail: this })
              );
          }
          return (
            (a.prototype.initializeMegamenuOnMobile = function () {
              (this.screenWidth = window.innerWidth),
                this.screenWidth <= 991
                  ? (this.$headerBottomRight.append(this.$megamenu),
                    (this.$headerBottomLeft.style.margin = "0"))
                  : this.$headerBottomLeft.append(this.$megamenu);
            }),
            (a.prototype.initializeStickyHeader = function () {
              this._calculateStickyTopOffset(), this._checkSticky();
            }),
            (a.prototype.initializeSearch = function () {
              this.$searchBars.each(function (e, i) {
                var n = t(i);
                if (0 === n.find(r.searchOverlay).length) {
                  var o = n.find(r.searchInput),
                    a = t("<div>", { class: s });
                  o.is("[placeholder]") &&
                    t("<span></span>")
                      .text(o.attr("placeholder"))
                      .addClass(r.searchPlaceholderClass)
                      .insertAfter(o),
                    n.append(a);
                }
              });
            }),
            (a.prototype.initializeNavbars = function () {
              var e = this;
              this.$navbars.each(function (n, o) {
                var s = t(o),
                  a = s.find(r.navbarToggle);
                if (0 !== a.length) {
                  var c = s.find(r.navbarDropdown);
                  a.on("click", function () {
                    if (!c.is(":hidden")) {
                      var t = e._calculateDropdownProperties(a),
                        n = t.position,
                        o = t.width,
                        s = t.toggleWidth;
                      c.attr(i, n), c.width(o - s);
                    }
                  });
                }
              });
            }),
            (a.prototype.initializeLinkStacks = function () {
              var e = this;
              this.$linkStacks.each(function (n, o) {
                var s = t(o),
                  a = s.find(r.linkStackToggle),
                  c = s.find(r.linkStackDropdown);
                a.on("click", function () {
                  if (!c.is(":hidden")) {
                    var t = e._calculateDropdownProperties(a),
                      n = t.position,
                      o = t.width;
                    c.attr(i, n), c.css("maxWidth", o);
                  }
                });
              });
            }),
            (a.prototype.onSearchClick = function (e) {
              e.preventDefault();
              var i = t(e.target),
                n = i.closest(r.searchBar);
              this._isSearchCloseToggle(i)
                ? this._closeSearch(n)
                : this._openSearch(n);
            }),
            (a.prototype.onResize = function () {
              this.$ele.find(r.navbarDropdown).width("");
            }),
            (a.prototype.onScroll = function () {
              this._isSticky && this._checkSticky();
            }),
            (a.prototype.onClick = function () {
              this._isSticky && this._calculateStickyTopOffset();
            }),
            (a.prototype._checkSticky = function () {
              var t,
                e,
                i,
                o,
                s,
                a,
                c = window.scrollY;
              if (c > this._stickyTopOffset && !this._isStickyClassAdded) {
                this._isStickyClassAdded = !0;
                var l =
                  null !==
                    (e =
                      null === (t = this.$stickySection) || void 0 === t
                        ? void 0
                        : t.outerHeight()) && void 0 !== e
                    ? e
                    : 0;
                null ===
                  (o =
                    null === (i = this.$stickySection) || void 0 === i
                      ? void 0
                      : i.siblings(r.stickySectionPlaceHolder)) ||
                  void 0 === o ||
                  o.css("height", l + "px"),
                  this.$stickySection.addClass(n);
              } else
                (c < this._stickyTopOffset || c === this._stickyTopOffset) &&
                  this._isStickyClassAdded &&
                  (null ===
                    (a =
                      null === (s = this.$stickySection) || void 0 === s
                        ? void 0
                        : s.siblings(r.stickySectionPlaceHolder)) ||
                    void 0 === a ||
                    a.css("height", "0px"),
                  this.$stickySection.removeClass(n),
                  (this._isStickyClassAdded = !1));
            }),
            (a.prototype._openSearch = function (e) {
              e.addClass(o),
                e.find(r.searchOverlay).show(),
                e.find(r.searchInput).trigger("focus"),
                t("body").css("overflow-y", "hidden");
            }),
            (a.prototype._closeSearch = function (e) {
              e.removeClass(o),
                e.find(r.searchOverlay).hide(),
                t("body").css("overflow-y", "");
            }),
            (a.prototype._calculateStickyTopOffset = function () {
              this._stickyTopOffset = this.$ele.offset().top;
            }),
            (a.prototype._calculateDropdownProperties = function (t) {
              var e = t.closest(r.headerSection),
                i = e.outerWidth(),
                n = t.outerWidth(),
                o = t.offset().left - e.offset().left,
                s = Math.abs(i - (n + o)),
                a = o > s ? "left" : "right";
              return {
                position: a,
                width: i - ("left" === a ? s : o),
                toggleWidth: n,
              };
            }),
            (a.prototype._isSearchCloseToggle = function (t) {
              return (
                t.closest(r.searchClose).length > 0 || t.is(r.searchOverlay)
              );
            }),
            a
          );
        })()),
        t(function () {
          t(r.self).each(function (t, e) {
            new a(e);
          });
        });
    }.call(this, i(1)));
  },
});
