function updateRequestMyFreestyleSessionExtension(data) {
  $('#page-spinner').show();
data.headers["x-id-token"] = getCookie("cJwt", true);
data.body["refresh_token"] = getCookie("refreshToken", true);
delete data.body["g-recaptcha-response"];
delete data.body["requestType"];
delete data.body["node"];
return data;
}

function onSuccessMyFreestyleSessionExtension(data) {
if (data.errorCode == 0) {
  $('#page-spinner').hide();
  $("#extend-session-btn").prop("disabled", false);
  $('#extend-session .o-form-container__success-msg').css('visibility', 'hidden');
  let jwtToken = data.response && data.response.jwtToken;
  if (jwtToken) {
    //On Success - Login
    setCookie("cJwt", jwtToken, 1, true);
  }
  let refreshToken = data.response && data.response.refreshToken;
  if (refreshToken) {
    //On Success - Login
    setCookie("refreshToken", refreshToken, 1, true);
  }
} else {
  onErrorMyFreestyleSessionExtension(data);
}
}

function onErrorMyFreestyleSessionExtension(error) {
$("#extend-session-btn").prop("disabled", false);
showHideApiError(error);
$("#extend-session").hide();
$('#page-spinner').hide();
$('#extend-session .o-form-container__error-msg').css('visibility', 'hidden');
}

