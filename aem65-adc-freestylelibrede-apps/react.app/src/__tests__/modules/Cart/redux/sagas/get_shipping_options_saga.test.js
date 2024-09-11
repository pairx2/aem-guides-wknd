import {call, put, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {buildGetShippingOptionsSchema} from '../../../../../modules/Cart/schemas/get_shipping_options_schema';
import {
	getCustomerCartIdRequestFailure,
} from '../../../../../modules/Cart/redux/actions/cart_id_action';
import {
	GET_SHIPPING_OPTIONS_REQUEST,
	getShippingOptionsRequestFailure,
	getShippingOptionsRequestSuccess
} from '../../../../../modules/Cart/redux/actions/shipping_options_action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import getShippingOptionsSagas from '../../../../../modules/Cart/redux/sagas/get_shipping_options.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/get_shipping_options.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('getShippingOptionsDetails saga ', () => {
	const cartId = '1234';
	const iterator = saga.getShippingOptionsDetails(cartId);
	test('call sagaDataHandling testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(
			sagaDataHandling,
			Query,
			buildGetShippingOptionsSchema(cartId),
			getShippingOptionsRequestSuccess,
			getShippingOptionsRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('getShippingOptionsSaga saga if block', () => {
	const iterator = saga.getShippingOptionsSaga();
	const cartId = '1234';
	const data = {};
	test('call _getCartId testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getCartId);
		expect(actualToken).toEqual(expectedToken);
	});
	test('call getShippingOptionsDetails testing', () => {
		const actualToken = iterator.next({data, cartId}).value;
		const expectedToken = call(saga.getShippingOptionsDetails, cartId);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('getShippingOptionsSaga saga else block', () => {
	const iterator = saga.getShippingOptionsSaga();
	const error = {};
	iterator.next();
	test('put getCustomerCartIdRequestFailure testing', () => {
		const actualToken = iterator.next({error}).value;
		const expectedToken = put(getCustomerCartIdRequestFailure(error));
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('getShippingOptionsSagas saga ', () => {
	const iterator = getShippingOptionsSagas();
	test('get getShippingOptionsSagas -> getShippingOptionsSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_SHIPPING_OPTIONS_REQUEST, saga.getShippingOptionsSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
