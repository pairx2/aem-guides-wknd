$(document).ready(function(){
    $('a#selectedValue').click(function(){
        $('.dropdown-menu').toggle();
        
    });
    const pagePath = window.location.pathname;
    if(pagePath == '/' || pagePath == '/home.html'){
        $("body").addClass("homePage");
    }
    $("#section-ppc_container_for_filter").parent().addClass("pageSearchFilter");

    //clear filter in search page
    if (sessionStorage.getItem('FilterArray') !== null) {
        sessionStorage.removeItem('FilterArray');
    }
    if (sessionStorage.getItem('SortByOrder') !== null) {
        sessionStorage.removeItem('SortByOrder');
    }
    if (sessionStorage.getItem('QueryValue') !== null) {
        sessionStorage.removeItem('QueryValue');
    }    
    
});
$('.sort-dropdown-item').click(function(){
    $('#menuItem').hide();
})

//Search filter accordion

$(function () {
	$('.m-search-category__view-all').hide(); // hide view all/less link on page load

	//loop throguh each cateogry
    $('.m-search-category__header').each(function() {
        let dataName = $(this).attr('data-category-name');
        let filterListBox =  `[data-field-name="${dataName}"]`;

 

	    $(filterListBox).hide(); // hide all the filter items
        $(this).addClass('facet-collapsed btmBorder');
		//setting icons for the each ctagory
        $(this).append('<span class="expandIcon"><em class="abt-icon abt-icon-plus"> </em></span>');  
        $(this).on('click', function() {
			let catAttrName = $(this).attr('data-category-name');
        	let toggleCategory =  `[data-field-name="${catAttrName}"]`;
            if($(this).hasClass('facet-collapsed')) {
				$(this).removeClass('facet-collapsed');
                $(this).addClass('facet-expanded');
				$(this).append('<span class="collapsedIcon"><em class="abt-icon abt-icon-minus"> </em></span>');
                $(this).find('.expandIcon').addClass('d-none');
                $(toggleCategory).find('.faq-link').find('.a-checkbox').show();
				$(toggleCategory).find('.faq-link.search-category-item').show();
				$(toggleCategory).find('.faq-link.search-category-item:nth-of-type(1n + 4)').show();
                $(toggleCategory).show();
            } else {
				$(this).addClass('facet-collapsed');
				$(this).find('.collapsedIcon').addClass('d-none');
                $(this).find('.expandIcon').removeClass('d-none');
                $(this).removeClass('facet-expanded');
                $(toggleCategory).hide();
            }

 

        });
    });
});
