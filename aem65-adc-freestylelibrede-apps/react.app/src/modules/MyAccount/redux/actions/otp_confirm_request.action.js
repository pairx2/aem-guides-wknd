export const OTP_RESEND_REQUEST = 'OTP_REQUEST';
export const OTP_RESEND_REQUEST_SUCCESS = 'OTP_REQUEST_SUCCESS';
export const OTP_RESEND_REQUEST_FAILURE = 'OTP_REQUEST_FAILURE';
export const OTP_CONFIRM_REQUEST = 'OTP_CONFIRM_REQUEST';
export const OTP_CONFIRM_REQUEST_SUCCESS = 'OTP_CONFIRM_REQUEST_SUCCESS';
export const OTP_CONFIRM_REQUEST_FAILURE = 'OTP_CONFIRM_REQUEST_FAILURE';

export const otpResendRequest = () => ({
	type: OTP_RESEND_REQUEST
});
export const otpResendRequestSuccess = payload => ({
	type: OTP_RESEND_REQUEST_SUCCESS, payload
});
export const otpResendRequestFailure = error => ({
	type: OTP_RESEND_REQUEST_FAILURE, error
});
export const otpConfirmRequest = payload => ({
	type: OTP_CONFIRM_REQUEST, payload
});
export const otpConfirmRequestSuccess = payload => ({
	type: OTP_CONFIRM_REQUEST_SUCCESS, payload
});
export const otpConfirmRequestFailure = error => ({
	type: OTP_CONFIRM_REQUEST_FAILURE, error
});