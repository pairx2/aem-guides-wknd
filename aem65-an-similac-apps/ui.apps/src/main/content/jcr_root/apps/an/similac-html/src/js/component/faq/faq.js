var seletedFaqFilters = [];
var filterArr = [];
var filterItems = [];
var $selectedFilter;
var $faqSection = jQuery(".faq__section");
var accordion_header = ".accordion__header";
var $accordionHeader = jQuery(accordion_header);
var $searchFaqSimIcon = jQuery("#searchFaq .sim-icons");
var $accordion = jQuery(".accordion");

// check or uncheck the selected filter
function checkoruncheck(value, filterItems, ABBOTT) {
    filterItems.length && filterItems.forEach(function(filterItem){
        if (filterItem.hasClass("checked")) {
            filterItem.removeClass("checked");
            seletedFaqFilters = value.includes(filterItem.data().value) && seletedFaqFilters.filter(function(filter) {
                return filter !== filterItem.data().value;
            })
           
        } else {
            filterItem.addClass("checked");
            if (filterItem.data()) {
                var gtmValue = filterItem.data().gtmValue;
                ABBOTT.gtm.buildAndPush.formTracking('faq', 'click', gtmValue);
                seletedFaqFilters.push(filterItem.data().value);
            }
        }
    });
}
/**
 * Method called on changing the filters
 * @param {*} filterItems
 */
function showHideFilters(value, filterItems, ABBOTT) {
    checkoruncheck(value, filterItems, ABBOTT)
        // reset the applied filters tags
    jQuery(".faq .filtered-options__item-main").html("");
    // if no filters show default page
    if (seletedFaqFilters.length === 0) {
        $faqSection.addClass("show").show();
        $selectedFilter.addClass("d-none");
    } else {
        // when filters seleted show corresponding items and applied filters tags
        $faqSection.removeClass("show").hide();
        $selectedFilter.removeClass("d-none");
        seletedFaqFilters.forEach(function(item) {
            jQuery("#" + item)
                .addClass("show")
                .show();
            var selectedItem = window.faq_label[item];
            jQuery(
                "<div class='filtered-options__item'><span class='filtered-options__item--option-label'>" +
                selectedItem +
                "</span><span class='filtered-options__item--close-btn' data-value=" +
                item +
                ">×</span> </div>"
            ).appendTo(".filtered-options__item-main");
        });
    }
    // trigger search on each filter change
    $searchFaqSimIcon.trigger("click");
}
/**
 * Method called on search faq icon is clicked
 */
function showaccordions(term) {
    jQuery(".faq__section.show .accordion").mark(term, {
        done: function(count) {
            // total count of terms
            jQuery(".faq .faq__results-count").html(count);
        },
        each: function(el) {
            var ele = jQuery(el)
                .parents(".accordion")
                .find(accordion_header);
            if (ele.hasClass("collapsed")) {
                ele.click();
            }
        },
    });
}
$searchFaqSimIcon.on("click", function() {
    var term = jQuery("#faq-search").val();
    // based on the term show the accordions
    jQuery(".faq__section.show .accordion").show(term).unmark();
    $accordion
        .find(accordion_header)
        .not(".collapsed")
        .addClass("collapsed");
    $accordion.find(".accordion__body").removeClass("show");
    if (term) {
        showaccordions(term)
    } else {
        jQuery(".faq .faq__results-count").html("0");
    }
});
$accordionHeader.click(function(e) {
    var data = jQuery(this).data().gtm.split("_");
    if (jQuery(this).hasClass("collapsed")) {
        jQuery(this).attr("data-gtm", data[0] + "_expand");
        jQuery(this).data("gtm", data[0] + "_expand");
    } else {
        jQuery(this).attr("data-gtm", data[0] + "_collapse");
        jQuery(this).data("gtm", data[0] + "_collapse");
    }
});

/**
 * Method called on mobile filters collapse is clicked
 */
jQuery(".faq .filters__title1.d-md-none").click(function() {
    jQuery(".faq .filters__category").toggleClass("d-none");
    jQuery(".faq .add-white").toggleClass("d-none");
    jQuery(".faq .minus-white").toggleClass("d-none");
});

/**
 * Method to toggle filters category view
 */
jQuery(".faq .filters__title2").click(function() {
    jQuery(".filters__list").toggleClass("d-none");
    jQuery(this).toggleClass("filters__toggle");
});

/**
 * Method called on search faq on enter
 */
jQuery("#faq-search").keypress(function(e) {
    var key = e.which;
    if (key === 13) {
        // the enter key code
        e.preventDefault();
        $searchFaqSimIcon.trigger("click");
    }
});
/**
 * Method called on clear all option in applied filters is clicked
 */
jQuery(".faq .filtered-options__clear-all").click(function() {
    seletedFaqFilters = [];
    filterArr = [];
    filterItems = [];
    jQuery(".filters__checkbox").removeClass("checked");
    jQuery(".faq .filtered-options__item-main").html("");
    $selectedFilter.addClass("d-none");
    $faqSection.addClass("show").show();
    $searchFaqSimIcon.trigger("click");
});

function faqMajorFN(ABBOTT) {
    // check for mobile or desktop view filters
    $selectedFilter = (jQuery(window).width() < 768) ? jQuery(".filters__options-wrapper.mobile") : jQuery(".filters__options-wrapper.desktop");
    var URL = window.location.href.split("?")[1];
    // Get all querystring value
    const filterQuery = new URLSearchParams(location.search);
    for(var value of filterQuery.keys()) {
        filterArr.push(filterQuery.get(value));
    }
    if (URL) {
            filterArr.forEach(function(checkItem){
            filterItems.push(jQuery(".filters__checkbox[data-value=" + checkItem + "]"));
        });
        
        showHideFilters(filterArr, filterItems, ABBOTT);
    }
    /**
     * Method called on selecting the filters checkboxes
     */
    jQuery(".faq .filters__item").on("click", function() {
        let checkedItemArr = [], itemVal = [];
        var checkedItem = jQuery(this).find(".filters__checkbox");
        let item = checkedItem.data().value;
        checkedItemArr.push(checkedItem);
        itemVal.push(item);

         if(checkedItem.hasClass("checked")){
            //update array list
            let itemIndex = filterArr.indexOf(item);
            if(itemIndex > -1 ){
                filterArr.splice(itemIndex,1);
            }

            //update the Checkbox Node List
            filterItems = filterItems.filter((checkedNode) => {
                if(checkedNode.length >0){
                    return checkedNode[0].dataset.value !== item;
                }
            });
         }

        showHideFilters(itemVal, checkedItemArr, ABBOTT);
    });
    /**
     * Method called on applied filters close btn is clicked
     */
    jQuery("body").on(
        "click",
        ".faq .filtered-options__item--close-btn",
        function() {
            let item = jQuery(this).data().value;
            let itemList = [], filterItem = [];
            itemList.push(jQuery(this).data().value);
            filterItem.push(jQuery(".filters__checkbox[data-value=" + item + "]"));
            
            //update array list
            let itemIndex = filterArr.indexOf(item);
            if(itemIndex > -1 ){
                filterArr.splice(itemIndex,1);
            }
            //update the Checkbox Node List

            filterItems = filterItems.filter((checkedNode) => {
                if(checkedNode.length >0){
                    return checkedNode[0].dataset.value !== item;
                }
            });
            
            showHideFilters(itemList, filterItem, ABBOTT);
        }
    );
}
(function(win) {
    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    var ABBOTT = win.ABBOTT;
    ABBOTT.faq = (function() {
        faqMajorFN(ABBOTT)
    })();
})(window);

jQuery('.accordion__header').click(function(){
    if(jQuery(this).hasClass('collapsed')){
        jQuery(this).removeClass('collapsed')
        jQuery(this).next('.accordion__body').addClass('show');
    } else {
        jQuery(this).addClass('collapsed')
        jQuery(this).next('.accordion__body').removeClass('show');
    }
});