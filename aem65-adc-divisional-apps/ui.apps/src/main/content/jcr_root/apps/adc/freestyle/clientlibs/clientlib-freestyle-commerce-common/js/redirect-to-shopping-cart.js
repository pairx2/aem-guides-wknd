(function ($, document) {
  const redirectPath = document.body.dataset.cartPage;
  const checkoutPath = document.body.dataset.checkoutPage;
  const pagePath = location.href;

  $(document).ready(() => init());

  const init = () => {
    const total_quantity_cart = getLocalCommerceContext()?.cart?.total_quantity;

    if (
      (!total_quantity_cart || total_quantity_cart == 0) &&
      redirectPath &&
      checkoutPath &&
      checkoutPath == pagePath
    ) {
      location.href = redirectPath;
    }
  };
})(jQuery, document);
