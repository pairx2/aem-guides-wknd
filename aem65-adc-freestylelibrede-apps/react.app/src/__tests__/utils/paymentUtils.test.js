import '@testing-library/jest-dom/extend-expect';
import { cartObject } from '../../utils/paymentUtils';

describe('test paymentUtils', () => {
	test('test cartObject', () => {
	    const result= cartObject("1");
	    expect(result).toBeDefined();
	});
});