import {combineReducers} from 'redux';
import {translationReducer} from './translation.reducer';

export const translationModuleReducer = combineReducers({
	translationReducer: translationReducer
});