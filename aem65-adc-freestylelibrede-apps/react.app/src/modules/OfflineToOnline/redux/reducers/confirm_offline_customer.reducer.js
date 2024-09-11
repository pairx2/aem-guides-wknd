import {
	CONFIRM_OFFLINE_CUSTOMER_REQUEST, 
	CONFIRM_OFFLINE_CUSTOMER_REQUEST_SUCCESS, 
	CONFIRM_OFFLINE_CUSTOMER_REQUEST_FAILURE 
} from "../actions/confirm_offline_customer.action";

const initialState = {
	confirmOfflineCustomerResponse: null,
	isLoading: false,
	error: null
};
export const confirmOfflineCustomerReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONFIRM_OFFLINE_CUSTOMER_REQUEST:
			return {
				...state,
				confirmOfflineCustomerResponse: null,
				isLoading: true,
				error: null
			};
		case CONFIRM_OFFLINE_CUSTOMER_REQUEST_SUCCESS:
			return {
				...state,		
                confirmOfflineCustomerResponse: action.payload,
					isLoading: false,								
			};
		case CONFIRM_OFFLINE_CUSTOMER_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};