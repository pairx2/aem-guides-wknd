import {call, put, takeEvery, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {
	UPDATE_PAYMENT_METHOD_REQUEST,
	UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS,
	updatePaymentMethodRequestSuccess,
	updatePaymentMethodRequestFailure
} from '../actions/update_payment_method.action';
import {buildUpdatePaymentMethodSchema} from '../../schemas/update_payment_method.schema';
import {GET_ORDERS_REQUEST} from '../actions/get_orders.action';
import {getCustomerPaymentTokensRequest} from '../../../Payment/redux/actions/payment.action';
import {ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const UpdatePaymentMethodReducer = state => state.myAccountModuleReducer.UpdatePaymentMethodReducer;
export function* updatePaymentMethodSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdatePaymentMethodSchema(payload),
		updatePaymentMethodRequestSuccess,
		updatePaymentMethodRequestFailure
	);
}
export function* updatePaymentMethodSuccessSaga() {
	const {updatedOrder} = yield select (UpdatePaymentMethodReducer);
	yield put({
		type: GET_ORDERS_REQUEST,
		payload: {
			timeDelay: true,
			orderHistoryType: updatedOrder==ORDER_TYPES_STATUS.RX? ORDER_TYPES_STATUS.RX: ORDER_TYPES_STATUS.CPS
		}
	});
	yield put(getCustomerPaymentTokensRequest());
}

export default function* updatePaymentMethodSagas() {
	yield takeEvery(UPDATE_PAYMENT_METHOD_REQUEST, updatePaymentMethodSaga);
	yield takeEvery(UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS, updatePaymentMethodSuccessSaga);
}