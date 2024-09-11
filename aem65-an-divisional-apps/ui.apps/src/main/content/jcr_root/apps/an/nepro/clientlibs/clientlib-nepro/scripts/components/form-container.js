/**********************************
Form Container
**********************************/

$(function () {

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
                    } else {
                        verifyEmailHTML.parents('div[data-component="input-field"]').removeClass('validation-error');
                    }
                }
            }, 200);
        });
    }
});

$(window).on('load', function () {
    // Product details PIM integration
    //Mentioned ID should be authored on the form container ID field: form-var--products
    if (isOnPublish() && $('#form-var--products').length) {
        let productsForm = $('#form-var--products');
        productsForm.parents('.formcontainer').hide();
        // Hide placeholders
        $('#nutrition-data').hide();
        $('#ingredients-data').hide();
        $('#vitamin-data').hide();
        $('#mineral-data').hide();
        // making the API call
        productsForm.find('.o-form-container__element .o-form-container__buttons .btn[type="submit"]')[0].click();
    }
});