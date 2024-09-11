export const CONFIRM_OFFLINE_CUSTOMER_REQUEST = 'CONFIRM_OFFLINE_CUSTOMER_REQUEST';
export const CONFIRM_OFFLINE_CUSTOMER_REQUEST_SUCCESS = 'CONFIRM_OFFLINE_CUSTOMER_REQUEST_SUCCESS';
export const CONFIRM_OFFLINE_CUSTOMER_REQUEST_FAILURE = 'CONFIRM_OFFLINE_CUSTOMER_REQUEST_FAILURE';

export const confirmOfflineCustomerRequest = payload => ({
	type: CONFIRM_OFFLINE_CUSTOMER_REQUEST, payload
});

export const confirmOfflineCustomerRequestSuccess = (payload) => ({
	type: CONFIRM_OFFLINE_CUSTOMER_REQUEST_SUCCESS, payload
});

export const confirmOfflineCustomerRequestFailure = error => ({
	type: CONFIRM_OFFLINE_CUSTOMER_REQUEST_FAILURE, error
});