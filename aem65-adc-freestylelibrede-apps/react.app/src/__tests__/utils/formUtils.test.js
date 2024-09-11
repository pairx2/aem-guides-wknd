import '@testing-library/jest-dom/extend-expect';
import {numberOnly, getNumberFromString,numberWithPlusAndSpacesOnly} from '../../utils/formUtils';

describe('test formUtils', () => {

	test('test numberOnly with empty input', async () => {
		const result = numberOnly();
		expect(result).toBeUndefined();
	});

	test('test numberOnly with invalid input', async () => {
		const result = numberOnly('dummy');
		expect(result).toBeDefined();
		expect(result).toBe('');
	});

	test('test numberOnly with valid input', async () => {
		const result = numberOnly('12345');
		expect(result).toBeDefined();
		expect(result).toBe('12345');
	});

	test('test getNumberFromString with empty input', async () => {
		const result = getNumberFromString('');
		expect(result).toBeUndefined();
	});

	test('test getNumberFromString with null input', async () => {
		const result = getNumberFromString(null);
		expect(result).toBeUndefined();
	});

	test('test getNumberFromString with valid input', async () => {
		const result = getNumberFromString('+49 15777777777');
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result.countryCode).toBe('de');
		expect(result.nationalNumber).toBe('15777777777');
	});

	test('test getNumberFromString with other input', async () => {
		const result = getNumberFromString('+49 1566 5678900');
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result.countryCode).toBe('de');
		expect(result.nationalNumber).toBe('15665678900');
	});

	test('test numberWithPlusAndSpacesOnly 00', async () => {
		const result = numberWithPlusAndSpacesOnly('0015665678900');
		expect(result).toBeDefined();
		expect(result).toBe('015665678900');
	});

	test('test numberWithPlusAndSpacesOnly no trailing zero', async () => {
		const result = numberWithPlusAndSpacesOnly('15665678900');
		expect(result).toBeDefined();
		expect(result).toBe('015665678900');
	});

	test('test numberWithPlusAndZero', async () => {
		const result = numberWithPlusAndSpacesOnly('+4915665678900');
		expect(result).toBeDefined();
		expect(result).toBe('015665678900');
	});

	test('test numberWithPlusAndZero number starts with 0', async () => {
		const result = numberWithPlusAndSpacesOnly('+015665678900');
		expect(result).toBeDefined();
		expect(result).toBe('015665678900');
	});

});