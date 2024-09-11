(function (EPD) {
    document.addEventListener('DOMContentLoaded', function () {
        var countryCode = $("input[name=x-country-code]").val();
        var applicationId =  $("input[name=x-application-id]").val();
        var preferredLang =  $("input[name=x-preferred-language]").val();
        var successMsg = $("#success-msg-hidden").val();
        var failureMsg = $("#failure-msg-hidden").val();
		var unauthMsg = $("#unauthorised-msg-hidden").val();

      function validateToken() {
         const verifyToken = window.location.href.split("?verifykey=")[1];          
         $("#resend-email").hide();
         $('.o-form-container__main-form').each(function() {
            var currentElement = $(this);
            var actionURL = currentElement.attr('action'); 
             if(actionURL.indexOf("verify-account") !== -1){
                 var verifyUrl = actionURL;
                  $.ajax({ 
                    url: verifyUrl,
                    type:"GET",
                    beforeSend: function(request) {
                       request.setRequestHeader("x-country-code", countryCode);
                       request.setRequestHeader("x-application-id", applicationId);
                       request.setRequestHeader("x-preferred-language", preferredLang);
                       request.setRequestHeader("uid", verifyToken);
                       },
                    success: function(res){                       
                       if(res.errorCode == 0 && res.response.allowUser == true){
							$('#verifying-message p').text(successMsg);
                       } else if(res.response.i18nMessageKey == 'AUTH-1012' && res.errorCode == 400 ){
                           $('#verifying-message p').text(failureMsg);
                            $("#resend-email").show();
                       } else if(res.errorCode == 0 && res.response.allowUser == false && res.response.statusReason == 'not_verified'){
                           $('#verifying-message p').text(unauthMsg);
                           $("#resend-email").show();
                       } else if(res.response.i18nMessageKey == '403005' && res.errorCode == 403 ){
                           $('#verifying-message p').text(unauthMsg);
                       } else{
							$('#verifying-message p').text(res.response.statusReason);
                       }		
                    }
               });
             }
        });
      }
      validateToken();
    });

})(window.EPD || (window.EPD = {}));


