import {
	GET_COMPONENT_HTML_FAILURE,
	GET_COMPONENT_HTML_SUCCESS,
	GET_EDIT_CONTEXT_REQUEST_FAILURE,
	GET_EDIT_CONTEXT_REQUEST_SUCCESS
} from '../actions/responsivegrid.action';

const initialState = {
	editContext: {},
	html: {},
	error: null
};

export const responsiveGridReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EDIT_CONTEXT_REQUEST_SUCCESS:
			return {
				...state,
				editContext: {
					...state.editContext,
					[action.payload.path]: action.payload.editContext
				}
			};
		case GET_EDIT_CONTEXT_REQUEST_FAILURE:
		case GET_COMPONENT_HTML_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case GET_COMPONENT_HTML_SUCCESS:
			return {
				...state,
				html: {
					...state.html,
					[action.payload.path]: action.payload.html
				}
			};
		default:
			return state;
	}
};