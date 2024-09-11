let accessCode;
let accessCodePresentFlag = false;
let alreadyRegister = false;
let abtEmail = false;
let emailVerifyProcess = false;
const isEnterpriseRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
const captchaAction ="submit";
const isEnt = "ENT";
const isNonEnt = "NON_ENT";
$(document).ready(function () {
    if(sessionStorage.getItem('jwtToken')){
        $("fieldset.o-wizard__content").hide();
        $("#success-shown").css("display","block");
        $(".a-input-field[data-component-type='input-field-password'] .a-input-password-strength").removeClass('password-weak password-ok password-medium password-strong');
    }
    sessionStorage.removeItem('isAbtEmail');
    // Shift the "Other" Option to the end of the list.
    $("[data-optionvalue=Other]").each(function () { $(this).insertAfter($(this).parent().find("li:last")) });
    $("#validatedEmailAddress").parent().parent().find('label').removeClass("sr-only");
    // check to see if user is logged in, if so pre-fill My Account form fields
    accessCode = getUrlParameter('accessCode');
    if (accessCode && accessCode != '') {
        $("#accessCode").val(accessCode);
        showLoading();
        hideRegistrationLongForm();
        hideNpiField();
        const accessCodeForm = $("#accessCodeForm form");
        const action = accessCodeForm.attr("action");
        accessCodeRecaptcha(action + "/" + accessCode);
    } else {
        showRegistrationLongForm();
    }
    
});
function accessCodeRecaptcha(service) {
    let gSiteKey = $('[data-site-key]').attr('data-site-key');
    if (typeof grecaptcha != 'undefined') {
        if(isEnterpriseRecaptchaEnabled) {
            grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise.execute(gSiteKey, {
                    action: 'submit'
                }).then(function (captcha) {
                    accessCodeCheck(service, captcha,captchaAction,isEnt);
                }).catch(function (error) {
                    accessCodeCheck(service);
                });
            });
        }else{
            grecaptcha.ready(function () {
                grecaptcha.execute(gSiteKey, {
                    action: 'submit'
                }).then(function (captcha) {
                    accessCodeCheck(service, captcha,captchaAction,isNonEnt);
                }).catch(function (error) {
                    accessCodeCheck(service);
                });
            });                
        }
        
    } else {
        setTimeout(function () {
            accessCodeRecaptcha(service);
        }, 1000);
    }
}

function accessCodeCheck(service, captcha,captchaActionVal,captchaType) {
    let headers = {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage
    };
    let data = {
        "captchaType": captchaType,
        "captchaAction": captchaActionVal
    };

    if (typeof captcha != 'undefined') {
        headers["x-captcha-value"] = captcha;
    }

    $.ajax({
        "url": service,
        "method": "GET",
        "headers": headers,
        "data": JSON.stringify(data)
    }).then(function (response) {
        if (response.errorCode === 0) {
            if (response.response.allowUser == "true") {
                accessCodePresentFlag = true;
            }
        } else if (response.errorCode === 400) {
            if (response.response?.i18nMessageKey === "ACC-CODE-1003") {
                // Invalid Access Code
                $("#accessCode").val("");
                showRegistrationLongForm();
            } else if (response.response?.i18nMessageKey === "ACC-CODE-1012") {
                // Access Code Already Registered - Show Login Modal
                $("#accessCode").val("");
                showRegistrationLongForm();
                $("#alreadyRegisteredModal")[0].click();
            }
        } else if (response.errorCode === 500) {
            showRegistrationLongForm();
        }
        hideLoading();
    }).fail(function () {
        showRegistrationLongForm();
        hideLoading();
    });
}
let emailTimout;
$('#registrationEmailAddress').keyup(function () {
    alreadyRegister = false;
    emailVerifyProcess = false;
    const email = $(this).val();// use val here to get value of input
    if(emailTimout){
        clearTimeout(emailTimout);
    }
     emailTimout = setTimeout(function(){
        // disable the button before API call
        $("#verifyEmail").attr("disabled", "disabled"); 
        validateEmail(email);
        emailVerifyProcess = true;
     }, 500);
   
});

/* function to read and format the email Regex pattern
*   @return RegExp object 
*/
function validateEmailPattern(){
    let emailRegexString = jQuery('#emailRegex').val();
    let emailPatternStr = emailRegexString.substring(1, emailRegexString.length-1);
    return new RegExp(emailPatternStr);
}

//function to disable button on body  click if email already exist

$('body').click(function(e){
    let pageType = $('#pageType').length && $('#pageType').val() ? $('#pageType').val() : "";
    if(alreadyRegister || 
        (pageType.toUpperCase() !== "FSF" && sessionStorage.getItem('isAbtEmail')) ||
        emailVerifyProcess
        ){
            sessionStorage.removeItem('isAbtEmail');
            $("#verifyEmail").attr("disabled", "disabled");
            e.stopPropagation();
    }
})


/* validate email Regex function before call
@param{email} string
*/
function validateEmail($email = "") {
    $email = $email.toLowerCase();
    // setting flag if Abbott user registered
    if($email.includes("abbott.com")){
        abtEmail = true;
        sessionStorage.setItem('isAbtEmail', true);
    }
    let isFSFValid = checkEmailRegister($email);
    let emailReg = validateEmailPattern();
    if (emailReg.test($email) && isFSFValid) {
        let gSiteKey = $('[data-site-key]').attr('data-site-key');
        if (typeof grecaptcha != 'undefined') {
            $(".abbott-user-error").addClass("d-none");
            if(isEnterpriseRecaptchaEnabled) {
                grecaptcha.enterprise.ready(function () {
                    grecaptcha.enterprise.execute(gSiteKey, {
                        action: 'submit'
                    }).then(function (captcha) {
                        verifyEmailExist(captcha,captchaAction,isEnt);
                    }).catch(function (error) {
                        verifyEmailExist();
                    });
                });
            }
            else{
                grecaptcha.ready(function () {
                    grecaptcha.execute(gSiteKey, {
                        action: 'submit'
                    }).then(function (captcha) {
                        verifyEmailExist(captcha,captchaAction,isNonEnt);
                    }).catch(function (error) {
                        verifyEmailExist();
                    });
                });

            }            
        }
    }
}

// 3 Step Navigation

let previousStep = [];

$("#registration .o-wizard__container").on("click", "button[name='Continue']", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let getEmailAddress = sessionStorage.getItem("verified-email");
    // set field as read only for Abbott user
    if(sessionStorage.getItem('isAbtEmail') && getEmailAddress.includes("abbott.com")){
        $('#registrationInstitutionName').attr('readonly', true);
    }
    $('.o-wizard__btn').removeClass("justify-content-between");
    $('.o-wizard__btn').addClass("justify-content-start");

    let currentStep = parseInt($(this).parents("fieldset[data-wizarditem]").attr("data-wizarditem"));

    switch (currentStep) {
        case 0:
            nextStep(1, 0);
            break;
        case 1:            
            $("#validatedEmailAddress").val(getEmailAddress);
            nextStep(2, 1);
            break;
        case 2:
            // Remove saved data from sessionStorage
            sessionStorage.removeItem("verified-email");
            break;
    }
});

$("#registration .o-wizard__container").on("click", "button[name='back']", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let previousWizard = previousStep.pop();
    goBack(previousWizard);
});

function nextStep(show, hide) {
    previousStep.push(hide);
    if (show == "0") {
        $("#registrationHeader p").css("display", "block");
    }
    else {
        $("#registrationHeader p").css("display", "none");
    }

    $("fieldset[data-wizarditem]").hide();
    $("fieldset[data-wizarditem='" + show + "']").show();


    $('html,body').animate({
        scrollTop: $('#registration').offset().top - 150
    }, 500);

}

function goBack(previous) {
    $("fieldset[data-wizarditem]").hide();
    if (previous == "0") {
        $("#registrationHeader p").css("display", "block");
    }
    else {
        $("#registrationHeader p").css("display", "none");
    }
    $("fieldset[data-wizarditem='" + previous + "']").show();

    $('html,body').animate({
        scrollTop: $('#registration').offset().top - 150
    }, 500);
}

function accessCodeEmailCheckRecaptcha() {
    $("#accessCode").val(accessCode);
    let gSiteKey = $('[data-site-key]').attr('data-site-key');
    if (typeof grecaptcha != 'undefined') {
        if(isEnterpriseRecaptchaEnabled) {
            grecaptcha.enterprise.ready(function () {
                grecaptcha.enterprise.execute(gSiteKey, {
                    action: 'submit'
                }).then(function (captcha) {
                    accessCodeEmailCheck(captcha,captchaAction,isEnt);
                }).catch(function (error) {
                    accessCodeEmailCheck();
                });
            });

        }else{
            grecaptcha.ready(function () {
                grecaptcha.execute(gSiteKey, {
                    action: 'submit'
                }).then(function (captcha) {
                    accessCodeEmailCheck(captcha,captchaAction,isNonEnt);
                }).catch(function (error) {
                    accessCodeEmailCheck();
                });
            });
        }
        
    } else {
        accessCodeEmailCheck();
    }
}

function accessCodeEmailCheck(captcha,captchaActionVal,captchaType) {
    const accessCodeEmailForm = $("#registration form");
    const action = accessCodeEmailForm.attr("action");
    const emailField = $("[name=email]");
    const email = emailField.val();
    const accessCodeFromInput = $("#accessCode").val();

    // Show Email Loading Spinner
    emailField.parent().find(".abt-icon").addClass("spin").css("display", "inline-block");

    let headers = {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage
    };

    let data = {
        "email": email,
        "accessCode": accessCodeFromInput,
        "captchaType": captchaType,
        "captchaAction": captchaActionVal
    };

    if (typeof captcha != 'undefined') {
        data["captchaValue"] = captcha;
    }

    $.ajax({
        "url": action,
        "method": "POST",
        "headers": headers,
        "data": JSON.stringify(data)
    }).then(function (response) {

        if (response.errorCode === 0) {
            // Access Code Matches but Email Already Registered - Show Login Modal
            $("#accessCode").val("");
            showRegistrationLongForm();
            $("#alreadyRegisteredModal")[0].click();
            $("#registration .o-form-container__buttons").removeClass("disabled");
        } else if (response.errorCode === 400) {
            accessCodeEmailMatch(response);
        } else if (response.errorCode === 500) {
            $("#accessCode").val("");
            showRegistrationLongForm();
            $("#registration .o-form-container__buttons").removeClass("disabled");
        }
        emailField.parent().find(".abt-icon").hide();
    }).fail(function () {
        $("#accessCode").val("");
        showRegistrationLongForm();
        $("#registration .o-form-container__buttons").removeClass("disabled");
        emailField.parent().find(".abt-icon").hide();
    });
}

/* function to match the access code with email based on sceanrios
@param{res}
*/
function accessCodeEmailMatch(res){
    if (res.response?.i18nMessageKey === "ACC-CODE-1013") {
        // Access Code Matches and Unregistered - Proceed with short form
        hideRegistrationLongForm();
        $("#verifyEmail").removeAttr("disabled");
        if (!res.response?.additionalProperties?.npiNumberExist) {
            // Show NPI field on short form if NPI not already in Salesforce
            showNpiField();
        }
    } else if (res.response?.i18nMessageKey === "ACC-CODE-1003" || res.response?.i18nMessageKey === "ACC-CODE-1014") {
        // Invalid Access Code OR Wrong email for Access Code then  Show Long Form
        showRegistrationLongForm();
        showNpiField();
        $("#verifyEmail").removeAttr("disabled");
    } else if (res.response?.i18nMessageKey === "ACC-CODE-1015") {
        // Email Already Registered - 
        alreadyRegister = true;
        $('.email-error').removeClass('d-none');
    }
}


/* function to check if email aleady used OR present in SFDC
   @param{captcha} 
*/
function verifyEmailExist(captcha,captchaActionVal,captchaType) {
    const action = $('#verifyEmailUrl').val();
    const emailField = $("[name=email]");
    const email = emailField.val();
    //Hide email error message if user verify enters new email
    $('.email-error').addClass('d-none');
    $(".abbott-user-error").addClass("d-none");
    // Show Email Loading Spinner
    emailField.parent().find(".abt-icon").addClass("spin").css("display", "inline-block");

    let headers = {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage
    };

    let data = {
        "email": email,
        "captchaType": captchaType,
        "captchaAction": captchaActionVal
    };
    if (accessCode.length > 0) {
        data["accessCode"] = accessCode;
    }
    if (typeof captcha != 'undefined') {
        data["captchaValue"] = captcha;
    }
    $.ajax({
        "url": action,
        "method": "POST",
        "headers": headers,
        "data": JSON.stringify(data)
    }).then(function (response) {
        sessionStorage.setItem("verified-email", email);
        emailVerifyProcess = false;
        if (response.errorCode === 0) {
            checkEmailAccessCodeMatch(response);
                          
            
        }
        // If user email already registered. Show error message 
        else if(response.errorCode === 400 ){
            if( response.response.i18nMessageKey === 'REG-USER-1001'){
                alreadyRegister = true;
                $('.email-error').removeClass('d-none');
            }

            // call function show form based access and email response
            accessCodeEmailMatch(response);

        }
       
        emailField.parent().find(".abt-icon").hide();
        hideLoading();
    }).fail(function () {
        emailField.parent().find(".abt-icon").hide();
        hideLoading();
        emailVerifyProcess = false; // set flag fasle for Email verify call
    });
}

//  If user’s email address is in Salesforce. Show short form irrespetive of using access code 
function checkEmailAccessCodeMatch(response){
    //  If user’s email address is in Salesforce. Show short form irrespetive of using access code 
    if(response.response.userExists === "true" && response.response.statusReason === "Available" && response.response.registered === "false") { 
        hideRegistrationLongForm();
        $("#verifyEmail").removeAttr("disabled");
        $("#accessCode").val(response.response?.additionalProperties?.accessCode);
        if (!response.response?.additionalProperties?.npiNumberExist) {
            // Show NPI field on short form if NPI not already in Salesforce
            showNpiField();
        }
    }
    //If access code match and email already registered
    else if(response.response.userExists === "true" && response.response.statusReason === "Available" && response.response.registered === "true") { 
        alreadyRegister = true;
        $('.email-error').removeClass('d-none');
    }
    //If new user without access code
    else if(response.response.userExists === "false" && response.response.statusReason === "Not Available") { 
        showRegistrationLongForm();
        $("#verifyEmail").removeAttr("disabled");
    }  

}
function showNpiField() {
    $("[name=npiNumber]").closest(".fields").show().next().show();
}

function hideNpiField() {
    $("[name=npiNumber]").closest(".fields").hide().next().hide();
}

function showRegistrationLongForm() {

    $("#registrationLongForm").show();

    // Enable required long form fields
    $("[name=institutionType]").prop('required', true).closest('.a-dropdown').attr('data-required', true).closest(".options").show();
    $("[name=specialty]").prop('required', true).closest('.a-dropdown').attr('data-required', true).closest(".options").show();
    $("[name=institutionName]").prop('required', true).closest('.a-input-field').attr('data-required', true);
    $("[name=lineOne]").prop('required', true).closest('.a-input-field').attr('data-required', true);
    $("[name=zipCode]").prop('required', true).closest('.a-input-field').attr('data-required', true);
    $("[name=city]").prop('required', true).closest('.a-input-field').attr('data-required', true);
    $("[name=state]").prop('required', true).closest('.a-dropdown').attr('data-required', true);
}

function hideRegistrationLongForm() {
    $("#registrationLongForm").hide();

    // Disable required long form fields
    $("[name=institutionType]").removeAttr('required').closest('.a-dropdown').removeAttr('data-required').closest(".options").hide();
    $("[name=specialty]").removeAttr('required').closest('.a-dropdown').removeAttr('data-required').closest(".options").hide();
    $("[name=institutionName]").removeAttr('required').closest('.a-input-field').removeAttr('data-required');
    $("[name=lineOne]").removeAttr('required').closest('.a-input-field').removeAttr('data-required');
    $("[name=zipCode]").removeAttr('required').closest('.a-input-field').removeAttr('data-required');
    $("[name=city]").removeAttr('required').closest('.a-input-field').removeAttr('data-required');
    $("[name=state]").removeAttr('required').closest('.a-dropdown').removeAttr('data-required');
}

// Check and show error message for abbott user in normal register page
function checkEmailRegister(usrEmail){
    let inputElem = $(".abbott-user-error");
    $('.email-error').addClass('d-none');
    let pageType = $('#pageType').length && $('#pageType').val() ? $('#pageType').val() : "";
    if(pageType.toUpperCase() !== "FSF" && usrEmail.includes("abbott.com")){
        $(inputElem).removeClass("d-none");
        $('.email-error').addClass('d-none');
        $("#verifyEmail").attr("disabled", "disabled");
        return false;
    } else{
        $(inputElem).addClass("d-none");
        return true;
    }

} 