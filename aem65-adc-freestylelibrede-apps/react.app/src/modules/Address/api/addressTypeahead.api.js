import axios from 'axios';
import {getAxiosRestCallOptions, getServiceEndPoint, serviceEndPoints, PATHS} from '../../../utils/endpointUrl';

const getHeaders = sessionID => ({as_sessionid: sessionID});

export function getNewSessionID() {
	const options = {
		...getAxiosRestCallOptions(getServiceEndPoint(serviceEndPoints.TYPEAHEAD) + PATHS.TYPEAHEAD_REGISTER, null, null, null, null, true),
	};
	return axios.request(options)
		.then(data => {
			return data.data.success?.asid;
		})
		.catch(error =>	console.error(error));
}

export function getZipcodeSuggestion(sessionID, countryCode, prefix) {
	const customParams = {
		ccode: countryCode,
		prefix: prefix
	};

	const options = {
		...getAxiosRestCallOptions(getServiceEndPoint(serviceEndPoints.TYPEAHEAD) + PATHS.TYPEAHEAD_ZIPCODE, null, customParams, null, null, false, getHeaders(sessionID))
	};
	return axios.request(options)
		.then(data => ({data: data.data.success?.zips}))
		.catch(error => ({error}));
}

export function getCitySuggestion(sessionID, countryCode, zipcode) {
	const customParams = {
		ccode: countryCode,
		zip: zipcode
	};

	const options = {
		...getAxiosRestCallOptions(getServiceEndPoint(serviceEndPoints.TYPEAHEAD) + PATHS.TYPEAHEAD_CITY, null, customParams, null, null, false, getHeaders(sessionID))
	};
	return axios.request(options)
		.then(data => ({data: data.data.success?.cities}))
		.catch(error => ({error}));
}

export function getStreetSuggestion(sessionID, countryCode, zipcode, prefix) {
	const customParams = {
		ccode: countryCode,
		zip: zipcode,
		prefix: prefix
	};

	const options = {
		...getAxiosRestCallOptions(getServiceEndPoint(serviceEndPoints.TYPEAHEAD) + PATHS.TYPEAHEAD_STREET, null, customParams, null, null, false, getHeaders(sessionID))
	};
	return axios.request(options)
		.then(data => ({data: data.data.success?.streets}))
		.catch(error => ({error}));
}
