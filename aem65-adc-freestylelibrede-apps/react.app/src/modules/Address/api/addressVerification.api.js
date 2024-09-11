import axios from 'axios';
import {getAxiosRestCallOptions, httpRequestMethod, PATHS} from '../../../utils/endpointUrl';
import {i18nLabels} from '../../../utils/translationUtils';
import {isRxCheckoutPageType} from '../../../utils/pageTypeUtils';
import {ORDER_TYPES, UNDEFINED} from '../../../utils/enums';

const ADDRESS_CHECK_SUCCESS = 'ADDRESS_CHECK_SUCCESS';
const ADDRESS_CHECK_CORRECTED = 'ADDRESS_CHECK_CORRECTED';
const ADDRESS_CHECK_ERROR = 'ADDRESS_CHECK_ERROR';

async function checkAddress(address, user, billingAddress, shippingAddress, shipping, billing, isOrderUpdate) {
	const data = {
		'AddressCheck': {}
	};
	let billingAddressOnCart, shippingAddressOnCart;
	const addressObject = {
		'LastName': user.lastName,
		'FirstName': user.firstName,
		'BirthDay': user.birthday,
		'Email': user.email,
		'Address': {
			'Street': address.street,
			'StreetNumber': address.streetNumber,
			'ZipCode': address.zipcode,
			'City': address.city,
			'Country': address.country
		}
	};

	if(typeof billingAddress !== UNDEFINED && typeof shippingAddress !== UNDEFINED){
		billingAddressOnCart = {
			'LastName': billingAddress.lastName,
			'FirstName': billingAddress.firstName,
			'BirthDay': user.birthday,
			'Email': user.email,
			'Address': {
				'Street': billingAddress.street,
				'StreetNumber': billingAddress.streetNumber,
				'ZipCode': billingAddress.zipcode,
				'City': billingAddress.city,
				'Country': billingAddress.country
			}
		};
		shippingAddressOnCart = {
			'LastName': shippingAddress.lastName,
			'FirstName': shippingAddress.firstName,
			'BirthDay': user.birthday,
			'Email': user.email,
			'Address': {
				'Street': shippingAddress.street,
				'StreetNumber': shippingAddress.streetNumber,
				'ZipCode': shippingAddress.zipcode,
				'City': shippingAddress.city,
				'Country': shippingAddress.country
			}
		};
	}
	const BaseInformation = {
		'Dimension': {
			'OrderType': ORDER_TYPES.WEBRX,
			'Country': 'DE',
			'SourceSystem': 'ARV-WS',
			'ArvatoCode': sessionStorage.getItem('arvato_session_id')
		},
	};

	data['AddressCheck']['BillingCustomer'] = billing  ? addressObject : billingAddressOnCart;
	data['AddressCheck']['DeliveryCustomer'] = shipping ? addressObject : shippingAddressOnCart;

	if (isRxCheckoutPageType() || isOrderUpdate) {
		data['BaseInformation'] = BaseInformation;
	}

	const options = {
		...getAxiosRestCallOptions(PATHS.ADDRESS_CHECK, null, null, null, httpRequestMethod.POST),
		data: data
	};

	return axios.request(options)
		.then(data => analyseAddressCheckResult(data.data, shipping, address))
		.catch(() => ({
			result: ADDRESS_CHECK_ERROR,
			address: {
				street: '',
				streetNumber: '',
				zipcode: '',
				city: '',
				country: ''
			}
		}));
}

const setBillingAddress = (billingAddressCheckResponse) => {
	return {
		street: billingAddressCheckResponse?.Street || '',
		streetNumber: billingAddressCheckResponse?.StreetNumber || '',
		zipcode: billingAddressCheckResponse?.ZipCode || '',
		city: billingAddressCheckResponse?.City || '',
		country: billingAddressCheckResponse?.Country || ''
	}
}

const setShippingAddress = (shippingAddressCheckResponse) =>{
	return {
		street: shippingAddressCheckResponse?.Street || '',
		streetNumber: shippingAddressCheckResponse?.StreetNumber || '',
		zipcode: shippingAddressCheckResponse?.ZipCode || '',
		city: shippingAddressCheckResponse?.City || '',
		country: shippingAddressCheckResponse?.Country || ''
	}
}

const analyseAddressCheckResult = (addressCheckResult, shipping, address) => {
	const promise = new Promise((resolve) => {
		const billingAddressCheckResponse = addressCheckResult?.AddressCheckResponse?.Details?.BillingCustomerResult?.ServiceResults?.AddressValidationResponse;
		const shippingAddressCheckResponse = addressCheckResult?.AddressCheckResponse?.Details?.DeliveryCustomerResult?.ServiceResults?.AddressValidationResponse;
		const result = {};
		const billingAddressResponse = setBillingAddress(billingAddressCheckResponse)
		const shippingAddressResponse = setShippingAddress(shippingAddressCheckResponse);
		const {ArvatoCode} = addressCheckResult?.BaseInformation?.Dimension;
		const {AllowSaveCorrected, AllowSave, WebshopMessage, AllowPM, BlackListed, IsVerifed} = addressCheckResult?.ResponseBehaviors;
		if(AllowSave && !AllowSaveCorrected) {
			result.result = ADDRESS_CHECK_SUCCESS;
		} else if(AllowSaveCorrected) {
			result.result = ADDRESS_CHECK_CORRECTED;
		} else {
			result.result = ADDRESS_CHECK_ERROR;
		}
		// RSS is down
		if (!billingAddressCheckResponse && !shippingAddressCheckResponse) {
			result.address = address;
		} else {
			result.address = shipping ? shippingAddressResponse : billingAddressResponse;
		}
		result.rssResultCode = ArvatoCode;
		result.isBlacklisted = BlackListed;
		result.isVerified = IsVerifed;
		result.addressAllowPM = AllowPM;
		result.allowSave = AllowSave;
		result.message = WebshopMessage || i18nLabels.ADDRESS_CHECK_ERROR_MESSAGE;
		resolve(result);
	});
	return promise;
};

export {checkAddress, ADDRESS_CHECK_SUCCESS, ADDRESS_CHECK_ERROR, ADDRESS_CHECK_CORRECTED};