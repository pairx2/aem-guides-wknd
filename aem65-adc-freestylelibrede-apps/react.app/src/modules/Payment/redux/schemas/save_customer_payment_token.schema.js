
export const buildSaveCustomerPaymentTokenSchema = ({paymentMethod, payonCheckoutId, isDefaultPayment}) => {
	const checkoutId = `
		payon_checkout_id: "${payonCheckoutId}"
	`;
	return `mutation {
			adcCustomerPaymentTokenSave(
				payment_method: "${paymentMethod}",
				${payonCheckoutId ? checkoutId : ''},
				is_primary: ${isDefaultPayment}
				) {
				success {
					code
					message
				}
			}
		}
	`;
};