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
} from '../actions/payment.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {buildGetCustomerPaymentTokensSchema} from '../schemas/get_customer_payment_tokens.schema';
import {buildInitializeCustomerPaymentTokenSchema} from '../schemas/initialize_customer_payment_token.schema';
import {Mutation, Query} from '../../../../api/graphql.config';
import {buildSaveCustomerPaymentTokenSchema} from '../schemas/save_customer_payment_token.schema';
import {buildDeleteCustomerPaymentTokenSchema} from '../schemas/delete_customer_payment_token.schema';

export	function* getCustomerPaymentTokens() {
	yield call(
		sagaDataHandling,
		Query,
		buildGetCustomerPaymentTokensSchema(),
		getCustomerPaymentTokensRequestSuccess,
		getCustomerPaymentTokensRequestFailure
	);
}

export function* initializeCustomerPaymentTokenRequest({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildInitializeCustomerPaymentTokenSchema(payload),
		initializeCustomerPaymentTokenRequestSuccess,
		initializeCustomerPaymentTokenRequestFailure
	);
}

export function* saveCustomerPaymentTokenRequest({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildSaveCustomerPaymentTokenSchema(payload),
		saveCustomerPaymentTokenRequestSuccess,
		saveCustomerPaymentTokenRequestFailure
	);
}

export function* deleteCustomerPaymentTokenRequest({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildDeleteCustomerPaymentTokenSchema(payload),
		deleteCustomerPaymentTokenRequestSuccess,
		deleteCustomerPaymentTokenRequestFailure
	);
}
export default function* paymentSaga() {
	yield takeLeading(GET_CUSTOMER_PAYMENT_TOKENS_REQUEST, getCustomerPaymentTokens);
	yield takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, getCustomerPaymentTokens);
	yield takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, getCustomerPaymentTokens);
	yield takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_SUCCESS, getCustomerPaymentTokens);
	yield takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST_FAILURE, getCustomerPaymentTokens);
	yield takeLeading(INITIALIZE_CUSTOMER_PAYMENT_TOKEN_REQUEST, initializeCustomerPaymentTokenRequest);
	yield takeLeading(SAVE_CUSTOMER_PAYMENT_TOKEN_REQUEST, saveCustomerPaymentTokenRequest);
	yield takeLeading(DELETE_CUSTOMER_PAYMENT_TOKEN_REQUEST, deleteCustomerPaymentTokenRequest);
}
