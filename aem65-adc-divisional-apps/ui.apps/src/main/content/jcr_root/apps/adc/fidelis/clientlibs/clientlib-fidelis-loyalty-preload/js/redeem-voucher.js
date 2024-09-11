/**
 * @function
 * Summary: Called before Redeem Voucher API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
let isRedeemVoucherApiSuccess = false;
function updateRequestRedeemVoucher(data){

    showLoaderForPointsLevels(true);
    
    if (!data.headers["x-id-token"]) {
      data.headers["x-id-token"] = getItemLocalStorage("cJwt", true);
    }
    let redeemVoucherKey = data.body["redeemcode"];
    data.body["voucherCode"] = redeemVoucherKey;
    
    delete data.body["redeemcode"];
    delete data.body["g-recaptcha-response"];
    delete data.body["node"];
  
    return data;
  }

  /**
 * @function
 * Summary: Called on successful Redeem Voucher API to process response.
 * Parameters: data {Object} is the API response.
 */
  function onSuccessRedeemVoucher(data) {
    if (data.errorCode == 0) {
      if (data.response && data.response.currentPoint) {
        setusRwdData(data.response);
        isRedeemVoucherApiSuccess = true;
      }
    }
  }

  /**
 * @function
 * Summary: Called on error response of Redeem Voucher API.
 * Parameters: error {Object} is the API response.
 */
  function onErrorRedeemVoucher(error){
    showHideApiError(error);
  }
  
  /**
 * @function
 * Summary: Called on Completion of Redeem Voucher API to handle my profile page
 */
  function onCompleteRedeemVoucher() {
    if(isRedeemVoucherApiSuccess){
      renderRewardPointsLevels();
      enableProductCards();
    }
    showLoaderForPointsLevels(false);
    isRedeemVoucherApiSuccess = false;
  }