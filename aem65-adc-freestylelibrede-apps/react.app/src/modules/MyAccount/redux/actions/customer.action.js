export const UPDATE_EDITED_ADDRESS_ID = 'UPDATE_EDITED_ADDRESS_ID';
export const GET_CUSTOMER_REQUEST = 'GET_CUSTOMER_REQUEST';
export const RETRY_GET_CUSTOMER_REQUEST = 'RETRY_GET_CUSTOMER_REQUEST';
export const ADD_NEW_ADDRESS_REQUEST = 'ADD_NEW_ADDRESS_REQUEST';
export const UPDATE_ORDER_ADDRESS_REQUEST = 'UPDATE_ORDER_ADDRESS';
export const DELETE_ORDER_ADDRESS_REQUEST = 'DELETE_ORDER_ADDRESS';
export const SET_ORDER_ADDRESS_REQUEST = 'SET_ORDER_ADDRESS_REQUEST';
export const SET_MAXIMUM_ADDRESS_ERROR = 'SET_MAXIMUM_ADDRESS_ERROR';
export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_INSURANCE_REQUEST = 'UPDATE_INSURANCE_REQUEST';
export const GET_USER_DETAILS_OCR_REQUEST = 'GET_USER_DETAILS_OCR_REQUEST';
export const GET_CUSTOMER_PERMISSIONS_REQUEST = 'GET_CUSTOMER_PERMISSIONS_REQUEST';
export const UPDATE_CUSTOMER_PERMISSIONS_REQUEST = 'UPDATE_CUSTOMER_PERMISSIONS_REQUEST';

export const GET_CUSTOMER_REQUEST_SUCCESS = 'GET_CUSTOMER_REQUEST_SUCCESS';
export const GET_CUSTOMER_REQUEST_FAILURE = 'GET_CUSTOMER_REQUEST_FAILURE';
export const GET_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS = 'GET_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS';
export const GET_CUSTOMER_PERMISSIONS_REQUEST_FAILURE = 'GET_CUSTOMER_PERMISSIONS_REQUEST_DAILURE';
export const UPDATE_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS = 'UPDATE_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS';
export const UPDATE_CUSTOMER_PERMISSIONS_REQUEST_FAILURE = 'UPDATE_CUSTOMER_PERMISSIONS_REQUEST_FAILURE';
export const PAYER_UPDATE_REQUEST = 'PAYER_UPDATE_REQUEST';
export const PAYER_UPDATE_REQUEST_ACCEPTED = 'PAYER_UPDATE_REQUEST_ACCEPTED';
export const CUSTOMER_MOBILE_UPDATE_REQUEST = 'CUSTOMER_MOBILE_UPDATE_REQUEST';

export const updateEditedAddressID = payload => ({
	type: UPDATE_EDITED_ADDRESS_ID, payload
});
export const getCustomerRequest = () => ({
	type: GET_CUSTOMER_REQUEST
});
export const retryGetCustomerRequest = payload => ({
	type: RETRY_GET_CUSTOMER_REQUEST, payload
});
export const addNewAddressRequest = payload => ({
	type: ADD_NEW_ADDRESS_REQUEST, payload
});
export const updateOrderAddressRequest = payload => ({
	type: UPDATE_ORDER_ADDRESS_REQUEST, payload
});
export const deleteOrderAddressRequest = payload => ({
	type: DELETE_ORDER_ADDRESS_REQUEST, payload
});
export const setOrderAddressRequest = payload => ({
	type: SET_ORDER_ADDRESS_REQUEST, payload
});
export const getCustomerRequestSuccess = payload => ({
	type: GET_CUSTOMER_REQUEST_SUCCESS, payload
});
export const getCustomerRequestFailure = error => ({
	type: GET_CUSTOMER_REQUEST_FAILURE, error
});
export const setMaximumAddressError = () => ({
	type: SET_MAXIMUM_ADDRESS_ERROR
});
export const updateCustomerRequest = payload => ({
	type: UPDATE_CUSTOMER_REQUEST, payload
});
export const updateInsuranceRequest = payload => ({
	type: UPDATE_INSURANCE_REQUEST, payload
});
export const getUserDetailsOcrRequest = () => ({
	type: GET_USER_DETAILS_OCR_REQUEST
});
export const getCustomerPermissionRequest = () =>({
	type:GET_CUSTOMER_PERMISSIONS_REQUEST
});
export const updateCustomerPermissionRequest = payload =>({
	type:UPDATE_CUSTOMER_PERMISSIONS_REQUEST, payload
});
export const getCustomerPermissionRequestSuccess = payload =>({
	type:GET_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS, payload
});
export const getCustomerPermissionRequestFailure = error =>({
	type:GET_CUSTOMER_PERMISSIONS_REQUEST_FAILURE, error
});
export const updateCustomerPermissionSuccess = payload =>({
	type:UPDATE_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS, payload
});
export const updateCustomerPermissionFailure = error =>({
	type:UPDATE_CUSTOMER_PERMISSIONS_REQUEST_FAILURE, error
});
export const updatePayerRequest = payload => ({
	type: PAYER_UPDATE_REQUEST, payload
});
export const updatePayerRequestSuccess = payload => ({
	type: PAYER_UPDATE_REQUEST_ACCEPTED, payload
});
export const customerMobileUpdateRequest = payload => ({
	type: CUSTOMER_MOBILE_UPDATE_REQUEST, payload
});
