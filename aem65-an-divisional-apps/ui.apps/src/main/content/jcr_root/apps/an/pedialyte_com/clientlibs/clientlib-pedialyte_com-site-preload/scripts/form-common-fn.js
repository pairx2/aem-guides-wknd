/**
 * @function
 * Summary: Function to modify key for webstorage
 * Parameters : key {String}
 */
 function getStorageKey(key) {
  let xLangCode = $('[name="x-preferred-language"]').val();
  let newKey = (xLangCode !== '' && key.indexOf(xLangCode) === -1) ? (key + '_' + xLangCode) : key;

  return newKey;
}

/**
 * Summary: function to getItem from localstorage
 */
function getItemLocalStorage(key, isLang = false) {
  let newKey = isLang ? getStorageKey(key) : key;
  let value = localStorage.getItem(newKey);
  return value;
}

//function to retrieve radioValue
function radioValue(element) {
  let newArr1 = [];

  //return the input with radio option checked 
  newArr1 = $.grep(element, function (n, i) {
    return !!(n.consentValue);
  });

  return newArr1[0].consentName;
}
/**
 * @function
 * Summary: Encrypt Data
 * Parameters:  {String} or {Object}
 */
function encryptData(data) {
  let encData;
  let sl = getCookie('pk', true);
  if (typeof data == "object") {
    encData = CryptoJS.AES.encrypt(JSON.stringify(data), sl).toString();
  } else {
    encData = CryptoJS.AES.encrypt(data, sl).toString();
  }
  return encData;
}

/**
 * @function
 * Summary: Decrypt Data
 * Parameters:  ciphertext {String} encripted value, salt {String} passcode,
 *              type {String} is 'object' or 'string'
 */
function decryptData(ciphertext, salt, type) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
  let newBytes = bytes.toString(CryptoJS.enc.Utf8);
  let deData;
  try {
    deData = (type == 'object') ? JSON.parse(newBytes) : newBytes;
    return deData;
  } catch (err) {
    return null;
  }
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
    let resReason = response.status;
    let resErr = response.errorCode;
    console.log(resReason + ": " + resErr);
  }
}

// funtcion to get country-langauge from page URL
function getCountryLang() {
  const currPageUrl = window.location.pathname,
    langRegex = /\/([a-z]{2}-[a-z]{2})\//i;
  let result;

  if ((result = langRegex.exec(currPageUrl)) !== null) {
    return result[1];
  } else {
    return "";
  }
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
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
  }
  if (isLang) {
    cnameN = getStorageKey(cname);

    let counLang = getCountryLang();
    cpath = counLang == "" ? '/' : `/${counLang}`;
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
  let name = isLang ? getStorageKey(cname) + "=" : cname + "=";

  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (const element of ca) {
    let c = element;
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
 * Summary: function to setItem at localstorage
 */
function setItemLocalStorage(key, value, isLang = false) {
  let newKey = isLang ? getStorageKey(key) : key;
  localStorage.setItem(newKey, value);
}

/**
 * @function
 * Summary: Genrate 128B unique key from the String
 * Parameters:  {String}
 */
function getenKy(p) {
  let salt = CryptoJS.lib.WordArray.random(128 / 8);
  let key128Bits = CryptoJS.PBKDF2(p, salt, {
    keySize: 128 / 32
  });
  return key128Bits.toString();
}

function updateSessionCookie(jwtToken, enableValue) {
  let xAppId = $('[name="x-application-id"]').val(),
    xCountryCode = $('[name="x-country-code"]').val(),
    xLangCode = $('[name="x-preferred-language"]').val(),
    getSessionUrl = $('#session-api-url').val();

  let tempUrl = new URL(getSessionUrl);
  let getSessionUrlPath = tempUrl.pathname;
  let getOrigin = window.location.origin;

  let apiEndpoint = getOrigin + getSessionUrlPath + "?enable=" + enableValue;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-application-id': xAppId,
      'x-country-code': xCountryCode,
      'x-preferred-language': xLangCode,
      'x-id-token': jwtToken,
    },
    mode: 'cors',
    cache: 'no-cache',
  };

  fetch(apiEndpoint, requestOptions)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log('ERROR in session API :', error);
    });
}

/**
 * Summary: function to clear localstorage
 */
function clearLocalStorage() {
  localStorage.clear();
}
/**
 * Summary: function to removeItem from localstorage
 */
function removeItemLocalStorage(key, isLang = false) {
  let newKey = isLang ? getStorageKey(key) : key;
  localStorage.removeItem(newKey);
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

    let counLang = getCountryLang();
    cpath = counLang == "" ? '/' : `/${counLang}`;
  }
  document.cookie = `${newName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${cpath};Secure;`;
}

//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/\[/, '\\[').replace(/\]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
}

/**
 * @function
 * Summary: Encrypt and Store Data in webstorage
 * Parameters: obj {Object}
 */
function setUsObj(obj) {
  let tempK = getenKy(obj.email);
  setCookie('pk', tempK, 1, true);

  let logInObj = {
    'title': obj.title || '',
    'firstName': obj.firstName || '',
    'lastName': obj.lastName || '',
    'number': obj.number || '',
    'dateOfBirth': obj.dateOfBirth || '',
    'email': obj.email || '',
  };

  if(logInObj.firstName !== "") {
    let userInitial = logInObj.firstName.charAt(0).toUpperCase() || "";
    let userName = logInObj.firstName.toUpperCase();
    setCookie('usFn', userInitial, 1, true);
    setItemLocalStorage('username', userName, true);
  }

  if (logInObj.firstName !== "" && logInObj.lastName !== "") {
    let tempUsObj = encryptData(logInObj);
    setCookie('usObj', tempUsObj, 1, true);
  }

  let userConsent = obj.consents || [];
  if (Array.isArray(userConsent) && userConsent.length > 0) {
    let tempUsCon = encryptData(userConsent);
    setCookie('usCon', tempUsCon, 1, true);
  }

  return true;
}



/**
 * @function
 * Summary: Function to create ConsentsArray
 * Parameters: data {Object}
 */
function getConsentsArray(data) {

  let consentArray = [];
  if (data.body.consents !== undefined) {
    consentArray = data.body['consents'];
  }

  consentArray.push({
    'type': 'PERSONAL_DATA_PROCESSING',
    'approved': true
  },{
    'type': 'TERMS_AND_CONDITIONS',
    'approved': true
  });

  return consentArray;

}