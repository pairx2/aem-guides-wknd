const activationUrl = $("#activationURL").attr("value") ? $("#activationURL").attr("value").trim() : "api/public/registration/register-user";
const apiLookUserURL = "api/public/lookup/user";
let profileResponse;
function responseFlag(response){
    let dataResponse = JSON.parse(response);
    if(dataResponse.errorCode == 0) {
        loginSuccessErrorMessage(true, $('#activationSuccessMsg').val());
    } else {
        window.location="/content/an/hcpproconnect/uk/en/login/account-activation-fail.html";
    }
}
$(document).ready(function() {
    //load only in login page
    let isLoginPage = window.location.pathname.includes("login.html");
    if (isLoginPage && hasUrlParameter("isActivated")) {
        showLoading();
        let urlParam = getUrlParameter("isActivated");
        if(urlParam == 'true' && hasUrlParameter("cogId")) {
            let timer = $("#activationTiming").attr("value") ? $("#activationTiming").attr("value") : "3000";
            setTimeout(function(){
                let sfdcId = getUrlParameter("cogId");
 
                let headers = new Headers();
                headers.append("x-application-id", $("input[name=x-application-id]").val());
                headers.append("x-country-code", $("input[name=x-country-code]").val());
                headers.append("x-preferred-language", $("input[name=x-preferred-language]").val());
                headers.append("Content-Type", 'application/json');
                headers.append("x-secret-header", $("#secretHeader").val());
                let lookUserPayload = JSON.stringify({
                    "captchaValue": localStorage.getItem("captchaValue"),
                    "userInfo": {
                        "sfdcId": sfdcId
                    }
                });
                //call look user api to get profile details
                apiPOSTCall(headers,apiLookUserURL,lookUserPayload)
                .then(response => response.text())
                .then(function (result) {
                    let data = JSON.parse(result);
                    if(data.errorCode == 0) {
                        let registerUserPayload = createConsentPayload(data.response.userInfo, sfdcId);
 
                       //call register api
                       apiPOSTCall(headers,activationUrl,registerUserPayload)
                       .then(response => response.text())
                       .then(function (response) {
                         
                          responseFlag(response);
                       });
                    } else {
                        window.location="/content/an/hcpproconnect/uk/en/login/account-activation-fail.html";
                    }
                });
            },timer);
 
        } else {
            window.location="/content/an/hcpproconnect/uk/en/login/activation-link-expired-message.html";
        }
    }
});
 
/** User Login -- starts**/
function updateRequestUserLogin(data) {
 
    delete data.body['requestType'];
    delete data.body['node'];
    data.body['captchaValue'] = data.body['g-recaptcha-response'];
    delete data.body['g-recaptcha-response'];
 
    console.log(data);
 
    return data;
}
 
function onBeforeUserLogin() {
    showLoading();
}
 
function onSuccessUserLogin(data) {
 
    if(data.errorCode == 0) {
        let siteUrl = window.location.host;
        let jwtToken = data.response.jwtToken.id_token;
        setCookie('jwtToken', jwtToken, '');
 
        sessionStorage.removeItem('lite-user');
        removeLocalStorage("addedToCart");
 
        let parsedToken = parseJwt(jwtToken);
        setLocalStorage('jwtExp',parsedToken.exp);
 
        let userInfo = data.response.accountInfo.userInfo;
        setLocalStorage('userInfo',userInfo);
        triggerLoginEvent();
        enableSession();
        hideLoading();
 
        if(sessionStorage.getItem("documentReferrer") != null) {
         let redirectUrl = sessionStorage.getItem("documentReferrer");
         sessionStorage.removeItem("documentReferrer");
         window.location.href = redirectUrl;
      }
      else {
            if(document.referrer)
                if(document.referrer.includes(siteUrl))
                    history.go(-1);
                else
                    redirectHome();
            else
                redirectHome();
      }
 
        sessionStorage.removeItem('lite-user');
    } else {
        onErrorUserLogin(data);
    }
}
 
function onErrorUserLogin(error) {
    deleteCookie('jwtToken');
    removeLocalStorage('jwtExp');
    removeLocalStorage('userInfo');
 
    showLoginApiError(error?.response);
    $('#forgotlink .link .m-popup .a-link .a-link__text .a-link__inner-text').css("top","-212px");
 
    hideLoading();
}
 
function showLoginApiError(errorResponse) {
    let id = errorResponse?.i18nMessageKey;
    if (typeof id == "undefined" || id == "") {
        id = "500";
    }
    let error = $("#" + id);
    if (error.length) {
        $("[id^=apiError] .cmp-text").hide();
        $(".o-form-container__error-msg").hide();
        error.show();
        $("[id^=apiError]").show()
    } else {
        loginSuccessErrorMessage(false, $('#loginForm input[name=failureMessage]').val());
    }
}
/**
** Success and Error Message
** isSuccess - true if success
** message - message to be displayed
*/
function loginSuccessErrorMessage(isSuccess, message) {
    let cssColor;
    if(isSuccess) {
        cssColor = "#00B140";
    } else {
        cssColor = "#E40046";
        /* show custom error msg on right */
        $("#loginCustomErrMsg").closest(".columncontrol__column").show();
    }
    $("#loginsuccessErrorMessage").css("background",cssColor).addClass("abt-icon abt-icon-cancel");
    $("#loginsuccessErrorMessage p").html(message);
    $(".o-form-container__error-msg").css("display","none");
 
    $(".abt-icon-cancel").on("click", function(){
        $('#loginsuccessErrorMessage').hide();
        /* hide custom error msg on right */
        $("#loginCustomErrMsg").closest(".columncontrol__column").hide();
    });
    $("#loginsuccessErrorMessage").show();
    hideLoading();
 
}
 
/** User Login -- end**/

function consentReduce(userInfo){
    let addtlProp = userInfo.additionalProperties;
    let availableConsents = {};
 
    let generalConsentId = "";
    let marketingConsent = "";
    let medicalConsent = "";
    let consentTopics = "";
    if(addtlProp.consentTopic!=null){
        consentTopics = addtlProp.consentTopic;
        $.each(consentTopics, function(key,value) {
            let isTopicConsent = false;
            let isConsentTopic = true;
            if(consentTopics[key].marketingConsent == isTopicConsent && consentTopics[key].medicalConsent == isConsentTopic) {
                medicalConsent = consentTopics[key].id;
            } else if(consentTopics[key].marketingConsent == isConsentTopic && consentTopics[key].medicalConsent == isTopicConsent) {
                marketingConsent = consentTopics[key].id;
            } else {
                generalConsentId = consentTopics[key].id;
            }
        });
 
        availableConsents["primaryMedicalConsentReference"] = medicalConsent;
        availableConsents["primaryConsentReference"] = generalConsentId ;
        availableConsents["primaryMarketingConsentReference"] =marketingConsent;
 
    } else {
        availableConsents["primaryMedicalConsentReference"] = addtlProp.primaryMedicalConsentReference;
        availableConsents["primaryConsentReference"] = addtlProp.primaryConsentReference ;
        availableConsents["primaryMarketingConsentReference"] = addtlProp.primaryMarketingConsentReference;
    }
    return availableConsents;
}
function consentData_flag(recordsUK,availableConsents,alreadyPresentConsents,sfdcId){
    for (let i in availableConsents) {
        if(alreadyPresentConsents[i]!=null){
             recordsUK[i] = {
                "emailOptIn": true,
                "phoneOptIn": true,
                "consentSigned": date.toISOString(),
                "consentStatus": "Completed",
                "id": alreadyPresentConsents[i]
            }
        } 
        else {
            recordsUK[i] = {
                "emailOptIn": true,
                "phoneOptIn": true,
                "consentSigned": date.toISOString(),
                "consentStatus": "Completed",
               "contactId": sfdcId,
                "consentTopicId": availableConsents[i]
            }
 
        }
        if(i=="primaryConsentReference") {
            recordsUK[i]["webinarsOptIn"]= true;
            recordsUK[i]["messagingOptIn"]= true;
            recordsUK[i]["SMSOptIn"]= true;
            recordsUK[i]["remoteOptIn"]= true;
            recordsUK[i]["F2FOptIn"]= true;
            recordsUK[i]["preferredTime"]="8:00-10:00;10:00-12:00;12:00-14:00;14:00-16:00;16:00-18:00";
            recordsUK[i]["preferredDay"]="Monday;Tuesday;Wednesday;Thursday;Friday";
        }
 
    }
    return recordsUK;
}
function createConsentPayload(userInfo,sfdcId) {
    let addtlProp = userInfo.additionalProperties;
   
    let alreadyPresentConsents={};
    let recordsUK = [];
    let userRegDetails;
 
 
    if(isCountryCodeUK()) {
        let activationDateTime = new Date();
        alreadyPresentConsents["primaryConsentReference"] = addtlProp.primaryConsentReference ;
        alreadyPresentConsents["primaryMarketingConsentReference"] = addtlProp.primaryMarketingConsentReference;
        alreadyPresentConsents["primaryMedicalConsentReference"] = addtlProp.primaryMedicalConsentReference;
 
        let availableConsents = consentReduce(userInfo);
 
        recordsUK = consentData_flag(recordsUK,availableConsents,alreadyPresentConsents,sfdcId);
 
        let records=[
            recordsUK["primaryConsentReference"],
            recordsUK["primaryMedicalConsentReference"],
            recordsUK["primaryMarketingConsentReference"]
        ];
        userRegDetails =  {
            "userInfo": {
                "sfdcId":sfdcId,
                "email": userInfo.email,
                "phone": addtlProp.phone ? addtlProp.phone : "",
                "title": userInfo.title,
                "firstName": userInfo.firstName,
                "lastName":userInfo.lastName,
                "Postcode":addtlProp.Postcode ? addtlProp.Postcode : "",
                "orgName":addtlProp.orgName?.Id ? addtlProp.orgName?.Id : "",
                "billingStreet" : addtlProp.billingStreet ? addtlProp.billingStreet : "",
                "billingCity": addtlProp.billingCity ? addtlProp.billingCity : "",
                "billingState" : addtlProp.billingState ? addtlProp.billingState : "",
                "role" : addtlProp.role,
                "records":records
            }
        };
        userRegDetails.userInfo['activationDateTime'] = activationDateTime.toISOString();
    }
    userRegDetails['captchaValue'] = localStorage.getItem("captchaValueActivate");
    return JSON.stringify(userRegDetails);
}