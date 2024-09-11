/**
 * Orchestrates conditional container against success and error scenarios
 * reported within the order history component. Also manages display of
 * messages when there is no order history.
 */
(function ($, document) {
  const containerVariable = 'orderHistory';
  const hasOrderHistoryComponent = () => !!document.querySelector('.conditional > .conditional-container[data-conditional-variable=orderHistory]');

  $(document).ready(() => { if (hasOrderHistoryComponent()) init(); });

  const init = () => {
    $('.conditional__case[data-conditional-case=hasOrders]').show();
    window.addEventListener('orderHistoryRetrieved', (history) => {
      const orderStatus = history.detail.error ? 'hasOrders' : history.detail.items ? 'hasOrders' : 'hasNoOrders';

      window.dispatchEvent(new CustomEvent('conditional-component-change', {
        detail: {
          value: orderStatus,
          var: containerVariable
        }
      }));

    }, false);
  }

})(jQuery, document);
