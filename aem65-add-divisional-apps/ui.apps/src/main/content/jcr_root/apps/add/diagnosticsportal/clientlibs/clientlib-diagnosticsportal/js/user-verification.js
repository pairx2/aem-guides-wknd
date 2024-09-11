var headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

function registerUserVerification() {
    var userVerifyKey = window.location.search.split("verifykey=")[1];
    var registerUserVerifyServiceUrl = document.querySelector('#verify-account form').getAttribute('action');
    $('.loader-parent').show();
    if (userVerifyKey) {
		var decodeuserKey = decodeURIComponent(userVerifyKey);

 	var data = {
        };      
        $.ajax({
            url: registerUserVerifyServiceUrl,
            type : "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8", 
            data: JSON.stringify(data),
            "headers": {
                "x-application-id": headerApplicationId,
                "x-country-code": headerCountryCode, 
                "x-preferred-language": headerPreferredLanguage,
                "x-verification-token" : decodeuserKey
            },            
            success: function(response) {
                if (response.errorCode == 0) {
                    $('.loader-parent').show();
                    $("#register-confirm").parent().show();
                    $('.loader-parent').hide();
                }
                else if(response.errorCode != 0)
                {
                    $('.loader-parent').show();
                    $("#register-failure").parent().show(); 
                    $('.loader-parent').hide();
                }
            },
            error: function(error) {
                

            }
        });
    }
}

$(document).ready(function () {   
    $("#register-confirm,#register-failure").parent().hide();
    if (document.getElementById('verify-account')) {
        registerUserVerification();      
    }
});
