/**
 * MYFREESTYLE - CREATE ORDER API
 **/

/**
 * @function
 * Summary: Called before create order API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
let isCreateOrderApiSuccess = false;
function updateRequestCreateOrder(data){
    if (!data.headers["x-id-token"]) {
        data.headers["x-id-token"] = getItemLocalStorage("cJwt", true);
    }
    data.body["productId"] = productOrderId;

    delete data.body["g-recaptcha-response"];
    delete data.body["node"];

    return data;
}

/**
 * @function
 * Summary: Called on before create order API request to process response.
 * Parameters: data {Object} is the API response.
 */
function onBeforeCreateOrder() {
    $('.redeem-popup #apierror_400').hide();
}

/**
 * @function
 * Summary: Called on successful create order API request to process response.
 * Parameters: data {Object} is the API response.
 */
function onSuccessCreateOrder(data) {
    if (data.errorCode == 0) {
        if (data.response && data.response.currentPoint) {
            updateRwdData(data);
        }
        isCreateOrderApiSuccess = true;
    }
}

/**
 * @function
 * Summary: Called on error response of create order API.
 * Parameters: error {Object} is the API response.
 */
function onErrorCreateOrder(error){
    showHideApiError(error);
}

/**
 * @function
 * Summary: Called on Completion of Redeem Voucher API to handle my profile page
 */
function onCompleteCreateOrder() {
    if(isCreateOrderApiSuccess){
        updateWizardSteps();
        renderRewardPointsLevels();
        enableProductCards();
    }
    isCreateOrderApiSuccess = false;
}