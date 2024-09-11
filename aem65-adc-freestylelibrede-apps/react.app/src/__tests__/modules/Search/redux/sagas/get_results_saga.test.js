import {call, put, takeLatest} from 'redux-saga/effects';
import {
	GET_SEARCH_BAR_RESULT_REQUEST,
	GET_SEARCH_RESULT_REQUEST,
	getSearchBarResultRequestFailure,
	getSearchBarResultRequestSuccess,
	getSearchResultRequestFailure,
	getSearchResultRequestSuccess,
} from '../../../../../modules/Search/redux/actions/get_results.action';
import {getResults} from '../../../../../modules/Search/api/get_results.api';
import * as saga from '../../../../../modules/Search/redux/sagas/get_results.saga';
import getResultsSaga from '../../../../../modules/Search/redux/sagas/get_results.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('fetchSearchBarResultsSaga saga if block', () => {
	const payload = {
		isFAQResults : 'isFAQResults'
	};
	const iterator = saga.fetchSearchBarResultsSaga({payload});
	const data = {};
	test('call getResults', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getResults, payload);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getSearchBarResultRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getSearchBarResultRequestSuccess(data, payload.isFAQResults));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('fetchSearchBarResultsSaga saga else block', () => {
	const payload = {
		isFAQResults : undefined
	};
	const iterator = saga.fetchSearchBarResultsSaga({payload});
	const error = {};
	const data = undefined;
	iterator.next();
	test('put getSearchBarResultRequestFailure', () => {
		const actualYield = iterator.next({error}).value;
		const expectedYield = put(getSearchBarResultRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('fetchSearchBarResultsSaga saga catch block', () => {
	const payload = {
		isFAQResults : 'isFAQResults'
	};
	const iterator = saga.fetchSearchBarResultsSaga({payload});
	iterator.next();
	const response = {};
	test('getSearchBarResultRequestFailure testing', () => {
		expect(iterator.throw(response).value).toEqual(put(getSearchBarResultRequestFailure(response)));
	});
});
describe('fetchResultsSaga saga if block', () => {
	const payload = { };
	const iterator = saga.fetchResultsSaga({payload});
	const data = {errorCode: 123};
	test('call getResults', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getResults, payload);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put getSearchResultRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(getSearchResultRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('fetchResultsSaga saga else block', () => {
	const payload = {};
	const iterator = saga.fetchResultsSaga({payload});
	const error = {};
	iterator.next();
	test('put getSearchResultRequestFailure', () => {
		const actualYield = iterator.next({error}).value;
		const expectedYield = put(getSearchResultRequestFailure(error));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('fetchResultsSaga saga catch block', () => {
	const payload = {};
	const iterator = saga.fetchResultsSaga({payload});
	iterator.next();
	const response = {};
	test('getSearchResultRequestFailure testing', () => {
		expect(iterator.throw(response).value).toEqual(put(getSearchResultRequestFailure(response)));
	});
});
describe('getResultsSaga saga ', () => {
	const iterator = getResultsSaga();
	test('get getResultsSaga -> fetchSearchBarResultsSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(GET_SEARCH_BAR_RESULT_REQUEST, saga.fetchSearchBarResultsSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get getResultsSaga -> fetchResultsSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(GET_SEARCH_RESULT_REQUEST, saga.fetchResultsSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});