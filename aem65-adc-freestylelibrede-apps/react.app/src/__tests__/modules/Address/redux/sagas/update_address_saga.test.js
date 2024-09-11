import {call, put, takeEvery} from 'redux-saga/effects';
import {
	UPDATE_ADDRESS_REQUEST,
	UPDATE_ADDRESS_REQUEST_SUCCESS,
	updateAddressRequestFailure,
	updateAddressRequestSuccess
} from '../../../../../modules/Address/redux/actions/update_address.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {getCustomerRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {buildCustomerAddressUpdateSchema} from '../../../../../modules/MyAccount/schemas/customer_address_update.schema';
import {getCustomerCartRequest} from '../../../../../modules/Cart/redux/actions/cart.action';
import * as saga from '../../../../../modules/Address/redux/sagas/update_address.saga';
import updateAddressSagas from '../../../../../modules/Address/redux/sagas/update_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');


describe('updateAddressSaga saga ', () => {
	const payload = {
		id : '1234'
	};
	const iterator = saga.updateAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildCustomerAddressUpdateSchema(payload.id, payload),
			updateAddressRequestSuccess,
			updateAddressRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateAddressRequestSuccessSaga saga ', () => {
	const iterator = saga.updateAddressRequestSuccessSaga();
	test('put getCustomerRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getCustomerCartRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerCartRequest());
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateAddressSagas saga ', () => {
	const iterator = updateAddressSagas();
	test('get updateAddressSagas -> updateAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_ADDRESS_REQUEST, saga.updateAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get updateAddressSagas -> updateAddressRequestSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_ADDRESS_REQUEST_SUCCESS, saga.updateAddressRequestSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});