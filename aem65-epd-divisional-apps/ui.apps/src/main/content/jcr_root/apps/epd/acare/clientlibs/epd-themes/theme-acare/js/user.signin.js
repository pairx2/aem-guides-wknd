(function (ABT) {

    // DOM related executions
    document.addEventListener('DOMContentLoaded', function() {
        // selctor for eye icon, id must be added in authoring
        const $signinForm = document.querySelector('#f-signin');
        const $password = $signinForm && $signinForm.querySelector('input[type=password]');
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
            const $form = $signinForm.querySelector('form');

            const formData = {
                loginID: $form.loginID.value,
                password: $form.password.value
            };

            localStorage.setItem('loginInfo', JSON.stringify(formData));
        }

        /**
         * @method
         * @desc initiate js and attach eventlisteners to selector 
         */
        function init() {
            
            if(!$signinForm) {
                return;
            }

            const $button = $signinForm.querySelector('button[type=submit]');

            $button && $button.addEventListener('click', saveFormData);            
            $icon && $icon.addEventListener('click', togglePasswordVisibility);
            localStorage.clear();
        }

        init();
    });

    // Form Event Handlers
    ABT.signin = (function () {

        /**
         * @function
         * @desc Ajax success handler
         * @param {*} response 
         */
        function onSuccess(response) {
            const respObj = response.response;
            const userMobile = 'XXX-XXX-XX' + (respObj.additionalProperties.phoneNumber  || '').slice(-2);
            const $signinForm = document.querySelector('#f-signin');
            const $verificationForm = document.querySelector('#f-signin-2fa');
            const $userMobile = $verificationForm.querySelector('#masked-mobile');
            // OTP required
            if(response.errorCode === 1003) {
                // Switch Form
                $signinForm && $signinForm.closest('.experiencefragment').classList.add('d-none');
                $verificationForm && $verificationForm.classList.add('d-block');

                // Show Mobile Number
                $userMobile && ($userMobile.innerText = userMobile);
            }
        }

        return {
            onSuccess: onSuccess
        }
    })();


})(window.ABT || (window.ABT = {}));