/**
 * MYFREESTYLE - Meridian Profile Details
 **/

/**
 * @function
 * Summary: Called before  Meridian Profile Details API request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */

let isMeridianApiSuccess = false;

function updateRequestMyFreestyleMeridianDetails(data) {

  if (!data.headers["meridianJwtToken"]) {
    data.headers["meridianJwtToken"] = getItemLocalStorage("mJwt", true);
  }
  delete data.body;
  return data;
}

/**
 * @function
 * Summary: Called before Meridian Profile Details request, on click of login submit button
 * Parameters: NA
 */
function onBeforeMyFreestyleUserMeridianDetails() {
  renderELearningCardsSkeleton();
}

/**
 * @function
 * Summary: Called on successful Meridian Profile Details to process response.
 * Parameters: data {Object} is the API response.
 */

function onSuccessMyFreestyleMeridianDetails(data) {
  if (data.errorCode == 0) {
    let meridainDetails = data.response.completeMeridianDetails;
    if (meridainDetails) {
      setUsObjMeridian(data.response);
      setSessionValues();
    }
    isMeridianApiSuccess = true;
  } else {
    onErrorMyFreestyleMeridianDetails(data);
  }
}

/**
 * @function
 * Summary: Called on API completion of Meridian Profile Details.
 * Parameters: error {Object} is the API response.
 */
function onCompleteMyFreestyleMeridianDetails() {
  if (isMeridianApiSuccess) {
    getCompletedELearning();
    isMeridianApiSuccess = false;
  }

  renderELearningCards();
}

/**
 * @function
 * Summary: Called on error response of login.
 * Parameters: error {Object} is the API response.
 */
function onErrorMyFreestyleMeridianDetails(error) {
  showhideModal('btnModalErrorNoMeridian', 1, true);
}

