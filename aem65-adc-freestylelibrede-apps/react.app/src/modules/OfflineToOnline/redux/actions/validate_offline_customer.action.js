export const VALIDATE_OFFLINE_CUSTOMER_REQUEST = 'VALIDATE_OFFLINE_CUSTOMER_REQUEST';
export const VALIDATE_OFFLINE_CUSTOMER_REQUEST_SUCCESS = 'VALIDATE_OFFLINE_CUSTOMER_REQUEST_SUCCESS';
export const VALIDATE_OFFLINE_CUSTOMER_REQUEST_FAILURE = 'VALIDATE_OFFLINE_CUSTOMER_REQUEST_FAILURE';

export const validateOfflineCustomerRequest = payload => ({
	type: VALIDATE_OFFLINE_CUSTOMER_REQUEST, payload
});

export const validateOfflineCustomerRequestSuccess = (payload) => ({
	type: VALIDATE_OFFLINE_CUSTOMER_REQUEST_SUCCESS, payload
});

export const validateOfflineCustomerRequestFailure = error => ({
	type: VALIDATE_OFFLINE_CUSTOMER_REQUEST_FAILURE, error
});

