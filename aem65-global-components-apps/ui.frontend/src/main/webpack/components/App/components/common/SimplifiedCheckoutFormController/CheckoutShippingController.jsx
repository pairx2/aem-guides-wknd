import { useEffect, useContext, useState } from 'react';

import ESL_EPT from '../../../data/eslEndpoints';
import { fetchESLservice } from '../../../services/eslService';
import { CommerceContext } from '../../../context/CommerceContext';
import { AuthContext } from '../../../context/AuthContext';
import { shippingCall  } from './SimplifiedCheckoutAPIs';
import { 
  bodyDatasets,
  findAddressById, 
  isLoggedIn, 
  getCheckboxState,
  validateRequiredFields,
  showTransparentLoader,
  hideTransparentLoader,
} 
from '../../../utils/common';
import {
  disablePaymentTabs,
  enablePaymentTabs,
  getSelectedPaymentType,
  hidePaymentTabs,
  setPaymentMethod,
  showAvailablePaymentTabs,
  showPaymentTabsSpinner,
} from '../../../utils/paymentTabs';

const CheckoutShippingController = ({ setStepOneReady, setStepTwoReady }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userIsLoggedIn = isLoggedIn(authContext);
  const selectedCarrierCode = commerceContext?.cart?.shipping_addresses? `${commerceContext?.cart?.shipping_addresses[0]?.selected_shipping_method?.carrier_code}_${commerceContext?.cart?.shipping_addresses[0]?.selected_shipping_method?.method_code}` : null

  const [selectedShippingOption, setSelectedShippingOption] = useState(selectedCarrierCode)
  const [shippingMethodCallAllow, setShippingMethodCallAllow] = useState(true)
  const [selectedShippingLoader, setSelectedShippingLoader] = useState(true)


  const { combinePaymentCheckout } = bodyDatasets();

  const setShippingAndMethod = async (shippingLoader=false, shippingMethodUpdated=false) => {
    let shippingLoaderVal = shippingLoader
    if (selectedShippingLoader || shippingLoaderVal) {
      showTransparentLoader()
      setSelectedShippingLoader(false)
      shippingLoaderVal=false
    }
    const shippingResponse = await shippingCall(commerceContext, userIsLoggedIn);

    if(shippingResponse){
      hideTransparentLoader()
    }

    
    const updatedCommerceContext = {
      ...commerceContext,
      cart:
        shippingResponse?.data?.response?.data?.cart ||
        shippingResponse?.data?.response?.data?.customerCart ||
        commerceContext?.cart,
      checkout: {
        ...commerceContext?.checkout,
        shippingResponse,
        selectedShippingMethod: shippingResponse?.data?.response?.data?.cart?.shipping_addresses[0]?.selected_shipping_method,
      },
      shippingApiRender: false,
      paymentTabRender: commerceContext?.shippingApiRender || shippingMethodUpdated ? true : false,
    };

    setCommerceContext(updatedCommerceContext);
    setShippingMethodCallAllow(true)
  };

  useEffect( async () => {
    const shippingCarrierMethod = `${commerceContext?.checkout?.selectedShippingMethod?.carrier_code}_${commerceContext?.checkout?.selectedShippingMethod?.method_code}`
    if ((commerceContext?.checkout?.selectedShippingMethod
      && shippingCarrierMethod != selectedShippingOption
      && commerceContext?.checkout?.stepOneFormData?.shipping?.address) || (commerceContext?.shippingApiRender && commerceContext?.checkout?.selectedShippingMethod)) {
        if(shippingMethodCallAllow){
          setShippingMethodCallAllow(false)
          setSelectedShippingLoader(true)
          let shippingMethodUpdated = shippingCarrierMethod != selectedShippingOption;
          await setShippingAndMethod(true, shippingMethodUpdated);
        }
      setSelectedShippingOption(`${commerceContext?.checkout?.selectedShippingMethod?.carrier_code}_${commerceContext?.checkout?.selectedShippingMethod?.method_code}`);
    }
  }, [commerceContext?.checkout?.selectedShippingMethod, commerceContext?.shippingApiRender]);

  return null;
};

export default CheckoutShippingController;
