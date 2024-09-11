/**
 * @function
 * Summary: Called before  MeridianToken API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

function updateRequestMyFreestyleMeridianJWTtoken(data) {
  let myWelcomePage = $(document).find("#myaccount-welcome");
  if(myWelcomePage.length > 0){
    $("#myaccount-welcome").hide();
  }
  $("#page-spinner").show();
  let refresh_token = getItemLocalStorage("refreshToken", true);
  data.body["refresh_token"] = refresh_token;

  delete data.body["requestType"];
  delete data.body["node"];
  delete data.body["g-recaptcha-response"];

  return data;
}

/**
 * @function
 * Summary: Called on successful  MeridianToken API to process response.
 * Parameters: data {Object} is the API response.
 */

function onSuccessMyFreestyleMeridianJWTtoken(data) {
  $("#overlay-text").hide();
  $("#myaccount-welcome").show();
  let oneLearnPage = document.getElementById("courseiframe");
  let meridainData = document.getElementById("LMS-Meridian-Data");

  if (data.errorCode == 0) {
    let mJwt = data.response && data.response.meridian_token;

    if (mJwt) {
      setItemLocalStorage("mJwt", mJwt, true);
    }

    if (mJwt && oneLearnPage) {
      SetIframeSource();
    } else if (mJwt && meridainData) {
      document
        .querySelector(
          '#myfreestyle-meridian-data button[name="Meridian-Details'
        )
        .click();
    } else {
      onErrorMyFreestyleMeridianJWTtoken(data);
    }
  } else {
    onErrorMyFreestyleMeridianJWTtoken(data);
  }
}

/**
 * @function
 * Summary: Called on error response of MeridianToken API.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleMeridianJWTtoken(error) {
  $("#overlay-text").hide();
  $("#myaccount-welcome").show();
  $("#page-spinner").hide();

  let oneLearnPage = document.getElementById("courseiframe");
  if (oneLearnPage) {
    showHideApiError(error);
  } else {
    $("#myaccount-details").remove();
    $("#ma-no-meridian").show();
  }
}
