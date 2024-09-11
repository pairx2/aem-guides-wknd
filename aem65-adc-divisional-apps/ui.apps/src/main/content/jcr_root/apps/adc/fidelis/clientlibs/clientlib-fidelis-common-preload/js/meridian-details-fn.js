/**
 * MYFREESTYLE - Meridian Profile Details
 **/

/**
 * @function
 * Summary: Called before  Meridian Profile Details API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

let apiSuccess = false;

function updateRequestMyFreestyleMeridianDetails(data) {
  $("#myaccount-welcome").hide();
  $("#page-spinner").show();
  data.headers["Meridianjwttoken"] = getItemLocalStorage("mJwt", true);
  delete data.body["requestType"];
  delete data.body["node"];
  delete data.body["g-recaptcha-response"];
  delete data.body;

  return data;
}

/**
 * @function
 * Summary: Called before Meridian Profile Details request, on click of login submit button
 * Parameters: NA
 */
function onBeforeMyFreestyleUserMeridianDetails() {}

/**
 * @function
 * Summary: Called on successful Meridian Profile Details to process response.
 * Parameters: data {Object} is the API response.
 */

function onSuccessMyFreestyleMeridianDetails(data) {
  $("#overlay-text").hide();
  $("#myaccount-welcome").show();
  if (data.errorCode == 0) {
    let meridainDetails = data.response.completeMeridianDetails;
    if (meridainDetails) {
      setUsObjMeridian(data.response);
      setSessionValues();
    }
    apiSuccess = "true";
  }
}

/**
 * @function
 * Summary: Called on API completion of Meridian Profile Details.
 * Parameters: error {Object} is the API response.
 */
function onCompleteMyFreestyleMeridianDetails() {
  if (apiSuccess) {
    renderActiveTab($(document).find("#myaccount-details"));
    renderMyAchievements($(document).find("#myaccount-details"));
    renderMyRewards($(document).find("#myaccount-details"));
    renderMyBadge($(document).find("#myaccount-details"));
    apiSuccess = "false";
  }
  $("#page-spinner").hide();
}

/**
 * @function
 * Summary: Called on error response of login.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleMeridianDetails(error) {
  $("#overlay-text").hide();
  $("#myaccount-welcome").show();
  $("#page-spinner").hide();
  $("#myaccount-details").remove();
  $("#ma-no-meridian").show();
}

  