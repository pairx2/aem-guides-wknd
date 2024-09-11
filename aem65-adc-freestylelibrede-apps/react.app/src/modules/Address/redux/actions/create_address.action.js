export const CREATE_ADDRESS_REQUEST = 'CREATE_ADDRESS_REQUEST';
export const CREATE_ADDRESS_REQUEST_SUCCESS = 'CREATE_ADDRESS_REQUEST_SUCCESS';
export const CREATE_ADDRESS_REQUEST_FAILURE = 'CREATE_ADDRESS_REQUEST_FAILURE';

export const createAddressRequest = payload => ({
	type: CREATE_ADDRESS_REQUEST, payload
});

export const createAddressRequestSuccess = payload => ({
	type: CREATE_ADDRESS_REQUEST_SUCCESS, payload
});

export const createAddressRequestFailure = payload => ({
	type: CREATE_ADDRESS_REQUEST_FAILURE, payload
});