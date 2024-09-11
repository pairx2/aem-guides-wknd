var inputTextError = ".a-input-field--text-error";
var signUpBtnId = "#button-id";
var ecomUserCookie = ABBOTT.cookie("profile");
var userX = ABBOTT.cookie("x-id-token");
var parsedEcomUsr = ecomUserCookie && JSON.parse(ecomUserCookie);
var passwordField;
var confirmPasswordField;
var n_form_grp=".a-form-grp";

var showSSMFields = function(){
    jQuery('#offers_text').show();
    jQuery('#about_container').show();
    jQuery(confirmPasswordId).parents('.fields').hide().nextAll('.fields, .options, .datepicker, .column-control').show();
    jQuery('#remember-id-options').parent().show(); 
    jQuery('#lineOne, #city-id, #zipcode-id, input[name="birthdate"]').parents(ainputField).attr(dataRequired, true);
   jQuery(confirmPasswordId).removeAttr('required').parents(ainputField).removeAttr(dataRequired);
   jQuery(confirmPasswordId).parents(ainputField).attr(dataConfirmPass,false);
   jQuery(confirmPasswordId).parents('.text').removeClass('confirmPassMB');
   cityId.attr('required', true);
   jQzipCode.attr('required', true);
   jQuery(`${preemieOptionId} ${inputPreemie}`).attr(dataRequired, true);
   jQuery(`${preemieOptionAge} ${ainputField}`).attr(dataRequired, true);
   jQuery(`${stateIdOption} ${ainputField}`).attr(dataRequired, true);
   //below fields will show only if google address is not validated
   jQuery(' #city-id, #zipcode-id').parents('.fields').hide();
   jQuery(stateIdOption).hide();
   
}

var hideSSMFields = function(){
    jQuery('#offers_text').hide();
    jQuery('#about_container').hide();
    jQuery(confirmPasswordId).parents('.fields').show().nextAll('.fields, .options, .datepicker, .column-control').hide();
    jQuery('#remember-id-options').parent().show(); 
    jQuery('#spi-id-options').parent('.options').show();
    jQuery('#lineOne, #city-id, #zipcode-id, input[name="birthdate"]').parents(ainputField).removeAttr(dataRequired);
    jQuery(confirmPasswordId).attr('required', true).parents(ainputField).attr(dataRequired, true);
    jQuery(confirmPasswordId).parents(ainputField).attr(dataConfirmPass,true);
    jQuery(confirmPasswordId).parents('.text').addClass('confirmPassMB');
   cityId.removeAttr('required');
   jQzipCode.removeAttr('required');
   jQuery(`${preemieOptionId} ${inputPreemie}`).removeAttr(dataRequired);
   jQuery(`${preemieOptionAge} ${ainputField}`).removeAttr(dataRequired);
   jQuery(`${stateIdOption} ${ainputField}`).removeAttr(dataRequired);
}

// check ecom user login

var checkEcomLoggedInUser = function(ecomUsr){
    var isEcomUserIn = false;
     if(userX && parsedEcomUsr && parsedEcomUsr.userType === ecomUsr){
        isEcomUserIn = true;
     }
     return isEcomUserIn;
}


var showEcomToSSMFields = function (){
   const checkEcom = checkEcomLoggedInUser(similacEcom);
     if(checkEcom && window.localStorage.getItem("purchaser_type") === "subscription_user"){
        jQuery('#emailExists').hide();
        jQuery('#lineOne').parents('.fields')
        .prevAll('.fields, .column-control')
        .hide().find(ainputField).removeAttr(dataRequired)
        .find('input').removeAttr('required');
        jQuery(confirmPasswordId).parents(ainputField).attr(dataConfirmPass,false);
     }   

}
jQuery(document).ready(function() {
    jQuery(confirmPasswordId).attr({
        maxlength:'25',
        autocomplete: "new-password"
    });
    jQuery('#button-id').text('Create Account');
    showEcomToSSMFields();
    const checkEcom = checkEcomLoggedInUser(similacEcom);
    if(checkEcom && window.localStorage.getItem("purchaser_type") !== "subscription_user"){
        window.location.href = jQuery('#userProfile').val();
    }
    if(checkEcom && window.localStorage.getItem("purchaser_type") === "subscription_user"){
        prefillEcomUserAddress(checkEcom);
    }

    jQuery('#register-checkout-top').parents('.formcontainer').addClass('checkoutForm');
    jQuery('#register-checkout-top .divider').addClass('hideORText').text("");
    showTopContentOnPurchaseType();
    document.getElementById("email_id").addEventListener("blur", verfiyUserExist);
    document
    .getElementById("email_id")
    .addEventListener("keyup", errorHandle);
    handleCheckBoxClick();
    jQuery(confirmPasswordId).parents('.right-icon').find('.icon-right').html('<svg viewBox="0 0 100 100" class="sim-icon"><use href="#icon-hide"></use></svg>');
    jQuery(confirmPasswordId).parents('.right-icon').find('.icon-right').click(function() {
        var passwordInput = jQuery("#confirmPassword");
        if(passwordInput.attr("type") === "password"){
            passwordInput.attr("type", "text");
            jQuery(this).find('.sim-icon use').attr('href', "#icon-show");
        } else{
            passwordInput.attr("type", "password");
            jQuery(this).find('.sim-icon use').attr('href', "#icon-hide");
        }
    });
    jQuery(confirmPasswordId).keyup(function(){
        if(jQuery(this).val() !== jQuery('#password').val() && jQuery(this).val().trim().length > 0){
            jQuery(this).parents('.form-group').find(inputTextError).text('Please make sure both fields match.').show();
        } else {
            jQuery(this).parents('.form-group').find(inputTextError).text('').hide();
        }
    });

    passwordField = $("input[name='password']");
    confirmPasswordField = $("input[name='confirmpassword']");
    jQuery(document).on('keyup', 'input[name="password"]', function() {
    if (confirmPasswordField.val() === passwordField.val() && confirmPasswordField.val() !== "") {
        confirmPasswordField.parents(n_form_grp).removeClass('validation-error');            
        confirmPasswordField.parents(n_form_grp).find(inputTextError).text('').hide();

    } else if (confirmPasswordField.val() !== passwordField.val() && confirmPasswordField.val() !== "") {
        confirmPasswordField.parents(n_form_grp).addClass('validation-error');            
        confirmPasswordField.parents(n_form_grp).find(inputTextError).text('Please make sure both fields match.').show();
    }
    removeDisableForm();    
    });

    jQuery('body').click(function(){  
        removeDisableForm();
    });
});


 function removeDisableForm() {
    setTimeout(function() {
        if (!jQuery(".a-input-field--text-error").is(":visible") &&
            !jQuery(".a-input-field--text-require").is(":visible") &&
            !jQuery(".a-input-field--text-regex").is(":visible")
        ) {
            jQuery(signUpBtnId).removeAttr("disabled");
        }
        else {
            jQuery(signUpBtnId).attr("disabled", "disabled");
        }
    }, 200);
}

function handleCheckBoxClick(){
    jQuery(ssmCheckBox).click(function(){
        if(jQuery(this).is(':checked')){
            showSSMFields();
        } else {
            hideSSMFields();
        }
        });
}

function showTopContentOnPurchaseType(){
    if(window.localStorage.getItem("purchaser_type") === "subscription_user") {
        showSSMFields();
        jQuery('.ssm-subscription').show();
        jQuery('.ssm-one-time-purchase').hide();
        jQuery(ssmCheckBox).parents('.options').hide();
    } else {
        jQuery('.ssm-one-time-purchase').show();
        jQuery('.ssm-subscription').hide();
        hideSSMFields();
        jQuery(ssmCheckBox).parents('.options').show();
    }
}
function prefillEcomUserAddress(isEcomUser = false){
    const userProfile = ABBOTT.cookie("profile");
    const parsedUserProfile = userProfile && JSON.parse(userProfile);
    if(parsedUserProfile && parsedUserProfile.lineOne && parsedUserProfile.lineOne.length > 1){
        jQuery(addrLineOne).val(parsedUserProfile.lineOne)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
        jQuery("#lineTwo").val(parsedUserProfile.lineTwo)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
        cityId.val(parsedUserProfile.city)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
        jQzipCode.val(parsedUserProfile.zipCode)
        .parents(formGroupClass)
        .find(formLabel)
        .addClass(floatingLabelClass);
        //call google code
        var addressToCall = parsedUserProfile.lineOne+', '+parsedUserProfile.city+', '+parsedUserProfile.state
        doGeocode(addressToCall, isEcomUser, parsedUserProfile);
    }
}

async function ecomRegisterSubmit(e, isKountEnable){
    //code for checking whether element is present in DOM
   let checkbox_present=false;
   if(jQuery(".options #spi-id-options").length > 0)
   {
     checkbox_present=true;
   }
    if (!jQuery(inputTextError).is(":visible") &&
    !jQuery(".a-input-field--text-require").is(":visible") &&
    !jQuery(".a-input-field--text-regex").is(":visible") &&
    !jQuery("#emailExists .emailError").is(":visible") &&
    jQuery("#first-name").val().length > 0 && 
    jQuery("#last-name").val().length > 0 && 
    jQuery("#email_id").val().length > 0 &&
    ((checkbox_present === true && jQuery("#spi-id-options .a-checkbox__input").is(":checked")) || checkbox_present === false) 
) {
    e.preventDefault();
    var captchaToken = await getCaptchaToken();
    formError.remove();
    jQuery('.invalid-feedback-display').remove();

    ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "click", eventType + "_submit");
 
    var ecomFormData = {
        autoLogin: true,
        captchaValue: captchaToken,
        captchaType : reCaptchaType,   
        captchaAccountId : window.btoa(emailId.val()),
        captchaAction:"ecommerce-registration",
        userInfo: {
            userType: similacEcom,
            userName: emailId.val(),
            firstName: jQuery("#first-name").val(),
            lastName: jQuery("#last-name").val(),
            password: jQuery("#password").val(),
            adult: true,
            unlockPamersClub: getBooleanValue(jQuery("#pampers-id-options input:checked").val()),
            offerNotification: jQuery("#offerNotification").val(),
            rememberMe: getBooleanValue(jQuery("#remember-id-options input:checked").val())
        },
    };
     //Kount Payload
     if(isKountEnable){
        ecomFormData["riskSessionValue"] = kountSessionID;    
        ecomFormData["riskCheck"] = "true";
     }

     //Fraud Prevention | Google Recaptcha Key update 
     ecomFormData["captchaAccountId"] = window.btoa(emailId.val());
     ecomFormData["captchaAction"] = "ecommerce-registration";

    ecomSubmituserData(ecomFormData); 
} else {
    jQuery('.a-input-field .a-form-grp input').each(function(){
        if(jQuery(this).val().length < 1){
           jQuery(this).parents(n_form_grp).addClass('validation-require');
        }
    });
    jQuery(signUpBtnId).attr("disabled", "disabled");
    htmlBody.animate({
        scrollTop: jQuery(oFormContainer).offset().top + 50
    }, 2000);
}
}

function ecomSubmituserData(ecomData){
    const ecomJSONData = JSON.stringify(ecomData);
    const commonProps = ajaxCommonProperty(ecomJSONData, document.getElementById("register-user").value);
    jQuery.ajax({
        ...commonProps,
        success: function(results) {
            const { errorCode, response, status } = results;
            if (status && errorCode === 0) {
                //KOUNT validation for ecom user
				if(response.i18nMessageKey && response.i18nMessageKey.includes('RISK')){
                    // Track KOUNT error
					let gaType = "";
					gaType = eventType + "_kount-declined";
					ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "submit", gaType); //push GA
                    const getErrorText = getMessageForReg(response.i18nMessageKey);
					jQuery(oFormContainer).prepend(`<p class="invalid-feedback-display similac-error-group" id="form-error"> ${getErrorText} </p>`);
					var kountFormError = jQuery("#form-error");
					kountFormError.show();
					jQuery('#container-register-global '+oFormContainer+' #form-error').hide();
					overlayLoader.hide();
					htmlBody.animate({
						scrollTop: kountFormError.offset().top - 80
					}, 2000);
					
					return false;
				}
                ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "submit", eventType + "_submit");
                //Execute Get profile call
                const {
                    userInfo: {
                        firstName = "",
                        lastName = "",
                        userName: email = "",
                        uid: UID = "",
                        idToken = "",
                        userType = ""
                    } = {}
                } = response;
                const cookieConfig = {
                    path: "/",
                    domain: domainName
                };

                ABBOTT.cookie(
                    "profile",
                    JSON.stringify({
                      firstName,
                      lastName,
                      email,
                      UID,
                      idToken,
                      userType
                    }),
                    cookieConfig
                  );

                if (idToken && !ABBOTT.cookie(xIdToken)) {
                    ABBOTT.cookie(xIdToken, idToken, cookieConfig);
                }
                window.location = jQuery(ecomUserRedirect).val();
            } else {
                overlayLoader.hide();
                //track captcha error code
                if(errorCode === "AUTH-1005"){
					let gaType = "";
					gaType = eventType+"_invalid-captcha-error"
					ABBOTT.gtm.buildAndPush.formTracking(eventCategory, "submit", gaType);
				}
                const errorText = formSubmitAPIError(errorCode, response);
                jQuery(oFormContainer).prepend(`
                <p class="invalid-feedback-display similac-error-group" id="form-error"> ${errorText} </p>`);
                const formError = jQuery("#form-error");
                formError.show();
				jQuery('#container-register-global '+oFormContainer+' #form-error').hide();
                htmlBody.animate({
                    scrollTop: formError.offset().top + 50
                }, 2000);
                errorGASubmitData(errorCode, response);
            }
        }
    });
}


function convertEcomToSSM(){
   return {
        userInfo: {
            userType: jQuery("#userType").val(),
            adult: true,
            unlockPamersClub: getBooleanValue(jQuery("#pampers-id-options input:checked").val()),
            offerNotification: jQuery("#offerNotification").val()
        },
        category:"upgradeProfile",
    };
}


function updateEcomToSSM(ecomToSSMFormData){
    const ecomFormJsonData = JSON.stringify(ecomToSSMFormData);
    const commonAjaxProps = ajaxCommonProperty(ecomFormJsonData, jQuery('#update-profile-info').val());
    commonAjaxProps.headers[xIdToken] = ABBOTT.cookie(xIdToken); 
    jQuery.ajax({
       ...commonAjaxProps,
        success: function(results) {
            const { errorCode, status } = results;
            if (status && errorCode === 0) {
                const userAddress = ecomToSSMFormData.addresses[0];
                const ecomCookie = ABBOTT.cookie("profile");
                const parsedProfile = ecomCookie && JSON.parse(ecomCookie);
                const cookieConfig = {
                    path: "/",
                    domain: domainName
                };
                ABBOTT.cookie(
                    "profile",
                    JSON.stringify(
                        {
                            ...parsedProfile, 
                            userType: 'similac-ssm',
                            ...userAddress
                         }
                        ),
                    cookieConfig
                );
                window.location = jQuery(ecomUserRedirect).val();
            } else {
               
                overlayLoader.hide();
                const errorText = formSubmitAPIError(errorCode, response);
                jQuery(oFormContainer).prepend(`
                <p class="invalid-feedback-display similac-error-group" id="form-error"> ${errorText} </p>`);
                const formError = jQuery("#form-error");
                formError.show();
                htmlBody.animate({
                    scrollTop: formError.offset().top + 50
                }, 2000);
            }
        },
        });
}
