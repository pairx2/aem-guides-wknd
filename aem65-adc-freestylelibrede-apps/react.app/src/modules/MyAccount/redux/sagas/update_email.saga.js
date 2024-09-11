import {call, put, takeEvery} from 'redux-saga/effects';
import {
	UPDATE_EMAIL_REQUEST,
	updateEmailRequestFailure,
	updateEmailRequestSuccess,
	CONFIRM_EMAIL_CHANGE_REQUEST,
	confirmEmailChangeRequestSuccess,
	confirmEmailChangeRequestFailure
} from '../actions/edit_password.action';
import {getUpdateEmail} from '../../api/update_email.api';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildConfirmEmailChangeSchema} from '../../schemas/email_update_schema';

export function* updateEmailSaga({payload}) {
	const token = yield call(_getJwtToken);
	try {
		const {data} = yield call(getUpdateEmail, payload, token);
		if(data?.Code === 200) {
			yield put(updateEmailRequestSuccess());
		} else {
			yield put(updateEmailRequestFailure('error'));
		}
	} catch(e) {
		yield put(updateEmailRequestFailure(e?.response?.data?.['Error Message'] || 'emailUpdateGenericerror'));
	}
}

export function* confirmEmailChange({payload: {key, id, confirmDob, setNewPassword}}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildConfirmEmailChangeSchema(id, key, confirmDob, setNewPassword),
		confirmEmailChangeRequestSuccess,
		confirmEmailChangeRequestFailure,
		true
	);
}

export default function* updateEmailSagas() {
	yield takeEvery(UPDATE_EMAIL_REQUEST, updateEmailSaga);
	yield takeEvery(CONFIRM_EMAIL_CHANGE_REQUEST, confirmEmailChange);
}