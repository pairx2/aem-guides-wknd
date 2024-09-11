import {all} from 'redux-saga/effects';
import checkoutIdSaga from './get_checkout_id.saga';
import availablePaymentMethodsSaga from './get_available_payment_methods.saga';
import paymentSaga from './payment.saga';

export default function* paymentModuleSaga() {
	yield all([
		checkoutIdSaga(),
		availablePaymentMethodsSaga(),
		paymentSaga()
	]);
}