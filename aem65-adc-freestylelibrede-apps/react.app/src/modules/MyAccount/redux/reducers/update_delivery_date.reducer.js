import {
	UPDATE_DELIVERY_DATE_REQUEST,
	UPDATE_DELIVERY_DATE_REQUEST_SUCCESS,
	UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS,
	UPDATE_DELIVERY_DATE_REQUEST_FAILURE,
	RESET_DELIVERY_DATE_MODAL
} from '../actions/update_delivery_date.action';

const initialState = {
	isDeliveryDateLoading: false,
	isDeliveryDateUpdated: false,
	deliveryDateUpdationError: null,
	orderId: null,
	rxmc: null
};

export const DeliveryDateUpdateReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_DELIVERY_DATE_REQUEST:
			return {
				...state,
				isDeliveryDateLoading: true,
				deliveryDateUpdationError: null,
				orderId: action.payload.order_id
			};
		case UPDATE_DELIVERY_DATE_REQUEST_SUCCESS:
		case UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS:
			return {
				...state,
				isDeliveryDateUpdated: true,
				isDeliveryDateLoading: false,
				deliveryDateUpdationError: null,
				rxmc: state.orderId
			};
		case UPDATE_DELIVERY_DATE_REQUEST_FAILURE:
			return {
				...state,
				deliveryDateUpdationError: action.error?.error,
				isDeliveryDateLoading: false,
				isDeliveryDateUpdated: false
			};
		case RESET_DELIVERY_DATE_MODAL:
			return {
				...state,
				isDeliveryDateLoading: false,
				isDeliveryDateUpdated: false,
				deliveryDateUpdationError: null
			};
		default:
			return state;
	}
};