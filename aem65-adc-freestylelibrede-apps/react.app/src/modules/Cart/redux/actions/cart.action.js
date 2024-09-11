export const GET_CUSTOMER_CART_REQUEST = 'GET_CUSTOMER_CART_REQUEST';
export const RETRY_GET_CUSTOMER_CART_REQUEST = 'RETRY_GET_CUSTOMER_CART_REQUEST';
export const HIDE_MINICART_POPUP = 'HIDE_MINICART_POPUP';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_MULTIPLE_PRODUCTS_REQUEST = 'ADD_MULTIPLE_PRODUCTS_REQUEST';
export const ADD_SUBSCRIPTION_REQUEST = 'ADD SUBSCRIPTION_REQUEST';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_REQUEST_SUCCESS = 'DELETE_PRODUCT_REQUEST_SUCCESS';
export const DELETE_PRODUCT_REQUEST_FAILURE = 'DELETE_PRODUCT_REQUEST_FAILURE';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const GET_CUSTOMER_CART_REQUEST_SUCCESS = 'GET_CUSTOMER_CART_REQUEST_SUCCESS';
export const GET_CUSTOMER_CART_REQUEST_FAILURE = 'GET_CUSTOMER_CART_REQUEST_FAILURE';
export const ADD_COUPON_TO_CART_REQUEST = 'ADD_COUPON_TO_CART_REQUEST';
export const SET_PAYMENT_METHOD_ON_CART_REQUEST = 'SET_PAYMENT_METHOD_ON_CART_REQUEST';
export const SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS = 'SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS';
export const SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST = 'SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST';
export const REMOVE_COUPON_FROM_CART_REQUEST = 'REMOVE_COUPON_TO_CART_REQUEST';
export const RESET_ERROR_ACTION = 'RESET_ERROR_ACTION';

export const SET_SHIPPING_ADDRESS_ON_CART = 'SET_SHIPPING_ADDRESS_ON_CART';
export const SET_BILLING_ADDRESS_ON_CART = 'SET_BILLING_ADDRESS_ON_CART';
export const SET_ADDRESS_ON_CART_SUCCESS = 'SET_ADDRESS_ON_CART_SUCCESS';

export const ADD_COUPON_FAILURE = 'COUPON_FAILURE';
export const REMOVE_COUPON_FAILURE = 'REMOVE_COUPON_FAILURE';

export const hideMiniCartPopup = () => ({
	type: HIDE_MINICART_POPUP
});

export const getCustomerCartRequest = payload => ({
	type: GET_CUSTOMER_CART_REQUEST, payload
});

export const AddCouponRequestFailure = payload => ({
	type: ADD_COUPON_FAILURE, payload
});

export const RemoveCouponRequestFailure = payload => ({
	type: REMOVE_COUPON_FAILURE, payload
});

export const retryGetCustomerCartRequest = payload => ({
	type: RETRY_GET_CUSTOMER_CART_REQUEST, payload
});

export const addProductRequest = payload => ({
	type: ADD_PRODUCT_REQUEST, payload
});

export const addMultipleProductsRequest = payload => ({
	type: ADD_MULTIPLE_PRODUCTS_REQUEST, payload
});

export const addSubscriptionRequest = payload => ({
	type: ADD_SUBSCRIPTION_REQUEST, payload
});

export const deleteProductRequest = payload => ({
	type: DELETE_PRODUCT_REQUEST, payload
});

export const deleteProductRequestSuccess = payload => ({
	type: DELETE_PRODUCT_REQUEST_SUCCESS, payload
});

export const deleteProductRequestFailure = payload => ({
	type: DELETE_PRODUCT_REQUEST_FAILURE, payload
});

export const updateProductRequest = payload => ({
	type: UPDATE_PRODUCT_REQUEST, payload
});

export const getCustomerCartRequestSuccess = payload => ({
	type: GET_CUSTOMER_CART_REQUEST_SUCCESS, payload
});

export const getCustomerCartRequestFailure = payload => ({
	type: GET_CUSTOMER_CART_REQUEST_FAILURE, payload
});

export const SetPaymentMethodOnCartRequestSuccess = payload => ({
	type: SET_PAYMENT_METHOD_ON_CART_REQUEST_SUCCESS, payload
});

export const addCouponToCartRequest = payload => ({
	type: ADD_COUPON_TO_CART_REQUEST, payload
});

export const setPaymentMethodOnCartRequest = payload => ({
	type: SET_PAYMENT_METHOD_ON_CART_REQUEST, payload
});

export const setSavedPaymentMethodOnCartRequest = payload => ({
	type: SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST, payload
});

export const removeCouponFromCartRequest = payload => ({
	type: REMOVE_COUPON_FROM_CART_REQUEST, payload
});

export const resetError = () => ({
	type: RESET_ERROR_ACTION
});

export const setShippingAddressOnCart = payload => ({
	type: SET_SHIPPING_ADDRESS_ON_CART, payload
});

export const setBillingAddressOnCart = payload => ({
	type: SET_BILLING_ADDRESS_ON_CART, payload
});

export const setAddressOnCartSuccess = payload => ({
	type: SET_ADDRESS_ON_CART_SUCCESS, payload
});