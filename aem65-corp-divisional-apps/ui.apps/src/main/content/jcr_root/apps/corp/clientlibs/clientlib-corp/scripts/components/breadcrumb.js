$(document).ready(function () {
    if (isOnPublish()) {
        if ($('.abbott-breadcrumb.abbott-breadcrumb__fixed').length) {
            const headerHeight = $(".o-header").length ? $(".o-header").offset().top : 0;
            const headerStickyHeight = window.matchMedia("only screen and (max-width: 991.98px)").matches ? ($('.o-header__sticky-section').height() || 0) : ($('.o-header .o-header__wrapper').height() || 0);
            const breadCrumbStyles = {
                top: headerStickyHeight
            }

            const breadcrumbHeight = $('.abbott-breadcrumb.abbott-breadcrumb__fixed .container').outerHeight();
            $('.abbott-breadcrumb.abbott-breadcrumb__fixed').css('height', breadcrumbHeight);
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > headerHeight) {
                    $('.abbott-breadcrumb.abbott-breadcrumb__fixed .container').css(breadCrumbStyles);
                }
                else {
                    $('.abbott-breadcrumb.abbott-breadcrumb__fixed .container').removeAttr('style');
                }
            });
        }
    }
});