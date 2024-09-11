import {takeLeading, call} from 'redux-saga/effects';
import {
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST,
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE,
	DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS,
	deleteCustomerPaymentTokenRequestFailure,
	deleteCustomerPaymentTokenRequestSuccess,
	GET_CUSTOMER_PAYMENT_TOKENS_REQUEST,
	getCustomerPaymentTokensRequestFailure,
	getCustomerPaymentTokensRequestSuccess,
	INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST,
	initializeCustomerPaymentTokenRequestFailure,
	initializeCustomerPaymentTokenRequestSuccess,
	SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST,
	SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE,
	SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS,
	saveCustomerPaymentTokenRequestFailure,
	saveCustomerPaymentTokenRequestSuccess
} from '../../../../../modules/Payment/redux/actions/payment.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {buildGetCustomerPaymentTokensSchema} from '../../../../../modules/Payment/redux/schemas/get_customer_payment_tokens.schema';
import {buildInitializeCustomerPaymentTokenSchema} from '../../../../../modules/Payment/redux/schemas/initialize_customer_payment_token.schema';
import {Mutation, Query} from '../../../../../api/graphql.config';
import {buildSaveCustomerPaymentTokenSchema} from '../../../../../modules/Payment/redux/schemas/save_customer_payment_token.schema';
import {buildDeleteCustomerPaymentTokenSchema} from '../../../../../modules/Payment/redux/schemas/delete_customer_payment_token.schema';
import * as saga from '../../../../../modules/Payment/redux/sagas/payment.saga';
import paymentSaga from '../../../../../modules/Payment/redux/sagas/payment.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getCustomerPaymentTokens saga', () => {
	const iterator = saga.getCustomerPaymentTokens();
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Query,
			buildGetCustomerPaymentTokensSchema(),
			getCustomerPaymentTokensRequestSuccess,
			getCustomerPaymentTokensRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('initializeCustomerPaymentTokenRequest saga', () => {
	const payload = {};
	const iterator = saga.initializeCustomerPaymentTokenRequest({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildInitializeCustomerPaymentTokenSchema(payload),
			initializeCustomerPaymentTokenRequestSuccess,
			initializeCustomerPaymentTokenRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('saveCustomerPaymentTokenRequest saga', () => {
	const payload = {};
	const iterator = saga.saveCustomerPaymentTokenRequest({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildSaveCustomerPaymentTokenSchema(payload),
			saveCustomerPaymentTokenRequestSuccess,
			saveCustomerPaymentTokenRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('deleteCustomerPaymentTokenRequest saga', () => {
	const payload = {};
	const iterator = saga.deleteCustomerPaymentTokenRequest({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildDeleteCustomerPaymentTokenSchema(payload),
			deleteCustomerPaymentTokenRequestSuccess,
			deleteCustomerPaymentTokenRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('paymentSaga saga ', () => {
	const iterator = paymentSaga();
	test('get paymentSaga -> getCustomerPaymentTokens', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(GET_CUSTOMER_PAYMENT_TOKENS_REQUEST, saga.getCustomerPaymentTokens);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> getCustomerPaymentTokens', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, saga.getCustomerPaymentTokens);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> getCustomerPaymentTokens', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, saga.getCustomerPaymentTokens);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> getCustomerPaymentTokens', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, saga.getCustomerPaymentTokens);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> getCustomerPaymentTokens', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, saga.getCustomerPaymentTokens);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> initializeCustomerPaymentTokenRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST, saga.initializeCustomerPaymentTokenRequest);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> saveCustomerPaymentTokenRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST, saga.saveCustomerPaymentTokenRequest);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get paymentSaga -> deleteCustomerPaymentTokenRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST, saga.deleteCustomerPaymentTokenRequest);
		expect(actualYield).toEqual(expectedYield);
	});
});
