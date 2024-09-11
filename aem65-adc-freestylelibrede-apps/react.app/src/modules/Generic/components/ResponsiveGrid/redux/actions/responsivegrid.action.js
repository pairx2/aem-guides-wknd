export const GET_EDIT_CONTEXT_REQUEST = 'GET_EDIT_CONTEXT_REQUEST';
export const GET_EDIT_CONTEXT_REQUEST_SUCCESS = 'GET_EDIT_CONTEXT_REQUEST_SUCCESS';
export const GET_EDIT_CONTEXT_REQUEST_FAILURE = 'GET_EDIT_CONTEXT_REQUEST_FAILURE';

export const GET_COMPONENT_HTML = 'GET_EDIT_CONTEXT_REQUEST';
export const GET_COMPONENT_HTML_SUCCESS = 'GET_COMPONENT_HTML_SUCCESS';
export const GET_COMPONENT_HTML_FAILURE = 'GET_COMPONENT_HTML_FAILURE';

export const getEditContextRequest = payload => ({
	type: GET_EDIT_CONTEXT_REQUEST, payload
});

export const getEditContextRequestSuccess = payload => ({
	type: GET_EDIT_CONTEXT_REQUEST_SUCCESS, payload
});

export const getEditContextRequestFailure = payload => ({
	type: GET_EDIT_CONTEXT_REQUEST_FAILURE, payload
});

export const getComponentHTMLRequest = payload => ({
	type: GET_COMPONENT_HTML, payload
});

export const getComponentHTMLRequestSuccess = payload => ({
	type: GET_COMPONENT_HTML_SUCCESS, payload
});

export const getComponentHTMLRequestFailure = payload => ({
	type: GET_COMPONENT_HTML_FAILURE, payload
});