export const getAvailablePaymentMethodsGraphqlSchema = (cartId, ssid) => ` {
  adcGetAvailablePaymentMethods(cart_id: "${cartId}",
  ssid: "${ssid}") {
    success {
      code
      message
    }
    available_payment_methods
    webshop_message
    status_code
    communication_token
    is_blacklisted
    allow_save_corrected
    arvato_code
    allow_save
    is_verified
    billing_address_validation {
        Validated
        ReturnCode
        Street
        StreetNumber
        ZipCode
        City
        Country
        }
    delivery_address_validation {
        Validated
        ReturnCode
        Street
        StreetNumber
        ZipCode
        City
        Country
        }
  }
      }`;






