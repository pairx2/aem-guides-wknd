import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { AuthContext } from '../../context/AuthContext';
import { isLoggedIn } from '../../utils/common';
import ESL_EPT from '../../data/eslEndpoints';
import { productAlertSubscriptionQuery } from '../../data/graphqlQueries';
import { fetchESLservice } from '../../services/eslService';

import Alert from './Alert';

const StockAlertSubscribe = (props) => {
  const { linkText, staticText, pdpUrl, sku } = props;

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState();

  const { t } = useTranslation();
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);

  const { loginPage = '/' } = document.querySelector('body')?.dataset;

  const params = {
    service: ESL_EPT.stockAlertSubscribe,
    addAuthHeaders: true,
    data: {
      requestType: 'productAlertSubscription',
      ...productAlertSubscriptionQuery(sku),
    },
  };
  const { data, isLoading, error, refetch } = useQuery(
    [`stockAlertSubscribe`, params],
    () => fetchESLservice(params),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (error || data?.data?.errorCode) {
      const errorKey = data?.data?.response?.i18nMessageKey;
      const errorMessage =
        (errorKey && t(`errorcode-${errorKey.toLowerCase()}`)) ||
        data?.data?.response?.statusReason ||
        error.message;

      setSubscriptionError(errorMessage);
    }
  }, [error, data?.data?.errorCode]);

  useEffect(() => {
    if (data?.data?.data?.createStockAlertSubscription) {
      setIsSubscribed(true);
    }
  }, [data?.data?.data]);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!userIsLoggedIn) {
      setItemLocalStorage('stockAlertPath', pdpUrl);

      window.location.href = loginPage;
      return;
    }

    refetch();
  };

  return (
    <div className="a-stock-alert-subscribe">
      {isSubscribed && (
        <Alert type="success" message={t('subscribed-to-stock-alert')} />
      )}
      {!isSubscribed && (
        <button
          disabled={isLoading}
          onClick={handleSubscribe}
          className={`a-stock-alert-subscribe__link btn btn-link`}
        >
          {linkText}
        </button>
      )}
      {!!subscriptionError && (
        <Alert type="danger" message={subscriptionError} />
      )}
      {!!staticText && (
        <div className="a-stock-alert-subscribe__static-text">
          <p>{staticText}</p>
        </div>
      )}
    </div>
  );
};

StockAlertSubscribe.defaultProps = {
  linkText: '',
  staticText: '',
  pdpUrl: '',
  sku: '',
};

StockAlertSubscribe.propTypes = {
  linkText: PropTypes.string,
  staticText: PropTypes.string,
  pdpUrl: PropTypes.string,
  sku: PropTypes.string,
};

export default StockAlertSubscribe;
