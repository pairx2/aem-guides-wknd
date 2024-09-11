import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildAddCouponToCartSchema} from '../../schemas/add_coupon_to_cart.schema';
import {
	ADD_COUPON_TO_CART_REQUEST,
	AddCouponRequestFailure,
	getCustomerCartRequestSuccess
} from '../actions/cart.action';

export function* addCouponCodeToCartSaga({payload}) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildAddCouponToCartSchema(payload.cartId, payload.CouponCode),
		getCustomerCartRequestSuccess,
		AddCouponRequestFailure
	);
}
export default function* addCouponCodeToCartSagas() {
	yield takeEvery(ADD_COUPON_TO_CART_REQUEST, addCouponCodeToCartSaga);
}
