/**
 * MYFREESTYLE - USER LOGOUT
 **/

/**
 * @function
 * Summary: Called before logout request API, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleUserLogout(data) {
  $("#page-spinner").show();
  delete data.body;
  return data;
}

/**
 * @function
 * Summary: Called upon success scenario of logout request API.
 * Parameters: data {Object} success response payload from API call.
 */
function onSuccessMyFreestyleUserLogout(data) {
  let jwt = getItemLocalStorage("cJwt", true);
  if (data.errorCode === 0) {
    //remove session extention events
    removeEvntLstnr();
    //hide modal
    showhideModal('btnModalExtendSession', 0);

    //clear all storage
    clearUserStorage();
    updateSessionCookie(jwt, false);
  } else {
    onErrorMyFreestyleCommon(data);
  }
}
