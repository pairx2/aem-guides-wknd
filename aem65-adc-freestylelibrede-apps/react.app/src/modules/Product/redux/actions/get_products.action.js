export const GET_PRODUCTS_REQUEST = 'GET_PRODUCT_LIST_REQUESTS';
export const SET_PRODUCTS_REQUEST = 'SET_PRODUCT_LIST_REQUESTS';

export const getProductsRequest = () => ({
	type: GET_PRODUCTS_REQUEST
});

export const setProductsRequest = (payload) => ({
	type: SET_PRODUCTS_REQUEST, payload
});