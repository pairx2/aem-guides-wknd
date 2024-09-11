import {call, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../api/graphql.config';
import {buildUpdateProductSchema} from '../../schemas/update_product.schema';
import {
	getCustomerCartRequestFailure,
	getCustomerCartRequestSuccess,
	UPDATE_PRODUCT_REQUEST
} from '../actions/cart.action';
import {_getCartId} from './cart.saga';

export function* updateProductSaga({payload}) {
	const {cartId} = yield call(_getCartId);
	yield call(
		sagaDataHandling,
		Mutation,
		buildUpdateProductSchema(cartId, payload.id, payload.qty),
		getCustomerCartRequestSuccess,
		getCustomerCartRequestFailure
	);
}
export default function* updateProductSagas() {
	yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductSaga);
}