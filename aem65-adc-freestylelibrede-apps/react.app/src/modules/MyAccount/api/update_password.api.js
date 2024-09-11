import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

async function getUpdatedPassword(updatePassword, token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.UPDATE_PASSWORD, token, null, updatePassword, httpRequestMethod.PUT)
	};
	return axios.request(options);
}

export {getUpdatedPassword};