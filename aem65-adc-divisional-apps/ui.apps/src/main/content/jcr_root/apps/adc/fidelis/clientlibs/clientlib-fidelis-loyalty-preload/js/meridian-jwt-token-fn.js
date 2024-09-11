/**
 * @function
 * Summary: Called before  MeridianToken API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

function updateRequestMyFreestyleMeridianJWTtoken(data) {

  if($('[id*="courseiframe"]').length > 0) {
    $("#page-spinner").show();
  }
  
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

  let oneLearnPage = document.getElementById("courseiframe");
  let meridianDetailsForm = $('#mfs-get-meridian-profile button.btn[type="submit"]');
  let sessionDuration = $('[name*="session-duration-minutes"]').length ? Number($('[name*="session-duration-minutes"]').val()) : 50;

  if (data.errorCode == 0) {
    let mJwt = data.response && data.response.meridian_token;

    if (mJwt) {
      setItemLocalStorage("mJwt", mJwt, true);
    }

    if (mJwt && oneLearnPage) {
      setIframeSource();
    } else if (mJwt && meridianDetailsForm) {
      meridianDetailsForm.trigger("click");
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
  
  if($('[id*="courseiframe"]').length > 0) {
    $("#page-spinner").hide();
  }

  let oneLearnPage = document.getElementById("courseiframe");
  if (oneLearnPage) {
    showHideApiError(error);
  } else {
    showhideModal('btnModalErrorNoMeridian', 1, true);
    renderELearningCards();
  }
}
