import '@testing-library/jest-dom/extend-expect';
import {defaultUom, measurementOptions, measurementShortOptions} from '../../utils/measureOptions';

describe('test measureOptions', () => {

	test('test defaultUom', () => {
		const result= defaultUom;
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
		expect(result).toBe('99');
	});

	test('test measurementOptions', () => {
		const result= measurementOptions;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(2);
	});

	test('test measurementShortOptions', () => {
		const result= measurementShortOptions;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(2);
	});
});