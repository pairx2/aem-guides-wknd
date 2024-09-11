import {createStore} from 'redux';
import {mockProductReducer} from '../Product/components/ProductDetails/mockProductReducer';
import {mockProductPricesReducer} from '../Product/components/ProductDetails/mockProductPricesReducer';
import {mockReaderReducer} from '../Product/components/ProductDetails/mockReaderReducer';

//Product Details Mocks
export const mockProductStore = createStore(mockProductReducer);
export const mockReaderStore = createStore(mockReaderReducer);
export const mockProductPricesStore = createStore(mockProductPricesReducer);

