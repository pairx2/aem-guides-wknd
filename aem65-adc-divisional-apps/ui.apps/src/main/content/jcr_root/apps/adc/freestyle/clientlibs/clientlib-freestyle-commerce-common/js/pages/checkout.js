$(() => {
  $('#myfreestyle-checkout .o-wizard__content').find('.m-ordersummary').addClass('is-collapsed');
  $('#myfreestyle-checkout').parent().addClass('checkout-main-container');

  //Promo code success issue on checkout\
  const ordersumdiv = document.querySelector("div[id*='ordersummary']");  
  if(ordersumdiv){
  $("div[id*='ordersummary']").attr('data-promo-code-success-message', $("div[id*='ordersummary']").attr('data-promo-code-success-message').replace('<!-- -->',''));
  $("div[id*='ordersummary']").attr('data-promo-code-success-message', $("div[id*='ordersummary']").attr('data-promo-code-success-message').replace('&nbsp;',' '));  
  }  
  //Promo code success issue on checkout
});
