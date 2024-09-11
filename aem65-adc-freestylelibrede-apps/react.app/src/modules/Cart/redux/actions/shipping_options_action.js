export const GET_SHIPPING_OPTIONS_REQUEST = 'GET_SHIPPING_OPTIONS_REQUEST';
export const GET_SHIPPING_OPTIONS_REQUEST_SUCCESS = 'GET_SHIPPING_OPTIONS_REQUEST_SUCCESS';
export const GET_SHIPPING_OPTIONS_REQUEST_FAILURE = 'GET_SHIPPING_OPTIONS_REQUEST_FAILURE';
export const UPDATE_SHIPPING_OPTIONS_REQUEST = 'UPDATE_SHIPPING_OPTIONS_REQUEST';

export const getShippingOptionsRequest = payload => ({
	type: GET_SHIPPING_OPTIONS_REQUEST,
	payload
});

export const getShippingOptionsRequestSuccess = payload => ({
	type: GET_SHIPPING_OPTIONS_REQUEST_SUCCESS,
	payload
});

export const getShippingOptionsRequestFailure = error => ({
	type: GET_SHIPPING_OPTIONS_REQUEST_FAILURE,
	error
});

export const updateShippingOptionsRequest = payload => ({
	type: UPDATE_SHIPPING_OPTIONS_REQUEST,
	payload
});