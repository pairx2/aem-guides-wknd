
/*common*/
$("#section-slider").parent().addClass('mw-100');
$("#section-slider .button, #choose-transformation-wrapper .button, #architect-wrapper .button").addClass('explore-btn-blue');
$("#section-personalized-wrapper, #section-choose-transformation-wrapper, #section-our-products-wrapper, #section-architect-wrapper").parent().addClass('mt-10 mb-10 w-75');
$("#section-personalized-wrapper .columncontrol .button").addClass('explore-btn-blue');
/*choose wrapper*/
$("#choose-wrapper").parent().addClass('middle-title');

/*our products*/
$("#our-products-wrapper .title, #discover-wrapper .title, #personalized-wrapper .title").addClass('middle-title');
$("#our-products-wrapper .link").addClass('a-button--tertiary');

/*country selector*/

var windowWidth = $(window).width();

if(windowWidth < 992){
    $("#section-personalized-wrapper, #section-our-products-wrapper, #section-architect-wrapper").parent().removeClass('mt-10 mb-10 w-75');
    $("#section-personalized-wrapper, #section-choose-transformation-wrapper, #section-our-products-wrapper, #section-architect-wrapper").parent().addClass('align-middle');
    $("#section-choose-transformation-wrapper").parent().removeClass('mt-10 mb-10 w-75');
}


