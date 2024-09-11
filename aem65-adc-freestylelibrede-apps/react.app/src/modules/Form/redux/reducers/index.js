import {combineReducers} from 'redux';
import {formReducer} from './form.reducer';

export const formModuleReducer = combineReducers({
	formReducer: formReducer
});