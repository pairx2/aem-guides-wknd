import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {getCustomerRequest} from '../../../MyAccount/redux/actions/customer.action';
import {
	CREATE_ADDRESS_REQUEST,
	CREATE_ADDRESS_REQUEST_SUCCESS,
	createAddressRequestFailure,
	createAddressRequestSuccess
} from '../actions/create_address.action';
import {buildCustomerAddressCreateSchema} from '../../../MyAccount/schemas/customer_address_create.schema';

export function* createAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildCustomerAddressCreateSchema(payload),
		createAddressRequestSuccess,
		createAddressRequestFailure
	);
}

export function* createAddressRequestSuccessSaga() {
	yield put(getCustomerRequest());
}

export default function* createAddressSagas() {
	yield takeEvery(CREATE_ADDRESS_REQUEST, createAddressSaga);
	yield takeEvery(CREATE_ADDRESS_REQUEST_SUCCESS, createAddressRequestSuccessSaga);
}
