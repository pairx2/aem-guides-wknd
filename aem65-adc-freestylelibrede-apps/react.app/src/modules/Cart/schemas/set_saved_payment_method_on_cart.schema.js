import {cart} from './cart_structure_variables';
import {isRxCheckoutPageType} from '../../../utils/pageTypeUtils';

export const buildSetSavedPaymentMethodOnCartSchema = (cartId, paymentMethod, token, communicationToken) => {
	if(isRxCheckoutPageType()) {
		return `
			mutation {
			adcSetPaymentMethodOnCart(input: {
				cart_id: "${cartId}"
				payment_method: {
				code: "${paymentMethod}"
				additional_data: {
					create_registration: false
					payon_transaction_id: "${token}"
				}
				}
			}) {
				success {
				code
				message
				}
				${cart}
			}
		}
		`;
	} else {
		return `
		mutation {
		adcSetPaymentMethodOnCart(input: {
			cart_id: "${cartId}"
			payment_method: {
			code: "${paymentMethod}"
			additional_data: {
				create_registration: false
				payon_transaction_id: "${token}"
				rss_pts_sessionid: "${sessionStorage.getItem('arvato_session_id')}"
				rss_communication_token: "${communicationToken}"
			}
			}
		}) {
			success {
			code
			message
			}
			${cart}
		}
	}
	`;
	}
};