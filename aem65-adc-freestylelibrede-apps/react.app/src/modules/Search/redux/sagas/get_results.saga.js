import {call, put, takeLatest} from 'redux-saga/effects';
import {
	GET_SEARCH_BAR_RESULT_REQUEST,
	GET_SEARCH_RESULT_REQUEST,
	getSearchBarResultRequestFailure,
	getSearchBarResultRequestSuccess,
	getSearchResultRequestFailure,
	getSearchResultRequestSuccess,
} from '../actions/get_results.action';
import {getResults} from '../../api/get_results.api';

export function* fetchSearchBarResultsSaga({payload}) {
	try {
		const {data} = yield call(getResults, payload);
		if (!data?.errorCode) {
			yield put(getSearchBarResultRequestSuccess(data, payload.isFAQResults));
		} else {
			yield put(getSearchBarResultRequestFailure(data?.errorCode));
		}
	} catch (e) {
		yield put(getSearchBarResultRequestFailure(e));
	}
}

export function* fetchResultsSaga({payload}) {
	try {
		const {data, error} = yield call(getResults, payload);
		if (data) {
			yield put(getSearchResultRequestSuccess(data, payload.query));
		} else {
			yield put(getSearchResultRequestFailure(error));
		}
	} catch (e) {
		yield put(getSearchResultRequestFailure(e));
	}
}

export default function* getResultsSaga() {
	yield takeLatest(GET_SEARCH_BAR_RESULT_REQUEST, fetchSearchBarResultsSaga);
	yield takeLatest(GET_SEARCH_RESULT_REQUEST, fetchResultsSaga);
}