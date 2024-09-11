import {put, takeEvery} from 'redux-saga/effects';
import {
	GET_COMPONENT_HTML,
	GET_EDIT_CONTEXT_REQUEST,
	getComponentHTMLRequestFailure,
	getComponentHTMLRequestSuccess,
	getEditContextRequestFailure,
	getEditContextRequestSuccess
} from '../../../../../../../modules/Generic/components/ResponsiveGrid/redux/actions/responsivegrid.action';
import * as saga from '../../../../../../../modules/Generic/components/ResponsiveGrid/redux/sagas/responsivegrid.saga';
import responsiveGridSagas from '../../../../../../../modules/Generic/components/ResponsiveGrid/redux/sagas/responsivegrid.saga';
jest.mock('../../../../../../../utils/endpointUrl.js');

describe('responsiveGridSaga saga ', () => {
	const payload = {
		path : 'path'
	};
	const data = {};
	const iterator = saga.responsiveGridSaga({payload});
	test('put getEditContextRequestSuccess', () => {
		iterator.next();
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(getEditContextRequestSuccess({
			path: payload.path,
			editContext: data
		}));
		expect(actualYield).toMatchObject(expectedYield);
	});
});
describe('responsiveGridSaga saga ', () => {
	const payload = {
		path : 'path'
	};
	const iterator = saga.responsiveGridSaga({payload});
	test('put getEditContextRequestFailure', () => {
		iterator.next();
		const actualYield = iterator.next('failed to fetch edit context').value;
		const expectedYield =  put(getEditContextRequestFailure('failed to fetch edit context'));
		expect(actualYield).toMatchObject(expectedYield);
	});
});
describe('responsiveGridSaga saga incatch', () => {
	const payload = {
		path : 'path'
	};
	const iterator = saga.responsiveGridSaga({payload});
	test('put getEditContextRequestFailure', () => {
		iterator.next();
		expect(iterator.throw('failed to fetch edit context').value)
			.toEqual(put(getEditContextRequestFailure('failed to fetch edit context')));
	});
});
describe('responsiveGridGetComponentHtmlSaga saga ', () => {
	const payload = {
		path : 'path',
		editor : 'editor'
	};
	const data = {};
	const iterator = saga.responsiveGridGetComponentHtmlSaga({payload});
	test('put getComponentHTMLRequestSuccess', () => {
		iterator.next();
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(getComponentHTMLRequestSuccess({
			path: payload.path,
			html: data
		}));
		expect(actualYield).toMatchObject(expectedYield);
	});
});
describe('responsiveGridGetComponentHtmlSaga saga ', () => {
	const payload = {
		path : 'path',
		editor : 'editor'
	};
	const iterator = saga.responsiveGridGetComponentHtmlSaga({payload});
	test('put getComponentHTMLRequestFailure', () => {
		iterator.next();
		const actualYield = iterator.next('failed to fetch edit context').value;
		const expectedYield =  put(getComponentHTMLRequestFailure('failed to fetch component html'));
		expect(actualYield).toMatchObject(expectedYield);
	});
});
describe('responsiveGridGetComponentHtmlSaga saga incatch', () => {
	const payload = {
		path : 'path',
		editor : 'editor'
	};
	const iterator = saga.responsiveGridGetComponentHtmlSaga({payload});
	test('put getComponentHTMLRequestFailure', () => {
		iterator.next();
		expect(iterator.throw('failed to fetch edit context').value)
			.toEqual(put(getComponentHTMLRequestFailure('failed to fetch component html')));
	});
});
describe('responsiveGridSagas saga ', () => {
	const iterator = responsiveGridSagas();
	test('get responsiveGridSagas -> responsiveGridSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(GET_EDIT_CONTEXT_REQUEST, saga.responsiveGridSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get responsiveGridSagas -> responsiveGridGetComponentHtmlSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(GET_COMPONENT_HTML, saga.responsiveGridGetComponentHtmlSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});
