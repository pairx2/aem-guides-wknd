/**
 * MYFREESTYLE - USER REWARD PROFILE
 **/

/**
 * @function
 * Summary: Called before getRewardProfile api request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */
let isRewardProfileApiSuccess = false;
function updateRequestRewardProfile(data) {
  showLoaderForPointsLevels(true);

  delete data.body;
  return data;
}

/**
 * @function
 * Summary: Called on successful getRewardProfile API to process response.
 * Parameters: data {Object} is the API response.
 */
function onSuccessRewardProfile(data) {
  if (data.errorCode == 0) {
    if (data.response && data.response.currentPoint) {
      setusRwdData(data.response);
      isRewardProfileApiSuccess = true;
    }
  } else {
    onErrorRewardProfile(data);
  }
}


/**
 * @function
 * Summary: Called on Error getRewardProfile API to process response.
 */
function onErrorRewardProfile(error) {
  showHideApiError(error);
}

/**
 * @function
 * Summary: Called on Completion of Address API to handle my profile page
 */

function onCompleteRewardProfile() {
  if (isRewardProfileApiSuccess) {
    renderRewardPointsLevels();
    enableProductCards();
    enableDisableBadges();
  }
  showLoaderForPointsLevels(false);
  isRewardProfileApiSuccess = false;
}