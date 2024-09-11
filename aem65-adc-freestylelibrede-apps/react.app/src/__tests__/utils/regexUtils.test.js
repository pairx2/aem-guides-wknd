import '@testing-library/jest-dom/extend-expect';
import {formFieldValidationRegexes, matchRegexes, splitAddressAndNumber, isMobile, stripHTML} from '../../utils/regexUtils';

describe('test regexUtils', () => {

	test('test formFieldValidationRegexes', () => {
		const result= formFieldValidationRegexes;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

	test('test matchRegexes', () => {
		const result= matchRegexes;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result.mobilePhone()).toEqual(/(\+49)?(\d{1,3})?(\d{1,7})?/g);
		expect(result.space()).toEqual(/\s/g);
		expect(result.dateDashed()).toEqual(/(\d{4})-(\d{2})-(\d{2})/g);
		expect(result.dateDotted()).toEqual(/(\d{2})\.(\d{2})\.(\d{4})/g);
		expect(result.html()).toEqual(/\<.*?\>/g);
	});

	test('test splitAddressAndNumber', () => {
		const result= splitAddressAndNumber();
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result.street).toBeUndefined();
		expect(result.streetNumber).toBe('');
	});

	test('test isMobile', () => {
		const result= isMobile;
		expect(result).toBeDefined();
		expect(result).toBeFalsy();
	});

	test('test stripHTML', () => {
		const result= stripHTML('<u>sensor</u>');
		expect(result).toBeDefined();
		expect(result).toBe('sensor');
	});
});