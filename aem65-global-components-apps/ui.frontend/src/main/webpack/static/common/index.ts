import { Spinner } from '.././atoms/spinner/spinner.comp';
import { RedirectConfirmPopup } from '../common/redirect-confirm-popup';

export class Common {

  private something: any;

  public static readonly serachRegister: {
    [key: string]: string;
  } = {
    searchUid: 'serach_uid_',
    searchState: 'serach_state_',
    searchObj: 'serach_obj_'
  }

  /**
   *
   */
  constructor() {
    this.something = true;
  }

  public static getPageParamsForHeader() {
    const final: any = {};
    const headers = document.querySelectorAll('[type="hidden"][data-header="true"]');
    headers.forEach((header: HTMLInputElement)=>{
      final[header.name] = header.value;
    });
    return final;
  }

  public static getPageParamsForBody() {
    const final: any = {};
    const elements = document.querySelectorAll('[type="hidden"][data-body="true"]');
    elements.forEach((element: HTMLInputElement)=>{
      final[element.name] = element.value;
    });
    return final;
  }
  public static getPageParamsForBodyConfig() {
    const final: any = {};
    const elements = document.querySelectorAll('[type="hidden"][data-config="true"]');
    elements.forEach((element: HTMLInputElement)=>{
      final[element.name] = element.value;
    });
    return final;
  }
  public static scrollTo(to: number, duration: number){
    const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date();

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b;
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }

    function animateScroll() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if(currentTime < duration) {
          requestAnimationFrame(animateScroll);
      }
      else {
          element.scrollTop = to;
      }
    }
    animateScroll();

  }

  public static showSpinner(target?: HTMLElement) {
    Spinner.show(target);
  }

  public static hideSpinner() {
    Spinner.hide();

  }

  public static get isMobile(): boolean {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  public static get isTablet(): boolean {
    return window.matchMedia("(min-width: 768px) and (max-width:991.98px)").matches;
  }
  
  public static initRedirectConfirmPopup() {
    //	Show external popup if 'data-redirect-confirm' is true
    let isRedirectConfirmPopup = document.querySelectorAll('[data-redirect-confirm="true"]');

    isRedirectConfirmPopup.forEach(function (ele) {
      new RedirectConfirmPopup(ele as HTMLElement);
    });
  }

  /**
   * @function
   * Summary: Function to get cookie string value
   * Parameters:  cname {String} cookie name,
   *              isLang {Boolean} flag to append country-lang in the cookie name.
   */
  public static getCookie(cname: string, isLang: Boolean = false) {
    let name: string = cname + "=";

    if (isLang) {
      let xLangCode: string = <string>$('[name="x-preferred-language"]').val();
      name = (xLangCode !== '' && cname.indexOf(xLangCode) === -1) ? (cname + '_' + xLangCode + "=") : (cname + "=");
    }

    const decodedCookie: string = decodeURIComponent(document.cookie);
    const ca: string[] = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  /**
  * @function
  * @desc checks if passed value is a function
  * @param fn
  * @return {Boolean} validation result if passed value is a function
  */
  public static isFunction(fn: any): boolean {
    return fn && typeof fn === 'function';
  }

  /**
  * @function
  * @desc funtion to clear serach register content event session data
  */
  public static clearSearchRegisterEventSession(type:string) {

    let xPreferredLanguage = (document.querySelector('[name="x-preferred-language"]') as HTMLInputElement)?.value;
    let xApplicationId = (document.querySelector('[name="x-application-id"]') as HTMLInputElement)?.value;

    let serachRegConEvtUid: string;
    let serachRegConEvtState: string;
    let searchRegConEvtObj: string;

    if (type == 'sitesearch') {
      serachRegConEvtUid = Common.serachRegister.searchUid + xApplicationId + '_' + xPreferredLanguage;
      serachRegConEvtState = Common.serachRegister.searchState + xApplicationId + '_' + xPreferredLanguage;
      searchRegConEvtObj = Common.serachRegister.searchObj + xApplicationId + '_' + xPreferredLanguage;
    }

    sessionStorage.removeItem(serachRegConEvtUid);
    sessionStorage.removeItem(serachRegConEvtState);
    sessionStorage.removeItem(searchRegConEvtObj);
  }

  /**
   * @function
   * @desc funtion to fetch serach register content event api and pass data to coveo
  */
  public static fetchSearchResultsContentEvent(type:string) {

    let xPreferredLanguage = (document.querySelector('[name="x-preferred-language"]') as HTMLInputElement)?.value;
    let xApplicationId = (document.querySelector('[name="x-application-id"]') as HTMLInputElement)?.value;

    let requestBody = Common.getPageParamsForBody();

    let getSearchObjStr: string;
    if (type == 'sitesearch') {
      getSearchObjStr = sessionStorage.getItem(Common.serachRegister.searchObj + xApplicationId + '_' + xPreferredLanguage);
    }

    if (getSearchObjStr && getSearchObjStr !== "") {
      let getSearchObj = JSON.parse(getSearchObjStr);
      for (let key in getSearchObj) {
        requestBody[key] = getSearchObj[key];
      }
    }

    let searchRegisterAPI = (document.querySelector('[name="search-register-api-url"]') as HTMLInputElement)?.value;

    if(searchRegisterAPI && searchRegisterAPI !== "") {
      fetch(searchRegisterAPI, {
        method: 'post',
        headers: Common.getPageParamsForHeader(),
        body: JSON.stringify(requestBody),
        mode: 'cors',
        cache: 'no-cache',
      })
        .then((resp) => resp.json())
        .then(function (data: any) {
          if (data.errorCode === 0) {
            console.log("SerachResults Register Content Event: Sucess");
            Common.clearSearchRegisterEventSession(type);
          } else {
            console.log("SerachResults Register Content Event: Error " + data.errorCode);
          }
        }.bind(this))
        .catch(function (e: any) {
          console.log(e);
        }.bind(this))
        .finally(function () {
          console.log('SerachResults Register Content Event API Complete');
        }.bind(this));
    }

  }

  /**
   * @function
   * @desc Execute a callback function and return the previous/new response
   * @param data data object
   * @param callbackFuncName name of the function to be executed with data args
   * @return {data} same data or updated data
   */
  public static callbackFuncExec(data: any, callbackFuncName: string) {

    // If callback function property is not defined or passed empty value
    if (callbackFuncName == null || callbackFuncName.length == 0) return data;

    let callbackFuncObj: Function = window[callbackFuncName];

    // Check if function or not and call the function
    if (!this.isFunction(callbackFuncObj)) {
      console.error(`Function ${callbackFuncName} is not defined`);
      return data;
    } else {
      let newData = callbackFuncObj(data);
      return newData;
    }
  }

  /**
   * @function
   * @desc funtion to check serach register content event session details
  */
  public static checkSearchSession(type:string) {

    let xPreferredLanguage = (document.querySelector('[name="x-preferred-language"]') as HTMLInputElement)?.value;
    let xApplicationId = (document.querySelector('[name="x-application-id"]') as HTMLInputElement)?.value;

    let serachRegConEvtState: string;
    if (type == 'sitesearch') {
      serachRegConEvtState = sessionStorage.getItem(Common.serachRegister.searchState + xApplicationId + '_' + xPreferredLanguage);
    }
    
    if (serachRegConEvtState && serachRegConEvtState == "true") {
      Common.fetchSearchResultsContentEvent(type);
    }
  }
}

/**
 * @function
 * @desc funtion to set equal height for components withing same row
 * @param {Boolean} isContainer TRUE if the items needs to be searched within .conatiner>.row
 * @param {String} target component class of element whose height need to be calculated
 * @param {String} targetParent (optional) parent class of the target
 * @param {String} mainParent (optional) main parent class which needs to be used as selector instead of .conatiner>.row
 */
function setEqualHeight(isContainer: boolean, target: string, targetParent?: string, mainParent?: string) {

  let targetItem: NodeListOf<Element>;
  const checkMobile: Boolean = window.matchMedia("(max-width: 767px)").matches;

  /**
   * @function
   * @desc funtion to get height of hidden element
   */
  function getHiddenEleHeight(ele: HTMLElement) {
    let $wrap = $("<div />").appendTo($("body"));
    $wrap.css({
      position: "absolute !important",
      visibility: "hidden !important",
      display: "block !important",
    });

    let $clone: JQuery<HTMLElement>;
    if (targetParent) {
      $clone = $(ele).closest(targetParent).clone().appendTo($wrap);
    } else {
      $clone = $(ele).clone().appendTo($wrap);
    }

    let $cloneHeight = $clone.height();
    $wrap.remove();

    return $cloneHeight;
  }

  /**
   * @function
   * @desc funtion to calculate and set height of the element
   */
  function setHeight(targetItem: NodeListOf<Element>) {
    let maxHeight = 0;

    targetItem.forEach((elem: HTMLDivElement) => {
      elem.style.height = "auto";
      if (elem.clientHeight <= 0) {
        let tempHeight = getHiddenEleHeight(elem);
        if (tempHeight > maxHeight) {
          maxHeight = tempHeight;
        }
      } else if (elem.clientHeight > maxHeight) {
        maxHeight = elem.clientHeight;
      }
    });

    targetItem.forEach((elem: HTMLDivElement) => {
      elem.style.height = maxHeight > 0 ? `${maxHeight}px` : "auto";
    });
  }

  /**
   * @function
   * @desc function to init setHeight
   */
  function initSetHeight(elm: HTMLDivElement | Document) {
    targetItem = elm.querySelectorAll(target);
    if (!targetItem.length) {
      return;
    }
    if (!checkMobile) {
      setHeight(targetItem);
    }
  }


  /**
   * @desc get elements from DOM
   */
  let serchParam = isContainer && mainParent ? `.container .row ${mainParent}` : '.container .row';
  if (isContainer) {
    document.querySelectorAll(serchParam).forEach((elm: HTMLDivElement) => {
      initSetHeight(elm);
    });
  } else if (!isContainer && mainParent) {
    document.querySelectorAll(mainParent).forEach((elm: HTMLDivElement) => {
      initSetHeight(elm);
    });
  } else {
    initSetHeight(document);
  }
}

function onFocusTabItem() {
  var targetUrl= window.location.href; //Get the URL from addressbar
  if(targetUrl.indexOf("#") >= 0) {
    var focusEleId= targetUrl.split("#").pop() // Find the object of the element to be foucsed based on #ID from target URL
    var parentTab= $('#'+ focusEleId).closest("[role='tabpanel']") // Get the Tab object of element to be focused
    var targetTabId= parentTab.attr('id')+'-tab' //Get the id of tab which contains the element to be focused ;
    if(parentTab.length !== 0){
        setTimeout(function() { // Setting delay till tabcomponent loads while page is loading
          $("#"+targetTabId).children('span').eq(0).click(); //Trigger click event of the tab which contains the element to be focused
          $('#'+focusEleId).attr("tabindex",-1).focus(); // Focus the element based on #ID from target URL
        }, 500);
    }
  }
}

function changeIdOnLoad() {
    var findId = $('.o-header__mob-options .m-signup .m-popup>.a-link').children('.a-link__text').attr('id');
    if (findId && findId.indexOf("-mob")=== -1) {
        $('.o-header__mob-options .m-signup .m-popup>.a-link').children('.a-link__text').attr('id', findId + '-mob');
    }
}

$(window).on('load', function() { return onFocusTabItem(); });


(function () {
  $(function () {

    // set equal height for Cards within .conatiner > .row
    setEqualHeight(true, '[data-js-component="card"]');

    // set equal height for Tiles within .conatiner > .row
    setEqualHeight(true, 'div:not(.m-tile-list) > .a-tile .a-tile__link', '.a-tile');

    // set equal height for Tiles within TileList
    setEqualHeight(false, '.a-tile .a-tile__link', '.a-tile', '.m-tile-list');

	  changeIdOnLoad();

  });


})();