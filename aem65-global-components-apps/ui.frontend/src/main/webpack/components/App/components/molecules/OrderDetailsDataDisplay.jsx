import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getDataInfo } from '../../utils/common';
import { CommerceContext } from '../../context/CommerceContext';

const OrderDetailsDataDisplay = ({ displayOutput = '', source }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  /* This can be exported to its own module and configurable if many more options to be added */
  const paymentCodes = {
    VI: 'Visa',
    MC: 'Mastercard',
  };

  const countryNames = {
    IE: 'Ireland',
  };

  const sourceObj =
    source === 'null' || source === ''
      ? `profile.items.orderDetail`
      : `profile.items.orderDetail.${source}`;

  const data = getDataInfo(commerceContext, sourceObj);

  const isPaypalPayment = () => {
    const dataSource = 'profile.items.orderDetail.payment_methods[0].type';
    const paymentType = getDataInfo(commerceContext, dataSource);
    return !!(paymentType && paymentType === 'payon_paypal');
  };

  const isCODPayment = () => {
    const dataSource = 'profile.items.orderDetail.payment_methods[0].type';
    const paymentType = getDataInfo(commerceContext, dataSource);
    return !!(paymentType && paymentType === 'cashondelivery');
  };

  const isInvoicePayment= () => {
    const dataSource = 'profile.items.orderDetail.payment_methods[0].type';
    const paymentType = getDataInfo(commerceContext, dataSource);
    return !!(paymentType && paymentType === 'openinvoice');
  };

  const isNotCardPayment = () => {
    const dataSource = 'profile.items.orderDetail.order_payment';
    const paymentType = getDataInfo(commerceContext, dataSource);
    return paymentType && (Object.keys(paymentType).length === 0 && paymentType.constructor === Object);
  }

  const regex = /\$\{[^\}]*\}/g;
  const displayStr = displayOutput
    .replace(regex, (subStr) => {
      subStr = subStr.slice(2, -1);
      const hasData = !!(data && data[subStr]);
      const isPaymentType = subStr === 'cc_type';
      const isCountryCode = subStr === 'country_code';

      if (hasData && data.hasOwnProperty(subStr)) {
        if (!!(isPaymentType && paymentCodes[data[subStr]])) {
          return paymentCodes[data[subStr]];
        } else if (!!(isCountryCode && countryNames[data[subStr]])) {
          return countryNames[data[subStr]];
        }
        return data[subStr];
      }
      else if (isPaymentType && isNotCardPayment()) {
        return 'isNotCardPayment';
      }

      return '';
    })
    .replace(/^\s*[\r\n]/gm, '');

  return displayStr ? (
    <p className="m-orderdetails-datadisplay__list">
      {displayStr.includes('isNotCardPayment')
         ? commerceContext?.profile?.items?.orderDetail?.payment_methods[0]?.name : displayStr.split('\n').map((line) => <p>{line}</p>)}
    </p>
  ) : null;
};

OrderDetailsDataDisplay.propTypes = {
  displayOutput: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

export default OrderDetailsDataDisplay;
