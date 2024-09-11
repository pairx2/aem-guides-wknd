export const buildResetPasswordSchema = (token, password, cid) => `
    mutation {
    	adcCustomerPasswordConfirm (
			rp_token: "${token}"
			new_password: "${password}"
			customer_id: "${cid}"
			) {
			success {
				code
				message
			}
    }
}
`;

