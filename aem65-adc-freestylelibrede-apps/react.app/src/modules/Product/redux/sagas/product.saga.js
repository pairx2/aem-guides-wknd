import {call, takeEvery} from 'redux-saga/effects';
import {
	GET_PRODUCT_PRICE_REQUEST,
	getProductPriceRequestFailure,
	getProductPriceRequestSuccess
} from '../actions/get_product_price.action';
import {sagaDataHandling} from '../../../../utils/sagaDataHandling';
import {Query} from '../../../../api/graphql.config';
import {buildGetProductPriceSchema} from '../schemas/get_product_price.schema';


export function* fetchProductPriceSaga({payload}) {
	yield call(
		sagaDataHandling,
		Query,
		buildGetProductPriceSchema(payload),
		getProductPriceRequestSuccess,
		getProductPriceRequestFailure
	);
}

export default function* productSaga() {
	yield takeEvery(GET_PRODUCT_PRICE_REQUEST, fetchProductPriceSaga);
}