import {call, takeEvery, put, select} from 'redux-saga/effects';
import {
	UPDATE_DELIVERY_DATE_REQUEST, UPDATE_DELIVERY_DATE_REQUEST_SUCCESS,UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS,
	updateDeliveryDateRequestSuccess,
	updateDeliveryDateForRxmcRequestSuccess,
	updateDeliveryDateRequestFailure
} from '../../../../../modules/MyAccount/redux/actions/update_delivery_date.action';
import {sagaDataHandling} from '../../../../../utils/sagaDataHandling';
import {Mutation} from '../../../../../api/graphql.config';
import {buildUpdateDeliveryDateSchema} from '../../../../../modules/MyAccount/schemas/update_delivery_date.schema';
import * as saga from '../../../../../modules/MyAccount/redux/sagas/update_delivery_date.saga';
import updateDeliveryDateSagas from '../../../../../modules/MyAccount/redux/sagas/update_delivery_date.saga';
import {GET_ORDERS_REQUEST, GET_ORDERS_RXMC_REQUEST} from '../../../../../modules/MyAccount/redux/actions/get_orders.action';
jest.mock('../../../../../utils/endpointUrl.js');

describe('updateDeliveryDateSaga saga ', () => {
	const payload = {};
	const iterator = saga.updateDeliveryDateSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildUpdateDeliveryDateSchema(payload),
			updateDeliveryDateRequestSuccess,
			updateDeliveryDateRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateDeliveryDateSaga saga ', () => {
	const payload = {
		order_type : 'Reimbursement'
	};
	const iterator = saga.updateDeliveryDateSaga({payload});
	test('call sagaDataHandling', () => {
		const actualToken = iterator.next().value;
		const expectedToken =  call(
			sagaDataHandling,
			Mutation,
			buildUpdateDeliveryDateSchema(payload),
			updateDeliveryDateForRxmcRequestSuccess,
			updateDeliveryDateRequestFailure
		);
		expect(actualToken).toEqual(expectedToken);
	});
});

describe('updateDeliveryDateSuccessSaga saga ', () => {
	const iterator = saga.updateDeliveryDateSuccessSaga();
	test('put GET_ORDERS_REQUEST', () => {
		const actualToken = iterator.next('CPS').value;
		const expectedToken =  put({
			type: GET_ORDERS_REQUEST,
			payload: {
				timeDelay: true,
				orderHistoryType: 'CPS'
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});
});
describe('updateDeliveryDateRxmcSuccessSaga saga ', () => {
	const iterator = saga.updateDeliveryDateRxmcSuccessSaga();
	test('getDeliveryDateUpdateReducer select', () => {
		const actualToken = iterator.next().value;
		const expectedToken = select(saga.getDeliveryDateUpdateReducer);
		expect(actualToken).toEqual(expectedToken);
	});
	test('put GET_ORDERS_RXMC_REQUEST', () => {
		const rxmc = '000UD';
		const actualToken = iterator.next({rxmc}).value;
		const expectedToken =  put({
			type: GET_ORDERS_RXMC_REQUEST,
			payload: {
				rxmc,
				timeDelay: true
			}
		});
		expect(actualToken).toEqual(expectedToken);
	});

});
describe('updateDeliveryDateSagas saga ', () => {
	const iterator = updateDeliveryDateSagas();
	test('get updateDeliveryDateSagas -> updateDeliveryDateSaga', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeEvery(UPDATE_DELIVERY_DATE_REQUEST, saga.updateDeliveryDateSaga);
		expect(actualToken).toEqual(expectedToken);
	});
	test('get updateDeliveryDateSaga -> updateDeliveryDateSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_DELIVERY_DATE_REQUEST_SUCCESS, saga.updateDeliveryDateSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
	test('get updateDeliveryDateSaga -> updateDeliveryDateRxmcSuccessSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(UPDATE_DELIVERY_DATE_FOR_RXMC_REQUEST_SUCCESS, saga.updateDeliveryDateRxmcSuccessSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});