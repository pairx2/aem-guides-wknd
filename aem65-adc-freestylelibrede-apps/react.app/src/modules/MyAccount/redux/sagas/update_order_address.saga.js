import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildCustomerAddressUpdateSchema} from '../../schemas/customer_address_update.schema';
import {getCustomerRequest, UPDATE_ORDER_ADDRESS_REQUEST} from '../actions/customer.action';
import {hideEditForm} from '../actions/form_pre_populate.action';

export function* updateOrderAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildCustomerAddressUpdateSchema(payload.address_id, payload.addressFields),
		hideEditForm
	);
	yield put(getCustomerRequest());
}

export default function* updateOrderAddressSagas() {
	yield takeEvery(UPDATE_ORDER_ADDRESS_REQUEST, updateOrderAddressSaga);
}