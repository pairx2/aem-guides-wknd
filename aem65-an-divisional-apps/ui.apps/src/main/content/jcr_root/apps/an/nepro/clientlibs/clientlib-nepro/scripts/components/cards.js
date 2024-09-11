/**********************************
Card Component
**********************************/
$(document).ready(function () {
    //js to acheive 
    const currentPagePath = window.location.pathname;

    if ($('.m-card-flavours-variation').length > 0 && isOnPublish()) {
        $('.m-card-flavours-variation').each(function () {
            const CardUrl = $(this).find('.m-card-link').attr('href');
            if (CardUrl.indexOf(currentPagePath) > -1) {
                $(this).addClass('active');
            }
        });
    }
})