import {
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_REQUEST_SUCCESS,
	UPDATE_ORDER_REQUEST_FAILURE,
	RESET_FORM
} from '../actions/update_order.action';

const initialState = {
	loading: false,
	isOrderUpdated: null,
	error: null
};

export const OrderUpdateReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_ORDER_REQUEST:
			return {
				...state,
				loading: true,
				isOrderUpdated: null,
				updatedOrderType: action.payload.order_type
			};
		case UPDATE_ORDER_REQUEST_SUCCESS:
			return {
				...state,
				isOrderUpdated: true,
				loading: false,
				error: null
			};
		case UPDATE_ORDER_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				isOrderUpdated: false,
				loading: false,
				updatedOrderType: null
			};
		case RESET_FORM:
			return {
				...state,
				loading: false,
				// isOrderUpdated: null,
				error: null
			};
		default:
			return state;
	}
};