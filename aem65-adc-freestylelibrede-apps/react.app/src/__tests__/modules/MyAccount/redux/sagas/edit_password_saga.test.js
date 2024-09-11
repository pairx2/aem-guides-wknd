import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
	EDIT_PASSWORD_REQUEST,
	editPasswordRequestFailure,
	editPasswordRequestSuccess
} from '../../../../../modules/MyAccount/redux/actions/edit_password.action';
import {getUpdatedPassword} from '../../../../../modules/MyAccount/api/update_password.api';
import {getAccessToken} from '../../../../../api/authentication.service';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/edit_password.saga';
import editPasswordSagas from '../../../../../modules/MyAccount/redux/sagas/edit_password.saga';
jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('editPasswordSaga saga ', () => {
	const payload = {
		AccessToken : 'nbkjhkjb456bh5bk'
	};
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const iterator = saga.editPasswordSaga({payload});
	test('passwordToken testing', () => {
		iterator.next();
		const actualToken = iterator.next().value;
		const expectedToken = call(getAccessToken);
		expect(actualToken).toEqual(expectedToken);
	});
	test('getUpdatedPassword testing', () => {
		const expectedToken = call(getUpdatedPassword, payload, undefined);
		const actualToken = iterator.next(token).value;
		expect(actualToken).toEqual(expectedToken);
	});
	test('editPasswordRequestFailure testing in else block ', () => {
		const data = {
			'code' : 201,
			'error' : 'error'
		};
		const expectedToken = put(editPasswordRequestFailure('error'));
		const actualToken = iterator.next({data}).value;
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('editPasswordSaga saga ', () => {
	const payload = {
		AccessToken : 'nbkjhkjb456bh5bk'
	};
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const iterator = saga.editPasswordSaga({payload});
	iterator.next();
	iterator.next();
	iterator.next(token);
	test('editPasswordRequestSuccess testing ', () => {
		const data = {
			Code : 200
		};
		const expectedToken = put(editPasswordRequestSuccess());
		const actualToken = iterator.next({data}).value;
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('editPasswordSaga saga ', () => {
	const payload = {
		AccessToken : 'nbkjhkjb456bh5bk'
	};
	const iterator = saga.editPasswordSaga({payload});
	test('editPasswordRequestFailure testing in catch block ', () => {
		iterator.next().value;
		iterator.next().value;
		iterator.next().value;
		const actualToken = iterator.next().value;
		const expectedToken = put(editPasswordRequestFailure('passwordUpdateGenericerror'));
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('editPasswordSagas saga takeEvery calls', () => {
	const iterator = editPasswordSagas();
	test('get editPasswordSagas -> EDIT_PASSWORD_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(EDIT_PASSWORD_REQUEST, saga.editPasswordSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});