import {SET_DICTIONARY} from '../actions/translation.actions';
import {restoreReducerState, TRANSLATION_REDUCER} from '../../../../utils/cachingUtils';


const initialState = {
	dictionary: {},
	dictionaryFetched: false,
	...restoreReducerState(TRANSLATION_REDUCER)
};

export const translationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DICTIONARY:
			return {
				...state,
				dictionary: action.payload,
				dictionaryFetched: true

			};
		default:
			return state;
	}
};