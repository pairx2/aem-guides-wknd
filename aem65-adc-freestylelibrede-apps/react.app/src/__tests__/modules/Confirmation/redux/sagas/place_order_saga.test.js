import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	placeOrderFailure,
	placeOrderSuccess
} from '../../../../../modules/Confirmation/redux/actions/place_order.action';
import {Mutation} from '../../../../../api/graphql.config';
import {
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess
} from '../../../../../modules/Cart/redux/actions/cart_id_action';
import {getCustomerCartRequest} from '../../../../../modules/Cart/redux/actions/cart.action';
import {closeModalAction} from '../../../../../modules/Modal/redux/actions';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {buildPlaceOrderSchema} from '../../../../../modules/Confirmation/schemas/place_order.schema';
import {getGhostCartIdRequestSuccess} from '../../../../../modules/Cart/redux/actions/ghost_cart.action';
import * as saga from '../../../../../modules/Confirmation/redux/sagas/place_order.saga';
import PlaceOrderRequestSagas from '../../../../../modules/Confirmation/redux/sagas/place_order.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateOrderAddressSaga saga ', () => {
	const cartId = '123';
	const paymentId = '123';
	const isSavedPayment = 'true';
	const iterator = saga.placeOrder(cartId, paymentId, isSavedPayment);

	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildPlaceOrderSchema(cartId, paymentId, isSavedPayment),
			placeOrderSuccess,
			placeOrderFailure);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateOrderAddressSaga saga ', () => {
	const payload = {
		isReimbursementOrder : 'ghost cart id',
		paymentId : '123',
		isSavedPayment : 'true',
		orderId : '456'
	};
	const data = {};
	const iterator = saga.PlaceOrderRequestSaga({payload});
	test('call _getCartId', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(_getCartId,false, false, payload.isReimbursementOrder);
		expect(actualYield).toEqual(expectedYield);
	});

	test('put getGhostCartIdRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(getGhostCartIdRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});

	test('call placeOrder', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(saga.placeOrder, undefined, payload.paymentId, payload.isSavedPayment, payload.orderId);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('updateOrderAddressSaga saga ', () => {
	const payload = {
		paymentId : '123'
	};
	const data = {};
	const iterator = saga.PlaceOrderRequestSaga({payload});
	test('put getCustomerCartIdRequestSuccess', () => {
		iterator.next();
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(getCustomerCartIdRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateOrderAddressSaga saga ', () => {
	const payload = {
		paymentId : '123'
	};
	const response = {
		error : undefined,
		cartId : '123'
	};
	const iterator = saga.PlaceOrderRequestSaga({payload});
	test('put getCustomerCartIdRequestFailure', () => {
		iterator.next();
		const actualYield = iterator.next({response}).value;
		const expectedYield =  put(getCustomerCartIdRequestFailure(response.error));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('PlaceOrderSuccess saga ', () => {

	const iterator = saga.PlaceOrderSuccess();
	test('put getCustomerCartRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerCartRequest({forceNewCustomerCartId: true}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put closeModalAction', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(closeModalAction());
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('PlaceOrderRequestSagas saga ', () => {
	const iterator = PlaceOrderRequestSagas();
	test('get PlaceOrderRequestSagas -> PlaceOrderRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(PLACE_ORDER_REQUEST, saga.PlaceOrderRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get PlaceOrderRequestSagas -> PlaceOrderSuccess', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(PLACE_ORDER_SUCCESS, saga.PlaceOrderSuccess);
		expect(actualYield).toEqual(expectedYield);
	});
});