import {call, put, takeEvery} from 'redux-saga/effects';
import {
	EDIT_PASSWORD_REQUEST,
	editPasswordRequestFailure,
	editPasswordRequestSuccess
} from '../actions/edit_password.action';
import {_getJwtToken} from '../../../Cart/redux/sagas/cart.saga';
import {getUpdatedPassword} from '../../api/update_password.api';
import {getAccessToken} from '../../../../api/authentication.service';

export function* editPasswordSaga({payload}) {
	try {
		const token = yield _getJwtToken();
		const passwordToken = yield call(getAccessToken);
		payload.AccessToken = passwordToken;
		const {data} = yield call(getUpdatedPassword, payload, token);
		if(data.Code === 200){
			yield put(editPasswordRequestSuccess());
		}else {
			yield put(editPasswordRequestFailure('error'));
		}
	} catch(e) {
		yield put(editPasswordRequestFailure(e?.response?.data?.['Error Message'] || 'passwordUpdateGenericerror'));
	}
}

export default function* editPasswordSagas() {
	yield takeEvery(EDIT_PASSWORD_REQUEST, editPasswordSaga);
}