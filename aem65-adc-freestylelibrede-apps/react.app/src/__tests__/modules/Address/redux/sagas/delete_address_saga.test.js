import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {
	DELETE_ADDRESS_REQUEST,
	DELETE_ADDRESS_REQUEST_SUCCESS,
	deleteAddressRequestFailure, deleteAddressRequestSuccess
} from '../../../../../modules/Address/redux/actions/delete_address.action';
import {buildCustomerAddressDeleteSchema} from '../../../../../modules/MyAccount/schemas/customer_address_delete.schema';
import {closeModalAction} from '../../../../../modules/Modal/redux/actions';
import * as saga from '../../../../../modules/Address/redux/sagas/delete_address.saga';
import deleteAddressSagas from '../../../../../modules/Address/redux/sagas/delete_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('deleteAddressSaga saga ', () => {
	const payload = {};
	const iterator = saga.deleteAddressSaga({payload});

	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildCustomerAddressDeleteSchema(payload),
			deleteAddressRequestSuccess,
			deleteAddressRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('deleteAddressRequestSuccessSaga saga ', () => {

	const iterator = saga.deleteAddressRequestSuccessSaga();
	test('put getCustomerRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
	test('put closeModalAction', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(closeModalAction());
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('deleteAddressSagas saga ', () => {

	const iterator = deleteAddressSagas();
	test('get deleteAddressSagas -> deleteAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(DELETE_ADDRESS_REQUEST, saga.deleteAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get deleteAddressSagas -> createAddressRequestSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(DELETE_ADDRESS_REQUEST_SUCCESS, saga.deleteAddressRequestSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});

});
