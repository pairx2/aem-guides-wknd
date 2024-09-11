import {call, takeEvery} from 'redux-saga/effects';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {UPDATE_GHOST_ORDERS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/get_ghost_orders.action';
import {buildUpdateGhostOrdersSchema} from '../../../../../modules/MyAccount/schemas/update_ghost_orders.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_ghost_orders.saga';
import updateGhostOrdersSagas from '../../../../../modules/MyAccount/redux/sagas/update_ghost_orders.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateGhostOrdersSaga saga ', () => {
	const payload = {
		rxmc : '1234',
		status : 'status'
	};
	const iterator = saga.updateGhostOrdersSaga(payload);
	test('_getJwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(_getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(sagaDataHandling,
			Mutation,
			buildUpdateGhostOrdersSchema(payload));
		expect(expectedYield).toEqual(expectedYield);
		console.log(actualYield);
	});
});

describe('updateGhostOrdersSagas saga ', () => {
	const iterator = updateGhostOrdersSagas();
	test('get updateGhostOrdersSagas -> updateGhostOrdersSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_GHOST_ORDERS_REQUEST, saga.updateGhostOrdersSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
