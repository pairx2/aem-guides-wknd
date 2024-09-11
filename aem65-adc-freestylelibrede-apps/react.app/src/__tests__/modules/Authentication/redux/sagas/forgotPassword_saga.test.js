import {call, takeEvery} from 'redux-saga/effects';
import {
	FORGOT_PASSWORD_REQUEST,
	forgotPasswordRequestSuccess,
	forgotPasswordRequestFailure,
} from '../../../../../modules/Authentication/redux/actions/login.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildForgotPasswordSchema} from '../../../../../modules/Authentication/redux/schemas/forgot_password.schema';
import * as saga from '../../../../../modules/Authentication/redux/sagas/forgotPassword.saga';
import forgotPasswordRequestSagas from '../../../../../modules/Authentication/redux/sagas/forgotPassword.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('forgotPasswordRequestSaga saga ', () => {
	const payload = {
		email : 'abc@123.com'
	};
	const iterator = saga.forgotPasswordRequestSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(
			sagaDataHandling,
			Mutation,
			buildForgotPasswordSchema(payload.email),
			forgotPasswordRequestSuccess,
			forgotPasswordRequestFailure,
			true
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('forgotPasswordRequestSagas saga ', () => {
	const iterator = forgotPasswordRequestSagas();
	test('get forgotPasswordRequestSagas -> forgotPasswordRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(FORGOT_PASSWORD_REQUEST, saga.forgotPasswordRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});