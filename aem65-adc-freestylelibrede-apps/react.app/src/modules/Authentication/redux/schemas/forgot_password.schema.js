export const buildForgotPasswordSchema = (email) => `
    mutation {
    	adcCustomerPasswordReset (
			email: "${email}"
			) {
			success {
				code
				message
			}
    }
}
`;

