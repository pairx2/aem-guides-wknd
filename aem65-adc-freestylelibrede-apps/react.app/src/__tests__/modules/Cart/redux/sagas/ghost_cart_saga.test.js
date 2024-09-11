import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {GET_GHOST_CART_ID_SCHEMA} from '../../../../../modules/Cart/schemas/get_ghost_cart_id.schema';
import {
	GET_GHOST_CART_ID_REQUEST,
	getGhostCartIdRequestFailure,
	getGhostCartIdRequestSuccess,
} from '../../../../../modules/Cart/redux/actions/ghost_cart.action';
import getGhostCartSagas from '../../../../../modules/Cart/redux/sagas/ghost_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/ghost_cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getGhostCartSaga saga ', () => {
	const iterator = saga.getGhostCartSaga();
	test('call sagaDataHandling testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(
			sagaDataHandling,
			Mutation,
			GET_GHOST_CART_ID_SCHEMA,
			getGhostCartIdRequestSuccess,
			getGhostCartIdRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('getGhostCartSagas saga ', () => {
	const iterator = getGhostCartSagas();
	test('get getGhostCartSagas -> getGhostCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_GHOST_CART_ID_REQUEST, saga.getGhostCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});