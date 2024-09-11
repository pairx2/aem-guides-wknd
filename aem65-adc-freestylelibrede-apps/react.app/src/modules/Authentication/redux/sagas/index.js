import {all} from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSagas from './registration.saga';
import forgotPasswordRequestSagas from './forgotPassword.saga';
import resetPasswordRequestSagas from './resetPassword.saga';
import bluedoorCustomerSagas from './bluedoor.saga';

export default function* authenticationModuleSaga() {
	yield all([
		loginSaga(),
		registrationSagas(),
		forgotPasswordRequestSagas(),
		resetPasswordRequestSagas(),
		bluedoorCustomerSagas()
	]);
}