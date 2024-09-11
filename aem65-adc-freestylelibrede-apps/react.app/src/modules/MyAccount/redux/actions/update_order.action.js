export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_REQUEST_SUCCESS = 'UPDATE_ORDER_REQUEST_SUCCESS';
export const UPDATE_ORDER_REQUEST_FAILURE = 'UPDATE_ORDER_REQUEST_FAILURE';
export const RESET_FORM = 'RESET_FORM';

export const updateOrderRequest = payload => ({
	type: UPDATE_ORDER_REQUEST, payload
});
export const updateOrderRequestSuccess = payload => ({
	type: UPDATE_ORDER_REQUEST_SUCCESS, payload
});
export const updateOrderRequestFailure = error => ({
	type: UPDATE_ORDER_REQUEST_FAILURE, error
});
export const resetAddressEditor = () => ({
	type: RESET_FORM
});