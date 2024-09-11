import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess, MERGE_CART_REQUEST
} from '../../../../../modules/Cart/redux/actions/cart_id_action';
import {buildMergeCartSchema} from '../../../../../modules/Cart/schemas/merge_cart.schema';
import mergeCartSagas from '../../../../../modules/Cart/redux/sagas/merge_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/merge_cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('mergeCartSaga saga ', () => {
	const payload = {};
	const iterator = saga.mergeCartSaga({payload});
	test('call sagaDataHandling testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(
			sagaDataHandling,
			Mutation,
			buildMergeCartSchema(payload),
			getCustomerCartIdRequestSuccess,
			getCustomerCartIdRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('mergeCartSagas saga ', () => {
	const iterator = mergeCartSagas();
	test('get mergeCartSagas -> mergeCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(MERGE_CART_REQUEST, saga.mergeCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});