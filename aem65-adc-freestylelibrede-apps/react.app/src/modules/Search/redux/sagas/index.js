import {all} from 'redux-saga/effects';
import getResultsSaga from './get_results.saga';

export default function* resultModuleSaga() {
	yield all([
		getResultsSaga()
	]);
}