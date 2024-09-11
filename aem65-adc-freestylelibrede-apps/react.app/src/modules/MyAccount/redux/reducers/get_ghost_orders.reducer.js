import {
	GET_GHOST_ORDERS_REQUEST,
	GET_GHOST_ORDERS_REQUEST_SUCCESS,
	GET_GHOST_ORDERS_REQUEST_FAILURE,
	GHOST_ORDERS_DEACTIVATE,
	GHOST_ORDERS_DEACTIVATE_SUCCESS,
	GHOST_ORDERS_DEACTIVATE_FAILURE,
	RESET_GHOST_ORDERS_SUCCESS
} from '../actions/get_ghost_orders.action';

const initialState = {
	isLoading: false,
	ghostOrders: [],
	deactivatedRxmc: {},
	isGhostOrdersSuccess: false
};

export const GetGhostOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_GHOST_ORDERS_REQUEST:
		case GHOST_ORDERS_DEACTIVATE:
			return {
				...state,
				isLoading: true,
				isGhostOrdersSuccess: false
			};
		case GET_GHOST_ORDERS_REQUEST_SUCCESS:
			return {
				...state,
				ghostOrders: action.payload.adcGetGhostOrders?.ghost_orders,
				isLoading: false,
				isGhostOrdersSuccess: true
			};
		case GET_GHOST_ORDERS_REQUEST_FAILURE: {
			return {
				...state,
				isLoading: false,
				isGhostOrdersSuccess: false
			};
		}
		case GHOST_ORDERS_DEACTIVATE_SUCCESS: {
			return {
				...state,
				isLoading: true,
				deactivatedRxmc: {
					...state.deactivatedRxmc,
					rxmc: action.payload.rxmc,
					message: action.payload.message
				}
			};
		}
		case GHOST_ORDERS_DEACTIVATE_FAILURE: {
			return {
				...state,
				isLoading: false
			};
		}
		case RESET_GHOST_ORDERS_SUCCESS: {
			return {
				...state,
				isGhostOrdersSuccess: false
			};
		}
		default:
			return state;
	}
};