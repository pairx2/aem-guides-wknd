/**
 * MYFREESTYLE - USER ADDRESS
 **/

let isAddressApiSuccess = false;
/**
 * @function
 * Summary: Called before address api request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestAddressAPI(data) {
  delete data.body;
  return data;
}

/**
 * @function
 * Summary: Called on successful  Address API to process response.
 * Parameters: data {Object} is the API response.
 */

function onSuccessAddressAPI(data) {

  if (data.response[0].ShippingAddress) {
    setusAddr(data.response[0].ShippingAddress);
    isAddressApiSuccess = true;
  }
  else {
    onErrorAddressAPI();
  }
}


/**
 * @function
 * Summary: Called on Error Address API to process response.
 */

function onErrorAddressAPI() {
  showEmptyAddressState();
  redeemEmptyAddressState($('.redeem-popup'));
}

/**
 * @function
 * Summary: Called on Completion of Address API to handle my profile page
 */

function onCompleteAddressAPI() {
  if(isAddressApiSuccess) {
    getAddressData();
    getRedeemAddress($('.redeem-popup')); 
  }
  isAddressApiSuccess = false;
}