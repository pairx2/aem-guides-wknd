import {call, put, takeLeading, takeEvery} from 'redux-saga/effects';
import {
	CONFIRM_ACCOUNT_REQUEST, confirmAccountRequestFailure, confirmAccountRequestSuccess,
	E_APPLY_REQUEST,
	E_APPLY_REQUEST_FAILURE,
	eApplyRequestFailure,
	eApplyRequestSuccess,
	REGISTRATION_USER_REQUEST,
	REGISTRATION_USER_REQUEST_FAILURE,
	registrationUserRequestFailure,
	registrationUserRequestSuccess,
	CONFIRMATION_EMAIL_TRIGGER_REQUEST,
	confirmationEmailTriggerRequestSuccess,
	confirmationEmailTriggerRequestFailure
} from '../../../../../modules/Authentication/redux/actions/registration.action';
import {getCsrfToken, postEApply, postRegistration} from '../../../../../modules/Authentication/api/registration.api';
import {OPEN_MODAL_ACTION} from '../../../../../modules/Modal/redux/actions/index';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildConfirmAccountSchema} from '../../../../../modules/Authentication/redux/schemas/confirm_account.schema';
import * as saga from '../../../../../modules/Authentication/redux/sagas/registration.saga';
import registrationSagas from '../../../../../modules/Authentication/redux/sagas/registration.saga';
import { buildConfirmationEmailTriggerSchema } from '../../../../../modules/Authentication/redux/schemas/confirmation_email_trigger.schema';
jest.mock('../../../../../utils/endpointUrl.js');

describe('registrationSaga saga', () => {
	const payload = {
		key : '12cf3',
		id : '123',
	};
	const iterator = saga.registrationSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildConfirmAccountSchema(payload.id, payload.key),
			confirmAccountRequestSuccess,
			confirmAccountRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('registrationUserRequestSaga saga if block', () => {
	const payload = {
		email : 'email@abc.com'
	};
	const redirectLink = '';
	const isCheckout = true;
	const data = {
		Code : 200
	};
	const iterator = saga.registrationUserRequestSaga({payload, redirectLink, isCheckout});
	test('call postRegistration', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(postRegistration, payload);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put registrationUserRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(registrationUserRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('registrationUserRequestSaga saga else block', () => {
	const payload = {
		email : 'email@abc.com'
	};
	const redirectLink = '';
	const isCheckout = true;
	const data = {
		Code : 400
	};
	const iterator = saga.registrationUserRequestSaga({payload, redirectLink, isCheckout});
	iterator.next();
	test('put registrationUserRequestFailure', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(registrationUserRequestFailure(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('registrationUserRequestSaga saga catch block', () => {
	const payload = {
		email : 'email@abc.com'
	};
	const redirectLink = '';
	const isCheckout = true;
	const response = {
		error : 'error'
	};
	const iterator = saga.registrationUserRequestSaga({payload, redirectLink, isCheckout});
	iterator.next();
	test('put registrationUserRequestFailure', () => {
		expect(iterator.throw({response}).value)
			.toEqual(put(registrationUserRequestFailure(response)));
	});
});

describe('eApplyReqSaga saga', () => {
	const payload = {};
	const redirectLink = '';
	const data = {
		token : '8ac7a49f71aabf0e0171ba97acb923d2',
		Code : 200
	};
	const iterator = saga.eApplyReqSaga({payload, redirectLink});
	test('call getCsrfToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getCsrfToken);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call postEApply', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = call(postEApply, payload, data.token);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put eApplyRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(eApplyRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('eApplyReqSaga saga', () => {
	const payload = {};
	const redirectLink = '';
	const data = {
		token : '8ac7a49f71aabf0e0171ba97acb923d2',
		Code : 400
	};
	const iterator = saga.eApplyReqSaga({payload, redirectLink});
	iterator.next();
	iterator.next({data});
	test('put eApplyRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(eApplyRequestFailure(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('eApplyReqSaga saga catch block', () => {
	const payload = {};
	const redirectLink = '';
	const response = {
		error : 'error'
	};
	const iterator = saga.eApplyReqSaga({payload, redirectLink});
	iterator.next();
	test('put eApplyRequestFailure', () => {
		expect(iterator.throw({response}).value)
			.toEqual(put(eApplyRequestFailure(response)));
	});
});

describe('eApplyRequestSaga saga - error undefined', () => {
	const error = {
		'Error Message' : undefined,
		data: {
			'Error Message': undefined
		}
	};
	const errorModalProps = {
		errorMessage: undefined
	};
	const errorMessage = error['Error Message'];
	const iterator = saga.eApplyRequestSaga({error});
	test('put OPEN_MODAL_ACTION', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				contentID: 'registrationErrorModal',
				props: errorModalProps
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
	test('test errorMessage', () => {
		expect(errorMessage).not.toBeNull();
	});

});
describe('eApplyRequestSaga saga - error defined', () => {
	const error = {
		'Error Message' : 'error',
		data: [{
			'Error Message': 'error'
		}]
	};
	const errorModalProps = {
		errorMessage: 'error'
	};
	const errorMessage = error['Error Message'];
	const iterator = saga.eApplyRequestSaga({error});
	test('put OPEN_MODAL_ACTION', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				contentID: 'registrationErrorModal',
				props: errorModalProps
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
	test('test errorMessage', () => {
		expect(errorMessage).not.toBeNull();
	});

});
describe('eApplyRequestSaga saga', () => {
	const error = {
		data: [{
			'Error Message': 'error'
		}]
	};
	const errorModalProps = {
		errorMessage: undefined
	};
	const errorMessage = error['Error Message'];
	const iterator = saga.eApplyRequestSaga({error});
	test('put OPEN_MODAL_ACTION', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				contentID: 'registrationErrorModal',
				props: errorModalProps
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
	test('test errorMessage', () => {
		expect(errorMessage).not.toBeNull();
	});

});
describe('eApplyRequestSaga saga', () => {
	const error = null;
	const errorMessage = error?.['Error Message'];
	const iterator = saga.eApplyRequestSaga({error});
	test('put OPEN_MODAL_ACTION', () => {
		const actualYield = iterator.next().value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
	test('test errorMessage', () => {
		expect(errorMessage).not.toBeNull();
	});

});
describe('confirmationEmailTriggerSaga saga', () => {
	const email = 'test@yopmail.com'
	const iterator = saga.confirmationEmailTriggerSaga({email});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildConfirmationEmailTriggerSchema(email),
			confirmationEmailTriggerRequestSuccess,
			confirmationEmailTriggerRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('registrationSagas saga ', () => {
	const iterator = registrationSagas();
	test('get registrationSagas -> registrationSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(CONFIRM_ACCOUNT_REQUEST, saga.registrationSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get registrationSagas -> registrationUserRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(REGISTRATION_USER_REQUEST, saga.registrationUserRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get registrationSagas -> eApplyReqSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(E_APPLY_REQUEST, saga.eApplyReqSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get registrationSagas -> eApplyRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery([REGISTRATION_USER_REQUEST_FAILURE, E_APPLY_REQUEST_FAILURE], saga.eApplyRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get registrationSagas -> confirmationEmailTriggerSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(CONFIRMATION_EMAIL_TRIGGER_REQUEST, saga.confirmationEmailTriggerSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});

