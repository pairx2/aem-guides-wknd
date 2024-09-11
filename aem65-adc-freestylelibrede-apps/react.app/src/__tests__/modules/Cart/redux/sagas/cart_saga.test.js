import {call, put, select, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {buildGetCustomerCartSchema} from '../../../../../modules/Cart/schemas/get_cart.schema';
import {
	GET_CUSTOMER_CART_REQUEST,
	getCustomerCartRequest,
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	RETRY_GET_CUSTOMER_CART_REQUEST,
	retryGetCustomerCartRequest,
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {GET_CUSTOMER_CART_ID_SCHEMA} from '../../../../../modules/Cart/schemas/get_cart_id.schema';
import {Mutation} from '../../../../../api/graphql.config';
import {getCustomerCartIdRequestSuccess,
	getCustomerCartIdRequestFailure,
	setCustomerCartId
} from '../../../../../modules/Cart/redux/actions/cart_id_action';
import {getJwtToken} from '../../../../../api/authentication.service';
import {getGhostCartRequestSuccess} from '../../../../../modules/Cart/redux/actions/ghost_cart.action';
import getCustomerCartSagas from '../../../../../modules/Cart/redux/sagas/cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('getCustomerCartSaga saga ', () => {
	const payload = {
		forceCustomerCart : 'forceCustomerCart',
		forceNewCustomerCartId : 'forceNewCustomerCartId',
		forceRxCart : 'forceRxCart',
		localCartIdCleared : 'localCartIdCleared'
	};
	const iterator = saga.getCustomerCartSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(saga._getCartId, payload && payload.forceCustomerCart, payload && payload.forceNewCustomerCartId, payload && payload.forceRxCart);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const cartType = 'cartType';
		const actualYield = iterator.next({cartId, cartType}).value;
		const expectedYield =call(saga.getCustomerCartDetails, {
			cartId: cartId,
			localCartIdCleared: payload && payload.localCartIdCleared || false,
			cartType: cartType
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getCustomerCartSaga saga ', () => {
	const payload = {
		forceCustomerCart : 'forceCustomerCart',
		forceNewCustomerCartId : 'forceNewCustomerCartId',
		forceRxCart : 'forceRxCart',
		localCartIdCleared : 'localCartIdCleared'
	};
	const iterator = saga.getCustomerCartSaga({payload});
	iterator.next();
	test('put getCustomerCartIdRequestFailure testing', () => {
		const error = 'error';
		const actualYield = iterator.next({error}).value;
		const expectedYield = put(getCustomerCartIdRequestFailure(error));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('retryGetCustomerCartSaga saga ', () => {
	const iterator = saga.retryGetCustomerCartSaga();
	test('put setCustomerCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(setCustomerCartId(null));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getCustomerCartRequest testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(getCustomerCartRequest({
			localCartIdCleared: true
		}));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getCustomerCartDetails saga ', () => {
	const payload = {
		cartId : undefined,
		localCartIdCleared : undefined,
		cartType : 'cartType'
	};
	const iterator = saga.getCustomerCartDetails({payload});
	test('call sagaDataHandling testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Query,
			buildGetCustomerCartSchema(payload.cartId),
			payload.cartType === saga.CART_TYPE.NORMAL ? getCustomerCartRequestSuccess : getGhostCartRequestSuccess,
			payload.localCartIdCleared ? getCustomerCartRequestFailure : retryGetCustomerCartRequest
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getJwtToken saga ', () => {
	const iterator = saga._getJwtToken();
	test('call sagaDataHandling testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('_getCartId saga ', () => {
	const forceCustomerCart = 'forceCustomerCart';
	const forceNewCustomerCartId = 'forceNewCustomerCartId';
	const forceRxCart = true;
	const iterator = saga._getCartId(forceCustomerCart, forceNewCustomerCartId, forceRxCart);
	test('call _getJwtToken testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(saga._getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('select getGhostCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getGhostCartId);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('_getCartId saga else block -> if', () => {
	const forceCustomerCart = 'forceCustomerCart';
	const forceNewCustomerCartId = 'forceNewCustomerCartId';
	const forceRxCart = false;
	const iterator = saga._getCartId(forceCustomerCart, forceNewCustomerCartId, forceRxCart);
	iterator.next();
	test('select getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call Mutation testing', () => {
		const jwtToken = undefined;
		const actualYield = iterator.next(jwtToken).value;
		const expectedYield = call(Mutation, GET_CUSTOMER_CART_ID_SCHEMA, jwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getCustomerCartIdRequestSuccess testing', () => {
		const data = {};
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getCustomerCartIdRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getCustomerCartSagas saga ', () => {
	const iterator = getCustomerCartSagas();
	test('get getCustomerCartSagas -> getCustomerCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_CUSTOMER_CART_REQUEST, saga.getCustomerCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getCustomerCartSagas -> retryGetCustomerCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(RETRY_GET_CUSTOMER_CART_REQUEST, saga.retryGetCustomerCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
