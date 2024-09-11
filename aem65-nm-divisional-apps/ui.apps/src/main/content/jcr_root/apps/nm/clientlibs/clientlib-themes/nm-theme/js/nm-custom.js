$(document).ready(function() {  
    $(document).on('click', '.a-pagination__page:not(.a-pagination--active) .a-pagination__link:not(.no-click)', function() {
        var $stickyHeader = $('.o-header-v2-global__sticky-section');
        var headerHeight = $stickyHeader.attr('data-sticky') === 'true' ? $stickyHeader.height() + 30 : 30;
        /* pagination click event scroll to top for POI Locator*/  
        if($('.m-poi-locator-results__list').length > 0) {
            $('html, body').animate({ scrollTop: $('.m-poi-locator-results__list').offset().top - headerHeight + 'px'});
        }
        /* pagination click event scroll to top for search results page*/  
        else if($('.o-search-res__container').length > 0) {
            setTimeout(function() {
            let searchBoxTop = $('.o-search-res__container').offset().top;
            $('html, body').animate({ scrollTop: searchBoxTop - headerHeight + 'px'});
            },100)
        }
    });
});
/* script for after window load */
$(window).on('load', function() {
	$('.color-text-gray').parent('li').addClass('color-text-gray');
    $('.font-12').parent('li').addClass('font-12');
    $('.font-14').parent('li').addClass('font-14');
    $('.disclaimer-text').parent('li').addClass('disclaimer-text');
    $('.check-green').parent('li').addClass('check-green');
    $('#therapy-type-options').parents('.container').addClass('therapy-type-container');    
    $('#mobile-only-link-1').closest('li').addClass('menu-divider-mob');
});
