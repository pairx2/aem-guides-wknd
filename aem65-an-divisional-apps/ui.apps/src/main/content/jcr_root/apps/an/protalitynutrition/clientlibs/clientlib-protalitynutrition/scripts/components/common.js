$(document).ready(function () {
    if (window.location.href.indexOf("/home") > -1 || isHomePage()) {
        const screenWidth = window.innerWidth | document.documentElement.clientWidth | document.body.clientWidth;
        if (screenWidth < 1024) {
            $('#section-dot-gradient-bottom').parent().hide();
            $('#section_hero-banner #title-h1').removeAttr('id');
            $('#section_hero-banner').parent().addClass('pb-0');
            $('#home-science-txt h2').css('text-align', 'left');
            $('#home-science-txt p').css('text-align', 'left');
        }
    }
    if (window.location.href.indexOf("/daily-nutrition") > -1) {
        $('#section_hero-banner').css({ "padding-left": "0.938rem", "padding-right": "0.938rem" });
        $('#section_hero-banner .m-hero__content').css({ "margin-left": "0" });
    }
    if (isMobileDevice()) {
        if (window.location.href.indexOf("/faq") > -1) {
            $('#section_hero-banner-faq #title-h1').removeAttr('id');
            $('#section_hero-banner-faq').parent().addClass('pb-0');
            $('#section-dot-gradient').parent().hide();
        }
        if (window.location.href.indexOf("/where-to-buy") > -1) {
            $('#section_hero-banner-where-to-buy #title-h1').removeAttr('id');
            $('#section_hero-banner-where-to-buy').parent().addClass('pb-0');
        }
        if (window.location.href.indexOf("/contact-us") > -1) {
            $('#section_hero-banner-contact #title-h1').removeAttr('id');
        }
    }
    //Add logic to remove id for screen width < 1024 
    if (window.innerWidth < 1024 && window.location.href.indexOf("/where-to-buy") > -1) {
        $('#section_hero-banner-where-to-buy #title-h1').removeAttr('id');
    }
    $("#section_nutrition_products").parent().addClass("hero_nutrition_products");
    $(".dotted-image-bottom").parent().addClass("dotted-image-bottom-container");
});

function isHomePage() {
    const pathName = window.location.pathname;
    return pathName === '/' || pathName === '';
}
$("#referenceConfirmEmailAddresss").keyup(function () {
    emailMatch();
});
$("#referenceEmailAddress").keyup(function () {
    emailMatch();
});
function emailMatch() {
    setTimeout(function () {
        let cEmailValidateReq = $("#referenceConfirmEmailAddresss").parents(".form-group").hasClass("validation-require");
        let cEmailValidateReg = $("#referenceConfirmEmailAddresss").parents(".form-group").hasClass("validation-regex");
        let email = $("#referenceEmailAddress").val();
        let cEmail = $("#referenceConfirmEmailAddresss").val();
        if (email !== cEmail && cEmail !== "" && !cEmailValidateReq && !cEmailValidateReg) {
            $("#referenceConfirmEmailAddresss").closest('.form-group').children(".a-input-field--text-error").css({ 'display': 'inline-block', 'margin-top': '12px' });
            $("#referenceConfirmEmailAddresss").closest('.form-group').addClass("validation-error");
        } else {
            $("#referenceConfirmEmailAddresss").closest('.form-group').children(".a-input-field--text-error").hide();
            $("#referenceConfirmEmailAddresss").closest('.form-group').removeClass("validation-error");
        }
    }, 50);
}
$("#protality_unsubscribe_form .form-group input").keyup(function () {
    unsubscribeValidation();
});
function unsubscribeValidation() {
    let state_array_un = [];
    $("#protality_unsubscribe_form .form-group input").each(function () {
        if ($(this).val() === "") {
            state_array_un.push("true");
        }
    });
    setTimeout(function () {
        if (state_array_un.length === 0 && $(".validation-require").length === 0 && $(".validation-regex").length === 0 && $(".validation-error").length === 0) {
            $("#unsubscribe_click").removeClass("disabled");
        } else {
            $("#unsubscribe_click").addClass("disabled");
        }
    }, 300);
}