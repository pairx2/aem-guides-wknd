import {all} from 'redux-saga/effects';
import translationSaga from './translation.saga';

export default function* translationModuleSaga() {
	yield all([
		translationSaga()
	]);
}