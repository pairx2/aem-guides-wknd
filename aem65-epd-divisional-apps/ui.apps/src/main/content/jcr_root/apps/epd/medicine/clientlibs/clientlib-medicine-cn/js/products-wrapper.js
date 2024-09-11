$(document).ready(function () {
  
  var path = window.location.pathname;

  if (path.includes('/product-category.html'))  {
    addProductWrapper();
  }
  if (path.includes('/sitemap.html'))  {
    addProductWrapper();
  }
  if (path.includes('/mind-and-brain.html'))  {
    addProductWrapper();
  }
  if (path.includes('/contact-us.html'))  {
    addProductWrapper();
  }
  if (path.includes('/index/'))  {
    addProductWrapper();
  }
  if (path.includes('/search-page.html')){
    addProductWrapper();
  }

});

function addProductWrapper() {
  $("body").addClass("products-wrapper");
}