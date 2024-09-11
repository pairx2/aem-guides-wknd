$(function () {
    $('.m-search-category__header').each(function() {
        let dataName = $(this).attr('data-category-name');
        let loadCollap =  `[data-field-name="${dataName}"]`

	    $(loadCollap).addClass('d-none');
        $(this).addClass('inactive');
         $(".m-search-category").find(".m-search-category__section-heading:first").addClass('border-tophead');
         
        $(this).on('click', function() {
			let attrName = $(this).attr('data-category-name');
        	let clickCollap =  `[data-field-name="${attrName}"]` 
            if($(this).hasClass('inactive')) {
				$(this).removeClass('inactive');
                $(this).addClass('active');
                $(clickCollap).removeClass('d-none')
                 
            } else {
				$(this).addClass('inactive');
                $(this).removeClass('active');
                $(clickCollap).addClass('d-none')
            }

        });
    });
    if(window.outerWidth < 767) {
	   
        let productCat = $('#product-catalog').find('.m-search-category');
	    $(productCat).append('<button id="apply-cat" class=" btn btn-primary w-100 mt-5 m-searchfacet__apply-cat" > Apply </button>');
        
        $(document).on("click","#apply-cat",function() {
			$(this).closest('.searchfacet').css("display", "none");
        });
    }
});