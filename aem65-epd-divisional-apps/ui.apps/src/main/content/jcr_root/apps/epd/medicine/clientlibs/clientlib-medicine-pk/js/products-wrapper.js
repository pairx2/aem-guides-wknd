$(document).ready(function () {
  var path = window.location.pathname;

  if (path.includes("/index/")) {
    addProductWrapper();
  }
  if (path.includes("/womens-health.html")) {
    addProductWrapper();
  }
  if (path.includes("/optiletsM.html")) {
    addProductWrapper();
  }
  if (path.includes("/menstrual-health.html")) {
    addProductWrapper();
  }
  if (path.includes("/mosquito-related-diseases.html")) {
    addProductWrapper();
  }
  if (path.includes("/healthy-tips.html")) {
    addProductWrapper();
  }
  if (path.includes("/products/")) {
    addProductWrapper();
  }
  if (path.includes("/product-category/")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }
  if (path.includes("/contact-us.html")) {
    addProductWrapper();
  }
  if (path.includes("/product-category.html")) {
    addProductWrapper();
  }
  if (path.includes("/cofloz.html")) {
    addProductWrapper();
  }
  if (path.includes("/abocran.html")) {
    addProductWrapper();
  }
  if (path.includes("/mospel.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }

  if (path.includes("/otc-product.html")) {
    updateBreadcrumbWhite();
  }
  if (path.includes("/abocain_spinal.html")) {
    updateBreadcrumbWhite();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}

function updateBreadcrumbWhite() {
  $(".abbott-breadcrumb").addClass("color-white");
}
