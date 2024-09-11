import {call, takeEvery} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, resetPasswordRequestFailure, resetPasswordRequestSuccess,} from '../actions/login.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildResetPasswordSchema} from '../schemas/reset_password.schema';

export function* resetPasswordRequestSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildResetPasswordSchema(payload.code, payload.newPassword, payload.customerID),
		resetPasswordRequestSuccess,
		resetPasswordRequestFailure,
		true
	);
}

export default function* resetPasswordRequestSagas() {
	yield takeEvery(RESET_PASSWORD_REQUEST, resetPasswordRequestSaga);
}
