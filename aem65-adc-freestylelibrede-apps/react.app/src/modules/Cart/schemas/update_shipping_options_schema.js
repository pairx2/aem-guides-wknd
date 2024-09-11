import {cart} from './cart_structure_variables';

export const buildUpdateShippingOptionsSchema = (cartId, carrierCode, methodCode) => `
  mutation {
    adcSetShippingMethodOnCart(input: {
    	cart_id: "${cartId}",
      	shipping_method: {
      		carrier_code: "${carrierCode}", 
      		method_code: "${methodCode}"
      	}
      }) {
        success {
          code
          message
        }
        ${cart}
    }
  }
`;