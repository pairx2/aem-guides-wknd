/**
 * User Login and Verify Page
 **/
 $(document).ready(function () {
    /** check activationKey **/
    const activationKey = getUrlParameter('activationKey');
    if (activationKey && activationKey !== "") {
        setCookie('activationKey', activationKey, '');
    }

    /** My Freestyle User Login Varify **/
    const myFreestyleLoginVerify = $('#myfreestyle-login-verify') //check if page has id element

    if (myFreestyleLoginVerify.length > 0 && activationKey !== '' && isOnPublish()) {
        $('#page-spinner').css('display', 'block');
        setTimeout(function () {
            $('#myfreestyle-login-verify').find('button.btn[type="submit"]').trigger('click');
        }, 500);
    } else if (activationKey == '' && isOnPublish()) {
        $('#login_verify_success').remove();
        $('#login_verify_error').remove();
    }
});