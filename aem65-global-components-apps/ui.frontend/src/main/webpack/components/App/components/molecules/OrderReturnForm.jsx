import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import Alert from '../atoms/Alert';
import { CommerceContext } from '../../context/CommerceContext';
import {
  addEventHandlers,
  removeEventHandlers,
  isLoggedIn,
} from '../../utils/common';
import createConditionalEvent from '../../utils/conditional';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice } from '../../services/eslService';
import { AuthContext } from '../../context/AuthContext';

const initialCODPaymentFields = {
  iban: '',
  accountHolderName: '',
};

const OrderReturnForm = ({
  id,
  itemsLabel,
  itemsQtyLabel,
  commentLabel,
  commentPlaceholder,
  successPagePath,
}) => {
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const quantitySelectorElements = useRef([]);
  const commentsElement = useRef();

  const [returnableProductsList, setReturnableProductsList] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [hasItemsToReturn, setHasItemsToReturn] = useState(false);
  const [isCODPayment, setIsCODPayment] = useState(false);
  const [isInvoicePayment, setIsInvoicePayment] = useState(false);
  const [codPaymentFields, setCODPaymentFields] = useState(
    initialCODPaymentFields
  );

  const isValidForm = useMemo(
    () =>
      !isLoading &&
      hasItemsToReturn &&
      (!isInvoicePayment || 
        !Object.values(codPaymentFields).some((value) => !value.trim())) &&
      (!isCODPayment || 
        !Object.values(codPaymentFields).some((value) => !value.trim()))
      ,
    [isLoading, hasItemsToReturn, codPaymentFields]
  );

  const resetFormValues = () => {
    setCODPaymentFields(initialCODPaymentFields);
    setHasItemsToReturn(false);
    quantitySelectorElements.current.forEach((element) => (element.value = 0));
    if (commentsElement.current) commentsElement.current.value = '';
  };

  const handleQuantityChange = () =>
    setHasItemsToReturn(
      quantitySelectorElements.current.some(
        (element) => parseInt(element.value) > 0
      )
    );

  useEffect(() => {
    if (isCODPayment || isInvoicePayment) {
      const returnInformationContainer = document.querySelector(
        '#return-information'
      );

      const codFieldsSelector = Object.keys(codPaymentFields)
        .map((key) => `[name="${key}"]`)
        .join(',');

      const handleCODFieldChange = (e) =>
        setCODPaymentFields((current) => ({
          ...current,
          [e.target.name]: e.target.value,
        }));

      returnInformationContainer
        .querySelectorAll(codFieldsSelector)
        .forEach((element) =>
          element.addEventListener('input', handleCODFieldChange)
        );

      return () => {
        returnInformationContainer
          .querySelectorAll(codFieldsSelector)
          .forEach((element) =>
            element.removeEventListener('input', handleCODFieldChange)
          );
      };
    }
  }, [isCODPayment, isInvoicePayment]);

  useEffect(() => {
    if (isCODPayment) {
      window.dispatchEvent(createConditionalEvent(true, 'isCODPayment'));
    }
  }, [isCODPayment]);
  
  useEffect(() => {
    if (isInvoicePayment) {
      window.dispatchEvent(createConditionalEvent(true, 'isInvoicePayment'));
    }
  }, [isInvoicePayment]);

  useEffect(() => {
    const submitButton = document.querySelector('#submit-return-form');
    if (submitButton) {
      if (isValidForm) submitButton.removeAttribute('disabled');
      if (!isValidForm) submitButton.setAttribute('disabled', '');
    }
  }, [isValidForm]);

  useEffect(() => {
    const orderDetail = commerceContext?.profile?.items?.orderDetail;

    if (orderDetail) {
      const orderNumberElement = document.querySelector(
        '#return-order-number h3'
      );

      if (orderNumberElement) {
        orderNumberElement.innerHTML = orderNumberElement.innerHTML.replace(
          '${order-number}',
          '#' + orderDetail.number
        );
      }

      if (orderDetail.items) {
        const itemsEligibleForReturn = orderDetail.items.filter(
          (item) => item.eligible_for_return === true
        );

        const returnableProducts = itemsEligibleForReturn
          .map((eligibleItem) => {
            let quantityAvailableForReturn = eligibleItem.quantity_ordered;
            const returnedItem = orderDetail.items_eligible_for_return.find(
              (eligibleReturnItem) =>
                eligibleReturnItem.product_sku === eligibleItem.product_sku &&
                eligibleReturnItem.quantity_returned > 0
            );

            if (returnedItem) {
              quantityAvailableForReturn -= returnedItem.quantity_returned;
            }

            if (quantityAvailableForReturn > 0) {
              return {
                ...eligibleItem,
                quantity_available_for_return: quantityAvailableForReturn,
              };
            }
          })
          .filter(Boolean);

        setReturnableProductsList(returnableProducts);
      }

      setIsCODPayment(
        orderDetail.payment_methods[0]?.type === 'cashondelivery'
      );
      setIsInvoicePayment(
        orderDetail.payment_methods[0]?.type === 'openinvoice'
      );
    }
  }, [commerceContext]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `#packaging-seal-broken-options input`,
        handler: async (e) => {
          window.dispatchEvent(
            createConditionalEvent(e.target.value, 'isPackagingSealBroken')
          );
        },
      },
      {
        selector: `#submit-return-form`,
        handler: async (e) => {
          setIsLoading(true);

          let payload;
          const items = [];
          const orderNumber =
            commerceContext?.profile?.items?.orderDetail?.number;

          quantitySelectorElements.current.forEach((element) => {
            const quantity = parseInt(element.value);
            if (quantity > 0) {
              items.push({
                sku: element.getAttribute('product-sku'),
                quantity,
                itemCondition: 'seal unopened',
                resolution: 'Refund',
                reason: 'Authorized Return',
                comments: commentsElement.current?.value,
              });
            }
          });

          payload = {
            orderNumber,
            items,
          };

          if (isCODPayment || isInvoicePayment) {
            payload = { ...payload, ...codPaymentFields };
          }

          const apiParams = {
            service: ESL_EPT.submitOrderReturn,
            data: payload,
            addAuthHeaders: userIsLoggedIn,
            withRecaptcha: !userIsLoggedIn,
          };

          try {
            const { data } = await fetchESLservice(apiParams);

            if (data.status) {
              window.location.href = `${successPagePath}.html?orderId=${orderNumber}`;
            } else {
              setErrMessage(data?.response?.statusReason);
              resetFormValues();
              setIsLoading(false);
            }
          } catch (err) {
            throw new Error(err);
          }
        },
      },
      {
        selector: `#return-back-btn`,
        handler: async (e) => {
          history.back();
        },
      },
    ];

    addEventHandlers('click', clickHandlers);

    return () => {
      removeEventHandlers('click', clickHandlers);
    };
  }, [commerceContext, isCODPayment, isInvoicePayment, codPaymentFields]);

  return (
    <div className="return-products_container">
      <form className="return-products_form" id={id}>
        {errMessage && <Alert type="danger" message={errMessage} />}
        {
          <>
            {returnableProductsList.map((item, index) => (
              <div className="return-products_block">
                <div className="return-products_name">
                  <label>{itemsLabel}</label>
                  <input
                    name="productName"
                    type="text"
                    value={item.product_name}
                  />
                </div>
                <div className="return-products_qty">
                  <label>{itemsQtyLabel}</label>
                  <select
                    name="quantityToReturn"
                    product-sku={item.product_sku}
                    onChange={handleQuantityChange}
                    ref={(element) =>
                      (quantitySelectorElements.current[index] = element)
                    }
                  >
                    {[
                      ...Array(item.quantity_available_for_return + 1).keys(),
                    ].map((qty) => {
                      return <option value={qty}>{qty}</option>;
                    })}
                  </select>
                  <span className="dropdown-arrow" />
                </div>
              </div>
            ))}
            <div className="return-products_comment-block">
              <label>{commentLabel}</label>
              <textarea
                ref={commentsElement}
                name="comments"
                placeholder={commentPlaceholder}
                rows="2"
                cols="50"
              />
            </div>
          </>
        }
      </form>
    </div>
  );
};

export default OrderReturnForm;
