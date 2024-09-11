import {call, put, takeLatest} from 'redux-saga/effects';
import {select} from 'redux-saga/effects';
import {
	UPDATE_SESSION_ID,
	SUGGEST_ZIPCODE_REQUEST,
	suggestZipCodeRequestSuccess,
	suggestZipCodeRequestFailure,
	SUGGEST_CITY_REQUEST,
	suggestCityRequestSuccess,
	suggestCityRequestFailure,
	SUGGEST_STREET_REQUEST,
	suggestStreetRequestSuccess,
	suggestStreetRequestFailure
} from '../../../../../modules/Address/redux/actions/typeahead_address.action';
import {getNewSessionID, getZipcodeSuggestion, getCitySuggestion, getStreetSuggestion} from '../../../../../modules/Address/api/addressTypeahead.api';
import * as saga from '../../../../../modules/Address/redux/sagas/typeahead_address.saga';
import typeaheadAddressSagas from '../../../../../modules/Address/redux/sagas/typeahead_address.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('typeaheadAddressSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		prefix : 'prefix'
	};
	const iterator = saga.typeaheadAddressSaga({payload});
	test('call getCurrentSessionID', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(saga.getCurrentSessionID);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestZipCodeRequestFailure', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  put(suggestZipCodeRequestFailure('An error appeared while getting the sessionID'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('typeaheadAddressSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		prefix : 'prefix'
	};
	const sessionID = '123';
	const data = {};
	const iterator = saga.typeaheadAddressSaga({payload});
	iterator.next();
	test('call getZipcodeSuggestion', () => {
		const actualYield = iterator.next(sessionID).value;
		const expectedYield =  call(getZipcodeSuggestion, sessionID, payload.countryCode, payload.prefix);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestZipCodeRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(suggestZipCodeRequestSuccess({suggestions: data, prefix: payload.prefix}));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('typeaheadAddressSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		prefix : 'prefix'
	};
	const sessionID = '123';
	const error = {};
	const iterator = saga.typeaheadAddressSaga({payload});
	iterator.next();
	iterator.next(sessionID);
	test('put suggestZipCodeRequestSuccess', () => {
		const actualYield = iterator.next({error}).value;
		const expectedYield =  put(suggestZipCodeRequestFailure(error));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestCityRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const iterator = saga.suggestCityRequestSaga({payload});
	test('call getCurrentSessionID', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(saga.getCurrentSessionID);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestCityRequestFailure', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(suggestCityRequestFailure('An error appeared while getting the sessionID'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestCityRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const sessionID = '123';
	const data = {};
	const iterator = saga.suggestCityRequestSaga({payload});
	iterator.next();
	test('call getCitySuggestion', () => {
		const actualYield = iterator.next(sessionID).value;
		const expectedYield =  call(getCitySuggestion, sessionID, payload.countryCode, payload.zipcode);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestCityRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(suggestCityRequestSuccess({suggestions: data, prefix: payload.prefix}));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestCityRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const sessionID = '123';
	const error = {};
	const iterator = saga.suggestCityRequestSaga({payload});
	iterator.next();
	iterator.next(sessionID);
	test('put suggestCityRequestFailure', () => {
		const actualYield = iterator.next({error}).value;
		const expectedYield =  put(suggestCityRequestFailure(error));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestStreetRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const iterator = saga.suggestStreetRequestSaga({payload});
	test('call getCurrentSessionID', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  call(saga.getCurrentSessionID);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestStreetRequestFailure', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(suggestStreetRequestFailure('An error appeared while getting the sessionID'));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestStreetRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const sessionID = '123';
	const data = {};
	const iterator = saga.suggestStreetRequestSaga({payload});
	iterator.next();
	test('call getStreetSuggestion', () => {
		const actualYield = iterator.next(sessionID).value;
		const expectedYield =  call(getStreetSuggestion, sessionID, payload.countryCode, payload.zipcode, payload.prefix);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put suggestStreetRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(suggestStreetRequestSuccess({suggestions: data, prefix: payload.prefix}));
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('suggestStreetRequestSaga saga ', () => {
	const payload = {
		countryCode : '55116',
		zipcode : '123456',
		prefix: 'prefix'
	};
	const sessionID = '123';
	const error = {};
	const iterator = saga.suggestStreetRequestSaga({payload});
	iterator.next();
	iterator.next(sessionID);
	test('put suggestStreetRequestFailure', () => {
		const actualYield = iterator.next({error}).value;
		const expectedYield =  put(suggestStreetRequestFailure(error));
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('getCurrentSessionID saga ', () => {
	const session = {
		id : '123',
		creationDate : '20/12/2022'
	};
	const iterator = saga.getCurrentSessionID();
	test('select getSession', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  select(saga.getSession);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call getNewSessionID', () => {
		const actualYield = iterator.next({session}).value;
		const expectedYield =  call(getNewSessionID);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put UPDATE_SESSION_ID', () => {
		const sessionID = '123';
		const actualYield = iterator.next(sessionID).value;
		const expectedYield =  put({
			type: UPDATE_SESSION_ID,
			payload: {
				sessionID: sessionID
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});

});

describe('typeaheadAddressSagas saga ', () => {
	const iterator = typeaheadAddressSagas();
	test('get typeaheadAddressSagas -> typeaheadAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(SUGGEST_ZIPCODE_REQUEST, saga.typeaheadAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get typeaheadAddressSagas -> suggestCityRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(SUGGEST_CITY_REQUEST, saga.suggestCityRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get typeaheadAddressSagas -> suggestStreetRequestSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(SUGGEST_STREET_REQUEST, saga.suggestStreetRequestSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});