// Reset password success response
function onSuccessResetPassword(response) {
    var resetPasswordResponseMessageWrap = document.querySelector('#reset-password-success-response-wrap');
    var resetPasswordFormCont = document.querySelector('#reset-password-container').closest('.container');
    if(response.errorCode === 0) {
        resetPasswordFormCont.style.display = 'none';
        resetPasswordResponseMessageWrap.style.display = 'block';
    }
}

// Reset password error response
function onErrorResetPassword(response) {
    showApiError('#reset-password-api-error', response);
}