import {GET_ORDER_RETURN_REQUEST, GET_ORDER_RETURN_REQUEST_SUCCESS, GET_ORDER_RETURN_REQUEST_FAILURE, GET_ORDER_RETURN_RMA_DETAILS_REQUEST, GET_ORDER_RETURN_RMA_DETAILS_REQUEST_SUCCESS, GET_ORDER_RETURN_RMA_DETAILS_REQUEST_FAILURE} from '../actions/orders.action';

const initialState = {
	loading: false,
	returnId: null,
	rmaLabels: null,
	error: null,
	customerReturnInfo: {},
	orderId: null,
	downloadDocAsImg: false
};

export const OrderReturnReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDER_RETURN_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				orderId: action.orderId
			};
		case GET_ORDER_RETURN_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				returnId: action.payload.returnId,
				customerReturnInfo: {
					...state.customerReturnInfo,
					[state.orderId]: {
						return_id: action.payload.returnId
					}
				}
			};
		case GET_ORDER_RETURN_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				orderId: null
			};
		case GET_ORDER_RETURN_RMA_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
				rmaLabels: null,
				error: null,
				orderId: action.payload.order_number,
				downloadDocAsImg: action.downloadDocAsImg
			};
		case GET_ORDER_RETURN_RMA_DETAILS_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				rmaLabels: action.payload,
				customerReturnInfo: {
					...state.customerReturnInfo,
					[state.orderId]: {
						...state.customerReturnInfo[state.orderId],
						return_receipt: state.rmaLabels
					}
				}
			};
		case GET_ORDER_RETURN_RMA_DETAILS_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				rmaLabels: null,
				error: action.payload
			};
		default:
			return state;
	}
};