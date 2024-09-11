import '@testing-library/jest-dom/extend-expect';
import {valueDecode} from '../../utils/technicalTrainingUtils';

describe('test valueDecode', () => {

	test('test valueDecode with no argument', () => {
		const result= valueDecode();
		expect(result).toBeDefined();
		expect(result).toEqual("");
	});

	test('test optional with no argument', () => {
		const data= 'dummy';
		const result= valueDecode(data);
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
	});

	
});