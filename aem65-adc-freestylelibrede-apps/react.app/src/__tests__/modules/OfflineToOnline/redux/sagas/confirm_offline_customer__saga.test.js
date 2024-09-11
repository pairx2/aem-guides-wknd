import { put, takeLatest } from "redux-saga/effects";
import {
    CONFIRM_OFFLINE_CUSTOMER_REQUEST, confirmOfflineCustomerRequestSuccess, confirmOfflineCustomerRequestFailure
} from "../../../../../modules/OfflineToOnline/redux/actions/confirm_offline_customer.action";
import * as saga from "../../../../../modules/OfflineToOnline/redux/sagas/confirm_offline_customer.saga";
import confirmOfflineToOnlineCustomerSaga from "../../../../../modules/OfflineToOnline/redux/sagas/confirm_offline_customer.saga";
jest.mock("../../../../../utils/endpointUrl.js");

describe('confirmOfflineToOnlineCustomerSaga generator saga ', () => {
	const iterator = confirmOfflineToOnlineCustomerSaga();
	test('get confirmOfflineToOnlineCustomerSaga -> confirmOfflineToOnlineCustomerSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeLatest(CONFIRM_OFFLINE_CUSTOMER_REQUEST, saga.confirmOfflineCustomerSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('confirmOfflinecustomer catch block saga ', () => {
	const payload = 'kQ4gvF6IVhygOTlCXJQTPBljx3FQiEa7FgzDHbh8PWl4jYhVa4I/oyE9ggyNAJnO7Ok1l4BETt/7nFQl/ykoDueyTra5+X0SWiWA8DHf0rs4KtewIGgdb1o=';
	const response = {
			code : 'error'
		};
	const iterator = saga.confirmOfflineCustomerSaga(payload)
	test('confirmOfflinecustomer catch testing', () => {
		iterator.next();
		expect(
			iterator.throw(response).value).
			toEqual(put(confirmOfflineCustomerRequestFailure(response)));
	});
});

describe('confirmOfflinecustomer else block saga ', () => {
	const payload = 'kQ4gvF6IVhygOTlCXJQTPBljx3FQiEa7FgzDHbh8PWl4jYhVa4I/oyE9ggyNAJnO7Ok1l4BETt/7nFQl/ykoDueyTra5+X0SWiWA8DHf0rs4KtewIGgdb1o=';
	const response = {
			code : 'error'
		};
	const iterator = saga.confirmOfflineCustomerSaga(payload);
	iterator.next();
	test('put confirmOfflinecustomer failure request', () => {
		const actualYield = iterator.next().value;
		const expectedYield = put(confirmOfflineCustomerRequestFailure({response}));
	});
});

describe('confirmOfflinecustomer if block saga ', () => {
	const payload = 'kQ4gvF6IVhygOTlCXJQTPBljx3FQiEa7FgzDHbh8PWl4jYhVa4I/oyE9ggyNAJnO7Ok1l4BETt/7nFQl/ykoDueyTra5+X0SWiWA8DHf0rs4KtewIGgdb1o=';
		const data = {
            "status": true,
            "requestId": "6aa22ea3-91d9-453a-b033-4c45818d3361",
            "response": [
                {
                    "SocailUserId": "Google_109078656611720202192",
                    "Status": "Approved",
                    "Email": "devtest5026@gmail.com",
                    "FirstName": "test",
                    "LastName": "user",
                    "AccountType": "Google"
                }
            ],
            "errorCode": 0
        }
	
	const iterator = saga.confirmOfflineCustomerSaga(payload);
	iterator.next();
	test('put validateOfflineCustomerRequestSuccess', () => {
		const actualYield = iterator.next({data}).value;
		const expectedYield = put(confirmOfflineCustomerRequestSuccess({data}));
		expect(actualYield).toEqual(expectedYield)
	});
});


