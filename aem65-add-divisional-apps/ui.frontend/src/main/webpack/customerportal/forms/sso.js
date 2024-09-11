$(document).ready(function () {

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const service = eslEndpoint + ESL_EPT?.LOGIN;

    function generateLoginRequestHeader(userData) {
        const header = getPageDataAttributes();
        header['signaturetimestamp'] = userData.user.signatureTimestamp;
        header['uid'] = userData.user.UID;
        header['uidsignature'] = userData.user.UIDSignature;
        return header;
    }

    function loginRequest(eventData, captcha) {
        var headers = generateLoginRequestHeader(eventData);

        var body = {};

        if (captcha) {
            body['g-recaptcha-response'] = captcha;
            body['captchaAction'] = 'Submit';
            body['captchaType'] = 'ent';
        }

        showLoading();
        $.ajax({
            url: service,
            type: 'POST',
            dataType: 'json',
            headers: headers,
            contentType: 'application/json',
            data: JSON.stringify(body),
            success: function (result) {
                var jwtToken = result.response.jwtToken.id_token;

                setCookie('jwtToken', jwtToken, '');

                var authInfo = {
                    "accountInfo": {
                        "userInfo": {
                            "additionalProperties": {
                                "ecommToken": jwtToken,
                                "extToken": "extToken"
                            }
                        }
                    },
                    "jwtToken": {
                        "id_token": jwtToken,
                        "refresh_token": "refresh_token"
                    }
                };

                const authInfoKey = getLocalAuthContextName();

                removeLocalStorage("session-expired-modal");

                setLocalStorage(authInfoKey, authInfo);

                var parsedToken = parseJwt(jwtToken);
                localStorage.setItem('jwtExp', parsedToken.exp);

                var profile = result.response.accountInfo.profile;
                setLocalStorage('profile', profile);
				
				var isDistAdmin =  result.response.accountInfo.profile.samlData.securityGroups;
				if (isDistAdmin != null){
					if (isDistAdmin.includes('APP-LabCentral-NonProd-DistAdmins') || isDistAdmin.includes('APP-LabCentral-Prod-DistAdmins')){
						localStorage.setItem('isDistAdmin', 'true');
					}
				}

                localStorage.setItem('role', 'employee');
                localStorage.setItem('labProfiles', '{}');
    
                triggerLoginEvent(profile);

                enableSession();
              
               //fire analytics
                window.addAnalytics.fireAnalyticsEvent("user_login", {
                    "lab": {
                        "labType": (window.getLocalStorage('custportalSelectedLabProfile')?.primary) ? "primary" : "not_primary",
                        "labId": window.getLocalStorage('custportalSelectedLabProfile')?.labProfileId,
                    },
                    "user": {
                        "userLoginStatus": "authenticated",
                        "userType": "employee"
                    }
                });

                window.location.href = "secure/technical-library.html";

                hideLoading();
            },
            error: function (error) {
                hideLoading();
                console.error(error);
                alert("An error occurred logging in through SSO");
            }
        });
    }

    function onLoginHandler(eventData) {
        const recaptchaSiteKey = document.querySelector('[data-site-key]').getAttribute('data-site-key');
        grecaptcha.enterprise.ready(() => {
            grecaptcha.enterprise.execute(recaptchaSiteKey, {
                action: 'submit'
            }).then(token => {
                loginRequest(eventData, token);
            });
        });
    }

    // gigya.socialize.showLoginUI(params);
    const samlLoginButton = document.getElementById('login-sso');

    if (samlLoginButton) {
        samlLoginButton.addEventListener('click', function (e) {
            e.preventDefault();

            const params = {
                'provider': 'saml-AbbottAD',
                'callback': onLoginHandler,
                'sessionExpiration': 0
            };

            gigya.socialize.login(params);
        });
    }
});