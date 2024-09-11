import {
	GET_CUSTOMER_REQUEST,
	UPDATE_INSURANCE_REQUEST,
	GET_CUSTOMER_REQUEST_FAILURE,
	GET_CUSTOMER_REQUEST_SUCCESS,
	SET_MAXIMUM_ADDRESS_ERROR,
	UPDATE_CUSTOMER_REQUEST,
	UPDATE_EDITED_ADDRESS_ID,
	PAYER_UPDATE_REQUEST,
	PAYER_UPDATE_REQUEST_ACCEPTED,
	CUSTOMER_MOBILE_UPDATE_REQUEST
} from '../actions/customer.action';
import {SET_MEASURMENT_REQUEST, SET_MEASURMENT_REQUEST_SUCCESS, SET_MEASURMENT_REQUEST_FAILURE} from '../actions/set_measurment.action';
import {dashedToDotted} from '../../../../utils/dateUtils';

const initialState = {
	addressID: undefined,
	customer: {
		addresses: []
	},
	loading: false,
	error: null,
	errorMessage: null,
	errorInSettingMeasurment: null,
	maxAddressError: undefined,
	temporary_mobile_number: undefined,
	isPayerConfirmationAccepted: false,
	isMeasurementAvailable: false,
	isMobileChanged: false
};
export const GetCustomerReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_EDITED_ADDRESS_ID:
			return {
				...state,
				addressID: action.payload
			};
		case GET_CUSTOMER_REQUEST:
		case UPDATE_CUSTOMER_REQUEST:
		case UPDATE_INSURANCE_REQUEST:
			return {
				...state,
				loading: true,
				error: null
			};
		case GET_CUSTOMER_REQUEST_SUCCESS: {
			const customer = (action.payload.adcCustomerDetails || action.payload.adcCustomerUpdate).customer;
			return {
				...state,
				loading: false,
				customer: {
					...customer,
					dob: dashedToDotted(customer.dob),
					temporary_mobile_number: customer.temporary_mobile_number
				},
				isMeasurementAvailable: !!customer?.measurement,
				maxAddressError: undefined,
				addressID: undefined,
				error: null,
				errorMessage: null
			};
		}
		case CUSTOMER_MOBILE_UPDATE_REQUEST: {
			return {
				...state,
				isMobileChanged: action?.payload
			};
		}
		case GET_CUSTOMER_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error?.errorCodes?.[0],
				errorMessage: action.error?.error
			};
		case SET_MAXIMUM_ADDRESS_ERROR:
			return {
				...state,
				maxAddressError: true
			};
		case SET_MEASURMENT_REQUEST_SUCCESS:
			return {
				...state,
				errorInSettingMeasurment: null,
				isMeasurementAvailable:true
			};
		case SET_MEASURMENT_REQUEST:{
			const customer = state.customer;
			return {
				...state,
				errorInSettingMeasurment: null,
				isMeasurementAvailable: !!customer?.measurement
			};
		}
		case SET_MEASURMENT_REQUEST_FAILURE:{
			const customer = state.customer;
			return {
				...state,
				errorInSettingMeasurment: action.error?.errorCodes?.[0],
				isMeasurementAvailable: !!customer?.measurement
			};
		}
		case PAYER_UPDATE_REQUEST:
			return {
				...state,
				isPayerConfirmationAccepted: false
			};
		case PAYER_UPDATE_REQUEST_ACCEPTED:
			return {
				...state,
				isPayerConfirmationAccepted: true
			};
		default:
			return state;
	}
};