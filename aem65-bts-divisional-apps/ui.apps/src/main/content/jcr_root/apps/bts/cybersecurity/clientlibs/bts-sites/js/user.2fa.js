/**
 * @module
 * @desc User 2FA Authentication Module
 */

(function (ABT) {

    // DOM related executions
    document.addEventListener('DOMContentLoaded', function () {
        const $form = document.querySelector('#f-register-2fa, #f-signin-2fa');
        const $resendBtn = document.querySelector('#f-2fa-resend');
        const $successElm = $form && $form.querySelector('.o-form-container__success-msg');
        const $errorElm = $form && $form.querySelector('.o-form-container__error-msg');
        const $verificationField = $form && $form.querySelector('.form-control.a-input-control');

        /**
         * @function
         * @desc handles Resend Call response
         * @param {Object} respObj 
         */
        function handleResend(respObj) {

            if (respObj.errorCode === 0) {
                $successElm.innerText = 'Verification code has been resent!';
            } else {
                $errorElm.innerText = 'Could not resend Verification code!';
            }
        }

        /**
         * @function
         * @desc resends OTP to user's mobile
         */
        function resendOTP(event) {

            event.preventDefault();

            // disable resend button for 30seconds
            $resendBtn.classList.add('disabled', 'has-loader');
            let interval = setInterval(function () {
                $resendBtn.classList.remove('disabled', 'has-loader');
                clearInterval(interval);
            }, 30000);

            // Reset the Error Messages
            $successElm.innerText = '';
            $errorElm.innerText = '';

            // Make the HTTP call
            ABT.Http({
                url: ABT.Config.endpoints.RESEND_OTP,
                method: 'GET',
                params: {
                    email: ABT.Utils.tempData.get('email')
                }
            }).then(handleResend);
        }

        /**
         * @method
         * @desc convert input value to upper case 
         */
        function convertToUpperCase(event) {
            const $input = event.target;
            $input.value = $input.value.toUpperCase();
        }

        /**
         * @method
         * @desc initiate js and attach eventlisteners to selector 
         */
        function init() {
            // if form and button ID's not found or configured properly,
            // do nothing to avoid JS errors on other page
            if (!$resendBtn) {
                return;
            }

            $resendBtn.addEventListener('click', resendOTP);
            $verificationField.addEventListener('keyup', convertToUpperCase);
        }

        init();
    });

    // Ajax Request Callbacks
    ABT.verifyOTP = (function () {

        /**
         * @function
         * @desc adding token to request header
         */
        function updateRequest() {
            const $verificationForm = document.querySelector('#f-register-2fa, #f-signin-2fa');
            const isRegisterFlow = $verificationForm && $verificationForm.getAttribute('id').includes('register');

            // Register Flow
            if (isRegisterFlow) {
                return {
                    body: {
                        'registrationType': 'verify-lite-user-otp',
                        'userInfo': {
                            email: ABT.Utils.tempData.get('email'),
                            confirmationCode: ABT.Utils.tempData.get('accessCode')
                        }
                    }
                }
            }

            // Sign in flow
            return {
                body: {
                    loginID: ABT.Utils.tempData.get('email'),
                    password: ABT.Utils.tempData.get('password')
                }
            }
        }

        /**
         * @function
         * @desc Ajax call success handler
         * @param {Objct} response response object
         */
        function onSuccess(response) {
            const respObj = response.response;
            const $verificationForm = document.querySelector('#f-register-2fa, #f-signin-2fa');
            const isRegisterFlow = $verificationForm && $verificationForm.getAttribute('id').includes('register');

            // Dome prevention for other pages
            if (!$verificationForm) {
                return;
            }

            // redirect the success flow
            if (!isRegisterFlow) {
                //onRegisterVerification(respObj, $verificationForm);
                //} else {
                onSigninVerification(respObj, $verificationForm);
            }
        }

        /**
         * @function
         * @desc handles registration flow OTP verification
         * @param {Object} respObj 
         * @param {HTML_ELEMENT} $verificationForm 
         */

        /**
         * @function
         * @desc handles login flow OTP verification
         * @param {Object} respObj 
         */
        function onSigninVerification(respObj, $verificationForm) {
            const token = respObj.jwtToken.id_token;
            const isVerified = respObj.accountInfo.isVerified;
            const profile = respObj.accountInfo.profile;
            const user = {
                name: profile.firstName + " " + profile.lastName,
                email: profile.email,
                products: respObj.accountInfo.data.securityGroups
            };
            const favorites = respObj.accountInfo.data.favorites;
            const preference = {
                preference: respObj.accountInfo.data ?.preferences ?.preference || 'grid'
            };
            const $otp = $verificationForm.querySelector('.a-input-control');
            const lastLoginDate = respObj.accountInfo.data.audit?.application?.lastLoginDate;
            const emailSubscribed = respObj.accountInfo.data?.emailSubscribed;

            // Handle Error
            if (!isVerified) {
                // Error code will be displayed by AEM
                return;
            }


            // Sign-in Process
            localStorage.setItem('id.token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('preferences', JSON.stringify(preference));
            localStorage.setItem('lastLogin', lastLoginDate == undefined ? "" : lastLoginDate);
            sessionStorage.setItem('isEmailSubscribed', emailSubscribed == undefined ? "" : JSON.stringify(emailSubscribed));
            ABT.favorites.set(favorites);

            // remove success message in verification form as session-creation is still in progress
            $verificationForm.querySelector('.o-form-container__success-msg').innerText = '';

            // disable the verification code field before making session API call
            $otp.disabled = true;

            // Create session Cookie
            createSessionCookie()
                .then(handleSessionApi)
                .catch(function (error) {
                    throw new Error('ERROR: Could not create session.' + error);
                });
        }

        /**
         * @function 
         * @desc sets session timer post login. 
         *  Time value is taken from token - time taken to recieve response from Session API
         */
        function setSessionTimer() {
            const token = ABT.Utils.getUser('token');
            const parsedToken = ABT.Utils.parseJwt(token);
            const now = Date.now();

            // token TTL = now + token expiry in miliseconds
            const tokenExpiry = new Date(now + Math.abs(parsedToken.exp - parsedToken.iat) * 1000);

            // set token TTL to be used to watch when is token expiring
            localStorage.setItem('token.ttl', tokenExpiry.getTime());

            // set last cookie fetched time
            localStorage.setItem('cookie.created_on', Date.now());
        }

        /**
         * @function
         * @desc handles session API response
         * @param {Object} resp 
         */
        function handleSessionApi(resp) {
            const $signinForm = document.querySelector('#f-signin');
            const $verificationForm = document.querySelector('#f-signin-2fa');
            if (resp.errorCode === 0) {
                setSessionTimer();
                const docReferrer = document.referrer;

                //if user is coming from secure page
                if (location.pathname.toLowerCase().includes('/secure/')) {
                    location.reload();
                } else if (docReferrer !== '' && (docReferrer)?.indexOf('/secure/') > -1 && (docReferrer)?.indexOf(window.location.origin) > -1) {
                    location.assign(docReferrer);
                } else {
                    // Redirect to Logged-in UserLanding page
                    location.assign(ABT.Config.aemConfig.HOME_PAGE_URL);
                }

            } else {
                // clear saved user info after 2FA authentication
                localStorage.clear();

                // switch form to sign in
                $verificationForm.closest('.experiencefragment').classList.add('d-none');
                $signinForm.closest('.experiencefragment').classList.remove('d-none');

                // Show error message on UI
                $signinForm.querySelector('.o-form-container__error-msg').innerText = resp.response.statusReason;
                $signinForm.querySelector('.o-form-container__success-msg').innerText = '';
            }
        }

        /**
         * @function
         * @desc create session cookie
         * @return {Promise} Fetch Promise
         */
        function createSessionCookie() {
            return ABT.Http({
                method: 'GET',
                url: ABT.Config.endpoints.CREATE_SESSION_COOKIE,
                params: {
                    enable: true
                }
            });
        }

        // exposed values
        return {
            updateRequest: updateRequest,
            onSuccess: onSuccess
        }
    })();


})(window.ABT || (window.ABT = {}));
