export const buildGetCustomerPaymentTokensSchema = () => `
	query {
		adcCustomerGetTokens {
			success {
				code
				message
			}
			tokens {
				method
				type
				token
				expiry
				last4Digits
				label
				is_default
				owner
			}
		}
	}
`;