/**
 * @function
 * Summary: Function that executes before triggering API call
 * Parameters: data -> payload
 */
function updateRequestLatamnutritionEmailPassword(data) {
	delete data.body['g-recaptcha-response'];
    delete data.body['node'];
    delete data.body['requestType'];
    let successfulLogin = getItemLocalStorage('cJwt',true);
    data.headers['x-id-token'] = successfulLogin;
    if(data.body['newPassword'] && !data.body['confirmPassword']) {
        data.body['confirmPassword'] = data.body['newPassword'];
    }
    return data;
}
