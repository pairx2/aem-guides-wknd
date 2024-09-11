export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_REQUEST_SUCCESS = 'UPDATE_ADDRESS_REQUEST_SUCCESS';
export const UPDATE_ADDRESS_REQUEST_FAILURE = 'UPDATE_ADDRESS_REQUEST_FAILURE';

export const updateAddressRequest = payload => ({
	type: UPDATE_ADDRESS_REQUEST, payload
});

export const updateAddressRequestSuccess = payload => ({
	type: UPDATE_ADDRESS_REQUEST_SUCCESS, payload
});

export const updateAddressRequestFailure = payload => ({
	type: UPDATE_ADDRESS_REQUEST_FAILURE, payload
});