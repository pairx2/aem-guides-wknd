import getSymbolFromCurrency from 'currency-symbol-map';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CommerceContext } from '../../context/CommerceContext';
import RadioButton from '../atoms/RadioButton';
import LoadingIndicator from '../common/LoadingIndicator';
import createConditionalEvent from '../../utils/conditional';
import { i18nErrorLookup, getFormattedDate } from '../../utils/common';

const shippingMethodsErrorEvent = createConditionalEvent(
  'error',
  'shippingMethodsAvailable'
);

function ShippingMethods() {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const cartShipping = commerceContext?.cart?.shipping_addresses[0]?.selected_shipping_method;

  const { t } = useTranslation();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState();

  const shippingMethodsResponse =
    commerceContext?.checkout?.shippingMethodsResponse;

  const isLoading = !Boolean(shippingMethodsResponse) && !Boolean(commerceContext?.checkout?.availableShippingMethods);
  //const isLoading = !Boolean(shippingMethodsResponse) 
  const availableShippingMethods =
    shippingMethodsResponse?.response?.shipping || commerceContext?.checkout?.availableShippingMethods || [];
  const isError =
    shippingMethodsResponse?.errorCode > 0 ||
    availableShippingMethods.length === 0;

  const updateShipping = (item) => {
    const ctx = {...commerceContext};
    const shipping = {
      amount: item?.amount?.value != undefined && item?.amount?.currency
        ? item?.amount 
        : {
        value: item?.amount,
        currency:commerceContext?.cart?.prices?.grand_total?.currency,},
      carrier_code: item?.carrier_code,
      carrier_title: item?.carrier_title,
      method_code: item?.method_code,
      method_title: item?.method_title,
    };

    const newSelectedShippingMethod = {
      ...ctx?.cart?.shipping_addresses[0],
      selected_shipping_method: { ...shipping } 
    };
    ctx.cart.shipping_addresses = [ newSelectedShippingMethod ];
    ctx.checkout.selectedShippingMethod = { ...item };

    return ctx;
  };

  const updateShippingMethod = useCallback(
    (item) => {
      if(item?.carrier_code != commerceContext?.checkout?.selectedShippingMethod?.carrier_code && commerceContext?.checkout?.selectedShippingMethod?.carrier_code){
        localStorage.removeItem('riskcheckPopUpAccept');
      }
      setCommerceContext({
        ...commerceContext,
        checkout: {
          ...commerceContext?.checkout,
          selectedShippingMethod: item,
        },
      });
      setSelectedShippingMethod(`${item?.carrier_code}_${item?.method_code}`);

      if (!cartShipping?.carrier_code) {
        setCommerceContext({ ...updateShipping(item) });
      }
    },
    [commerceContext, setCommerceContext, setSelectedShippingMethod]
  );

  useEffect(() => {
    // set initial shipping method when done loading
    // or dispatch error if no shipping methods are returned
    if (!isLoading && !selectedShippingMethod) {
      if (availableShippingMethods.length > 0) {
        if (cartShipping?.carrier_code) {
          setSelectedShippingMethod(`${cartShipping.carrier_code}_${cartShipping.method_code}`);
          updateShippingMethod(cartShipping);
        }
        else {
          const lowestPricedMethod = availableShippingMethods?.reduce(
            (prev, curr) => {
              return prev.amount < curr.amount ? prev : curr;
            }
          );
          updateShippingMethod(lowestPricedMethod);
        }
      }
      else {
        window.dispatchEvent(shippingMethodsErrorEvent);
      }
    } else if (!availableShippingMethods?.length) {
      // Unset shipping method if available shipping methods gets reset (when going back to step 1):
      setSelectedShippingMethod(null);
    }
  }, [
    isLoading,
    availableShippingMethods,
    selectedShippingMethod,
    updateShippingMethod,
  ]);

  const displayShippingText = (display)=>{
    return(<>{
      document
        .querySelector('#shipping-method-text') ?
        document
          .querySelector('#shipping-method-text')
          .setAttribute(
            'style',
            `display: ${display};`
          )
          : ''
      }
      </>
      )

  }
  if (isLoading) {
    if (!commerceContext?.checkout?.stepOneFormData?.billing?.address && !commerceContext?.checkout?.stepOneFormData?.shipping?.address) {
      return displayShippingText('block')
    } else {
      displayShippingText('none')
      return <LoadingIndicator />;
    }
  } else {
      displayShippingText('none')
  }

  if (isError) {
    window.dispatchEvent(shippingMethodsErrorEvent);

    return (
      <span>
        {`${t('error')} : ${
          i18nErrorLookup(shippingMethodsResponse)?.response?.statusReason
        }`}
      </span>
    );
  }

  return (
    <div className="m-shipping-methods__list">
      {availableShippingMethods.map((item) => (
        <div className="m-shipping-methods__list-item">
          <RadioButton
            text={item.method_title}
            value={item.carrier_code}
            name="shipping_methods"
            id={`${item.carrier_code}_${item.method_code}`}
            classes="m-shipping-methods__radio-btn"
            checked={`${item.carrier_code}_${item.method_code}` === selectedShippingMethod}
            onChange={() => updateShippingMethod(item)}
          />

          <span className="m-shipping-methods__price">
            {item?.amount?.value != undefined ?
              <>
                {item?.amount?.value === 0
                  ? t('free')
                  : `${getSymbolFromCurrency(
                    commerceContext?.cart?.items[0]?.prices?.price?.currency
                  )}${item?.amount?.value}`}
              </> : <>
                {item.amount === 0
                  ? t('free')
                  : `${getSymbolFromCurrency(
                    commerceContext?.cart?.items[0]?.prices?.price?.currency
                  )}${item.amount}`}
              </>
            }
          </span>
          {item.extension_attributes?.estimated_delivery_date && (
            <p className="m-shipping-methods__delivery">
              {t('estimated-delivery')}:{' '}
              {getFormattedDate(
                item.extension_attributes?.estimated_delivery_date,
                t
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShippingMethods;
