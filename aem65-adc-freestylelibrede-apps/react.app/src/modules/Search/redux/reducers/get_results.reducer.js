import {
	GET_SEARCH_BAR_RESULT_REQUEST,
	GET_SEARCH_BAR_RESULT_REQUEST_FAILURE,
	GET_SEARCH_BAR_RESULT_REQUEST_SUCCESS,
	GET_SEARCH_RESULT_REQUEST,
	GET_SEARCH_RESULT_REQUEST_FAILURE,
	GET_SEARCH_RESULT_REQUEST_SUCCESS
} from '../actions/get_results.action';
import { stripHTML } from '../../../../utils/regexUtils';

const initialState = {
	searchBarLoading: false,
	searchBarResults: {
		query: '',
		result: []
	},
	faqSearchBarLoading: false,
	faqSearchBarResults: {
		query: '',
		result: []
	},
	loading: false,
	results: {
		query: '',
		result: []
	},
	error: null
};
export const GetResultsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SEARCH_BAR_RESULT_REQUEST:
			return action.payload.isFAQResults ? {
				...state,
				faqSearchBarLoading: true,
				query: stripHTML(action.payload.query)
			} : {
				...state,
				searchBarLoading: true,
				query: stripHTML(action.payload.query)
			};
		case GET_SEARCH_BAR_RESULT_REQUEST_SUCCESS:
			return action.isFAQResults ? {
				...state,
				faqSearchBarResults: {
					...state.results,
					query: stripHTML(state.query),
					result: action.data.response.results
				},
				faqSearchBarLoading: false
			} : {
				...state,
				searchBarResults: {
					...state.results,
					query: stripHTML(state.query),
					result: action.data.response.results
				},
				searchBarLoading: false
			};
		case GET_SEARCH_BAR_RESULT_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				searchBarLoading: false
			};
		case GET_SEARCH_RESULT_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_SEARCH_RESULT_REQUEST_SUCCESS:
			return {
				...state,
				results: {
					...state.results,
					query: stripHTML(action.query),
					result: action.payload.response.results,
				},
				loading: false
			};
		case GET_SEARCH_RESULT_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};