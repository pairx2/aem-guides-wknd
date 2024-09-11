import {call, put, takeEvery} from 'redux-saga/effects';
import { RETURN_ACTION_REQUEST, returnActionRequestFailure, returnActionRequestSuccess,} from '../actions/refund_reship_widget.action';
import { _getJwtToken } from '../../../Cart/redux/sagas/cart.saga';
import { getUpdateReturnAction } from '../../api/update_return_action.api';

export function* returnActionRequestSaga({payload}) {
	const token = yield call(_getJwtToken);
	try {
		const {data} = yield call(getUpdateReturnAction, payload, token);
		if(data?.statusCode === "200") {
			yield put(returnActionRequestSuccess());
		} else {
			yield put(returnActionRequestFailure(data?.status));
		}
	} catch(e) {
		const errorValue = {code : 400}
		yield put(returnActionRequestFailure(e?.response?.data?.status ? e?.response?.data?.status : errorValue));
	}
}

export default function* returnActionRequestSagas() {
	yield takeEvery(RETURN_ACTION_REQUEST, returnActionRequestSaga);
}