import {call, put, takeLatest} from 'redux-saga/effects';
import { CONFIRM_OFFLINE_CUSTOMER_REQUEST, confirmOfflineCustomerRequestSuccess, confirmOfflineCustomerRequestFailure } from '../actions/confirm_offline_customer.action';
import { confirmOfflineCustomer } from '../../api/confirm_offline_customer.api';

export function* confirmOfflineCustomerSaga({payload}) {
	try {
		const data = yield call(confirmOfflineCustomer, payload);
		if (data) {
			yield put(confirmOfflineCustomerRequestSuccess(data));
		} else {
			yield put(confirmOfflineCustomerRequestFailure(data?.errorCode));
		}
	} catch (e) {
		yield put(confirmOfflineCustomerRequestFailure(e));
	}
}


export default function* confirmOfflineToOnlineCustomerSaga() {
	yield takeLatest(CONFIRM_OFFLINE_CUSTOMER_REQUEST, confirmOfflineCustomerSaga);
}