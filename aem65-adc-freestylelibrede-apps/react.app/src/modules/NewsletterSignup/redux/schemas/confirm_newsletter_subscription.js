export const buildConfirmNewsletterSubscriptionSchema = (key) => `
	mutation {
		adcPermissionConfirm(confirmation_code: "${key}") {
			success {
				code
				message
			}
			permissions {
				id
				subscriber_email
				subscriber_status
				communication_type
				communication_channel
			}
		}
	}
`;

