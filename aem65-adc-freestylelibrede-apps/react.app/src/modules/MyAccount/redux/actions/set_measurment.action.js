export const SET_MEASURMENT_REQUEST = 'SET_MEASURMENT_REQUEST';
export const SET_MEASURMENT_REQUEST_SUCCESS = 'SET_MEASURMENT_REQUEST_SUCCESS';
export const SET_MEASURMENT_REQUEST_FAILURE = 'SET_MEASURMENT_REQUEST_FAILURE';

export const setMeasurmentRequest = payload => ({
	type: SET_MEASURMENT_REQUEST, payload
});

export const setMeasurmentRequestSuccess = payload => ({
	type: SET_MEASURMENT_REQUEST_SUCCESS, payload
});

export const setMeasurmentRequestFailure = error => ({
	type: SET_MEASURMENT_REQUEST_FAILURE, error
});