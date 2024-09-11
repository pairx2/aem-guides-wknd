import {createStore} from 'redux';
import {mockReducer} from './reducerMock';
import {mockReducerOrder} from './mockReducerOrder';
import {mockReducerConfirmationPage} from './mockReducerConfirmationPage';
import {mockReducerDataLayer} from './mockReducerDataLayer';
import {mockReducerPayment} from './paymentMockReducer';
import {mockReducerCart} from './cartReducerMock'

export const mockStoreDataLayer = createStore(mockReducerDataLayer);
export const mockStoreConfirmationPage = createStore(mockReducerConfirmationPage);
export const mockStore = createStore(mockReducer);
export const mockStoreOrder = createStore(mockReducerOrder);
export const paymentMockStore = createStore(mockReducerPayment);
export const mockReducerCartDetailsEmpty = createStore(mockReducerCart);