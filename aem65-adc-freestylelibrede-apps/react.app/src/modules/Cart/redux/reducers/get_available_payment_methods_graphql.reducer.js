import {
    GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST,
    GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST_SUCCESS,
    GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST_FAILURE,
} from '../actions/get_available_payment_methods_graphql.action';

const initialState = {
    paymentMethods: [],
    isLoading: false,
    error: null,
    webShopMessage: null,
    rssResultCode: null,
    isAllowSave: null,
    isBlacklisted: null,
    isVerified: null,
    billingAddress: [],
    deliveryAddress: [],
    communicationToken: null
}

export const GetAvailablePaymentMethodsGraphqlReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST:
            return {
                ...state,
                isLoading: true,
                paymentMethods: []
            };
        case GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST_SUCCESS:
            return {
                ...state,
                 isLoading: false,
                 paymentMethods: action.payload.adcGetAvailablePaymentMethods.available_payment_methods,
                 webShopMessage: action.payload.adcGetAvailablePaymentMethods.webshop_message,
                 billingAddress: action.payload.adcGetAvailablePaymentMethods.billing_address_validation,
                 deliveryAddress: action.payload.adcGetAvailablePaymentMethods.delivery_address_validation,
                 isAllowSave: action.payload.adcGetAvailablePaymentMethods.allow_save_corrected,
                 rssResultCode: action.payload.adcGetAvailablePaymentMethods.arvato_code,
                 communicationToken: action.payload.adcGetAvailablePaymentMethods.communication_token,
                 isBlacklisted: action.payload.adcGetAvailablePaymentMethods.is_blacklisted
            };
        case GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST_FAILURE:
            return {
                ...state,
                paymentMethods: [],
				isLoading: false,
				error: action.error.error,
				webShopMessage: action.error.message
            };

        default:
            return state;
    }
}