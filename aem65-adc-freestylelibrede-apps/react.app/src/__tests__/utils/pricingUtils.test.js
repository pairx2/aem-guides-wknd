import '@testing-library/jest-dom/extend-expect';
import {formatPrice} from '../../utils/pricingUtils';

describe('test formatPrice method', () => {
	test('empty input', async () => {
		const result = formatPrice();
		expect(result).toBe('€0.00');
	});

	test('valid input', async () => {
		const result = formatPrice(2.3);
		expect(result).toBe('€2.30');
	});
});
