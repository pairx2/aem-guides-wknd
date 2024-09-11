import {call, put, takeEvery} from 'redux-saga/effects';
import {
	UPDATE_EMAIL_REQUEST,
	updateEmailRequestFailure,
	updateEmailRequestSuccess,
	CONFIRM_EMAIL_CHANGE_REQUEST,
	confirmEmailChangeRequestSuccess,
	confirmEmailChangeRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/edit_password.action';
import {getUpdateEmail} from '../../../../../modules/MyAccount/api/update_email.api';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildConfirmEmailChangeSchema} from '../../../../../modules/MyAccount/schemas/email_update_schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_email.saga';
import updateEmailSagas from '../../../../../modules/MyAccount/redux/sagas/update_email.saga';
import {dottedToDashed} from '../../../../../utils/dateUtils';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateEmailSaga saga ', () => {
	const payload = {
		'addressID' : '1234'
	};
	const iterator = saga.updateEmailSaga({payload});
	test('call _getJwtToken', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('call sagaDataHandling', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield =  call(getUpdateEmail, payload, token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put updateEmailRequestSuccess', () => {
		const data = {
			Code : 200
		};
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(updateEmailRequestSuccess());
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('updateEmailSaga saga ', () => {
	const payload = {
		'addressID' : '1234'
	};
	const iterator = saga.updateEmailSaga({payload});
	test('call _getJwtToken', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('call sagaDataHandling', () => {
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const actualYield = iterator.next(token).value;
		const expectedYield =  call(getUpdateEmail, payload, token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put updateEmailRequestSuccess', () => {
		const data = {
			Code : 400
		};
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(updateEmailRequestFailure('error'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateEmailSaga saga in catch block', () => {
	const payload = {
		'addressID' : '1234'
	};
	const iterator = saga.updateEmailSaga({payload});
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const response = {
		code : 'error'
	};
	test('updateEmailSaga testing', () => {
		iterator.next();
		iterator.next(token);
		expect(
			iterator.throw(response).value).
			toEqual(put(updateEmailRequestFailure('emailUpdateGenericerror')));
	});
});

describe('confirmEmailChange saga ', () => {
	const payload = {
		id : '1',
		key : '1234',
		confirmDob: '11/11/1999',
		setNewPassword: '12345'
	};
	const iterator = saga.confirmEmailChange({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(sagaDataHandling,
			Mutation,
			buildConfirmEmailChangeSchema(payload.id, payload.key, dottedToDashed(payload.confirmDob), payload.setNewPassword),
			confirmEmailChangeRequestSuccess,
			confirmEmailChangeRequestFailure, true);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('updateEmailSagas saga ', () => {
	const iterator = updateEmailSagas();
	test('get deleteOrderAddressSagas -> updateEmailSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_EMAIL_REQUEST, saga.updateEmailSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get deleteOrderAddressSagas -> confirmEmailChange', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(CONFIRM_EMAIL_CHANGE_REQUEST, saga.confirmEmailChange);
		expect(actualToken).toEqual(expectedToken);
	});
});