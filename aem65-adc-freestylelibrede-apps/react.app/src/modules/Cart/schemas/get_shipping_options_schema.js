const available_shipping_methods = `
  available_shipping_methods {
    carrier_code
    carrier_title
    amount {
      value
    }
    method_code
  }`;

export const buildGetShippingOptionsSchema = cartId => `
{
  adcGetAvailableShippingMethods(cart_id:"${cartId}") {
    success {
        code
        message
    }
    ${available_shipping_methods}
  }
}`;