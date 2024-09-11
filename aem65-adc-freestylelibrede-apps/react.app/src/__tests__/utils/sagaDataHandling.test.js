import {call} from 'redux-saga/effects';
import {getJwtToken} from '../../api/authentication.service';
import {sagaDataHandling} from '../../utils/sagaDataHandling';
jest.mock('../../utils/endpointUrl.js');
jest.mock('../../utils/siteData.js');

describe('sagaDataHandling saga', () => {
	const iterator = sagaDataHandling();
	test('call getJwtToken', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(getJwtToken);
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('sagaDataHandling saga catch block', () => {
	const iterator = sagaDataHandling();
	iterator.next();
	const jwtToken = undefined;
	test('err in catch block', () => {
		expect(iterator.throw(jwtToken).value)
			.toEqual(undefined);
	});
});
