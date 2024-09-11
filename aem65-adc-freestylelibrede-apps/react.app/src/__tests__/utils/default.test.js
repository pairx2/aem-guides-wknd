import '@testing-library/jest-dom/extend-expect';
import {empty} from '../../utils/default';

describe('test empty', () => {

	test('empty', async () => {
		const result = empty;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result.object).toEqual({});
		expect(result.array).toEqual([]);

		expect(typeof result.function).toBe('function');
		expect(result.function.name).toBe('_function');
		expect(result.function()).toBeUndefined();

		expect(typeof result.nullFunction).toBe('function');
		expect(result.nullFunction.name).toBe('nullFunction');
		expect(result.nullFunction()).toBe(null);
	});
});