import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildSetOrderAddressSchema} from '../../schemas/set_order_address.schema';
import {getCustomerRequest, SET_ORDER_ADDRESS_REQUEST} from '../actions/customer.action';

export function* setOrderAddressSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildSetOrderAddressSchema(payload.addressID, payload.shipping, payload.billing),
	);
	yield put(getCustomerRequest());
}

export default function* setOrderAddressSagas() {
	yield takeEvery(SET_ORDER_ADDRESS_REQUEST, setOrderAddressSaga);
}