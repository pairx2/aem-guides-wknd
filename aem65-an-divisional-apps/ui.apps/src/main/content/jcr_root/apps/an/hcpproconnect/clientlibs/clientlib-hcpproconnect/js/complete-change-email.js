const updateEmail = $("#activationURL").attr("value") ? $("#activationURL").attr("value").trim() : "api/public/registration/register-user";
$(document).ready(function() {
    $("#complete-email-change").hide();
    let isChangeEmailPage = window.location.pathname.includes("complete-change-email.html");
    if(isCountryCodeUK() && isChangeEmailPage && hasUrlParameter("cogId")) {
        let sfdcId = getUrlParameter("cogId");
        setTimeout(function(){
            let headers = new Headers();
            headers.append("x-application-id", $("input[name=x-application-id]").val());
            headers.append("x-country-code", $("input[name=x-country-code]").val());
            headers.append("x-preferred-language", $("input[name=x-preferred-language]").val());
            headers.append("Content-Type", 'application/json');
            headers.append("x-secret-header", $("#secretHeader").val());
            let recaptcha = localStorage.getItem("captchaValue") ? localStorage.getItem("captchaValue") : "";
            let verifyEmailPayload = JSON.stringify({
                "captchaValue": recaptcha,
                "action": "verifyEmail",
                "sfdcId" : sfdcId
            });
             apiPOSTCall(headers,updateEmail,verifyEmailPayload)
            .then(response => response.text())
            .then(function (result) {
               let data = JSON.parse(result);
               if(data.errorCode == 0) {
                   $("#completeEmailChangeMessage h2").text("Successfully Changed Email.");
               } else {
                   $("#completeEmailChangeMessage h2").text("Failed to Changed Email.");
               }
            });
        }, 1000);
    }
});
