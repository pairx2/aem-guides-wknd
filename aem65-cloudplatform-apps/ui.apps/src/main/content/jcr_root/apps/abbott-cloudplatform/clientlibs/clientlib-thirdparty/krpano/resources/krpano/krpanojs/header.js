/**********************************
header
**********************************/

$(document).ready(function () {

    if ($('.header .o-header-v2-global__sticky-section').length && isOnPublish()) {
        const pathName = window.location.pathname;
        $('.header .o-header-v2-global__sticky-section .o-header-v2-global__section--utility-bottom .linkstack .m-link-stack--header a').each(function () {
            if ($(this).attr('href') === pathName || $(this).attr('href').includes(pathName)) {
                $(this).addClass('a-link--active');
            }
        })
    }
});

