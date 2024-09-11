import {call, takeEvery, put, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST,
	updateAddressAndPaymentMethodRequestFailure,
	updateAddressAndPaymentMethodRequestSuccess,
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS
} from '../actions/update_payment_method.action';
import {buildUpdateAddressAndPaymentSchema} from '../../schemas/update_address_and_payment.schema';
import {GET_ORDERS_REQUEST} from '../actions/get_orders.action';
import {getCustomerPaymentTokensRequest} from '../../../Payment/redux/actions/payment.action';
import {ORDER_TYPES_STATUS} from '../../../../utils/enums';

export const UpdatePaymentMethodReducer = state => state.myAccountModuleReducer.UpdatePaymentMethodReducer;
export function* updateAddressAndPaymentMethodSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateAddressAndPaymentSchema(payload),
		updateAddressAndPaymentMethodRequestSuccess,
		updateAddressAndPaymentMethodRequestFailure
	);
}
export function* updateAddressAndPaymentMethodSuccessSaga() {
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
export default function* updateAddressAndPaymentMethodSagas() {
	yield takeEvery(UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST, updateAddressAndPaymentMethodSaga);
	yield takeEvery(UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS, updateAddressAndPaymentMethodSuccessSaga);
}