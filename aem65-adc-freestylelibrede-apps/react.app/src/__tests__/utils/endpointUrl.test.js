import '@testing-library/jest-dom/extend-expect';
import {serviceEndPoints, httpRequestMethod, cognitoParams, orderParams, coveoParams, PATHS, getServiceEndPoint,
	getAxiosRestCallOptions, productQuantityOrders, getGraphQlCallOptions,getEslPageHeaders} from '../../utils/endpointUrl'; 
import {buildCreateOrderSchema} from '../../modules/Payment/redux/schemas/create_order.schema';

describe('test endpointUrl', () => {

	test('test serviceEndPoints', async () => {
		const result = serviceEndPoints;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test httpRequestMethod', async () => {
		const result = httpRequestMethod;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test cognitoParams', async () => {
		const result = cognitoParams;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test orderParams', async () => {
		const result = orderParams;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test coveoParams', async () => {
		const result = coveoParams;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test getServiceEndPoint', async () => {
		const result = getServiceEndPoint();
		expect(result).toBe('');
	});

	test('test productQuantityOrders', async () => {
		const result = productQuantityOrders;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test PATHS with arguments', async () => {
		const result = PATHS;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		const orderId= 'orderId';
		const invoiceId= 'invoiceId';
		const data = result.INVOICE(orderId, invoiceId);
		expect(data).toBe('/orders/orderId/invoices/invoiceId');

		const dataResult = result.DEACTIVATE_SUBS(orderId);
		expect(dataResult).toBe('/orders/orderId/cancelSubscription');

		const pageResult = result.ORDERS_BY_PAGE(8, 1,'CP');
		expect(pageResult).toBe('/orders?limit=8&pageNumber=1&orderType=CP');

		const imageResult = result.Youtube_Image('videoId', 'imageId');
		expect(imageResult).toBe('https://img.youtube.com/vi/videoId/imageId.jpg');
	});

	test('test getAxiosRestCallOptions', async () => {
		const url= 'url';
		const token= 'token';
		const params= 'params';
		const data= 'data';
		const method = 'method';
		const selfHosted = true;
		const headers= {Authorization: 'Authorization', 'CSRF-Token': 'CSRF-Token'};
		const csrfToken= 'csrfToken';
		const onUploadProgress= 'onUploadProgress';

		const result = getAxiosRestCallOptions(url, token, params, data, method, selfHosted, headers, csrfToken, onUploadProgress);
		expect(result).toBeInstanceOf(Object);

		const resultTwo = getAxiosRestCallOptions(url, null, null, null, null, selfHosted, headers, csrfToken, null);
		expect(resultTwo).toBeInstanceOf(Object);
	});

	test('test getGraphQlCallOptions', async () => {
		var bodyAttr = {'serviceMap':{'graphql.backend.endpoint' : 'https://api.nonprod.services.abbott/api/proxy/graphql-proxy-api-qa'}};
		document.body.setAttribute("data-app-url",JSON.stringify(bodyAttr));
		const query= buildCreateOrderSchema('KcQoXXyGjSGDSIQo6U4nXdwEe04LAXAm');
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		const result = getGraphQlCallOptions(query, token, null, {});		
		expect(result).toBeInstanceOf(Object);
	});

});

describe('test getEslPageHeaders', () => {
	test('test getEslPageHeaders - document input not present', async () => {
		expect(getEslPageHeaders()).toBeTruthy();
	});
	test('test getEslPageHeaders', async () => {
		document.body.innerHTML = `<input type="hidden" name="x-preferred-language" value="de" data-header="true"/>
		<input type="hidden" name="x-country-code" value="DE" data-header="true"/>
		<input type="hidden" name="x-application-id" value="freestylelibre" data-header="true"/>`;
		expect(getEslPageHeaders()).toBeTruthy();
	});

});

