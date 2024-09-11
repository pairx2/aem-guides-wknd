import {cart} from './cart_structure_variables';
import {isRxCheckoutPageType} from '../../../utils/pageTypeUtils';

export const buildSetPaymentMethodOnCartSchema = (cartId, paymentMethod, isSavePaymentMethod, paymentMethodToken, communicationToken) => {
	if(isRxCheckoutPageType()) {
		return `
			mutation {
			adcSetPaymentMethodOnCart(input: {
				cart_id: "${cartId}"
				payment_method: {
				code: "${paymentMethod}"
				additional_data: {
					create_registration: ${isSavePaymentMethod}
					registration_id: "${paymentMethodToken}"
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
				create_registration: ${isSavePaymentMethod}
				rss_pts_sessionid: "${sessionStorage.getItem('arvato_session_id')}" 
				rss_communication_token: "${communicationToken}"
				registration_id: "${paymentMethodToken}"
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