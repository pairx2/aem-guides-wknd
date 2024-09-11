export const GET_SEARCH_BAR_RESULT_REQUEST = 'GET_SEARCH_BAR_RESULT_REQUEST';
export const GET_SEARCH_BAR_RESULT_REQUEST_SUCCESS = 'GET_SEARCH_BAR_RESULT_REQUEST_SUCCESS';
export const GET_SEARCH_BAR_RESULT_REQUEST_FAILURE = 'GET_SEARCH_BAR_RESULT_REQUEST_FAILURE';

export const GET_SEARCH_RESULT_REQUEST = 'GET_SEARCH_RESULT_REQUEST';
export const GET_SEARCH_RESULT_REQUEST_SUCCESS = 'GET_SEARCH_RESULT_REQUEST_SUCCESS';
export const GET_SEARCH_RESULT_REQUEST_FAILURE = 'GET_SEARCH_RESULT_REQUEST_FAILURE';

export const getSearchBarResultRequest = payload => ({
	type: GET_SEARCH_BAR_RESULT_REQUEST, payload
});

export const getSearchBarResultRequestSuccess = (data, isFAQResults) => ({
	type: GET_SEARCH_BAR_RESULT_REQUEST_SUCCESS, data, isFAQResults
});

export const getSearchBarResultRequestFailure = error => ({
	type: GET_SEARCH_BAR_RESULT_REQUEST_FAILURE, error
});

export const getSearchResultRequest = payload => ({
	type: GET_SEARCH_RESULT_REQUEST, payload
});

export const getSearchResultRequestSuccess = (payload, query) => ({
	type: GET_SEARCH_RESULT_REQUEST_SUCCESS, payload, query
});

export const getSearchResultRequestFailure = error => ({
	type: GET_SEARCH_RESULT_REQUEST_FAILURE, error
});