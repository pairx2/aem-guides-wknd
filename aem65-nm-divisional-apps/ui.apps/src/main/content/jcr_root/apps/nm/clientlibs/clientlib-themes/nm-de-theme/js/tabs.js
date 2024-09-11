/* tab active code for page load and click */
function focusOnTab(linkUrl) {
    var tabIndex = linkUrl.slice(-1);    
    var indexNumber = parseInt(tabIndex);
    if(indexNumber > 0 && indexNumber < 9) {
        if($('.a-tabs').length > 0) {
            var $tabList = $('.a-tabs .cmp-tabs__tablist .cmp-tabs__tab');
            var $tabContent = $('.a-tabs .a-tabs__content .a-tabs__tab-pane');
            $tabList.removeClass('cmp-tabs__tab--active show active').attr('aria-selected', false);
            $tabList.eq(tabIndex - 1).addClass('cmp-tabs__tab--active show active').attr('aria-selected', true);
            $tabContent.removeClass('a-tabs__tabpane--active active').attr('aria-hidden', true);
            $tabContent.eq(tabIndex - 1).addClass('a-tabs__tabpane--active active').removeAttr('aria-hidden');
            var $stickyHeader = $('.o-header-v2-global__sticky-section');
            var headerHeight = $stickyHeader.attr('data-sticky') === 'true' ? $stickyHeader.height() + 30 : 30;
            $('html, body').animate({ scrollTop: $('.a-tabs').offset().top - headerHeight + 'px'});
        } 
    }       
}

$(document).ready(function() {
    $('#tab-interlink-1, #tab-interlink-2, #tab-interlink-3, #tab-interlink-4, #tab-interlink-5').on('click', function() {
        var linkUrl = $(this).attr('href');
        focusOnTab(linkUrl);
    });
});

$(window).on('load', function() {
    if(window.location.hash) {
        var pageUrl = window.location.href;
        $('html, body').animate({ scrollTop: '20px'}, 10);
        setTimeout(function () {
            focusOnTab(pageUrl); 
        },200)   
    }
});