/**********************************
Card Component
**********************************/
$(function () {
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
    if (window.matchMedia("(min-width: 992px)").matches) {
        $("#flavor-icon,#flavor-icon-1").parent().css({
            "width": "400px"
        });
    }
    if (window.matchMedia("(min-width: 768px) and (max-width:991px)").matches) {
        $("#flavor-icon,#flavor-icon-1").parent().css({
            "width": "352px"
        });
    }
})