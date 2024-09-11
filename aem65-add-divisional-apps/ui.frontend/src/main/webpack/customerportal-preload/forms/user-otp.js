/** User Login -- starts**/

function updateRequestUserOTP(data) {

    delete data.body['requestType'];
    delete data.body['node'];

    return data;
}
window.updateRequestUserOTP = updateRequestUserOTP;

function onBeforeUserOTP() {
    showLoading();
}
window.onBeforeUserOTP = onBeforeUserOTP;

function onSuccessUserOTP(data) {


    if(data.errorCode == 0) {

        var jwtToken = data.response.jwtToken.id_token;

        setCookie('jwtToken', jwtToken, '');

        var authInfo = {
            "accountInfo": {
                "userInfo": {
                    "additionalProperties": {
                        "ecommToken": jwtToken,
                        "extToken": "extToken"
                    }
                }
            },
            "jwtToken": {
                "id_token": jwtToken,
                "refresh_token": "refresh_token"
            }
        };

        /*
        const applicationId = document.getElementsByName('x-application-id')[0]?.value;
        const language = document.getElementsByName('x-preferred-language')[0]?.value;

        const authInfoKey = "authInfo-" + applicationId + "-" + language;
        */

        removeLocalStorage("session-expired-modal");

        const authInfoKey = getLocalAuthContextName();

        setLocalStorage(authInfoKey, authInfo);

        var parsedToken = parseJwt(jwtToken);
        localStorage.setItem('jwtExp',parsedToken.exp);

        var profile = data.response.accountInfo.profile;
		var userType=data.response.accountInfo.data.userType;
		if (userType && userType != '') {
		profile.userType = userType;
		}
        setLocalStorage('profile',profile);
		

        var preferences = data.response.accountInfo.data?.communication?.channel[0]?.preferences;
        if (preferences) {
            setLocalStorage('notifications', JSON.parse(preferences));
        }

        localStorage.removeItem('role');
    
        // fire analytics
        triggerLoginEvent(profile);

        enableSession();

        hideLoading();

        return true;

    } else {
        onErrorUserLogin(data);
    }
}
window.onSuccessUserOTP = onSuccessUserOTP;

function onErrorUserOTP(error) {
    deleteCookie('jwtToken');
    removeLocalStorage('jwtExp');
    removeLocalStorage('userInfo');

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorUserOTP = onErrorUserOTP;

function loginDataLayerUpdate(data) {
    // login analytics data layer push
    window.dataLayer = window.dataLayer || [];
    const userData = data.response.accountInfo.userInfo;
    const { userId, sfdcId, specialty, institutionType, segmentType } = userData.additionalProperties;
    window.dataLayer.push({
        "event": "login",
        "cognitoID": `${userId}`,
        "contactID": `${sfdcId}`,
        "specialization": `${specialty}`,
        "institutionType": `${institutionType}`,
        "persona": `${segmentType}`
    });
}
/** User Login -- end**/
