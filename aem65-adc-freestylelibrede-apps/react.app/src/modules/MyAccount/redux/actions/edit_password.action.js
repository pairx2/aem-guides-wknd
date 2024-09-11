export const EDIT_PASSWORD_REQUEST = 'EDIT_PASSWORD_REQUEST';
export const EDIT_PASSWORD_REQUEST_SUCCESS = 'EDIT_PASSWORD_REQUEST_SUCCESS';
export const EDIT_PASSWORD_REQUEST_FAILURE = 'EDIT_PASSWORD_REQUEST_FAILURE';
export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_REQUEST_SUCCESS = 'UPDATE_EMAIL_REQUEST_SUCCESS';
export const UPDATE_EMAIL_REQUEST_FAILURE = 'UPDATE_EMAIL_REQUEST_FAILURE';
export const CONFIRM_EMAIL_CHANGE_REQUEST = 'CONFIRM_EMAIL_CHANGE_REQUEST';
export const CONFIRM_EMAIL_CHANGE_REQUEST_SUCCESS = 'CONFIRM_EMAIL_CHANGE_REQUEST_SUCCESS';
export const CONFIRM_EMAIL_CHANGE_REQUEST_FAILURE = 'CONFIRM_EMAIL_CHANGE_REQUEST_FAILURE';

export const editPasswordRequest = payload => ({
	type: EDIT_PASSWORD_REQUEST, payload
});
export const editPasswordRequestSuccess = payload => ({
	type: EDIT_PASSWORD_REQUEST_SUCCESS, payload
});
export const editPasswordRequestFailure = error => ({
	type: EDIT_PASSWORD_REQUEST_FAILURE, error
});
export const updateEmailRequest = payload => ({
	type: UPDATE_EMAIL_REQUEST, payload
});
export const updateEmailRequestSuccess = payload => ({
	type: UPDATE_EMAIL_REQUEST_SUCCESS, payload
});
export const updateEmailRequestFailure = error => ({
	type: UPDATE_EMAIL_REQUEST_FAILURE, error
});
export const confirmEmailChangeRequest = payload => ({
	type: CONFIRM_EMAIL_CHANGE_REQUEST, payload
});
export const confirmEmailChangeRequestSuccess = payload => ({
	type: CONFIRM_EMAIL_CHANGE_REQUEST_SUCCESS, payload
});
export const confirmEmailChangeRequestFailure = payload => ({
	type: CONFIRM_EMAIL_CHANGE_REQUEST_FAILURE, payload
});
