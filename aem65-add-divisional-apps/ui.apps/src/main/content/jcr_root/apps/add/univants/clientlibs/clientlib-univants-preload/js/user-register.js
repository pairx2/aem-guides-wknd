//Below function to change JSON structure as per Service API
function UpdateRegisterDataRequest(formData) {

	$(".loader").show();
    formData.body = {
        userInfo: {
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            email: formData.body.email,
            institutionName: formData.body.institutionName,
            userType: "Applicant"
        },
        consents: [{
            type: "terms_and_conditions",
            value: formData.body.usAdministeredSiteAcknowledged
        }],
        "g-recaptcha-response" : formData.body["g-recaptcha-response"]         
    }
    return formData
}

// User register error function
function onErrorUserRegister(response) {
	$(".loader").hide();
    $(".o-form-container__error-msg").hide();
    showApiError('#user-register-api-error', response);

}
