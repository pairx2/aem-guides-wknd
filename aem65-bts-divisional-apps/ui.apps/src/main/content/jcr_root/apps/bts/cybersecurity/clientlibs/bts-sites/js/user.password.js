/**
 * @module
 * @desc User Password (creation, reset, forgot) Module
 */

(function (ABT) {

    document.addEventListener('DOMContentLoaded', function () {

        const $formContainer = document.querySelector('.o-form-container[id*=password]');
        const $form = $formContainer && $formContainer.querySelector('form');
        const formId = $formContainer && $formContainer.getAttribute('id');
        const passwordFields = $form && $form.querySelectorAll('input[type=password]');
        const $password1 = passwordFields && passwordFields[0];
        const $password2 = passwordFields && passwordFields[1];
        const password2Container = $password2 && $password2.closest('.form-group');
        const $password2Error = password2Container && password2Container.querySelector('.a-input-field--text-error');
        const $saveButton = $formContainer && $formContainer.querySelector('[type=submit]');
        const errorMessage = 'Passwords do not match!';
        const isResetForm = formId && formId.toLowerCase().includes('reset');

        /**
         * @function
         * @desc checks if both passwords match
         */
        function checkPasswordMatch(evt) {
            const password = $password1.value;
            const confirmPassword = $password2.value;

            evt.target.setAttribute('data-is-dirty', 'true');

            // dont validate if both fields does not have dirty state
            if(!$password1.dataset.isDirty || !$password2.dataset.isDirty) {
                return;
            }
        
            // Show Error
            if (password != confirmPassword) {
                password2Container.classList.add('password-match-error');
                $password2Error.innerText = errorMessage;
                $saveButton.disabled = true;
            } else {
                password2Container.classList.remove('password-match-error');
                $password2Error.innerText = '';
                $saveButton.disabled = false;
            }
        } 

         /**
         * @function
         * @desc first of all this function will load and will attach events to the listeners
         */
        function init() {
            if(!$form || !$password1 || !$password2) { 
                return;
            }

            if(isResetForm) {
                ABT.gtm('password.reset');
            }

            $password1.addEventListener('blur', checkPasswordMatch);
            $password2.addEventListener('blur', checkPasswordMatch);
        }

        init();
    });

    // Ajax Request Callbacks
    ABT.password = (function () {

        function updateOnCreateRequest() {
            return {
                body: {
                    'registrationType': 'liteUserMigration',
                    'userInfo': {
                        'email':  ABT.Utils.tempData.get('email')
                    }
                },
                headers: {
                    'x-id-token': sessionStorage.getItem('id.token') || localStorage.getItem('id.token')
                }
            }
        }

        /**
         * @function
         * @desc Ajax call success handler for create password
         * @param {Object} response response object
         */
        function onCreate(response) {
            // const respObj = response.response;
            // remove token from session
            localStorage.clear();
            sessionStorage.clear();

            // redirect user to sign in page
            location.assign(ABT.Config.aemConfig.SIGNIN_PAGE_URL);
        }

        /**
         * @function
         * @desc adds token to reset-password request
         * @return {Object} request Object
         */
        function updateOnResetRequest() {
            // token value from URL
            const tokenValue = ABT.Utils.getQueryParam('token');

            return {
                body: {
                    'resetToken': tokenValue
                }
            };
        }

        /**
         * @function
         * @desc disabled input field on success of forgot password
         */
        function onForgotPassword() {
            const $passwordField = document.querySelector('.form-control.a-input-control');
            $passwordField.disabled = true; 
        }

        // exposed values
        return {
            create: {
                updateRequest: updateOnCreateRequest,
                onSuccess: onCreate
            },
            reset: {
                updateRequest: updateOnResetRequest
            },
            forgot: {
                onSuccess: onForgotPassword
            }
        }
    })();


})(window.ABT || (window.ABT = {}));