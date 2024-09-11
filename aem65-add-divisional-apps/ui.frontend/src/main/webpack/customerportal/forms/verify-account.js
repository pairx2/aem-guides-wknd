$(document).ready(function () {

    let verifyKey = getUrlParameter('verifyToken');

    if (verifyKey && verifyKey != '') {
     

        setTimeout(function () {
            showLoading();
          verifyKeyRecaptcha(verifyKey);
         
        }, 1000);
    } else {
        $("#loginPageForm").show();
    }  

    function verifyKeyRecaptcha(verify_Key) {
        var gSiteKey = $('[data-site-key]').attr('data-site-key');
        const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        const service = eslEndpoint + ESL_EPT?.VERIFY;
        if (typeof grecaptcha != 'undefined') {
            grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise.execute(gSiteKey, {
                    action: 'submit'
                }).then(function(captcha) {
                    verifyKeyCheck(service, verify_Key, captcha);
                }).catch(function(error) {
                    console.error(error);
                    verifyKeyCheck(service, verify_Key);
                });
            });
        } else {
            setTimeout(function () {
                verifyKeyRecaptcha(verify_Key);
            }, 1000);
        }
    }

    function verifyKeyCheck(service, _verifyKey, captcha) {
        const headers = getPageDataAttributes() ;
        headers["x-verification-token"] = _verifyKey;

        $.ajax({
            "url": service,
            "method": "POST",
            "headers": headers,
            "data": JSON.stringify({ captchaValue: captcha })
        }).then(function(response) {
            if (response.errorCode === 0) {
                if (isUserLoggedIn()) {
                    $("#verifyKeyContainer").show();
                    $("#verifyKeySuccessLoggedIn").show();
                } else {
                    $("#verifyKeyContainer").show();
                    $("#verifyKeySuccess").show();
                    $("#loginPageForm").show();
                    $("#apiError_verify").show();
                   $("#apiError_verify #success-verification").show();
                   showApiError("verify-success");
                    console.error(response.errorCode+ " testing code")
                }
            } else {
                console.error("Verify API Error: ", response?.response?.i18nMessageKey);
                console.error($("#apiError_verify #" + response?.response?.i18nMessageKey));
                $("#verifyKeyContainer").show();
                $("#apiError_verify ").show().find(".cmp-text").hide();
                $("#apiError_verify").show();
                $("#apiError_verify #VRF-ACCT-1003t").show();
                let error = $("#apiError_verify #" + response?.response?.i18nMessageKey);
                if (error.length) {
                    error.show();
                } else {
                    $("#apiError_verify #500").show();
                }
            }
            hideLoading();
        }).fail(function() {
            $("#verifyKeyContainer").show();
            $("#apiError_verify").show().find(".cmp-text").hide();
            $("#apiError_verify #500").show();
            hideLoading();
        });
    }

    $('#registration-button').click(function(){
        window.addAnalytics.fireAnalyticsEvent("create_account_start")
    })

    $('#login-button-analytics').click(function(){
        window.addAnalytics.fireAnalyticsEvent('user_login_attempt',{
            "user": {
                "userLoginStatus": "customer",
                "userLoginStatus": "unaunthenticated"
            }
        })
    })

    $('#login-sso').click(function(){
        window.addAnalytics.fireAnalyticsEvent('user_login_attempt',{
            "user": {
                "userLoginStatus": "employee",
                "userLoginStatus": "unaunthenticated"
            }
        })
    })

});
