$(document).ready(function() {    


    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var adminSessionCode;
    var origin = window.location.origin;
    var replaceString = origin.split('.')[1];
        origin = origin.replace(replaceString,'services');
        if(origin.indexOf('www.')>-1){
			origin = origin.replace('www.','');
        }


	var currenturlSso = window.location.href;
    if(currenturlSso.includes("activation.html?activationToken="))
	{
        adminSessionCode = currenturlSso.split('activationToken=')[1];

        $.ajax({			
			url: origin + '/api/public/profile/verify-account',
			type: "GET",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			"headers": {
			"x-application-id": headerApplicationId,
            "x-country-code": headerCountryCode,
            "x-preferred-language": headerLanguage,
            "x-verification-token" : adminSessionCode
			},
			success: function(response) {


			},
			error: function(error) {

            }
		});
	}
    else if(currenturlSso.includes("reset-password.html?resetToken="))
	{
       adminSessionCode = currenturlSso.split('resetToken=')[1];

        $.ajax({			
			url: origin + '/api/public/profile/verify-account',
			type: "GET",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			"headers": {
			"x-application-id": headerApplicationId,
            "x-country-code": headerCountryCode,
            "x-preferred-language": headerLanguage,
            "x-verification-token" : adminSessionCode
			},
			success: function(response) {


			},
			error: function(error) {				
                    window.location.href =  window.location.origin + "/co/es/login.html";

            }
		});
	}
});