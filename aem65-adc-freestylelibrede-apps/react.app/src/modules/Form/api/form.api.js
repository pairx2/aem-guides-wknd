import axios from 'axios';
import { getAxiosRestCallOptions, httpRequestMethod, PATHS } from '../../../utils/endpointUrl';

export const getFraudDomain = () => {
	const options = {
		...getAxiosRestCallOptions(PATHS.FRAUD_DOMAINS, null, null, null, httpRequestMethod.GET, false),
	};
	return axios.request(options);
};