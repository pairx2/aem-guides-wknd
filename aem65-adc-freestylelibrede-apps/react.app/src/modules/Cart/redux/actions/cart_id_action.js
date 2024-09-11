export const GET_CUSTOMER_CART_ID_REQUEST = 'GET_CUSTOMER_CART_ID_REQUEST';
export const SET_CUSTOMER_CART_ID = 'SET_CUSTOMER_CART_ID';
export const GET_CUSTOMER_CART_ID_REQUEST_SUCCESS = 'GET_CUSTOMER_CART_ID_REQUEST_SUCCESS';
export const GET_CUSTOMER_CART_ID_REQUEST_FAILURE = 'GET_CUSTOMER_CART_ID_REQUEST_FAILURE';
export const MERGE_CART_REQUEST = 'MERGE_CART_REQUEST';

export const getCustomerCartIdRequest = () => ({
	type: GET_CUSTOMER_CART_ID_REQUEST
});

export const mergeCartRequest = payload => ({
	type: MERGE_CART_REQUEST, payload
});

export const setCustomerCartId = payload => ({
	type: SET_CUSTOMER_CART_ID, payload
});

export const getCustomerCartIdRequestSuccess = payload => ({
	type: GET_CUSTOMER_CART_ID_REQUEST_SUCCESS, payload
});

export const getCustomerCartIdRequestFailure = error => ({
	type: GET_CUSTOMER_CART_ID_REQUEST_FAILURE, error
});