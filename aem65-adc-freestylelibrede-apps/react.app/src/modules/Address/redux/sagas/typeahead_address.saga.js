import {call, put, takeLatest} from 'redux-saga/effects';
import {select} from 'redux-saga/effects';
import {
	UPDATE_SESSION_ID,
	SUGGEST_ZIPCODE_REQUEST,
	suggestZipCodeRequestSuccess,
	suggestZipCodeRequestFailure,
	SUGGEST_CITY_REQUEST,
	suggestCityRequestSuccess,
	suggestCityRequestFailure,
	SUGGEST_STREET_REQUEST,
	suggestStreetRequestSuccess,
	suggestStreetRequestFailure
} from '../actions/typeahead_address.action';
import {getNewSessionID, getZipcodeSuggestion, getCitySuggestion, getStreetSuggestion} from '../../api/addressTypeahead.api';
import {secondsInMinute, millisecondsInSecond} from '../../../../utils/dateUtils';

export const getSession = state => state.addressModuleReducer.TypeaheadReducer.sessionID;

// Expiration time of the sessionID minus some time to make sure it is not expired when we send it
const sessionIDexpirationTime = 5 * secondsInMinute * millisecondsInSecond;
const expirationBuffer = 5 * millisecondsInSecond;
export const expirationTime = sessionIDexpirationTime - expirationBuffer;

export function* typeaheadAddressSaga({payload}) {
	const sessionID = yield call(getCurrentSessionID);
	if(!sessionID) {
		yield put(suggestZipCodeRequestFailure('An error appeared while getting the sessionID'));
		return;
	}
	const {data, error} = yield call(getZipcodeSuggestion, sessionID, payload.countryCode, payload.prefix);
	if(data) {
		yield put(suggestZipCodeRequestSuccess({suggestions: data, prefix: payload.prefix}));
	} else if(error) {
			 yield put(suggestZipCodeRequestFailure(error));
	}
}

export function* suggestCityRequestSaga({payload}) {
	const sessionID = yield call(getCurrentSessionID);
	if(!sessionID) {
		yield put(suggestCityRequestFailure('An error appeared while getting the sessionID'));
		return;
	}
	const {data, error} = yield call(getCitySuggestion, sessionID, payload.countryCode, payload.zipcode);

	if(data) {
		yield put(suggestCityRequestSuccess({suggestions: data, prefix: payload.prefix}));
	}else if(error) {
		yield put(suggestCityRequestFailure(error));
	}
}

export function* suggestStreetRequestSaga({payload}) {
	const sessionID = yield call(getCurrentSessionID);
	if(!sessionID) {
		yield put(suggestStreetRequestFailure('An error appeared while getting the sessionID'));
		return;
	}
	const {data, error} = yield call(getStreetSuggestion, sessionID, payload.countryCode, payload.zipcode, payload.prefix);

	if(data) {
		yield put(suggestStreetRequestSuccess({suggestions: data, prefix: payload.prefix}));
	}else if(error) {
		yield put(suggestStreetRequestFailure(error));
	}
}

export function* getCurrentSessionID() {
	const session = yield select(getSession);
	if(session.id && session.creationDate + expirationTime > new Date().getTime()) {
		return session.id;
	} else {
		const sessionID = yield call(getNewSessionID);
		if(sessionID) {
			yield put({
				type: UPDATE_SESSION_ID,
				payload: {
					sessionID: sessionID
				}
			});
		}
		return sessionID;
	}
}

export default function* typeaheadAddressSagas() {
	yield takeLatest(SUGGEST_ZIPCODE_REQUEST, typeaheadAddressSaga);
	yield takeLatest(SUGGEST_CITY_REQUEST, suggestCityRequestSaga);
	yield takeLatest(SUGGEST_STREET_REQUEST, suggestStreetRequestSaga);
}
