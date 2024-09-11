//Below function to change JSON structure as per Service API
function UpdateJudgeRegisterRequest(formData) {
var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode  = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    var jwtToken = getCookie('id.token');
	var country = document.querySelector('ul[name="country"] .selected').getAttribute('data-country');
	var judgeOrgId = document.querySelector('ul[name="deactivate-organization-names"] .selected').getAttribute('id');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
        'x-id-token': jwtToken,
        'Content-Type': 'application/json'
    }
    formData.body = {
        userInfo: {
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            email: formData.body.email,
			judgeOrganization: judgeOrgId,
            judgeCountry: country,
			judgeDateTrained: formData.body.trainDate,
			judgeInitiationYear: formData.body.initiationYear,			
            userType: "Judge"
        },
        consents: [{
            type: "terms_and_conditions",
            value: true
        }]
        //"g-recaptcha-response" : formData["g-recaptcha-response"]          
    }
    return formData
}

// User register error function
function onErrorJudgeRegister(response) {
    $(".o-form-container__error-msg").hide();
    showApiError('#judge-register-api-error', response);
    if(response.errorCode == 400){
		$("#addJudgeContainer .requestFailed").show();
		setTimeout(function() {
			$("#addJudgeContainer .requestFailed").hide();
        }, 20000);
    }
}


    
