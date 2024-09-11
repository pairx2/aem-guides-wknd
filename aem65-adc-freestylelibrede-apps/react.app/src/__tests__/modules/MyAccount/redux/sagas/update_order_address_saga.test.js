import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildCustomerAddressUpdateSchema} from '../../../../../modules/MyAccount/schemas/customer_address_update.schema';
import {getCustomerRequest, UPDATE_ORDER_ADDRESS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {hideEditForm} from '../../../../../modules/MyAccount/redux/actions/form_pre_populate.action';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_order_address.saga';
import updateOrderAddressSagas from '../../../../../modules/MyAccount/redux/sagas/update_order_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateOrderAddressSaga saga ', () => {
	const payload = {
		address_id : '1234',
		addressFields : 'addressFields'
	};
	const iterator = saga.updateOrderAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(sagaDataHandling,
			Mutation,
			buildCustomerAddressUpdateSchema(payload.address_id, payload.addressFields),
			hideEditForm);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getCustomerRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerRequest());
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateOrderAddressSagas saga ', () => {
	const iterator = updateOrderAddressSagas();
	test('get updateOrderAddressSagas -> updateOrderAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_ORDER_ADDRESS_REQUEST, saga.updateOrderAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});