function UpdateResetPassword(formData) {
	$(".loader-parent").show();
	var univantsrestPasskey = window.location.search.split('resetPasswordToken=')[1].split('==')[0];
	formData.body = {
		password: formData.body.newPassword,
		confirmPassword: formData.body.newPasswordConfirm,
		resetToken: univantsrestPasskey,
		"g-recaptcha-response": formData.body["g-recaptcha-response"]
	}
	return formData
}

// Reset password success response
function onResetsuccess(response) {
	$(".loader-parent").hide();
	if (response.errorCode === 0) {
		localStorage.setItem('resetPass', true);
	}
}
//Reset password error
function onResetError(response) {
	if (response.errorCode === 400) {
		window.location.href = "/en/reset-password/error.html";
	}
}