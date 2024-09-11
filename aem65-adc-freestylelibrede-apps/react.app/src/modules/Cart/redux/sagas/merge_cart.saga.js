import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess, MERGE_CART_REQUEST
} from '../actions/cart_id_action';
import {buildMergeCartSchema} from '../../schemas/merge_cart.schema';

export function* mergeCartSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildMergeCartSchema(payload),
		getCustomerCartIdRequestSuccess,
		getCustomerCartIdRequestFailure
	);
}

export default function* mergeCartSagas() {
	yield takeEvery(MERGE_CART_REQUEST, mergeCartSaga);
}


