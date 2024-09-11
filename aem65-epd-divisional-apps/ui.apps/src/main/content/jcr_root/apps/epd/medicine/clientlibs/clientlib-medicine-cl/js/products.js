$(document).ready(function () {
  if (window.location.pathname.indexOf('/products/')>-1) {
    $('body').addClass('products-wrapper');
  }
  else if (window.location.pathname.indexOf('/product-category')>-1) {
    $('body').addClass('product-category-wrapper');
  }
});
