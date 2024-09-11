import { put, takeLatest } from "redux-saga/effects";
import {
    REGISTER_OFFLINE_CUSTOMER_REQUEST,
    registerOfflineCustomerRequestSuccess,
    registerOfflineCustomerRequestFailure,
} from "../../../../../modules/OfflineToOnline/redux/actions/register_offline_customer.action";
import * as saga from "../../../../../modules/OfflineToOnline/redux/sagas/register_offline_customer.saga";
import registerUserOfflineToOnlineSaga from "../../../../../modules/OfflineToOnline/redux/sagas/register_offline_customer.saga";
jest.mock("../../../../../utils/endpointUrl.js");

describe('registerUserOfflineToOnlineSaga generator saga ', () => {
	const iterator = registerUserOfflineToOnlineSaga();
	test('get offlineToOnlineSaga -> offlineToOnlineSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(REGISTER_OFFLINE_CUSTOMER_REQUEST, saga.registerOfflineCustomerSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('offlineToOnlineSaga catch block saga ', () => {
	const payload = {
		    birthDate: "18.03.1996",
		    customerNumber: "4356432167",
		    lastName: "Diego",
		    kvnrNumber: "N536459198",
		  };
	const response = {
			code : 'error'
		};
	const iterator = saga.registerOfflineCustomerSaga({payload})
	test('offlineToOnlineSaga catch testing', () => {
		iterator.next();
		expect(
			iterator.throw(response).value).
			toEqual(put(registerOfflineCustomerRequestFailure(response)));
	});
});

describe('offlineToOnlineSaga else block saga ', () => {
	const payload = {
		    birthDate: "18.03.1996",
		    customerNumber: "4356432167",
		    lastName: "Diego",
		    kvnrNumber: "N536459198",
		  };
	const response = {
			code : 'error'
		};
	const iterator = saga.registerOfflineCustomerSaga({payload});
	iterator.next();
	test('put registerOfflineCustomerRequestFailure', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(registerOfflineCustomerRequestFailure({response}));
	});
});

describe('offlineToOnlineSaga if block saga ', () => {
	const payload = {
		    birthDate: "18.03.1996",
		    customerNumber: "4356432167",
		    lastName: "Diego",
		    kvnrNumber: "N536459198",
		  };
		const data = {
				"status": false,
				"requestId": "c4293c40-ee37-4705-8284-f992367b786d",
				"response": {
					"statusReason": "Customer data not found",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "ACC-CODE-1020"
				},
				"errorCode": 400			
		};
	
	const iterator = saga.registerOfflineCustomerSaga({payload});
	iterator.next();
	test('put validateOfflineCustomerRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(registerOfflineCustomerRequestSuccess({data}));
		expect(actualYield).toEqual(expectedYield)
	});
});


