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
                "country"   : data.body.country,
                "userType" : data.body.role,
                "npiNumber": data.body.npiNumber,
                "phoneNumber": data.body.phoneNumber,
                "additionalProperties": [{
                    "instrumentSerialNumber": data.body.instrumentSerialNumber,
                    "customerNumber": data.body.customerNumber,
                    "businessName": data.body.companyName,
                    "distributorName": data.body.distributorName
                }]
            }
        };
    } else {
        userRegDetails = {
            "userInfo": {
                "email": data.body.email,
                "phoneNumber": data.body.phoneNumber,
                "password": data.body.password,
                "firstName": data.body.firstName,
                "lastName": data.body.lastName,
                "country"   : data.body.country,
                "userType" : data.body.role,
                "npiNumber": data.body.npiNumber,
                "institutionType": data.body.institutionType,
                "specialty": data.body.specialty,
                "institutionName": data.body.institutionName,
                "additionalProperties": {
                    "instrumentSerialNumber": data.body.instrumentSerialNumber,
                    "customerNumber": data.body.customerNumber,
                    "businessName": data.body.companyName,
                    "distributorName": data.body.distributorName
                },
            }
        }
    }

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


    userRegDetails['g-recaptcha-response'] = data.body['g-recaptcha-response'];
    userRegDetails['captchaAction'] = 'Submit';
    userRegDetails['captchaType'] = 'ent';
    
    // fire analytics event
    const analyticsLabObj = {
        "lab":{
            "labType": "primary", // should always be primary in account creation
            "labId": data.body.customerNumber // use customer number
        }
    }
    window.addAnalytics.fireAnalyticsEvent("user_registration", analyticsLabObj);
    
    data.body = userRegDetails;
    return data;

}
window.updateRequestUserRegistration = updateRequestUserRegistration;

function onBeforeUserRegistration() {
    showLoading();
}
window.onBeforeUserRegistration = onBeforeUserRegistration;

function onSuccessUserRegistration(data) {

    if (data.errorCode == 0) {
        //hide all errors
        hideApiError();

        hideLoading();

        // Log user in with the response
        $("fieldset.o-wizard__content").hide();
        $("#success-shown").css("display","block");

        $(".a-input-field[data-component-type='input-field-password'] .a-input-password-strength").removeClass('password-weak password-ok password-medium password-strong');

        return true;
    } else {
        onErrorUserRegistration(data);
    }
}
window.onSuccessUserRegistration = onSuccessUserRegistration;

function onErrorUserRegistration(error) {
    console.error(error);
    if((error?.response?.i18nMessageKey === 'CM-001')){
       let statusReason = error?.response?.statusReason;
        if(statusReason.includes('userType') && statusReason.includes("country") ){
            showApiError('usertype-country-ERROR');
            $(".o-wizard-container__error-msg").css("display","none");
            hideLoading();
        }
        else if((statusReason).includes('country')){
            showApiError('country-ERROR');
            $(".o-wizard-container__error-msg").css("display","none");
            hideLoading();
        }
        else if(statusReason.includes('userType')){
            showApiError('userType-ERROR');
            $(".o-wizard-container__error-msg").css("display","none");
            hideLoading();
        }
    }
    showApiError(error?.response?.i18nMessageKey);
    $(".o-wizard-container__error-msg").css("display","none");

    hideLoading();
}
window.onErrorUserRegistration = onErrorUserRegistration;

function registrationDataLayerUpdate(data) {
    // registration analytics data layer push
    window.dataLayer = window.dataLayer || [];
    const userData = data?.response?.accountInfo?.userInfo;
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