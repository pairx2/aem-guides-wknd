export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_REQUEST_SUCCESS = 'GET_ORDERS_REQUEST_SUCCESS';
export const GET_ORDERS_REQUEST_FAILURE = 'GET_ORDERS_REQUEST_FAILURE';

export const GET_CURRENT_ORDERS_REQUEST = 'GET_CURRENT_ORDERS_REQUEST';
export const GET_ORDERS_BY_PAGE_NUMBER_SUCCESS = 'GET_ORDERS_BY_PAGE_NUMBER_SUCCESS';
export const GET_CURRENT_ORDERS_REQUEST_SUCCESS = 'GET_CURRENT_ORDERS_REQUEST_SUCCESS';
export const GET_CURRENT_ORDERS_REQUEST_FAILURE = 'GET_CURRENT_ORDERS_REQUEST_FAILURE';

export const GET_ORDERS_RXMC_REQUEST = 'GET_ORDERS_RXMC_REQUEST';
export const GET_ORDERS_RXMC_REQUEST_SUCCESS = 'GET_ORDERS_RXMC_REQUEST_SUCCESS';
export const GET_ORDERS_RXMC_REQUEST_FAILURE = 'GET_ORDERS_RXMC_REQUEST_FAILURE';

export const GET_ALL_ORDERS_REQUEST = 'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_REQUEST_SUCCESS = 'GET_ALL_ORDERS_REQUEST_SUCCESS';
export const GET_ALL_ORDERS_REQUEST_FAILURE = 'GET_ALL_ORDERS_REQUEST_FAILURE';

export const getOrdersRequest = payload => ({
	type: GET_ORDERS_REQUEST, payload
});

export const getOrdersRequestSuccess = (payload,orderHistoryType) => ({
	type: GET_ORDERS_REQUEST_SUCCESS, payload,orderHistoryType
});
export const getOrdersByPageNumberSuccess = (payload,orderHistoryType) => ({
	type: GET_ORDERS_BY_PAGE_NUMBER_SUCCESS, payload, orderHistoryType
});
export const getOrdersRequestFailure = error => ({
	type: GET_ORDERS_REQUEST_FAILURE, error
});
export const getCurrentOrdersRequest = (orderType) => ({
	type: GET_CURRENT_ORDERS_REQUEST, orderType
});
export const getCurrentOrdersRequestSuccess = (payload,typeOfOrder) => ({
	type: GET_CURRENT_ORDERS_REQUEST_SUCCESS, payload, typeOfOrder
});
export const getCurrentOrdersRequestFailure = error => ({
	type: GET_CURRENT_ORDERS_REQUEST_FAILURE, error
});

export const getOrdersByRxmc = payload => ({
	type: GET_ORDERS_RXMC_REQUEST, payload
});
export const getOrdersByRxmcRequestSuccess = payload => ({
	type: GET_ORDERS_RXMC_REQUEST_SUCCESS, payload
});
export const getOrdersByRxmcRequestFailure = (error,rxmc) => ({
	type: GET_ORDERS_RXMC_REQUEST_FAILURE, error, rxmc
});

export const getAllOrdersRequest = payload => ({
	type: GET_ALL_ORDERS_REQUEST, payload
});

export const getAllOrdersRequestSuccess = (payload) => ({
	type: GET_ALL_ORDERS_REQUEST_SUCCESS, payload
});
export const getAllOrdersRequestFailure = error => ({
	type: GET_ALL_ORDERS_REQUEST_FAILURE, error
});