import {call, takeEvery, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildSetPaymentMethodOnCartSchema} from '../../schemas/set_payment_method_on_cart.schema';
import {
	getCustomerCartRequestFailure,
	SetPaymentMethodOnCartRequestSuccess,
	SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST
} from '../actions/cart.action';
import {_getCartId} from './cart.saga';
import {buildSetSavedPaymentMethodOnCartSchema} from '../../schemas/set_saved_payment_method_on_cart.schema';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {getGhostCartRequestFailure, setPaymentMethodOnGhostCartRequestSuccess} from '../actions/ghost_cart.action';


export const GetAvailablePaymentMethodsReducer = state => localStorage.getItem('newPaymentFlow') ? 
																	state.cartModuleReducer.GetAvailablePaymentMethodsGraphqlReducer :
																	state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;

export function* setSavedPaymentMethodOnCartSaga({payload}) {
	const {cartId} = yield call(_getCartId, false, false, isRxCheckoutPageType());
	const {communicationToken} = yield select(GetAvailablePaymentMethodsReducer);
	yield call(
		sagaDataHandling,
		Mutation,
		buildSetSavedPaymentMethodOnCartSchema(cartId, payload.paymentMethod, payload.token, communicationToken),
		isRxCheckoutPageType() ? setPaymentMethodOnGhostCartRequestSuccess : SetPaymentMethodOnCartRequestSuccess,
		isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
	);
}

export function* _setPaymentMethodOnCart(payload) {
	const {cartId} = yield call(_getCartId, false, false, isRxCheckoutPageType());
	const {communicationToken} = yield select(GetAvailablePaymentMethodsReducer);
	yield call(
		sagaDataHandling,
		Mutation,
		buildSetPaymentMethodOnCartSchema(cartId, payload.paymentMethod, payload.isSavePaymentMethod, payload.paymentMethodToken, communicationToken),
		isRxCheckoutPageType() ? setPaymentMethodOnGhostCartRequestSuccess : SetPaymentMethodOnCartRequestSuccess,
		isRxCheckoutPageType() ? getGhostCartRequestFailure : getCustomerCartRequestFailure
	);
}

export default function* setPaymentMethodOnCartSagas() {
	yield takeEvery(SET_SAVED_PAYMENT_METHOD_ON_CART_REQUEST, setSavedPaymentMethodOnCartSaga);
}
