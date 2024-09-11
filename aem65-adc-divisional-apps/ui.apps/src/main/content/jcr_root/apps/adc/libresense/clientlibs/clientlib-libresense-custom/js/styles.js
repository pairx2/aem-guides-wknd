$(document).ready(function() {
    $(".m-hero:eq(0)").next().addClass("bkgd-grid-sec");
    if (location.pathname.indexOf("article.html") !== -1) {
      $("body").addClass("article-wrapper")
    }
    else if (location.pathname.indexOf("doc.html") !== -1) {
      $("body").addClass("doc-wrapper")
    }
    else if (location.pathname.indexOf("support.html") !== -1) {
      load_faq_section();
    }
});

window.onload = function () {
  prepareHeroBanner();
}
