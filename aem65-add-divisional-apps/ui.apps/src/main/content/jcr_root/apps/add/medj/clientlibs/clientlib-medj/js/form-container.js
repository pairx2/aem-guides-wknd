// Forgot password
function forgotPasswordCustomization() {
    var forgotPasswordResponseMessageWrap = document.querySelector('#forget-password-response-wrap');
    forgotPasswordResponseMessageWrap.style.display = 'none';
}
// Reset password
function resetPasswordCustomization() {
    var resetPasswordSuccessResponseWrap = document.querySelector('#reset-password-success-response-wrap');
    resetPasswordSuccessResponseWrap.style.display = 'none';

    var urlParams = window.location.search;
    var resetPasswordTokenControl = document.querySelector('#reset-password-form-wrap #reset-password-token');
    resetPasswordTokenControl.value = urlParams.split('token=')[1];
}

$(document).ready(function () {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
        var forgotPasswordFormWrap = document.querySelector('#forget-password-form-wrap');
        if(forgotPasswordFormWrap) {
            forgotPasswordCustomization();
            // Redirect user to Home if login
            publicPageRedirectInLogin('#forgot-password-container', '/home.html');
        }
        var resetPasswordFormWrap = document.querySelector('#reset-password-form-wrap');
        if(resetPasswordFormWrap) {
            resetPasswordCustomization();
            // Redirect user to Home if login
            publicPageRedirectInLogin('#reset-password-container', '/home.html');
        }
    }
});