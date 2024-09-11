/**
 * Global Code
 **/

let pk, usObj, usCon, usFn, mrdObj, usAddr, usRwd, usBdg, aSesExpTime;

/**
 * @function
 * Summary: Function to fetch user data from cookies
 * Parameters: -
 */
function setSessionValues() {
  aSesExpTime = getItemLocalStorage('aSesExpTime', true);

  if (!aSesExpTime) {
    //clear all storage
    clearUserStorage();
    return null;
  }

  pk = getItemLocalStorage('pk', true);
  usFn = getItemLocalStorage('usFn', true);
  usObj = getItemLocalStorage('usObj', true);
  usCon = getItemLocalStorage('usCon', true);
  mrdObj = getItemLocalStorage('mrdObj', true);
  usAddr = getItemLocalStorage('usAddr', true);
  usRwd = getItemLocalStorage('usRwd', true);
  usBdg = getItemLocalStorage('usBdg', true);
}

setSessionValues();

/**
 * @function
 * Summary: Function to clear browser storage
 * Parameters: NA
 */
function clearUserStorage() {
  removeItemLocalStorage('cJwt', true);
  removeItemLocalStorage('id.token', false);
  removeItemLocalStorage('mJwt', true);
  removeItemLocalStorage('refreshToken', true);
  removeItemLocalStorage('mrdObj', true);
  removeItemLocalStorage('usAddr', true);
  removeItemLocalStorage('usRwd', true);
  removeItemLocalStorage('usBdg', true);
  removeItemLocalStorage('usFn', true);
  removeItemLocalStorage('usObj', true);
  removeItemLocalStorage('usCon', true);
  removeItemLocalStorage('pk', true);
  removeItemLocalStorage('launchURL', true);
  removeItemLocalStorage('aSesExpTime', true);
  removeItemLocalStorage('aSessTimeNow', true);
  removeItemLocalStorage('totaleLearn', true);
}


const mfsLandingPage = $('[id*="mfsLandingPage"]'); // myfreestyle LP
const mfsELearningPage = $('[id*="ma-elearning-achievements"]'); //e-learning page
const mfsElearningCoursePlayerIFrame = $('[id*="courseiframe"]'); // e-learning iframe page
const mfsRewardsShopPage = $('[id*="rewardProductCards"]'); // reward shop page
const mfsMyAccountsPage = $('[id*="myProfilePage"]'); // my profile page
const mfsMyPointsAndBadgesPage = $(".my-badges-points"); //my badges and points page
const mfsLoginPage = $('[id*="myfreestyle-user-login"]'); // login page

$(document).ready(function () {
  // set equal height for feature-cards__content within .conatiner > .row
  setEqualHeight(true, '.o-features-card__content', '.o-features-card');

  // set equal height for Cards within .conatiner > .row
  setCardEqualHeight();
})