import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {GET_CUSTOMER_CART_ID_SCHEMA} from '../../../../../modules/Cart/schemas/get_cart_id.schema';
import {
	GET_CUSTOMER_CART_ID_REQUEST,
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess
} from '../../../../../modules/Cart/redux/actions/cart_id_action';
import getCustomerCartIdSagas from '../../../../../modules/Cart/redux/sagas/cart_id.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/cart_id.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('getCustomerCartIdSaga saga ', () => {
	const iterator = saga.getCustomerCartIdSaga();
	test('call sagaDataHandling testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield =call(
			sagaDataHandling,
			Mutation,
			GET_CUSTOMER_CART_ID_SCHEMA,
			getCustomerCartIdRequestSuccess,
			getCustomerCartIdRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getCustomerCartIdSagas saga ', () => {
	const iterator = getCustomerCartIdSagas();
	test('get getCustomerCartIdSagas -> getCustomerCartIdSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_CUSTOMER_CART_ID_REQUEST, saga.getCustomerCartIdSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});