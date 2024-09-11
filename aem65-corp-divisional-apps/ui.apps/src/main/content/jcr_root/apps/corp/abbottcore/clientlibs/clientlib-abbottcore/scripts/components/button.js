/**********************************
Button component
**********************************/

$(document).ready(function () {
    /* Scroll to top section */
    if ($('.btn--top-to-page').length && isOnPublish()) {
        $('.btn--top-to-page').on('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
