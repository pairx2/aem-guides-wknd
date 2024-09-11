import {
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_REQUEST_SUCCESS,
	UPDATE_EMAIL_REQUEST_FAILURE,
	CONFIRM_EMAIL_CHANGE_REQUEST_SUCCESS,
	CONFIRM_EMAIL_CHANGE_REQUEST_FAILURE
} from '../actions/edit_password.action';

const initialState = {
	isLoading: false,
	error: null,
	emailUpdated: null,
	confirmEmailStatus: null,
};
export const EmailUpdateReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_EMAIL_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case UPDATE_EMAIL_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				emailUpdated: true
			};
		case UPDATE_EMAIL_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error,
				emailUpdated: false
			};
		case CONFIRM_EMAIL_CHANGE_REQUEST_SUCCESS:
			return {
				...state,
				confirmEmailStatus: true
			};
		case CONFIRM_EMAIL_CHANGE_REQUEST_FAILURE:
			return {
				...state,
				confirmEmailStatus: false
			};
		default:
			return state;
	}
};