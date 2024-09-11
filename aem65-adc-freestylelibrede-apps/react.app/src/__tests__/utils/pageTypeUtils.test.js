import '@testing-library/jest-dom/extend-expect';
import {isRxCheckoutPageType, isCheckoutPageType} from '../../utils/pageTypeUtils';
jest.mock('../../utils/endpointUrl');

describe('test pageTypeUtils', () => {
	test('test isRxCheckoutPageType', () => {
	    const result= isRxCheckoutPageType();
	    expect(result).toBeDefined();
	});
	test('test isCheckoutPageType', () => {
	    const result= isCheckoutPageType();
	    expect(result).toBeDefined();
	});
});