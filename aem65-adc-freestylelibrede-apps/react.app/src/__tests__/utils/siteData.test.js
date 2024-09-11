import '@testing-library/jest-dom/extend-expect';
import {getRequiredSiteData} from '../../utils/siteData';
jest.mock('../../utils/endpointUrl');

describe('test siteData', () => {
	test('test getRequiredSiteData', () => {
	    const result= getRequiredSiteData();
	    expect(result).not.toBeDefined();
	});

	test('test getRequiredSiteData with key', () => {
	    const result= getRequiredSiteData('key');
	    expect(result).not.toBeDefined();
	});
});