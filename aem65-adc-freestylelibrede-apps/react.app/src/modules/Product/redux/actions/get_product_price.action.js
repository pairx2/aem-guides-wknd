export const GET_PRODUCT_PRICE_REQUEST = 'GET_PRODUCT_PRICE_REQUEST';
export const GET_PRODUCT_PRICE_REQUEST_SUCCESS = 'GET_PRODUCT_PRICE_REQUEST_SUCCESS';
export const GET_PRODUCT_PRICE_REQUEST_FAILURE = 'GET_PRODUCT_PRICE_REQUEST_FAILURE';

export const getProductPriceRequest = payload => ({
	type: GET_PRODUCT_PRICE_REQUEST, payload
});

export const getProductPriceRequestSuccess = payload => ({
	type: GET_PRODUCT_PRICE_REQUEST_SUCCESS, payload
});

export const getProductPriceRequestFailure = error => ({
	type: GET_PRODUCT_PRICE_REQUEST_FAILURE, error
});