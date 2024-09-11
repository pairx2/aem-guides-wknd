import axios from 'axios';
import { getServiceEndPoint, serviceEndPoints } from '../../../utils/endpointUrl';
import { getEslPageHeaders } from '../../../utils/endpointUrl';
import { getRequiredSiteData } from '../../../utils/siteData';
import { GERMANY_LANGUAGE } from '../../../utils/enums';

export const getLocalDictionary = () => {
	const i18nLocalServiceURL = getRequiredSiteData("domain").concat("/bin/adc/freestylelibrede/i18n.de.json?q=").concat(Date.now());
	return axios.get(i18nLocalServiceURL).then((response) => response.data);
};

export const getDictionary = () => {
	const headers = getEslPageHeaders(GERMANY_LANGUAGE.DE);
	let instance = axios.create();
	return instance.get(getServiceEndPoint(serviceEndPoints.I18N_URL), { headers }).then((response) => response.data.response)
};