!(function (e) {
  function t(t) {
    for (
      var i, s, n = t[0], o = t[1], c = t[2], d = 0, h = [];
      d < n.length;
      d++
    )
      (s = n[d]),
        Object.prototype.hasOwnProperty.call(a, s) && a[s] && h.push(a[s][0]),
        (a[s] = 0);
    for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
    for (u && u(t); h.length; ) h.shift()();
    return l.push.apply(l, c || []), r();
  }
  function r() {
    for (var e, t = 0; t < l.length; t++) {
      for (var r = l[t], i = !0, n = 1; n < r.length; n++) {
        var o = r[n];
        0 !== a[o] && (i = !1);
      }
      i && (l.splice(t--, 1), (e = s((s.s = r[0]))));
    }
    return e;
  }
  var i = {},
    a = { 56: 0, 54: 0, 60: 0 },
    l = [];
  function s(t) {
    if (i[t]) return i[t].exports;
    var r = (i[t] = { i: t, l: !1, exports: {} });
    return e[t].call(r.exports, r, r.exports, s), (r.l = !0), r.exports;
  }
  (s.m = e),
    (s.c = i),
    (s.d = function (e, t, r) {
      s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (s.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (s.t = function (e, t) {
      if ((1 & t && (e = s(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (s.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          s.d(
            r,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (s.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return s.d(t, "a", t), t;
    }),
    (s.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (s.p = "");
  var n = (window.webpackJsonp = window.webpackJsonp || []),
    o = n.push.bind(n);
  (n.push = t), (n = n.slice());
  for (var c = 0; c < n.length; c++) t(n[c]);
  var u = o;
  l.push([155, 0, 1]), r();
})({
  155: function (e, t, r) {
    "use strict";
    r.r(t),
      function (e) {
        var t = r(40),
          i = r(12);
        !(function () {
          var r = (function () {
            function r(t) {
              var r;
              if (
                ((this.facetEle = []),
                (this.currentPage = 1),
                (this.filters = {}),
                (this.searchReqFilters = []),
                (this.sort = []),
                (this.selectedFacet = {}),
                (this.selectedHierarchialFacet = {}),
                (this.filteredResultsArr = []),
                (this.brightcoveVideoModalLinkEle = []),
                (this.filteredTagEle = []),
                (this.sortByOrder = "best-match"),
                (this.categoryTagFacetsStr = "categorytagfacets"),
                !t)
              )
                throw new Error("Search result container element is required");
              (this.container = t),
                (this.resultsCountEle = t.querySelector(
                  ".o-search-res__count"
                )),
                (this.templateEle = t.querySelector("#result-temp")),
                (this.featuresCardFaq = t.querySelector(
                  ".o-features-card-faq"
                )),
                (this.resultsContainer = t.querySelector(
                  ".o-search-res__container"
                )),
                (this.resultsEle = t.querySelector(
                  ".o-search-res__results--view"
                )),
                (this.facetEle = t.querySelectorAll(".js-faq-links")),
                (this.api = t.dataset.apiUrl),
                (this.pageSize = +t.dataset.pageSize),
                (this.searchType = t.dataset.searchType),
                (this.searchFilters = t.dataset.searchFilters),
                (this.sort = t.dataset.sortFilters
                  ? t.dataset.sortFilters
                  : []),
                (this.resultCount = e("#resultCount").data("result")),
                (this.paginationString = this.resultCount),
                (this.crossIcon = e("#crossIcon").data("icon")),
                (this.brightcoveVideoPopupCloseEle = t.querySelector(
                  ".brightcove-video-modal .abt-icon-cancel"
                )),
                (this.sortEle = t.querySelectorAll(".sort-dropdown-item")),
                (this.searchIconEle = t.querySelector(
                  ".search-filter .abt-icon-search"
                )),
                (this.categoryLimit = 3),
                (this.searchField = t.querySelector("#search-filter")),
                (this.brightcoveVideoPopupEle = t.querySelector(
                  "video.brightcove-video"
                )),
                (this.clearAllFiltersEle = t.querySelector("#clearAllFilters")),
                this.stickyTarget,
                this.selectedStickyTopic,
                this.attachEvent(),
                this.fetchSearchResults(),
                this.initPagination(),
                (this.isTagSearchFacet =
                  "true" ===
                  (null === (r = t.querySelector("#is-tag-search-facet")) ||
                  void 0 === r
                    ? void 0
                    : r.getAttribute("value"))),
                (this.count = 0);
            }
            return (
              (r.prototype.loadSelFilters = function (t, r) {
                var i = r,
                  a = r.container.querySelector(
                    ".m-link-stack--dropdown-value"
                  ),
                  l = document
                    .getElementById(t)
                    .closest(".faq-link")
                    .querySelector("[aria-label]"),
                  s = l.getAttribute("aria-label"),
                  n = l.innerHTML,
                  o = l.classList.contains("a-link__text--active"),
                  c = r.container.querySelector(".filter"),
                  u = r.container.querySelectorAll(".rounded-pill"),
                  d = document.createElement("button");
                if (
                  ((d.type = "button"),
                  d.classList.add("btn", "border", "rounded-pill"),
                  (d.innerHTML = s + "<em class='" + r.crossIcon + "'></em>"),
                  o
                    ? (l.classList.remove("a-link__text--active"),
                      u.forEach(function (e) {
                        e.innerText === s && e.remove();
                      }))
                    : (l.classList.add("a-link__text--active"),
                      c.appendChild(d)),
                  r.selectedFacet.value !== s &&
                    ((r.selectedFacet.fieldName = l.dataset.fieldName),
                    (r.selectedFacet.value = s),
                    (r.selectedFacetEle = l),
                    (a.innerHTML = n)),
                  (r.currentPage = 1),
                  s)
                )
                  if (r.filters.hasOwnProperty(r.selectedFacet.fieldName))
                    r.filters[r.selectedFacet.fieldName].includes(s)
                      ? (r.filters[r.selectedFacet.fieldName].splice(
                          r.filters[r.selectedFacet.fieldName].indexOf(s),
                          1
                        ),
                        0 == r.filters[r.selectedFacet.fieldName].length &&
                          delete r.filters[r.selectedFacet.fieldName])
                      : r.filters[r.selectedFacet.fieldName].push(s);
                  else {
                    var h = [];
                    h.push(s), (r.filters[r.selectedFacet.fieldName] = h);
                  }
                var p = JSON.parse(sessionStorage.getItem("searchResult"))
                  .response.results;
                (r.filteredResultsArr = r.filterSearchResults(p)),
                  e("#paginationResultTop").empty();
                var f = r.paginationString;
                (f = f.replace(
                  "{count}",
                  JSON.stringify(r.filteredResultsArr.length)
                )),
                  e("#paginationResultTop").append("<span>" + f + "</span>"),
                  (r.filteredTagEle = r.container.querySelectorAll(
                    ".rounded-pill"
                  )),
                  r.filteredTagEle.forEach(function (e) {
                    var t;
                    null === (t = e.querySelector("em")) ||
                      void 0 === t ||
                      t.addEventListener("click", i.onRoundPillClick.bind(i));
                  });
                p = JSON.parse(JSON.stringify(r.filteredResultsArr));
                if (null !== sessionStorage.getItem("SortByOrder"))
                  var y = sessionStorage.getItem("SortByOrder");
                (p = r.getSortedResults(p, "title", y)),
                  r.renderResults(p, p.length);
              }),
              (r.prototype.getCategoryData = function () {
                var e = [],
                  t = {};
                Object.defineProperties(t, {
                  primary: { value: "", writable: !0, enumerable: !0 },
                  value: { value: "", writable: !0, enumerable: !0 },
                  fieldName: { value: "", writable: !0, enumerable: !0 },
                  numberOfResults: { value: "", writable: !0, enumerable: !0 },
                });
                for (
                  var r = this.container.querySelectorAll(".a-checkbox"), i = 0;
                  i < r.length;
                  i++
                )
                  r[i].hasAttribute("aria-label") &&
                    (r[i].closest('[data-is-primary="true"]')
                      ? ((t.primary = "true"),
                        (t.fieldName = r[i].getAttribute("data-field-name")),
                        (t.value = r[i].getAttribute("aria-label")),
                        (t.numberOfResults = this.container
                          .querySelectorAll(".a-checkbox__text span")
                          [i].lastChild.data.replace(/[()]/g, "")))
                      : r[i].closest('[data-is-secondary="true"]') &&
                        ((t.secondary = "true"),
                        (t.fieldName = r[i].getAttribute("data-field-name")),
                        (t.value = r[i].getAttribute("aria-label")),
                        (t.numberOfResults = this.container
                          .querySelectorAll(".a-checkbox__text span")
                          [i].lastChild.data.replace(/[()]/g, ""))),
                    e.push(t),
                    (t = {}));
                sessionStorage.setItem("ValContainer", JSON.stringify(e));
              }),
              (r.prototype.updatePrimaryActive = function (e) {
                if (
                  null !== sessionStorage.getItem("FilterArray") &&
                  null !== sessionStorage.getItem("ValContainer")
                ) {
                  var t = JSON.parse(sessionStorage.getItem("ValContainer")),
                    r = JSON.parse(sessionStorage.getItem("FilterArray"));
                  (e.count = 0),
                    Object.keys(t).reduce(function (i, a) {
                      return (
                        "true" === t[a].primary &&
                          r.includes(t[a].value) &&
                          (e.count = e.count + 1),
                        i
                      );
                    }, {});
                } else
                  null === sessionStorage.getItem("FilterArray") &&
                    null !== sessionStorage.getItem("ValContainer") &&
                    (e.count = 0);
              }),
              (r.prototype.checkSelFilterArr = function (e) {
                var t,
                  r = [];
                (Storage.prototype.setObj = function (e, t) {
                  return this.setItem(e, JSON.stringify(t));
                }),
                  (Storage.prototype.getObj = function (e) {
                    return JSON.parse(this.getItem(e));
                  }),
                  null !== sessionStorage.getItem("FilterArray")
                    ? (r = sessionStorage.getObj("FilterArray")).length > 0 &&
                      ((t = r.indexOf(e)) >= 0
                        ? (r.splice(t, 1),
                          sessionStorage.setObj("FilterArray", r),
                          0 === r.length &&
                            sessionStorage.removeItem("FilterArray"),
                          this.updatePrimaryActive(this),
                          0 === this.count &&
                            this.container
                              .querySelectorAll('[data-is-primary="true"]')
                              .forEach(function (e) {
                                null == e ||
                                  e.classList.remove("primaryActive");
                              }))
                        : (r.push(e),
                          sessionStorage.setObj("FilterArray", r),
                          this.updatePrimaryActive(this),
                          this.count >= 1 &&
                            this.container
                              .querySelectorAll('[data-is-primary="true"]')
                              .forEach(function (e) {
                                null == e || e.classList.add("primaryActive");
                              })))
                    : (r.push(e),
                      sessionStorage.setObj("FilterArray", r),
                      this.updatePrimaryActive(this),
                      this.count >= 1 &&
                        this.container
                          .querySelectorAll('[data-is-primary="true"]')
                          .forEach(function (e) {
                            null == e || e.classList.add("primaryActive");
                          }));
              }),
              (r.prototype.initPagination = function () {
                var e = this.container.querySelector(".a-pagination");
                if (
                  ((this.pagination = new t.Pagination(e)),
                  this.pagination.onPageClick(this.onPageClick.bind(this)),
                  (this.currentPage = this.pagination.getCurrentPage()),
                  document.querySelector(".sticky-menu__filter"))
                ) {
                  var r = document.querySelectorAll(".stickyMenu .faq-link");
                  r[r.length - 1]
                    .querySelector(".a-link__text")
                    .classList.add("a-link__text--active");
                  var i = window.location.hash.substring(1);
                  document
                    .querySelector(".sticky-menu__filter")
                    .querySelectorAll(".stickyMenu .faq-link .a-link__text")
                    .forEach(function (e) {
                      e.getAttribute("aria-label").toLowerCase() == i &&
                        e.click();
                    });
                }
              }),
              (r.prototype.onPageClick = function (e) {
                if (
                  (this.currentPage,
                  (this.currentPage = +e),
                  sessionStorage.getItem("searchResult"))
                )
                  if (this.filteredResultsArr.length > 0) {
                    var t = JSON.parse(JSON.stringify(this.filteredResultsArr));
                    (t = this.getSortedResults(t, "title", this.sortByOrder)),
                      this.renderResults(t, t.length, this.currentPage);
                  } else {
                    t = JSON.parse(sessionStorage.getItem("searchResult"))
                      .response.results;
                    (t = this.getSortedResults(t, "title", this.sortByOrder)),
                      this.renderResults(t, t.length, this.currentPage);
                  }
              }),
              (r.prototype.getRequestHeaders = function () {
                return i.a.getPageParamsForHeader();
              }),
              (r.prototype.getRequestBody = function () {
                var e = {};
                return (
                  isNaN(this.pageSize) && (this.pageSize = 10),
                  ((e = i.a.getPageParamsForBody()).firstresult =
                    (this.currentPage - 1) * this.pageSize + 1),
                  (e.q = ""),
                  (null === this.searchContentCategory &&
                    void 0 === this.searchContentCategory) ||
                    (this.searchReqFilters = JSON.parse(this.searchFilters)),
                  (e.filters = this.searchReqFilters),
                  (e.autocorrect = "true"),
                  (e.searchtype = this.searchType),
                  (e.sort = JSON.parse(this.sort)),
                  JSON.stringify(e)
                );
              }),
              (r.prototype.fetchSearchResults = function (e) {
                void 0 === e && (e = 1),
                  i.a.showSpinner(this.container),
                  fetch(this.api, {
                    method: "post",
                    headers: this.getRequestHeaders(),
                    body: this.getRequestBody(),
                  })
                    .then(function (e) {
                      return e.json();
                    })
                    .then(
                      function (e) {
                        var t,
                          r = this;
                        if (0 === e.errorCode) {
                          sessionStorage.setItem(
                            "searchResult",
                            JSON.stringify(e)
                          );
                          var a = e.response;
                          if (
                            this.container.querySelectorAll(
                              '[data-is-primary="true"]'
                            ).length > 0 ||
                            this.container.querySelectorAll(
                              '[data-is-secondary="true"]'
                            ).length > 0
                          )
                            for (
                              var l = [], s = 0;
                              s < a.categoryFacets.length;
                              s++
                            )
                              l.push(a.categoryFacets[s].field),
                                sessionStorage.setItem(
                                  "CategoryLabels",
                                  JSON.stringify(l)
                                );
                          if (
                            (this.viewAllCategoryOption(a),
                            null !== sessionStorage.getItem("SortByOrder")
                              ? (this.sortByOrder = sessionStorage.getItem(
                                  "SortByOrder"
                                ))
                              : (this.sortByOrder = this.container.dataset.sortByOrder),
                            this.sortEle.forEach(function (e) {
                              (null == e ? void 0 : e.dataset.sortByOrder) ===
                                r.sortByOrder && e.click();
                            }),
                            a.categoryFacets &&
                              a.categoryFacets.length > 0 &&
                              this.renderCategories(a.categoryFacets),
                            a.results && a.results.length > 0)
                          ) {
                            this.container
                              .querySelector(".search-results-container")
                              .removeAttribute("hidden");
                            var n = [];
                            (Storage.prototype.setObj = function (e, t) {
                              return this.setItem(e, JSON.stringify(t));
                            }),
                              (Storage.prototype.getObj = function (e) {
                                return JSON.parse(this.getItem(e));
                              }),
                              null !== sessionStorage.getItem("FilterArray") &&
                                ((n = sessionStorage.getObj("FilterArray")),
                                this.updatePrimaryActive(this),
                                0 === this.count
                                  ? this.container
                                      .querySelectorAll(
                                        '[data-is-primary="true"]'
                                      )
                                      .forEach(function (e) {
                                        null == e ||
                                          e.classList.remove("primaryActive");
                                      })
                                  : this.container
                                      .querySelectorAll(
                                        '[data-is-primary="true"]'
                                      )
                                      .forEach(function (e) {
                                        null == e ||
                                          e.classList.add("primaryActive");
                                      }),
                                n.forEach(function (e) {
                                  return r.loadSelFilters(e, r);
                                })),
                              this.container
                                .querySelector(".search-facet-container")
                                .removeAttribute("hidden"),
                              this.container
                                .querySelector(".a-pagination")
                                .removeAttribute("hidden");
                          }
                          this.getSearchQueryString(),
                            "" !== this.searchStr &&
                              (null === (t = this.searchIconEle) ||
                                void 0 === t ||
                                t.dispatchEvent(new MouseEvent("click"))),
                            i.a.hideSpinner();
                        } else this.renderNoResults();
                      }.bind(this)
                    )
                    .catch(
                      function (e) {
                        console.log(e), this.renderNoResults();
                      }.bind(this)
                    )
                    .finally(
                      function () {
                        i.a.hideSpinner();
                      }.bind(this)
                    );
              }),
              (r.prototype.renderResults = function (t, r, a) {
                var l = this;
                void 0 === a && (a = 1);
                var s = [];
                isNaN(this.pageSize) && (this.pageSize = 10),
                  (this.container.querySelector(
                    ".o-search-res__no-results"
                  ).style.display = "none");
                var n = Math.ceil(r / this.pageSize),
                  o = (a - 1) * this.pageSize + 1;
                n < 1 && ((o = (a - 1) * this.pageSize), (n = 1));
                var c = a * this.pageSize;
                c > r && (c = r);
                var u = t.slice((a - 1) * this.pageSize, a * this.pageSize);
                e("#paginationResultTop").empty();
                var d = this.paginationString;
                (d = (d = d.replace("{page}", o + "-" + c)).replace(
                  "{count}",
                  r
                )),
                  e("#paginationResultTop").append("<span>" + d + "</span>"),
                  e("#stickyFilterCount").empty(),
                  e("#stickyFilterCount").append("<span>" + d + "</span>"),
                  u.forEach(
                    function (e) {
                      var t,
                        r,
                        i,
                        a,
                        l,
                        n,
                        o,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f,
                        y,
                        g,
                        v,
                        m,
                        S,
                        b,
                        k,
                        q = this.templateEle.content
                          .cloneNode(!0)
                          .querySelector(".result-items");
                      "video" === e.uriextensiontype
                        ? (null ===
                            (t = q.querySelector(".a-card-result__link")) ||
                            void 0 === t ||
                            t.remove(),
                          null ===
                            (r = q.querySelector(".a-list-result__link")) ||
                            void 0 === r ||
                            r.remove(),
                          null ===
                            (i = q.querySelector(".a-link.external-link")) ||
                            void 0 === i ||
                            i.remove())
                        : "externalLink" === e.uriextensiontype
                        ? (null ===
                            (a = q.querySelector(".brightcove-video-link")) ||
                            void 0 === a ||
                            a.remove(),
                          null ===
                            (l = q.querySelector(".a-card-result__link")) ||
                            void 0 === l ||
                            l.remove(),
                          null ===
                            (n = q.querySelector(".a-list-result__link")) ||
                            void 0 === n ||
                            n.remove())
                        : ("clinical-resources" === e.contenttype &&
                            (null ===
                              (o = q.querySelector(".a-result__link")) ||
                              void 0 === o ||
                              o.setAttribute(
                                "data-content-type",
                                "clinical-resources"
                              )),
                          null ===
                            (c = q.querySelector(".brightcove-video-link")) ||
                            void 0 === c ||
                            c.remove(),
                          null ===
                            (u = q.querySelector(".a-link.external-link")) ||
                            void 0 === u ||
                            u.remove()),
                        (null !== e.searchresultbuttonuri &&
                          void 0 !== e.searchresultbuttonuri) ||
                          (null === (d = q.querySelector(".a-result__link")) ||
                            void 0 === d ||
                            d.setAttribute(
                              "data-href",
                              null ===
                                (h = q.querySelector(".a-result__link")) ||
                                void 0 === h
                                ? void 0
                                : h.getAttribute("data-default-search-btn-link")
                            ),
                          null ===
                            (p = q.querySelector(
                              ".a-card-result__image-link"
                            )) ||
                            void 0 === p ||
                            p.setAttribute(
                              "data-href",
                              null ===
                                (f = q.querySelector(
                                  ".a-card-result__image-link"
                                )) || void 0 === f
                                ? void 0
                                : f.getAttribute("data-default-search-btn-link")
                            ),
                          null ===
                            (y = q.querySelector(".a-link.external-link a")) ||
                            void 0 === y ||
                            y.setAttribute(
                              "data-redirect-url",
                              null ===
                                (g = q.querySelector(
                                  ".a-link.external-link a"
                                )) || void 0 === g
                                ? void 0
                                : g.getAttribute("data-default-search-btn-link")
                            ));
                      var _ =
                          null === (v = q.querySelector(".a-result__link")) ||
                          void 0 === v
                            ? void 0
                            : v.innerHTML,
                        A = null == _ ? void 0 : _.replace(/\{|\}/g, "");
                      (null !== e[A] && void 0 !== e[A]) ||
                        (null === (m = q.querySelector(".a-result__link")) ||
                          void 0 === m ||
                          (m.innerHTML =
                            null === (S = q.querySelector(".a-result__link")) ||
                            void 0 === S
                              ? void 0
                              : S.getAttribute(
                                  "data-default-search-btn-label"
                                )),
                        null ===
                          (b = q.querySelector(".a-link.external-link a")) ||
                          void 0 === b ||
                          (b.innerHTML =
                            null ===
                              (k = q.querySelector(
                                ".a-link.external-link a"
                              )) || void 0 === k
                              ? void 0
                              : k.getAttribute(
                                  "data-default-search-btn-label"
                                )));
                      var L = q.outerHTML,
                        w = L.match(/\{(.*?)\}/gm);
                      Array.from(new Set(w)).forEach(function (t) {
                        var r = t.replace(/\{|\}/g, ""),
                          i = new RegExp(t, "gm");
                        L = L.replace(i, e[r] || "");
                      }),
                        s.push(L);
                    }.bind(this)
                  ),
                  i.a.hideSpinner(),
                  this.pagination.render(n, a),
                  (this.resultsEle.innerHTML = s
                    .join("")
                    .replace(/(\®)/g, "<sup>$1</sup>")),
                  (this.brightcoveVideoModalLinkEle = this.container.querySelectorAll(
                    ".brightcove-video-link"
                  )),
                  this.brightcoveVideoModalLinkEle.forEach(function (e) {
                    null == e ||
                      e.addEventListener(
                        "click",
                        l.onBrightCoveModalLinkClick.bind(l)
                      );
                  }),
                  i.a.initRedirectConfirmPopup(),
                  0 === r && this.renderNoResults(),
                  this.addUrl(".a-result__link"),
                  this.addUrl(".a-card-result__image-link");
                var h = document.querySelector(".sticky-menu__filter");
                h &&
                  h.querySelectorAll(".a-card-result").forEach(function (e) {
                    e.addEventListener("click", function (e) {
                      e.stopPropagation(),
                        this.querySelector(".a-card-result__image a").click();
                    });
                  });
              }),
              (r.prototype.addUrl = function (e) {
                this.container.querySelectorAll(e).forEach(function (e) {
                  var t = e.getAttribute("data-href");
                  t && !t.includes("pdf") && e.setAttribute("href", t);
                });
              }),
              (r.prototype.renderCategories = function (e) {
                e.forEach(
                  function (e) {
                    this.renderCategory(e);
                  }.bind(this)
                ),
                  (this.container.querySelectorAll('[data-is-primary="true"]')
                    .length > 0 ||
                    this.container.querySelectorAll(
                      '[data-is-secondary="true"]'
                    ).length > 0) &&
                    (this.getCategoryData(), this.updatePrimaryActive(this));
              }),
              (r.prototype.renderCategory = function (e) {
                var t = [];
                if (this.isTagSearchFacet) {
                  if (e.field !== this.categoryTagFacetsStr) return;
                  this.resultsContainer
                    .querySelectorAll("[data-tag-field-name]")
                    .forEach(function (e) {
                      t.push(e.dataset.tagFieldName);
                    });
                } else t.push(e.field);
                t.forEach(
                  function (t, r) {
                    var i = t,
                      a = this.resultsContainer.querySelector(
                        '.searchfacet [data-field-name="' + i + '"]'
                      ),
                      l = null == a ? void 0 : a.querySelector("template"),
                      s =
                        null == a
                          ? void 0
                          : a.querySelector(".m-link-stack--content"),
                      n = [];
                    if (a) {
                      var o = a.getAttribute("data-is-multiple"),
                        c = a.getAttribute("data-is-sort"),
                        u = a.getAttribute("data-sort-by-order"),
                        d = a.dataset.isTruncationEnable;
                      "true" === c &&
                        this.getSortedResults(e.values, "value", u);
                      var h = {};
                      if (e.values.length > 0) {
                        if (this.isTagSearchFacet) {
                          var p = "#" + this.categoryTagFacetsStr + "-" + r,
                            f = document.querySelector(p).getAttribute("name"),
                            y = document.querySelector(p).getAttribute("value"),
                            g = y ? JSON.parse(y) : [],
                            v = g[f] && g[f].length > 0;
                          h.values = v
                            ? e.values.filter(function (e) {
                                return g[f].includes(e.value);
                              })
                            : [];
                        } else h = e;
                        h.values.length > 0 &&
                          (this.resultsContainer
                            .querySelector(
                              '.searchfacet [data-category-name="' + i + '"]'
                            )
                            .removeAttribute("hidden"),
                          document
                            .querySelectorAll(".view-all")
                            .forEach(function (e) {
                              e.style.display = "block";
                            }));
                      }
                      h.values.forEach(
                        function (e) {
                          var t,
                            r,
                            a = l.content
                              .cloneNode(!0)
                              .querySelector(
                                ".faq-link.m-search-category__item"
                              );
                          "true" == d && a.classList.add("facet-link");
                          var s = a.querySelector('[aria-label="{link-text}"]');
                          "true" == o
                            ? ((s.innerHTML =
                                "<label class='a-checkbox__label' for='" +
                                e.value +
                                "'><span class='a-checkbox__text'>" +
                                e.value +
                                " <span>(" +
                                e.numberOfResults +
                                ")</span></span><input type='checkbox' class='a-checkbox__input' name = '" +
                                e.value +
                                "' id='" +
                                e.value +
                                "' data-required='true'><span class='a-checkbox__custom'></span></label>"),
                              (null === (t = this.selectedFacet) || void 0 === t
                                ? void 0
                                : t.value) === e.value &&
                                s.classList.add(s.className + "--active"),
                              (s.dataset.fieldName = i),
                              s.setAttribute("aria-label", e.value),
                              n.push(a.outerHTML))
                            : ((s.innerHTML =
                                e.value +
                                " <span>(" +
                                e.numberOfResults +
                                ")</span>"),
                              (s.dataset.fieldName = i),
                              s.setAttribute("aria-label", e.value),
                              (null === (r = this.selectedFacet) || void 0 === r
                                ? void 0
                                : r.value) === e.value &&
                                s.classList.add(s.className + "--active"),
                              n.push(a.outerHTML));
                        }.bind(this)
                      ),
                        (s.innerHTML = n.join(""));
                    }
                    if (document.querySelector(".sticky-menu__filter")) {
                      var m = document.querySelectorAll(
                          ".stickyMenu .faq-link .a-link__text"
                        ),
                        S = document.querySelectorAll(
                          ".m-search-category .faq-link .a-link__text"
                        );
                      m.forEach(function (e) {
                        S.forEach(function (t) {
                          e.getAttribute("aria-label") ==
                            t.getAttribute("aria-label") && t.remove();
                        });
                      });
                    }
                  }.bind(this)
                );
              }),
              (r.prototype.attachEvent = function () {
                var e,
                  t,
                  r,
                  i,
                  a = this;
                this.facetEle.forEach(function (e) {
                  null == e ||
                    e.addEventListener("click", a.onCategoryFacetClick.bind(a));
                }),
                  this.sortEle.forEach(function (e) {
                    null == e ||
                      e.addEventListener("click", a.onSortByClick.bind(a));
                  }),
                  null === (e = this.searchIconEle) ||
                    void 0 === e ||
                    e.addEventListener("click", this.onSearchClick.bind(this)),
                  null === (t = this.searchField) ||
                    void 0 === t ||
                    t.addEventListener(
                      "keyup",
                      function (e) {
                        var t;
                        "Enter" === e.key &&
                          (null === (t = this.searchIconEle) ||
                            void 0 === t ||
                            t.dispatchEvent(new MouseEvent("click")));
                      }.bind(this)
                    ),
                  null === (r = this.brightcoveVideoPopupCloseEle) ||
                    void 0 === r ||
                    r.addEventListener(
                      "click",
                      this.onBrightCoveVideoPopupCancel.bind(this)
                    ),
                  null === (i = this.clearAllFiltersEle) ||
                    void 0 === i ||
                    i.addEventListener(
                      "click",
                      this.refreshPageWithoutParams.bind(this)
                    );
              }),
              (r.prototype.viewAllCategoryOption = function (e) {
                for (
                  var t = this.container.querySelectorAll(
                      ".m-link-stack--dropdown"
                    ),
                    r = function (r) {
                      e.categoryFacets.forEach(function (e) {
                        e.field === t[r].dataset.fieldName &&
                          e.values.length <= 3 &&
                          e.values.length > 0 &&
                          (t[r].nextElementSibling.remove(),
                          (t[r].style.marginBottom = "30px")),
                          e.field === t[r].dataset.fieldName &&
                            e.values.length < 1 &&
                            (t[r].nextElementSibling.remove(),
                            t[r].previousElementSibling.remove(),
                            (t[r].style.marginBottom = "0px"),
                            (t[r].style.display = "none"));
                      });
                    },
                    i = 0;
                  i < t.length;
                  i++
                )
                  r(i);
              }),
              (r.prototype.refreshCategoryCount = function (e) {
                for (
                  var t,
                    r = this,
                    i = [],
                    a = function (t) {
                      for (
                        var r = JSON.parse(
                            sessionStorage.getItem("CategoryLabels")
                          ).filter(function (r) {
                            return Object.keys(e[t]).indexOf(r) > -1;
                          }),
                          a = 0;
                        a < r.length;
                        a++
                      )
                        e[t][r[a]].length >= 1 && i.push.apply(i, e[t][r[a]]);
                    },
                    l = 0;
                  l < e.length;
                  l++
                )
                  a(l);
                t = (function (e) {
                  for (var t = {}, r = 0, i = e; r < i.length; r++) {
                    var a = i[r];
                    t[a] ? (t[a] += 1) : (t[a] = 1);
                  }
                  return t;
                })(i);
                var s = JSON.parse(sessionStorage.getItem("ValContainer"));
                s.forEach(function (e) {
                  r.container.querySelector('[for="' + e.value + '"]') &&
                    "true" === e.secondary &&
                    (r.container
                      .querySelector('[for="' + e.value + '"]')
                      .querySelector(".a-checkbox__text span").textContent =
                      "(0)"),
                    Object.keys(t).forEach(function (i) {
                      e.value === i &&
                        ((e.numberOfResults = t[i]),
                        r.container.querySelector('[for="' + i + '"]') &&
                          "true" === e.secondary &&
                          (r.container
                            .querySelector('[for="' + i + '"]')
                            .querySelector(
                              ".a-checkbox__text span"
                            ).textContent = "(" + t[i] + ")"));
                    });
                }),
                  sessionStorage.setItem("ValContainer", JSON.stringify(s));
              }),
              (r.prototype.onCategoryFacetClick = function (t) {
                var r,
                  i = this,
                  a = this.container.querySelector(
                    ".m-link-stack--dropdown-value"
                  ),
                  l = t.target
                    .closest(".faq-link")
                    .querySelector("[aria-label]");
                (this.stickyTarget =
                  null === (r = t.target.closest(".stickyMenu")) || void 0 === r
                    ? void 0
                    : r.querySelector("[aria-label]")),
                  this.stickyTarget &&
                    (document
                      .querySelectorAll(".stickyMenu .a-link__text")
                      .forEach(function (e) {
                        e.classList.remove("a-link__text--active");
                      }),
                    (this.selectedStickyTopic = t.target.getAttribute(
                      "aria-label"
                    )));
                var s = l.closest(".faq-link").closest(".js-faq-links"),
                  n = l.getAttribute("aria-label"),
                  o = l.innerHTML,
                  c = l.classList.contains("a-link__text--active"),
                  u = this.container.querySelector(".filter"),
                  d = this.container.querySelectorAll(".rounded-pill"),
                  h = document.createElement("button");
                if (
                  ((h.type = "button"),
                  h.classList.add("btn", "border", "rounded-pill"),
                  (h.innerHTML =
                    n + "<em class='" + this.crossIcon + "'></em>"),
                  c
                    ? (s.classList.remove("category-parent"),
                      l.classList.remove("a-link__text--active"),
                      d.forEach(function (e) {
                        e.innerText === n && e.remove();
                      }))
                    : (s.classList.add("category-parent"),
                      l.classList.add("a-link__text--active"),
                      u.appendChild(h)),
                  this.selectedFacet.value !== n &&
                    ((this.selectedFacet.fieldName = this.isTagSearchFacet
                      ? this.categoryTagFacetsStr
                      : l.dataset.fieldName),
                    (this.selectedFacet.value = n),
                    (this.selectedFacetEle = l),
                    (a.innerHTML = o)),
                  (this.currentPage = 1),
                  this.selectedFacet.value)
                )
                  if (
                    (this.checkSelFilterArr(n),
                    this.filters.hasOwnProperty(this.selectedFacet.fieldName))
                  )
                    this.filters[this.selectedFacet.fieldName].includes(
                      this.selectedFacet.value
                    )
                      ? (this.filters[this.selectedFacet.fieldName].splice(
                          this.filters[this.selectedFacet.fieldName].indexOf(
                            this.selectedFacet.value
                          ),
                          1
                        ),
                        0 ==
                          this.filters[this.selectedFacet.fieldName].length &&
                          delete this.filters[this.selectedFacet.fieldName])
                      : this.filters[this.selectedFacet.fieldName].push(
                          this.selectedFacet.value
                        );
                  else {
                    var p = [];
                    p.push(this.selectedFacet.value),
                      (this.filters[this.selectedFacet.fieldName] = p);
                  }
                var f = JSON.parse(sessionStorage.getItem("searchResult"))
                  .response.results;
                (this.filteredResultsArr = this.filterSearchResults(f)),
                  e("#paginationResultTop").empty();
                var y = this.paginationString;
                (y = y.replace(
                  "{count}",
                  JSON.stringify(this.filteredResultsArr.length)
                )),
                  e("#paginationResultTop").append("<span>" + y + "</span>"),
                  e("#stickyFilterCount").empty(),
                  e("#stickyFilterCount").append("<span>" + y + "</span>"),
                  (this.filteredTagEle = this.container.querySelectorAll(
                    ".rounded-pill"
                  )),
                  this.filteredTagEle.forEach(function (e) {
                    var t;
                    null === (t = e.querySelector("em")) ||
                      void 0 === t ||
                      t.addEventListener("click", i.onRoundPillClick.bind(i));
                  });
                f = JSON.parse(JSON.stringify(this.filteredResultsArr));
                (f = this.getSortedResults(f, "title", this.sortByOrder)),
                  (this.container.querySelectorAll('[data-is-primary="true"]')
                    .length > 0 ||
                    this.container.querySelectorAll(
                      '[data-is-secondary="true"]'
                    ).length > 0) &&
                    this.refreshCategoryCount(f),
                  this.renderResults(f, f.length);
              }),
              (r.prototype.filterSearchResults = function (e, t) {
                var r;
                void 0 === t && (t = "");
                var i = [];
                if (this.stickyTarget) {
                  var a = document.querySelectorAll(
                      ".sticky-menu__filter .stickyMenu .a-link__text"
                    ),
                    l = [],
                    s = this.filters.categorytagfacets;
                  a.forEach(function (e) {
                    l.push(e.getAttribute("aria-label")),
                      (s = s.filter(function (e) {
                        return !l.includes(e);
                      }));
                  }),
                    s.push(this.selectedStickyTopic),
                    (this.filters.categorytagfacets = s);
                }
                var n = Object.keys(this.filters),
                  o = this.filters,
                  c = this;
                if (t.length > 0 && n.length > 0)
                  for (var u in this.filters) {
                    var d = this.filters[u].indexOf(t);
                    d > -1 &&
                      (this.filters[u].splice(d, 1),
                      (o[u] = this.filters[u]),
                      o[u].length < 1 && delete o[u]);
                  }
                var h = o;
                if (
                  (Object.keys(o).forEach(function (t, r) {
                    var a = [];
                    h[t].forEach(function (l) {
                      h[t].length > 1 && 0 == r
                        ? e.forEach(function (e) {
                            null != e[t] && c.checkValue(e, t, l) && i.push(e);
                          })
                        : h[t].length > 1 && r > 0
                        ? i.forEach(function (e) {
                            null != e[t] && c.checkValue(e, t, l) && a.push(e);
                          })
                        : (i =
                            1 == Object.entries(h).length || 0 == r
                              ? e.filter(function (e) {
                                  return null != e[t] && c.checkValue(e, t, l);
                                })
                              : i.filter(function (e) {
                                  return null != e[t] && c.checkValue(e, t, l);
                                }));
                      var s = [];
                      i = i.filter(function (e) {
                        if (!s.includes(e.sysurihash))
                          return s.push(e.sysurihash), !0;
                      });
                    }),
                      h[t].length > 1 && r > 0 && (i = a);
                  }),
                  0 == Object.entries(h).length && (i = e),
                  document.querySelector(".sticky-menu__filter") &&
                    this.selectedFacetEle.classList.contains(
                      "a-link__text--active"
                    ))
                ) {
                  for (
                    var p =
                        null ===
                          (r = document.querySelector(
                            ".m-search-category__content .faq-link .a-link__text.a-link__text--active"
                          )) || void 0 === r
                          ? void 0
                          : r.getAttribute("aria-label"),
                      f = [],
                      y = 0;
                    y < i.length;
                    y++
                  )
                    (i[y][this.selectedFacet.fieldName].indexOf(
                      this.selectedStickyTopic
                    ) > -1 ||
                      !this.selectedStickyTopic) &&
                      (i[y][this.selectedFacet.fieldName].indexOf(p) > -1 ||
                        !p) &&
                      f.push(i[y]);
                  i = f;
                }
                return Array.from(new Set(i));
              }),
              (r.prototype.onRoundPillClick = function (e) {
                var t = e.target.parentNode.innerText.trim(),
                  r = JSON.parse(sessionStorage.getItem("searchResult"))
                    .response.results;
                e.target.parentNode.remove();
                for (
                  var i = this.container.querySelectorAll(
                      ".search-category-item"
                    ),
                    a = 0;
                  a < i.length;
                  a++
                ) {
                  var l = i[a].querySelector("[aria-label]"),
                    s = l.getAttribute("aria-label"),
                    n = l.classList.contains("a-link__text--active");
                  s === t &&
                    n &&
                    (l.classList.remove("a-link__text--active"),
                    this.checkSelFilterArr(s));
                }
                this.filteredResultsArr = this.filterSearchResults(r, t);
                var o = JSON.parse(JSON.stringify(this.filteredResultsArr));
                (o = this.getSortedResults(o, "title", this.sortByOrder)),
                  this.renderResults(o, o.length);
              }),
              (r.prototype.onBrightCoveModalLinkClick = function (e) {
                var t = this,
                  r = document.getElementById("videoModal"),
                  i = document.getElementById("btnModalLegalPopUp-modal");
                if (null === i) {
                  i = document.getElementById(
                    "btnModalSearchResultsPopUp-modal"
                  );
                  var a = document.querySelector(
                      "#btnModalSearchResultsPopUp-modal .abt-icon-cancel"
                    ),
                    l = document.querySelector(
                      "#btnModalSearchResultsPopUp-modal .a-button--primary .btn"
                    ),
                    s = document.querySelector(
                      "#btnModalSearchResultsPopUp-modal .a-button--secondary a.btn"
                    );
                } else
                  (a = document.querySelector(
                    "#btnModalLegalPopUp-modal .abt-icon-cancel"
                  )),
                    (l = document.querySelector(
                      "#btnModalLegalPopUp-modal .a-button--primary .btn"
                    )),
                    (s = document.querySelector(
                      "#btnModalLegalPopUp-modal .a-button--secondary a.btn"
                    ));
                var n = e.target,
                  o = this.container.querySelector(".brightcove-video-wrapper");
                "1" === localStorage.getItem("visit") ||
                "1" === localStorage.getItem("firstVisit")
                  ? (null == i || (i.style.display = "none"),
                    (r.style.display = "block"),
                    this.videoAppend(o, n))
                  : (null == i || (i.style.display = "block"),
                    (r.style.display = "none")),
                  null == i || (i.style.backgroundColor = "#0000007a"),
                  this.modalReset(a, i, r),
                  this.modalReset(s, i, r),
                  null == l ||
                    l.addEventListener("click", function (e) {
                      localStorage.setItem("visit", "1"),
                        localStorage.setItem("firstVisit", "1"),
                        null == i || (i.style.display = "none"),
                        null == i || (i.style.backgroundColor = "#0000007a"),
                        (r.style.display = "block"),
                        (r.style.backgroundColor = "#0000007a"),
                        t.videoAppend(o, n);
                    });
              }),
              (r.prototype.modalReset = function (e, t, r) {
                null == e ||
                  e.addEventListener("click", function (e) {
                    (t.style.display = "none"),
                      (t.style.backgroundColor = "#fff"),
                      (r.style.display = "none"),
                      document
                        .querySelectorAll(".modal-backdrop")
                        .forEach(function (e) {
                          e.remove();
                        }),
                      e.preventDefault();
                  });
              }),
              (r.prototype.videoAppend = function (e, t) {
                (this.brightcoveVideoPopupEle.dataset.account =
                  t.dataset.account),
                  (this.brightcoveVideoPopupEle.dataset.player =
                    t.dataset.player),
                  (this.brightcoveVideoPopupEle.dataset.videoId =
                    t.dataset.videoId);
                var r = document.createElement("script");
                r.classList.add("scriptTag"),
                  r.setAttribute(
                    "src",
                    "https://players.brightcove.net/" +
                      t.dataset.account +
                      "/" +
                      t.dataset.player +
                      "_default/index.min.js"
                  ),
                  (e.innerHTML = this.brightcoveVideoPopupEle.outerHTML),
                  e.closest(".modal-body").appendChild(r);
              }),
              (r.prototype.onBrightCoveVideoPopupCancel = function (e) {
                var t;
                (this.container.querySelector(
                  ".brightcove-video-wrapper"
                ).innerHTML = ""),
                  null ===
                    (t = this.container
                      .querySelector(".brightcove-video-wrapper")
                      .closest(".modal-body")
                      .querySelector(".scriptTag")) ||
                    void 0 === t ||
                    t.remove();
              }),
              (r.prototype.ascendingOrderSort = function (e) {
                return function (t, r) {
                  return t[e].toLowerCase() > r[e].toLowerCase()
                    ? 1
                    : t[e].toLowerCase() < r[e].toLowerCase()
                    ? -1
                    : 0;
                };
              }),
              (r.prototype.descendingOrderSort = function (e) {
                return function (t, r) {
                  return t[e].toLowerCase() < r[e].toLowerCase()
                    ? 1
                    : t[e].toLowerCase() > r[e].toLowerCase()
                    ? -1
                    : 0;
                };
              }),
              (r.prototype.onSortByClick = function (e) {
                var t = e.target;
                (this.sortByOrder = t.dataset.sortByOrder),
                  sessionStorage.setItem("SortByOrder", this.sortByOrder);
                var r =
                  this.filteredResultsArr.length > 0
                    ? JSON.parse(JSON.stringify(this.filteredResultsArr))
                    : JSON.parse(sessionStorage.getItem("searchResult"))
                        .response.results;
                (r = this.getSortedResults(r, "title", this.sortByOrder)),
                  this.renderResults(r, r.length);
              }),
              (r.prototype.getSearchQueryString = function () {
                var e,
                  t = new URL(window.location.href).searchParams.get("q");
                (this.searchStr = null != t ? decodeURIComponent(t) : ""),
                  null ===
                    (e = this.container.querySelector("#search-filter")) ||
                    void 0 === e ||
                    (e.value = this.searchStr);
              }),
              (r.prototype.onSearchClick = function (e) {
                var t = e.target
                  .closest(".search-filter")
                  .querySelector("#search-filter");
                this.searchStr = t.value;
                var r = JSON.parse(sessionStorage.getItem("searchResult"))
                  .response.results;
                "" !== this.searchStr && null !== this.searchStr
                  ? ((this.filters.title = []),
                    this.filters.title.push(this.searchStr))
                  : delete this.filters.title,
                  (this.filteredResultsArr = this.filterSearchResults(r));
                var i = JSON.parse(JSON.stringify(this.filteredResultsArr));
                (i = this.getSortedResults(i, "title", this.sortByOrder)),
                  this.renderResults(i, i.length);
              }),
              (r.prototype.renderNoResults = function () {
                var e;
                (this.container.dataset.results = "0"),
                  null ===
                    (e = this.container.querySelector(
                      ".o-search-res__no-results"
                    )) ||
                    void 0 === e ||
                    (e.style.display = "block");
              }),
              (r.prototype.checkValue = function (e, t, r) {
                var i, a;
                return Array.isArray(e[t])
                  ? e[t].some(function (e) {
                      return e.toLowerCase() === r.toLowerCase();
                    })
                  : "title" === t
                  ? e[t].toLowerCase().includes(r.toLowerCase()) ||
                    (null === (i = e.description) || void 0 === i
                      ? void 0
                      : i.toLowerCase().includes(r.toLowerCase())) ||
                    (null === (a = e.categorytagfacets) || void 0 === a
                      ? void 0
                      : a.some(function (e) {
                          return e.toLowerCase().includes(r.toLowerCase());
                        }))
                  : e[t].toLowerCase().includes(r.toLowerCase());
              }),
              (r.prototype.getSortedResults = function (e, t, r) {
                return (
                  "descending" === r
                    ? e.sort(this.descendingOrderSort(t))
                    : "ascending" === r && e.sort(this.ascendingOrderSort(t)),
                  e
                );
              }),
              (r.prototype.refreshPageWithoutParams = function () {
                null !== sessionStorage.getItem("FilterArray") &&
                  sessionStorage.removeItem("FilterArray"),
                  null !== sessionStorage.getItem("SortByOrder") &&
                    sessionStorage.removeItem("SortByOrder");
                var e = new URL(window.location.href),
                  t = new URLSearchParams(e.search);
                t.delete("q"),
                  "" != t.toString()
                    ? window.open(
                        new URL(e.origin + e.pathname + "?" + t.toString()),
                        "_self"
                      )
                    : window.open(new URL(e.origin + e.pathname), "_self");
              }),
              r
            );
          })();
          e(function () {
            var e = document.querySelector(".sticky-menu__filter");
            if (e) {
              var t = e.querySelector(".stickyMenu");
              t
                .querySelector(".m-link-stack__list")
                .classList.add("js-faq-links"),
                t
                  .querySelectorAll(".m-link-stack__list-item")
                  .forEach(function (e) {
                    e.classList.add("faq-link"),
                      e.querySelectorAll(".a-link__text").forEach(function (e) {
                        e.setAttribute("data-field-name", "categorytagfacets");
                      });
                  }),
                e
                  .querySelector(".o-search-res__no-results")
                  .classList.add("container"),
                e
                  .querySelector(".o-search-res__results--view")
                  .classList.add("container"),
                e.querySelector(".a-pagination").classList.add("container"),
                e.querySelector(".a-pagination").classList.add("px-3");
              var i = document.querySelectorAll(
                  ".stickyMenu .faq-link .a-link__text"
                ),
                a = document.querySelectorAll(
                  ".m-search-category .faq-link .a-link__text"
                );
              i.forEach(function (e) {
                a.forEach(function (t) {
                  e.getAttribute("aria-label") ==
                    t.getAttribute("aria-label") && t.remove();
                });
              }),
                e
                  .querySelector('[href="#view-all"]')
                  .addEventListener("click", function (e) {
                    e.preventDefault(),
                      document.querySelector("#clearAllFilters").click();
                  });
            }
            document
              .querySelectorAll(
                '[data-js-component="search-results-with-filters"]'
              )
              .forEach(function (e) {
                new r(e);
              });
          });
          var a = document.querySelector(".sticky-menu__filter");
          a &&
            (function e() {
              var t = a.querySelectorAll(
                  ".m-search-category__content .faq-link .a-link__text"
                ),
                r = window.location.hash.substring(1);
              0 != t.length
                ? t.forEach(function (e) {
                    e
                      .getAttribute("aria-label")
                      .toLowerCase()
                      .replace(/ /g, "-") == r.toLowerCase() && e.click();
                  })
                : setTimeout(function () {
                    e();
                  }, 1e3);
            })();
        })(),
          e("body").on("click", "article a.a-list-result__link", function (t) {
            var r = e(this).attr("data-href");
            if ("clinical-resources" === e(this).data("content-type")) {
              var i = document.getElementById(
                "btnModalSearchResultsPopUp-modal"
              );
              null === i &&
                (i = document.getElementById("btnModalLegalPopUp-modal"));
            }
            null != i
              ? (null == i || (i.style.display = "block"),
                null == i || (i.style.backgroundColor = "#0000007a"),
                e("#btnModalLegalPopUp-modal .a-button--primary a.btn").attr(
                  "target",
                  "_blank"
                ),
                e("#btnModalLegalPopUp-modal .a-button--primary a.btn").attr(
                  "href",
                  r
                ),
                ("1" !== localStorage.getItem("visit") &&
                  "1" !== localStorage.getItem("firstVisit")) ||
                  (null == i || (i.style.display = "none"),
                  document.querySelector(".a-list-result__link") &&
                    (r.includes("/content/dam/")
                      ? window.open(r, "_blank").focus()
                      : (window.location.href = r))))
              : r.includes("/content/dam/")
              ? window.open(r, "_blank").focus()
              : (window.location.href = r),
              e("#btnModalLegalPopUp-modal").length > 0 &&
                document
                  .querySelector(
                    "#btnModalLegalPopUp-modal .a-button--primary .btn"
                  )
                  .addEventListener("click", function (t) {
                    localStorage.setItem("visit", "1"),
                      localStorage.setItem("firstVisit", "1"),
                      e(
                        "#btnModalLegalPopUp-modal .a-button--primary a.btn"
                      ).attr("href", r);
                  }),
              e("#btnModalSearchResultsPopUp-modal").length > 0 &&
                document
                  .querySelector(
                    "#btnModalSearchResultsPopUp-modal .a-button--primary .btn"
                  )
                  .addEventListener("click", function (t) {
                    localStorage.setItem("visit", "1"),
                      localStorage.setItem("firstVisit", "1"),
                      e(
                        "#btnModalSearchResultsPopUp-modal .a-button--primary a.btn"
                      ).attr("href", r),
                      (window.location.href = r);
                  }),
              t.preventDefault();
          }),
          e("body").on(
            "click",
            " #btnModalLegalPopUp-modal .a-button--secondary .btn",
            function (t) {
              var r;
              null ===
                (r = document.getElementById("btnModalLegalPopUp-modal")) ||
                void 0 === r ||
                (r.style.display = "none"),
                e("#videoModal").hide(),
                e(".modal-backdrop").hide();
              var i = e(
                "#btnModalLegalPopUp-modal .a-button--secondary .btn"
              ).attr("href");
              (window.location.href = i), t.preventDefault();
            }
          ),
          e("body").on(
            "click",
            ".generic-modal--close, #btnModalSearchResultsPopUp-modal .a-button--secondary .btn",
            function (t) {
              var r;
              null ===
                (r = document.getElementById(
                  "btnModalSearchResultsPopUp-modal"
                )) ||
                void 0 === r ||
                (r.style.display = "none"),
                e(".modal-backdrop").hide(),
                t.preventDefault();
            }
          ),
          e("body").on("click", ".generic-modal--close", function (t) {
            var r, i;
            e("#btnModalLegalPopUp-modal").length > 0 &&
              (null ===
                (r = document.getElementById("btnModalLegalPopUp-modal")) ||
                void 0 === r ||
                (r.style.display = "none")),
              e("#videoModal").length > 0 &&
                (null === (i = document.getElementById("videoModal")) ||
                  void 0 === i ||
                  (i.style.display = "none")),
              e(".modal-backdrop").hide(),
              t.preventDefault();
          }),
          e(".mob-filter a").on("click", function () {
            e(".searchfacet").show();
          }),
          e(".apply-button, #backToResult").on("click", function () {
            e(".searchfacet").hide();
          }),
          e("#reloadResultPage").on("click", function () {
            window.location.reload();
          }),
          e("#menuItem li").on("click", function () {
            e("#selectedValue").html(
              e(this).text() +
                '<span><em class="abt-icon abt-icon-down-arrow" aria-hidden="true"></em></span>'
            ),
              e(this).next(".dropdown-menu").slideToggle();
          }),
          e(".view-all a").on("click", function () {
            e(this).hasClass("list-collapsed")
              ? (e(this)
                  .find("em")
                  .removeClass("abt-icon-down-arrow")
                  .addClass("abt-icon-up-arrow"),
                e(this)
                  .removeClass("list-collapsed")
                  .addClass("list-expand")
                  .find("span")
                  .text("View Less"),
                e(this)
                  .parent()
                  .prev(".m-link-stack--dropdown")
                  .find(".faq-link")
                  .show(500),
                window.screen.width < 768 &&
                  e(this)
                    .parent()
                    .prev(".m-link-stack--dropdown")
                    .find(".m-link-stack--content")
                    .css("max-height", "-webkit-fill-available"))
              : (e(this)
                  .find("em")
                  .removeClass("abt-icon-up-arrow")
                  .addClass("abt-icon-down-arrow"),
                e(this)
                  .addClass("list-collapsed")
                  .removeClass("list-expand")
                  .find("span")
                  .text("View All"),
                e(this)
                  .parent()
                  .prev(".m-link-stack--dropdown")
                  .find(".faq-link:gt(2)")
                  .hide(500));
          }),
          e(document).on("hide.bs.modal", "#videoModal", function () {
            var e;
            (this.querySelector(".brightcove-video-wrapper").innerHTML = ""),
              null ===
                (e = this.querySelector(".brightcove-video-wrapper")
                  .closest(".modal-body")
                  .querySelector(".scriptTag")) ||
                void 0 === e ||
                e.remove();
          });
      }.call(this, r(6));
  },
  46: function (e, t, r) {
    "use strict";
    r.r(t),
      function (e) {
        r.d(t, "Spinner", function () {
          return i;
        });
        var i = (function () {
          function e() {
            var t = document.createElement("div");
            t.classList.add("a-spinner"),
              t.classList.add("d-none"),
              (t.innerHTML =
                '<div class="spinner-border" role="status">\n            <span class="sr-only">Loading...</span>\n        </div>'),
              document.body.appendChild(t),
              (e.spinnerOverlay = t);
          }
          return (
            (e.show = function (t) {
              var r = [];
              t
                ? (r.push("top:" + t.offsetTop + "px"),
                  r.push("left:" + t.offsetLeft + "px"),
                  r.push("height:" + t.offsetHeight + "px"),
                  r.push("width:" + t.offsetWidth + "px"))
                : r.push("top: 0; left: 0; width: 100vw; height: 100vh;"),
                r.push("z-index: 9999"),
                e.spinnerOverlay.setAttribute("style", r.join(";")),
                e.spinnerOverlay.classList.remove("d-none"),
                e.count++;
            }),
            (e.hide = function () {
              e.count--,
                e.count <= 0 &&
                  ((e.count = 0), e.spinnerOverlay.classList.add("d-none"));
            }),
            (e.count = 0),
            e
          );
        })();
        e(function () {
          new i();
        });
      }.call(this, r(6));
  },
});
