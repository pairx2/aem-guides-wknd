!(function (t) {
  function i(i) {
    for (
      var n, a, r = i[0], c = i[1], l = i[2], d = 0, u = [];
      d < r.length;
      d++
    )
      (a = r[d]),
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && u.push(o[a][0]),
        (o[a] = 0);
    for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
    for (h && h(i); u.length; ) u.shift()();
    return s.push.apply(s, l || []), e();
  }
  function e() {
    for (var t, i = 0; i < s.length; i++) {
      for (var e = s[i], n = !0, r = 1; r < e.length; r++) {
        var c = e[r];
        0 !== o[c] && (n = !1);
      }
      n && (s.splice(i--, 1), (t = a((a.s = e[0]))));
    }
    return t;
  }
  var n = {},
    o = { 27: 0 },
    s = [];
  function a(i) {
    if (n[i]) return n[i].exports;
    var e = (n[i] = { i: i, l: !1, exports: {} });
    return t[i].call(e.exports, e, e.exports, a), (e.l = !0), e.exports;
  }
  (a.m = t),
    (a.c = n),
    (a.d = function (t, i, e) {
      a.o(t, i) || Object.defineProperty(t, i, { enumerable: !0, get: e });
    }),
    (a.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (a.t = function (t, i) {
      if ((1 & i && (t = a(t)), 8 & i)) return t;
      if (4 & i && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (a.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & i && "string" != typeof t)
      )
        for (var n in t)
          a.d(
            e,
            n,
            function (i) {
              return t[i];
            }.bind(null, n)
          );
      return e;
    }),
    (a.n = function (t) {
      var i =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return a.d(i, "a", i), i;
    }),
    (a.o = function (t, i) {
      return Object.prototype.hasOwnProperty.call(t, i);
    }),
    (a.p = "");
  var r = (window.webpackJsonp = window.webpackJsonp || []),
    c = r.push.bind(r);
  (r.push = i), (r = r.slice());
  for (var l = 0; l < r.length; l++) i(r[l]);
  var h = c;
  s.push([149, 0]), e();
})({
  149: function (t, i, e) {
    (function (t) {
      var i, e, n, o, s, a, r, c;
      (i = { mounted: "header-v2.mounted", logout: "header-v2.logout" }),
        (e = "data-position"),
        (n = "data-authenticated"),
        (o = "sticky"),
        (s = "open"),
        (r = {
          self: '[data-js-component="header-v2"]',
          headerSection: ".o-header-v2-section",
          stickySection: '[data-sticky="true"]',
          searchBar: ".a-search",
          searchInput: ".a-search__input",
          searchPlaceholderClass: "a-search__input-placeholder",
          searchClose: '[data-search-close="close"]',
          searchOverlay: "." + (a = "a-search__overlay"),
          navbar: '[data-js-component="mega-menu"]',
          navbarToggle: ".navbar-toggler",
          navbarDropdown: ".navbar-collapse",
          linkStack: ".m-link-stack.m-link-stack--dropdown",
          linkStackToggle: ".m-link-stack__link",
          linkStackDropdown: ".m-link-stack__dropdown-wrapper",
          logoutLink: '[href="#logout"], [name="logout"]',
          stickySectionPlaceHolder: ".o-header-v2-global__placeholder",
        }),
        (c = (function () {
          function c(e) {
            (this.authenticate = this.handleAuthentication.bind(this)),
              (this.$ele = t(e)),
              (this._isStickyClassAdded = !1),
              (this.$stickySection = this.$ele.find(r.stickySection)),
              (this.$searchBars = this.$ele.find(r.searchBar)),
              (this.$navbars = this.$ele.find(r.navbar)),
              (this.$linkStacks = this.$ele.find(r.linkStack)),
              (this.$logoutLinks = this.$ele.find(r.logoutLink)),
              (this._isSticky = this.$stickySection.length > 0),
              this.initializeSearch(),
              this.initializeNavbars(),
              this.initializeLinkStacks(),
              this._isSticky && this.initializeStickyHeader(),
              this.$logoutLinks.on("click", this.onLogoutClick.bind(this)),
              this.$searchBars.on("click", this.onSearchClick.bind(this)),
              window.addEventListener("scroll", this.onScroll.bind(this)),
              window.addEventListener("resize", this.onResize.bind(this)),
              window.addEventListener("click", this.onClick.bind(this)),
              window.dispatchEvent(
                new CustomEvent(i.mounted, { detail: this })
              );
          }
          return (
            (c.prototype.initializeStickyHeader = function () {
              this._calculateStickyTopOffset(), this._checkSticky();
            }),
            (c.prototype.initializeSearch = function () {
              this.$searchBars.each(function (i, e) {
                var n = t(e);
                if (0 === n.find(r.searchOverlay).length) {
                  var o = n.find(r.searchInput),
                    s = t("<div>", { class: a });
                  o.is("[placeholder]") &&
                    t("<span></span>")
                      .text(o.attr("placeholder"))
                      .addClass(r.searchPlaceholderClass)
                      .insertAfter(o),
                    n.append(s);
                }
              });
            }),
            (c.prototype.initializeNavbars = function () {
              var i = this;
              this.$navbars.each(function (n, o) {
                var s = t(o),
                  a = s.find(r.navbarToggle);
                if (0 !== a.length) {
                  var c = s.find(r.navbarDropdown);
                  a.on("click", function () {
                    if (!c.is(":hidden")) {
                      var t = i._calculateDropdownProperties(a),
                        n = t.position,
                        o = t.width,
                        s = t.toggleWidth;
                      c.attr(e, n), c.width(o - s);
                    }
                  });
                }
              });
            }),
            (c.prototype.initializeLinkStacks = function () {
              var i = this;
              this.$linkStacks.each(function (n, o) {
                var s = t(o),
                  a = s.find(r.linkStackToggle),
                  c = s.find(r.linkStackDropdown);
                a.on("click", function () {
                  if (!c.is(":hidden")) {
                    var t = i._calculateDropdownProperties(a),
                      n = t.position,
                      o = t.width;
                    c.attr(e, n), c.css("maxWidth", o);
                  }
                });
              });
            }),
            (c.prototype.handleAuthentication = function (t) {
              void 0 === t && (t = !1),
                t ? this.$ele.attr(n, "") : this.$ele.removeAttr(n),
                this.initializeNavbars(),
                this.initializeLinkStacks();
            }),
            (c.prototype.onSearchClick = function (i) {
              i.preventDefault();
              var e = t(i.target),
                n = e.closest(r.searchBar);
              this._isSearchCloseToggle(e)
                ? this._closeSearch(n)
                : this._openSearch(n);
            }),
            (c.prototype.onLogoutClick = function (t) {
              t.preventDefault(),
                this.authenticate(!1),
                window.dispatchEvent(
                  new CustomEvent(i.logout, { detail: this })
                );
            }),
            (c.prototype.onResize = function () {
              this.$ele.find(r.navbarDropdown).width("");
            }),
            (c.prototype.onScroll = function () {
              this._isSticky && this._checkSticky();
            }),
            (c.prototype.onClick = function () {
              this._isSticky && this._calculateStickyTopOffset();
            }),
            (c.prototype._checkSticky = function () {
              var t,
                i,
                e,
                n,
                s,
                a,
                c = window.scrollY;
              if (c > this._stickyTopOffset && !this._isStickyClassAdded) {
                this._isStickyClassAdded = !0;
                var l =
                  null !==
                    (i =
                      null === (t = this.$stickySection) || void 0 === t
                        ? void 0
                        : t.outerHeight()) && void 0 !== i
                    ? i
                    : 0;
                null ===
                  (n =
                    null === (e = this.$stickySection) || void 0 === e
                      ? void 0
                      : e.siblings(r.stickySectionPlaceHolder)) ||
                  void 0 === n ||
                  n.css("height", l + "px"),
                  this.$stickySection.addClass(o);
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
                  this.$stickySection.removeClass(o),
                  (this._isStickyClassAdded = !1));
            }),
            (c.prototype._openSearch = function (i) {
              i.addClass(s),
                i.find(r.searchOverlay).show(),
                i.find(r.searchInput).trigger("focus"),
                t("body").css("overflow-y", "hidden");
            }),
            (c.prototype._closeSearch = function (i) {
              i.removeClass(s),
                i.find(r.searchOverlay).hide(),
                t("body").css("overflow-y", "");
            }),
            (c.prototype._calculateStickyTopOffset = function () {
              this._stickyTopOffset = this.$ele.offset().top;
            }),
            (c.prototype._calculateDropdownProperties = function (t) {
              var i = t.closest(r.headerSection),
                e = i.outerWidth(),
                n = t.outerWidth(),
                o = t.offset().left - i.offset().left,
                s = Math.abs(e - (n + o)),
                a = o > s ? "left" : "right";
              return {
                position: a,
                width: e - ("left" === a ? s : o),
                toggleWidth: n,
              };
            }),
            (c.prototype._isSearchCloseToggle = function (t) {
              return (
                t.closest(r.searchClose).length > 0 || t.is(r.searchOverlay)
              );
            }),
            c
          );
        })()),
        t(function () {
          t(r.self).each(function (t, i) {
            new c(i);
          });
        });
    }.call(this, e(6)));
  },
});
