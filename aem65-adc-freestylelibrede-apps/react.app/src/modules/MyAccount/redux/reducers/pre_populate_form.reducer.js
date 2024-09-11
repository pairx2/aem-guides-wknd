import {CLEAR_FORM, HIDE_EDIT_FORM, PRE_POPULATE_FORM} from '../actions/form_pre_populate.action';

const initialState = {
	showEditForm: false,
	showNewForm: false,
	formData: {
		country_id: 'DE'
	}
};
export const PrePoulateFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case HIDE_EDIT_FORM:
			return {
				...state,
				showEditForm: false,
				showNewForm: false,
				formData: undefined,
			};
		case PRE_POPULATE_FORM:
			return {
				...state,
				formData: {...initialState.formData, ...action.payload},
				showEditForm: true
			};
		case CLEAR_FORM:
			return {
				...state,
				formData: undefined,
				showNewForm: true
			};
		default:
			return state;
	}
};