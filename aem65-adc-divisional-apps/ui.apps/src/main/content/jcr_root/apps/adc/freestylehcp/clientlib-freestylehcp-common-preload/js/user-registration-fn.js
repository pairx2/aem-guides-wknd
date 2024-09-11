/**
 * MYFREESTYLE - USER REGISTRATION
 **/

/**
 * @function
 * Summary: Called before request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestMyFreestyleUserRegistration(data) {

  //captcha
  data.body['g-recaptcha-response'] = data['g-recaptcha-response'];

  //salutation
  let salutationValue = radioValue(data.body['title']);
  data.body.userInfo['title'] = salutationValue;

  //process consents
  let consentArray = getConsentsArray(data);

  //final consents array
  data.body['consents'] = consentArray;

  //removed extra data
  delete data['g-recaptcha-response'];
  delete data.body['title'];
  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['tncAgree'];
  delete data.body['marketingeducationemail'];
  delete data.body['marketingsurveyemail'];
  delete data.body['addMarketingconsents'];
  delete data.body['consentsAll'];


  // encrypt and store data
  let regUsObj = {
    'title': salutationValue,
    'firstName': data.body.userInfo['firstName'],
    'lastName': data.body.userInfo['lastName'],
    'phoneNumber': data.body.userInfo['phoneNumber'],
    'dateOfBirth': data.body.userInfo['dateOfBirth'],
    'email': data.body.userInfo['email'],
    'consents': data.body['consents']
  }

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
  deleteCookie('mSecure', true);
  deleteCookie('cJwt', true);
  deleteCookie('mJwt', true);
}
