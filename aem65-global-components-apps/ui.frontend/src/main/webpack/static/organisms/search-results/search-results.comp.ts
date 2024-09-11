import {Pagination} from '../../atoms/pagination/pagination.comp';
import {SearchBar} from '../../molecules/search-bar/search-bar.comp';
import {DefaultLinkStack} from '../../molecules/link-stack/link-stack.comp';
import { Common } from '../../common';
import 'slick-carousel';

(function () {

  interface Facet {
    fieldName?: string;
    value?: string;
  }

  /**
   * @requires Pagination
   * @requires SearchBar
   * @requires DefaultLinkStack
   */
  class SearchResults {

    private container: HTMLElement;
    private resultsCountEle: HTMLElement;
    private chipsList: HTMLElement;
    private tabs: HTMLElement;
    private featuresCardFaq: HTMLElement;
    private templateEle: HTMLElement;
    private resultsEle: HTMLElement;
    private resultsContainer: HTMLElement;
    private facetEle: HTMLElement;
    private pagination: Pagination;
    private searchBar: SearchBar;
    private faqLinkStack: DefaultLinkStack;
    private resultsCount: any;
    private cardsCarousel: any;
    private api: string;
    private firstResult: number;
    private pageSize: number;
    private currentPage: any = 1;
    private searchStr: string;
    private filters: any = {};
    private categoryFacet: string;
    private sort: Array<object> = [];
    private selectedFacet: Facet = {};
    private selectedFacetEle: any;
    private selectedCard: any;
    private selectedHierarchialFacet: Facet = {};
    private searchType: string;
    private isCategoryClicked: boolean;
    private currentFilter: string;
    private initialActiveTab: HTMLElement ;
    private searchField: HTMLInputElement;
    private searchSubmitBtn: HTMLButtonElement;
    private searchResetBtn: HTMLButtonElement;
    private searchCloseIcon: HTMLElement;
    private searchFacetTruncate: any = {};
    private preferedLang: string;
    private applicationId: string
    private isPreviewMode: string;
    private callbackList: any = {};
    private srId: string;
    private onSuccessFn: string;

    constructor (ele: HTMLElement) {
      if (!ele) {
        throw new Error('Search result container element is required');
      }
      this.container = ele;
      this.onSuccessFn = ele.querySelector('input[name="onSuccess"]')?.getAttribute('value');
      this.resultsCountEle = ele.querySelector('.o-search-res__count');
      this.chipsList = ele.querySelector('.m-chips-list');
      this.tabs = ele.querySelector('.a-tabs');
      this.featuresCardFaq = ele.querySelector('.o-features-card-faq');
      this.resultsContainer = ele.querySelector('.o-search-res__container');
      this.resultsEle = ele.querySelector('.o-search-res__results');
      this.facetEle = ele.querySelector('.js-faq-links');
      this.cardsCarousel = ele.querySelector('[data-js-component="carousel"]');
      this.api = ele.dataset.apiUrl;
      this.pageSize = +ele.dataset.pageSize;
      this.searchType = ele.dataset.searchType;
      this.templateEle = ele.querySelector(`.${this.searchType}-temp`) ? ele.querySelector(`.${this.searchType}-temp`) : ele.querySelector('#result-temp');
      this.initialActiveTab = this.tabs?.querySelector('.active');
      this.searchField = ele.querySelector('.m-search-bar__input-field');
      this.searchCloseIcon = ele.querySelector('.m-search-bar__input .m-search-bar__close');
      this.searchSubmitBtn = ele.querySelector('.m-search-bar__search-button .btn[type="submit"]');
      this.searchResetBtn = ele.querySelector('.m-search-bar__reset-button .btn[type="reset"]');
      this.searchFacetTruncate = ele.querySelectorAll('.m-link-stack--truncate');
      this.preferedLang = (document.querySelector('[name="x-preferred-language"]') as HTMLInputElement)?.value;
      this.applicationId = (document.querySelector('[name="x-application-id"]') as HTMLInputElement)?.value;
      this.isPreviewMode = (document.querySelector('[name="wcmMode"]') as HTMLInputElement)?.value;

      if (Common.isMobile) {
        this.mobileVersionCarousel();
      }

      this.initHierarchialFacet();

      document.addEventListener('carousel:initialised',function () {
        // Wait for carousel to be initialised and then filter the cards
        // Default Tab selection
        this.initCarousel();
      }.bind(this), false);

      this.initPagination();
      this.initSearchbar();
      this.extractFilters();
      this.extractSort();
      this.attachEvent();

      this.setPagePathOnFilters();
      this.srId = ele.id;
      this.setSRCallbacks();
      this.setCallbackBucket(this.srId);
      
      if (this.isPreviewMode === 'false') {
        this.fetchSearchResults();
      }

    }

    private mobileVersionCarousel() {
      const carousel = this.cardsCarousel as HTMLElement;
      carousel.parentElement.classList.add('mobile-carousel');
    }

    private attachEvent() {
      window.addEventListener('popstate', this.onHistoryPopState.bind(this));
      this.chipsList?.addEventListener('click', this.onChipsClick.bind(this));
      this.tabs?.addEventListener('click', this.onTabsClick.bind(this));
      this.featuresCardFaq?.addEventListener('click', this.onCardClick.bind(this));
      this.facetEle?.addEventListener('click', this.onCategoryFacetClick.bind(this));
      this.cardsCarousel?.addEventListener('click', this.onFeatureCardClick.bind(this));
      this.searchResetBtn?.addEventListener('click', this.onResetButtonClick.bind(this));
      this.searchCloseIcon?.addEventListener('click', this.onCloseIconClick.bind(this));
      this.searchFacetTruncate.forEach((item) => {
        item?.querySelector('a').addEventListener("click", this.onTruncateClick.bind(this));
      });
    }

    private initHierarchialFacet() {
      if (this.initialActiveTab) {
        this.selectedHierarchialFacet.fieldName = this.initialActiveTab.dataset.fieldName;
        this.selectedHierarchialFacet.value = this.initialActiveTab.dataset.childFilter;
        this.showHideChipsList(this.initialActiveTab.dataset.childFilter);
      }
    }

    private initCarousel() {
      if (this.initialActiveTab) {
        this.showHideFeatureCards(this.initialActiveTab.dataset.childFilter);
      }
    }

    private showHideFeatureCards(parentFilter) {
      const carouselEle = this.cardsCarousel;
      if (carouselEle) {
        if (carouselEle.classList.contains('slick-initialized')  && this.currentFilter != parentFilter)  {
          if (!!this.currentFilter) {
            $(carouselEle).slick('slickUnfilter');
          }

          $(carouselEle).slick('slickFilter', function(idx: number, ele: HTMLElement) {
            return !!ele.querySelector('[data-parent-filter="'+parentFilter+'"]');
          });

          $(carouselEle).slick('refresh');
          $(carouselEle).slick('slickGoTo', 0, false);
          this.currentFilter = parentFilter;

          this.adjustCardHeight();
        }
      }
    }

    private showHideChipsList(parentFilter) {
      const chipsList = this.chipsList;

      if (chipsList && this.isPreviewMode === 'false') {
        const matched = chipsList.querySelectorAll('[data-parent-filter="'+parentFilter+'"]');
        const notMatched = chipsList.querySelectorAll('.a-chips:not([data-parent-filter="'+parentFilter+'"])');

        matched.forEach((ele) => {
          ele.classList.remove('d-none');
        });

        notMatched.forEach((ele) => {
          ele.classList.add('d-none');
        });

        if (matched.length === 0) {
          chipsList.classList.add('d-none');
        } else {
          chipsList.classList.remove('d-none');
        }

      }
    }

    private onFeatureCardClick(evt: MouseEvent) {
      const target: HTMLElement = (evt.target as HTMLElement).closest('[data-parent-filter]');
      if (target === null) {
        return;
      }
      if(this.selectedCard) {
        this.selectedCard.classList.remove('o-features-card--active');
      }

      if (target?.dataset.childFilter !== this.selectedCard?.dataset.childFilter) {
        target.classList.add('o-features-card--active');
        this.selectedCard = target;
      } else {
        delete this.filters[this.selectedCard.dataset.fieldName];
        this.selectedCard = null;
      }
      this.currentPage = 1;
      this.fetchSearchResults();
    }

    private onCategoryFacetClick(evt: MouseEvent) {
      const $dropVal = this.container.querySelector('.m-link-stack--dropdown-value');
      const target = (evt.target as HTMLElement).closest('a');
      const categoryValue = target.getAttribute('aria-label');
      const categoryHtml = target.innerHTML;
      if(this.selectedFacetEle) {
        this.selectedFacetEle.classList.remove('a-link__text--active');
      }

      if (this.selectedFacet.value !== categoryValue) {
        target.classList.add('a-link__text--active');
        this.selectedFacet.fieldName = target.dataset.fieldName;
        this.selectedFacet.value = categoryValue;
        this.selectedFacetEle = target;
        $dropVal.innerHTML = categoryHtml;
      } else {
        delete this.filters[this.selectedFacet.fieldName];
        this.selectedFacet = {};
        this.selectedFacetEle = null;

      }

      this.currentPage = 1;
      this.fetchSearchResults();
    }

    private onHistoryPopState(popEvent: PopStateEvent){
      const state = popEvent.state;
      if (!state) {
        return;
      }

      this.searchStr = decodeURIComponent(state.q);
      this.currentPage = state.p;
      this.searchBar.setSearchValue(this.searchStr);
      this.fetchSearchResults();
    }

    private onTabsClick(eve: MouseEvent) {
      eve.preventDefault();
      const ele = (eve.target as HTMLElement).closest('a');
      let tabSearchType = ele.getAttribute('data-tabsearch-type');
      
      this.selectedHierarchialFacet.fieldName = ele.dataset.fieldName;
      this.selectedHierarchialFacet.value = ele.dataset.childFilter;
      if (this.selectedFacet?.fieldName){
        delete this.filters[this.selectedFacet.fieldName];
        this.selectedFacet = {};
        this.selectedFacetEle = null;
      }
      if(this.selectedCard) {
        this.selectedCard.classList.remove('o-features-card--active');
        delete this.filters[this.selectedCard.dataset.fieldName];
        this.selectedCard = null;

      }
      this.showHideFeatureCards(ele.dataset.childFilter);
      this.showHideChipsList(ele.dataset.childFilter);
      if(this.searchField.value == '') {
        this.clearSearch();
      }

      this.currentPage = 1;

      if(tabSearchType && tabSearchType !== "") {
        this.searchType = tabSearchType;
      }

      this.fetchSearchResults();
      
    }

    private onCardClick(eve: MouseEvent) {
      eve.preventDefault();
    }

    private onChipsClick(eve: MouseEvent) {
      eve.preventDefault();
      const target = eve.target as HTMLElement;
      if (target.tagName === 'A') {
        this.searchBar.setSearchValue(target.innerText.trim());
      }
    }

    //Clear and Reset Search 
    private clearSearch() {
      const pageurl = new URL(window.location.href);
      pageurl.searchParams.delete('q');
      pageurl.searchParams.delete('p');

      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (error) {
        //do nothing
      }

      this.searchField.value = '';
      this.searchStr = '';

      this.searchCloseIcon.classList.remove('show');
    }

    private onCloseIconClick(eve: MouseEvent) {
      eve.preventDefault();
      
      this.searchField.value = '';
      this.searchStr = '';

      this.searchCloseIcon.classList.remove('show');
    }

    private onResetButtonClick(eve: MouseEvent) {
      eve.preventDefault();
      this.clearSearch();

      if(this.initialActiveTab) {
        this.initialActiveTab.click();
      }
    }

    private onTruncateClick(eve: MouseEvent){
      const targetDropdown = (eve.target as HTMLElement).closest(".m-link-stack-faq--wrapper");
      const targetContent = targetDropdown.querySelector('.m-link-stack--content');
      const moreText = targetDropdown.querySelector('.m-link-stack--more');
      const lessText = targetDropdown.querySelector('.m-link-stack--less');
      const truncateIcon = targetDropdown.querySelector('.abt-icon');
      const faqLinks = targetDropdown.querySelectorAll('.faq-link');
      const countOnClick: any = targetDropdown.getAttribute('data-visible-length');
      var faqLinkIndex: number = 0;
      if(targetContent.classList.contains('list-collapsed')){
        faqLinks.forEach((item) => {
          $(item).show(500);
        });
        moreText.classList.add('d-none');
        lessText.classList.remove('d-none');
        truncateIcon.classList.add('abt-icon-up-arrow');
        targetContent.classList.remove('list-collapsed')
      }
      else{
        faqLinks.forEach((item) => {
          faqLinkIndex++;
          if(faqLinkIndex > countOnClick){
            $(item).hide(500);
          }
        });
        moreText.classList.remove('d-none');
        lessText.classList.add('d-none');
        truncateIcon.classList.remove('abt-icon-up-arrow');
        targetContent.classList.add('list-collapsed')
      } 
    }

    private registerHistory(){
      const url = new URL(window.location.href);
      const params = url.searchParams;
      params.set('q', encodeURIComponent(this.searchStr));
      params.set('p', this.currentPage);
      try {
        history.pushState({q: this.searchStr, p: this.currentPage}, null, url.toString());
      } catch (error) {
        //do nothing
      }
    }

    private initPagination() {
      const paginationEle = this.container.querySelector('.a-pagination');
      this.pagination = new Pagination(paginationEle as HTMLElement);
      this.pagination.onPageClick(this.onPageClick.bind(this));
      this.currentPage = this.pagination.getCurrentPage();
    }

    private initSearchbar() {
      const searchBarEle = this.container.querySelector('.m-search-bar');
      this.searchBar = new SearchBar(searchBarEle as HTMLElement);
      this.searchBar.onSearchChange(this.onSearchChange.bind(this));
      this.searchStr = this.searchBar.getSearchValue();

      //append search and reset icon for mobile if not authored
      if(Common.isMobile && this.searchSubmitBtn?.querySelector('.abt-icon') == null) {
        $(this.searchSubmitBtn).prepend('<em class="abt-icon abt-icon-search" aria-hidden="true"></em>');
      }
      if(Common.isMobile && this.searchResetBtn?.querySelector('.abt-icon') == null) {
        $(this.searchResetBtn).prepend('<em class="abt-icon abt-icon-reset" aria-hidden="true"></em>');
      }
    }

    private onSearchChange(searchStr: any) {
      if (this.searchStr === searchStr) {
        return;
      }
      this.searchStr = searchStr;

      if (this.selectedFacet?.fieldName) {
        delete this.filters[this.selectedFacet.fieldName];
        this.selectedFacet = {};
        this.selectedFacetEle = null;
      }

      if (this.selectedCard) {
        delete this.filters[this.selectedCard.dataset.fieldName];
        this.selectedCard = null;
      }

      this.currentPage = 1;
      this.fetchSearchResults();
      this.registerHistory();
    }

    private onPageClick(data: any) {
      if (+data === this.currentPage) {
        return;
      }
      this.currentPage = +data;
      this.fetchSearchResults();
      this.registerHistory();
      this.scrollToTop();
    }

    private getRequestHeaders(): any {
      return Common.getPageParamsForHeader();
    }

    private extractFilters(): any {
      const tempFilters = this.container.querySelectorAll('[type="hidden"][data-filters="true"]');
      tempFilters.forEach(function (filter: HTMLInputElement) {
        this.filters[filter.name] = filter.value;
      }.bind(this));
    }


    private extractSort(): any {
      const tempSort = this.container.querySelectorAll('[type="hidden"][data-sort="true"]');
      tempSort.forEach(function(sort: HTMLInputElement) {
        const obj: any = {};
        obj[sort.name] = sort.value;
        this.sort.push(obj);
      }.bind(this));
    }

    private setPagePathOnFilters() {
      const url = new URL(window.location.href);
      const path = url.searchParams.has('path') ? url.searchParams.get('path') : '' ;
      if (path) {
        this.filters['path'] = decodeURIComponent(path);
      }
    }

    private getRequestBody(): any {
      let body: any = {};
      body = Common.getPageParamsForBody();
      this.firstResult = ((this.currentPage - 1) * this.pageSize) + 1;
      body.firstresult = this.firstResult;
      body.numberofresults = this.pageSize;
      body.q = this.searchStr;
      body.filters = [this.filters];
      body.numberofresults = this.pageSize;
      body.autocorrect = "true";
      body.searchtype = this.searchType;
      body.sort = this.sort;

      //append filters with tab selection
      this.filters[this.selectedHierarchialFacet.fieldName] = this.selectedHierarchialFacet.value;

      if(this.selectedFacet?.value){
        this.filters[this.selectedFacet.fieldName] = this.selectedFacet.value;
      }

      if(this.selectedCard){
        this.filters[this.selectedCard.dataset.fieldName] = this.selectedCard.dataset.childFilter;
      }

      return JSON.stringify(body);
    }


    private scrollToTop() {
      var containerScrollTop = this.getOffsetTop(this.container);
      var menuHeight = (document.querySelector('.o-header-v2-global__sticky-section.sticky') as HTMLElement)?.offsetHeight;
      menuHeight = menuHeight?menuHeight:0;
      Common.scrollTo(this.container.offsetTop==0?(containerScrollTop-menuHeight):this.container.offsetTop - 10, 500);
    }

    private getOffsetTop(element) {
      let offsetTop = 0;
      while(element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    }


    private fetchSearchResults() {

      Common.showSpinner(this.container);
      let requestBodyString = this.getRequestBody();
      let requestBody = JSON.parse(this.getRequestBody());
      let requestFilters = encodeURIComponent(JSON.stringify(requestBody.filters));
      let urlParam = `?q=${requestBody.q}&searchtype=${requestBody.searchtype}&firstresult=${requestBody.firstresult}&numberofresults=${requestBody.numberofresults}&filters=${requestFilters}`;
      let serviceAPI = this.api;
      let serviceMethod = "post";
      let dataOptions:any = {
        method: serviceMethod,
        headers: this.getRequestHeaders(),
        body: requestBodyString
      } 
      if(document.querySelector('[data-search-type="getfaqsearch"]')){
        serviceAPI = serviceAPI+urlParam;
        serviceMethod = "get";
        requestBodyString = "";
        dataOptions = {
          method: serviceMethod,
          headers: this.getRequestHeaders()
        }
      }
      fetch(serviceAPI, dataOptions)
        .then((resp) => resp.json())
        .then(function (data: any) {
          if (data.errorCode === 0) {
            const response = data.response;
            this.resultsCount = response.totalCount;
            if (response.totalCount > 0) {

              /*Remove old and store new searchUid in session*/
              Common.clearSearchRegisterEventSession(this.searchType);
              if (this.searchType == 'sitesearch') {
                sessionStorage.setItem(Common.serachRegister.searchUid + this.applicationId + '_' + this.preferedLang, response.searchUid);
              }

              this.renderResults(response.results, response.totalCount);
              this.addUrl();
            } else {
              this.renderNoResults();
            }
            if (response.categoryFacets && response.categoryFacets.length > 0) {
              this.renderCategories(response.categoryFacets);
            }
          }
        }.bind(this))
        .catch(function (e: any) {
          console.log(e);
          this.renderNoResults();
        }.bind(this))
        .finally(function () {
          Common.hideSpinner();
        }.bind(this));
    }

    private renderCategories(categories: Array<any>) {
      categories.forEach(function(category: any) {
       this.renderCategory(category);

      }.bind(this));
    }

    private renderCategory(facetGroup: any) {
      const catName = facetGroup.field;
      const searchFacetEle: HTMLElement = this.resultsContainer.querySelector('.searchfacet');
      const linkStackEle = this.resultsContainer.querySelector('.searchfacet [data-field-name="'+catName+'"]');
      const template: any = linkStackEle?.querySelector('template');
      const contentContainer = linkStackEle?.querySelector('.m-link-stack--content');
      const finalStr = [];
      const facetWrapper: any = linkStackEle?.closest('.m-link-stack-faq--wrapper');
      const truncationEnabled = facetWrapper?.classList.contains('m-link-stack--truncation');
      const truncateCount: any = facetWrapper?.getAttribute('data-visible-length');
      var faqIndex: number = 0;
      if(linkStackEle) {
        if(facetGroup.values.length > 0){
          facetGroup.values.forEach(function(facet){
            const tmplEle =  template.content.cloneNode(true).querySelector(':first-child');
            const dynamicEle: HTMLElement = tmplEle.querySelector('[aria-label="{link-text}"]');
            dynamicEle.innerHTML = facet.value+' <span>('+facet.numberOfResults+')</span>';
            dynamicEle.dataset.fieldName = catName;
            dynamicEle.setAttribute('aria-label', facet.value);
            if(this.selectedFacet?.value === facet.value) {
              dynamicEle.classList.add(dynamicEle.className+'--active');
            }
            if(truncationEnabled && !Common.isMobile){
                if(facetGroup.values.length > truncateCount){
                  faqIndex++;
                  contentContainer.classList.add('list-collapsed');
                  if(faqIndex > truncateCount){
                    tmplEle.style.display = 'none';
                  }
                  this.resetTruncateLink(facetWrapper);
                }
                else{facetWrapper.querySelector('.m-link-stack--truncate').classList.add('d-none');}
            }
            finalStr.push(tmplEle.outerHTML);
          }.bind(this));
          contentContainer.innerHTML = finalStr.join('');
          facetWrapper.style.display = 'block';
          
          // Get facet dropdown title
          var activeFacet = facetWrapper.querySelector('.faq-link .a-link__text--active');
          if(activeFacet){
            var facetTitle = activeFacet.innerText;
          } 
          else{
            var facetTitle = facetWrapper.querySelector('.m-link-stack--title').innerText;
          }
          facetWrapper.querySelector('.m-link-stack--dropdown-value').innerText = facetTitle.trim();
          if (searchFacetEle) {
            searchFacetEle.style.display = 'block';
          }
        }
        else{
          facetWrapper.style.display = 'none';
        }
      }
    }

    /**
    * @function
    * @desc Adds searchresultCallbacks container to public namespace
    */
     private setSRCallbacks() {
      window.searchresultCallbacks = window.searchresultCallbacks || {};

      const srId = this.srId;
      if (!srId) {
        return;
      }

      if (!window.searchresultCallbacks[srId]) {
        window.searchresultCallbacks[srId] = {};
      }

      const callbackList = window.searchresultCallbacks[srId];

      if (this.onSuccessFn) { callbackList.onSuccess = this.onSuccessFn; }
    }

      /**
     * @function
     * @desc fetches callbacks for the current form instance from the callback-bucket
     * @param {String} formId form ID
     */
    public setCallbackBucket(srId: string) {

      // if srId not given, do nothing
      if(!srId) {
          return;
      }

      const callbackBucket = window.searchresultCallbacks;
      this.callbackList = callbackBucket[srId];
  }

       /**
     * @function
     * @desc checks if passed value is a function
     * @param fn
     * @return {Boolean} validation result if passed value is a function
     */
        private isFunction(fn: any): boolean {
          return fn && typeof fn === 'function';
      }

      private onSuccess(response: any) {
        const onSuccessFn: Function = window[this.callbackList.onSuccess]; 
        if (!this.isFunction(onSuccessFn)) {
            return response;
        }else{
            var newResponse = onSuccessFn(response);
            return newResponse;
        }
      }

    private renderResults(results: Array<any>, count: any) {
      const onSuccessFn: Function = window[this.callbackList.onSuccess]; 
      const templateStr = [];
      const pages = Math.ceil(count / this.pageSize);
      const chiplistEle: HTMLElement = this.resultsContainer.querySelector('.chipslist');
      if (this.isFunction(onSuccessFn)) {
        this.categoryFacet=this.filters.categorytagfacets;
        onSuccessFn(results,this.categoryFacet);
      }
      else {
        results.forEach(function (result: any) {
          this.templateEle = this.container.querySelector(`.${this.searchType}-temp`) ? this.container.querySelector(`.${this.searchType}-temp`) : this.container.querySelector('#result-temp');
          const cloneNode: HTMLElement = this.templateEle?.content.cloneNode(true).querySelector(':first-child');
          let tempStr = cloneNode.classList.contains('a-result') ? cloneNode.outerHTML : cloneNode.innerHTML;
          const matches = tempStr.match(/\{(.*?)\}/gm);
          const uniqueMatches = Array.from(new Set(matches));

          uniqueMatches.forEach((match) => {
            const key = match.replace(/\{|\}/g, '');
            const reg = new RegExp(match, 'gm');
            tempStr = tempStr.replace(reg, result[key] || '');
          });
          templateStr.push(tempStr);
          this.resultsEle.innerHTML = templateStr.join('');
      this.resultsCountEle.innerText = count;
      this.pagination.render(pages, this.currentPage);
      this.container.dataset.results = '' + count;
      if(chiplistEle){chiplistEle.style.display = 'block';}
        }.bind(this));
      }
      
    }

    private renderNoResults() {
      this.container.dataset.results = '0';
      this.hideCategories();
    }

    private hideCategories(){
      const linkStackElem: HTMLElement = this.resultsContainer.querySelector('.searchfacet');
      const chiplistElem: HTMLElement = this.resultsContainer.querySelector('.chipslist');
      if(linkStackElem){linkStackElem.style.display = 'none';}
      if(chiplistElem){chiplistElem.style.display = 'none';}
    }

    private resetTruncateLink(facetContainr){
      facetContainr.querySelector('.m-link-stack--truncate').classList.remove('d-none');
      facetContainr.querySelector('.m-link-stack--more').classList.remove('d-none');
      facetContainr.querySelector('.m-link-stack--less').classList.add('d-none');
      facetContainr.querySelector('.abt-icon').classList.remove('abt-icon-up-arrow');
      facetContainr.querySelector('.m-link-stack--content').classList.add('list-collapsed');
    }
    
    private onSerachResultsItemClick(evt: MouseEvent) {
      evt.preventDefault();

      const target: HTMLElement = (evt.target as HTMLElement).closest('.a-result');
      if (target === null) {
        return;
      }

      /*get searchUid from session*/
      let serachRegConEvtUid: string;
      let serachRegConEvtState: string;
      let searchRegConEvtObj: string;

      if (this.searchType == 'sitesearch') {
        serachRegConEvtUid = Common.serachRegister.searchUid + this.applicationId + '_' + this.preferedLang;
        serachRegConEvtState = Common.serachRegister.searchState + this.applicationId + '_' + this.preferedLang;
        searchRegConEvtObj = Common.serachRegister.searchObj + this.applicationId + '_' + this.preferedLang;
      }

      let tempObj = {
        actionCause: target.dataset.actionCause || 'documentOpen',
        eventType: target.dataset.eventType || 'searchResultClick',
        urlHash: target.dataset.uriHash,
        pageURL: target.dataset.uri,
        title: (evt.target as HTMLElement).innerText,
        documentPosition: target.dataset.documentPosition,
        searchUid: sessionStorage.getItem(serachRegConEvtUid)
      };

      sessionStorage.setItem(serachRegConEvtState, 'true');
      sessionStorage.setItem(searchRegConEvtObj, JSON.stringify(tempObj));

      let targetLink: string = (evt.target as HTMLElement).getAttribute('href');

      if(targetLink && targetLink !== "") {
        window.location.href = targetLink;
      }

    }

    private addUrl() {
      const link = this.container.querySelectorAll('.a-result__title--link');
      link.forEach((ele, index)=> {
        let url = ele.getAttribute('data-href');
        if (!!url) {
          ele.setAttribute('href', url);
          ele.removeAttribute('data-href');
        }

        let pos = Number(this.firstResult + index).toString();
        ele.closest('.a-result').setAttribute('data-document-position', pos);

        if (this.searchType == 'sitesearch') {
          ele.addEventListener('click', this.onSerachResultsItemClick.bind(this));
        }

      });
    }

    private adjustCardHeight () {
      document.querySelectorAll('.o-cards-carousel .slick-track').forEach((elm: HTMLDivElement) => {
        let maxHeight = 0;
        const card = elm.querySelectorAll('.m-card .o-features-card');
        if(!card.length) return;

        card.forEach((item: HTMLDivElement) => {
          item.style.height = 'auto';
          if (item.clientHeight > maxHeight) {
            maxHeight = item.clientHeight;
          }
        });

        card.forEach((crd: HTMLDivElement) => {
          crd.style.height = `${maxHeight}px`;
        });
      });
    }
  }

  $(function() {
    document.querySelectorAll('[data-js-component="search-results"]').forEach((ele)=>{
      new SearchResults(ele as HTMLElement);
    });

    //hide searchFacet and ChipList section for 0 results. Align search results container in center
    var searchFacetDivLength = $('.searchfacet').children().length;
    var chipListLength = $('.m-chips-list__head').children().children().length;
    if (searchFacetDivLength == 0 && chipListLength == 0) {
      $('.o-search-res__container .col-md-3').hide();
      if (window.matchMedia('(min-width: 769px)').matches) {
        $('.o-search-res__container .col-md-8').addClass('offset-md-2');
      }
    }

    // check for serach register content event data
    Common.checkSearchSession('sitesearch');

  });

}());