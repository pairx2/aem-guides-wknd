import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from "./Button";
import {fetchESLservice} from "../../services/eslService";
import {downloadDocuments} from '../../utils/common';

function ReturnLabel(props) {
  const { t } = useTranslation();
  const [returns, setReturns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const orderId = new URLSearchParams(document.location.search).get('orderId');

  const getReturns = async (orderNumber) => {
    try {
      const { data, errorCode } = await fetchESLservice({
        service: {
          method: 'GET',
          url: `/api/private/order/orders/${orderNumber}`,
        },
        withRecaptcha: false,
        addAuthHeaders: true,
      });

      if (!data) {
        throw new Error();
      }

      if (data?.response?.data?.customer?.orders?.items[0].returns) {
        setReturns(data?.response?.data?.customer?.orders?.items[0]?.returns?.items);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getReturns(orderId);

    const orderNumberEl = document.querySelector(
      '#myfreestyle-my-account-secondary-title h3'
    );

    if (orderNumberEl && orderId) {
      orderNumberEl.textContent += ` #${orderId}`;
    }
  }, []);

  const getReturnLabel = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    let status = await downloadDocuments(returns, 'returnLabelPDF', 'returnLabelPDF');
    setIsLoading(status)
  };

  useEffect(() => {
    const returnButton = document.querySelector(
      '.m-returns-load__button button'
    );

    if (returns.length) {
      returnButton.style.visibility = 'visible';
    } else {
      returnButton.style.visibility = 'hidden';
    }
  }, [returns]);

  const handleGoBackClick = () => {
    history.back();
  };

  return (
    <div class="return-success-utility">
      <div className="return-success-utility__back" onClick={handleGoBackClick}>
        <em className="abt-icon abt-icon-left-arrow" />
        <span>{t('back')}</span>
      </div>
      <div className="return-success-utility__load m-returns-load__button">
        <Button
          iconClass={isLoading ? 'spinner' : 'download'}
          buttonClasses={isLoading ? 'a-button--spinner' : ''}
          iconPosition={isLoading ? 'left' : ''}
          text={t('download-return-label')}
          buttonStyle="primary"
          onClick={() => getReturnLabel()}
        />
      </div>
    </div>
  );
}

export default ReturnLabel;
