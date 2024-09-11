import '@testing-library/jest-dom/extend-expect';
import {socialShare} from '../../utils/socialShare';

describe('test socialShare', () => {

	test('test socialShare ', () => {
		const result= socialShare;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Array);
	});
});