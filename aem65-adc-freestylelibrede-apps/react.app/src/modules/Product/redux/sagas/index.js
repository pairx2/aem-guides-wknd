import {all} from 'redux-saga/effects';
import getProductsSaga from './get_products.saga';
import productSaga from './product.saga';

export default function* productModuleSaga() {
	yield all([
		getProductsSaga(),
		productSaga()
	]);
}