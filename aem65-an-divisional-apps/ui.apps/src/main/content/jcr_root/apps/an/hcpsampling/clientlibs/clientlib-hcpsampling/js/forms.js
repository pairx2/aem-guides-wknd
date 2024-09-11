/**
 * Generic Form Modifications
 **/
$(document).ready(function() {
    // Field Length
    $('.o-form-container__main-form input[type=text]').attr('maxlength', 40);
    $('.o-form-container__main-form input[type=email]').attr('maxlength', 64);
    $('.o-form-container__main-form input[type=password]').attr('maxlength', 99);

    // Hide Form Labels, should use placeholder
    if (!$("#myAccountForm.o-form-container").length &&
        !$("#formUserDelegate.o-form-container").length) {
        $('.o-form-container__main-form .a-input-label').addClass('sr-only');
    }
});