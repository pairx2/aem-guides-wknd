$(document).ready(function () {
  var path = window.location.pathname;
  if (path.includes("/index/")) {
    addProductWrapper();
  }
  if (path.includes("/nuestraempresa/")) {
    $("body").addClass("product-category-wrapper");
  }
  if (path.includes("/product-category/")) {
    addProductWrapper();
  }
  if (path.includes("/prsencia-en-colombia.html")) {
    addProductWrapper();
  }
  if (path.includes("/about-us.html")) {
    addProductWrapper();
  }
  if (path.includes("/farmacovigilancia.html")) {
    addProductWrapper();
  }
  if (path.includes("/product-category.html")) {
    addProductWrapper();
  }
  if (path.includes("/sitemap.html")) {
    addProductWrapper();
  }
  if (path.includes("/register.html")) {
    addProductWrapper();
  }
  if (path.includes("/login.html")) {
    addProductWrapper();
  }
  if (path.includes("/forgot-password.html")) {
    addProductWrapper();
  }
  if (path.includes("/register-success.html")) {
    addProductWrapper();
  }
  if (path.includes("/search-page.html")) {
    addProductWrapper();
  }
   if (path.includes("/activation.html")) {
    addProductWrapper();
  }
  if (path.includes("/secure/profile.html")) {
    addProductWrapper();
  }
  if (path.includes("/reset-password")) {
    addProductWrapper();
  }
});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}
