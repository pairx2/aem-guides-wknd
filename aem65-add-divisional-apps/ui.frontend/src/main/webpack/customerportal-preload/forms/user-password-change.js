/** Password Change -- starts**/
function updateRequestChangePassword(data) {

    delete data.body['requestType'];
    delete data.body['node'];
    data.body['newPassword'] = data.body["password"];
    data.body['password'] = data.body["currentPassword"];
    delete data.body['currentPassword'];

    var jwtToken = getCookie('jwtToken');

    data.headers['x-id-token'] = jwtToken;

    return data;
}
window.updateRequestChangePassword = updateRequestChangePassword;


function onBeforeChangePassword() {
    showLoading();
}
window.onBeforeChangePassword = onBeforeChangePassword;

function onSuccessChangePassword(data) {
    console.error(data);

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();
    } else {
        onErrorChangePassword(data);
    }
}
window.onSuccessChangePassword = onSuccessChangePassword;

function onErrorChangePassword(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorChangePassword = onErrorChangePassword;
/** Password Change -- ends**/