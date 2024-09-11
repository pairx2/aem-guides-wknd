function updateUnsubscribe(formData){
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    let countryCode = document.querySelector('input[name="x-country-code"]').value;
    let preferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    formData.headers = {
        'x-preferred-language': preferredLanguage,
        'x-country-code': countryCode,
        'x-application-id': headerApplicationId,
        'content-type': 'application/json'
    }
    formData.body = { 
        "emailAddress": formData.body.emailAddress,
        "g-recaptcha-response": formData.body["g-recaptcha-response"],
        "captchaType": "NON_ENT"
    }
    return formData;
}
function onUnSubscribeError(responseData){
    if(responseData.errorCode != 0) {
        if(responseData.response.i18nMessageKey == "REG-USER-1006"){
            $("#unsubscribe-form .o-form-container__error-msg").text($('[name="notValidEmail"]').val());
        }else{
            $("#unsubscribe-form .o-form-container__error-msg").text(responseData.response?.statusReason);  
        }
    }
}

