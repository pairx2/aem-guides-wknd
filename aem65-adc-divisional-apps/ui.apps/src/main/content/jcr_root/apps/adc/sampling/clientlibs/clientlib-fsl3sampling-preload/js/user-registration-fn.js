/** User Registration Functionality Start */
let regUserSalutation, regUserName, regUserEmailId;

function updateRequestUserRegistration(data) {

    let regAccessCodeValue = $('#regAcsCodeValue').val();
    let countryCode = data.headers['x-country-code'];
    let reCaptcha;
    if ($('body').attr('data-enable-enterprise-recaptcha') === 'true') {
        reCaptcha = $('input[name=g-recaptcha-response]').val();
    } else {
        reCaptcha = data['g-recaptcha-response'];
    }
    let salutationValue = radioValue(data.body['title']);
    let sickfundType = radioValue(data.body['sickfundType']);
    let bloodGlucoseUnit = radioValue(data.body['bloodGlucoseUnit']);

    let userGender = "";
    if(data.body['gender']) {
        userGender = radioValue(data.body['gender']);
    }

    let sickFundValue = data.body.sickfund ? data.body.sickfund : "";

    let lineTwo = data.body.address ? data.body.address : "";

    //User Name, email id  and salutation encoded
    regUserSalutation = window.btoa(salutationValue);
    regUserName = window.btoa(data.body.lastName);
    regUserEmailId = window.btoa(data.body.email);

    let isCaptchaTypeEnt = $('body').attr('data-enable-enterprise-recaptcha') === 'true' ? 'ENT' : '';
  
    let regUserPhoneNumber = data.body.phonenumber;
    let regUserMobileNumber = data.body.mobileNumber;

    if (regUserPhoneNumber !== undefined && regUserPhoneNumber !== "") {
        regUserPhoneNumber = formatNumber(regUserPhoneNumber);
    }

    if (regUserMobileNumber !== undefined && regUserMobileNumber !== "") {
        regUserMobileNumber = formatNumber(regUserMobileNumber);
    }

    let userRegDetails = {
        "action": "createProfileNormal",
        "userInfo": {
            "email": data.body.email,
            "password": data.body.password,
            "confirmPassword": data.body.password,
            "firstName": data.body.firstName,
            "lastName": data.body.lastName,
            "title": salutationValue,
            "dateOfBirth": data.body.dateOfBirth,
            "nickName": data.body.firstName,
            "gender": userGender,
            "additionalProperties": {
                "sickfund": sickFundValue,
                "sickfundType": sickfundType,
                "bloodGlucoseUnit": bloodGlucoseUnit,
                "consentCRM": data.body.consentCRM,
                "consentDataPrivacy": data.body.consentDataPrivacy,
                "consentTermsAndConditions": data.body.consentTermsAndConditions,
                "consentDataProcessing":data.body.consentDataProcessing,
                "consentTraining": data.body.consentTraining,
                "reCaptcha": reCaptcha,
                "accessCode": regAccessCodeValue,
                "captchaType": isCaptchaTypeEnt
            }
        },
        "addresses": [{
            "country": countryCode,
            "zipCode": data.body.zipCode,
            "city": data.body.city,
            "lineOne": data.body.street,
            "lineTwo": lineTwo,
            "defaultShipping": "true",
            "defaultBilling": "true"
        }],
        "contacts": [{
            "number": regUserPhoneNumber,
            "mobileNumber": regUserMobileNumber
        }]
    }

    data.body = userRegDetails;
    return data;

}

function formatNumber(inputNumber){
    inputNumber = inputNumber.replaceAll(" ","");
    if (inputNumber.startsWith("0")) {
        inputNumber = inputNumber.replace("0", "+49 ");  
    } else {
        inputNumber = "+49 " + inputNumber;
    }
    return inputNumber;
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
        let successPage = $("#btnSignupSuccess").attr('href');
        let url = successPage + "?salutation=" + regUserSalutation + "&username=" + regUserName + "&email=" + regUserEmailId;
        window.location.href = url;
    } else {
        onErrorUserRegistration(data);
    }

}

function onErrorUserRegistration(error) {
    $('#page-spinner').hide();
    $('#registrationWaitMsg').hide();
    reCaptchaOnLoadLoginCall();
    showHideApiError(error);
}

$("#btn_click_grecaptcha").click(function(){
    if ($('body').attr('data-enable-enterprise-recaptcha') === 'true') {
        window?.grecaptcha?.enterprise?.render({
          sitekey: $('body').attr('data-site-key'),
          size: 'invisible',
          hl: 'de',
        });
       grecaptcha.enterprise.ready(function () {
        grecaptcha.enterprise.execute().then(function (token) {
            $('input[name=g-recaptcha-response]').val(token);
          }).catch(function (error) {
            console.log("enterprise grecaptcha not working :- " + error);
          });
        });
      } else {
        grecaptcha.ready(function () {
          grecaptcha.execute(gSiteKey, {
            action: 'submit'
          }).then(function (token) {
            $('input[name=g-recaptcha-response]').val(token);
          }).catch(function (error) {
            console.log("grecaptcha not working :- " + error);
          });
        });
      }
  });