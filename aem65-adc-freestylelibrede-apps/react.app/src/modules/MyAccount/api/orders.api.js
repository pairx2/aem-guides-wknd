import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';

function getInvoice(token, orderId, invoiceId) {
	const options = getAxiosRestCallOptions(PATHS.INVOICE(orderId, invoiceId), token);
	return axios.request(options);
}

function cancelOrDeactivateSubscription(payloadData, token, orderId) {
	const options = {
		...getAxiosRestCallOptions(PATHS.DEACTIVATE_SUBS(orderId), token, null, payloadData, httpRequestMethod.POST),
	};
	return axios.request(options);
}

export {getInvoice, cancelOrDeactivateSubscription};