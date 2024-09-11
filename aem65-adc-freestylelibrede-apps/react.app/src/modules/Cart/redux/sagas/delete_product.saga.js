import {call, put, takeEvery, select} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildDeleteProductSchema} from '../../schemas/delete_product.schema';
import {DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST_SUCCESS} from '../actions/cart.action';
import {getCustomerCartRequest, deleteProductRequestSuccess, deleteProductRequestFailure} from '../actions/cart.action';
import {_getCartId} from './cart.saga';

export const itemsInCart = (state) => state.cartModuleReducer.GetCustomerCartReducer.cartDetails.items;

export function* deleteProductSaga({payload}) {
	const {cartId} = yield call(_getCartId);
	const itemsListInCart = yield select(itemsInCart);
	yield call(
		sagaDataHandling,
		Mutation,
		buildDeleteProductSchema(cartId, payload.itemId),
		deleteProductRequestSuccess,
		deleteProductRequestFailure
	);
	const deletedProduct = itemsListInCart?.find(item => payload.itemId === item.id);
	localStorage.setItem('deletedProductFromCart', JSON.stringify(deletedProduct));
}

export function* deleteProductRequestSuccessSaga({payload}) {
	yield put(getCustomerCartRequest(payload.cartId));
}

export default function* deleteProductSagas() {
	yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductSaga);
	yield takeEvery(DELETE_PRODUCT_REQUEST_SUCCESS, deleteProductRequestSuccessSaga);
}