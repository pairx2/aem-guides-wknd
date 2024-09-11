import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildCustomerAddressCreateSchema} from '../../schemas/customer_address_create.schema';
import {ADD_NEW_ADDRESS_REQUEST, getCustomerRequest} from '../actions/customer.action';
import {clearForm} from '../actions/form_pre_populate.action';

export function* addNewOrderAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildCustomerAddressCreateSchema(payload.newAddress),
		clearForm
	);
	yield put(getCustomerRequest());
}

export default function* addOrderAddressSaga() {
	yield takeEvery(ADD_NEW_ADDRESS_REQUEST, addNewOrderAddressSaga);
}