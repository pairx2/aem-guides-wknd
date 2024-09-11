import {takeEvery, select, put} from 'redux-saga/effects';
import {DOWNLOAD_DOCUMENT_REQUEST} from '../../../../../modules/MyAccount/redux/actions/download_document.action';
import downloadDocumentSagas from '../../../../../modules/MyAccount/redux/sagas/download_document.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/download_document.saga';
import {i18nLabels} from '../../../../../utils/translationUtils';
import {OPEN_MODAL_ACTION} from '../../../../../modules/Modal/redux/actions';

jest.mock('../../../../../utils/endpointUrl.js');

describe('downloadDocumentSaga - payload null', () => {
	const payload = null;
	const iterator = saga.downloadDocumentSaga({payload});
	test('put OPEN_MODAL_ACTION', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put OPEN_MODAL_ACTION', () => {
		const dictionary = {};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield = put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.GENERAL_ERROR,
				contentID: 'generalErrorModal',
				props: {
					errorTitle: i18nLabels.DOCUSMENT_DOWNLOAD_ERROR_TITLE,
					errorMessage: i18nLabels.DOCUMENT_DOWNLOAD_ERROR
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('downloadDocumentSaga - payload not null', () => {
	const payload = {
		fileName:'cecfile',
		fileContent:'testfielcontent'
	};
	const iterator = saga.downloadDocumentSaga({payload});
	test('select getDictionary', () => {
		const actualYield = iterator.next().value;
		const expectedYield = select(saga.getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put OPEN_MODAL_ACTION', () => {
		global.URL.createObjectURL = jest.fn(() => 'test details');
		const dictionary = {};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield = undefined;
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('downloadDocumentSaga test failure saga in try block', () => {
	const payload = {};
	const iterator = saga.downloadDocumentSaga({payload});
	test('test downloadBase64', () => {
		iterator.next();

	});
});
describe('downloadDocumentSagas saga takeEvery calls', () => {
	const iterator = downloadDocumentSagas();
	test('get downloadDocumentSagas -> DOWNLOAD_DOCUMENT_REQUEST', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(DOWNLOAD_DOCUMENT_REQUEST, saga.downloadDocumentSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});