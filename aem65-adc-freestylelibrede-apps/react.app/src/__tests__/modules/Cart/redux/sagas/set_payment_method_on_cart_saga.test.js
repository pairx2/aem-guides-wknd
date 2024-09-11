import {call, takeEvery, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildSetPaymentMethodOnCartSchema} from '../../../../../modules/Cart/schemas/set_payment_method_on_cart.schema';
import {
	getCustomerCartRequestFailure,
	SetPaymentMethodOnCartRequestSuccess,
	SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {buildSetSavedPaymentMethodOnCartSchema} from '../../../../../modules/Cart/schemas/set_saved_payment_method_on_cart.schema';
import {isRxCheckoutPageType} from '../../../../../utils/pageTypeUtils';
import {getGhostCartRequestSuccess, getGhostCartRequestFailure} from '../../../../../modules/Cart/redux/actions/ghost_cart.action';
import setPaymentMethodOnCartSagas from '../../../../../modules/Cart/redux/sagas/set_payment_method_on_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/set_payment_method_on_cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');


describe('setSavedPaymentMethodOnCartSaga saga ', () => {
	const payload = {
		paymentMethod : 'paymentMethod',
		token : '8ac7a49f71aabf0e0171ba97acb923d2'
	};
	const iterator = saga.setSavedPaymentMethodOnCartSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = select(saga.GetAvailablePaymentMethodsReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const communicationToken = 'communicationToken';
		const actualYield = iterator.next({communicationToken}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSetSavedPaymentMethodOnCartSchema(cartId, payload.paymentMethod, payload.token, communicationToken),
			isRxCheckoutPageType() ? getGhostCartRequestSuccess : SetPaymentMethodOnCartRequestSuccess,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('_setPaymentMethodOnCart saga ', () => {
	const payload = {
		paymentMethod : 'paymentMethod',
		paymentMethodToken : '8ac7a49f71aabf0e0171ba97acb923d2',
		isSavePaymentMethod : 'isSavePaymentMethod'
	};
	const iterator = saga._setPaymentMethodOnCart(payload);
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = select(saga.GetAvailablePaymentMethodsReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const communicationToken = 'communicationToken';
		const actualYield = iterator.next({communicationToken}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSetPaymentMethodOnCartSchema(cartId, payload.paymentMethod, payload.isSavePaymentMethod, payload.paymentMethodToken, communicationToken),
			isRxCheckoutPageType() ? getGhostCartRequestSuccess : SetPaymentMethodOnCartRequestSuccess,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setPaymentMethodOnCartSagas saga ', () => {
	const iterator = setPaymentMethodOnCartSagas();
	test('get setPaymentMethodOnCartSagas -> setSavedPaymentMethodOnCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST, saga.setSavedPaymentMethodOnCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
