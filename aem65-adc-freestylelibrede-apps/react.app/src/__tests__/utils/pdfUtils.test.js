import '@testing-library/jest-dom/extend-expect';
import {downloadBase64} from '../../utils/pdfUtils';

describe('test pdfUtils', () => {
	test('test downloadBase64', () => {
		global.URL.createObjectURL = jest.fn(() => 'test details');
		const result= downloadBase64('base64String', 'fileName');
		expect(result).toBeUndefined();
	});
});