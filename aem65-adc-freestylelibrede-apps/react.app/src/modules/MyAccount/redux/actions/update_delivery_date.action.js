export const UPDATE_DELIVERY_DATE_REQUEST = 'UPDATE_DELIVERY_DATE_REQUEST';
export const UPDATE_DELIVERY_DATE_REQUEST_SUCCESS = 'UPDATE_DELIVERY_DATE_REQUEST_SUCCESS';
export const UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS = 'UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS';
export const UPDATE_DELIVERY_DATE_REQUEST_FAILURE = 'UPDATE_DELIVERY_DATE_REQUEST_FAILURE';
export const RESET_DELIVERY_DATE_MODAL = 'RESET_DELIVERY_DATE_MODAL';

export const updateDeliveryDateRequest = payload => ({
	type: UPDATE_DELIVERY_DATE_REQUEST, payload
});

export const updateDeliveryDateRequestSuccess = payload => ({
	type: UPDATE_DELIVERY_DATE_REQUEST_SUCCESS, payload
});
export const updateDeliveryDateForRxmcRequestSuccess = payload => ({
	type: UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS, payload
});

export const updateDeliveryDateRequestFailure = error => ({
	type: UPDATE_DELIVERY_DATE_REQUEST_FAILURE, error
});

export const resetDeliveryDateModal = () => ({
	type: RESET_DELIVERY_DATE_MODAL
});