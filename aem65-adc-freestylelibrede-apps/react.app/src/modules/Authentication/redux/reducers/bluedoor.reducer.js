import {
	GET_BLUEDOOR_CUSTOMER_REQUEST,
	GET_BLUEDOOR_CUSTOMER_REQUEST_SUCCESS,
	GET_BLUEDOOR_CUSTOMER_REQUEST_FAILURE
} from '../actions/bluedoor.action';

const initialState = {
	errorCode: null,
	bluedoorCustomer: null
};

export const bluedoorModuleReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BLUEDOOR_CUSTOMER_REQUEST:
			return {
				...state,
				errorCode: null
			};
		case GET_BLUEDOOR_CUSTOMER_REQUEST_SUCCESS:
			return {
				...state,
				bluedoorCustomer: action.payload.adcBluedoorAuthenticate.customer
			};
		case GET_BLUEDOOR_CUSTOMER_REQUEST_FAILURE:
			return {
				...state,
				errorCode: action.payload.errorCodes[0]
			};
		default:
			return state;
	}
};