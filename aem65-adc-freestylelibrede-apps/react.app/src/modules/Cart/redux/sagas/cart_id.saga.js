import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {GET_CUSTOMER_CART_ID_SCHEMA} from '../../schemas/get_cart_id.schema';
import {
	GET_CUSTOMER_CART_ID_REQUEST,
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess
} from '../actions/cart_id_action';

export function* getCustomerCartIdSaga() {
	yield call(
		sagaDataHandling,
		Mutation,
		GET_CUSTOMER_CART_ID_SCHEMA,
		getCustomerCartIdRequestSuccess,
		getCustomerCartIdRequestFailure
	);
}

export default function* getCustomerCartIdSagas() {
	yield takeEvery(GET_CUSTOMER_CART_ID_REQUEST, getCustomerCartIdSaga);
}


