/** User Forgot Password -- starts**/
function updateForgotPassword(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaAction'] = 'Submit';
    data.body['captchaType'] = 'ent';
    return data;
}
window.updateForgotPassword = updateForgotPassword;

function onBeforeForgotPassword() {
    showLoading();
}
window.onBeforeForgotPassword = onBeforeForgotPassword;


function onSuccessForgotPassword(data) {

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}
window.onSuccessForgotPassword = onSuccessForgotPassword;

function onErrorForgotPassword(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorForgotPassword = onErrorForgotPassword;
/** User Forgot Password -- ends**/