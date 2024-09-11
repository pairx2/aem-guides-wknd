/** Resend Verification -- starts**/
function updateResendVerification(data) {
    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaAction'] = 'Submit';
    data.body['captchaType'] = 'ent';
    return data;
}
window.updateResendVerification = updateResendVerification;

function onBeforeResendVerification() {
    showLoading();
}
window.onBeforeResendVerification = onBeforeResendVerification;

function onSuccessResendVerification(data) {
    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}
window.onSuccessResendVerification = onSuccessResendVerification;

function onErrorResendVerification(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorResendVerification = onErrorResendVerification;
/** Resend Verification -- ends**/