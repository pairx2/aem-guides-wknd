import '@testing-library/jest-dom/extend-expect';
import {optional, optionalArray} from '../../utils/optional';

describe('test optional', () => {

	test('test optional with no argument', () => {
		const result= optional();
		expect(result).toBeDefined();
		expect(result).toEqual({});
	});

	test('test optional with no argument', () => {
		const data= {dummy: 'dummy'};
		const result= optional(data);
		expect(result).toBeDefined();
		expect(result).toEqual(data);
	});

	test('test optionalArray with no argument', () => {
		const result= optionalArray();
		expect(result).toBeDefined();
		expect(result).toEqual([]);
	});

	test('test optionalArray with no argument', () => {
		const data= ['dummy1'];
		const result= optionalArray(data);
		expect(result).toBeDefined();
		expect(result).toEqual(data);
	});
});