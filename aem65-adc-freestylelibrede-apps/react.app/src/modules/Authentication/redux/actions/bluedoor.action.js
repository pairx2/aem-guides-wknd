export const GET_BLUEDOOR_CUSTOMER_REQUEST = 'GET_BLUEDOOR_CUSTOMER_REQUEST';
export const GET_BLUEDOOR_CUSTOMER_REQUEST_SUCCESS = 'GET_BLUEDOOR_CUSTOMER_REQUEST_SUCCESS';
export const GET_BLUEDOOR_CUSTOMER_REQUEST_FAILURE = 'GET_BLUEDOOR_CUSTOMER_REQUEST_FAILURE';

export const getBluedoorCustomerRequest = payload => ({
	type: GET_BLUEDOOR_CUSTOMER_REQUEST, payload
});
export const getBluedoorCustomerRequestSuccess = payload => ({
	type: GET_BLUEDOOR_CUSTOMER_REQUEST_SUCCESS, payload
});
export const getBluedoorCustomerRequestFailure = payload => ({
	type: GET_BLUEDOOR_CUSTOMER_REQUEST_FAILURE, payload
});