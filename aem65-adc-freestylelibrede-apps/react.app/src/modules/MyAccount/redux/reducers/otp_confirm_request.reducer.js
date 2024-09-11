import {
	OTP_RESEND_REQUEST,
	OTP_RESEND_REQUEST_SUCCESS,
	OTP_RESEND_REQUEST_FAILURE,
	OTP_CONFIRM_REQUEST,
	OTP_CONFIRM_REQUEST_SUCCESS,
	OTP_CONFIRM_REQUEST_FAILURE
} from '../actions/otp_confirm_request.action';

const initialState = {
	otpText:'',
	isLoading: false,
	errorCode:null,
	isMobileVerified: false,
	confirmMobileStatus: null,
	verifiedMessage: null,
	isRequestSent: false,
	isResendRequest: false
};
export const OtpConfirmRequestReducer = (state = initialState, action) => {
	switch (action.type) {
		case OTP_RESEND_REQUEST:
			return {
				...state,
				isLoading: true,
				isResendRequest: true,
				isRequestSent: false,
				errorCode: null
			};
		case OTP_RESEND_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				isRequestSent: true,
				errorCode: null
			};
		case OTP_RESEND_REQUEST_FAILURE:
			return {
				...state,
				errorCode: action.error?.errorCodes?.[0],
				isRequestSent: false
			};
		case OTP_CONFIRM_REQUEST:
			return {
				...state,
				isMobileVerified:false,
				errorCode: null
			};
		case OTP_CONFIRM_REQUEST_SUCCESS:
			return {
				...state,
				isMobileVerified: true,
				errorCode: null
			};
		case OTP_CONFIRM_REQUEST_FAILURE:
			return {
				...state,
				errorCode: action.error?.errorCodes?.[0],
				isMobileVerified: false
			};
		default:
			return state;
	}
};