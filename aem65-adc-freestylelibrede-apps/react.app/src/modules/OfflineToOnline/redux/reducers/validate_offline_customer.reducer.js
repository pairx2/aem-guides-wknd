import {
	VALIDATE_OFFLINE_CUSTOMER_REQUEST, 
	VALIDATE_OFFLINE_CUSTOMER_REQUEST_FAILURE, 
	VALIDATE_OFFLINE_CUSTOMER_REQUEST_SUCCESS 
} from "../actions/validate_offline_customer.action";

const initialState = {
	validateOfflineCustomerResponse: null,
	isLoading: false,
	error: null
};
export const offlineToOnlineReducer = (state = initialState, action) => {
	switch (action.type) {
		case VALIDATE_OFFLINE_CUSTOMER_REQUEST:
			return {
				...state,
				validateOfflineCustomerResponse: null,
				isLoading: true,
				error: null
			};
		case VALIDATE_OFFLINE_CUSTOMER_REQUEST_SUCCESS:
			return {
				...state,		
					validateOfflineCustomerResponse: action.payload,
					isLoading: false,								
			};
		case VALIDATE_OFFLINE_CUSTOMER_REQUEST_FAILURE:
			return {
				...state,
				validateOfflineCustomerResponse: null,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};