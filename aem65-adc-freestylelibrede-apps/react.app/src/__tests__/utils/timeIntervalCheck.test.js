import '@testing-library/jest-dom/extend-expect';
import {get_time_diff} from '../../utils/timeIntervalCheck';

describe('test timeIntervalCheck', () => {

	test('test get_time_diff with no argument', () => {
		const result= get_time_diff();
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
	});

	test('test get_time_diff', () => {
		const d = new Date( 'December 25, 1995 23:15:20' );
		const result= get_time_diff(d);
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
	});

	test('test get_time_diff with wrong arg', () => {
		const result= get_time_diff('dummy');
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
	});

	test('test get_time_diff with future arg', () => {
		const result= get_time_diff('December 25, 2025 23:15:20');
		expect(result).toBeDefined();
		expect(typeof result).toBe('string');
	});
});