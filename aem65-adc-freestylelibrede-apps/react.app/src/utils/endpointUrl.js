import { uuidv4 } from './corelationUtils';
import { GERMANY_LANGUAGE } from './enums';
let siteData = undefined;

export const serviceEndPoints = {
	GRAPHQL_URL: 'graphql.backend.endpoint',
	I18N_URL: 'i18n.service.url',
	REST_URL: 'rest.backend.endpoint',
	ESL_URL: 'esl.service.endpoint',
	SEARCH_FILTER_URL: 'SEARCH_FILTER_URL',
	TYPEAHEAD: 'arvato.typeahead.endpoint',
	OCR: 'ibm.ocr.endpoint'
};
export const httpRequestMethod = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

export const cognitoParams = {
	IDENTITY_POOL_ID: 'cognito.identitypool.id',
	FACEBOOK_ID: 'cognito.region',
	GOOGLE_ID: 'cognito.google.id',
	REGION: 'cognito.region',
	APP_CLIENT_ID: 'cognito.clientapp.id',
	USER_POOL_ID: 'cognito.userpool.id',
	LOGIN_REDIRECT: 'login.page.path',
	COGNITO_DOMAIN: 'cognito.domain',
	COGNITO_CLIENT_APP_ID: 'cognito.clientapp.id'
};

export const orderParams = {
	DHL_TRACKING_URL: 'dhl.tracking.url'
};

export const BrowserCompatibility = {
	UNSUPPORTED_BROWSER_PAGE_PATH: 'unsupported.browser.page.path'
};

export const coveoParams = {
	COVEO_URL: 'coveo.backend.endpoint',
	COVEO_SITE: 'coveo.site'
};

export const eslParams = {
	ENABLE_ESL_AUTHENTICATION: 'enable.esl.authentication',
	APPLICATION_ID: 'esl.application.id',
	COUNTRY_CODE: 'DE',
	PREFERRED_LANGUAGE: 'de_DE',
	ENABLE_ESL_SOCIAL_LOGIN: 'enable.esl.social.login'
};

export const PATHS = {
	ADDRESS_CHECK: '/risks/addressCheck',
	REGISTER_USER: '/login/registerUser',
	CREATE_LEAD: '/bin/adc/freestylelibrede/fsl/createLead',
	CSRF_TOKEN: '/libs/granite/csrf/token.json',
	SICKFUND_SEARCH: '/payers',
	RISK_CHECK: '/risks/riskCheck',
	TYPEAHEAD_REGISTER: '/register',
	TYPEAHEAD_ZIPCODE: '/zips',
	TYPEAHEAD_CITY: '/cities',
	TYPEAHEAD_STREET: '/streets',
	UPLOAD_PRESCRIPTION: '/prescriptions',
	UPLOAD_REIMBURSMENT: '/reimbursments',
	ORDERS_BY_PAGE: (limit = 8, pageNumber = 1, orderHistoryType = '') => `/orders?limit=${limit}&pageNumber=${pageNumber}&orderType=${orderHistoryType}`,
	ORDERS: `/orders`,
	ORDERS_BY_RXMC: '/orders/rxmc/',
	UPDATE_EMAIL: '/users/updateEmail',
	ORDER_RETURN_ID: '/commercialreturn',
	RMA_DETAILS: '/rmaDetails',
	INVOICE: (orderId, invoiceId) => `/orders/${orderId}/invoices/${invoiceId}`,
	CEC_UPLOAD: '/payers/uploadCEC',
	DEACTIVATE_SUBS: (orderId) => `/orders/${orderId}/cancelSubscription`,
	UPDATE_PASSWORD: '/users/updatePassword',
	Youtube_Image: (videoId, imageId) => `https://img.youtube.com/vi/${videoId}/${imageId}.jpg`,
	UPDATE_RETURN_ACTION: '/orders/updateReturn',
	FRAUD_DOMAINS: '/fraudDomains'
};

export const getSiteData = () => siteData = siteData || JSON.parse(document.body.dataset.appUrl);
const getAppURl = () => getSiteData()['serviceMap'];
export const getServiceEndPoint = key => key ? getAppURl()[key] : '';
export const productQuantityOrders = () => {
	const productData = getSiteData()?.['productData'];
	return productData;
};
export const getAxiosRestCallOptions = (url, token = null, params = null, data = null, method = null, selfHosted = false, headers = null, csrfToken = null, onUploadProgress = null) => {
	const correlationId = uuidv4();
	const options = {
		baseURL: selfHosted ? '' : getServiceEndPoint(serviceEndPoints.REST_URL),
		url: url,
		method: method || httpRequestMethod.GET,
		headers: {
			'Content-Type': 'application/json',
			'correlationId': correlationId,
			'x-correlation-id': correlationId,
			...headers
		}
	};
	if (token) options.headers.Authorization = `Bearer ${token}`;
	if (selfHosted) options.headers['CSRF-Token'] = csrfToken;
	if (params) {
		options.params = {
			...options.params,
			...params
		};
	}
	if (data) {
		options.data = {
			...options.data,
			...data
		};
	}
	if (onUploadProgress) {
		options.onUploadProgress = onUploadProgress;
	}
	return options;
};

export const getGraphQlCallOptions = (query, token = null, headers = null, variables = null) => {
	const correlationId = uuidv4();
	const options = {
		async: false,
		url: getServiceEndPoint(serviceEndPoints.GRAPHQL_URL) + '/guest',
		method: httpRequestMethod.POST,
		headers: {
			'Content-Type': 'application/json',
			'correlationId': correlationId,
			'x-correlation-id': correlationId,
			...headers
		},
		data: JSON.stringify({ query: query, variables: variables }),
		dataType: 'json'
	};
	if (token) {
		options.headers.Authorization = `Bearer ${token}`;
		options.url = getServiceEndPoint(serviceEndPoints.GRAPHQL_URL) + '/me';
	}
	return options;
}

export const getAxiosEslCallOptions = (url, method = null, token = null, headers = null) => {
	const correlationId = uuidv4();
	const options = {
		baseURL: getServiceEndPoint(serviceEndPoints.ESL_URL),
		url: url,
		method: method || httpRequestMethod.GET,
		headers: {
			'Content-Type': 'application/json',
			'x-application-id': getServiceEndPoint(eslParams.APPLICATION_ID),
			'x-country-code': eslParams.COUNTRY_CODE,
			'x-preferred-language': eslParams.PREFERRED_LANGUAGE,
			'correlationId': correlationId,
			'x-correlation-id': correlationId,
			...headers
		}
	};
	if (token) options.headers.Authorization = `Bearer ${token}`;
	return options;
};

export const getEslPageHeaders = (lang = GERMANY_LANGUAGE.DE_DE) => {
	const appId = document.getElementsByName('x-application-id')[0]?.value || '';
	const countryCode = document.getElementsByName('x-country-code')[0]?.value || '';
	return {
		'x-preferred-language': lang,
		'x-application-id': appId,
		'x-country-code': countryCode,
	}

}
