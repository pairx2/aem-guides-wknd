import { call, put, takeEvery } from 'redux-saga/effects';
import { _getJwtToken } from '../../../../../modules/Cart/redux/sagas/cart.saga';
import { sagaDataHandling } from '../../../../../utils/sagaDataHandling';
import { Mutation } from '../../../../../api/graphql.config';
import { buildConfirmEmailChangeSchema } from '../../../../../modules/MyAccount/schemas/email_update_schema';
import returnActionRequestSagas, * as saga from '../../../../../modules/MyAccount/redux/sagas/refund_reship_widget.saga';
import { getUpdateReturnAction } from '../../../../../modules/MyAccount/api/update_return_action.api';
import { RETURN_ACTION_REQUEST, returnActionRequestFailure, returnActionRequestSuccess } from '../../../../../modules/MyAccount/redux/actions/refund_reship_widget.action';
jest.mock('../../../../../utils/endpointUrl.js');

describe('returnActionRequestSaga saga ', () => {
	const payload = {
		"returnId": '123455',
		"action": 'refund'
	};
	const iterator = saga.returnActionRequestSaga( payload );
	test('call _getJwtToken', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	// test('put returnActionRequestSuccess', () => {
	// 	const actualYield = iterator.next().value;
	// 	const expectedYield = put(returnActionRequestSuccess());
	// 	expect(actualYield).toEqual(expectedYield);
	// });
});
describe('returnActionRequestSaga saga ', () => {
	const payload = {
		"returnId": '123455',
		"action": 'refund'
	};
	const iterator = saga.returnActionRequestSaga(payload );
	test('call _getJwtToken', () => {
		const actualToken = iterator.next().value;
		const expectedToken = call(_getJwtToken);
		expect(actualToken).toEqual(expectedToken);
	});
	// test('put returnActionRequestFailure', () => {
	// 	const data = {
	// 		error: {
	// 			code: 400
	// 		}
	// 	};
	// 	const actualYield = iterator.next().value;
	// 	const expectedYield = put(returnActionRequestFailure());
	// 	expect(actualYield).toEqual(expectedYield);
	// });
});

describe('returnActionRequestSaga saga in catch block', () => {
	const payload = {
		"returnId": '123455',
		"action": 'refund'
	};
	const iterator = saga.returnActionRequestSaga( payload );
	const token = '8ac7a49f71aabf0e0171ba97acb923d2';
	const response = {
			code: 400
	};
	test('returnActionRequestSaga testing', () => {
		iterator.next();
		iterator.next(token);
		expect(
			iterator.throw().value).
			toEqual(put(returnActionRequestFailure(response)));
	});
});


describe('returnActionRequestSaga saga ', () => {
	const iterator = returnActionRequestSagas();
	test('get deleteOrderAddressSagas -> returnActionRequestSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(RETURN_ACTION_REQUEST, saga.returnActionRequestSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});