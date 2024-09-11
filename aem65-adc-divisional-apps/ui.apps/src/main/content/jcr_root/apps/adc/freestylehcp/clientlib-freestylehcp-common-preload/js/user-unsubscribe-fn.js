/**
 * MYFREESTYLE - USER UNSUBSCRIBE
 **/


/**
 updatedConsentsArr array that should contain user selections and send to backend
*/
let manageSubsisAPISuccess = false;

/**
* @function
* Summary: Function that executes before triggering ManageSubscription API call
* Parameters: data -> payload
*/
function updateRequestManageSubsUserConsent(data) {

    //removed extra data
    delete data.body['requestType'];
    delete data.body['consentsAll'];
    delete data.body['node'];
    

    //final consent data/payload
    return data;
}

/**
 * @function
 * Summary: Function that executes after ManageSubscription API call completion
 */
function onCompleteManageSubsUserConsent() {
    if (manageSubsisAPISuccess) {
        manageSubsisAPISuccess = false;
        removeItemSessionStorage('consents');
    }
}

/**
 * @function
 * Summary: Function that executes when the ManageSubscription API call is successful
 * Parameters: data -> response
 */
function onSuccessManageSubsUserConsent(data) {
    if (data.errorCode == 0) {
        manageSubsisAPISuccess = true;
    } else {
        onErrorMyFreestyleCommon(data);
    }
}

/**
* @function
* Summary: Called before myFreestyleUnsubscribeFlow request, to update the payload.
* Parameters: data {Object} initial payload generated from form-container.
*/
function updateRequestMyProviderFreestyleUnsubscribeVerify(data) {
    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['g-recaptcha-response'];
    return data;
}


/**
* @function
* Summary: Called on successful myFreestyleUnsubscribeFlow to process response.
* Parameters: data {Object} is the API response.
*/
function onSuccessMyProviderFreestyleUnsubscribeVerify(data) {
    if (data.errorCode == 0 && data.response) {
        setItemSessionStorage('consents', JSON.stringify(data.response.consents));
        loadUnsubscribeConsentCheckList(data.response.consents);
        $('#page-spinner').css('display', 'none');
        deleteCookie('unsubscribeToken');
    } else {
        onErrorMyFreestyleUnsubscribeVerify(data);
    }
}


/**
* @function
* Summary: Called on error response of myFreestyleUnsubscribeFlow.
* Parameters: error {Object} is the API response.
*/
function onErrorMyProviderFreestyleUnsubscribeVerify(error) {
    showHideApiError(error);
	deleteCookie('unsubscribeToken');
    $('#unsubscribe_verify_success').hide();
}


/**
* @function
* Summary: Called before myFreestyleUnsubscribeFlow request, on click of UnsubscribeFlow submit button
*/
function onBeforeMyFreestyleUnsubs() {
    //hide verify messages section
    $('#unsubscribe_verify_success').hide();
    $('#unsubscribe_verify_error').hide();
}