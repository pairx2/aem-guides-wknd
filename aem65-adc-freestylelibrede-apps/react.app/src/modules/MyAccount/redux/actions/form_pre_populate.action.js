export const PRE_POPULATE_FORM = 'PRE_POPULATE_FORM';
export const HIDE_EDIT_FORM = 'HIDE_EDIT_FORM';
export const CLEAR_FORM = 'CLEAR_FORM';

export const hideEditForm = () => ({
	type: HIDE_EDIT_FORM
});
export const prePopulateForm = payload => ({
	type: PRE_POPULATE_FORM, payload
});
export const clearForm = () => ({
	type: CLEAR_FORM
});
