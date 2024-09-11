import { Pagination } from "../../atoms/pagination/pagination.comp";
import { Common } from "../../common";

(function () {
  interface Facet {
    fieldName?: string;
    value?: string;
  }

  /**
   * @requires Pagination
   */
  class SearchResultsWithFilters {
    private container: HTMLElement;
    private resultsCountEle: HTMLElement;
    private featuresCardFaq: HTMLElement;
    private templateEle: HTMLElement;
    private resultsEle: HTMLElement;
    private resultsContainer: HTMLElement;
    private facetEle: Array<HTMLElement> = [];
    private pagination: Pagination;
    private faqLinkStack: DefaultLinkStack;
    private resultsCount: any;
    private api: string;
    private pageSize: number;
    private currentPage: any = 1;
    private searchStr: string;
    private filters: any = {};
    private searchReqFilters: any = [];
    private sort: any = [];
    private selectedFacet: Facet = {};
    private selectedFacetEle: any;
    private selectedHierarchialFacet: Facet = {};
    private searchType: string;
    private isCategoryClicked: boolean;
    private filteredResultsArr: Array<object> = [];
    private brightcoveVideoModalLinkEle: Array<HTMLElement> = [];
    private resultCount: string;
    private paginationString: string;
    private crossIcon: string;
    private searchFilters: string;
    private brightcoveVideoPopupEle: HTMLElement;
    private sortEle: HTMLElement;
    private searchIconEle: HTMLElement;
    private filteredTagEle: Array<HTMLElement> = [];
    private categoryLimit: number;
    private searchField: HTMLElement;
    private sortByOrder: string = "best-match";
    private categoryTagFacetsStr: string = "categorytagfacets";
    private isTagSearchFacet: boolean;
    private clearAllFiltersEle: HTMLElement;
    private stickyTarget: any;
    private selectedStickyTopic: any;
    private loadSelFilters: any;
    private checkSelFilterArr: any;
    private getCategoryData: any;
    private refreshCategoryCount: any;
    private count: number;
    private qryStrngFlagVal: string;

    constructor(ele: HTMLElement) {
      if (!ele) {
        throw new Error("Search result container element is required");
      }
      this.container = ele;
      this.resultsCountEle = ele.querySelector(".o-search-res__count");
      this.templateEle = ele.querySelector("#result-temp");
      this.featuresCardFaq = ele.querySelector(".o-features-card-faq");
      this.resultsContainer = ele.querySelector(".o-search-res__container");
      this.resultsEle = ele.querySelector(".o-search-res__results--view");
      this.facetEle = ele.querySelectorAll(".js-faq-links");
      this.api = ele.dataset.apiUrl;
      this.pageSize = +ele.dataset.pageSize;
      this.searchType = ele.dataset.searchType;
      this.searchFilters = ele.dataset.searchFilters;
      this.sort = ele.dataset.sortFilters ? ele.dataset.sortFilters : [];
      this.resultCount = $("#resultCount").data("result");
      this.paginationString = this.resultCount;
      this.crossIcon = $("#crossIcon").data("icon");
      this.brightcoveVideoPopupCloseEle = ele.querySelector(
        ".brightcove-video-modal .abt-icon-cancel"
      );
      this.sortEle = ele.querySelectorAll(".sort-dropdown-item");
      this.searchIconEle = ele.querySelector(".search-filter .abt-icon-search");
      this.categoryLimit = 3;
      this.searchField = ele.querySelector("#search-filter");
      this.brightcoveVideoPopupEle = ele.querySelector("video.brightcove-video");
      this.clearAllFiltersEle = ele.querySelector("#clearAllFilters");
      this.stickyTarget;
      this.selectedStickyTopic;
      this.attachEvent();
      this.fetchSearchResults();
      this.initPagination();
      this.isTagSearchFacet = ele.querySelector("#is-tag-search-facet")?.getAttribute("value") === "true";
      this.count = 0;
      this.qryStrngFlagVal = ele.querySelector("#retain-filters")?.value;
    }

    private loadSelFilters(fieldname: any, val: any) {
      var _this_1 = val;
      var $dropVal = val.container.querySelector(".m-link-stack--dropdown-value");
      var target = document.getElementById(fieldname).closest(".faq-link").querySelector("[aria-label]");
      var categoryValue = target.getAttribute("aria-label");
      var categoryHtml = target.innerHTML;
      var hasActiveClass = target.classList.contains('a-link__text--active');
      var filterBox = val.container.querySelector(".filter");
      var roundedPills = val.container.querySelectorAll(".rounded-pill");
      var roundedPillbtn = document.createElement("button");
      var isTagFacetSearch = val.container.querySelector('#is-tag-search-facet').value;
      var dataSetFieldName;
      roundedPillbtn.type = "button";
      roundedPillbtn.classList.add("btn", "border", "rounded-pill");
      roundedPillbtn.innerHTML = categoryValue + "<em class='" + val.crossIcon + "'></em>";
      if (hasActiveClass) {
        target.classList.remove('a-link__text--active');
        roundedPills.forEach(function (item) {
          if (item.innerText === categoryValue) {
            item.remove();
          }
        });
      }
      else {
        target.classList.add('a-link__text--active');
        filterBox.appendChild(roundedPillbtn);
      }
      if (val.selectedFacet.value !== categoryValue) {        
        if(isTagFacetSearch === 'true'){
          dataSetFieldName = target.dataset.fieldName.slice(0,target.dataset.fieldName.lastIndexOf('-'))
        }
        else{
          dataSetFieldName = target.dataset.fieldName;
        }
        val.selectedFacet.fieldName = dataSetFieldName;
        val.selectedFacet.value = categoryValue;
        val.selectedFacetEle = target;
        $dropVal.innerHTML = categoryHtml;
      }
      val.currentPage = 1;
      if (categoryValue) {

        if (val.filters.hasOwnProperty(val.selectedFacet.fieldName)) {
          if (val.filters[val.selectedFacet.fieldName].includes(categoryValue)) {
            val.filters[val.selectedFacet.fieldName].splice(val.filters[val.selectedFacet.fieldName].indexOf(categoryValue), 1);
            if (val.filters[val.selectedFacet.fieldName].length == 0) {
              delete val.filters[val.selectedFacet.fieldName];
            }
          }
          else {
            val.filters[val.selectedFacet.fieldName].push(categoryValue);
          }
        }
        else {
          var filtersArr = [];
          filtersArr.push(categoryValue);
          val.filters[val.selectedFacet.fieldName] = filtersArr;
        }
      }
      var searchResults = JSON.parse(sessionStorage.getItem("searchResult"))
        .response.results;
      val.filteredResultsArr = val.filterSearchResults(searchResults);
      $("#paginationResultTop").empty();
      var tempPaginationValue = val.paginationString;
      tempPaginationValue = tempPaginationValue.replace("{count}", JSON.stringify(val.filteredResultsArr.length));
      $("#paginationResultTop").append("<span>" + tempPaginationValue + "</span>");
      val.filteredTagEle = val.container.querySelectorAll(".rounded-pill");
      val.filteredTagEle.forEach(function (item) {
        var _a;
        (_a = item.querySelector('em')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", _this_1.onRoundPillClick.bind(_this_1));
      });
      var searchResults = JSON.parse(JSON.stringify(val.filteredResultsArr));
      if (sessionStorage.getItem('SortByOrder') !== null) {
        var sortingOrder = sessionStorage.getItem('SortByOrder');
      }

      searchResults = val.getSortedResults(searchResults, "title", sortingOrder);
      val.renderResults(searchResults, searchResults.length);
    }

    private getCategoryData() {
      let mainObj = [];
      let obj = {};
      Object.defineProperties(obj, {
        primary: {
          value: '',
          writable: true,
          enumerable: true
        },
        value: {
          value: '',
          writable: true,
          enumerable: true
        },
        fieldName: {
          value: '',
          writable: true,
          enumerable: true
        },
        numberOfResults: {
          value: '',
          writable: true,
          enumerable: true
        },
      })
      const chkbox_dom = this.container.querySelectorAll(".a-checkbox");
      for (let j = 0; j < chkbox_dom.length; j++) {
        if (chkbox_dom[j].hasAttribute('aria-label')) {
          if (chkbox_dom[j].closest('[data-is-primary="true"]')) {

            obj['primary'] = 'true';
            obj['fieldName'] = chkbox_dom[j].getAttribute('data-field-name');
            obj['value'] = chkbox_dom[j].getAttribute('aria-label')
            obj['numberOfResults'] = this.container.querySelectorAll(".a-checkbox__text span")[j].lastChild.data.replace(/[()]/g, '');
          }
          else if (chkbox_dom[j].closest('[data-is-secondary="true"]')) {

            obj['secondary'] = 'true';
            obj['fieldName'] = chkbox_dom[j].getAttribute('data-field-name');
            obj['value'] = chkbox_dom[j].getAttribute('aria-label')
            obj['numberOfResults'] = this.container.querySelectorAll(".a-checkbox__text span")[j].lastChild.data.replace(/[()]/g, '');

          }
          mainObj.push(obj);
          obj = {};
        }
      }

      sessionStorage.setItem('ValContainer', JSON.stringify(mainObj));
    }

    private updatePrimaryActive(val: any) {
      if ((sessionStorage.getItem('FilterArray') !== null) && (sessionStorage.getItem('ValContainer') !== null)) {
        let tempObj = JSON.parse(sessionStorage.getItem('ValContainer'));
        let tempArray = JSON.parse(sessionStorage.getItem('FilterArray'));
        val.count = 0;
        Object.keys(tempObj).reduce(function (r, e) {
          if (tempObj[e].primary === "true" && tempArray.includes(tempObj[e].value)) {
            val.count = val.count + 1;
          }

          return r;
        }, {});
      }
      else if ((sessionStorage.getItem('FilterArray') === null) && (sessionStorage.getItem('ValContainer') !== null)) {
        val.count = 0;

      }

    }

    private checkSelFilterArr(fieldname: any) {
      let selFilterArr = [];
      let pos;
      Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
      }
      Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
      }
      if (sessionStorage.getItem('FilterArray') !== null) {
        selFilterArr = sessionStorage.getObj("FilterArray");

        if (selFilterArr.length > 0) {
          pos = selFilterArr.indexOf(fieldname);
          if (pos >= 0) {
            selFilterArr.splice(pos, 1);
            sessionStorage.setObj("FilterArray", selFilterArr);
            if (selFilterArr.length === 0) { sessionStorage.removeItem('FilterArray'); }
            this.updatePrimaryActive(this);
            if (this.count === 0) {
              this.container.querySelectorAll('[data-is-primary="true"]').forEach((div) => { div?.classList.remove('primaryActive'); });
            }
          }
          else {
            selFilterArr.push(fieldname);
            sessionStorage.setObj("FilterArray", selFilterArr);
            this.updatePrimaryActive(this);
            if (this.count >= 1) {
              this.container.querySelectorAll('[data-is-primary="true"]').forEach((div) => { div?.classList.add('primaryActive'); });
            }
          }
        }
      }
      else {
        selFilterArr.push(fieldname);
        sessionStorage.setObj("FilterArray", selFilterArr);
        this.updatePrimaryActive(this);
        if (this.count >= 1) {
          this.container.querySelectorAll('[data-is-primary="true"]').forEach((div) => { div?.classList.add('primaryActive'); });
        }
      }
    }

    private initPagination() {
      const paginationEle = this.container.querySelector(".a-pagination");
      this.pagination = new Pagination(paginationEle as HTMLElement);
      this.pagination.onPageClick(this.onPageClick.bind(this));
      this.currentPage = this.pagination.getCurrentPage();

      // Sticky filter onload
      const stickyMenu = document.querySelector(".sticky-menu__filter");
      if (stickyMenu) {
        const ancLast = document.querySelectorAll(".stickyMenu .faq-link");
        const anchLastElement = ancLast[ancLast.length - 1];
        anchLastElement.querySelector(".a-link__text").classList.add("a-link__text--active");

        let filterHashValue = window.location.hash.substring(1);
        const stickyParent = document.querySelector('.sticky-menu__filter');
        var stickyELementList = stickyParent.querySelectorAll('.stickyMenu .faq-link .a-link__text');
        stickyELementList.forEach(function (eleSticky) {
          if (eleSticky.getAttribute('aria-label').toLowerCase() == filterHashValue) {
            eleSticky.click();
          }
        });
      }
    }

    private onPageClick(data: any) {
      if (+data === this.currentPage) {
        //  return;
      }
      this.currentPage = +data;
      if (sessionStorage.getItem('searchResult')) {
        if (this.filteredResultsArr.length > 0) {
          let searchResults = JSON.parse(JSON.stringify(this.filteredResultsArr));
          searchResults = this.getSortedResults(searchResults, "title", this.sortByOrder);
          this.renderResults(searchResults, searchResults.length, this.currentPage);
        } else {
          let searchResults = JSON.parse(sessionStorage.getItem("searchResult")).response.results;
          searchResults = this.getSortedResults(searchResults, "title", this.sortByOrder);
          this.renderResults(searchResults, searchResults.length, this.currentPage);
        }
      }

    }
    private getRequestHeaders(): any {
      return Common.getPageParamsForHeader();
    }

    private getRequestBody(): any {
      let body: any = {};
      if (isNaN(this.pageSize)) {
        this.pageSize = 10;
      }
      body = Common.getPageParamsForBody();
      body.firstresult = (this.currentPage - 1) * this.pageSize + 1;

      body.q = "";
      if (
        this.searchContentCategory !== null ||
        this.searchContentCategory !== undefined
      ) {
        this.searchReqFilters = JSON.parse(this.searchFilters);
      }
      body.filters = this.searchReqFilters;
      body.autocorrect = "true";
      body.searchtype = this.searchType;
      body.sort = JSON.parse(this.sort);
      return JSON.stringify(body);
    }

    private fetchSearchResults(currPage: Number = 1) {
      Common.showSpinner(this.container);
      fetch(this.api, {
        method: "post",
        headers: this.getRequestHeaders(),
        body: this.getRequestBody(),
      })
        .then((resp) => resp.json())
        .then(
          function (data: any) {
            if (data.errorCode === 0) {
              sessionStorage.setItem("searchResult", JSON.stringify(data));
              const response = data.response;

              if (this.container.querySelectorAll('[data-is-primary="true"]').length > 0 || this.container.querySelectorAll('[data-is-secondary="true"]').length > 0) {
                let catLblArr = [];
                for (let i = 0; i < response.categoryFacets.length; i++) {
                  catLblArr.push(response.categoryFacets[i].field);
                  sessionStorage.setItem('CategoryLabels', JSON.stringify(catLblArr));
                }
              }
              this.viewAllCategoryOption(response);
              if (sessionStorage.getItem('SortByOrder') !== null) {
                this.sortByOrder = sessionStorage.getItem('SortByOrder');
              }
              else {
                this.sortByOrder = this.container.dataset.sortByOrder;
              }
              this.sortEle.forEach((item) => {
                if (item?.dataset.sortByOrder === this.sortByOrder) {
                  item.click();
                };
              });
              if (
                response.categoryFacets &&
                response.categoryFacets.length > 0
              ) {
                this.renderCategories(response.categoryFacets);
              }
              if (response.results && response.results.length > 0) {
                this.container.querySelector(".search-results-container").removeAttribute("hidden");

                /*------------------------------------------------------------------*/
                //Get value from Session storage
                let selFilterArr = [];
                let pos;

                Storage.prototype.setObj = function (key, obj) {
                  return this.setItem(key, JSON.stringify(obj))
                }
                Storage.prototype.getObj = function (key) {
                  return JSON.parse(this.getItem(key))
                }
                if (sessionStorage.getItem('FilterArray') !== null) {
                  selFilterArr = sessionStorage.getObj("FilterArray");
                  this.updatePrimaryActive(this);
                  if (this.count === 0) {
                    this.container.querySelectorAll('[data-is-primary="true"]').forEach((div) => { div?.classList.remove('primaryActive'); });
                  }
                  else { this.container.querySelectorAll('[data-is-primary="true"]').forEach((div) => { div?.classList.add('primaryActive'); }); }
                  selFilterArr.forEach(item => this.loadSelFilters(item, this));
                }
                /*------------------------------------------------------------------*/

                this.container.querySelector(".search-facet-container").removeAttribute("hidden");
                this.container.querySelector(".a-pagination").removeAttribute("hidden");
              }
              this.getSearchQueryString();
              if (this.searchStr !== "") {
                this.searchIconEle?.dispatchEvent(new MouseEvent("click"));
              }
              Common.hideSpinner();
            } else {
              this.renderNoResults();
            }
          }.bind(this)
        )
        .catch(
          function (e: any) {
            console.log(e);
            this.renderNoResults();
          }.bind(this)
        )
        .finally(
          function () {
            Common.hideSpinner();
          }.bind(this)
        );

    }


    private renderResults(
      results: Array<any>,
      count: any,
      currPage: Number = 1
    ) {
      const templateStr = [];
      if (isNaN(this.pageSize)) {
        this.pageSize = 10;
      }
      this.container.querySelector(".o-search-res__no-results").style.display = "none";
      const pages = Math.ceil(count / this.pageSize);
      const fromPage = ((currPage - 1) * this.pageSize) + 1;
      if (pages < 1) {
        fromPage = (currPage - 1) * this.pageSize;
        pages = 1;
      }
      const toPage = currPage * this.pageSize;
      if (toPage > count) {
        toPage = count;
      }

      let newSetResults = results.slice((currPage - 1) * this.pageSize, currPage * this.pageSize);
      $("#paginationResultTop").empty();
      let initialPaginationValue = this.paginationString;
      initialPaginationValue = initialPaginationValue.replace("{page}", fromPage + "-" + toPage);
      initialPaginationValue = initialPaginationValue.replace(
        "{count}",
        count
      );
      $("#paginationResultTop").append(
        "<span>" + initialPaginationValue + "</span>"
      );
      //Sticky Filter pagination count
      $("#stickyFilterCount").empty();
      $("#stickyFilterCount").append(
        "<span>" + initialPaginationValue + "</span>"
      );
      newSetResults.forEach(
        function (result: any) {
          const cloneNode: HTMLElement = this.templateEle.content
            .cloneNode(true)
            .querySelector(".result-items");
          const externalLink = cloneNode.querySelector(".a-link.external-link a");
          const searchResultBtnLblField = cloneNode.querySelector(".a-result__link")?.innerHTML;
          //search result button label is not a mandatory field, therefore check if field is available.
          const searchResultBtnLblAttr = searchResultBtnLblField?.replace(/\{|\}/g, "");
          if (result.uriextensiontype === "video") {
            cloneNode.querySelector(".a-card-result__link")?.remove();
            cloneNode.querySelector(".a-list-result__link")?.remove();
            cloneNode.querySelector(".a-link.external-link")?.remove();
          } else if (result.uriextensiontype === "externalLink") {
            cloneNode.querySelector(".brightcove-video-link")?.remove();
            cloneNode.querySelector(".a-card-result__link")?.remove();
            cloneNode.querySelector(".a-list-result__link")?.remove();
          } else {
            if (result.contenttype === "clinical-resources") {
              cloneNode
                .querySelector(".a-result__link")
                ?.setAttribute(
                  "data-content-type", "clinical-resources"
                );
            }
            cloneNode.querySelector(".brightcove-video-link")?.remove();
            cloneNode.querySelector(".a-link.external-link")?.remove();
          }
          if (
            result.searchresultbuttonuri === null ||
            result.searchresultbuttonuri === undefined
          ) {
            cloneNode
              .querySelector(".a-result__link")
              ?.setAttribute(
                "data-href",
                cloneNode
                  .querySelector(".a-result__link")
                  ?.getAttribute("data-default-search-btn-link")
              );
            cloneNode
              .querySelector(".a-card-result__image-link")
              ?.setAttribute(
                "data-href",
                cloneNode
                  .querySelector(".a-card-result__image-link")
                  ?.getAttribute("data-default-search-btn-link")
              );
              externalLink?.setAttribute("data-redirect-url", externalLink?.getAttribute("data-default-search-btn-link"));
          }
          if (result[searchResultBtnLblAttr] === null || result[searchResultBtnLblAttr] === undefined) {
            cloneNode.querySelector(".a-result__link")?.innerHTML = cloneNode.querySelector(".a-result__link")?.getAttribute("data-default-search-btn-label");
            if (externalLink?.hasAttribute("data-default-search-btn-label")) {
              externalLink?.innerHTML = externalLink?.getAttribute("data-default-search-btn-label");
            }
          }
          let tempStr = cloneNode.outerHTML;
          const matches = tempStr.match(/\{(.*?)\}/gm);
          const uniqueMatches = Array.from(new Set(matches));
          uniqueMatches.forEach((match) => {
            const key = match.replace(/\{|\}/g, "");
            const reg = new RegExp(match, "gm");
            tempStr = tempStr.replace(reg, result[key] || "");
          });
          templateStr.push(tempStr);
        }.bind(this)
      );
      Common.hideSpinner();
      this.pagination.render(pages, currPage);
      this.resultsEle.innerHTML = templateStr.join("").replace(/(\®)/g, `<sup>$1</sup>`);
      this.brightcoveVideoModalLinkEle = this.container.querySelectorAll(
        ".brightcove-video-link"
      );
      this.brightcoveVideoModalLinkEle.forEach((item) => {
        item?.addEventListener("click", this.onBrightCoveModalLinkClick.bind(this));
      });
      Common.initRedirectConfirmPopup();
      if (count === 0) {
        this.renderNoResults();
      }
      this.addUrl(".a-result__link");
      this.addUrl(".a-card-result__image-link");

      // Sticky menu with search whole card click 
      const stickyMenu = document.querySelector(".sticky-menu__filter");
      if (stickyMenu) {
        stickyMenu.querySelectorAll(".a-card-result").forEach(function (elemCard) {
          elemCard.addEventListener('click', function (elem) {
            elem.stopPropagation();
            const anchorElem = this.querySelector(".a-card-result__image a");
            anchorElem.click();
          });
        });
      }
    }

    private addUrl(ElementIdentifier: string) {
      const link = this.container.querySelectorAll(ElementIdentifier);
      link.forEach((ele) => {
        let url = ele.getAttribute("data-href");
        if (!!url && !url.includes("pdf")) {
          ele.setAttribute("href", url);
        }

      });
    }

    private renderCategories(categories: Array<any>) {
      categories.forEach(
        function (category: any) {
          this.renderCategory(category);
        }.bind(this)
      );
      if (this.container.querySelectorAll('[data-is-primary="true"]').length > 0 || this.container.querySelectorAll('[data-is-secondary="true"]').length > 0) {
        this.getCategoryData();
        this.updatePrimaryActive(this);
      }
    }

    private renderCategory(facetGroup: any) {
      const catFacetNames = [];
      if (this.isTagSearchFacet) {
        if (facetGroup.field !== this.categoryTagFacetsStr) {
          return;
        }
        this.resultsContainer.querySelectorAll('[data-tag-field-name]').forEach(function (tagFacetEle) {
          catFacetNames.push(tagFacetEle.dataset.tagFieldName)
        });
      } else {
        catFacetNames.push(facetGroup.field);
      }
      catFacetNames.forEach(function (catFacetNameVal, index) {
        const catName = catFacetNameVal;
        const linkStackEle = this.resultsContainer.querySelector(
          '.searchfacet [data-field-name="' + catName + '"]'
        );
        const template: any = linkStackEle?.querySelector("template");
        const contentContainer = linkStackEle?.querySelector(
          ".m-link-stack--content"
        );
        const finalStr = [];
        if (linkStackEle) {
          const isMultiple = linkStackEle.getAttribute("data-is-multiple");
          const isSort = linkStackEle.getAttribute("data-is-sort");
          const sortingOrder = linkStackEle.getAttribute("data-sort-by-order");
          const isTruncationEnable = linkStackEle.dataset.isTruncationEnable;
          if (isSort === "true") {
            this.getSortedResults(facetGroup.values, "value", sortingOrder);
          }
          let catFacetsToRender = {};
          if (facetGroup.values.length > 0) {
            if (this.isTagSearchFacet) {
              let tagValueEleId = '#' + this.categoryTagFacetsStr + '-' + index;
              let catFacetName = document.querySelector(tagValueEleId).getAttribute("name");
              let catFacetAllTagsStr = document.querySelector(tagValueEleId).getAttribute("value");
              let catFacetAllTagsJson = catFacetAllTagsStr ? JSON.parse(catFacetAllTagsStr) : [];
              let isCatFacetsNotBlank = catFacetAllTagsJson[catFacetName] && catFacetAllTagsJson[catFacetName].length > 0;
              catFacetsToRender["values"] = isCatFacetsNotBlank ?
                facetGroup.values.filter(valObj => catFacetAllTagsJson[catFacetName].includes(valObj.value)) : [];
            } else {
              catFacetsToRender = facetGroup;
            }
            if (catFacetsToRender.values.length > 0) {
              this.resultsContainer.querySelector(
                '.searchfacet [data-category-name="' + catName + '"]'
              ).removeAttribute("hidden");
              document.querySelectorAll('.view-all').forEach(function (el) {
                el.style.display = "block";
              });
            }
          }
          catFacetsToRender.values.forEach(
            function (facet: { value: string; numberOfResults: string }) {
              const tmplEle = template.content
                .cloneNode(true)
                .querySelector(".faq-link.m-search-category__item");
              if (isTruncationEnable == "true")
                tmplEle.classList.add("facet-link");
              const dynamicEle: HTMLElement = tmplEle.querySelector(
                '[aria-label="{link-text}"]'
              );
              if (isMultiple == "true") {
                dynamicEle.innerHTML =
                  "<label class='a-checkbox__label' for='" +
                  facet.value +
                  "'>" +
                  "<span class='a-checkbox__text'>" +
                  facet.value +
                  " <span>(" +
                  facet.numberOfResults +
                  ")</span></span>" +
                  "<input type='checkbox' class='a-checkbox__input' name = '" +
                  facet.value +
                  "' id='" +
                  facet.value +
                  "' data-required='true'>" +
                  "<span class='a-checkbox__custom'></span>" +
                  "</label>";
                if (this.selectedFacet?.value === facet.value) {
                  dynamicEle.classList.add(dynamicEle.className + "--active");
                }
                dynamicEle.dataset.fieldName = catName;
                dynamicEle.setAttribute("aria-label", facet.value);
                finalStr.push(tmplEle.outerHTML);
              } else {
                dynamicEle.innerHTML =
                  facet.value + " <span>(" + facet.numberOfResults + ")</span>";
                dynamicEle.dataset.fieldName = catName;
                dynamicEle.setAttribute("aria-label", facet.value);
                if (this.selectedFacet?.value === facet.value) {
                  dynamicEle.classList.add(dynamicEle.className + "--active");
                }
                finalStr.push(tmplEle.outerHTML);
              }
            }.bind(this)
          );
          contentContainer.innerHTML = finalStr.join("");
        }

        //Sticky filter topics element remove from facet    
        const stickyMenu = document.querySelector(".sticky-menu__filter");
        if (stickyMenu) {
          var stickyELeList = document.querySelectorAll('.stickyMenu .faq-link .a-link__text');
          var tagList = document.querySelectorAll('.m-search-category .faq-link .a-link__text');
          stickyELeList.forEach(function (ele) {

            tagList.forEach(function (elem) {
              if (ele.getAttribute('aria-label') == elem.getAttribute('aria-label')) {
                elem.remove();
              }
            });

          });
        }

      }.bind(this));
    }

    private attachEvent() {
      this.facetEle.forEach((item) => {
        item?.addEventListener("click", this.onCategoryFacetClick.bind(this));
      });
      this.sortEle.forEach((item) => {
        item?.addEventListener("click", this.onSortByClick.bind(this));
      });
      this.searchIconEle?.addEventListener(
        "click",
        this.onSearchClick.bind(this)
      );
      this.searchField?.addEventListener(
        "keyup",
        function (evt: KeyboardEvent) {
          if (evt.key === "Enter") {
            this.searchIconEle?.dispatchEvent(new MouseEvent("click"));
          }
        }.bind(this)
      );
      this.brightcoveVideoPopupCloseEle?.addEventListener("click", this.onBrightCoveVideoPopupCancel.bind(this));
      this.clearAllFiltersEle?.addEventListener("click", this.refreshPageWithoutParams.bind(this))
    }

    private viewAllCategoryOption(response: any) {
      let catDropdown = this.container.querySelectorAll('.m-link-stack--dropdown');
      for (let i = 0; i < catDropdown.length; i++) {
        response.categoryFacets.forEach(function (item) {
          if (item.field === catDropdown[i].dataset.fieldName && item.values.length <= 3 && item.values.length > 0) {
            catDropdown[i].nextElementSibling.remove();
            catDropdown[i].style.marginBottom = "30px";
          }
          if (item.field === catDropdown[i].dataset.fieldName && item.values.length < 1) {
            catDropdown[i].nextElementSibling.remove();
            catDropdown[i].previousElementSibling.remove();
            catDropdown[i].style.marginBottom = "0px";
            catDropdown[i].style.display = "none";
          }
        })
      }
    }

    private refreshCategoryCount(searchResults: any) {
      let catFacetsValArr = [];
      let catValObjCnt = {};
      for (let i = 0; i < searchResults.length; i++) {
        let tempArr = JSON.parse(sessionStorage.getItem('CategoryLabels')).filter(function (e) {
          return (Object.keys(searchResults[i])).indexOf(e) > -1;
        });
        for (let catlbl = 0; catlbl < tempArr.length; catlbl++) {
          if (searchResults[i][tempArr[catlbl]].length >= 1) {
            catFacetsValArr.push(...searchResults[i][tempArr[catlbl]]);
          }
        }
      }
      catValObjCnt = getElementCountInArray(catFacetsValArr);

      let tempArray = JSON.parse(sessionStorage.getItem('ValContainer'));
      tempArray.forEach(element => {
        if (this.container.querySelector('[for="' + element['value'] + '"]') && element['secondary'] === 'true') {
          this.container.querySelector('[for="' + element['value'] + '"]').querySelector('.a-checkbox__text span').textContent = '(0)';
        }
        Object.keys(catValObjCnt).forEach(fieldName => {
          if (element['value'] === fieldName) {
            element['numberOfResults'] = catValObjCnt[fieldName];
            if (this.container.querySelector('[for="' + fieldName + '"]') && element['secondary'] === 'true') {
              this.container.querySelector('[for="' + fieldName + '"]').querySelector('.a-checkbox__text span').textContent = '(' + catValObjCnt[fieldName] + ')';
            }
          }
        });
      });
      sessionStorage.setItem('ValContainer', JSON.stringify(tempArray));

      function getElementCountInArray(arr) {
        const countObj = {};
        for (const value of arr) {
          if (countObj[value]) {
            countObj[value] += 1;
          } else {
            countObj[value] = 1;
          }
        }
        return countObj;
      }
    };

    private onCategoryFacetClick(evt: MouseEvent) {
      const $dropVal = this.container.querySelector(
        ".m-link-stack--dropdown-value"
      );
      const target = (evt.target as HTMLElement)
        .closest(".faq-link")
        .querySelector("[aria-label]");
      this.stickyTarget = (evt.target as HTMLElement)
        .closest(".stickyMenu")
        ?.querySelector("[aria-label]");

      if (this.stickyTarget) {
        document.querySelectorAll(".stickyMenu .a-link__text").forEach((item) => {
          item.classList.remove('a-link__text--active');
        });
        this.selectedStickyTopic = evt.target.getAttribute("aria-label");

      }
      const categoryParent = target.closest('.faq-link').closest(".js-faq-links");
      const categoryValue = target.getAttribute("aria-label");
      const categoryHtml = target.innerHTML;
      const hasActiveClass = target.classList.contains('a-link__text--active');
      let filterBox = this.container.querySelector(".filter");
      let roundedPills = this.container.querySelectorAll(".rounded-pill");
      let roundedPillbtn = document.createElement("button");
      roundedPillbtn.type = "button";
      roundedPillbtn.classList.add("btn", "border", "rounded-pill");
      roundedPillbtn.innerHTML = categoryValue + "<em class='" + this.crossIcon + "'></em>";
      var dataCatSetFieldName;

      if (hasActiveClass) {
        categoryParent.classList.remove("category-parent");
        target.classList.remove('a-link__text--active');
        roundedPills.forEach((item) => {
          if (item.innerText === categoryValue) {
            item.remove();
          }
        });
      } else {
        categoryParent.classList.add("category-parent");
        target.classList.add('a-link__text--active');
        filterBox.appendChild(roundedPillbtn);
      }
      if (this.selectedFacet.value !== categoryValue) {
        dataCatSetFieldName = target.dataset.fieldName;
        this.selectedFacet.fieldName = dataCatSetFieldName;
        this.selectedFacet.value = categoryValue;
        this.selectedFacetEle = target;
        $dropVal.innerHTML = categoryHtml;
      }

      this.currentPage = 1;

      if (this.selectedFacet.value) {
        this.checkSelFilterArr(categoryValue);
        if (this.filters.hasOwnProperty(this.selectedFacet.fieldName)) {
          if (
            this.filters[this.selectedFacet.fieldName].includes(
              this.selectedFacet.value
            )
          ) {
            this.filters[this.selectedFacet.fieldName].splice(
              this.filters[this.selectedFacet.fieldName].indexOf(
                this.selectedFacet.value
              ),
              1
            );
            if (this.filters[this.selectedFacet.fieldName].length == 0) {
              delete this.filters[this.selectedFacet.fieldName];
            }
          } else {
            this.filters[this.selectedFacet.fieldName].push(
              this.selectedFacet.value
            );
          }
        } else {
          const filtersArr: Array<object> = [];
          filtersArr.push(this.selectedFacet.value);
          this.filters[this.selectedFacet.fieldName] = filtersArr;
        }
      }
      const searchResults = JSON.parse(sessionStorage.getItem("searchResult"))
        .response.results;
      this.filteredResultsArr = this.filterSearchResults(searchResults);
      $("#paginationResultTop").empty();
      let tempPaginationValue = this.paginationString;
      tempPaginationValue = tempPaginationValue.replace(
        "{count}",
        JSON.stringify(this.filteredResultsArr.length)
      );
      $("#paginationResultTop").append(
        "<span>" + tempPaginationValue + "</span>"
      );

      //Sticky Filter pagination count
      $("#stickyFilterCount").empty();
      $("#stickyFilterCount").append(
        "<span>" + tempPaginationValue + "</span>"
      );

      this.filteredTagEle = this.container.querySelectorAll(".rounded-pill");
      this.filteredTagEle.forEach((item) => {
        item.querySelector('em')?.addEventListener("click", this.onRoundPillClick.bind(this));
      });
      let searchResults = JSON.parse(JSON.stringify(this.filteredResultsArr));
      searchResults = this.getSortedResults(searchResults, "title", this.sortByOrder);
      if (this.container.querySelectorAll('[data-is-primary="true"]').length > 0 || this.container.querySelectorAll('[data-is-secondary="true"]').length > 0) {
        this.refreshCategoryCount(searchResults);
      }
      this.renderResults(searchResults, searchResults.length);
    }

    private filterSearchResults(searchResults: any, xFilterTag: any = ""): any {
      let filteredSearchResults: Array<object> = [];
      var isfilterTagfacet,filterTagfacet;
      if(this.isTagSearchFacet){
        isfilterTagfacet = "true";        
      }
      else{
        isfilterTagfacet = "false";
      }

      // Sticky menu filter tag check and uncheck logic
        if (this.stickyTarget) {
          let stickyElem = document.querySelectorAll(".sticky-menu__filter .stickyMenu .a-link__text");
          let stickyElemLabel = [];
          let filterCatgFacet = this.filters.categorytagfacets;
          stickyElem.forEach(function (item) {
            stickyElemLabel.push(item.getAttribute("aria-label"));
            filterCatgFacet = filterCatgFacet.filter(val => !stickyElemLabel.includes(val));
        });
        filterCatgFacet.push(this.selectedStickyTopic);
          this.filters.categorytagfacets = filterCatgFacet;
      }

      /* Start -> logic to handle filter tag close */
      const filterdArr = Object.keys(this.filters);
      let newFilterArr = this.filters;
      const _this = this;
      if (xFilterTag.length > 0 && filterdArr.length > 0) {
        for (let key in this.filters) {
          const xIndex = this.filters[key].indexOf(xFilterTag);
          if (xIndex > -1) {
            this.filters[key].splice(xIndex, 1);
            newFilterArr[key] = this.filters[key];
            if (newFilterArr[key].length < 1) {
              delete newFilterArr[key];
            }
          }
        }
      }
      /* End -> logic to handle filter tag close */
      const searchFilters = newFilterArr;
      Object.keys(newFilterArr).forEach(function (filter, index) {
        let filteredORSearchResults: Array<object> = [];
        if(isfilterTagfacet === "true"){ 
          if(filter.includes("categorytagfacets")){
            filterTagfacet = "categorytagfacets"; 
          } 
          else{
            filterTagfacet = filter; 
          }      
                 
        }
        else{
          filterTagfacet = filter;
        }
        searchFilters[filter].forEach(function (value: any) {
          if (searchFilters[filter].length > 1 && index == 0) {
            searchResults.forEach(function (result: object) {
              if (
                result[filterTagfacet] != undefined &&
                _this.checkValue(result, filterTagfacet, value)
              ) {
                filteredSearchResults.push(result);
              }
            });
          } else if (searchFilters[filter].length > 1 && index > 0) {
            filteredSearchResults.forEach(function (result) {
              if (
                result[filterTagfacet] != undefined &&
                _this.checkValue(result, filterTagfacet, value)
              ) {
                filteredORSearchResults.push(result);
              }
            });
          } else if (
            Object.entries(searchFilters).length == 1 ||
            index == 0
          ) {
            filteredSearchResults = searchResults.filter(
              (result: { [x: string]: string | any[] }) =>
                result[filterTagfacet] != undefined
                  ? _this.checkValue(result, filterTagfacet, value)
                  : false
            );
          } else {
            filteredSearchResults = filteredSearchResults.filter((result) =>
              result[filterTagfacet] != undefined
                ? _this.checkValue(result, filterTagfacet, value)
                : false
            );
          }
          const temp: Array<object> = [];
          filteredSearchResults = filteredSearchResults.filter((item) => {
            if (!temp.includes(item.sysurihash)) {
              temp.push(item.sysurihash);
              return true;
            }
          });
        });
        if (searchFilters[filter].length > 1 && index > 0)
          filteredSearchResults = filteredORSearchResults;
      });
      if (Object.entries(searchFilters).length == 0) {
        filteredSearchResults = searchResults;
      }

      //Sticky menu filter with combination of topics and category
      const stickyMenu = document.querySelector(".sticky-menu__filter");
      if(this.selectedStickyTopic != "View all"){
        if (stickyMenu) {
          if (this.selectedFacetEle.classList.contains("a-link__text--active")) {
            const currentCatValue = document.querySelector(".m-search-category__content .faq-link .a-link__text.a-link__text--active")?.getAttribute('aria-label');
            var searchResultFilteredArrary = [];
            for (var i = 0; i < filteredSearchResults.length; i++) {
              if (((filteredSearchResults[i][this.selectedFacet.fieldName].indexOf(this.selectedStickyTopic) > -1) || (!this.selectedStickyTopic)) && ((filteredSearchResults[i][this.selectedFacet.fieldName].indexOf(currentCatValue) > -1) || (!currentCatValue))) {
                searchResultFilteredArrary.push(filteredSearchResults[i]);
              }
            }
            filteredSearchResults = searchResultFilteredArrary;
          }
        }
      }
      else{
        filteredSearchResults = searchResults;
      }
      return Array.from(new Set(filteredSearchResults));
    }

    private onRoundPillClick(evt: MouseEvent) {
      let clickedFilterTag = evt.target.parentNode.innerText.trim();
      var searchResults = JSON.parse(sessionStorage.getItem("searchResult"))
        .response.results;
      evt.target.parentNode.remove();
      var categoryItems = this.container.querySelectorAll('.search-category-item');

      for (var i = 0; i < categoryItems.length; i++) {
        const target = categoryItems[i].querySelector("[aria-label]");
        const tagValue = target.getAttribute("aria-label");
        const hasActiveClass = target.classList.contains('a-link__text--active');
        if (tagValue === clickedFilterTag && hasActiveClass) {
          target.classList.remove('a-link__text--active');
          this.checkSelFilterArr(tagValue);
        }
      }
      this.filteredResultsArr = this.filterSearchResults(searchResults, clickedFilterTag);
      let searchResultsClone = JSON.parse(JSON.stringify(this.filteredResultsArr));
      searchResultsClone = this.getSortedResults(searchResultsClone, "title", this.sortByOrder);
      this.renderResults(searchResultsClone, searchResultsClone.length);
    }

    private onBrightCoveModalLinkClick(evt: MouseEvent) {
      let _this = this
      let videoModal = document.getElementById("videoModal");
      var hcpModal = document.getElementById('btnModalLegalPopUp-modal');
      if (hcpModal === null) {
        hcpModal = document.getElementById('btnModalSearchResultsPopUp-modal');
        var btnClose = document.querySelector('#btnModalSearchResultsPopUp-modal .abt-icon-cancel');
        var btnLink = document.querySelector('#btnModalSearchResultsPopUp-modal .a-button--primary .btn');
        var btntwoLink = document.querySelector('#btnModalSearchResultsPopUp-modal .a-button--secondary a.btn');
      } else {
        var btnClose = document.querySelector('#btnModalLegalPopUp-modal .abt-icon-cancel');
        var btnLink = document.querySelector('#btnModalLegalPopUp-modal .a-button--primary .btn');
        var btntwoLink = document.querySelector('#btnModalLegalPopUp-modal .a-button--secondary a.btn');
      }

      const target = evt.target as HTMLElement;
      let brightCovePopupEle: HTMLElement =
        this.container.querySelector(".brightcove-video-wrapper");
      if (localStorage.getItem('visit') === "1" || localStorage.getItem("firstVisit") === "1") {
        hcpModal?.style.display = "none";
        videoModal.style.display = "block";
        this.videoAppend(brightCovePopupEle, target);
      } else {
        hcpModal?.style.display = "block";
        videoModal.style.display = "none";
      }
      hcpModal?.style.backgroundColor = "#0000007a";
      this.modalReset(btnClose, hcpModal, videoModal);
      this.modalReset(btntwoLink, hcpModal, videoModal);
      btnLink?.addEventListener('click', function (event) {
        localStorage.setItem("visit", "1");
        localStorage.setItem("firstVisit", "1");
        hcpModal?.style.display = "none";
        hcpModal?.style.backgroundColor = "#0000007a";
        videoModal.style.display = "block";
        videoModal.style.backgroundColor = "#0000007a";
        _this.videoAppend(brightCovePopupEle, target);
      })
    }
    private modalReset(close, modal1, modal2) {
      close?.addEventListener('click', function (event) {
        modal1.style.display = "none";
        modal1.style.backgroundColor = "#fff";
        modal2.style.display = "none";
        document.querySelectorAll('.modal-backdrop').forEach(function (el) {
          el.remove();
        });
        event.preventDefault();
      });
    }

    private videoAppend(popupEle, tgt) {
      this.brightcoveVideoPopupEle.dataset.account = tgt.dataset.account;
      this.brightcoveVideoPopupEle.dataset.player = tgt.dataset.player;
      this.brightcoveVideoPopupEle.dataset.videoId = tgt.dataset.videoId;
      const brightCoveScriptEle = document.createElement("script");
      brightCoveScriptEle.classList.add("scriptTag");
      brightCoveScriptEle.setAttribute(
        "src",
        "https://players.brightcove.net/" +
        tgt.dataset.account +
        "/" +
        tgt.dataset.player +
        "_default/index.min.js"
      );

      popupEle.innerHTML = this.brightcoveVideoPopupEle.outerHTML;
      popupEle.closest(".modal-body").appendChild(brightCoveScriptEle);
    }

    private onBrightCoveVideoPopupCancel(evt: MouseEvent) {
      this.container.querySelector(".brightcove-video-wrapper").innerHTML = "";
      this.container.querySelector(".brightcove-video-wrapper").closest(".modal-body").querySelector(".scriptTag")?.remove();
    }

    private ascendingOrderSort(sortByValue: string) {
      return function (obj1, obj2) {
        if (obj1[sortByValue].toLowerCase() > obj2[sortByValue].toLowerCase()) {
          return 1;
        } else if (obj1[sortByValue].toLowerCase() < obj2[sortByValue].toLowerCase()) {
          return -1;
        }
        return 0;
      };
    }
    private descendingOrderSort(sortByValue: string) {
      return function (obj1, obj2) {
        if (obj1[sortByValue].toLowerCase() < obj2[sortByValue].toLowerCase()) {
          return 1;
        } else if (obj1[sortByValue].toLowerCase() > obj2[sortByValue].toLowerCase()) {
          return -1;
        }
        return 0;
      };
    }
    private onSortByClick(evt: MouseEvent) {
      const target = evt.target;
      this.sortByOrder = target.dataset.sortByOrder;
      sessionStorage.setItem('SortByOrder', this.sortByOrder);
      const sortByValue = "title";
      let searchResults =
        this.filteredResultsArr.length > 0
          ? JSON.parse(JSON.stringify(this.filteredResultsArr))
          : JSON.parse(sessionStorage.getItem("searchResult")).response.results;
      searchResults = this.getSortedResults(searchResults, "title", this.sortByOrder);
      this.renderResults(searchResults, searchResults.length);
    }

    private getSearchQueryString() {
      const url = new URL(window.location.href);
      let searchQuery = url.searchParams.get("q");
      this.searchStr =
        searchQuery !== undefined && searchQuery !== null
          ? decodeURIComponent(searchQuery)
          : "";
          if (this.qryStrngFlagVal === "true" && sessionStorage.getItem('QueryValue') !== null &&
          searchQuery === null) {
            let queryValue = JSON.parse(sessionStorage.getItem("QueryValue"));
            this.searchStr = queryValue;
          }
      this.container.querySelector("#search-filter")?.value = this.searchStr;
    }

    private onSearchClick(evt: MouseEvent) {
      const target = (evt.target as HTMLElement)
        .closest(".search-filter")
        .querySelector("#search-filter");
      this.searchStr = target.value;
      if(this.qryStrngFlagVal === "true"){
        sessionStorage.setItem('QueryValue', JSON.stringify(target.value));
      }
      let searchResults = JSON.parse(sessionStorage.getItem("searchResult")).response.results;
      if (this.searchStr !== "" && this.searchStr !== null) {
        this.filters["title"] = [];
        this.filters["title"].push(this.searchStr);
      } else {
        delete this.filters["title"];
      }
      this.filteredResultsArr = this.filterSearchResults(searchResults);
      let searchResultsClone = JSON.parse(JSON.stringify(this.filteredResultsArr));
      searchResultsClone = this.getSortedResults(searchResultsClone, "title", this.sortByOrder);
      this.renderResults(searchResultsClone, searchResultsClone.length);
    }

    private renderNoResults() {
      this.container.dataset.results = '0';
      this.container.querySelector(".o-search-res__no-results")?.style.display = "block";
    }

    private checkValue(obj: any, key: string, value: string): boolean {
      return (Array.isArray(obj[key]) ? obj[key].some(arrValue => arrValue.toLowerCase() === value.toLowerCase())
        : key === "title" ? (obj[key].toLowerCase().includes(value.toLowerCase()) || obj["description"]?.toLowerCase().includes(value.toLowerCase())
          || obj["categorytagfacets"]?.some(arrValue => arrValue.toLowerCase().includes(value.toLowerCase())))
          : obj[key].toLowerCase().includes(value.toLowerCase()));
    }

    private getSortedResults(searchResults: any, sortByValue: string, sortByOrder: string): any {
      if (sortByOrder === "descending") {
        searchResults.sort(this.descendingOrderSort(sortByValue));
      } else if (sortByOrder === "ascending") {
        searchResults.sort(this.ascendingOrderSort(sortByValue));
      }
      return searchResults;
    }

    private refreshPageWithoutParams() {
      if (sessionStorage.getItem('FilterArray') !== null) {
        sessionStorage.removeItem('FilterArray');
      }
      if (sessionStorage.getItem('SortByOrder') !== null) {
        sessionStorage.removeItem('SortByOrder');
      }
      if (sessionStorage.getItem('QueryValue') !== null) {
        sessionStorage.removeItem('QueryValue');
      }
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      params.delete('q'); // Delete the "q" parameter.
      if (params.toString() != "") {
        window.open(new URL(url.origin + url.pathname + "?" + params.toString()), "_self");
      } else {
        window.open(new URL(url.origin + url.pathname), "_self");
      }
    }

  }

  $(function () {
    // Stickymenu enhancement with search

    const stickyMenu = document.querySelector(".sticky-menu__filter");

    if (stickyMenu) {

      const stickyElem = stickyMenu.querySelector(".stickyMenu");

      stickyElem.querySelector(".m-link-stack__list").classList.add("js-faq-links");
      stickyElem.querySelectorAll(".m-link-stack__list-item").forEach((ele) => {
        ele.classList.add("faq-link");
        ele.querySelectorAll('.a-link__text').forEach((eleAnchor) => {
          eleAnchor.setAttribute("data-field-name", "categorytagfacets")
        });
      });
      stickyMenu.querySelector(".o-search-res__no-results").classList.add("container");
      stickyMenu.querySelector(".o-search-res__results--view").classList.add("container");
      stickyMenu.querySelector(".a-pagination").classList.add("container");
      stickyMenu.querySelector(".a-pagination").classList.add("px-3");

      var stickyELeList = document.querySelectorAll('.stickyMenu .faq-link .a-link__text');
      var tagList = document.querySelectorAll('.m-search-category .faq-link .a-link__text');
      stickyELeList.forEach(function (ele) {
        tagList.forEach(function (elem) {
          if (ele.getAttribute('aria-label') == elem.getAttribute('aria-label')) {
            elem.remove();
          }
        });
      });
    }

    document
      .querySelectorAll('[data-js-component="search-results-with-filters"]')
      .forEach((ele) => {
        new SearchResultsWithFilters(ele as HTMLElement);
      });

  });


  var stickyMenu = document.querySelector(".sticky-menu__filter");
  if (stickyMenu) {
    categoryElemCheck();
  }

  function categoryElemCheck() {

    var cateELementList = stickyMenu.querySelectorAll('.m-search-category__content .faq-link .a-link__text');
    var filterHashValue_1 = window.location.hash.substring(1);
    if (cateELementList.length != 0) {
      cateELementList.forEach(function (eleCate) {
        var checkHashVal = eleCate.getAttribute('aria-label').toLowerCase().replace(/ /g, "-");
        if (checkHashVal == filterHashValue_1.toLowerCase()) {
          eleCate.click();
        }
      });
    } else {
      setTimeout(function () {
        categoryElemCheck();
      }, 1000);
    }
  }

})();
$('body').on('click', 'article a.a-list-result__link', function (e) {
  //var hrefValue = $(this).attr('href');
  var datahrefValue = $(this).attr('data-href');
  var contentType = $(this).data('content-type');

  if (contentType === "clinical-resources") {
    var hcpModal = document.getElementById('btnModalSearchResultsPopUp-modal');
    if (hcpModal === null) {
      hcpModal = document.getElementById('btnModalLegalPopUp-modal');
    }
  }
  var windowElement;
  if (hcpModal !== null && hcpModal !== undefined) {
    hcpModal?.style.display = "block";
    hcpModal?.style.backgroundColor = "#0000007a";
    $("#btnModalLegalPopUp-modal .a-button--primary a.btn").attr("target", "_blank");
    $("#btnModalLegalPopUp-modal .a-button--primary a.btn").attr("href", datahrefValue);
    if (localStorage.getItem("visit") === "1" || localStorage.getItem("firstVisit") === "1") {
      hcpModal?.style.display = "none";
      if (document.querySelector('.a-list-result__link')) {
        if (datahrefValue.includes('/content/dam/')) {
          windowElement = window.open(datahrefValue, '_blank');
          windowElement.focus();
        } else {
          window.location.href = datahrefValue;
        }
      };
    }
  } else {
    if (datahrefValue.includes('/content/dam/')) {
      windowElement = window.open(datahrefValue, '_blank');
      windowElement.focus();
    } else {
      window.location.href = datahrefValue;
    }
  }
  if ($("#btnModalLegalPopUp-modal").length > 0) {
    document.querySelector('#btnModalLegalPopUp-modal .a-button--primary .btn').addEventListener('click', function (event) {
      localStorage.setItem("visit", "1");
      localStorage.setItem("firstVisit", "1");
      $("#btnModalLegalPopUp-modal .a-button--primary a.btn").attr("href", datahrefValue);
    });
  }
  if ($("#btnModalSearchResultsPopUp-modal").length > 0) {
    document.querySelector('#btnModalSearchResultsPopUp-modal .a-button--primary .btn').addEventListener('click', function (event) {
      localStorage.setItem("visit", "1");
      localStorage.setItem("firstVisit", "1");
      $("#btnModalSearchResultsPopUp-modal .a-button--primary a.btn").attr("href", datahrefValue);
      window.location.href = datahrefValue;
    });
  }
  e.preventDefault();
});
$('body').on('click', ' #btnModalLegalPopUp-modal .a-button--secondary .btn', function (event) {
  document.getElementById('btnModalLegalPopUp-modal')?.style.display = "none";
  $('#videoModal').hide();
  $(".modal-backdrop").hide();
  var hrefValue = $("#btnModalLegalPopUp-modal .a-button--secondary .btn").attr("href");
  window.location.href = hrefValue;
  event.preventDefault();
})
$('body').on('click', '.generic-modal--close, #btnModalSearchResultsPopUp-modal .a-button--secondary .btn', function (event) {
  document.getElementById('btnModalSearchResultsPopUp-modal')?.style.display = "none";
  $(".modal-backdrop").hide();
  event.preventDefault();
})
$('body').on('click', '.generic-modal--close', function (event) {
  if ($("#btnModalLegalPopUp-modal").length > 0) {
    document.getElementById('btnModalLegalPopUp-modal')?.style.display = "none";
  }
  if ($("#videoModal").length > 0) {
    document.getElementById('videoModal')?.style.display = "none";
  }
  $(".modal-backdrop").hide();
  event.preventDefault();
});
$(".mob-filter a").on("click", function () {
  $(".searchfacet").show();
});
$(".apply-button, #backToResult").on("click", function () {
  $(".searchfacet").hide();
});
$("#reloadResultPage").on("click", function () {
  window.location.reload();
});
$('#menuItem li').on("click", function () {
  $('#selectedValue').html($(this).text() + '<span><em class="abt-icon abt-icon-down-arrow" aria-hidden="true"></em></span>');
  $(this).next(".dropdown-menu").slideToggle();
})
$(".view-all a").on("click", function () {
  if ($(this).hasClass("list-collapsed")) {
    $(this)
      .find("em")
      .removeClass("abt-icon-down-arrow")
      .addClass("abt-icon-up-arrow");
    $(this).removeClass("list-collapsed").addClass("list-expand").find('span').text("View Less");
    $(this)
      .parent()
      .prev(".m-link-stack--dropdown")
      .find(".faq-link")
      .show(500);
    if (window.screen.width < 768) {
      $(this)
        .parent()
        .prev(".m-link-stack--dropdown")
        .find(".m-link-stack--content")
        .css("max-height", "-webkit-fill-available");
    }
  } else {
    $(this)
      .find("em")
      .removeClass("abt-icon-up-arrow")
      .addClass("abt-icon-down-arrow");
    $(this).addClass("list-collapsed").removeClass("list-expand").find('span').text("View All");
    $(this)
      .parent()
      .prev(".m-link-stack--dropdown")
      .find(".faq-link:gt(2)")
      .hide(500);
  }
});
$(document).on('hide.bs.modal', '#videoModal', function () {
  this.querySelector(".brightcove-video-wrapper").innerHTML = "";
  this.querySelector(".brightcove-video-wrapper").closest(".modal-body").querySelector(".scriptTag")?.remove();
});

$(window).on('load', function() {
  if($(".m-search-results__card-item-detail-url").length > 0) {
    var cardItemURL = $(".m-search-results__card-item-detail-url span");
    $(cardItemURL).each(function() {
      var cardItemURLVal = $(this).find('span').text();
      $(this).find('a').attr('href', cardItemURLVal);
    })
  }

  if($(".m-search-results__list-item-detail-url").length > 0) {
    var listItemURL = $(".m-search-results__list-item-detail-url span");
    $(listItemURL).each(function() {
      var listItemURLVal = $(this).find('span').text();
      $(this).find('a').attr('href', listItemURLVal);
    })
  }
});