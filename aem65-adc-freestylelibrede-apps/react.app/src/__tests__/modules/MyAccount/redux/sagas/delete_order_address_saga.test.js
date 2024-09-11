import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildDeleteOrderAddressSchema} from '../../../../../modules/MyAccount/schemas/delete_order_address.schema';
import {DELETE_ORDER_ADDRESS_REQUEST, getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {closeModalAction} from '../../../../../modules/Modal/redux/actions';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/delete_order_address.saga';
import deleteOrderAddressSagas from '../../../../../modules/MyAccount/redux/sagas/delete_order_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('deleteOrderAddressSaga saga ', () => {
	const payload = {
		'addressID' : '1234'
	};
	const iterator = saga.deleteOrderAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(sagaDataHandling,
			Mutation,
			buildDeleteOrderAddressSchema(payload.addressID),
			closeModalAction);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getCustomerRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('deleteOrderAddressSagas saga ', () => {
	const iterator = deleteOrderAddressSagas();
	test('get deleteOrderAddressSagas -> deleteOrderAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(DELETE_ORDER_ADDRESS_REQUEST, saga.deleteOrderAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});



