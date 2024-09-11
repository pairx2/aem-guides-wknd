import {Request} from '../../utils/httpRequestUtils';

test('constructor check', () => {
	const result = new Request('url', 'method');
	expect(result).toBeTruthy();
});

test('withParameters check', () => {
	const result = new Request('url', 'method');

	expect(result.withParameters('params')).toBeTruthy();
	expect(result.withParameters('params')).toBeInstanceOf(Object);
});

test('withData check', () => {
	const result = new Request('url', 'method');

	expect(result.withData('data')).toBeTruthy();
	expect(result.withData('data')).toBeInstanceOf(Object);
});

test('setUploadProgressHandler check', () => {
	const result = new Request('url', 'method');

	expect(result.setUploadProgressHandler('callback')).toBeTruthy();
	expect(result.setUploadProgressHandler('callback')).toBeInstanceOf(Object);
});

test('setDownloadProgressHandler check', () => {
	const result = new Request('url', 'method');

	expect(result.setDownloadProgressHandler('callback')).toBeTruthy();
	expect(result.setDownloadProgressHandler('callback')).toBeInstanceOf(Object);
});

test('execute check', () => {
	const result = new Request('url', 'method');

	expect(result.execute()).toBeTruthy();
	expect(result.execute()).toBeInstanceOf(Object);
});
