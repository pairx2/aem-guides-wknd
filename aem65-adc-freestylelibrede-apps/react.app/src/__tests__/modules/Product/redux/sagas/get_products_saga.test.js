import {put, select, takeLeading} from 'redux-saga/effects';
import {GET_PRODUCTS_REQUEST, setProductsRequest} from '../../../../../modules/Product/redux/actions/get_products.action';
import * as saga from '../../../../../modules/Product/redux/sagas/get_products.saga';
import getProductsSaga from '../../../../../modules/Product/redux/sagas/get_products.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/siteData.js');

describe('fetchProductsSaga saga - productDetailsFetched = false', () => {
	const iterator = saga.fetchProductsSaga();
	test('select GetProductsReducer', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.GetProductsReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setProductsRequest', () => {
		const productDetailsFetched = false;
		const productData = undefined;
		const actualYield = iterator.next(productDetailsFetched).value;
		const expectedYield = put(setProductsRequest(productData));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('fetchProductsSaga saga - productDetailsFetched = true', () => {
	const iterator = saga.fetchProductsSaga();
	test('select GetProductsReducer', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.GetProductsReducer);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put setProductsRequest', () => {
		const productDetailsFetched = true;
		const productData = undefined;
		const actualYield = iterator.next(productDetailsFetched).value;
		const expectedYield = put(setProductsRequest(productData));
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('getProductsSaga saga ', () => {
	const iterator = getProductsSaga();
	test('get getProductsSaga -> fetchProductsSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLeading(GET_PRODUCTS_REQUEST, saga.fetchProductsSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});