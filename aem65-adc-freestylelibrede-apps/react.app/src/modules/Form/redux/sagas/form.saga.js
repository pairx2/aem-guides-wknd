import {call, put, select, takeEvery} from 'redux-saga/effects';
import {FETCH_FRAUD_DOMAIN_REQUEST, fraudDomainRequestFailure, setFraudDomain} from '../actions/form.actions';
import {getFraudDomain} from '../../api/form.api';
export const formReducer = state => state.formModuleReducer.formReducer;

export function* fetchFraudDomainSaga(actions) {
	try{
		const {fraudDomainFetched} = yield select(formReducer);
		if (!fraudDomainFetched) {
			try{
				yield put(setFraudDomain());
				const apiResponse = yield call(getFraudDomain);
				if (apiResponse) {
					yield put(setFraudDomain(apiResponse.data.domains));
				}
				
			}catch(error){
				yield put(fraudDomainRequestFailure('Error during fraud domain service call'));
			}
		}
	}catch(error){
		yield put(fraudDomainRequestFailure('Error during fraud domain service call'));
	}
}

export default function* formSaga() {
	yield takeEvery(FETCH_FRAUD_DOMAIN_REQUEST, fetchFraudDomainSaga);
}
