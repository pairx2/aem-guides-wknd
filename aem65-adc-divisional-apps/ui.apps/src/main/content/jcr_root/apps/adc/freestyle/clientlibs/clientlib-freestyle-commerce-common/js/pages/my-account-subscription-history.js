/**
 * Orchestrates conditional container against success and error scenarios
 * reported within the subscription history component. Also manages display of
 * messages when there is no subscription history.
 */
(function ($, document) {
  const containerVariable = 'subscriptionHistory';
  const hasSubscriptionHistoryComponent = () => !!document.querySelector('.conditional > .conditional-container[data-conditional-variable=subscriptionHistory]');

  $(document).ready(() => { if (hasSubscriptionHistoryComponent()) init(); });

  const init = () => {
    $('.conditional__case[data-conditional-case=hasSubscriptions]').show();
    window.addEventListener('subscriptionHistoryRetrieved', (history) => {
      const subscriptionStatus = history.detail.error ? 'hasSubscriptions' : history.detail.items ? 'hasSubscriptions' : 'hasNoSubscriptions';

      window.dispatchEvent(new CustomEvent('conditional-component-change', {
        detail: {
          value: subscriptionStatus,
          var: containerVariable
        }
      }));

    }, false);
  }

})(jQuery, document);