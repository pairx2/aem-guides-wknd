/**
 * MYFREESTYLE - myfreestyle-common-preload
**/

/**
 * MYFREESTYLE - Forgot Reset Password
**/

/**
 * @function
 * Summary: Called before forgot/reset password, to update the request payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
 function updateRequestMyFreestylePassword(data) {
    delete data.body['requestType'];
    delete data.body['node'];
    return data;
}

/**
 * @function
 * Summary: Called on successful password forgot/reset to process response. 
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestylePassword(data) {
    if (data.errorCode == 0) {
        deleteCookie('resetToken');
    } else {
        onErrorMyFreestylePassword(data);
    }
}

/**
 * @function
 * Summary: Called on error response of password forgot/reset. 
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestylePassword(error) {
    showHideApiError(error);
    deleteCookie('resetToken');
}
