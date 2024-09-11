$(document).ready(function () {
 
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const service = eslEndpoint + ESL_EPT?.RESEND_OTP;

    
    $("#resendOtpCode").click(function() {
        showLoading();

        const emailField = $("#otpform [name=loginID]");
        const loginID = emailField.val();
        const password = $("#otpform [name=password]").val();

        const header = getPageDataAttributes();

        header["content-type"] = "application/json"
        header["cache-control"]=  "max-age=0"
        header["content-length"] = "366"
        
        fetch(service,{
            method: 'POST',
            headers: header,
            body : JSON.stringify({
                "loginID":loginID,
                "password":password
            })
        }).then(function(response) {
            hideLoading();
            if (response.errorCode === 1003) {
                $("#successOtp").show();
            }
        })
    });  
});