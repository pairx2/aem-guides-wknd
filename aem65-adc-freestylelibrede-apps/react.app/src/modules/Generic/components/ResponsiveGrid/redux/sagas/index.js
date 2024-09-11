import {all} from 'redux-saga/effects';
import responsiveGridSagas from './responsivegrid.saga';

export default function* responsiveGridModuleSaga() {
	yield all([
		responsiveGridSagas()
	]);
}