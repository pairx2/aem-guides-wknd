/** Password Change -- starts**/
function updateRequestChangePassword(data) {
    console.log(data);

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['newPassword'] = data.body["password"];
    data.body['password'] = data.body["currentPassword"];
    delete data.body['currentPassword'];

    let jwtToken = getCookie('jwtToken');

    data.headers['x-id-token'] = jwtToken;

    return data;
}

function onBeforeChangePassword() {
    showLoading();
}

function onSuccessChangePassword(data) {
    if (data.errorCode == 0) {
        hideApiError();
        hideLoading();
    } else {
        onErrorChangePassword(data);
    }
}

function onErrorChangePassword(error) {
    showApiError(error?.response);
    hideLoading();
}
/** Password Change -- ends**/