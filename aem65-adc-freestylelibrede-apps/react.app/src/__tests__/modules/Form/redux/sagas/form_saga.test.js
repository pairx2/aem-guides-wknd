import { call, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_FRAUD_DOMAIN_REQUEST, fraudDomainRequestFailure, setFraudDomain } from '../../../../../modules/Form/redux/actions/form.actions';
import { getFraudDomain } from '../../../../../modules/Form/api/form.api';
import * as saga from '../../../../../modules/Form/redux/sagas/form.saga';
import formSaga from '../../../../../modules/Form/redux/sagas/form.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('fetchFraudDomainSaga saga - fraudDomainFetched as false - select and set ', () => {
	const iterator = saga.fetchFraudDomainSaga();
	test('select formReducer', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.formReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setFraudDomain', () => {
		const fraudDomainFetched = false;
		const actualYield = iterator.next(fraudDomainFetched).value;
		const expectedYield = put(setFraudDomain());
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setFraudomain on error', () => {
		const message ={}
		iterator.next()
		const expectedYield = put(fraudDomainRequestFailure('Error during fraud domain service call'))
		expect(iterator.throw(message).value).toEqual(expectedYield);

	});
});

describe('formSage saga ', () => {
	const iterator = formSaga();
	test('get formSage -> fetchFraudDomainSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(FETCH_FRAUD_DOMAIN_REQUEST, saga.fetchFraudDomainSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('fetchFraudDomainSaga saga - generic error', () => {
	const iterator = saga.fetchFraudDomainSaga();
	test('fetchFraudDomainSaga on error', () => {
		iterator.next();
		const actualYield = iterator.next().value;
		const expectedYield = put(fraudDomainRequestFailure('Error during fraud domain service call'));
		expect(actualYield).toEqual(expectedYield);

	});
});

describe('fetchFraudDomainSaga saga - fraudDomainFetched as false - call get and put set fraud domain', () => {
	const iterator = saga.fetchFraudDomainSaga();
	test('call getFraudDomain', () => {
		iterator.next()
		const fraudDomainFetched = false;
		iterator.next(fraudDomainFetched)
		const apiResponse = {
			"domains": [
			  "test0.com",
			  "test.com",
			  "test1.com",
			  "test2.com",
			  "test4.com",
			  "test5.com",
			  "abcdefgh.com"
			]
		  };
		const actualYield = iterator.next(apiResponse).value;
		const expectedYield = call(getFraudDomain);
		expect(actualYield).toEqual(expectedYield);
	
		const actualResult = iterator.next(apiResponse).value;
		expect(actualResult).toBeDefined();
	});

});