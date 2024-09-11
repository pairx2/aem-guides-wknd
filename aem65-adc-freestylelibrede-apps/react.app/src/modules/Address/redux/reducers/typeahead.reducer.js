import {
	UPDATE_SESSION_ID,
	SUGGEST_CITY_REQUEST,
	SUGGEST_CITY_REQUEST_SUCCESS,
	SUGGEST_CITY_REQUEST_FAILURE,
	SUGGEST_ZIPCODE_REQUEST,
	SUGGEST_ZIPCODE_REQUEST_SUCCESS,
	SUGGEST_ZIPCODE_REQUEST_FAILURE,
	SUGGEST_STREET_REQUEST,
	SUGGEST_STREET_REQUEST_SUCCESS,
	SUGGEST_STREET_REQUEST_FAILURE
} from '../actions/typeahead_address.action';
import {empty} from '../../../../utils/default';


const initialState = {
	loading: false,
	sessionID: {
		creationDate: null
	},
	zipcodes: {
		suggestions: empty.array
	},
	cities: {
		suggestions: empty.array
	},
	streets: {
		suggestions: empty.array
	},
	error: null
};

export const TypeaheadReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SESSION_ID:
			return {
				...state,
				sessionID: {
					id: action.payload.sessionID,
					creationDate: new Date().getTime()
				}
			};
		case SUGGEST_CITY_REQUEST:
		case SUGGEST_ZIPCODE_REQUEST:
		case SUGGEST_STREET_REQUEST:
			return {
				...state,
				loading: true
			};
		case SUGGEST_ZIPCODE_REQUEST_SUCCESS:
			return {
				...state,
				zipcodes: {
					prefix: action.payload.prefix,
					suggestions: action.payload.suggestions
				},
				loading: false
			};
		case SUGGEST_CITY_REQUEST_SUCCESS:
			return {
				...state,
				cities: {
					prefix: action.payload.prefix,
					suggestions: action.payload.suggestions
				},
				loading: false
			};
		case SUGGEST_STREET_REQUEST_SUCCESS:
			return {
				...state,
				streets: {
					prefix: action.payload.prefix,
					suggestions: action.payload.suggestions
				},
				loading: false
			};
		case SUGGEST_CITY_REQUEST_FAILURE:
		case SUGGEST_ZIPCODE_REQUEST_FAILURE:
		case SUGGEST_STREET_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false
			};

		default:
			return state;
	}
};