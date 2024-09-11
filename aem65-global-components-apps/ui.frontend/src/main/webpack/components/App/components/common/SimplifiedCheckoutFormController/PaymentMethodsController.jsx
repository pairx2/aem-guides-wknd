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
  validateRequiredFields,
  getCheckboxState,
  checkConsentStatus,
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
import { paymentMethodCall  } from './SimplifiedCheckoutAPIs';
import ESL_EPT from '../../../data/eslEndpoints';

const {
  PAYMENT_STEP,
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

const PaymentMethodsController = ({ setStepTwoReady }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const [openRiskCheckModal, setOpenRiskCheckModal] = useState(false);
  const [checkEventListner, setCheckEventListner] = useState(false);

  const [paymentAPICall, setPaymentAPICall] = useState(false);
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
    const activeBillingAddress = commerceContext?.checkout?.stepOneFormData?.billing?.address;
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
    const activeShippingAddress = commerceContext?.checkout?.stepOneFormData?.shipping?.address;
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
    if(!checkConsentStatus(commerceContext)){
      return
    }
    const activeBillingAddress = commerceContext?.checkout?.stepOneFormData?.billing?.address;
    const activeShippingAddress = commerceContext?.checkout?.stepOneFormData?.shipping?.address;

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
    return await fetchESLservice(getPaymentMethodsParams);
  };

  const handleRiskCheckAccept = async () => {
    document.getElementById('riskcheck-button-accept').disabled = true;
    localStorage.setItem('riskcheckPopUpAccept', true);
    localStorage.setItem('riskcheckShippingAddresses', JSON.stringify(commerceContext?.checkout?.stepOneFormData?.shipping?.address));
    localStorage.setItem('riskcheckBillingAddresses', JSON.stringify(commerceContext?.checkout?.stepOneFormData?.billing?.address));
            
    try {
      const updateAddressMessage = document.getElementById('risk-check-update-address-message');
      const selectedPaymentType = JSON.parse(localStorage.getItem('defaultPaymentMethod')) || getSelectedPaymentType();
      let defaultSelectedPaymentTab, activeBillingAddress, activeShippingAddress = '';
      if(updateAddressMessage) {
        updateAddressMessage.parentElement.style.display = 'block';
      }
      const fetchedPaymentMethodsResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response;
      
      try {
        activeBillingAddress = JSON.parse(localStorage.getItem('riskcheckBillingAddresses'));
        activeShippingAddress = JSON.parse(localStorage.getItem('riskcheckShippingAddresses'));
      } catch (e) {
         // error in the above string (in this case, yes)!
    }


      if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedBillingAddress') &&
        fetchedPaymentMethodsResponse.hasOwnProperty('correctedShippingAddress')
      ) {
        if(activeBillingAddress?.id === activeShippingAddress?.id) {
          const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedShippingAddress;
          const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedBillingAddress;
          const correctedBillingShippingAddressPayload = createUpdateAddressPayload(
            activeShippingAddress, paymentMethodsShippingResponse
          );
          await updateAddress(correctedBillingShippingAddressPayload);
          const updatedBillingAddress = createUpdatedCorrectedAddress(activeBillingAddress, paymentMethodsBillingResponse);
          const updatedShippingAddress = createUpdatedCorrectedAddress(activeShippingAddress, paymentMethodsShippingResponse);

          localStorage.setItem('riskcheckShippingAddresses', JSON.stringify(updatedShippingAddress));
          localStorage.setItem('riskcheckBillingAddresses', JSON.stringify(updatedBillingAddress));
        } else {
          const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedShippingAddress;
          const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedBillingAddress;

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

          localStorage.setItem('riskcheckShippingAddresses', JSON.stringify(updatedShippingAddress));
          localStorage.setItem('riskcheckBillingAddresses', JSON.stringify(updatedBillingAddress));
        }
      } else if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedBillingAddress')) {
        const paymentMethodsBillingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedBillingAddress;
        const billingAddressPayload = createUpdateAddressPayload(
          activeBillingAddress, paymentMethodsBillingResponse
        );
        await updateAddress(billingAddressPayload);
        
        const updatedBillingAddress = createUpdatedCorrectedAddress(activeBillingAddress, paymentMethodsBillingResponse);

        localStorage.setItem('riskcheckBillingAddresses', JSON.stringify(updatedBillingAddress));
      } else if(fetchedPaymentMethodsResponse.hasOwnProperty('correctedShippingAddress')) {
        const paymentMethodsShippingResponse = commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.correctedShippingAddress;
        const shippingAddressPayload = createUpdateAddressPayload(
          activeShippingAddress, paymentMethodsShippingResponse
        );
        await updateAddress(shippingAddressPayload);

        const updatedShippingAddress = createUpdatedCorrectedAddress(activeShippingAddress, paymentMethodsShippingResponse);
        localStorage.setItem('riskcheckShippingAddresses', JSON.stringify(updatedShippingAddress));
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
        }
      };

      enablePaymentTabs();
      showAvailablePaymentTabs(
        paymentMethodsResponse?.response?.paymentMethods,
        defaultSelectedPaymentTab
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


  const setPaymentMethodCall = async () => {
    showPaymentTabsSpinner();
    let selectedPaymentType = getSelectedPaymentType();
    const cartID = commerceContext?.cart?.id
    if (cartID) {
      const paymentMethodsResponse = await paymentMethodCall(commerceContext, userIsLoggedIn)

      // storing the risk check communication token in local storage
      const riskCheckCommunicationToken = paymentMethodsResponse?.data?.response?.communicationToken;
      if (riskCheckCommunicationToken) {
        localStorage.setItem('riskCheckCommunicationToken', JSON.stringify(riskCheckCommunicationToken));
        localStorage.setItem('defaultPaymentMethod', JSON.stringify(selectedPaymentType));
      } else {
        // remove the previously stores communicationToken if we did not receive it
        localStorage.removeItem('riskCheckCommunicationToken');
      }
      setCommerceContext({
        ...commerceContext,
        cart: commerceContext?.cart,
        checkout: {
          ...commerceContext?.checkout,
          paymentMethodsResponse,
        },
        paymentTabRender: false,
      });

      if (commerceContext?.cart?.selected_payment_method?.code) {
        selectedPaymentType = commerceContext?.cart?.selected_payment_method?.code ? commerceContext?.cart?.selected_payment_method?.code : getSelectedPaymentType()
      }

      const tabbedPayments = document.querySelectorAll(`[${PAYMENTTABS}] ${PAYMENTTABS_TABS}`)
      let paymentTabClicked = false;
      if (tabbedPayments) {
        let isAvailable = paymentMethodsResponse?.data?.response?.paymentMethods?.find(paymentMethod =>
          paymentMethod?.code.toLowerCase() == selectedPaymentType.toLowerCase())

        selectedPaymentType = isAvailable ? selectedPaymentType : paymentMethodsResponse?.data?.response?.paymentMethods[0]?.code;

        tabbedPayments.forEach((paymentTab) => {
          let paymentType = paymentTab.getAttribute(PAYMENTTABS_PAYMENT_TYPE);
          if (selectedPaymentType == paymentType) {
            paymentTab.click();
            paymentTabClicked = true;
            return
          }
        })
      }
      if(!paymentTabClicked){
        showAvailablePaymentTabs(
          paymentMethodsResponse?.data?.response?.paymentMethods,
          getSelectedPaymentType(),
          commerceContext
        )
      }
    }
  }
  useEffect(async () => {
    if(!checkConsentStatus(commerceContext)){
      return
    }
    if (paymentAPICall) {
      showPaymentTabsSpinner();
      resetSelectedPaymentMethodResponse(
        commerceContext,
        setCommerceContext
      );

      disablePaymentTabs();
      const selectedPaymentTab = getSelectedPaymentType()

      const setPaymentMethodResponse = await setPaymentMethod(
        userIsLoggedIn,
        commerceContext?.cart?.id,
        selectedPaymentTab
      );

      
      enablePaymentTabs();
      showAvailablePaymentTabs(
        commerceContext?.checkout?.paymentMethodsResponse?.data?.response?.paymentMethods,
        selectedPaymentTab,
        commerceContext
      )
      showPaymentTabsSpinner(false);

      setCommerceContext({
        ...commerceContext,
        cart: setPaymentMethodResponse?.response?.data?.cart || commerceContext?.cart,
        checkout: {
          ...commerceContext?.checkout,
          setPaymentMethodResponse,
        },
      });
      setPaymentAPICall(false)
    }
  }, [paymentAPICall])

  useEffect(()=>{
  if(commerceContext?.paymentTabRender){
    hidePaymentTabs();
    showPaymentTabsSpinner();
    disablePaymentTabs();
    setPaymentMethodCall()
  }
  },[commerceContext?.paymentTabRender])
  
  // Normalize custom-tabs (tabbedPayments) & payment-tabs components. Backward compatible
  useEffect(() => {
    if(commerceContext?.checkout?.orderFailure){
      const consent = document.querySelectorAll(
        `#checkout-consents-options .a-checkbox__input[name="consentName"]`
      );
      if (consent) {
        consent.forEach((item) => {
          item.checked = true;
        })
      }
    }
    
    if(validateRequiredFields(commerceContext,userIsLoggedIn)){
      hidePaymentTabs();
      disablePaymentTabs();
      setPaymentMethodCall()

    }
    

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
    const riskcheckPopUpAccept = localStorage.getItem('riskcheckPopUpAccept');
    //riskcheck point
    const correctedShippingAddress = commerceContext?.checkout
      ?.paymentMethodsResponse?.data?.response?.correctedShippingAddress || {};
    const correctedBillingAddress = commerceContext?.checkout
      ?.paymentMethodsResponse?.data?.response?.correctedBillingAddress || {};
    if((Object.keys(correctedShippingAddress).length
      || Object.keys(correctedBillingAddress).length) && !riskcheckPopUpAccept && validateRequiredFields(commerceContext,userIsLoggedIn)) {
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
        if (!checkEventListner) {
          setCheckEventListner(true)
          const riskCheckAccept = document.getElementById('riskcheck-button-accept');
          riskCheckAccept.addEventListener('click', handleRiskCheckAccept);
        }
      }
    }

    const freeOrderBtn = document.querySelector(`${PAYMENT_STEP} ${FREE_ORDER_BUTTON}`);
    const paymentResponse = commerceContext?.checkout?.setPaymentMethodResponse;
    if(freeOrderBtn && paymentResponse) {
      freeOrderBtn.disabled = false;
    }

    const clickHandlers = [
      {
        selector: `#section-simplified-checkout-consent #checkout-consents-options .a-checkbox`,
        handler: (e) => {
          const checkInput = e.target.type
          if (checkInput && validateRequiredFields(commerceContext, userIsLoggedIn)) {
            hidePaymentTabs();
            disablePaymentTabs();
            setPaymentMethodCall()
          }
        },
      },
      {
        selector: `${PAYMENT_STEP} ${BACK_BUTTON}`,
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
              paymentMethodsResponse: null,
              setPaymentMethodResponse: null,
            },
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
        selector: `${PAYMENT_STEP} [${PAYMENTTABS_PAYMENT_TYPE}]`,
        handler: async (e) => {
          e.preventDefault();
          setPaymentAPICall(true)
        },
      },
      {
        selector: `${PAYMENT_STEP} ${OPEN_INVOICE_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${PAYMENT_STEP} ${OPEN_INVOICE_BUTTON}`),
            'invoice'
          ),
      },
      {
        selector: `${PAYMENT_STEP} ${FREE_ORDER_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${PAYMENT_STEP} ${FREE_ORDER_BUTTON}`),
            'nopayment'
          ),
      },
      {
        selector: `${PAYMENT_STEP} ${COD_BUTTON}`,
        handler: (e) =>
          continueToPlaceOrderPage(
            e,
            document.querySelector(`${PAYMENT_STEP} ${COD_BUTTON}`),
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

export default PaymentMethodsController;
