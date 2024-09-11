import {
	GET_CUSTOMER_CART_ID_REQUEST,
	GET_CUSTOMER_CART_ID_REQUEST_FAILURE,
	GET_CUSTOMER_CART_ID_REQUEST_SUCCESS, SET_CUSTOMER_CART_ID
} from '../actions/cart_id_action';

const initialState = {
	loading: false,
	cartId: null,
	error: null
};
export const GetCustomerCartIdReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_CUSTOMER_CART_ID_REQUEST:
			return {
				...state,
				loading: true
			};
		case SET_CUSTOMER_CART_ID:
			return {
				...state,
				cartId: action.payload
			};
		case GET_CUSTOMER_CART_ID_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				cartId: action.payload.adcGetOrCreateCartId
			};
		case GET_CUSTOMER_CART_ID_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;

	}
};