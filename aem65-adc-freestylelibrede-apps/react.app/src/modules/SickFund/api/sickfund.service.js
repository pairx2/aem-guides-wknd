import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

async function getSickfundList(token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.SICKFUND_SEARCH, token, null, null, httpRequestMethod.GET),
	};

	return axios.request(options)
		.catch(error => {
			console.error(error);
		});
}

export {getSickfundList};