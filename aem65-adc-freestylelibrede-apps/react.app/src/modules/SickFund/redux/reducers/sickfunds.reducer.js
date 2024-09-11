import {GET_SICKFUNDS_REQUEST, GET_SICKFUNDS_REQUEST_SUCCESS, GET_SICKFUNDS_REQUEST_FAILURE} from '../actions/get_sickfunds.action';

const initialState = {
	loading: false,
	sickfunds: [],
	error: null
};

export const SickfundReducer = (state = initialState, action) => {
	let result = {};
	switch (action.type) {
		case GET_SICKFUNDS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_SICKFUNDS_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				sickfunds: action.payload.payerList
			};
		case GET_SICKFUNDS_REQUEST_FAILURE:
			result = {
				...state,
				loading: false,
				error: action.error
			};
			return result;
		default:
			return state;
	}
};