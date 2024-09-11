import {
	CLOSE_CURRENT_ORDER_RETURN_FORM_REQUEST,
	CLOSE_INVOICE_ERROR_MODAL,
	CLOSE_PAYMENT_EDIT_FORM_REQUEST,
	CLOSE_REACTIVATION_FORM_REQUEST,
	CLOSE_RETURN_FORM_REQUEST,
	DEACTIVATE_PLUS_SERVICE_REQUEST,
	DEACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS,
	DEACTIVATE_PLUS_SERVICE_REQUEST_FAILURE,
	DELETE_PLUS_SERVICE_REQUEST,
	DELETE_PLUS_SERVICE_REQUEST_SUCCESS,
	DELETE_PLUS_SERVICE_REQUEST_FAILURE,
	DOWNLOAD_INVOICE_REQUEST_FAILURE,
	DOWNLOAD_INVOICE_REQUEST_SUCCESS,
	OPEN_CURRENT_ORDER_RETURN_FORM_REQUEST,
	OPEN_PAYMENT_EDIT_FORM_REQUEST,
	OPEN_REACTIVATION_FORM_REQUEST,
	OPEN_RETURN_FORM_REQUEST,
	POST_IMAGE_PROGRESS_UPDATE,
	POST_IMAGE_REQUEST_FAILURE,
	POST_IMAGE_REQUEST_SUCCESS,
	REACTIVATE_PLUS_SERVICE_REQUEST,
	REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS,
	REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE,
	UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_SUCCESS,
	CHOOSE_DELIVERY_DATE_REQUEST,
	REMOVE_CHOOSEN_DELIVERY_DATE_REQUEST,
} from '../actions/orders.action';

const initialState = {
	isOpen: false,
	isLoading: false,
	isCurrentOrderReturnFlow: false,
	isInvoiceErrorModalOpen: false,
	delivery: {},
	orderDetails: {},
	images: {},
	invoices: {},
	downloadError:null,
	plusService: {
		isPaymentEditFormOpen: false,
		isReactivationFormOpen: false,
		isDeleted: false
	},
	isReactivated: false,
	deliveryDate: null,
	choosenDeliveryDate: null,
	reactivateDeliveryDate: null,
	returnOrderType: null,
	deactivateError: null
};

export const OrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_RETURN_FORM_REQUEST:
			return {
				...state,
				isOpen: true,
				productData: action.payload.productData,
				delivery: action.payload.delivery,
				orderDetails: action.payload.orderDetails,
				returnOrderType: action.payload.orderType
			};
		case CLOSE_RETURN_FORM_REQUEST:
			return {
				...state,
				isOpen: false,
				productData: {},
				delivery: {},
				orderDetails: {}
			};
		case OPEN_CURRENT_ORDER_RETURN_FORM_REQUEST:
			return {
				...state,
				isCurrentOrderReturnFlow: true,
				productData: action.payload.productData,
				delivery: action.payload.delivery,
				orderDetails: action.payload.orderDetails
			};
		case CLOSE_CURRENT_ORDER_RETURN_FORM_REQUEST:
			return {
				...state,
				isCurrentOrderReturnFlow: false,
				productData: {},
				delivery: {},
				orderDetails: {}
			};
		case POST_IMAGE_REQUEST_SUCCESS:
			return {
				...state,
				images: {
					...state.images,
					[action.name]: {
						...state.images[action.name],
						transactionId: action.payload.data.transactionId,
						data: action.payload.data.data,
						dataUrl: action.dataUrl
					}
				}
			};
		case POST_IMAGE_REQUEST_FAILURE:
			return {
				...state,
				images: {
					...state.images,
					[action.name]: {
						...state.images[action.name],
						error: action.error
					}
				}
			};
		case POST_IMAGE_PROGRESS_UPDATE:
			return {
				...state,
				images: {
					...state.images,
					[action.name]: {
						...state.images[action.name],
						uploadPercentage: action.percentage
					}
				}
			};
		case DOWNLOAD_INVOICE_REQUEST_SUCCESS:
			return {
				...state,
				invoices: {
					...state.invoices,
					[action.invoiceId]: action.invoiceData
				}
			};
		case DOWNLOAD_INVOICE_REQUEST_FAILURE:
			return {
				...state,
				invoices: {
					...state.invoices,
					[action.invoiceId]: {
						...state.invoices[action.invoiceId],
						error: action.error
					}
				},
				isInvoiceErrorModalOpen: true
			};
		case CLOSE_INVOICE_ERROR_MODAL:
			return {
				...state,
				isInvoiceErrorModalOpen: false
			};
		case OPEN_PAYMENT_EDIT_FORM_REQUEST:
			return {
				...state,
				plusService: {
					...state.plusService,
					isPaymentEditFormOpen: true
				}
			};
		case CLOSE_PAYMENT_EDIT_FORM_REQUEST:
		case UPDATE_PLUS_SERVICE_PAYMENT_REQUEST_SUCCESS:
			return {
				...state,
				plusService: {
					...state.plusService,
					isPaymentEditFormOpen: false,
					isReactivationFormOpen:false					
				}
			};
		case OPEN_REACTIVATION_FORM_REQUEST:
			return {
				...state,
				plusService: {
					...state.plusService,
					isReactivationFormOpen: true
				}
			};
		case CLOSE_REACTIVATION_FORM_REQUEST:
			return {
				...state,
				plusService: {
					...state.plusService,
					isReactivationFormOpen: false
				}
			};
		case DEACTIVATE_PLUS_SERVICE_REQUEST:
			return {
				...state,
				isLoading: true,
				deactivateError: null
			};
		case DEACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				plusService: {
					...state.plusService
				}
			};
		case DEACTIVATE_PLUS_SERVICE_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				plusService: {
					...state.plusService
				},
				deactivateError: action.payload.response.status
			};
		case DELETE_PLUS_SERVICE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case DELETE_PLUS_SERVICE_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				plusService: {
					...state.plusService,
					isDeleted: true
				}
			};
		case DELETE_PLUS_SERVICE_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				plusService: {
					...state.plusService,
					isDeleted: false
				}
			};
		case REACTIVATE_PLUS_SERVICE_REQUEST:
			return {
				...state,
				isLoading: true,
				deliveryDate: action.payload.deliveryDate
			};
		case CHOOSE_DELIVERY_DATE_REQUEST:
		return {
			...state,
			choosenDeliveryDate: action.payload.deliveryDate
		};
		case REMOVE_CHOOSEN_DELIVERY_DATE_REQUEST:
		return {
			...state,
			choosenDeliveryDate: null
		};
		case REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				isReactivated: true,
				reactivateDeliveryDate: state.deliveryDate
			};
		case REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE:
			return {
				...state,
				isLoading: false,
				isReactivated: false
			};
		default:
			return state;
	}
};