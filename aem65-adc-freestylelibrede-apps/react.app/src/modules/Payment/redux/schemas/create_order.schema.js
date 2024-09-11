export const buildCreateOrderSchema = (cartId) => {
	return `
        mutation {
            adcCreateOrder(
                input: {
                    cart_id: "${cartId}",
                    terms_and_conditions: true,
                    data_privacy: true
                }
             ) {
					order {
                        order_id
                    }
                    success {
                        code
                        message
                    }
                }
            }
        `;
};