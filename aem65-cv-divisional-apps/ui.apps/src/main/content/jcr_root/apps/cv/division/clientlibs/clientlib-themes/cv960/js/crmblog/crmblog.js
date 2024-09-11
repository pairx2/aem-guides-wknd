let crmViewItemList = document.querySelector('.o-search-res__results--view');
var observer = new MutationObserver(() => {
    crmCardViewURL();
    crmListViewURL();
    crmTitleURLOnCard();
});

if (crmViewItemList) {
    observer.observe(crmViewItemList, {
        childList: true
    });
}

function crmCardViewURL() {
    $(".a-card-result.a-card-result__cardrow").each(function () {
        var articleCardURLVal = $(this).find('.m-search-results__card-item-detail-articleurl .articleurl').text().trim();
        $(this).find('.m-search-results__card-item-detail-url a').attr('href', articleCardURLVal);
        if (articleCardURLVal.match("^/content")) {
            $(this).find('.m-search-results__card-item-detail-url a').attr('href', articleCardURLVal + '.html')
        }
    });
}

function crmListViewURL() {
    $(".a-list-result.a-list-result__listview").each(function () {
        var articleListURLVal = $(this).find('.m-search-results__list-item-detail-articleurl .articleurl').text().trim();
        $(this).find('.m-search-results__list-item-detail-url a').attr('href', articleListURLVal);
        if (articleListURLVal.match("^/content")) {
            $(this).find('.m-search-results__list-item-detail-url a').attr('href', articleListURLVal + '.html')
        }
    });
}

function crmTitleURLOnCard() {
    $(".a-card-result.a-card-result__cardrow").on( "click", function() {
        var urlValue = $(this).find(".m-search-results__card-item-detail-url a").attr("href");
        window.open(urlValue, '_blank')
        return false;
   });
}