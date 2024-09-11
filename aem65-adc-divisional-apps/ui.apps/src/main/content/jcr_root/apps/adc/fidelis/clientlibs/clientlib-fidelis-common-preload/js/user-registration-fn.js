/**
 * MYFREESTYLE - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Called before request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleUserRegistration(data) {
  let body = data.body;
  //captcha
  body['g-recaptcha-response'] = data['g-recaptcha-response'];

  //salutation
  let salutationValue;
  if(Array.isArray(body['title'])) {
    salutationValue = radioValue(body['title']);
  } else if (typeof body['title'] == "string") {
    salutationValue = body['title'];
  }
  body.userInfo['title'] = salutationValue;

  //process consents
  const consentArray = getConsentsArray(data);
  body['consents'] = consentArray;

  //remove extra data
  delete data['g-recaptcha-response'];
  delete body['title'];
  delete body['requestType'];
  delete body['node'];
  delete body['tncAgree'];
  delete body['marketingeducationemail'];
  delete body['marketingsurveyemail'];
  delete body['addMarketingconsents'];
  delete body['consentsAll'];
  delete body['requiredConsents'];

  // remove unwanted data from payload
  const exceptionList = $(`[id*='myfreestyle-signup'] [name="exceptionList"]`).val();
  removeDataPayload(exceptionList, body);

  // encrypt and store data
  let regUsObj = {
    ...body.userInfo,
    'consents': body['consents']
  }
  delete regUsObj['password'];

  setUsObj(regUsObj);
  
  //final registration data
  return data;
}


/**
 * @function
 * Summary: Called on successful login to process response.
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestyleUserRegistration(data) {
  if (data.errorCode !== 0) {
    onErrorMyFreestyleUserRegistration(data);
  }

}

/**
 * @function
 * Summary: Called on error response of login.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleUserRegistration(error) {
  showHideApiError(error);

  deleteCookie('pk', true);
  deleteCookie('usObj', true);
  deleteCookie('usFn', true);
  deleteCookie('usCon', true);
  deleteCookie('mrdObj', true);
  removeItemLocalStorage('mrdObj', true);
  removeItemLocalStorage('cJwt', true);
  removeItemLocalStorage('mJwt', true);
  deleteCookie('mfDynRem', true);
}
