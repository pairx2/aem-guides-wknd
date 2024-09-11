import {call, put, takeEvery} from 'redux-saga/effects';
import {
	UPDATE_ADDRESS_REQUEST,
	UPDATE_ADDRESS_REQUEST_SUCCESS,
	updateAddressRequestFailure,
	updateAddressRequestSuccess
} from '../actions/update_address.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {getCustomerRequest} from '../../../MyAccount/redux/actions/customer.action';
import {buildCustomerAddressUpdateSchema} from '../../../MyAccount/schemas/customer_address_update.schema';
import {getCustomerCartRequest} from '../../../Cart/redux/actions/cart.action';

export function* updateAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildCustomerAddressUpdateSchema(payload.id, payload),
		updateAddressRequestSuccess,
		updateAddressRequestFailure
	);
}

export function* updateAddressRequestSuccessSaga() {
	yield put(getCustomerRequest());
	yield put(getCustomerCartRequest());
}

export default function* updateAddressSagas() {
	yield takeEvery(UPDATE_ADDRESS_REQUEST, updateAddressSaga);
	yield takeEvery(UPDATE_ADDRESS_REQUEST_SUCCESS, updateAddressRequestSuccessSaga);
}
