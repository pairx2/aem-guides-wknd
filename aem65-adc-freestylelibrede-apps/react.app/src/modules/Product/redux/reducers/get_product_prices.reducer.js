import {
	GET_PRODUCT_PRICE_REQUEST_FAILURE,
	GET_PRODUCT_PRICE_REQUEST_SUCCESS
} from '../actions/get_product_price.action';
import {PRODUCT_PRICES_REDUCER, restoreReducerState} from '../../../../utils/cachingUtils';


const initialState = {
	productPrices: {},
	error: null,
	...restoreReducerState(PRODUCT_PRICES_REDUCER)
};
export const getProductPricesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCT_PRICE_REQUEST_SUCCESS:
			return {
				...state,
				productPrices: {
					...state.productPrices,
					[action.payload.adcProductDetails.product.sku]: action.payload.adcProductDetails.product
				}
			};
		case GET_PRODUCT_PRICE_REQUEST_FAILURE:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};