import {
	EDIT_PASSWORD_REQUEST,
	EDIT_PASSWORD_REQUEST_FAILURE,
	EDIT_PASSWORD_REQUEST_SUCCESS
} from '../actions/edit_password.action';

const initialState = {
	isLoading: false,
	error: null,
	isPasswordUpdated: false
};
export const PasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case EDIT_PASSWORD_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				isPasswordUpdated: true
			};
		case EDIT_PASSWORD_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};