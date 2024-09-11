// User verification function
function registerUserVerification() {
    var userVerifyKeyParam = window.location.search;
    var userVerifyKey = userVerifyKeyParam.split('verifykey=')[1];
    var registerUserVerifyServiceUrl = document.querySelector('#user-verify-hidden-form-container form').getAttribute('action');
    var userVerificationSuccessResponse = document.getElementById('register-user-verification-success-wrap');
    var headerPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
	var userVerificationLoader = document.getElementById('user-verification-loader-container').closest('.container');

    // Hide the below response by default
    userVerificationSuccessResponse.style.display = 'none';

    if(userVerifyKey) {
        var xhr = new XMLHttpRequest;

        xhr.open('POST', registerUserVerifyServiceUrl, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-country-code', headerCountryCode);
        xhr.setRequestHeader('x-application-id', headerApplicationId);
        xhr.setRequestHeader('x-preferred-language', headerPreferredLanguage);
        xhr.setRequestHeader('x-verification-token', userVerifyKey);

        xhr.send();

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if(responseData.errorCode == 0) {
					userVerificationLoader.style.display = 'none';
                    userVerificationSuccessResponse.style.display = 'block';
                }
                else {
					userVerificationLoader.style.display = 'none';
                    showApiError('#verify-registration-api-error', responseData);
                }
            }
        }
    }
}

$(document).ready(function () {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
        if(document.getElementById('register-user-verification-cont-wrap')) {
            registerUserVerification();
        }
    }
});