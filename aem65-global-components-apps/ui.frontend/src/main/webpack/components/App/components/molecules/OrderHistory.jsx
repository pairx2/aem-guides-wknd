import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import LoadingIndicator from '../common/LoadingIndicator';
import {
  parsePriceString,
  getDateInPreferredLanguage,
} from '../../utils/common';
import getSymbolFromCurrency from 'currency-symbol-map';
import { AuthContext } from '../../context/AuthContext';

const OrderHistory = ({ orderDetailPage, maxNumber, showSpaceinprice }) => {
  const [authContext, setAuthContext] = useContext(AuthContext);
  const queryParams = new URL(window.location).searchParams;
  const currentSubscriptionId = queryParams.get('subscriptionId');
  const isSubscriptionDetailPage = !!(new URL(window.location)?.search?.includes('subscriptionId'));

  const params = {
    service: isSubscriptionDetailPage 
      ? { method: 'GET', url: `/api/private/order/orders?subid=${currentSubscriptionId}`} 
      : ESL_EPT.orderHistory,
    addAuthHeaders: true,
    ...(isSubscriptionDetailPage && {withRecaptcha: false}),
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    [`orderHistory`, params],
    () => fetchESLservice(params)
  );
  const itemList = isSubscriptionDetailPage 
    ? data?.data?.response?.data?.awSarp2Profile?.items[0]?.orders
    : data?.data?.response?.data?.customer?.orders?.items;

  const { t } = useTranslation();
  const orderHistory = { detail: {} };

  // Since there were two calls for orders, in AccountNavigation and OrderHistory,
  // made OrderHistory to handle the call only.
  // If {accountOrders} was not in context, update context an run callback that is
  // going to show order menu items in accountNavigation
  useEffect(() => {
    if (!isSubscriptionDetailPage && !authContext?.accountData?.accountOrders && data?.data) {
      setAuthContext((lastAuthContext) => {
        const newAuthContext = {
          ...lastAuthContext,
          accountData: {
            ...lastAuthContext?.accountData,
            accountOrders: data?.data,
          },
        };

        if (typeof window.onAccountNavigationLoad === 'function') {
          window.onAccountNavigationLoad(newAuthContext?.accountData);
        }

        return newAuthContext;
      });
    }
  }, [data?.data]);

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
    orderHistory.detail.error = true;
    return <span>{`${t('error')} : ${errorMessage}`}</span>;
  }

  if (isSuccess) {
    orderHistory.detail.success = true;
    orderHistory.detail.items = (itemList && itemList.length) || null;
  }

  window.dispatchEvent(new CustomEvent('orderHistoryRetrieved', orderHistory));

  let orderItemList =
    (maxNumber > 0 && itemList)
      ? [...itemList].slice(0, maxNumber)
      : [...itemList];

  return (
    <div class="m-orderhistory__content">
      <table class="m-orderhistory__table">
        <tr class="m-orderhistory__table--titles">
          <th>{t('order-number-symbol')}</th>
          <th>{t('datepicker-singledatelabel')}</th>
          <th>{t('ship-to')}</th>
          <th>{t('total')}</th>
          <th>{t('status')}</th>
          {orderDetailPage && <th>{t('actions')}</th>}
        </tr>
        {orderItemList &&
          orderItemList.map((order) => (
            <tr key={order.number}>
              <td>{order.number}</td>
              <td>
                <span class="m-orderhistory__table--date">
                  {order.order_date}
                </span>
                <span class="m-orderhistory__table--date-formatted">
                  {formatDate(order.order_date)}
                </span>
              </td>
              <td>
                {order?.shipping_address?.firstname}{' '}
                {order?.shipping_address?.lastname}
              </td>
              <td class="m-orderhistory__table--total">
              <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
                {getSymbolFromCurrency(order?.total?.grand_total?.currency)}
                </span>
                  {parsePriceString(order?.total?.grand_total?.value)}
              </td>
              <td>{t(order.status.replaceAll(' ', '-').toLowerCase())}</td>
              {orderDetailPage && (
                <td class="m-orderhistory__table--actions">
                  <a href={`${orderDetailPage}?orderId=${order.number}`}>
                    {t('view-order')}
                  </a>
                </td>
              )}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default OrderHistory;