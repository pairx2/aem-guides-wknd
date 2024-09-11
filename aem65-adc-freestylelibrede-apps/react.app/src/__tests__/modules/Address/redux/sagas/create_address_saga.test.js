import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {
	CREATE_ADDRESS_REQUEST,
	CREATE_ADDRESS_REQUEST_SUCCESS,
	createAddressRequestFailure,
	createAddressRequestSuccess
} from '../../../../../modules/Address/redux/actions/create_address.action';
import {buildCustomerAddressCreateSchema} from '../../../../../modules/MyAccount/schemas/customer_address_create.schema';
import * as saga from '../../../../../modules/Address/redux/sagas/create_address.saga';
import createAddressSagas from '../../../../../modules/Address/redux/sagas/create_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('createAddressSaga saga ', () => {

	const payload = {};
	const iterator = saga.createAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildCustomerAddressCreateSchema(payload),
			createAddressRequestSuccess,
			createAddressRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('createAddressRequestSuccessSaga saga ', () => {

	const iterator = saga.createAddressRequestSuccessSaga();
	test('put getCustomerRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('createAddressSagas saga ', () => {

	const iterator = createAddressSagas();
	test('get createAddressSagas -> createAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(CREATE_ADDRESS_REQUEST, saga.createAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});

	test('get createAddressSagas -> createAddressRequestSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(CREATE_ADDRESS_REQUEST_SUCCESS, saga.createAddressRequestSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});

});
