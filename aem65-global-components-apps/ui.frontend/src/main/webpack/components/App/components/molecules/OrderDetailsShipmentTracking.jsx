import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
import shipmentTracking from '../../constants/shipmentTrackingConst';
import { CommerceContext } from '../../context/CommerceContext';
import {
  getDateInPreferredLanguage,
  addOrdinalToDate,
} from '../../utils/common';
import { useTranslation } from 'react-i18next';

const orderId = new URLSearchParams(document.location.search).get('orderId');
const OrderDetailsShipmentTracking = ({
  arrivalPrefix,
  trackingNumberPrefix,
  enableArvatoWidget,
  arvatoScriptUrl
}) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [trackingNumbers, setTrackingNumbers] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState();
  const [lang, setLang] = useState()
  const [orderStatus, setOrderStatus] = useState(false)
  const { t } = useTranslation();
  const orderDetailData = commerceContext?.profile?.items?.orderDetail;

  const getTrackingNumbers = () => {
    const numbers = [];
    const shipments = orderDetailData.shipments;

    if (shipments) {
      shipments.forEach((shipment) => {
        if (shipment.tracking) {
          shipment.tracking.forEach((obj) => {
            numbers.push(obj.number);
          });
        }
      });
    }

    return numbers.join(', ');
  };

  useEffect(() => {
    if (orderDetailData) {
      setTrackingNumbers(getTrackingNumbers());
      const orderDate = getDateInPreferredLanguage(orderDetailData.order_date)?.split(' ');
      const translatedOrderDate = orderDate[0] + ' ' + t(orderDate[1].toLowerCase()) + ' ' + orderDate[2];
      setArrivalDate(
        addOrdinalToDate(translatedOrderDate, t)
      );
      if (enableArvatoWidget && arvatoScriptUrl) {
        const country = $("input[name='x-country-code']").val().toString().toUpperCase();
        let lang = $("input[name='x-preferred-language']").val();
        const zipcode = orderDetailData.shipping_address ? orderDetailData.shipping_address.postcode : '';
        const orderStatus = orderDetailData.status == shipmentTracking.ORDER_SHIPPED || orderDetailData.status == shipmentTracking.SHIPPED ? true : false

        if (lang) {
          lang = lang.split("_")
          setLang(lang[0])
          setCountry(country)
          setZipCode(zipcode)
          setOrderStatus(orderStatus)
        }
      }
    }
  }, [orderDetailData]);

  return (
    <div className="m-order-details-shipment-tracking__container">
      {arrivalDate && (
        <strong className="m-order-details-shipment-tracking__arrival">
          {arrivalPrefix} {arrivalDate}
        </strong>
      )}
      {trackingNumbers && (
        <p className="m-order-details-shipment-tracking__tracking">
          {trackingNumberPrefix}: {trackingNumbers}
        </p>
      )}
       {arvatoScriptUrl && orderStatus && enableArvatoWidget && (
        <>
        <InnerHTML html={`<script src='${arvatoScriptUrl}' />`} />
        <div>
          <arvato-track-and-trace-widget
            orderid={orderId}
            zipcode={zipCode}
            lang={lang}
            country={country}>
          </arvato-track-and-trace-widget>
        </div>
        </>
      )}
    </div>
  );
};

OrderDetailsShipmentTracking.PropTypes = {
  arrivalPrefix: PropTypes.string.isRequired,
  trackingNumberPrefix: PropTypes.string.isRequired,
  arvatoScriptUrl: PropTypes.string.isRequired,
  enableArvatoWidget: PropTypes.string.isRequired,
};

export default OrderDetailsShipmentTracking;
