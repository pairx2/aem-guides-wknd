import {
	UPLOAD_CEC_FILE_REQUEST,
	UPLOAD_CEC_FILE_REQUEST_FAILURE,
	UPLOAD_CEC_FILE_REQUEST_SUCCESS,
	UPLOAD_CEC_FILE_PROGRESS_UPDATE
} from '../actions/upload_cec_file.action';

const initialState = {
	uploadPercentage: 0,
	loading: false,
	data: null,
	error: null
};

export const UploadCecFileReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_CEC_FILE_REQUEST:
			return {
				...state,
				error: null,
				loading: true,
			};
		case UPLOAD_CEC_FILE_REQUEST_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				data: action.payload.data,
				uploadPercentage: 100
			};
		case UPLOAD_CEC_FILE_REQUEST_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case UPLOAD_CEC_FILE_PROGRESS_UPDATE:
			return {
				...state,
				uploadPercentage: action.percentage > 1 ? action.percentage - 1 : 0
			};
		default:
			return state;
	}
};