import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

async function getUpdateReturnAction(updateReturn, token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.UPDATE_RETURN_ACTION, token, null, updateReturn, httpRequestMethod.POST)
	};
	return axios.request(options);
}

export {getUpdateReturnAction};