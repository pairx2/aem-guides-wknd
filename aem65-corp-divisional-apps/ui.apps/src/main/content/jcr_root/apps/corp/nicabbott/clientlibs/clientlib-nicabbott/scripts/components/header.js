$(document).ready(function () {
    let headerSection = $('.o-header-v2-global__section--utility-top');
    if (isOnPublish()) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 0) {
                headerSection.addClass('o-header-v2-global__section--fixed');
            }
            else {
                headerSection.removeClass('o-header-v2-global__section--fixed');
            }
        });
    }
});