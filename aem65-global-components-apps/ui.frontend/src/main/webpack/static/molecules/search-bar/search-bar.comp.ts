import { Common } from '../../common';

declare global {
  interface Window {
      predictiveSearchVal : string;
      predictiveSearchInitialized : boolean;
  }
}
window.predictiveSearchInitialized = false;
export class SearchBar {
  private container: HTMLElement;
  private autoComplete: HTMLElement;
  private searchField: HTMLInputElement;
  private inputContainer: HTMLElement;
  private submitButton: HTMLButtonElement;
  private subscribers: Array<any> = [];
  private expressionResult: Array<any> = [];
  private highlightResult: Array<any> = [];
  private api: string;
  private filters: Array<object> = [];
  private abortController: AbortController;
  private selectedAutoCompleteItem: HTMLElement;
  private isAutocompleteVisible: any = false;
  private isSearchPageCheck: HTMLElement;
  private isPredictiveSearchEnable: HTMLInputElement;
  private predictiveForm: HTMLElement;
  private autoCompleteList : HTMLElement;
  private predictiveSearchInputField: HTMLInputElement;
  private isHeaderV2: boolean = false;


  /**
   *
   */
  constructor(ele: HTMLElement) {
    this.container = ele;
    this.cacheElements();
    this.attachEvents();
    this.abortController = new AbortController();
    //this.fetchFilters();

    // on search result page - fetch suggestion on load 
    if (this.isPredictiveSearchEnable?.value == 'true') {
      if (this.isSearchPageCheck) {
        this.fetchAutoSearchResults();
      }
    } else {
      this.fetchAutoSearchResults();
    }

    if (this.container.dataset.autoLoadQueryParam === 'true') {
      this.searchField.value = this.getSearchQueryParam();
      // redirecting to search page, placeholder handling of search name of predictive header 
      if (this.isPredictiveSearchEnable?.value == 'true') {
        this.predictiveSearchInputField.value = '';
      }
    }

  }

  private cacheElements() {
    this.searchField = this.container.querySelector('.m-search-bar__input-field');
    this.inputContainer = this.container.querySelector('.m-search-bar__input');
    this.submitButton = this.container.querySelector('.btn[type="submit"]');
    this.autoComplete = this.container.querySelector('.m-search-bar__autocomplete');
    this.api = this.container.dataset.api || '';
    // predictive header search variable
    this.isSearchPageCheck = document.querySelector('.searchbar');
    this.isPredictiveSearchEnable = document.querySelector('[name="enablePredictiveSearch"]');
    this.predictiveForm = this.container.querySelector('.predictiveForm');
    this.autoCompleteList = this.container.querySelector('.m-search-bar__autocomplete-list');
    this.predictiveSearchInputField = document.querySelector('.predictive-search-bar .m-search-bar__input-field');
    this.isHeaderV2 = !!document.querySelector('.o-header-v2-global');

    if (this.isHeaderV2) {
      this.isPredictiveSearchEnable = this.container.parentElement?.querySelector(
        '[name="enablePredictiveSearch"]'
      );
      this.predictiveSearchInputField = this.container.querySelector(
        '.predictive-search-bar .m-search-bar__input-field'
      );
    }
  }

  private attachEvents() {
    const searchField = this.searchField;
    const closeIcon = searchField.nextElementSibling;

    searchField.addEventListener('keyup', () => {
      if (searchField.value.trim() !== ''){
        closeIcon.classList.add('show');
      } else {
        closeIcon.classList.remove('show');
      }
    });

    this.inputContainer.addEventListener('click', function(evt: MouseEvent) {
      const tgt = (evt.target as HTMLElement).closest('.m-search-bar__autocomplete-item');
      if (tgt) {
        this.markAutocompleteItemSelected(tgt);
        this.hideAutoComplete();
        // only predictive search to submit on result item click and not for search result bar item click
        if (this.isPredictiveSearchEnable?.value == 'true') {
          if(this.predictiveForm){
            this.predictiveForm.submit();
          } 
        }
      }

      !this.isHeaderV2 && evt.stopPropagation();
    }.bind(this));

    document.addEventListener('click', function(evt:any) {
      if (!evt.target.classList.contains('m-search-bar__input-field')){
        this.hideAutoComplete();
      }

      //on sticky predictive search bar - clear the search field and auto complete results
      if (this.isPredictiveSearchEnable?.value == 'true') {
        this.clearPredictiveAutoCompleteItems(this.container, searchField, this.autoCompleteList);
      }
    }.bind(this));

    searchField.addEventListener('focus', function() {
      // empty search autocomplete items only for predictive header
      if (this.isPredictiveSearchEnable?.value == 'true') {
        this.clearPredictiveAutoCompleteItems(this.container, searchField, this.autoCompleteList);
      }
      this.showAutoComplete();
    }.bind(this));

    searchField.addEventListener('keyup', function(evt: KeyboardEvent) {
      if (evt.key === 'Enter') {
		window.searchButtonId = evt.target.id;
        this.publish();
        this.hideAutoComplete();
        return;
      }

      if (!this.api) {
        return;
      }

      if(/Meta|Alt|Control|Shift/gi.test(evt.key)){
        return;
      }

      if (/Arrow|Escape/gi.test(evt.key) === false) {
        this.abortController.abort();
        
        //on predictive header search duplicate querysuggest call issue
        if (this.isPredictiveSearchEnable?.value == 'true') {
          if (window.predictiveSearchInitialized == true && window.predictiveSearchVal == this.searchField.value.trim()) {
            return;
          }
          window.predictiveSearchVal = this.searchField.value.trim();
        }
        this.fetchAutoSearchResults();
        
        //on predictive header search while undo typing to see autocomplete
        if (this.isPredictiveSearchEnable?.value == 'true') {
          this.showAutoComplete();
        }
        return;
      }

      let ele;
      const selItem = this.selectedAutoCompleteItem;
      const defaultSelItem = this.getFirstAutoCompleteItem();
      let newSelItem;

      switch(evt.key) {
        case 'ArrowUp':
          if (!selItem) {
            newSelItem = defaultSelItem;
          } else {
            newSelItem = selItem.previousElementSibling || defaultSelItem;
          }
          this.markAutocompleteItemSelected(newSelItem);
          evt.preventDefault();
          break;
        case 'ArrowDown':
          if (!selItem) {
            newSelItem = defaultSelItem;
          } else {
            newSelItem = selItem.nextElementSibling || this.getLastAutoCompleteItem();
          }
          this.markAutocompleteItemSelected(newSelItem);
          evt.preventDefault();
          break;
        case 'Escape':
          this.hideAutoComplete();
          evt.preventDefault();
          break;
      }


    }.bind(this));

    closeIcon.addEventListener('click', (evt: MouseEvent) => {
      evt.preventDefault();
      searchField.value = '';
      closeIcon.classList.remove('show');
    });

    this.submitButton.addEventListener('click', function (evt: MouseEvent) {
      evt.preventDefault();
	  window.searchButtonId = evt.target.id;
	  if(evt.target.closest(".o-search-res").querySelectorAll(".o-search-res__container .o-search-res__results")[0].children.length > 0 && evt.target.closest(".o-search-res").querySelectorAll(".o-search-res__container .o-search-res__results")[0].children[0].className == "search-table") {
		evt.target.closest(".o-search-res").querySelectorAll(".o-search-res__container .o-search-res__results")[0].children[0].classList.add("removetd");
	  }
      this.publish();
    }.bind(this));
  }

  private getSearchQueryParam() {
    const url = new URL(window.location.href);
    const q = url.searchParams.has('q') ? url.searchParams.get('q') : '' ;
    return decodeURIComponent(q);
  }

  private publish() {
    const data = this.getSearchValue();
    this.subscribers.forEach((handler: Function)=>{
      handler(data);
    });
  }

  public onSearchChange(handler: Function) {
    this.subscribers.push(handler);
  }

  public getSearchValue() {
    return this.searchField.value.trim();
  }

  public setSearchValue(searchStr: string){
    this.searchField.value = searchStr;
    this.publish();
    this.fetchAutoSearchResults();
  }

  private fetchFilters(): any {
    const tempFilters = this.container.querySelectorAll('[type="hidden"][data-filters="true"]');
    tempFilters.forEach( function (filter: HTMLInputElement) {
      let obj: any = {};
      obj[filter.name] = filter.value;
      this.filters.push(obj);
    }.bind(this));
  }

  private getRequestHeaders(): any {
    return Common.getPageParamsForHeader();
  }

  private getRequestBody(): any {
    let body: any = {};
    body = Common.getPageParamsForBody();
    body.q = this.getSearchValue();
    //body.filters = this.filters;
    return JSON.stringify(body);
  }


  private clearPredictiveAutoCompleteItems(container: HTMLElement, searchField: HTMLInputElement, autoCompleteList: HTMLElement) {
    if(container.classList.contains('predictive-search-bar')){  // for search bar check
      searchField.value = '';
      autoCompleteList.innerHTML = '';
    }
  }


  private fetchAutoSearchResults() {
    const headers = this.getRequestHeaders();

    if (!this.api || this.searchField.value.trim().length <=0) {
      return;
    }
    this.abortController = new AbortController();

   
    window.predictiveSearchInitialized = true;

    fetch(this.api, {
      signal: this.abortController.signal,
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: headers,
      body: this.getRequestBody()
    })
    .then((resp) => resp.json())
    .then(function(data: any) {
      const response = data.response.completions;
      if(response?.length > 0) {
        this.selectedAutoCompleteItem = null;
        SearchBar.renderAutoComplete(response, this.container);
      } else {
        this.hideAutoComplete();
      }
    }.bind(this))
    .catch(() => {
      //do nothing
      console.log('error');
    });
  }

  private getFirstAutoCompleteItem() {
    return this.autoComplete.querySelector('.m-search-bar__autocomplete-item:first-child');
  }

  private getLastAutoCompleteItem() {
    return this.autoComplete.querySelector('.m-search-bar__autocomplete-item:last-child');
  }

  private hideAutoComplete() {
    if (!this.isAutocompleteVisible) {
      return;
    }
    this.autoComplete.classList.add('d-none');
    this.isAutocompleteVisible = false;
  }

  private showAutoComplete() {
    if (this.isAutocompleteVisible) {
      return;
    }
    this.autoComplete.classList.remove('d-none');
    this.isAutocompleteVisible = true;
  }

  private markAutocompleteItemSelected(item: HTMLElement) {

    if(!this.isAutocompleteVisible) {
      this.showAutoComplete();
      return;
    }

    this.selectedAutoCompleteItem?.setAttribute('aria-selected', 'false');
    item.setAttribute('aria-selected', 'true');
    this.selectedAutoCompleteItem = item;
    item.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    this.searchField.value = item.getAttribute('aria-label');
    if (!this.isAutocompleteVisible){
      this.showAutoComplete();
    }
  }

  private static renderAutoComplete(data: Array<any>, container: HTMLElement) {
    const suggestionItemTemplate = '<div class="m-search-bar__autocomplete-item" aria-selected="false" aria-label="{text}" role="option">{highlightText}</div>';
    const results = [];
    const listbox = container.querySelector('.m-search-bar__autocomplete-list');
    data.forEach((item)=>{
      let tmp = suggestionItemTemplate.replace('{text}', item.expression);
      tmp = tmp.replace('{highlightText}', SearchBar.returnHighlightedHTML(item.highlighted));
      results.push(tmp);
    });
    listbox.innerHTML = results.join('');
  }

  private static returnHighlightedHTML(text: string) {
    text = text.replace(/\[/g,'<span class="font-weight-bold">');
    text = text.replace(/(\{|\})/g,'');
    text = text.replace(/\(/g,'<span class="font-italic">');
    text = text.replace(/(\]|\))/g,'</span>');
    return text;
  }

}


$(function() {
  var openSearch = $('[data-search-click="click"]');
  var searcInput = $('.a-search__input');
  var closeSearch = $('[data-search-close="close"]');
  var enablePredictiveSearch = document.querySelector<HTMLInputElement>('[name="enablePredictiveSearch"]')?.value;

  if (document.querySelector('.o-header-v2-global')) {
    document
      .querySelectorAll('[data-js-component="search-bar"]')
      .forEach(function (ele) {
        new SearchBar(ele as HTMLElement);
      });

    return;
  }

  // Disable Keyboard Tab when search bar is open
  $('body').on('click', openSearch, function () {
    if ($('.a-search.a-search--expand').length > 0) {
      closeSearch.attr('tabindex', 0);
    }
  });

  // Input search box get focused - it opens the search overlay
  searcInput.focus(function(e) {
    setTimeout(() => {
      e.preventDefault();
      openSearch.trigger('click');
    }, 600);
  });

  //code for sticky search click
  $(document).on('keydown', '.o-header__sticky-section .o-header__sticky-search .a-search', function (e) {
    if (e.key === 'Enter') {
      if (($(e.target).attr("data-search-close") !== 'close') && !($(this).hasClass('a-search--expand'))) {
        e.preventDefault();
        openSearch.trigger('click')
      }
    }
  });

  // Close search bar on Enter key press
  closeSearch.on('keydown', function (e) {
    if (e.key === 'Enter') {
      closeSearch.trigger('click');
      //$(this).blur()
      $(this).trigger('blur');
    }
  });

  // Keep the focus within the search bar when search is open
  var KEYCODE_TAB = 9;
  $('.a-search form').on('keydown', function (e) {
    closeSearch.attr('tabindex', 0);
    if (e.key === 'Tab' || e.key === 'KEYCODE_TAB' && $('.a - search.a - search--expand ').length > 0) {
      if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === searcInput[0] || document.activeElement === searcInput[1] || document.activeElement === searcInput[2]) {
          closeSearch.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === closeSearch[0] || document.activeElement === closeSearch[1] || document.activeElement === closeSearch[2]) {
          searcInput.focus();
          e.preventDefault();
        }
      }
    }
    if (e.key === 'Escape') {
      closeSearch.trigger('click');
      searcInput.blur();
   }
  });



  //  add predictive selector initialize search bar as per viewport and sticky
  if (enablePredictiveSearch == 'true') {
    document.querySelector('.o-header').classList.add('o-header__predictive');
    if (Common.isMobile || Common.isTablet) {
      const ele = document.querySelector('.o-header__sticky-section .o-header__mega-menu .o-header__mob-search .predictive-search [data-js-component="search-bar"]');
      new SearchBar(ele as HTMLElement);
    } else {
        const ele = document.querySelector('.o-header__secondary-top-nav .o-header__search .predictive-search [data-js-component="search-bar"]');
        new SearchBar(ele as HTMLElement);
        var desktopBeenTrigged: boolean = false;
        $(window).on('scroll', function () {
          if ($(this).scrollTop() >= 44 && !desktopBeenTrigged) { // if scroll is greater/equal then 44 and desktopBeenTrigged is set to false.
            const elementHeader = document.querySelector('.o-header__sticky-section .o-header__sticky-search .predictive-search [data-js-component="search-bar"]');
            new SearchBar(elementHeader as HTMLElement);
            desktopBeenTrigged = true;
          }
        });
    }
  } else {
    document.querySelectorAll('[data-js-component="search-bar"]').forEach(function(ele) {
      const checkParent = ele.closest('.o-search-res');
        if (checkParent === null || checkParent.getAttribute('data-js-component') !== 'search-results') {
            new SearchBar(ele as HTMLElement);
        }
    });
  }
});

