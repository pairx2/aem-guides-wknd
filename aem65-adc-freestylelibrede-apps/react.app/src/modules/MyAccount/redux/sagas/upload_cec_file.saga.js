import {takeEvery, put, fork, take} from 'redux-saga/effects';
import {END, eventChannel} from 'redux-saga';

import {uploadDocument} from '../api/documents.api';
import {getJwtToken} from '../../../../api/authentication.service';
import {UPLOAD_CEC_FILE_REQUEST, uploadCecFileRequestFailure, uploadCecFileRequestSuccess, uploadCecFileProgressUpdate} from '../actions/upload_cec_file.action';
import {empty} from '../../../../utils/default';

export function* watchOnProgress(channel) {
	while (true) {
		const data = yield take(channel);
		yield put(uploadCecFileProgressUpdate(data));
		if(data==100){
			break;
		}
	}
}

export function createUploader(payload, token) {
	let emit;

	const channel = eventChannel(emitter => {
		emit = emitter;
		return empty.function;
	});

	const uploadPromise = uploadDocument(token, payload, (event) => {
		if (event.loaded.total === 1) {
			emit(END);
		}

		emit(Math.round(event.loaded / event.total * 100));
	}, token);

	return [ uploadPromise, channel ];
}

export function* uploadCecFileSaga({payload}) {
	const token = yield getJwtToken();

	const [ uploadPromise, channel ] = createUploader(payload, token);
	yield fork(watchOnProgress, channel);

	try {
		const result = yield uploadPromise;
		yield put(uploadCecFileRequestSuccess(result));

	} catch (err) {
		yield put(uploadCecFileRequestFailure(err));
	}
}

export default function* uploadCecFileSagas() {
	yield takeEvery(UPLOAD_CEC_FILE_REQUEST, uploadCecFileSaga);
}