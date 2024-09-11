import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildUpdateCustomerPermissionsSchema} from '../../schemas/update_customer_permissions.schema';
import {UPDATE_CUSTOMER_PERMISSIONS_REQUEST, updateCustomerPermissionSuccess, updateCustomerPermissionFailure, getCustomerPermissionRequest} from '../actions/customer.action';

export function* updateCustomerPermissionSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateCustomerPermissionsSchema(payload),
		updateCustomerPermissionSuccess,
		updateCustomerPermissionFailure
	);
	yield put(getCustomerPermissionRequest());
}

export default function* updateCustomerPermissionSagas() {
	yield takeEvery(UPDATE_CUSTOMER_PERMISSIONS_REQUEST, updateCustomerPermissionSaga);
}