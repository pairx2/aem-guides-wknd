/** User Forgot Password -- starts**/
function updateForgotPassword(data) {   
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

    if (data.errorCode == 0) {
        hideLoading();
    } else {
        onErrorForgotPassword(data);
    }
}

function onErrorForgotPassword(error) {
    
    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** User Forgot Password -- ends**/