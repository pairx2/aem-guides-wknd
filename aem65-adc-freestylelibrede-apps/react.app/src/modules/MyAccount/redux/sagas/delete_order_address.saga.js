import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildDeleteOrderAddressSchema} from '../../schemas/delete_order_address.schema';
import {DELETE_ORDER_ADDRESS_REQUEST, getCustomerRequest} from '../actions/customer.action';
import {closeModalAction} from '../../../Modal/redux/actions';

export function* deleteOrderAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildDeleteOrderAddressSchema(payload.addressID),
		closeModalAction
	);
	yield put(getCustomerRequest());
}

export default function* deleteOrderAddressSagas() {
	yield takeEvery(DELETE_ORDER_ADDRESS_REQUEST, deleteOrderAddressSaga);
}