import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

async function getUpdateEmail(updateEmail, token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.UPDATE_EMAIL, token, null, null, httpRequestMethod.PUT),
		data: updateEmail
	};

	return axios.request(options);
}

export {getUpdateEmail};