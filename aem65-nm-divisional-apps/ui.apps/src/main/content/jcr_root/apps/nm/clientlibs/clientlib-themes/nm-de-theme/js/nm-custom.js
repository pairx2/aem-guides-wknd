$(document).ready(function() {  
    $(document).on('click', '.a-pagination__page:not(.a-pagination--active) .a-pagination__link:not(.no-click)', function() {
        var $stickyHeader = $('.o-header-v2-global__sticky-section');
        var headerHeight = $stickyHeader.attr('data-sticky') === 'true' ? $stickyHeader.height() + 30 : 30;
        
        /* pagination click event scroll to top for search results page*/  
        if($('.o-search-res__container').length > 0) {
            setTimeout(function() {
            let searchBoxTop = $('.o-search-res__container').offset().top;
            $('html, body').animate({ scrollTop: searchBoxTop - headerHeight + 'px'});
            },100)
        }
    }).on('click', '#isi-show-more', function() {
        $(this).closest('.isi-section').addClass('isi-auto-height');
        $(this).hide();
    });
});

/* script for after window load */
$(window).on('load', function() {
	$('.color-text-gray').parent('li').addClass('color-text-gray');
    $('.font-12').parent('li').addClass('font-12');
    $('.font-14').parent('li').addClass('font-14');
    $('.disclaimer-text').parent('li').addClass('disclaimer-text');
    $('.check-green').parent('li').addClass('check-green');     
    var $heroContainer = $('#pageContent > .root > .aem-Grid > div:first-child.container.a-container');
    if($heroContainer.length) {
        if($heroContainer.find('.m-tile-list')) {
            $heroContainer.addClass('container-hide-image-mobile');
            if($heroContainer.find('.a-tile--medium').length > 0) {
                $heroContainer.addClass('pink-bg-title-mobile');
            }
        }
    }
    if($('table').length > 0) {
        let tableTextComp = $('table').closest('.cmp-text');
        if(tableTextComp) {
            tableTextComp.css({'width': '100%','overflow':'auto'});
        } 
    }
    $("#pageContent a").each(function() {
		if($(this).attr('href')) {
            var linkUrl = $(this).attr('href');
            var tabIndex = linkUrl.slice(-3);
            if(tabIndex === 'pdf') {
                $(this).attr('download', 'true');
            }
		}
	});
});
