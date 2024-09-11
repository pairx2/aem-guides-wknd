import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import { getUrlParameter, isLoggedIn } from '../../utils/common';
import LoadingIndicator from '../common/LoadingIndicator';
import adobeAnalyticsConst from '../../constants/adobeAnalyticsConst';
import eventTrack  from '../../utils/adobeAnalytics';

const isPayonBrowserSwitch =
    ((!localStorage.getItem('sent_to_payon') ||
      JSON.parse(localStorage.getItem('sent_to_payon')) === false) &&
      new URLSearchParams(window.location.search).get('id'));

const PlaceOrder = (props) => {
  const { successPageUrl, guestPageUrl, errorPageUrl, loadingText, purchaseAaTracking } = props;
  const { t } = useTranslation();

  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const isOrderConfirmation = getUrlParameter('resourcePath');

  const checkoutId = new URLSearchParams(window.location.search).get('id');
  const cartId = isPayonBrowserSwitch ? null : commerceContext?.cart?.id;
  const riskCheckCommunicationToken = JSON.parse(localStorage.getItem('riskCheckCommunicationToken'));

  const placeOrderPayload = {
    cartId: cartId,
    ...(!!riskCheckCommunicationToken
      && {communicationToken: riskCheckCommunicationToken}),
    checkout_id: checkoutId,
    consents: [
      {
        consentValue: true,
        consentName: 'tos',
      },
    ],
  };

  const placeOrderParams = {
    service: userIsLoggedIn ? ESL_EPT.ordersAuth : ESL_EPT.orders,
    data: placeOrderPayload,
    addAuthHeaders: userIsLoggedIn,
    withRecaptcha: !userIsLoggedIn,
  };

  // Place order
  const { isLoading, data, error } = useQuery(
    [`placeOrder`, placeOrderParams],
    () => fetchESLservice(placeOrderParams),
    {
      enabled: Boolean(isOrderConfirmation),
    }
  );
  function removeHTML(str) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }
  useEffect(() => {
    // On Error
    if (error || data?.data?.errorCode) {
      const errorKey = data?.data?.response?.i18nMessageKey;
      const errorMessage = errorKey
        ? t(`errorcode-${errorKey.toLowerCase()}`)
        : error;
      if(!userIsLoggedIn || isPayonBrowserSwitch) {
        setCommerceContext({
          ...commerceContext,
          guestCheckout: {
            orderFailure: errorMessage,
            setPaymentMethodResponse: null,
          },
        });
        window.location.replace(guestPageUrl);
      }
      else {
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext?.checkout,
            orderFailure: errorMessage,
            setPaymentMethodResponse: null,
          },
        });
        window.location.replace(errorPageUrl);
      }
      localStorage.removeItem('sent_to_payon');
    }
  }, [error, data?.data?.errorCode]);

  useEffect(() => {
    // On Success
    if (data && !data?.data?.errorCode) {
      const placeorderCart = data?.data?.response;
      placeorderCart.cartID = cartId
      placeorderCart['isLoggedIn'] = userIsLoggedIn
      
      if (data?.data && purchaseAaTracking === 'true') {
        eventTrack(adobeAnalyticsConst.PURCHASE, placeorderCart)
      }
      if(!userIsLoggedIn|| isPayonBrowserSwitch) {
        setCommerceContext((prevData) => {
          const { cart, ...restCommerceContext } = prevData;
          return {
            ...restCommerceContext,
            guestCheckout: {
              orderData: data?.data,
            },
          };
        });
        window.location.replace(guestPageUrl);
      }
      else {
        setCommerceContext({
          ...commerceContext,
          checkout: {
            ...commerceContext?.checkout,
            orderData: data?.data,
          },
        });
        window.location.replace(successPageUrl);
      }
      localStorage.removeItem('sent_to_payon');
    }
  }, [data]);

    return (
      <div className="text-center loading-top">
        <LoadingIndicator />
        <div className="place-order-commerce">
          <pre>{removeHTML(loadingText)}</pre>
        </div>
      </div>
    );
};

export default PlaceOrder;
