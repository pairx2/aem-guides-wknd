import {call, takeEvery, put, select} from 'redux-saga/effects';
import {
	UPDATE_ORDER_REQUEST,
	updateOrderRequestFailure,
	updateOrderRequestSuccess,
	UPDATE_ORDER_REQUEST_SUCCESS
} from '../actions/update_order.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildUpdateOrderSchema} from '../../schemas/update_order.schema';
import {GET_ORDERS_REQUEST} from '../actions/get_orders.action';
import {ORDER_TYPES,ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const OrderUpdateReducer = state => state.myAccountModuleReducer.OrderUpdateReducer;
export function* updateOrderShippingAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateOrderSchema(payload),
		updateOrderRequestSuccess,
		updateOrderRequestFailure
	);
}
export function* updateOrderSuccessSaga() {
	const {updatedOrderType} = yield select (OrderUpdateReducer);
	yield put({
		type: GET_ORDERS_REQUEST,
		payload: {
			timeDelay: true,
			orderHistoryType: updatedOrderType==ORDER_TYPES.RX? ORDER_TYPES_STATUS.RX: ORDER_TYPES_STATUS.CPS
		}
	});
}
export default function* updateOrderShippingAddressSagas() {
	yield takeEvery(UPDATE_ORDER_REQUEST, updateOrderShippingAddressSaga);
	yield takeEvery(UPDATE_ORDER_REQUEST_SUCCESS, updateOrderSuccessSaga);
}