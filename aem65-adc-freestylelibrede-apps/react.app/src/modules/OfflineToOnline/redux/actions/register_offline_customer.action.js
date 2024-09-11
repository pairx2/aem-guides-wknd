export const REGISTER_OFFLINE_CUSTOMER_REQUEST = 'REGISTER_OFFLINE_CUSTOMER_REQUEST';
export const REGISTER_OFFLINE_CUSTOMER_REQUEST_SUCCESS = 'REGISTER_OFFLINE_CUSTOMER_REQUEST_SUCCESS';
export const REGISTER_OFFLINE_CUSTOMER_REQUEST_FAILURE = 'REGISTER_OFFLINE_CUSTOMER_REQUEST_FAILURE';

export const registerOfflineCustomerRequest = payload => ({
	type: REGISTER_OFFLINE_CUSTOMER_REQUEST, payload
});

export const registerOfflineCustomerRequestSuccess = (payload) => ({
	type: REGISTER_OFFLINE_CUSTOMER_REQUEST_SUCCESS, payload
});

export const registerOfflineCustomerRequestFailure = error => ({
	type: REGISTER_OFFLINE_CUSTOMER_REQUEST_FAILURE, error
});