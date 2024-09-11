export const UPDATE_PAYMENT_METHOD_REQUEST = 'UPDATE_PAYMENT_METHOD_REQUEST';
export const UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS = 'UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS';
export const UPDATE_PAYMENT_METHOD_REQUEST_FAILURE = 'UPDATE_PAYMENT_METHOD_REQUEST_FAILURE';
export const UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST = 'UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST';
export const UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS = 'UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS';
export const UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_FAILURE = 'UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_FAILURE';
export const RESET_PAYMENT_REDUCER = 'RESET_PAYMENT_REDUCER';

export const updatePaymentMethodRequest = payload => ({
	type: UPDATE_PAYMENT_METHOD_REQUEST, payload
});

export const updatePaymentMethodRequestSuccess = payload => ({
	type: UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS, payload
});

export const updatePaymentMethodRequestFailure = error => ({
	type: UPDATE_PAYMENT_METHOD_REQUEST_FAILURE, error
});

export const updateAddressAndPaymentMethodRequest = payload => ({
	type: UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST, payload
});

export const updateAddressAndPaymentMethodRequestSuccess = payload => ({
	type: UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS, payload
});

export const updateAddressAndPaymentMethodRequestFailure = error => ({
	type: UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_FAILURE, error
});

export const resetPaymentReducer = () => ({
	type: RESET_PAYMENT_REDUCER
});