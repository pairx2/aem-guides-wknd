/** User Login -- starts**/
function updateConsentLogin(data) {

    delete data.body['requestType'];
    delete data.body['node'];

    data.body = {
        loginID: getSessionStorage('loginID'),
        password: getSessionStorage('loginPass'),
        consents: [{
                type: "PERSONAL_DATA_PROCESSING",
                approved: data.body.agreeTerms
            },
            {
                type: "TERMS_AND_CONDITIONS",
                approved: data.body.readPolicy
            }
        ],       
        captchaValue: data.body['g-recaptcha-response']

    }
    delete data.body['g-recaptcha-response'];



    return data;
}

function onBeforeConsentLogin() {
    showLoading();

}

function onSuccessConsentLogin(data) {
    if (data.errorCode == 0) {
        const dateVariable = new Date();
        let jwtToken = data.response.jwtToken.id_token;

        let jwtRefreshToken = data.response.jwtToken.refresh_token;
        setLocalStorage('loginTime', dateVariable.toLocaleTimeString('en-GB'));
        setSessionStorage('jwtToken', jwtToken, '');
        setSessionStorage('jwtRefreshToken', jwtRefreshToken);

        let parsedToken = parseJwt(jwtToken);
        setSessionStorage('jwtExp', parsedToken.exp);
		let firsttimestamp = parsedToken.iat;
		
        let loginResponse = data.response;
		loginResponse.refreshTokenStartTime = firsttimestamp;
        setSessionStorage('loginResponse', loginResponse);

        let jwtAddlClaimsToken = data.response.jwtToken.addl_claims_token;
        setSessionStorage('jwtAddlClaimsToken', jwtAddlClaimsToken);

        let userInfo = data.response.accountInfo.userInfo;
        setLocalStorage('userInfo', userInfo);

        triggerLoginEvent();

        enableSession();

        hideLoading();

        loginDataLayerUpdate(data);
        if (!$(".m-masked-container").length) {
            redirectHome();
        } else {
            location.reload();
        }

        $('#site-entering-popup-content').hide();
        removeSessionStorage('loginID');
        removeSessionStorage('loginPass')
    } else {
        onErrorUserLogin(data);
    }
}

function onErrorConsentLogin(error) {

    removeSessionStorage('jwtToken');
    removeSessionStorage('jwtExp');
    removeLocalStorage('userInfo');

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();

}

function loginDataLayerUpdate(data) {
    // login analytics data layer push
    window.dataLayer = window.dataLayer || [];
    const userData = data.response.accountInfo.userInfo;
    const {
        userId,
        sfdcId,
        specialty,
        institutionType,
        segmentType
    } = userData.additionalProperties;
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