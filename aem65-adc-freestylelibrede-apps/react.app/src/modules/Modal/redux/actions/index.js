export const OPEN_MODAL_ACTION = 'OPEN_MODAL_ACTION';
export const CLOSE_MODAL_ACTION = 'CLOSE_MODAL_ACTION';

export const openModalAction = payload => ({
	type: OPEN_MODAL_ACTION, payload
});

export const closeModalAction = () => ({
	type: CLOSE_MODAL_ACTION
});
