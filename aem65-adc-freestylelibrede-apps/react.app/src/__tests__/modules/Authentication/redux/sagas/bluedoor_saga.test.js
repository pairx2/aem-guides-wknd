import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildBluedoorCustomerSchema} from '../../../../../modules/Authentication/redux/schemas/bluedoor.schema';
import {GET_BLUEDOOR_CUSTOMER_REQUEST, getBluedoorCustomerRequestSuccess, getBluedoorCustomerRequestFailure} from '../../../../../modules/Authentication/redux/actions/bluedoor.action';
import * as saga from '../../../../../modules/Authentication/redux/sagas/bluedoor.saga';
import bluedoorCustomerSagas from '../../../../../modules/Authentication/redux/sagas/bluedoor.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('bluedoorCustomerSaga saga ', () => {
	const payload = {
		rxmc : 'rxmc',
		health_insurance_number : '12345678'
	};
	const iterator = saga.bluedoorCustomerSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildBluedoorCustomerSchema(payload.rxmc, payload.health_insurance_number),
			getBluedoorCustomerRequestSuccess,
			getBluedoorCustomerRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('bluedoorCustomerSagas saga ', () => {
	const iterator = bluedoorCustomerSagas();
	test('get bluedoorCustomerSagas -> bluedoorCustomerSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(GET_BLUEDOOR_CUSTOMER_REQUEST, saga.bluedoorCustomerSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});
