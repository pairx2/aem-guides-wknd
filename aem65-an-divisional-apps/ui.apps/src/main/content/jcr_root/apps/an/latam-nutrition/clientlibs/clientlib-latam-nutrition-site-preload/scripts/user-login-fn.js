function handleJwtToken(jwtToken){
  if (jwtToken) { //On Success - Login
    setItemLocalStorage('cJwt', jwtToken, true);
  }
}
function handleUserInfo(data){
  if ( data.response.accountInfo.userInfo ) {
    setUsObj(data.response.accountInfo.userInfo);
  }
}
function onSuccessLatamnutritionUserLogin(data) {

  if (data.errorCode == 0) {
    let jwtToken = data.response && data.response.jwtToken.id_token;
    handleJwtToken(jwtToken);
    handleUserInfo(data);
    //update session cookie
    updateSessionCookie(jwtToken, true);
  } else {
    onErrorLatamnutritionUserLogin(data);
  }
  let successfulLogin = getItemLocalStorage('cJwt',true);
    if(successfulLogin) {
        removeItemLocalStorage('userDetails', false);
        let firstName = getItemLocalStorage('username',true);
        $('#header-user-name')[0].innerText = "HOLA"+ " "+ firstName;     
        $('#header-user-name').removeClass('d-none');
        $('#header-user-logout').removeClass('d-none');
        if($('.a-link--base.a-link--login').length > 0) {
          $('.a-link--base.a-link--login').addClass('d-none');
        }
        if($('.a-link--base.a-link--register').length > 0) {
          $('.a-link--base.a-link--register').addClass('d-none');
        }
        $('#form-latam-login-logout').removeClass('d-none');
    } else {
        if($('.a-link--base.a-link--register').length > 0) {
          $('.a-link--base.a-link--register').removeClass('d-none');
        }
        if($('.a-link--base.a-link--login').length > 0) {
          $('.a-link--base.a-link--login').removeClass('d-none');
        }
        $('#header-user-name').addClass('d-none');
        $('#header-user-logout').addClass('d-none');
        $('#form-latam-login-logout').addClass('d-none');
    }
}


/**
 * @function
 * Summary: Called before login request, to update the payload.
 * Parameters: data {Object} initial payload generated from form-container.
 */ 
function updateRequestLatamnutritionUserLogin(data) {
  delete data.body['requestType'];
  delete data.body['node'];
  return data;
}

/**
 * @function
 * Summary: Called before login request, on click of login submit button
 * Parameters: NA
 */
function onBeforeLatamnutritionUserLogin() {
  //hide verify messages section
  $('#login_verify_error').hide();
  $('#login_verify_success').hide();
}


/**
 * @function
 * Summary: Called on error response of login. 
 * Parameters: error {Object} is the API response.
 */
function onErrorLatamnutritionUserLogin(error) {
  removeItemLocalStorage('cJwt', true);
  removeItemLocalStorage('userDetails', false);
  removeItemLocalStorage('username', true);
  deleteCookie('usFn', true);
  deleteCookie('usObj', true);
  deleteCookie('usCon', true);
  deleteCookie('pk', true);
}


