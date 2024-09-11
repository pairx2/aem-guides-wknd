import {call, takeEvery, select, put} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	SET_BILLING_ADDRESS_ON_CART,
	SET_SHIPPING_ADDRESS_ON_CART
} from '../actions/cart.action';

import {buildSetShippingAddressOnCartSchema} from '../../schemas/set_shipping_address_on_cart.schema';
import {buildSetBillingAddressOnCartSchema} from '../../schemas/set_billing_address_on_cart.schema';
import {_getCartId} from './cart.saga';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {getGhostCartRequestSuccess, getGhostCartRequestFailure} from '../actions/ghost_cart.action';
import {getCustomerRequest} from '../../../MyAccount/redux/actions/customer.action';

export const getRssResultReducer = state => isRxCheckoutPageType() ? state.addressModuleReducer.AddressReducer.addresses.account : state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
const cartRequest = isRxCheckoutPageType() ? getGhostCartRequestSuccess : getCustomerCartRequestSuccess;

export function* setAddressOnCartSaga({payload}) {
	const {rssResultCode, isBlacklisted, isVerified} = yield select(getRssResultReducer);
	const {cartId} = yield call(_getCartId, false, false, isRxCheckoutPageType());
	if (cartId) {
		yield call(
			sagaDataHandling,
			Mutation,
			buildSetShippingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, rssResultCode, isBlacklisted, isVerified),
			payload.fetchCart ? (cartRequest) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		if(payload.saveToAccount){
			yield put(getCustomerRequest());
		}
	}
}
export function* setBillingAddressOnCartSaga({payload}) {
	const {rssResultCode, isBlacklisted, isVerified} = yield select(getRssResultReducer);
	const {cartId} = yield call(_getCartId, false, false, isRxCheckoutPageType());
	if (cartId) {
		yield call(
			sagaDataHandling,
			Mutation,
			buildSetBillingAddressOnCartSchema(cartId, payload.address, payload.saveToAccount, rssResultCode, isBlacklisted, isVerified),
			payload.fetchCart ? (cartRequest) : null,
			isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
		);
		if(payload.saveToAccount){
			yield put(getCustomerRequest());
		}
	}
}
export default function* setAddressOnCartSagas() {
	yield takeEvery(SET_SHIPPING_ADDRESS_ON_CART, setAddressOnCartSaga);
	yield takeEvery(SET_BILLING_ADDRESS_ON_CART, setBillingAddressOnCartSaga);
}
