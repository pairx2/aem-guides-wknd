$(document).ready(function () {
    let errorFound = true;
    let disableButton = true;

    $('.a-container--base.a-container--forgot-pass .a-input-control').on('keyup', function () {
        setTimeout(() => {
            let value = this.value;
            errorFound = $(".a-container--base.a-container--forgot-pass").find(".form-group").hasClass("validation-error");
            if (((value) && (value.trim() != '')) && (!errorFound)) {
                disableButton = false;
            } else {
                disableButton = true;
            }

            if (disableButton) {
                $('.a-container--forgot-pass .button').addClass('a-button--contact-us-hide');
                $('.a-container--forgot-pass .button a').click(false);
            } else {
                $('.a-container--forgot-pass .button').removeClass('a-button--contact-us-hide');
                $('.a-container--forgot-pass .button a').click(true);
            }
        }, 0)

    });
});