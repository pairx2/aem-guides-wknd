export const buildDeleteCustomerPaymentTokenSchema = ({method, token}) => {
	return `mutation {
			adcCustomerPaymentTokenDelete(
				payment_method: "${method}",
				token_id: "${token || ''}"
				) {
				success {
					code
					message
				}
			}
		}
	`;
};