import {call, takeLatest} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildUpdateShippingOptionsSchema} from '../../schemas/update_shipping_options_schema';
import {UPDATE_SHIPPING_OPTIONS_REQUEST} from '../actions/shipping_options_action';
import {_getCartId} from './cart.saga';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess
} from '../actions/cart.action';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';

export function* updateShippingOptionsSaga({payload}) {
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateShippingOptionsSchema(cartId, payload.carrierCode, payload.methodCode),
		isRxCheckoutPageType() ? null : getCustomerCartRequestSuccess,
		getCustomerCartRequestFailure
	);
}
export default function* updateShippingOptionsSagas() {
	yield takeLatest(UPDATE_SHIPPING_OPTIONS_REQUEST, updateShippingOptionsSaga);
}