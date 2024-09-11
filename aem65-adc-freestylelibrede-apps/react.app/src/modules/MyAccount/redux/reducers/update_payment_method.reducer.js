import {
	UPDATE_PAYMENT_METHOD_REQUEST,
	UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS,
	UPDATE_PAYMENT_METHOD_REQUEST_FAILURE,
	RESET_PAYMENT_REDUCER,
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST,
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS,
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_FAILURE
} from '../actions/update_payment_method.action';

const initialState = {
	loading: false,
	error: null,
	isPaymentMethodUpdated: null,
	canRedirect: false,
	updatedOrder: null,
	addressAndPaymentUpdateError:null,
	isAddressAndPaymentMethodUpdated:null
};

export const UpdatePaymentMethodReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_PAYMENT_METHOD_REQUEST:
			return {
				...state,
				error: null,
				loading: true,
				canRedirect: false,
				isPaymentMethodUpdated: null,
				updatedOrder: action.payload.order_type
			};
		case UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS:
			return {
				...state,
				error: null,
				canRedirect: true,
				loading: false,
				isPaymentMethodUpdated: true
			};
		case UPDATE_PAYMENT_METHOD_REQUEST_FAILURE:
			return {
				...state,
				error: action.error?.error,
				loading: false,
				isPaymentMethodUpdated: false,
				canRedirect: true,
			};
		case UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST:
			return {
				...state,
				error: null,
				loading: true,
				isAddressAndPaymentMethodUpdated: null,
				canRedirect:false,
				updatedOrder: action.payload.order_type,
				addressAndPaymentUpdateError:null
			};
		case UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				isAddressAndPaymentMethodUpdated: true,
				canRedirect:true,
				addressAndPaymentUpdateError:null
			};
		case UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_FAILURE:
			return {
				...state,
				error: action.error?.error,
				loading: false,
				isAddressAndPaymentMethodUpdated: false,
				canRedirect:true,
				addressAndPaymentUpdateError: true
			};
		case RESET_PAYMENT_REDUCER:
			return {
				...state,
				loading: false,
				error: null,
				isPaymentMethodUpdated: null,
				isAddressAndPaymentMethodUpdated:null,
				canRedirect:false,
				updatedOrder: null,
				addressAndPaymentUpdateError:null
			};
		default:
			return state;
	}
};