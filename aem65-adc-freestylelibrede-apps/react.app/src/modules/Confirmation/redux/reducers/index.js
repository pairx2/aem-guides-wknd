import {combineReducers} from 'redux';
import {OrderIdModuleReducer} from './place_order.reducer';

export const paymentIdReducer = combineReducers({
	OrderIdModuleReducer,
});