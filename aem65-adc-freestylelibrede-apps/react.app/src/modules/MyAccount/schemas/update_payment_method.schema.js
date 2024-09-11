import {ORDER_TYPES, ORDER_TYPES_STATUS, PAYMENT_TYPES} from '../../../utils/enums';

export const buildUpdatePaymentMethodSchema = ({code, order_id, order_type, payon_checkout_id, payment_token, isOpenInvoice}) => {
	if (payon_checkout_id) {
		return `
			mutation {
				adcOrderPaymentUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
					code: "${code}",
					payon_checkout_id: "${payon_checkout_id}",
					save_payment: true
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
	} else if(payment_token) {
		return `
			mutation {
				adcOrderPaymentUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
					code: "${code}",
					payment_token: "${payment_token}",
					save_payment: true
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
				adcOrderPaymentUpdate(order_id: "${order_id}", order_type: "${order_type === ORDER_TYPES_STATUS.RX ? ORDER_TYPES.RX : ORDER_TYPES.CPS}", input: {
					code: "${PAYMENT_TYPES.OPEN_INVOICE}",
					save_payment: true
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