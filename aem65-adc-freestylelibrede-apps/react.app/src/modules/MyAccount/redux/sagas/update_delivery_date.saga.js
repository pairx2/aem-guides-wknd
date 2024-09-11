import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
	UPDATE_DELIVERY_DATE_REQUEST,
	UPDATE_DELIVERY_DATE_REQUEST_SUCCESS,
	UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS,
	updateDeliveryDateRequestSuccess,
	updateDeliveryDateForRxmcRequestSuccess,
	updateDeliveryDateRequestFailure
} from '../actions/update_delivery_date.action';
import {GET_ORDERS_REQUEST, GET_ORDERS_RXMC_REQUEST} from '../actions/get_orders.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildUpdateDeliveryDateSchema} from '../../schemas/update_delivery_date.schema';
import {ORDER_TYPES, ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const getDeliveryDateUpdateReducer = state => state.myAccountModuleReducer.DeliveryDateUpdateReducer;

export function* updateDeliveryDateSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateDeliveryDateSchema(payload),
		payload?.order_type === ORDER_TYPES.RX ? updateDeliveryDateForRxmcRequestSuccess : updateDeliveryDateRequestSuccess,
		updateDeliveryDateRequestFailure
	);
}

export function* updateDeliveryDateSuccessSaga() {
	yield put({
		type: GET_ORDERS_REQUEST,
		payload: {
			timeDelay: true,
			orderHistoryType: ORDER_TYPES_STATUS.CPS
		}
	});
}
export function* updateDeliveryDateRxmcSuccessSaga() {
	const {rxmc} = yield select(getDeliveryDateUpdateReducer);
	yield put({
		type: GET_ORDERS_RXMC_REQUEST,
		payload: {
			rxmc,
			timeDelay: true
		}
	});
}

export default function* updateDeliveryDateSagas() {
	yield takeEvery(UPDATE_DELIVERY_DATE_REQUEST, updateDeliveryDateSaga);
	yield takeEvery(UPDATE_DELIVERY_DATE_REQUEST_SUCCESS, updateDeliveryDateSuccessSaga);
	yield takeEvery(UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS, updateDeliveryDateRxmcSuccessSaga);
}
