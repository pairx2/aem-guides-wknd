import {call, takeLatest} from 'redux-saga/effects';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {GET_GHOST_ORDERS_REQUEST, getGhostOrdersRequestSuccess, getGhostOrdersRequestFailure} from '../../../../../modules/MyAccount/redux/actions/get_ghost_orders.action';
import {buildGetGhostOrdersSchema} from '../../../../../modules/MyAccount/schemas/get_ghost_orders.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/get_ghost_orders.saga';
import getGhostOrdersSagas from '../../../../../modules/MyAccount/redux/sagas/get_ghost_orders.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getGhostOrdersSaga saga ', () => {
	const payload = {
		timeDelay: false
	};
	const iterator = saga.getGhostOrdersSaga({payload});
	test('_getJwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(_getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield =  call(sagaDataHandling,
			Query,
			buildGetGhostOrdersSchema(),
			getGhostOrdersRequestSuccess,
			getGhostOrdersRequestFailure);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getGhostOrdersSagas saga ', () => {
	const payload = {
		timeDelay: false
	};
	const iterator = getGhostOrdersSagas({payload});
	test('get getGhostOrdersSagas -> getGhostOrdersSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_GHOST_ORDERS_REQUEST, saga.getGhostOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('getGhostOrdersSaga saga ', () => {
	const payload = {
		timeDelay: true
	};
	const iterator = saga.getGhostOrdersSaga({payload});
	test('_getJwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(_getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call delay', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const delay = time => new Promise(resolve => setTimeout(resolve, time));
		const actualYield = iterator.next(token).value;
		const expectedYield =  call(delay, 1000);
		expect(JSON.stringify(actualYield)).toEqual(JSON.stringify(expectedYield));
	});
	test('call sagaDataHandling', () => {
		const delay = '1000';
		const actualYield = iterator.next(delay).value;
		const expectedYield =  call(sagaDataHandling,
			Query,
			buildGetGhostOrdersSchema(),
			getGhostOrdersRequestSuccess,
			getGhostOrdersRequestFailure);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getGhostOrdersSagas saga ', () => {
	const payload = {
		timeDelay: true
	};
	const iterator = getGhostOrdersSagas({payload});
	test('get getGhostOrdersSagas -> getGhostOrdersSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_GHOST_ORDERS_REQUEST, saga.getGhostOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
