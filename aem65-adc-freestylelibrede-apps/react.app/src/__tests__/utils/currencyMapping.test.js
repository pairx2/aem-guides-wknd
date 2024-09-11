import '@testing-library/jest-dom/extend-expect';
import {uomMapping, getUomByKey} from '../../utils/currencyMapping';

describe('test uomMapping', () => {

	test('uomMapping', async () => {
		const result = uomMapping;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

});

describe('test getUomByKey method', () => {

	test('empty input', async () => {
		const result = getUomByKey();
		expect(result).toBeDefined();
		expect(result).toBe('');
	});

	test('99 as input', async () => {
		const result = getUomByKey(99);
		expect(result).toBeDefined();
		expect(result).toBe('mg/dl');
	});

	test('101 as input', async () => {
		const result = getUomByKey(101);
		expect(result).toBeDefined();
		expect(result).toBe('mmol/dl');
	});

});