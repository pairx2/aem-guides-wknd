import {call, takeEvery} from 'redux-saga/effects';
import {
	FORGOT_PASSWORD_REQUEST,
	forgotPasswordRequestSuccess,
	forgotPasswordRequestFailure,
} from '../actions/login.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildForgotPasswordSchema} from '../schemas/forgot_password.schema';

export function* forgotPasswordRequestSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildForgotPasswordSchema(payload.email),
		forgotPasswordRequestSuccess,
		forgotPasswordRequestFailure,
		true
	);
}

export default function* forgotPasswordRequestSagas() {
	yield takeEvery(FORGOT_PASSWORD_REQUEST, forgotPasswordRequestSaga);
}

