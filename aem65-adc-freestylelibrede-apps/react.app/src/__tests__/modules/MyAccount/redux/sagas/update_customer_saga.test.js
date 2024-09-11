import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {
	getCustomerRequestFailure,
	getCustomerRequestSuccess,
	UPDATE_CUSTOMER_REQUEST, UPDATE_INSURANCE_REQUEST
} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import {buildUpdateCustomerSchema} from '../../../../../modules/MyAccount/schemas/update_customer.schema';
import {buildUpdateInsuranceSchema} from '../../../../../modules/MyAccount/schemas/update_insurance.schema';
import {dottedToDashed} from '../../../../../utils/dateUtils';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_customer.saga';
import updateCustomerSagas from '../../../../../modules/MyAccount/redux/sagas/update_customer.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateCustomerSaga saga ', () => {
	const payload = {
		dob : '11/11/1999',
		landline_phone : '',
		prevMobible : '',
		temporary_mobile_number : '',
	};
	const iterator = saga.updateCustomerSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildUpdateCustomerSchema({
				...payload,
				dob: dottedToDashed(payload.dob),
			}),
			getCustomerRequestSuccess,
			getCustomerRequestFailure);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateInsuranceRequest saga ', () => {
	const payload = {
		dob : '11/11/1999'
	};
	const iterator = saga.updateInsuranceRequest({payload});
	test('call sagaDataHandling', () => {
		payload.dob = dottedToDashed(payload.dob);
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildUpdateInsuranceSchema(payload),
			getCustomerRequestSuccess,
			getCustomerRequestFailure);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateCustomerSagas saga ', () => {
	const iterator = updateCustomerSagas();
	test('get updateCustomerSagas -> updateCustomerSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_CUSTOMER_REQUEST, saga.updateCustomerSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get updateCustomerSagas -> updateInsuranceRequest', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_INSURANCE_REQUEST, saga.updateInsuranceRequest);
		expect(actualToken).toEqual(expectedToken);
	});
});