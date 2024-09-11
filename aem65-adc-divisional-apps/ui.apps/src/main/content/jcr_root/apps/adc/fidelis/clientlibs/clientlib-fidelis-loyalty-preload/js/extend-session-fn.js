/**
 * @function
 * Summary: Called before Session Extention API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleSessionExtension(data) {
  $("#page-spinner").show();

  if (!data.headers["x-id-token"]) {
    data.headers["x-id-token"] = getItemLocalStorage("cJwt", true);
  }

  if (!data.body["refresh_token"]) {
    data.body["refresh_token"] = getItemLocalStorage("refreshToken", true);
  }

  delete data.body["g-recaptcha-response"];
  delete data.body["requestType"];
  delete data.body["node"];
  return data;
}

/**
 * @function
 * Summary: Called on successful Session Extention API request to process response.
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestyleSessionExtension(data) {
  if (data.errorCode == 0) {
    $("#page-spinner").hide();
    //enable session continue button after submitting
    $("#extend-session-continue-btn").prop("disabled", false);

    //hide success msg of form container
    $("#extend-session-form .o-form-container__success-msg").css(
      "visibility",
      "hidden"
    );

    //hide modal
    showhideModal('btnModalExtendSession', 0);

    //set active session exipry time
    let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;
    sessionTimestamp(true);

    let jwtToken = data.response && data.response.jwtToken;
    if (jwtToken) {
      //On Success - Login
      setItemLocalStorage("cJwt", jwtToken, true);
    }

    let mJwt = data.response && data.response.meridianJwtToken;
    if (mJwt) {
      setItemLocalStorage("mJwt", mJwt, true);
    }

    let refreshToken = data.response && data.response.refresh_token;
    if (refreshToken) {
      //On Success - Login
      setItemLocalStorage("refreshToken", refreshToken, true);
    }
  } else {
    onErrorMyFreestyleSessionExtension(data);
  }
}

/**
 * @function
 * Summary: Called on error response of Session Extention API.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleSessionExtension(error) {
  $("#page-spinner").hide();
  $("#extend-session-continue-btn").prop("disabled", false);
  //hide failure msg of form container
  $("#extend-session-form .o-form-container__error-msg").css({
    "visibility": "visible",
    "display": "block"
  });
}
