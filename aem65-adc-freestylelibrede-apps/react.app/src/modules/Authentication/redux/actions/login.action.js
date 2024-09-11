export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_REQUEST_SUCCESS = 'LOG_IN_REQUEST_SUCCESS';
export const LOG_IN_REQUEST_FAILURE = 'LOG_IN_REQUEST_FAILURE';

export const SOCIAL_LOG_IN_REQUEST = 'SOCIAL_LOG_IN_REQUEST';
export const SOCIAL_LOG_IN_REQUEST_SUCCESS = 'SOCIAL_LOG_IN_REQUEST_SUCCESS';
export const SOCIAL_LOG_IN_REQUEST_FAILURE = 'SOCIAL_LOG_IN_REQUEST_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_REQUEST_SUCCESS = 'LOG_OUT_REQUEST_SUCCESS';
export const LOG_OUT_REQUEST_FAILURE = 'LOG_OUT_REQUEST_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILURE = 'FORGOT_PASSWORD_REQUEST_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILURE = 'RESET_PASSWORD_REQUEST_FAILURE';
export const RESET_REGISTRATION_FAILURE = 'RESET_REGISTRATION_FAILURE';

export const RESET_SERVER_SIDE_ERROR = 'RESET_SERVIER_SIDE_ERROR';

export const logInRequest = (payload, loginSuccessLink, retry) => ({
	type: LOG_IN_REQUEST, payload, loginSuccessLink, retry
});

export const logInRequestSuccess = payload => ({
	type: LOG_IN_REQUEST_SUCCESS, payload
});

export const logInRequestFailure = (error ,errorMessage) => ({
	type: LOG_IN_REQUEST_FAILURE, error, errorMessage
});

export const socialLogInRequest = payload => ({
	type: SOCIAL_LOG_IN_REQUEST, payload
});

export const socialLogInRequestSuccess = payload => ({
	type: SOCIAL_LOG_IN_REQUEST_SUCCESS, payload
});

export const socialLogInRequestFailure = error => ({
	type: SOCIAL_LOG_IN_REQUEST_FAILURE, error
});

export const logOutRequest = (payload, isGlobalSignout = true) => ({
	type: LOG_OUT_REQUEST, payload, isGlobalSignout
});

export const logOutRequestSuccess = payload => ({
	type: LOG_OUT_REQUEST_SUCCESS, payload
});

export const logOutRequestFailure = (payload, isGlobalSignout = false)=> ({
	type: LOG_OUT_REQUEST_FAILURE, payload, isGlobalSignout
});

export const forgotPasswordRequest = payload => ({
	type: FORGOT_PASSWORD_REQUEST,
	payload
});

export const forgotPasswordRequestSuccess = payload => ({
	type: FORGOT_PASSWORD_REQUEST_SUCCESS, payload
});

export const forgotPasswordRequestFailure = error => ({
	type: FORGOT_PASSWORD_REQUEST_FAILURE, error
});

export const resetPasswordRequest = (payload) => ({
	type: RESET_PASSWORD_REQUEST,
	payload
});

export const resetPasswordRequestSuccess = () => ({
	type: RESET_PASSWORD_REQUEST_SUCCESS
});

export const resetPasswordRequestFailure = payload => ({
	type: RESET_PASSWORD_REQUEST_FAILURE, payload
});

export const resetServerSideError = () => ({
	type: RESET_SERVER_SIDE_ERROR
});

export const resetRegistrationError = payload => ({
	type: RESET_REGISTRATION_FAILURE, payload
});