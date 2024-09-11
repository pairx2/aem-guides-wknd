export const GET_GHOST_CART_ID_REQUEST = 'GET_GHOST_CART_ID_REQUEST';
export const GET_GHOST_CART_ID_REQUEST_SUCCESS = 'GET_GHOST_CART_ID_REQUEST_SUCCESS';
export const GET_GHOST_CART_ID_REQUEST_FAILURE = 'GET_GHOST_CART_ID_REQUEST_FAILURE';

export const GET_GHOST_CART_REQUEST = 'GET_GHOST_CART_REQUEST';
export const GET_GHOST_CART_REQUEST_SUCCESS = 'GET_GHOST_CART_REQUEST_SUCCESS';
export const GET_GHOST_CART_REQUEST_FAILURE = 'GET_GHOST_CART_REQUEST_FAILURE';

export const SET_PAYMENT_METHOD_ON_GHOST_CART_REQUEST_SUCCESS = 'SET_PAYMENT_METHOD_ON_GHOST_CART_REQUEST_SUCCESS';

export const getGhostCartIdRequest = () => ({
	type: GET_GHOST_CART_ID_REQUEST
});

export const getGhostCartIdRequestSuccess = payload => ({
	type: GET_GHOST_CART_ID_REQUEST_SUCCESS, payload
});

export const getGhostCartIdRequestFailure = error => ({
	type: GET_GHOST_CART_ID_REQUEST_FAILURE, error
});

export const getGhostCartRequest = () => ({
	type: GET_GHOST_CART_REQUEST
});

export const getGhostCartRequestSuccess = payload => ({
	type: GET_GHOST_CART_REQUEST_SUCCESS, payload
});

export const setPaymentMethodOnGhostCartRequestSuccess = payload => ({
	type: SET_PAYMENT_METHOD_ON_GHOST_CART_REQUEST_SUCCESS, payload
});

export const getGhostCartRequestFailure = error => ({
	type: GET_GHOST_CART_REQUEST_FAILURE, error
});