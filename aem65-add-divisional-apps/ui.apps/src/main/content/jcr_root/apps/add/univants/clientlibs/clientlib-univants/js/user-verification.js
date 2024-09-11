var univantsheaderPreferredLanguage = document.querySelector('input[name="x-preferred-language"]').value;
var univantsheaderCountryCode = document.querySelector('input[name="x-country-code"]').value;
var univantsheaderApplicationId = document.querySelector('input[name="x-application-id"]').value;
var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;


function univantsregisterUserVerification() {
    var univantsuserVerifyKeyParam = window.location.search;
    var univantsuserVerifyKey = univantsuserVerifyKeyParam.split('verificationToken=')[1].split('==')[0];
    var univantsregisterUserVerifyServiceUrl = document.querySelector('#verify-account form').getAttribute('action');
    if (univantsuserVerifyKey) {
        $.ajax({
            url: searchUserurlOrigin + '/api/public/profile/verify-account',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            "headers": {
                "x-application-id": univantsheaderApplicationId,
                "x-country-code": univantsheaderCountryCode,
                "x-preferred-language": univantsheaderPreferredLanguage,
                "x-verification-token": univantsuserVerifyKey
            },
            success: function (responseData) {
                if (responseData.errorCode == 0) {

                    document.getElementById('success-email-container').style.display = 'block';
                }

                else if (responseData.errorCode == 400) {

                    if (responseData.response.i18nMessageKey == "AUTH-1012") {
                        document.getElementById('error-verification-expired').style.display = 'block';

                    }

                    else if (responseData.response.i18nMessageKey == "VER-1001") {
                        document.getElementById('error-reset-password').style.display = 'block';
                    }

                    else if (responseData.response.i18nMessageKey == "VRFY-ACCT-001") {
                        document.getElementById('token-validation-failed').style.display = 'block'
                    }
                    else if (responseData.response.i18nMessageKey == "UU-1001") {
                        document.getElementById('account-already-activated').style.display = 'block';
                    }
                    else if (responseData.response.i18nMessageKey == "ES-0001") {
                        document.getElementById('error-supplied-input').style.display = 'block';
                    }
                    else if (responseData.response.i18nMessageKey == "ES-0002") {
                        document.getElementById('error-received-input').style.display = 'block';
                    }
                    else if (responseData.response.i18nMessageKey == "PM-1001") {
                        document.getElementById('email-not-found').style.display = 'block';
                    }



                }



            },
            error: function (error) { }




        });
    }

}




$(document).ready(function () {
    if (document.getElementById('verify-account')) {
        univantsregisterUserVerification();
    }
    var currenturlSso = window.location.href;
    if (currenturlSso.includes("loginsso.html?code=")) {
        var adminSessionCode = currenturlSso.split('code=')[1].split('==')[0];
        var data = {}
        $.ajax({
            url: searchUserurlOrigin + '/api/public/profile/login',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            "headers": {
                "x-application-id": univantsheaderApplicationId,
                "x-country-code": univantsheaderCountryCode,
                "x-preferred-language": univantsheaderPreferredLanguage,
                "x-code-token": adminSessionCode
            },
            success: function (response) {
                var sessionApiUrl;
                let jwtToken = response.response.jwtToken.id_token;
                if (location.pathname.includes('/content/')) {
                    sessionApiUrl = $('#session-api-url').val();
                }
                else {
                    sessionApiUrl = '/api/private/profile/session';
                }
                setCookie('id.token', jwtToken, '');
                setApiHeaders();
                updateSessionCookie(sessionApiUrl, true);

            },
            error: function (error) {
                window.location.href = "/en/errors/403.html";
            }
        });
    }
});