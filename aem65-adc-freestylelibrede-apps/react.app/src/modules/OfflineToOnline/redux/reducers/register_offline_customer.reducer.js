import {
	REGISTER_OFFLINE_CUSTOMER_REQUEST, 
	REGISTER_OFFLINE_CUSTOMER_REQUEST_FAILURE, 
	REGISTER_OFFLINE_CUSTOMER_REQUEST_SUCCESS 
} from "../actions/register_offline_customer.action";

const initialState = {
	registerOfflineCustomerResponse: null,
	isLoading: false,
	error: null
};
export const registerOfflineCustomerReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_OFFLINE_CUSTOMER_REQUEST:
			return {
				...state,
				registerOfflineCustomerResponse: null,
				isLoading: true,
				error: null
			};
		case REGISTER_OFFLINE_CUSTOMER_REQUEST_SUCCESS:
			return {
				...state,		
                registerOfflineCustomerResponse: action.payload,
					isLoading: false,								
			};
		case REGISTER_OFFLINE_CUSTOMER_REQUEST_FAILURE:
			return {
				...state,
				registerOfflineCustomerResponse: null,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};