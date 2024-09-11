/** Password Change -- starts**/
function updateRequestChangePassword(data) {   

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['newPassword'] = data.body["password"];
    data.body['password'] = data.body["currentPassword"];
    delete data.body['currentPassword'];

    let jwtToken =  getSessionStorage('jwtToken');

    data.headers['x-id-token'] = jwtToken;

    return data;
}

function onBeforeChangePassword() {
    showLoading();
}

function onSuccessChangePassword(data) {    

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();
    } else {
        onErrorChangePassword(data);
    }
}

function onErrorChangePassword(error) {    

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** Password Change -- ends**/