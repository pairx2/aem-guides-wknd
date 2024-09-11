$(document).ready(function() {
    let anchorHref = [];
    /*approach 1*/
    $('section.cmp-contentfragmentlist article.cmp-contentfragment').each(function(index) {
        anchorHref.push($(this).find('.cmp-contentfragment__element--contentdetailsreference .cmp-contentfragment__element-value').text().trim());
    });

    if (anchorHref) {

       	$('.a-contentfragmentlist--base article.cmp-contentfragment').each(function(index, value) {
			$(this).wrap(`<a class="article-anchor" href=${anchorHref[index]}></a>`);
        });
    }
    $('.a-contentfragmentlist--base.o-openlink--newtab a').attr('target','_blank');
    $(".a-contentfragmentlist--base").append(`<section class="paggination"><div class="pagination-holder"><span class="show-more-alig">Showing 1-<span class="article-maxlimit"></span> of <span class="article-totalcount"></span> </span>
    <span class="back-to-top">
    Back to Top
    </span>

    </div> <button class="load-more">Load More</button></section>`);

});
function displayMaxItems (items, maxItems) {
    $(".article-anchor").removeClass("d-none");
    window.remainingItems = items.length;
    window.remainingItemsToShow = window.totalItems;
    [].forEach.call(items, function(item, idx) {

        if (idx > maxItems - 1) {
            item.classList.add("d-none");
        }
    });
}

function displayPaginationText (articleTotal, maxItems) {
	$('.article-totalcount').text(articleTotal);
    $('.article-maxlimit').text(maxItems);

    if (articleTotal == maxItems) {
        $('.article-maxlimit').text(articleTotal);
    }
 	if (articleTotal < maxItems) {
        $('.article-maxlimit').text(articleTotal);
    }
}

function displayCheckboxSelectedItems (loadMoreClicked) {
    let counter = 0;
    $(".article-anchor").each(function (index, element) {
        let filterValue = $(this).find('.cmp-contentfragment__element--tagsType').find(".cmp-contentfragment__element-value");
        let filterValueString = filterValue[0].innerHTML.replace(/\s/g, "").split("<br>");
        if(filterValueString.some(item => window.category_list.includes(item))) {
            if(loadMoreClicked) {
                if($(element).hasClass('d-none')) {
                    counter = counter + 1;
                }
            } else {
                counter = counter + 1;
            }
            if (counter > window.maximumItems) {
                $(element).addClass('d-none');
            } else {
                $(element).removeClass('d-none');
            }
        } else {
            $(element).addClass('d-none');
        }
    });       
}

function displayLoadMoreButton (totalElements) {
    let loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        if(totalElements > window.maximumItems) {	
        	loadMoreBtn.style.display = 'block'; 
    	} else {
        	loadMoreBtn.style.display = 'none';
    	}
    }
}

function loadMoreButtonFunction(loadMoreBtn,maxItems,articleTotal) {    
    $('.load-more').click(function() {
        let remainderItems;
        let total;
        /* if no checkbox is selected */
        if (window.checkedBox === 0) {
            window.remainingItems = window.remainingItems - maxItems;
            remainderItems = window.remainingItems;
            total = articleTotal;

        } else {
			window.remainingItemsToShow = window.remainingItemsToShow - maxItems;
            remainderItems = window.remainingItemsToShow;
			total = window.totalItems;
        }

        if (remainderItems > maxItems) {
            $('.article-maxlimit').text((total-remainderItems)+maxItems);
        } else {
            $('.article-maxlimit').text(total);
            loadMoreBtn.style.display = 'none';
        }
        
        if (window.checkedBox === 0) {
            [].forEach.call(document.querySelectorAll('.article-anchor.d-none'), function(item, idx) {
                if (idx < maxItems) {
                    item.classList.remove("d-none");
                }
                if (document.querySelectorAll('.article-anchor.d-none').length === 0) {
                    loadMoreBtn.style.display = 'none';
                }
            });
            
        } else {
            displayCheckboxSelectedItems(true);        
        }
    });
}
function setCategoryList(category_list){
    
    $('.a-checkbox .a-checkbox__input').each(function() {
        if ($(this).prop('checked')) {
            category_list.push($(this).val())
        }
    });
}

function initShowCount(uniqueTagFilterItems) {
    for(const element1 of uniqueTagFilterItems) {
        countInArray(tagFilterItems,element1);
       }

      function countInArray(array,element1) {
        let count =0;
        for (const element2 of array) {
            if(element2 === element1) {
                count++
            }
        }
        let regExp = /\(([^)]+)\)/;
        let matches = regExp.exec($("input[type=checkbox][value='"+element+"']").prev('span').text());
        if(matches && matches.length > 1) {
            let text = $("input[type=checkbox][value='"+element+"']").prev('span').text();
            $("input[type=checkbox][value='"+element+"']").prev('span').text(text.replace(matches[1],count));
        }
        return count;
    }
}

/** SIte search with Content fragments **/
function removeFromResults(){
    setTimeout(function(){
        $('.a-result__title a:not(.a-result__title--link):not([aria-label*="href"])').each(function() {
            $(this).parents('.a-result__title').html($(this)[0])
        });
    }, 2000);
}

/**ARTICLE pagination **/
$(window).on('load', function() {
	$(".nav-link").click(function() {  
		$(this).parents('.m-mega-menu__mobile-item-wrapper').addClass( "active");
  	});
    let assetLibraryPage = document.querySelector('.a-contentfragmentlist--assetlibrary');
    let expertsPage = document.querySelector('.a-contentfragmentlist--expert');
    window.maximumItems = assetLibraryPage || expertsPage ? 9 : 10;
    window.totalItems = 0;
    window.remainingItemsToShow = 0;
    window.checkedBox = 0;
    window.category_list = [];
	let parent = document.querySelector('.cmp-contentfragmentlist');
    let items = parent ==null ? [] : parent.querySelectorAll('.article-anchor'),    
        loadMoreBtn = document.querySelector('.load-more'),
        maxItems = assetLibraryPage || expertsPage ? 9 : 10,
        articleTotal = items.length;
    window.remainingItems = articleTotal;
	displayPaginationText(articleTotal, maxItems);
	displayMaxItems(items, maxItems);

	/*remove all filter*/
    $("#removealfilter").click(function(){
    	$(".a-checkbox__input").prop('checked', false);
		displayMaxItems(items, maxItems);
        displayPaginationText(articleTotal, maxItems);
        displayLoadMoreButton(articleTotal);
        window.checkedBox = 0;

    });

    /* loadmore button visibility logic */
     displayLoadMoreButton(articleTotal);

	/*on click of load more button logic */
    loadMoreButtonFunction(loadMoreBtn,maxItems,articleTotal);

	//On click checkbox logic
    $('.o-form-option--base .checkbox').on('change',function() {
        let category_list = [];
		let checkedBox = $('.o-form-option--base .checkbox input[type="checkbox"]:checked');
		let totalItems = 0;
        let displayTotal;

        for (const element of checkedBox) {
            totalItems = totalItems + parseInt(element.labels[0].innerText.match(/(\d+)/)[0]);
        }
        window.totalItems = totalItems;
        window.remainingItemsToShow = window.totalItems;
        window.checkedBox = checkedBox.length;
        if(totalItems === 0 && checkedBox.length === 0) {
			displayTotal = articleTotal;
        } else {
            displayTotal = totalItems;
        }
        displayPaginationText(displayTotal, window.maximumItems);
        setCategoryList(category_list);
		window.category_list = category_list;
        displayLoadMoreButton(displayTotal);
		if(category_list.length == 0) {
			displayMaxItems(items, maxItems);
        } else {
            displayCheckboxSelectedItems(false);
		}
    })

    $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});

/*Case1: On page load check url and call removeFromResults*/
$(window).on('load', function(){
    let url = new URL(window.location.href);
    if(url.searchParams.has('search.html') || url.searchParams.has('searchresult.html') || url.searchParams.has('searchresult/')){
        removeFromResults();
    }
});

/*Case2: On Search Button Click*/
$('.m-search-bar__button .search-button .btn').on('click', removeFromResults);

/*Case3: On Focus Out*/
$('.a-searchbar--base input.m-search-bar__input-field').on('focusout', removeFromResults); 
    $('.a-result__title a:not(.a-result__title--link):not([aria-label*="href"])').each(function() {
    $(this).parents('.a-result__title').html($(this)[0])
});
/* ----- ARTICLE  TAG FILTER STARTS ----- */
$(document).ready(function() {
    let tagFilterItems = [];
    let uniqueTagFilterItems = [];

    let str1 = $(this).find('.cmp-contentfragment__element--tagsType').find(".cmp-contentfragment__element-value")
    for(const element of str1) {
        tagFilterItems.push(element.innerHTML.replace(/\s/g, "").split("<br>"));
    }
    tagFilterItems = tagFilterItems.concat.apply([],tagFilterItems);
	uniqueTagFilterItems = [...new Set(tagFilterItems)];

    initShowCount(uniqueTagFilterItems);
})
/* ----- Article TAG FILTER Ends----- */
