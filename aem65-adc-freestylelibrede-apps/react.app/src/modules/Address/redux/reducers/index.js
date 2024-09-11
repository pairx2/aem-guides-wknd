import {combineReducers} from 'redux';
import {AddressReducer} from './address.reducer';
import {TypeaheadReducer} from './typeahead.reducer';

export const addressModuleReducer = combineReducers({
	AddressReducer,
	TypeaheadReducer
});