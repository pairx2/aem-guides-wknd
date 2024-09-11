import {call, put, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Query} from '../../../../api/graphql.config';
import {buildGetShippingOptionsSchema} from '../../schemas/get_shipping_options_schema';
import {
	getCustomerCartIdRequestFailure,
} from '../actions/cart_id_action';
import {
	GET_SHIPPING_OPTIONS_REQUEST,
	getShippingOptionsRequestFailure,
	getShippingOptionsRequestSuccess
} from '../actions/shipping_options_action';
import {_getCartId} from './cart.saga';

export function* getShippingOptionsDetails(cartId) {
	yield call(
		sagaDataHandling,
		Query,
		buildGetShippingOptionsSchema(cartId),
		getShippingOptionsRequestSuccess,
		getShippingOptionsRequestFailure
	);
}

export function* getShippingOptionsSaga() {
	const {data, error, cartId} = yield call(_getCartId);
	if (data) {
		yield call(getShippingOptionsDetails, cartId);
	} else {
		yield put(getCustomerCartIdRequestFailure(error));
	}
}
export default function* getShippingOptionsSagas() {
	yield takeLatest(GET_SHIPPING_OPTIONS_REQUEST, getShippingOptionsSaga);
}