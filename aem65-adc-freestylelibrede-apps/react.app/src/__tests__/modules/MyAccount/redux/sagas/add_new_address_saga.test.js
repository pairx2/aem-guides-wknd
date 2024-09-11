import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildCustomerAddressCreateSchema} from '../../../../../modules/MyAccount/schemas/customer_address_create.schema';
import {ADD_NEW_ADDRESS_REQUEST, getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {clearForm} from '../../../../../modules/MyAccount/redux/actions/form_pre_populate.action';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/add_new_address.saga';
import addOrderAddressSaga from '../../../../../modules/MyAccount/redux/sagas/add_new_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('addNewOrderAddressSaga saga ', () => {
	const payload = {
		'newAddress' : 'New Address'
	};
	const iterator = saga.addNewOrderAddressSaga({payload});

	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildCustomerAddressCreateSchema(payload.newAddress),
			clearForm);
		expect(actualToken).toEqual(expectedToken);
	});
	test('put getCustomerRequest', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  put(getCustomerRequest());
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('addNewOrderAddressSaga saga ', () => {
	const iterator = addOrderAddressSaga();
	test('get addOrderAddressSaga -> addNewOrderAddressSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(ADD_NEW_ADDRESS_REQUEST, saga.addNewOrderAddressSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});

