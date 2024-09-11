import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildRemoveCouponFromCartSchema} from '../../../../../modules/Cart/schemas/remove_coupon_from_cart.schema';
import {
	RemoveCouponRequestFailure,
	getCustomerCartRequestSuccess,
	REMOVE_COUPON_FROM_CART_REQUEST
} from '../../../../../modules/Cart/redux/actions/cart.action';
import {_getCartId} from '../../../../../modules/Cart/redux/sagas/cart.saga';
import removeCartFromCartSagas from '../../../../../modules/Cart/redux/sagas/remove_coupon_from_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/remove_coupon_from_cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');

describe('removeCartFromCartSaga saga ', () => {
	const iterator = saga.removeCartFromCartSaga();
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
			buildRemoveCouponFromCartSchema(cartId),
			getCustomerCartRequestSuccess,
			RemoveCouponRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('removeCartFromCartSagas saga ', () => {
	const iterator = removeCartFromCartSagas();
	test('get removeCartFromCartSagas -> removeCartFromCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(REMOVE_COUPON_FROM_CART_REQUEST, saga.removeCartFromCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});