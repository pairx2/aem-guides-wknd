import {call, takeLeading, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildAddProductSchema} from '../../../../../modules/Cart/schemas/add_product.schema';
import {
	ADD_MULTIPLE_PRODUCTS_REQUEST,
	ADD_PRODUCT_REQUEST,
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	ADD_SUBSCRIPTION_REQUEST
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {buildAddMultipleProductsSchema} from '../../../../../modules/Cart/schemas/add_multiple_products_schema';
import {buildAddSubscriptionSchema} from '../../../../../modules/Cart/schemas/add_subscription.schema';
import addProductSagas from '../../../../../modules/Cart/redux/sagas/add_product.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/add_product.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');
jest.mock('../../../../../utils/dateUtils.js');
jest.mock('../../../../../modules/Cart/schemas/add_multiple_products_schema.js');

describe('addProductSaga saga ', () => {
	const payload = {
		startDate : '10/10/2010',
		sku : 'sku',
		qty : 4
	};
	const iterator = saga.addProductSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const formattedDate = undefined;
		const actualYield = iterator.next({cartId, formattedDate}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildAddProductSchema(cartId, payload.sku, payload.qty, formattedDate),
			getCustomerCartRequestSuccess,
			getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('addMultipleProductSaga saga ', () => {
	const payload = {
		products : 'products'
	};
	const iterator = saga.addMultipleProductSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildAddMultipleProductsSchema(cartId, payload.products),
			getCustomerCartRequestSuccess,
			getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('addSubscriptionSaga saga ', () => {
	const payload = {
		startDate : '10/10/2010',
		sku : 'sku',
		qty : 4,
		bundleId : 'bundleId',
		optionId : 'optionId'
	};
	const iterator = saga.addSubscriptionSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const formattedDate = undefined;
		const actualYield = iterator.next({cartId, formattedDate}).value;
		const expectedYield =call(
			sagaDataHandling,
			Mutation,
			buildAddSubscriptionSchema(cartId, payload.sku, payload.qty, formattedDate, payload.bundleId, payload.optionId),
			getCustomerCartRequestSuccess,
			getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('addProductSagas saga ', () => {
	const iterator = addProductSagas();
	test('get addProductSagas -> addProductSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLeading(ADD_PRODUCT_REQUEST, saga.addProductSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get addProductSagas -> addMultipleProductSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(ADD_MULTIPLE_PRODUCTS_REQUEST, saga.addMultipleProductSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get addProductSagas -> addSubscriptionSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLeading(ADD_SUBSCRIPTION_REQUEST, saga.addSubscriptionSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});


