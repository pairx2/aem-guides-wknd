/**********************************
Footer Component
**********************************/
$(document).ready(function () {
    // JS to identify an empty link and append a class to it.

    if ($('.footer .a-link__text').length > 0 && isOnPublish()) {
        $('.footer .a-link__text').each(function () {
            const linkText = $(this).text();
            const hrefAttrVal = $(this).attr('href');
            if (!linkText && !hrefAttrVal) {
                $(this).parent().addClass('a-link--empty');
            }
        });
    }
    $('.m-social-media--icons li').each(function(){
        if($(this).find('.abt-icon-podcast').length > 0){
            $(this).find('a').addClass('abt-icon-podcast-container');
        }
        if($(this).find('.abt-icon-facebook-white').length > 0){
            $(this).find('a').addClass('abt-icon-facebook-white-container');
        }
        if($(this).find('.abt-icon-facebook-white1').length > 0){
            $(this).find('a').addClass('abt-icon-facebook-white1-container');
        }
    });
})