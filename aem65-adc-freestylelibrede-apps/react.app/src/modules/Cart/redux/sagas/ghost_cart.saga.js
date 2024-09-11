import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {GET_GHOST_CART_ID_SCHEMA} from '../../schemas/get_ghost_cart_id.schema';
import {
	GET_GHOST_CART_ID_REQUEST,
	getGhostCartIdRequestFailure,
	getGhostCartIdRequestSuccess,
} from '../actions/ghost_cart.action';

export function* getGhostCartSaga() {
	yield call(
		sagaDataHandling,
		Mutation,
		GET_GHOST_CART_ID_SCHEMA,
		getGhostCartIdRequestSuccess,
		getGhostCartIdRequestFailure
	);
}

export default function* getGhostCartSagas() {
	yield takeEvery(GET_GHOST_CART_ID_REQUEST, getGhostCartSaga);
}

