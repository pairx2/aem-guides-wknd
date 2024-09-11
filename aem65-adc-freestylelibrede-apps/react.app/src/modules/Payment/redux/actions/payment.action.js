export const GET_CUSTOMER_PAYMENT_TOKENS_REQUEST = 'GET_CUSTOMER_PAYMENT_TOKENS_REQUEST';
export const GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_SUCCESS = 'GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_SUCCESS';
export const GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_FAILURE = 'GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_FAILURE';

export const INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST = 'INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST';
export const INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS = 'INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS';
export const INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE = 'INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE';

export const SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST = 'SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST';
export const SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS = 'SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS';
export const SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE = 'SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE';

export const DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST = 'DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST';
export const DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS = 'DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS';
export const DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE = 'DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE';

export const getCustomerPaymentTokensRequest = () => ({
	type: GET_CUSTOMER_PAYMENT_TOKENS_REQUEST
});

export const getCustomerPaymentTokensRequestSuccess = payload => ({
	type: GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_SUCCESS, payload
});

export const getCustomerPaymentTokensRequestFailure = payload => ({
	type: GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_FAILURE, payload
});

export const initializeCustomerPaymentTokenRequest = payload => ({
	type: INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST, payload
});

export const initializeCustomerPaymentTokenRequestSuccess = payload => ({
	type: INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, payload
});

export const initializeCustomerPaymentTokenRequestFailure = payload => ({
	type: INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, payload
});

export const saveCustomerPaymentTokenRequest = payload => ({
	type: SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST, payload
});

export const saveCustomerPaymentTokenRequestSuccess = payload => ({
	type: SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, payload
});

export const saveCustomerPaymentTokenRequestFailure = payload => ({
	type: SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, payload
});

export const deleteCustomerPaymentTokenRequest = payload => ({
	type: DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST, payload
});

export const deleteCustomerPaymentTokenRequestSuccess = payload => ({
	type: DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, payload
});

export const deleteCustomerPaymentTokenRequestFailure = payload => ({
	type: DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, payload
});