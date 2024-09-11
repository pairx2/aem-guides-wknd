/** User Registration Functionality Start */
var regUserSalutation, regUserName, regUserEmailId;

function updateRequestUserRegistration(data) {

    var regAccessCodeValue = $('#regAcsCodeValue').val();
    var countryCode = data.headers['x-country-code'];
    var reCaptcha = data['g-recaptcha-response'];

    var salutationValue = radioValue(data.body['title']);
    var sickfundType = radioValue(data.body['sickfundType']);
    var bloodGlucoseUnit = radioValue(data.body['bloodGlucoseUnit']);

    var userGender = "";
    if(data.body['gender']) {
        userGender = radioValue(data.body['gender']);
    }

    var sickFundValue = data.body.sickfund ? data.body.sickfund : "";

    var lineTwo = data.body.address ? data.body.address : "";

    //User Name, email id  and salutation encoded 
    regUserSalutation = window.btoa(salutationValue);
    regUserName = window.btoa(data.body.lastName);
    regUserEmailId = window.btoa(data.body.email);
    var dob = data.body.dateOfBirth.split("/").join(".");
    var userRegDetails = {
        "action": "createProfileNormal",
        "userInfo": {
            "email": data.body.email,
            "password": data.body.password,
            "firstName": data.body.firstName,
            "lastName": data.body.lastName,
            "title": salutationValue,
            "dateOfBirth": dob,
            "additionalProperties": {
                "sickfund": sickFundValue,
                "sickfundType": sickfundType,
                "bloodGlucoseUnit": bloodGlucoseUnit,
                "consentCRM": data.body.consentCRM,
                "consentDataPrivacy": data.body.consentDataPrivacy,
                "consentTermsAndConditions": data.body.consentTermsAndConditions,
                "consentTraining": data.body.consentTraining,
                "reCaptcha": reCaptcha,
                "accessCode": regAccessCodeValue
            }
        },
        "addresses": [{
            "state": countryCode,
            "country": "Germany",
            "zipCode": data.body.zipCode,
            "city": data.body.city,
            "lineOne": data.body.street,
            "lineTwo": lineTwo,
            "defaultShipping": "true",
            "defaultBilling": "true"
        }],
        "contacts": [{
            "number": data.body.phonenumber,
            "mobileNumber": data.body.mobileNumber
        }]
    }

    data.body = userRegDetails;
    return data;

}

function onBeforeUserRegistration() {
    $('#page-spinner').css('display', 'block');
    $('#registrationWaitMsg').css('display', 'block');
}

function onSuccessUserRegistration(data) {

    if (data.errorCode == 0) {
        //hide all errors
        $('#apierror, #apierror_400').hide();
        
        $('#page-spinner').hide();
        $('#registrationWaitMsg').hide();
        $(".a-input-field[data-component-type='input-field-password'] .a-input-password-strength").removeClass('password-weak password-ok password-medium password-strong');
        var successPage = $("#btnSignupSuccess").attr('href');
        var url = successPage + "?salutation=" + regUserSalutation + "&username=" + regUserName + "&email=" + regUserEmailId;
        window.location.href = url;
    } else {
        onErrorUserRegistration(data);
    }

}

function onErrorUserRegistration(error) {
    $('#page-spinner').hide();
    $('#registrationWaitMsg').hide();
    // $('#userRegistrationStep4Btn').attr('disabled','true');
    // $(".a-input-field[data-component-type='input-field-password'] .a-input-password-strength").removeClass('password-weak password-ok password-medium password-strong');

    showHideApiError(error);
}