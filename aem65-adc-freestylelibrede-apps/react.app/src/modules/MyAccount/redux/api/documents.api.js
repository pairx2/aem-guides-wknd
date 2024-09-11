import axios from 'axios';
import {getServiceEndPoint, serviceEndPoints, PATHS, getAxiosRestCallOptions, httpRequestMethod} from '../../../../utils/endpointUrl';

export function uploadDocument (token, data, onProgress) {
	const options = getAxiosRestCallOptions(getServiceEndPoint(serviceEndPoints.REST_URL) + PATHS.CEC_UPLOAD, token, null, data, httpRequestMethod.POST, false, null, null, onProgress);
	return axios.request(options);
}
