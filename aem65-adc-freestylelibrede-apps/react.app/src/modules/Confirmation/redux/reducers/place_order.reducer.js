import {PLACE_ORDER_FAILURE, PLACE_ORDER_SUCCESS} from '../actions/place_order.action';

const initialState = {
	orderID: undefined,
	error: null,
	claimReceipt: null
};
export const OrderIdModuleReducer = (state = initialState, action) => {
	switch (action.type) {
		case PLACE_ORDER_SUCCESS:
			return {
				...state,
				orderID: action.payload.adcPlaceOrder.order.order_id,
				claimReceipt: action.payload.adcPlaceOrder.claim_receipt
			};
		case PLACE_ORDER_FAILURE:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};