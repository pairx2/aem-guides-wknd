$(document).ready(function () {
    let disclaimerSection = $('.o-footer__disclaimer-section');
    if (isOnPublish()) {
        if (disclaimerSection.children().length <= 0) {
            // Span the copyright to 100% when disclaimer text is not authored
            disclaimerSection.parent().hide().next().removeClass("col-lg-6").addClass("col-lg-12");
        }

        // Make the link stack options match the desktop in tablet viewport
        $('.o-footer__link-wrapper').addClass('col-md-3');
    }
});