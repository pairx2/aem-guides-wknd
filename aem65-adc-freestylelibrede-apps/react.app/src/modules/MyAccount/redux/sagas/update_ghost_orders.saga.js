import {call, takeEvery} from 'redux-saga/effects';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {UPDATE_GHOST_ORDERS_REQUEST} from '../actions/get_ghost_orders.action';
import {buildUpdateGhostOrdersSchema} from '../../schemas/update_ghost_orders.schema';

export function* updateGhostOrdersSaga({payload}) {
	const token = yield call(_getJwtToken);
	if(token) {
		yield call(
			sagaDataHandling,
			Mutation,
			buildUpdateGhostOrdersSchema(payload)
		);
	}
}

export default function* updateGhostOrdersSagas() {
	yield takeEvery(UPDATE_GHOST_ORDERS_REQUEST, updateGhostOrdersSaga);
}