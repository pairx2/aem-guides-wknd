import {
	PLUS_SERVICE_CANCELLATION_REQUEST, PLUS_SERVICE_CANCELLATION_REQUEST_SUCCESS, PLUS_SERVICE_CANCELLATION_REQUEST_FAILURE
} from '../actions/plus_service_cancellation.action';

const initialState = {
	loading: false,
	plusServiceCancellationResponce: "",
	error: null,
	errorMessage: null,
	errorCode: null
};
export const PlusServiceCancellationReducer = (state = initialState, action) => {
	switch (action.type) {
        case PLUS_SERVICE_CANCELLATION_REQUEST:{
			return {
				...state,
			}
		}
		case PLUS_SERVICE_CANCELLATION_REQUEST_SUCCESS: {
			return {
				...state,
				loading: false,
				plusServiceCancellationResponce: "success",
				error: null,
				errorMessage: null
			};
		}
		case PLUS_SERVICE_CANCELLATION_REQUEST_FAILURE: {
			window?.grecaptcha?.enterprise.reset();
			return {
				...state,
				loading: false,
				plusServiceCancellationResponce: "fails" ,
				error: "plus_service_cancel_error_" + action.error?.errorCodes?.[0],
				errorMessage: action.error?.message,
				errorCode: action.error?.errorCodes?.[0] ? action.error?.errorCodes?.[0] : action.error.graphQLErrors[0].code
			};	
		}
		default:
			return state;
	}
};