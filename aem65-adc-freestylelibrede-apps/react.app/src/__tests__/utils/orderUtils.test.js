import '@testing-library/jest-dom/extend-expect';
import { getTrackingURL, returnReasons, getStatus, getCountryName, getRxOrderStatus, getOrderDescriptionLabel, getCustomerAllOrders, getSensorName, getProductDetailsReaders, getRXProductLabels, checkOrdersHasProduct,getInvoiceType, getOrderImagesPath } from '../../utils/orderUtils';
jest.mock('../../utils/endpointUrl');
import { PRODUCT_SKUS } from '../../utils/enums';
import { i18nLabels } from '../../utils/translationUtils';

describe('test orderUtils', () => {

	test('test getTrackingURL with no argument', () => {
		const result = getTrackingURL();
		expect(result).toBeDefined();
	});

	test('test getTrackingURL', () => {
		const result = getTrackingURL('trackingId');
		expect(result).toBeDefined();
	});

	test('returnReasons test', () => {
		const result = returnReasons;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Array);
	});

	test('getStatus test with ORDER_SHIPPED as argument', () => {
		const result = getStatus('Order shipped');
		expect(result).toBeDefined();
		expect(result).toBe('status-green');
	});

	test('getStatus test with CREATED as argument', () => {
		const result = getStatus('Created');
		expect(result).toBeDefined();
		expect(result).toBe('status-yellow');
	});

	test('getStatus test with RETURN_DECLARED as argument', () => {
		const result = getStatus('Order has been sent back');
		expect(result).toBeDefined();
		expect(result).toBe('status-red');
	});

	test('getCountryName test with no argument', () => {
		const result = getCountryName();
		expect(result).toBeUndefined();
	});

	test('getCountryName test ', () => {
		const result = getCountryName('DE');
		expect(result).toBeDefined();
		expect(result).toBe('Deutschland');
	});
	test('getRxOrderStatus with Active status', () => {
		const result = getRxOrderStatus(92)
		expect(result).toBeDefined();
		expect(result).toBe('active');
		expect(getRxOrderStatus(50)).toBe('active');
		expect(getRxOrderStatus(90)).toBe('active');
		expect(getRxOrderStatus(91)).toBe('active');
	});
	test('getRxOrderStatus with Open status', () => {
		const result = getRxOrderStatus(40)
		expect(result).toBeDefined();
		expect(getRxOrderStatus(0)).toBe('open');
		expect(getRxOrderStatus(10)).toBe('open');
		expect(getRxOrderStatus(20)).toBe('open');
		expect(getRxOrderStatus(22)).toBe('open');
		expect(getRxOrderStatus(23)).toBe('open');
		expect(getRxOrderStatus(35)).toBe('open');
		expect(getRxOrderStatus(25)).toBe('open');
		expect(getRxOrderStatus(27)).toBe('open');
		expect(getRxOrderStatus(48)).toBe('open');
	});
	test('getRxOrderStatus with completed status', () => {
		expect(getRxOrderStatus(51)).toBe('completed');
		expect(getRxOrderStatus(52)).toBe('completed');
		expect(getRxOrderStatus(53)).toBe('completed');
		expect(getRxOrderStatus(54)).toBe('completed');
		expect(getRxOrderStatus(55)).toBe('completed');
		expect(getRxOrderStatus(56)).toBe('completed');
		expect(getRxOrderStatus(57)).toBe('completed');
		expect(getRxOrderStatus(58)).toBe('completed');
		expect(getRxOrderStatus(59)).toBe('completed');
		expect(getRxOrderStatus(60)).toBe('completed');
		expect(getRxOrderStatus(95)).toBe('completed');
		expect(getRxOrderStatus(30)).toBe('completed');
		expect(getRxOrderStatus(31)).toBe('completed');
		expect(getRxOrderStatus(32)).toBe('completed');
		expect(getRxOrderStatus(33)).toBe('completed');
		expect(getRxOrderStatus(37)).toBe('completed');
	});

	test('getOrderDescriptionLabelTest with Active status', () => {
		const result = getOrderDescriptionLabel('92');
		expect(result).toBeDefined();
	});

	test('checkOrdersHasProduct with Order', () => {
		const orders = [
			{
				"index": 1,
				"orderType": "Cash Pay",
				"serviceData": null,
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01"
					}
				]
			},
			{
				"index": 2,
				"orderType": "Cash Pay Subscription",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01",
					}
				]
			},
			{
				"index": 3,
				"orderType": "Reimbursement",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 2,
						"deliveryStatus": "Created",
						"productSKU": "71988-01"
					},
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
					}
				],
			}
		];
		const fsl3ProduktSKUSet = new Set([PRODUCT_SKUS.FSL_3_SENSOR]);
		const result = checkOrdersHasProduct(orders, fsl3ProduktSKUSet ,true);
		expect(result).toBeTruthy();
	});

	test('checkOrdersHasProduct with No Order', () => {
		const orders = [
			{
				"index": 1,
				"orderType": "Cash Pay",
				"serviceData": null,
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01"
					}
				]
			},
			{
				"index": 2,
				"orderType": "Cash Pay Subscription",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
					}
				]
			},
			{
				"index": 3,
				"orderType": "Reimbursement",
				"serviceData": [
					{
						"serviceStatus": "Active"
					}
				],
				"deliveryDetails": [
					{
						"index": 2,
						"deliveryStatus": "Created",
						"productSKU": "71988-01"
					},
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "71988-01",
					}
				],
			}
		];
		const fsl3ProduktSKUSet = new Set([PRODUCT_SKUS.FSL_3_SENSOR]);
		const result = checkOrdersHasProduct(orders, fsl3ProduktSKUSet ,true);
		expect(result).toBeFalsy();
	});

	test('getInvoiceType test ', () => {

		const invoiceId = "DEI0000813536";
		const invoiceLabel  = getInvoiceType(invoiceId);
		expect(invoiceLabel).toBe(i18nLabels.INVOICE_TYPE_INVOICE);
		const creditNoteId = "DEC0000813566";
		const creditNoteLabel  = getInvoiceType(creditNoteId);
		expect(creditNoteLabel).toBe(i18nLabels.INVOICE_TYPE_CREDIT_NOTE);
		const openInvoiceId = "DEA0000813566";
		const openInvoiceLabel  = getInvoiceType(openInvoiceId);
		expect(openInvoiceLabel).toBe(i18nLabels.OPEN_INVOICE);

	});

	test('test getOrderImagesPath', () => {
		const result = getOrderImagesPath('72114-01');
		expect(typeof result).toBe('string')
	});


});