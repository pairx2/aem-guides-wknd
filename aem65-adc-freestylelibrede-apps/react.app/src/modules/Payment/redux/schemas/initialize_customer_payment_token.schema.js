export const buildInitializeCustomerPaymentTokenSchema = ({paymentMethod, orderId, orderUpdateType, paymentMethodToken}) => `
	mutation {
		adcCustomerPaymentTokenInit(payment_method: "${paymentMethod}", order_id:"${orderId}", order_type: "${orderUpdateType}", registration_id: "${paymentMethodToken}") {
			success {
				code
				message
			}
			payon_checkout_id
		}
	}
`;