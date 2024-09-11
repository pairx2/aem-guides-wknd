import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
	LOG_IN_REQUEST,
	LOG_OUT_REQUEST, LOG_OUT_REQUEST_FAILURE,
	logOutRequestFailure,
	logOutRequestSuccess,
} from '../../../../../modules/Authentication/redux/actions/login.action';
import {authenticateUser, getCurrentAuthenticatedUser, signOut} from '../../../../../api/authentication.service';
import {deleteAnonymousCartIdFromCache} from '../../../../../utils/cachingUtils';
import * as saga from '../../../../../modules/Authentication/redux/sagas/login.saga';
import loginSaga from '../../../../../modules/Authentication/redux/sagas/login.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/siteData');
'../../../../utils/siteData';

describe('loginRequestSaga saga in try->try block', () => {
	const payload = {
		email : 'abc@123.com',
		password : 'password',
		isRemembered : true
	};
	const loginSuccessLink = 'https://loginSuccessLink.com';
	const iterator = saga.loginRequestSaga({payload, loginSuccessLink});
	test('call getCurrentAuthenticatedUser', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getCurrentAuthenticatedUser);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call logInRequestFailure try->catch', () => {
		const actualYield = iterator.next().value;
		expect(actualYield).toEqual(undefined);
	});
});
describe('loginRequestSaga saga in try->try block', () => {
	const payload = {
		email : null,
		password : 'password',
		isRemembered : true
	};
	const loginSuccessLink = 'https://loginSuccessLink.com';
	const iterator = saga.loginRequestSaga({payload, loginSuccessLink});
	test('call getCurrentAuthenticatedUser', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getCurrentAuthenticatedUser);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call logInRequestFailure try->catch', () => {
		const actualYield = iterator.next().value;
		expect(actualYield).toEqual(undefined);
	});
});

describe('loginRequestSaga saga in try->try->catch', () => {
	const payload = {
		email : 'abc@123.com',
		password : 'password',
		isRemembered : true,
		isDisableRecaptcha : true, 
		headerCode: "string",
		socialLoginCode: ""
	};
	const loginSuccessLink = 'https://loginSuccessLink.com';
	const iterator = saga.loginRequestSaga({payload, loginSuccessLink});
	const e = {};
	test('call authenticateUser', () => {
		iterator.next();
		expect(iterator.throw({e}).value)
			.toEqual(call(authenticateUser, payload.email, payload.password, payload.recaptchaValue, payload.isDisableRecaptcha ,payload.headerCode, payload.socialLoginCode ));
		iterator.next();
		iterator.next();
	});
});
describe('loginRequestSaga saga in try->try->catch', () => {
	const payload = {
		email : null,
		password : 'password',
		isRemembered : true
	};
	const loginSuccessLink = 'https://loginSuccessLink.com';
	const iterator = saga.loginRequestSaga({payload, loginSuccessLink});
	const e = {};
	test('call authenticateUser', () => {
		iterator.next();
		expect(iterator.throw({e}).value)
			.toEqual(undefined);
		iterator.next();
		iterator.next();
	});
});

describe('logoutRequestSaga saga try block', () => {
	const payload = {
		logoutPageRedirect : 'logoutPageRedirect'
	};
	const iterator = saga.logoutRequestSaga({payload});
	test('call signOut', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(signOut, undefined);
		expect(actualYield).toEqual(expectedYield);
	});
	test('test deleteAnonymousCartIdFromCache', async () => {
		const result = deleteAnonymousCartIdFromCache();
		expect(result).toBeUndefined();
	});	
	test('put logOutRequestSuccess', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(logOutRequestSuccess());
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('logoutRequestSaga saga try block', () => {
	const payload = {
		logoutPageRedirect : null
	};
	const iterator = saga.logoutRequestSaga({payload});
	test('call signOut', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(signOut, undefined);
		expect(actualYield).toEqual(expectedYield);
	});
	test('test deleteAnonymousCartIdFromCache', async () => {
		const result = deleteAnonymousCartIdFromCache();
		expect(result).toBeUndefined();
	});	
	test('put logOutRequestSuccess', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(logOutRequestSuccess());
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('logoutRequestSaga saga catch block', () => {
	const payload = {
		logoutPageRedirect : 'logoutPageRedirect'
	};
	const message = {};
	const iterator = saga.logoutRequestSaga({payload});
	iterator.next();
	test('put logOutRequestFailure', () => {
		expect(iterator.throw(message).value)
			.toEqual(put(logOutRequestFailure(payload)));
	});

});
describe('logoutRequestSaga saga catch block', () => {
	const payload = {
		logoutPageRedirect : null
	};
	const message = {};
	const iterator = saga.logoutRequestSaga({payload});
	iterator.next();
	test('put logOutRequestFailure', () => {
		expect(iterator.throw(message).value)
			.toEqual(put(logOutRequestFailure(payload)));
	});

});

describe('loginSaga saga ', () => {
	const iterator = loginSaga();
	test('get loginSaga -> loginRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(LOG_IN_REQUEST, saga.loginRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get loginSaga -> logoutRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(LOG_OUT_REQUEST, saga.logoutRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get loginSaga -> logoutRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(LOG_OUT_REQUEST_FAILURE, saga.logoutRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});