import { useEffect, useContext } from 'react';

import ESL_EPT from '../../../data/eslEndpoints';
import { fetchESLservice } from '../../../services/eslService';
import { CommerceContext } from '../../../context/CommerceContext';
import createConditionalEvent from '../../../utils/conditional';
import checkoutFormConst from '../../../constants/checkoutFormConst';
import { AuthContext } from '../../../context/AuthContext';

import { bodyDatasets, findAddressById, isLoggedIn, scrollToTop, getCheckboxState, compareObject, } from '../../../utils/common';
import {
  disablePaymentTabs,
  enablePaymentTabs,
  getSelectedPaymentType,
  hidePaymentTabs,
  setPaymentMethod,
  showAvailablePaymentTabs,
  showPaymentTabsSpinner,
} from '../../../utils/paymentTabs';

const { STEP_TWO, CONTINUE_BUTTON, BACK_BUTTON, PAYMENTTABS, PAYMENTTABS_PAYMENT_TYPE, PAYMENTTABS_TABS } = checkoutFormConst;

const StepTwoController = ({ setStepOneReady, setStepTwoReady }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);

  const { combinePaymentCheckout } = bodyDatasets();

  const selectedShippingMethod =
    commerceContext?.checkout?.selectedShippingMethod;

  useEffect(() => {
    if (selectedShippingMethod) {
      document
        .querySelector(`${STEP_TWO} ${CONTINUE_BUTTON}`)
        .removeAttribute('disabled');
    } else {
      document
        .querySelector(`${STEP_TWO} ${CONTINUE_BUTTON}`)
        .setAttribute('disabled', 'true');
    }
  }, [selectedShippingMethod]);

  useEffect(() => {
    const clickHandlers = [
      {
        selector: `${STEP_TWO} ${CONTINUE_BUTTON}`,
        selectAll: false,
        handler: async (e) => {
          // Scroll to top of page on step click
          scrollToTop();
          let paymentMethodsPayload = '';
          const cart = commerceContext?.cart;
          const cartId = cart?.id;
          const selectedPaymentType = getSelectedPaymentType();

          const setShippingAndMethod = async () => {
            let shippingPayload = {
              cartId,
              carrier_code:
                commerceContext?.checkout?.selectedShippingMethod?.carrier_code,
              method_code:
                commerceContext?.checkout?.selectedShippingMethod?.method_code,
            };

            if (
              userIsLoggedIn &&
              commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id
            ) {
              const shippingAddressId = 
                commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id;
              shippingPayload.addressId = shippingAddressId;

              const matchedShippingAddress = findAddressById(
                commerceContext?.profile?.addresses?.shipping,
                shippingAddressId
              );

              localStorage.setItem('activeShippingAddress', JSON.stringify(matchedShippingAddress));
            } else {
              shippingPayload.shipping = {
                address:
                  commerceContext?.checkout?.stepOneFormData?.shipping?.address,
              };
            }

            const shippingParams = {
              service: userIsLoggedIn ? ESL_EPT.shippingAuth : ESL_EPT.shipping,
              data: shippingPayload,
              addAuthHeaders: userIsLoggedIn,
              withRecaptcha: !userIsLoggedIn,
            };

            return await fetchESLservice(shippingParams);
          };

          let sameShippingBillingAddress = 0

          const getPaymentMethods = async () => {
            sameShippingBillingAddress = getCheckboxState(
              document.querySelector(
                `input[type="checkbox"][name="shipping.address.sameAsBilling"]`
              )
            );
            
            //if we refresh the page on checkout step 3, sameShippingBillingAddress initially getting true
            if(sameShippingBillingAddress && commerceContext?.checkout?.stepOneFormData?.shipping?.address?.id 
             == commerceContext?.checkout?.stepOneFormData?.billing?.address?.id){
              sameShippingBillingAddress = 1 
            }else{
              sameShippingBillingAddress = 0
            }

             paymentMethodsPayload = {
              cartId,
              shipping: commerceContext?.checkout?.stepOneFormData?.shipping,
              billing: sameShippingBillingAddress
                ? commerceContext?.checkout?.stepOneFormData?.shipping 
                : commerceContext?.checkout?.stepOneFormData?.billing,
              order: {
                orderDeliveryType: 'normal',
                orderGrossTotalBill:
                  cart?.prices?.subtotal_excluding_tax?.value,
                orderTotalOrderValue: cart?.prices?.grand_total?.value,
                orderCurrency: cart?.prices?.grand_total?.currency,
              },
            };

            const getPaymentMethodsParams = {
              service: userIsLoggedIn
                ? ESL_EPT.paymentMethodsAuth
                : ESL_EPT.paymentMethods,
              data: paymentMethodsPayload,
              addAuthHeaders: userIsLoggedIn,
              withRecaptcha: !userIsLoggedIn,
            };

            let localPaymentMethodsPayload = JSON.parse(localStorage.getItem('paymentMethodsPayload'))
            if (localPaymentMethodsPayload) {
              let payloadUpdateVal = compareObject(paymentMethodsPayload, localPaymentMethodsPayload)
              if (!payloadUpdateVal) {
                return await fetchESLservice(getPaymentMethodsParams);
              }
              else {
                enablePaymentTabs();
                showAvailablePaymentTabs(
                  commerceContext?.checkout?.paymentMethodsResponse?.response?.paymentMethods
                );
                showPaymentTabsSpinner(false);
                return commerceContext?.checkout?.paymentMethodsResponse
              }
            } else {
              return await fetchESLservice(getPaymentMethodsParams);
            }
          };

          const setShippingAndPayment = async () => {
            const combinedPaymentParams = {
              service: userIsLoggedIn
                ? ESL_EPT.combinePrivatePayment
                : ESL_EPT.combinePublicPayment,
              data: {
                action: 'setShippingAndPayment',
                shipping: {
                  address:
                    commerceContext?.checkout?.stepOneFormData?.shipping
                      ?.address,
                  carrier_code:
                    commerceContext?.checkout?.selectedShippingMethod
                      ?.carrier_code,
                  method_code:
                    commerceContext?.checkout?.selectedShippingMethod
                      ?.method_code,
                },
                cartId,
                paymentMethod: selectedPaymentType,
              },
              addAuthHeaders: userIsLoggedIn,
            };

            return await fetchESLservice(combinedPaymentParams);
          };

          try {
            hidePaymentTabs();
            showPaymentTabsSpinner();
            disablePaymentTabs();

            let shippingResponse,
              paymentMethodsResponse,
              setPaymentMethodResponse,
              responsePaymentMethod;

            if (combinePaymentCheckout === 'true') {
              const { data: combinedPaymentResponse } = await setShippingAndPayment();

              shippingResponse = combinedPaymentResponse;

              paymentMethodsResponse = {
                response: {
                  paymentMethods:
                    combinedPaymentResponse?.response?.data?.cart
                      ?.available_payment_methods,
                },
              };

              setPaymentMethodResponse = combinedPaymentResponse;
            } else {
              [
                { data: shippingResponse },
                { data: paymentMethodsResponse },
              ] = await Promise.all([
                setShippingAndMethod(),
                getPaymentMethods(),
              ]);

                responsePaymentMethod = paymentMethodsResponse;

                if (!paymentMethodsResponse){
                  responsePaymentMethod = commerceContext?.checkout?.paymentMethodsResponse
                }

              let updatedShippingAddress = JSON.parse(localStorage.getItem('activeShippingAddress'));
              updatedShippingAddress = {
                ...updatedShippingAddress,
                middleName: shippingResponse?.response?.data?.cart?.shipping_addresses[0]?.middlename || '',
                streetLine1: shippingResponse?.response?.data?.cart?.shipping_addresses[0]?.street[0] || 
                  updatedShippingAddress.streetLine1,
                streetLine2: shippingResponse?.response?.data?.cart?.shipping_addresses[0]?.street[1] || '',
                countryId: shippingResponse?.response?.data?.cart?.shipping_addresses[0]?.country?.code ||
                  updatedShippingAddress.country
              };
              localStorage.setItem('activeShippingAddress', JSON.stringify(updatedShippingAddress));

              // storing the risk check communication token in local storage
              const riskCheckCommunicationToken = responsePaymentMethod?.response?.communicationToken;
              if(riskCheckCommunicationToken) {
                localStorage.setItem('riskCheckCommunicationToken', JSON.stringify(riskCheckCommunicationToken));
                localStorage.setItem('defaultPaymentMethod', JSON.stringify(selectedPaymentType));
              } else {
                // remove the previously stores communicationToken if we did not receive it
                localStorage.removeItem('riskCheckCommunicationToken');
              }

              const paymentMethodTab = shippingResponse?.response?.data?.cart?.selected_payment_method?.code || selectedPaymentType;

              const tabbedPayments = document.querySelectorAll(`[${PAYMENTTABS}] ${PAYMENTTABS_TABS}`)
              if (tabbedPayments) {
                let checkClick = false;

                let isAvailable = responsePaymentMethod?.response?.paymentMethods?.find(paymentMethod =>
                  paymentMethod?.code.toLowerCase() == paymentMethodTab.toLowerCase())
                
                //To persist selected payment tab in case page refresh
                tabbedPayments.forEach((paymentTab) => {
                  let paymentType = paymentTab.getAttribute(PAYMENTTABS_PAYMENT_TYPE);
                  if (paymentMethodTab == paymentType && isAvailable) {
                    checkClick = true
                    paymentTab.click();
                    return
                  }
                })
                
                if (!checkClick) {
                  const isSelectedPaymentTypeAvailable = responsePaymentMethod?.response?.paymentMethods?.find(paymentMethod =>
                    paymentMethod?.code.toLowerCase() === selectedPaymentType.toLowerCase());

                  if (!isSelectedPaymentTypeAvailable) {
                    setPaymentMethodResponse = null;
                  } else {
                    setPaymentMethodResponse = await setPaymentMethod(
                      userIsLoggedIn,
                      cartId,
                      selectedPaymentType
                    );
                  }
                }
              }
            }
            localStorage.setItem('paymentMethodsPayload', JSON.stringify(paymentMethodsPayload))
            localStorage.setItem('paymentMethodsResponse', JSON.stringify(responsePaymentMethod))

            const updatedCommerceContext = {
              ...commerceContext,
              'paymentMethodsPayload': paymentMethodsPayload,
              cart:
                shippingResponse?.response?.data?.cart ||
                shippingResponse?.response?.data?.customerCart ||
                cart,
              checkout: {
                ...commerceContext?.checkout,
                shippingResponse,
                paymentMethodsResponse : responsePaymentMethod ? responsePaymentMethod : commerceContext?.checkout?.paymentMethodsResponse,
                setPaymentMethodResponse,
              },
              checkoutStep: 3,
            };

            enablePaymentTabs();
            showAvailablePaymentTabs(
              responsePaymentMethod ? responsePaymentMethod?.response?.paymentMethods : commerceContext?.checkout?.paymentMethodsResponse
            );
            showPaymentTabsSpinner(false);

            await setCommerceContext(updatedCommerceContext);
          } catch (e) {}
        },
      },
      {
        selector: `${STEP_TWO} ${BACK_BUTTON}`,
        selectAll: false,
        handler: (e) => {
          // Scroll to top of page on back click
          scrollToTop();

          // Clearing the stored communicationToken
          localStorage.removeItem('riskCheckCommunicationToken');

          const shippingMethodsEvent = createConditionalEvent(
            false,
            'shippingMethodsAvailable'
          );
          window.dispatchEvent(shippingMethodsEvent);
          setCommerceContext({
            ...commerceContext,
            checkout: {
              ...commerceContext?.checkout,
              billingResponse: null,
              shippingMethodsResponse: null,
              selectedShippingMethod: null,
              setPaymentMethodResponse: null,
            },
            checkoutStep: 1,
          });
        },
      },
      {
        selector:
          '#shipping-address-edit-form [data-conditional-variable="shippingAddLine2"]',
        selectAll: false,
        handler: (e) => {
          window.dispatchEvent(
            createConditionalEvent(true, 'shippingAddLine2')
          );
        },
      },
    ];

    clickHandlers.forEach((v) => {
      if (v.selectAll) {
        document
          .querySelectorAll(v.selector)
          ?.forEach((selection) =>
            selection.addEventListener('click', v.handler)
          );
      } else if (document.querySelector(v.selector)) {
        document.querySelector(v.selector).addEventListener('click', v.handler);
      }
    });

    return () => {
      clickHandlers.forEach((v) => {
        if (v.selectAll) {
          document
            .querySelectorAll(v.selector)
            ?.forEach((selection) =>
              selection.removeEventListener('click', v.handler)
            );
        } else if (document.querySelector(v.selector)) {
          document
            .querySelector(v.selector)
            .removeEventListener('click', v.handler);
        }
      });
    };
  }, [commerceContext, setCommerceContext]);

  return null;
};

export default StepTwoController;
