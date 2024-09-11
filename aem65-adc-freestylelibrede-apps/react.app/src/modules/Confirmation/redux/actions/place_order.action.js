export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const SET_ORDER_ID = 'SET_ORDER_ID';

export const placeOrderRequest = payload => ({
	type: PLACE_ORDER_REQUEST, payload
});
export const placeOrderSuccess = payload => ({
	type: PLACE_ORDER_SUCCESS, payload
});
export const placeOrderFailure = error => ({
	type: PLACE_ORDER_FAILURE, error
});
export const setOrderId = payload => ({
	type: SET_ORDER_ID, payload
});