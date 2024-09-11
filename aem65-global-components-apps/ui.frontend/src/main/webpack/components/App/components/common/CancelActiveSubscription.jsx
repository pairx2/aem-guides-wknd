import React, { useEffect } from 'react';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';

function CancelActiveSubscription(props) {
    const cancelSubscription = async () => {
        const queryParams = new URL(window.location).searchParams;
        const currentSubscriptionId = queryParams.get('subscriptionId');

        const button = document.querySelector('#my-subscriptions-confirm-cancel');
        button.setAttribute('disabled', 'disabled');
        const cancelSubscriptionParams = {
            withRecaptcha: false,
            service: ESL_EPT.productsSubscriptionsCancel,
            addAuthHeaders: true,
            data: {
              subscriptionId: currentSubscriptionId,
            },
        };
        const response = await fetchESLservice(cancelSubscriptionParams);

        if (response?.data?.status && !response?.data?.errorCode) {
          document.querySelector('#cancel-subscription-button-modal .generic-modal--close')?.click();
          localStorage.setItem('recentlyCancelledSubscription', JSON.stringify(currentSubscriptionId));
          window.location.reload();
        } else {
            button.removeAttribute('disabled');
            document.querySelector('#cancel-subscription-button-modal .generic-modal--close')?.click();
      
            // Show Error Message in case the API fails
            const cancelSubscriptionError = createConditionalEvent(
              true,
              'cancelContentError'
            );
            window.dispatchEvent(cancelSubscriptionError);
        }
    }

    useEffect(() => {
        // change the id of the button once it gets ready from content side
        const cancelSubscriptionBtn = document.querySelector(
          '#my-subscriptions-confirm-cancel'
        );
        cancelSubscriptionBtn?.addEventListener('click', cancelSubscription);
    
        return () => {
          cancelSubscriptionBtn?.removeEventListener('click', cancelSubscription);
        };
      }, []);

    return null;
}

export default CancelActiveSubscription;