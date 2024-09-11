/**
 * Latam Nutrition - Latam Nutrition-common-preload
**/

/**
 * Latam Nutrition - Forgot Reset Password
**/

/**
 * @function
 * Summary: Called before forgot/reset password, to update the request payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestLatamnutritionPassword(data) {
    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['g-recaptcha-response'];
    return data;
}

/**
 * @function
 * Summary: Called on successful password forgot/reset to process response. 
 * Parameters: data {Object} is the API response.
 */
function onSuccessLatamnutritionPassword(data) {
    let jwt = getItemLocalStorage('cJwt', true);
    if (data.errorCode === 0) {
        removeItemLocalStorage('cJwt', true);
        removeItemLocalStorage('userDetails', false);
        deleteCookie('usFn', true);
        deleteCookie('pk', true);
        updateSessionCookie(jwt, false);
    } else {
        onErrorLatamnutritionPassword(data);
    }
}

/**
 * @function
 * Summary: Called on error response of password forgot/reset. 
 * Parameters: error {Object} is the API response.
 */
function onErrorLatamnutritionPassword(error) {
    console.log(error);
}

