import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildRemoveCouponFromCartSchema} from '../../schemas/remove_coupon_from_cart.schema';
import {
	RemoveCouponRequestFailure,
	getCustomerCartRequestSuccess,
	REMOVE_COUPON_FROM_CART_REQUEST
} from '../actions/cart.action';
import {_getCartId} from './cart.saga';

export function* removeCartFromCartSaga() {
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildRemoveCouponFromCartSchema(cartId),
		getCustomerCartRequestSuccess,
		RemoveCouponRequestFailure
	);
}
export default function* removeCartFromCartSagas() {
	yield takeEvery(REMOVE_COUPON_FROM_CART_REQUEST, removeCartFromCartSaga);
}