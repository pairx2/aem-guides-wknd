import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Query} from '../../../../api/graphql.config';
import {buildGetCustomerPermissionsSchema} from '../../schemas/get_customer_permissions.schema';
import {GET_CUSTOMER_PERMISSIONS_REQUEST, getCustomerPermissionRequestSuccess, getCustomerPermissionRequestFailure} from '../actions/customer.action';

export function* getCustomerPermissionSaga() {
	yield call(
		sagaDataHandling,
		Query,
		buildGetCustomerPermissionsSchema(),
		getCustomerPermissionRequestSuccess,
		getCustomerPermissionRequestFailure
	);
}

export default function* getCustomerPermissionSagas() {
	yield takeLatest(GET_CUSTOMER_PERMISSIONS_REQUEST, getCustomerPermissionSaga);
}