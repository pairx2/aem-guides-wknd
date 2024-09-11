$(function () {
    //js to acheive 
    const currentPagePath = window.location.pathname;

    if ($('#flavors-section-1').length > 0 && isOnPublish()) {
        $('.m-card__media--bg--light').each(function () {
            const CardUrl = $(this).find('.m-card-link').attr('href');
            if (currentPagePath.indexOf(CardUrl) > -1) {
                $(this).addClass('active');
            }
        });
    }
});