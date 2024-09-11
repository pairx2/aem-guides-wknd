var headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

function activationlink() {

	var getRegisteredEmail = localStorage.getItem('registeredEmail');

	var data = {
		"email": getRegisteredEmail
	}
	$.ajax({
		url: searchUserurlOrigin + '/api/public/profile/resend-verification-email',
		type: "PUT",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),

		"headers": {
			"x-application-id": headerApplicationId,
			"x-country-code": headerCountryCode,
			'Content-Type': 'application/json'
		},
		success: function(response) {
			
		},
		error: function(error) {


		}
	});

}

$(document).ready(function() {
	if (document.getElementById('activation-email')) {
		activationlink();
	}


});
