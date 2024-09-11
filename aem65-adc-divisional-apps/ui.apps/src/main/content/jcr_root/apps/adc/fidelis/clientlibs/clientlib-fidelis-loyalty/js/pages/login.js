/**
 * Login - page
 **/

$(document).ready(function () {

  // **************************
  // MF Login Fragment - Hide
  // **************************
  let getLoginStatus = isUserInLogedInState();
  if (mfsLoginPage.length > 0 && isOnPublish()) {
    setTimeout(() => {
      const setUserLoginEvent = createConditionalEvent(getLoginStatus === true, "checkUserLoginState");
      window.dispatchEvent(setUserLoginEvent);
    }, 500);
  }
});
