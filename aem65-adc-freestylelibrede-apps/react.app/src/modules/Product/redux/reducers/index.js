import {combineReducers} from 'redux';
import {GetProductsReducer} from './get_products.reducer';
import {getProductPricesReducer} from './get_product_prices.reducer';


export const productModuleReducer = combineReducers({
	GetProductsReducer,
	getProductPricesReducer
});