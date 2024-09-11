import axios from 'axios';
import {getServiceEndPoint, serviceEndPoints} from '../../../utils/endpointUrl';

export const getSearchFilters = payload => {
	return axios.get(getServiceEndPoint(serviceEndPoints.SEARCH_FILTER_URL), {
		params: {
			filters: payload.value
		}
	});
};