import {combineReducers} from 'redux';
import { offlineToOnlineReducer} from './validate_offline_customer.reducer';
import { registerOfflineCustomerReducer } from './register_offline_customer.reducer';
import { confirmOfflineCustomerReducer } from './confirm_offline_customer.reducer'

export const offlineToOnlineModuleReducer = combineReducers({
	offlineToOnlineReducer,
	registerOfflineCustomerReducer,
	confirmOfflineCustomerReducer
});