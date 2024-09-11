import {all} from 'redux-saga/effects';
import getSickfundSagas from './get_sickfund.saga';

export default function* sickFundModuleSaga() {
	yield all([
		getSickfundSagas()
	]);
}