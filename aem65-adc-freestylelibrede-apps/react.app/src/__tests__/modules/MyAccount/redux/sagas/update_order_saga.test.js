import {call, takeEvery, put, select} from 'redux-saga/effects';
import {
	UPDATE_ORDER_REQUEST,
	updateOrderRequestSuccess,
	updateOrderRequestFailure,
	UPDATE_ORDER_REQUEST_SUCCESS
} from '../../../../../modules/MyAccount/redux/actions/update_order.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildUpdateOrderSchema} from '../../../../../modules/MyAccount/schemas/update_order.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_order.saga';
import updateOrderShippingAddressSagas from '../../../../../modules/MyAccount/redux/sagas/update_order.saga';
import {GET_ORDERS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/get_orders.action';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateOrderShippingAddressSaga saga ', () => {
	const payload = {};
	const iterator = saga.updateOrderShippingAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildUpdateOrderSchema(payload),
			updateOrderRequestSuccess,
			updateOrderRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updateOrderSuccessSaga saga - CPS ', () => {
	const iterator = saga.updateOrderSuccessSaga();
	test('OrderUpdateReducer', () => {
		const actualResult = iterator.next().value;
		const expectedResult = select(saga.OrderUpdateReducer);
		expect(actualResult).toEqual(expectedResult);
	});
	test('put GET_ORDERS_REQUEST', () => {
		const updatedOrderType = 'CPS';
		const actualToken = iterator.next(updatedOrderType).value;
		const expectedToken =  put({
			type: GET_ORDERS_REQUEST,
			payload: {
				timeDelay: true,
				orderHistoryType: 'CPS'
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updateOrderSuccessSaga saga - RX ', () => {
	const iterator = saga.updateOrderSuccessSaga();
	test('OrderUpdateReducer', () => {
		const actualResult = iterator.next().value;
		const expectedResult = select(saga.OrderUpdateReducer);
		expect(actualResult).toEqual(expectedResult);
	});
	test('put GET_ORDERS_REQUEST', () => {
		const updatedOrderType = 'Reimbursement';
		const actualToken = iterator.next(updatedOrderType).value;
		const expectedToken =  put({
			type: GET_ORDERS_REQUEST,
			payload: {
				timeDelay: true,
				orderHistoryType: 'CPS'
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updateOrderShippingAddressSagas saga ', () => {
	const iterator = updateOrderShippingAddressSagas();
	test('get updateOrderShippingAddressSagas -> updateOrderShippingAddressSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_ORDER_REQUEST, saga.updateOrderShippingAddressSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get updateOrderShippingAddressSagas -> updateOrderSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_ORDER_REQUEST_SUCCESS, saga.updateOrderSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});