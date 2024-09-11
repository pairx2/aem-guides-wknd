/**********************************
Form Container
**********************************/

$(function () {
    backTop();
    //Verify email based on email provided
    //Verify email ID field to have ID: verifyEmail
    //Email ID to compare with to have ID: referenceEmail
    if (isOnPublish() && $('#verifyEmail').length && $('#referenceEmail').length) {
        $('#verifyEmail, #referenceEmail').on('keyup change input', function () {
            let verifyEmailHTML = $(this).parents('.form-container').find('#verifyEmail');
            let verifyEmailVal = verifyEmailHTML.val().toLowerCase();
            let referenceEmailVal = $(this).parents('.form-container').find('#referenceEmail').val().toLowerCase();

            // Settimeout to let the platform code run first
            setTimeout(function () {
                if (verifyEmailVal && verifyEmailVal.length && referenceEmailVal && referenceEmailVal.length) {
                    if (referenceEmailVal !== verifyEmailVal) {
                        let emailField = verifyEmailHTML.parents('div[data-component="input-field"]');
                        !(emailField.hasClass('validation-require') || emailField.hasClass('validation-regex')) && verifyEmailHTML.parents('div[data-component="input-field"]').addClass('validation-error');                        
                        $(".a-form-unsubscribe .btn").attr("disabled","disabled");
                    } else {
                        verifyEmailHTML.parents('div[data-component="input-field"]').removeClass('validation-error');
                    }
                }
            }, 200);
        });
    }
     //close other dropdowns when opening other dropdown
     $(".a-dropdown__field").click(function(){
        $('.a-dropdown__field').not(this).removeClass('active');
    })
});

function backTop(){
    if ($('.back-to-top').length > 0) {
        $('.back-to-top').off().on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        });
    }
}