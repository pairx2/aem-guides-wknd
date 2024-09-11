$(function () {

    let bannerFullHeightRequired = $('#bannerFullHeightRequired').val();

    if ($('#tips-for-protality').length) {
        $('#tips-for-protality').closest('.container').css({ 'padding': '0px' });
    }
    if ($('#section-hide--container').length) {
        $('#section-hide--container').closest('.container').addClass("hide--container");
    }
    if ($('#section_doc-brand-prod-section').length) {
        $('#section_doc-brand-prod-section').closest('.container').css({ 'padding-left': '0px', 'padding-right': '0px' });
    }
    handleStyling_6();
    handleStyling_2();
    handleStyling_1();
    handleStyling_5();
    if ($('#section-financial-incentives').length) {
        $('#section-financial-incentives').closest('.text').css({ 'margin': '0px' });
    }

    if ($('#faq-title').length) {
        $('#faq-title').closest('.text').css({ 'margin-bottom': '12px' });
    }

    if ($('#section-unsubscribe-text').length) {
        $('#section-unsubscribe-text').closest('.container').css({ 'padding-top': '0px', 'padding-bottom': '0px' });
    }

    if ($('#home-note').length) {
        $('#home-note').closest('.container').css({ 'padding-bottom': '0px' });
    }
    if ((bannerFullHeightRequired !== 'true') && (window.location.href.indexOf("home") === -1) && !(window.location.href.endsWith(".com/")) && window.matchMedia("(min-width: 1025px)").matches) {
        $('.m-hero').css({ 'height': '300px' });
    }
    handleStyling_3();
    handleStyling_4();
});

function handleStyling_1() {
    if (window.matchMedia("(min-width: 768px)").matches) {
        $('#section_daily-nutrition-prod-section').closest('.cmp-container').css({ 'max-width': '100%', 'padding': '0px' });
    }
    if (window.matchMedia("(max-width: 768px)").matches) {
        $('#section_daily-nutrition-prod-section').closest('.container').css({ 'padding-top': '0px' });
    }
    if ($('#section-price-spider-section').length) {
        $('#section-price-spider-section').closest('.container').css({ 'padding-left': '0px', 'padding-right': '0px' });
    }
    if (window.matchMedia("(max-width: 768px)").matches) {
        if ($('#section_hero-daily-nutrition').length) {
            $('#section_hero-daily-nutrition').closest('.m-hero').css({ 'padding-bottom': '0px' });
        }
    }
    if (window.location.href.indexOf("sign-up") !== -1) {
        $('.m-hero').addClass('sign-up-styles');
    }
    if ($('#pedialyte_registration_form_container').length) {
        $('#pedialyte_registration_form_container').closest('.container').css({ 'padding-top': '20px' });
    }
    if ($('#forms_referenceEmail').length) {
        $('#forms_referenceEmail').closest('.fields.text').css({ 'height': 'auto' });
    }
    if ($('#section-pedialyte_registration_notice').length) {
        $('#section-pedialyte_registration_notice').closest('.container').css({ 'display': 'none' });
    }

    if ($('#section_home-prod-section').length) {
        $('#section_home-prod-section').closest('.productsection').css({ 'margin-bottom': '20px' });
    }
    if ($('#pdp-footnote').length) {
        $('#pdp-footnote').closest('.text').css({ 'margin-top': '0px' });
    }
    if ($('#button_see_your_protality_meal_plan_click').length) {
        $('#button_see_your_protality_meal_plan_click').closest('.button').css({ 'margin-top': '20px', 'margin-bottom': '20px' });
    }
}

function handleStyling_2() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        if ($('#section-protality-image').length) {
            $('#section-protality-image').closest('.container').css({ 'margin-bottom': '10px', 'padding': '10px 0px 15px 0px' });
        }
        if ($('#section_protein-section').length) {
            $('#section_protein-section').closest('.productsection ').css({ 'margin-bottom': '15px' });
        }
        if ($('#nutrition-txt').length) {
            $('#nutrition-txt').closest('.text ').css({ 'margin-bottom': '0px' });
        }
        let imageContent = $('#pd-pro-show .image').detach();
        $('#pd-pro-show #pdp-title').after(imageContent);

        if ($('#section-contact-us-container').length) {
            $('#section-contact-us-container').closest('.container').css({ 'padding': '0px' });
        }

        if ($('#section_hero-banner-where-to-buy').length) {
            $('#section_hero-banner-where-to-buy').closest('.m-hero').css({ 'padding': '0px' });
        }
    }
}

function handleStyling_3() {
    if (window.matchMedia("(min-width: 1025px)").matches) {
        if ($('#section-protality-image').length) {
            $('#section-protality-image').closest('.container').css({ 'padding-right': '0px', 'padding-left': '0px' });
        }
        if ($('#section-pd-pro-show').length) {
            $('#section-pd-pro-show').closest('.container').css({ 'padding-right': '0px', 'padding-left': '0px' });
        }
        if ($('.video').length) {
            $('.video').closest('.container').css({ 'padding-right': '0px', 'padding-left': '0px' });
        }
        if ($('#section_hero-banner').length) {
            $('#section_hero-banner').closest('.m-hero').css({ 'height': 'auto' });
        }
        if ($('#section-science-section').length) {
            $('#section-science-section').closest('.container').css({ 'padding': '32px 0px 30px 0px' });
        }
    }
    if (window.matchMedia("(min-width: 1300px)").matches) {
        if ($('#section_hero-banner').length) {
            $('#section_hero-banner').closest('.m-hero').css({ 'height': '680px' });
        }
    }
}

function handleStyling_4() {
    if (window.matchMedia("(min-width: 2800px)").matches) {
        if ($('#section-science-section').length) {
            $('#section-science-section').closest('.container').css({ 'padding': '40px 0px 40px 0px' });
        }
    }
    $('.m-accordian--base .m-accordion__header').on("click", function () {
        let val = $(this).find('.m-accordion__icon-wrapper').attr('aria-expanded');
        setTimeout(() => {

            if (val == "false") {
                $(this).parents('.m-accordion__content-items').addClass('bg-color');
                $(this).siblings('.m-accordion__body').addClass('show');
            }
            if (val == "true") {
                $(this).parents('.m-accordion__content-items').removeClass('bg-color');
                $(this).siblings('.m-accordion__body').removeClass('show');
            }

        }, 0);
    });
    $(".m-accordion__expand-title").on("click", function (e) {
        $(".m-accordian--base .cmp-accordion >.m-accordion__content >.m-accordion__content-items").each(function (i, el) {
            if (!$(el).hasClass('bg-color')) {
                $(el).addClass('bg-color');
            }
        })
    });

    $(".m-accordion__collapse-title").on("click", function (e) {
        $(".m-accordian--base .cmp-accordion >.m-accordion__content >.m-accordion__content-items").each(function (i, el) {
            if ($(el).hasClass('bg-color')) {
                $(el).removeClass('bg-color');
            }
        });
    });
}

function handleStyling_5() {
    if (window.matchMedia("(max-width: 992px)").matches) {
        if ($('#section-contact-container').length) {
            $('#section-contact-container').closest('.container').css({ 'padding-top': '0px' });
        }
        if ($('#section-unsubscribe-heading').length) {
            $('#section-unsubscribe-heading').closest('.container').css({ 'padding-bottom': '0px' });
        }
    }
    if (window.matchMedia("(max-width: 768px)").matches) {
        if ($('#section-protality-nutrients').length) {
            $('#section-protality-nutrients').closest('.container').css({ 'padding': '8px 0px' });
        }
        if ($('#section_hero-banner-why-protality').length) {
            $('#section_hero-banner-why-protality').closest('.m-hero').css({ 'padding-bottom': '12px' });
        }
    }
}

function handleStyling_6() {
    if ($('#section-sign-up-cont').length) {
        $('#section-sign-up-cont').closest('.container').css({ 'padding': '0px' });
    }
    if ($('#section-dot-gradient').length) {
        $('#section-dot-gradient').closest('.container').addClass("hide--container");
    }
    if ($('#section-dot-gradient-bottom').length) {
        $('#section-dot-gradient-bottom').closest('.container').addClass("hide--container");
    }
    if ($('#section_hero-banner-sign-up').length) {
        $('#section_hero-banner-sign-up').closest('.m-hero').css({ 'padding': '0px' });
    }
}

/** space removal before price spider in where-to-buy page */
if (window.location.href.indexOf("/where-to-buy") > -1) {
    $('#where-to-buy-title').parent().css('margin-bottom', 0)
}