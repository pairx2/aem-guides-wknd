/** User Delegate Sample Request -- starts**/
let tempDelegateUserInfo;

function updateRequestUserDelegate(data) {
    tempDelegateUserInfo = getLocalStorage('userInfo');

    delete data.body['requestType'];
    delete data.body['node'];
    delete data.body['g-recaptcha-response'];

    let gratisApprovedFor = data.body['gratisApprovedFor'];

    tempDelegateUserInfo.additionalProperties.gratisApprovedForC = gratisApprovedFor;

    delete data.body['gratisApprovedFor'];

    data.body['userInfo'] = {};
    data.body['userInfo']['gratisApprovedFor'] = gratisApprovedFor;

    let jwtToken = getSessionStorage('jwtToken');

    data.headers['x-id-token'] = jwtToken;

    return data;
}

function onBeforeUserDelegate() {
    showLoading();
}

function onSuccessUserDelegate(data) {

    if (data.errorCode == 0) {
        setLocalStorage("userInfo", tempDelegateUserInfo);

        //hide all errors
        hideApiError();

        hideLoading();
    } else {
        onErrorUserDelegate(data);
    }
}

function onErrorUserDelegate(error) {   

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** User Delegate Sample Request -- ends**/