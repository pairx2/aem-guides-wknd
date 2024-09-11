import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildSetOrderAddressSchema} from '../../../../../modules/MyAccount/schemas/set_order_address.schema';
import {getCustomerRequest, SET_ORDER_ADDRESS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/set_order_address.saga';
import setOrderAddressSagas from '../../../../../modules/MyAccount/redux/sagas/set_order_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');


describe('setOrderAddressSaga saga ', () => {
	const payload = {
		addressID : '1234',
		shipping : 'shipping',
		billing : 'billing'
	};
	const iterator = saga.setOrderAddressSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildSetOrderAddressSchema(payload.addressID, payload.shipping, payload.billing));
		expect(actualToken).toEqual(expectedToken);
	});
	test('put getCustomerRequest', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  put(getCustomerRequest());
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('setOrderAddressSagas saga ', () => {
	const iterator = setOrderAddressSagas();
	test('get setOrderAddressSagas -> setOrderAddressSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(SET_ORDER_ADDRESS_REQUEST, saga.setOrderAddressSaga);
		expect(actualToken).toEqual(expectedToken);
	});

});



