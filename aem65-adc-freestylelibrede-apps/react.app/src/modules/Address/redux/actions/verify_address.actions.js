export const VERIFY_ADDRESS_REQUEST = 'VERIFY_ADDRESS_REQUEST';
export const VERIFY_ADDRESS_REQUEST_SUCCESS = 'VERIFY_ADDRESS_REQUEST_SUCCESS';
export const ACCEPT_ADDRESS_REQUEST = 'ACCEPT_ADDRESS_REQUEST';
export const VERIFY_ADDRESS_REQUEST_FAILURE = 'VERIFY_ADDRESS_REQUEST_FAILURE';

export const verifyAddressRequest = payload => ({
	type: VERIFY_ADDRESS_REQUEST, payload
});

export const verifyAddressRequestSuccess = payload => ({
	type: VERIFY_ADDRESS_REQUEST_SUCCESS, payload
});

export const acceptAddressRequest = payload => ({
	type: ACCEPT_ADDRESS_REQUEST, payload
});

export const verifyAddressRequestFailure = payload => ({
	type: VERIFY_ADDRESS_REQUEST_FAILURE, payload
});
