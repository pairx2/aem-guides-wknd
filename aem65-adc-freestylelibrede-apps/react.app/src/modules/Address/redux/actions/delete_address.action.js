export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_REQUEST_SUCCESS = 'DELETE_ADDRESS_REQUEST_SUCCESS';
export const DELETE_ADDRESS_REQUEST_FAILURE = 'DELETE_ADDRESS_REQUEST_FAILURE';

export const deleteAddressRequest = payload => ({
	type: DELETE_ADDRESS_REQUEST, payload
});

export const deleteAddressRequestSuccess = payload => ({
	type: DELETE_ADDRESS_REQUEST_SUCCESS, payload
});

export const deleteAddressRequestFailure = payload => ({
	type: DELETE_ADDRESS_REQUEST_FAILURE, payload
});