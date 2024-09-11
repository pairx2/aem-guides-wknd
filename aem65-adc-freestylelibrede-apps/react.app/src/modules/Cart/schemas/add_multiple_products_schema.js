import {cart} from './cart_structure_variables';

export const buildAddMultipleProductsSchema = (cartId, products) => `
mutation {
        adcCartProductsAdd(cart_id: "${cartId}", input: {
            cart_items: [
                ${products.map(product => `
                	{
						sku: "${product.sku}", 
						qty: ${product.qty}
                	}
                `)}
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