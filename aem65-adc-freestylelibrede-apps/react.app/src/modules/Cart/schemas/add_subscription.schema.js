import {cart} from './cart_structure_variables';

export const buildAddSubscriptionSchema = (cartId, sku, qty, startDate, bundleId, optionId) => `
mutation {
        adcCartProductsAdd(cart_id: "${cartId}", input: {
            cart_items: [
                {
                    sku: "${sku}",
                    qty: ${qty},
					delivery_date: "${startDate}",
					bundle_options: [
						{
							id: ${bundleId},
							quantity: ${qty},
							value: ["${optionId}"]
						}
					]
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