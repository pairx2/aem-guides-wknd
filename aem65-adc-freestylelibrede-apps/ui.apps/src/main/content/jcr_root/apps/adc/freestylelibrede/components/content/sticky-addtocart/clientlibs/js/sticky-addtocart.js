jQuery(window).scroll(function () {
  const btnOffset = jQuery('.adc-product-details .adc-button').offset();
  if (btnOffset) {
    const scrollPos = jQuery(window).scrollTop();
    if ((btnOffset.top - scrollPos) < 0) {
      jQuery('#stickyAddToCart').show();
    } else {
      jQuery('#stickyAddToCart').hide();
    }
  }
});