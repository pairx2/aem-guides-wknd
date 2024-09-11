import {FRAUD_DOMAIN_REQUEST_FAILURE, SET_FRAUD_DOMAIN} from '../actions/form.actions';
import {restoreReducerState, FORM_REDUCER} from '../../../../utils/cachingUtils';


const initialState = {
	fraudDomain: {},
	fraudDomainFetched: false,
	...restoreReducerState(FORM_REDUCER)
};

export const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FRAUD_DOMAIN:
			return {
				...state,
				fraudDomain : action.payload,
				fraudDomainFetched: true

			};
		case FRAUD_DOMAIN_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
			}
		default:
			return state;
	}
};