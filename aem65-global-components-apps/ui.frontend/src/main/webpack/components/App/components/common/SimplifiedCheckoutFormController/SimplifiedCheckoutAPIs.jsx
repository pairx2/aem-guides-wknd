import {
    getCheckboxState,
    findAddressById,
    checkConsentStatus,
} from '../../../utils/common';
import { fetchESLservice } from '../../../services/eslService';
import ESL_EPT from '../../../data/eslEndpoints';



const paymentMethodCall = async (responseData, userIsLoggedIn, commerceContextData) => {
  const contextData = commerceContextData ? commerceContextData : responseData;

  if (!checkConsentStatus(contextData)) {
    return
  }
  const cart = responseData?.cart;
  const cartId = cart?.id;

  const sameShippingBillingAddress = getCheckboxState(
    document.querySelector(
      `input[type="checkbox"][name="shipping.address.sameAsBilling"]`
    )
  );


    const formattedAddressd = responseData?.cart?.shipping_addresses ? responseData?.cart?.shipping_addresses[0] : null
    const shippingAddress = responseData?.checkout?.stepOneFormData?.shipping ? responseData?.checkout?.stepOneFormData?.shipping : findAddressById(contextData?.profile?.addresses?.shipping, formattedAddressd?.customer_address_id)
    const billingAddress = sameShippingBillingAddress ? shippingAddress : responseData?.checkout?.stepOneFormData?.billing ? responseData?.checkout?.stepOneFormData?.billing : findAddressById(contextData?.profile?.addresses?.billing, responseData?.cart?.billing_address?.customer_address_id)

    const paymentMethodsPayload = {
        cartId,
        shipping: shippingAddress?.address ? shippingAddress :  {address :shippingAddress},
        billing: billingAddress?.address ? billingAddress :  {address :billingAddress},
       
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

    return await fetchESLservice(getPaymentMethodsParams);

}

const shippingCall = async (responseData, userIsLoggedIn, addressId = 0) => {

    let shippingPayload = {
        cartId: responseData?.cart?.id,
        carrier_code:
          responseData?.checkout?.selectedShippingMethod?.carrier_code ? responseData?.checkout?.selectedShippingMethod?.carrier_code :
          responseData?.cart?.shipping_addresses[0]?.selected_shipping_method?.carrier_code,
        method_code:
          responseData?.checkout?.selectedShippingMethod?.method_code ? responseData?.checkout?.selectedShippingMethod?.method_code :
          responseData?.cart?.shipping_addresses[0]?.selected_shipping_method?.method_code
          ,
      };

      if(!shippingPayload?.carrier_code || !shippingPayload?.method_code){
        const lowestPricedMethodCal = responseData?.cart?.shipping_addresses[0]?.available_shipping_methods?.reduce(
          (prev, curr) => {
            return prev.amount < curr.amount ? prev : curr;
          }
        );
        shippingPayload ={
          ...shippingPayload,
          carrier_code: lowestPricedMethodCal?.carrier_code,
          method_code: lowestPricedMethodCal?.method_code,
        }

      }
  
      if (
        userIsLoggedIn &&
        responseData?.checkout?.stepOneFormData?.shipping?.address?.id
      ) {
        const shippingAddressId = 
        addressId ? addressId : responseData?.checkout?.stepOneFormData?.shipping?.address?.id;
        shippingPayload.addressId = shippingAddressId;
  
        const matchedShippingAddress = findAddressById(
          responseData?.profile?.addresses?.shipping,
          shippingAddressId
        );
  
      } else {
        shippingPayload.shipping = {
          address:
            responseData?.checkout?.stepOneFormData?.shipping?.address,
        };
      }
  
      const shippingParams = {
        service: userIsLoggedIn ? ESL_EPT.shippingAuth : ESL_EPT.shipping,
        data: shippingPayload,
        addAuthHeaders: userIsLoggedIn,
        withRecaptcha: !userIsLoggedIn,
      };

    return await fetchESLservice(shippingParams);

}


export { 
    paymentMethodCall,
    shippingCall
};
