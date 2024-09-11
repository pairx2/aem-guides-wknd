/**
 * Common Functionalities
 */

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

/**
 * @function
 * Summary: Encrypt Data
 * Parameters:  {String} or {Object}
 */

/*The method parameters needs to be check*/ 
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


/**
 * @function
 * Summary: Update session cookie. 
 * Parameters:  jwtToken {String} token received from Login API.
 *              enableValue {Boolean} if session cookie has to be created or removed.
 */
function updateSessionCookie(jwtToken, enableValue) {

  //show spinner
  $('#page-spinner').show();
  let onSuccessRedirectLink, formPopupID, defaultRedirectPath, auhtoredSecureEle = $('#redirect-buttons #myfreestylePageSecure');

  if (enableValue) {
    defaultRedirectPath = window.location.pathname.split('/');
    const secure_page_url = sessionStorage.getItem('securePageUrl');
    const author_secure_href = auhtoredSecureEle?.attr('href');
    const default_redirect_path = defaultRedirectPath[1];

    if (secure_page_url !== null) {
        onSuccessRedirectLink = secure_page_url;
    } else if (author_secure_href !== undefined) {
        onSuccessRedirectLink = author_secure_href;
    } else {
        onSuccessRedirectLink = '/' + default_redirect_path;
    }

    formPopupID = 'btnLoginModal';

  } else {
    onSuccessRedirectLink = $('#redirect-buttons #myfreestylePage').attr('href');
    formPopupID = 'btnLogoutModal';
  }

  //show modal
  showhideModal(formPopupID, 1);

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
      // on API success response
      if (processResponse(response)) {
        //hide modal
        showhideModal(formPopupID, 0);

        //redirect
        window.location.href = onSuccessRedirectLink;
      } else {
        //hide spinner
        $('#page-spinner').hide();
        //hide modal
        showhideModal(formPopupID, 0);

        showHideApiError(response);
      }
      return response;
    })
    .catch(function (error) {
      //hide spinner
      $('#page-spinner').hide();
      //hide modal
      showhideModal(formPopupID, 0);
      console.log('ERROR in session API :', error);
      showHideApiError(error);
    });
}


/**
 * @function
 * Summary: Encrypt and Store Data in SessionStorage
 * Parameters: obj {Object}
 */
function setUsObj(obj) {

  let tempK = getenKy(obj.email);
  setCookie('pk', tempK, 1, true);

  let logInObj = {
    'title': LoginObjVal(obj.title),
    'firstName': LoginObjVal(obj.firstName),
    'lastName': LoginObjVal(obj.lastName),
    'phoneNumber': LoginObjVal(obj.phoneNumber),
    'dateOfBirth': LoginObjVal(obj.dateOfBirth),
    'email': LoginObjVal(obj.email),
  };

    if(logInObj.firstName !== "") {
    let userInitial = logInObj.firstName.charAt(0).toUpperCase() || "";
    setCookie('usFn', userInitial, 1, true);
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

  let mrdCourse = obj.meridianCourseInfo || [];
  let mrdTPoints = obj.totalEarnedPoints || 0;
  if (Array.isArray(mrdCourse) && mrdCourse.length > 0) {
    for (let key in mrdCourse) {
      delete mrdCourse[key].courseDescription;
    }
  }
  let mrdObj = {
    'mrdCourse': mrdCourse,
    'mrdTPoints': mrdTPoints
  };
  let tempMrdObj = encryptData(mrdObj);
  setCookie('mrdObj', tempMrdObj, 1, true);

  return true;
}

//assign values to login object

function LoginObjVal(objName,defaultValue = ''){
  return objName || defaultValue
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

  //marketingpreference
  let marketingpreference = false;
  for (let i = 0, len = consentArray.length; i < len; i++) {
    let consentVal=consentArray[i].consentValue
    if ((consentArray[i].consentName == "marketingemail" || consentArray[i].consentName == "marketingsms" || consentArray[i].consentName == "marketingcall") && consentVal) {
      marketingpreference = true;
    }
  }

  consentArray.push({
    'consentName': 'marketingpreference',
    'consentValue': marketingpreference
  });

  if (data.body.marketingeducationemail !== undefined) {
    consentArray.push({
      'consentName': 'marketingeducationemail',
      'consentValue': data.body.marketingeducationemail
    });
  }
  if (data.body.marketingsurveyemail !== undefined) {
    consentArray.push({
      'consentName': 'marketingsurveyemail',
      'consentValue': data.body.marketingsurveyemail
    });
  }
  if (data.body.addMarketingconsents !== undefined) {
    data.body.addMarketingconsents.forEach(obj => {
      consentArray.push(obj);
    });
  }

  return consentArray;

}


/**
 * @function
 * Summary: welcome section to show user info across configured pages
 * Parameters: user {Object} userinfo object
 *             page {Object} page to be updated
 */
function renderUserDetails(user, page) {
  const firstName = page.find("span.user-firstname");
  const lastName = page.find("span.user-lastname");
  const salutation = page.find("span.user-salutation");
  const email = page.find("span.user-email");
  if (user && user.lastName !== "") {
    lastName.text(user.lastName);
  }
  if (user && user.firstName !== "") {
    firstName.text(user.firstName);
  }
  if (user && user.title !== "") {
    salutation.text(user.title);
  }
  if (user && user.email !== "") {
    email.text(user.email);
  }
}

/**
 * @function
 * Summary: get particular cookies value selected key
 * Parameters: cookie key name
 *             
 */

function getCookieByKey(name) {
  let pattern = RegExp(name + "=.[^;]*") 
  let matched = document.cookie.match(pattern) 
  if (matched) {
      let cookie = matched[0].split('=') 
      return cookie[1]
  }
  return null
}

/**
 * @function
 * Summary: return regex pattern from the data attributte element
 * Parameters: regex pattern string
 *             
 */
function getRegExpObjFromString(regexPattern) {
  if (!regexPattern) {
      return;
  }
  let flags = /(?!^)[^\/]+$/gi.exec(regexPattern);
  if (flags && flags.length) {
      flags = flags[0];
  } else {
      flags = '';
  }
  regexPattern = /[^\/].+(?=\/)/.exec(regexPattern)[0];
  return new RegExp(regexPattern, flags);
}
