/**
 * Reset Password Class
 */

(function (EPD) {

    document.addEventListener('DOMContentLoaded', function () {

        const $formContainer = document.querySelector('.o-form-container[id*=password]');
        const $form = $formContainer && $formContainer.querySelector('form');
        const passwordFields = $form && $form.querySelectorAll('input[type=password]');
        const $password1 = passwordFields && passwordFields[0];
        const $password2 = passwordFields && passwordFields[1];
        const password2Container = $password2 && $password2.closest('.form-group');
        const password1Container = $password1 && $password1.closest('.form-group');
        const $password2Error = password2Container && password2Container.querySelector('.a-input-field--text-error');
        const $password1Error = password1Container && password1Container.querySelector('.a-input-field--text-error');
        const $saveButton = $formContainer && $formContainer.querySelector('[type=submit]');
        const errorMessage1 = $("#password-strength-txt").val();
        const errorMessage2 = $("#password-mismatch-txt").val();

        /**
         * @function
         * @desc checks if both passwords match
         */

         $("#password").blur(function(event){
			 var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
			 if($password1.value && !passwordRegex.test($password1.value)){
                 $("#passwordElement0").addClass('validation-error');
				 event.stopImmediatePropagation();
                 $password1Error.innerText = errorMessage1;
                 $saveButton.disabled = true;
            }
          });

        $("#confirmPassword").blur(function(event){
            const password = $password1.value;
            const confirmPassword = $password2.value;
            var confirmPwdElement = document.querySelector("#passwordElement1");
            if (confirmPassword && password != confirmPassword) {
                confirmPwdElement.classList.add('validation-error');
                event.stopImmediatePropagation();
                $password2Error.innerText = errorMessage2;
                $saveButton.disabled = true;
            } else{
				 confirmPwdElement.classList.remove('validation-error');
                $password2Error.innerText = '';
                $saveButton.disabled = false;
            }
        });

       $("body").on('click', '#show-pwd-0', function() {
           showPassword("password");
        });

        $("body").on('click', '#show-pwd-1', function() {
           showPassword("confirmPassword");
        });

        $("#f-reset").click(function(){
			$("#password").val('');
            $("#confirmPassword").val('');
        });

        function showPassword(id){
			var input = $("#"+id);
              if (input.attr("type") === "password") {
                input.attr("type", "text");
              } else {
                input.attr("type", "password");
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

            $('.form-group').attr("id", function(i){
  				return 'passwordElement' + i;
			});

             $('.input-group .icon').attr("id", function(i){
  				return 'show-pwd-' + i;
			});
        }

        init();
    });



    // Ajax Request Callbacks
    EPD.password = (function () {

        /**
         * @function
         * @desc adds token to reset-password request
         * @return {Object} request Object
         */
        function updateOnResetRequest() {
            // token value from URL
            const tokenValue = EPD.Utils.getQueryParam('token');            
            return {
                body: {
                    'resetToken': tokenValue
                }
            };
        }

        // exposed values
        return {
            reset: {
                updateRequest: updateOnResetRequest
            }
        }
    })();


})(window.EPD || (window.EPD = {}));