import {call, put, takeLatest} from 'redux-saga/effects';
import { VALIDATE_OFFLINE_CUSTOMER_REQUEST, validateOfflineCustomerRequestFailure, validateOfflineCustomerRequestSuccess } from '../actions/validate_offline_customer.action';
import { validateOfflineCustomer } from '../../api/validate_offline_customer.api';

export function* validateOfflineCustomerSaga({payload}) {
	try {
		const data = yield call(validateOfflineCustomer, payload);
		if (data) {
			yield put(validateOfflineCustomerRequestSuccess(data));
		} else {
			yield put(validateOfflineCustomerRequestFailure(data?.errorCode));
		}
	} catch (e) {
		yield put(validateOfflineCustomerRequestFailure(e));
	}
}


export default function* offlineToOnlineSaga() {
	yield takeLatest(VALIDATE_OFFLINE_CUSTOMER_REQUEST, validateOfflineCustomerSaga);
}