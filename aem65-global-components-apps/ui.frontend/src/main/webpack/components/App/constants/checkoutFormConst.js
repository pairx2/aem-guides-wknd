const checkoutFormConst = {
  STEP_ONE: '.o-wizard__content[data-wizarditem="0"]',
  STEP_TWO: '.o-wizard__content[data-wizarditem="1"]',
  STEP_THREE: '.o-wizard__content[data-wizarditem="2"]',
  ADDRESS_STEP: '#step-one',
  PAYMENT_STEP: '#payment-step',
  CONTINUE_BUTTON: '.o-wizard__btn button.btn',
  BACK_BUTTON: '.o-wizard__btn--back a.btn',
  OPEN_INVOICE_BUTTON:
    '.a-button:not(.a-button--spinner) > #open-invoice-order',
  FREE_ORDER_BUTTON: '.a-button:not(.a-button--spinner) > #free-order',
  PAYMENT_METHOD_CC: 'payon_credit_card',
  PAYMENT_METHOD_PAYPAL: 'payon_paypal',
  SUMMARY_PAGE_ATTRIBUTE: 'data-checkout-summary-page-url',
  SHIPPING_METHOD: '.shippingmethods input',
  PAYMENTTABS: 'data-payment-tabs',
  PAYMENTTABS_PAYMENT_TYPE: 'data-payment-type',
  PAYMENTTABS_TABS: '[data-cmp-hook-tabs="tab"]',
  PAYMENTTABS_SELECTED_CLASS: 'active',
  PAYMENTTABS_CONTENT: '.tab-content',
  PAYMENTTABS_SPINNER: '.a-spinner',
  COD_BUTTON: '.a-button:not(.a-button--spinner) > #cash-on-delivery',
  TABBED_PAYMENTS: '#checkout-payment-tabs',
  SIMPLIFIED_CHECKOUT:'simplified-checkout',
  CHECKOUT_WIZARD_ONE:'[data-wizard="0"]',
  TABBED_PAYMENT_TYPES: [
    {
      title: 'Credit or Debit Card',
      code: 'payon_credit_card',
    },
    {
      title: 'Subscription Credit  Card',
      code: 'payon_subscription_credit_card',
    },
    {
      title: 'Pay Pal',
      code: 'payon_paypal',
    },
    {
      title: 'Open Invoice',
      code: 'openinvoice',
    },
    {
      title: 'P24',
      code: 'payon_p24',
    },
    {
      title: 'Check / Money order',
      code: 'checkmo',
    },
    {
      title: 'iDeal',
      code: 'payon_ideal',
    },
    {
      title: 'Cash On Delivery',
      code: 'cashondelivery',
    },
    {
      title: 'Free',
      code: 'free',
    },
    {
      title: 'Bancontact',
      code: 'payon_local_debit_card',
    },
    {
      title: 'Google Pay',
      code: 'payon_google_pay',
    },
    {
      title: 'Apple Pay',
      code: 'payon_apple_pay',
    },
    {
      title: 'Twint',
      code: 'payon_twint',
    },
  ],
};

export default checkoutFormConst;
