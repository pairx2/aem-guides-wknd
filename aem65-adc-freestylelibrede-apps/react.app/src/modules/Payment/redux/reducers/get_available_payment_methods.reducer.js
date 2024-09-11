import {
	GET_AVAILABLE_PAYMENT_METHODS_REQUEST,
	GET_AVAILABLE_PAYMENT_METHODS_REQUEST_FAILURE,
	GET_AVAILABLE_PAYMENT_METHODS_REQUEST_SUCCESS,
	ACCEPT_CORRECTED_RISKCHECK_ADDRESS_REQUEST
} from '../actions/get_available_payment_methods.action';

const initialState = {
	methods: [],
	isLoading: false,
	error: null,
	communicationToken: null,
	rssResultCode: null,
	riskcheckAddress: {},
	isAllowSave: null,
	isBlacklisted: null,
	isVerified: null,
	webShopMessage: null
};

export const GetAvailablePaymentMethodsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AVAILABLE_PAYMENT_METHODS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
				communicationToken: null,
				rssResultCode: null,
				riskcheckAddress: {},
				isAllowSave: null,
				isBlacklisted: null,
				isVerified: null
			};
		case GET_AVAILABLE_PAYMENT_METHODS_REQUEST_SUCCESS:
		case ACCEPT_CORRECTED_RISKCHECK_ADDRESS_REQUEST:
			return {
				...state,
				isLoading: false,
				methods: action.payload.methods,
				rssResultCode: action.payload.resultCode,
				communicationToken: action.payload.communicationToken,
				riskcheckAddress: action.payload.riskcheckAddress,
				isAllowSave: action.payload.allowSave,
				isBlacklisted: action.payload.isBlacklisted,
				isVerified: action.payload.isVerified
			};
		case GET_AVAILABLE_PAYMENT_METHODS_REQUEST_FAILURE:
			return {
				...state,
				methods: [],
				isLoading: false,
				error: action.error.error,
				communicationToken: action.error.communicationToken,
				isAllowSave: action.error.allowSave,
				webShopMessage: action.error.webShopMessage
			};
		default:
			return state;
	}
};