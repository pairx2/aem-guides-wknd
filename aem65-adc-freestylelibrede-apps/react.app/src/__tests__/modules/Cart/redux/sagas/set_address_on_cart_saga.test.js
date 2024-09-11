import {call, takeEvery, select, put} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	SET_BILLING_ADDRESS_ON_CART,
	SET_SHIPPING_ADDRESS_ON_CART
} from '../../../../../modules/Cart/redux/actions/cart.action';

import {buildSetShippingAddressOnCartSchema} from '../../../../../modules/Cart/schemas/set_shipping_address_on_cart.schema';
import {buildSetBillingAddressOnCartSchema} from '../../../../../modules/Cart/schemas/set_billing_address_on_cart.schema';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {isRxCheckoutPageType} from '../../../../../utils/pageTypeUtils';
import {getGhostCartRequestSuccess, getGhostCartRequestFailure} from '../../../../../modules/Cart/redux/actions/ghost_cart.action';
import setAddressOnCartSagas from '../../../../../modules/Cart/redux/sagas/set_address_on_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/set_address_on_cart.saga';
import {getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');
jest.mock('../../../../../modules/Cart/schemas/set_shipping_address_on_cart.schema');
jest.mock('../../../../../modules/Cart/schemas/set_billing_address_on_cart.schema');

describe('setAddressOnCartSaga saga -saveToAccount : true ', () => {
	const payload = {
		address : 'address',
		saveToAccount : true,
		fetchCart : 'fetchCart'
	};
	const iterator = saga.setAddressOnCartSaga({payload});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getRssResultReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call _getCartId testing', () => {
		const resultCode = '1234';
		const actualYield = iterator.next({resultCode}).value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const resultCode = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSetShippingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, resultCode),
			payload.fetchCart ? (isRxCheckoutPageType() ? getGhostCartRequestSuccess : getCustomerCartRequestSuccess) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getCustomerRequest testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setAddressOnCartSaga saga -saveToAccount : false ', () => {
	const payload = {
		address : 'address',
		saveToAccount : false,
		fetchCart : 'fetchCart'
	};
	const iterator = saga.setAddressOnCartSaga({payload});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getRssResultReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call _getCartId testing', () => {
		const resultCode = '1234';
		const actualYield = iterator.next({resultCode}).value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const resultCode = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSetShippingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, resultCode),
			payload.fetchCart ? (isRxCheckoutPageType() ? getGhostCartRequestSuccess : getCustomerCartRequestSuccess) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = null;
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getCustomerRequest testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setBillingAddressOnCartSaga saga - saveToAccount : true ', () => {
	const payload = {
		address : 'address',
		saveToAccount : true,
		fetchCart : 'fetchCart'
	};
	const iterator = saga.setBillingAddressOnCartSaga({payload});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getRssResultReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call _getCartId testing', () => {
		const resultCode = '1234';
		const actualYield = iterator.next({resultCode}).value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const resultCode = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildSetBillingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, resultCode),
			payload.fetchCart ? (isRxCheckoutPageType() ? getGhostCartRequestSuccess : getCustomerCartRequestSuccess) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getCustomerRequest testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setBillingAddressOnCartSaga saga - saveToAccount : false', () => {
	const payload = {
		address : 'address',
		saveToAccount : false,
		fetchCart : 'fetchCart'
	};
	const iterator = saga.setBillingAddressOnCartSaga({payload});
	test('select GetAvailablePaymentMethodsReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getRssResultReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call _getCartId testing', () => {
		const resultCode = '1234';
		const actualYield = iterator.next({resultCode}).value;
		const expectedYield = call(_getCartId, false, false, isRxCheckoutPageType());
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const resultCode = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildSetBillingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, resultCode),
			payload.fetchCart ? (isRxCheckoutPageType() ? getGhostCartRequestSuccess : getCustomerCartRequestSuccess) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = null;
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getCustomerRequest testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('setAddressOnCartSagas saga ', () => {
	const iterator = setAddressOnCartSagas();
	test('get setAddressOnCartSagas -> setAddressOnCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(SET_SHIPPING_ADDRESS_ON_CART, saga.setAddressOnCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get setAddressOnCartSagas -> setBillingAddressOnCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(SET_BILLING_ADDRESS_ON_CART, saga.setBillingAddressOnCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
