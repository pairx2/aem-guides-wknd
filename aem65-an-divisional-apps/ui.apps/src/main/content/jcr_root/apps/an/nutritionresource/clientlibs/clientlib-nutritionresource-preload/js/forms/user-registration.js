/** User Registration -- starts**/
function updateRequestUserRegistration(data) {
    const regAccessCode = $("#accessCode").val();

    let userRegDetails;

    if (regAccessCode && regAccessCode != '') {
        userRegDetails = {
            "userInfo": {
                "email": data.body.email,
                "password": data.body.password,
                "firstName": data.body.firstName,
                "lastName": data.body.lastName,
                "accessCode": regAccessCode,
                "npiNumber": data.body.npiNumber
            }
        };
    } else {
        userRegDetails = {
            "userInfo": {
                "email": data.body.email,
                "password": data.body.password,
                "firstName": data.body.firstName,
                "lastName": data.body.lastName,
                "npiNumber": data.body.npiNumber,
                "institutionType": data.body.institutionType,
                "specialty": data.body.specialty,
                "institutionName": data.body.institutionName,
                "accessCode": ""
            }, "addresses": [{
                "zipCode": data.body.zipCode,
                "city": data.body.city,
                "state": data.body.state,
                "lineOne": data.body.lineOne,
                "lineTwo": data.body.lineTwo,
            }]
        }
    }

    userRegDetails["consents"] = [
        {
            "type": "PERSONAL_DATA_PROCESSING",
            "approved": true
        },
        {
            "type": "TERMS_AND_CONDITIONS",
            "approved": true
        }
    ];

    userRegDetails['captchaValue'] = data.body['g-recaptcha-response'];

    data.body = userRegDetails;

    return data;

}

function onBeforeUserRegistration() {
    showLoading();
}

function onSuccessUserRegistration(data) {
    console.error(data);

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();

        // Log user in with the response
        onSuccessUserLogin(data);

        $(".a-input-field[data-component-type='input-field-password'] .a-input-password-strength").removeClass('password-weak password-ok password-medium password-strong');
        
        registrationDataLayerUpdate(data);
    } else {
        onErrorUserRegistration(data);
    }
}

function onErrorUserRegistration(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}

function registrationDataLayerUpdate(data) {
    // registration analytics data layer push
    window.dataLayer = window.dataLayer || [];
    const userData = data.response.accountInfo.userInfo;
    const { userId, sfdcId, specialty, institutionType, segmentType } = userData.additionalProperties;
    window.dataLayer.push({
        "event": "registration",
        "cognitoID": `${userId}`,
        "contactID": `${sfdcId}`,
        "specialization": `${specialty}`,
        "institutionType": `${institutionType}`,
        "persona": `${segmentType}`
    });
}
/** User Registration -- ends**/