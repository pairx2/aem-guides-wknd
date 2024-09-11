import {call, put, takeLatest} from 'redux-saga/effects';
import { REGISTER_OFFLINE_CUSTOMER_REQUEST, registerOfflineCustomerRequestSuccess, registerOfflineCustomerRequestFailure } from '../actions/register_offline_customer.action';
import { registerOfflineCustomer } from '../../api/register_offline_customer.api';

export function* registerOfflineCustomerSaga({payload}) {
	try {
		const data = yield call(registerOfflineCustomer, payload);
		if (data) {
			yield put(registerOfflineCustomerRequestSuccess(data));
		} else {
			yield put(registerOfflineCustomerRequestFailure(data?.errorCode));
		}
	} catch (e) {
		yield put(registerOfflineCustomerRequestFailure(e));
	}
}


export default function* registerUserOfflineToOnlineSaga() {
	yield takeLatest(REGISTER_OFFLINE_CUSTOMER_REQUEST, registerOfflineCustomerSaga);
}