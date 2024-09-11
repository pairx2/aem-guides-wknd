// Forgot password success response
function onSuccessForgotPassword(response) {
    var forgotPasswordResponseMessageWrap = document.querySelector('#forget-password-response-wrap');    
    var forgotPasswordFormCont = document.querySelector('#forgot-password-container').closest('.container');
    
    if(response.errorCode === 0) {
        forgotPasswordFormCont.style.display = 'none';
        forgotPasswordResponseMessageWrap.style.display = 'block';
    }
}

// Forgot password error response
function onErrorForgotPassword(response) {
    showApiError('#forgot-password-api-error', response);
}