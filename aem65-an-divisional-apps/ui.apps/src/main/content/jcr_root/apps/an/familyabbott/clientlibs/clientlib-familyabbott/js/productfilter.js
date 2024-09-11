function setTags() {
    let container = $('#ph-all-products-filter');
	if($('#ph-container-with-tab').length) {
		container = $('#ph-container-with-tab');
	}
   let products = container.find('#ph-all-products .cmp-contentfragment, #ph-all-articles .cmp-contentfragment');

   if (container.length <= 0) {
       return;
   }

   products.each(function(){
       let product = $(this);
       let tagsEL = product.find('.cmp-contentfragment__element--tags');
       let tags = tagsEL.find('.cmp-contentfragment__element-value').html().trim().replace('&lt;','<').replace('&gt;','>')
       let tag = tags.split('<br>');
          product.attr('data-tags', tag);
   })
}

function createPaginationEl() {
    let container = $('#ph-all-products-filter');
	if($('#ph-container-with-tab').length) {
		container = $('#ph-container-with-tab');
	}
   let paginationEL = '<div class="custom-pagination"></div>';
   let currentPageEL = '<input type="hidden" id="current-page"/>';
   let showPerPage = '<input type="hidden" id="show-per-page"/>';
   container.find('.contentfragmentlist').each(function(){
	$(this).append(paginationEL, currentPageEL, showPerPage);
   });
}

function pagination(itemPerPage) {
   let products = $('#ph-all-products-filter');
	if($('#ph-container-with-tab').length) {
		products = $('#ph-container-with-tab');
	}
   products.find('.contentfragmentlist').each(function(){
		let customPagination = $(this).find('.custom-pagination');
		let showPerPage = itemPerPage;
	   let numberOfItems = $(this).find('.cmp-contentfragment.active').length;
	   let numberOfPages = Math.ceil(numberOfItems/showPerPage);
	   let navigationEl = '<a class="prev prev_link"" href="javascript:paginationPrevious();"></a>';
	   let currentLink = 0; 

	   $(this).find('#current-page').val(0);
	   $(this).find('#show-per-page').val(showPerPage);
	   navigationEl += '<ol>';

	   while(numberOfPages > currentLink){ 
		   if (currentLink == 0) {
			   navigationEl += '<li class="active"><a class="page_link" href="javascript:goToNewPage(' + currentLink +')" longdesc="' + currentLink +'">'+ (currentLink + 1) +'</a></li>';
		   } else {
			   navigationEl += '<li><a class="page_link" href="javascript:goToNewPage(' + currentLink +')" longdesc="' + currentLink +'">'+ (currentLink + 1) +'</a></li>';
		   }
		   currentLink++;
	   }

	   navigationEl += '</ol>';
	   navigationEl += '<a class="next next_link" href="javascript:paginationNext();"></a>';
	   customPagination.html(navigationEl);
	   customPagination.find('.page_link:first').addClass('active_page');
	   $(this).find('.cmp-contentfragment').css('display', 'none');
	   $(this).find('.cmp-contentfragment.active').slice(0, showPerPage).css('display', 'block');
   });
}

function paginationPrevious() {
   let newPage = parseInt($('#current-page').val()) - 1;
   if($('.custom-pagination .active').prev().find('.page_link').length){
       goToNewPage(newPage);
   }
}

function paginationNext() {
   let newPage = parseInt($('#current-page').val()) + 1;
   if($('.custom-pagination .active').next().find('.page_link').length){
       goToNewPage(newPage);
   }
}

function goToNewPage(pageNum){
    let showPerPage = parseInt($('#show-per-page').val());
    let startFrom = pageNum * showPerPage;
    let endOn = startFrom + showPerPage;
	let filterId;
	if($('#ph-container-with-tab').length) {
		filterId = $('#ph-container-with-tab');
		if($('#ph-container-with-tab').find(".options").length) {
			filterId = $('#ph-container-with-tab').find(".options");
		}
		let activePageLink = $('#ph-all-products');
		if($('#ph-all-articles').length) {
			activePageLink = $('#ph-all-articles');
		}
		showPerPage = parseInt(activePageLink.find('.a-tabs__content > .active #show-per-page').val());
		startFrom = pageNum * showPerPage;
		endOn = startFrom + showPerPage;
		$('#ph-all-products>.a-tabs__content>.active, #ph-all-articles>.a-tabs__content>.active').find('.cmp-contentfragment').css('display', 'none').slice(startFrom, endOn).css('display', 'block');
		activePageLink.find('.page_link[longdesc=' + pageNum +']').parent().addClass('active').siblings('.active').removeClass('active');
		activePageLink.find('.page_link[longdesc=' + pageNum +']').parent().prev().addClass('active-sibling').siblings('.active-sibling').removeClass('active-sibling');
		if (activePageLink.find('.page_link[longdesc=' + pageNum +']').parent().prev().length == 0) {
			activePageLink.find('.page_link[longdesc=' + pageNum +']').parent().siblings('.active-sibling').removeClass('active-sibling');
		}
		activePageLink.find('#current-page').val(pageNum);
	}
	else {
		filterId = $('#ph-all-products-filter');

        $('#ph-all-products, #ph-all-articles').children('.cmp-contentfragment').css('display', 'none');
        $('#ph-all-products, #ph-all-articles').children('.cmp-contentfragment.active').slice(startFrom, endOn).css('display', 'block')

		$('.page_link[longdesc=' + pageNum +']').parent().addClass('active').siblings('.active').removeClass('active');
		$('.page_link[longdesc=' + pageNum +']').parent().prev().addClass('active-sibling').siblings('.active-sibling').removeClass('active-sibling');
		
        if ($('.page_link[longdesc=' + pageNum +']').parent().prev().length == 0) {
			$('.page_link[longdesc=' + pageNum +']').parent().siblings('.active-sibling').removeClass('active-sibling');
		}
		$('#current-page').val(pageNum);
    }
    $('html,body').animate({
        scrollTop: filterId.offset().top - 150
    }, 500);
}

function getActiveFilter(options, activeFilter) {
    options.each(function() {
        if ($(this).hasClass('selected') && $(this).attr('data-optionvalue')) {
            let selectedOption = $(this).data('optionvalue').trim();
            activeFilter.push(selectedOption);
        }
    });
}
function filter(items, activeFilter) {
    if (items.length <= 0) {
        return; 
    }

    items.each(function() {
        let item = $(this);
        let tags = item.attr('data-tags').split(',');
        let matchedTime = 0;

        tags.forEach(function(i) {
            if (activeFilter.includes(i)) {
                matchedTime++;
            }
        })

        if (matchedTime >= activeFilter.length) {
            item.addClass('active');
        } else {
            item.removeClass('active');
        }
        
        if (activeFilter.length === 0) {
            item.addClass('active');
        }
    })
}
function fragmentListHasClassActive(){
    if($(this).closest(".contentfragmentlist").next().find(".cmp-text").hasClass("active")){
        $(this).closest(".contentfragmentlist").next().find(".cmp-text").removeClass("active");
    }
    if(!$(this).closest(".contentfragmentlist").next().find(".cmp-text p").hasClass("d-none")) {
        $(this).closest(".contentfragmentlist").next().find(".cmp-text p").addClass("d-none")
    }
}
function fragmentListAddClassActive(){
    $(this).closest(".contentfragmentlist").next().find(".cmp-text").addClass("active");
    if($(this).closest(".contentfragmentlist").next().find(".cmp-text p").hasClass("d-none")) {
        $(this).closest(".contentfragmentlist").next().find(".cmp-text p").removeClass("d-none")
    }
}
function contentFragmentListToggleClass(thisEle){
    if(thisEle.next().find('li').length <= 1)  {
        thisEle.next().removeClass('active');
    } else {
        thisEle.next().addClass('active');
    }
}

function productFilter() {
    let activeFilter = []; 
	let container = $('#ph-all-products-filter');
	if($('#ph-container-with-tab').length) {
		container = $('#ph-container-with-tab');
	}
	let options = container.find('.a-dropdown__menu li');
	let items = $('#ph-all-products-filter .cmp-contentfragment');
	if($('#ph-container-with-tab').length) {
		items = $('#ph-container-with-tab .cmp-contentfragment');
	}
   let isProducts = container.find('#ph-all-products').length; 
    let itemPerPage = (isProducts > 0) ? 8 : 6;   

   function onSelectFilter() {
       options.on('click', function() {
           activeFilter = [];
           setTimeout(function() {
               getActiveFilter(options, activeFilter);
               filter(items, activeFilter);
               pagination(itemPerPage);
               handleNoResult();
           }, 100);
       })
   }   

   function handleNoResult() {
       if (!items.hasClass('active')) {
           $('.custom-pagination').removeClass('active');
           $('#ph-all-products-filter-msg').addClass('active');
           return;
       }
		if($(".cmp-contentfragmentlist").length) {
			$(".cmp-contentfragmentlist").each(function(){
				if($(this).find(".cmp-contentfragment.active").length) {
					fragmentListHasClassActive();
				}
				else {
					fragmentListAddClassActive();
				}
				contentFragmentListToggleClass($(this))
			});
		}
       $('#ph-all-products-filter-msg').removeClass('active');
   }

   getActiveFilter(options, activeFilter); 
   onSelectFilter();
   filter(items, activeFilter);
   pagination(itemPerPage);
   handleNoResult();
}

function handleDropdown() {
   let container = $('#ph-all-products-filter');
	if($('#ph-container-with-tab').length) {
		container = $('#ph-container-with-tab');
	}
   let dropdown = container.find('.options');

   // Only one active dropdown at a time  
   dropdown.on('click', function() {
       $(this).siblings().find('.a-dropdown__field').removeClass('active');
   })
}

$(document).ready(function () {
   setTags();
   createPaginationEl();
   productFilter();
   handleDropdown();
});