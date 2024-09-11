import '@testing-library/jest-dom/extend-expect';
import {CustomPropTypes} from '../../utils/propTypeUtils';

describe('test propTypeUtils', () => {

	test('test CustomPropTypes', () => {
		const result= CustomPropTypes;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
		expect(typeof result.conflictsWith()).toBe('function');
	});
});