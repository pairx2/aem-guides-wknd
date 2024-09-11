/**
 * Reset Password Page
 **/
 $(document).ready(function() {
    //Reset Password page
    /** check resetToken **/
    const resetToken = getUrlParameter('resetToken');
    if (resetToken && resetToken !== "") {
        setCookie('resetToken', resetToken, '');
    }
 });