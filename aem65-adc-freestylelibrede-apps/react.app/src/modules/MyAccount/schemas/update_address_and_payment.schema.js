import {ORDER_TYPES_STATUS, ORDER_TYPES, PAYMENT_TYPES} from '../../../utils/enums';

export const buildUpdateAddressAndPaymentSchema = ({code, order_id, order_type, payon_checkout_id, payment_token, address_type, address_id, rss_result_code, is_blacklisted, is_verified, isOpenInvoice}) => {
	if (payon_checkout_id) {
		return `
				mutation {
					adcOrderUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
						address: {
							address_type: "${address_type}"
							address_id:${address_id}
							rss_result_code: "${rss_result_code}"
							is_blacklisted: ${is_blacklisted}
							is_verified: ${is_verified}
						}
						payment: {
							code: "${code}",
							payon_checkout_id: "${payon_checkout_id}",
							save_payment: true    
						}
					}) {
						success {
							code
							message
						}
						order {
							increment_id
						}
					}
				}
			`;
	} else if (payment_token) {
		return `
				mutation {
					adcOrderUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
						address: {
							address_type: "${address_type}"
							address_id:${address_id}
							rss_result_code: "${rss_result_code}"
							is_blacklisted: ${is_blacklisted}
							is_verified: ${is_verified}
						}
						payment: {
							code: "${code}",
							payment_token: "${payment_token}"  
							save_payment: true
						}
					}) {
						success {
							code
							message
						}
						order {
							increment_id
						}
					}
				}
			`;
	} else if(isOpenInvoice) {
		return `
			mutation {
				adcOrderUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
					address: {
						address_type: "${address_type}"
						address_id:${address_id}
						rss_result_code: "${rss_result_code}"
						is_blacklisted: ${is_blacklisted}
						is_verified: ${is_verified}
					}
					payment: {
						code: "${PAYMENT_TYPES.OPEN_INVOICE}",
						save_payment: true
					}
				}) {
					success {
						code
						message
					}
					order {
						increment_id
					}
				}
			}
		`;
	}
};