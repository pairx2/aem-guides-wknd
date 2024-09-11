import {call, takeEvery, put, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS,
	UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST,
	updateAddressAndPaymentMethodRequestSuccess,
	updateAddressAndPaymentMethodRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/update_payment_method.action';
import {buildUpdateAddressAndPaymentSchema} from '../../../../../modules/MyAccount/schemas/update_address_and_payment.schema';
import updateAddressAndPaymentMethodSagas, * as saga from '../../../../../modules/MyAccount/redux/sagas/update_address_and_payment.saga';
import {GET_ORDERS_REQUEST} from '../../../../../modules/MyAccount/redux/actions/get_orders.action';
import {getCustomerPaymentTokensRequest} from '../../../../../modules/Payment/redux/actions/payment.action';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateAddressAndPaymentMethodSaga saga ', () => {
	const payload = {};
	const iterator = saga.updateAddressAndPaymentMethodSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildUpdateAddressAndPaymentSchema(payload),
			updateAddressAndPaymentMethodRequestSuccess,
			updateAddressAndPaymentMethodRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateAddressAndPaymentMethodSuccessSaga saga - CPS ', () => {
	const iterator = saga.updateAddressAndPaymentMethodSuccessSaga();
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
describe('updateAddressAndPaymentMethodSuccessSaga saga - RX ', () => {
	const iterator = saga.updateAddressAndPaymentMethodSuccessSaga();
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

describe('updateAddressAndPaymentMethodSagas saga ', () => {
	const iterator = updateAddressAndPaymentMethodSagas();
	test('get updateAddressAndPaymentMethodSagas -> updateAddressAndPaymentMethodSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST, saga.updateAddressAndPaymentMethodSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get updateAddressAndPaymentMethodSagas -> updateAddressAndPaymentMethodSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_ADDRESS_AND_PAYMENT_METHOD_REQUEST_SUCCESS, saga.updateAddressAndPaymentMethodSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});