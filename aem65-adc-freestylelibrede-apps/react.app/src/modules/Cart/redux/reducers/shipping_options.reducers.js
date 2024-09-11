import {
	GET_SHIPPING_OPTIONS_REQUEST,
	GET_SHIPPING_OPTIONS_REQUEST_FAILURE,
	GET_SHIPPING_OPTIONS_REQUEST_SUCCESS
} from '../actions/shipping_options_action';

const initialState = {
	loading: false,
	shippingOptions: [],
	error: null
};

export const shippingOptionsReducers = (state = initialState, action) => {
	switch (action.type) {
		case GET_SHIPPING_OPTIONS_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_SHIPPING_OPTIONS_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				shippingOptions: action.payload && action.payload.adcGetAvailableShippingMethods && action.payload.adcGetAvailableShippingMethods.available_shipping_methods,
			};
		case GET_SHIPPING_OPTIONS_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};