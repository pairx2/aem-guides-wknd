import {call, takeEvery} from 'redux-saga/effects';
import {GET_CHECKOUT_ID_REQUEST} from '../actions/get_checkout_id.action';
import {_setPaymentMethodOnCart} from '../../../Cart/redux/sagas/set_payment_method_on_cart.saga';

export function* getCheckoutIdSaga({payload}) {
	yield call(_setPaymentMethodOnCart, {
		paymentMethod: payload.paymentMethod,
		isSavePaymentMethod: payload.isSavePaymentMethod,
		paymentMethodToken: payload.paymentMethodToken ? payload.paymentMethodToken : ''
	});
}

export default function* checkoutIdSaga() {
	yield takeEvery(GET_CHECKOUT_ID_REQUEST, getCheckoutIdSaga);
}