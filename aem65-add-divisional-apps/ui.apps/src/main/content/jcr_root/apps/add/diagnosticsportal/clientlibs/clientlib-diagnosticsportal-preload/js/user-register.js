//Below function to change JSON structure as per Service API
function UpdateRegisterDataRequest(formData) {
	localStorage.setItem('registeredEmail', formData.body.email);
	$(".loader-parent").show();
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var businessRole = document.querySelector('ul[name="role"] li.selected ').getAttribute('data-optionvalue');
    var languagePreference = document.querySelector('ul[name="languagePreference"] li.selected ').getAttribute('data-optionvalue');
    var countryOfBusiness = document.querySelector('ul[name="CountryOfBusiness"] li.selected ').getAttribute('data-optionvalue');

	formData.headers = {
        'x-preferred-language': 'en_US',
		'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
	}
    formData.body = {
    "userInfo": {
        "captchaType" : 'ent',
        "captchaAction" : 'submit',
        "firstName": formData.body.firstName,
        "lastName":formData.body.lastName,
        "email": formData.body.email,
        "phoneNumber": formData.body.phoneNumber,
        "password": formData.body.password,
		"g-recaptcha-response" : formData.body["g-recaptcha-response"],
        "additionalProperties": {
            "businessRole": businessRole,
            "languagePreference": languagePreference,
            "countryOfBusiness": countryOfBusiness,
            "instrumentSerialnumber": formData.body.instrumentSerialNumber,
            "isUSAdministeredSite": formData.body.usAdministeredSiteAcknowledged            
        }
    }

    }
    return formData
}
//User register success function
function onSuccessUserRegister(response) {
	if (response.errorCode == 0) {
        $(".loader-parent").hide();
		window.location.href = "/us/en/home.html";
	}
}

// User register error function
function onErrorUserRegister(response) {
	$(".loader-parent").hide();
    $(".o-form-container__error-msg").hide();
    showApiError('#register-api-error', response);

}
