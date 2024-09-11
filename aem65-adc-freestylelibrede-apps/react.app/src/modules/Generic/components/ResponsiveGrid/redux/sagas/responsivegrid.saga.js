import {call, put, takeEvery} from 'redux-saga/effects';
import {
	GET_COMPONENT_HTML,
	GET_EDIT_CONTEXT_REQUEST,
	getComponentHTMLRequestFailure,
	getComponentHTMLRequestSuccess,
	getEditContextRequestFailure,
	getEditContextRequestSuccess
} from '../actions/responsivegrid.action';
import {getComponentHTML, getEditContext} from '../../api/responsivegrid.api';

export function* responsiveGridSaga({payload}) {
	try {
		const {data} = yield call(getEditContext, payload.path);
		if (data) {
			yield put(getEditContextRequestSuccess({
				path: payload.path,
				editContext: data
			}));
		} else {
			yield put(getEditContextRequestFailure('failed to fetch edit context'));
		}
	} catch (e) {
		yield put(getEditContextRequestFailure('failed to fetch edit context'));
	}
}

export function* responsiveGridGetComponentHtmlSaga({payload}) {
	try {
		const {data} = yield call(getComponentHTML, payload.editor, payload.path);
		if (data) {
			yield put(getComponentHTMLRequestSuccess({
				path: payload.path,
				html: data
			}));
		} else {
			yield put(getComponentHTMLRequestFailure('failed to fetch component html'));
		}
	} catch (e) {
		yield put(getComponentHTMLRequestFailure('failed to fetch component html'));
	}
}

export default function* responsiveGridSagas() {
	yield takeEvery(GET_EDIT_CONTEXT_REQUEST, responsiveGridSaga);
	yield takeEvery(GET_COMPONENT_HTML, responsiveGridGetComponentHtmlSaga);
}
