!(function (e) {
  function t(t) {
    for (
      var i, n, c = t[0], o = t[1], l = t[2], u = 0, d = [];
      u < c.length;
      u++
    )
      (n = c[u]),
        Object.prototype.hasOwnProperty.call(r, n) && r[n] && d.push(r[n][0]),
        (r[n] = 0);
    for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
    for (h && h(t); d.length; ) d.shift()();
    return a.push.apply(a, l || []), s();
  }
  function s() {
    for (var e, t = 0; t < a.length; t++) {
      for (var s = a[t], i = !0, c = 1; c < s.length; c++) {
        var o = s[c];
        0 !== r[o] && (i = !1);
      }
      i && (a.splice(t--, 1), (e = n((n.s = s[0]))));
    }
    return e;
  }
  var i = {},
    r = { 55: 0, 54: 0, 60: 0 },
    a = [];
  function n(t) {
    if (i[t]) return i[t].exports;
    var s = (i[t] = { i: t, l: !1, exports: {} });
    return e[t].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = i),
    (n.d = function (e, t, s) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
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
      var s = Object.create(null);
      if (
        (n.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            s,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return s;
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
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    o = c.push.bind(c);
  (c.push = t), (c = c.slice());
  for (var l = 0; l < c.length; l++) t(c[l]);
  var h = o;
  a.push([156, 0, 1]), s();
})({
  156: function (e, t, s) {
    "use strict";
    s.r(t),
      function (e) {
        var t,
          i = s(40),
          r = s(91),
          a = s(12);
        s(65);
        (t = (function () {
          function t(e) {
            var t, s, i, r, n;
            if (
              ((this.currentPage = 1),
              (this.filters = {}),
              (this.sort = []),
              (this.selectedFacet = {}),
              (this.selectedHierarchialFacet = {}),
              (this.searchFacetTruncate = {}),
              (this.callbackList = {}),
              !e)
            )
              throw new Error("Search result container element is required");
            (this.container = e),
              (this.onSuccessFn =
                null === (t = e.querySelector('input[name="onSuccess"]')) ||
                void 0 === t
                  ? void 0
                  : t.getAttribute("value")),
              (this.resultsCountEle = e.querySelector(".o-search-res__count")),
              (this.chipsList = e.querySelector(".m-chips-list")),
              (this.tabs = e.querySelector(".a-tabs")),
              (this.featuresCardFaq = e.querySelector(".o-features-card-faq")),
              (this.resultsContainer = e.querySelector(
                ".o-search-res__container"
              )),
              (this.resultsEle = e.querySelector(".o-search-res__results")),
              (this.facetEle = e.querySelector(".js-faq-links")),
              (this.cardsCarousel = e.querySelector(
                '[data-js-component="carousel"]'
              )),
              (this.api = e.dataset.apiUrl),
              (this.pageSize = +e.dataset.pageSize),
              (this.searchType = e.dataset.searchType),
              (this.templateEle = e.querySelector(
                "." + this.searchType + "-temp"
              )
                ? e.querySelector("." + this.searchType + "-temp")
                : e.querySelector("#result-temp")),
              (this.initialActiveTab =
                null === (s = this.tabs) || void 0 === s
                  ? void 0
                  : s.querySelector(".active")),
              (this.searchField = e.querySelector(
                ".m-search-bar__input-field"
              )),
              (this.searchCloseIcon = e.querySelector(
                ".m-search-bar__input .m-search-bar__close"
              )),
              (this.searchSubmitBtn = e.querySelector(
                '.m-search-bar__search-button .btn[type="submit"]'
              )),
              (this.searchResetBtn = e.querySelector(
                '.m-search-bar__reset-button .btn[type="reset"]'
              )),
              (this.searchFacetTruncate = e.querySelectorAll(
                ".m-link-stack--truncate"
              )),
              (this.preferedLang =
                null ===
                  (i = document.querySelector(
                    '[name="x-preferred-language"]'
                  )) || void 0 === i
                  ? void 0
                  : i.value),
              (this.applicationId =
                null ===
                  (r = document.querySelector('[name="x-application-id"]')) ||
                void 0 === r
                  ? void 0
                  : r.value),
              (this.isPreviewMode =
                null === (n = document.querySelector('[name="wcmMode"]')) ||
                void 0 === n
                  ? void 0
                  : n.value),
              a.a.isMobile && this.mobileVersionCarousel(),
              this.initHierarchialFacet(),
              document.addEventListener(
                "carousel:initialised",
                function () {
                  this.initCarousel();
                }.bind(this),
                !1
              ),
              this.initPagination(),
              this.initSearchbar(),
              this.extractFilters(),
              this.extractSort(),
              this.attachEvent(),
              this.setPagePathOnFilters(),
              (this.srId = e.id),
              this.setSRCallbacks(),
              this.setCallbackBucket(this.srId),
              "false" === this.isPreviewMode && this.fetchSearchResults();
          }
          return (
            (t.prototype.mobileVersionCarousel = function () {
              this.cardsCarousel.parentElement.classList.add("mobile-carousel");
            }),
            (t.prototype.attachEvent = function () {
              var e,
                t,
                s,
                i,
                r,
                a,
                n,
                c = this;
              window.addEventListener(
                "popstate",
                this.onHistoryPopState.bind(this)
              ),
                null === (e = this.chipsList) ||
                  void 0 === e ||
                  e.addEventListener("click", this.onChipsClick.bind(this)),
                null === (t = this.tabs) ||
                  void 0 === t ||
                  t.addEventListener("click", this.onTabsClick.bind(this)),
                null === (s = this.featuresCardFaq) ||
                  void 0 === s ||
                  s.addEventListener("click", this.onCardClick.bind(this)),
                null === (i = this.facetEle) ||
                  void 0 === i ||
                  i.addEventListener(
                    "click",
                    this.onCategoryFacetClick.bind(this)
                  ),
                null === (r = this.cardsCarousel) ||
                  void 0 === r ||
                  r.addEventListener(
                    "click",
                    this.onFeatureCardClick.bind(this)
                  ),
                null === (a = this.searchResetBtn) ||
                  void 0 === a ||
                  a.addEventListener(
                    "click",
                    this.onResetButtonClick.bind(this)
                  ),
                null === (n = this.searchCloseIcon) ||
                  void 0 === n ||
                  n.addEventListener("click", this.onCloseIconClick.bind(this)),
                this.searchFacetTruncate.forEach(function (e) {
                  null == e ||
                    e
                      .querySelector("a")
                      .addEventListener("click", c.onTruncateClick.bind(c));
                });
            }),
            (t.prototype.initHierarchialFacet = function () {
              this.initialActiveTab &&
                ((this.selectedHierarchialFacet.fieldName = this.initialActiveTab.dataset.fieldName),
                (this.selectedHierarchialFacet.value = this.initialActiveTab.dataset.childFilter),
                this.showHideChipsList(
                  this.initialActiveTab.dataset.childFilter
                ));
            }),
            (t.prototype.initCarousel = function () {
              this.initialActiveTab &&
                this.showHideFeatureCards(
                  this.initialActiveTab.dataset.childFilter
                );
            }),
            (t.prototype.showHideFeatureCards = function (t) {
              var s = this.cardsCarousel;
              s &&
                s.classList.contains("slick-initialized") &&
                this.currentFilter != t &&
                (this.currentFilter && e(s).slick("slickUnfilter"),
                e(s).slick("slickFilter", function (e, s) {
                  return !!s.querySelector('[data-parent-filter="' + t + '"]');
                }),
                e(s).slick("refresh"),
                e(s).slick("slickGoTo", 0, !1),
                (this.currentFilter = t),
                this.adjustCardHeight());
            }),
            (t.prototype.showHideChipsList = function (e) {
              var t = this.chipsList;
              if (t && "false" === this.isPreviewMode) {
                var s = t.querySelectorAll('[data-parent-filter="' + e + '"]'),
                  i = t.querySelectorAll(
                    '.a-chips:not([data-parent-filter="' + e + '"])'
                  );
                s.forEach(function (e) {
                  e.classList.remove("d-none");
                }),
                  i.forEach(function (e) {
                    e.classList.add("d-none");
                  }),
                  0 === s.length
                    ? t.classList.add("d-none")
                    : t.classList.remove("d-none");
              }
            }),
            (t.prototype.onFeatureCardClick = function (e) {
              var t,
                s = e.target.closest("[data-parent-filter]");
              null !== s &&
                (this.selectedCard &&
                  this.selectedCard.classList.remove("o-features-card--active"),
                (null == s ? void 0 : s.dataset.childFilter) !==
                (null === (t = this.selectedCard) || void 0 === t
                  ? void 0
                  : t.dataset.childFilter)
                  ? (s.classList.add("o-features-card--active"),
                    (this.selectedCard = s))
                  : (delete this.filters[this.selectedCard.dataset.fieldName],
                    (this.selectedCard = null)),
                (this.currentPage = 1),
                this.fetchSearchResults());
            }),
            (t.prototype.onCategoryFacetClick = function (e) {
              var t = this.container.querySelector(
                  ".m-link-stack--dropdown-value"
                ),
                s = e.target.closest("a"),
                i = s.getAttribute("aria-label"),
                r = s.innerHTML;
              this.selectedFacetEle &&
                this.selectedFacetEle.classList.remove("a-link__text--active"),
                this.selectedFacet.value !== i
                  ? (s.classList.add("a-link__text--active"),
                    (this.selectedFacet.fieldName = s.dataset.fieldName),
                    (this.selectedFacet.value = i),
                    (this.selectedFacetEle = s),
                    (t.innerHTML = r))
                  : (delete this.filters[this.selectedFacet.fieldName],
                    (this.selectedFacet = {}),
                    (this.selectedFacetEle = null)),
                (this.currentPage = 1),
                this.fetchSearchResults();
            }),
            (t.prototype.onHistoryPopState = function (e) {
              var t = e.state;
              t &&
                ((this.searchStr = decodeURIComponent(t.q)),
                (this.currentPage = t.p),
                this.searchBar.setSearchValue(this.searchStr),
                this.fetchSearchResults());
            }),
            (t.prototype.onTabsClick = function (e) {
              var t;
              e.preventDefault();
              var s = e.target.closest("a"),
                i = s.getAttribute("data-tabsearch-type");
              (this.selectedHierarchialFacet.fieldName = s.dataset.fieldName),
                (this.selectedHierarchialFacet.value = s.dataset.childFilter),
                (null === (t = this.selectedFacet) || void 0 === t
                  ? void 0
                  : t.fieldName) &&
                  (delete this.filters[this.selectedFacet.fieldName],
                  (this.selectedFacet = {}),
                  (this.selectedFacetEle = null)),
                this.selectedCard &&
                  (this.selectedCard.classList.remove(
                    "o-features-card--active"
                  ),
                  delete this.filters[this.selectedCard.dataset.fieldName],
                  (this.selectedCard = null)),
                this.showHideFeatureCards(s.dataset.childFilter),
                this.showHideChipsList(s.dataset.childFilter),
                "" == this.searchField.value && this.clearSearch(),
                (this.currentPage = 1),
                i && "" !== i && (this.searchType = i),
                this.fetchSearchResults();
            }),
            (t.prototype.onCardClick = function (e) {
              e.preventDefault();
            }),
            (t.prototype.onChipsClick = function (e) {
              e.preventDefault();
              var t = e.target;
              "A" === t.tagName &&
                this.searchBar.setSearchValue(t.innerText.trim());
            }),
            (t.prototype.clearSearch = function () {
              var e = new URL(window.location.href);
              e.searchParams.delete("q"), e.searchParams.delete("p");
              try {
                window.history.replaceState(null, "", window.location.pathname);
              } catch (e) {}
              (this.searchField.value = ""),
                (this.searchStr = ""),
                this.searchCloseIcon.classList.remove("show");
            }),
            (t.prototype.onCloseIconClick = function (e) {
              e.preventDefault(),
                (this.searchField.value = ""),
                (this.searchStr = ""),
                this.searchCloseIcon.classList.remove("show");
            }),
            (t.prototype.onResetButtonClick = function (e) {
              e.preventDefault(),
                this.clearSearch(),
                this.initialActiveTab && this.initialActiveTab.click();
            }),
            (t.prototype.onTruncateClick = function (t) {
              var s = t.target.closest(".m-link-stack-faq--wrapper"),
                i = s.querySelector(".m-link-stack--content"),
                r = s.querySelector(".m-link-stack--more"),
                a = s.querySelector(".m-link-stack--less"),
                n = s.querySelector(".abt-icon"),
                c = s.querySelectorAll(".faq-link"),
                o = s.getAttribute("data-visible-length"),
                l = 0;
              i.classList.contains("list-collapsed")
                ? (c.forEach(function (t) {
                    e(t).show(500);
                  }),
                  r.classList.add("d-none"),
                  a.classList.remove("d-none"),
                  n.classList.add("abt-icon-up-arrow"),
                  i.classList.remove("list-collapsed"))
                : (c.forEach(function (t) {
                    ++l > o && e(t).hide(500);
                  }),
                  r.classList.remove("d-none"),
                  a.classList.add("d-none"),
                  n.classList.remove("abt-icon-up-arrow"),
                  i.classList.add("list-collapsed"));
            }),
            (t.prototype.registerHistory = function () {
              var e = new URL(window.location.href),
                t = e.searchParams;
              t.set("q", encodeURIComponent(this.searchStr)),
                t.set("p", this.currentPage);
              try {
                history.pushState(
                  { q: this.searchStr, p: this.currentPage },
                  null,
                  e.toString()
                );
              } catch (e) {}
            }),
            (t.prototype.initPagination = function () {
              var e = this.container.querySelector(".a-pagination");
              (this.pagination = new i.Pagination(e)),
                this.pagination.onPageClick(this.onPageClick.bind(this)),
                (this.currentPage = this.pagination.getCurrentPage());
            }),
            (t.prototype.initSearchbar = function () {
              var t,
                s,
                i = this.container.querySelector(".m-search-bar");
              (this.searchBar = new r.SearchBar(i)),
                this.searchBar.onSearchChange(this.onSearchChange.bind(this)),
                (this.searchStr = this.searchBar.getSearchValue()),
                a.a.isMobile &&
                  null ==
                    (null === (t = this.searchSubmitBtn) || void 0 === t
                      ? void 0
                      : t.querySelector(".abt-icon")) &&
                  e(this.searchSubmitBtn).prepend(
                    '<em class="abt-icon abt-icon-search" aria-hidden="true"></em>'
                  ),
                a.a.isMobile &&
                  null ==
                    (null === (s = this.searchResetBtn) || void 0 === s
                      ? void 0
                      : s.querySelector(".abt-icon")) &&
                  e(this.searchResetBtn).prepend(
                    '<em class="abt-icon abt-icon-reset" aria-hidden="true"></em>'
                  );
            }),
            (t.prototype.onSearchChange = function (e) {
              var t;
              this.searchStr !== e &&
                ((this.searchStr = e),
                (null === (t = this.selectedFacet) || void 0 === t
                  ? void 0
                  : t.fieldName) &&
                  (delete this.filters[this.selectedFacet.fieldName],
                  (this.selectedFacet = {}),
                  (this.selectedFacetEle = null)),
                this.selectedCard &&
                  (delete this.filters[this.selectedCard.dataset.fieldName],
                  (this.selectedCard = null)),
                (this.currentPage = 1),
                this.fetchSearchResults(),
                this.registerHistory());
            }),
            (t.prototype.onPageClick = function (e) {
              +e !== this.currentPage &&
                ((this.currentPage = +e),
                this.fetchSearchResults(),
                this.registerHistory(),
                this.scrollToTop());
            }),
            (t.prototype.getRequestHeaders = function () {
              return a.a.getPageParamsForHeader();
            }),
            (t.prototype.extractFilters = function () {
              this.container
                .querySelectorAll('[type="hidden"][data-filters="true"]')
                .forEach(
                  function (e) {
                    this.filters[e.name] = e.value;
                  }.bind(this)
                );
            }),
            (t.prototype.extractSort = function () {
              this.container
                .querySelectorAll('[type="hidden"][data-sort="true"]')
                .forEach(
                  function (e) {
                    var t = {};
                    (t[e.name] = e.value), this.sort.push(t);
                  }.bind(this)
                );
            }),
            (t.prototype.setPagePathOnFilters = function () {
              var e = new URL(window.location.href),
                t = e.searchParams.has("path")
                  ? e.searchParams.get("path")
                  : "";
              t && (this.filters.path = decodeURIComponent(t));
            }),
            (t.prototype.getRequestBody = function () {
              var e,
                t = {};
              return (
                (t = a.a.getPageParamsForBody()),
                (this.firstResult = (this.currentPage - 1) * this.pageSize + 1),
                (t.firstresult = this.firstResult),
                (t.numberofresults = this.pageSize),
                (t.q = this.searchStr),
                (t.filters = [this.filters]),
                (t.numberofresults = this.pageSize),
                (t.autocorrect = "true"),
                (t.searchtype = this.searchType),
                (t.sort = this.sort),
                (this.filters[
                  this.selectedHierarchialFacet.fieldName
                ] = this.selectedHierarchialFacet.value),
                (null === (e = this.selectedFacet) || void 0 === e
                  ? void 0
                  : e.value) &&
                  (this.filters[
                    this.selectedFacet.fieldName
                  ] = this.selectedFacet.value),
                this.selectedCard &&
                  (this.filters[
                    this.selectedCard.dataset.fieldName
                  ] = this.selectedCard.dataset.childFilter),
                JSON.stringify(t)
              );
            }),
            (t.prototype.scrollToTop = function () {
              var e,
                t = this.getOffsetTop(this.container),
                s =
                  null ===
                    (e = document.querySelector(
                      ".o-header-v2-global__sticky-section.sticky"
                    )) || void 0 === e
                    ? void 0
                    : e.offsetHeight;
              (s = s || 0),
                a.a.scrollTo(
                  0 == this.container.offsetTop
                    ? t - s
                    : this.container.offsetTop - 10,
                  500
                );
            }),
            (t.prototype.getOffsetTop = function (e) {
              for (var t = 0; e; ) (t += e.offsetTop), (e = e.offsetParent);
              return t;
            }),
            (t.prototype.fetchSearchResults = function () {
              a.a.showSpinner(this.container),
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
                      if (0 === e.errorCode) {
                        var t = e.response;
                        (this.resultsCount = t.totalCount),
                          t.totalCount > 0
                            ? (a.a.clearSearchRegisterEventSession(
                                this.searchType
                              ),
                              "sitesearch" == this.searchType &&
                                sessionStorage.setItem(
                                  a.a.serachRegister.searchUid +
                                    this.applicationId +
                                    "_" +
                                    this.preferedLang,
                                  t.searchUid
                                ),
                              this.renderResults(t.results, t.totalCount),
                              this.addUrl())
                            : this.renderNoResults(),
                          t.categoryFacets &&
                            t.categoryFacets.length > 0 &&
                            this.renderCategories(t.categoryFacets);
                      }
                    }.bind(this)
                  )
                  .catch(
                    function (e) {
                      console.log(e), this.renderNoResults();
                    }.bind(this)
                  )
                  .finally(
                    function () {
                      a.a.hideSpinner();
                    }.bind(this)
                  );
            }),
            (t.prototype.renderCategories = function (e) {
              e.forEach(
                function (e) {
                  this.renderCategory(e);
                }.bind(this)
              );
            }),
            (t.prototype.renderCategory = function (e) {
              var t = e.field,
                s = this.resultsContainer.querySelector(".searchfacet"),
                i = this.resultsContainer.querySelector(
                  '.searchfacet [data-field-name="' + t + '"]'
                ),
                r = null == i ? void 0 : i.querySelector("template"),
                n =
                  null == i
                    ? void 0
                    : i.querySelector(".m-link-stack--content"),
                c = [],
                o =
                  null == i ? void 0 : i.closest(".m-link-stack-faq--wrapper"),
                l =
                  null == o
                    ? void 0
                    : o.classList.contains("m-link-stack--truncation"),
                h = null == o ? void 0 : o.getAttribute("data-visible-length"),
                u = 0;
              if (i)
                if (e.values.length > 0) {
                  e.values.forEach(
                    function (s) {
                      var i,
                        d = r.content
                          .cloneNode(!0)
                          .querySelector(":first-child"),
                        p = d.querySelector('[aria-label="{link-text}"]');
                      (p.innerHTML =
                        s.value + " <span>(" + s.numberOfResults + ")</span>"),
                        (p.dataset.fieldName = t),
                        p.setAttribute("aria-label", s.value),
                        (null === (i = this.selectedFacet) || void 0 === i
                          ? void 0
                          : i.value) === s.value &&
                          p.classList.add(p.className + "--active"),
                        l &&
                          !a.a.isMobile &&
                          (e.values.length > h
                            ? (u++,
                              n.classList.add("list-collapsed"),
                              u > h && (d.style.display = "none"),
                              this.resetTruncateLink(o))
                            : o
                                .querySelector(".m-link-stack--truncate")
                                .classList.add("d-none")),
                        c.push(d.outerHTML);
                    }.bind(this)
                  ),
                    (n.innerHTML = c.join("")),
                    (o.style.display = "block");
                  var d = o.querySelector(".faq-link .a-link__text--active");
                  if (d) var p = d.innerText;
                  else p = o.querySelector(".m-link-stack--title").innerText;
                  (o.querySelector(
                    ".m-link-stack--dropdown-value"
                  ).innerText = p.trim()),
                    s && (s.style.display = "block");
                } else o.style.display = "none";
            }),
            (t.prototype.setSRCallbacks = function () {
              window.searchresultCallbacks = window.searchresultCallbacks || {};
              var e = this.srId;
              if (e) {
                window.searchresultCallbacks[e] ||
                  (window.searchresultCallbacks[e] = {});
                var t = window.searchresultCallbacks[e];
                this.onSuccessFn && (t.onSuccess = this.onSuccessFn);
              }
            }),
            (t.prototype.setCallbackBucket = function (e) {
              if (e) {
                var t = window.searchresultCallbacks;
                this.callbackList = t[e];
              }
            }),
            (t.prototype.isFunction = function (e) {
              return e && "function" == typeof e;
            }),
            (t.prototype.onSuccess = function (e) {
              var t = window[this.callbackList.onSuccess];
              return this.isFunction(t) ? t(e) : e;
            }),
            (t.prototype.renderResults = function (e, t) {
              var s = window[this.callbackList.onSuccess],
                i = [],
                r = Math.ceil(t / this.pageSize),
                a = this.resultsContainer.querySelector(".chipslist");
              this.isFunction(s)
                ? ((this.categoryFacet = this.filters.categorytagfacets),
                  s(e, this.categoryFacet))
                : e.forEach(
                    function (e) {
                      var s;
                      this.templateEle = this.container.querySelector(
                        "." + this.searchType + "-temp"
                      )
                        ? this.container.querySelector(
                            "." + this.searchType + "-temp"
                          )
                        : this.container.querySelector("#result-temp");
                      var n =
                          null === (s = this.templateEle) || void 0 === s
                            ? void 0
                            : s.content
                                .cloneNode(!0)
                                .querySelector(":first-child"),
                        c = n.classList.contains("a-result")
                          ? n.outerHTML
                          : n.innerHTML,
                        o = c.match(/\{(.*?)\}/gm);
                      Array.from(new Set(o)).forEach(function (t) {
                        var s = t.replace(/\{|\}/g, ""),
                          i = new RegExp(t, "gm");
                        c = c.replace(i, e[s] || "");
                      }),
                        i.push(c),
                        (this.resultsEle.innerHTML = i.join("")),
                        (this.resultsCountEle.innerText = t),
                        this.pagination.render(r, this.currentPage),
                        (this.container.dataset.results = "" + t),
                        a && (a.style.display = "block");
                    }.bind(this)
                  );
            }),
            (t.prototype.renderNoResults = function () {
              (this.container.dataset.results = "0"), this.hideCategories();
            }),
            (t.prototype.hideCategories = function () {
              var e = this.resultsContainer.querySelector(".searchfacet"),
                t = this.resultsContainer.querySelector(".chipslist");
              e && (e.style.display = "none"), t && (t.style.display = "none");
            }),
            (t.prototype.resetTruncateLink = function (e) {
              e
                .querySelector(".m-link-stack--truncate")
                .classList.remove("d-none"),
                e
                  .querySelector(".m-link-stack--more")
                  .classList.remove("d-none"),
                e.querySelector(".m-link-stack--less").classList.add("d-none"),
                e
                  .querySelector(".abt-icon")
                  .classList.remove("abt-icon-up-arrow"),
                e
                  .querySelector(".m-link-stack--content")
                  .classList.add("list-collapsed");
            }),
            (t.prototype.onSerachResultsItemClick = function (e) {
              e.preventDefault();
              var t = e.target.closest(".a-result");
              if (null !== t) {
                var s, i, r;
                "sitesearch" == this.searchType &&
                  ((s =
                    a.a.serachRegister.searchUid +
                    this.applicationId +
                    "_" +
                    this.preferedLang),
                  (i =
                    a.a.serachRegister.searchState +
                    this.applicationId +
                    "_" +
                    this.preferedLang),
                  (r =
                    a.a.serachRegister.searchObj +
                    this.applicationId +
                    "_" +
                    this.preferedLang));
                var n = {
                  actionCause: t.dataset.actionCause || "documentOpen",
                  eventType: t.dataset.eventType || "searchResultClick",
                  urlHash: t.dataset.uriHash,
                  pageURL: t.dataset.uri,
                  title: e.target.innerText,
                  documentPosition: t.dataset.documentPosition,
                  searchUid: sessionStorage.getItem(s),
                };
                sessionStorage.setItem(i, "true"),
                  sessionStorage.setItem(r, JSON.stringify(n));
                var c = e.target.getAttribute("href");
                c && "" !== c && (window.location.href = c);
              }
            }),
            (t.prototype.addUrl = function () {
              var e = this;
              this.container
                .querySelectorAll(".a-result__title--link")
                .forEach(function (t, s) {
                  var i = t.getAttribute("data-href");
                  i &&
                    (t.setAttribute("href", i), t.removeAttribute("data-href"));
                  var r = Number(e.firstResult + s).toString();
                  t
                    .closest(".a-result")
                    .setAttribute("data-document-position", r),
                    "sitesearch" == e.searchType &&
                      t.addEventListener(
                        "click",
                        e.onSerachResultsItemClick.bind(e)
                      );
                });
            }),
            (t.prototype.adjustCardHeight = function () {
              document
                .querySelectorAll(".o-cards-carousel .slick-track")
                .forEach(function (e) {
                  var t = 0,
                    s = e.querySelectorAll(".m-card .o-features-card");
                  s.length &&
                    (s.forEach(function (e) {
                      (e.style.height = "auto"),
                        e.clientHeight > t && (t = e.clientHeight);
                    }),
                    s.forEach(function (e) {
                      e.style.height = t + "px";
                    }));
                });
            }),
            t
          );
        })()),
          e(function () {
            document
              .querySelectorAll('[data-js-component="search-results"]')
              .forEach(function (e) {
                new t(e);
              });
            var s = e(".searchfacet").children().length,
              i = e(".m-chips-list__head").children().children().length;
            0 == s &&
              0 == i &&
              (e(".o-search-res__container .col-md-3").hide(),
              window.matchMedia("(min-width: 769px)").matches &&
                e(".o-search-res__container .col-md-8").addClass(
                  "offset-md-2"
                )),
              a.a.checkSearchSession("sitesearch");
          });
      }.call(this, s(6));
  },
  46: function (e, t, s) {
    "use strict";
    s.r(t),
      function (e) {
        s.d(t, "Spinner", function () {
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
              var s = [];
              t
                ? (s.push("top:" + t.offsetTop + "px"),
                  s.push("left:" + t.offsetLeft + "px"),
                  s.push("height:" + t.offsetHeight + "px"),
                  s.push("width:" + t.offsetWidth + "px"))
                : s.push("top: 0; left: 0; width: 100vw; height: 100vh;"),
                s.push("z-index: 9999"),
                e.spinnerOverlay.setAttribute("style", s.join(";")),
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
      }.call(this, s(6));
  },
});
