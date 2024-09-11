$(document).ready(function () {
  setTimeout(() => {
    let spinner = $(".a-spinner:first")?.clone()[0];
    if (spinner) {
      $("#article-detail-section .o-search-res__container")?.append(spinner);
    }
  }, 100);

  let productId = document.getElementById("relatedproducts");
  if (productId != null) {
    checkRelatedProductTag();
  }
  let articleTag = document.getElementById("article-detail-section");
  if (articleTag != null) {
    checkArticleProductTag();
  }

  function checkArticleProductTag() {
    let articletag = document.getElementById("article-detail-section");
    let articleTagVal = articletag.querySelector(".a-list-result");
    if (articleTagVal != null) {
      updateArticleSearchResult();
      setTimeout(function () {
        $(
          "#article-detail-section .o-search-res__container .a-spinner"
        ).removeClass("d-none");
      }, 100);
      updateArticleSearchResult();
    } else {
      setTimeout(function () {
        checkArticleProductTag();
      }, 100);
    }
  }
 
  function checkRelatedProductTag() {
    let productIdVal = document.getElementById("relatedproducts");
    let productTags = productIdVal.querySelector(".a-card-result");

    if (productTags != null) {  
      updateSiteSearchResult();
    } else {      
      setTimeout(function () {
        checkRelatedProductTag();
      }, 100);
    }
  }

  function updateSiteSearchResult() {
    setTimeout(function () {
    $("#relatedproducts")
      .find(".o-search-res__container .col-md-9")
      .removeClass("col-md-9")
      .addClass("col-md-12");
    $("#relatedproducts")
      .find(".o-search-res__container .a-card-result.col-md-4")
      .removeClass("col-md-4")
      .addClass("col-md-6");
    $("#relatedproducts")
      .find(".o-search-res__container .a-card-result.col-lg-4")
      .removeClass("col-lg-4")
      .addClass("col-lg-3");
    $("#relatedproducts").find(".a-pagination").addClass("hide-inherit");
    $("#relatedproducts")
      .find(".a-card-result")
      .each(function () {
          if($(this).find(".product-wrap").length==0){ 
            let head = $(this).find(".a-card-result__image");
            let parag = $(this).find(".a-card-result__title");
            let releatedTitle = $(parag).html();
            let releatedTitle_lowercase = releatedTitle.replaceAll("i-STAT","<span class='nonCapitalised'>i-STAT</span>");
            $(parag).html(releatedTitle_lowercase);
            let parag1 = $(this).find(".a-card-result__description");
            let parag2 = $(this).find("p");
            let aTag = $(this).find(".a-card-result__link");
            let aTagTitleText = $(aTag).html();
            let aTagTitleText_lowercase = aTagTitleText.replaceAll("i-STAT","<span class='nonCapitalised'>i-STAT</span>");
            $(aTag).html(aTagTitleText_lowercase);
            let wrap = head.add(parag).add(parag1).add(parag2).add(aTag);
            wrap.wrapAll('<div class="product-wrap"></div>');
          }
      });
      checkRelatedProductTag();  
    }, 500);
  }
    
  function updateArticleSearchResult() {
    setTimeout(function () {
    $("#article-detail-section")
      .find(".o-search-res__container .col-md-9")
      .removeClass("col-md-9")
      .addClass("col-md-12");
    $("#article-detail-section")
      .find(".o-search-res__container .a-card-result.col-md-4")
      .removeClass("col-md-4")
      .addClass("col-md-6");
    $("#article-detail-section")
      .find(".o-search-res__container .a-card-result.col-lg-4")
      .removeClass("col-lg-4")
      .addClass("col-lg-3");
    $("#article-detail-section").find(".a-pagination").addClass("hide-inherit");
    $("#article-detail-section")
      .find(".a-card-result")
      .each(function () {
        let head = $(this).find(".a-card-result__image");
        let parag = $(this).find(".a-card-result__title");
        let parag1 = $(this).find(".a-card-result__description");
        let parag2 = $(this).find("p");
        let aTag = $(this).find(".a-card-result__link");
        let wrap = head.add(parag).add(parag1).add(parag2).add(aTag);
        wrap.wrapAll('<div class="product-wrap"></div>');
      });
    }, 700);
    setTimeout(function () {
      $("#article-detail-section .o-search-res__container .a-spinner").addClass(
        "d-none"
      );
    }, 800);
  }
});