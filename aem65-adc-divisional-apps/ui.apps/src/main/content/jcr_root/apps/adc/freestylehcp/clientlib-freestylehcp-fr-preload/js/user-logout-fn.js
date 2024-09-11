/**
 * MYFREESTYLE - USER LOGOUT
 **/

/**
 * @function
 * Summary: Called before logout request API, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestMyFreestyleUserLogout(data) {
    data.headers['x-id-token']=getCookie('cJwt', true);
    $('#page-spinner').show();
    delete data.body['requestType'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    return data;
}

/**
 * @function
 * Summary: Called upon success scenario of logout request API.
 * Parameters: data {Object} success response payload from API call.
 */
function onSuccessMyFreestyleUserLogout(data) {
    let jwt = getCookie('cJwt', true);
    if (data.errorCode === 0) {

        deleteCookie('cJwt', true);
        deleteCookie('mJwt', true);
        deleteCookie('usFn', true);
        deleteCookie('usObj', true);
        deleteCookie('usCon', true);
        deleteCookie('pk', true);
        deleteCookie('mrdObj', true);
        deleteCookie('mSecure', true);
        deleteCookie('mfDynRem', true);
        deleteCookie('refreshToken', true);
        updateSessionCookie(jwt, false);
    } else {
        onErrorMyFreestyleUserLogout(data);
    }
}

/**
 * @function
 * Summary: Called upon error scenario of logout request API.
 * Parameters: error {Object} error reponse payload from API call.
 */
function onErrorMyFreestyleUserLogout(error) {
    showHideApiError(error);
    $('#page-spinner').hide();
}

