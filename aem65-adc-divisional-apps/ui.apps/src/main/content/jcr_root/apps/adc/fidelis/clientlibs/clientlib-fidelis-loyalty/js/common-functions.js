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
function encryptData(data) {
  let encData;
  let sl = getItemLocalStorage('pk', true);
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

  let onSuccessRedirectLink, formPopupID;

  if (enableValue) {
    onSuccessRedirectLink = $('#redirect-buttons #myfreestylePageSecure').attr('href');
    formPopupID = 'btnLoginModal';
  } else {
    onSuccessRedirectLink = $('#redirect-buttons #myfreestylePage').attr('href');
    formPopupID = 'btnLogoutModal';
  }

  //show spinner
  $('#page-spinner').show();
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

        //hide spinner
        $('#page-spinner').hide();

        //redirect
        window.location.href = onSuccessRedirectLink;
      } else {
        //hide modal
        showhideModal(formPopupID, 0);
        //hide spinner
        $('#page-spinner').hide();

        //hide success message
        $('.o-form-container__success-msg').html('');
        showHideApiError(response);
      }
      return response;
    })
    .catch(function (error) {
      //hide modal
      showhideModal(formPopupID, 0);

      //hide spinner
      $('#page-spinner').hide();

      console.log('ERROR in session API :', error);

      //hide success message
      $('.o-form-container__success-msg').html('');
      showHideApiError(error);
    });
}


/**
 * @function
 * Summary: Encrypt and Store Data in webstorage
 * Parameters: obj {Object}
 */
function setUsObj(obj) {
  let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;

  let tempK = getenKy(obj.email);
  setItemLocalStorage('pk', tempK, true, sessionDuration);

  let userObj = {
    ...obj
  };

  //destructuring to remove all tokens and extra data from obj
  let {
    consents,
    jwtToken,
    meridianJwtToken,
    ecomToken,
    id_token,
    refresh_token,
    ...logInObj
  } = userObj;

  if (logInObj.firstName && logInObj.firstName !== "") {
    let userInitial = logInObj.firstName.charAt(0).toUpperCase() || "";
    setItemLocalStorage('usFn', userInitial, true, sessionDuration);
  }

  if (logInObj.firstName && logInObj.firstName !== "" && logInObj.lastName && logInObj.lastName !== "") {
    let tempUsObj = encryptData(logInObj);
    setItemLocalStorage('usObj', tempUsObj, true, sessionDuration);
  }

  let userConsent = obj.consents || [];
  if (Array.isArray(userConsent) && userConsent.length > 0) {
    const newArr = userConsent.map(({ consentUpdatedTime, consentCreatedTime, ...restObj }) => {
      return restObj;
    });
    let tempUsCon = encryptData(newArr);
    setItemLocalStorage('usCon', tempUsCon, true, sessionDuration);
  }


  return true;
}

/**
 * @function
 * Summary: Encrypt and Store Address in webstorage
 * Parameters: obj {Object}
 */
function setusAddr(obj) {
  let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;
  let tempUsAddr = encryptData(obj);
  setItemLocalStorage('usAddr', tempUsAddr, true, sessionDuration);
  return true;
}

/**
 * @function
 * Summary: Encrypt and Store Reward Profile data in webstorage
 * Parameters: obj {Object}
 */
function setusRwdData(obj) {

  let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;

  //destructuring to remove extra data from obj
  let {
    userSubId,
    totalPoint,
    currentLevel,
    nextLevel,
    userBadges,
    ...rewardObj
  } = obj;

  let tempUsRwd = encryptData(rewardObj);
  setItemLocalStorage('usRwd', tempUsRwd, true, sessionDuration);

  if (Array.isArray(userBadges) && userBadges.length > 0) {
    for (let key in userBadges) {
      delete userBadges[key].badgeName;
    }
    let tempBadges = encryptData(userBadges);
    setItemLocalStorage('usBdg', tempBadges, true, sessionDuration);
  }

  return true;
}

/**
 * @function
 * Summary: Encrypt and Store updated Reward Profile data in webstorage after order API call
 * Parameters: data {Object}
 */
function updateRwdData(data){
    let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;
    let usRwd = getItemLocalStorage('usRwd', true);
    let userrPointsObj = usRwd && decryptData(usRwd, pk, "object");
    
    //update current point and store again in localstorage
    userrPointsObj.currentPoint = data.response.currentPoint;
    let tempUsRwd = encryptData(userrPointsObj);
    setItemLocalStorage('usRwd', tempUsRwd, true, sessionDuration);
}

/**
 * @function
 * Summary: Encrypt and Store Data in webstorage
 * Parameters: obj {Object}
 */
function setUsObjMeridian(obj) {
  let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;
  setSessionValues();

  let mrdCourse = obj.completeMeridianDetails || [];
  let mrdTPoints = obj.completeMeridianDetails[0].gamePoints || 0;

  if (Array.isArray(mrdCourse) && mrdCourse.length > 0) {
    for (let key in mrdCourse) {
      delete mrdCourse[key].cntlclDescription;
    }
  }
  let mrdObj = {
    'mrdCourse': mrdCourse,
    'mrdTPoints': mrdTPoints
  };
  let tempMrdObj = encryptData(mrdObj);
  setItemLocalStorage('mrdObj', tempMrdObj, true, sessionDuration)

  return true;
}


/**
 * @function
 * Summary: Function to create ConsentsArray
 * Parameters: data {Object}
 */
function getConsentsArray(data) {

  let consentArray = [];
  const consentsList = ["marketing", "marketingeducation", "marketingsurvey", "additionalmarketing", "addMarketingconsents", "consents", "marketingeducationemail", "marketingsurveyemail", "consents1", "consents2", "consents3", "consents4", "consents5", "requiredConsents"];

  consentsList.forEach(item => {
    if (data.body[item] !== undefined && Array.isArray(data.body[item])) {
      data.body[item].forEach(obj => {
        consentArray.push(obj);
      });
    } else if (data.body[item] !== undefined && typeof data.body[item] === 'object') {
      for (const [datakey, datavalue] of Object.entries(data.body[item])) {
        consentArray.push({
          'consentName': datakey,
          'consentValue': datavalue
        });
      }
    } else if (data.body[item] !== undefined && typeof data.body[item] === 'boolean') {
      consentArray.push({
        'consentName': item,
        'consentValue': data.body[item]
      });
    }
  });

  //marketingpreference
  let marketingpreference = false;
  const marketingequalseducation = document.querySelector('input[name="marketingequalseducation"]');
  let ismarketingequalseducation = !!(marketingequalseducation !== null && marketingequalseducation.value == 'true');

  for (let i = 0, len = consentArray.length; i < len; i++) {
    if ((consentArray[i].consentName == "marketingemail" || consentArray[i].consentName == "marketingsms" || consentArray[i].consentName == "marketingcall") && consentArray[i].consentValue ) {
      marketingpreference = true;
    }

    if (ismarketingequalseducation && consentArray[i].consentName == "marketingemail") {
      consentArray.push({
        'consentName': 'marketingeducationemail',
        'consentValue': consentArray[i].consentValue
      });
    }
    if (ismarketingequalseducation && consentArray[i].consentName == "marketingsms") {
      consentArray.push({
        'consentName': 'marketingeducationsms',
        'consentValue': consentArray[i].consentValue
      });
    }
    if (ismarketingequalseducation && consentArray[i].consentName == "marketingcall") {
      consentArray.push({
        'consentName': 'marketingeducationcall',
        'consentValue': consentArray[i].consentValue
      });
    }
  }

  consentArray.push({
    'consentName': 'marketingpreference',
    'consentValue': marketingpreference
  });

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
 * Summary: Function to create Flat Object from Nested Obj
 * Parameters: obj {Object} data
 */
function createFlatObj(body) {
  let regUsObj = {};

  const iterate = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        iterate(obj[key]);
      }
      regUsObj[key] = obj[key];
    });
  }
  iterate(body);
  return regUsObj;
}


/**
 * @function
 * Summary: Function to set URL to iframe in e-learning page
 */
function setIframeSource() {
  $('#page-spinner').show();
  let mJwt = getItemLocalStorage('mJwt', true);
  let launchURL = getItemLocalStorage('launchURL', true),
    staticURL = $('#LMS-static-launchcontent-url').val();
  let getcourseId = getUrlParameter('courseId');
  if(getcourseId){
    launchURL = getcourseId;
  }
  let eurl = staticURL + launchURL + "&authtoken=" + mJwt
  mfsElearningCoursePlayerIFrame.attr("src", eurl);
}


/**
 * @function
 * Summary: Function to convert ID into Class
 * Parameters: container selector
 */
function replaceIdwithClass(container) {
  if (container) {
    container.find('[id^="ma-"]').each(function () {
      let getId = $(this).attr("id");
      if ($(this).parent().hasClass("a-link")) {
        $(this).removeAttr("id").parent().parent().addClass(getId);
      }
      else if ($(this).hasClass("cmp-container")) {
        $(this).removeAttr("id").closest('.container.a-container').addClass(getId);
      }
      else {
        $(this).removeAttr("id").parent().addClass(getId);
      }
    });
  }
}

/**
 * @function
 * Summary: Function to convert date to DD/MM/YYYY.
 * Parameters: dateString {String}
 */
function getDateinDDMMYYYY(dateString) {
  let date = new Date(dateString);
  let fullDate = ('0' + date.getDate()).slice(-2) + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
  return fullDate;
}

/**
 * @function
 * Summary: Funnction to set equal height for Cards within same row.
 */
function setCardEqualHeight() {
    // set equal height for Cards within .conatiner > .row
    setEqualHeight(true, '.m-card__title', '.m-card__body');
    setEqualHeight(true, '.m-card__description', '.m-card__body');
    setEqualHeight(true, '[data-js-component="card"]');
}