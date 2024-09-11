

function UpdateResetPassword(formData) {
    let restPasskey = window.location.search.split('reset-token=')[1];
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId
	}
    formData.body = {
        password: formData.body.password,
        confirmPassword: formData.body.confirmpassword,
        resetToken: restPasskey
    }
    return formData
}

function UpdateForgotPassword(formData) {
    let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId
	}
    formData.body = {
        email: formData.body.email
    }
    return formData
}

function UpdateUpdatePassword(formData) {
    const token = getCookie('id_token') ? getCookie('id_token') : sessionStorage.getItem('jwtToken');  
	let headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	formData.headers = {
        'x-preferred-language': 'en',
		'x-country-code': 'US',
        'x-application-id': headerApplicationId,
        'x-id-token' : token
	}
    formData.body = {
        password: formData.body.password,
        newPassword: formData.body.newPassword,
        confirmPassword: formData.body.confirmPassword
    }
    return formData
}

function onUpdatePasswordError(responseData) {
    if(responseData.errorCode != 0) {
        $("#update-password .o-form-container__error-msg").text(responseData.response?.statusReason);
    }
    if(responseData.response.statusReason.indexOf('Incorrect username or password')>=0){
        $("#update-password .o-form-container__error-msg").text('Incorrect current password.');
    }
}

function onResetError(responseData) {
    if(responseData.errorCode != 0) {
        $("#reset-password .o-form-container__error-msg").text(responseData.response?.statusReason);
    }
}
