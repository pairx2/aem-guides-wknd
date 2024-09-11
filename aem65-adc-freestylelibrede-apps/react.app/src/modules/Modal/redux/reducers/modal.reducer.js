import {CLOSE_MODAL_ACTION, OPEN_MODAL_ACTION} from '../actions';

const initialState = {
	modalOpen: false,
	modalHeading: null,
	modalContentID: null,
	modalClassName: null,
	modalProps: {},
	canModalClose: null,
	showModalCloseIcon:false
};

export const ModalReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MODAL_ACTION:
			return {
				...state,
				modalOpen: true,
				modalHeading: action.payload.heading,
				modalSize: action.payload.size,
				modalContentID: action.payload.contentID,
				modalProps: action.payload.props,
				modalClassName: action.payload.className,
				canModalClose: action.payload.canModalClose,
				showModalCloseIcon: action.payload.showModalCloseIcon
			};
		case CLOSE_MODAL_ACTION:
			return initialState;
		default:
			return state;
	}
};