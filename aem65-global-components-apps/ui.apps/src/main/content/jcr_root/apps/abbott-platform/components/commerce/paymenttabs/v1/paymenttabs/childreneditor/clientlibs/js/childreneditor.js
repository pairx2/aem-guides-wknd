(function ($, Coral) {
  'use strict';

  const selectors = {
    dialogContentSelector: '.cmp-tabs__editor',
    childreneditorSelector: "[data-cmp-is='childrenEditor']",
    childItemSelector: '[data-cmp-hook-childreneditor="itemTitle"]',
    paymentTypesSelector: '[data-cmp-hook-childreneditor="paymentType"]',
  };

  const availablePaymentTypes = [
    {
      title: 'Credit / Debit Card',
      code: 'payon_credit_card',
    },
    {
      title: 'Subscription Credit  Card',
      code: 'payon_subscription_credit_card',
    },
    {
      title: 'PayPal',
      code: 'payon_paypal',
    },
    {
      title: 'Open Invoice',
      code: 'openinvoice',
    },
    {
      title: 'Przelewy24',
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
      title: 'Sofort',
      code: 'payon_sofort',
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
    }
  ];

  const appendPaymentTypeSelector = (childrenEditor) => {
    const cmpChildrenEditor = $(childrenEditor).adaptTo('cmp-childreneditor');

    if (cmpChildrenEditor) {
      cmpChildrenEditor.items().forEach((childItem, index) => {
        const itemName = `./${childItem.name}/paymentType`;
        const paymentType = childrenEditor.querySelector(
          `${selectors.paymentTypesSelector}[data-item-index="${index}"]`
        )?.value;

        let select = childrenEditor.querySelector(`[name="${itemName}"]`);

        if (!select) {
          select = new Coral.Select().set({
            name: itemName,
            placeholder: 'Payment Type',
          });

          availablePaymentTypes.forEach((availablePaymentType) => {
            select.items.add({
              value: availablePaymentType.code,
              selected: availablePaymentType.code === paymentType,
              content: {
                textContent: availablePaymentType.title,
              },
            });
          });

          childrenEditor
            .querySelector(`${selectors.childItemSelector}[name="./${childItem.name}/cq:panelTitle"]`)
            ?.parentElement?.append(select);
        }
      });
    }
  };

  $(document).on('dialog-loaded', (event) => {
    const $dialog = event.dialog;
    const $dialogContent = $dialog.find(selectors.dialogContentSelector);
    const tabsEditor = $dialogContent.length > 0 ? $dialogContent[0] : undefined;

    if (tabsEditor) {
      const childrenEditor = tabsEditor.querySelector(selectors.childreneditorSelector);

      if (childrenEditor) {
        Coral.commons.ready(childrenEditor, () => appendPaymentTypeSelector(childrenEditor));
        childrenEditor.on('change', () => appendPaymentTypeSelector(childrenEditor));
      }
    }
  });
})(jQuery, Coral);
