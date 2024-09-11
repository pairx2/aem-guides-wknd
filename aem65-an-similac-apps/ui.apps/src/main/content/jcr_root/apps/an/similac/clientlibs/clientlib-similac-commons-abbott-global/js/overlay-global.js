var regexSelector = ".a-input-field--text-regex";
var requiredSelector = ".a-input-field--text-require";
var loiginContainer = jQuery('.loginContainer');
var errorMsg = '.errorMessage';
var editCart = miniCart_label.cartURL || '';
var checkoutCart = miniCart_label.checkoutURL || '';
var minicartContainer = '.minicart-container';
var SocialLoginDivSamplesID = "SocialLoginDivSamplesID";
var sampleIdUiContainer = "SocialLoginDivSamplesID_uiContainer";
var loginCls = '.login';
var headerMenu = '#header-profile-menu-container';
const abtUserCookie = ABBOTT.cookie('abt_usr');
const pABTCookie = abtUserCookie && JSON.parse(abtUserCookie);
let orderLink = jQuery('#aemOrderLink').val();
let subscriptionLink = jQuery('#aemSubscriptionLink').val();
let paymentLink = jQuery('#aemPaymentLink').val();
let addressLink = jQuery('#aemAddressLink').val();
if(pABTCookie && pABTCookie.magento_page.orders === 1){
    orderLink = jQuery('#magentoOrderLink').val();
}
if(pABTCookie && pABTCookie.magento_page.subscriptions === 1){
    subscriptionLink = jQuery('#magentoSubLink').val();
}
if(abtUserCookie !== undefined){
    paymentLink = jQuery('#magentoPaymentLink').val();
    addressLink = jQuery('#magentoAddressLink').val();
}
jQuery('#menuSubLink').attr('href', orderLink);
jQuery('#menuOrderlink').attr('href', subscriptionLink);
jQuery('#menuPayLink').attr('href',paymentLink);
jQuery('#menuAddressLink').attr('href',addressLink);
const ssmUserCookie = ABBOTT.cookie('profile');
const pSSMCookie = ssmUserCookie && JSON.parse(ssmUserCookie);
if(pSSMCookie && pSSMCookie.userType === "similac-ssm"){
    jQuery('.showRewards').removeClass('d-none');
}

var profileMenuHtml = jQuery('#profileMenuList').html();
var loginSection = jQuery('#loginOverlayHtml').html();
var minicartSection = jQuery('#miniCartHtml').html();

var users= {};
var campaign='';
  if(sessionStorage.getItem('MediaTracking')!=null){
  users =  JSON.parse(sessionStorage.getItem('MediaTracking'));
  campaign =  users.utm_campaign !=null? users.utm_campaign:""; 
}

var error = function(e) {
    const { errorCode } = e;
    switch (errorCode) {
        case "403043":
            onLoginIdentifierExists(e);
            break;
        case "200009":
            onLoginLinkedAccount(e);
            break;
        case "206001":
        default:
            onAccountRegistrationPending(e);
    }
};


var setSocialIcons = function (){
    var checkAndSetIcon = setInterval(function(){
        if (jQuery("#"+SocialLoginDivSamplesID).length && jQuery("#"+sampleIdUiContainer).length === 0) {
            ABBOTT.socialLogin("", SocialLoginDivSamplesID, onLogin, error);
        } else {
            clearInterval(checkAndSetIcon);
        }
    },100)
}

var togglePassswordView = function() {
    jQuery("#passwordField .input-icon").click(function() {
        var passwordPopInput = jQuery("#passwordField input");
        if(passwordPopInput.attr("type") === "password"){
            passwordPopInput.attr("type", "text");
            jQuery('#passwordField .sim-icon use').attr('href', "#icon-show");
        } else{
            passwordPopInput.attr("type", "password");
            jQuery('#passwordField .sim-icon use').attr('href', "#icon-hide");
        }
    });
}

jQuery(document).ready(function() {
    jQuery('li .cart').prepend('<div class="minicart-logo__badge oasis-minicart"></div>');
    if(ABBOTT.cookie('x-id-token')){
        jQuery(loiginContainer).remove();
        jQuery(headerMenu)
        .addClass('container user_profile')
		.css('display','none')
		.append(profileMenuHtml);
        jQuery('.login .d-lg-block').text('Profile');
        jQuery(loginCls).parents('li').attr('id','user');
        jQuery('.login, .login .sim-icons').click(function(e) {
          if(jQuery(headerMenu).css('display') === "none"){
            jQuery(headerMenu).css('display','block');
           } else{
            jQuery(headerMenu).css('display','none')
            }
            e.stopPropagation();
        });
        jQuery(headerMenu).click(function(e) {
            e.stopPropagation();
        });
        jQuery('body').click(function(e) {
            jQuery(headerMenu).hide();
        });
    }
    jQuery("#loginPopup").append(loginSection);
    jQuery(loginCls).parent().on('click', function(e){
        console.log(' login li clicked..');
        setSocialIcons();
        loiginContainer.toggle();
        e.stopPropagation();
    });

    jQuery('#siteSubmit').click(function(e) {
        siteLogin(e);
    });

    loiginContainer.click(function(e) {
        e.stopPropagation();
    });

    jQuery('body').click(function(e) {
        loiginContainer.hide();
    });
    function validateLoginPattern(){
        var loginRegexString = jQuery('#email_id').attr('data-regex');
        var loginPatternStr = loginRegexString.substring(1, loginRegexString.length-1);
        return new RegExp(loginPatternStr);
    }
    jQuery('.similac-form input').blur(function() {
        var inputValue = jQuery(this).val();
        var emailPattern = validateLoginPattern();
        var passPattern = new RegExp(jQuery("#passwordField input").data('regex'));
        if (!inputValue) {
            jQuery(this).siblings(regexSelector).hide();
            jQuery(this).siblings(requiredSelector).show();
        } else {
            if (jQuery(this).attr('name') === "loginID" && !emailPattern.test(inputValue)) {
                jQuery(this).siblings(requiredSelector).hide();
                jQuery(this).siblings(regexSelector).show();
            } else if (jQuery(this).attr('name') === "password" && !passPattern.test(inputValue)) {
                jQuery(this).siblings(regexSelector).show();
                jQuery(this).siblings(requiredSelector).hide();
            } else {
                jQuery(this).siblings(requiredSelector).hide();
                jQuery(this).siblings(regexSelector).hide();
            }
        }
    })

    jQuery(".cart").append(minicartSection);
    jQuery('.cart').parent().on('click', function(e){
      jQuery(minicartContainer).toggle();
      loiginContainer.hide();
      jQuery(headerMenu).hide();
        e.stopPropagation();
    });
    jQuery('.minicart-close').click(function(e) {
      jQuery(minicartContainer).toggle();
        e.stopPropagation();
    });
    togglePassswordView();
});


function onLoginIdentifierExists(e) {
    const { response: { regToken = "", id_token = "", loginID = "" } = {} } = e;
    if (window.sessionStorage) {
        sessionStorage.setItem("regToken", regToken);
        sessionStorage.setItem("id_token", id_token);
        sessionStorage.setItem("loginID", loginID);
        sessionStorage.setItem("provider", '');
        window.location.href = jQuery("#accountLinkingURL").val();
    } else {
        window.location.href = jQuery("#accountLinkingURL").val();
    }
}

function onAccountRegistrationPending(e) {
    const registerFormName = jQuery(formName).val() && jQuery(formName).val().toLowerCase();
    window.sessionStorage.setItem('socialRegister', e);
    if( registerFormName === "strongmoms" ||
    registerFormName === "alimentum" ||
    registerFormName === "neosure" ||
    registerFormName === "microsite"
    ){
        var resp = e.response || {};
        jQuery(emailError).hide(); 
        emailId.val(resp.email);
        emailId.prop("readonly", true);
        emailId.parents(formGroupClass).find(formLabel).addClass(floatingLabelClass);
        jQuery("#first-name").val(resp.firstName).parents(formGroupClass).find(formLabel).addClass(floatingLabelClass);
        jQuery("#last-name").val(resp.lastName).parents(formGroupClass).find(formLabel).addClass(floatingLabelClass);
        window.sessionStorage.setItem('loginProvider',resp.loginProvider);
        window.sessionStorage.setItem('socialUid', resp.UID);
        window.sessionStorage.setItem('socialToken', resp.regToken);
        jQuery(".passwordId").hide();
        jQuery(".passwordId "+ainputField).removeAttr(dataRequired);
        jQuery("#password").removeAttr('required');
        htmlBody.animate({
            scrollTop: jQuery('#container-register-global').offset().top - ($('.reversible-cart-block').height() -100)
        }, 2000);

    } else {
        window.location.href =  jQuery("#registrationURL").val();
    }
}


function onLoginLinkedAccount(e){
    jQuery.ajax({
      url: jQuery("#loginURL").val(),
      method: "POST",
      headers: {
          "content-type": appJson,
          "x-country-code": "US",
          "x-application-id": "similac",
          "x-preferred-language": "en-US",
          registrationtoken: e.response.regToken,
          rememberme: false
      },
      data: JSON.stringify({}),
      beforeSend: function() {
          jQuery("#overlay").show();
      },
      success: function(results) {
          jQuery("#overlay").hide();
          const { errorCode, status, response } = results;
          if (errorCode === 0 && status === true) {
              getProfileInfo(response.accountInfo.profile, uid);
          } else {
              hideFormOnError();
          }
      }
  });

}

async function onLogin(e) {
    let captchaTokenLogin = await getCaptchaToken();
    const {
        UID: uid = "",
        UIDSignature: uidsignature = "",
        signatureTimestamp: signaturetimestamp = ""
    } = e;
    jQuery.ajax({
        url: jQuery("#loginURL").val(),
        method: "POST",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            rememberme: false,
            uid,
            uidsignature,
            signaturetimestamp
        },
        data: JSON.stringify({captchaValue: captchaTokenLogin, campaign, captchaType : reCaptchaType}),
        beforeSend: function() {
            jQuery("#overlay").show();
        },
        success: function(results) {
            jQuery("#overlay").hide();
            const { errorCode, status, response } = results;
            if (errorCode === 0 && status === true) {
                getProfileInfo(response.accountInfo.profile, uid);
            } else {
                hideFormOnError();
            }
        }
    });
}

var isEntRecaptcha = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
var reCaptchaType = "NON_ENT";
if(isEntRecaptcha){
    reCaptchaType = "ENT";
}
async function getCaptchaToken() {
    var captchaCount = 0;
    var captchaToken = "";
    return new Promise(resolve =>{
        var checkCaptchaValue = setInterval(() => {
        captchaCount++;
        if (captchaToken === '') {
            // check if enterprise recaptcha is enabled
            if (isEntRecaptcha) {
                grecaptcha.enterprise.execute();
                captchaToken =  grecaptcha.enterprise.getResponse();
                if(captchaToken.length > 1){
                    resolve(captchaToken);
                    clearInterval(checkCaptchaValue);
                }
            } else {
                grecaptcha.execute()
                captchaToken =  grecaptcha.getResponse();
                if(captchaToken.length > 1){
                    resolve(captchaToken);
                    clearInterval(checkCaptchaValue);
                }
            }
            if(captchaCount > 50) {
                clearInterval(checkCaptchaValue);
            }
        }
        },200);
   });
}


async function siteLogin(e) {
    var captchaToken = await getCaptchaToken();
    e.preventDefault();
    const emailVal = jQuery("#loginId").val();
    const passVal = jQuery("#passwordField #passwordLogin").val();
    if(emailVal.trim().length === 0 && passVal.trim().length === 0){
       jQuery('.similac-form-group .a-input-field--text-require').show();
    } else {
    var formData = {
        "loginID": emailVal,
        "password": passVal,
        "captchaValue": captchaToken,
        "captchaType" : reCaptchaType,
        "captchaAccountId" : window.btoa(emailVal),
        campaign
     };
    jQuery.ajax({
        url: jQuery("#loginURL").val(),
        method: "POST",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            rememberme: false
        },
        data: JSON.stringify(formData),
        beforeSend: function() {
            jQuery("#overlay").show();
        },
        success: function(results) {
            jQuery("#overlay").hide();
            const { errorCode, status, response } = results;
            if (errorCode === 0 && status === true) {
                jQuery(errorMsg).html("");
                getProfileInfo(response.accountInfo.profile, response.accountInfo.UID);
            } else {
                jQuery(errorMsg).text(response.statusReason);
            }
        }
    });
 }
}

function getProfileInfo(res, UID) {
    jQuery.ajax({
        url: jQuery("#getProfileURL").val(),
        method: "GET",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            "x-id-token": ABBOTT.utils.getSessionInfo()
        },
        beforeSend: function() {
            jQuery("#overlay").show();
        },
        success: function(results) {
            jQuery("#overlay").hide();
            const { errorCode, status, response } = results;
            if (errorCode === 0 && status === true) {
                jQuery(errorMsg).html("");
                var _data = response.userInfo;
                var cookieConfig = {
                    path: "/",
                    domain: "similac.com",
                    secure:true,
                    HttpOnly:true
                };
                const {
                    dob = "",
                        weeks = "",
                        userSubType = "",
                        userType = "",
                        lineOne = "",
                        lineTwo = "",
                        country = "",
                        city = "",
                        state = "",
                        zipCode = "",
                        contactEmail
                } = _data;
                window.sessionStorage.removeItem("oasisEmail");
                ABBOTT.cookie(
                    "profile",
                    JSON.stringify({
                        ...res,
                        UID,
                        userType,
                        dob,
                        weeks,
                        userSubType,
                        lineOne,
                        lineTwo,
                        country,
                        city,
                        state,
                        zipCode,
                        contactEmail
                    }),
                    cookieConfig
                );
                window.location.href = jQuery('#updatedMyOffersURL').val();
            } else {
                hideFormOnError();
            }
        }
    });
}

jQuery("a#pampersPrivacyLink").click(function(e){
    e.preventDefault();
    var c=window.setInterval(function(){
        if(jQuery(".swal-overlay").length>0){
            jQuery(".swal-overlay").removeClass("swal-overlay--show-modal");
            window.clearInterval(c)
        }
        },100);
});