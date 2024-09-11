/**
 * MYFREESTYLE - USER LOGIN
 **/

/**
 * @function
 * Summary: Called before login request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestMyFreestyleUserLogin(data) {
  delete data.body['requestType'];
  delete data.body['node'];
  return data;
}

/**
 * @function
 * Summary: Called on successful login to process response. 
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestyleUserLogin(data) {
  if (data.errorCode == 0) {
    $('#login_verify_error').hide();
    let jwtToken = data.response && data.response.jwtToken;
    if (jwtToken) { //On Success - Login
        setCookie('cJwt', jwtToken, 1, true);
    }

    let refreshToken = data.response && data.response.refreshToken;
    if (refreshToken) { //On Success - Login
        setCookie('refreshToken', refreshToken, 1, true);
    }

    let mJwt = data.response && data.response.meridianJwtToken
    if (mJwt) {
      setCookie('mJwt', mJwt, 1, true);
    }

    if (data.response && data.response.email) {
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
  showHideApiError(error);
  $('#login_verify_error').hide();

  deleteCookie('cJwt',true);
  deleteCookie('mJwt', true);
  deleteCookie('usFn', true);
  deleteCookie('usObj', true);
  deleteCookie('usCon', true);
  deleteCookie('pk', true);
  deleteCookie('mrdObj', true);
  deleteCookie('mSecure', true);
  deleteCookie('refreshToken', true);
}


/** User Login Varify - start**/
/**
 * @function
 * Summary: Called before login verify request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleLoginVerify(data) {
  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['g-recaptcha-response'];
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
