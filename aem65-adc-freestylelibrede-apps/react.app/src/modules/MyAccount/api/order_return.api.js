import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

async function getOrderReturnId(orderReturnDetails, token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.ORDER_RETURN_ID, token, null, orderReturnDetails, httpRequestMethod.POST)
	};
	return axios.request(options);
}

async function getOrderReturnRmaDetails(orderReturnRmaDetails, token) {
	const options = {
		...getAxiosRestCallOptions(PATHS.RMA_DETAILS, token, null, orderReturnRmaDetails, httpRequestMethod.POST)
	};
	return axios.request(options);
}

export {getOrderReturnId, getOrderReturnRmaDetails};