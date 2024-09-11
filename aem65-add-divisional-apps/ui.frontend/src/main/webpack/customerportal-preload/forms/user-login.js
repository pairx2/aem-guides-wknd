/** User Login -- starts**/

function updateRequestUserLogin(data) {

    delete data.body['requestType'];
    delete data.body['node'];

    $("#otpform [name=loginID]").val(data.body["loginID"]);
    $("#otpform [name=password]").val(data.body["password"]);

    $("#consentform [name=loginID]").val(data.body["loginID"]);
    $("#consentform [name=password]").val(data.body["password"]);
    data.body['captchaAction'] = 'Submit';
    data.body['captchaType'] = 'ent';

    return data;
}
window.updateRequestUserLogin = updateRequestUserLogin;

function onBeforeUserLogin() {
    showLoading();
}
window.onBeforeUserLogin = onBeforeUserLogin;

function onSuccessUserLogin(data) {

    if(data.errorCode == 1003) {


        hideLoading();
        hideApiError();
        $("#loginform").hide();
        $("#consentform").hide();
        $("#otpform").show();
        
    } else {
        LoginUser(data);
      }
}

function LoginUser(data) {

    var jwtToken = data?.response?.jwtToken?.id_token;
    if(jwtToken) {

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
        localStorage.setItem('jwtExp', parsedToken.exp);

        var profile = data.response.accountInfo.profile;
        var userType = data.response.accountInfo.data.userType;
        if (userType && userType != '') {
            profile.userType = userType;
        }
        setLocalStorage('profile', profile);


        var preferences = data.response.accountInfo.data?.communication?.channel[0]?.preferences;
        if (preferences) {
            setLocalStorage('notifications', JSON.parse(preferences));
        }

        localStorage.removeItem('role');
        localStorage.removeItem('isDistAdmin');

        triggerLoginEvent();

        enableSession();

        hideLoading();
        
        window.addAnalytics.fireAnalyticsEvent("user_login", {
            "lab":{
                "labType": (window.getLocalStorage('custportalSelectedLabProfile')?.primary) ? "primary":"not_primary",
                "labId"  : window.getLocalStorage('custportalSelectedLabProfile')?.labProfileId,
              }, 
            "user" : {
                "userLoginStatus" : "authenticated",
                "userType" : "employee"
            }
        });
        var responseRedirect = data?.response?.accountInfo?.data?.userType;
        ShowThankyouPage(responseRedirect);

        return true;
    }

}
function ShowThankyouPage(responseRedirect) {

    if($('input[type="hidden"][name="thankyouPage"]').length == 0) {
        return;
    }
    if(responseRedirect == "distributor") {
        window.location.href = "secure/technical-library.html";
    } else {
        window.location.href = $('input[type="hidden"][name="thankyouPage"]').val();
    }

}

window.onSuccessUserLogin = onSuccessUserLogin;

function onErrorUserLogin(error) {

    if(error.errorCode == 1019) {

        hideLoading();
        hideApiError();
        $("#loginform").hide();
        $("#otpform").hide();
        $("#consentform").show();

    } else {
        showError(error);
    }
}
function showError(error) {
    deleteCookie('jwtToken');
    removeLocalStorage('jwtExp');
    removeLocalStorage('userInfo');

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorUserLogin = onErrorUserLogin;

function updateRequestUserConsent(data) {

    let userRegDetails = {
        "loginID": data.body.loginID,
        "password": data.body.password,
        "g-recaptcha-response":data.body["g-recaptcha-response"]
    };

    userRegDetails["consents"] = [
        {
            "consentName": "acknowledgement",
            "consentValue": "true"
        },
        {
            "consentName": "terms and conditions",
            "consentValue": "true"
        }
    ];

    data.body = userRegDetails;

    return data;
}
window.updateRequestUserConsent = updateRequestUserConsent;

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