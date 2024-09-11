import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {buildGetCustomerPermissionsSchema} from '../../../../../modules/MyAccount/schemas/get_customer_permissions.schema';
import {GET_CUSTOMER_PERMISSIONS_REQUEST, getCustomerPermissionRequestSuccess, getCustomerPermissionRequestFailure} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import getCustomerPermissionSagas from '../../../../../modules/MyAccount/redux/sagas/get_customer_permissions.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/get_customer_permissions.saga';

jest.mock('../../../../../utils/endpointUrl.js');

describe('getCustomerPermissionSaga saga ', () => {
	const iterator = saga.getCustomerPermissionSaga();
	test('getCustomerPermissionSaga testing', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(sagaDataHandling,
			Query,
			buildGetCustomerPermissionsSchema(),
			getCustomerPermissionRequestSuccess,
			getCustomerPermissionRequestFailure);
		expect(actualToken).toEqual(expectedToken);
	});

	describe('getCustomerPermissionSagas saga takeLatest calls', () => {
		const iterator = getCustomerPermissionSagas();
		test('get getCustomerPermissionSagas -> GET_CUSTOMER_PERMISSIONS_REQUEST', () => {
			const actualToken = iterator.next().value;
			const expectedToken = takeLatest(GET_CUSTOMER_PERMISSIONS_REQUEST, saga.getCustomerPermissionSaga);
			expect(actualToken).toEqual(expectedToken);
		});
	});
});