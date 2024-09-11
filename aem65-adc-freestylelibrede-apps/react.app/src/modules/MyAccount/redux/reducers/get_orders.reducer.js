import {
	GET_CURRENT_ORDERS_REQUEST,
	GET_CURRENT_ORDERS_REQUEST_FAILURE,
	GET_CURRENT_ORDERS_REQUEST_SUCCESS,
	GET_ORDERS_BY_PAGE_NUMBER_SUCCESS,
	GET_ORDERS_REQUEST,
	GET_ORDERS_REQUEST_FAILURE,
	GET_ORDERS_REQUEST_SUCCESS,
	GET_ORDERS_RXMC_REQUEST,
	GET_ORDERS_RXMC_REQUEST_SUCCESS,
	GET_ORDERS_RXMC_REQUEST_FAILURE,
	GET_ALL_ORDERS_REQUEST,
	GET_ALL_ORDERS_REQUEST_FAILURE,
	GET_ALL_ORDERS_REQUEST_SUCCESS,
} from '../actions/get_orders.action';

export const initialState = {
	loadingOrders: false,
	loadingCurrentOrders: false,
	orders: {
		CPS: {
			orderList: []
		},

		CP: {
			orderList: []
		},

		RX: {
			orderList: []
		},
		orderHistoryType: '',
	},
	ordersByPageNumber: {

		CP: {
			orderList: []
		},

		CPS: {
			orderList: []
		},

		RX: {
			orderList: []
		}
	},
	allOrders: {
		loading: false,
		fetched: false,
		orders: {}
	},
	totalOrders: null,
	totalPages: null,
	commercialReturnGracePeriod: null,
	numberofDaysAheadDueDateChange: null,
	numberofDaysBeforeDueDateChange: null,
	currentOrders: {},
	rxmcOrders: {},
	error: null
};

export const GetOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDERS_REQUEST:
			return {
				...state,
				loadingOrders: true,
			};
		case GET_ORDERS_REQUEST_SUCCESS:
			return {
				...state,
				orders: {
					...state.orders,
					[action.orderHistoryType]: action.payload,
					orderHistoryType: action.orderHistoryType
				},
				totalOrders: action.payload?.header?.totalResults,
				totalPages: action.payload?.header?.totalPages,
				commercialReturnGracePeriod: action.payload?.globalConfig?.commercialReturnGracePeriod,
				numberofDaysAheadDueDateChange: action.payload?.globalConfig?.numberofDaysAheadDueDateChange,
				numberofDaysBeforeDueDateChange: action.payload?.globalConfig?.numberofDaysBeforeDueDateChange,
				loadingOrders: false
			};
		case GET_ORDERS_BY_PAGE_NUMBER_SUCCESS:
			return {
				...state,
				ordersByPageNumber: {
					...state.ordersByPageNumber,
					[action.orderHistoryType]: action.payload,
					orderHistoryType: action.orderHistoryType
				},
				loadingOrders: false
			};
		case GET_ORDERS_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loadingOrders: false
			};
		case GET_ORDERS_RXMC_REQUEST:
		case GET_CURRENT_ORDERS_REQUEST:
			return {
				...state,
				loadingCurrentOrders: true,
			};
		case GET_ORDERS_RXMC_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loadingCurrentOrders: false,
				rxmcOrders: {
					...state.rxmcOrders,
					[action.rxmc]: {
						error: action.error
					}
				},
			};
		case GET_CURRENT_ORDERS_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loadingCurrentOrders: false
			};
		case GET_CURRENT_ORDERS_REQUEST_SUCCESS:
			return {
				...state,
				currentOrders: {
					...state.currentOrders,
					[action.typeOfOrder]: action.payload,
				},
				loadingCurrentOrders: false
			};
		case GET_ORDERS_RXMC_REQUEST_SUCCESS:
			return {
				...state,
				rxmcOrders: {
					...state.rxmcOrders,
					[action.payload.rxmc]: action.payload?.orderList[0]
				},
				loadingCurrentOrders: false
			};
		case GET_ALL_ORDERS_REQUEST:
			return {
				...state,
				allOrders: {
					loading: true,
				}
			};
		case GET_ALL_ORDERS_REQUEST_SUCCESS:
			return {
				...state,
				allOrders: {
					loading: false,
					fetched: true,
					orders: action?.payload?.orderList
				}
			};
		case GET_ALL_ORDERS_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				allOrders: {
					loading: false,
					fetched: false
				}
			};
		default:
			return state;
	}
};