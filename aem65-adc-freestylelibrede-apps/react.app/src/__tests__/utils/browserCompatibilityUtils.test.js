import '@testing-library/jest-dom/extend-expect';
import {isIE} from '../../utils/browserCompatibilityUtils';

describe('test isIE', () => {

	test('empty input', async () => {
		const result = isIE;
		expect(result).toBeFalsy();
	});

});