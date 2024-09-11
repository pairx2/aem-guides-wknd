import '@testing-library/jest-dom/extend-expect';
import {DELIVERY_STATUSES, PAYMENT_TYPES, MAGENTO_PAYMENT_TYPES, PAYMENT_ICONS, ORDER_TYPES, ORDER_SUB_TYPES,  PANEL_TYPE, SUBSCRIPTION_STATUS,
	BANNER_STATUS, SUBSCRIPTION_OPTIONS, BANNER_TYPE, BANNER_IMAGE_TYPE, TAB_NAMES, GHOST_ORDER_TYPE} from '../../utils/enums';

describe('test enums', () => {

	test('test DELIVERY_STATUSES', async () => {
		const result = DELIVERY_STATUSES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test PAYMENT_TYPES', async () => {
		const result = PAYMENT_TYPES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test MAGENTO_PAYMENT_TYPES', async () => {
		const result = MAGENTO_PAYMENT_TYPES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test PAYMENT_ICONS', async () => {
		const result = PAYMENT_ICONS;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test ORDER_TYPES', async () => {
		const result = ORDER_TYPES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});
	test('test ORDER_SUB_TYPES', async () => {
		const result = ORDER_SUB_TYPES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});


	test('test PANEL_TYPE', async () => {
		const result = PANEL_TYPE;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test SUBSCRIPTION_STATUS', async () => {
		const result = SUBSCRIPTION_STATUS;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test BANNER_STATUS', async () => {
		const result = BANNER_STATUS;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test SUBSCRIPTION_OPTIONS', async () => {
		const result = SUBSCRIPTION_OPTIONS;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test BANNER_TYPE', async () => {
		const result = BANNER_TYPE;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test BANNER_IMAGE_TYPE', async () => {
		const result = BANNER_IMAGE_TYPE;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test TAB_NAMES', async () => {
		const result = TAB_NAMES;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test GHOST_ORDER_TYPE', async () => {
		const result = GHOST_ORDER_TYPE;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

});