$(function () {
    $('.m-hero').each(function() {

        var heightVal = $(this).find('.no-gutters').height();
        if($(this).hasClass('m-hero--bglight') && $(this).hasClass('m-hero--auto-height')) {
            $(this).height(heightVal);
            $(this).find('.m-hero__media').height(heightVal);
            if($(window).width() < 1023) { 
                var marTop = parseInt($(this).find('.m-hero__content').css("margin-top").replace('px', ''));
                var marBtm = parseInt($(this).find('.m-hero__content').css("margin-bottom").replace('px', ''));
                var contentHeight = $(this).find('.m-hero__content').height();
                var padTop = parseInt($(this).find('.m-hero__content').css("padding-top").replace('px', ''));
                var padBtm = parseInt($(this).find('.m-hero__content').css("padding-bottom").replace('px', ''));
                var heightValue = marBtm + marTop + contentHeight + padTop + padBtm;
                $(this).height(heightValue);
                $(this).find('.m-hero__media').height(heightValue);
            } else {
                $(this).height(heightVal);
                $(this).find('.m-hero__media').height(heightVal);
            }
        }

        if($(window).width() < 512 && $(this).hasClass('m-hero--image-position')) {
            $(this).height(heightVal);
        }
    });
});