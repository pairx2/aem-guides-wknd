$(document).ready(function () {

    // check to see if user is logged in, if so pre-fill My Account form fields
    let verifyKey = getUrlParameter('verifykey');
    const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
    const captchaAction ="submit";
    const isEnt = "ENT";
    const isNonEnt = "NON_ENT";

    if (verifyKey && verifyKey != '') {
        showLoading();
        setTimeout(function () {
            verifyKeyRecaptcha(verifyKey,isEnterpriseRecaptchaEnabled,captchaAction,isEnt,isNonEnt);
        }, 1000);
    } else {
        $("#loginPageForm").show();
    }
    
});
function verifyKeyRecaptcha(verKey,isEnterpriseRecaptchaEnabled,captchaAction,isEnt,isNonEnt) {
    const verifyKeyForm = $("#verifyKeyForm form");
    const action = verifyKeyForm.attr("action");
    let gSiteKey = $('[data-site-key]').attr('data-site-key');
    if (typeof grecaptcha != 'undefined') {
        if(isEnterpriseRecaptchaEnabled) {                
            grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise.execute(gSiteKey, {
                    action: 'submit'
                }).then(function(captcha) {
                    verifyKeyCheck(action, verKey, captcha,captchaAction,isEnt);
                }).catch(function(error) {
                    verifyKeyCheck(action, verKey);
                });
            });
        }else{                
            grecaptcha.ready(function () {
                grecaptcha.execute(gSiteKey, {
                    action: 'submit'
                }).then(function(captcha) {
                    verifyKeyCheck(action, verKey, captcha,captchaAction,isNonEnt);
                }).catch(function(error) {
                    verifyKeyCheck(action, verKey);
                });
            });
            
        }
    } else {
        setTimeout(function () {
            verifyKeyRecaptcha(verKey);
        }, 1000);
    }
}

function verifyKeyCheck(service, key, captcha,captchaActionVal,captchaType) {
    let headers = {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-verification-token": key
    };
    let data = {
        "captchaValue" : captcha,        
        "captchaType": captchaType,
        "captchaAction": captchaActionVal
    };

    $.ajax({
        "url": service,
        "method": "POST",
        "headers": headers,
        "data": JSON.stringify(data)
    }).then(function(response) {
        if (response.errorCode === 0) {
            if (isUserLoggedIn()) {
                $("#verifyKeyContainer").show();
                $("#verifyKeySuccessLoggedIn").show();
            } else {
                $("#verifyKeyContainer").show();
                $("#verifyKeySuccess").show();
                $("#loginPageForm").show();
            }
        } else {
            $("#verifyKeyContainer").show();
            $("#apiError_verify").show().find(".cmp-text").hide();
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