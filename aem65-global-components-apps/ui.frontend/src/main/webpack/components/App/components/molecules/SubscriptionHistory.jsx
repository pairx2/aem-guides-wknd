import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import LoadingIndicator from '../common/LoadingIndicator';
import {
  fetchSuspendedSubscriptionsIds,
  getDateInPreferredLanguage,
  storeSubscriptionsByCategory,
} from '../../utils/common';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';
import createConditionalEvent from '../../utils/conditional';

const SubscriptionHistory = ({ subscriptionDetailPage, maxNumber, subscriptionCategory='active' }) => {
  const [authContext, setAuthContext] = useContext(AuthContext);
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const activeSubscriptions = JSON.parse(localStorage.getItem('activeSubscriptions'));
  let suspendedIds = '';
  if(activeSubscriptions?.length) {
    suspendedIds = fetchSuspendedSubscriptionsIds(activeSubscriptions);
  }

  const params = {
    service: ESL_EPT.subscriptionHistory,
    addAuthHeaders: true,
  };
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    [`subscriptionHistory`, params],
    () => fetchESLservice(params)
  );
  const itemList = data?.data?.response?.data?.awSarp2Profile?.items;
  const { t } = useTranslation();
  const subscriptionHistory = { detail: {} };

  useEffect(() => {
    setCommerceContext({
      ...commerceContext,
      profile: {
        ...commerceContext.profile,
        items: {
          ...commerceContext.profile?.items,
          subscriptionDetail: {},
        },
      },
    });
  }, [])

  useEffect(() => {
    if (data?.data) {
      setAuthContext((lastAuthContext) => {
        const newAuthContext = {
          ...lastAuthContext,
          accountData: {
            ...lastAuthContext?.accountData,
            accountSubscriptions: data?.data,
          },
        };
        return newAuthContext;
      });
    }
  }, [data?.data]);

  if(data?.data?.response?.data?.awSarp2Profile?.items) {
    storeSubscriptionsByCategory(data?.data?.response?.data?.awSarp2Profile?.items);
  }

  const formatDate = (timestamp) =>
    getDateInPreferredLanguage(timestamp, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    const errorMessage = data?.data?.errorCode;
    subscriptionHistory.detail.error = true;
    return <span>{`${t('error')} : ${errorMessage}`}</span>;
  }

  if (isSuccess) {
    subscriptionHistory.detail.success = true;
    subscriptionHistory.detail.items = (itemList && itemList.length) || null;
  }

  window.dispatchEvent(new CustomEvent('subscriptionHistoryRetrieved', subscriptionHistory));

  let subscriptionItemList =
    (itemList?.length)
      ? (!subscriptionCategory?.length || subscriptionCategory?.toLowerCase() === 'active')
        ? JSON.parse(localStorage.getItem('activeSubscriptions'))
        : JSON.parse(localStorage.getItem('otherSubscriptions'))
      : [];

  subscriptionItemList =
    (maxNumber > 0 && subscriptionItemList && subscriptionCategory?.toLowerCase() === 'active')
      ? [...subscriptionItemList].slice(0, maxNumber)
      : subscriptionItemList;
  
  if(suspendedIds?.length) {
    const suspendedAlert = createConditionalEvent(
      true,
      'showPaymentFailureAlert'
    );
    window.dispatchEvent(suspendedAlert);
    const paymentFailureAlert = document.querySelector('#payment-failure-alert .m-alert__content .alert-title .cmp-title h5');
    if(paymentFailureAlert) {
      paymentFailureAlert.innerHTML = paymentFailureAlert.innerHTML?.replace('${increment_id}', suspendedIds.slice(0, -1));
    }
  }

  return (
    <div class="m-subscriptionhistory__content">
      <table class="m-subscriptionhistory__table">
        <tr class="m-subscriptionhistory__table--titles">
          <th>{t('subscription-number-symbol')}</th>
          <th>{t('status')}</th>
          <th>{t('type')}</th>
          <th>{subscriptionCategory?.toLowerCase() === 'active' ? t('next-delivery-date') : t('last-order-date')}</th>
          {subscriptionDetailPage && <th>{t('actions')}</th>}
        </tr>
        {subscriptionItemList?.length &&
          subscriptionItemList?.map((subscription) => (
            <tr key={subscription.increment_id}>
              <td>{subscription.increment_id}</td>
              <td>
                <span class="m-subscriptionhistory__table--subscription-status">
                  <span class={`badge ${subscription.status}`}></span>
                 {t(subscription.status)}
                </span>
              </td>
              <td>{subscription?.items[0]?.product_name || subscription.plan_name}
              </td>
              <td class="m-subscriptionhistory__table--total">
                {subscription?.status.toLowerCase() === 'active'
                  ? (formatDate(subscription?.next_payment_info?.payment_date) || '-')
                  : (formatDate(subscription?.last_order_date) || '-')
                }
              </td>
              {subscriptionDetailPage && (
                <td class="m-subscriptionhistory__table--actions">
                  <a href={`${subscriptionDetailPage}?subscriptionId=${subscription.profile_id}`}>
                    {t('view-details')}
                  </a>
                </td>
              )}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default SubscriptionHistory;
