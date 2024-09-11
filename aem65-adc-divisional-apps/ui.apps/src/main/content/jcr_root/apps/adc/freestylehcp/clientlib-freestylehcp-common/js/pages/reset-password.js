/**
 * Reset Password Page
 **/
 $(document).ready(function() {
    //Reset Password page
    /** check resetToken **/
    let resetToken = getUrlParameter('resetToken');
    if (resetToken && resetToken !== "") {
        setCookie('resetToken', resetToken, '');
    }
 });