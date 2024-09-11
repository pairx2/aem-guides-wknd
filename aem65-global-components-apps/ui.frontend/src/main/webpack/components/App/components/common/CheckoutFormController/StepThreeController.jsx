import { useEffect, useContext, useState } from 'react';

import { CommerceContext } from '../../../context/CommerceContext';
import createConditionalEvent from '../../../utils/conditional';
import checkoutFormConst from '../../../constants/checkoutFormConst';
import {
  addEventHandlers,
  isLoggedIn,
  removeEventHandlers,
  removeSpacingFromParent,
  scrollToTop,
  compareObject,
} from '../../../utils/common';
import {
  disablePaymentTabs,
  enablePaymentTabs,
  getPaymentTabs,
  getSelectedPaymentType,
  hidePaymentTabs,
  resetSelectedPaymentMethodResponse,
  setPaymentMethod,
  showAvailablePaymentTabs,
  showPaymentTabsSpinner,
} from '../../../utils/paymentTabs';
import { AuthContext } from '../../../context/AuthContext';
import { fetchESLservice } from '../../../services/eslService';
import ESL_EPT from '../../../data/eslEndpoints';

const {
  STEP_THREE,
  BACK_BUTTON,
  OPEN_INVOICE_BUTTON,
  COD_BUTTON,
  FREE_ORDER_BUTTON,
  SUMMARY_PAGE_ATTRIBUTE,
  PAYMENTTABS,
  PAYMENTTABS_PAYMENT_TYPE,
  PAYMENTTABS_TABS,
  TABBED_PAYMENTS,
  TABBED_PAYMENT_TYPES,
} = checkoutFormConst;

const StepThreeController = ({ setStepTwoReady }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [openRiskCheckModal, setOpenRiskCheckModal] = useState(false);
  const riskCheckTriggerBtn = document.getElementById('riskcheck-button');
  if(riskCheckTriggerBtn) {
    riskCheckTriggerBtn.parentElement.style.visibility = 'hidden';
  }

  const riskCheckShippingAddressSelectors = {
    street: 'riskcheck-shipping-address-street',
    city: 'riskcheck-shipping-address-city',
    country: 'riskcheck-shipping-address-country',
    zipCode: 'riskcheck-shipping-address-zipCode'
  }

  const riskCheckBillingAddressSelectors = {
    street: 'riskcheck-billing-address-street',
    city: 'riskcheck-billing-address-city',
    country: 'riskcheck-billing-address-country',
    zipCode: 'riskcheck-billing-address-zipCode'
  }

  const continueToPlaceOrderPage = async (event, button, resourcePath) => {
    event.preventDefault();
    localStorage.removeItem('defaultPaymentMethod');
    localStorage.removeItem('paymentMethodsResponse');
    localStorage.removeItem('paymentMethodsPayload');

    if (button && button.parentElement) {
      button.parentElement.classList.add('a-button--spinner');
    }

    if (commerceContext?.checkout?.setPaymentMethodResponse?.errorCode === 0) {
      const summaryPage = document
        .querySelector(`[${SUMMARY_PAGE_ATTRIBUTE}]`)
        .getAttribute(SUMMARY_PAGE_ATTRIBUTE);

      location.href = `${summaryPage}?resourcePath=${resourcePath}`;
    }
  };

  const createUpdateAddressPayload = (address, updatedFields) => {
    return {
      id: address.id,
      firstName: address.firstName,
      middleName: address.middleName || '',
      lastName: address.lastName,
      streetLine1: updatedFields.street.trim(),
      streetLine2: address.streetLine2,
      zipCode: updatedFields.zipCode,
      city: updatedFields.city,
      prefix: address.prefix,
      region: address.region,
      name_of_address: address.nameOfAddress,
      countryId: address.countryId,
      telephone: address.telephone,
      default_shipping: address.default_shipping,
      default_billing: address.default_billing,
      verification_status: address?.verification_status || '0',
      validation_id: "null"
    }
  };

  const formatAddress = (address) => {
    return {
      prefix: address.prefix,
      region: address.region,
      nameOfAddress: address.nameOfAddress,
      id: address.id,
      default_shipping: address.default_shipping,
      default_billing: address.default_billing,
      firstName: address.firstName,
      ...(!!(address?.middleName) && {middleName: address.middleName}),
      lastName: address.lastName,
      streetLine1: address.streetLine1,
      streetLine2: address.streetLine2,
      city: address.city,
      country: address.country,
      zipCode: address.zipCode,
      telephone: address.telephone,
      email: address.email,
      countryId: address.countryId
    }
  };

  const createUpdatedCorrectedAddress = (existingAddress, correctedAddress) => {
    return {
      ...existingAddress,
      streetLine1: correctedAddress.street.trim(),
      city: correctedAddress.city,
      country: correctedAddress.country,
      zipCode: correctedAddress.zipCode
    }
  }

  const displayRiskCheckAddress = (selectors, address) => {
    Object.keys(selectors).forEach(key => {
      const foundSelector = document.getElementById(selectors[key]);
      foundSelector.innerHTML = address[key];
      foundSelector.parentElement.style.margin = '0px';
      foundSelector.parentElement.style.padding = '0px';
    });
  }

  const updateAddress = async (correctedAddress) => {
    const { data, errorCode } = await fetchESLservice({
      service: ESL_EPT.editProfileAddress,
      data: {
        address: {
          ...correctedAddress
        },
      },
      withRecaptcha: false,
      addAuthHeaders: true,
    });

    if (errorCode || data?.errorCode) {
      throw new Error(data?.response?.statusReason);
    }
  };

  const setBilling = async () => {
    const activeBillingAddress = JSON.parse(localStorage.getItem('activeBillingAddress'));
    const billingPayload = {
      cartId: commerceContext?.cart?.id,
      addressId: activeBillingAddress.id
    };

    const billingParams = {
      service: userIsLoggedIn ? ESL_EPT.billingAuth : ESL_EPT.billing,
      data: billingPayload,
      addAuthHeaders: userIsLoggedIn,
      withRecaptcha: !userIsLoggedIn,
    };

    return await fetchESLservice(billingParams);
  };

  const setShipping = async () => {
    const activeShippingAddress = JSON.parse(localStorage.getItem('activeShippingAddress'));
    let shippingPayload = {
      cartId: commerceContext?.cart?.id,
      carrier_code:
        commerceContext?.checkout?.selectedShippingMethod?.carrier_code,
      method_code:
        commerceContext?.checkout?.selectedShippingMethod?.method_code,
      addressId: activeShippingAddress.id
    };

    const shippingParams = {
      service: userIsLoggedIn ? ESL_EPT.shippingAuth : ESL_EPT.shipping,
      data: shippingPayload,
      addAuthHeaders: userIsLoggedIn,
      withRecaptcha: !userIsLoggedIn,
    };

    return await fetchESLservice(shippingParams);
  };

  const getPaymentMethods = async () => {
    const activeBillingAddress = formatAddress(JSON.parse(localStorage.getItem('activeBillingAddress')));
    const activeShippingAddress = formatAddress(JSON.parse(localStorage.getItem('activeShippingAddress')));

    const paymentMethodsPayload = {
      cartId: commerceContext?.cart?.id,
      shipping: {
        address: {
          ...activeShippingAddress
        }
      },
      billing: {
        address: {
          ...activeBillingAddress
        }
      },
      order: {
        orderDeliveryType: 'normal',
        orderGrossTotalBill:
          commerceContext?.cart?.prices?.subtotal_excluding_tax?.value,
        orderTotalOrderValue: commerceContext?.cart?.prices?.grand_total?.value,
        orderCurrency: commerceContext?.cart?.prices?.grand_total?.currency,
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
        const paymentMethodsResponse = await fetchESLservice(getPaymentMethodsParams)
        localStorage.setItem('paymentMethodsPayload', JSON.stringify(paymentMethodsPayload))
        return paymentMethodsResponse;
      }else{
        enablePaymentTabs();
        showAvailablePaymentTabs(
          commerceContext?.checkout?.paymentMethodsResponse?.response?.paymentMethods
        );
        showPaymentTabsSpinner(false);
      }
    }
    else{
      const paymentMethodsResponse = await fetchESLservice(getPaymentMethodsParams)
      localStorage.setItem('paymentMethodsPayload', JSON.stringify(paymentMethodsPayload))
      return paymentMethodsResponse;
    }
  };

  const handleRiskCheckAccept = async () => {
    document.getElementById('riskcheck-button-accept').disabled = true;
    try {
      const updateAddressMessage = document.getElementById('risk-check-update-address-message');
      const selectedPaymentType = JSON.parse(localStorage.getItem('defaultPaymentMethod')) || getSelectedPaymentType();
      let defaultSelectedPaymentTab = '';
      if(updateAddressMessage) {
        updateAddressMessage.parentElement.style.display = 'block';
      }
      const fetchedPaymentMethodsResponse = commerceContext?.checkout?.paymentMethodsResponse?.response;
      const activeBillingAddress = JSON.parse(localStorage.getItem('activeBillingAddress'));
      const activeShippingAddress = JSON.parse(localStorage.getItem('activeShippingAddress'));
      
      if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedBillingAddress') &&
        fetchedPaymentMethodsResponse.hasOwnProperty('correctedShippingAddress')
      ) {
        if(activeBillingAddress.id === activeShippingAddress.id) {
          const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedShippingAddress;
          const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedBillingAddress;
          const correctedBillingShippingAddressPayload = createUpdateAddressPayload(
            activeShippingAddress, paymentMethodsShippingResponse
          );
          await updateAddress(correctedBillingShippingAddressPayload);
          const updatedBillingAddress = createUpdatedCorrectedAddress(activeBillingAddress, paymentMethodsBillingResponse);
          const updatedShippingAddress = createUpdatedCorrectedAddress(activeShippingAddress, paymentMethodsShippingResponse);

          localStorage.setItem('activeShippingAddress', JSON.stringify(updatedShippingAddress));
          localStorage.setItem('activeBillingAddress', JSON.stringify(updatedBillingAddress));
        } else {
          const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedShippingAddress;
          const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedBillingAddress;

          const shippingAddressPayload = createUpdateAddressPayload(
            activeShippingAddress, paymentMethodsShippingResponse
          );

          const billingAddressPayload = createUpdateAddressPayload(
            activeBillingAddress, paymentMethodsBillingResponse
          );

          await updateAddress(shippingAddressPayload);
          await updateAddress(billingAddressPayload);

          const updatedBillingAddress = createUpdatedCorrectedAddress(activeBillingAddress, paymentMethodsBillingResponse);
          const updatedShippingAddress = createUpdatedCorrectedAddress(activeShippingAddress, paymentMethodsShippingResponse);

          localStorage.setItem('activeShippingAddress', JSON.stringify(updatedShippingAddress));
          localStorage.setItem('activeBillingAddress', JSON.stringify(updatedBillingAddress));
        }
      } else if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedBillingAddress')) {
        const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedBillingAddress;
        const billingAddressPayload = createUpdateAddressPayload(
          activeBillingAddress, paymentMethodsBillingResponse
        );
        await updateAddress(billingAddressPayload);
        
        const updatedBillingAddress = createUpdatedCorrectedAddress(activeBillingAddress, paymentMethodsBillingResponse);

        localStorage.setItem('activeBillingAddress', JSON.stringify(updatedBillingAddress));
      } else if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedShippingAddress')) {
        const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.response?.correctedShippingAddress;
        const shippingAddressPayload = createUpdateAddressPayload(
          activeShippingAddress, paymentMethodsShippingResponse
        );
        await updateAddress(shippingAddressPayload);

        const updatedShippingAddress = createUpdatedCorrectedAddress(activeShippingAddress, paymentMethodsShippingResponse);
        localStorage.setItem('activeShippingAddress', JSON.stringify(updatedShippingAddress));
      }

      const { data: billingResponse } = await setBilling();
      const { data: shippingResponse } = await setShipping();

      document.getElementById('riskcheck-button-modal').style.display = 'none';
      document.querySelectorAll('div.modal-backdrop').forEach(item => item.remove());
      document.getElementById('myfreestyle-checkout-page').classList.remove('modal-open');

      hidePaymentTabs();
      showPaymentTabsSpinner();
      disablePaymentTabs();
      
      const { data: paymentMethodsResponse } = await getPaymentMethods();
      localStorage.setItem('paymentMethodsResponse', JSON.stringify(paymentMethodsResponse))

      // updating the risk check communication token based on latest api call
      const riskCheckCommunicationToken = paymentMethodsResponse?.response?.communicationToken;
      if(riskCheckCommunicationToken) {
        localStorage.setItem('riskCheckCommunicationToken', JSON.stringify(riskCheckCommunicationToken));
      } else {
        // remove the previously stores communicationToken if we did not receive it
        localStorage.removeItem('riskCheckCommunicationToken');
      }

      const isSelectedPaymentTypeAvailable = paymentMethodsResponse?.response?.paymentMethods?.find(paymentMethod =>
        paymentMethod?.code.toLowerCase() === selectedPaymentType.toLowerCase());

      if(isSelectedPaymentTypeAvailable) {
        const paymentTabs = getPaymentTabs();
        defaultSelectedPaymentTab = selectedPaymentType;
        paymentTabs.forEach(tab => {
          if(tab.getAttribute(PAYMENTTABS_PAYMENT_TYPE) === selectedPaymentType) {
            tab.click();
          }
        });
      }

      const updatedCommerceContext = {
        ...commerceContext,
        cart: shippingResponse?.response?.data?.cart ||
          shippingResponse?.response?.data?.customerCart ||
          commerceContext?.cart,
        checkout: {
          ...commerceContext?.checkout,
          billingResponse,
          shippingResponse,
          paymentMethodsResponse
        },
      };
  
      enablePaymentTabs();
      showAvailablePaymentTabs(
        paymentMethodsResponse?.response?.paymentMethods,
        defaultSelectedPaymentTab,
        commerceContext
      );
      showPaymentTabsSpinner(false);

      setCommerceContext(updatedCommerceContext);
    } catch(err) {
      console.log('Error while approving risk check address', err.message);
      document.getElementById('riskcheck-button-modal').style.display = 'none';
      document.querySelectorAll('div.modal-backdrop').forEach(item => item.remove());
      document.getElementById('myfreestyle-checkout-page').classList.remove('modal-open');
    }
  };

  // Normalize custom-tabs (tabbedPayments) & payment-tabs components. Backward compatible
  useEffect(() => {
    const tabbedPayments = document.querySelector(TABBED_PAYMENTS);

    if (tabbedPayments) {
      tabbedPayments.setAttribute(PAYMENTTABS, '');
      tabbedPayments.classList.add('d-tab');

      tabbedPayments
        .querySelectorAll(PAYMENTTABS_TABS)
        .forEach((paymentTab) => {
          const paymentTypeTitle = paymentTab.textContent.trim();
          const paymentTypeCode = TABBED_PAYMENT_TYPES.find(
            (paymentType) => paymentType.title.trim() === paymentTypeTitle
          )?.code;

          if (paymentTypeCode) {
            paymentTab.setAttribute(PAYMENTTABS_PAYMENT_TYPE, paymentTypeCode);
          }
        });
    }
  }, []);

  useEffect(() => {
    const correctedShippingAddress = commerceContext?.checkout
      ?.paymentMethodsResponse?.response?.correctedShippingAddress || {};
    const correctedBillingAddress = commerceContext?.checkout
      ?.paymentMethodsResponse?.response?.correctedBillingAddress || {};
    if(Object.keys(correctedShippingAddress).length
      || Object.keys(correctedBillingAddress).length) {
      setOpenRiskCheckModal(true);
      if(document.getElementById('risk-check-address-modal')) {
        const updateAddressMessage = document.getElementById('risk-check-update-address-message');
        if(updateAddressMessage) {
          updateAddressMessage.parentElement.style.display = 'none';
        }
        removeSpacingFromParent('riskcheck-shipping-address-title');
        removeSpacingFromParent('riskcheck-billing-address-title');
        if(Object.keys(correctedShippingAddress).length && Object.keys(correctedBillingAddress).length) {
          displayRiskCheckAddress(riskCheckShippingAddressSelectors, correctedShippingAddress);
          displayRiskCheckAddress(riskCheckBillingAddressSelectors, correctedBillingAddress);
        } else if(Object.keys(correctedShippingAddress).length) {
          document.getElementById('section-riskcheck-billing-address').style.display='none';
          displayRiskCheckAddress(riskCheckShippingAddressSelectors, correctedShippingAddress);
        } else if(Object.keys(correctedBillingAddress).length) {
          document.getElementById('section-riskcheck-shipping-address').style.display='none';
          displayRiskCheckAddress(riskCheckBillingAddressSelectors, correctedBillingAddress);
        } else {
          document.getElementById('section-riskcheck-shipping-address').style.display='none';
          document.getElementById('section-riskcheck-billing-address').style.display='none';
        }

        const riskCheckAccept = document.getElementById('riskcheck-button-accept');
        riskCheckAccept.addEventListener('click', handleRiskCheckAccept);
      }
    }

    const freeOrderBtn = document.querySelector(`${STEP_THREE} ${FREE_ORDER_BUTTON}`);
    const paymentResponse = commerceContext?.checkout?.setPaymentMethodResponse;
    if(freeOrderBtn && paymentResponse) {
      freeOrderBtn.disabled = false;
    }

    const clickHandlers = [
      {
        selector: `${STEP_THREE} ${BACK_BUTTON}`,
        handler: (e) => {
          // Scroll to top of page on back click
          scrollToTop();
          setOpenRiskCheckModal(false);
          localStorage.removeItem('defaultPaymentMethod');

          const shippingMethodsEvent = createConditionalEvent(
            false,
            'shippingMethodsAvailable'
          );
          window.dispatchEvent(shippingMethodsEvent);
          setCommerceContext({
            ...commerceContext,
            checkout: {
              ...commerceContext?.checkout,
              shippingResponse: null,
              paymentMethodsResponse: commerceContext?.checkout?.paymentMethodsResponse,
              setPaymentMethodResponse: commerceContext?.checkout?.setPaymentMethodResponse,
            },
            checkoutStep: 2,
          });
        },
      },
      {
        selector:
          '#billing-address-edit-form [data-conditional-variable="billingAddLine2"]',
        handler: (e) => {
          window.dispatchEvent(createConditionalEvent(true, 'billingAddLine2'));
        },
      },
      {
        selector: `${STEP_THREE} [${PAYMENTTABS_PAYMENT_TYPE}]`,
        handler: async (e) => {
          e.preventDefault();

          showPaymentTabsSpinner();
          resetSelectedPaymentMethodResponse(
            commerceContext,
            setCommerceContext
          );
          disablePaymentTabs();

          const setPaymentMethodResponse = await setPaymentMethod(
            userIsLoggedIn,
            commerceContext?.cart?.id,
            getSelectedPaymentType()
          );

          enablePaymentTabs();
          showPaymentTabsSpinner(false);
          const paymentMethodsResponse = JSON.parse(localStorage.getItem('paymentMethodsResponse'));
          setCommerceContext({
            ...commerceContext,
            cart: setPaymentMethodResponse?.response?.data?.cart || cart,
            checkout: {
              ...commerceContext?.checkout,
              paymentMethodsResponse,
              setPaymentMethodResponse,
            },
            checkoutStep: 3,
          });
        },
      },
      {
        selector: `${STEP_THREE} ${OPEN_INVOICE_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${STEP_THREE} ${OPEN_INVOICE_BUTTON}`),
            'invoice'
          ),
      },
      {
        selector: `${STEP_THREE} ${FREE_ORDER_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${STEP_THREE} ${FREE_ORDER_BUTTON}`),
            'nopayment'
          ),
      },
      {
        selector: `${STEP_THREE} ${COD_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${STEP_THREE} ${COD_BUTTON}`),
            'cashondelivery'
          ),
      },
    ];

    addEventHandlers('click', clickHandlers);

    return () => {
      removeEventHandlers('click', clickHandlers);
      setOpenRiskCheckModal(false);
    };
  }, [commerceContext, setCommerceContext]);

  useEffect(() => {
    if(openRiskCheckModal) {
      riskCheckTriggerBtn.click();
    }
  }, [openRiskCheckModal])

  return null;
};

export default StepThreeController;
