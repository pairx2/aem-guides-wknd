import { call, takeLatest,put } from 'redux-saga/effects';
import { Mutation, Query } from '../../../../../api/graphql.config';
import { sagaDataHandling } from '../../../../../utils/sagaDataHandling';
import { PLUS_SERVICE_CANCELLATION_REQUEST, plusServiceCancellationRequestSuccess, plusServiceCancellationRequestFailure } from '../../../../../modules/PlusServiceCancellation/redux/actions/plus_service_cancellation.action';
import plusServiceCancellationSagas, * as saga from '../../../../../modules/PlusServiceCancellation/redux/sagas/plus_service_cancellation.saga';
import * as schema from '../../../../../modules/PlusServiceCancellation/schemas/plus_service_cancellation.schema';
jest.mock('../../../../../utils/endpointUrl.js');

describe('plusServiceCancellationSaga saga ', () => {
	const payload = {
			firstname: "abbott",
			lastname: "germany",
			email: "businessabbottgulab@yopmail.com",
			dob: "13.07.1980",
			termination: "nächstmöglicher Zeitpunkt",
			terminationTime: "",
			terminationType: "",
			terminationReason: ""
		

	};
	const data = {};
	const iterator = saga.plusServiceCancellationSaga({payload});
	test('call sagaDataHandling', () => {
		const actualYield = iterator.next().value;
		const expectedYield = call(			
			Mutation,
			schema.buildPlusServiceCancellationSchema(payload.firstname,payload.lastname,payload.email,payload.dob, payload.termination,payload.terminationTime,payload.terminationType,payload.terminationReason),
			);
	
		expect(actualYield).toEqual(expectedYield);
	});
	test('put plusServiceCancellationSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield =  put(plusServiceCancellationRequestSuccess(data));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put plusServiceCancellationSuccess', () => {
		const response = {
			error : 'error'
		};
		const actualYield = iterator.throw({response}).value;
		const expectedYield =  put(plusServiceCancellationRequestFailure(response));
		//expect(actualYield).toEqual(expectedYield);
	});
});


describe('getCustomerSagas saga takeLatest calls', () => {
	const iterator = plusServiceCancellationSagas();
	test('get plusServiceCancellationSagas -> plusServiceCancellationSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(PLUS_SERVICE_CANCELLATION_REQUEST, saga.plusServiceCancellationSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});