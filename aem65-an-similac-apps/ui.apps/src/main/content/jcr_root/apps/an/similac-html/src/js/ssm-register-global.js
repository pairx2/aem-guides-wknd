var oasisOffersPage = jQuery('#updatedMyOffersURL').val();
var redirectToLogin = jQuery('#redirectToLogin').val();
var sampleTooltip = document.querySelectorAll('#register-global-id .column-control .tooltips');
sampleTooltip.length && sampleTooltip[0].style.setProperty('margin-left','-6.313rem','important');
var columnControl = jQuery("#global-register-top .register-btn");
var topText = jQuery(".register-btn");
var formContainer = jQuery(".formcontainer #register-global-id");
var bottomConatiner = jQuery("#bottom-container");
var dataValue = jQuery('#oasisGenError').val();
var overlayLoader = jQuery("#overlay");
var addrTopDistance = jQuery('#lineOne').offset().top;
var addrLeftDistance = jQuery('#lineOne').offset().left;
var addrRightDistance = jQuery(window).width() - (jQuery('#lineOne').offset().left + jQuery('#lineOne').outerWidth());
jQuery(document).ready(function() {
    hideFormonPageLoad();
    removeDisableForm();
    verfiyOasisUserExist();
    jQuery("body").click();
	columnControl = jQuery("#global-register-top .register-btn");
	topText = jQuery(".register-btn");
	formContainer = jQuery(".formcontainer #register-global-id");
	bottomConatiner = jQuery("#bottom-container");
	dataValue = jQuery('#oasisGenError').val();
	overlayLoader = jQuery("#overlay");
	var checkAddrH = setInterval(function(){
	addrTopDistance = jQuery('#lineOne').offset().top;
	if(addrTopDistance){
        clearInterval(checkAddrH);
        addrTopDistance = addrTopDistance +15;
        addrLeftDistance = jQuery('#lineOne').offset().left;
        addrRightDistance = jQuery(window).width() - (jQuery('#lineOne').offset().left + jQuery('#lineOne').outerWidth());
	 }
	},1500);
	document.addEventListener("DOMContentLoaded", initAutocomplete);
});

async function verfiyOasisUserExist() {
    var queryString = new URLSearchParams(window.location.search);
    var emailString = queryString.get("eid");
    var accessCode = "";
    var captchaToken = "";
    let captchaEmailId;
    if (emailString && emailString !== "undefined" && emailString != null) {
        accessCode = emailString.split(" ").join("+");
        captchaToken = await getCaptchaToken();
        captchaEmailId = window.btoa(emailString);
    } else {
        hideFormOnError();
    }
    var formData = {
        accessCode: accessCode,
        captchaValue: captchaToken,
        captchaType : reCaptchaType,
        captchaAccountId : captchaEmailId,
        captchaAction : "register"
    };
    formData = JSON.stringify(formData);
    jQuery.ajax({
        url: document.getElementById("verify-email-exists").value,
        method: "POST",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US"
        },
        data: formData,
        dataType: "json",
        async: true,
        beforeSend: function() {
            overlayLoader.show();
        },
        success: function(results) {
            overlayLoader.show();
            if (results.status && results.errorCode === 0) {
                if (!results.response.userName || results.response.userName === "undefined" || results.response.userName === null) {
                    hideFormOnError();
                } else if (results.response.loginIdentity && results.response.userName) {
                    window.sessionStorage.setItem("oasisEmail", results.response.userName.trim());
                    fullUserORLoggedIn(results.response);
                } else if (results.response.userName && !results.response.loginIdentity) {
                    window.sessionStorage.setItem("oasisEmail", results.response.userName.trim());
                    liteUserORLoggedIn(results.response);
                }
            } else {
                hideFormOnError();
            }
        },
    });
}

function fullUserORLoggedIn(userData) {
    if (!ABBOTT.cookie(xIdToken)) { //redirect to login
        window.location.href = redirectToLogin;
    } else {
        overlayLoader.show();
        var lp = JSON.parse(ABBOTT.cookie("profile"));
        var secondaryEmail = lp.contactEmail ? lp.contactEmail : "";
        const cookieConfig = {
            path: "/",
            domain: domainName
        };
        ABBOTT.cookie(
            "profile",
            JSON.stringify({...lp, oasisEmail: userData.userName.trim(), oasisBannerClosed: false  }),
            cookieConfig
        );
        if (userData.userName.trim() === lp.email || userData.userName.trim() === secondaryEmail) {
            profileUpdate();
        } else {
            window.location.href = oasisOffersPage;
        }
    }
}

function liteUserORLoggedIn(userData) {
    if (ABBOTT.cookie(xIdToken)) {
        overlayLoader.show();
        var lp = JSON.parse(ABBOTT.cookie("profile"));
        const cookieConfig = {
            path: "/",
            domain: domainName
        };
        ABBOTT.cookie(
            "profile",
            JSON.stringify({...lp, oasisEmail: userData.userName.trim() }),
            cookieConfig
        );
        window.location.href = oasisOffersPage;
    } else {
        // stay on the page and prefill email
        showFormOnSuccessEmailVerify();
        emailId.val(userData.userName);
        emailId.prop("readonly", true);
        emailId.parents(formGroupClass).find(formLabel).addClass(floatingLabelClass);
    }
}


function setOasisCookie(hasOasisEmail){
    var lp = JSON.parse(ABBOTT.cookie("profile"));
    const cookieConfig = {
        path: "/",
        domain: domainName
    };
    ABBOTT.cookie(
        "profile",
        JSON.stringify({...lp, oasisEmail:  hasOasisEmail.trim()}),
        cookieConfig
    );
}


function showFormOnSuccessEmailVerify() {
    columnControl.show();
    topText.show();
    formContainer.show();
    bottomConatiner.show();
    overlayLoader.hide();
}


function profileUpdate() {
    jQuery.ajax({
        url: document.getElementById("get-profile-info").value,
        method: "GET",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            "x-id-token": ABBOTT.utils.getSessionInfo()
        },
        beforeSend: function() {
            overlayLoader.show();
        },
        success: function(resultProfile) {
            const { response, status, errorCode } = resultProfile;
            if (errorCode === 0 && status === true) {
                window.sessionStorage.setItem('isLiteUser',true);
                if (response.hcpInfo && response.hcpInfo.offers && response.hcpInfo.offers.length > 0) {
                    var needClaimeOffer = checkHCPOfferDate(response);
                    if (needClaimeOffer) {
                        updateClaimHCPOffers();
                    } else {
                        window.location.href = oasisOffersPage;
                    }
                } else {
                    window.location.href = oasisOffersPage;
                }
            } else {
                overlayLoader.hide();
                templatePara.html(dataGenValue);
                templateBody.show();
                htmlBody.animate({ scrollTop: 0 }, "slow")
            }
        }
    });
}

function checkHCPOfferDate(response) {
    let needClaimeOffer = false;
    response.hcpInfo && response.hcpInfo.offers.forEach(offer => {
        if (!offer.offerClaimDate || offer.offerClaimDate === "undefined" || offer.offerClaimDate === null) {
            needClaimeOffer = true;
        }
    });
    return needClaimeOffer;
}

function updateClaimHCPOffers() {
    var formData = { "category": "claimOffers" };
    formData = JSON.stringify(formData);
    jQuery.ajax({
        url: document.getElementById("update-profile-info").value,
        method: "POST",
        headers: {
            "content-type": appJson,
            "x-country-code": "US",
            "x-application-id": "similac",
            "x-preferred-language": "en-US",
            "x-id-token": ABBOTT.utils.getSessionInfo()
        },
        data: formData,
        beforeSend: function() {
            overlayLoader.show();
        },
        success: function(updateProfile) {
            if (updateProfile.errorCode === 0 && updateProfile.status === true) {
                window.location.href = oasisOffersPage;
            } else {
                overlayLoader.hide();
                templatePara.html(dataGenValue);
                templateBody.show();
                htmlBody.animate({ scrollTop: 0 }, "slow");
            }
        }
    });
}

