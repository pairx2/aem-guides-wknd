import {call, takeEvery} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, resetPasswordRequestFailure, resetPasswordRequestSuccess,} from '../../../../../modules/Authentication/redux/actions/login.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildResetPasswordSchema} from '../../../../../modules/Authentication/redux/schemas/reset_password.schema';
import * as saga from '../../../../../modules/Authentication/redux/sagas/resetPassword.saga';
import resetPasswordRequestSagas from '../../../../../modules/Authentication/redux/sagas/resetPassword.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('resetPasswordRequestSaga saga ', () => {
	const payload = {
		code : '1234',
		newPassword : 'newPassword',
		customerID : '123456'
	};
	const iterator = saga.resetPasswordRequestSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildResetPasswordSchema(payload.code, payload.newPassword, payload.customerID),
			resetPasswordRequestSuccess,
			resetPasswordRequestFailure,
			true
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('resetPasswordRequestSagas saga ', () => {
	const iterator = resetPasswordRequestSagas();
	test('get resetPasswordRequestSagas -> resetPasswordRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(RESET_PASSWORD_REQUEST, saga.resetPasswordRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});
