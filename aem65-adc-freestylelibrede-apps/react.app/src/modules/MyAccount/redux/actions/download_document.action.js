export const DOWNLOAD_DOCUMENT_REQUEST = 'DOWNLOAD_DOCUMENT_REQUEST';
export const DOWNLOAD_DOCUMENT_REQUEST_SUCCESS = 'DOWNLOAD_DOCUMENT_REQUEST_SUCCESS';
export const DOWNLOAD_DOCUMENT_REQUEST_FAILURE = 'DOWNLOAD_DOCUMENT_REQUEST_FAILURE';

export const downloadDocumentRequest = payload => ({
	type: DOWNLOAD_DOCUMENT_REQUEST, payload
});
export const downloadDocumentRequestSuccess = payload => ({
	type: DOWNLOAD_DOCUMENT_REQUEST_SUCCESS, payload
});
export const downloadDocumentRequestFailure = error => ({
	type: DOWNLOAD_DOCUMENT_REQUEST_FAILURE, error
});