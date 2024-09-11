import { call, put, select, takeLeading } from 'redux-saga/effects';
import { FETCH_DICTIONARY_REQUEST, setDictionary } from '../../../../../modules/Translation/redux/actions/translation.actions';
import { getDictionary,getLocalDictionary } from '../../../../../modules/Translation/api/translation.api';
import * as saga from '../../../../../modules/Translation/redux/sagas/translation.saga';
import translationSaga from '../../../../../modules/Translation/redux/sagas/translation.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('fetchDictionarySaga saga - dictionaryFetched = false', () => {
	const iterator = saga.fetchDictionarySaga();
	test('select translationReducer', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.translationReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getDictionary', () => {
		const dictionaryFetched = false;
		const actualYield = iterator.next(dictionaryFetched).value;
		const expectedYield = call(getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setDictionary', () => {
		const data = { response: {} };

		const actualYield = iterator.next(data).value;
		const expectedYield = put(setDictionary(data));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setDictionary on error', () => {
		const spyError = jest.spyOn( console, 'error' );
		iterator.throw();
		expect(spyError).toHaveBeenCalled();

		const data = { response: {} };
		const actualYield1 = iterator.next(data).value;
		const expectedYield1 = put(setDictionary(data));
		expect(actualYield1).toEqual(expectedYield1)
	});
});

describe('fetchDictionarySaga saga - dictionaryFetched = true', () => {
	const iterator = saga.fetchDictionarySaga();
	test('select translationReducer', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.translationReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getDictionary', () => {
		const dictionaryFetched = true;
		const actualYield = iterator.next(dictionaryFetched).value;
		const expectedYield = call(getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setDictionary', () => {
		const data = { response: {} };
		const actualYield = iterator.next(data).value;
		const expectedYield = put(setDictionary(data));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('translationSaga saga ', () => {
	const iterator = translationSaga();
	test('get translationSaga -> fetchDictionarySaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(FETCH_DICTIONARY_REQUEST, saga.fetchDictionarySaga);
		expect(actualYield).toEqual(expectedYield);
	});
});