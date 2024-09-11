export const buildPlaceOrderSchema = (cartId, paymentId, isSavedPayment, orderId) => {
	const tokenId = `
        payon_token_id: "${paymentId}"
    `;
	if(!isSavedPayment) {
		return `
            mutation {
                adcPlaceOrder(
                    input: {
                        cart_id: "${cartId}",
                        payon_checkout_id: "${paymentId}"
                        terms_and_conditions: true,
                        data_privacy: true,
                        order_id: "${orderId}"
                    }
                ) {
                    order {
                        order_id
                    }
                    claim_receipt
                }
            }
        `;
	} else {
		return `
            mutation {
                adcPlaceOrder(
                    input: {
                        cart_id: "${cartId}",
                        ${isSavedPayment && paymentId ? tokenId : ''},
                        terms_and_conditions: true,
                        data_privacy: true,
                        order_id: "${orderId}"
                    }
                ) {
                    order {
                        order_id
                    }
                    claim_receipt
                }
            }
        `;
	}
};