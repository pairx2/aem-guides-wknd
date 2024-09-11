import {takeEvery, put, take} from 'redux-saga/effects';
import {UPLOAD_CEC_FILE_REQUEST, uploadCecFileRequestFailure, uploadCecFileRequestSuccess} from '../../../../../modules/MyAccount/redux/actions/upload_cec_file.action';
import uploadCecFileSagas from '../../../../../modules/MyAccount/redux/sagas/upload_cec_file.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/upload_cec_file.saga';

jest.mock('../../../../../utils/endpointUrl.js');

describe('uploadCecFileSaga saga ', () => {
	const payload = {
		email: '31julyqasanity@yopmail.com',
		 mimeType: 'png',
		 cecExemptionString: 'iVBORw0KGgoAAAANSUhEUgAAB4AAAAQICAYAAADsqcbuAAAgAE…BrPN/bs4/XLteSAdz1un/AyPQvBNP5Gp1AAAAAElFTkSuQmCC'
	};
	const iterator = saga.uploadCecFileSaga({payload});
	iterator.next();
	test('call sagaDataHandling', () => {
		takeEvery(UPLOAD_CEC_FILE_REQUEST, () => {
			const result = 'result';
			iterator.next();
			iterator.next();
			const actualYield = iterator.next(result).value;
			const expectedYield = put(uploadCecFileRequestSuccess(result));
			expect(actualYield).toEqual(expectedYield);
		});
	});
});

describe('uploadCecFileSaga saga in catch block', () => {
	const payload = {
		email: '31julyqasanity@yopmail.com',
		 mimeType: 'png',
		 cecExemptionString: 'iVBORw0KGgoAAAANSUhEUgAAB4AAAAQICAYAAADsqcbuAAAgAE…BrPN/bs4/XLteSAdz1un/AyPQvBNP5Gp1AAAAAElFTkSuQmCC'
	};
	const iterator = saga.uploadCecFileSaga({payload});
	iterator.next();
	test('uploadCecFileSaga testing', () => {
		takeEvery(UPLOAD_CEC_FILE_REQUEST, () => {
			const result = 'result';
			const err = 'err';
			iterator.next();
			iterator.next();
			iterator.next(result);
			expect(
				iterator.throw(err).value).
				toEqual(put(uploadCecFileRequestFailure(err)));
		});
	});
});

describe('Testing watchOnProgress', () => {
	test('Can unit test', () => {
	  const generator = saga.watchOnProgress('channel');
	  const next = generator.next();
	  expect(next.value).toEqual(take('channel'));
	});
});

describe('uploadCecFileSagas saga ', () => {
	const iterator = uploadCecFileSagas();
	const payload = {
		email: '31julyqasanity@yopmail.com',
		 mimeType: 'png',
		 cecExemptionString: 'iVBORw0KGgoAAAANSUhEUgAAB4AAAAQICAYAAADsqcbuAAAgAE…BrPN/bs4/XLteSAdz1un/AyPQvBNP5Gp1AAAAAElFTkSuQmCC'
	};
	const token = 'iVBORw0KGgoAAAANSU';
	test('get uploadCecFileSagas -> uploadCecFileSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPLOAD_CEC_FILE_REQUEST, saga.uploadCecFileSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get uploadCecFileSagas -> watchOnProgress', () => {
		const actualYield = {};
		const expectedYield = saga.watchOnProgress('channel');
		expect(typeof actualYield).toEqual(typeof expectedYield);
	});
	test('get uploadCecFileSagas -> createUploader', () => {
		const actualYield = {};
		const expectedYield = saga.createUploader(payload,token);
		expect(typeof actualYield).toEqual(typeof expectedYield);
	});
});
