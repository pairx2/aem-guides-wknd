/**
 * SEARCH RESULTS - COMPONENT
**/

$(function () {
  /**Reset card height in Faq search result carousel - Start**/
  if (window.innerWidth >= 767) {
    const faqSearchPage = document.querySelector('[data-search-type="faqsearch"]');

    function resetCardHeight() {
      if (faqSearchPage != null) {
        $('.o-cards-carousel [data-js-component="card"]>.o-features-card').each(function () {
          $(this).closest('[data-js-component="card"]').css('height', 'auto')
        })
      }
    }
    setTimeout(function () { resetCardHeight(); }, 300);
  }
  /**Reset card height in Faq search result carousel - End**/
});
