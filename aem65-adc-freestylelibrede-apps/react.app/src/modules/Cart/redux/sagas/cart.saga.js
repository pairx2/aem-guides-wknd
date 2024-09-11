import {call, put, select, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation, Query} from '../../../../api/graphql.config';
import {GET_CUSTOMER_CART_ID_SCHEMA} from '../../schemas/get_cart_id.schema';
import {buildGetCustomerCartSchema} from '../../schemas/get_cart.schema';
import {buildMergeCartSchema} from '../../schemas/merge_cart.schema';
import {getServiceEndPoint} from '../../../../utils/endpointUrl';


import {
	GET_CUSTOMER_CART_REQUEST,
	getCustomerCartRequest,
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	RETRY_GET_CUSTOMER_CART_REQUEST,
	retryGetCustomerCartRequest,
} from '../actions/cart.action';
import {
	setCustomerCartId,
	getCustomerCartIdRequestFailure,
	getCustomerCartIdRequestSuccess
} from '../actions/cart_id_action';
import {getJwtToken} from '../../../../api/authentication.service';
import {
	cacheAnonymousCartId,
	deleteAnonymousCartIdFromCache,
	getAnonymousCartIdFromCache
} from '../../../../utils/cachingUtils';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {GET_GHOST_CART_ID_SCHEMA} from '../../schemas/get_ghost_cart_id.schema';
import {getGhostCartIdRequestSuccess, getGhostCartIdRequestFailure, getGhostCartRequestSuccess} from '../actions/ghost_cart.action';
import {getUrlParameter} from '../../../../utils/getParams';

export const CART_TYPE = {
	GHOST: 'ghost',
	NORMAL: 'normal'
};

export const getCartId = (state) => state.cartModuleReducer.GetCustomerCartIdReducer.cartId;
export const getGhostCartId = (state) => state.cartModuleReducer.GhostCartReducer.id;

export function* getCustomerCartDetails({cartId, localCartIdCleared, cartType}) {
	yield call(
		sagaDataHandling,
		Query,
		buildGetCustomerCartSchema(cartId),
		cartType === CART_TYPE.NORMAL ? getCustomerCartRequestSuccess : getGhostCartRequestSuccess,
		localCartIdCleared ? getCustomerCartRequestFailure : retryGetCustomerCartRequest
	);
}

export function* _getJwtToken() {
	let jwtToken;
	try {
		jwtToken = yield call(getJwtToken);
	} catch (e) {
		jwtToken = undefined;
	}
	return jwtToken;
}

/**
 *
 * @param forceCustomerCart set this parameter to make sure this call fetches the actual cart id instead of the ghost cart id
 * @param forceNewCustomerCartId set this parameter to make sure this call fetches a new cart id instead of the stored one
 * @param forceRxCart set this parameter to make sure this call fetches the ghost cart id instead of the actual cart id
 * even though it's in the RX flow
 */
export function* _getCartId(forceCustomerCart, forceNewCustomerCartId, forceRxCart) {
	const jwtToken = yield call(_getJwtToken);
	const registrationRedirect = getUrlParameter('registrationRedirect');
	const currentPage = window.location.href;
	const loginPageUrl = getServiceEndPoint('login.page.path');
	try {
		//need ghost/reimbursement cart id (exception: mini cart during RX checkout -> force normal cart id)
		if ((isRxCheckoutPageType() && !forceCustomerCart && forceRxCart) || forceRxCart) {
			const ghostCartId = yield select(getGhostCartId);
			if (!ghostCartId) {
				if (jwtToken) {
					let cartId, error;
					try {
						const {data} = yield call(Mutation, GET_GHOST_CART_ID_SCHEMA, jwtToken);
						cartId = data?.adcInitWebRxCart.cart.id;
					} catch (e) {
						error = e.graphQLErrors;
					}
					const data = {
						adcGetOrCreateCartId: cartId
					};
					cartId ? yield put(getGhostCartIdRequestSuccess(data)) : yield put(getGhostCartIdRequestFailure(error));
					return {data, error, cartId, cartType: CART_TYPE.GHOST};
				}
			} else {
				return {cartId: ghostCartId, cartType: CART_TYPE.GHOST};
			}
			//need normal cart id
		} else {
			let cartId = getAnonymousCartIdFromCache();
			let error = undefined;
			//no anonymous cart id exists
			if (!cartId) {
				//get authenticated/anonymous cart id from reducer
				cartId = yield select(getCartId);
				//no cart id exists in reducer
				if (!cartId || forceNewCustomerCartId) {
					try {
						//fetch new authenticated/anonymous cart id from Magento
						const {data} = yield call(Mutation, GET_CUSTOMER_CART_ID_SCHEMA, jwtToken);
						cartId = data && data.adcGetOrCreateCartId || undefined;
						//store authenticated/anonymous cart id in reducer
						yield put(getCustomerCartIdRequestSuccess(data));
					} catch (e) {
						error = e.graphQLErrors;
					}
				}
				//anonymous cart )id exists and use is logged in
			} else if (jwtToken && currentPage !== loginPageUrl && !registrationRedirect) {
				try {
					const {data} = yield call(Mutation, buildMergeCartSchema(cartId), jwtToken);
					cartId = data && data.adcGetOrCreateCartId || undefined;
					//store authenticated/anonymous cart id in reducer
					yield put(getCustomerCartIdRequestSuccess(data));
				} catch (e) {
					error = e.graphQLErrors;
				}
			}
			//if user is authenticated & not in social registration
			 if (cartId && jwtToken && currentPage !== loginPageUrl && !registrationRedirect) {
				//remove anonymous cart id from storage
				deleteAnonymousCartIdFromCache();
				//if user is anonymous
			} else {
				//store anonymous cart id
				cacheAnonymousCartId(cartId);
			}
			const data = {
				adcGetOrCreateCartId: cartId
			};
			cartId ? yield put(getCustomerCartIdRequestSuccess(data)) : yield put(getCustomerCartIdRequestFailure(error));
			if(jwtToken && (currentPage === loginPageUrl || registrationRedirect)){
				return {};
			} else {
				return {data, error, cartId, cartType: CART_TYPE.NORMAL};
			}
		}
	} catch (e) {		
		return {};
	}
}

export function* getCustomerCartSaga({payload}) {
	const {error, cartId, cartType} = yield call(_getCartId, payload && payload.forceCustomerCart, payload && payload.forceNewCustomerCartId, payload && payload.forceRxCart);
	if (cartId) {
		yield call(getCustomerCartDetails, {
			cartId: cartId,
			localCartIdCleared: payload && payload.localCartIdCleared || false,
			cartType: cartType
		});
	} else {
		yield put(getCustomerCartIdRequestFailure(error));
	}
}

export function* retryGetCustomerCartSaga() {
	yield put(setCustomerCartId(null));
	deleteAnonymousCartIdFromCache();
	yield put(getCustomerCartRequest({
		localCartIdCleared: true
	}));
}

export default function* getCustomerCartSagas() {
	yield takeEvery(GET_CUSTOMER_CART_REQUEST, getCustomerCartSaga);
	yield takeEvery(RETRY_GET_CUSTOMER_CART_REQUEST, retryGetCustomerCartSaga);
}
