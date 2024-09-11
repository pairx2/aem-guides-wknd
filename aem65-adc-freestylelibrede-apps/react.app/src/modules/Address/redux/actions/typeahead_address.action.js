export const UPDATE_SESSION_ID = 'UPDATE_SESSION_ID';
export const SUGGEST_ZIPCODE_REQUEST = 'SUGGEST_ZIPCODE_REQUEST';
export const SUGGEST_ZIPCODE_REQUEST_SUCCESS = 'SUGGEST_ZIPCODE_REQUEST_SUCCESS';
export const SUGGEST_ZIPCODE_REQUEST_FAILURE = 'SUGGEST_ZIPCODE_REQUEST_FAILURE';
export const SUGGEST_CITY_REQUEST = 'SUGGEST_CITY_REQUEST';
export const SUGGEST_CITY_REQUEST_SUCCESS = 'SUGGEST_CITY_REQUEST_SUCCESS';
export const SUGGEST_CITY_REQUEST_FAILURE = 'SUGGEST_CITY_REQUEST_FAILURE';
export const SUGGEST_STREET_REQUEST = 'SUGGEST_STREET_REQUEST';
export const SUGGEST_STREET_REQUEST_SUCCESS = 'SUGGEST_STREET_REQUEST_SUCCESS';
export const SUGGEST_STREET_REQUEST_FAILURE = 'SUGGEST_STREET_REQUEST_FAILURE';

export const updateSessionID = payload => ({
	type: UPDATE_SESSION_ID, payload
});

export const suggestZipCodeRequest = payload => ({
	type: SUGGEST_ZIPCODE_REQUEST, payload
});

export const suggestZipCodeRequestSuccess = payload => ({
	type: SUGGEST_ZIPCODE_REQUEST_SUCCESS, payload
});

export const suggestZipCodeRequestFailure = error => ({
	type: SUGGEST_ZIPCODE_REQUEST_FAILURE, error
});

export const suggestCityRequest = payload => ({
	type: SUGGEST_CITY_REQUEST, payload
});

export const suggestCityRequestSuccess = payload => ({
	type: SUGGEST_CITY_REQUEST_SUCCESS, payload
});

export const suggestCityRequestFailure = error => ({
	type: SUGGEST_CITY_REQUEST_FAILURE, error
});

export const suggestStreetRequest = payload => ({
	type: SUGGEST_STREET_REQUEST, payload
});

export const suggestStreetRequestSuccess = payload => ({
	type: SUGGEST_STREET_REQUEST_SUCCESS, payload
});

export const suggestStreetRequestFailure = error => ({
	type: SUGGEST_STREET_REQUEST_FAILURE, error
});
