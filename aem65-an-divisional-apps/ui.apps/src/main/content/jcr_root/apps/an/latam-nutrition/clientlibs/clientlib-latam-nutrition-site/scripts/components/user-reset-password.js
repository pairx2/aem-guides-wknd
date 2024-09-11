$(document).ready(function () {
    let resetToken = getUrlParameter('token');
    if (resetToken && resetToken != '') {
        $("#resetToken").val(resetToken);
    }
});