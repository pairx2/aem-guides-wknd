function UpdateLoginDataRequest(formData) {   

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;


    formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}
    formData.body = {
        loginID: formData.body.email,
        password: formData.body.password,
		"g-recaptcha-response" : formData.body["g-recaptcha-response"]	
    }
    return formData

}

function OnSuccessFunction(data) { 
    if (data.errorCode == 0) {
    	let jwtToken = data.response.jwtToken.id_token;
       	let firstName = data.response.accountInfo.profile.firstName;
		let lastName = data.response.accountInfo.profile.lastName;
		setCookie('id.token', jwtToken, '');
		localStorage.setItem('firstName', firstName);
		localStorage.setItem('lastName', lastName); 
      }
}

function setCookie(cname, cvalue, exdays) {
    var expires = "";
    if (exdays !== '') {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}
$(document).ready(function() {   
	var currenturlSso = window.location.href;
    if(currenturlSso.includes("login.html")){
		deleteCookie('id.token')
    }
});
function UpdateForgotDataRequest(formData) {   

    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    if(headerLanguage.indexOf('_') > -1){
		headerLanguage = headerLanguage.split("_")[0];
    }
    
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;


    formData.headers = {
		'x-country-code': headerCountryCode,
		'x-application-id': headerApplicationId,
		'x-preferred-language': headerLanguage
	}

    return formData

}