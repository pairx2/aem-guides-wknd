import '@testing-library/jest-dom/extend-expect';
import {setCookie, getCookie, deleteCookie} from '../../utils/cookieUtils';

describe('test methods', () => {

	test('test setCookie', async () => {
		const cookieName= 'cookieName';
		const cookieValue= 'cookieValue';
		const daysValid= 1;
		const result = setCookie(cookieName, cookieValue, daysValid);
		expect(result).toBeUndefined();
	});

	test('test setCookie', async () => {
		const cookieName= 'cookieName';
		const cookieValue= 'cookieValue';
		const daysValid= 1;
		const result = setCookie(cookieName, cookieValue, daysValid, true, true);
		expect(result).toBeUndefined();
	});

	test('test getCookie', async () => {
		const cookieName= 'cookieName';
		const result = getCookie(cookieName);
		expect(result).toBeDefined();
		expect(result).toBe('cookieValue');
	});

	test('test getCookie withou any argument', async () => {
		const result = getCookie();
		expect(result).toBeUndefined();
	});

	test('test deleteCookie', async () => {
		const cookieName= 'cookieName';
		const result = deleteCookie(cookieName);
		expect(result).toBeUndefined();
	});

});