import {
	GET_CUSTOMER_PAYMENT_TOKENS_REQUEST,
	GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_FAILURE,
	GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_SUCCESS,
	INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST, INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE,
	INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS,
	SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS,
	SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST, SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE,
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST,
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS,
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE
} from '../actions/payment.action';

const initialState = {
	isLoading: false,
	paymentTokens: null,
	payonCheckoutId: null,
	canGoToPaymentTab: null,
	error: null,
	errorInDeletingPayment: null,
	errorInSavingPayment: null
};

export const PaymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CUSTOMER_PAYMENT_TOKENS_REQUEST:
			return {
				...state,
				isLoading: true,
				errorInDeletingPayment: null
			};
		case GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				paymentTokens: action.payload.adcCustomerGetTokens.tokens,
				errorInDeletingPayment: null
			};
		case GET_CUSTOMER_PAYMENT_TOKENS_REQUEST_FAILURE:
		case DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false
			};
		case INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST:
			return {
				...state,
				payonCheckoutId: null,
				error: null
			};
		case INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS:
			return {
				...state,
				payonCheckoutId: action.payload.adcCustomerPaymentTokenInit.payon_checkout_id,
				error: null
			};
		case INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE:
			return {
				...state,
				error: action.payload?.errorCodes?.[0]
			};
		case SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST:
			return {
				...state,
				canGoToPaymentTab: null,
				errorInSavingPayment: null
			};
		case SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS:
			return {
				...state,
				canGoToPaymentTab: true,
				errorInSavingPayment: null
			};
		case SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE:
			return {
				...state,
				errorInSavingPayment: action.payload?.errorCodes?.[0],
				canGoToPaymentTab: true
			};
		case DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST:
			return {
				...state,
				isLoading: true
			};
		case DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				errorInDeletingPayment: action.payload?.errorCodes?.[0]
			};
		default:
			return state;
	}
};