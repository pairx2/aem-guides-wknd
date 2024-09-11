/** Contact -- starts**/
function updateRequestContact(data) {    

    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];

    return data;
}

function onBeforeContact() {
    showLoading();
}

function onSuccessContact(data) {    

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();
    } else {
        onErrorContact(data);
    }
}

function onErrorContact(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** Contact -- ends**/