
/**
 * FORM CONTAINER FUNCTIONS FOR CYBERSECURITY PORTAL
 */

/* Code for Manage Email Subscription Form - Starts here */

let emailSubscribed;

/**
 * @function
 * Summary: Function to capture and modify Manage Email Subscription form before ESL call
 * Parameters: data -> payload
 */
function updateRequestEmailSubscribe(data) {
    emailSubscribed = data.body['emailSubscribed'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    return data;
}

/**
 * @function
 * Summary: Function to handle success response from ESL call for Manage Email Subscription API
 * Parameters: data -> payload
 */
function onSuccessEmailSubscribe(data) {
    if (data.errorCode == 0) {
        sessionStorage.setItem('isEmailSubscribed', JSON.stringify(emailSubscribed));
        postAPIActions(data, 'manage-email-notification-modal');
    } else {
        onErrorEmailSubscribe(data);
    }
}

/**
 * @function
 * Summary: Function to handle error response from ESL call for Manage Email Subscription API
 * Parameters: data -> payload
 */
function onErrorEmailSubscribe(error) {
    postAPIActions(error, 'manage-email-notification-modal');
}

/* Code for Manage Email Subscription Form - Ends here */


/* Code for Login 2FA Forms - Starts here */

/**
 * @function
 * @summary: Function to handle success response from ESL call for Login form
 * @param: data -> response
 */
function userSigninOnSuccess(res) {
    ABT.signin.onSuccess(res);
}

/**
 * @function
 * @summary: Function to capture and modify OTP form payload before making the API call
 * @param: data -> payload
 */
function userVerifyOTPUpdateRequest(data) {
    return ABT.verifyOTP.updateRequest(data);
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for OTP form
 * @param: data -> response
 */
function userVerifyOTPOnSuccess(res) {
    ABT.verifyOTP.onSuccess(res);
}

/* Code for Login 2FA Forms - Ends here */

/* Code for Register Form - Starts here */

/**
 * @function
 * @summary: Function to capture and modify OTP form payload before making the API call
 * @param: data -> payload
 */
function userRegisterUpdateRequest(data) {
    return ABT.register.updateRequest(data);
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for OTP form
 * @param: data -> response
 */
function userRegisterOnSuccess(res) {
    ABT.register.onSuccess(res);
}

/**
 * @function
 * @summary: Function to handle error response from ESL call for OTP form
 * @param: data -> response
 */
function userRegisterOnError(err) {
    ABT.register.onError(err);
}

/* Code for Register Form - Ends here */

/* Code for Paaword Reset Form - Starts here */

/**
 * @function
 * @summary: Function to capture and modify create password form payload before making the API call
 * @param: data -> payload
 */
function createPasswordUpdateRequest(data) {
    return ABT.password.create.updateRequest(data);
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for create password form
 * @param: data -> response
 */
function createPasswordOnSuccess(res) {
    ABT.password.create.onSuccess(res);
}

/**
 * @function
 * @summary: Function to capture and modify reset password form payload before making the API call
 * @param: data -> payload
 */
function resetPasswordUpdateRequest(data) {
    return ABT.password.reset.updateRequest(data);
}

/**
 * @function
 * @summary: Function to handle success response from ESL call for forgot password form
 * @param: data -> response
 */
function forgotPasswordOnSuccess(res) {
    ABT.password.forgot.onSuccess(res);
}

/* Code for Password Reset Form - Ends here */

/**
 * @function
 * @summary: Function to handle update request for Vulnerabilities filters form
 * @param: data -> payload
 */
function updateRequestVsiFilters(data) {
    delete data.body['action'];
    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['productName'];
    (data.body['cisaKnown'] === true) && (data.body['cisaKnown'] = $(document).find('.a-checkbox__input[name="cisaKnown"]').attr('value'));
    (data.body['minDate']?.length == 0) && delete data.body['minDate'];
    (data.body['maxDate']?.length == 0) && delete data.body['maxDate'];
    if (data.body['productId']?.length) {
        data.body['productId'] = ABT.Utils.consentSetToArray(data.body['productId']).toString();
    } else {
        delete data.body['productId']
    }
    localStorage.setItem('vsiFilters', JSON.stringify(data.body));
    location.reload();
    return [];
}
