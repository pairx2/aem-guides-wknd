import {call, takeEvery} from 'redux-saga/effects';
import {GET_CHECKOUT_ID_REQUEST} from '../../../../../modules/Payment/redux/actions/get_checkout_id.action';
import {_setPaymentMethodOnCart} from '../../../../../modules/Cart/redux/sagas/set_payment_method_on_cart.saga';
import * as saga from '../../../../../modules/Payment/redux/sagas/get_checkout_id.saga';
import checkoutIdSaga from '../../../../../modules/Payment/redux/sagas/get_checkout_id.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getCheckoutIdSaga saga', () => {
	const payload = {
		paymentMethod : 'post',
		isSavePaymentMethod : 'isSavePaymentMethod',
		paymentMethodToken: 'paymentMethodToken'
	};
	const iterator = saga.getCheckoutIdSaga({payload});
	test('call _setPaymentMethodOnCart', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_setPaymentMethodOnCart, {
			paymentMethod: payload.paymentMethod,
			isSavePaymentMethod: payload.isSavePaymentMethod,
			paymentMethodToken: payload.paymentMethodToken
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('checkoutIdSaga saga ', () => {
	const iterator = checkoutIdSaga();
	test('get checkoutIdSaga -> getCheckoutIdSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(GET_CHECKOUT_ID_REQUEST, saga.getCheckoutIdSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});
