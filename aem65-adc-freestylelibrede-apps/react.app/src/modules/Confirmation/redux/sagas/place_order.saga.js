import {call, put, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	placeOrderFailure,
	placeOrderSuccess
} from '../actions/place_order.action';
import {Mutation} from '../../../../api/graphql.config';
import {
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess
} from '../../../Cart/redux/actions/cart_id_action';
import {getCustomerCartRequest} from '../../../Cart/redux/actions/cart.action';
import {closeModalAction} from '../../../Modal/redux/actions';
import {_getCartId} from '../../../Cart/redux/sagas/cart.saga';
import {buildPlaceOrderSchema} from '../../schemas/place_order.schema';
import {getGhostCartIdRequestSuccess} from '../../../Cart/redux/actions/ghost_cart.action';

export function* placeOrder(cartId, paymentId, isSavedPayment, orderId) {
	yield call(
		sagaDataHandling,
		Mutation,
		buildPlaceOrderSchema(cartId, paymentId, isSavedPayment, orderId),
		placeOrderSuccess,
		placeOrderFailure
	);
}

export function* PlaceOrderRequestSaga({payload: {isReimbursementOrder, paymentId, isSavedPayment, orderId}}) {
	const {data, error, cartId} = yield call(_getCartId,false, false, isReimbursementOrder);
	if (data) {
		isReimbursementOrder ? yield put(getGhostCartIdRequestSuccess(data)) : yield put(getCustomerCartIdRequestSuccess(data));
		yield call(placeOrder, cartId, paymentId, isSavedPayment, orderId);
	} else {
		yield put(getCustomerCartIdRequestFailure(error));
	}
}

export function* PlaceOrderSuccess(){
	yield put(getCustomerCartRequest({forceNewCustomerCartId: true}));
	yield put(closeModalAction());
}

export default function* PlaceOrderRequestSagas() {
	yield takeEvery(PLACE_ORDER_REQUEST, PlaceOrderRequestSaga);
	yield takeEvery(PLACE_ORDER_SUCCESS, PlaceOrderSuccess);
}