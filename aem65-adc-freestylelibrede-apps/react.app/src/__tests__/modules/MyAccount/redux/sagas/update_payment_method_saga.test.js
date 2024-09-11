import {call, takeEvery, put, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {
	UPDATE_PAYMENT_METHOD_REQUEST, UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS,
	updatePaymentMethodRequestSuccess,
	updatePaymentMethodRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/update_payment_method.action';
import {buildUpdatePaymentMethodSchema} from '../../../../../modules/MyAccount/schemas/update_payment_method.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_payment_method.saga';
import updatePaymentMethodSagas from '../../../../../modules/MyAccount/redux/sagas/update_payment_method.saga';
import {GET_ORDERS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/get_orders.action';
import {getCustomerPaymentTokensRequest} from '../../../../../modules/Payment/redux/actions/payment.action';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updatePaymentMethodSaga saga ', () => {
	const payload = {};
	const iterator = saga.updatePaymentMethodSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildUpdatePaymentMethodSchema(payload),
			updatePaymentMethodRequestSuccess,
			updatePaymentMethodRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updatePaymentMethodSuccessSaga saga - CPS ', () => {
	const iterator = saga.updatePaymentMethodSuccessSaga();
	test('UpdatePaymentMethodReducer', () => {
		const actualResult = iterator.next().value;
		const expectedResult = select(saga.UpdatePaymentMethodReducer);
		expect(actualResult).toEqual(expectedResult);
	});
	test('put GET_ORDERS_REQUEST', () => {
		const updatedOrder = 'CPS';
		const actualToken = iterator.next(updatedOrder).value;
		const expectedToken =  put({
			type: GET_ORDERS_REQUEST,
			payload: {
				timeDelay: true,
				orderHistoryType: 'CPS'
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});
	test('put getCustomerPaymentTokensRequest', () => {
		const actualToken = iterator.next('CPS').value;
		const expectedToken = put(getCustomerPaymentTokensRequest());
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updatePaymentMethodSuccessSaga saga -RX ', () => {
	const iterator = saga.updatePaymentMethodSuccessSaga();
	test('UpdatePaymentMethodReducer', () => {
		const actualResult = iterator.next().value;
		const expectedResult = select(saga.UpdatePaymentMethodReducer);
		expect(actualResult).toEqual(expectedResult);
	});
	test('put GET_ORDERS_REQUEST', () => {
		const updatedOrder = 'Reimbursement';
		const actualToken = iterator.next(updatedOrder).value;
		const expectedToken =  put({
			type: GET_ORDERS_REQUEST,
			payload: {
				timeDelay: true,
				orderHistoryType: 'CPS'
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});
	test('put getCustomerPaymentTokensRequest', () => {
		const actualToken = iterator.next('RX').value;
		const expectedToken = put(getCustomerPaymentTokensRequest());
		expect(actualToken).toEqual(expectedToken);
	});
});


describe('updatePaymentMethodSagas saga ', () => {
	const iterator = updatePaymentMethodSagas();
	test('get updatePaymentMethodSagas -> updatePaymentMethodSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_PAYMENT_METHOD_REQUEST, saga.updatePaymentMethodSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get updatePaymentMethodSagas -> updatePaymentMethodSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_PAYMENT_METHOD_REQUEST_SUCCESS, saga.updatePaymentMethodSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});