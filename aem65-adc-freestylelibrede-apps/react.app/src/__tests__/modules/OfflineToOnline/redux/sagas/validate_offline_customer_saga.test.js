import { put, takeLatest } from "redux-saga/effects";
import {
  VALIDATE_OFFLINE_CUSTOMER_REQUEST,
  validateOfflineCustomerRequestFailure,
  validateOfflineCustomerRequestSuccess,
} from "../../../../../modules/OfflineToOnline/redux/actions/validate_offline_customer.action";
import * as saga from "../../../../../modules/OfflineToOnline/redux/sagas/validate_offline_customer.saga";
import offlineToOnlineSaga from "../../../../../modules/OfflineToOnline/redux/sagas/validate_offline_customer.saga";
jest.mock("../../../../../utils/endpointUrl.js");

describe('offlineToOnlineSaga generator saga ', () => {
	const iterator = offlineToOnlineSaga();
	test('get offlineToOnlineSaga -> offlineToOnlineSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(VALIDATE_OFFLINE_CUSTOMER_REQUEST, saga.validateOfflineCustomerSaga);
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
	const iterator = saga.validateOfflineCustomerSaga({payload})
	test('offlineToOnlineSaga catch testing', () => {
		iterator.next();
		expect(
			iterator.throw(response).value).
			toEqual(put(validateOfflineCustomerRequestFailure(response)));
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
	const iterator = saga.validateOfflineCustomerSaga({payload});
	iterator.next();
	test('put validateOfflineCustomerRequestFailure', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(validateOfflineCustomerRequestFailure({response}));
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
	
	const iterator = saga.validateOfflineCustomerSaga({payload});
	iterator.next();
	test('put validateOfflineCustomerRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(validateOfflineCustomerRequestSuccess({data}));
		expect(actualYield).toEqual(expectedYield)
	});
});


