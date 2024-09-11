import {SET_PRODUCTS_REQUEST} from '../actions/get_products.action';
import {empty} from '../../../../utils/default';

const initialState = {
	productDetailsFetched: false,
	products: empty.object,
	error: null
};
export const GetProductsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS_REQUEST:
			return {
				...state,
				productDetailsFetched: true,
				products: action.payload.products
			};
		default:
			return state;
	}
};