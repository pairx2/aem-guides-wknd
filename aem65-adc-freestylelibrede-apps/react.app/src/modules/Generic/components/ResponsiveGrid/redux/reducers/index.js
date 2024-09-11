import {combineReducers} from 'redux';
import {responsiveGridReducer} from './responsivegrid.reducer';

export const responsiveGridModuleReducer = combineReducers({
	responsiveGridReducer: responsiveGridReducer
});