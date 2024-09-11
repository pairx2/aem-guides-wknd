/** User Reset Password -- starts**/
function updateResetPassword(data) {
    console.log(data);

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onBeforeResetPassword() {
    showLoading();
}

function onSuccessResetPassword(data) {
    console.log(data);

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}

function onErrorResetPassword(error) {
    console.error(error);

    showApiError(error?.response);

    hideLoading();
}
/** User Reset Password -- ends**/