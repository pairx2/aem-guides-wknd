//Below function to change JSON structure as per Service API
function UpdateRegisterDataRequest(formData) {
    formData.body = {
        userInfo: {
            userName: formData.body.email,
            password: formData.body.password,
            email: formData.body.email,
            firstName: formData.body.firstName,
            lastName: formData.body.lastName,
            medicalInstitution: formData.body.medicalInstitution,
            speciality: formData.body.speciality,
            designation: formData.body.designation,
            workPhone: formData.body.workPhone,
            occupation: formData.body.occupation,
            acceptPrivacyPolicy: formData.body.acceptPrivacyPolicy
        },
        subscriptions: [
            {
                id: formData.body.subscriptions[0].consentName,
                isSubscribed: formData.body.subscriptions[0].consentValue
            },
            {
                id: formData.body.subscriptions[1].consentName,
                isSubscribed: formData.body.subscriptions[1].consentValue
            },
            {
                id: formData.body.subscriptions[2].consentName,
                isSubscribed: formData.body.subscriptions[2].consentValue
            }
        ],
        "g-recaptcha-response" : formData["g-recaptcha-response"]
    }
    console.log(formData);
    return formData
}
// User register success function
function onSuccessUserRegister(response) {
    var successMessgae = document.querySelector('#UserRegisterFormWrap #registerSuccessInfo');
    var finalStepForm = document.querySelector('#UserRegisterFormWrap #user-register-final-step');
    var registerWizardButtonWrap = document.querySelector('#UserRegisterFormWrap button[name="registerFormSubmit"]').closest('.o-wizard__btn');
    if(response.errorCode === 0) {
        finalStepForm.style.display = 'none';
        registerWizardButtonWrap.style.display = 'none';
        successMessgae.style.display = 'block';
		document.querySelector('body').scrollIntoView();
    }
    console.log(JSON.stringify('Success: ' + response));
}
// User register error function
function onErrorUserRegister(response) {
    showApiError('#user-register-api-error', response);
    console.log(JSON.stringify('Error: ' + response));
}