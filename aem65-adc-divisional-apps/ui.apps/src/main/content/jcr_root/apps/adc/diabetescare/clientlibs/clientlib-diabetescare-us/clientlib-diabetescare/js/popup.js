$(document).ready(function () {
    $('.o-footer__social-media ul a, .a-megamenu--adc-mobile-social ul li a').on('click', function () {

        $('#siteLeavingPopupFragmentPathModal').show();
        $("#siteLeavingPopupFragmentPathModal").parent().append("<div class='modal-backdrop show'></div>");
        $("#siteLeavingPopupFragmentPathModal").addClass('adc_social_modal');
        $('.modal-backdrop').show();
        $('#section-adc-site-leaving-popup-content .a-btn_yes a.btn').attr('href', $(this).attr('href'));

        $('.adc_social_modal').find('.a-container__content').show();
    });

    $('body').on('click', '.adc_social_modal .a-btn_yes', function () {
        $(this).parents('.adc_social_modal').hide();
        $('.modal-backdrop').hide();
        $("#siteLeavingPopupFragmentPathModal").removeClass('adc_social_modal');
    });

    $('body').on('click', '.adc_social_modal .a-btn_no', function () {
        $(this).parents('.adc_social_modal').hide();
        $('.modal-backdrop').hide();
        $("#siteLeavingPopupFragmentPathModal").removeClass('adc_social_modal');
    });


    $('body').on('click', '.adc_social_modal .generic-modal--close', function () {
        $(this).parents('.adc_social_modal').hide();
        $('.modal-backdrop').hide();
        $("#siteLeavingPopupFragmentPathModal").removeClass('adc_social_modal');
    });


    /*Flag image popup*/

    $('.dtc-country-info-container .product-section-image').on('click', function () {
        $('#siteLeavingPopupFragmentPathModal').show();
        $("#siteLeavingPopupFragmentPathModal").parent().append("<div class='modal-backdrop show'></div>");
        $("#siteLeavingPopupFragmentPathModal").addClass('flag_img_popup');
        $('.modal-backdrop').show();

        $('.flag_img_popup').find('.a-container__content').hide();
        $('.flag_img_popup').find('.a-container__media .a-container__image').append('<img src="" alt="product photo" class="img-responsive" style="max-width: 80%;">');
        $('.flag_img_popup').find('.a-container__media__mobile').append('<img src="" alt="product photo" class="img-responsive" style="max-width: 80%;display: block;text-align: center;">');
        $('.flag_img_popup').find('.generic-modal--close').append('<span class="close-txt">CLOSE</span>');
    });



    $('body').on('click', '.flag_img_popup .generic-modal--close', function () {
        $(this).find('.close-txt').remove();
        $(this).parents('.flag_img_popup').find('.a-container__media .a-container__image img').remove();
        $(this).parents('.flag_img_popup').find('.a-container__media__mobile img').remove();
        $(this).parents('.flag_img_popup').hide();
        $('.modal-backdrop').hide();
        $("#siteLeavingPopupFragmentPathModal").removeClass('flag_img_popup');
    });

});