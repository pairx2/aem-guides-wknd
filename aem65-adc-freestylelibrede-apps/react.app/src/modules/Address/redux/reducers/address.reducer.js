import {
	ACCEPT_ADDRESS_REQUEST,
	VERIFY_ADDRESS_REQUEST,
	VERIFY_ADDRESS_REQUEST_FAILURE,
	VERIFY_ADDRESS_REQUEST_SUCCESS
} from '../actions/verify_address.actions';
import {
	UPDATE_ADDRESS_REQUEST,
	UPDATE_ADDRESS_REQUEST_FAILURE,
	UPDATE_ADDRESS_REQUEST_SUCCESS
} from '../actions/update_address.action';
import {
	CREATE_ADDRESS_REQUEST,
	CREATE_ADDRESS_REQUEST_FAILURE,
	CREATE_ADDRESS_REQUEST_SUCCESS
} from '../actions/create_address.action';
import { empty } from '../../../../utils/default';
import {
	DELETE_ADDRESS_REQUEST,
	DELETE_ADDRESS_REQUEST_FAILURE,
	DELETE_ADDRESS_REQUEST_SUCCESS
} from '../actions/delete_address.action';
import { CLEAR_ADDRESS_ERRORS } from '../actions/address.action';

const initialState = {
	isLoading: false,
	addresses: {
		registration: {
			verificationStatus: null,
			address: empty.object,
			rssResultCode: null,
			isVerified: null,
			isBlacklisted: null
		},
		account: {
			verificationStatus: null,
			address: empty.object,
			rssResultCode: null,
			isVerified: null,
			isBlacklisted: null
		},
		plus_service: {
			verificationStatus: null,
			address: empty.object,
			rssResultCode: null,
			isVerified: null,
			isBlacklisted: null
		}
	},
	error: null,
	methods: empty.array,
	isAllowSave: null,
	webShopMessage: null,
	errorAddressChange: null,
	errorAddressDelete: null
};

export const AddressReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_ADDRESS_REQUEST:
			return {
				...state,
				isLoading: true,
				errorAddressDelete: null
			};
		case CREATE_ADDRESS_REQUEST:
		case UPDATE_ADDRESS_REQUEST:
			return {
				...state,
				isLoading: true,
				errorAddressChange: null
			};
		case CREATE_ADDRESS_REQUEST_SUCCESS:
		case UPDATE_ADDRESS_REQUEST_SUCCESS:
		case DELETE_ADDRESS_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false
			};
		case DELETE_ADDRESS_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				errorAddressDelete: action.payload.errorCodes[0]
			};
		case CREATE_ADDRESS_REQUEST_FAILURE:
		case UPDATE_ADDRESS_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				errorAddressChange: action.payload.errorCodes[0]
			};
		case VERIFY_ADDRESS_REQUEST:
			return {
				...state,
				isLoading: true,
				addresses: {
					[action.payload.section]: {
						verificationStatus: null,
						address: action.payload.address,
						rssResultCode: null,
						isVerified: null,
						isBlacklisted: null
					}
				},
				methods: empty.array,
				isAllowSave: null,
				webShopMessage: null
			};
		case VERIFY_ADDRESS_REQUEST_SUCCESS:
		case ACCEPT_ADDRESS_REQUEST:
			return {
				...state,
				isLoading: false,
				addresses: {
					[action.payload.section]: {
						address: action.payload.address,
						verificationStatus: action.payload.status,
						rssResultCode: action.payload.rssResultCode,
						isBlacklisted: action.payload.isBlacklisted,
						isVerified: action.payload.isVerified
					}
				},
				methods: action.payload.addressAllowPM,
				isAllowSave: action.payload.allowSave
			};
		case VERIFY_ADDRESS_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				addresses: {
					[action.payload.section]: {
						address: action.payload.address,
						verificationStatus: action.payload.status
					}
				},
				error: action.payload.rssResultCode,
				webShopMessage: action.payload.message,
				isAllowSave: action.payload.allowSave
			};
		case CLEAR_ADDRESS_ERRORS:
			return {
				...state,
				error: empty.object
			};
		default:
			return state;
	}
};