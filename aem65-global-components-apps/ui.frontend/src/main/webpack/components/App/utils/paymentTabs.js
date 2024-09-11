import checkoutFormConst from '../constants/checkoutFormConst';
import ESL_EPT from '../data/eslEndpoints';
import { fetchESLservice } from '../services/eslService';

const {
  PAYMENTTABS,
  PAYMENTTABS_PAYMENT_TYPE,
  PAYMENTTABS_TABS,
  PAYMENTTABS_SELECTED_CLASS,
  PAYMENTTABS_CONTENT,
  PAYMENTTABS_SPINNER,
} = checkoutFormConst;

const resetSelectedPaymentMethodResponse = (
  commerceContext,
  setCommerceContext
) => {
  setCommerceContext({
    ...commerceContext,
    checkout: {
      ...commerceContext?.checkout,
      setPaymentMethodResponse: null,
    },
  });
};

const setPaymentMethod = async (
  userIsLoggedIn,
  cartId,
  paymentMethod
) => {
  const riskCheckCommunicationToken = JSON.parse(localStorage.getItem('riskCheckCommunicationToken'));
  const setPaymentMethodPayload = {
    cartId,
    paymentMethod: paymentMethod,
    ...(!!riskCheckCommunicationToken
      && {communicationToken: riskCheckCommunicationToken}),
  };

  const setPaymentMethodParams = {
    service: userIsLoggedIn ? ESL_EPT.paymentAuth : ESL_EPT.payment,
    data: setPaymentMethodPayload,
    addAuthHeaders: userIsLoggedIn,
    withRecaptcha: !userIsLoggedIn,
  };

  const setPaymentMethodResponse = await fetchESLservice(
    setPaymentMethodParams
  );

  if (
    userIsLoggedIn &&
    setPaymentMethodResponse?.data?.response?.data?.customerCart
  ) {
    Object.defineProperty(
      setPaymentMethodResponse?.data?.response?.data,
      'cart',
      Object.getOwnPropertyDescriptor(
        setPaymentMethodResponse?.data?.response?.data,
        'customerCart'
      )
    );

    delete setPaymentMethodResponse?.data?.response?.data?.customerCart;
  }

  return setPaymentMethodResponse?.data;
};

const getPaymentTabs = () =>
  document.querySelectorAll(`[${PAYMENTTABS}] ${PAYMENTTABS_TABS}`);

const getPaymentTabsSpinner = () =>
  document.querySelector(`[${PAYMENTTABS}] > ${PAYMENTTABS_SPINNER}`);

const getPaymentTabsContent = () =>
  document.querySelector(`[${PAYMENTTABS}] > ${PAYMENTTABS_CONTENT}`);

const getSelectedPaymentTab = () =>
  [...getPaymentTabs()].find((paymentTab) =>
    paymentTab.classList.contains(PAYMENTTABS_SELECTED_CLASS)
  );

const getSelectedPaymentType = (selectedPaymentTab) =>
  (selectedPaymentTab || getSelectedPaymentTab())?.getAttribute(
    PAYMENTTABS_PAYMENT_TYPE
  );

const hidePaymentTabs = () => {
  getPaymentTabs().forEach((paymentTab) => (paymentTab.style.display = 'none'));
};

const showPaymentTabsSpinner = (showSpinner = true) => {
  const paymentTabsSpinner = getPaymentTabsSpinner();
  const paymentTabsContent = getPaymentTabsContent();

  if (paymentTabsSpinner)
    paymentTabsSpinner.style.display = showSpinner ? 'flex' : 'none';

  if (paymentTabsContent)
    paymentTabsContent.style.display = showSpinner ? 'none' : 'block';
};

const getApplePaySession = () => {
  if (window.ApplePaySession && ApplePaySession.canMakePayments)
     return true;
  return false;    
};

const showAvailablePaymentTabs = (paymentMethods = [], defaultPaymentType = '', commerceContext={}) => {
  const paymentTabElements = getPaymentTabs();
  const selectedPaymentType = defaultPaymentType || getSelectedPaymentType();

  paymentTabElements.forEach((paymentTab) => {
    const paymentType = paymentTab.getAttribute(PAYMENTTABS_PAYMENT_TYPE);
    const applepayallowed = getApplePaySession();
    if (
      paymentMethods.some((paymentMethod) => paymentMethod.code === paymentType)
    ) {
      if(paymentType === "payon_apple_pay" && applepayallowed === false)
      {        
       paymentTab.style.display = 'none';       
      } 
      else {paymentTab.style.display = 'block';}
    }    
  });

  if (
    !paymentMethods.find(
      (paymentMethod) => paymentMethod.code === selectedPaymentType
    )
  ) {
    const firstVisiblePaymentTab = [...paymentTabElements].find(
      (paymentTab) => paymentTab.style.display === 'block'
    );

    // Trigger a click on the first visible payment tab to load its content:
    if (firstVisiblePaymentTab) {
      firstVisiblePaymentTab.click();
    }
  }
  if(commerceContext?.checkout?.orderFailure){
    const selectedPaymentTab = commerceContext?.cart?.selected_payment_method?.code ? commerceContext?.cart?.selected_payment_method?.code:selectedPaymentType
    const paymentTabs = getPaymentTabs();
    paymentTabs.forEach(tab => {
      if(tab.getAttribute(PAYMENTTABS_PAYMENT_TYPE) === selectedPaymentTab) {
        tab.click();
      }
    });
  }
};

const disablePaymentTabs = () =>
  getPaymentTabs().forEach(
    (paymentTab) => (paymentTab.style.pointerEvents = 'none')
  );

const enablePaymentTabs = () => {
  const selectedTab = getSelectedPaymentTab();

  getPaymentTabs().forEach(
    (paymentTab) =>
      paymentTab !== selectedTab && (paymentTab.style.pointerEvents = '')
  );
}

export {
  resetSelectedPaymentMethodResponse,
  setPaymentMethod,
  getPaymentTabs,
  getPaymentTabsSpinner,
  getPaymentTabsContent,
  getSelectedPaymentTab,
  getSelectedPaymentType,
  hidePaymentTabs,
  showPaymentTabsSpinner,
  showAvailablePaymentTabs,
  disablePaymentTabs,
  enablePaymentTabs,
};
