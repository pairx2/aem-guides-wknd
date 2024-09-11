/** User Forgot Password -- starts**/
function updateForgotPassword(data) {
    console.log(data);

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onBeforeForgotPassword() {
    showLoading();
}

function onSuccessForgotPassword(data) {
    console.log(data);
    if (data.errorCode == 0) {
        hideLoading();
        $('#forgotPasswordResetPassword').hide();
        $('#successPopup').show();
        $('.container').removeClass("pt-0");
        $('.container').removeClass("pb-0");
    } else {
        onErrorForgotPassword(data);
    }
}

function onErrorForgotPassword(error) {
    console.error(error);

    showApiError(error?.response);

    hideLoading();
}
/** User Forgot Password -- ends**/
