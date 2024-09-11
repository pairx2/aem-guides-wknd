import {call, put, takeEvery, select} from 'redux-saga/effects';
import {DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST_SUCCESS, deleteProductRequestSuccess, deleteProductRequestFailure} from '../../../../../modules/Cart/redux/actions/cart.action';
import {getCustomerCartRequest} from '../../../../../modules/Cart/redux/actions/cart.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import deleteProductSagas from '../../../../../modules/Cart/redux/sagas/delete_product.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/delete_product.saga';
import {buildDeleteProductSchema} from '../../../../../modules/Cart/schemas/delete_product.schema';
import {Mutation} from '../../../../../api/graphql.config';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('deleteProductSaga saga ', () => {
	const payload = {
		itemId : '1',
		cartId : '12'
	};
	const iterator = saga.deleteProductSaga({payload});
	test('call _getCartId testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(_getCartId);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call itemsInCart testing', () => {
		const cartId = '1234';
		const actualYield = iterator.next({cartId}).value;
		const expectedYield = select(saga.itemsInCart);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling', () => {
		const itemsListInCart = {};
		const cartId = '1234';
		const actualYield = iterator.next(itemsListInCart).value;
		const expectedYield =  call(sagaDataHandling,
			Mutation,
			buildDeleteProductSchema(cartId, payload.itemId),
			deleteProductRequestSuccess,
			deleteProductRequestFailure);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('deleteProductRequestSuccessSaga saga ', () => {
	const payload = {
		itemId : '1',
		cartId : '12'
	};
	const iterator = saga.deleteProductRequestSuccessSaga({payload});
	test('put getCustomerCartRequest', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(getCustomerCartRequest(payload.cartId));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('deleteProductSagas saga ', () => {
	const iterator = deleteProductSagas();
	test('get deleteProductSagas -> deleteProductSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(DELETE_PRODUCT_REQUEST, saga.deleteProductSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get deleteProductSagas -> deleteProductRequestSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(DELETE_PRODUCT_REQUEST_SUCCESS, saga.deleteProductRequestSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});