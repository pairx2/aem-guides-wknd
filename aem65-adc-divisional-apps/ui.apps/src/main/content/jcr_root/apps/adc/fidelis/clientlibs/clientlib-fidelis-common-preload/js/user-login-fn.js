/**
 * MYFREESTYLE - USER LOGIN
 **/

/**
 * @function
 * Summary: Called before login request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestMyFreestyleUserLogin(data) {
  let requestPayload = data;
  delete data.body['requestType'];
  delete data.body['node'];

  // remove unwanted data from payload
  let exceptionList = $(`[id*='myfreestyle-login'] [name="exceptionList"]`).val();
  removeDataPayload(exceptionList, data.body);
  let formOptions = $('#myfreestyle-login .a-checkbox__text');

  // persisting the entered credentials
  if(data.body['loginID'] && data.body['password']) {
    localStorage.setItem('loginDetails',
      JSON.stringify({loginID: data.body['loginID'], password: data.body['password']}));
  }

  // checking if the request came upon accepting the consent review popup
  const consents = data.body['consents'];
  let consentsArray = [];

  if(consents?.length || (consents && formOptions.length == 1)) {
    //Modifying payload for single consent as checkbox
    if(formOptions.length == 1){
		    delete data.body['consents'];
        consentsArray.push({
            "consentName": formOptions.attr("id"),
            "consentValue": true
        });   	
    }
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

    requestPayload = {
      ...data,
      body: {
        ...data.body,
        consents: consentsArray.length ? consentsArray : consents,
        loginID: loginDetails['loginID'],
        password: loginDetails['password']
      }
    }
  }

  return requestPayload;
}

/**
 * @function
 * Summary: Called before login request, on click of login submit button
 * Parameters: NA
 */
function onBeforeMyFreestyleUserLogin() {
  //hide verify messages section
  $('#login_verify_error').hide();
  $('#login_verify_success').hide();
}

/**
 * @function
 * Summary: Called on successful login to process response.
 * Parameters: data {Object} is the API response.
 */

function onSuccessMyFreestyleUserLogin(data) {
  // clearing the temperory persisted loginDetails
  localStorage.removeItem('loginDetails');

  //set up authInfo only when commerce is enabled
  if (data?.status && data?.response && typeof storeDataSets === "function") {
    !!storeDataSets() && storeAuthInfoForCommerce(data.response);
   }

  if (data.errorCode == 0) {
    showhideModal('consent-review-button', 0);
    let jwtToken = data.response?.jwtToken;
    if (jwtToken) { //On Success - Login
      setItemLocalStorage('cJwt', jwtToken, true);
    }

    let mJwt = data.response?.meridianJwtToken
    if (mJwt) {
      setItemLocalStorage('mJwt', mJwt, true);
    }

    let refreshToken = data.response?.refresh_token;
    if (refreshToken) { //On Success - Login
      setItemLocalStorage('refreshToken', refreshToken, true);
    }

    if (data.response?.email) {
      setUsObj(data.response);
    }

    //update session cookie
    updateSessionCookie(jwtToken, true);

  } else {
    onErrorMyFreestyleUserLogin(data);
  }
}

/**
 * @function
 * Summary: Called on error response of login.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleUserLogin(error) {
  showhideModal('consent-review-button', 0);
  showHideApiError(error);

  removeItemLocalStorage('cJwt', true);
  removeItemLocalStorage('mJwt', true);
  deleteCookie('usFn', true);
  deleteCookie('usObj', true);
  deleteCookie('usCon', true);
  deleteCookie('pk', true);
  deleteCookie('mrdObj', true);
  removeItemLocalStorage('mrdObj', true);
  deleteCookie('mfDynRem', true);
}


/** User Login Varify - start**/
/**
 * @function
 * Summary: Called before login verify request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleLoginVerify(data) {
  $('#page-spinner').show();
  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['g-recaptcha-response'];

  // remove unwanted data from payload
  let exceptionList = $(`[id*='login-verify'] [name="exceptionList"]`).val();
  removeDataPayload(exceptionList, data.body);

  return data;
}

/**
 * @function
 * Summary: Called on successful login verify to process response.
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestyleLoginVerify(data) {
  if (data.errorCode == 0) {
    $('#login_verify_error').hide();
    $('#page-spinner').hide();
    $('#login_verify_success').css('display', 'block');
    deleteCookie('activationKey');
    let activationKey = getUrlParameter('activationKey');
    let setPasswordForm = $('#myfreestyle-reset-pswd');
    if (activationKey !== '' && data.response.resetPassword && setPasswordForm.length > 0) {
      const setPasswordEvent = new CustomEvent('conditional-component-change', {
        detail: {
          value: true,
          var: 'showResetPasswordForm',
        },
      });
      window.dispatchEvent(setPasswordEvent);
      $("#section-myfreestyle-user-login").hide();
    }
  } else {
    onErrorMyFreestyleLoginVerify(data);
  }
}

/**
 * @function
 * Summary: Called on error response of login verify.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleLoginVerify(error) {
  showHideApiError(error);
  $('#login_verify_success').hide();
  $('#login_verify_error').css('display', 'block');
  deleteCookie('activationKey');
}
/** User Login Varify - end**/


/**
 * @function
 * Summary: Called upon error scenario of request API.
 * Parameters: error {Object} error reponse payload from API call.
 */
 function onErrorMyFreestyleCommon(error) {
  showHideApiError(error);
  $('#page-spinner').hide();
}

/**
 * @function
 * Summary: Called before request API.
 * Parameters: NA
 */
 function onBeforeMyFreestyleCommon() {
  $('#page-spinner').show();
}
