import {cart} from './cart_structure_variables';

export const buildRemoveCouponFromCartSchema = (cartId) => `
  mutation {
    adcRemoveCouponFromCart(input: {
      cart_id: "${cartId}"
    }){
        success {
          code
          message
        }
        ${cart}
    }
  }
`;