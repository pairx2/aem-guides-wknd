/**********************************
Link component
**********************************/

$(function () {
    // Add 'active' class based on page URL
    if ($('.link-variation--edge-design').length > 0 && isOnPublish()) {
        const currentPagePath = window.location.pathname;
        $('.link-variation--edge-design').each(function () {
            let url = $(this).find('a').attr('href');
            (currentPagePath == url) && $(this).addClass('active');
        });
    }
});