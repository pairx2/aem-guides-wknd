/**
 * MYFREESTYLE - USER LOGOUT
 **/

/**
 * @function
 * Summary: Called before logout request API, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleUserLogout(data) {
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
    let jwt = getItemLocalStorage('cJwt', true);
    if (data.errorCode === 0) {
        removeItemLocalStorage('cJwt', true);
        removeItemLocalStorage('mJwt', true);
        deleteCookie('usFn', true);
        deleteCookie('usObj', true);
        deleteCookie('usCon', true);
        deleteCookie('pk', true);
        deleteCookie('mrdObj', true);
        removeItemLocalStorage('mrdObj', true);
        deleteCookie('mfDynRem', true);
        updateSessionCookie(jwt, false);
        removeItemLocalStorage('launchURL', true);
    } else {
        onErrorMyFreestyleCommon(data);
    }
}
