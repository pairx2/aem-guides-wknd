import {call, put, takeEvery, select, takeLatest} from 'redux-saga/effects';
import {
	GET_ORDER_RETURN_REQUEST,
	getOrderReturnRequestSuccess,
	getOrderReturnRequestFailure,
	GET_ORDER_RETURN_RMA_DETAILS_REQUEST,
	getOrderReturnRequestRmaDetailsSuccess,
	getOrderReturnRequestRmaDetailsFailure
} from '../../../../../modules/MyAccount/redux/actions/orders.action';
import {getOrderReturnId, getOrderReturnRmaDetails} from '../../../../../modules/MyAccount/api/order_return.api';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import getOrderReturnSagas from '../../../../../modules/MyAccount/redux/sagas/order_return.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/order_return.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getOrderReturnSaga saga ', () => {
	const payload = {};
	const iterator = saga.getOrderReturnSaga({payload});
	test('jwtToken testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('getOrderReturnId testing', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(getOrderReturnId, payload, token);
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRequestSuccess testing in try -> if block', () => {
		const data = {
			message : 'getOrderReturnRequestSuccess'
		};
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getOrderReturnRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRequestSuccess testing in try -> if block', () => {
		const data = {};
		const actualYield = iterator.next({data}).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrderReturnSaga saga in catch block', () => {
	const payload = {};
	const iterator = saga.getOrderReturnSaga({payload});
	const response = 'error';
	test('getOrdersSagas testing', () => {
		iterator.next();
		expect(
			iterator.throw(response).value).
			toEqual(put(getOrderReturnRequestFailure(response)));
	});

});

// getOrderReturnRmaDetailsSaga

describe('getOrderReturnRmaDetailsSaga saga - success ', () => {
	const payload = {
		order_number : 4,
		return_id : 2
	};
	const iterator = saga.getOrderReturnRmaDetailsSaga({payload});
	test('OrderReturnReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.OrderReturnReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getDictionary', () => {
		const customerReturnInfo = {
			orderId : {
				returnReceipt : false
			}
		};
		const actualResult = iterator.next(customerReturnInfo).value;
		const expectedResult = select(saga.getDictionary);
		expect(actualResult).toEqual(expectedResult);
	});
	test('_getJwtToken testing', () => {
		const customerReturnInfo = {
			orderId : {
				returnReceipt : false
			}
		};
		const expectedYield = call(_getJwtToken);
		const actualYield = iterator.next(customerReturnInfo).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRmaDetails testing in if -> try block', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield = call(getOrderReturnRmaDetails, payload, token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRequestRmaDetailsSuccess testing in if -> try -> if block', () => {
		const data = {
			CS_RMA_Label__c : 'CS_RMA_Label__c'
		};
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getOrderReturnRequestRmaDetailsSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getOrderReturnRmaDetailsSaga saga - failure', () => {
	const payload = {
		order_number : 4,
		return_id : 2
	};
	const iterator = saga.getOrderReturnRmaDetailsSaga({payload});
	test('OrderReturnReducer testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.OrderReturnReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getDictionary', () => {
		const customerReturnInfo = {};
		const actualResult = iterator.next(customerReturnInfo).value;
		const expectedResult = select(saga.getDictionary);
		expect(actualResult).toEqual(expectedResult);
	});
	test('_getJwtToken testing', () => {
		const customerReturnInfo = {};
		const expectedYield = call(_getJwtToken);
		const actualYield = iterator.next(customerReturnInfo).value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRmaDetails testing in if -> catch', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield = call(getOrderReturnRmaDetails, payload, token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('getOrderReturnRequestRmaDetailsFailure testing in catch', () => {
		const data = 'error';
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getOrderReturnRequestRmaDetailsFailure(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getOrdersSagas saga takeLeading & takeEvery calls', () => {
	const iterator = getOrderReturnSagas();
	test('get getOrderReturnSagas -> GET_ORDER_RETURN_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_ORDER_RETURN_REQUEST, saga.getOrderReturnSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getOrderReturnSagas -> GET_ORDER_RETURN_RMA_DETAILS_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_ORDER_RETURN_RMA_DETAILS_REQUEST, saga.getOrderReturnRmaDetailsSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
