/*country selector*/
$("#globe_language").parent().addClass('fixed-width');

/***** Offerings page specific ids and classes *****/
$("#brand-cards, #offering-cards, #diagnostic-panels").addClass("brand-thumbnails");
$("#section_offerings-hero-banner").parent(".m-hero").addClass("offerings-banner");


/*blue title*/
$("#title-blue").addClass("title-blue");

/* title with lower case text*/
$("#alinity-series .cmp-title").addClass("lower-case");
$("#featured-row-1").parent().addClass("margin-top-40");

/*Image*/
$("#Product_image").addClass("product-image-wrapper");

/*image order 1*/
$(".a-container--secondary .columncontrol__column .image--align-center, .a-container--secondary .columncontrol__column .image--align-right,  .columncontrol__column .image--align-left").parent().addClass('order-one');

/*Multiple image container*/
$("#section-multiple-image-banner, #section-multiple-image-banner-ci").parent(".container").addClass("multiple-image-container");

/*Architect*/
$("#architect-unified-img").parent(".image").addClass("remove-bottom-margin");
$("#architect-product-carousal").parent(".o-hero-carousel").addClass("remove-left-margin");
$("#architect-product-carousal-1").parent(".o-hero-carousel").addClass("remove-left-margin");
$("#section-segments-full-width-container").parents(".container").addClass("add-max-width");

/*Aliniq page related Changes*/
$("#aliniq-explore-cards, #aliniq-key-elements").addClass("aliniq-cards");
$("#aliniq-expert").parent(".title").addClass("aliniq-expert");

/*Aliniq ams related Changes*/
$("#section-aliniq-ams-banner").addClass("smallerBanner");

/*alinity subtext*/
$("#section-alinity-c sub").addClass("sub-text");
$("#section-sub-text, #section-alinity-c").parent().addClass('pt-pb-0');

/* Aliniq Always On*/
$("#instrumental-health").addClass("fourCoulmn-with-number-text");
$("#section-dedicated-ambassador").addClass("columnControl-with-icon-text");
$("#section-column-control-with-text").addClass("column-control-with-text");
$("#section_alwayson-offers-banner").parent(".m-hero--tall").addClass("alwayson-offers-banner");
$("#section_increased-up-time").parent(".m-hero--tall").addClass("increased-uptime-banner");
$("#section_what-is-always-on").parent(".m-hero--tall").addClass("what-is-alwayson-banner");
$("#section-service-contract").parent(".container").addClass("service-contract");
$("#section_aliniq-always-banner").parent(".m-hero").addClass("alwayson-main-banner");
$("#section_alwayson-offers-banner, #section_aliniq-alwayson-hero-banner").parent(".m-hero").addClass("mob-ht-auto");


// knowledge center
$("#section_m-hero-video-banner").parent(".m-hero--medium").addClass("height-auto");
$("#section-m-hero-video-content,#section-clinical-diagnostics").parent(".container").addClass("kc-custom-banner");
$("#section_m-hero-banner-industry-experts,#section_m-hero-banner-critical-education").parent(".m-hero--medium").addClass("banner-custom-height");
$('#section-clinical-diagnostics').parent(".container-full-width").addClass("maximum-width");
$('#section-advance-resources').parent(".container-full-width").addClass("maximum-width custom-padding");
$('#tabs-knowledge-centre').closest(".container-full-width").addClass("maximum-width custom-padding");
$('#section-browse-all-learninkg-guides').closest(".container-full-width").addClass("padding-none");
$('#section_m-hero-banner-thought-leadership').closest(".m-hero").addClass("custom-height");


// banner-content border
$('#section_m-hero-banner-industry-experts').parent('.m-hero').addClass('m-hero-content-border');
$('#section_m-hero-banner-critical-education').parent('.m-hero').addClass('m-hero-content-border');

$("#unified-card-content").parent().parents(".m-card").addClass("card-unified");
$("#section_acidbase-herobanner").parent().addClass("acid-base-banner");

/*Aliniq ims related Changes*/
$("#section-aliniq-ims-herobanner").addClass("smallerBanner");
$("#section-aliniq-bis-herobanner").addClass("smallerBanner-im");


/*Aliniq instrument manager related Changes*/


$("#unified-card-content").parent().parents(".m-card").addClass("card-unified");
$("#section_acidbase-herobanner").parent().addClass("acid-base-banner");

// video popup - large

$(document).on('click', '[data-toggle="modal"]', function(e) {
    setTimeout(function() {
        $('.m-video--large').closest(".modal-dialog").addClass("modal-xl");
    }, 100);
});

// infectious disease
$("#section_m-hero-banner-sars-cov").parent(".m-hero--medium").addClass("margin-none");


// Lab performance
$('#section_m-hero-banner-labperform').parent('.m-hero').addClass('banner-tall-height');

/*Aliniq preanalytics related Changes*/
$("#section-aliniq-pre-analytics-banner").addClass("mediumBanner");
$("#section-references-copyright").parent(".container").addClass("referencesCopyright");

$("#accelerator-a3600-card").parents(".m-card").addClass("card-a3600-width");
/*diabetics*/
$("#diabetes-guide").parent().parents(".m-card").addClass("guide-diabetes");
/* hematology blue image */
let hemBlueImg = $('#section-hematology-container--columncontrol .a-container__image img').attr('src');
$("#section-hematology-container--columncontrol").parent().css("background-image", "url(" + hemBlueImg + ")");
$("#section-hematology-container--columncontrol").parent().addClass("pl-0 pr-0");
$("#tabs-btn").parents(".button").addClass("mb-0");
$("#download-btn").parents(".button").addClass("mb-0");
/*immunoassay page related classes*/
$("#section-immunoassay-us-banner").parent(".container").addClass("immunoassay-us-banner");

/*cardiac page*/

let cardiac = $('#section_cardiac-banner-with-button .m-hero__media img').attr('src');
$("#section_cardiac-banner-with-button").parent().css("background-image", "url(" + cardiac + ")");

$('#section_cardiac-banner-with-button').parent('.m-hero').addClass('banner-cariac-height');

/*GLP systems page related classes*/
$("#section-glp-freedom-banner").addClass("glp-img-txt-banner bg-blue");
$("#section-glp-simplicity-banner").addClass("glp-img-txt-banner bg-green");
$("#section-glp-excellence-banner").addClass("glp-img-txt-banner bg-grey");
$("#section-glp-video-banner1, #section-glp-carousel-one").addClass("bg-blue");
$("#section-glp-video-banner1, #section-glp-video-banner2, #section-glp-video-banner3").addClass("pt-4 pb-3 glp-video-banner");
$("#section-glp-video-banner2").addClass("bg-green");
$("#section-glp-video-banner3").addClass("bg-grey");
/*GLP systems page related classes*/
$("#section-glp-freedom-banner").addClass("glp-img-txt-banner bg-blue");
$("#section-glp-simplicity-banner").addClass("glp-img-txt-banner bg-green");
$("#section-glp-video-banner1").addClass("bg-blue");

/* cell dyn hematology contactus image */
let contactUsImg = $('#section-cell-dyn-contact-support .a-container__image img').attr('src');
$("#section-cell-dyn-contact-support").parent().css("background-image", "url(" + contactUsImg + ")");
let contactImg = $('#section-celldyn-contact-support .a-container__image img').attr('src');
$("#section-celldyn-contact-support").parent().css("background-image", "url(" + contactImg + ")");
let celldynContactImg = $('#section-celldyn-contact-support-de .a-container__image img').attr('src');
$("#section-celldyn-contact-support-de").parent().css("background-image", "url(" + celldynContactImg + ")");

$("#section-glp-excellence-banner").addClass("glp-img-txt-banner bg-grey");
$("#section-glp-video-banner1, #section-glp-carousel-one").addClass("bg-blue");
$("#section-glp-video-banner1, #section-glp-video-banner2, #section-glp-video-banner3").addClass("pt-4 pb-3 glp-video-banner");
$("#section-glp-video-banner2").addClass("bg-green");
$("#section-glp-video-banner3").addClass("bg-grey");

//back to top
$(window).on('load scroll', function() {
    if ($(window).scrollTop() > 60) {
        $('#back-to-top').css('visibility', 'visible');
        $('#end-to-end').css('visibility', 'visible');
    } else {
        $('#back-to-top').css('visibility', 'hidden');
        $('#end-to-end').css('visibility', 'hidden');
    }
    var pageContainerRect = $('#pageContent>.responsivegrid')[0].getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var buttonPosRight = windowWidth - pageContainerRect.right - 0.5;

    if (pageContainerRect.bottom < windowHeight) {
        $('#back-to-top').addClass('pos-absolute');
        $('#end-to-end').addClass('pos-absolute');
    } else {
        $('#back-to-top').removeClass('pos-absolute').css('right', buttonPosRight + 'px');
        $('#end-to-end').removeClass('pos-absolute').css('right', buttonPosRight + 'px');
    }
});
$('#back-to-top').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});


var hrefVal = $("#end-to-end").attr('href');
$("#end-to-end").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(hrefVal).offset().top - 110
    }, 2000);
});

/*alinity main bg*/
let alinityBannerImg = $('#section-multiple-image-banner .a-container__image img').attr('src');
$("#section-multiple-image-banner").parent().css("background-image", "url(" + alinityBannerImg + ")");

/*alinity ci main bg*/
let alinityCiBannerImg = $('#section-multiple-image-banner-ci .a-container__media .a-container__image img').attr('src');
$("#section-multiple-image-banner-ci").parent().css("background-image", "url(" + alinityCiBannerImg + ")");

$("#section-glp-excellence-banner").addClass("glp-img-txt-banner bg-grey");
$("#section-glp-video-banner1, #section-glp-carousel-one").addClass("bg-blue");
$("#section-glp-video-banner1, #section-glp-video-banner2, #section-glp-video-banner3").addClass("pt-4 pb-3 glp-video-banner");
$("#section-glp-video-banner2, #section-glp-carousel-two").addClass("bg-green");
$("#section-glp-video-banner3, #section-glp-carousel-three").addClass("bg-grey");
$("#section-glp-carousel-one, #section-glp-carousel-two, #section-glp-carousel-three").addClass("glp-carousel");

let hematologyImg = $('#section-hematology .a-container__image img').attr('src');
$("#section-hematology").parent().css("background-image", "url(" + hematologyImg + ")");
/* liver-disease bg img */
$("#section-liver-disease").parent().addClass("pr-0 pl-0");

/* brain-injury bg img */
$("#section-brain-injury-current-tools").parent().addClass("pr-0 pl-0");
$("#section-find-out-more").parent().addClass("pr-0 pl-0");

/* genral chemistry  img*/
$("#unified-approach-img").parent(".image").addClass("remove-bottom-margin");

/* Cell-dyn-Emerald */
$("#Celldyn-Emerald22").addClass("cell-dyn-Emerald-herobnr");
$("#Celldyn-Emerald22-AL, #cell-dyn-Ruby-pid, #cell-dyn-sapphire-pid").addClass("cell-dyn-Emerald-herobnr");
$("#six-sigma-instrument-design-cc1").parent().addClass("remove-column-bot-spacing");
$("#section-Tabs-emerald-sec").parent().addClass("emerald-tab-desk-mt");
$("#section_clinical-int-lets-talk-bnr").parent().addClass("mt-0 mmb-0");
$("#fr-tab-contact-desc").closest("h1").addClass("t-mb-5");

$("#section_unify-care-banner").parent(".m-hero").addClass("mob-ht-auto");

$('.m-accordion__header').click(function() {
    var a = $(this).children('.m-accordion__icon-wrapper').children('.m-accordion-toggle').attr('data-toggle');
    if (a == 'expand') {
        $(this).parents('.m-accordion__content-items').addClass('accordionTitlebackground');
    } else {
        $(this).parents('.m-accordion__content-items').removeClass('accordionTitlebackground');
    }
});
$('#back-to-top').parent('.text').addClass('pt-5 dpb-60');
//  solid banner background
$('.cmp-image__image').each(function() {
    var imageSrc = $(this).attr('src');
    if (!imageSrc) {
        $(this).addClass('cmp-image__no-image');
    }
});

$("#infectious-virus-column-control").closest(".columncontrol-full-width").addClass("mt-0 mpt-40");
$("#infectious-disease-history").closest(".a-container").addClass("pb-0 pt-0");
$("#reference-column .columncontrol__column").addClass("mmb-0");
$("#learn-more-column-control").closest(".columncontrol-full-width").addClass("mmb-0");
$("#infectious-disease-history .title.text-center").addClass("mmt-0");
$("#section_find-out-more-banner .m-hero__header").addClass("dmb-0");
$("#section-accurate-reflection").closest(".container-full-width").addClass("m-w-95");
$("#webinars-wrapper .columncontrol .image").addClass("mb-3");
$("#alinity-pro-video").parent('.m-popup').addClass("mt-16 mmb-40");
$('#organ-transplant').parent('.columncontrol-full-width').addClass('pt-4');
$('#section-cardiac-troponin .a-container__content section .a-container__content .cmp-container .columncontrol .container .row .col-12 .m-card').on('click', function(e) {
    if(e.originalEvent && !$(e.target).hasClass('m-card__body')) {
        $(this).find('.m-card__body').click();
    }
});


(function($) {
    function intUSPage() {

        var urlLink = window.location.pathname;
        var stuff = urlLink.split('/');
        var domain = 'us';
        var usDomain = 0;

        for (var i = 0; i < stuff.length; i++) {
            if (stuff[i].includes(domain)) {
                usDomain = 1
                break;
            }
        }
        if (usDomain == 1) {
            $("#architect-c16200-table").addClass("border-bottom-0");
            $("#architect-c8200-table").addClass("border-bottom-0");
            $("#architect-ci4100-table").addClass("border-bottom-0");

        }
    }
    $(document).ready(function() {
        intUSPage();
    });
})(jQuery);