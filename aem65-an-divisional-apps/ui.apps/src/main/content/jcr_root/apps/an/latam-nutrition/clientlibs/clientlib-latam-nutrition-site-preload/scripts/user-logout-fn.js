/** ID logout: header-user-logout**/

function onSuccessLatamnutritionUserLogout(data) {
    let jwt = getItemLocalStorage('cJwt', true);
    if (data.errorCode === 0) {
        removeItemLocalStorage('cJwt', true);
        removeItemLocalStorage('userDetails', false);
        deleteCookie('usFn', true);
        deleteCookie('pk', true);
        updateSessionCookie(jwt, false);
    }
}

function updateRequestLatamnutritionUserLogout(data) {
	let xIdToken = getItemLocalStorage('cJwt', true);
	data.headers['x-id-token'] = xIdToken;
    delete data.body['requestType'];
    delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body;
    return data;
}

