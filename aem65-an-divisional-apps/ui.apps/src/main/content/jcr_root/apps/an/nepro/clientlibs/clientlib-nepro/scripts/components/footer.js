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
})