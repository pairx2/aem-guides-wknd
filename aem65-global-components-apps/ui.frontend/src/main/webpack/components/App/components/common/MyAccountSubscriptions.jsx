import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import { shortLongUrl } from '../../utils/common';
import Alert from '../atoms/Alert';
import Button from '../atoms/Button';
import LoadingIndicator from './LoadingIndicator';

function MyAccountSubscriptions(props) {
  const { myAddressesPage } = props;
  const { t } = useTranslation();
  const [subscriptionId, setSubscriptionId] = useState();

  const getSubscriptionsListParams = {
    withRecaptcha: false,
    service: ESL_EPT.productsSubscriptionsList,
    addAuthHeaders: true,
  };

  // Get Subscriptions List
  const { data: subscriptionsData, error, isFetching } = useQuery(
    [`get-subscriptions`, getSubscriptionsListParams],
    () => fetchESLservice(getSubscriptionsListParams),
    {
      enabled: true,
    }
  );

  const handleCancelSubscription = (id) => {
    setSubscriptionId(id);
    document.querySelector('#my-subscriptions-cancel-btn')?.click();
  };

  const cancelSubscription = async () => {
    const button = document.querySelector('#my-subscriptions-cancel');
    button.setAttribute('disabled', 'disabled');

    const cancelSubscriptionParams = {
      withRecaptcha: false,
      service: ESL_EPT.productsSubscriptionsCancel,
      addAuthHeaders: true,
      data: {
        subscriptionId: subscriptionId,
      },
    };
    const response = await fetchESLservice(cancelSubscriptionParams);

    if (response?.data?.status && !response?.data?.errorCode) {
      window.location.reload();
    } else {
      button.removeAttribute('disabled');

      // Show Error Message
      const cancelSubscriptionError = createConditionalEvent(
        true,
        'cancelContentError'
      );
      window.dispatchEvent(cancelSubscriptionError);
    }
  };

  useEffect(() => {
    const cancelSubscriptionBtn = document.querySelector(
      '#my-subscriptions-cancel'
    );
    cancelSubscriptionBtn?.addEventListener('click', cancelSubscription);

    return () => {
      cancelSubscriptionBtn?.removeEventListener('click', cancelSubscription);
    };
  }, [subscriptionId]);

  if (isFetching) {
    return (
      <div className="m-5">
        <LoadingIndicator />
      </div>
    );
  }

  if (
    !subscriptionsData?.data?.response?.items ||
    subscriptionsData?.data?.response?.items?.length === 0
  ) {
    return (
      <div className="m-2">
        <Alert message={t('you-dont-have-subscriptions')} type="warning" />
      </div>
    );
  }

  return (
    <div className="m-subscriptions">
      {subscriptionsData?.data?.response?.items?.map((item) => {
        const subscriptionIsActive = item.is_enabled;

        return (
          <>
            <h3>
              {item.product_name} {t('subscription')}
            </h3>
            {!subscriptionIsActive && (
              <>
                <h4>{t('subscription_canceled')}</h4>
                <p>{t('subscription_cancel_msg')}</p>
              </>
            )}
            <div className="m-subscriptions__table">
              <div className="m-subscriptions__table-item">
                <h4>{t('start-date')}</h4>
                <p>
                  {new Date(item.init_order_date).toLocaleDateString('en-GB')}
                </p>
              </div>
              <div className="m-subscriptions__table-item">
                <h4>{t('delivery-frequency')}</h4>
                <p>{item.delivery_frequency_label}</p>
              </div>
              <div className="m-subscriptions__table-item">
                <h4>
                  {!subscriptionIsActive
                    ? t('last-order-date')
                    : t('next-order-date')}
                </h4>
                <p>
                  {new Date(item.desired_order_date).toLocaleDateString(
                    'en-GB'
                  )}
                </p>
              </div>
              <div className="m-subscriptions__table-item">
                <h4>{t('delivery-address')}</h4>
                <p>
                  {item.shipping_address.firstname}{' '}
                  {item.shipping_address.lastname}
                  <br />
                  {item.shipping_address.street.join(' ')}
                  <br />
                  {item.shipping_address.city} {item.shipping_address.postcode}
                  <br />
                  {item.shipping_address.country_id}
                  <br />
                  {t('phone')}: {item.shipping_address.telephone}
                </p>
                <a
                  href={shortLongUrl(myAddressesPage)}
                  className="m-subscriptions__address-link"
                >
                  {t('edit-address')}{' '}
                  <em className="abt-icon abt-icon-edit-2" />
                </a>
              </div>
              <div className="m-subscriptions__table-item">
                <h4>{t('payment-method')}</h4>
                <p>
                  <img
                    src={t(
                      `${item.init_order_payment?.cc_type?.toLowerCase()}_card_image`
                    ).replace(/ /g, '/')}
                    className="m-subscriptions__card-logo"
                  />{' '}
                  {t(
                    `${item.init_order_payment?.cc_type?.toLowerCase()}_card`
                  ) +
                    ' ' +
                    t('ending')}{' '}
                  <strong>{item.init_order_payment?.cc_last4}</strong>
                </p>
              </div>
            </div>
            {!!subscriptionIsActive && (
              <div className="m-subscriptions__cancel">
                <div className="m-subscriptions__cancel-content">
                  <h4>{t('cancel-your-subscription')}</h4>
                  <p>
                    {t('cancel-your-subscription-msg-1')}{' '}
                    <strong>
                      {new Date(item.desired_order_date).toLocaleDateString(
                        'en-GB'
                      )}
                    </strong>{' '}
                    {t('cancel-your-subscription-msg-2')}
                  </p>
                </div>

                <div className="m-subscriptions__cancel-btn">
                  <Button
                    text={t('cancel')}
                    buttonStyle="secondary"
                    onClick={() => handleCancelSubscription(item.entity_id)}
                  />
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default MyAccountSubscriptions;
