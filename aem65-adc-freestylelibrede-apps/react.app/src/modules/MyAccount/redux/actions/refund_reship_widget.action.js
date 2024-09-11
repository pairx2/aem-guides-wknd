export const RETURN_ACTION_REQUEST = ' RETURN_ACTION_REQUEST';
export const RETURN_ACTION_REQUEST_SUCCESS = ' RETURN_ACTION_REQUEST_SUCCESS';
export const RETURN_ACTION_REQUEST_FAILURE = ' RETURN_ACTION_REQUEST_FAILURE';
export const SET_RADIO_REFUND_RESHIP_REQUEST = 'SET_RADIO_REFUND_RESHIP_REQUEST'

export const returnActionRequest = payload => ({
	type: RETURN_ACTION_REQUEST, payload
});
export const returnActionRequestSuccess = payload => ({
	type: RETURN_ACTION_REQUEST_SUCCESS, payload
});
export const returnActionRequestFailure = error => ({
	type: RETURN_ACTION_REQUEST_FAILURE, error
});
export const setRadioRefundReshipRequest = payload => ({
	type: SET_RADIO_REFUND_RESHIP_REQUEST, payload
});