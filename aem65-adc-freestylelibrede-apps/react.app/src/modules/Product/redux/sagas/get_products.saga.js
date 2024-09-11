import {put, select, takeLeading} from 'redux-saga/effects';
import {GET_PRODUCTS_REQUEST, setProductsRequest} from '../actions/get_products.action';
import {getRequiredSiteData} from '../../../../utils/siteData';
export const GetProductsReducer = state => state.productModuleReducer.GetProductsReducer;

export function* fetchProductsSaga() {
	const {productDetailsFetched} = yield select(GetProductsReducer);
	if (!productDetailsFetched) {
		const productData = getRequiredSiteData('productData');
		yield put(setProductsRequest(productData));
	}
}

export default function* getProductsSaga() {
	yield takeLeading(GET_PRODUCTS_REQUEST, fetchProductsSaga);
}