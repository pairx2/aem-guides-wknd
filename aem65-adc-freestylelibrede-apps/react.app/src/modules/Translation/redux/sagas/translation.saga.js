import {call, put, select, takeLeading} from 'redux-saga/effects';
import {FETCH_DICTIONARY_REQUEST, setDictionary} from '../actions/translation.actions';
import {getDictionary, getLocalDictionary} from '../../api/translation.api';
export const translationReducer = state => state.translationModuleReducer.translationReducer;

export function* fetchDictionarySaga() {
	const {dictionaryFetched} = yield select(translationReducer);
	if (!dictionaryFetched) {
		try{
			const apiResponse = yield call(getDictionary);
			yield put(setDictionary(apiResponse));
		}catch(error){
			console.error('Error during translation service call \n', error);
			const localApiResponse = yield call(getLocalDictionary);
			yield put(setDictionary(localApiResponse));
		}
	}
}

export default function* translationSaga() {
	yield takeLeading(FETCH_DICTIONARY_REQUEST, fetchDictionarySaga);
}
