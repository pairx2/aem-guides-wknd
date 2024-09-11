import {call, takeLatest, takeEvery,put} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildPlusServiceCancellationSchema} from '../../schemas/plus_service_cancellation.schema';
import {plusServiceCancellationRequestSuccess,plusServiceCancellationRequestFailure,
    PLUS_SERVICE_CANCELLATION_REQUEST} from '../actions/plus_service_cancellation.action';

export function* plusServiceCancellationSaga(payload) {
	payload = payload.payload;
	try {
		const { data } = yield call(
			Mutation,
			buildPlusServiceCancellationSchema(payload.firstname, payload.lastname, payload.email, payload.dob, payload.termination, payload.terminationTime, payload.terminationType, payload.terminationReason),

		);
		yield put(plusServiceCancellationRequestSuccess(data));
	} catch (error) {
		yield put(plusServiceCancellationRequestFailure(error));
	}
}

export default function* plusServiceCancellationSagas() {
	yield takeLatest(PLUS_SERVICE_CANCELLATION_REQUEST, plusServiceCancellationSaga);
}