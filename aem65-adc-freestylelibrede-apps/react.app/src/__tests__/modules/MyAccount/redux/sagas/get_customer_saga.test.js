import {call, takeLatest, takeEvery} from 'redux-saga/effects';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Query} from '../../../../../api/graphql.config';
import {buildGetCustomerSchema} from '../../../../../modules/MyAccount/schemas/get_customer.schema';
import {GET_CUSTOMER_REQUEST, getCustomerRequestFailure, getCustomerRequestSuccess, GET_CUSTOMER_REQUEST_SUCCESS} from '../../../../../modules/MyAccount/redux/actions/customer.action';
import getCustomerSagas from '../../../../../modules/MyAccount/redux/sagas/get_customer.saga';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/get_customer.saga';
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga';
jest.mock('../../../../../utils/endpointUrl.js');

describe('getCustomerSaga saga ', () => {
	const iterator = saga.getCustomerSaga();
	test('call _getJwtToken',()=>{
		const expectedYield = call(_getJwtToken);
		const actualYield = iterator.next().value;
		expect(actualYield).toEqual(expectedYield);
	});
	test('call sagaDataHandling',()=>{
		const token = '8ac7a49f71aabf0e0171ba97acb923d2';
		const expectedYield = call(
			sagaDataHandling,
			Query,
			buildGetCustomerSchema(),
			getCustomerRequestSuccess,
			getCustomerRequestFailure
		);
		const actualYield = iterator.next(token).value;
		expect(actualYield).toEqual(expectedYield);
	});
});

describe('getCustomerSaga saga ', () => {
	const payload = {
		adcCustomerDetails : {
			customer : {}
		},
		adcCustomerUpdate : {
			customer : {}
		}
	};
	const iterator = saga.getCustomerRequestSuccessSaga({payload});
	test('getCustomerRequestSuccessSaga',()=>{
		iterator.next();
	});
});
describe('getCustomerSagas saga takeLatest calls', () => {
	const iterator = getCustomerSagas();
	test('get getCustomerSagas -> getCustomerSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_CUSTOMER_REQUEST, saga.getCustomerSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get getCustomerSagas -> getCustomerRequestSuccessSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(GET_CUSTOMER_REQUEST_SUCCESS, saga.getCustomerRequestSuccessSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
