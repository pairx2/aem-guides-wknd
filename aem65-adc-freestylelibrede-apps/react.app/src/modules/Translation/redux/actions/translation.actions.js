export const FETCH_DICTIONARY_REQUEST = 'FETCH_DICTIONARY_REQUEST';
export const SET_DICTIONARY = 'SET_DICTIONARY';


export const fetchDictionaryRequest = payload => ({
	type: FETCH_DICTIONARY_REQUEST, payload
});

export const setDictionary = payload => ({
	type: SET_DICTIONARY, payload
});
