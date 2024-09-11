/** User Reset Password -- starts**/
function updateResetPassword(data) {    

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

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}

function onErrorResetPassword(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** User Reset Password -- ends**/