import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

function postRegistration(userData) {
	const options = {
		...getAxiosRestCallOptions(PATHS.REGISTER_USER, null, null, null, httpRequestMethod.POST),
		data: userData
	};

	return axios.request(options);
}

function postEApply(userData, csrfToken) {
	const options = {
		...getAxiosRestCallOptions(PATHS.CREATE_LEAD, null, null, null, httpRequestMethod.POST, true, null, csrfToken),
		data: userData
	};
	return axios.request(options);
}

function getCsrfToken() {
	const options = {
		...getAxiosRestCallOptions(PATHS.CSRF_TOKEN, null, null, null, httpRequestMethod.GET, true),
	};
	return axios.request(options);
}

export {postRegistration, postEApply, getCsrfToken};