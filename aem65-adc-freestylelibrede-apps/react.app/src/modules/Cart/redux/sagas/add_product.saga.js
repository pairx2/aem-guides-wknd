import {call, takeLeading, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildAddProductSchema} from '../../schemas/add_product.schema';
import {
	ADD_MULTIPLE_PRODUCTS_REQUEST,
	ADD_PRODUCT_REQUEST,
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	ADD_SUBSCRIPTION_REQUEST
} from '../actions/cart.action';
import {getMagentoFormattedDate} from '../../../../utils/dateUtils';
import {_getCartId} from './cart.saga';
import {buildAddMultipleProductsSchema} from '../../schemas/add_multiple_products_schema';
import {buildAddSubscriptionSchema} from '../../schemas/add_subscription.schema';

export function* addProductSaga({payload}) {
	const formattedDate = payload.startDate ? getMagentoFormattedDate(payload.startDate) : '';
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildAddProductSchema(cartId, payload.sku, payload.qty, formattedDate),
		getCustomerCartRequestSuccess,
		getCustomerCartRequestFailure
	);
}

export function* addMultipleProductSaga({payload}) {
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildAddMultipleProductsSchema(cartId, payload.products),
		getCustomerCartRequestSuccess,
		getCustomerCartRequestFailure
	);
}

export function* addSubscriptionSaga({payload}) {
	const formattedDate = payload.startDate ? getMagentoFormattedDate(payload.startDate) : '';
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildAddSubscriptionSchema(cartId, payload.sku, payload.qty, formattedDate, payload.bundleId, payload.optionId),
		getCustomerCartRequestSuccess,
		getCustomerCartRequestFailure
	);
}

export default function* addProductSagas() {
	yield takeLeading(ADD_PRODUCT_REQUEST, addProductSaga);
	yield takeEvery(ADD_MULTIPLE_PRODUCTS_REQUEST, addMultipleProductSaga);
	yield takeLeading(ADD_SUBSCRIPTION_REQUEST, addSubscriptionSaga);
}