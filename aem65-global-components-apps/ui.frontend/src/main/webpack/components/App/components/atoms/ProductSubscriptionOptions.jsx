import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { fetchSubscriptionPurchaseOptions, parsePriceString } from '../../utils/common';

const ProductSubscriptionOptions = (props) => {
  const { data, selectedSubscriptionOption, handleSelectedOption, sku, selectedSkuVal } = props;

  const { t } = useTranslation();

  const renderPlanTile = (plan) => {
    const currency = plan?.price_range?.minimum_price?.regular_price?.currency;
    const price = plan?.vat_details?.including_tax?.value;
    const { billing_frequency, billing_period, frequency_description } = plan?.sarp2?.plan_options[0];
    return (
      <>
        <div className='subscription-details'>
            <p className="subscription-details--billing-period">{t(`${billing_period}_${billing_frequency}`)}</p>
            <p>{t(`${frequency_description}`)}</p>
        </div>
        <div className='subscription-price'>
          <p className='subscription-price__price'>
            <span>{getSymbolFromCurrency(currency)}</span>
            {parsePriceString(price)}
          </p>
          <p className='subscription-price__vat a-product-price__vat-label'>{t('product-inc-vat')}</p>
        </div>
      </>
    );
  }

  const renderOptions = () => {
    const items = data?.data?.response?.data?.products?.items;
    const planOptions = items?.length ? fetchSubscriptionPurchaseOptions(items) : null;

    if(planOptions) {
        return planOptions.map(plan => (
          <div
            className={`a-product-options__subscription-tile${plan?.sarp2?.subscription_type?.label !== 'Subscription only' ? '--hide' : ''} ${selectedSubscriptionOption === plan?.sarp2?.plan_options[0]?.option_id ? 'selected' : ''}`}
            key={plan?.sarp2?.plan_options[0]?.option_id} 
            onClick={(e) => handleSelectedOption(plan?.sarp2?.plan_options[0]?.option_id, plan?.sku)}
          >
            {renderPlanTile(plan)}
          </div>
        ));
    }
    return;
  }

  return (   
    <>
     {sku==selectedSkuVal ? 
      <div className="a-product-options">
        <div className='a-product-options--subscription-info'>{t(`subscription-info-msg`)}</div>
        {renderOptions()}
        <div class="a-product-options--cancel-subscription">{t('subscription-info-cancel-msg')}</div>
      </div>
      : ''}
    </>
  );
};


ProductSubscriptionOptions.propTypes = {
  data: PropTypes.any,
  selectedSubscriptionOption: PropTypes.string,
  handleSelectedOption: PropTypes.func,
};
export default ProductSubscriptionOptions;
