export const buildConfirmationEmailTriggerSchema = (email) => `
    mutation {
    	adcCustomerResendActivation (
			email: "${email}"
			) {
			success {
				code
				message
			}
    }
}
`;