$(document).ready(function () {

    if ($('div[data-js-component="poi-locator"]').length > 0) {
        $('body').prepend('<div id="dividtoprint" class="container d-none"><div class="abbott-logo abbott-logo--print text-align-right"><img src="/etc.clientlibs/cv/division/clientlibs/clientlib-site/resources/images/print_abbott_vertical_sign.png" alt="Abbott-print-logo"/></div></div>');
    }

    /* Search button Active Inactive POI locator search bar */

    $(".search-button button").addClass('disabled');
    $("input.m-poi-locator-search-bar__input-field").keyup(function () {
        var searchInputVal = this.value;

        searchInputVal == '' ?
            $(".search-button button").addClass('disabled') :
            $(".search-button button").removeClass('disabled');
    });

});
/* ready function close*/

/* Scroll to Clinic name from map window to result list */

$(document).on('click', '.row-result-map .a-pin-icon-popup__item-box.hospital a', function (e) {
    e.preventDefault();
    var mapPopupName = $(this).attr('data-href');
    $(".m-poi-locator-results__list-item").each(function () {
        var resultListId = $(this).attr('data-locator-id');
        if (mapPopupName == resultListId) {
            var scrollTo = $(this).offset().top;
            $('html, body').animate({
                scrollTop: scrollTo - 140
            }, 'slow');
        }
    });

})

/* Hide Device Type when no data from ESL */

let resultList = document.querySelector('.m-poi-locator-results__list');
let paginationWrapper = document.querySelector('.pagination-wrapper');
var observer = new MutationObserver(() => {
    removeDeviceType();
    paginationClickOnScroll();
});


if (resultList) {
    observer.observe(resultList, {
        childList: true
    });
}

if (paginationWrapper) {
    observer.observe(paginationWrapper, {
        childList: true,
        subtree: true
    });
}

function removeDeviceType() {
    $(".m-poi-locator-results__list-item-detail .device.additional-fields div:nth-child(2)").each(function () {
        if ($(this).html().trim() == "") {
            $(".m-poi-locator-results__list-item-detail .device.additional-fields").addClass("d-none");
        }
    });

}

// Scroll to result count from pagination number and layout icons

function paginationClickOnScroll() {
    $(".pagination-wrapper").each(function () {
        var paginationNumber = $(this).find('.a-pagination a');
        var gridIcon = $(this).find('.grid-wrapper');
        var listIcon = $(this).find('.list-wrapper');
        paginationNumber.add(gridIcon).add(listIcon).on('click', function () {
            var resultCountSection = $(this).parents().find('.m-poi-locator-results__count');
            var scrollTo = resultCountSection.offset().top;
            $('html, body').animate({
                scrollTop: scrollTo - 140
            }, 'slow');
        });
    });
}