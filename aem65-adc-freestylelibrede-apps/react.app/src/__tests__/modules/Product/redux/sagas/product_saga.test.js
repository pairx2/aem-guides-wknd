import {call, takeEvery} from 'redux-saga/effects';
import {
	GET_PRODUCT_PRICE_REQUEST,
	getProductPriceRequestFailure,
	getProductPriceRequestSuccess
} from '../../../../../modules/Product/redux/actions/get_product_price.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {buildGetProductPriceSchema} from '../../../../../modules/Product/redux/schemas/get_product_price.schema';
import * as saga from '../../../../../modules/Product/redux/sagas/product.saga';
import productSaga from '../../../../../modules/Product/redux/sagas/product.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('fetchProductPriceSaga saga', () => {
	const payload = {};
	const iterator = saga.fetchProductPriceSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Query,
			buildGetProductPriceSchema(payload),
			getProductPriceRequestSuccess,
			getProductPriceRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('productSaga saga ', () => {
	const iterator = productSaga();
	test('get productSaga -> fetchProductPriceSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(GET_PRODUCT_PRICE_REQUEST, saga.fetchProductPriceSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});