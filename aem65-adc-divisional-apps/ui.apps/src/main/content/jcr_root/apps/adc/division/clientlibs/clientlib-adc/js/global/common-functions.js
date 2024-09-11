/**
 * Common Functionalities
 */

//function to check if URL contains parameter
function hasUrlParameter(name) {
  const hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
  return hasParam;
}

//function to get lastItem from URL
function getLastItem(thePath) {
  return thePath.substring(thePath.lastIndexOf('/') + 1);
}

//function to get URL parameter
function getUrlParameter(name) {
  name = name.replace(/\[/, '\\[').replace(/\]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1]);
}

/**
 * @function
 * Summary: Function to split url with # to find tab number to be activated
 * Parameters: current site url i.e. location.href
 */
function getUrlParsedForTab(url) {
  const results = url.toString().split('#')
  return results === null ? '' : decodeURIComponent(results[1]);
}


//function to strip end-quotes from string
function stripEndQuotes(s) {
  let t = s.length;
  if (s.charAt(0) == '"') s = s.substring(1, t--);
  if (s.charAt(--t) == '"') s = s.substring(0, t);
  return s;
}

//function to retrieve radioValue
function radioValue(element) {
  let newArr1 = [];

  //return the input with radio option checked 
  newArr1 = $.grep(element, function (n, i) {
    return (n.consentValue == true);
  });

  return newArr1[0].consentName;
}

//process ajax response
function processResponse(response) {
  if (!response.status) {
    return false;
  } else if (response.status && response.errorCode == 400) {
    return false;
  } else if (response.errorCode == 0) {
    return true;
  } else {
    const resReason = response.status;
    const resErr = response.errorCode;
    console.log(resReason + ": " + resErr);
  }
}

// funtion to check if device is mobile
function isMobile() {
  return window.matchMedia("(max-width: 991.98px)").matches;
}

// function to check if page isOnPublish mode
function isOnPublish() {
  return $(`#wcmMode`).val() === 'false';
}

// funtcion to get country-langauge from page URL
function getCountryLang() {
  const currPageUrl = window.location.pathname,
    langRegex = /\/([a-z]{2}-[a-z]{2})\//i;
  let result;

  if ((result = langRegex.exec(currPageUrl)) !== null) {
    return result[1];
  }

  return false;
}

function getLanguageFromPage() {
  let pageCountryLanguage;
  let pageCountryCode;
  if ($('[name="x-preferred-language"]')) {
    pageCountryLanguage = $('[name="x-preferred-language"]').val().slice(0, 2).toLowerCase();
  }
  if ($('[name="x-country-code"]')) {
    pageCountryCode = $('[name="x-country-code"]').val().toLowerCase();
  }
  return `${pageCountryCode}_${pageCountryLanguage}`;
}

/**
 * @function
 * Summary: Function to modify key for webstorage
 * Parameters : key {String}
 */
function getStorageKey(key) {
  const xLangCode = $('[name="x-preferred-language"]').val();
  const newKey = (xLangCode !== '' && key.indexOf(xLangCode) === -1) ? (key + '_' + xLangCode) : key;

  return newKey;
}

/**
 * @function
 * Summary: Function to set cookie
 * Parameters:  cname {String} cookie name, cvalue {String} cookie cvalue,
 *              exdays {Number} cookie expiry in days
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function setCookie(cname, cvalue, exdays, isLang = false) {
  let expires = "", cnameN = cname, cpath = "/";
  if (exdays !== '') {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
  }
  if (isLang) {
    cnameN = getStorageKey(cname);

    const counLang = getCountryLang();
    if (counLang) {
      const pathname = window.location.pathname;
      cpath = `${pathname.substring(0, pathname.indexOf(counLang))}${counLang}`;
    }
  }

  document.cookie = `${cnameN}=${cvalue};${expires};path=${cpath};Secure;`;
}

/**
 * @function
 * Summary: Function to get cookie string value
 * Parameters:  cname {String} cookie name, 
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function getCookie(cname, isLang = false) {
  const name = isLang ? getStorageKey(cname) + "=" : cname + "=";

  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    let cVal = c;
    while (cVal.charAt(0) == ' ') {
      cVal = cVal.substring(1);
    }
    if (cVal.indexOf(name) == 0) {
      return cVal.substring(name.length, cVal.length);
    }
  }
  return '';
}

/**
 * @function
 * Summary: Function to get Cookies Obj value
 * Parameters:  cname {String} cookie name, 
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function getCookiesObj(cname, isLang = false) {
  const cnameN = isLang ? getStorageKey(cname) : cname;

  const cVal = getCookie(cnameN);
  const cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
  return cObj;
}

/**
 * @function
 * Summary: Function to delete cookie
 * Parameters:  cname {String} cookie name, 
 *              isLang {Boolean} flag to append country-lang in the cookie name.
 */
function deleteCookie(name, isLang = false) {
  let newName = name, cpath = "/";
  if (isLang) {
    newName = getStorageKey(name);

    const counLang = getCountryLang();
    if (counLang) {
      const pathname = window.location.pathname;
      cpath = `${pathname.substring(0, pathname.indexOf(counLang))}${counLang}`;
    }
  }
  document.cookie = `${newName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${cpath};Secure;`;
}

/**
 * Summary: function to setItem at localstorage
 * Parameters:  key {String}, value {String}
 *              isLang {Boolean} flag to append country-lang in the cookie name
 *              ttl {Number} Time to live in miliseconds
 */
function setItemLocalStorage(key, value, isLang = false, ttl = null) {
  const newKey = isLang ? getStorageKey(key) : key;

  if(ttl !== null) {
    let newVal = {value: value}
    newVal.expiry = Date.now() + (ttl * 60 * 1000);
    localStorage.setItem(newKey, JSON.stringify(newVal));
  } else {
    localStorage.setItem(newKey, value);
  }
}

/**
 * Summary: function to getItem from localstorage
 */
function getItemLocalStorage(key, isLang = false) {
  const newKey = isLang ? getStorageKey(key) : key;
  const itemStr = localStorage.getItem(newKey);

  // if the item doesn't exist, return null
	if (!itemStr) { return null }

  if(itemStr.indexOf('expiry') > -1) {
    const item = JSON.parse(itemStr);
  
    // compare the expiry time of the item with the current time
    if(Date.now() > item.expiry) {
      // If the item is expired, delete the item from storage and return null
      localStorage.removeItem(newKey);
      return null;
    }
    
    // return data if not expired
    if(item.value) {
      return item.value;
    }
  }

  return itemStr;
}

/**
 * Summary: function to removeItem from localstorage
 */
function removeItemLocalStorage(key, isLang = false) {
  const newKey = isLang ? getStorageKey(key) : key;
  localStorage.removeItem(newKey);
}

/**
 * Summary: function to clear localstorage
 */
function clearLocalStorage() {
  localStorage.clear();
}

/**
 * Summary: function to setItem at sessionStorage
 */
function setItemSessionStorage(key, value, isLang = false) {
  const newKey = isLang ? getStorageKey(key) : key;
  sessionStorage.setItem(newKey, value);
}

/**
 * Summary: function to getItem from sessionStorage
 */
function getItemSessionStorage(key, isLang = false) {
  const newKey = isLang ? getStorageKey(key) : key;
  const value = sessionStorage.getItem(newKey);
  return value
}

/**
 * Summary: function to removeItem from sessionStorage
 */
function removeItemSessionStorage(key, isLang = false) {
  const newKey = isLang ? getStorageKey(key) : key;
  sessionStorage.removeItem(newKey);
}

/**
 * Summary: function to clear sessionStorage
 */
function clearSessionStorage() {
  sessionStorage.clear();
}

/**
 * Summary: form conditional events
 */
const createConditionalEvent = (value, variable) => {
  return new CustomEvent('conditional-component-change', {
    detail: {
      value, // The value the event is setting the variable to
      var: variable, // The variable the event is setting
    },
  });
}

/**
 * @function
 * Summary: Function to check if User is Logged In.
 */
function isUserInLogedInState() {
  let isLogedIn = !!(getCookie('cJwt', true) || getItemLocalStorage('cJwt', true) || getItemSessionStorage('cJwt', true));
  return isLogedIn;
}