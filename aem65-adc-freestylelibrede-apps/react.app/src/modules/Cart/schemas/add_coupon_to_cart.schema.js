import {cart} from './cart_structure_variables';

export const buildAddCouponToCartSchema = (cartId, couponCode) => `
  mutation {
    adcApplyCouponToCart(input: {
      cart_id: "${cartId}",
      coupon_code: "${couponCode}"
    }) {
        success {
          code
          message
        }
        ${cart}
    }
  }
`;