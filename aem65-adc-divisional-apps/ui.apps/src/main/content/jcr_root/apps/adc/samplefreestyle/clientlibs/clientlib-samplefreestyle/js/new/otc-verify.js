//sample freestyle OTC flow
$(document).ready(function () {
    $("#OTC-send-show").click(function (e) {
        e.preventDefault();
        $("#sample-OTC-request-form").show();
        $("#sample-OTC-verify-form").hide();
        $("#OTC-code").attr("disabled", false);
        $('#OTC-attempt-alert-message').hide();
        $('#OTC-inccorrect-msg').hide();
    });

    if(isOnPublish()){
        $('#OTC-attempt-alert-message').hide();
        $('#OTC-inccorrect-msg').hide();
    }
});
