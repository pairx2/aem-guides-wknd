export const REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST';
export const REGISTRATION_USER_REQUEST_SUCCESS = 'REGISTRATION_USER_REQUEST_SUCCESS';
export const REGISTRATION_USER_REQUEST_FAILURE = 'REGISTRATION_USER_REQUEST_FAILURE';
export const E_APPLY_REQUEST = 'E_APPLY_REQUEST';
export const E_APPLY_REQUEST_SUCCESS = 'E_APPLY_REQUEST_SUCCESS';
export const E_APPLY_REQUEST_FAILURE = 'E_APPLY_REQUEST_FAILURE';
export const CONFIRM_ACCOUNT_REQUEST = 'CONFIRM_ACCOUNT_REQUEST';
export const CONFIRM_ACCOUNT_REQUEST_SUCCESS = 'CONFIRM_ACCOUNT_REQUEST_SUCCESS';
export const CONFIRM_ACCOUNT_REQUEST_FAILURE = 'CONFIRM_ACCOUNT_REQUEST_FAILURE';
export const CONFIRMATION_EMAIL_TRIGGER_REQUEST = 'CONFIRMATION_EMAIL_TRIGGER_REQUEST';
export const CONFIRMATION_EMAIL_TRIGGER_REQUEST_SUCCESS = 'CONFIRMATION_EMAIL_TRIGGER_REQUEST_SUCCESS';
export const CONFIRMATION_EMAIL_TRIGGER_REQUEST_FAILURE = 'CONFIRMATION_EMAIL_TRIGGER_REQUEST_FAILURE';

export const registrationUserRequest = (payload, redirectLink, isCheckout) => ({
	type: REGISTRATION_USER_REQUEST, payload, redirectLink, isCheckout
});

export const registrationUserRequestSuccess = payload => ({
	type: REGISTRATION_USER_REQUEST_SUCCESS, payload
});

export const registrationUserRequestFailure = error => ({
	type: REGISTRATION_USER_REQUEST_FAILURE, error
});

export const eApplyRequest = (payload, redirectLink) => ({
	type: E_APPLY_REQUEST, payload, redirectLink
});

export const eApplyRequestSuccess = payload => ({
	type: E_APPLY_REQUEST_SUCCESS, payload
});

export const eApplyRequestFailure = payload => ({
	type: E_APPLY_REQUEST_FAILURE, payload
});

export const confirmAccountRequest = payload => ({
	type: CONFIRM_ACCOUNT_REQUEST, payload
});

export const confirmAccountRequestSuccess = payload => ({
	type: CONFIRM_ACCOUNT_REQUEST_SUCCESS, payload
});

export const confirmAccountRequestFailure = payload => ({
	type: CONFIRM_ACCOUNT_REQUEST_FAILURE, payload
});

export const confirmationEmailTriggerRequest = email => ({
	type: CONFIRMATION_EMAIL_TRIGGER_REQUEST, email
});

export const confirmationEmailTriggerRequestSuccess = payload => ({
	type: CONFIRMATION_EMAIL_TRIGGER_REQUEST_SUCCESS, payload
});

export const confirmationEmailTriggerRequestFailure = payload => ({
	type: CONFIRMATION_EMAIL_TRIGGER_REQUEST_FAILURE, payload
});
