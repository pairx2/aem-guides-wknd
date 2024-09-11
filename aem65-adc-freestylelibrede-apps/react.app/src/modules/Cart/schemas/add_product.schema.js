import {cart} from './cart_structure_variables';

export const buildAddProductSchema = (cartId, sku, qty, startDate) => `
mutation {
        adcCartProductsAdd(cart_id: "${cartId}", input: {
            cart_items: [
                {
                    sku: "${sku}", 
                    qty: ${qty},
                    delivery_date: "${startDate}"
                }
            ]
        }) 
        {
        	success {
                code
                message
            }
            ${cart}
        }
    }
`;