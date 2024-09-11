import {call, put, takeEvery, select, takeLatest} from 'redux-saga/effects';
import {
	GET_ORDER_RETURN_REQUEST,
	getOrderReturnRequestSuccess,
	getOrderReturnRequestFailure,
	GET_ORDER_RETURN_RMA_DETAILS_REQUEST,
	getOrderReturnRequestRmaDetailsSuccess,
	getOrderReturnRequestRmaDetailsFailure
} from '../actions/orders.action';
import {getOrderReturnId, getOrderReturnRmaDetails} from '../../api/order_return.api';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {downloadBase64} from '../../../../utils/pdfUtils';
import translate, {i18nLabels} from '../../../../utils/translationUtils';

export const OrderReturnReducer = state => state.myAccountModuleReducer.OrderReturnReducer;
export const getDictionary = state => state.translationModuleReducer.translationReducer.dictionary;

export function* getOrderReturnSaga({payload}) {
	try {
		const jwtToken = yield call(_getJwtToken);
		const {data} = yield call(getOrderReturnId, payload, jwtToken);
		if (data) {
			yield put(getOrderReturnRequestSuccess(data));
		}
	} catch (e) {
		yield put(getOrderReturnRequestFailure(e));
	}
}

export function* getOrderReturnRmaDetailsSaga({payload, downloadDocAsImg}) {
	const {customerReturnInfo, orderId} = yield select(OrderReturnReducer);
	const dictionary = yield select(getDictionary);
	if (!customerReturnInfo?.[orderId]?.returnReceipt) {
		try {
			const jwtToken = yield call(_getJwtToken);
			const {data} = yield call(getOrderReturnRmaDetails, payload, jwtToken);
			if (data && data.CS_RMA_Label__c) {
				yield put(getOrderReturnRequestRmaDetailsSuccess(data));
				downloadBase64(data.CS_RMA_Label__c, `${translate(dictionary, i18nLabels.RMA_LABEL_FILE_NAME)}__${payload.deliveryOrderId}_${payload.return_id}`, downloadDocAsImg);
			} else {
				yield put(getOrderReturnRequestRmaDetailsFailure('error'));
			}
		} catch (e) {
			yield put(getOrderReturnRequestRmaDetailsFailure('error'));
		}
	} else {
		downloadBase64(customerReturnInfo[orderId].returnReceipt, `${translate(dictionary, i18nLabels.RMA_LABEL_FILE_NAME)}__${payload.deliveryOrderId}_${payload.return_id}`, downloadDocAsImg);
	}
}

export default function* getOrderReturnSagas() {
	yield takeEvery(GET_ORDER_RETURN_REQUEST, getOrderReturnSaga);
	yield takeLatest(GET_ORDER_RETURN_RMA_DETAILS_REQUEST, getOrderReturnRmaDetailsSaga);
}
