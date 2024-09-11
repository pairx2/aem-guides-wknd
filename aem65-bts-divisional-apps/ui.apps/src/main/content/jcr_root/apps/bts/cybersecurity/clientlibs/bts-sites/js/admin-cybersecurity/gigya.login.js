/**
 * @module
 * @desc GIGYA LOGIN EVENT  
 */

(function (ABT) {

    document.addEventListener('DOMContentLoaded', function () {

        /**
             * @method updateSession
             * @desc API Call to create session.
             * Parameter : enableValue if session cookie has to be created or removed
               *               
             */
         function updateSession(enableValue) {
            let onSuccessRedirectLink;

            if (enableValue) {
                onSuccessRedirectLink = $('.hidden input[name="loginRedirectLink"]').val();

            } else {
                onSuccessRedirectLink = $('.hidden input[name="loginLink"]').val();

            }
            ABT.Http({
                method: 'GET',
                url: ABT.Config.endpoints.CREATE_SESSION_COOKIE,
                headers: {
                    'x-id-token': sessionStorage.getItem('id.token'),
                },
                params: {
                    enable: enableValue
                }
            }).then(function (data) {
                if (data.response.status = 200) {
                    window.location.href = onSuccessRedirectLink;
                }
            }).catch(function (error) {
                console.log('ERROR in session API :' + error);
            });
        }

        // To check cyberadmin portal
        if (document.querySelector('input[value="cybersecadmin"]') != null) {
            const logoutLink = document.querySelector('.header .o-header-v2-global__section--utility-bottom .m-link-stack__list-item .a-link__text');

            if (logoutLink) {
                logoutLink.addEventListener('click', function (e) {
					e.preventDefault();
					updateSession(false);
					deleteCookie('id.token');
					sessionStorage.removeItem("id.token");
                    deleteCookie('user');
                });
            }

            // To display user name
            if (getCookie('user')) {
                const userData = JSON.parse(getCookie('user'))
                document.querySelector('.header .o-header-v2-global__section--utility-bottom .m-link-stack__link .a-link__text').childNodes[2].textContent = userData.firstName + ' ' + userData.lastName;
            }
        }

        if (document.getElementById('user-gigya-login') != null) {

            const samlLoginButton = document.getElementById('login-id');

            function generateLoginRequestHeader(userData) {
                return Object.assign(
                    {},
                    ABT.Config.getRequestHeader(),
                    {
                        'x-preferred-language': 'en-US',
                        'signaturetimestamp': userData.user.signatureTimestamp,
                        'uid': userData.user.UID,
                        'uidsignature': userData.user.UIDSignature
                    }
                )
            }

            /**
             * @method onLoginHandler
             * @desc API Call after successful login.
             */
            function onLoginHandler(eventData) {
                ABT.Http({
                    url: ABT.Config.endpoints.PROFILE_LOGIN,
                    method: 'POST',
                    headers: generateLoginRequestHeader(eventData)
                }).then(function (data) {

                    const respObj = data.response;
                    const token = respObj.jwtToken.id_token;
                    const userProfile = respObj.accountInfo.profile;
                    sessionStorage.setItem('user', JSON.stringify(userProfile));
                    sessionStorage.setItem('id.token', token);
					setCookie('user', JSON.stringify(userProfile), 1);
					setCookie('id.token', token, 1);
					updateSession(true);

                }).catch(function (e) {
                    console.log('ERROR in Login API :' + e);
                });
            }

            /* On Click -- Call to gigya login method */
            samlLoginButton.addEventListener('click', function (e) {
            e.preventDefault();
			let idpProvider = $('.hidden input[name="idpProvider"]').val();


                  const params = {
                    'provider': idpProvider,
                    'callback': onLoginHandler,
                    'sessionExpiration': 0,
                };

                gigya.socialize.login(params);
            })
        }

    });

})(window.ABT || (window.ABT = {}));
