/** Resend Verification -- starts**/
function updateResendVerification(data) {    

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onBeforeResendVerification() {
    showLoading();
}

function onSuccessResendVerification(data) {    

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}

function onErrorResendVerification(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** Resend Verification -- ends**/