/**
 * @module
 * @desc User Registration Module
 */

(function (ABT) {

    // DOM related executions
    document.addEventListener('DOMContentLoaded', function () {
        // selctor for eye icon, id must be added in authoring
        const $registerForm = document.querySelector('#f-register');
        const $password = $registerForm && $registerForm.querySelector('input[type=password]');
        const $icon = $password ? $password.previousElementSibling : '';

        /**
         * @method
         * @desc toggle between password and text field 
         */
        function togglePasswordVisibility() {
            const fieldType = $password.getAttribute('type');
            const newType = fieldType === 'password' ? 'text' : 'password';
            $password.setAttribute('type', newType);
        }

        /**
         * @function
         * @desc persists form data for next step
         */
        function saveFormData() {
            const $form = $registerForm.querySelector('form');

            // save
            ABT.Utils.tempData.set({
                email: $form['userInfo.email'].value,
                accessCode: $form['userInfo.confirmationCode'].value
            });
        }

        /**
         * @method
         * @desc initiate js and attach eventlisteners to selector 
         */
        function init() {
            if (!$registerForm) {
                return;
            }

            const $button = $registerForm.querySelector('button[type=submit]');

            $icon && $icon.addEventListener('click', togglePasswordVisibility);
            $button && $button.addEventListener('click', saveFormData);
        }

        init();
    });

    // Form Event Handlers
    ABT.register = (function () {

        function updateRequest() {
            return {
                body: {
                    'registrationType': 'verify-lite-user'
                }
            }
        }

        /**
         * @function
         * @desc Ajax success handler
         * @param {*} response 
         */
        function onSuccess(response) {
            const respObj = response.response;
            const $registerForm = document.querySelector('#f-register');
            const $createPasswordForm = document.querySelector('#f-create-password');
            const token = respObj.response.id_token;


            // OTP required
            if (response.errorCode === 0) {
                // Switch Form
                $registerForm && $registerForm.closest('.experiencefragment').classList.add('d-none');
                // set token for create-password
                localStorage.setItem('id.token', token);
                //create pass div show
                $createPasswordForm && $createPasswordForm.classList.add('d-block');
            }
        }

        //Display error message for registration using same access code
        function onError(error) {
            const errorMsg = document.querySelector(".o-form-container__error-msg");
            if (errorMsg && error.response.i18nMessageKey === 'GIGYA006' && error.errorCode === 400) {
                errorMsg.innerHTML = "A Cybersecurity Portal account with this email already exists. Please login with your password at " +"<a href='https://www.cybersecurity.abbott/sign-in.html'>SIGN IN</a>." + " If you have forgotten your password, please select “Forgot Password” on the login page." ;
            }
        }

        return {
            updateRequest: updateRequest,
            onSuccess: onSuccess, onError: onError
        }
    })();


})(window.ABT || (window.ABT = {}));