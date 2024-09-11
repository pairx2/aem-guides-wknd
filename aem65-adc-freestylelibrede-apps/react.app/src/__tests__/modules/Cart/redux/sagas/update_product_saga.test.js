import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildUpdateProductSchema} from '../../../../../modules/Cart/schemas/update_product.schema';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	UPDATE_PRODUCT_REQUEST
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import updateProductSagas from '../../../../../modules/Cart/redux/sagas/update_product.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/update_product.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('updateProductSaga saga ', () => {
	const payload = {
		id : '1',
		qty : '3'
	};
	const iterator = saga.updateProductSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildUpdateProductSchema(cartId, payload.id, payload.qty),
			getCustomerCartRequestSuccess,
			getCustomerCartRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('updateProductSagas saga ', () => {
	const iterator = updateProductSagas();
	test('get updateProductSagas -> updateProductSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_PRODUCT_REQUEST, saga.updateProductSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});