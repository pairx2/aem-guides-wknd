import {call, takeLatest} from 'redux-saga/effects';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Query} from '../../../../api/graphql.config';
import {GET_GHOST_ORDERS_REQUEST, getGhostOrdersRequestSuccess, getGhostOrdersRequestFailure} from '../actions/get_ghost_orders.action';
import {buildGetGhostOrdersSchema} from '../../schemas/get_ghost_orders.schema';

export function* getGhostOrdersSaga({payload}) {
	const token = yield call(_getJwtToken);
	const delay = time => new Promise(resolve => setTimeout(resolve, time));
	if(payload?.timeDelay) yield call(delay, 1000);
	if(token) {
		yield call(
			sagaDataHandling,
			Query,
			buildGetGhostOrdersSchema(),
			getGhostOrdersRequestSuccess,
			getGhostOrdersRequestFailure
		);
	}
}

export default function* getGhostOrdersSagas() {
	yield takeLatest(GET_GHOST_ORDERS_REQUEST, getGhostOrdersSaga);
}