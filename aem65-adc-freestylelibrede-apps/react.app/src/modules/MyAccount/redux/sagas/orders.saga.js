import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects';
import {END, eventChannel} from 'redux-saga';
import {
	DEACTIVATE_PLUS_SERVICE_REQUEST,
	deactivatePlusServiceRequestSuccess,
	deactivatePlusServiceRequestFailure,
	DELETE_PLUS_SERVICE_REQUEST,
	deletePlusServiceRequestSuccess,
	deletePlusServiceRequestFailure,
	DOWNLOAD_INVOICE_REQUEST,
	downloadInvoiceRequestFailure,
	downloadInvoiceRequestSuccess,
	POST_IMAGE_REQUEST,
	postImageProgressUpdate,
	postImageRequestFailure,
	postImageRequestSuccess,
	REACTIVATE_PLUS_SERVICE_REQUEST,
	REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS,
	REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE,
	reactivatePlusServiceRequestSuccess, reactivatePlusServiceRequestFailure,
	UPDATE_PLUS_SERVICE_PAYMENT_REQUEST,
	UPDATE_PLUS_SERVICE_REQUEST, updatePlusServicePaymentRequestSuccess,
	updatePlusServiceRequestSuccess
} from '../actions/orders.action';
import {GET_ORDERS_REQUEST, GET_ORDERS_RXMC_REQUEST} from '../actions/get_orders.action';
import {GET_GHOST_ORDERS_REQUEST} from '../actions/get_ghost_orders.action';
import {postImage} from '../api/orders.api';
import {empty} from '../../../../utils/default';
import {getCsrfToken} from '../../../Authentication/api/registration.api';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {getInvoice, cancelOrDeactivateSubscription} from '../../api/orders.api';
import {downloadBase64} from '../../../../utils/pdfUtils';
import {OPEN_MODAL_ACTION} from '../../../Modal/redux/actions';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import {GHOST_ORDERS_DEACTIVATE, ghostOrdersDeactivateSuccess, ghostOrdersDeactivateFailure} from '../actions/get_ghost_orders.action';
import {buildReactivatePlusServiceSchema} from '../../../MyAccount/schemas/reactivate_plus_service.schema';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const getOrdersReducer = state => state.myAccountModuleReducer.OrdersReducer;
export const getDictionary = state => state.translationModuleReducer.translationReducer.dictionary;

export function createUploader(payload, csrfToken) {
	let emit;

	const channel = eventChannel(emitter => {
		emit = emitter;
		return empty.function;
	});

	const uploadPromise = postImage(payload, (event) => {
		if (event.loaded.total === 1) {
			emit(END);
		}

		emit(Math.round(event.loaded / event.total * 100));
	}, csrfToken);

	return [uploadPromise, channel];
}

export function* watchOnProgress(channel, name) {
	// we are using yield, known limitation of the sonar rule
	// NOSONAR
	while (true) {
		const data = yield take(channel);
		yield put(postImageProgressUpdate(data, name));
	}
}

export function* postImageSaga({payload}) {
	const {data: token} = yield call(getCsrfToken);
	const [uploadPromise, channel] = createUploader(payload, token.token);
	yield fork(watchOnProgress, channel, payload.name);

	try {
		const result = yield uploadPromise;
		yield put(postImageRequestSuccess(result, payload.name, payload.dataUrl));
	} catch (err) {
		yield put(postImageRequestFailure(err, payload.name));
	}
}

export function* getInvoiceSaga({payload}) {
	const {orderId, invoiceId} = payload;
	const {invoices} = yield select(getOrdersReducer);
	const dictionary = yield select(getDictionary);
	const invoiceData = invoices?.[invoiceId]?.customerInvoice;
	if (!invoiceData) {
		try {
			const jwtToken = yield call(_getJwtToken);
			const {data, status} = yield call(getInvoice, jwtToken, orderId, invoiceId);
			if (status === 200 && data?.customerInvoice) {
				yield put(downloadInvoiceRequestSuccess(data, invoiceId));
				downloadBase64(data.customerInvoice, `${translate(dictionary, i18nLabels.INVOICE_FILE_NAME)}_${invoiceId}`);
			} else {
				yield put(downloadInvoiceRequestFailure('error fetching invoice', invoiceId));
			}
		} catch(e) {
			yield put(downloadInvoiceRequestFailure('error fetching invoice', invoiceId));
		}
	} else {
		downloadBase64(invoiceData, `${translate(dictionary, i18nLabels.INVOICE_FILE_NAME)}_${invoiceId}`);
	}
}

export function* deactivatePlusServiceSaga({payload}) {
	const {deactivateSubsData, orderId} = payload;
	try {
		const jwtToken = yield call(_getJwtToken);
		const {data} = yield call(cancelOrDeactivateSubscription, deactivateSubsData, jwtToken, orderId);
		if(data['Status Code'] === 200){
			yield put(deactivatePlusServiceRequestSuccess(data));
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.X_YOU_DEACTIVATED_YOUR_PLUS_SERVICE,
					contentID: 'plusServiceUpdatedConfirmationModal',
					props: {
						paragraph_1: i18nLabels.SHAME_THAT_YOU_MADE_THIS_DECISION,
						paragraph_2: i18nLabels.YOU_CAN_SET_UP_AGAIN
					}
				}
			});
			yield put({
				type: GET_ORDERS_REQUEST,
				payload: {
					timeDelay: true,
					orderHistoryType: ORDER_TYPES_STATUS.CPS
				}
			});
		}else{
			yield put(deactivatePlusServiceRequestFailure('error'));
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.SUBSCRIPTION_ERROR,
					contentID: 'plusServiceSubscriptionFailed',
					props: {
						paragraph_1: i18nLabels.ORDER_STATUS_UPDATE_FAILED,
					}
				}
			});
		}
	} catch (err) {
		yield put(deactivatePlusServiceRequestFailure(err));
	}
}

export function* deletePlusServiceSaga({payload}) {
	const {cancelSubsData, orderId} = payload;
	try {
		const jwtToken = yield call(_getJwtToken);
		const {data} = yield call(cancelOrDeactivateSubscription, cancelSubsData, jwtToken, orderId);
		if(data['Status Code'] === 200){
			yield put(deletePlusServiceRequestSuccess(data));
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.X_YOU_DELETED_YOUR_PLUS_SERVICE,
					contentID: 'plusServiceUpdatedConfirmationModal',
					props: {
						paragraph_1: i18nLabels.SHAME_THAT_YOU_MADE_THIS_DECISION,
						paragraph_2: i18nLabels.YOU_CAN_SET_UP_AGAIN
					}
				}
			});
			yield put({
				type: GET_ORDERS_REQUEST,
				payload: {
					timeDelay: true,
					orderHistoryType: ORDER_TYPES_STATUS.CPS
				}
			});
		}else{
			yield put(deletePlusServiceRequestFailure('error'));
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.SUBSCRIPTION_ERROR,
					contentID: 'plusServiceSubscriptionFailed',
					props: {
						paragraph_1: i18nLabels.ORDER_STATUS_UPDATE_FAILED,
					}
				}
			});
		}
	} catch (err) {
		yield put(deletePlusServiceRequestFailure(err));
	}
}

export function* reactivatePlusServiceSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildReactivatePlusServiceSchema(payload),
		reactivatePlusServiceRequestSuccess,
		reactivatePlusServiceRequestFailure
	);
}

export function* reactivatePlusServiceSuccessSaga() {
	const {reactivateDeliveryDate} = yield select(getOrdersReducer);
	yield put({
		type: OPEN_MODAL_ACTION,
		payload: {
			heading: i18nLabels.PLUS_SERVICE_REACTIVATED,
			contentID: 'plusServiceUpdatedConfirmationModal',
			props: {
				paragraph_1: i18nLabels.PLUS_SERVICE_SUCCESSFULLY_ACTIVATED,
				paragraph_2: i18nLabels.SUPPLY_PERIOD_STARTS_AT_X,
				reactivateDeliveryDate: reactivateDeliveryDate
			}
		}
	});
	yield put({
		type: GET_ORDERS_REQUEST,
		payload: {
			timeDelay: true,
			orderHistoryType: ORDER_TYPES_STATUS.CPS
		}
	});
}

export function* reactivatePlusServiceFailureSaga() {
	yield put({
		type: OPEN_MODAL_ACTION,
		payload: {
			heading: i18nLabels.PLUS_SERVICE_REACTIVATION_FAILED,
			contentID: 'plusServiceUpdatedConfirmationModal',
			props: {
				paragraph_1: i18nLabels.PLUS_SERVICE_REACTIVATION_FAILED_MESSAGE
			}
		}
	});
}

export function* updatePlusServiceSaga({payload}) {
	yield put(updatePlusServiceRequestSuccess(payload));
}

export function* updatePlusServicePaymentSaga({payload}) {
	yield put(updatePlusServicePaymentRequestSuccess(payload));
}

export function* deactivateGhostOrderSaga({payload}) {
	const {deactivateGhostData, rxmc} = payload;
	try {
		const jwtToken = yield call(_getJwtToken);
		const {data} = yield call(cancelOrDeactivateSubscription, deactivateGhostData, jwtToken, rxmc);
		deactivateGhostData.message = data?.message;
		if(data['Status Code'] === 200) {
			yield put({
				type: GET_GHOST_ORDERS_REQUEST,
				payload: {
					timeDelay: true
				}
			});
			yield put({
				type: GET_ORDERS_RXMC_REQUEST,
				payload: {
					rxmc,
					timeDelay: true
				}
			});
			yield put(ghostOrdersDeactivateSuccess(deactivateGhostData));
		}else {
			yield put(ghostOrdersDeactivateFailure('error'));
			yield put({
				type: OPEN_MODAL_ACTION,
				payload: {
					heading: i18nLabels.SUBSCRIPTION_ERROR,
					contentID: 'deactivateGhostOrderFailureModal',
					props: {
						paragraph_1: data?.errorMessage,
					}
				}
			});
		}
	} catch (err) {
		yield put(ghostOrdersDeactivateFailure(err));
		yield put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.SUBSCRIPTION_ERROR,
				contentID: 'deactivateGhostOrderFailureModal',
				props: {
					paragraph_1: i18nLabels.NO_ORDERS_FOUND_SUBSCRIPTION_ERROR
				}
			}
		});
	}
}

export default function* ordersSaga() {
	yield takeEvery(POST_IMAGE_REQUEST, postImageSaga);
	yield takeEvery(DOWNLOAD_INVOICE_REQUEST, getInvoiceSaga);
	yield takeEvery(DEACTIVATE_PLUS_SERVICE_REQUEST, deactivatePlusServiceSaga);
	yield takeEvery(DELETE_PLUS_SERVICE_REQUEST, deletePlusServiceSaga);
	yield takeEvery(UPDATE_PLUS_SERVICE_REQUEST, updatePlusServiceSaga);
	yield takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST, reactivatePlusServiceSaga);
	yield takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST_SUCCESS, reactivatePlusServiceSuccessSaga);
	yield takeEvery(REACTIVATE_PLUS_SERVICE_REQUEST_FAILURE, reactivatePlusServiceFailureSaga);
	yield takeEvery(UPDATE_PLUS_SERVICE_PAYMENT_REQUEST, updatePlusServicePaymentSaga);
	yield takeEvery(GHOST_ORDERS_DEACTIVATE, deactivateGhostOrderSaga);
}