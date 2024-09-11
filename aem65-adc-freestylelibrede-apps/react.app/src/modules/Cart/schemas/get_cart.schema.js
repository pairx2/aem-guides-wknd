import {cart} from './cart_structure_variables';

export const buildGetCustomerCartSchema = cartId => `
{
    adcCartDetails(cart_id:"${cartId}") {
        success {
            code
            message
        }
        ${cart}
    }
}
`;