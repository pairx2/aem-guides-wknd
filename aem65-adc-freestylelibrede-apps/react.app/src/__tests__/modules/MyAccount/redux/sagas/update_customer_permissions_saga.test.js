import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildUpdateCustomerPermissionsSchema} from '../../../../../modules/MyAccount/schemas/update_customer_permissions.schema';
import {UPDATE_CUSTOMER_PERMISSIONS_REQUEST, updateCustomerPermissionSuccess, updateCustomerPermissionFailure, getCustomerPermissionRequest} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_customer_permissions.saga';
import updateCustomerPermissionSagas from '../../../../../modules/MyAccount/redux/sagas/update_customer_permissions.saga';
jest.mock('../../../../../utils/endpointUrl.js');


describe('updateCustomerPermissionSaga saga ', () => {
	const payload = {};
	const iterator = saga.updateCustomerPermissionSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(sagaDataHandling,
			Mutation,
			buildUpdateCustomerPermissionsSchema(payload),
			updateCustomerPermissionSuccess,
			updateCustomerPermissionFailure);
		expect(actualToken).toEqual(expectedToken);
	});
	test('put getCustomerPermissionRequest', () => {

		const actualToken = iterator.next().value;
		const expectedToken =  put(getCustomerPermissionRequest());
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateCustomerPermissionSagas saga ', () => {
	const iterator = updateCustomerPermissionSagas();
	test('get updateCustomerPermissionSagas -> updateCustomerPermissionSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_CUSTOMER_PERMISSIONS_REQUEST, saga.updateCustomerPermissionSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});