import {all, call} from 'redux-saga/effects';
import formSaga from './form.saga';

export default function* formModuleSaga() {
	yield all([
		call(formSaga)
	]);
}