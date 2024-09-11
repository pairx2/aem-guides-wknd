import {all} from 'redux-saga/effects';
import offlineToOnlineSaga from './validate_offline_customer.saga';
import registerUserOfflineToOnlineSaga from './register_offline_customer.saga'
import confirmOfflineToOnlineCustomerSaga from './confirm_offline_customer.saga'

export default function* offlineToOnlineModuleSaga() {
	yield all([
		offlineToOnlineSaga(),
		registerUserOfflineToOnlineSaga(),
		confirmOfflineToOnlineCustomerSaga()
	]);
}