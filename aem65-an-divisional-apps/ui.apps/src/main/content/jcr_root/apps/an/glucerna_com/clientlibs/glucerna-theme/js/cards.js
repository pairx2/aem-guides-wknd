
$(document).ready(function(){
    //js to acheive 
    const currentPagePath = window.location.pathname;

    if ($('#flavors-section-1').length > 0 && isOnPublish()) {
        $('.m-card__media--bg--light').each(function () {
            const CardUrl = $(this).find('.m-card-link').attr('href');
            if (CardUrl.indexOf(currentPagePath) > -1) {
                $(this).addClass('active-card');
            }
        });
    }
setTimeout(function(){$('.m-card .m-card__media .cmp-image__image').on('click', function() {
    if ($(this).closest('.m-card').find('.m-popup').length > 0) {
       $(this).closest('.m-card').find('.m-card__body .m-popup').trigger('click');
    }
});},1000)
});
