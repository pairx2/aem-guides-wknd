import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildAddCouponToCartSchema} from '../../../../../modules/Cart/schemas/add_coupon_to_cart.schema';
import {
	ADD_COUPON_TO_CART_REQUEST,
	AddCouponRequestFailure,
	getCustomerCartRequestSuccess
} from '../../../../../modules/Cart/redux/actions/cart.action';
import addCouponCodeToCartSagas from '../../../../../modules/Cart/redux/sagas/add_coupon_to_cart.saga';
import * as saga from '../../../../../modules/Cart/redux/sagas/add_coupon_to_cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');


describe('addCouponCodeToCartSaga saga ', () => {
	const payload = {
		cartId : 'cartId',
		CouponCode : 'CouponCode'
	};
	const iterator = saga.addCouponCodeToCartSaga({payload});
	test('call sagaDataHandling testing', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(
			sagaDataHandling,
			Mutation,
			buildAddCouponToCartSchema(payload.cartId, payload.CouponCode),
			getCustomerCartRequestSuccess,
			AddCouponRequestFailure
		);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('addCouponCodeToCartSagas saga ', () => {
	const iterator = addCouponCodeToCartSagas();
	test('get addCouponCodeToCartSagas -> addCouponCodeToCartSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(ADD_COUPON_TO_CART_REQUEST, saga.addCouponCodeToCartSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});