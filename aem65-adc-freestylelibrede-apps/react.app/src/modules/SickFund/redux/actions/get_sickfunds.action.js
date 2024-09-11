export const GET_SICKFUNDS_REQUEST = 'GET_SICKFUNDS_REQUEST';
export const GET_SICKFUNDS_REQUEST_SUCCESS = 'GET_SICKFUNDS_REQUEST_SUCCESS';
export const GET_SICKFUNDS_REQUEST_FAILURE = 'GET_SICKFUNDS_REQUEST_FAILURE';

export const getSickfundsRequest = () => ({
	type: GET_SICKFUNDS_REQUEST
});

export const getSickfundsRequestSuccess = payload => ({
	type: GET_SICKFUNDS_REQUEST_SUCCESS, payload
});

export const getSickfundsRequestFailure = error => ({
	type: GET_SICKFUNDS_REQUEST_FAILURE, error
});