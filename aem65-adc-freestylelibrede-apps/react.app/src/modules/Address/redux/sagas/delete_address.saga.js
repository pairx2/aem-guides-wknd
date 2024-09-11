import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {getCustomerRequest} from '../../../MyAccount/redux/actions/customer.action';
import {
	DELETE_ADDRESS_REQUEST,
	DELETE_ADDRESS_REQUEST_SUCCESS,
	deleteAddressRequestFailure, deleteAddressRequestSuccess
} from '../actions/delete_address.action';
import {buildCustomerAddressDeleteSchema} from '../../../MyAccount/schemas/customer_address_delete.schema';
import {closeModalAction} from '../../../Modal/redux/actions';

export function* deleteAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildCustomerAddressDeleteSchema(payload),
		deleteAddressRequestSuccess,
		deleteAddressRequestFailure
	);
}

export function* deleteAddressRequestSuccessSaga() {
	yield put(getCustomerRequest());
	yield put(closeModalAction());
}

export default function* deleteAddressSagas() {
	yield takeEvery(DELETE_ADDRESS_REQUEST, deleteAddressSaga);
	yield takeEvery(DELETE_ADDRESS_REQUEST_SUCCESS, deleteAddressRequestSuccessSaga);
}
