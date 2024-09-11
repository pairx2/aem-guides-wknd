import {
	GET_CUSTOMER_PERMISSIONS_REQUEST,
	UPDATE_CUSTOMER_PERMISSIONS_REQUEST,
	GET_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS,
	GET_CUSTOMER_PERMISSIONS_REQUEST_FAILURE,
	UPDATE_CUSTOMER_PERMISSIONS_REQUEST_FAILURE
} from '../actions/customer.action';

const initialState = {
	permissions: [],
	errorCode: null,
	errorCodeUpdate: null
};

export const GetCustomerPermissionReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CUSTOMER_PERMISSIONS_REQUEST:
			return {
				...state,
				errorCode: null
			};
		case UPDATE_CUSTOMER_PERMISSIONS_REQUEST:
			return {
				...state,
				errorCodeUpdate: null
			};
		case GET_CUSTOMER_PERMISSIONS_REQUEST_SUCCESS:
			return {
				...state,
				permissions: action.payload.adcCustomerPermissionsList.permissions
			};
		case GET_CUSTOMER_PERMISSIONS_REQUEST_FAILURE:
			return {
				...state,
				errorCode: action.error.errorCodes[0]
			};
		case UPDATE_CUSTOMER_PERMISSIONS_REQUEST_FAILURE:
			return {
				...state,
				errorCodeUpdate: action.error.errorCodes[0]
			};
		default:
			return state;
	}
};