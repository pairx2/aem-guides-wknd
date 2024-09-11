export const OPEN_RETURN_FORM_REQUEST = 'OPEN_RETURN_FORM_REQUEST';
export const CLOSE_RETURN_FORM_REQUEST = 'CLOSE_RETURN_FORM_REQUEST';
export const OPEN_CURRENT_ORDER_RETURN_FORM_REQUEST = 'OPEN_CURRENT_ORDER_RETURN_FORM_REQUEST';
export const CLOSE_CURRENT_ORDER_RETURN_FORM_REQUEST = 'CLOSE_CURRENT_ORDER_RETURN_FORM_REQUEST';
export const OPEN_PAYMENT_EDIT_FORM_REQUEST = 'OPEN_PAYMENT_EDIT_FORM_REQUEST';
export const CLOSE_PAYMENT_EDIT_FORM_REQUEST = 'CLOSE_PAYMENT_EDIT_FORM_REQUEST';
export const OPEN_REACTIVATION_FORM_REQUEST = 'OPEN_REACTIVATION_FORM_REQUEST';
export const CLOSE_REACTIVATION_FORM_REQUEST = 'CLOSE_REACTIVATION_FORM_REQUEST';

export const GET_ORDER_RETURN_REQUEST = 'GET_ORDER_RETURN_REQUEST';
export const GET_ORDER_RETURN_REQUEST_SUCCESS = 'GET_ORDER_RETURN_REQUEST_SUCCESS';
export const GET_ORDER_RETURN_REQUEST_FAILURE = 'GET_ORDER_RETURN_REQUEST_FAILURE';

export const GET_ORDER_RETURN_RMA_DETAILS_REQUEST = 'GET_ORDER_RETURN_RMA_DETAILS_REQUEST';
export const GET_ORDER_RETURN_RMA_DETAILS_REQUEST_SUCCESS = 'GET_ORDER_RETURN_RMA_DETAILS_REQUEST_SUCCESS';
export const GET_ORDER_RETURN_RMA_DETAILS_REQUEST_FAILURE = 'GET_ORDER_RETURN_RMA_DETAILS_REQUEST_FAILURE';

export const POST_IMAGE_REQUEST = 'POST_IMAGE_REQUEST';
export const POST_IMAGE_REQUEST_SUCCESS = 'POST_IMAGE_REQUEST_SUCCESS';
export const POST_IMAGE_REQUEST_FAILURE = 'POST_IMAGE_REQUEST_FAILURE';
export const POST_IMAGE_PROGRESS_UPDATE = 'POST_IMAGE_PROGRESS_UPDATE';

export const DOWNLOAD_INVOICE_REQUEST = 'DOWNLOAD_INVOICE_REQUEST';
export const DOWNLOAD_INVOICE_REQUEST_SUCCESS = 'DOWNLOAD_INVOICE_REQUEST_SUCCESS';
export const DOWNLOAD_INVOICE_REQUEST_FAILURE = 'DOWNLOAD_INVOICE_REQUEST_FAILURE';
export const CLOSE_INVOICE_ERROR_MODAL = 'CLOSE_INVOICE_ERROR_MODAL';

export const DEACTIVATE_PLUS_SERVICE_REQUEST = 'DEACTIVATE_PLUS_SERVICE_REQUEST';
export const DEACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS = 'DEACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS';
export const DEACTIVATE_PLUS_SERVICE_REQUEST_FAILURE = 'DEACTIVATE_PLUS_SERVICE_REQUEST_FAILURE';

export const DELETE_PLUS_SERVICE_REQUEST = 'DELETE_PLUS_SERVICE_REQUEST';
export const DELETE_PLUS_SERVICE_REQUEST_SUCCESS = 'DELETE_PLUS_SERVICE_REQUEST_SUCCESS';
export const DELETE_PLUS_SERVICE_REQUEST_FAILURE = 'DELETE_PLUS_SERVICE_REQUEST_FAILURE';

export const REACTIVATE_PLUS_SERVICE_REQUEST = 'REACTIVATE_PLUS_SERVICE_REQUEST';
export const REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS = 'REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS';
export const REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE = 'REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE';
export const CHOOSE_DELIVERY_DATE_REQUEST = 'CHOOSE_DELIVERY_DATE_REQUEST';
export const REMOVE_CHOOSEN_DELIVERY_DATE_REQUEST = 'REMOVE_CHOOSEN_DELIVERY_DATE_REQUEST';

export const UPDATE_PLUS_SERVICE_REQUEST = 'UPDATE_PLUS_SERVICE_REQUEST';
export const UPDATE_PLUS_SERVICE_REQUEST_SUCCESS = 'UPDATE_PLUS_SERVICE_REQUEST_SUCCESS';
export const UPDATE_PLUS_SERVICE_REQUEST_FAILURE = 'UPDATE_PLUS_SERVICE_REQUEST_FAILURE';

export const UPDATE_PLUS_SERVICE_PAYMENT_REQUEST = 'UPDATE_PLUS_SERVICE_PAYMENT_REQUEST';
export const UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_SUCCESS = 'UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_SUCCESS';
export const UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_FAILURE = 'UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_FAILURE';

export const openReturnFormRequest = payload => ({
	type: OPEN_RETURN_FORM_REQUEST, payload
});

export const closeReturnFormRequest = payload => ({
	type: CLOSE_RETURN_FORM_REQUEST, payload
});

export const openCurrentOrderReturnFormRequest = payload => ({
	type: OPEN_CURRENT_ORDER_RETURN_FORM_REQUEST, payload
});

export const closeCurrentOrderReturnFormRequest = payload => ({
	type: CLOSE_CURRENT_ORDER_RETURN_FORM_REQUEST, payload
});

export const openPaymentEditFormRequest = () => ({
	type: OPEN_PAYMENT_EDIT_FORM_REQUEST
});

export const closePaymentEditFormRequest = () => ({
	type: CLOSE_PAYMENT_EDIT_FORM_REQUEST
});

export const openReactivationFormRequest = () => ({
	type: OPEN_REACTIVATION_FORM_REQUEST
});

export const closeReactivationFormRequest = () => ({
	type: CLOSE_REACTIVATION_FORM_REQUEST
});

export const postImageRequest = (payload) => ({
	type: POST_IMAGE_REQUEST, payload
});

export const postImageRequestSuccess = (payload, name, dataUrl) => ({
	type: POST_IMAGE_REQUEST_SUCCESS, payload, name, dataUrl
});

export const postImageRequestFailure = (error, name) => ({
	type: POST_IMAGE_REQUEST_FAILURE, error, name
});

export const postImageProgressUpdate = (percentage, name) => ({
	type: POST_IMAGE_PROGRESS_UPDATE, percentage, name
});

export const downloadInvoiceRequest = payload => ({
	type: DOWNLOAD_INVOICE_REQUEST, payload
});

export const downloadInvoiceRequestSuccess = (invoiceData, invoiceId) => ({
	type: DOWNLOAD_INVOICE_REQUEST_SUCCESS, invoiceData, invoiceId
});

export const downloadInvoiceRequestFailure = (error, invoiceId) => ({
	type: DOWNLOAD_INVOICE_REQUEST_FAILURE, error, invoiceId
});

export const closeInvoiceErrorModal = () => ({
	type: CLOSE_INVOICE_ERROR_MODAL
});

export const deactivatePlusServiceRequest = payload => ({
	type: DEACTIVATE_PLUS_SERVICE_REQUEST, payload
});

export const deactivatePlusServiceRequestSuccess = payload => ({
	type: DEACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS, payload
});

export const deactivatePlusServiceRequestFailure = payload => ({
	type: DEACTIVATE_PLUS_SERVICE_REQUEST_FAILURE, payload
});

export const deletePlusServiceRequest = payload => ({
	type: DELETE_PLUS_SERVICE_REQUEST, payload
});

export const deletePlusServiceRequestSuccess = payload => ({
	type: DELETE_PLUS_SERVICE_REQUEST_SUCCESS, payload
});

export const deletePlusServiceRequestFailure = payload => ({
	type: DELETE_PLUS_SERVICE_REQUEST_FAILURE, payload
});

export const reactivatePlusServiceRequest = payload => ({
	type: REACTIVATE_PLUS_SERVICE_REQUEST, payload
});

export const chooseDeliveryDateRequest = payload => ({
	type: CHOOSE_DELIVERY_DATE_REQUEST, payload
});

export const removeChoosenDeliveryDateRequest = payload => ({
	type: REMOVE_CHOOSEN_DELIVERY_DATE_REQUEST, payload
});

export const reactivatePlusServiceRequestSuccess = payload => ({
	type: REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS, payload
});

export const reactivatePlusServiceRequestFailure = payload => ({
	type: REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE, payload
});

export const updatePlusServiceRequest = payload => ({
	type: UPDATE_PLUS_SERVICE_REQUEST, payload
});

export const updatePlusServiceRequestSuccess = payload => ({
	type: UPDATE_PLUS_SERVICE_REQUEST_SUCCESS, payload
});

export const updatePlusServiceRequestFailure = payload => ({
	type: UPDATE_PLUS_SERVICE_REQUEST_FAILURE, payload
});

export const updatePlusServicePaymentRequest = payload => ({
	type: UPDATE_PLUS_SERVICE_PAYMENT_REQUEST, payload
});

export const updatePlusServicePaymentRequestSuccess = payload => ({
	type: UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_SUCCESS, payload
});

export const updatePlusServicePaymentRequestFailure = payload => ({
	type: UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_FAILURE, payload
});
export const getOrderReturnRequest = (payload, orderId) => ({
	type: GET_ORDER_RETURN_REQUEST, payload, orderId
});
export const getOrderReturnRequestSuccess = payload => ({
	type: GET_ORDER_RETURN_REQUEST_SUCCESS, payload
});
export const getOrderReturnRequestFailure = payload => ({
	type: GET_ORDER_RETURN_REQUEST_FAILURE, payload
});
export const getOrderReturnRmaDetailsRequest = (payload, downloadDocAsImg) => ({
	type: GET_ORDER_RETURN_RMA_DETAILS_REQUEST, payload, downloadDocAsImg
});
export const getOrderReturnRequestRmaDetailsSuccess = payload => ({
	type: GET_ORDER_RETURN_RMA_DETAILS_REQUEST_SUCCESS, payload
});
export const getOrderReturnRequestRmaDetailsFailure = payload => ({
	type: GET_ORDER_RETURN_RMA_DETAILS_REQUEST_FAILURE, payload
});
