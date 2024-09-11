import {
	FORGOT_PASSWORD_REQUEST_SUCCESS,
	LOG_IN_REQUEST,
	LOG_IN_REQUEST_FAILURE,
	LOG_IN_REQUEST_SUCCESS,
	SOCIAL_LOG_IN_REQUEST_FAILURE,
	SOCIAL_LOG_IN_REQUEST_SUCCESS,
	LOG_OUT_REQUEST_SUCCESS,
	RESET_PASSWORD_REQUEST_FAILURE,
	RESET_PASSWORD_REQUEST_SUCCESS,
	RESET_REGISTRATION_FAILURE,
	RESET_SERVER_SIDE_ERROR,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_REQUEST_FAILURE,
	LOG_OUT_REQUEST
} from '../actions/login.action';
import {
	CONFIRM_ACCOUNT_REQUEST_FAILURE,
	CONFIRM_ACCOUNT_REQUEST_SUCCESS,
	REGISTRATION_USER_REQUEST_FAILURE,
	REGISTRATION_USER_REQUEST_SUCCESS,
	CONFIRMATION_EMAIL_TRIGGER_REQUEST_FAILURE,
	CONFIRMATION_EMAIL_TRIGGER_REQUEST_SUCCESS,
	CONFIRMATION_EMAIL_TRIGGER_REQUEST
} from '../actions/registration.action';
import {i18nLabels} from '../../../../utils/translationUtils';

const initialState = {
	loading: false,
	user: {},
	loggedIn: false,
	isRegistered: false,
	error: null,
	errorCode: null,
	resetPasswordSuccess: false,
	confirmationStatus: null,
	isRecaptcha: null,
	emailTriggerSuccess:false,
	errorMsgAA: null,
	nlAndAccountConfirmSuccessCode: null
};

export const authenticationModuleReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_OUT_REQUEST:
		case LOG_IN_REQUEST:
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null
			};
		case SOCIAL_LOG_IN_REQUEST_SUCCESS:
		case LOG_IN_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				loggedIn: true,
				user: action.payload,
				error: null,
				errorCode: null
			};
		case LOG_OUT_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				loggedIn: false,
				user: action.payload
			};
		case REGISTRATION_USER_REQUEST_SUCCESS:
			return {
				...state,
				loading: true,
				error: action.error,
				isRegistered: true
			};
		case SOCIAL_LOG_IN_REQUEST_FAILURE:
		case LOG_IN_REQUEST_FAILURE:
			return {
				...state,
				loggedIn: false,
				error: action.error,
				errorCode: action.error?.errorCodes?.[0],
				errorMsgAA: action.errorMessage,
				isRecaptcha: action.error === i18nLabels.COGNITO_EXCEPTIONS.UserLambdaValidationException ? true : state.isRecaptcha
			};
		case REGISTRATION_USER_REQUEST_FAILURE:
		case FORGOT_PASSWORD_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
				errorCode: action.error?.errorCodes?.[0]
			};
		case FORGOT_PASSWORD_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				forgotPasswordSuccess: action.payload
			};
		case RESET_PASSWORD_REQUEST_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: true,
				error: null,
				errorCode: null
			};
		case RESET_PASSWORD_REQUEST_FAILURE:
			return {
				...state,
				error: action.payload,
				errorCode: action.payload.errorCodes[0],
				resetPasswordSuccess: false
			};
		case RESET_SERVER_SIDE_ERROR:
			return {
				...state,
				error: null
			};
		case RESET_REGISTRATION_FAILURE:
			return {
				...state,
				error: undefined
			};
		case CONFIRM_ACCOUNT_REQUEST_SUCCESS:
			const customer = action.payload.adcCustomerConfirm.customer;
			const tech_training_required = action.payload.adcCustomerConfirm.tech_training_required;
			const magentoSuccessCode = action.payload.adcCustomerConfirm.success.code;
			return {
				...state,
				confirmationStatus: true,
				customer: customer,
				tech_training_required: tech_training_required,
				magentoSuccessCode: magentoSuccessCode
			};
		case CONFIRM_ACCOUNT_REQUEST_FAILURE:
			return {
				...state,
				confirmationStatus: false,
				tech_training_required: false
			};
		case CONFIRMATION_EMAIL_TRIGGER_REQUEST:
			return {
				...state,
				emailTriggerSuccess:false,
				error: null,
				errorCode: null
			};
		case CONFIRMATION_EMAIL_TRIGGER_REQUEST_FAILURE:
			return {
				...state,
				emailTriggerSuccess:false,
				error: action.payload,
				errorCode: action.payload.errorCodes[0]
			};
		case CONFIRMATION_EMAIL_TRIGGER_REQUEST_SUCCESS:
			return {
				...state,
				emailTriggerSuccess: true,
				error: null,
				errorCode: null
			};	
		default:
			return state;
	}
};
