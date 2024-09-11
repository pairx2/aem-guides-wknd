function UpdateResetDataRequest(formData) {   

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    var currentURL = window.location.href;
	var resetToken = currentURL.split('resetToken=')[1];


    formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}
    formData.body = {
        password: formData.body.password,
        confirmPassword: formData.body.confirmPassword,
        resetToken: resetToken


    }
    return formData

}
function UpdateResetSuccess() {
	var successMsg = $('.o-form-container__success-msg').html() +' '+ $('#success_reset_pwd p').html();
	$('.o-form-container__success-msg').html(successMsg)
}
$(document).ready(function() {  

    $('#success_reset_pwd').hide();
});