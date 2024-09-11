import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';
import {riskCheckData} from './riskcheck.payload';
import {isRxCheckoutPageType} from '../../../utils/pageTypeUtils';

import axios from 'axios';

async function getAvailablePaymentMethods(orderType, user, billingAddress, shippingAddress, products, shipping, token) {
	const data = riskCheckData(orderType, user, billingAddress, shippingAddress, products, isRxCheckoutPageType());
	const options = {
		...getAxiosRestCallOptions(PATHS.RISK_CHECK, token, null, null, httpRequestMethod.POST),
		data: data
	};

	return axios.request(options)
		.then(dataRequest => analyseRiskCheckResult(dataRequest.data, shipping, billingAddress, shippingAddress))
		.catch(error => {
			console.error(error);
		});
}

const RSSDownRiskCheck = (riskCheckResult, result, shipping, shippingAddress, billingAddress, shippingAddressResponse, billingAddressResponse) =>{
	const riskcheckBillingAddress = riskCheckResult?.RiskCheckResponse?.Details?.BillingCustomerResult?.ServiceResults?.AddressValidationResponse;
	const riskcheckDeliveryAddress = riskCheckResult?.RiskCheckResponse?.Details?.DeliveryCustomerResult?.ServiceResults?.AddressValidationResponse;
	if (!riskcheckBillingAddress && !riskcheckDeliveryAddress) {
		result.riskcheckAddress = shipping ? shippingAddress : billingAddress;
	} else {
		result.riskcheckAddress = shipping ? shippingAddressResponse : billingAddressResponse;
	}
}

const analyseRiskCheckResult = (riskCheckResult, shipping, billingAddress, shippingAddress) => {
	const promise = new Promise((resolve) => {
		const {AllowPM, AllowSave, BlackListed, WebshopMessage, IsVerifed, AllowSaveCorrected} = riskCheckResult?.ResponseBehaviors;
		const CommunicationToken = riskCheckResult?.RiskCheckResponse?.Decision?.CommunicationToken || '';
		const ResultCode = riskCheckResult?.BaseInformation?.Dimension?.ArvatoCode;
		const riskcheckBillingAddress = riskCheckResult?.RiskCheckResponse?.Details?.BillingCustomerResult?.ServiceResults?.AddressValidationResponse;
		const riskcheckDeliveryAddress = riskCheckResult?.RiskCheckResponse?.Details?.DeliveryCustomerResult?.ServiceResults?.AddressValidationResponse;
		const billingAddressResponse = {
			street: riskcheckBillingAddress?.Street || '',
			streetNumber: riskcheckBillingAddress?.StreetNumber || '',
			zipcode: riskcheckBillingAddress?.ZipCode || '',
			city: riskcheckBillingAddress?.City || '',
			country: riskcheckBillingAddress?.Country || ''
		};
		const shippingAddressResponse = {
			street: riskcheckDeliveryAddress?.Street || '',
			streetNumber: riskcheckDeliveryAddress?.StreetNumber || '',
			zipcode: riskcheckDeliveryAddress?.ZipCode || '',
			city: riskcheckDeliveryAddress?.City || '',
			country: riskcheckDeliveryAddress?.Country || ''
		};
		const result = {
			methods: AllowPM,
			resultCode: ResultCode,
			communicationToken: CommunicationToken,
			WebshopMessage: WebshopMessage || '',
			allowSave: AllowSave,
			blackListed: BlackListed,
			isVerifed: IsVerifed,
			isAllowSaveCorrected: AllowSaveCorrected
		};
		// RSS is down
		RSSDownRiskCheck(riskCheckResult, result, shipping, shippingAddress, billingAddress, shippingAddressResponse, billingAddressResponse);
		resolve(result);
	});

	return promise;
};

export {getAvailablePaymentMethods};