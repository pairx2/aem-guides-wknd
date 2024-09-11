/** User Account Profile -- starts**/
let tempUserInfo;

function updateRequestUserAccount(data) {
    tempUserInfo = getLocalStorage('userInfo');
    tempUserInfo.firstName = data.body.firstName;
    tempUserInfo.lastName = data.body.lastName;

    // If user has already registered an NPI, we don't send this along with the update, only when they enter a new NPI
    let hadNPI = false;
    if (tempUserInfo.additionalProperties.npiNumber && tempUserInfo.additionalProperties.npiNumber.length > 0) {
        hadNPI = true;
    }

    if (data.body.npiNumber) {
        tempUserInfo.additionalProperties.npiNumber = data.body.npiNumber;
    }

    let userInfo = {
        "userInfo": {
            "firstName": data.body.firstName,
            "lastName": data.body.lastName
        }
    };

    if (!hadNPI) {
        userInfo.userInfo.additionalProperties = {};
        userInfo.userInfo.additionalProperties["npiNumber"] = data.body.npiNumber || '';
    }

    data.body = userInfo;

    const token = getSessionStorage("jwtToken");
    data.headers["x-id-token"] = token;

    return data;
}

function onBeforeUserAccount() {
    showLoading();
}

function onSuccessUserAccount(data) {    

    if (data.errorCode == 0) {
        setLocalStorage("userInfo", tempUserInfo);

        hideApiError();

        hideLoading();
    } else {
        onErrorUserAccount(data);
    }
}

function onErrorUserAccount(error) {   

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
/** User Account Profile -- ends**/