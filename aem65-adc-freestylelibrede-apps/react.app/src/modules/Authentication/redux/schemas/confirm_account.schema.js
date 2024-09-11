export const buildConfirmAccountSchema = (id, key) => `
    mutation {
    	adcCustomerConfirm (
			customer_id: "${id}"
			confirmation_code: "${key}"
			) {
			success {
				code
				message
			}
			customer {
				user_id
			}
			tech_training_required
    }
}
`;

