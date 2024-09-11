/** User Get Profile - start**/
/**
 * @function
 * Summary: Called before get profile request on my account page, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
function updateRequestMyFreestyleGetProfile(data) {
  $('#page-spinner').show();
  delete data.body['requestType'];
  delete data.body['node'];
  delete data.body['g-recaptcha-response'];
  delete data.body;
  return data;
}

/**
 * @function
 * Summary: Called on successful get profile to process response. 
 * Parameters: data {Object} is the API response.
 */
function onSuccessMyFreestyleGetProfile(data) {
  if (data.errorCode == 0) {
    if (data.response && data.response.email) {
      setUsObj(data.response);
      setSessionValues();
    }
  } else {
    onErrorMyFreestyleCommon(data);
  }
}

/**
 * @function
 * Summary: Called on API completion of get profile. 
 * Parameters: error {Object} is the API response.
 */
function onCompleteMyFreestyleGetProfile() {
  renderActiveTab($(document).find('#myaccount-details'));
  renderMyRewards($(document).find('#myaccount-details'));
  renderMyBadge($(document).find('#myaccount-details'));
  renderMyAchievements($(document).find('#myaccount-details'));

  $('#page-spinner').hide();
}
/** User Get Profile - end**/