export const GET_GHOST_ORDERS_REQUEST = 'GET_GHOST_ORDERS_REQUEST';
export const GET_GHOST_ORDERS_REQUEST_SUCCESS = 'GET_GHOST_ORDERS_REQUEST_SUCCESS';
export const GET_GHOST_ORDERS_REQUEST_FAILURE = 'GET_GHOST_ORDERS_REQUEST_FAILURE';

export const GHOST_ORDERS_DEACTIVATE = 'GHOST_ORDERS_DEACTIVATE';
export const GHOST_ORDERS_DEACTIVATE_SUCCESS = 'GHOST_ORDERS_DEACTIVATE_SUCCESS';
export const GHOST_ORDERS_DEACTIVATE_FAILURE = 'GHOST_ORDERS_DEACTIVATE_FAILURE';
export const UPDATE_GHOST_ORDERS_REQUEST = 'UPDATE_GHOST_ORDERS_REQUEST';

export const RESET_GHOST_ORDERS_SUCCESS = 'RESET_GHOST_ORDERS_SUCCESS';

export const getGhostOrdersRequest = payload => ({
	type: GET_GHOST_ORDERS_REQUEST, payload
});

export const getGhostOrdersRequestSuccess = payload => ({
	type: GET_GHOST_ORDERS_REQUEST_SUCCESS, payload
});

export const getGhostOrdersRequestFailure = payload => ({
	type: GET_GHOST_ORDERS_REQUEST_FAILURE, payload
});

export const ghostOrdersDeactivate = payload => ({
	type: GHOST_ORDERS_DEACTIVATE, payload
});

export const ghostOrdersDeactivateSuccess = payload => ({
	type: GHOST_ORDERS_DEACTIVATE_SUCCESS, payload
});

export const ghostOrdersDeactivateFailure = payload => ({
	type: GHOST_ORDERS_DEACTIVATE_FAILURE, payload
});

export const updateGhostOrderRequest = payload => ({
	type: UPDATE_GHOST_ORDERS_REQUEST, payload
});
export const resetGhostOrdersSuccess = () => ({
	type: RESET_GHOST_ORDERS_SUCCESS
});