function wrapContentFragmentItem(id) {
    if ($(id).length < 1) { return; }

    let targetLink = $(id).find('.cmp-contentfragment .cmp-contentfragment__element-value p a');

    targetLink.each(function() {
        let pagePath = $(this).attr('href');
        let target = $(this).attr('target') || '';
        let alt = $(this).attr('alt') || '';

        if (pagePath) {
			$(this).parents('.cmp-contentfragment').wrapInner('<a href="'+pagePath+'" target="'+target+'" alt="'+alt+'"></a>');
        }
    });
}

function hidePagination() {
	let pagination = $('.m-pagination-static__links');

    pagination.each(function() {
    	let page = $(this).find('.paginationjs-page');
        if (page.length <= 1) {
            // Hide pagination if only one page
            $(this).hide();
        }
    }) 
}

function removeSpacing() {
	let targetEl = $('.cmp-contentfragment');
    targetEl.html(function(_i,h){
        return h.replace(/&nbsp;/g,'');
    });
}

$(document).ready(function () {
    removeSpacing();
    wrapContentFragmentItem('#ph-latest-products');
    wrapContentFragmentItem('#ph-all-products');
   	wrapContentFragmentItem('#ph-column-control-article');
    wrapContentFragmentItem('#ph-related-products');
});

$(window).on('load', function() { 
    setTimeout(function() {
  		hidePagination();
    }, 500);
});