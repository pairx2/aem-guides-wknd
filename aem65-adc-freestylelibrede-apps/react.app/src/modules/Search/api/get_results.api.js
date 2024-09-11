import axios from 'axios';
import {coveoParams, getServiceEndPoint} from '../../../utils/endpointUrl';
import {DEFAULT_QUERY} from '../../../utils/enums';
import { getEslPageHeaders } from '../../../utils/endpointUrl';
import { stripHTML } from '../../../utils/regexUtils';

export const getResults = (payload) => {
	const headers = getEslPageHeaders();
	return axios.get(`${getServiceEndPoint(coveoParams.COVEO_URL)}?q=${stripHTML(payload.query) || DEFAULT_QUERY}`,{
		headers
	});
};