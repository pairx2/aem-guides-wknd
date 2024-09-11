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

  // persisting the entered credentials
  if (data.body['loginID'] && data.body['password']) {
    localStorage.setItem('loginDetails',
      JSON.stringify({ loginID: data.body['loginID'], password: data.body['password'] }));
  }

  // checking if the request came upon accepting the consent review popup
  const consents = data.body['consents'];

  if (consents?.length) {
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

    requestPayload = {
      ...data,
      body: {
        ...data.body,
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
  // clear all storage
  clearUserStorage();

  if (data.errorCode == 0) {

    let jwtToken = data.response?.jwtToken;
    if (jwtToken) { //On Success - Login
      setItemLocalStorage('cJwt', jwtToken, true);
      setItemLocalStorage('id.token', jwtToken, false);
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

    //set active session exipry time
    sessionTimestamp(true);

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

  //clear all storage
  clearUserStorage();
}

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
