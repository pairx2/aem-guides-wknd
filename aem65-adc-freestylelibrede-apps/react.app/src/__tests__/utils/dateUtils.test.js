import '@testing-library/jest-dom/extend-expect';
import {getFormattedDate, getMagentoFormattedDate, dashedToDotted, dottedToDashed, unixToDotDate} from '../../utils/dateUtils';

describe('test getFormattedDate method', () => {

	test('empty input', async () => {
		const result = getFormattedDate();
		expect(result).not.toBeUndefined();
	});

	test('valid input', async () => {
		const result = getFormattedDate(1571995312003);
		expect(result).toBe('10/25/2019');
	});

});

describe('test getMagentoFormattedDate method', () => {

	test('valid input', async () => {
		const result = getMagentoFormattedDate(new Date(1571995312003));
		expect(result).toBe('2019-10-25');
	});

	test('other valid input', async () => {
		const result = getMagentoFormattedDate(new Date(1589782941988));
		expect(result).toBe('2020-05-18');
	});

});

describe('test dashedToDotted method', () => {

	test('empty input', async () => {
		const result = dashedToDotted();
		expect(result).toBe(null);
	});

	test('valid input', async () => {
		const result = dashedToDotted('2020-05-18');
		expect(result).toBe('18.05.2020');
	});

});

describe('test dottedToDashed method', () => {

	test('empty input', async () => {
		const result = dottedToDashed();
		expect(result).toBe(null);
	});

	test('valid input', async () => {
		const result = dottedToDashed('18.05.2020');
		expect(result).toBe('2020-05-18');
	});

});