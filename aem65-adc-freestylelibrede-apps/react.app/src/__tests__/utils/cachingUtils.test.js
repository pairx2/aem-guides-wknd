import '@testing-library/jest-dom/extend-expect';
import {TRANSLATION_REDUCER, PRODUCT_PRICES_REDUCER, cacheAnonymousCartId, deleteAnonymousCartIdFromCache,
	getAnonymousCartIdFromCache, cacheReducerState, restoreReducerState, deleteReducerStateFromCache} from '../../utils/cachingUtils';

describe('test REDUCER', () => {

	test('TRANSLATION_REDUCER', async () => {
		const result = TRANSLATION_REDUCER;
		expect(result).toBeDefined();
		expect(result).toBe('translationModuleReducer.translationReducer');
	});

	test('PRODUCT_PRICES_REDUCER', async () => {
		const result = PRODUCT_PRICES_REDUCER;
		expect(result).toBeDefined();
		expect(result).toBe('productModuleReducer.getProductPricesReducer');
	});
});

describe('test methods', () => {

	test('test cacheAnonymousCartId without id', async () => {
		const result = cacheAnonymousCartId();
		expect(result).toBeUndefined();
	});

	test('test cacheAnonymousCartId with id', async () => {
		const result = cacheAnonymousCartId('id');
		expect(result).toBeUndefined();
	});

	test('test deleteAnonymousCartIdFromCache', async () => {
		const result = deleteAnonymousCartIdFromCache();
		expect(result).toBeUndefined();
	});

	test('test getAnonymousCartIdFromCache', async () => {
		const result = getAnonymousCartIdFromCache();
		expect(result).toBe(null);
	});

	test('test cacheReducerState', async () => {
		const state={};
		const key= 'key';
		const result = cacheReducerState(state, key);
		expect(result).toBeUndefined();
	});

	test('test cacheReducerState without arguments', async () => {
		const result = cacheReducerState();
		expect(result).toBeUndefined();
	});

	test('test restoreReducerState with key', async () => {
		const key= 'key';
		const result = restoreReducerState(key);
		expect(result).toEqual({});
	});

	test('test restoreReducerState without key', async () => {
		const result = restoreReducerState();
		expect(result).toBeUndefined();
	});

	test('test deleteReducerStateFromCache', async () => {
		const key= 'key';
		const result = deleteReducerStateFromCache(key);
		expect(result).toBeUndefined();
	});

	test('test deleteReducerStateFromCache without key', async () => {
		const result = deleteReducerStateFromCache();
		expect(result).toBeUndefined();
	});

});