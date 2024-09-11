export const UPLOAD_CEC_FILE_REQUEST = 'UPLOAD_CEC_FILE_REQUEST';
export const UPLOAD_CEC_FILE_REQUEST_SUCCESS = 'UPLOAD_CEC_FILE_REQUEST_SUCCESS';
export const UPLOAD_CEC_FILE_REQUEST_FAILURE = 'UPLOAD_CEC_FILE_REQUEST_FAILURE';
export const UPLOAD_CEC_FILE_PROGRESS_UPDATE = 'UPLOAD_CEC_FILE_PROGRESS_UPDATE';

export const uploadCecFileRequest = payload => ({
	type: UPLOAD_CEC_FILE_REQUEST, payload
});

export const uploadCecFileRequestSuccess = payload => ({
	type: UPLOAD_CEC_FILE_REQUEST_SUCCESS, payload
});

export const uploadCecFileRequestFailure = error => ({
	type: UPLOAD_CEC_FILE_REQUEST_FAILURE, error
});

export const uploadCecFileProgressUpdate = percentage => ({
	type: UPLOAD_CEC_FILE_PROGRESS_UPDATE, percentage
});
