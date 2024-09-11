/** User Reset Password -- starts**/
function updateResetPassword(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    
    return data;
}
window.updateResetPassword = updateResetPassword;

function onBeforeResetPassword() {
    showLoading();
}
window.onBeforeResetPassword = onBeforeResetPassword;

function onSuccessResetPassword(data) {

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}
window.onSuccessResetPassword = onSuccessResetPassword;

function onErrorResetPassword(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);
    
    hideLoading();
}
window.onErrorResetPassword = onErrorResetPassword;
/** User Reset Password -- ends**/