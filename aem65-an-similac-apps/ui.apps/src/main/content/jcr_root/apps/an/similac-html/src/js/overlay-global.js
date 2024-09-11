var appJson = "application/json";
var regexSelector = ".a-input-field--text-regex";
var requiredSelector = ".a-input-field--text-require";
var loiginContainer = jQuery('.loginContainer');
var errorMessage = jQuery('.errorMessage');
var edit_cart = jQuery('#editCart');
var checkout_cart = jQuery('#checkoutCart');
var minicartContainer = jQuery('.minicart-container');
jQuery(document).ready(function() {
    var loginSection =
        "<div>" +
        '<form action="#" class="similac-form">' +
        "<h4>" +
        "<span>Hi! Thanks for stopping by.</span>" +
        "</h4>" +
        "<p><span>Sign in to your Similac<sup>®</sup> StrongMoms<sup>®</sup> Rewards account to check your points balance or to update your profile information.</span> </p>" +
        "<p><span>Log in with 1-click by using an existing online profile.</span> </p>" +
        "<div>" +
        '<p class="errorMessage"></p>' +
        '<fieldset class="form-group similac-form-group">' +
        '<div id="SocialLoginDivSamplesID"></div></fieldset>' +
        "</div>" +
        '<div class="divider "><span>OR</span></div>' +
        '<fieldset class="form-group similac-form-group isBlured" id="emailField">' +
        '<label for="react-form-field-loginID" class="similac-label-floating">Email Address*</label>' +
        '<input type="email" class="form-control " id="loginId" name="loginID" required=""  maxlength="64" value=""'+
        'data-regex="/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/">' +
        '<span class="input-icon "></span>' +
        '<span class="form-text a-input-field--text-require ">Email Address is required.</span>' +
        '<span class="form-text a-input-field--text-regex">Email Address must contain a valid email address, e.g. "name@server.com".</span></fieldset>' +
        '<fieldset class="form-group similac-form-group isBlured"  id="passwordField">' +
        '<label for="react-form-field-password" class="similac-label-floating">Password*</label>' +
        '<input type="password" class="form-control " id="password-login" name="password" required=""  maxlength="64" value=""'+
        'data-regex="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$/">' +
        '<span class="input-icon clickable">' +
        '<svg viewBox="0 0 100 100" class="sim-icon ">' +
        '<use href="#icon-show"></use>' +
        "</svg>" +
        '</span><span class="form-text a-input-field--text-require">Password is required.</span>' +
        '<span class="form-text a-input-field--text-regex">One upper case and one lower case letter,' +
        'a number, and a special character. A minimum of eight characters must be used for a valid password combination.</span></fieldset>' +
        '<fieldset class="form-group similac-form-group"><button type="button" id="siteSubmit" class="btn btn-primary btn col-lg-12 col-md-12 col-sm-12">' +
        'SIGN IN</button></fieldset>' +
        '<fieldset class="form-group similac-form-group"><a href="/strongmoms/admin/forgot-password.html" class="">Forgot Your Password?</a></fieldset>' +
        '<fieldset class="form-group similac-form-group">' +
        '<div class="form-check checkbox-container">' +
        '<span class="checkbox-wrapper"><label for="react-form-field-rememberme">' +
        '<input type="checkbox" name="rememberme" id="react-form-field-rememberme" class="form-check-input" value="true">' +
        '<span class="checkbox-inner" aria-hidden="true" role="presentation"></span></label>' +
        '</span><label class="form-check-label" for="react-form-field-rememberme"><b>Remember Me</b></label></div></fieldset>' +
        "<p><span>Do not check this box if you're using a public computer.</span> </p>" +
        '<h4 class="mt-1_875"><span>Not a Member Yet?</span> </h4>' +
        "<p><span>Experience the benefits of Similac<sup>®</sup> StrongMoms<sup>®</sup> Rewards. All the benefits of membership are only a few minutes away.</span> </p>" +
        '<fieldset class="form-group similac-form-group"><a href="/strongmoms.html" class="btn  btn btn-secondary col-lg-12 col-md-12 col-sm-12">SIGN UP</a></fieldset>' +
        "</form>" +
        "</div>";

    jQuery('#mini-cart .cart').prepend('<div class="minicart-logo__badge oasis-minicart"></div>');

    jQuery("#loginPopup").append(loginSection);
    ABBOTT.socialLogin("", "SocialLoginDivSamplesID", onLogin, onError);


    jQuery('.login .sim-icons').click(function(e) {
        loiginContainer.toggle();
        e.stopPropagation();
    })
    jQuery(".login ").find("div").first().click(function() {
        loiginContainer.toggle();
    })
    jQuery('#siteSubmit').click(function(e) {
        siteLogin(e);
    })

    loiginContainer.click(function(e) {
        e.stopPropagation();
    });

    jQuery('body').click(function(e) {
        loiginContainer.hide();
    });


    jQuery("#passwordField .input-icon").click(function() {
        var password_input = jQuery("#passwordField input");
        (password_input.attr("type") === "password") ? password_input.attr("type", "text"): password_input.attr("type", "password");

    })

    jQuery('.similac-form input').blur(function() {
        var input_value = jQuery(this).val();
        var email_pattern = new RegExp(jQuery('#loginId').data('regex'));
        var pass_pattern = new RegExp(jQuery('#password-login').data('regex'));
        if (!input_value) {
            jQuery(this).siblings(regexSelector).hide();
            jQuery(this).siblings(requiredSelector).show();
        } else {

            if (jQuery(this).attr('name') === "loginID" && !email_pattern.test(input_value)) {
                jQuery(this).siblings(requiredSelector).hide();
                jQuery(this).siblings(regexSelector).show();
            } else if (jQuery(this).attr('name') === "password" && !pass_pattern.test(input_value)) {
                jQuery(this).siblings(regexSelector).show();
                jQuery(this).siblings(requiredSelector).hide();
            } else {
                jQuery(this).siblings(requiredSelector).hide();
                jQuery(this).siblings(regexSelector).hide();
            }
        }
    })

    // mini-cart Overlay
    var minicartSection =
        '<div class="minicart-container">' +
        '<div class="minicart">' +
        '<div class="minicart-header"><span class="minicart-header-title">My Cart</span><span class="minicart-close">Close</span></div>' +
        '<div class="minicart-message"><span></span><br></div>' +
        '<div class="minicart-products">' +
        '<ul class="minicart-products-list list-unstyled">' +
        '<div class="minicart-empty">' +
        '<p class="minicart-empty__title">You have no items in your shopping cart.</p>' +
        '<p class="d-none fieldLoader-initial mb-4 mt-4">' +
        '<div class="field-loader field-loader-addtocart-call" style="display: none;">' +
        '<div class="bullet-wrap">' +
        '<div class="bullet b-1"></div>' +
        '<div class="bullet b-2"></div>' +
        '<div class="bullet b-3"></div>' +
        "</div>" +
        "</div>" +
        "</p>" +
        '<a href="/products.html" class="btn btn-primary">SHOP SIMILAC PRODUCTS</a>' +
        "</div>" +
        "</ul>" +
        '<div class="col-auto mr-auto field-level-loader ">' +
        '<div class="field-loader field-loader-addtocart-call" style="display: none;">' +
        '<div class="bullet-wrap">' +
        '<div class="bullet b-1"></div>' +
        '<div class="bullet b-2"></div>' +
        '<div class="bullet b-3"></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="minicart-footer">' +
        '<div class="minicart-footer-subtotal">' +
        '<div><span class="minicart-footer-subtotal-label subtotal_label">Subtotal</span><span class="minicart-footer-subtotal-price subtotal"></span></div>' +
        '<div><span class="minicart-footer-subtotal-label discount_label">Discount <span class="minicart-footer-subtotal-label-sub"></span></span>' +
        '<span class="minicart-footer-subtotal-price discount"></span></div>' +
        '<div><span class="minicart-footer-subtotal-label totalprice_label">Order Total</span><span class="minicart-footer-subtotal-price totalprice"></span></div>' +
        "</div>" +
       `<div class="goto-cart"><a href="${edit_cart}" alt="Goto cart">View/Edit Cart</a></div>` +
        `<div class="checkout"><a class="btn btn-primary" href="${checkout_cart}">Checkout</a></div>` +
        "</div>" +
        "</div>" +
        "</div>";
    jQuery(".cart").append(minicartSection);
    jQuery('.cart .sim-icons').click(function(e) {
      minicartContainer.toggle();
        e.stopPropagation();
    })
    jQuery('.minicart-close').click(function(e) {
      minicartContainer.toggle();
        e.stopPropagation();
    })

});

function onLoginIdentifierExists(e) {
    const { response: { regToken = "", id_token = "", loginID = "" } = {} } = e;
    if (window.sessionStorage) {
        sessionStorage.setItem("regToken", regToken);
        sessionStorage.setItem("id_token", id_token);
        sessionStorage.setItem("loginID", loginID);
        sessionStorage.setItem("provider", this.state.provider);
        window.location.href = jQuery("#accountLinkingURL").val();
    } else {
        window.location.href = jQuery("#accountLinkingURL").val();
    }
}

function onAccountRegistrationPending(e) {
    window.location.href = jQuery("#registrationURL").val();
}

function onError() {
    const { errorCode } = e;
    switch (errorCode) {
        case "403043":
            onLoginIdentifierExists(e);
            break;
        case "206001":
        default:
            onAccountRegistrationPending(e);
    }
}

function onLogin(e) {
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

function siteLogin(e) {

    e.preventDefault();
    var formData = { "loginID": jQuery("#loginId").val(), "password": jQuery("#password-login").val(), "captchaAccountId": window.btoa(jQuery("#loginId").val()), "captchaAction":"login" };
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
                errorMessage.html("");
                getProfileInfo(response.accountInfo.profile, response.accountInfo.UID);
            } else {
                errorMessage.html(response.statusReason);
            }
        }
    });
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
                errorMessage.html("");
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
                window.location.href = "/account/profile.html";
            } else {
                hideFormOnError();
            }
        }
    });
}


function hideFormOnError() {
    templatePara.html(dataValue);
    templateBody.show();
    htmlBody.animate({ scrollTop: 0 }, "slow");
    columnControl.hide();
    topText.hide();
    formContainer.hide();
    bottomConatiner.hide();
    window.sessionStorage.removeItem("oasisEmail");
    return false;
}

jQuery("a#pampersPrivacyLink").click(function(e){
    e.preventDefault();
    console.log("pampers link clicked");
    var c=window.setInterval(function(){
        if(jQuery(".swal-overlay").length>0){
            jQuery(".swal-overlay").removeClass("swal-overlay--show-modal");
            window.clearInterval(c)
        }
        },100);
})