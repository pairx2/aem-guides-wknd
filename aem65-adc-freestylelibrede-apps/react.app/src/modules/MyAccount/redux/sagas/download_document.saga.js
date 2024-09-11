import {takeEvery, put, select} from 'redux-saga/effects';
import {DOWNLOAD_DOCUMENT_REQUEST} from '../actions/download_document.action';
import {downloadBase64} from '../../../../utils/pdfUtils';
import {OPEN_MODAL_ACTION} from '../../../Modal/redux/actions';
import translate, {i18nLabels} from '../../../../utils/translationUtils';

export const getDictionary = state => state.translationModuleReducer.translationReducer.dictionary;

export function* downloadDocumentSaga({payload}) {
	const dictionary = yield select(getDictionary);
	if(payload) {
		downloadBase64(payload?.fileContent, translate(dictionary, payload?.fileName || i18nLabels.DOWNLOAD_FILENAME));
	}
	else {
		yield put({
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
	}
}
export default function* downloadDocumentSagas() {
	yield takeEvery(DOWNLOAD_DOCUMENT_REQUEST, downloadDocumentSaga);
}