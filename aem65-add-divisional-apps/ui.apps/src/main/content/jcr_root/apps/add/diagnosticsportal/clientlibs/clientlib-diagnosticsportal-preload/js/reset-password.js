function UpdateResetPassword(formData) {
    $(".loader-parent").show();
    var restPasskey = window.location.search.split('reset-token=')[1];
    formData.body = {
        'captchaAction':'Submit',
        'captchaType': 'ent',
        password: formData.body.password,
        confirmPassword: formData.body.confirmpassword,
        resetToken: restPasskey,
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]	
    }

    return formData

}

function onResetError(response) {
    if(response.errorCode === 400) {
        $(".loader-parent").hide();
       window.location.href = "/en/reset-password.html";
    }
}
