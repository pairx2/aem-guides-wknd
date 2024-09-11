export const PLUS_SERVICE_CANCELLATION_REQUEST = 'PLUS_SERVICE_CANCELLATION_REQUEST';
export const PLUS_SERVICE_CANCELLATION_REQUEST_SUCCESS = 'PLUS_SERVICE_CANCELLATION_REQUEST_SUCCESS';
export const PLUS_SERVICE_CANCELLATION_REQUEST_FAILURE = 'PLUS_SERVICE_CANCELLATION_REQUEST_FAILURE';
export const plusServiceCancellationRequest = payload => ({
	type: PLUS_SERVICE_CANCELLATION_REQUEST , payload
});
export const plusServiceCancellationRequestSuccess = payload => ({
	type: PLUS_SERVICE_CANCELLATION_REQUEST_SUCCESS, payload
});
export const plusServiceCancellationRequestFailure = error => ({
	type: PLUS_SERVICE_CANCELLATION_REQUEST_FAILURE, error
});